import React from 'react';
import { Mic } from 'lucide-react';
import type { Language } from '../../types';
import { DemoVoiceButton } from './DemoVoiceButton';

/** LIVE: voice input is not available (speech recognition is not implemented or verified). */
export const VOICE_INPUT_UNAVAILABLE_TEXT: Record<Language, string> = {
  en: 'Voice input is not available yet. Please type your question.',
  si: 'හඬ ආදානය තවම ලබා ගත නොහැක. කරුණාකර ඔබේ ප්‍රශ්නය ටයිප් කරන්න.',
  ta: 'குரல் உள்ளீடு இன்னும் கிடைக்கவில்லை. உங்கள் கேள்வியைத் தட்டச்சு செய்யவும்.',
};

/**
 * Microphone control. The Pages demo (MOCK) simulates a capture; LIVE renders a disabled control with an
 * accessible explanation and never inserts text the learner did not type.
 */
export const VoiceInputButton: React.FC<{
  live: boolean;
  listening: boolean;
  language: Language;
  demoTitle: string;
  onDemoCapture: () => void;
}> = ({ live, listening, language, demoTitle, onDemoCapture }) => {
  if (live) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        data-testid="voice-input-unavailable"
        aria-label={VOICE_INPUT_UNAVAILABLE_TEXT[language]}
        title={VOICE_INPUT_UNAVAILABLE_TEXT[language]}
        className="p-2 rounded-xl text-slate-300 cursor-not-allowed"
      >
        <Mic className="w-4 h-4" aria-hidden="true" />
      </button>
    );
  }
  return <DemoVoiceButton listening={listening} title={demoTitle} onCapture={onDemoCapture} />;
};
