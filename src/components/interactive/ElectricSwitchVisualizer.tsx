import React, { useState } from 'react';
import { Zap, Cpu, Sparkles, RotateCcw } from 'lucide-react';

interface ElectricSwitchVisualizerProps {
  language?: 'en' | 'si' | 'ta';
  showByteBuilder?: boolean;
}

export const ElectricSwitchVisualizer: React.FC<ElectricSwitchVisualizerProps> = ({
  language = 'en',
  showByteBuilder = true,
}) => {
  // Single switch demo state
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(true);

  // 8-bit byte builder state: [128, 64, 32, 16, 8, 4, 2, 1]
  const bitWeights = [128, 64, 32, 16, 8, 4, 2, 1];
  const [bits, setBits] = useState<number[]>([0, 0, 0, 0, 1, 1, 0, 1]); // Default binary 00001101 = 13

  const toggleSingleSwitch = () => {
    setIsSwitchOn((prev) => !prev);
  };

  const toggleBit = (index: number) => {
    setBits((prev) => {
      const next = [...prev];
      next[index] = next[index] === 1 ? 0 : 1;
      return next;
    });
  };

  const resetBits = () => {
    setBits([0, 0, 0, 0, 0, 0, 0, 0]);
  };

  const decimalValue = bits.reduce((sum, bit, idx) => sum + bit * bitWeights[idx], 0);
  const binaryString = bits.join('');

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 text-white p-5 sm:p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs border border-cyan-500/30">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Electric Switch & Transistor Logic</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/80">
                Interactive Model
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'si'
                ? 'පරිගණකයේ ට්‍රාන්සිස්ටර ක්‍රියා කරන්නේ විදුලි ස්විචයක් ලෙසිනි: විදුලිය නැත (0) හෝ විදුලිය ඇත (1).'
                : language === 'ta'
                ? 'கணினி டிரான்சிஸ்டர்கள் மின் சுவிட்சுகளைப் போல இயங்குகின்றன: மின்சாரம் இல்லை (0) அல்லது மின்சாரம் உண்டு (1).'
                : 'Computers represent all data using microscopic transistor switches: OFF (0) or ON (1).'}
            </p>
          </div>
        </div>
      </div>

      {/* Part 1: Interactive Single Physical Switch */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Physical Voltage State:
            </span>
            <span
              className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                isSwitchOn
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {isSwitchOn ? '+3.3V (HIGH VOLTAGE)' : '0.0V (GROUND / LOW)'}
            </span>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="text-2xl font-black font-mono">
              Binary Value: <span className={isSwitchOn ? 'text-cyan-400' : 'text-slate-500'}>{isSwitchOn ? '1' : '0'}</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              ({isSwitchOn ? 'Switch Closed / Circuit Connected' : 'Switch Open / Circuit Disconnected'})
            </span>
          </div>
        </div>

        {/* Big Interactive Wall Switch Control */}
        <button
          type="button"
          onClick={toggleSingleSwitch}
          className={`relative w-28 h-14 rounded-full p-1.5 transition-all duration-300 flex items-center cursor-pointer border ${
            isSwitchOn
              ? 'bg-gradient-to-r from-emerald-600 to-cyan-500 border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.5)] justify-end'
              : 'bg-slate-800 border-slate-700 justify-start'
          }`}
          title="Click to toggle switch"
        >
          <div
            className={`w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center font-mono font-black text-sm transition-transform duration-300 ${
              isSwitchOn ? 'text-emerald-700' : 'text-slate-800'
            }`}
          >
            {isSwitchOn ? '1 ON' : '0 OFF'}
          </div>
        </button>
      </div>

      {/* Part 2: Interactive 8-Bit Binary Byte Builder */}
      {showByteBuilder && (
        <div className="space-y-3.5 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                8-Bit Binary Byte Visualizer (Powers of 2)
              </h4>
            </div>
            <button
              type="button"
              onClick={resetBits}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded-lg bg-slate-800/60"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Click on each bit to toggle its transistor state between <strong>0 (OFF)</strong> and <strong>1 (ON)</strong>. 
            Watch how the weighted place values sum to form the decimal number:
          </p>

          {/* Bits grid */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {bitWeights.map((weight, idx) => {
              const bit = bits[idx];
              const isOn = bit === 1;
              const power = 7 - idx;

              return (
                <button
                  key={weight}
                  type="button"
                  onClick={() => toggleBit(idx)}
                  className={`p-2.5 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-between gap-1 ${
                    isOn
                      ? 'bg-cyan-950/70 border-cyan-400/80 shadow-[0_0_12px_rgba(6,182,212,0.3)] text-white'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-mono text-slate-400">2^{power}</span>
                  <span className="text-xs font-bold font-mono text-cyan-300">+{weight}</span>
                  <div
                    className={`w-7 h-7 rounded-xl font-mono font-black text-sm flex items-center justify-center transition-all ${
                      isOn ? 'bg-cyan-400 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {bit}
                  </div>
                  <span className={`text-[9px] font-mono uppercase ${isOn ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {isOn ? 'ON' : 'OFF'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Live Equation Output Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="font-mono text-slate-300">
              Binary: <span className="text-cyan-300 font-bold text-base tracking-widest">{binaryString}₂</span>
            </div>
            <div className="font-mono text-slate-300">
              Calculation: {' '}
              <span className="text-slate-300 text-[11px]">
                {bits
                  .map((b, i) => (b === 1 ? bitWeights[i] : null))
                  .filter((v) => v !== null)
                  .join(' + ') || '0'}
              </span>
            </div>
            <div className="font-mono text-white text-sm font-black bg-cyan-500/20 px-3 py-1.5 rounded-xl border border-cyan-400/40 text-cyan-200">
              Decimal: = <span className="text-lg text-cyan-300">{decimalValue}₁₀</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
