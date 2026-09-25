import React, { useState } from 'react';
import { Play, RotateCcw, Code, Sparkles } from 'lucide-react';

interface ScratchBlockVisualizerProps {
  language?: 'en' | 'si' | 'ta';
}

export const ScratchBlockVisualizer: React.FC<ScratchBlockVisualizerProps> = ({
  language = 'en',
}) => {
  const [repeatCount, setRepeatCount] = useState<number>(4);
  const [stepDistance, setStepDistance] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [drawnSides, setDrawnSides] = useState<number>(4);

  const runScript = () => {
    setIsRunning(true);
    setDrawnSides(0);

    let side = 0;
    const interval = setInterval(() => {
      side += 1;
      setDrawnSides(side);
      if (side >= repeatCount) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 400);
  };

  const resetCanvas = () => {
    setDrawnSides(0);
    setIsRunning(false);
  };

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 text-white p-5 sm:p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Code className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Scratch Visual Block Simulator</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/80">
                Chapter 4: Programming
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Interactive block execution: Observe how repeating loops and rotation angles draw shapes on the stage.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={runScript}
          disabled={isRunning}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>{isRunning ? 'Running...' : 'Run Green Flag'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Scratch Block Stack */}
        <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono select-none">
          {/* Green flag event block */}
          <div className="bg-[#4c97ff] text-white px-3 py-2 rounded-t-xl rounded-b-md shadow-sm border-b-2 border-[#3373cc] flex items-center gap-2">
            <span>⚑ when green flag clicked</span>
          </div>

          {/* Repeat loop container block */}
          <div className="bg-[#ffab19] text-white p-2.5 rounded-xl shadow-sm border-b-2 border-[#cf8b17] space-y-2">
            <div className="flex items-center gap-1.5">
              <span>repeat</span>
              <input
                type="number"
                min={3}
                max={8}
                value={repeatCount}
                onChange={(e) => setRepeatCount(Math.min(8, Math.max(3, Number(e.target.value))))}
                className="w-12 bg-white text-slate-900 px-1.5 py-0.5 rounded text-center font-bold"
              />
              <span>times</span>
            </div>

            {/* Nested blocks */}
            <div className="pl-4 space-y-1.5 border-l-4 border-amber-300/60 my-1">
              <div className="bg-[#4c97ff] text-white px-2.5 py-1.5 rounded-md shadow-xs flex items-center gap-1.5">
                <span>move</span>
                <span className="bg-white text-slate-900 px-1 rounded font-bold">{stepDistance}</span>
                <span>steps</span>
              </div>
              <div className="bg-[#4c97ff] text-white px-2.5 py-1.5 rounded-md shadow-xs flex items-center gap-1.5">
                <span>turn ↻</span>
                <span className="bg-white text-slate-900 px-1 rounded font-bold">
                  {Math.round(360 / repeatCount)}°
                </span>
                <span>degrees</span>
              </div>
            </div>

            <div className="text-[10px] text-amber-200">end loop</div>
          </div>
        </div>

        {/* Right: Stage Canvas Preview */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 flex flex-col items-center justify-between min-h-[160px]">
          <div className="flex items-center justify-between w-full text-[11px] text-slate-400">
            <span>Stage Coordinates (X: 0, Y: 0)</span>
            <span className="text-cyan-400 font-mono">
              Sides Drawn: {drawnSides} / {repeatCount}
            </span>
          </div>

          {/* SVG Shape Drawing based on drawnSides */}
          <div className="w-36 h-36 relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Reference coordinate grid */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeDasharray="2,2" />
              {repeatCount === 4 && (
                <rect
                  x="25"
                  y="25"
                  width="50"
                  height="50"
                  fill="rgba(6,182,212,0.15)"
                  stroke="#06b6d4"
                  strokeWidth="3"
                  strokeDasharray={drawnSides >= 4 ? 'none' : `${drawnSides * 50} 200`}
                  className="transition-all duration-300"
                />
              )}
              {repeatCount !== 4 && (
                <polygon
                  points="50,15 85,75 15,75"
                  fill="rgba(245,158,11,0.15)"
                  stroke="#f59e0b"
                  strokeWidth="3"
                />
              )}
            </svg>
            <div className="absolute font-bold text-xs text-white bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-700">
              {drawnSides >= repeatCount ? 'Shape Complete!' : `Drawing Side ${drawnSides}...`}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center">
            {repeatCount === 4
              ? '4 repetitions × 90° turn = 360° closed Square!'
              : `${repeatCount} repetitions × ${Math.round(360 / repeatCount)}° turn = 360° closed Polygon!`}
          </div>
        </div>
      </div>
    </div>
  );
};
