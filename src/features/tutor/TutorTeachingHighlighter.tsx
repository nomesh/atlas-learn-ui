import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Pause, 
  GraduationCap, 
  Target,
  Wand2
} from 'lucide-react';
import { RichContentRenderer } from './RichContentRenderer';

interface TutorTeachingHighlighterProps {
  content: string;
  keyPoints?: string[];
  onTutorStateChange?: (state: 'idle' | 'speaking' | 'celebrating' | 'encouraging') => void;
}

export const TutorTeachingHighlighter: React.FC<TutorTeachingHighlighterProps> = ({
  content,
  keyPoints = [],
  onTutorStateChange,
}) => {
  const [isTeachingMode, setIsTeachingMode] = useState(false);
  const [activePointIndex, setActivePointIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const hasKeyPoints = keyPoints && keyPoints.length > 0;
  const currentKeyPoint = hasKeyPoints ? keyPoints[activePointIndex] : null;

  // Auto-play timer for teaching walkthrough
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTeachingMode && isAutoPlaying && hasKeyPoints) {
      timer = setInterval(() => {
        setActivePointIndex((prev) => {
          if (prev < keyPoints.length - 1) {
            return prev + 1;
          } else {
            setIsAutoPlaying(false);
            onTutorStateChange?.('celebrating');
            return 0;
          }
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isTeachingMode, isAutoPlaying, keyPoints, hasKeyPoints]);

  const handleToggleTeachingMode = () => {
    const next = !isTeachingMode;
    setIsTeachingMode(next);
    if (next) {
      setActivePointIndex(0);
      setIsAutoPlaying(true);
      onTutorStateChange?.('speaking');
    } else {
      setIsAutoPlaying(false);
      onTutorStateChange?.('idle');
    }
  };

  const handleNextPoint = () => {
    if (!hasKeyPoints) return;
    setIsAutoPlaying(false);
    if (activePointIndex < keyPoints.length - 1) {
      setActivePointIndex(activePointIndex + 1);
      onTutorStateChange?.('speaking');
    } else {
      setActivePointIndex(0);
      onTutorStateChange?.('celebrating');
    }
  };

  const handlePrevPoint = () => {
    if (!hasKeyPoints) return;
    setIsAutoPlaying(false);
    if (activePointIndex > 0) {
      setActivePointIndex(activePointIndex - 1);
    } else {
      setActivePointIndex(keyPoints.length - 1);
    }
  };

  const handleSelectPoint = (idx: number) => {
    setIsTeachingMode(true);
    setIsAutoPlaying(false);
    setActivePointIndex(idx);
    onTutorStateChange?.('speaking');
  };

  // Enhance content by highlighting the currently active key point if teaching mode is on
  const renderHighlightedContent = () => {
    if (!isTeachingMode || !currentKeyPoint) {
      return <RichContentRenderer content={content} />;
    }

    // Extract raw keyword for highlighting (strip parentheses or extra notes)
    const rawTerm = currentKeyPoint.split('(')[0].trim();
    if (!rawTerm || rawTerm.length < 3) {
      return <RichContentRenderer content={content} />;
    }

    // Split content safely around the keyword
    const regex = new RegExp(`(${escapeRegExp(rawTerm)})`, 'gi');
    const parts = content.split(regex);

    // If keyword isn't directly matched in markdown text, fallback to regular renderer
    if (parts.length <= 1) {
      return <RichContentRenderer content={content} />;
    }

    return (
      <div className="space-y-2.5 text-sm text-slate-800 leading-relaxed break-words">
        {content.split('\n').map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1" />;

          // Check if this line contains the keyword
          if (regex.test(trimmed)) {
            const lineParts = trimmed.split(regex);
            return (
              <p key={idx} className="p-1 rounded-xl bg-amber-50/70 border-l-4 border-amber-400 pl-3.5 transition-all">
                {lineParts.map((sub, sIdx) => {
                  if (sub.toLowerCase() === rawTerm.toLowerCase()) {
                    return (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-200 text-slate-950 font-extrabold shadow-sm ring-2 ring-amber-400/80 animate-pulse scale-105 mx-1"
                      >
                        <Wand2 className="w-3.5 h-3.5 text-amber-800" />
                        <span>{sub}</span>
                      </span>
                    );
                  }
                  return <span key={sIdx}>{sub}</span>;
                })}
              </p>
            );
          }

          // Otherwise render regular markdown line
          return <RichContentRenderer key={idx} content={line} />;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {/* Teaching Mode Banner & Key Concept Chips */}
      {hasKeyPoints && (
        <div className="p-3 rounded-2xl bg-gradient-to-r from-slate-50 via-sky-50 to-teal-50 border border-sky-200/70 space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleToggleTeachingMode}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                isTeachingMode
                  ? 'bg-atlas-blue text-white shadow-md'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>{isTeachingMode ? 'Teaching Walkthrough Active' : 'Teach Step-by-Step'}</span>
            </button>

            {isTeachingMode && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    isAutoPlaying ? 'bg-amber-400 text-slate-900' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                  title={isAutoPlaying ? 'Pause auto walkthrough' : 'Auto play through points'}
                >
                  {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span className="text-[10px] hidden sm:inline">{isAutoPlaying ? 'Pause' : 'Auto'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrevPoint}
                  className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"
                  title="Previous concept"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <span className="text-[10px] font-mono font-bold text-slate-600 px-1.5">
                  {activePointIndex + 1}/{keyPoints.length}
                </span>

                <button
                  type="button"
                  onClick={handleNextPoint}
                  className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"
                  title="Next concept"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Key Points Horizontal Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
              <Target className="w-3 h-3 text-cyan-600" />
              <span>Key Points:</span>
            </span>
            {keyPoints.map((point, pIdx) => {
              const isActive = isTeachingMode && pIdx === activePointIndex;
              return (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => handleSelectPoint(pIdx)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 flex-shrink-0 ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold ring-2 ring-amber-300 shadow-sm scale-105'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {isActive && <Wand2 className="w-3 h-3 text-slate-950 animate-spin" />}
                  <span>{point}</span>
                </button>
              );
            })}
          </div>

          {/* Active pointer message banner */}
          {isTeachingMode && currentKeyPoint && (
            <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-100/80 border border-amber-300 text-xs text-amber-950 animate-in fade-in">
              <span className="text-sm">👉</span>
              <span>
                <strong>Tutor Focus:</strong> Explaining <strong>"{currentKeyPoint}"</strong>. Notice where this term appears below!
              </span>
            </div>
          )}
        </div>
      )}

      {/* Main Content Area */}
      {renderHighlightedContent()}
    </div>
  );
};

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
