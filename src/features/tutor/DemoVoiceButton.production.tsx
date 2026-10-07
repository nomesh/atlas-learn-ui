// Production replacement for DemoVoiceButton.tsx (aliased in vite.config.ts): LIVE has no simulated voice capture.
import type React from 'react';

export const DemoVoiceButton: React.FC<{ listening: boolean; title: string; onCapture: () => void }> = () => null;
