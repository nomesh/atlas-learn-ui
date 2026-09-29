import React, { useState } from 'react';
import {
  Calculator,
  Compass,
  PieChart,
  Shapes,
  Maximize2,
  Minimize2,
  TrendingUp,
  Percent,
  CheckCircle2,
  HelpCircle,
  Hash,
  Scale,
  Sparkles,
  Layers,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

interface MathsVisualizerProps {
  topicId: string;
  language?: 'en' | 'si' | 'ta';
  activeModeHint?: string;
}

export const MathsConceptVisualizer: React.FC<MathsVisualizerProps> = ({
  topicId,
  language = 'en',
  activeModeHint,
}) => {
  // Determine normalized math subtopic key
  const normalizedKey = React.useMemo(() => {
    const raw = `${topicId} ${activeModeHint || ''}`.toLowerCase();
    if (raw.includes('ch1-perimeter') || raw.includes('perimeter') || raw.includes('පරිමිතිය') || raw.includes('சுற்றளவு')) return 'perimeter';
    if (raw.includes('ch2-real-numbers') || raw.includes('real-number') || raw.includes('surd') || raw.includes('තාත්වික') || raw.includes('மெய் எண்கள்')) return 'real-numbers';
    if (raw.includes('ch3-indices') || raw.includes('indices') || raw.includes('logarithm') || raw.includes('දර්ශක') || raw.includes('மடக்கை')) return 'indices-logarithms';
    if (raw.includes('ch4-algebraic') || raw.includes('expansion') || raw.includes('বীජ') || raw.includes('වීජීය ප්‍රකාශන') || raw.includes('இயற்கணிதக் கோவைகள்')) return 'algebraic-expressions';
    if (raw.includes('ch5-linear-eq') || raw.includes('simultaneous') || raw.includes('සමගාමී') || raw.includes('ഒരുங்கமை சமன்பாடு')) return 'linear-equations';
    if (raw.includes('ch6-angles-poly') || raw.includes('polygon') || raw.includes('බහුඅස්‍ර') || raw.includes('பலகோணி')) return 'angles-polygons';
    if (raw.includes('ch7-scale') || raw.includes('bearing') || raw.includes('පරිමාණ') || raw.includes('திசைகோள்')) return 'scale-diagrams';
    if (raw.includes('ch8-surface-area') || raw.includes('surface-area') || raw.includes('පෘෂ්ඨ වර්ගඵලය') || raw.includes('மேற்பரப்பளவு')) return 'surface-area';
    if (raw.includes('ch9-volume') || raw.includes('volume') || raw.includes('පරිමාව') || raw.includes('கனவளவு')) return 'volume-solids';
    if (raw.includes('ch10-pythagoras') || raw.includes('pythagoras') || raw.includes('පයිතගරස්') || raw.includes('பைதகரசு')) return 'pythagoras';
    if (raw.includes('ch11-fractions') || raw.includes('fraction') || raw.includes('භාග') || raw.includes('பின்னங்கள்')) return 'fractions';
    if (raw.includes('ch12-percentages') || raw.includes('interest') || raw.includes('percentage') || raw.includes('ප්‍රතිශත') || raw.includes('சதவீதம்')) return 'percentages';
    if (raw.includes('ch13-congruence') || raw.includes('congruen') || raw.includes('ආංගසමතාව') || raw.includes('ஒருங்கமைவு')) return 'congruence';
    if (raw.includes('ch14-quadratic') || raw.includes('quadratic') || raw.includes('වර්ගජ') || raw.includes('இருபடி')) return 'quadratic-equations';
    if (raw.includes('ch15-chords') || raw.includes('chord') || raw.includes('කෝඩ') || raw.includes('நாண்கள்')) return 'chords';
    if (raw.includes('ch16-inequalities') || raw.includes('inequalit') || raw.includes('අසමානතා') || raw.includes('சமனின்மைகள்')) return 'inequalities';
    if (raw.includes('ch17-tangents') || raw.includes('tangent') || raw.includes('ස්පර්ශක') || raw.includes('தொடுகோடுகள்')) return 'tangents';
    if (raw.includes('ch18-loci') || raw.includes('loci') || raw.includes('locus') || raw.includes('පථ') || raw.includes('ஒழுக்கு')) return 'loci';
    if (raw.includes('ch19-coordinate') || raw.includes('coordinate') || raw.includes('স্থানাংক') || raw.includes('ඛණ්ඩාංක') || raw.includes('ஆள்கூற்று வடிவியல்')) return 'coordinate-geometry';
    if (raw.includes('ch20-graphs') || raw.includes('graph') || raw.includes('function') || raw.includes('ප්‍රස්තාර') || raw.includes('வரைபுகள்')) return 'graphs-functions';
    if (raw.includes('ch21-sets') || raw.includes('venn') || raw.includes('sets') || raw.includes('කුලක') || raw.includes('தொடைகள்')) return 'sets';
    if (raw.includes('ch22-probability') || raw.includes('probability') || raw.includes('සම්භාවිතාව') || raw.includes('நிகழ்தகவு')) return 'probability';
    if (raw.includes('ch23-statistics') || raw.includes('statistics') || raw.includes('mean') || raw.includes('සංඛ්‍යානය') || raw.includes('புள்ளியியல்')) return 'statistics';

    return 'perimeter';
  }, [topicId, activeModeHint]);

  // --------------------------------------------------------------------------
  // CHAPTER 1: PERIMETER OF SECTORS
  // --------------------------------------------------------------------------
  const [sectorRadius, setSectorRadius] = useState<number>(7); // cm
  const [sectorAngle, setSectorAngle] = useState<number>(60); // degrees
  const arcLength = ((sectorAngle / 360) * 2 * (22 / 7) * sectorRadius).toFixed(2);
  const totalPerimeter = (2 * sectorRadius + Number(arcLength)).toFixed(2);

  // --------------------------------------------------------------------------
  // CHAPTER 2: REAL NUMBERS & SURDS
  // --------------------------------------------------------------------------
  const [surdVal, setSurdVal] = useState<number>(10);
  const approxRoot = Math.sqrt(surdVal).toFixed(3);
  const lowerInt = Math.floor(Math.sqrt(surdVal));
  const upperInt = lowerInt + 1;

  // --------------------------------------------------------------------------
  // CHAPTER 3: INDICES & LOGARITHMS
  // --------------------------------------------------------------------------
  const [logBase, setLogBase] = useState<number>(2);
  const [logPower, setLogPower] = useState<number>(4);
  const logResult = Math.pow(logBase, logPower);

  // --------------------------------------------------------------------------
  // CHAPTER 4: ALGEBRAIC EXPRESSIONS EXPANSION (x+a)(x+b)
  // --------------------------------------------------------------------------
  const [coefA, setCoefA] = useState<number>(3);
  const [coefB, setCoefB] = useState<number>(2);
  const middleTerm = coefA + coefB;
  const constantTerm = coefA * coefB;

  // --------------------------------------------------------------------------
  // CHAPTER 5: LINEAR EQUATIONS (Simultaneous equations)
  // --------------------------------------------------------------------------
  const [simPreset, setSimPreset] = useState<number>(1);
  // Presets:
  // 1: 2x + y = 7, x - y = 2  => x = 3, y = 1
  // 2: 3x + 2y = 12, x + y = 5 => x = 2, y = 3
  // 3: 4x - y = 10, 2x + y = 8  => x = 3, y = 2

  // --------------------------------------------------------------------------
  // CHAPTER 6: ANGLES OF POLYGONS
  // --------------------------------------------------------------------------
  const [polySides, setPolySides] = useState<number>(5);
  const interiorSum = (2 * polySides - 4) * 90;
  const regularInteriorAngle = (interiorSum / polySides).toFixed(1);
  const regularExteriorAngle = (360 / polySides).toFixed(1);

  // --------------------------------------------------------------------------
  // CHAPTER 7: SCALE DIAGRAMS & BEARINGS
  // --------------------------------------------------------------------------
  const [bearingAngle, setBearingAngle] = useState<number>(65);
  const backBearing = bearingAngle < 180 ? bearingAngle + 180 : bearingAngle - 180;

  // --------------------------------------------------------------------------
  // CHAPTER 8: SURFACE AREA OF SOLIDS (Cylinder)
  // --------------------------------------------------------------------------
  const [cylRadius, setCylRadius] = useState<number>(7);
  const [cylHeight, setCylHeight] = useState<number>(10);
  const baseArea = (2 * (22 / 7) * cylRadius * cylRadius).toFixed(1);
  const curvedArea = (2 * (22 / 7) * cylRadius * cylHeight).toFixed(1);
  const totalSurfaceArea = (Number(baseArea) + Number(curvedArea)).toFixed(1);

  // --------------------------------------------------------------------------
  // CHAPTER 9: VOLUME OF SOLIDS
  // --------------------------------------------------------------------------
  const cylVolume = ((22 / 7) * cylRadius * cylRadius * cylHeight).toFixed(1);
  const capacityLitres = (Number(cylVolume) / 1000).toFixed(2);

  // --------------------------------------------------------------------------
  // CHAPTER 10: PYTHAGORAS THEOREM
  // --------------------------------------------------------------------------
  const [pythSideA, setPythSideA] = useState<number>(3);
  const [pythSideB, setPythSideB] = useState<number>(4);
  const pythHyp = Math.sqrt(pythSideA * pythSideA + pythSideB * pythSideB).toFixed(2);

  // --------------------------------------------------------------------------
  // CHAPTER 11: FRACTIONS
  // --------------------------------------------------------------------------
  const [fracNum1, setFracNum1] = useState<number>(1);
  const [fracDen1, setFracDen1] = useState<number>(3);
  const [fracNum2, setFracNum2] = useState<number>(1);
  const [fracDen2, setFracDen2] = useState<number>(4);
  const commonDen = fracDen1 * fracDen2;
  const sumNumerator = fracNum1 * fracDen2 + fracNum2 * fracDen1;

  // --------------------------------------------------------------------------
  // CHAPTER 12: PERCENTAGES & INTEREST
  // --------------------------------------------------------------------------
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(12);
  const [years, setYears] = useState<number>(2);
  const simpleInterest = (principal * rate * years) / 100;
  const compoundTotal = (principal * Math.pow(1 + rate / 100, years)).toFixed(2);
  const compoundInterest = (Number(compoundTotal) - principal).toFixed(2);

  // --------------------------------------------------------------------------
  // CHAPTER 13: CONGRUENCE
  // --------------------------------------------------------------------------
  const [congruenceRule, setCongruenceRule] = useState<'SAS' | 'AAS' | 'SSS' | 'RHS'>('SAS');

  // --------------------------------------------------------------------------
  // CHAPTER 14: QUADRATIC EQUATIONS
  // --------------------------------------------------------------------------
  const [quadA, setQuadA] = useState<number>(1);
  const [quadB, setQuadB] = useState<number>(5);
  const [quadC, setQuadC] = useState<number>(6);
  const quadDisc = quadB * quadB - 4 * quadA * quadC;
  const quadRoot1 = quadDisc >= 0 ? ((-quadB + Math.sqrt(quadDisc)) / (2 * quadA)).toFixed(2) : null;
  const quadRoot2 = quadDisc >= 0 ? ((-quadB - Math.sqrt(quadDisc)) / (2 * quadA)).toFixed(2) : null;

  // --------------------------------------------------------------------------
  // CHAPTER 15: CHORDS OF A CIRCLE
  // --------------------------------------------------------------------------
  const [chordDist, setChordDist] = useState<number>(6); // cm
  const [chordCircleR, setChordCircleR] = useState<number>(10); // cm
  const halfChord = Math.sqrt(Math.max(0, chordCircleR * chordCircleR - chordDist * chordDist)).toFixed(2);
  const totalChordLength = (Number(halfChord) * 2).toFixed(2);

  // --------------------------------------------------------------------------
  // CHAPTER 16: INEQUALITIES
  // --------------------------------------------------------------------------
  const [ineqSign, setIneqSign] = useState<'<=' | '<' | '>=' | '>'>('<=');
  const [ineqVal, setIneqVal] = useState<number>(3);

  // --------------------------------------------------------------------------
  // CHAPTER 17: TANGENTS
  // --------------------------------------------------------------------------
  const [tangentDist, setTangentDist] = useState<number>(13); // OP distance
  const [tangentRadius, setTangentRadius] = useState<number>(5); // circle radius
  const tangentLength = Math.sqrt(Math.max(0, tangentDist * tangentDist - tangentRadius * tangentRadius)).toFixed(2);

  // --------------------------------------------------------------------------
  // CHAPTER 18: FOUR BASIC LOCI
  // --------------------------------------------------------------------------
  const [activeLocus, setActiveLocus] = useState<1 | 2 | 3 | 4>(1);

  // --------------------------------------------------------------------------
  // CHAPTER 19: COORDINATE GEOMETRY
  // --------------------------------------------------------------------------
  const [coordX1, setCoordX1] = useState<number>(1);
  const [coordY1, setCoordY1] = useState<number>(2);
  const [coordX2, setCoordX2] = useState<number>(5);
  const [coordY2, setCoordY2] = useState<number>(8);
  const gradM = coordX2 !== coordX1 ? ((coordY2 - coordY1) / (coordX2 - coordX1)).toFixed(2) : 'Undefined (Vertical)';
  const distAB = Math.sqrt(Math.pow(coordX2 - coordX1, 2) + Math.pow(coordY2 - coordY1, 2)).toFixed(2);
  const midX = ((coordX1 + coordX2) / 2).toFixed(1);
  const midY = ((coordY1 + coordY2) / 2).toFixed(1);

  // --------------------------------------------------------------------------
  // CHAPTER 20: GRAPHS OF FUNCTIONS
  // --------------------------------------------------------------------------
  const [graphM, setGraphM] = useState<number>(2);
  const [graphC, setGraphC] = useState<number>(-1);

  // --------------------------------------------------------------------------
  // CHAPTER 21: SETS & VENN DIAGRAMS
  // --------------------------------------------------------------------------
  const [setRegion, setSetRegion] = useState<'A_intersect_B' | 'A_union_B' | 'A_only' | 'B_only'>('A_intersect_B');
  const nA_only = 15;
  const nIntersect = 8;
  const nB_only = 12;
  const nUnion = nA_only + nIntersect + nB_only;

  // --------------------------------------------------------------------------
  // CHAPTER 22: PROBABILITY
  // --------------------------------------------------------------------------
  const [probFavorable, setProbFavorable] = useState<number>(3);
  const [probTotal, setProbTotal] = useState<number>(6);
  const probVal = (probFavorable / probTotal).toFixed(2);
  const probPercent = ((probFavorable / probTotal) * 100).toFixed(0);

  // --------------------------------------------------------------------------
  // CHAPTER 23: STATISTICS
  // --------------------------------------------------------------------------
  const [assumedMean, setAssumedMean] = useState<number>(25);

  return (
    <div className="space-y-4 text-slate-100">
      {/* 1. PERIMETER OF SECTORS */}
      {normalizedKey === 'perimeter' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                {language === 'si' ? 'කේන්ද්‍රික ඛණ්ඩ පරාමිතීන්' : language === 'ta' ? 'ஆரைச்சிறை அளவீடுகள்' : 'Sector Parameters'}
              </h4>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Radius (r):</span>
                  <span className="font-bold text-cyan-400">{sectorRadius} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="21"
                  step="1"
                  value={sectorRadius}
                  onChange={(e) => setSectorRadius(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Central Angle (θ):</span>
                  <span className="font-bold text-amber-400">{sectorAngle}°</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="300"
                  step="15"
                  value={sectorAngle}
                  onChange={(e) => setSectorAngle(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { label: 'Semicircle (180°)', angle: 180, r: 7 },
                  { label: 'Quadrant (90°)', angle: 90, r: 14 },
                  { label: 'Sector (60°)', angle: 60, r: 7 },
                  { label: 'Sector (45°)', angle: 45, r: 14 },
                ].map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => { setSectorAngle(p.angle); setSectorRadius(p.r); }}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 font-medium"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Visual and Calculation */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
              <div className="relative h-44 flex items-center justify-center bg-slate-900/60 rounded-lg p-2 border border-slate-800/80">
                <svg viewBox="-100 -100 200 200" className="w-full h-full max-h-40">
                  <circle cx="0" cy="0" r="80" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  {/* Dynamic Sector Path */}
                  {(() => {
                    const startAngleRad = 0;
                    const endAngleRad = (sectorAngle * Math.PI) / 180;
                    const x1 = 80 * Math.cos(startAngleRad);
                    const y1 = -80 * Math.sin(startAngleRad);
                    const x2 = 80 * Math.cos(endAngleRad);
                    const y2 = -80 * Math.sin(endAngleRad);
                    const largeArcFlag = sectorAngle > 180 ? 1 : 0;
                    const d = `M 0 0 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 0 ${x2} ${y2} Z`;
                    return (
                      <path
                        d={d}
                        fill="rgba(56, 189, 248, 0.25)"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                    );
                  })()}
                  <circle cx="0" cy="0" r="3.5" fill="#f59e0b" />
                  <text x="10" y="-8" fill="#fbbf24" fontSize="12" fontWeight="bold">θ = {sectorAngle}°</text>
                  <text x="35" y="16" fill="#38bdf8" fontSize="11">r = {sectorRadius}cm</text>
                </svg>
              </div>

              <div className="p-3 bg-slate-900 border border-cyan-500/30 rounded-xl font-mono text-xs space-y-1">
                <div className="text-cyan-300 font-bold">1. Arc Length (s) = (θ / 360) × 2πr</div>
                <div className="text-slate-300">= ({sectorAngle} / 360) × 2 × (22/7) × {sectorRadius} = <span className="text-amber-300 font-bold">{arcLength} cm</span></div>
                <div className="text-emerald-300 font-bold pt-1 border-t border-slate-800">2. Total Perimeter (P) = 2r + s</div>
                <div className="text-slate-300">= 2({sectorRadius}) + {arcLength} = <span className="text-emerald-400 font-bold text-sm">{totalPerimeter} cm</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. REAL NUMBERS & SURDS */}
      {normalizedKey === 'real-numbers' && (
        <div className="space-y-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-300">Surd to approximate (√n):</span>
              <span className="font-mono text-lg font-black text-amber-400">√{surdVal} ≈ {approxRoot}</span>
            </div>
            <input
              type="range"
              min="2"
              max="50"
              step="1"
              value={surdVal}
              onChange={(e) => setSurdVal(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            {/* Number Line Representation */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
              <div className="text-[11px] text-slate-400">Textbook Bound Method: Find closest perfect squares:</div>
              <div className="font-mono text-xs text-indigo-300">
                {lowerInt * lowerInt} &lt; {surdVal} &lt; {upperInt * upperInt}
              </div>
              <div className="font-mono text-sm font-bold text-emerald-400">
                √{lowerInt * lowerInt} &lt; √{surdVal} &lt; √{upperInt * upperInt} ➔ <span className="text-amber-300">{lowerInt} &lt; √{surdVal} &lt; {upperInt}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. INDICES & LOGARITHMS */}
      {normalizedKey === 'indices-logarithms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase">Power Parameters</h4>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Base (b):</span>
                <span className="font-bold text-cyan-400">{logBase}</span>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={logBase}
                onChange={(e) => setLogBase(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Index/Power (x):</span>
                <span className="font-bold text-amber-400">{logPower}</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={logPower}
                onChange={(e) => setLogPower(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-center space-y-3 font-mono">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Index Notation:</span>
              <span className="text-xl font-black text-cyan-400">{logBase}<sup>{logPower}</sup> = {logResult}</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-indigo-500/30">
              <span className="text-xs text-slate-400 block mb-1">Logarithmic Form:</span>
              <span className="text-xl font-black text-amber-400">log<sub>{logBase}</sub>({logResult}) = {logPower}</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. ALGEBRAIC EXPRESSIONS EXPANSION */}
      {normalizedKey === 'algebraic-expressions' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold text-indigo-400 uppercase">Binomial Terms (x + a)(x + b)</h4>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Constant (a):</span>
                  <span className="font-bold text-cyan-400">{coefA >= 0 ? `+${coefA}` : coefA}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="1"
                  value={coefA}
                  onChange={(e) => setCoefA(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Constant (b):</span>
                  <span className="font-bold text-amber-400">{coefB >= 0 ? `+${coefB}` : coefB}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="1"
                  value={coefB}
                  onChange={(e) => setCoefB(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-center space-y-3">
              <div className="text-xs text-slate-400">Expanded Result:</div>
              <div className="text-xl font-mono font-bold text-emerald-400">
                (x {coefA >= 0 ? `+ ${coefA}` : `- ${Math.abs(coefA)}`})(x {coefB >= 0 ? `+ ${coefB}` : `- ${Math.abs(coefB)}`})
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-sm space-y-1">
                <div>= x² + ({coefA} + {coefB})x + ({coefA} × {coefB})</div>
                <div className="text-amber-300 font-black text-base pt-1 border-t border-slate-800">
                  = x² {middleTerm >= 0 ? `+ ${middleTerm}` : `- ${Math.abs(middleTerm)}`}x {constantTerm >= 0 ? `+ ${constantTerm}` : `- ${Math.abs(constantTerm)}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. LINEAR & SIMULTANEOUS EQUATIONS */}
      {normalizedKey === 'linear-equations' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 1, label: 'Pair 1: 2x + y = 7 & x - y = 2', x: 3, y: 1 },
              { id: 2, label: 'Pair 2: 3x + 2y = 12 & x + y = 5', x: 2, y: 3 },
              { id: 3, label: 'Pair 3: 4x - y = 10 & 2x + y = 8', x: 3, y: 2 },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSimPreset(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  simPreset === p.id ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
            {simPreset === 1 && (
              <>
                <div className="text-cyan-300 font-bold">Eq (1): 2x + y = 7</div>
                <div className="text-cyan-300 font-bold">Eq (2): x - y = 2</div>
                <div className="text-slate-300">Adding (1) + (2): 3x = 9 ➔ <span className="text-amber-300 font-bold">x = 3</span></div>
                <div className="text-slate-300">Substitute x = 3 into (2): 3 - y = 2 ➔ <span className="text-emerald-300 font-bold">y = 1</span></div>
                <div className="text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800">
                  Intersection Coordinate: (3, 1)
                </div>
              </>
            )}
            {simPreset === 2 && (
              <>
                <div className="text-cyan-300 font-bold">Eq (1): 3x + 2y = 12</div>
                <div className="text-cyan-300 font-bold">Eq (2): x + y = 5  [Multiply by 2 ➔ 2x + 2y = 10]</div>
                <div className="text-slate-300">Subtract (1) - 2×(2): x = 2 ➔ <span className="text-amber-300 font-bold">x = 2</span></div>
                <div className="text-slate-300">Substitute x = 2 into (2): 2 + y = 5 ➔ <span className="text-emerald-300 font-bold">y = 3</span></div>
                <div className="text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800">
                  Intersection Coordinate: (2, 3)
                </div>
              </>
            )}
            {simPreset === 3 && (
              <>
                <div className="text-cyan-300 font-bold">Eq (1): 4x - y = 10</div>
                <div className="text-cyan-300 font-bold">Eq (2): 2x + y = 8</div>
                <div className="text-slate-300">Adding (1) + (2): 6x = 18 ➔ <span className="text-amber-300 font-bold">x = 3</span></div>
                <div className="text-slate-300">Substitute x = 3 into (2): 2(3) + y = 8 ➔ <span className="text-emerald-300 font-bold">y = 2</span></div>
                <div className="text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800">
                  Intersection Coordinate: (3, 2)
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 6. ANGLES OF POLYGONS */}
      {normalizedKey === 'angles-polygons' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Number of Sides (n):</span>
                <span className="font-bold text-amber-400 text-sm">{polySides} Sides ({polySides === 3 ? 'Triangle' : polySides === 4 ? 'Quadrilateral' : polySides === 5 ? 'Pentagon' : polySides === 6 ? 'Hexagon' : 'Polygon'})</span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                step="1"
                value={polySides}
                onChange={(e) => setPolySides(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1.5">
                <div className="text-cyan-300 font-bold">Sum of Interior Angles:</div>
                <div className="text-slate-300">= (2n - 4) × 90° = (2({polySides}) - 4) × 90° = <span className="text-amber-400 font-bold">{interiorSum}°</span></div>
                <div className="text-emerald-300 font-bold pt-1 border-t border-slate-800">One Regular Interior Angle:</div>
                <div className="text-slate-300">= {interiorSum}° / {polySides} = <span className="text-emerald-400 font-bold">{regularInteriorAngle}°</span></div>
                <div className="text-indigo-300 font-bold pt-1 border-t border-slate-800">One Exterior Angle:</div>
                <div className="text-slate-300">= 360° / {polySides} = <span className="text-indigo-300 font-bold">{regularExteriorAngle}°</span></div>
              </div>
            </div>
            {/* SVG Polygon */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
              <svg viewBox="-80 -80 160 160" className="w-48 h-48">
                {(() => {
                  const pts: string[] = [];
                  const r = 60;
                  for (let i = 0; i < polySides; i++) {
                    const a = (i * 2 * Math.PI) / polySides - Math.PI / 2;
                    pts.push(`${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`);
                  }
                  return (
                    <polygon
                      points={pts.join(' ')}
                      fill="rgba(99, 102, 241, 0.2)"
                      stroke="#818cf8"
                      strokeWidth="2.5"
                    />
                  );
                })()}
                <circle cx="0" cy="0" r="3" fill="#fbbf24" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* 7. SCALE DIAGRAMS & BEARINGS */}
      {normalizedKey === 'scale-diagrams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase">3-Figure Compass Bearing</h4>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Bearing from Point O:</span>
                <span className="font-mono font-bold text-amber-400">{String(bearingAngle).padStart(3, '0')}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="359"
                step="5"
                value={bearingAngle}
                onChange={(e) => setBearingAngle(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
              <div>Forward Bearing: <span className="text-cyan-400 font-bold">{String(bearingAngle).padStart(3, '0')}°</span></div>
              <div>Back Bearing: <span className="text-emerald-400 font-bold">{String(backBearing).padStart(3, '0')}°</span></div>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                Rule: Always measured clockwise starting from North (000°).
              </div>
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
            <svg viewBox="-80 -80 160 160" className="w-44 h-44">
              <circle cx="0" cy="0" r="65" fill="none" stroke="#475569" strokeWidth="1.5" />
              <line x1="0" y1="-65" x2="0" y2="65" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="-65" y1="0" x2="65" y2="0" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
              <text x="-4" y="-68" fill="#f43f5e" fontSize="11" fontWeight="bold">N</text>
              {(() => {
                const rad = ((bearingAngle - 90) * Math.PI) / 180;
                const x = 60 * Math.cos(rad);
                const y = 60 * Math.sin(rad);
                return (
                  <>
                    <line x1="0" y1="0" x2={x} y2={y} stroke="#f59e0b" strokeWidth="2.5" />
                    <circle cx={x} cy={y} r="4" fill="#f59e0b" />
                  </>
                );
              })()}
              <circle cx="0" cy="0" r="3.5" fill="#38bdf8" />
            </svg>
          </div>
        </div>
      )}

      {/* 8. SURFACE AREA OF SOLIDS */}
      {normalizedKey === 'surface-area' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase">Closed Cylinder Solid</h4>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Base Radius (r):</span>
                <span className="font-bold text-cyan-400">{cylRadius} cm</span>
              </div>
              <input
                type="range"
                min="2"
                max="14"
                step="1"
                value={cylRadius}
                onChange={(e) => setCylRadius(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Cylinder Height (h):</span>
                <span className="font-bold text-amber-400">{cylHeight} cm</span>
              </div>
              <input
                type="range"
                min="3"
                max="25"
                step="1"
                value={cylHeight}
                onChange={(e) => setCylHeight(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold">1. Two Circular Bases Area (2πr²):</div>
              <div className="text-slate-300">= 2 × (22/7) × {cylRadius}² = <span className="text-cyan-400 font-bold">{baseArea} cm²</span></div>
              <div className="text-amber-300 font-bold pt-1 border-t border-slate-800">2. Curved Surface Area (2πrh):</div>
              <div className="text-slate-300">= 2 × (22/7) × {cylRadius} × {cylHeight} = <span className="text-amber-400 font-bold">{curvedArea} cm²</span></div>
              <div className="text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800">
                Total Surface Area = {totalSurfaceArea} cm²
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. VOLUME OF SOLIDS */}
      {normalizedKey === 'volume-solids' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase">Cylinder Volume & Liquid Capacity</h4>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Radius (r):</span>
                <span className="font-bold text-cyan-400">{cylRadius} cm</span>
              </div>
              <input
                type="range"
                min="2"
                max="14"
                step="1"
                value={cylRadius}
                onChange={(e) => setCylRadius(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Height (h):</span>
                <span className="font-bold text-amber-400">{cylHeight} cm</span>
              </div>
              <input
                type="range"
                min="3"
                max="25"
                step="1"
                value={cylHeight}
                onChange={(e) => setCylHeight(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold">Volume Formula: V = πr²h</div>
              <div className="text-slate-300">= (22/7) × {cylRadius}² × {cylHeight}</div>
              <div className="text-emerald-400 font-bold text-base pt-1 border-t border-slate-800">
                Volume = {cylVolume} cm³
              </div>
              <div className="text-amber-300 font-bold pt-1 border-t border-slate-800">
                Fluid Capacity (1 cm³ = 1 ml) = {cylVolume} ml (≈ {capacityLitres} L)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. PYTHAGORAS THEOREM (Strictly for Chapter 10) */}
      {normalizedKey === 'pythagoras' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase">Right-Angled Triangle ABC</h4>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Side AB (Height):</span>
                <span className="font-bold text-cyan-400">{pythSideA} units</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={pythSideA}
                onChange={(e) => setPythSideA(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Side BC (Base):</span>
                <span className="font-bold text-amber-400">{pythSideB} units</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={pythSideB}
                onChange={(e) => setPythSideB(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold">Pythagoras Equation: AC² = AB² + BC²</div>
              <div className="text-slate-300">= {pythSideA}² + {pythSideB}² = {pythSideA * pythSideA} + {pythSideB * pythSideB} = {pythSideA * pythSideA + pythSideB * pythSideB}</div>
              <div className="text-emerald-400 font-bold text-base pt-1 border-t border-slate-800">
                Hypotenuse AC = √{pythSideA * pythSideA + pythSideB * pythSideB} = {pythHyp} units
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 11. FRACTIONS */}
      {normalizedKey === 'fractions' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3 font-mono">
            <div className="text-xs text-slate-400">Addition of Fractions with Different Denominators:</div>
            <div className="text-lg font-bold text-cyan-400">
              {fracNum1}/{fracDen1} + {fracNum2}/{fracDen2}
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
              <div>Common Denominator (LCM): <span className="text-amber-400 font-bold">{commonDen}</span></div>
              <div>Converted Fractions: ({fracNum1 * fracDen2}/{commonDen}) + ({fracNum2 * fracDen1}/{commonDen})</div>
              <div className="text-emerald-400 font-bold text-sm pt-1 border-t border-slate-800">
                Sum = {sumNumerator}/{commonDen}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 12. PERCENTAGES & FINANCIAL INTEREST */}
      {normalizedKey === 'percentages' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase">Interest Parameters</h4>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Principal (P):</span>
                <span className="font-bold text-cyan-400">Rs. {principal.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Annual Rate (R):</span>
                <span className="font-bold text-amber-400">{rate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Time (T):</span>
                <span className="font-bold text-emerald-400">{years} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold">1. Simple Interest (I = PTR / 100):</div>
              <div className="text-slate-300">= ({principal} × {rate} × {years}) / 100 = <span className="text-cyan-400 font-bold">Rs. {simpleInterest.toLocaleString()}</span></div>
              <div className="text-amber-300 font-bold pt-1 border-t border-slate-800">2. Compound Interest Total [A = P(1+r)^n]:</div>
              <div className="text-slate-300">Total Amount: <span className="text-emerald-400 font-bold">Rs. {Number(compoundTotal).toLocaleString()}</span></div>
              <div className="text-slate-300">Compound Interest Earned: <span className="text-amber-400 font-bold">Rs. {Number(compoundInterest).toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* 13. CONGRUENCE */}
      {normalizedKey === 'congruence' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(['SAS', 'AAS', 'SSS', 'RHS'] as const).map((rule) => (
              <button
                key={rule}
                type="button"
                onClick={() => setCongruenceRule(rule)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  congruenceRule === rule ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {rule} Postulate
              </button>
            ))}
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
            {congruenceRule === 'SAS' && (
              <p className="text-slate-200">
                <span className="font-bold text-amber-400">Side-Angle-Side (SAS):</span> Two pairs of corresponding sides are equal, and the included angle between them is equal.
              </p>
            )}
            {congruenceRule === 'AAS' && (
              <p className="text-slate-200">
                <span className="font-bold text-amber-400">Angle-Angle-Side (AAS):</span> Two pairs of corresponding angles are equal, and any corresponding side is equal.
              </p>
            )}
            {congruenceRule === 'SSS' && (
              <p className="text-slate-200">
                <span className="font-bold text-amber-400">Side-Side-Side (SSS):</span> All three pairs of corresponding sides are equal.
              </p>
            )}
            {congruenceRule === 'RHS' && (
              <p className="text-slate-200">
                <span className="font-bold text-amber-400">Right angle-Hypotenuse-Side (RHS):</span> In right-angled triangles, the hypotenuses and one pair of other sides are equal.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 14. QUADRATIC EQUATIONS */}
      {normalizedKey === 'quadratic-equations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase">ax² + bx + c = 0</h4>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">a:</span>
                <span className="font-bold text-cyan-400">{quadA}</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={quadA}
                onChange={(e) => setQuadA(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">b:</span>
                <span className="font-bold text-amber-400">{quadB}</span>
              </div>
              <input
                type="range"
                min="-8"
                max="8"
                step="1"
                value={quadB}
                onChange={(e) => setQuadB(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">c:</span>
                <span className="font-bold text-emerald-400">{quadC}</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="1"
                value={quadC}
                onChange={(e) => setQuadC(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Discriminant Δ = b² - 4ac:</div>
              <div className="text-cyan-400 font-bold">{quadB}² - 4({quadA})({quadC}) = {quadDisc}</div>
              <div className="text-amber-300 font-bold pt-1 border-t border-slate-800">
                Roots: {quadDisc >= 0 ? `x₁ = ${quadRoot1}, x₂ = ${quadRoot2}` : 'No Real Roots (Δ < 0)'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 15. CHORDS OF A CIRCLE */}
      {normalizedKey === 'chords' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase">Perpendicular from Center to Chord</h4>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Circle Radius (r):</span>
                <span className="font-bold text-cyan-400">{chordCircleR} cm</span>
              </div>
              <input
                type="range"
                min="5"
                max="15"
                step="1"
                value={chordCircleR}
                onChange={(e) => setChordCircleR(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Distance from Center (d):</span>
                <span className="font-bold text-amber-400">{chordDist} cm</span>
              </div>
              <input
                type="range"
                min="1"
                max={chordCircleR - 1}
                step="1"
                value={chordDist}
                onChange={(e) => setChordDist(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold">Theorem: r² = d² + (chord/2)²</div>
              <div className="text-slate-300">Half Chord = √({chordCircleR}² - {chordDist}²) = {halfChord} cm</div>
              <div className="text-emerald-400 font-bold text-base pt-1 border-t border-slate-800">
                Total Chord Length = {totalChordLength} cm
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 16. LINEAR INEQUALITIES */}
      {normalizedKey === 'inequalities' && (
        <div className="space-y-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300">Expression:</span>
              <span className="font-mono font-bold text-cyan-400 text-lg">x {ineqSign} {ineqVal}</span>
            </div>
            <div className="flex gap-2">
              {(['<=', '<', '>=', '>'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setIneqSign(s)}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                    ineqSign === s ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={ineqVal}
                onChange={(e) => setIneqVal(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* 17. TANGENTS TO A CIRCLE */}
      {normalizedKey === 'tangents' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase">Tangents from External Point P</h4>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Circle Radius (r):</span>
                <span className="font-bold text-cyan-400">{tangentRadius} cm</span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                step="1"
                value={tangentRadius}
                onChange={(e) => setTangentRadius(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Distance OP:</span>
                <span className="font-bold text-amber-400">{tangentDist} cm</span>
              </div>
              <input
                type="range"
                min={tangentRadius + 2}
                max="25"
                step="1"
                value={tangentDist}
                onChange={(e) => setTangentDist(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold">Theorem: Tangent ⊥ Radius</div>
              <div className="text-slate-300">Tangent Length = √(OP² - r²) = √({tangentDist}² - {tangentRadius}²)</div>
              <div className="text-emerald-400 font-bold text-base pt-1 border-t border-slate-800">
                PT₁ = PT₂ = {tangentLength} cm
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 18. FOUR BASIC LOCI */}
      {normalizedKey === 'loci' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setActiveLocus(num as 1 | 2 | 3 | 4)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeLocus === num ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Locus {num}
              </button>
            ))}
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
            {activeLocus === 1 && <p>Locus 1: Points equidistant from a fixed point O form a <span className="font-bold text-cyan-400">Circle</span> of radius r.</p>}
            {activeLocus === 2 && <p>Locus 2: Points equidistant from two fixed points A and B form the <span className="font-bold text-cyan-400">Perpendicular Bisector</span> of AB.</p>}
            {activeLocus === 3 && <p>Locus 3: Points at constant distance d from a straight line form a <span className="font-bold text-cyan-400">Pair of Parallel Lines</span>.</p>}
            {activeLocus === 4 && <p>Locus 4: Points equidistant from two intersecting straight lines form the <span className="font-bold text-cyan-400">Angle Bisector</span> pair.</p>}
          </div>
        </div>
      )}

      {/* 19. COORDINATE GEOMETRY */}
      {normalizedKey === 'coordinate-geometry' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <h4 className="font-bold text-indigo-400 uppercase">Points A(x₁, y₁) & B(x₂, y₂)</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>x₁: <input type="number" value={coordX1} onChange={(e) => setCoordX1(Number(e.target.value))} className="w-16 bg-slate-900 border border-slate-700 px-1 py-0.5 rounded text-cyan-400" /></div>
              <div>y₁: <input type="number" value={coordY1} onChange={(e) => setCoordY1(Number(e.target.value))} className="w-16 bg-slate-900 border border-slate-700 px-1 py-0.5 rounded text-cyan-400" /></div>
              <div>x₂: <input type="number" value={coordX2} onChange={(e) => setCoordX2(Number(e.target.value))} className="w-16 bg-slate-900 border border-slate-700 px-1 py-0.5 rounded text-amber-400" /></div>
              <div>y₂: <input type="number" value={coordY2} onChange={(e) => setCoordY2(Number(e.target.value))} className="w-16 bg-slate-900 border border-slate-700 px-1 py-0.5 rounded text-amber-400" /></div>
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div>Gradient m = (y₂ - y₁) / (x₂ - x₁) = <span className="text-cyan-400 font-bold">{gradM}</span></div>
              <div>Distance d = √((Δx)² + (Δy)²) = <span className="text-amber-400 font-bold">{distAB} units</span></div>
              <div>Midpoint M = ((x₁+x₂)/2, (y₁+y₂)/2) = <span className="text-emerald-400 font-bold">({midX}, {midY})</span></div>
            </div>
          </div>
        </div>
      )}

      {/* 20. GRAPHS OF FUNCTIONS */}
      {normalizedKey === 'graphs-functions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase">Linear Function y = mx + c</h4>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Gradient (m):</span>
                <span className="font-bold text-cyan-400">{graphM}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={graphM}
                onChange={(e) => setGraphM(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">y-Intercept (c):</span>
                <span className="font-bold text-amber-400">{graphC}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={graphC}
                onChange={(e) => setGraphC(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <div className="text-sm font-bold text-emerald-400">Equation: y = {graphM}x {graphC >= 0 ? `+ ${graphC}` : `- ${Math.abs(graphC)}`}</div>
            <div className="text-slate-300">Cuts y-axis at (0, {graphC})</div>
            {graphM !== 0 && <div className="text-slate-300">Cuts x-axis at ({(-graphC / graphM).toFixed(2)}, 0)</div>}
          </div>
        </div>
      )}

      {/* 21. SETS & VENN DIAGRAMS */}
      {normalizedKey === 'sets' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'A_intersect_B', label: 'A ∩ B (Intersection)' },
              { id: 'A_union_B', label: 'A ∪ B (Union)' },
              { id: 'A_only', label: 'A only (A \\ B)' },
              { id: 'B_only', label: 'B only (B \\ A)' },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSetRegion(r.id as any)}
                className={`px-3 py-1 rounded text-xs font-medium ${
                  setRegion === r.id ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
            <div>Formula: n(A ∪ B) = n(A) + n(B) - n(A ∩ B)</div>
            <div>n(A) = {nA_only + nIntersect}, n(B) = {nB_only + nIntersect}, n(A ∩ B) = {nIntersect}</div>
            <div className="text-emerald-400 font-bold pt-1 border-t border-slate-800">
              Total n(A ∪ B) = {nUnion} elements
            </div>
          </div>
        </div>
      )}

      {/* 22. PROBABILITY */}
      {normalizedKey === 'probability' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase">Probability P(E) = n(E) / n(S)</h4>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Favorable Outcomes n(E):</span>
                <span className="font-bold text-cyan-400">{probFavorable}</span>
              </div>
              <input
                type="range"
                min="0"
                max={probTotal}
                step="1"
                value={probFavorable}
                onChange={(e) => setProbFavorable(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Total Outcomes in Sample Space n(S):</span>
                <span className="font-bold text-amber-400">{probTotal}</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={probTotal}
                onChange={(e) => setProbTotal(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2 flex flex-col justify-center">
            <div className="text-slate-300">P(Event) = {probFavorable} / {probTotal}</div>
            <div className="text-xl font-bold text-emerald-400">{probVal} ({probPercent}%)</div>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
              0 ≤ P(E) ≤ 1 (0 = Impossible, 1 = Certain)
            </div>
          </div>
        </div>
      )}

      {/* 23. STATISTICS */}
      {normalizedKey === 'statistics' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
            <h4 className="font-bold text-indigo-400 uppercase">Assumed Mean Method: Mean = A + (Σfd / Σf)</h4>
            <div className="flex items-center gap-2">
              <span className="text-slate-300">Assumed Mean (A):</span>
              <input
                type="number"
                value={assumedMean}
                onChange={(e) => setAssumedMean(Number(e.target.value))}
                className="w-16 bg-slate-900 border border-slate-700 px-1 py-0.5 rounded text-amber-400"
              />
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
              Used in Sri Lankan O/L exams for grouped data tables to calculate estimated mean without large multipliers.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
