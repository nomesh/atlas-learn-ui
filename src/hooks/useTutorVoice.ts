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

  const lastOptionsRef = useRef<VoiceNarrationOptions | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    setIsSupported(supported);

    return () => {
      if (supported) {
        window.speechSynthesis.cancel();
      }
    };
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

      // Select suitable voice
      const voices = window.speechSynthesis.getVoices();
      if (lang === 'si') {
        const siVoice = voices.find((v) => v.lang.includes('si') || v.lang.includes('LK'));
        if (siVoice) utterance.voice = siVoice;
        utterance.lang = 'si-LK';
      } else if (lang === 'ta') {
        const taVoice = voices.find(
          (v) => v.lang.includes('ta') || v.lang.includes('IN') || v.lang.includes('LK')
        );
        if (taVoice) utterance.voice = taVoice;
        utterance.lang = 'ta-LK';
      } else {
        const enVoice =
          voices.find(
            (v) =>
              (v.name.includes('Google') || v.name.includes('Natural')) && v.lang.startsWith('en')
          ) || voices.find((v) => v.lang.startsWith('en'));
        if (enVoice) utterance.voice = enVoice;
        utterance.lang = 'en-US';
      }

      utterance.pitch = 1.06; // Warm, friendly educational tutor tone
      utterance.rate = 0.94;  // Encouraging, deliberate cadence for young learners

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
