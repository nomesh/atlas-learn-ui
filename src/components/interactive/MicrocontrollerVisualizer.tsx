import React, { useState } from 'react';
import { Cpu, Sun, Bell, Volume2, Sparkles } from 'lucide-react';

interface MicrocontrollerVisualizerProps {
  language?: 'en' | 'si' | 'ta';
}

export const MicrocontrollerVisualizer: React.FC<MicrocontrollerVisualizerProps> = ({
  language = 'en',
}) => {
  const [lightLevel, setLightLevel] = useState<number>(30); // 0 to 100
  const [isButtonAPressed, setIsButtonAPressed] = useState<boolean>(false);
  const [isBuzzerActive, setIsBuzzerActive] = useState<boolean>(false);

  // Microcontroller logic: If light is dark (< 40), turn ON LED headlights
  const isNightMode = lightLevel < 40;

  const triggerBuzzer = () => {
    setIsBuzzerActive(true);
    setTimeout(() => setIsBuzzerActive(false), 800);
  };

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 text-white p-5 sm:p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>BBC micro:bit Physical Computing Simulator</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/80">
                Chapter 5: Physical Computing
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Input Sensors (LDR light / Buttons) ➔ Microcontroller Logic ➔ Output Actuators (5×5 LED matrix & Buzzer).
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left: Interactive Input Sensors */}
        <div className="space-y-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
          <div className="font-bold text-cyan-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Sun className="w-4 h-4" />
            <span>1. Input Sensors (Detect Environmental Changes)</span>
          </div>

          {/* Light Sensor Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span>Light Dependent Resistor (LDR):</span>
              <strong className="font-mono text-cyan-400">{lightLevel}% Ambient Light</strong>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={lightLevel}
              onChange={(e) => setLightLevel(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0% (Pitch Black Darkness)</span>
              <span>100% (Bright Noon Sunshine)</span>
            </div>
          </div>

          {/* Button A Input */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">Button A Input:</span>
              <span className="text-[11px] text-slate-400">Push button physical sensor</span>
            </div>
            <button
              type="button"
              onMouseDown={() => setIsButtonAPressed(true)}
              onMouseUp={() => setIsButtonAPressed(false)}
              className={`w-12 h-12 rounded-full font-bold text-xs border transition-all ${
                isButtonAPressed
                  ? 'bg-cyan-400 text-slate-950 scale-95 shadow-[0_0_15px_rgba(6,182,212,0.8)]'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-cyan-400'
              }`}
            >
              A
            </button>
          </div>

          {/* Manual Buzzer Trigger Button */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">Test Piezo Buzzer:</span>
              <span className="text-[11px] text-slate-400">Sound emitter actuator</span>
            </div>
            <button
              type="button"
              onClick={triggerBuzzer}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold flex items-center gap-1.5 text-xs"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Beep!</span>
            </button>
          </div>
        </div>

        {/* Right: Microcontroller Board & Output Actuators */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-emerald-500/30 flex flex-col items-center justify-between space-y-4">
          <div className="w-full flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-emerald-400 font-bold">2. Output Actuators (Physical Responses)</span>
            <span
              className={`px-2 py-0.5 rounded-full font-mono text-[10px] ${
                isBuzzerActive ? 'bg-amber-500 text-slate-950 animate-pulse' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {isBuzzerActive ? 'Buzzer: BEEPING!' : 'Buzzer: Silent'}
            </span>
          </div>

          {/* 5x5 LED Matrix Simulator */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center gap-2 shadow-inner">
            <span className="text-[10px] font-mono text-slate-400">5×5 Programmable LED Matrix</span>
            <div className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: 25 }).map((_, i) => {
                // If button A pressed: show Heart. If night mode: show Moon/Star. Otherwise Smiley!
                let isLit = false;
                if (isButtonAPressed) {
                  // Heart shape pattern
                  isLit = [1, 3, 5, 6, 7, 8, 9, 11, 12, 13, 17, 18, 19, 23].includes(i);
                } else if (isNightMode) {
                  // Moon pattern
                  isLit = [1, 2, 6, 11, 12, 16, 21, 22].includes(i);
                } else {
                  // Smiley face pattern
                  isLit = [1, 3, 6, 8, 15, 21, 22, 23, 19].includes(i);
                }

                return (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-sm transition-all duration-150 ${
                      isLit
                        ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)] scale-105'
                        : 'bg-slate-900 border border-slate-800/80'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="text-[11px] text-center text-slate-300">
            {isNightMode ? (
              <span className="text-amber-300 font-bold">
                🌙 Darkness Detected (&lt;40%): Night-Light Automatic Display Active!
              </span>
            ) : (
              <span className="text-emerald-300">
                ☀️ Daytime Detected (≥40%): Displaying Standard Happy Status Icon.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
