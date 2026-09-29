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

interface ScienceVisualizerProps {
  topicId: string;
  language?: 'en' | 'si' | 'ta';
  activeModeHint?: string;
}

export const ScienceConceptVisualizer: React.FC<ScienceVisualizerProps> = ({
  topicId,
  language = 'en',
  activeModeHint,
}) => {
  const normalizedKey = React.useMemo(() => {
    const raw = `${topicId} ${activeModeHint || ''}`.toLowerCase();
    if (raw.includes('ch1-chemical-basis') || raw.includes('biomolecule') || raw.includes('ජෛව අණු')) return 'chemical-basis';
    if (raw.includes('ch2-motion') || raw.includes('motion') || raw.includes('velocity') || raw.includes('චලිතය') || raw.includes('இயக்கம்')) return 'motion';
    if (raw.includes('ch3-structure-of-matter') || raw.includes('electron') || raw.includes('isotope') || raw.includes('පදාර්ථයේ ව්‍යුහය')) return 'structure-of-matter';
    if (raw.includes('ch4-newtons-laws') || raw.includes('newton') || raw.includes('f=ma') || raw.includes('නිව්ටන්')) return 'newtons-laws';
    if (raw.includes('ch5-friction') || raw.includes('friction') || raw.includes('ඝර්ෂණය') || raw.includes('உராய்வு')) return 'friction';
    if (raw.includes('ch6-cells') || raw.includes('cell') || raw.includes('organelle') || raw.includes('සෛල') || raw.includes('கலம்')) return 'cells';
    if (raw.includes('ch7-quantification') || raw.includes('mole') || raw.includes('avogadro') || raw.includes('මවුල')) return 'quantification';
    if (raw.includes('ch13-classification') || raw.includes('classification') || raw.includes('kingdom') || raw.includes('වර්ගීකරණය')) return 'classification';
    if (raw.includes('ch8-characteristics') || raw.includes('characteristics-of-organisms') || raw.includes('mrs gren') || raw.includes('ජීවීන්ගේ ලක්ෂණ')) return 'characteristics-organisms';
    if (raw.includes('ch9-resultant-force') || raw.includes('resultant') || raw.includes('vector') || raw.includes('සම්ප්‍රයුක්ත')) return 'resultant-force';
    if (raw.includes('ch10-chemical-bonds') || raw.includes('bond') || raw.includes('ionic') || raw.includes('covalent') || raw.includes('බන්ධන')) return 'chemical-bonds';
    if (raw.includes('ch11-turning-effect') || raw.includes('moment') || raw.includes('lever') || raw.includes('ඝූර්ණය') || raw.includes('திருப்பம்')) return 'turning-effect';
    if (raw.includes('ch12-equilibrium') || raw.includes('equilibrium') || raw.includes('stability') || raw.includes('සමතුලිතතාව')) return 'equilibrium';
    if (raw.includes('ch14-continuity') || raw.includes('mitosis') || raw.includes('meiosis') || raw.includes('සෛල බෙදීම')) return 'continuity-life';
    if (raw.includes('ch15-hydrostatic') || raw.includes('pressure') || raw.includes('pascal') || raw.includes('පීඩනය') || raw.includes('அமுக்கம்')) return 'hydrostatic-pressure';
    if (raw.includes('ch16-changes-in-matter') || raw.includes('exothermic') || raw.includes('endothermic') || raw.includes('තාපදායක')) return 'changes-in-matter';
    if (raw.includes('ch17-rate-of-reactions') || raw.includes('rate') || raw.includes('collision') || raw.includes('සීඝ්‍රතාව')) return 'rate-reactions';
    if (raw.includes('ch18-work-energy-power') || raw.includes('work') || raw.includes('kinetic') || raw.includes('කාර්යය') || raw.includes('வேலை')) return 'work-energy-power';
    if (raw.includes('ch19-current-electricity') || raw.includes('ohm') || raw.includes('circuit') || raw.includes('විද්‍යුතය') || raw.includes('மின்னோட்டம்')) return 'current-electricity';
    if (raw.includes('ch20-inheritance') || raw.includes('mendel') || raw.includes('gene') || raw.includes('පාරම්පරිකතාව') || raw.includes('பரம்பரை')) return 'inheritance';
    if (raw.includes('photosynthesis') || raw.includes('chloroplast') || raw.includes('ප්‍රභාසංස්ලේෂණය')) return 'photosynthesis';
    if (raw.includes('respiration') || raw.includes('lung') || raw.includes('alveoli') || raw.includes('ශ්වසන')) return 'respiration';

    return 'newtons-laws';
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

  // Chemical Bonds State
  const [bondType, setBondType] = useState<'ionic' | 'covalent'>('ionic');

  // Inheritance State (Mendel's monohybrid cross)
  const [parent1, setParent1] = useState<'Tt'>('Tt');
  const [parent2, setParent2] = useState<'Tt'>('Tt');

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

      {/* 6. CHEMICAL BONDS */}
      {normalizedKey === 'chemical-bonds' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setBondType('ionic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                bondType === 'ionic' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Ionic Bonding (NaCl)
            </button>
            <button
              type="button"
              onClick={() => setBondType('covalent')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                bondType === 'covalent' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Covalent Bonding (H₂O)
            </button>
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
            {bondType === 'ionic' ? (
              <p>Sodium (Na: 2,8,1) donates 1 valence electron to Chlorine (Cl: 2,8,7) to form stable ions Na⁺ and Cl⁻ held by electrostatic attraction.</p>
            ) : (
              <p>Oxygen shares two pairs of electrons with two Hydrogen atoms, forming stable covalent single bonds with full outer electron shells.</p>
            )}
          </div>
        </div>
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
