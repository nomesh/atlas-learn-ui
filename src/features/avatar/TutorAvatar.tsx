import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TutorState } from '../../types';

interface TutorAvatarProps {
  state?: TutorState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatusLabel?: boolean;
  className?: string;
}

export const TutorAvatar: React.FC<TutorAvatarProps> = ({
  state = 'idle',
  size = 'md',
  showStatusLabel = false,
  className = '',
}) => {
  // Map states to 3D character images
  const getImageForState = (st: TutorState) => {
    switch (st) {
      case 'celebrating':
        return '/assets/tutor-celebrating.jpg';
      case 'thinking':
        return '/assets/tutor-thinking.jpg';
      case 'speaking':
        return '/assets/tutor-teaching.jpg';
      case 'listening':
      case 'encouraging':
      case 'idle':
      default:
        return '/assets/tutor-welcome.jpg';
    }
  };

  const getAuraColor = (st: TutorState) => {
    switch (st) {
      case 'celebrating':
        return 'rgba(245, 158, 11, 0.45)'; // Gold
      case 'thinking':
        return 'rgba(99, 102, 241, 0.45)'; // Indigo
      case 'speaking':
        return 'rgba(13, 148, 136, 0.45)'; // Teal
      case 'encouraging':
        return 'rgba(16, 185, 129, 0.45)'; // Emerald
      case 'listening':
      case 'idle':
      default:
        return 'rgba(14, 165, 233, 0.4)'; // Cyan
    }
  };

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
    xl: 'w-48 h-48 sm:w-56 sm:h-56',
  };

  // For small thumbnail in headers / chat messages
  if (size === 'sm') {
    return (
      <div className={`relative flex-shrink-0 ${sizeClasses.sm} ${className}`}>
        <motion.div
          className="absolute inset-0 rounded-2xl blur-sm"
          style={{ backgroundColor: getAuraColor(state) }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/80 shadow-sm bg-slate-900 flex items-center justify-center">
          <img
            src="/assets/tutor-avatar-icon.jpg"
            alt="ATLAS Tutor"
            className="w-full h-full object-cover"
          />
          {state === 'listening' && (
            <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-cyan-400 border-2 border-slate-900 rounded-full animate-ping" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <motion.div
        className={`relative ${sizeClasses[size]} flex items-center justify-center`}
        animate={
          state === 'celebrating'
            ? { y: [0, -10, 0], scale: [1, 1.05, 1] }
            : state === 'thinking'
            ? { y: [0, -4, 0], rotate: [0, 1.5, -1.5, 0] }
            : state === 'speaking'
            ? { scale: [1, 1.03, 1] }
            : { y: [0, -6, 0] }
        }
        transition={{
          duration: state === 'celebrating' ? 0.8 : 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Soft atmospheric ambient glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
          style={{ backgroundColor: getAuraColor(state) }}
          animate={{
            scale: state === 'listening' ? [1, 1.25, 1] : [1, 1.12, 1],
            opacity: [0.5, 0.85, 0.5],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Outer Orbital Intelligence Ring */}
        <svg
          viewBox="0 0 100 100"
          className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none overflow-visible"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke={state === 'celebrating' ? '#f59e0b' : '#0ea5e9'}
            strokeWidth="2.5"
            strokeDasharray="14 10"
            opacity={0.6}
            animate={{ rotate: 360 }}
            transition={{
              duration: state === 'thinking' ? 4 : 22,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </svg>

        {/* 3D Character Card with Rounded Smooth Silhouette */}
        <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden p-1 bg-gradient-to-b from-white/90 via-white/40 to-cyan-500/20 backdrop-blur-md shadow-2xl border border-white/60">
          <div className="w-full h-full rounded-[22px] overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100/90 relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={state}
                src={getImageForState(state)}
                alt="ATLAS Tutor Character"
                className="w-full h-full object-contain drop-shadow-md"
                initial={{ opacity: 0.8, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.8, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>

            {/* Speaking voice soundwave bars overlay */}
            {state === 'speaking' && (
              <div className="absolute bottom-2.5 flex items-center justify-center gap-1.5 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full shadow-lg">
                {[0, 1, 2, 3].map((bar) => (
                  <motion.div
                    key={bar}
                    className="w-1 bg-cyan-300 rounded-full"
                    animate={{ height: [4, 14, 6, 18, 4] }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      delay: bar * 0.12,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Optional Status Label */}
      {showStatusLabel && (
        <span className="mt-2 text-xs font-bold text-slate-600 uppercase tracking-wider bg-white/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-xs">
          {state}
        </span>
      )}
    </div>
  );
};
