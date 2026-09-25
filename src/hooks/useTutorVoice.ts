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
    // 1. Native Sinhala voices (e.g. Microsoft Thilini Online Natural)
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
    // NEVER fall back to English voice for Sinhala text!
    return undefined;
  }

  if (lang === 'ta') {
    // 2. Native Tamil voices (e.g. Microsoft Pallavi / Saranya)
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
    // NEVER fall back to English voice for Tamil text!
    return undefined;
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

// Split text into short, natural rhythmic clauses (< 95 chars) for authentic Google TTS
function splitIntoClauses(text: string): string[] {
  const raw = text.match(/[^!?,.\n;:]+[!?,.\n;:]*/g) || [text];
  const results: string[] = [];
  for (const part of raw) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    if (trimmed.length > 95) {
      const words = trimmed.split(/\s+/);
      let cur = '';
      for (const w of words) {
        if ((cur + ' ' + w).trim().length > 95) {
          if (cur) results.push(cur.trim());
          cur = w;
        } else {
          cur = cur ? cur + ' ' + w : w;
        }
      }
      if (cur) results.push(cur.trim());
    } else {
      results.push(trimmed);
    }
  }
  return results.length > 0 ? results : [text];
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksListRef = useRef<string[]>([]);
  const chunkIndexRef = useRef<number>(0);
  const wordTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const supported = typeof window !== 'undefined';
    setIsSupported(supported);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
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
    if (wordTimerRef.current) {
      clearInterval(wordTimerRef.current);
      wordTimerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setIsCompleted(false);
    setCurrentWord('');
    onStateChange?.('idle');
  }, [onStateChange]);

  const fallbackSpeechSynthesis = useCallback(
    (options: VoiceNarrationOptions, lang: Language) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      const utterance = new SpeechSynthesisUtterance(options.text);
      utterance.lang = lang === 'si' ? 'si-LK' : lang === 'ta' ? 'ta-LK' : 'en-US';
      utterance.pitch = 1.18;
      utterance.rate = 0.94;
      utterance.onstart = () => {
        setIsSpeaking(true);
        onStateChange?.('speaking');
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsCompleted(true);
        onStateChange?.('celebrating');
        setTimeout(() => onStateChange?.('idle'), 2200);
      };
      window.speechSynthesis.speak(utterance);
    },
    [onStateChange]
  );

  const speak = useCallback(
    (options: VoiceNarrationOptions) => {
      // 1. Cancel previous speech/audio
      stop();

      lastOptionsRef.current = options;
      const lang = options.language || 'en';
      setSpokenText(options.text);
      setTitle(options.title || 'Atlas AI Tutor');
      setConcept(options.concept || 'Lesson Audio Guide');
      setLanguage(lang);
      setIsCompleted(false);
      setIsPaused(false);

      const voicesList = availableVoices.length > 0 
        ? availableVoices 
        : (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : []);
      const ladyVoice = findLadyVoice(voicesList, lang);

      // When Sinhala or Tamil is requested and browser has NO native Sinhala/Tamil TTS voice:
      // Play authentic native Google TTS audio! (Avoids English robot voices skipping Sinhala text)
      if ((lang === 'si' || lang === 'ta') && !ladyVoice) {
        const clauses = splitIntoClauses(options.text);
        chunksListRef.current = clauses;
        chunkIndexRef.current = 0;

        const playChunkAt = (index: number) => {
          if (index >= chunksListRef.current.length) {
            if (wordTimerRef.current) clearInterval(wordTimerRef.current);
            setIsSpeaking(false);
            setIsPaused(false);
            setIsCompleted(true);
            setCurrentWord('');
            onStateChange?.('celebrating');
            setTimeout(() => onStateChange?.('idle'), 2400);
            return;
          }

          chunkIndexRef.current = index;
          const currentClause = chunksListRef.current[index];
          const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(currentClause)}`;
          const audio = new Audio(ttsUrl);
          audioRef.current = audio;

          // Word pulses for the animated speech bubble
          const words = currentClause.trim().split(/\s+/);
          let wIdx = 0;
          if (wordTimerRef.current) clearInterval(wordTimerRef.current);
          wordTimerRef.current = setInterval(() => {
            if (wIdx < words.length) {
              setCurrentWord(words[wIdx]);
              wIdx++;
            }
          }, Math.max(220, (currentClause.length * 60) / Math.max(1, words.length)));

          audio.onplay = () => {
            setIsSpeaking(true);
            setIsPaused(false);
            onStateChange?.('speaking');
          };

          audio.onended = () => {
            playChunkAt(index + 1);
          };

          audio.onerror = (e) => {
            console.warn('[useTutorVoice] Google TTS chunk playback error, trying next chunk:', e);
            playChunkAt(index + 1);
          };

          audio.play().catch((err) => {
            console.warn('[useTutorVoice] audio play failed:', err);
            fallbackSpeechSynthesis(options, lang);
          });
        };

        playChunkAt(0);
        return;
      }

      // If native SpeechSynthesis voice exists (e.g. English, or Edge with Microsoft Thilini)
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(options.text);
        utteranceRef.current = utterance;

        if (ladyVoice) {
          utterance.voice = ladyVoice;
        }
        utterance.lang = lang === 'si' ? 'si-LK' : lang === 'ta' ? 'ta-LK' : 'en-US';
        utterance.pitch = 1.18;
        utterance.rate = 0.94;

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
      }
    },
    [availableVoices, onStateChange, stop, fallbackSpeechSynthesis]
  );

  const pause = useCallback(() => {
    if (audioRef.current && isSpeaking) {
      audioRef.current.pause();
      if (wordTimerRef.current) clearInterval(wordTimerRef.current);
      setIsPaused(true);
      setIsSpeaking(false);
      onStateChange?.('idle');
      return;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsSpeaking(false);
      onStateChange?.('idle');
    }
  }, [isSpeaking, onStateChange]);

  const resume = useCallback(() => {
    if (audioRef.current && isPaused) {
      audioRef.current.play().catch(console.warn);
      setIsPaused(false);
      setIsSpeaking(true);
      onStateChange?.('speaking');
      return;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      onStateChange?.('speaking');
    } else if (lastOptionsRef.current) {
      speak(lastOptionsRef.current);
    }
  }, [isPaused, speak, onStateChange]);

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
