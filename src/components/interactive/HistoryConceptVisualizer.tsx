import React, { useState, useEffect } from 'react';
import {
  Compass,
  Landmark,
  Shield,
  Crown,
  Scale,
  Droplets,
  Trees,
  Mountain,
  BookOpen,
  Globe,
  Scroll,
  Award,
  Sparkles,
  Layers,
  CheckCircle2,
  MapPin
} from 'lucide-react';

interface HistoryVisualizerProps {
  topicId: string;
  language?: 'en' | 'si' | 'ta';
  activeModeHint?: string;
}

export type HistoryMode = 'settlements' | 'political' | 'society' | 'sluice' | 'practical' | 'kingdoms' | 'kandy' | 'renaissance' | 'western' | 'brahmi';

export const HistoryConceptVisualizer: React.FC<HistoryVisualizerProps> = ({
  topicId,
  language = 'en',
  activeModeHint,
}) => {
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

  useEffect(() => {
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

  useEffect(() => {
    if (!activeModeHint) return;
    const hint = activeModeHint.toLowerCase();
    if (
      hint.includes('parumaka') || hint.includes('පරුමක') ||
      hint.includes('gamika') || hint.includes('ගාමික') ||
      hint.includes('gamani') || hint.includes('ගාමිණී') ||
      hint.includes('brahmi') || hint.includes('sellipi') || hint.includes('inscription') ||
      hint.includes('ලෙන් ලිපි') || hint.includes('සෙල්ලිපි') || hint.includes('ශිලා ලේඛන')
    ) {
      setHistoryMode('brahmi');
      if (hint.includes('parumaka') || hint.includes('පරුමක')) {
        setActiveBrahmiChar(0);
      } else if (hint.includes('gamika') || hint.includes('ගාමික') || hint.includes('gamani') || hint.includes('ගාමිණී')) {
        setActiveBrahmiChar(1);
      } else if (hint.includes('vapi') || hint.includes('වාපී') || hint.includes('tank')) {
        setActiveBrahmiChar(2);
      } else if (hint.includes('lene') || hint.includes('ලෙන') || hint.includes('cave')) {
        setActiveBrahmiChar(3);
      }
    } else if (hint.includes('sluice') || hint.includes('bisokotuwa') || hint.includes('බිසෝකොටුව') || hint.includes('hydraulic') || hint.includes('වාරි')) {
      setHistoryMode('sluice');
    }
  }, [activeModeHint]);

  return (
    <div className="space-y-4 text-slate-100">
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
              {language === 'si' ? 'ප්‍රාග් ඓතිහාසික (පාහියංගල)' : language === 'ta' ? 'வரலாற்றுக்கு முற்பட்ட காலம்' : 'Pre-Historic (Pahiyangala Caves / 38,000 BP)'}
            </button>
            <button
              type="button"
              onClick={() => setSettlementEra('protohistoric')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                settlementEra === 'protohistoric' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'si' ? 'පූර්ව ඓතිහාසික (ඉබ්බන්කටුව)' : language === 'ta' ? 'ஆதி வரலாற்றுக் காலம்' : 'Proto-Historic (Ibbankatuwa Megalithic)'}
            </button>
            <button
              type="button"
              onClick={() => setSettlementEra('earlyhistoric')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                settlementEra === 'earlyhistoric' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'si' ? 'මූල ඓතිහාසික (මල්වතු ඔය)' : language === 'ta' ? 'ஆரம்ப வரலாற்றுக் காலம்' : 'Early Historic (River Basin Agrarian)'}
            </button>
          </div>

          {settlementEra === 'prehistoric' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                  <span className="font-semibold text-amber-300">Pahiyangala Cave & Microlithic Technology</span>
                  <span className="font-mono text-emerald-400 font-bold">~38,000 BP</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300">
                  Adjust Microlith Flake Size: <span className="text-amber-400 font-bold">{microlithLength} cm</span>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="0.5"
                    value={microlithLength}
                    onChange={(e) => setMicrolithLength(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 mt-2"
                  />
                </div>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  <span>Balangoda Man (Homo sapiens balangodensis)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Excavations at <strong>Pahiyangala</strong> and <strong>Batadombalena</strong> proved modern humans lived in Sri Lanka over 38,000 years ago, manufacturing geometric microlithic quartz tools.
                </p>
              </div>
            </div>
          )}

          {settlementEra === 'protohistoric' && (
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="font-bold text-amber-300">Ibbankatuwa Megalithic Cist Tomb (~1000–300 BCE)</div>
              <p className="text-slate-300">
                Proto-historic Sri Lankans introduced iron smelting, Black and Red Ware (BRW) pottery, horse-riding, and megalithic stone cist burial rituals.
              </p>
              <button
                type="button"
                onClick={() => setCistLidOpen(!cistLidOpen)}
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg font-bold"
              >
                {cistLidOpen ? 'Close Stone Capstone Lid' : 'Lift Stone Capstone Lid (Inspect Grave)'}
              </button>
            </div>
          )}

          {settlementEra === 'earlyhistoric' && (
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-amber-300">Early Historic Era & River Basin Settlements</div>
              <p className="text-slate-300">
                Pioneering agrarian clans established river-basin settlements along Malwatu Oya, Kala Oya, and Deduru Oya, evolving into village ecosystems centered around reservoirs (Wewa).
              </p>
            </div>
          )}
        </div>
      )}

      {/* 2. EVOLUTION OF POLITICAL POWER (CHAPTER 3) */}
      {historyMode === 'political' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[
              { level: 1, title: '1. Gamika (ගාමික)' },
              { level: 2, title: '2. Parumaka (පරුමක)' },
              { level: 3, title: '3. Aya (අය / කුමාර)' },
              { level: 4, title: '4. Maharaja (මහාරජ)' },
            ].map((st) => (
              <button
                key={st.level}
                type="button"
                onClick={() => setPoliticalStage(st.level as 1 | 2 | 3 | 4)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  politicalStage === st.level ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {st.title}
              </button>
            ))}
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-200">
            {politicalStage === 1 && 'Gamika: Village council leaders governing rural agricultural settlements (Gama).'}
            {politicalStage === 2 && 'Parumaka: Clan nobility and elite regional leaders financing cave monasteries and tanks.'}
            {politicalStage === 3 && 'Aya / Princes: Regional governors administering provinces (e.g. Ruhuna, Maya, Pihiti).'}
            {politicalStage === 4 && 'Maharaja: Unified supreme sovereign ruling Sri Lanka from Anuradhapura.'}
          </div>
        </div>
      )}

      {/* 3. ANCIENT SOCIETY (CHAPTER 4) */}
      {historyMode === 'society' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {[
              { id: 'wewa', label: 'Wewa (වැව)' },
              { id: 'dagoba', label: 'Dagoba (දාගැබ)' },
              { id: 'ketha', label: 'Ketha (කෙත)' },
              { id: 'gamgoda', label: 'Gamgoda (ගම්ගොඩ)' },
            ].map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setSocietySector(sec.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  societySector === sec.id ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-200">
            {societySector === 'wewa' && 'The Wewa provided water security, microclimate moderation, and agricultural sustenance.'}
            {societySector === 'dagoba' && 'The Dagoba and temple served as the spiritual, moral, and cultural heartbeat of the community.'}
            {societySector === 'ketha' && 'Paddy fields cultivated collaboratively through traditional labor-sharing (Kayya).'}
            {societySector === 'gamgoda' && 'Residential highland settlements positioned safely above high-water irrigation marks.'}
          </div>
        </div>
      )}

      {/* 4. ANCIENT SCIENCE & SLUICE TECHNOLOGY (CHAPTER 5) */}
      {historyMode === 'sluice' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4 text-xs">
            <h4 className="font-bold text-amber-400 uppercase">Bisokotuwa (Cistern Sluice Gate)</h4>
            <div>
              <div className="flex justify-between mb-1">
                <span>Reservoir Water Head (h):</span>
                <span className="font-bold text-cyan-400">{reservoirDepth} m</span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                step="1"
                value={reservoirDepth}
                onChange={(e) => setReservoirDepth(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div className="p-3 bg-slate-900 rounded-lg space-y-1">
              <div className="text-cyan-400 font-bold">Hydrostatic Pressure at Bed: {((reservoirDepth * 1000 * 9.8) / 1000).toFixed(0)} kPa</div>
              <div className="text-slate-300">The vertical rectangular stone cistern (Bisokotuwa) dissipated destructive water velocity before releasing flow safely into canals.</div>
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-amber-400">Yoda Ela Engineering Gradient</div>
            <p className="text-slate-300 leading-relaxed">
              King Dhatusena’s 87 km Jaya Ganga (Yoda Ela) maintained a minute gradient of <strong>6 to 12 inches per mile</strong> (1 in 5,000 to 10,000), preventing soil erosion while feeding over 100 minor tanks.
            </p>
          </div>
        </div>
      )}

      {/* 5. PRACTICAL KNOWLEDGE (CHAPTER 6) */}
      {historyMode === 'practical' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {[
              { id: 'bethma', label: 'Bethma System (බෙත්ම ක්‍රමය)' },
              { id: 'badulla', label: 'Badulla Pillar Inscription (බදුලු ටැම් ලිපිය)' },
              { id: 'heirloom', label: 'Heirloom Rice Varieties (දේශීය වී)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPracticalTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  practicalTab === tab.id ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-200">
            {practicalTab === 'bethma' && 'Bethma: When tank water dropped during droughts, villagers shared lands closest to the sluice equitably rather than letting downstream crops wither.'}
            {practicalTab === 'badulla' && 'Badulla Pillar (King Udaya IV, 10th C): Ancient market trade statutes, standard weights, and consumer protections.'}
            {practicalTab === 'heirloom' && 'Indigenous pest-resistant medicinal rice strains (Suwandel, Heenati, Maawee) adapted to dry-zone soils.'}
          </div>
        </div>
      )}

      {/* 6. SOUTH-WEST KINGDOMS (CHAPTER 7) */}
      {historyMode === 'kingdoms' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(['dambadeniya', 'yapahuwa', 'kurunegala', 'gampola', 'kotte'] as const).map((kd) => (
              <button
                key={kd}
                type="button"
                onClick={() => setActiveKingdom(kd)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize ${
                  activeKingdom === kd ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {kd}
              </button>
            ))}
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-200">
            {activeKingdom === 'dambadeniya' && 'Dambadeniya: Established by Vijayabahu III and expanded by Parakramabahu II following Kalinga Magha’s invasion.'}
            {activeKingdom === 'yapahuwa' && 'Yapahuwa: Natural rock fortress established by Buvanekabahu I with steep Chinese-influenced granite stairway.'}
            {activeKingdom === 'kurunegala' && 'Kurunegala: Nestled beneath Ethagala rock, flourishing under Parakramabahu II and IV.'}
            {activeKingdom === 'gampola' && 'Gampola: Hill country kingdom along the Mahaweli River, famous for Gadaladeniya and Lankathilaka shrines.'}
            {activeKingdom === 'kotte' && 'Kotte: Parakramabahu VI successfully unified all of Sri Lanka under one single crown.'}
          </div>
        </div>
      )}

      {/* 7. KANDYAN KINGDOM (CHAPTER 8) */}
      {historyMode === 'kandy' && (
        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-200">
          <div className="font-bold text-amber-400">Senkadagala Mountain Bastion & Guerrilla Defenses</div>
          <p>
            Surrounded by the Mahaweli River and fortified mountain passes (Balana Kadawatha), the Kandyan kingdom resisted European invaders for three centuries using guerrilla warfare.
          </p>
        </div>
      )}

      {/* 8. RENAISSANCE (CHAPTER 9) */}
      {historyMode === 'renaissance' && (
        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-200">
          <div className="font-bold text-amber-400">European Renaissance & Scientific Revolution</div>
          <p>
            Gutenberg’s movable metal type printing press (1450), Copernicus’s heliocentric model, and nautical astrolabes fueled global maritime exploration.
          </p>
        </div>
      )}

      {/* 9. WESTERN WORLD ENCOUNTERS (CHAPTER 10) */}
      {historyMode === 'western' && (
        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-200">
          <div className="font-bold text-amber-400">Portuguese (1505) and Dutch (1658) Incursions</div>
          <p>
            Lourenço de Almeida arrived in Galle in 1505, seeking cinnamon monopolies. Following major land battles such as Mulleriyawa (1562), the Dutch VOC expelled the Portuguese in 1658.
          </p>
        </div>
      )}

      {/* 10. BRAHMI INSCRIPTIONS & SOURCES (CHAPTER 1) */}
      {historyMode === 'brahmi' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {brahmiCharacters.map((char, idx) => (
              <button
                key={char.glyph}
                type="button"
                onClick={() => setActiveBrahmiChar(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  activeBrahmiChar === idx ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'
                }`}
              >
                <span className="font-mono text-base mr-1">{char.glyph}</span> {char.translit}
              </button>
            ))}
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
            <div className="text-xl font-bold text-amber-400">
              {brahmiCharacters[activeBrahmiChar].term}
            </div>
            <p className="text-slate-300">
              {language === 'si' ? brahmiCharacters[activeBrahmiChar].meaningSi : language === 'ta' ? brahmiCharacters[activeBrahmiChar].meaningTa : brahmiCharacters[activeBrahmiChar].meaningEn}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
