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
  ArrowRight,
  Landmark,
  BookOpen,
  Scroll,
  Globe,
  Award,
  Droplets,
  Scale,
  Mountain,
  Crown,
  CheckCircle2,
  MapPin,
  Trees
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
  type HistoryMode = 'settlements' | 'political' | 'society' | 'sluice' | 'practical' | 'kingdoms' | 'kandy' | 'renaissance' | 'western' | 'brahmi';

  const getInitialHistoryMode = (tId: string, hint?: string): HistoryMode => {
    const combined = `${tId} ${hint || ''}`.toLowerCase();
    if (combined.includes('settlement') || combined.includes('pre-historic') || combined.includes('pahiyangala') || combined.includes('ibbankatuwa') || combined.includes('ජනාවාස')) {
      return 'settlements';
    }
    if (combined.includes('political') || combined.includes('power') || combined.includes('gamika') || combined.includes('parumaka') || combined.includes('දේශපාලන')) {
      return 'political';
    }
    if (combined.includes('society') || combined.includes('ancient-society') || combined.includes('සමාජය') || combined.includes('gam sabha')) {
      return 'society';
    }
    if (combined.includes('science-tech') || combined.includes('hydraulic') || combined.includes('sluice') || combined.includes('bisokotuwa') || combined.includes('විද්‍යාව') || combined.includes('තාක්ෂණ')) {
      return 'sluice';
    }
    if (combined.includes('historical-knowledge') || combined.includes('practical') || combined.includes('bethma') || combined.includes('badulla') || combined.includes('ප්‍රායෝගික')) {
      return 'practical';
    }
    if (combined.includes('decline') || combined.includes('kingdoms') || combined.includes('dambadeniya') || combined.includes('yapahuwa') || combined.includes('රාජධානි')) {
      return 'kingdoms';
    }
    if (combined.includes('kandyan') || combined.includes('kandy') || combined.includes('senkadagala') || combined.includes('උඩරට')) {
      return 'kandy';
    }
    if (combined.includes('renaissance') || combined.includes('gutenberg') || combined.includes('copernicus') || combined.includes('පුනරුදය')) {
      return 'renaissance';
    }
    if (combined.includes('western') || combined.includes('portuguese') || combined.includes('dutch') || combined.includes('බටහිර')) {
      return 'western';
    }
    if (combined.includes('source') || combined.includes('brahmi') || combined.includes('sellipi') || combined.includes('මූලාශ්‍ර')) {
      return 'brahmi';
    }
    return 'sluice';
  };

  const [historyMode, setHistoryMode] = useState<HistoryMode>(() => getInitialHistoryMode(topicId, activeModeHint));

  React.useEffect(() => {
    setHistoryMode(getInitialHistoryMode(topicId, activeModeHint));
  }, [topicId, activeModeHint]);

  // Settlements state
  const [settlementEra, setSettlementEra] = useState<'prehistoric' | 'protohistoric' | 'earlyhistoric'>('prehistoric');
  const [microlithLength, setMicrolithLength] = useState<number>(2.5); // cm
  const [cistLidOpen, setCistLidOpen] = useState<boolean>(false);

  // Political power state (1: Gamika, 2: Parumaka, 3: Aya, 4: Maharaja)
  const [politicalStage, setPoliticalStage] = useState<1 | 2 | 3 | 4>(1);

  // Ancient society state
  const [societySector, setSocietySector] = useState<'wewa' | 'dagoba' | 'ketha' | 'gamgoda'>('wewa');

  // Hydraulic engineering state
  const [reservoirDepth, setReservoirDepth] = useState<number>(20); // 5m - 40m
  const [yodaElaDistance, setYodaElaDistance] = useState<number>(45); // km

  // Practical knowledge state
  const [practicalTab, setPracticalTab] = useState<'bethma' | 'badulla' | 'heirloom'>('bethma');
  const [reservoirWaterLevel, setReservoirWaterLevel] = useState<number>(30); // % capacity
  const [activeRiceVar, setActiveRiceVar] = useState<'suwandel' | 'heenati' | 'maawee'>('suwandel');

  // South-West kingdoms state
  const [activeKingdom, setActiveKingdom] = useState<'dambadeniya' | 'yapahuwa' | 'kurunegala' | 'gampola' | 'kotte'>('dambadeniya');

  // Kandyan kingdom state
  const [kandyFocus, setKandyFocus] = useState<'defenses' | 'battles' | 'hierarchy'>('defenses');

  // Renaissance state
  const [renaissanceTopic, setRenaissanceTopic] = useState<'press' | 'copernicus' | 'navigation'>('press');
  const [pressPrinted, setPressPrinted] = useState<boolean>(false);

  // Western world encounters state
  const [westernTimeline, setWesternTimeline] = useState<'arrival1505' | 'mulleriyawa1562' | 'dutch1658'>('arrival1505');

  // Brahmi characters & inscriptions
  const [activeBrahmiChar, setActiveBrahmiChar] = useState<number>(0);
  const [activeInscriptionShape, setActiveInscriptionShape] = useState<number>(0);

  const brahmiCharacters = [
    { glyph: '𑀧', translit: 'Pa', term: 'Parumaka (පරුමක)', meaningEn: 'Ancient clan chieftain or community leader title found in cave inscriptions', meaningSi: 'ලෙන් ලිපි වල හමුවන ගෝත්‍ර ප්‍රධානියා හෝ පාලකයා හැඳින්වූ ගෞරව නාමය', meaningTa: 'பண்டைய குகைக் கல்வெட்டுகளில் காணப்படும் தலைவரின் பட்டப்பெயர்' },
    { glyph: '𑀕', translit: 'Ga', term: 'Gāmani (ගාමිණී)', meaningEn: 'Village administrator or early royal title representing governance', meaningSi: 'ග්‍රාම පාලකයා හෝ මුල් යුගයේ පාලක නාමය', meaningTa: 'கிராமத் தலைவர் அல்லது ஆரம்பகால அரசப் பெயர்' },
    { glyph: '𑀯', translit: 'Va', term: 'Vāpi (වාපී)', meaningEn: 'Water reservoir or tank constructed for agricultural irrigation', meaningSi: 'කෘෂිකාර්මික වාරිමාර්ග සඳහා තැනූ වැව', meaningTa: 'விவசாய பாசனத்திற்காக அமைக்கப்பட்ட குளம்/ஏரி' },
    { glyph: '𑀮', translit: 'La', term: 'Lene (ලෙන)', meaningEn: 'Rock shelter or cave donated to the Buddhist Sangha', meaningSi: 'මහා සංඝරත්නය වෙත පූජා කළ ස්වාභාවික ගල් ගුහාව', meaningTa: 'சங்கத்தினருக்கு தானமாக வழங்கப்பட்ட குகை' },
    { glyph: '𑀭', translit: 'Ra', term: 'Raja (රජ)', meaningEn: 'Sovereign monarch heading the unified central kingdom', meaningSi: 'රාජ්‍යයේ මූලික නායකයා හෙවත් රජතුමා', meaningTa: 'இராச்சியத்தின் தலைவர் அல்லது மன்னன்' },
  ];

  const inscriptionTypes = [
    { nameEn: 'Cave Inscriptions (ලෙන් ලිපි)', nameSi: 'ලෙන් ලිපි', nameTa: 'குகைக் கல்வெட்டுகள்', descEn: 'Carved beneath drip-ledges (කටාරම්) of rock shelters donated to the Sangha from 3rd century BCE.', descSi: 'මහා සංඝරත්නයට පූජා කළ ලෙන් කටාරම් යට ක්‍රි.පූ. 3 වන සියවසේ සිට කොටන ලදී.', descTa: 'சங்கத்தினருக்கு வழங்கப்பட்ட குகைகளில் வெட்டப்பட்டவை.' },
    { nameEn: 'Rock Inscriptions (ගිරි ලිපි)', nameSi: 'ගිරි ලිපි', nameTa: 'பாறைக் கல்வெட்டுகள்', descEn: 'Engraved directly upon massive natural rock surfaces (e.g. Tonigala, Mihintale).', descSi: 'ස්වාභාවික විශාල ගල් පර්වත තල මත කෙලින්ම කොටන ලද ලේඛන (තෝණිගල, මිහින්තලේ).', descTa: 'இயற்கை பாறைகளின் மேற்பரப்பில் செதுக்கப்பட்டவை.' },
    { nameEn: 'Pillar Inscriptions (ටැම් ලිපි)', nameSi: 'ටැම් ලිපි', nameTa: 'தூண் கல்வெட்டுகள்', descEn: 'Four-sided polished stone pillars for royal decrees and market laws (e.g. Badulla pillar).', descSi: 'රාජකීය අණපනත් සහ වෙළඳ නීති සඳහා සිටුවන ලද සිව්පැති ගල් කණු (බදුලු ටැම් ලිපිය).', descTa: 'அரச கட்டளைகளுக்காக நடப்பட்ட கல் தூண்கள்.' },
    { nameEn: 'Slab Inscriptions (පුවරු ලිපි)', nameSi: 'පුවරු ලිපි', nameTa: 'பலகைக் கல்வெட்டுகள்', descEn: 'Flat stone slabs with extensive legal charters (e.g. Polonnaruwa Galpotha).', descSi: 'විශාල නීති සංග්‍රහ හා විස්තර සහිත සමතලා ගල් පුවරු (පොළොන්නරුව ගල්පොත).', descTa: 'தட்டையான கற்பலகைகளில் எழுதப்பட்டவை.' },
    { nameEn: 'Seat Inscriptions (ආසන ලිපි)', nameSi: 'ආසන ලිපි', nameTa: 'ஆசனக் கல்வெட்டுகள்', descEn: 'Carved on stone thrones or royal seats where kings sat during festivals.', descSi: 'රජවරුන් උත්සව නැරඹීමට වැඩහුන් ගල් ආසන මත කොටන ලද ලිපි.', descTa: 'அரச ஆசனங்களில் பொறிக்கப்பட்டவை.' },
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
                {domain === 'history' && (
                  historyMode === 'settlements'
                    ? (language === 'si' ? 'පුරාණ ජනාවාස හා මානව පරිණාම ගවේෂකය' : language === 'ta' ? 'பண்டைய குடியேற்றங்கள் ஆய்வி' : 'Ancient Settlements & Prehistoric Explorer')
                    : historyMode === 'political'
                    ? (language === 'si' ? 'දේශපාලන බලය විකාශනය සහ පාලන ව්‍යුහය' : language === 'ta' ? 'அரசியல் அதிகார வளர்ச்சி மாதிரி' : 'Evolution of Political Power Explorer')
                    : historyMode === 'society'
                    ? (language === 'si' ? 'පුරාණ ශ්‍රී ලාංකීය සමාජය සහ වැව් පද්ධතිය' : language === 'ta' ? 'பண்டைய இலங்கை சமூகம் ஆய்வி' : 'Ancient Sri Lankan Society & Village Ecosystem')
                    : historyMode === 'practical'
                    ? (language === 'si' ? 'ඓතිහාසික දැනුම සහ ප්‍රායෝගික යෙදීම් ආදර්ශකය' : language === 'ta' ? 'வரலாற்று அறிவும் நடைமுறை பயன்பாடுகளும்' : 'Historical Knowledge & Traditional Applications')
                    : historyMode === 'kingdoms'
                    ? (language === 'si' ? 'නිරිතදිග නව රාජධානි හා නාගරීකරණ ගවේෂකය' : language === 'ta' ? 'தென்மேற்கு புதிய இராச்சியங்கள் ஆய்வி' : 'South-West Transitional Kingdoms Explorer')
                    : historyMode === 'kandy'
                    ? (language === 'si' ? 'උඩරට රාජධානිය සහ ආරක්ෂක උපායමාර්ග ආදර්ශකය' : language === 'ta' ? 'கண்டி இராச்சியம் மற்றும் தற்காப்பு மாதிரி' : 'Kandyan Kingdom & Mountain Defenses Simulator')
                    : historyMode === 'renaissance'
                    ? (language === 'si' ? 'යුරෝපීය පුනරුදය හා විද්‍යාත්මක විප්ලවය' : language === 'ta' ? 'ஐரோப்பிய மறுமலர்ச்சி ஆய்வுகூடம்' : 'European Renaissance & Science Lab')
                    : historyMode === 'western'
                    ? (language === 'si' ? 'ශ්‍රී ලංකාව සහ බටහිර ලෝකය (යටත්විජිත යුගය)' : language === 'ta' ? 'இலங்கையும் மேலைத்தேய உலகமும்' : 'Sri Lanka & Western World Encounters')
                    : historyMode === 'brahmi'
                    ? (language === 'si' ? 'සෙල්ලිපි හා බ්‍රාහ්මී අක්ෂර විකේතකය' : language === 'ta' ? 'பிராமி கல்வெட்டு எழுத்துக்கள் ஆய்வி' : 'Inscriptions & Brahmi Epigraphy Decipherer')
                    : (language === 'si' ? 'පුරාණ වාරි හා සොරොව් තාක්ෂණ ආදර්ශකය' : language === 'ta' ? 'பண்டைய நீரியல் தொழினுட்ப மாதிரி' : 'Ancient Hydraulic & Sluice Gate Simulator')
                )}
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
          {/* Chapter & Topic Mode Selector */}
          <div className="flex flex-wrap gap-1.5 bg-slate-950/40 p-2 rounded-xl border border-slate-800">
            {[
              { id: 'settlements', labelEn: 'Ch 2: Settlements', labelSi: '2: ජනාවාස', labelTa: '2: குடியேற்றங்கள்' },
              { id: 'political', labelEn: 'Ch 3: Political Power', labelSi: '3: දේශපාලන බලය', labelTa: '3: அரசியல் அதிகாரம்' },
              { id: 'society', labelEn: 'Ch 4: Ancient Society', labelSi: '4: පුරාණ සමාජය', labelTa: '4: பண்டைய சமூகம்' },
              { id: 'sluice', labelEn: 'Ch 5: Science & Hydraulics', labelSi: '5: විද්‍යාව හා වාරි', labelTa: '5: நீரியல் தொழினுட்பம்' },
              { id: 'practical', labelEn: 'Ch 6: Practical Knowledge', labelSi: '6: ප්‍රායෝගික දැනුම', labelTa: '6: நடைமுறை அறிவு' },
              { id: 'kingdoms', labelEn: 'Ch 7: SW Kingdoms', labelSi: '7: නිරිතදිග රාජධානි', labelTa: '7: தென்மேற்கு இராச்சியங்கள்' },
              { id: 'kandy', labelEn: 'Ch 8: Kandyan Kingdom', labelSi: '8: උඩරට රාජධානිය', labelTa: '8: கண்டி இராச்சியம்' },
              { id: 'renaissance', labelEn: 'Ch 9: Renaissance', labelSi: '9: පුනරුදය', labelTa: '9: மறுமலர்ச்சி' },
              { id: 'western', labelEn: 'Ch 10: Western World', labelSi: '10: බටහිර ලෝකය', labelTa: '10: மேலைத்தேய உலகம்' },
              { id: 'brahmi', labelEn: 'Ch 1: Inscriptions & Sources', labelSi: '1: සෙල්ලිපි හා මූලාශ්‍ර', labelTa: '1: கல்வெட்டுகள்' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setHistoryMode(tab.id as HistoryMode)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  historyMode === tab.id 
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20' 
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700/80'
                }`}
              >
                {language === 'si' ? tab.labelSi : language === 'ta' ? tab.labelTa : tab.labelEn}
              </button>
            ))}
          </div>

          {/* 1. ANCIENT SETTLEMENTS (CHAPTER 2) */}
          {historyMode === 'settlements' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/40 p-2 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setSettlementEra('prehistoric')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    settlementEra === 'prehistoric' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'si' ? 'ප්‍රාග් ඓතිහාසික (පාහියංගල / බලංගොඩ මානවයා)' : language === 'ta' ? 'வரலாற்றுக்கு முற்பட்ட காலம் (பாகியன்கல)' : 'Pre-Historic (Pahiyangala Caves / 38,000 BP)'}
                </button>
                <button
                  type="button"
                  onClick={() => setSettlementEra('protohistoric')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    settlementEra === 'protohistoric' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'si' ? 'පූර්ව ඓතිහාසික (ඉබ්බන්කටුව මහා ශිලා සුසාන)' : language === 'ta' ? 'ஆதி வரலாற்றுக் காலம் (இப்பன்கட்டுவ)' : 'Proto-Historic (Ibbankatuwa Megalithic)'}
                </button>
                <button
                  type="button"
                  onClick={() => setSettlementEra('earlyhistoric')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    settlementEra === 'earlyhistoric' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'si' ? 'මූල ඓතිහාසික (මල්වතු ඔය නිම්න ජනාවාස)' : language === 'ta' ? 'ஆரம்ப வரலாற்றுக் காலம் (நதிக்கரை)' : 'Early Historic (River Basin Agrarian)'}
                </button>
              </div>

              {settlementEra === 'prehistoric' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                      <span className="font-semibold text-amber-300">Pahiyangala Cave & Microlithic Technology</span>
                      <span className="font-mono text-emerald-400 font-bold">~38,000 BP</span>
                    </div>

                    <div className="flex items-center justify-center py-2 bg-slate-900/40 rounded-lg border border-slate-800/60">
                      <svg viewBox="0 0 260 140" className="w-full max-w-[260px] h-[140px] overflow-visible">
                        <defs>
                          <linearGradient id="caveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#451a03" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.9" />
                          </linearGradient>
                        </defs>
                        {/* Cave Silhouette */}
                        <path d="M 10 130 Q 30 20 130 20 Q 230 20 250 130 Z" fill="url(#caveGrad)" stroke="#78350f" strokeWidth="2" />
                        {/* Microlith Tool Silhouette */}
                        <polygon
                          points={`130,${90 - microlithLength * 12} ${130 - microlithLength * 10},90 ${130 + microlithLength * 8},90`}
                          fill="#fef08a"
                          stroke="#ca8a04"
                          strokeWidth="2"
                        />
                        <text x="130" y="115" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="bold">
                          Geometric Microlith ({microlithLength} cm)
                        </text>
                        <text x="130" y="45" textAnchor="middle" fill="#fdba74" fontSize="10" fontStyle="italic">
                          Pahiyangala Rock Shelter Arch
                        </text>
                      </svg>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Adjust Microlith Flake Size:</span>
                        <span className="font-bold text-amber-400">{microlithLength} cm</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="4"
                        step="0.5"
                        value={microlithLength}
                        onChange={(e) => setMicrolithLength(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2.5 text-xs">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Landmark className="w-4 h-4 text-amber-400" />
                      <span>Balangoda Man (Homo sapiens balangodensis)</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Excavations at <strong>Pahiyangala (Fa-Hien Cave)</strong> in Bulathsinhala and <strong>Batadombalena</strong> in Kuruwita proved modern humans lived in Sri Lanka over 38,000 years ago. They manufactured geometric microlithic stone tools from quartz and chert, hunting arboreal prey (monkeys, giant squirrels) and gathering wild breadfruit (දෙල්) and Kekuna nuts.
                    </p>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                      <div className="text-amber-400 font-bold">Key Archaeological Sites:</div>
                      <div>• Pahiyangala (Bulathsinhala): Earliest anatomically modern humans (~38,000 BP)</div>
                      <div>• Batadombalena (Kuruwita): Microlithic quartz tool manufacturing workshop</div>
                      <div>• Bellanbandi Palassa: Open-air hunter-gatherer habitation site</div>
                    </div>
                  </div>
                </div>
              )}

              {settlementEra === 'protohistoric' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                      <span className="font-semibold text-amber-300">Ibbankatuwa Megalithic Cist Tomb</span>
                      <span className="font-mono text-emerald-400 font-bold">~1000–300 BCE</span>
                    </div>

                    <div className="flex flex-col items-center justify-center py-3 bg-slate-900/40 rounded-lg border border-slate-800/60">
                      <svg viewBox="0 0 240 130" className="w-full max-w-[240px] h-[130px] overflow-visible">
                        {/* Megalithic Stone Slab Cist Box */}
                        <rect x="50" y="45" width="140" height="70" fill="#334155" stroke="#94a3b8" strokeWidth="3" rx="4" />
                        {/* Clay Urn Inside */}
                        <circle cx="120" cy="80" r="22" fill="#b45309" stroke="#d97706" strokeWidth="2" />
                        <text x="120" y="84" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold">BRW Urn</text>
                        {/* Movable Top Capstone Slab */}
                        <rect
                          x={cistLidOpen ? "80" : "40"}
                          y={cistLidOpen ? "15" : "38"}
                          width="160"
                          height="12"
                          fill="#64748b"
                          stroke="#cbd5e1"
                          strokeWidth="2"
                          rx="3"
                          className="transition-all duration-300"
                        />
                      </svg>
                      <button
                        type="button"
                        onClick={() => setCistLidOpen(!cistLidOpen)}
                        className="mt-2 px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold"
                      >
                        {cistLidOpen ? 'Close Stone Capstone Lid' : 'Lift Stone Capstone Lid (Inspect Grave)'}
                      </button>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                      <span className="text-amber-400 font-bold">Burial Goods Inside:</span> Black and Red Ware (BRW) pottery with clan graffiti symbols, iron spear points, copper wire, and carnelian beads from Indian Ocean maritime trade.
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span>Proto-Historic Early Iron Age Culture</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Between 1000 BCE and 300 BCE, Sri Lankan society transitioned into the Early Iron Age. The discovery of the <strong>Ibbankatuwa Megalithic Cemetery</strong> (near Dambulla) and <strong>Pomparippu</strong> revealed elaborate stone cist tombs, iron metallurgy, paddy cultivation, and overseas trading links with South Asia.
                    </p>
                    <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-lg text-[11px] text-amber-200">
                      <strong>Textbook Exam Fact:</strong> Carbon-14 dating of Ibbankatuwa charcoal confirms permanent settled agrarian communities existed centuries before the traditional Prince Vijaya arrival legends!
                    </div>
                  </div>
                </div>
              )}

              {settlementEra === 'earlyhistoric' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="font-bold text-amber-300 text-xs border-b border-slate-800 pb-2">
                      Four Great River Valley Settlement Axes
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-cyan-400 font-bold">1. Malwathu Oya (Aruvi Aru):</span>
                        <p className="text-slate-400 text-[11px] mt-0.5">Anuradhapura heartland; connected directly to the international sea port of Mantai (Manthai).</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-cyan-400 font-bold">2. Mahaweli Ganga Basin:</span>
                        <p className="text-slate-400 text-[11px] mt-0.5">Perennial water feeding Dimbulagala, Polonnaruwa, and Trincomalee (Gokanna port).</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-cyan-400 font-bold">3. Deduru Oya Basin:</span>
                        <p className="text-slate-400 text-[11px] mt-0.5">Agricultural breadbasket spanning Chilaw, Kurunegala, and Panduwasnuwara.</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-cyan-400 font-bold">4. Walawe & Kirindi Oya (Ruhuna):</span>
                        <p className="text-slate-400 text-[11px] mt-0.5">Southern principality anchored at Magama (Tissamaharama) and Godawaya port.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2.5 text-xs">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-amber-400" />
                      <span>Why Did Ancient Settlers Choose River Basins?</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1.5 text-slate-300">
                      <li><strong>Fertile Alluvial Soil:</strong> Seasonal river floods deposited rich mineral silt ideal for wet-rice cultivation (*Ketha*).</li>
                      <li><strong>Drinking & Domestic Water:</strong> Perennial river flow ensured year-round survival in the dry zone.</li>
                      <li><strong>Inland Waterway Navigation:</strong> Rafts and flat-bottom canoes transported grain, timber, and pottery downstream to coastal trading ports.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. EVOLUTION OF POLITICAL POWER (CHAPTER 3) */}
          {historyMode === 'political' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">4 Stages of Political Power Evolution:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { stage: 1, title: '1. Gamika (ගාමික)' },
                    { stage: 2, title: '2. Parumaka (පරුමක)' },
                    { stage: 3, title: '3. Aya / Gāmani (අය)' },
                    { stage: 4, title: '4. Maharaja (මහාරජ)' },
                  ].map((s) => (
                    <button
                      key={s.stage}
                      type="button"
                      onClick={() => setPoliticalStage(s.stage as 1 | 2 | 3 | 4)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        politicalStage === s.stage 
                          ? 'bg-amber-500 text-slate-950 font-black shadow-xs' 
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Selected Title & Authority:</span>
                    <span className="font-mono text-amber-300 font-bold">Stage {politicalStage} of 4</span>
                  </div>

                  {politicalStage === 1 && (
                    <div className="space-y-2">
                      <div className="text-lg font-black text-amber-400">Gamika (ගාමික / கிராமத் தலைவர்)</div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        The earliest leadership unit in ancient Sri Lanka. The <strong>Gamika</strong> was the respected village headman who supervised the small village tank (Gama Wewa), mediated agrarian boundary disputes, and organized communal labor for paddy cultivation.
                      </p>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-cyan-300 font-mono">
                        Early Brahmi Inscription: "Gamika Tisa Lene Sagasa" (The cave of village headman Tissa is dedicated to the Sangha).
                      </div>
                    </div>
                  )}

                  {politicalStage === 2 && (
                    <div className="space-y-2">
                      <div className="text-lg font-black text-amber-400">Parumaka & Parumakalu (පරුමක / පරුමකලු)</div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Elite clan chieftains who governed territorial clan divisions (*Kabojha*, *Murundi*). They controlled regional trade, mines, and tanks. Ancient Brahmi inscriptions frequently record <strong>Parumakalu</strong> (female clan leaders), proving women possessed high civic autonomy and property ownership rights!
                      </p>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-cyan-300 font-mono">
                        Cave Inscription: "Parumaka Sumana Puta Parumaka Abhaya Lene Sagasa"
                      </div>
                    </div>
                  )}

                  {politicalStage === 3 && (
                    <div className="space-y-2">
                      <div className="text-lg font-black text-amber-400">Aya & Gāmani (අය / ගාමිණී)</div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Regional princes and supreme military commanders. <strong>Aya</strong> denoted a district revenue-collecting prince (from Sanskrit <em>Aya</em> = revenue/taxes), while <strong>Gāmani</strong> evolved into an illustrious royal title (e.g. <em>Gamani Uttiya</em>, <em>Gamani Tissa</em>) signifying consolidated regional rule.
                      </p>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-cyan-300 font-mono">
                        Epigraphic Record: "Aya Asali Puta Aya Siva Lene"
                      </div>
                    </div>
                  )}

                  {politicalStage === 4 && (
                    <div className="space-y-2">
                      <div className="text-lg font-black text-amber-400">Maharaja / Raja (මහාරජ / பேரரசன்)</div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Sovereign monarch heading a centralized state under a unified royal umbrella (<strong>Ekasath Kirima</strong>). Reinforced by Buddhist ethics (<em>Mahasammata</em> concept and <em>Dharmaraja</em> righteous kingship), beginning with King Devanampiyatissa and consolidated nationwide by King Dutugemunu.
                      </p>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 font-mono">
                        Periyapuliyankulam Inscription: "Damarakita Teraha Lene Agata Anagata Chatusa Sagasa Dine Gamani Damaraja"
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-400" />
                    <span>Transformation of Kingship via Buddhism</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Prior to the arrival of Arahat Mahinda (3rd Century BCE), rulers were largely territorial warlords. Buddhism introduced the sublime concept of the <strong>Dharmaraja</strong> (Righteous Ruler) guided by the <em>Dasa Raja Dharma</em> (Ten Royal Virtues: charity, morality, generosity, honesty, gentleness, self-control, non-anger, non-violence, patience, and non-opposition).
                  </p>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-[11px] text-slate-300">
                    <div className="text-amber-400 font-bold mb-1">G.C.E. O/L Examination Formula:</div>
                    Gamika (Village) ➔ Parumaka (Clan Territory) ➔ Aya / Gāmani (District Principalities) ➔ Maharaja (Centralized Island Monarchy)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. ANCIENT SOCIETY & VILLAGE ECOSYSTEM (CHAPTER 4) */}
          {historyMode === 'society' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/40 p-2 rounded-xl border border-slate-800">
                {[
                  { id: 'wewa', label: '1. Wewa (වැව - Reservoir)' },
                  { id: 'dagoba', label: '2. Dagoba (දාගැබ - Stupa)' },
                  { id: 'ketha', label: '3. Ketha (කෙත - Paddy Fields)' },
                  { id: 'gamgoda', label: '4. Gamgoda (ගම්ගොඩ - Homestead)' },
                ].map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setSocietySector(sec.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      societySector === sec.id ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                    <span className="font-semibold text-amber-300">The Quadripartite Ecological Harmony</span>
                    <span className="text-[10px] text-emerald-400 font-mono">වැවයි • දාගැබයි • ගමයි • පන්සලයි</span>
                  </div>

                  <div className="flex items-center justify-center py-2 bg-slate-900/40 rounded-lg border border-slate-800/60">
                    <svg viewBox="0 0 240 140" className="w-full max-w-[240px] h-[140px] overflow-visible">
                      {/* Quadrant 1: Wewa (Top Left) */}
                      <rect x="20" y="15" width="95" height="50" rx="8" fill={societySector === 'wewa' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(30, 41, 59, 0.6)'} stroke={societySector === 'wewa' ? '#06b6d4' : '#475569'} strokeWidth="1.5" />
                      <text x="67" y="44" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Wewa (Water)</text>

                      {/* Quadrant 2: Dagoba (Top Right) */}
                      <rect x="125" y="15" width="95" height="50" rx="8" fill={societySector === 'dagoba' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(30, 41, 59, 0.6)'} stroke={societySector === 'dagoba' ? '#f59e0b' : '#475569'} strokeWidth="1.5" />
                      <text x="172" y="44" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Dagoba (Faith)</text>

                      {/* Quadrant 3: Ketha (Bottom Left) */}
                      <rect x="20" y="75" width="95" height="50" rx="8" fill={societySector === 'ketha' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(30, 41, 59, 0.6)'} stroke={societySector === 'ketha' ? '#22c55e' : '#475569'} strokeWidth="1.5" />
                      <text x="67" y="104" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Ketha (Food)</text>

                      {/* Quadrant 4: Gamgoda (Bottom Right) */}
                      <rect x="125" y="75" width="95" height="50" rx="8" fill={societySector === 'gamgoda' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(30, 41, 59, 0.6)'} stroke={societySector === 'gamgoda' ? '#a855f7' : '#475569'} strokeWidth="1.5" />
                      <text x="172" y="104" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">Gamgoda (Home)</text>
                    </svg>
                  </div>

                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1">
                    {societySector === 'wewa' && (
                      <p className="text-slate-300"><strong>Wewa (Lifeblood Reservoir):</strong> Supplied gravity irrigation to paddy tracts, raised the subterranean groundwater table, and created a microclimate preventing drought desiccation.</p>
                    )}
                    {societySector === 'dagoba' && (
                      <p className="text-slate-300"><strong>Dagoba & Vihara (Spiritual Anchor):</strong> Unified villagers through Buddhist rituals, monastic education (Pirivenas), cultural arts, and moral discipline.</p>
                    )}
                    {societySector === 'ketha' && (
                      <p className="text-slate-300"><strong>Ketha (Agrarian Sustenance):</strong> Communally farmed wet-rice fields cultivating indigenous grains through cooperative mutual labor (<em>Aththam</em> and <em>Kayiya</em>).</p>
                    )}
                    {societySector === 'gamgoda' && (
                      <p className="text-slate-300"><strong>Gamgoda (Highland Homestead):</strong> Residential homes constructed on higher ground above flood contours to safeguard fertile arable soils below.</p>
                    )}
                  </div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span>Democratic Village Governance: Gam Sabha</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Ancient Sri Lankan villages were autonomous democratic republics. The <strong>Gam Sabha</strong> (Village Assembly) comprised village elders gathering beneath the banyan or sacred bo-tree. They resolved land boundary disputes, scheduled water turns (<em>Diya Mura</em>), and maintained reservoir bunds through voluntary civic labor.
                  </p>
                  <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-lg text-[11px] text-amber-200">
                    <strong>Social Equality:</strong> Unlike the rigid Hindu caste hierarchies of the mainland with "untouchables", Sri Lanka's occupational guild system (<em>Kula</em>) was heavily tempered by egalitarian Buddhist philosophy where all human beings shared equal spiritual dignity.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. ANCIENT SCIENCE & HYDRAULIC TECHNOLOGY (CHAPTER 5) */}
          {historyMode === 'sluice' && (
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
                  <div>Bisokotuwa Pressure Dissipation: <span className="font-mono text-emerald-400">Turbulence Absorbed in Stone Chamber</span></div>
                  <div>Sluice Water Exit Velocity: <span className="font-mono text-emerald-400">Controlled (Safe Trickle into Canal)</span></div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Yoda Ela (Jaya Ganga) Distance:</span>
                    <span className="font-bold text-cyan-400">{yodaElaDistance} km (of 87 km)</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="87"
                    step="5"
                    value={yodaElaDistance}
                    onChange={(e) => setYodaElaDistance(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="text-[10px] text-slate-400 mt-1">
                    Gradient: <strong className="text-amber-300">Less than 6 inches per mile (1 in 10,000)</strong> engineered by King Dhatusena!
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>The Bisokotuwa Sluice Valve & Monumental Engineering</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Before the 3rd Century BC, massive earthen dams washed away under raging deep water pressure. Ancient Sinhala engineers invented the <strong>Bisokotuwa</strong> (enclosed stone pressure valve). Water entered stone chambers where hydraulic turbulence was absorbed, releasing smooth water into distribution canals without breaching the earthen bund!
                </p>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="text-amber-300 font-bold">Other Feats in Grade 10 Chapter 5:</div>
                  <div>• <strong>Jetavanaramaya:</strong> Over 120m high, third tallest structure in the ancient world.</div>
                  <div>• <strong>Sigiriya Fountains:</strong> Powered entirely by gravitational hydraulic head pressure.</div>
                  <div>• <strong>Samanalawewa Furnaces:</strong> Wind-powered monsoon iron smelting achieving &gt;1200°C!</div>
                </div>
              </div>
            </div>
          )}

          {/* 5. HISTORICAL KNOWLEDGE & PRACTICAL APPLICATIONS (CHAPTER 6) */}
          {historyMode === 'practical' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/40 p-2 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setPracticalTab('bethma')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    practicalTab === 'bethma' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'si' ? 'බෙත්ම ක්‍රමය (නියං සමයේ ජල බෙදීම)' : language === 'ta' ? 'பெத்ம முறை (வறட்சி நீர் பகிர்வு)' : 'The Bethma Water-Sharing Protocol'}
                </button>
                <button
                  type="button"
                  onClick={() => setPracticalTab('badulla')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    practicalTab === 'badulla' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'si' ? 'බදුලු ටැම් ලිපිය (වෙළඳ නීති හා පාරිභෝගික රැකවරණය)' : language === 'ta' ? 'பதுளை தூண் கல்வெட்டு' : 'Badulla Pillar Inscription (Market Laws)'}
                </button>
                <button
                  type="button"
                  onClick={() => setPracticalTab('heirloom')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    practicalTab === 'heirloom' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'si' ? 'දේශීය පාරම්පරික වී ප්‍රභේද' : language === 'ta' ? 'பாரம்பரிய நெல் வகைகள்' : 'Heirloom Rice Varieties'}
                </button>
              </div>

              {practicalTab === 'bethma' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Reservoir Water Level:</span>
                        <span className={`font-bold ${reservoirWaterLevel < 40 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {reservoirWaterLevel}% ({reservoirWaterLevel < 40 ? 'Drought Alert: BETHMA ACTIVE!' : 'Normal Seasonal Level'})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={reservoirWaterLevel}
                        onChange={(e) => setReservoirWaterLevel(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1.5">
                      <div className="font-bold text-amber-400">Bethma Protocol Status:</div>
                      {reservoirWaterLevel < 40 ? (
                        <div className="text-rose-300 text-[11px] leading-relaxed">
                          <strong>Active Drought Strategy:</strong> Outer fields are temporarily retired. All village farming families receive equal micro-strips immediately below the sluice. Water is shared equally regardless of who originally owned the title deeds!
                        </div>
                      ) : (
                        <div className="text-emerald-300 text-[11px] leading-relaxed">
                          <strong>Normal Cultivation:</strong> Water is plentiful. Full paddy tracts across all upper and lower field sectors are actively irrigated.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-cyan-400" />
                      <span>Ancient Wisdom for Modern Climate Resilience</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      The <strong>Bethma</strong> system prevented starvation and prevented wealthy landowners from monopolizing scarce water during severe droughts. It represents an ancient sustainable socialist collective principle embedded inside traditional Sri Lankan tank culture.
                    </p>
                  </div>
                </div>
              )}

              {practicalTab === 'badulla' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="font-bold text-amber-300 text-xs border-b border-slate-800 pb-1.5">
                      Badulla Pillar Inscription (Hopitigamuwa - 10th Century CE)
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-amber-400 font-bold">1. Verified Weights & Measures:</span> Merchants must use standardized royal scales. Cheating customers was severely fined.
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-amber-400 font-bold">2. Protection Against Tax Extortion:</span> Royal tax collectors were prohibited from collecting arbitrary or illegal levies from traveling merchants.
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-amber-400 font-bold">3. Official Market Days:</span> Trading was conducted strictly in public marketplaces on authorized days; trading on Poya was prohibited.
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-amber-400" />
                      <span>Early Consumer Rights in South Asia</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      The Badulla Pillar Inscription (erected by King Udaya III at Hopitigamuwa market near Mahiyangana) is one of the earliest documented municipal consumer protection codes in world history! It proves ancient Sri Lanka maintained advanced commercial ethics and legal oversight.
                    </p>
                  </div>
                </div>
              )}

              {practicalTab === 'heirloom' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="flex gap-2">
                      {(['suwandel', 'heenati', 'maawee'] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setActiveRiceVar(r)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                            activeRiceVar === r ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1.5">
                      {activeRiceVar === 'suwandel' && (
                        <>
                          <div className="text-amber-400 font-bold text-sm">Suwandel (සුවඳැල්)</div>
                          <p className="text-slate-300">Famed for its exquisite aroma and sweet taste. Rich in antioxidants and low in glycemic index, historically prepared for royal banquets and auspicious ceremonies.</p>
                        </>
                      )}
                      {activeRiceVar === 'heenati' && (
                        <>
                          <div className="text-amber-400 font-bold text-sm">Kalu Heenati (කළු හීනැටි)</div>
                          <p className="text-slate-300">Drought-tolerant variety with exceptional iron and zinc content. Traditionally recommended for nursing mothers and restoring physical stamina after illness.</p>
                        </>
                      )}
                      {activeRiceVar === 'maawee' && (
                        <>
                          <div className="text-amber-400 font-bold text-sm">Maa-Wee (මා වී)</div>
                          <p className="text-slate-300">Long-duration (6 to 8 month) flood-resilient paddy variety. Deep roots thrive in marshy lowlands and waterlogged floodplains without chemical inputs.</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Trees className="w-4 h-4 text-emerald-400" />
                      <span>Natural Disease & Climate Resistance</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Sri Lanka possessed over 2,000 distinct heirloom rice cultivars before modern hybrid mono-cropping. These indigenous varieties required zero chemical fertilizers or synthetic pesticides and naturally adapted to local seasonal monsoons.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. DECLINE OF DRY ZONE & SOUTH-WEST KINGDOMS (CHAPTER 7) */}
          {historyMode === 'kingdoms' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/40 p-2 rounded-xl border border-slate-800">
                {[
                  { id: 'dambadeniya', label: '1. Dambadeniya (1232)' },
                  { id: 'yapahuwa', label: '2. Yapahuwa (1273)' },
                  { id: 'kurunegala', label: '3. Kurunegala (1293)' },
                  { id: 'gampola', label: '4. Gampola (1341)' },
                  { id: 'kotte', label: '5. Kotte (1412)' },
                ].map((k) => (
                  <button
                    key={k.id}
                    type="button"
                    onClick={() => setActiveKingdom(k.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeKingdom === k.id ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {k.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-amber-400 text-sm capitalize">{activeKingdom} Capital Era</span>
                    <span className="text-[10px] text-slate-400 font-mono">13th–15th Century CE</span>
                  </div>

                  {activeKingdom === 'dambadeniya' && (
                    <p className="text-slate-300 leading-relaxed">
                      Founded by King Vijayabahu III and made illustrious by King Parakramabahu II. Regarded as a literary golden era (authorship of <em>Pujavaliya</em>, <em>Kavsilumina</em>, and <em>Visuddhimarga Sannaya</em>). The Sacred Tooth Relic was safeguarded atop Beligala rock.
                    </p>
                  )}
                  {activeKingdom === 'yapahuwa' && (
                    <p className="text-slate-300 leading-relaxed">
                      King Bhuvanekabahu I fortified the sheer granite crag of Subha Pabbata (Yapahuwa). Renowned for its monumental <strong>Lion Staircase</strong> showing exquisite Chinese artistic influence, stone relief carvings of female dancers, and fortified palace terrace.
                    </p>
                  )}
                  {activeKingdom === 'kurunegala' && (
                    <p className="text-slate-300 leading-relaxed">
                      Reigned by King Parakramabahu IV. A landmark period for Sinhala vernacular literature: the monumental translation of 550 Pali Jataka stories into Sinhala (<em>Pansiya Panas Jataka Potha</em>) and <em>Dalada Siritha</em>.
                    </p>
                  )}
                  {activeKingdom === 'gampola' && (
                    <p className="text-slate-300 leading-relaxed">
                      Scenic hill kingdom reigned by Bhuvanekabahu IV and Vikramabahu III. Renowned for architectural masterpieces blending timber and stone: <strong>Gadaladeniya</strong>, <strong>Lankatilaka</strong>, and the intricate wood carvings of <strong>Embekke Devalaya</strong>.
                    </p>
                  )}
                  {activeKingdom === 'kotte' && (
                    <p className="text-slate-300 leading-relaxed">
                      Fortified by Minister Nissanka Alagakkonara amidst the Diyawanna marshes. Reached supreme glory under <strong>King Parakramabahu VI (1412–1467 CE)</strong>, who achieved the last sovereign political unification of the entire island! Golden age of <em>Sandesha Kavya</em> message poems.
                    </p>
                  )}
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>Four Catalysts for the South-Western Drift</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-300">
                    <li><strong>Brutal Foreign Invasions:</strong> Devastating invasion by Kalinga Magha (1215 CE) smashed Rajarata administrative centers.</li>
                    <li><strong>Destruction of Hydraulic Cascades:</strong> Breaching of complex inter-connected tank networks rendered irrigation unviable.</li>
                    <li><strong>Malaria Epidemics:</strong> Stagnant breach waters in dry zone valleys fostered disease vectors.</li>
                    <li><strong>Boom in Wet Zone Spice Trade:</strong> High international demand for wild cinnamon and spices shifted prosperity to southwestern coastal ports.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 7. KANDYAN KINGDOM (CHAPTER 8) */}
          {historyMode === 'kandy' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/40 p-2 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setKandyFocus('defenses')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    kandyFocus === 'defenses' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'si' ? 'ස්වාභාවික කඳුකර ආරක්ෂාව' : language === 'ta' ? 'இயற்கை தற்காப்பு' : 'Natural Mountain Fortress Defenses'}
                </button>
                <button
                  type="button"
                  onClick={() => setKandyFocus('battles')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    kandyFocus === 'battles' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'si' ? 'ඓතිහාසික සටන් (දන්තුරේ / ගන්නෝරුව)' : language === 'ta' ? 'வரலாற்று சமர்கள்' : 'Decisive Battles (Danture & Gannoruwa)'}
                </button>
                <button
                  type="button"
                  onClick={() => setKandyFocus('hierarchy')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    kandyFocus === 'hierarchy' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'si' ? 'උඩරට පරිපාලන ව්‍යුහය (අදිකාරම්වරු / දිසාවේවරු)' : language === 'ta' ? 'நிர்வாக கட்டமைப்பு' : 'Administrative Hierarchy & Rajakariya'}
                </button>
              </div>

              {kandyFocus === 'defenses' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="font-bold text-amber-300 border-b border-slate-800 pb-2 flex items-center justify-between">
                      <span>Senkadagala Geopolitical Fortress</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Impregnable Bastion</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      The Kingdom of Kandy defended its sovereignty for over 300 years through ingenious use of physical geography:
                    </p>
                    <ul className="list-disc pl-4 space-y-1.5 text-slate-400">
                      <li><strong>The Mahaweli River Moat:</strong> Encircles Senkadagala on three sides like a colossal natural moat.</li>
                      <li><strong>Balana Pass & Choke Points (Kadawath):</strong> Extremely narrow rocky passes where European troops had to march in single file.</li>
                      <li><strong>Monsoon Guerrilla Warfare:</strong> Heavy rains soaked European gunpowders and ruined matchlocks while Sinhala archers and snipers attacked from jungle canopy!</li>
                    </ul>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Mountain className="w-4 h-4 text-amber-400" />
                      <span>Guerrilla Strategy: Evacuate & Encircle</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Whenever Portuguese or Dutch armies marched into Kandy, the King and population evacuated the capital with all food, leaving an empty shell. When the invading soldiers grew starved and attempted to retreat down the mountain defiles, Kandyan forces struck with deadly ambushes!
                    </p>
                  </div>
                </div>
              )}

              {kandyFocus === 'battles' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="font-bold text-amber-400 text-sm">Battle of Danture (1594 CE)</div>
                    <p className="text-slate-300 leading-relaxed">
                      King Vimaladharmasuriya I completely routed the Portuguese army led by Governor Pero Lopes de Sousa, capturing weapons and cementing Kandyan royal legitimacy by marrying Princess Kusumasana Devi (Dona Catherina).
                    </p>
                  </div>
                  <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="font-bold text-amber-400 text-sm">Battle of Gannoruwa (1638 CE)</div>
                    <p className="text-slate-300 leading-relaxed">
                      The last great battle fought between the Portuguese and Sinhala forces. King Rajasinha II and Prince Vijayapala annihilated Diogo de Melo’s army on the banks of the Mahaweli River at Gannoruwa, ending Portuguese inland offensive ambitions forever.
                    </p>
                  </div>
                </div>
              )}

              {kandyFocus === 'hierarchy' && (
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
                  <div className="font-bold text-amber-300 border-b border-slate-800 pb-2">
                    Kandyan Central & Provincial Administration
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-amber-400 font-bold">1. The King (මහරජු)</div>
                      <p className="text-[11px] text-slate-400">Supreme executive, legislative, and judicial head of state; custodian of the Sacred Tooth Relic.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-amber-400 font-bold">2. Maha Adigars (අදිකාරම්)</div>
                      <p className="text-[11px] text-slate-400">Pallegampahe and Udagampahe Adigars acted as First and Second Prime Ministers and chief justices.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-amber-400 font-bold">3. Dissawas & Rate Mahattayas</div>
                      <p className="text-[11px] text-slate-400">Governors administering the 12 large outer provinces (Dissawanies) and 9 inner districts (Rataval).</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 8. EUROPEAN RENAISSANCE (CHAPTER 9) */}
          {historyMode === 'renaissance' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/40 p-2 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setRenaissanceTopic('press')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    renaissanceTopic === 'press' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'si' ? 'ගුටෙන්බර්ග් මුද්‍රණ යන්ත්‍රය' : language === 'ta' ? 'அச்சு இயந்திரம்' : 'Gutenberg Movable Type Press'}
                </button>
                <button
                  type="button"
                  onClick={() => setRenaissanceTopic('copernicus')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    renaissanceTopic === 'copernicus' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'si' ? 'කොපර්නිකස්ගේ සූර්ය කේන්ද්‍රවාදය' : language === 'ta' ? 'சூரிய மையக் கோட்பாடு' : 'Copernicus Heliocentric Model'}
                </button>
                <button
                  type="button"
                  onClick={() => setRenaissanceTopic('navigation')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    renaissanceTopic === 'navigation' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'si' ? 'දේශ ගවේෂණ හා මාලිමාව' : language === 'ta' ? 'திசையறி கருவி' : 'Maritime Compass & Discoveries'}
                </button>
              </div>

              {renaissanceTopic === 'press' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-semibold text-amber-300">Johannes Gutenberg's Invention (~1450 CE)</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Knowledge Revolution</span>
                    </div>

                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col items-center text-center space-y-2">
                      <button
                        type="button"
                        onClick={() => setPressPrinted(!pressPrinted)}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all shadow-md ${
                          pressPrinted ? 'bg-slate-800 text-slate-200' : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                        }`}
                      >
                        {pressPrinted ? 'Reset Screw Press Lever' : 'Pull Screw Press Lever ➔ Print Page!'}
                      </button>
                      <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 w-full text-left font-serif text-[11px] text-amber-200">
                        {pressPrinted ? (
                          <span>"Knowledge belongs to humanity. Printed in Mainz: The Holy Bible & Scientific Treatises in Latin."</span>
                        ) : (
                          <span className="text-slate-500 italic">Type blocks ready inked with oil lacquer. Pull lever to print.</span>
                        )}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                      <strong>Impact:</strong> Reduced the time to duplicate a book from 1 year of hand copying by a monk to under 1 minute! Democratized literacy across Europe.
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>Humanism (මානවවාදය)</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      The intellectual heart of the Renaissance. Replaced medieval theological dogma with rational inquiry, celebration of human reason, individual potential, and secular observation of the natural world. Spearheaded by scholars like Petrarch, Erasmus, and artists like Leonardo da Vinci and Michelangelo.
                    </p>
                  </div>
                </div>
              )}

              {renaissanceTopic === 'copernicus' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="font-bold text-amber-300 border-b border-slate-800 pb-2">
                      Heliocentrism vs Medieval Geocentric Dogma
                    </div>
                    <div className="flex items-center justify-center py-2 bg-slate-900/40 rounded-lg border border-slate-800/60">
                      <svg viewBox="0 0 200 130" className="w-full max-w-[200px] h-[130px] overflow-visible">
                        {/* Sun in center */}
                        <circle cx="100" cy="65" r="16" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2" />
                        <text x="100" y="69" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="black">SUN</text>
                        {/* Orbit line */}
                        <circle cx="100" cy="65" r="45" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
                        {/* Earth */}
                        <circle cx="145" cy="65" r="7" fill="#06b6d4" stroke="#e2e8f0" strokeWidth="1" />
                        <text x="145" y="52" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">Earth</text>
                      </svg>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Nicolaus Copernicus proved the Earth and planets revolve around the Sun, shattering the Ptolemaic church model of a stationary Earth at the center of the universe. Later verified by Galileo Galilei's telescope observations!
                    </p>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-cyan-400" />
                      <span>Scientific Revolution</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      The Renaissance laid the empirical foundations for modern medicine (Andreas Vesalius human anatomy dissections, William Harvey blood circulation) and physics (Isaac Newton's laws of motion).
                    </p>
                  </div>
                </div>
              )}

              {renaissanceTopic === 'navigation' && (
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
                  <div className="font-bold text-amber-300 border-b border-slate-800 pb-2">
                    Maritime Inventions Driving Age of Discovery
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-cyan-400 font-bold">1. Magnetic Compass</div>
                      <p className="text-slate-400 text-[11px]">Enabled navigators to determine true North across open oceanic expanse without sight of land.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-cyan-400 font-bold">2. Astrolabe & Quadrant</div>
                      <p className="text-slate-400 text-[11px]">Measured the altitude of the sun and Polaris star to calculate ship latitude at sea.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-cyan-400 font-bold">3. Caravel Ships</div>
                      <p className="text-slate-400 text-[11px]">Light, fast sailing vessels equipped with triangular Lateen sails allowing ships to sail against wind.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 9. SRI LANKA & WESTERN WORLD (CHAPTER 10) */}
          {historyMode === 'western' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/40 p-2 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setWesternTimeline('arrival1505')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    westernTimeline === 'arrival1505' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'si' ? '1505 පෘතුගීසි ආගමනය හා කෝට්ටේ' : language === 'ta' ? '1505 போர்த்துக்கேயர் வருகை' : '1505 Portuguese Arrival & Kotte'}
                </button>
                <button
                  type="button"
                  onClick={() => setWesternTimeline('mulleriyawa1562')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    westernTimeline === 'mulleriyawa1562' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'si' ? '1562 මුල්ලේරියා සටන (සීතාවක ප්‍රතිරෝධය)' : language === 'ta' ? 'சீதாவக்கையின் எதிர்ப்பு' : '1562 Battle of Mulleriyawa'}
                </button>
                <button
                  type="button"
                  onClick={() => setWesternTimeline('dutch1658')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    westernTimeline === 'dutch1658' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'si' ? '1658 ලන්දේසි පාලනය හා රෝම-ලන්දේසි නීතිය' : language === 'ta' ? '1658 டச்சு ஆட்சி' : '1658 Dutch VOC Rule & Roman-Dutch Law'}
                </button>
              </div>

              {westernTimeline === 'arrival1505' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="font-bold text-amber-300 border-b border-slate-800 pb-2">
                      Arrival of Lourenço de Almeida (1505 CE)
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Driven off course by a storm, Portuguese explorer Lourenço de Almeida entered Galle and Colombo harbors in 1505. Contemporary observers described them to King Dharma Parakramabahu IX:
                    </p>
                    <div className="p-3 bg-slate-900 border border-amber-500/20 rounded-lg text-[11px] text-amber-200 italic">
                      "There is in our haven of Colombo a race of people of fair skins and exceeding beauty with iron jackets and hats; they eat white stone (bread) and drink blood (wine)..."
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span>The Vijayaba Kollaya Partition (1521 CE)</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      In 1521, three royal sons of King Vijayabahu VII assassinated their father and divided the Kotte Kingdom into three weakened realms: <strong>Bhuvanekabahu VII (Kotte)</strong>, <strong>Mayadunne (Sitawaka)</strong>, and <strong>Raigam Bandara (Raigama)</strong>. This partition opened the door to Portuguese colonial intervention.
                    </p>
                  </div>
                </div>
              )}

              {westernTimeline === 'mulleriyawa1562' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="font-bold text-amber-300 border-b border-slate-800 pb-2">
                      Sitawaka Valor: Battle of Mulleriyawa (1562 CE)
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Led by young crown prince Tikiri Bandara (later King Rajasinha I), Sitawaka troops surrounded a heavily armed Portuguese force at Mulleriyawa marsh. Utilizing fierce hand-to-hand combat with Sinhala swords (<em>Ilangam</em> martial arts) and war elephants, they crushed the invaders in the deadliest battle suffered by the Portuguese in 16th century Asia!
                    </p>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-rose-400">1580 Deed of Gift (Donation of Dharmapala)</div>
                    <p className="text-slate-300 leading-relaxed">
                      Baptized as Don Juan Dharmapala, the puppet king of Kotte signed a secret deed in 1580 bequeathing the entire sovereign realm of Kotte to King Henry of Portugal upon his death, permanently forfeiting indigenous royal sovereignty.
                    </p>
                  </div>
                </div>
              )}

              {westernTimeline === 'dutch1658' && (
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
                  <div className="font-bold text-amber-300 border-b border-slate-800 pb-2">
                    Dutch East India Company (VOC) Maritime Rule & Enduring Legacies
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-amber-400 font-bold">1. Roman-Dutch Law</div>
                      <p className="text-slate-400 text-[11px]">Introduced in Dutch maritime courts; remains the cornerstone of modern Sri Lankan civil legal jurisprudence!</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-amber-400 font-bold">2. Thombo Land Registers</div>
                      <p className="text-slate-400 text-[11px]">Systematic Head and School Thombo registers surveying land titles, boundaries, and genealogy.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-amber-400 font-bold">3. Forts & Canals</div>
                      <p className="text-slate-400 text-[11px]">Preserved Galle Fort (UNESCO World Heritage), Wolvendaal Church, and the Hamilton Canal system.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 10. BRAHMI EPIGRAPHY & SOURCES (CHAPTER 1) */}
          {historyMode === 'brahmi' && (
            <div className="space-y-4">
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Click Early Brahmi Glyphs to Decipher Rock Inscriptions:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
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

              {/* 5 Categories of Inscriptions by Stone Shape */}
              <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-1.5 flex justify-between">
                  <span>5 Stone Inscription Categories (Grade 10 Textbook Chapter 1):</span>
                  <span className="text-amber-400">Click to Explore Shape</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-1">
                  {inscriptionTypes.map((ins, idx) => (
                    <button
                      key={ins.nameEn}
                      type="button"
                      onClick={() => setActiveInscriptionShape(idx)}
                      className={`p-2 rounded-lg text-left text-xs font-bold border transition-all ${
                        activeInscriptionShape === idx
                          ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {language === 'si' ? ins.nameSi : language === 'ta' ? ins.nameTa : ins.nameEn.split('(')[0]}
                    </button>
                  ))}
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 mt-2">
                  <span className="text-amber-300 font-bold">{inscriptionTypes[activeInscriptionShape].nameEn}: </span>
                  {language === 'si' ? inscriptionTypes[activeInscriptionShape].descSi : language === 'ta' ? inscriptionTypes[activeInscriptionShape].descTa : inscriptionTypes[activeInscriptionShape].descEn}
                </div>
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
