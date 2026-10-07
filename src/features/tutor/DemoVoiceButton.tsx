// MOCK-only (GitHub Pages demo) microphone: simulates a speech capture. Real production builds replace this module
// with DemoVoiceButton.production.tsx (vite.config.ts), so no simulated voice behaviour ships in LIVE.
import React from 'react';
import { Mic } from 'lucide-react';

export const DemoVoiceButton: React.FC<{ listening: boolean; title: string; onCapture: () => void }> = ({
  listening,
  title,
  onCapture,
}) => (
  <button
    type="button"
    onClick={onCapture}
    data-testid="voice-input-demo"
    className={`p-2 rounded-xl transition-all ${
      listening ? 'bg-rose-500 text-white animate-pulse' : 'hover:text-slate-600 hover:bg-slate-200/60'
    }`}
    title={title}
  >
    <Mic className="w-4 h-4" />
  </button>
);
