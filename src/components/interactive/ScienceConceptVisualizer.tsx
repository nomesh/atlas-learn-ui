import React, { useState } from 'react';
import {
  Activity,
  Zap,
  Flame,
  Eye,
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

interface ScienceVisualizerProps {
  topicId: string;
  language?: 'en' | 'si' | 'ta';
  activeModeHint?: string;
}

export function getScienceVisualizerKey(topicId: string, activeModeHint?: string): string | null {
  const raw = `${topicId} ${activeModeHint || ''}`.toLowerCase();
  if (raw.includes('ch2-motion') || raw.includes('motion') || raw.includes('velocity') || raw.includes('චලිතය') || raw.includes('இயக்கம்')) return 'motion';
  if (raw.includes('ch3-structure-of-matter') || raw.includes('structure-of-matter') || raw.includes('electron') || raw.includes('isotope') || raw.includes('පදාර්ථයේ ව්‍යුහය')) return 'structure-of-matter';
  if (raw.includes('ch4-newtons-laws') || raw.includes('newton') || raw.includes('f=ma') || raw.includes('නිව්ටන්')) return 'newtons-laws';
  if (raw.includes('ch6-cells') || raw.includes('cell') || raw.includes('organelle') || raw.includes('සෛල') || raw.includes('கலம்')) return 'cells';
  if (raw.includes('ch10-chemical-bonds') || raw.includes('bond') || raw.includes('ionic') || raw.includes('covalent') || raw.includes('බන්ධන')) return 'chemical-bonds';
  if (raw.includes('ch15-hydrostatic') || raw.includes('pressure') || raw.includes('pascal') || raw.includes('පීඩනය') || raw.includes('அமுக்கம்')) return 'hydrostatic-pressure';
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

  // Cells State
  const [cellType, setCellType] = useState<'plant' | 'animal'>('plant');
  const [activeOrganelle, setActiveOrganelle] = useState<string>('nucleus');

  // Chemical Bonds & Structure of Matter State
  const [bondType, setBondType] = useState<'ionic' | 'covalent'>('ionic');
  const [transferred, setTransferred] = useState<boolean>(false);
  const [covalentOverlap, setCovalentOverlap] = useState<number>(65);

  // Inheritance State (Mendel's monohybrid cross)
  const [parent1, setParent1] = useState<'Tt'>('Tt');
  const [parent2, setParent2] = useState<'Tt'>('Tt');

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

      {/* 5. PLANT & ANIMAL CELLS */}
      {normalizedKey === 'cells' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCellType('plant')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                cellType === 'plant' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Plant Cell (ශාක සෛලය)
            </button>
            <button
              type="button"
              onClick={() => setCellType('animal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                cellType === 'animal' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Animal Cell (සත්ත්ව සෛලය)
            </button>
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
            <div className="flex flex-wrap gap-2">
              {['nucleus', 'mitochondria', ...(cellType === 'plant' ? ['chloroplast', 'cellWall', 'vacuole'] : [])].map((org) => (
                <button
                  key={org}
                  type="button"
                  onClick={() => setActiveOrganelle(org)}
                  className={`px-2.5 py-1 rounded text-xs font-medium capitalize ${
                    activeOrganelle === org ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {org}
                </button>
              ))}
            </div>
            <div className="p-3 bg-slate-900 rounded-lg text-slate-200">
              {activeOrganelle === 'nucleus' && 'Nucleus: Contains genetic material (DNA) controlling all cellular metabolism.'}
              {activeOrganelle === 'mitochondria' && 'Mitochondria: Generates cellular ATP energy via aerobic respiration.'}
              {activeOrganelle === 'chloroplast' && 'Chloroplast: Contains green chlorophyll to synthesize glucose via photosynthesis.'}
              {activeOrganelle === 'cellWall' && 'Cell Wall: Rigid cellulose layer providing mechanical support and shape.'}
              {activeOrganelle === 'vacuole' && 'Central Vacuole: Large storage organelle maintaining osmotic turgor pressure.'}
            </div>
          </div>
        </div>
      )}

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

      {/* 7. INHERITANCE & MENDELIAN GENETICS */}
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
