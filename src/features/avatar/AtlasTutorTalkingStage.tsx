import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  X, 
  Minimize2, 
  Maximize2, 
  Sparkles, 
  Lightbulb, 
  Radio
} from 'lucide-react';
import type { Language, TutorState } from '../../types';

interface AtlasTutorTalkingStageProps {
  isOpen: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  title?: string;
  concept?: string;
  spokenText?: string;
  currentWord?: string;
  language?: Language;
  onPause: () => void;
  onResume: () => void;
  onReplay: () => void;
  onClose: () => void;
  tutorState?: TutorState;
}

export const AtlasTutorTalkingStage: React.FC<AtlasTutorTalkingStageProps> = ({
  isOpen,
  isSpeaking,
  isPaused,
  isCompleted,
  title = 'Atlas AI Tutor',
  concept = 'Curriculum Voice Narration',
  spokenText = '',
  currentWord = '',
  onPause,
  onResume,
  onReplay,
  onClose,
  tutorState = 'speaking',
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  // Select appropriate 3D character image
  const getAvatarImage = () => {
    if (isCompleted || tutorState === 'celebrating') {
      return '/assets/tutor-celebrating.jpg';
    }
    if (isSpeaking) {
      return '/assets/tutor-teaching.jpg';
    }
    if (isPaused) {
      return '/assets/tutor-thinking.jpg';
    }
    return '/assets/tutor-welcome.jpg';
  };

  // Minimized Compact Floating Bubble View
  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="relative group p-1.5 rounded-full bg-slate-950/90 border-2 border-cyan-400 shadow-2xl backdrop-blur-xl flex items-center gap-3 pr-4 hover:scale-105 transition-all"
          title="Click to expand Atlas Tutor talking stage"
        >
          {/* Animated Sonic Ring */}
          {isSpeaking && (
            <span className="absolute -inset-1 rounded-full bg-cyan-400/40 animate-ping" />
          )}

          <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/40 shadow-inner bg-slate-900 flex-shrink-0">
            <img
              src={getAvatarImage()}
              alt="Atlas Tutor"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-left min-w-0">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                {isSpeaking ? 'Speaking...' : isPaused ? 'Paused' : 'Tutor Voice'}
              </span>
            </div>
            <p className="text-xs font-bold text-white truncate max-w-[140px]">
              {title}
            </p>
          </div>

          <Maximize2 className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors ml-1" />
        </button>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all shadow-lg"
          title="Close voice narration"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  // Full Expanded Talking Stage View
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.92 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[460px] max-w-[500px]"
      >
        <div className="relative rounded-3xl bg-slate-950/95 border-2 border-cyan-500/50 p-4 sm:p-5 shadow-[0_20px_60px_-15px_rgba(6,182,212,0.35)] backdrop-blur-2xl text-white overflow-hidden">
          {/* Ambient Cosmic Radial Glows */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Control Bar */}
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800/80 relative z-20">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                <Radio className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse text-cyan-300' : 'text-slate-400'}`} />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-cyan-400">
                    Atlas Live Tutor Audio
                  </span>
                  <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-100 truncate">
                  {concept || title}
                </h4>
              </div>
            </div>

            {/* Stage Window Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Minimize stage"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-300 transition-colors"
                title="Close voice narration"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Stage: Reasonably Large Animated Atlas Tutor Character */}
          <div className="flex flex-col items-center justify-center my-3 sm:my-4 relative z-10">
            {/* Concentric Sonic Wave Ripples when speaking */}
            {isSpeaking && (
              <>
                <motion.div
                  className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border-2 border-cyan-400/30 pointer-events-none"
                  animate={{ scale: [1, 1.45, 1.7], opacity: [0.7, 0.3, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-teal-400/20 pointer-events-none"
                  animate={{ scale: [1, 1.35, 1.55], opacity: [0.5, 0.2, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: 0.7, ease: 'easeOut' }}
                />
              </>
            )}

            {/* Multi-Axis Rhythmic Speaking Movement Character Container */}
            <motion.div
              className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center"
              animate={
                isSpeaking
                  ? {
                      y: [0, -8, -2, -6, 0],
                      rotate: [-1.5, 1.5, -1, 1.2, 0],
                      scale: [1, 1.025, 0.995, 1.02, 1],
                    }
                  : isCompleted
                  ? {
                      y: [0, -12, 0],
                      scale: [1, 1.06, 1],
                    }
                  : { y: [0, -3, 0] }
              }
              transition={{
                duration: isSpeaking ? 1.6 : isCompleted ? 0.9 : 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Outer Orbital Rotating Ring */}
              <svg
                viewBox="0 0 100 100"
                className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] pointer-events-none overflow-visible"
              >
                <motion.circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke={isCompleted ? '#f59e0b' : isSpeaking ? '#06b6d4' : '#64748b'}
                  strokeWidth="2.5"
                  strokeDasharray="16 12"
                  opacity={0.7}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: isSpeaking ? 8 : 25,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </svg>

              {/* 3D Character Framing Box with Neon Gradient Border */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden p-1.5 bg-gradient-to-b from-cyan-400/80 via-teal-500/40 to-indigo-600/70 shadow-2xl">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-900 relative flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={getAvatarImage()}
                      src={getAvatarImage()}
                      alt="Atlas Tutor Talking Character"
                      className="w-full h-full object-contain drop-shadow-2xl"
                      initial={{ opacity: 0.85, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.85, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                    />
                  </AnimatePresence>

                  {/* Talking Overlay Lighting Badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-[10px] font-bold font-mono text-cyan-300 flex items-center gap-1 shadow-sm">
                    <span className={`w-1.5 h-1.5 rounded-full ${isSpeaking ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                    <span>{isSpeaking ? 'TEACHING' : isCompleted ? 'CELEBRATING' : 'PAUSED'}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 8-Band Dynamic Jumping Audio Equalizer Spectrum */}
            <div className="flex items-center justify-center gap-1.5 mt-3 py-1 px-4 rounded-full bg-slate-900/90 border border-slate-800 shadow-inner">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((bar) => (
                <motion.div
                  key={bar}
                  className={`w-1.5 rounded-full ${
                    bar % 2 === 0 ? 'bg-gradient-to-t from-cyan-500 to-teal-300' : 'bg-gradient-to-t from-amber-400 to-yellow-300'
                  }`}
                  animate={
                    isSpeaking
                      ? {
                          height: [
                            4,
                            14 + (bar % 3) * 6,
                            6,
                            22 - (bar % 2) * 8,
                            4,
                          ],
                        }
                      : { height: 4 }
                  }
                  transition={{
                    duration: 0.65,
                    repeat: Infinity,
                    delay: bar * 0.08,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Live Dynamic Speech Balloon with Spoken Words / Rhyme */}
          <div className="relative z-10 bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-3 sm:p-3.5 space-y-1.5 shadow-inner">
            <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300">
              <span className="flex items-center gap-1 font-bold">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Live Audio Transcript:</span>
              </span>
              {currentWord && isSpeaking && (
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 text-[10px] font-bold animate-pulse">
                  Word: {currentWord}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed max-h-24 overflow-y-auto pr-1">
              {spokenText || 'Listening to Atlas Tutor interactive curriculum lesson...'}
            </p>
          </div>

          {/* Bottom Interactive Playback Controls */}
          <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800/80 relative z-20">
            <div className="flex items-center gap-2">
              {isSpeaking ? (
                <button
                  type="button"
                  onClick={onPause}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                >
                  <VolumeX className="w-4 h-4" />
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onResume}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isCompleted ? 'Play Again' : 'Resume'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={onReplay}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-semibold text-xs transition-all flex items-center gap-1"
                title="Replay from beginning"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Replay</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-red-950/60 text-slate-400 hover:text-red-300 border border-slate-800 hover:border-red-500/30 text-xs font-semibold transition-all"
            >
              Stop Voice
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
