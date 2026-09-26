import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Activity, 
  Layers, 
  Compass, 
  Calculator, 
  Eye, 
  Info, 
  Sparkles, 
  RotateCcw,
  Sliders,
  Shield,
  Gauge,
  Flame,
  ArrowRight
} from 'lucide-react';

interface SubjectConceptVisualizerProps {
  topicId?: string;
  subjectId?: string;
  language?: 'en' | 'si' | 'ta';
  activeModeHint?: string;
}

export const SubjectConceptVisualizer: React.FC<SubjectConceptVisualizerProps> = ({
  topicId = '',
  subjectId = 'science',
  language = 'en',
  activeModeHint,
}) => {
  // Determine domain with reactive activeModeHint support
  const defaultDomain = useMemo(() => {
    if (activeModeHint) {
      const hint = activeModeHint.toLowerCase();
      if (
        hint.includes('pythagor') || hint.includes('triangle') || hint.includes('hypotenuse') || 
        hint.includes('quadrat') || hint.includes('x^2') || hint.includes('math') ||
        hint.includes('loci') || hint.includes('locus') || hint.includes('construction') ||
        hint.includes('perpendicular bisector') || hint.includes('angle bisector') ||
        hint.includes('circle') || hint.includes('chord') || hint.includes('tangent') ||
        hint.includes('පථ') || hint.includes('නිර්මාණ') || hint.includes('කෝඩ') || hint.includes('ස්පර්ශක') ||
        hint.includes('ஒழுக்கு') || hint.includes('வட்டம்')
      ) {
        return 'maths';
      }
      if (hint.includes('bond') || hint.includes('ionic') || hint.includes('covalent') || hint.includes('nacl') || hint.includes('h2o') || hint.includes('chem')) {
        return 'chemistry';
      }
      if (hint.includes('newton') || hint.includes('pressure') || hint.includes('ohm') || hint.includes('physics')) {
        return 'physics';
      }
      if (hint.includes('cell') || hint.includes('mitochondria') || hint.includes('chloroplast') || hint.includes('bio')) {
        return 'biology';
      }
      if (
        hint.includes('history') || hint.includes('sluice') || hint.includes('brahmi') || hint.includes('sellipi') ||
        hint.includes('parumaka') || hint.includes('පරුමක') || hint.includes('gamika') || hint.includes('ගාමික') ||
        hint.includes('gamani') || hint.includes('ගාමිණී') || hint.includes('dutugemunu') || hint.includes('දුටුගැමුණු') ||
        hint.includes('renaissance') || hint.includes('පුනරුදය') || hint.includes('මහා සෑය') || hint.includes('ruwanweliseya') ||
        hint.includes('අනුරාධපුර') || hint.includes('පොළොන්නරු') || hint.includes('anuradhapura') || hint.includes('polonnaruwa') ||
        hint.includes('sigiriya') || hint.includes('සීගිරිය') || hint.includes('ඉතිහාසය') || hint.includes('வரலாறு')
      ) {
        return 'history';
      }
    }

    if (subjectId === 'history' || topicId.includes('history')) return 'history';
    if (subjectId === 'maths' || topicId.includes('pythagoras') || topicId.includes('math')) return 'maths';
    if (
      topicId.includes('cell') || 
      topicId.includes('organism') || 
      topicId.includes('classification') || 
      topicId.includes('continuity') || 
      topicId.includes('inheritance') ||
      topicId.includes('respiration') ||
      topicId.includes('photosynthesis')
    ) {
      return 'biology';
    }
    if (
      topicId.includes('chemical') || 
      topicId.includes('matter') || 
      topicId.includes('bonds') || 
      topicId.includes('quantification') || 
      topicId.includes('changes')
    ) {
      return 'chemistry';
    }
    return 'physics';
  }, [subjectId, topicId, activeModeHint]);

  const [domain, setDomain] = useState<'physics' | 'biology' | 'chemistry' | 'history' | 'maths'>(defaultDomain);

  React.useEffect(() => {
    setDomain(defaultDomain);
  }, [defaultDomain]);

  // --------------------------------------------------------------------------
  // PHYSICS LAB STATE
  // --------------------------------------------------------------------------
  const [physicsMode, setPhysicsMode] = useState<'newton' | 'pressure' | 'ohm'>('newton');
  const [force, setForce] = useState<number>(30); // 5N - 100N
  const [mass, setMass] = useState<number>(5); // 1kg - 20kg
  const [depth, setDepth] = useState<number>(15); // 1m - 50m
  const [voltage, setVoltage] = useState<number>(12); // 1V - 24V
  const [resistance, setResistance] = useState<number>(6); // 1Ω - 30Ω

  // Physics calculations
  const acceleration = (force / mass).toFixed(2);
  const liquidPressure = (depth * 1000 * 10 / 1000).toFixed(1); // kPa (h * rho * g)
  const currentAmp = (voltage / resistance).toFixed(2);

  // --------------------------------------------------------------------------
  // BIOLOGY LAB STATE
  // --------------------------------------------------------------------------
  const [cellType, setCellType] = useState<'plant' | 'animal'>('plant');
  const [activeOrganelle, setActiveOrganelle] = useState<string>('nucleus');

  const organelles: Record<string, { en: string; si: string; ta: string; descEn: string; descSi: string; descTa: string; plantOnly?: boolean }> = {
    nucleus: {
      en: 'Nucleus (Control Center)',
      si: 'න්‍යෂ්ටිය (පාලන කේන්ද්‍රය)',
      ta: 'கரு (கட்டுப்பாட்டு மையம்)',
      descEn: 'Contains hereditary genetic material (chromatin/DNA) that directs all cell metabolic activities and division.',
      descSi: 'සෛලයේ සියලු ජීව ක්‍රියා හා සෛල බෙදීම පාලනය කරන පාරම්පරික ද්‍රව්‍ය (DNA) රඳවා තබාගනී.',
      descTa: 'கலத்தின் அனைத்து வளர்ச்சி மற்றும் தொழிற்பாடுகளை கட்டுப்படுத்தும் பரம்பரை DNA மூலக்கூறுகளை கொண்டுள்ளது.'
    },
    mitochondria: {
      en: 'Mitochondria (Powerhouse)',
      si: 'මයිටොකොන්ඩ්‍රියා (බලස්ථානය)',
      ta: 'இழைமணி (சக்தி பிறப்பிடம்)',
      descEn: 'Carries out aerobic cellular respiration to generate energy currency in the form of ATP molecules.',
      descSi: 'වායුගෝලීය ඔක්සිජන් භාවිතයෙන් සෛලීය ශ්වසනය සිදු කර ATP ආකාරයෙන් ජීවීන්ට අවශ්‍ය ශක්තිය නිපදවයි.',
      descTa: 'கல சுவாசத்தை மேற்கொண்டு ATP வடிவில் தேவையான சக்தியை பிறப்பிக்கிறது.'
    },
    chloroplast: {
      en: 'Chloroplast (Food Factory)',
      si: 'හරිතලව (ආහාර කර්මාන්තශාලාව)',
      ta: 'பசையவுருவம் (உணவுத் தொழிற்சாலை)',
      descEn: 'Contains green chlorophyll pigment to trap solar radiation and drive photosynthesis in plant cells.',
      descSi: 'සූර්ය ශක්තිය ග්‍රහණය කර ප්‍රභාසංස්ලේෂණය මඟින් ග්ලූකෝස් ආහාර නිෂ්පාදනය කිරීමට හරිතප්‍රද අඩංගු වේ.',
      descTa: 'சூரிய ஒளியை உறிஞ்சி ஒளித்தொகுப்பு மூலம் குளுக்கோஸ் உணவைத் தயாரிக்கிறது.',
      plantOnly: true
    },
    cellWall: {
      en: 'Cell Wall (Rigid Armor)',
      si: 'සෛල බිත්තිය (දැඩි ආවරණය)',
      ta: 'கலச்சுவர் (பாதுகாப்புக் கவசம்)',
      descEn: 'Rigid protective outer envelope composed of cellulose, providing structural turgidity and shape.',
      descSi: 'සෙලියුලෝස් වලින් සැදි දැඩි බාහිර ස්ථරයයි. ශාක සෛලයට නියත හැඩයක් සහ ශක්තියක් ලබාදෙයි.',
      descTa: 'செல்லுலோசால் ஆன உறுதியான வெளிப்புற அடுக்கு. தாவர கலத்திற்கு நிலையான வடிவத்தையும் உறுதியையும் அளிக்கிறது.',
      plantOnly: true
    },
    vacuole: {
      en: 'Large Central Vacuole',
      si: 'විශාල මධ්‍ය රික්තකය',
      ta: 'பெரிய மைய நுண்குமிழி',
      descEn: 'Stores cell sap (water, minerals, sugars) and maintains osmotic turgor pressure in plant tissues.',
      descSi: 'සෛල යුෂය ගබඩා කරමින් ශාක සෛලයේ තදබව (ශූනතාව) සහ ජල තුල්‍යතාව පවත්වා ගනී.',
      descTa: 'கலச்சாற்றை சேமித்து கலத்தின் வீக்க அமுக்கத்தை பேணுகிறது.',
      plantOnly: true
    }
  };

  // --------------------------------------------------------------------------
  // CHEMISTRY LAB STATE: CHEMICAL BONDING (IONIC vs COVALENT)
  // --------------------------------------------------------------------------
  const [bondType, setBondType] = useState<'ionic' | 'covalent'>('ionic');
  const [transferred, setTransferred] = useState<boolean>(false);
  const [covalentOverlap, setCovalentOverlap] = useState<number>(75); // 20 to 100%
  const [covalentMolecule, setCovalentMolecule] = useState<'h2o' | 'h2'>('h2o');

  // --------------------------------------------------------------------------
  // HISTORY EXPLORER STATE
  // --------------------------------------------------------------------------
  const [historyMode, setHistoryMode] = useState<'sluice' | 'brahmi'>('sluice');
  const [reservoirDepth, setReservoirDepth] = useState<number>(20); // 5m - 40m
  const [activeBrahmiChar, setActiveBrahmiChar] = useState<number>(0);

  const brahmiCharacters = [
    { glyph: '𑀧', translit: 'Pa', term: 'Parumaka (පරුමක)', meaningEn: 'Ancient clan chieftain or community leader title found in cave inscriptions', meaningSi: 'ලෙන් ලිපි වල හමුවන ගෝත්‍ර ප්‍රධානියා හෝ පාලකයා හැඳින්වූ ගෞරව නාමය', meaningTa: 'பண்டைய குகைக் கல்வெட்டுகளில் காணப்படும் தலைவரின் பட்டப்பெயர்' },
    { glyph: '𑀕', translit: 'Ga', term: 'Gāmani (ගාමිණී)', meaningEn: 'Village administrator or early royal title representing governance', meaningSi: 'ග්‍රාම පාලකයා හෝ මුල් යුගයේ පාලක නාමය', meaningTa: 'கிராமத் தலைவர் அல்லது ஆரம்பகால அரசப் பெயர்' },
    { glyph: '𑀯', translit: 'Va', term: 'Vāpi (වාපී)', meaningEn: 'Water reservoir or tank constructed for agricultural irrigation', meaningSi: 'කෘෂිකාර්මික වාරිමාර්ග සඳහා තැනූ වැව', meaningTa: 'விவசாய பாசனத்திற்காக அமைக்கப்பட்ட குளம்/ஏரி' },
    { glyph: '𑀮', translit: 'La', term: 'Lene (ලෙන)', meaningEn: 'Rock shelter or cave donated to the Buddhist Sangha', meaningSi: 'මහා සංඝරත්නය වෙත පූජා කළ ස්වාභාවික ගල් ගුහාව', meaningTa: 'சங்கத்தினருக்கு தானமாக வழங்கப்பட்ட குகை' },
  ];

  // --------------------------------------------------------------------------
  // MATHEMATICS LAB STATE: PYTHAGORAS TRIANGLE ABC & QUADRATICS
  // --------------------------------------------------------------------------
  const [mathsMode, setMathsMode] = useState<'pythagoras' | 'quadratic' | 'loci' | 'circle'>('pythagoras');
  const [pythMode, setPythMode] = useState<'findAC' | 'findAB'>('findAC');
  const [sideAB, setSideAB] = useState<number>(3); // Perpendicular height
  const [sideBC, setSideBC] = useState<number>(4); // Base
  const [sideAC, setSideAC] = useState<number>(5); // Hypotenuse when in findAB mode
  const [showSquares, setShowSquares] = useState<boolean>(true);

  // Computations for Pythagoras
  const calculatedAC = Math.sqrt(sideAB * sideAB + sideBC * sideBC);
  const formattedAC = Number.isInteger(calculatedAC) ? calculatedAC.toString() : calculatedAC.toFixed(2);
  const areaAB = sideAB * sideAB;
  const areaBC = sideBC * sideBC;
  const areaAC = areaAB + areaBC;

  const calculatedAB = pythMode === 'findAB' && sideAC > sideBC ? Math.sqrt(sideAC * sideAC - sideBC * sideBC) : 0;
  const formattedAB = Number.isInteger(calculatedAB) ? calculatedAB.toString() : calculatedAB.toFixed(2);

  // Quadratic equation state: ax² + bx + c = 0 (default to x² + 5x + 6 = 0)
  const [coefA, setCoefA] = useState<number>(1);
  const [coefB, setCoefB] = useState<number>(5);
  const [coefC, setCoefC] = useState<number>(6);
  const discriminant = coefB * coefB - 4 * coefA * coefC;
  const root1 = discriminant >= 0 ? ((-coefB + Math.sqrt(discriminant)) / (2 * coefA)).toFixed(2) : null;
  const root2 = discriminant >= 0 ? ((-coefB - Math.sqrt(discriminant)) / (2 * coefA)).toFixed(2) : null;
  const vertexX = (-coefB / (2 * coefA)).toFixed(2);
  const vertexY = (coefC - (coefB * coefB) / (4 * coefA)).toFixed(2);

  // --------------------------------------------------------------------------
  // LOCI LAB STATE (Grade 10 Chapter 18: Four Basic Loci)
  // --------------------------------------------------------------------------
  const [activeLocus, setActiveLocus] = useState<1 | 2 | 3 | 4>(1);
  const [locusRadius, setLocusRadius] = useState<number>(45); // Locus 1 radius
  const [locusAngle, setLocusAngle] = useState<number>(45); // Locus 1 angle in degrees
  const [locus2PPos, setLocus2PPos] = useState<number>(10); // Locus 2 position along bisector (-40 to 40)
  const [locus3Dist, setLocus3Dist] = useState<number>(28); // Locus 3 distance d (15 to 45)
  const [locus3PPos, setLocus3PPos] = useState<number>(40); // Locus 3 position of P along parallel line
  const [locus4Angle, setLocus4Angle] = useState<number>(60); // Locus 4 angle between lines (30 to 110)
  const [locus4DistP, setLocus4DistP] = useState<number>(55); // Locus 4 distance of P from vertex

  // --------------------------------------------------------------------------
  // CIRCLE THEOREMS LAB STATE (Grade 10 Chapters 15 & 17)
  // --------------------------------------------------------------------------
  const [circleTab, setCircleTab] = useState<'angleAtCenter' | 'chordBisector' | 'tangentRadius'>('angleAtCenter');
  const [circTheta, setCircTheta] = useState<number>(36); // Theta at circumference (center is 2*theta = 72)
  const [chordDistance, setChordDistance] = useState<number>(30); // Distance of chord from center (10 to 45)

  // Reactive submode switching based on activeModeHint
  React.useEffect(() => {
    if (!activeModeHint) return;
    const hint = activeModeHint.toLowerCase();
    if (
      hint.includes('loci') || hint.includes('locus') || hint.includes('construction') ||
      hint.includes('perpendicular bisector') || hint.includes('angle bisector') ||
      hint.includes('පථ') || hint.includes('නිර්මාණ') || hint.includes('ඔழுக்கு')
    ) {
      setMathsMode('loci');
    } else if (
      hint.includes('circle') || hint.includes('chord') || hint.includes('tangent') ||
      hint.includes('කෝඩ') || hint.includes('ස්පර්ශක') || hint.includes('වෘත්ත') || hint.includes('வட்டம்')
    ) {
      setMathsMode('circle');
    } else if (hint.includes('pythagor') || hint.includes('triangle') || hint.includes('hypotenuse') || hint.includes('ac')) {
      setMathsMode('pythagoras');
    } else if (hint.includes('quadrat') || hint.includes('x^2') || hint.includes('root') || hint.includes('factor')) {
      setMathsMode('quadratic');
    } else if (hint.includes('ionic') || hint.includes('nacl')) {
      setBondType('ionic');
    } else if (hint.includes('covalent') || hint.includes('water') || hint.includes('h2o')) {
      setBondType('covalent');
    } else if (
      hint.includes('parumaka') || hint.includes('පරුමක') ||
      hint.includes('gamika') || hint.includes('ගාමික') ||
      hint.includes('gamani') || hint.includes('ගාමිණී') ||
      hint.includes('brahmi') || hint.includes('sellipi') || hint.includes('inscription') ||
      hint.includes('ලෙන් ලිපි') || hint.includes('සෙල්ලිපි') || hint.includes('ශිලා ලේඛන')
    ) {
      setHistoryMode('brahmi');
      if (hint.includes('parumaka') || hint.includes('පරුමක')) {
        setActiveBrahmiChar(0); // Parumaka (𑀧)
      } else if (hint.includes('gamika') || hint.includes('ගාමික') || hint.includes('gamani') || hint.includes('ගාමිණී')) {
        setActiveBrahmiChar(1); // Gāmani (𑀕)
      } else if (hint.includes('vapi') || hint.includes('වාපී') || hint.includes('tank')) {
        setActiveBrahmiChar(2); // Vāpi (𑀯)
      } else if (hint.includes('lene') || hint.includes('ලෙන') || hint.includes('cave')) {
        setActiveBrahmiChar(3); // Lene (𑀮)
      }
    } else if (hint.includes('sluice') || hint.includes('bisokotuwa') || hint.includes('බිසෝකොටුව') || hint.includes('hydraulic') || hint.includes('වාරි')) {
      setHistoryMode('sluice');
    }
  }, [activeModeHint]);

  // --------------------------------------------------------------------------
  // RENDER SECTIONS
  // --------------------------------------------------------------------------
  return (
    <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-5">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            {domain === 'physics' && <Activity className="w-4 h-4" />}
            {domain === 'biology' && <Eye className="w-4 h-4" />}
            {domain === 'chemistry' && <Flame className="w-4 h-4" />}
            {domain === 'history' && <Compass className="w-4 h-4" />}
            {domain === 'maths' && <Calculator className="w-4 h-4" />}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>
                {domain === 'physics' && (language === 'si' ? 'අන්තර්ක්‍රියාකාරී භෞතික විද්‍යාගාරය' : language === 'ta' ? 'ஊடாடும் பௌதீக ஆய்வுகூடம்' : 'Interactive Physics Laboratory')}
                {domain === 'biology' && (language === 'si' ? 'අන්වීක්ෂීය සෛල ගවේෂකය' : language === 'ta' ? 'நுண்ணோக்கி கல ஆய்வி' : 'Microscopic Cell Explorer')}
                {domain === 'chemistry' && (language === 'si' ? 'රසායනික බන්ධන හා පරමාණු විද්‍යාගාරය' : language === 'ta' ? 'இரசாயனப் பிணைப்பு ஆய்வுகூடம்' : 'Chemical Bonding & Atomic Lab')}
                {domain === 'history' && (language === 'si' ? 'පුරාණ වාරි හා සෙල්ලිපි ගවේෂකය' : language === 'ta' ? 'நீரியல் & கல்வெட்டு ஆய்வி' : 'Hydraulic & Inscription Explorer')}
                {domain === 'maths' && (
                  mathsMode === 'loci'
                    ? (language === 'si' ? 'මූලික පථ හතර සහ නිර්මාණ ආදර්ශකය' : language === 'ta' ? 'நான்கு அடிப்படை ஒழுக்குகளும் அமைப்புகளும்' : 'Four Basic Loci & Constructions Lab')
                    : mathsMode === 'circle'
                    ? (language === 'si' ? 'වෘත්ත ප්‍රමේය සහ ස්පර්ශක ආදර්ශකය' : language === 'ta' ? 'வட்டத் தேற்றங்கள் ஆய்வுகூடம்' : 'Circle Theorems & Tangents Lab')
                    : mathsMode === 'quadratic'
                    ? (language === 'si' ? 'වර්ගජ සමීකරණ හා ප්‍රස්තාර ආදර්ශකය' : language === 'ta' ? 'இருபடிச் சமன்பாடுகள் ஆய்வுகூடம்' : 'Quadratic Equations & Parabola Lab')
                    : (language === 'si' ? 'ජ්‍යාමිතික පයිතගරස් ආදර්ශකය' : language === 'ta' ? 'பைதகரசு கேத்திரகணித மாதிரி' : 'Geometric Pythagoras Simulator')
                )}
              </span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-semibold px-2 py-0.5 rounded-full border border-cyan-500/30">
                Live Simulation
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              {language === 'si' ? 'පරාමිතීන් වෙනස් කර තත්‍ය කාලීනව විද්‍යාත්මක හැසිරීම නිරීක්ෂණය කරන්න' : language === 'ta' ? 'அளவீடுகளை மாற்றி நிகழ்நேர மாற்றங்களைக் கவனியுங்கள்' : 'Adjust variables to observe real-time scientific principles and calculations'}
            </p>
          </div>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 1. PHYSICS DOMAIN                                                      */}
      {/* ====================================================================== */}
      {domain === 'physics' && (
        <div className="space-y-4">
          {/* Sub-mode selector */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPhysicsMode('newton')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                physicsMode === 'newton' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Newton (F = ma)
            </button>
            <button
              type="button"
              onClick={() => setPhysicsMode('pressure')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                physicsMode === 'pressure' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Pressure (P = hρg)
            </button>
            <button
              type="button"
              onClick={() => setPhysicsMode('ohm')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                physicsMode === 'ohm' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Electricity (V = IR)
            </button>
          </div>

          {/* NEWTON MODE */}
          {physicsMode === 'newton' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Force (F in Newtons):</span>
                    <span className="font-bold text-cyan-400">{force} N</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={force}
                    onChange={(e) => setForce(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Mass (m in Kilograms):</span>
                    <span className="font-bold text-cyan-400">{mass} kg</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={mass}
                    onChange={(e) => setMass(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Formula:</span>
                  <span className="text-xs font-mono font-bold text-amber-400">a = F / m = {force} / {mass}</span>
                </div>
              </div>

              {/* Newton Visualization */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Resulting Acceleration:</span>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {acceleration} <span className="text-xs font-normal text-slate-400">m/s²</span>
                  </div>
                </div>

                {/* Animated Track */}
                <div className="relative h-14 bg-slate-900 rounded-lg border border-slate-800 overflow-hidden flex items-center px-3">
                  <div className="absolute left-0 right-0 h-0.5 bg-slate-700 top-1/2 -translate-y-1/2" />
                  <div 
                    className="relative px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded text-slate-950 font-bold text-xs shadow-lg transition-all duration-300 flex items-center gap-1.5"
                    style={{
                      transform: `translateX(${Math.min(220, Math.max(0, Number(acceleration) * 20))}px)`
                    }}
                  >
                    <span>Trolley ({mass}kg)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  Sri Lankan Context: A three-wheeler accelerating faster when carrying 1 passenger vs fully loaded with 4 passengers on Kandy road hills.
                </p>
              </div>
            </div>
          )}

          {/* PRESSURE MODE */}
          {physicsMode === 'pressure' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Water Depth (h in meters):</span>
                    <span className="font-bold text-cyan-400">{depth} m</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div>Liquid Density (ρ): <span className="font-mono text-cyan-400">1000 kg/m³</span> (Freshwater)</div>
                  <div>Gravitational Acc (g): <span className="font-mono text-cyan-400">10 m/s²</span></div>
                  <div className="text-amber-400 font-mono pt-1">P = h × ρ × g = {depth} × 1000 × 10</div>
                </div>
              </div>

              {/* Dam Wall Visualizer */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Hydrostatic Pressure:</span>
                  <div className="text-2xl font-black text-cyan-400 font-mono">
                    {liquidPressure} <span className="text-xs font-normal text-slate-400">kPa</span>
                  </div>
                </div>

                {/* Dam Cross Section */}
                <div className="relative h-20 bg-gradient-to-b from-sky-950 to-blue-900 rounded-lg border border-slate-800 overflow-hidden flex items-end justify-between px-3 pb-2">
                  <div className="text-[10px] text-sky-200">
                    Surface (0 kPa)
                  </div>
                  <div 
                    className="bg-amber-600/80 border-l border-amber-400 rounded-t"
                    style={{ width: `${Math.min(100, 20 + depth * 1.5)}px`, height: '100%' }}
                  >
                    <div className="text-[9px] text-white p-1 text-center font-bold">Thick Dam Wall</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  Sri Lankan Context: Why Victoria Dam and Kotmale Dam walls are engineered with thick bases to withstand massive water pressure.
                </p>
              </div>
            </div>
          )}

          {/* OHM MODE */}
          {physicsMode === 'ohm' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Voltage Source (V in Volts):</span>
                    <span className="font-bold text-amber-400">{voltage} V</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    step="1"
                    value={voltage}
                    onChange={(e) => setVoltage(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Circuit Resistance (R in Ohms):</span>
                    <span className="font-bold text-amber-400">{resistance} Ω</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={resistance}
                    onChange={(e) => setResistance(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Current Flow (I = V/R):</span>
                  <div className="text-2xl font-black text-amber-400 font-mono">
                    {currentAmp} <span className="text-xs font-normal text-slate-400">Amperes (A)</span>
                  </div>
                </div>

                {/* Glowing Bulb Simulation */}
                <div className="flex items-center justify-center py-2">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: Number(currentAmp) > 0.5 ? '#f59e0b' : '#334155',
                      boxShadow: Number(currentAmp) > 0.5 ? `0 0 ${Math.min(50, Number(currentAmp) * 15)}px #f59e0b` : 'none'
                    }}
                  >
                    <Zap className="w-6 h-6 text-slate-950" />
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  Ohm's Law: Higher resistance throttles electric current, protecting domestic appliances across CEB power grids.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ====================================================================== */}
      {/* 2. BIOLOGY DOMAIN                                                      */}
      {/* ====================================================================== */}
      {domain === 'biology' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCellType('plant')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  cellType === 'plant' 
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Plant Cell (ශාක සෛලය)
              </button>
              <button
                type="button"
                onClick={() => setCellType('animal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  cellType === 'animal' 
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Animal Cell (සත්ත්ව සෛලය)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Organelle Selector List */}
            <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Select Organelle
              </span>
              {Object.entries(organelles).map(([key, info]) => {
                if (cellType === 'animal' && info.plantOnly) return null;
                const isSelected = activeOrganelle === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveOrganelle(key)}
                    className={`w-full text-left p-2 rounded-lg text-xs font-semibold transition-all ${
                      isSelected 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {language === 'si' ? info.si : language === 'ta' ? info.ta : info.en}
                  </button>
                );
              })}
            </div>

            {/* Microscopic Organelle Detail Inspector */}
            <div className="md:col-span-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {language === 'si' ? organelles[activeOrganelle]?.si : language === 'ta' ? organelles[activeOrganelle]?.ta : organelles[activeOrganelle]?.en}
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                  {cellType === 'plant' ? 'Plant Architecture' : 'Animal Architecture'}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'si' ? organelles[activeOrganelle]?.descSi : language === 'ta' ? organelles[activeOrganelle]?.descTa : organelles[activeOrganelle]?.descEn}
              </p>

              <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-200/90">
                <strong>O/L Exam Focus:</strong> {cellType === 'plant' 
                  ? 'Plant cells possess a rigid cellulose cell wall, chloroplasts for photosynthesis, and a large central vacuole.' 
                  : 'Animal cells lack cell walls and chloroplasts, allowing flexible shapes and active motility.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 3. CHEMISTRY DOMAIN: CHEMICAL BONDING & ELECTRON SHARING               */}
      {/* ====================================================================== */}
      {domain === 'chemistry' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => { setBondType('ionic'); setTransferred(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                bondType === 'ionic' 
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Ionic Bond (NaCl / ලුණු)
            </button>
            <button
              type="button"
              onClick={() => { setBondType('covalent'); setTransferred(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                bondType === 'covalent' 
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Covalent Bond (H₂O / ජලය)
            </button>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
            {bondType === 'ionic' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                  <span className="font-semibold text-rose-300">Ionic Electron Transfer (Na → Cl)</span>
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
                    <span className="font-semibold">Chemical Reaction:</span>
                    <span className="font-mono text-cyan-300 font-bold">2Na (s) + Cl₂ (g) ➔ 2NaCl (s)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {language === 'si'
                      ? 'සෝඩියම් පරමාණුව සිය බාහිර ඉලෙක්ට්‍රෝනය ක්ලෝරීන් වෙත පරිත්‍යාග කර Na⁺ කැටායනයක් සහ Cl⁻ ඇනායනයක් සාදයි. ප්‍රතිවිරුද්ධ ආරෝපණ අතර ස්ථිති විද්‍යුත් ආකර්ෂණයෙන් අයනික බන්ධනය නිර්මාණය වේ.'
                      : language === 'ta'
                      ? 'சோடியம் அணு தனது ஈற்றோட்டு இலத்திரனை குளோரினுக்கு வழங்கி Na⁺ கற்றயனாகவும் Cl⁻ அன்னயனாகவும் மாறுகிறது. எதிரெதிர் ஏற்றங்களுக்கிடையிலான நிலைமின்னியல் கவர்ச்சி அயன் பிணைப்பை உருவாக்குகிறது.'
                      : 'Sodium donates its single valence electron to chlorine, forming Na⁺ and Cl⁻ ions. Electrostatic attraction binds them into an ionic lattice with high melting point and electrical conductivity in molten/aqueous state.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                  <span className="font-semibold text-sky-300">Covalent Bond (Electron Sharing in H₂O)</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400">Overlap:</span>
                    <span className="font-mono text-sky-400 font-bold">{covalentOverlap}%</span>
                  </div>
                </div>

                {/* Overlap Distance Slider */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                    <span>Separated Atoms</span>
                    <span className="font-bold text-sky-400">Molecular Covalent Bond Formed</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={covalentOverlap}
                    onChange={(e) => setCovalentOverlap(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />
                </div>

                {/* Molecule Diagram */}
                <div className="flex items-center justify-center py-4 bg-slate-900/40 rounded-xl border border-sky-500/20">
                  <div className="flex items-center justify-center" style={{ gap: `${Math.max(2, (100 - covalentOverlap) * 0.4)}px` }}>
                    {/* Left Hydrogen */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full border-2 border-sky-400 bg-sky-950/60 flex items-center justify-center text-xs font-bold text-sky-200 relative">
                        H
                        {covalentOverlap > 70 && (
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-sm shadow-cyan-300 animate-ping" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1">Duplet (2e⁻)</span>
                    </div>

                    {/* Central Oxygen */}
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full border-2 border-rose-400 bg-rose-950/60 flex flex-col items-center justify-center text-xs font-bold text-rose-200 relative shadow-md">
                        <span>O</span>
                        <span className="text-[9px] font-mono text-rose-300">8p</span>
                        {covalentOverlap > 70 && (
                          <div className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
                            <span className="w-2 h-2 rounded-full bg-cyan-300" title="Shared pair 1" />
                            <span className="w-2 h-2 rounded-full bg-cyan-300" title="Shared pair 2" />
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1">Octet (8e⁻)</span>
                    </div>

                    {/* Right Hydrogen */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full border-2 border-sky-400 bg-sky-950/60 flex items-center justify-center text-xs font-bold text-sky-200 relative">
                        H
                        {covalentOverlap > 70 && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-sm shadow-cyan-300 animate-ping" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1">Duplet (2e⁻)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">Electron Sharing:</span>
                    <span className="font-mono text-sky-300 font-bold">2 Single Covalent Bonds (H—O—H)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {language === 'si'
                      ? 'ඔක්සිජන් පරමාණුව හයිඩ්‍රජන් පරමාණු දෙකක් සමඟ ඉලෙක්ට්‍රෝන යුගල 2ක් හවුලේ තබා ගනිමින් ස්ථායී සහසංයුජ බන්ධන (H₂O) සාදයි. හයිඩ්‍රජන් ද්විත්ව නීතිය ද ඔක්සිජන් අෂ්ටක නීතිය ද සම්පූර්ණ කර ගනී.'
                      : language === 'ta'
                      ? 'ஒட்சிசன் அணு இரு ஐதரசன் அணுக்களுடன் இரு சோடி இலத்திரன்களைப் பகிர்ந்து நிலைபேறான பங்கீட்டுப் பிணைப்பை (H₂O) உருவாக்குகிறது.'
                      : 'Oxygen shares two pairs of electrons with two Hydrogen atoms. Each hydrogen completes its duplet (2e⁻) while oxygen completes its octet (8e⁻), forming water (H₂O) with low melting point and non-conductivity.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 4. HISTORY DOMAIN                                                      */}
      {/* ====================================================================== */}
      {domain === 'history' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setHistoryMode('sluice')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                historyMode === 'sluice' 
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Bisokotuwa Sluice Gate (බිසෝකොටුව)
            </button>
            <button
              type="button"
              onClick={() => setHistoryMode('brahmi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                historyMode === 'brahmi' 
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Brahmi Script Decipherer (සෙල්ලිපි)
            </button>
          </div>

          {historyMode === 'sluice' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Reservoir Water Depth (h):</span>
                    <span className="font-bold text-amber-400">{reservoirDepth} meters</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="5"
                    value={reservoirDepth}
                    onChange={(e) => setReservoirDepth(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
                <div className="text-[11px] text-slate-300 space-y-1 pt-2 border-t border-slate-800">
                  <div>Deep Water Hydrostatic Thrust: <span className="font-mono text-cyan-400">{(reservoirDepth * 10).toFixed(0)} kPa</span></div>
                  <div>Sluice Water Exit Velocity: <span className="font-mono text-emerald-400">Controlled (Safe Trickle)</span></div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  <span>The Ancient Engineering Miracle</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Before the 3rd Century BC, massive dams would wash away under raging deep water pressure. Ancient Sinhala engineers invented the <strong>Bisokotuwa</strong> (enclosed stone pressure valve). Water entered stone chambers where turbulence was absorbed, releasing smooth water into distribution canals without breaching the earthen bund!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Click Early Brahmi Glyphs to Decipher Rock Inscriptions:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {brahmiCharacters.map((char, index) => {
                  const isSelected = activeBrahmiChar === index;
                  return (
                    <button
                      key={char.translit}
                      type="button"
                      onClick={() => setActiveBrahmiChar(index)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected 
                          ? 'border-amber-400 bg-amber-500/20 text-amber-300' 
                          : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-3xl font-serif mb-1">{char.glyph}</div>
                      <div className="text-xs font-bold">{char.term}</div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-lg text-xs text-amber-200">
                <strong>Historical Meaning:</strong> {language === 'si' ? brahmiCharacters[activeBrahmiChar].meaningSi : language === 'ta' ? brahmiCharacters[activeBrahmiChar].meaningTa : brahmiCharacters[activeBrahmiChar].meaningEn}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ====================================================================== */}
      {/* 5. MATHEMATICS DOMAIN: TRIANGLE ABC PYTHAGORAS & QUADRATICS            */}
      {/* ====================================================================== */}
      {domain === 'maths' && (
        <div className="space-y-4">
          {/* Sub-mode selector */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMathsMode('pythagoras')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mathsMode === 'pythagoras' 
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Pythagoras: Right Triangle ABC (AC² = AB² + BC²)
            </button>
            <button
              type="button"
              onClick={() => setMathsMode('quadratic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mathsMode === 'quadratic' 
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Quadratic Solver (ax² + bx + c = 0)
            </button>
            <button
              type="button"
              onClick={() => setMathsMode('loci')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mathsMode === 'loci' 
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Four Basic Loci (Chapter 18: පථ)
            </button>
            <button
              type="button"
              onClick={() => setMathsMode('circle')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mathsMode === 'circle' 
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Circle Theorems (Chapters 15 & 17: වෘත්ත)
            </button>
          </div>

          {mathsMode === 'pythagoras' ? (
            <div className="space-y-4">
              {/* Presets and Mode Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPythMode('findAC')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      pythMode === 'findAC' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Find Hypotenuse AC
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPythMode('findAB'); setSideAC(5); setSideBC(4); }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      pythMode === 'findAB' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Find Perpendicular AB
                  </button>
                </div>

                {/* Common Pythagorean Triple Presets */}
                <div className="flex items-center gap-1 text-[11px]">
                  <span className="text-slate-400 hidden sm:inline">Triples:</span>
                  {[
                    { label: '3, 4, 5', a: 3, b: 4, c: 5 },
                    { label: '6, 8, 10', a: 6, b: 8, c: 10 },
                    { label: '5, 12, 13', a: 5, b: 12, c: 13 },
                    { label: '8, 15, 17', a: 8, b: 15, c: 17 },
                  ].map((triple) => (
                    <button
                      key={triple.label}
                      type="button"
                      onClick={() => {
                        setSideAB(triple.a);
                        setSideBC(triple.b);
                        setSideAC(triple.c);
                      }}
                      className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-indigo-900/60 text-indigo-300 font-mono text-[10px] border border-slate-700 hover:border-indigo-500/40 transition-colors"
                    >
                      {triple.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Visual SVG Diagram for Triangle ABC */}
                <div className="md:col-span-6 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                    <span className="font-semibold text-indigo-300">Right-Angled Triangle ABC (∠B = 90°)</span>
                    <span className="font-mono text-[10px] text-amber-300 font-bold">
                      Hypotenuse AC = {pythMode === 'findAC' ? formattedAC : sideAC}
                    </span>
                  </div>

                  {/* SVG Canvas for Triangle ABC */}
                  <div className="flex items-center justify-center py-2 bg-slate-900/30 rounded-lg border border-slate-800/60">
                    {(() => {
                      const maxDim = Math.max(sideAB, sideBC, pythMode === 'findAC' ? calculatedAC : sideAC, 5);
                      const basePx = Math.min(180, Math.max(70, (sideBC / maxDim) * 180));
                      const heightPx = Math.min(115, Math.max(50, ((pythMode === 'findAC' ? sideAB : calculatedAB) / maxDim) * 115));
                      const bx = 45;
                      const by = 145;
                      const ax = 45;
                      const ay = by - heightPx;
                      const cx = bx + basePx;
                      const cy = by;

                      return (
                        <svg viewBox="0 0 270 175" className="w-full max-w-[270px] h-[175px] overflow-visible">
                          <defs>
                            <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                            </linearGradient>
                          </defs>

                          {/* Grid backdrop */}
                          <pattern id="grid" width="15" height="15" patternUnits="userSpaceOnUse">
                            <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                          </pattern>
                          <rect width="270" height="175" fill="url(#grid)" opacity="0.6" rx="8" />

                          {/* Triangle ABC Polygon */}
                          <polygon
                            points={`${bx},${by} ${ax},${ay} ${cx},${cy}`}
                            fill="url(#triGrad)"
                            stroke="#818cf8"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                          />

                          {/* Right Angle Marker at B */}
                          <path
                            d={`M ${bx} ${by - 14} L ${bx + 14} ${by - 14} L ${bx + 14} ${by}`}
                            fill="rgba(129, 140, 248, 0.25)"
                            stroke="#818cf8"
                            strokeWidth="1.5"
                          />

                          {/* Vertex Dots */}
                          <circle cx={bx} cy={by} r="4" fill="#818cf8" />
                          <circle cx={ax} cy={ay} r="4" fill="#38bdf8" />
                          <circle cx={cx} cy={cy} r="4" fill="#34d399" />

                          {/* Vertex Labels */}
                          <text x={bx - 26} y={by + 16} fill="#c7d2fe" fontSize="12" fontWeight="bold">B (90°)</text>
                          <text x={ax - 18} y={ay - 4} fill="#7dd3fc" fontSize="13" fontWeight="bold">A</text>
                          <text x={cx + 8} y={cy + 16} fill="#6ee7b7" fontSize="13" fontWeight="bold">C</text>

                          {/* Side Dimension Callouts */}
                          {/* AB (Height) */}
                          <text x={ax - 8} y={(ay + by) / 2} textAnchor="end" fill="#7dd3fc" fontSize="11" fontWeight="bold">
                            AB = {pythMode === 'findAC' ? sideAB : formattedAB}
                          </text>

                          {/* BC (Base) */}
                          <text x={(bx + cx) / 2} y={by + 18} textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">
                            BC = {sideBC}
                          </text>

                          {/* AC (Hypotenuse) */}
                          <g transform={`translate(${(ax + cx) / 2 + 10}, ${(ay + cy) / 2 - 8})`}>
                            <rect x="-35" y="-12" width="70" height="20" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                            <text x="0" y="2" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="black">
                              AC = {pythMode === 'findAC' ? formattedAC : sideAC}
                            </text>
                          </g>
                        </svg>
                      );
                    })()}
                  </div>

                  {/* Areas of squares comparison */}
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Square on AB (AB²):</span>
                      <span className="font-mono text-cyan-300">{pythMode === 'findAC' ? areaAB : (calculatedAB * calculatedAB).toFixed(0)} sq units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Square on BC (BC²):</span>
                      <span className="font-mono text-emerald-300">{areaBC} sq units</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-800 font-bold text-amber-300">
                      <span>Square on AC (AC² = AB² + BC²):</span>
                      <span className="font-mono">{pythMode === 'findAC' ? areaAC : (sideAC * sideAC)} sq units</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Sliders & Step-by-Step Breakdown */}
                <div className="md:col-span-6 space-y-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-indigo-300 border-b border-slate-800/80 pb-1.5 flex items-center justify-between">
                      <span>Interactive Side Sliders</span>
                      <span className="text-[10px] text-slate-400">Adjust values in real-time</span>
                    </div>

                    {pythMode === 'findAC' ? (
                      <>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-300">Vertical Side AB (Height):</span>
                            <span className="font-bold text-cyan-400">{sideAB} units</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="20"
                            step="1"
                            value={sideAB}
                            onChange={(e) => setSideAB(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-300">Horizontal Base Side BC:</span>
                            <span className="font-bold text-emerald-400">{sideBC} units</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="20"
                            step="1"
                            value={sideBC}
                            onChange={(e) => setSideBC(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-300">Hypotenuse Side AC:</span>
                            <span className="font-bold text-amber-400">{sideAC} units</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="25"
                            step="1"
                            value={sideAC}
                            onChange={(e) => setSideAC(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-300">Base Side BC:</span>
                            <span className="font-bold text-emerald-400">{sideBC} units</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max={Math.max(1, sideAC - 1)}
                            step="1"
                            value={sideBC}
                            onChange={(e) => setSideBC(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Step-by-Step Mathematical Calculation */}
                  <div className="p-3 bg-slate-900 border border-indigo-500/30 rounded-xl text-xs space-y-1.5">
                    <span className="font-bold text-indigo-300 block">Step-by-Step Textbook Resolution:</span>
                    {pythMode === 'findAC' ? (
                      <div className="font-mono text-[11px] text-slate-300 space-y-1 leading-relaxed">
                        <div>1. In △ABC, ∠B = 90°</div>
                        <div>2. AC² = AB² + BC²</div>
                        <div>3. AC² = {sideAB}² + {sideBC}² = {areaAB} + {areaBC} = {areaAC}</div>
                        <div className="text-amber-300 font-bold text-xs pt-1 border-t border-slate-800">
                          ➔ AC = √{areaAC} = {formattedAC} units
                        </div>
                      </div>
                    ) : (
                      <div className="font-mono text-[11px] text-slate-300 space-y-1 leading-relaxed">
                        <div>1. In △ABC, ∠B = 90°</div>
                        <div>2. AB² = AC² - BC²</div>
                        <div>3. AB² = {sideAC}² - {sideBC}² = {sideAC * sideAC} - {sideBC * sideBC} = {sideAC * sideAC - sideBC * sideBC}</div>
                        <div className="text-amber-300 font-bold text-xs pt-1 border-t border-slate-800">
                          ➔ AB = √{sideAC * sideAC - sideBC * sideBC} = {formattedAB} units
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-[10px] text-slate-400 italic">
                    Grade 10 Mathematics Chapter 10: In any right-angled triangle, the square of the hypotenuse equals the sum of squares on the other two sides.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Presets for Quadratic Equations */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Sri Lankan Textbook Exam Examples:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { label: 'x² + 5x + 6 = 0', a: 1, b: 5, c: 6 },
                    { label: 'x² - 5x + 6 = 0', a: 1, b: -5, c: 6 },
                    { label: 'x² - 7x + 12 = 0', a: 1, b: -7, c: 12 },
                    { label: '2x² - 4x - 6 = 0', a: 2, b: -4, c: -6 },
                  ].map((eq) => (
                    <button
                      key={eq.label}
                      type="button"
                      onClick={() => {
                        setCoefA(eq.a);
                        setCoefB(eq.b);
                        setCoefC(eq.c);
                      }}
                      className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-indigo-900/60 text-indigo-300 font-mono text-[10px] border border-slate-700 hover:border-indigo-500/40 transition-colors"
                    >
                      {eq.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Coefficient (a):</span>
                      <span className="font-bold text-indigo-400">{coefA}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={coefA}
                      onChange={(e) => setCoefA(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Coefficient (b):</span>
                      <span className="font-bold text-indigo-400">{coefB}</span>
                    </div>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      step="1"
                      value={coefB}
                      onChange={(e) => setCoefB(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Constant (c):</span>
                      <span className="font-bold text-indigo-400">{coefC}</span>
                    </div>
                    <input
                      type="range"
                      min="-12"
                      max="12"
                      step="1"
                      value={coefC}
                      onChange={(e) => setCoefC(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                    />
                  </div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2">
                  <div className="space-y-1">
                    <div className="text-xs text-slate-400">Equation in Standard Form (ax² + bx + c = 0):</div>
                    <div className="text-xl font-mono font-black text-indigo-300">
                      {coefA !== 1 ? coefA : ''}x² {coefB >= 0 ? `+ ${coefB}` : `- ${Math.abs(coefB)}`}x {coefC >= 0 ? `+ ${coefC}` : `- ${Math.abs(coefC)}`} = 0
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Discriminant (Δ = b² - 4ac):</span>
                      <span className={`font-mono font-bold ${discriminant >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {discriminant} ({discriminant > 0 ? '2 Real Roots' : discriminant === 0 ? '1 Repeated Root' : 'No Real Roots'})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Roots (x):</span>
                      <span className="font-mono font-bold text-amber-300">
                        {discriminant >= 0 ? `x₁ = ${root1}, x₂ = ${root2}` : 'Complex Roots'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Parabola Vertex:</span>
                      <span className="font-mono text-cyan-300">({vertexX}, {vertexY})</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    Grade 10 Mathematics Chapter 14: Solving quadratics via factorisation and formula method: x = (-b ± √(b² - 4ac)) / (2a).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Four Basic Loci Simulator */}
          {mathsMode === 'loci' && (
            <div className="space-y-4">
              {/* Locus Tabs 1 to 4 */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950/40 p-2 rounded-xl border border-slate-800">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveLocus(1)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeLocus === 1 ? 'bg-cyan-500 text-slate-950 shadow-xs font-black' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    1. Fixed Point (Circle)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLocus(2)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeLocus === 2 ? 'bg-cyan-500 text-slate-950 shadow-xs font-black' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    2. Two Points (Perp. Bisector)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLocus(3)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeLocus === 3 ? 'bg-cyan-500 text-slate-950 shadow-xs font-black' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    3. Straight Line (Parallel Lines)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLocus(4)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeLocus === 4 ? 'bg-cyan-500 text-slate-950 shadow-xs font-black' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    4. Intersecting Lines (Angle Bisector)
                  </button>
                </div>
              </div>

              {/* Locus 1: Fixed Point */}
              {activeLocus === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                      <span className="font-semibold text-cyan-300">Locus 1: Fixed Point O → Circle (Radius r)</span>
                      <span className="font-mono text-[10px] text-amber-300 font-bold">r = {(locusRadius / 10).toFixed(1)} cm</span>
                    </div>

                    <div className="flex items-center justify-center py-2 bg-slate-900/30 rounded-lg border border-slate-800/60">
                      {(() => {
                        const cx = 135;
                        const cy = 90;
                        const rad = locusRadius;
                        const radRad = (locusAngle * Math.PI) / 180;
                        const px = cx + rad * Math.cos(radRad);
                        const py = cy - rad * Math.sin(radRad);

                        return (
                          <svg viewBox="0 0 270 180" className="w-full max-w-[270px] h-[180px] overflow-visible">
                            <pattern id="gridLoci1" width="15" height="15" patternUnits="userSpaceOnUse">
                              <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                            </pattern>
                            <rect width="270" height="180" fill="url(#gridLoci1)" opacity="0.6" rx="8" />

                            {/* Circle Locus */}
                            <circle cx={cx} cy={cy} r={rad} fill="rgba(6, 182, 212, 0.08)" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="5 3" />

                            {/* Fixed Center O */}
                            <circle cx={cx} cy={cy} r="4" fill="#f59e0b" />
                            <text x={cx - 14} y={cy + 4} fill="#f59e0b" fontSize="11" fontWeight="bold">O</text>

                            {/* Radius Line to P */}
                            <line x1={cx} y1={cy} x2={px} y2={py} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                            <text x={(cx + px) / 2 - 10} y={(cy + py) / 2 - 6} fill="#fcd34d" fontSize="10" fontWeight="bold">r</text>

                            {/* Moving Point P */}
                            <circle cx={px} cy={py} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                            <text x={px + 8} y={py + 4} fill="#38bdf8" fontSize="12" fontWeight="extrabold">P</text>
                          </svg>
                        );
                      })()}
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      <span className="text-cyan-400 font-bold">Definition:</span> The locus of points at a constant distance <span className="font-mono text-amber-300 font-bold">r</span> from a fixed point <span className="font-mono text-amber-300 font-bold">O</span> is a circle with centre <span className="font-mono text-amber-300 font-bold">O</span> and radius <span className="font-mono text-amber-300 font-bold">r</span>.
                    </div>
                  </div>

                  <div className="md:col-span-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Radius (r):</span>
                        <span className="font-bold text-cyan-400">{(locusRadius / 10).toFixed(1)} cm</span>
                      </div>
                      <input
                        type="range"
                        min="25"
                        max="65"
                        value={locusRadius}
                        onChange={(e) => setLocusRadius(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />

                      <div className="flex justify-between text-xs pt-1">
                        <span className="text-slate-300">Move Point P (Angle):</span>
                        <span className="font-bold text-amber-300">{locusAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={locusAngle}
                        onChange={(e) => setLocusAngle(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2 text-xs">
                      <div className="font-bold text-cyan-300">Ruler & Compass Construction:</div>
                      <ol className="list-decimal pl-4 space-y-1 text-slate-400">
                        <li>Mark the fixed point <span className="text-amber-300 font-mono">O</span> on paper.</li>
                        <li>Open the compass to length <span className="text-amber-300 font-mono">r</span> using a graduated ruler.</li>
                        <li>Place compass needle firmly on <span className="text-amber-300 font-mono">O</span> and rotate 360° to draw the circle.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {/* Locus 2: Two Points */}
              {activeLocus === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                      <span className="font-semibold text-cyan-300">Locus 2: Two Points A & B → Perpendicular Bisector</span>
                      <span className="font-mono text-[10px] text-emerald-400 font-bold">PA = PB</span>
                    </div>

                    <div className="flex items-center justify-center py-2 bg-slate-900/30 rounded-lg border border-slate-800/60">
                      {(() => {
                        const ax = 55;
                        const ay = 90;
                        const bx = 215;
                        const by = 90;
                        const mx = 135;
                        const my = 90;
                        const px = mx;
                        const py = my - locus2PPos;

                        return (
                          <svg viewBox="0 0 270 180" className="w-full max-w-[270px] h-[180px] overflow-visible">
                            <pattern id="gridLoci2" width="15" height="15" patternUnits="userSpaceOnUse">
                              <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                            </pattern>
                            <rect width="270" height="180" fill="url(#gridLoci2)" opacity="0.6" rx="8" />

                            {/* Segment AB */}
                            <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#94a3b8" strokeWidth="2" />
                            <circle cx={ax} cy={ay} r="4" fill="#38bdf8" />
                            <circle cx={bx} cy={by} r="4" fill="#38bdf8" />
                            <text x={ax - 14} y={ay + 4} fill="#7dd3fc" fontSize="12" fontWeight="bold">A</text>
                            <text x={bx + 8} y={by + 4} fill="#7dd3fc" fontSize="12" fontWeight="bold">B</text>

                            {/* Construction Arcs */}
                            <path d={`M ${mx - 15} ${my - 55} Q ${mx} ${my - 65} ${mx + 15} ${my - 55}`} fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 2" />
                            <path d={`M ${mx - 15} ${my + 55} Q ${mx} ${my + 65} ${mx + 15} ${my + 55}`} fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 2" />

                            {/* Perpendicular Bisector (Locus) */}
                            <line x1={mx} y1={15} x2={mx} y2={165} stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="6 3" />

                            {/* Right Angle at Midpoint M */}
                            <path d={`M ${mx - 8} ${my} L ${mx - 8} ${my - 8} L ${mx} ${my - 8}`} fill="none" stroke="#06b6d4" strokeWidth="1" />
                            <circle cx={mx} cy={my} r="2.5" fill="#06b6d4" />
                            <text x={mx + 6} y={my + 14} fill="#94a3b8" fontSize="10">M</text>

                            {/* Distance Lines PA and PB */}
                            <line x1={ax} y1={ay} x2={px} y2={py} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                            <line x1={bx} y1={by} x2={px} y2={py} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />

                            {/* Moving Point P */}
                            <circle cx={px} cy={py} r="5" fill="#34d399" stroke="#ffffff" strokeWidth="1.5" />
                            <text x={px + 8} y={py} fill="#34d399" fontSize="12" fontWeight="extrabold">P</text>
                          </svg>
                        );
                      })()}
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      <span className="text-cyan-400 font-bold">Definition:</span> The locus of points equidistant from two fixed points <span className="font-mono text-cyan-300 font-bold">A</span> and <span className="font-mono text-cyan-300 font-bold">B</span> is the <span className="text-emerald-400 font-bold">perpendicular bisector</span> of segment <span className="font-mono text-cyan-300 font-bold">AB</span>.
                    </div>
                  </div>

                  <div className="md:col-span-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Slide Point P Along Bisector:</span>
                        <span className="font-bold text-emerald-400">PA = PB</span>
                      </div>
                      <input
                        type="range"
                        min="-50"
                        max="50"
                        value={locus2PPos}
                        onChange={(e) => setLocus2PPos(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                      />
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2 text-xs">
                      <div className="font-bold text-cyan-300">Ruler & Compass Construction:</div>
                      <ol className="list-decimal pl-4 space-y-1 text-slate-400">
                        <li>Draw segment <span className="text-cyan-300 font-mono">AB</span>.</li>
                        <li>Set compass radius &gt; ½ AB. With centre <span className="text-cyan-300 font-mono">A</span>, draw arcs above and below <span className="text-cyan-300 font-mono">AB</span>.</li>
                        <li>With centre <span className="text-cyan-300 font-mono">B</span> and the SAME radius, draw intersecting arcs at <span className="text-indigo-300 font-mono">X</span> and <span className="text-indigo-300 font-mono">Y</span>.</li>
                        <li>Draw straight line <span className="text-cyan-300 font-mono">XY</span>. This line is the perpendicular bisector.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {/* Locus 3: Straight Line */}
              {activeLocus === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                      <span className="font-semibold text-cyan-300">Locus 3: Line AB → Pair of Parallel Lines</span>
                      <span className="font-mono text-[10px] text-amber-300 font-bold">d = {locus3Dist} mm</span>
                    </div>

                    <div className="flex items-center justify-center py-2 bg-slate-900/30 rounded-lg border border-slate-800/60">
                      {(() => {
                        const cy = 90;
                        const d = locus3Dist;
                        const yTop = cy - d;
                        const yBottom = cy + d;
                        const px = 50 + locus3PPos * 1.5;

                        return (
                          <svg viewBox="0 0 270 180" className="w-full max-w-[270px] h-[180px] overflow-visible">
                            <pattern id="gridLoci3" width="15" height="15" patternUnits="userSpaceOnUse">
                              <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                            </pattern>
                            <rect width="270" height="180" fill="url(#gridLoci3)" opacity="0.6" rx="8" />

                            {/* Base Line AB */}
                            <line x1={30} y1={cy} x2={240} y2={cy} stroke="#cbd5e1" strokeWidth="2.5" />
                            <text x={35} y={cy - 6} fill="#e2e8f0" fontSize="11" fontWeight="bold">A</text>
                            <text x={230} y={cy - 6} fill="#e2e8f0" fontSize="11" fontWeight="bold">B</text>

                            {/* Upper Parallel Line (Locus) */}
                            <line x1={20} y1={yTop} x2={250} y2={yTop} stroke="#06b6d4" strokeWidth="2" strokeDasharray="5 3" />
                            <text x={245} y={yTop - 4} fill="#06b6d4" fontSize="10" fontWeight="bold">L₁</text>

                            {/* Lower Parallel Line (Locus) */}
                            <line x1={20} y1={yBottom} x2={250} y2={yBottom} stroke="#06b6d4" strokeWidth="2" strokeDasharray="5 3" />
                            <text x={245} y={yBottom + 12} fill="#06b6d4" fontSize="10" fontWeight="bold">L₂</text>

                            {/* Distance Indicators */}
                            <line x1={90} y1={cy} x2={90} y2={yTop} stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                            <text x={95} y={(cy + yTop) / 2 + 3} fill="#f59e0b" fontSize="10" fontWeight="bold">d</text>

                            <line x1={90} y1={cy} x2={90} y2={yBottom} stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                            <text x={95} y={(cy + yBottom) / 2 + 3} fill="#f59e0b" fontSize="10" fontWeight="bold">d</text>

                            {/* Moving Point P on L1 */}
                            <circle cx={px} cy={yTop} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                            <text x={px + 6} y={yTop - 6} fill="#38bdf8" fontSize="11" fontWeight="extrabold">P</text>
                          </svg>
                        );
                      })()}
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      <span className="text-cyan-400 font-bold">Definition:</span> The locus of points at a constant distance <span className="font-mono text-amber-300 font-bold">d</span> from a straight line <span className="font-mono text-cyan-300 font-bold">AB</span> is a <span className="text-cyan-300 font-bold">pair of parallel lines</span> at distance <span className="font-mono text-amber-300 font-bold">d</span> on either side of <span className="font-mono text-cyan-300 font-bold">AB</span>.
                    </div>
                  </div>

                  <div className="md:col-span-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Perpendicular Distance (d):</span>
                        <span className="font-bold text-amber-300">{locus3Dist} mm</span>
                      </div>
                      <input
                        type="range"
                        min="18"
                        max="48"
                        value={locus3Dist}
                        onChange={(e) => setLocus3Dist(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />

                      <div className="flex justify-between text-xs pt-1">
                        <span className="text-slate-300">Move Point P:</span>
                        <span className="font-bold text-cyan-400">{locus3PPos}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="90"
                        value={locus3PPos}
                        onChange={(e) => setLocus3PPos(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2 text-xs">
                      <div className="font-bold text-cyan-300">Ruler & Compass Construction:</div>
                      <ol className="list-decimal pl-4 space-y-1 text-slate-400">
                        <li>Erect perpendiculars at two points on line <span className="text-cyan-300 font-mono">AB</span>.</li>
                        <li>Measure distance <span className="text-amber-300 font-mono">d</span> along each perpendicular on both sides.</li>
                        <li>Connect the points with straight lines <span className="text-cyan-300 font-mono">L₁</span> and <span className="text-cyan-300 font-mono">L₂</span>.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {/* Locus 4: Intersecting Lines */}
              {activeLocus === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                      <span className="font-semibold text-cyan-300">Locus 4: Intersecting Lines → Angle Bisector</span>
                      <span className="font-mono text-[10px] text-amber-300 font-bold">Angle = {locus4Angle}°</span>
                    </div>

                    <div className="flex items-center justify-center py-2 bg-slate-900/30 rounded-lg border border-slate-800/60">
                      {(() => {
                        const ox = 50;
                        const oy = 135;
                        const len = 170;
                        const halfAng = (locus4Angle / 2) * (Math.PI / 180);
                        const fullAng = locus4Angle * (Math.PI / 180);

                        const l1x = ox + len;
                        const l1y = oy;

                        const l2x = ox + len * Math.cos(fullAng);
                        const l2y = oy - len * Math.sin(fullAng);

                        const bisx = ox + len * Math.cos(halfAng);
                        const bisy = oy - len * Math.sin(halfAng);

                        const px = ox + locus4DistP * 1.8 * Math.cos(halfAng);
                        const py = oy - locus4DistP * 1.8 * Math.sin(halfAng);

                        return (
                          <svg viewBox="0 0 270 180" className="w-full max-w-[270px] h-[180px] overflow-visible">
                            <pattern id="gridLoci4" width="15" height="15" patternUnits="userSpaceOnUse">
                              <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                            </pattern>
                            <rect width="270" height="180" fill="url(#gridLoci4)" opacity="0.6" rx="8" />

                            {/* Arm 1 */}
                            <line x1={ox} y1={oy} x2={l1x} y2={l1y} stroke="#cbd5e1" strokeWidth="2" />
                            <text x={l1x - 10} y={l1y + 14} fill="#cbd5e1" fontSize="10" fontWeight="bold">L₁</text>

                            {/* Arm 2 */}
                            <line x1={ox} y1={oy} x2={l2x} y2={l2y} stroke="#cbd5e1" strokeWidth="2" />
                            <text x={l2x + 4} y={l2y - 2} fill="#cbd5e1" fontSize="10" fontWeight="bold">L₂</text>

                            {/* Vertex O */}
                            <circle cx={ox} cy={oy} r="4" fill="#f59e0b" />
                            <text x={ox - 14} y={oy + 14} fill="#f59e0b" fontSize="12" fontWeight="bold">O</text>

                            {/* Angle Bisector (Locus) */}
                            <line x1={ox} y1={oy} x2={bisx} y2={bisy} stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="6 3" />

                            {/* Point P */}
                            <circle cx={px} cy={py} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                            <text x={px + 6} y={py - 4} fill="#38bdf8" fontSize="11" fontWeight="extrabold">P</text>

                            {/* Equal angle markers */}
                            <path d={`M ${ox + 35} ${oy} A 35 35 0 0 0 ${ox + 35 * Math.cos(halfAng)} ${oy - 35 * Math.sin(halfAng)}`} fill="none" stroke="#06b6d4" strokeWidth="1.5" />
                            <path d={`M ${ox + 35 * Math.cos(halfAng)} ${oy - 35 * Math.sin(halfAng)} A 35 35 0 0 0 ${ox + 35 * Math.cos(fullAng)} ${oy - 35 * Math.sin(fullAng)}`} fill="none" stroke="#06b6d4" strokeWidth="1.5" />
                          </svg>
                        );
                      })()}
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      <span className="text-cyan-400 font-bold">Definition:</span> The locus of points equidistant from two intersecting straight lines is the <span className="text-cyan-300 font-bold">pair of angle bisectors</span> of the angles between the lines.
                    </div>
                  </div>

                  <div className="md:col-span-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Angle Between Lines (θ):</span>
                        <span className="font-bold text-amber-300">{locus4Angle}° (Bisector = {locus4Angle / 2}°)</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="90"
                        value={locus4Angle}
                        onChange={(e) => setLocus4Angle(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />

                      <div className="flex justify-between text-xs pt-1">
                        <span className="text-slate-300">Move Point P Along Bisector:</span>
                        <span className="font-bold text-cyan-400">{locus4DistP} px</span>
                      </div>
                      <input
                        type="range"
                        min="25"
                        max="85"
                        value={locus4DistP}
                        onChange={(e) => setLocus4DistP(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2 text-xs">
                      <div className="font-bold text-cyan-300">Ruler & Compass Construction:</div>
                      <ol className="list-decimal pl-4 space-y-1 text-slate-400">
                        <li>With vertex <span className="text-amber-300 font-mono">O</span> as centre, draw an arc intersecting both arms at <span className="text-cyan-300 font-mono">X</span> and <span className="text-cyan-300 font-mono">Y</span>.</li>
                        <li>With centres <span className="text-cyan-300 font-mono">X</span> and <span className="text-cyan-300 font-mono">Y</span> and equal radius, draw intersecting arcs inside the angle at <span className="text-indigo-300 font-mono">Z</span>.</li>
                        <li>Join <span className="text-amber-300 font-mono">O</span> and <span className="text-indigo-300 font-mono">Z</span> and extend. Line <span className="text-cyan-300 font-mono">OZ</span> is the angle bisector.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Circle Theorems Simulator */}
          {mathsMode === 'circle' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/40 p-2 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setCircleTab('angleAtCenter')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    circleTab === 'angleAtCenter' ? 'bg-cyan-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Angle at Centre = 2 × Circumference
                </button>
                <button
                  type="button"
                  onClick={() => setCircleTab('chordBisector')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    circleTab === 'chordBisector' ? 'bg-cyan-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Perpendicular from Centre Bisects Chord
                </button>
                <button
                  type="button"
                  onClick={() => setCircleTab('tangentRadius')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    circleTab === 'tangentRadius' ? 'bg-cyan-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tangent ⊥ Radius (90°)
                </button>
              </div>

              {circleTab === 'angleAtCenter' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                      <span className="font-semibold text-cyan-300">Theorem 2: Angle Subtended by Arc AB</span>
                      <span className="font-mono text-[10px] text-amber-300 font-bold">∠AOB = {circTheta * 2}°</span>
                    </div>

                    <div className="flex items-center justify-center py-2 bg-slate-900/30 rounded-lg border border-slate-800/60">
                      {(() => {
                        const cx = 135;
                        const cy = 90;
                        const r = 60;
                        const halfAng = (circTheta * Math.PI) / 180;
                        const ax = cx - r * Math.sin(halfAng);
                        const ay = cy + r * Math.cos(halfAng);
                        const bx = cx + r * Math.sin(halfAng);
                        const by = cy + r * Math.cos(halfAng);
                        const px = cx;
                        const py = cy - r;

                        return (
                          <svg viewBox="0 0 270 180" className="w-full max-w-[270px] h-[180px] overflow-visible">
                            <pattern id="gridCirc" width="15" height="15" patternUnits="userSpaceOnUse">
                              <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                            </pattern>
                            <rect width="270" height="180" fill="url(#gridCirc)" opacity="0.6" rx="8" />

                            <circle cx={cx} cy={cy} r={r} fill="rgba(6, 182, 212, 0.05)" stroke="#06b6d4" strokeWidth="2" />
                            <circle cx={cx} cy={cy} r="3.5" fill="#f59e0b" />
                            <text x={cx + 6} y={cy + 4} fill="#f59e0b" fontSize="11" fontWeight="bold">O</text>

                            {/* Angle at Centre */}
                            <line x1={cx} y1={cy} x2={ax} y2={ay} stroke="#06b6d4" strokeWidth="2" />
                            <line x1={cx} y1={cy} x2={bx} y2={by} stroke="#06b6d4" strokeWidth="2" />

                            {/* Angle at Circumference */}
                            <line x1={px} y1={py} x2={ax} y2={ay} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                            <line x1={px} y1={py} x2={bx} y2={by} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />

                            {/* Points A, B, P */}
                            <circle cx={ax} cy={ay} r="4" fill="#38bdf8" />
                            <circle cx={bx} cy={by} r="4" fill="#38bdf8" />
                            <circle cx={px} cy={py} r="4" fill="#f59e0b" />

                            <text x={ax - 12} y={ay + 14} fill="#38bdf8" fontSize="11" fontWeight="bold">A</text>
                            <text x={bx + 6} y={by + 14} fill="#38bdf8" fontSize="11" fontWeight="bold">B</text>
                            <text x={px - 4} y={py - 8} fill="#f59e0b" fontSize="11" fontWeight="bold">P (θ = {circTheta}°)</text>
                            <text x={cx - 16} y={cy + 24} fill="#06b6d4" fontSize="11" fontWeight="bold">2θ = {circTheta * 2}°</text>
                          </svg>
                        );
                      })()}
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      <span className="text-cyan-400 font-bold">Theorem:</span> The angle subtended by an arc at the centre is double the angle subtended by it at any point on the remaining part of the circle: <span className="font-mono text-cyan-300 font-bold">∠AOB = 2 × ∠APB</span>.
                    </div>
                  </div>

                  <div className="md:col-span-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Angle at Circumference (θ):</span>
                        <span className="font-bold text-amber-300">{circTheta}°</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="60"
                        value={circTheta}
                        onChange={(e) => setCircTheta(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                      <div className="flex justify-between text-xs pt-1">
                        <span className="text-slate-300">Angle at Centre (2θ):</span>
                        <span className="font-bold text-cyan-400">{circTheta * 2}°</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2 text-xs">
                      <div className="font-bold text-cyan-300">Sri Lankan Exam Key Points:</div>
                      <ul className="list-disc pl-4 space-y-1 text-slate-400">
                        <li>Angles in the same segment of a circle are equal.</li>
                        <li>Angle in a semi-circle is always a right angle (<span className="text-cyan-300 font-mono">90°</span>).</li>
                        <li>Opposite angles of a cyclic quadrilateral sum to <span className="text-cyan-300 font-mono">180°</span>.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {circleTab === 'chordBisector' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                      <span className="font-semibold text-cyan-300">Theorem 1: Perpendicular from Centre Bisects Chord</span>
                      <span className="font-mono text-[10px] text-emerald-400 font-bold">AM = MB</span>
                    </div>

                    <div className="flex items-center justify-center py-2 bg-slate-900/30 rounded-lg border border-slate-800/60">
                      {(() => {
                        const cx = 135;
                        const cy = 90;
                        const r = 60;
                        const d = chordDistance;
                        const halfChord = Math.sqrt(Math.max(0, r * r - d * d));
                        const ax = cx - halfChord;
                        const ay = cy + d;
                        const bx = cx + halfChord;
                        const by = cy + d;
                        const mx = cx;
                        const my = cy + d;

                        return (
                          <svg viewBox="0 0 270 180" className="w-full max-w-[270px] h-[180px] overflow-visible">
                            <pattern id="gridChord" width="15" height="15" patternUnits="userSpaceOnUse">
                              <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                            </pattern>
                            <rect width="270" height="180" fill="url(#gridChord)" opacity="0.6" rx="8" />

                            <circle cx={cx} cy={cy} r={r} fill="rgba(6, 182, 212, 0.05)" stroke="#06b6d4" strokeWidth="2" />
                            <circle cx={cx} cy={cy} r="3.5" fill="#f59e0b" />
                            <text x={cx + 6} y={cy - 4} fill="#f59e0b" fontSize="11" fontWeight="bold">O</text>

                            {/* Chord AB */}
                            <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#38bdf8" strokeWidth="2.5" />
                            <circle cx={ax} cy={ay} r="4" fill="#38bdf8" />
                            <circle cx={bx} cy={by} r="4" fill="#38bdf8" />
                            <text x={ax - 14} y={ay + 4} fill="#38bdf8" fontSize="11" fontWeight="bold">A</text>
                            <text x={bx + 8} y={by + 4} fill="#38bdf8" fontSize="11" fontWeight="bold">B</text>

                            {/* Perpendicular OM */}
                            <line x1={cx} y1={cy} x2={mx} y2={my} stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
                            <circle cx={mx} cy={my} r="3" fill="#34d399" />
                            <text x={mx + 6} y={my + 14} fill="#34d399" fontSize="10" fontWeight="bold">M (90°)</text>

                            {/* Right Angle at M */}
                            <path d={`M ${mx - 6} ${my} L ${mx - 6} ${my - 6} L ${mx} ${my - 6}`} fill="none" stroke="#f59e0b" strokeWidth="1" />
                          </svg>
                        );
                      })()}
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      <span className="text-cyan-400 font-bold">Theorem:</span> The straight line drawn from the centre of a circle perpendicular to a chord bisects the chord: <span className="font-mono text-emerald-400 font-bold">AM = MB</span>.
                    </div>
                  </div>

                  <div className="md:col-span-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Chord Distance from Centre (OM):</span>
                        <span className="font-bold text-amber-300">{chordDistance} mm</span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="50"
                        value={chordDistance}
                        onChange={(e) => setChordDistance(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2 text-xs">
                      <div className="font-bold text-cyan-300">Converse & Applications:</div>
                      <ul className="list-disc pl-4 space-y-1 text-slate-400">
                        <li>The line joining the centre to the midpoint of a chord is perpendicular to the chord.</li>
                        <li>The perpendicular bisector of any chord passes through the centre of the circle.</li>
                        <li>Equal chords are equidistant from the centre (<span className="text-cyan-300 font-mono">d₁ = d₂</span>).</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {circleTab === 'tangentRadius' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                      <span className="font-semibold text-cyan-300">Theorem 4: Tangent Perpendicular to Radius</span>
                      <span className="font-mono text-[10px] text-amber-300 font-bold">∠OTX = 90°</span>
                    </div>

                    <div className="flex items-center justify-center py-2 bg-slate-900/30 rounded-lg border border-slate-800/60">
                      <svg viewBox="0 0 270 180" className="w-full max-w-[270px] h-[180px] overflow-visible">
                        <pattern id="gridTang" width="15" height="15" patternUnits="userSpaceOnUse">
                          <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                        </pattern>
                        <rect width="270" height="180" fill="url(#gridTang)" opacity="0.6" rx="8" />

                        {/* Circle */}
                        <circle cx={135} cy={80} r={50} fill="rgba(6, 182, 212, 0.05)" stroke="#06b6d4" strokeWidth="2" />
                        <circle cx={135} cy={80} r="3.5" fill="#f59e0b" />
                        <text x={140} y={76} fill="#f59e0b" fontSize="11" fontWeight="bold">O</text>

                        {/* Radius OT */}
                        <line x1={135} y1={80} x2={135} y2={130} stroke="#f59e0b" strokeWidth="2" />
                        <text x={140} y={110} fill="#f59e0b" fontSize="10" fontWeight="bold">Radius r</text>

                        {/* Tangent line at T (y = 130) */}
                        <line x1={30} y1={130} x2={240} y2={130} stroke="#38bdf8" strokeWidth="2.5" />
                        <circle cx={135} cy={130} r="4" fill="#38bdf8" />
                        <text x={135} y={148} fill="#38bdf8" fontSize="11" fontWeight="bold">T (Contact Point)</text>
                        <text x={235} y={124} fill="#38bdf8" fontSize="10" fontWeight="bold">Tangent</text>

                        {/* Right Angle at T */}
                        <path d="M 127 130 L 127 122 L 135 122" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
                        <text x={108} y={122} fill="#06b6d4" fontSize="10" fontWeight="bold">90°</text>
                      </svg>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      <span className="text-cyan-400 font-bold">Theorem:</span> The tangent at any point of a circle is perpendicular to the radius through the point of contact: <span className="font-mono text-cyan-300 font-bold">Radius ⊥ Tangent at T</span>.
                    </div>
                  </div>

                  <div className="md:col-span-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                    <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2">
                      <div className="font-bold text-cyan-300">Tangents from an External Point:</div>
                      <p className="text-slate-400 leading-relaxed">
                        If two tangents <span className="text-cyan-300 font-mono">PA</span> and <span className="text-cyan-300 font-mono">PB</span> are drawn to a circle from an external point <span className="text-amber-300 font-mono">P</span>:
                      </p>
                      <ul className="list-disc pl-4 space-y-1 text-slate-400">
                        <li>The lengths of the tangents are equal: <span className="text-emerald-400 font-mono font-bold">PA = PB</span>.</li>
                        <li>They subtend equal angles at the centre: <span className="text-cyan-300 font-mono">∠POA = ∠POB</span>.</li>
                        <li>The line joining the external point to the centre bisects the angle between the tangents: <span className="text-cyan-300 font-mono">∠APO = ∠BPO</span>.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
