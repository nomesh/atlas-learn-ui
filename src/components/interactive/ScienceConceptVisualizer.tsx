import React, { useState } from 'react';
import {
  Activity,
  Zap,
  Flame,
  Layers,
  Gauge,
  Sliders,
  Sparkles,
  Shield,
  RotateCcw,
  CheckCircle2,
  Scale,
  Droplets
} from 'lucide-react';

import { ReactionRateVisualizer } from './ReactionRateVisualizer';
import { CellExplorer } from './CellExplorer';

interface ScienceVisualizerProps {
  topicId: string;
  language?: 'en' | 'si' | 'ta';
  activeModeHint?: string;
}

export function getScienceVisualizerKey(topicId: string, activeModeHint?: string): string | null {
  const raw = `${topicId} ${activeModeHint || ''}`.toLowerCase();
  if (raw.includes('ch2-motion') || raw.includes('motion') || raw.includes('velocity') || raw.includes('චලිතය') || raw.includes('இயக்கம்')) return 'motion';
  if (raw.includes('ch3-structure-of-matter') || raw.includes('structure-of-matter') || raw.includes('electron') || raw.includes('isotope') || raw.includes('පදාර්ථයේ ව්‍යුහය')) return 'structure-of-matter';
  if (raw.includes('ch4-newton') || raw.includes('newton') || raw.includes('f=ma') || raw.includes('නිව්ටන්') || raw.includes('நியூட்டன்')) return 'newtons-laws';
  if (raw.includes('ch6-cell') || raw.includes('cell') || raw.includes('organelle') || raw.includes('සෛල') || raw.includes('கலம்')) return 'cells';
  if (raw.includes('ch10-chemical-bonds') || raw.includes('bond') || raw.includes('ionic') || raw.includes('covalent') || raw.includes('බන්ධන')) return 'chemical-bonds';
  if (raw.includes('ch14') || raw.includes('continuity') || raw.includes('mitosis') || raw.includes('meiosis') || raw.includes('cell-division') || raw.includes('අඛණ්ඩතාව') || raw.includes('සෛල බෙදීම') || raw.includes('අනුනන') || raw.includes('ඌනන') || raw.includes('கலப்பிரிவு') || raw.includes('இழையுருப்பிரிவு') || raw.includes('ஒடுக்கற்பிரிவு')) return 'cell-division';
  if (raw.includes('ch15-hydrostatic') || raw.includes('hydrostatic') || raw.includes('pressure') || raw.includes('pascal') || raw.includes('පීඩනය') || raw.includes('ද්‍රවස්ථිතික') || raw.includes('அமுக்கம்')) return 'hydrostatic-pressure';
  if (raw.includes('ch17-rate-of-reactions') || raw.includes('rate-of-reaction') || raw.includes('rate-reactions') || raw.includes('collision') || raw.includes('සීඝ්‍රතාව')) return 'rate-reactions';
  if (raw.includes('ch19-current-electricity') || raw.includes('ohm') || raw.includes('circuit') || raw.includes('විද්‍යුතය') || raw.includes('மின்னோட்டம்')) return 'current-electricity';
  if (raw.includes('ch20-inheritance') || raw.includes('mendel') || raw.includes('gene') || raw.includes('පාරම්පරිකතාව') || raw.includes('பரம்பரை')) return 'inheritance';

  return null;
}

export const ScienceConceptVisualizer: React.FC<ScienceVisualizerProps> = ({
  topicId,
  language = 'en',
  activeModeHint,
}) => {
  const normalizedKey = React.useMemo(() => {
    return getScienceVisualizerKey(topicId, activeModeHint);
  }, [topicId, activeModeHint]);

  // Motion State
  const [initialVel, setInitialVel] = useState<number>(0);
  const [accel, setAccel] = useState<number>(2);
  const [timeSec, setTimeSec] = useState<number>(5);
  const finalVel = initialVel + accel * timeSec;
  const displacement = (initialVel * timeSec + 0.5 * accel * timeSec * timeSec).toFixed(1);

  // Newton State
  const [forceN, setForceN] = useState<number>(40);
  const [massKg, setMassKg] = useState<number>(5);
  const calcAccel = (forceN / massKg).toFixed(2);

  // Pressure State
  const [fluidDepth, setFluidDepth] = useState<number>(10); // meters
  const [liquidDensity, setLiquidDensity] = useState<number>(1000); // kg/m^3 (water = 1000)
  const pressureKPa = ((fluidDepth * liquidDensity * 10) / 1000).toFixed(1);

  // Electricity State
  const [volt, setVolt] = useState<number>(12);
  const [res, setRes] = useState<number>(4);
  const currentI = (volt / res).toFixed(2);
  const powerW = (volt * Number(currentI)).toFixed(1);

  // Chemical Bonds & Structure of Matter State
  const [bondType, setBondType] = useState<'ionic' | 'covalent'>('ionic');
  const [transferred, setTransferred] = useState<boolean>(false);
  const [covalentOverlap, setCovalentOverlap] = useState<number>(65);

  // Inheritance State (Mendel's monohybrid cross)
  const [parent1, setParent1] = useState<'Tt'>('Tt');
  const [parent2, setParent2] = useState<'Tt'>('Tt');

  // Cell Division State (Mitosis vs Meiosis)
  const [divisionType, setDivisionType] = useState<'mitosis' | 'meiosis'>('mitosis');
  const [divisionStage, setDivisionStage] = useState<number>(2);

  if (!normalizedKey) {
    return null;
  }

  return (
    <div className="space-y-4 text-slate-100">
      {/* 1. LINEAR MOTION */}
      {normalizedKey === 'motion' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Motion Parameters (v = u + at)</h4>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Initial Velocity (u):</span>
                <span className="font-bold text-cyan-400">{initialVel} m/s</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={initialVel}
                onChange={(e) => setInitialVel(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Acceleration (a):</span>
                <span className="font-bold text-amber-400">{accel} m/s²</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={accel}
                onChange={(e) => setAccel(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Time Duration (t):</span>
                <span className="font-bold text-emerald-400">{timeSec} s</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={timeSec}
                onChange={(e) => setTimeSec(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div className="text-sky-300 font-bold">1. Final Velocity: v = u + at</div>
              <div className="text-slate-300">= {initialVel} + ({accel} × {timeSec}) = <span className="text-cyan-400 font-bold">{finalVel} m/s</span></div>
              <div className="text-amber-300 font-bold pt-1 border-t border-slate-800">2. Displacement: s = ut + ½at²</div>
              <div className="text-slate-300">= ({initialVel}×{timeSec}) + ½({accel})({timeSec}²) = <span className="text-emerald-400 font-bold text-sm">{displacement} m</span></div>
            </div>
          </div>
        </div>
      )}

      {/* 2. NEWTON'S LAWS & FORCES */}
      {normalizedKey === 'newtons-laws' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Newton's 2nd Law: F = ma</h4>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Unbalanced Force (F):</span>
                <span className="font-bold text-cyan-400">{forceN} N</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={forceN}
                onChange={(e) => setForceN(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Mass of Object (m):</span>
                <span className="font-bold text-amber-400">{massKg} kg</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={massKg}
                onChange={(e) => setMassKg(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2 flex flex-col justify-center">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold">Acceleration Formula: a = F / m</div>
              <div className="text-slate-300">= {forceN} N / {massKg} kg</div>
              <div className="text-emerald-400 font-bold text-lg pt-1 border-t border-slate-800">
                Acceleration (a) = {calcAccel} m/s²
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. HYDROSTATIC PRESSURE */}
      {normalizedKey === 'hydrostatic-pressure' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Fluid Pressure: P = hρg</h4>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Depth (h):</span>
                <span className="font-bold text-cyan-400">{fluidDepth} m</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={fluidDepth}
                onChange={(e) => setFluidDepth(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Fluid Density (ρ):</span>
                <span className="font-bold text-amber-400">{liquidDensity} kg/m³</span>
              </div>
              <input
                type="range"
                min="800"
                max="1400"
                step="50"
                value={liquidDensity}
                onChange={(e) => setLiquidDensity(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2 flex flex-col justify-center">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold">Liquid Pressure at Depth h:</div>
              <div className="text-slate-300">= {fluidDepth} m × {liquidDensity} kg/m³ × 10 m/s²</div>
              <div className="text-emerald-400 font-bold text-lg pt-1 border-t border-slate-800">
                P = {pressureKPa} kPa
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CURRENT ELECTRICITY */}
      {normalizedKey === 'current-electricity' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Ohm's Law: V = IR</h4>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Voltage (V):</span>
                <span className="font-bold text-cyan-400">{volt} V</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                step="1"
                value={volt}
                onChange={(e) => setVolt(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Resistance (R):</span>
                <span className="font-bold text-amber-400">{res} Ω</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={res}
                onChange={(e) => setRes(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2 flex flex-col justify-center">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold">1. Current: I = V / R</div>
              <div className="text-emerald-400 font-bold text-base">= {volt}V / {res}Ω = {currentI} A</div>
              <div className="text-amber-300 font-bold pt-1 border-t border-slate-800">2. Electric Power: P = VI</div>
              <div className="text-slate-300">= {volt}V × {currentI}A = <span className="text-amber-400 font-bold">{powerW} W</span></div>
            </div>
          </div>
        </div>
      )}

      {/* 5. PLANT & ANIMAL CELLS (modular Cell Explorer) */}
      {normalizedKey === 'cells' && <CellExplorer language={language} />}

      {/* STRUCTURE OF MATTER (ATOMIC STRUCTURE & BOHR ELECTRON CONFIGURATION) */}
      {normalizedKey === 'structure-of-matter' && (
        <div className="space-y-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
              <span className="font-semibold text-rose-300">Atomic Structure & Electron Shell Configuration</span>
              <span className="font-mono text-[11px] text-cyan-300">Grade 10 Science Chapter 3</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-center gap-4 py-3">
              {/* Sodium Atom / Ion */}
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  {/* Shell 3 (Outer) - disappears when transferred */}
                  {!transferred && (
                    <div className="absolute inset-0 rounded-full border border-dashed border-amber-400/60 animate-pulse">
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/80" title="1 Valence Electron" />
                    </div>
                  )}
                  {/* Shell 2 (8 electrons) */}
                  <div className="absolute inset-2 rounded-full border border-cyan-400/40" />
                  {/* Shell 1 (2 electrons) */}
                  <div className="absolute inset-5 rounded-full border border-cyan-400/30" />
                  {/* Nucleus */}
                  <div className={`w-12 h-12 rounded-full flex flex-col items-center justify-center text-xs font-bold transition-all shadow-md ${
                    transferred ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-400/30' : 'bg-cyan-950 border border-cyan-400 text-cyan-200'
                  }`}>
                    <span>Na</span>
                    <span className="text-[9px] font-mono">{transferred ? '+1' : '11p'}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-200 mt-2">
                  {transferred ? 'Sodium Cation (Na⁺)' : 'Sodium Atom (Na)'}
                </span>
                <span className="text-[10px] text-cyan-400 font-mono">
                  Config: {transferred ? '[2, 8]⁺ (Stable Octet)' : '2, 8, 1 (Unstable)'}
                </span>
              </div>

              {/* Transfer Action Center */}
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <button
                  type="button"
                  onClick={() => setTransferred(!transferred)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-lg flex items-center gap-1.5 ${
                    transferred 
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700' 
                      : 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white shadow-rose-500/25 animate-bounce'
                  }`}
                >
                  {transferred ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Reaction</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Transfer 1 e⁻ ➔</span>
                    </>
                  )}
                </button>
                <span className="text-[11px] text-slate-400 max-w-[130px] leading-tight">
                  {transferred 
                    ? 'Strong electrostatic attraction binds Na⁺ and Cl⁻ into NaCl crystal lattice!' 
                    : 'Sodium donates its lone 3s¹ valence electron to Chlorine.'}
                </span>
              </div>

              {/* Chlorine Atom / Ion */}
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-900/60 border border-emerald-500/20">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  {/* Shell 3 (7 electrons, gets 8th) */}
                  <div className={`absolute inset-0 rounded-full border transition-all ${
                    transferred ? 'border-emerald-400/80 ring-2 ring-emerald-400/20' : 'border-dashed border-emerald-400/40'
                  }`}>
                    {transferred && (
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-md shadow-amber-400" title="Gained Electron from Na!" />
                    )}
                  </div>
                  {/* Shell 2 (8 electrons) */}
                  <div className="absolute inset-2 rounded-full border border-emerald-400/30" />
                  {/* Shell 1 (2 electrons) */}
                  <div className="absolute inset-5 rounded-full border border-emerald-400/20" />
                  {/* Nucleus */}
                  <div className={`w-12 h-12 rounded-full flex flex-col items-center justify-center text-xs font-bold transition-all shadow-md ${
                    transferred ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-400/30' : 'bg-emerald-950 border border-emerald-400 text-emerald-200'
                  }`}>
                    <span>Cl</span>
                    <span className="text-[9px] font-mono">{transferred ? '-1' : '17p'}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-200 mt-2">
                  {transferred ? 'Chloride Anion (Cl⁻)' : 'Chlorine Atom (Cl)'}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  Config: {transferred ? '[2, 8, 8]⁻ (Stable Octet)' : '2, 8, 7 (Needs 1 e⁻)'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-semibold">Subatomic & Octet Principle:</span>
                <span className="font-mono text-cyan-300 font-bold">2Na (s) + Cl₂ (g) ➔ 2NaCl (s)</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {language === 'si'
                  ? 'සෝඩියම් පරමාණුව (පරමාණුක ක්‍රමාංකය 11, ඉලෙක්ට්‍රෝන වින්‍යාසය 2,8,1) සිය බාහිර ඉලෙක්ට්‍රෝනය ක්ලෝරීන් (17: 2,8,7) වෙත පරිත්‍යාග කර ස්ථායී අෂ්ටක වින්‍යාසයක් සාදයි.'
                  : language === 'ta'
                  ? 'சோடியம் அணு (அணுவெண் 11, இலத்திரன் நிலைமை 2,8,1) தனது ஈற்றோட்டு இலத்திரனை குளோரினுக்கு (17: 2,8,7) வழங்கி நிலைபேறான அட்டம அமைப்பைப் பெறுகிறது.'
                  : 'Sodium (Atomic No. 11, config 2,8,1) transfers its single 3s valence electron to Chlorine (Atomic No. 17, config 2,8,7), enabling both ions to achieve noble gas stable octet configurations [2,8]⁺ and [2,8,8]⁻.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 6. CHEMICAL BONDS */}
      {normalizedKey === 'chemical-bonds' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setBondType('ionic'); setTransferred(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                bondType === 'ionic' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Ionic Bonding (NaCl)
            </button>
            <button
              type="button"
              onClick={() => { setBondType('covalent'); setTransferred(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                bondType === 'covalent' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Covalent Bonding (H₂O)
            </button>
          </div>
          {bondType === 'ionic' ? (
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3">
              <div className="flex justify-between items-center text-slate-400">
                <span className="font-semibold text-amber-300">Ionic Electron Transfer (Na ➔ Cl)</span>
                <span className="font-mono text-[11px] text-cyan-300">Grade 10 Chapter 10</span>
              </div>
              <p className="text-slate-300">Sodium (Na: 2,8,1) donates 1 valence electron to Chlorine (Cl: 2,8,7) to form stable ions Na⁺ and Cl⁻ held by electrostatic attraction.</p>
            </div>
          ) : (
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3">
              <div className="flex justify-between items-center text-slate-400">
                <span className="font-semibold text-cyan-300">Covalent Orbital Overlap (H₂O)</span>
                <span className="font-mono text-sky-400 font-bold">{covalentOverlap}% Overlap</span>
              </div>
              <div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={covalentOverlap}
                  onChange={(e) => setCovalentOverlap(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
              <p className="text-slate-300">Oxygen shares two pairs of electrons with two Hydrogen atoms, forming stable covalent single bonds with full outer electron shells.</p>
            </div>
          )}
        </div>
      )}

      {/* RATE OF REACTIONS (PARTICLE COLLISION THEORY) */}
      {normalizedKey === 'rate-reactions' && (
        <ReactionRateVisualizer language={language} standalone={false} />
      )}

      {/* 8. CELL DIVISION & CONTINUITY OF LIFE (MITOSIS VS MEIOSIS) */}
      {normalizedKey === 'cell-division' && (
        <div className="space-y-4">
          {/* Header Controls: Division Type Selector & Stage Stepper */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDivisionType('mitosis')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    divisionType === 'mitosis'
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {language === 'si' ? 'අනුනන විභාජනය (Mitosis)' : language === 'ta' ? 'இழையுருப்பிரிவு (Mitosis)' : 'Mitosis (Equational)'}
                </button>
                <button
                  type="button"
                  onClick={() => setDivisionType('meiosis')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    divisionType === 'meiosis'
                      ? 'bg-purple-500 text-white shadow-md font-extrabold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {language === 'si' ? 'ඌනන විභාජනය (Meiosis)' : language === 'ta' ? 'ஒடுக்கற்பிரிவு (Meiosis)' : 'Meiosis (Reductional)'}
                </button>
              </div>

              <span className="text-[11px] font-mono text-cyan-300">
                {divisionType === 'mitosis' ? '2n ➔ 2n (2 Cells)' : '2n ➔ n (4 Cells)'}
              </span>
            </div>

            {/* Stages Stepper */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 0, en: '1. Interphase', si: '1. අන්තර්කලාව', ta: '1. இடைக்கலாவத்தை' },
                { id: 1, en: '2. Prophase', si: '2. ප්‍රාක්කලාව', ta: '2. முன்கலாவத்தை' },
                { id: 2, en: '3. Metaphase', si: '3. මධ්‍යකලාව', ta: '3. மத்தியகலாவத்தை' },
                { id: 3, en: '4. Anaphase', si: '4. අපකලාව', ta: '4. பின்கலாவத்தை' },
                { id: 4, en: '5. Telophase', si: '5. අන්තකලාව', ta: '5. இறுதிக்கலாவத்தை' },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setDivisionStage(st.id)}
                  className={`flex-1 min-w-[100px] py-1.5 px-2 rounded-xl text-xs font-bold text-center transition-all ${
                    divisionStage === st.id
                      ? divisionType === 'mitosis'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-400/50 shadow-sm'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {st[language] || st.en}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Cell Canvas / Visual Stage Representation */}
          <div className="p-5 bg-gradient-to-b from-slate-950 to-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>
                  {divisionStage === 0 && (language === 'si' ? 'අන්තර්කලාව: DNA ප්‍රතිවලිත වීම සහ සෛල වර්ධනය' : language === 'ta' ? 'இடைக்கலாவத்தை: DNA பிரதியாக்கம்' : 'Interphase: DNA Replication & Cell Growth')}
                  {divisionStage === 1 && (language === 'si' ? 'ප්‍රාක්කලාව: වර්ණදේහ ඝනීභවනය සහ තර්කුව සෑදීම' : language === 'ta' ? 'முன்கலாவத்தை: நிறமூர்த்தங்கள் சுருங்குதல்' : 'Prophase: Chromosome Condensation & Spindle Formation')}
                  {divisionStage === 2 && (language === 'si' ? 'මධ්‍යකලාව: සමක තලයේ වර්ණදේහ පෙළගැස්ම' : language === 'ta' ? 'மத்தியகலாவத்தை: மத்திய கோட்டில் வரிசையாதல்' : 'Metaphase: Chromosomes Align on Equator')}
                  {divisionStage === 3 && (language === 'si' ? 'අපකලාව: වර්ණදේහ ධ්‍රැව දෙසට ඇදී යාම' : language === 'ta' ? 'பின்கலாவத்தை: நிறமூர்த்தங்கள் எதிர் முனைகளுக்கு நகர்தல்' : 'Anaphase: Chromatids / Chromosomes Move to Opposite Poles')}
                  {divisionStage === 4 && (language === 'si' ? 'අන්තකලාව සහ සෛලප්ලාස්ම බෙදීම (Cytokinesis)' : language === 'ta' ? 'இறுதிக்கலாவத்தை & சைட்டோபிளாசப் பிரிவு' : 'Telophase & Cytokinesis: Daughter Cell Formation')}
                </span>
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                Grade 10 Science • Chapter 14
              </span>
            </div>

            {/* Simulated Microscopic Cell Stage Graphic */}
            <div className="h-44 sm:h-52 w-full rounded-2xl bg-slate-950/80 border border-slate-800 relative flex items-center justify-center overflow-hidden p-4">
              {/* Spindle poles */}
              {divisionStage >= 1 && divisionStage <= 3 && (
                <>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[10px] text-amber-400 font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>North Centrosome</span>
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[10px] text-amber-400 font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>South Centrosome</span>
                  </div>
                  {/* Spindle fibers lines */}
                  <div className="absolute inset-x-10 inset-y-8 border-x border-cyan-500/20 border-dashed rounded-full pointer-events-none" />
                </>
              )}

              {/* Stage 0: Interphase */}
              {divisionStage === 0 && (
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-cyan-400/40 bg-cyan-950/20 flex flex-col items-center justify-center p-3 text-center space-y-1">
                  <div className="w-20 h-20 rounded-full bg-sky-900/30 border border-sky-400/30 flex items-center justify-center">
                    <span className="text-[10px] text-sky-200 font-mono">Chromatin (2n)</span>
                  </div>
                  <span className="text-[9px] text-slate-400">Nuclear Envelope Intact</span>
                </div>
              )}

              {/* Stage 1: Prophase */}
              {divisionStage === 1 && (
                <div className="w-36 h-36 rounded-full border border-dashed border-amber-400/30 bg-slate-900/40 relative flex items-center justify-center">
                  <div className="flex gap-3">
                    <div className="px-2 py-1 bg-cyan-500/30 border border-cyan-400 text-cyan-200 rounded text-[11px] font-bold">X (2n)</div>
                    <div className="px-2 py-1 bg-purple-500/30 border border-purple-400 text-purple-200 rounded text-[11px] font-bold">X (2n)</div>
                  </div>
                  <span className="absolute bottom-2 text-[9px] text-amber-300">Dissolving Envelope</span>
                </div>
              )}

              {/* Stage 2: Metaphase (Aligned at equator) */}
              {divisionStage === 2 && (
                <div className="w-full h-full relative flex items-center justify-center">
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-amber-400/40" />
                  <div className="relative z-10 flex gap-4">
                    <div className="px-3 py-1.5 bg-cyan-500 text-slate-950 rounded-lg text-xs font-extrabold shadow-lg shadow-cyan-500/30">
                      XX (Equator)
                    </div>
                    <div className="px-3 py-1.5 bg-purple-500 text-white rounded-lg text-xs font-extrabold shadow-lg shadow-purple-500/30">
                      XX (Equator)
                    </div>
                  </div>
                  <span className="absolute top-2 right-4 text-[10px] text-amber-300 font-mono">Equatorial Plate</span>
                </div>
              )}

              {/* Stage 3: Anaphase (Sister chromatids or homologous separated) */}
              {divisionStage === 3 && (
                <div className="w-full h-full flex flex-col justify-between py-4 items-center">
                  <div className="flex gap-4">
                    <div className="px-2.5 py-1 bg-cyan-500/80 text-slate-950 rounded text-xs font-bold">V ➔ Pole 1</div>
                    <div className="px-2.5 py-1 bg-purple-500/80 text-white rounded text-xs font-bold">V ➔ Pole 1</div>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Spindle fibers pulling centromeres</div>
                  <div className="flex gap-4">
                    <div className="px-2.5 py-1 bg-cyan-500/80 text-slate-950 rounded text-xs font-bold">Λ ➔ Pole 2</div>
                    <div className="px-2.5 py-1 bg-purple-500/80 text-white rounded text-xs font-bold">Λ ➔ Pole 2</div>
                  </div>
                </div>
              )}

              {/* Stage 4: Telophase & Cytokinesis */}
              {divisionStage === 4 && (
                <div className="flex items-center gap-4">
                  {divisionType === 'mitosis' ? (
                    <>
                      <div className="w-24 h-24 rounded-full border-2 border-cyan-400 bg-cyan-950/30 flex flex-col items-center justify-center p-2 text-center shadow-lg">
                        <span className="text-xs font-bold text-cyan-300">Daughter 1</span>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold">2n (Diploid)</span>
                      </div>
                      <div className="w-24 h-24 rounded-full border-2 border-cyan-400 bg-cyan-950/30 flex flex-col items-center justify-center p-2 text-center shadow-lg">
                        <span className="text-xs font-bold text-cyan-300">Daughter 2</span>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold">2n (Diploid)</span>
                      </div>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((g) => (
                        <div key={g} className="w-16 h-16 rounded-full border border-purple-400 bg-purple-950/30 flex flex-col items-center justify-center p-1 text-center shadow-sm">
                          <span className="text-[10px] font-bold text-purple-300">Gamete {g}</span>
                          <span className="text-[9px] text-emerald-400 font-mono font-bold">n (Haploid)</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* High-Yield Curriculum Comparison Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  {language === 'si' ? 'වර්ණදේහ සංඛ්‍යාව' : language === 'ta' ? 'நிறமூர்த்த எண்ணிக்கை' : 'Chromosome Outcome'}
                </span>
                <p className="font-extrabold text-cyan-300 text-sm">
                  {divisionType === 'mitosis' ? '2n ➔ 2n (නොවෙනස්ව පවතී)' : '2n ➔ n (අර්ධයක් වේ)'}
                </p>
                <span className="text-[10px] text-slate-400 block">
                  {divisionType === 'mitosis' ? 'Diploid preserved' : 'Haploid reduced for gametes'}
                </span>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  {language === 'si' ? 'සෑදෙන සෛල සංඛ්‍යාව' : language === 'ta' ? 'உருவாகும் கலங்கள்' : 'Daughter Cells'}
                </span>
                <p className="font-extrabold text-amber-300 text-sm">
                  {divisionType === 'mitosis' ? 'සර්වසම සෛල 2ක් (2 Cells)' : 'ප්‍රභේදිත සෛල 4ක් (4 Cells)'}
                </p>
                <span className="text-[10px] text-slate-400 block">
                  {divisionType === 'mitosis' ? 'Genetically Identical' : 'Crossing-over Variation'}
                </span>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  {language === 'si' ? 'ප්‍රධාන වැදගත්කම' : language === 'ta' ? 'முக்கிய பயன்' : 'Biological Significance'}
                </span>
                <p className="font-extrabold text-emerald-300 text-sm">
                  {divisionType === 'mitosis'
                    ? (language === 'si' ? 'දේහ වර්ධනය සහ අලුත්වැඩියාව' : language === 'ta' ? 'உடல் வளர்ச்சி மற்றும் புனரமைப்பு' : 'Body Growth & Repair')
                    : (language === 'si' ? 'ජන්මානු සෑදීම සහ ප්‍රභේදනය' : language === 'ta' ? 'புணரி உருவாக்கம்' : 'Gametes & Variation')}
                </p>
                <span className="text-[10px] text-slate-400 block">
                  {divisionType === 'mitosis' ? 'Asexual reproduction & tissues' : 'Sexual reproduction & genetics'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. INHERITANCE & MENDELIAN GENETICS */}
      {normalizedKey === 'inheritance' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <h4 className="font-bold text-sky-400 uppercase">Monohybrid Cross (Tt × Tt)</h4>
            <div className="grid grid-cols-2 gap-2 text-slate-300">
              <div className="p-2 bg-slate-900 rounded">Gametes: T, t × T, t</div>
              <div className="p-2 bg-slate-900 rounded">Genotypic Ratio: 1 TT : 2 Tt : 1 tt</div>
            </div>
            <div className="text-emerald-400 font-bold pt-1 border-t border-slate-800">
              Phenotypic Ratio: 3 Tall : 1 Dwarf (3:1 Ratio)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
