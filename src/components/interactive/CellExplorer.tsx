import React, { useState } from 'react';
import { Eye } from 'lucide-react';

export type CellExplorerLanguage = 'en' | 'si' | 'ta';
export type CellType = 'plant' | 'animal';
export type OrganelleKey = 'nucleus' | 'mitochondria' | 'chloroplast' | 'cellWall' | 'vacuole';

export interface OrganelleInfo {
  en: string;
  si: string;
  ta: string;
  descEn: string;
  descSi: string;
  descTa: string;
  plantOnly?: boolean;
}

/**
 * Organelle content restored from the known-good implementation (6f2070b).
 * Kept as plain data so it can be unit-tested and reused without rendering.
 */
export const ORGANELLES: Record<OrganelleKey, OrganelleInfo> = {
  nucleus: {
    en: 'Nucleus (Control Center)',
    si: 'න්‍යෂ්ටිය (පාලන කේන්ද්‍රය)',
    ta: 'கரு (கட்டுப்பாட்டு மையம்)',
    descEn: 'Contains hereditary genetic material (chromatin/DNA) that directs all cell metabolic activities and division.',
    descSi: 'සෛලයේ සියලු ජීව ක්‍රියා හා සෛල බෙදීම පාලනය කරන පාරම්පරික ද්‍රව්‍ය (DNA) රඳවා තබාගනී.',
    descTa: 'கலத்தின் அனைத்து வளர்ச்சி மற்றும் தொழிற்பாடுகளை கட்டுப்படுத்தும் பரம்பரை DNA மூலக்கூறுகளை கொண்டுள்ளது.',
  },
  mitochondria: {
    en: 'Mitochondria (Powerhouse)',
    si: 'මයිටොකොන්ඩ්‍රියා (බලස්ථානය)',
    ta: 'இழைமணி (சக்தி பிறப்பிடம்)',
    descEn: 'Carries out aerobic cellular respiration to generate energy currency in the form of ATP molecules.',
    descSi: 'වායුගෝලීය ඔක්සිජන් භාවිතයෙන් සෛලීය ශ්වසනය සිදු කර ATP ආකාරයෙන් ජීවීන්ට අවශ්‍ය ශක්තිය නිපදවයි.',
    descTa: 'கல சுவாசத்தை மேற்கொண்டு ATP வடிவில் தேவையான சக்தியை பிறப்பிக்கிறது.',
  },
  chloroplast: {
    en: 'Chloroplast (Food Factory)',
    si: 'හරිතලව (ආහාර කර්මාන්තශාලාව)',
    ta: 'பசையவுருவம் (உணவுத் தொழிற்சாலை)',
    descEn: 'Contains green chlorophyll pigment to trap solar radiation and drive photosynthesis in plant cells.',
    descSi: 'සූර්ය ශක්තිය ග්‍රහණය කර ප්‍රභාසංස්ලේෂණය මඟින් ග්ලූකෝස් ආහාර නිෂ්පාදනය කිරීමට හරිතප්‍රද අඩංගු වේ.',
    descTa: 'சூரிய ஒளியை உறிஞ்சி ஒளித்தொகுப்பு மூலம் குளுக்கோஸ் உணவைத் தயாரிக்கிறது.',
    plantOnly: true,
  },
  cellWall: {
    en: 'Cell Wall (Rigid Armor)',
    si: 'සෛල බිත්තිය (දැඩි ආවරණය)',
    ta: 'கலச்சுவர் (பாதுகாப்புக் கவசம்)',
    descEn: 'Rigid protective outer envelope composed of cellulose, providing structural turgidity and shape.',
    descSi: 'සෙලියුලෝස් වලින් සැදි දැඩි බාහිර ස්ථරයයි. ශාක සෛලයට නියත හැඩයක් සහ ශක්තියක් ලබාදෙයි.',
    descTa: 'செல்லுலோசால் ஆன உறுதியான வெளிப்புற அடுக்கு. தாவர கலத்திற்கு நிலையான வடிவத்தையும் உறுதியையும் அளிக்கிறது.',
    plantOnly: true,
  },
  vacuole: {
    en: 'Large Central Vacuole',
    si: 'විශාල මධ්‍ය රික්තකය',
    ta: 'பெரிய மைய நுண்குமிழி',
    descEn: 'Stores cell sap (water, minerals, sugars) and maintains osmotic turgor pressure in plant tissues.',
    descSi: 'සෛල යුෂය ගබඩා කරමින් ශාක සෛලයේ තදබව (ශූනතාව) සහ ජල තුල්‍යතාව පවත්වා ගනී.',
    descTa: 'கலச்சாற்றை சேமித்து கலத்தின் வீக்க அமுக்கத்தை பேணுகிறது.',
    plantOnly: true,
  },
};

/** O/L Exam Focus notes. English is the historical text; si/ta are new and need teacher review. */
export const EXAM_FOCUS: Record<CellType, Record<CellExplorerLanguage, string>> = {
  plant: {
    en: 'Plant cells possess a rigid cellulose cell wall, chloroplasts for photosynthesis, and a large central vacuole.',
    si: 'ශාක සෛලවල දැඩි සෙලියුලෝස් සෛල බිත්තියක්, ප්‍රභාසංස්ලේෂණය සඳහා හරිතලව සහ විශාල මධ්‍ය රික්තකයක් පවතී.',
    ta: 'தாவர கலங்களில் உறுதியான செல்லுலோஸ் கலச்சுவர், ஒளித்தொகுப்புக்கான பசையவுருவங்கள் மற்றும் பெரிய மைய நுண்குமிழி காணப்படும்.',
  },
  animal: {
    en: 'Animal cells lack cell walls and chloroplasts, allowing flexible shapes and active motility.',
    si: 'සත්ත්ව සෛලවල සෛල බිත්ති සහ හරිතලව නොමැති බැවින් නම්‍යශීලී හැඩයක් සහ චලනශීලිත්වයක් ඇත.',
    ta: 'விலங்கு கலங்களில் கலச்சுவரும் பசையவுருவமும் இல்லை; இதனால் நெகிழ்வான வடிவமும் இயக்கமும் சாத்தியமாகிறது.',
  },
};

const pick = <T extends { en: string; si: string; ta: string }>(info: T, lang: CellExplorerLanguage): string =>
  lang === 'si' ? info.si : lang === 'ta' ? info.ta : info.en;

interface CellExplorerProps {
  language?: CellExplorerLanguage;
  initialCellType?: CellType;
}

/**
 * Grade 10 Science, Chapter 6: Plant and animal cells.
 * Modular replacement for the biology branch of the old monolithic SubjectConceptVisualizer.
 * All hooks run unconditionally at the top; there are no early returns before them.
 */
export const CellExplorer: React.FC<CellExplorerProps> = ({ language = 'en', initialCellType = 'plant' }) => {
  const [cellType, setCellType] = useState<CellType>(initialCellType);
  const [selected, setSelected] = useState<OrganelleKey>('nucleus');

  const entries = (Object.entries(ORGANELLES) as [OrganelleKey, OrganelleInfo][]).filter(
    ([, info]) => cellType === 'plant' || !info.plantOnly
  );
  // Derived (not effect-driven): a plant-only organelle cannot stay selected on an animal cell.
  const activeKey: OrganelleKey = entries.some(([key]) => key === selected) ? selected : 'nucleus';
  const active = ORGANELLES[activeKey];

  return (
    <div className="space-y-4" data-testid="cell-explorer">
      <div className="flex items-center justify-between">
        <div className="flex gap-2" role="group" aria-label="Cell type">
          <button
            type="button"
            aria-pressed={cellType === 'plant'}
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
            aria-pressed={cellType === 'animal'}
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
        <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800" data-testid="organelle-list">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Select Organelle
          </span>
          {entries.map(([key, info]) => (
            <button
              key={key}
              type="button"
              data-testid={`organelle-${key}`}
              aria-pressed={activeKey === key}
              onClick={() => setSelected(key)}
              className={`w-full text-left p-2 rounded-lg text-xs font-semibold transition-all ${
                activeKey === key
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {pick(info, language)}
            </button>
          ))}
        </div>

        <div
          className="md:col-span-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3"
          data-testid="organelle-inspector"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              {pick(active, language)}
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
              {cellType === 'plant' ? 'Plant Architecture' : 'Animal Architecture'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'si' ? active.descSi : language === 'ta' ? active.descTa : active.descEn}
          </p>

          <div
            className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-200/90"
            data-testid="ol-exam-focus"
          >
            <strong>O/L Exam Focus:</strong> {EXAM_FOCUS[cellType][language]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CellExplorer;
