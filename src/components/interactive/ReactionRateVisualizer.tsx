import React, { useState, useEffect, useMemo } from 'react';
import { 
  Flame, 
  Thermometer, 
  Sparkles, 
  RotateCcw, 
  Layers, 
  Activity, 
  Gauge, 
  Info,
  CheckCircle2,
  Zap
} from 'lucide-react';

interface ReactionRateVisualizerProps {
  language?: 'en' | 'si' | 'ta';
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'acid' | 'solid';
}

export const ReactionRateVisualizer: React.FC<ReactionRateVisualizerProps> = ({
  language = 'en',
}) => {
  // Reaction conditions
  const [temperature, setTemperature] = useState<number>(30); // 20°C to 80°C
  const [concentration, setConcentration] = useState<'low' | 'high'>('low'); // 0.5M vs 2.0M
  const [surfaceArea, setSurfaceArea] = useState<'lump' | 'powder'>('lump'); // Solid lump vs crushed powder
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false); // MnO2 catalyst
  const [selectedExperiment, setSelectedExperiment] = useState<'limestone' | 'magnesium' | 'peroxide'>('limestone');
  const [collisionCount, setCollisionCount] = useState<number>(0);

  // Calculate reaction rate speed score (1 to 100)
  const rateMetrics = useMemo(() => {
    let score = 10;
    // Temp factor: roughly doubles every 15-20°C
    const tempFactor = (temperature - 20) * 0.7;
    score += tempFactor;

    // Concentration factor
    if (concentration === 'high') score += 25;

    // Surface area factor
    if (surfaceArea === 'powder') score += 25;

    // Catalyst factor: dramatically lowers activation energy
    if (hasCatalyst) score += 35;

    const clampedScore = Math.min(100, Math.max(5, Math.round(score)));

    // Collision frequency (collisions / sec)
    const frequency = Math.round(clampedScore * 1.8 + 15);
    // Effective collision percentage
    let effectivePercent = Math.min(92, Math.max(8, Math.round(clampedScore * 0.85)));

    return {
      score: clampedScore,
      frequency,
      effectivePercent,
    };
  }, [temperature, concentration, surfaceArea, hasCatalyst]);

  // Particle simulation loop
  const particleCount = concentration === 'high' ? 24 : 12;

  // Initialize and animate bouncing particles
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate initial particles
    const newParticles: Particle[] = [];
    const speedMultiplier = (temperature / 30) * (hasCatalyst ? 1.3 : 1.0);

    for (let i = 0; i < particleCount; i++) {
      const isAcid = i % 2 === 0;
      newParticles.push({
        id: i,
        x: Math.random() * 85 + 7,
        y: Math.random() * 70 + 15,
        vx: (Math.random() - 0.5) * 2 * speedMultiplier,
        vy: (Math.random() - 0.5) * 2 * speedMultiplier,
        type: isAcid ? 'acid' : 'solid',
      });
    }
    setParticles(newParticles);
  }, [particleCount, temperature, hasCatalyst]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((p) => {
          let nextX = p.x + p.vx;
          let nextY = p.y + p.vy;
          let nextVx = p.vx;
          let nextVy = p.vy;

          if (nextX <= 4 || nextX >= 94) {
            nextVx = -nextVx;
            nextX = Math.max(5, Math.min(93, nextX));
          }
          if (nextY <= 10 || nextY >= 88) {
            nextVy = -nextVy;
            nextY = Math.max(11, Math.min(87, nextY));
          }

          return {
            ...p,
            x: nextX,
            y: nextY,
            vx: nextVx,
            vy: nextVy,
          };
        })
      );
      setCollisionCount((c) => c + Math.ceil(rateMetrics.score / 20));
    }, 80);

    return () => clearInterval(interval);
  }, [rateMetrics.score]);

  const handleReset = () => {
    setTemperature(30);
    setConcentration('low');
    setSurfaceArea('lump');
    setHasCatalyst(false);
  };

  // Text translations
  const titles = {
    en: 'Interactive Collision Theory & Reaction Rate Laboratory',
    si: 'අන්තර්ක්‍රියාකාරී ගැටුම් වාදය සහ ප්‍රතික්‍රියා සීඝ්‍රතා පරීක්ෂණාගාරය',
    ta: 'ஊடாடும் மோதுகைத் கொள்கை மற்றும் தாக்க வீத ஆய்வுகூடம்',
  };

  const experimentData = {
    limestone: {
      en: 'CaCO₃ (Matale Limestone) + 2HCl ➔ CaCl₂ + H₂O + CO₂↑',
      si: 'CaCO₃ (මාතලේ හුණුගල්) + 2HCl ➔ CaCl₂ + H₂O + CO₂↑ (කාබන් ඩයොක්සයිඩ් බුබුළු පිටවීම)',
      ta: 'CaCO₃ (சுண்ணாம்புக் கல்) + 2HCl ➔ CaCl₂ + H₂O + CO₂↑ (காபனீரொட்சைட்டு குமிழ்கள்)',
      gas: 'CO₂',
    },
    magnesium: {
      en: 'Mg (Magnesium Ribbon) + 2HCl ➔ MgCl₂ + H₂↑',
      si: 'Mg (මැග්නීසියම් පටිය) + 2HCl ➔ MgCl₂ + H₂↑ (හයිඩ්‍රජන් වායුව)',
      ta: 'Mg (மக்னீசியம் நாடா) + 2HCl ➔ MgCl₂ + H₂↑ (ஹைட்ரஜன் வாயு)',
      gas: 'H₂',
    },
    peroxide: {
      en: '2H₂O₂ (Hydrogen Peroxide) ──[MnO₂]──➔ 2H₂O + O₂↑',
      si: '2H₂O₂ (හයිඩ්‍රජන් පෙරොක්සයිඩ්) ──[MnO₂]──➔ 2H₂O + O₂↑ (ඔක්සිජන් වායුව)',
      ta: '2H₂O₂ (ஹைட்ரஜன் பெரொட்சைட்டு) ──[MnO₂]──➔ 2H₂O + O₂↑ (ஒக்சிசன் வாயு)',
      gas: 'O₂',
    },
  };

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 text-white p-5 sm:p-7 shadow-2xl space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30 shadow-inner">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{titles[language]}</span>
              <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                Grade 10 Ch 17
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'si'
                ? 'උෂ්ණත්වය, සාන්ද්‍රණය, පෘෂ්ඨික වර්ගඵලය සහ උත්ප්‍රේරක මඟින් ගැටුම් සීඝ්‍රතාව වෙනස්වන අයුරු සජීවීව නිරීක්ෂණය කරන්න.'
                : language === 'ta'
                ? 'வெப்பநிலை, செறிவு, மேற்பரப்பளவு மற்றும் ஊக்கி மூலம் மோதுகை வீதம் மாறுபடுவதை நேரடியாக அவதானியுங்கள்.'
                : 'Simulate how kinetic energy, concentration, surface area, and catalysts alter collision frequency & activation energy.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-all border border-slate-700 font-semibold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Lab</span>
        </button>
      </div>

      {/* Experiment Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-950/70 rounded-2xl border border-slate-800/80">
        <button
          type="button"
          onClick={() => setSelectedExperiment('limestone')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center gap-2 ${
            selectedExperiment === 'limestone'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>Matale Limestone + Acid</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedExperiment('magnesium')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center gap-2 ${
            selectedExperiment === 'magnesium'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Magnesium Ribbon + Acid</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedExperiment('peroxide');
            setHasCatalyst(true);
          }}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center gap-2 ${
            selectedExperiment === 'peroxide'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>H₂O₂ + MnO₂ Catalyst</span>
        </button>
      </div>

      {/* Chemical Equation Banner */}
      <div className="p-3 bg-slate-950/90 rounded-2xl border border-slate-800 text-center font-mono text-xs sm:text-sm text-cyan-300 shadow-inner">
        {experimentData[selectedExperiment][language]}
      </div>

      {/* Main Interactive Stage: Left Chamber (Collision Simulation), Right Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Collision Microscopic Chamber (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl border border-slate-800 p-4 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          {/* Top Chamber Header */}
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Microscopic Particle Chamber
            </span>
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="flex items-center gap-1 text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" /> Acid ($H^+$)
              </span>
              <span className="flex items-center gap-1 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Reactant ({surfaceArea === 'powder' ? 'Fine Powder' : 'Lump'})
              </span>
            </div>
          </div>

          {/* Animated Particle Area */}
          <div className="relative w-full h-56 my-2 bg-slate-900/60 rounded-xl border border-slate-800/80 overflow-hidden">
            {/* Activation Energy Barrier Visual Line */}
            <div className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-800/90 border border-slate-700 text-[10px] font-mono text-slate-300">
              {hasCatalyst ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Activation Energy (Ea) Lowered!
                </span>
              ) : (
                <span className="text-amber-400">High Activation Energy (Ea)</span>
              )}
            </div>

            {/* Solid reactant surface visualization */}
            {surfaceArea === 'lump' ? (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-16 bg-gradient-to-t from-amber-900/80 to-amber-700/60 border-2 border-amber-500/80 rounded-2xl flex items-center justify-center text-[10px] font-bold text-amber-200 shadow-lg text-center px-1">
                Solid Lump (Low Surface Area)
              </div>
            ) : (
              <div className="absolute bottom-2 inset-x-8 flex justify-around">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-7 h-7 bg-amber-600/70 border border-amber-400 rounded-lg flex items-center justify-center text-[9px] font-bold text-amber-100 shadow-sm animate-pulse">
                    Powder
                  </div>
                ))}
              </div>
            )}

            {/* Bouncing Particles */}
            {particles.map((p) => {
              const isAcid = p.type === 'acid';
              const particleColor = isAcid
                ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]';

              return (
                <div
                  key={p.id}
                  className={`absolute w-3.5 h-3.5 rounded-full transition-all duration-75 ${particleColor}`}
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                  }}
                />
              );
            })}

            {/* Effervescence Bubbles */}
            <div className="absolute top-4 left-6 pointer-events-none flex gap-1">
              {[...Array(Math.min(10, Math.ceil(rateMetrics.score / 10)))].map((_, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-white/70 border border-white/90 animate-bounce"
                  style={{
                    animationDuration: `${0.8 - (rateMetrics.score / 150)}s`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom Chamber Stats */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span>
              Cumulative Collisions: <strong className="text-white font-mono">{collisionCount}</strong>
            </span>
            <span className="font-mono text-cyan-300">
              Avg Speed: {Math.round(temperature * 1.4)} m/s
            </span>
          </div>
        </div>

        {/* Right: Live Rate Gauges & Meters (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Gauge className="w-3.5 h-3.5 text-amber-400" />
              Live Reaction Rate Gauge
            </span>

            {/* Main Rate Meter */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold text-slate-300">Rate of Reaction:</span>
                <span className="font-mono text-lg font-extrabold text-amber-400">
                  {rateMetrics.score}%
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    rateMetrics.score > 70
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                      : rateMetrics.score > 40
                      ? 'bg-gradient-to-r from-cyan-500 to-amber-500'
                      : 'bg-cyan-500'
                  }`}
                  style={{ width: `${rateMetrics.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 italic">
                {rateMetrics.score > 70
                  ? '🔥 Very Fast: Vigorous effervescence of gas bubbles!'
                  : rateMetrics.score > 40
                  ? '⚡ Moderate: Constant, steady stream of product formation.'
                  : '⏳ Slow: Few particles possess threshold activation energy.'}
              </p>
            </div>
          </div>

          {/* Secondary Metric Cards */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Collision Freq</span>
              <span className="text-sm font-bold font-mono text-cyan-300">
                {rateMetrics.frequency} / sec
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Effective Rate</span>
              <span className="text-sm font-bold font-mono text-emerald-400">
                {rateMetrics.effectivePercent}% effective
              </span>
            </div>
          </div>

          {/* Educational Takeaway Box */}
          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/60 text-amber-200/90 text-xs leading-relaxed">
            <strong className="text-amber-300 block mb-0.5 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> Collision Theory Rule:
            </strong>
            A reaction only occurs when particles collide with energy <strong>≥ Activation Energy ($E_a$)</strong> and with the <strong>correct orientation</strong>!
          </div>
        </div>
      </div>

      {/* Interactive Controls Grid: 4 Factors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-5 bg-slate-950/90 rounded-2xl border border-slate-800">
        {/* Factor 1: Temperature */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-slate-200 flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-rose-400" />
              <span>1. Temperature</span>
            </label>
            <span className="font-mono font-bold text-amber-400">{temperature}°C</span>
          </div>
          <input
            type="range"
            min={20}
            max={80}
            step={5}
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <span className="text-[11px] text-slate-400 block leading-tight">
            Higher temp gives particles more kinetic energy!
          </span>
        </div>

        {/* Factor 2: Concentration */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>2. Acid Concentration</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setConcentration('low')}
              className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all border ${
                concentration === 'low'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              Dilute (0.5M)
            </button>
            <button
              type="button"
              onClick={() => setConcentration('high')}
              className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all border ${
                concentration === 'high'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              Conc. (2.0M)
            </button>
          </div>
          <span className="text-[11px] text-slate-400 block leading-tight">
            More reactant ions per unit volume = more frequent hits!
          </span>
        </div>

        {/* Factor 3: Surface Area */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>3. Surface Area</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setSurfaceArea('lump')}
              className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all border ${
                surfaceArea === 'lump'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              Solid Lump
            </button>
            <button
              type="button"
              onClick={() => setSurfaceArea('powder')}
              className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all border ${
                surfaceArea === 'powder'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              Fine Powder
            </button>
          </div>
          <span className="text-[11px] text-slate-400 block leading-tight">
            Fine powder exposes millions of exterior contact points!
          </span>
        </div>

        {/* Factor 4: Catalyst */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>4. Catalyst (MnO₂)</span>
          </label>
          <button
            type="button"
            onClick={() => setHasCatalyst((prev) => !prev)}
            className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
              hasCatalyst
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-sm'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {hasCatalyst ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
            <span>{hasCatalyst ? 'Catalyst Active' : 'No Catalyst'}</span>
          </button>
          <span className="text-[11px] text-slate-400 block leading-tight">
            Lowers activation energy without being consumed!
          </span>
        </div>
      </div>
    </div>
  );
};
