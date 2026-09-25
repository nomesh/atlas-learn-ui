import { useState, useEffect, useCallback, useRef } from 'react';
import type { Language, TutorState } from '../types';

export interface VoiceNarrationOptions {
  text: string;
  title?: string;
  concept?: string;
  language?: Language;
}

export interface TutorVoiceState {
  isSpeaking: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  spokenText: string;
  title: string;
  concept: string;
  currentWord: string;
  language: Language;
  isSupported: boolean;
  speak: (options: VoiceNarrationOptions) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  replay: () => void;
}

function findLadyVoice(voices: SpeechSynthesisVoice[], lang: Language): SpeechSynthesisVoice | undefined {
  if (!voices || voices.length === 0) return undefined;

  // Male voice names to strictly avoid
  const maleKeywords = [
    'david', 'mark', 'george', 'guy', 'stefan', 'male', 'valluvar', 'ravi',
    'prabhat', 'james', 'richard', 'paul', 'brian', 'daniel', 'oliver', 'alex'
  ];

  // Well-known female / lady voice names across Microsoft Edge, Chrome, Safari, and Windows
  const femaleKeywords = [
    'zira', 'jenny', 'aria', 'ava', 'emma', 'sonia', 'samantha', 'victoria',
    'karen', 'moira', 'tessa', 'fiona', 'thilini', 'sanduni', 'pallavi', 'saranya',
    'vani', 'kavya', 'female', 'woman', 'girl'
  ];

  const isMale = (name: string) => maleKeywords.some((kw) => name.toLowerCase().includes(kw));
  const isFemale = (name: string) => femaleKeywords.some((kw) => name.toLowerCase().includes(kw));

  if (lang === 'si') {
    // 1. Sinhala voices
    const siVoices = voices.filter(
      (v) => v.lang.toLowerCase().includes('si') || v.lang.toLowerCase().includes('lk')
    );
    if (siVoices.length > 0) {
      const femaleSi = siVoices.find((v) => isFemale(v.name) && !isMale(v.name));
      if (femaleSi) return femaleSi;
      const nonMaleSi = siVoices.find((v) => !isMale(v.name));
      if (nonMaleSi) return nonMaleSi;
      return siVoices[0];
    }
  }

  if (lang === 'ta') {
    // 2. Tamil voices
    const taVoices = voices.filter(
      (v) => v.lang.toLowerCase().includes('ta') || (v.lang.toLowerCase().includes('in') && v.name.toLowerCase().includes('tamil'))
    );
    if (taVoices.length > 0) {
      const femaleTa = taVoices.find((v) => isFemale(v.name) && !isMale(v.name));
      if (femaleTa) return femaleTa;
      const nonMaleTa = taVoices.find((v) => !isMale(v.name));
      if (nonMaleTa) return nonMaleTa;
      return taVoices[0];
    }
  }

  // 3. English voices (or fallback)
  const enVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));

  // Priority 1: Explicit female name (e.g. Microsoft Zira, Jenny, Aria, Samantha)
  const ladyEn = enVoices.find((v) => isFemale(v.name) && !isMale(v.name));
  if (ladyEn) return ladyEn;

  // Priority 2: Microsoft Natural / Google female (avoiding males)
  const naturalFemale = enVoices.find(
    (v) => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Female')) && !isMale(v.name)
  );
  if (naturalFemale) return naturalFemale;

  // Priority 3: Any non-male English voice
  const nonMaleEn = enVoices.find((v) => !isMale(v.name));
  if (nonMaleEn) return nonMaleEn;

  return enVoices[0] || voices[0];
}

export function useTutorVoice(
  onStateChange?: (state: TutorState) => void
): TutorVoiceState {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [title, setTitle] = useState('');
  const [concept, setConcept] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [isSupported, setIsSupported] = useState(true);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const lastOptionsRef = useRef<VoiceNarrationOptions | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    setIsSupported(supported);

    if (supported) {
      const loadVoices = () => {
        const list = window.speechSynthesis.getVoices();
        setAvailableVoices(list);
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.cancel();
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setIsCompleted(false);
    setCurrentWord('');
    onStateChange?.('idle');
  }, [isSupported, onStateChange]);

  const speak = useCallback(
    (options: VoiceNarrationOptions) => {
      if (!isSupported) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      lastOptionsRef.current = options;
      const lang = options.language || 'en';
      setSpokenText(options.text);
      setTitle(options.title || 'Atlas AI Tutor');
      setConcept(options.concept || 'Lesson Audio Guide');
      setLanguage(lang);
      setIsCompleted(false);
      setIsPaused(false);

      const utterance = new SpeechSynthesisUtterance(options.text);
      utteranceRef.current = utterance;

      // Select female/lady voice matching the requested language
      const voicesList = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
      const ladyVoice = findLadyVoice(voicesList, lang);
      if (ladyVoice) {
        utterance.voice = ladyVoice;
      }
      utterance.lang = lang === 'si' ? 'si-LK' : lang === 'ta' ? 'ta-LK' : 'en-US';

      // Always tune pitch to a warm, friendly female teacher tone
      utterance.pitch = 1.18;
      utterance.rate = 0.94; // Clear, encouraging cadence for young students

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        setIsCompleted(false);
        onStateChange?.('speaking');
      };

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const word = options.text.substring(
            event.charIndex,
            event.charIndex + (event.charLength || 10)
          );
          setCurrentWord(word.trim());
        }
      };

      utterance.onpause = () => {
        setIsPaused(true);
        setIsSpeaking(false);
      };

      utterance.onresume = () => {
        setIsPaused(false);
        setIsSpeaking(true);
        onStateChange?.('speaking');
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setIsCompleted(true);
        setCurrentWord('');
        // Brief celebratory pose when completing narration
        onStateChange?.('celebrating');
        setTimeout(() => {
          onStateChange?.('idle');
        }, 2200);
      };

      utterance.onerror = (e) => {
        console.warn('[useTutorVoice] Speech synthesis error:', e);
        setIsSpeaking(false);
        setIsPaused(false);
        onStateChange?.('idle');
      };

      window.speechSynthesis.speak(utterance);
    },
    [isSupported, onStateChange]
  );

  const pause = useCallback(() => {
    if (!isSupported || !isSpeaking) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsSpeaking(false);
    onStateChange?.('idle');
  }, [isSupported, isSpeaking, onStateChange]);

  const resume = useCallback(() => {
    if (!isSupported) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      onStateChange?.('speaking');
    } else if (lastOptionsRef.current) {
      speak(lastOptionsRef.current);
    }
  }, [isSupported, isPaused, speak, onStateChange]);

  const replay = useCallback(() => {
    if (lastOptionsRef.current) {
      speak(lastOptionsRef.current);
    }
  }, [speak]);

  return {
    isSpeaking,
    isPaused,
    isCompleted,
    spokenText,
    title,
    concept,
    currentWord,
    language,
    isSupported,
    speak,
    pause,
    resume,
    stop,
    replay,
  };
}
