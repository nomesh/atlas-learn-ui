import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  Lightbulb, 
  Check, 
  RotateCcw,
  Compass,
  Award
} from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import { TutorAvatar } from '../avatar/TutorAvatar';
import { getLessonStepsForTopic, MOCK_TOPICS, MOCK_SUBJECTS, findTopicResilient } from '../../mocks/curriculumData';
import { fetchCurriculumTopics } from '../../api/curriculumApi';
import type { Topic } from '../../types';
import { ElectricSwitchVisualizer } from '../../components/interactive/ElectricSwitchVisualizer';
import { ResolutionVisualizer } from '../../components/interactive/ResolutionVisualizer';
import { ScratchBlockVisualizer } from '../../components/interactive/ScratchBlockVisualizer';
import { MicrocontrollerVisualizer } from '../../components/interactive/MicrocontrollerVisualizer';
import { UrlAnatomyVisualizer } from '../../components/interactive/UrlAnatomyVisualizer';
import { WordProcessingVisualizer } from '../../components/interactive/WordProcessingVisualizer';
import { SubjectConceptVisualizer, hasSimulation } from '../../components/interactive/SubjectConceptVisualizer';
import { RichContentRenderer, MathView } from '../tutor/RichContentRenderer';
import { AuthGate, GuestBanner } from '../../components/auth/AuthGate';

function getChapterKeyPoints(topic: Topic | null, language: 'en' | 'si' | 'ta', steps?: any[]): string[] {
  if (!topic) return [];
  const idLower = (topic.id || '').toLowerCase();
  const chNum = topic.chapterNumber;

  // 1. Science Ch 14: Continuity of Life
  if (idLower.includes('continuity') || chNum === 14) {
    if (language === 'si') {
      return [
        'සෛල බෙදීම (Cell Division): ජීවීන්ගේ පැවැත්ම, වර්ධනය සහ ප්‍රජනනය සඳහා සෛල බෙදීම අත්‍යවශ්‍ය වේ. මෙය ප්‍රධාන වශයෙන් අනුනනය (Mitosis) සහ ඌනනය (Meiosis) ලෙස ආකාර දෙකකි.',
        'අනුනනය (Mitosis): දේහ සෛලවල (Somatic cells) සිදුවේ. මාතෘ සෛලයේ වර්ණදේහ සංඛ්‍යාව නොවෙනස්ව දූහිතෘ සෛල දෙකටම ලැබේ (2n ➔ 2n). වර්ධනය, අලුත්වැඩියාව, ප්‍රතිස්ථාපනය සහ අලිංගික ප්‍රජනනයට දායක වේ.',
        'ඌනනය (Meiosis): ලිංගික ප්‍රජනක සෛල (ඩිම්බ හා ශුක්‍රාණු) සෑදීමේදී සිදුවේ. මාතෘ සෛලයකින් දූහිතෘ සෛල 4ක් සෑදේ. වර්ණදේහ සංඛ්‍යාව අඩක් බවට පත්වේ (2n ➔ n - ඒකගුණ). හරස්වීම මගින් ප්‍රවේණික ප්‍රභේදනය ඇතිකරයි.',
        'ප්‍රජනන ක්‍රම: අලිංගික ප්‍රජනනය (තනි ජනකයෙකි, ජන්මානු සංසේචනයක් නැත, ක්ලෝන බිහිවේ) සහ ලිංගික ප්‍රජනනය (ජන්මානු සංසේචනය වේ, නව ප්‍රවේණික විචල්‍යතා සහිත ජීවීන් බිහිවේ).',
        'මානව ප්‍රජනන පද්ධතිය: පුරුෂ ප්‍රජනක පද්ධතිය (වෘෂණ, ශුක්‍රාණු), ස්ත්‍රී ප්‍රජනක පද්ධතිය (ඩිම්බ කෝෂ, පැලෝපීය නාල, ගර්භාෂය), සංසේචනය සහ කළල විකසනය.'
      ];
    }
    if (language === 'ta') {
      return [
        'கலப்பிரிவு (Cell Division): உயிரினங்களின் வளர்ச்சி மற்றும் இனப்பெருக்கத்திற்கு கலப்பிரிவு அவசியமானது. இது முக்கியமாக இழையுருப்பிரிவு (Mitosis) மற்றும் ஒடுக்கற்பிரிவு (Meiosis) என இருவகைப்படும்.',
        'இழையுருப்பிரிவு (Mitosis): உடற்கலங்களில் நிகழும். ஒரு தாய்க்கலத்திலிருந்து மரபணு ரீதியாக ஒரே மாதிரியான 2 மகட்கலங்கள் உருவாகின்றன. நிறமூர்த்த எண்ணிக்கை மாறாது (2n ➔ 2n). உடலின் வளர்ச்சி, இழையப் பழுதுபார்ப்பு ஆகியவற்றிற்குப் பயன்படும்.',
        'ஒடுக்கற்பிரிவு (Meiosis): புணரிகள் (விந்து, முட்டை) உருவாக்கத்தில் நிகழும். நிறமூர்த்த எண்ணிக்கை பாதியாகக் குறையும் (2n ➔ n). குறுக்குப் பரிமாற்றம் மூலம் புதிய மரபியல் வேறுபாடுகளை உருவாக்கும்.',
        'இனப்பெருக்க முறைகள்: இலிங்கமில் இனப்பெருக்கம் (ஒரே பெற்றோர், மரபணு வேறுபாடற்ற சந்ததி) மற்றும் இலிங்கமுறை இனப்பெருக்கம் (புணரிச் சேர்க்கை, புதிய வேறுபாடுகள்).',
        'மனித இனப்பெருக்கத் தொகுதி: ஆண், பெண் இனப்பெருக்க உறுப்புகளின் கட்டமைப்பு, கருக்கட்டல் மற்றும் கரு வளர்ச்சி.'
      ];
    }
    return [
      'Cell Division: Fundamental biological process categorized into Mitosis (equational division) and Meiosis (reduction division).',
      'Mitosis: Occurs in somatic cells. Produces 2 genetically identical diploid daughter cells (2n ➔ 2n). Crucial for multicellular growth, tissue repair, cell replacement, and asexual reproduction.',
      'Meiosis: Occurs during gametogenesis in gonads. Produces 4 non-identical haploid gametes (2n ➔ n). Crossing-over creates vital genetic variation.',
      'Modes of Reproduction: Asexual reproduction (single parent, mitosis-driven, creates identical clones) vs Sexual reproduction (fusion of male & female gametes, generates genetic diversity).',
      'Human Reproductive Biology: Anatomy of male and female reproductive systems, gametogenesis, hormonal control, fertilization in ampulla, and embryonic development.'
    ];
  }

  // 2. Science Ch 1: Chemical Basis of Life
  if (idLower.includes('chemical-basis') || (chNum === 1 && idLower.includes('sci'))) {
    if (language === 'si') {
      return [
        'ජලය: විශ්ව ද්‍රාවකයකි. ඉහළ විශිෂ්ට තාප ධාරිතාව, ඉහළ විලයනයේ සහ වාෂ්පීභවනයේ ගුප්ත තාපය සහ 4°C දී උපරිම ඝනත්වය දක්වයි.',
        'කාබෝහයිඩ්‍රේට: මොනොසැකරයිඩ (ග්ලූකෝස්, පෲක්ටෝස්), ඩයිසැකරයිඩ (සුක්‍රෝස්, මෝල්ටෝස්) සහ පොලිසැකරයිඩ (පිෂ්ඨය, සෙලියුලෝස්, ග්ලයිකොජන්).',
        'ප්‍රෝටීන: ඇමයිනෝ අම්ල වලින් සෑදී ඇත. එන්සයිම, හෝමෝන සහ ප්‍රතිදේහ සංස්ලේෂණයට අවශ්‍ය වේ (Biuret පරීක්ෂාව - දම් පැහැය).',
        'ලිපිඩ සහ න්‍යෂ්ටික අම්ල: බලශක්ති ගබඩා කිරීම, සෛල පටල තැනීම (ලිපිඩ); ජානමය තොරතුරු ගබඩා කිරීම සහ සම්ප්‍රේෂණය (DNA සහ RNA).'
      ];
    }
    if (language === 'ta') {
      return [
        'நீர்: உலகளாவிய கரைப்பான். உயர்ந்த தன்வெப்பக் கொள்ளளவு, 4°C இல் அதிக அடர்த்தி கொண்ட தனித்துவ பண்பு.',
        'காபோவைதரேற்றுக்கள்: ஒற்றைச்சக்கரைட்டு (குளுக்கோசு), இரட்டைச்சக்கரைட்டு (சுக்குரோசு), பல்சக்கரைட்டு (மாப்பொருள், செலுலோசு).',
        'புரதங்கள்: அமினோ அமிலங்களால் ஆனது. நொதியங்கள், ஓமோன்கள் மற்றும் பிறபொருளெதிரிகள் தயாரிப்பில் முக்கிய பங்கு.',
        'கொழுப்புகள் மற்றும் கருவமிலங்கள்: சக்தி சேமிப்பு (கொழுப்பு); பரம்பரைத் தகவல்களைப் பேணுதல் மற்றும் பரிமாற்றம் (DNA, RNA).'
      ];
    }
    return [
      'Water: Universal solvent with high specific heat capacity, high latent heats, and anomalous expansion maximizing density at 4°C.',
      'Carbohydrates: Monosaccharides (glucose), Disaccharides (sucrose), and Polysaccharides (starch, cellulose, glycogen).',
      'Proteins: Composed of amino acids linked by peptide bonds. Crucial as biological catalysts (enzymes), antibodies, and structural tissue.',
      'Lipids & Nucleic Acids: Concentrated energy storage and cell membranes (Lipids); Genetic blueprint and protein synthesis (DNA & RNA).'
    ];
  }

  // 3. Science Ch 2: Motion in a Straight Line
  if (idLower.includes('motion') || (chNum === 2 && idLower.includes('sci'))) {
    if (language === 'si') {
      return [
        'චලිත සමීකරණ: ඒකාකාර ත්වරණයෙන් චලනය වන වස්තුවක් සඳහා: v = u + at, s = ut + ½at², v² = u² + 2as, s = ½(u + v)t.',
        'ප්‍රස්ථාර විශ්ලේෂණය: විස්ථාපන-කාල ප්‍රස්ථාරයේ අනුක්‍රමණයෙන් ප්‍රවේගයද, ප්‍රවේග-කාල ප්‍රස්ථාරයේ අනුක්‍රමණයෙන් ත්වරණයද, ප්‍රස්ථාරය යටතේ වර්ගඵලයෙන් විස්ථාපනයද ලැබේ.',
        'අදිශ සහ දෛශික: දිශාවක් නොමැති අදිශ (දුර, වේගය) සහ විශාලත්වයක් මෙන්ම දිශාවක්ද ඇති දෛශික (විස්ථාපනය, ප්‍රවේගය, ත්වරණය) නිවැරදිව හඳුනාගැනීම.'
      ];
    }
    if (language === 'ta') {
      return [
        'இயக்கச் சமன்பாடுகள்: சீரான முடுக்கத்திற்கான சமன்பாடுகள்: v = u + at, s = ut + ½at², v² = u² + 2as.',
        'வரைபுப் பகுப்பாய்வு: இடப்பெயர்ச்சி-நேர வரைபின் படித்திறன் வேகத்தையும், வேக-நேர வரைபின் படித்திறன் முடுக்கத்தையும் அதன் கீழான பரப்பு இடப்பெயர்ச்சியையும் தரும்.',
        'எண்ணளவு மற்றும் காவி அளவுகள்: திசையற்ற எண்ணளவுகள் (தூரம், கதி) மற்றும் திசையுடைய காவிகள் (இடப்பெயர்ச்சி, வேகம், முடுக்கம்).'
      ];
    }
    return [
      'Equations of Uniformly Accelerated Motion: v = u + at, s = ut + ½at², v² = u² + 2as, s = ½(u + v)t.',
      'Graph Interpretation: Gradient of displacement-time graph gives velocity; gradient of velocity-time graph gives acceleration; area under v-t graph gives displacement.',
      'Scalars vs Vectors: Distinguishing directionless scalar quantities (distance, speed) from directional vector quantities (displacement, velocity, acceleration).'
    ];
  }

  // 4. Science Ch 13: Classification of Organisms
  if (idLower.includes('classification') || (chNum === 13 && idLower.includes('sci'))) {
    if (language === 'si') {
      return [
        'වර්ගීකරණ පද්ධතිය: ඩොමේන 3 (Archaea, Bacteria, Eukarya) සහ රාජධානි 5 (Monera, Protista, Fungi, Plantae, Animalia).',
        'ද්වීපද නාමකරණය: කැරොලස් ලිනේයස් විසින් හඳුන්වා දුන් ගණ නාමය සහ විශේෂ නාමය භාවිතයෙන් විද්‍යාත්මක නම් තැබීම.',
        'ද්විබෙදුම් සුචිය (Dichotomous Key): ජීවීන්ගේ පැහැදිලි රූපාකාර ලක්ෂණ උපයෝගී කරගනිමින් පහසුවෙන් හඳුනාගැනීමේ ක්‍රමය.',
        'ශාක හා සත්ව විවිධත්වය: බීජ රහිත හා බීජ සහිත ශාක, අපෘෂ්ඨවංශීන් සහ පෘෂ්ඨවංශීන් (මත්ස්‍ය, උභයජීවී, උරග, පක්ෂී, ක්ෂීරපායී).'
      ];
    }
    if (language === 'ta') {
      return [
        'வகைப்படுத்தல் முறை: 3 ஆதிக்கங்கள் (Archaea, Bacteria, Eukarya) மற்றும் 5 இராச்சியங்கள் (Monera, Protista, Fungi, Plantae, Animalia).',
        'இருசொற் பெயரிடல்: கரோலஸ் லின்னேயஸால் அறிமுகப்படுத்தப்பட்ட சாதிப் பெயர் மற்றும் இனப் பெயர் கொண்ட பெயரிடும் முறை.',
        'இருபிரிவுக் குறிமுறை (Dichotomous Key): அங்கிகளை அவற்றின் புறத்தோற்றப் பண்புகளின் அடிப்படையில் இனங்காணும் முறை.',
        'தாவர மற்றும் விலங்கு பல்வகைமை: வித்துத் தாவரங்கள், முள்ளந்தண்டிலிகள் மற்றும் முள்ளந்தண்டுளிகள்.'
      ];
    }
    return [
      'Classification System: 3 Domains (Archaea, Bacteria, Eukarya) and 5 Kingdoms (Monera, Protista, Fungi, Plantae, Animalia).',
      'Binomial Nomenclature: Carl Linnaeus’s standardized scientific naming format comprising Genus and Specific epithet.',
      'Dichotomous Keys: Systematic identification tool using mutually exclusive contrasting biological characteristics.',
      'Flora & Fauna Diversity: Non-vascular vs Vascular plants; Invertebrates vs Vertebrates (Fish, Amphibians, Reptiles, Aves, Mammals).'
    ];
  }

  // 5. Science Ch 15: Hydrostatic Pressure
  if (idLower.includes('hydrostatic') || idLower.includes('pressure') || (chNum === 15 && idLower.includes('sci'))) {
    if (language === 'si') {
      return [
        'ද්‍රව පීඩනය: P = hρg (මෙහි h = ගැඹුර, ρ = ද්‍රවයේ ඝනත්වය, g = ගුරුත්වජ ත්වරණය). පීඩනය ගැඹුර සහ ඝනත්වය මත රඳා පවතී.',
        'පැස්කල් මූලධර්මය: සංවෘත ද්‍රවයක එක් තැනකට යොදන පීඩනය ද්‍රවය පුරා සමව සම්ප්‍රේෂණය වේ (හයිඩ්‍රොලික් මුද්‍රණාල සහ තිරිංග පද්ධති).',
        'ආකිමිඩීස් මූලධර්මය සහ පාවීම: වස්තුවක් ද්‍රවයක ගිල්වූ විට ඒ මත ක්‍රියා කරන උඩුකුරු තෙරපුම වස්තුව මගින් විස්ථාපනය කළ ද්‍රවයේ බරට සමාන වේ.'
      ];
    }
    if (language === 'ta') {
      return [
        'திரவ அமுக்கம்: P = hρg (h = ஆழம், ρ = திரவ அடர்த்தி, g = புவியீர்ப்பு முடுக்கம்).',
        'பாஸ்கலின் தத்துவம்: மூடப்பட்ட திரவத்தின் மீது பிரயோகிக்கப்படும் அமுக்கம் அனைத்து திசைகளிலும் சமமாக கடத்தப்படும்.',
        'ஆர்க்கிமிடிஸின் தத்துவம்: திரவத்தில் அமிழ்த்தப்பட்ட பொருள் மீது தொழிற்படும் மேலுதைப்பானது அது இடம்பெயர்த்த திரவத்தின் நிறைக்கு சமன்.'
      ];
    }
    return [
      'Hydrostatic Pressure Formula: P = hρg (where h is depth, ρ is liquid density, and g is gravitational acceleration).',
      'Pascal’s Principle: Pressure applied to an enclosed incompressible fluid is transmitted undiminished in all directions (Hydraulic jacks & brakes).',
      'Archimedes’ Principle & Flotation: Upthrust on a submerged body equals the weight of the fluid displaced by that body.'
    ];
  }

  // 6. Mathematics: Pythagoras
  if (idLower.includes('pythagor') || (chNum === 8 && idLower.includes('math'))) {
    if (language === 'si') {
      return [
        'පයිතගරස් ප්‍රමේයය: සෘජුකෝණී ත්‍රිකෝණයක කර්ණය මත වර්ගඵලය අනෙක් පාද දෙක මත වර්ගඵලයන්ගේ එකතුවට සමාන වේ: a² + b² = c².',
        'පයිතගරස් ත්‍රිත්ව: විභාගයේදී නිතර භාවිත වන (3, 4, 5), (5, 12, 13), (7, 24, 25), (8, 15, 17) සහ ඒවායේ ගුණාකාර.',
        'ප්‍රායෝගික යෙදීම්: ළඟාවිය නොහැකි උසවල් සහ දුරවල් සෘජුකෝණී ත්‍රිකෝණ ගොඩනගමින් ගණනය කිරීම.'
      ];
    }
    if (language === 'ta') {
      return [
        'பைதகரசு தேற்றம்: செங்கோண முக்கோணியில் செம்பக்கத்தின் வர்க்கமானது ஏனைய இரு பக்கங்களின் வர்க்கங்களின் கூட்டுத்தொகைக்குச் சமன்: a² + b² = c².',
        'பைதகரசு மும்மைகள்: (3, 4, 5), (5, 12, 13), (7, 24, 25), (8, 15, 17).',
        'நடைமுறை பயன்பாடுகள்: செங்கோண முக்கோண அமைப்புகளைப் பயன்படுத்தி தூரங்கள் மற்றும் உயரங்களைக் கணித்தல்.'
      ];
    }
    return [
      'Pythagorean Theorem: In a right-angled triangle, the square on the hypotenuse equals the sum of squares on the other two sides: a² + b² = c².',
      'Pythagorean Triples: Core integer sets frequently tested in O/L: (3, 4, 5), (5, 12, 13), (7, 24, 25), (8, 15, 17).',
      'Practical Applications: Calculating inaccessible heights, diagonals, and distances in 2D and 3D geometric configurations.'
    ];
  }

  // 7. History: Inscriptions & Sources
  if (idLower.includes('sources') || idLower.includes('sellipi') || (chNum === 1 && idLower.includes('hist'))) {
    if (language === 'si') {
      return [
        'මූලාශ්‍ර වර්ගීකරණය: ප්‍රාථමික මූලාශ්‍ර (සෙල්ලිපි, කාසි, නටබුන්) සහ ද්විතීයික මූලාශ්‍ර (වංශකතා, ඓතිහාසික කෘති).',
        'සෙල්ලිපි වර්ග 5: ලෙන් ලිපි (ගුහාවල කටාරම් යට), ගිරි ලිපි (ස්වාභාවික පර්වත මත), ටැම් ලිපි (කණු මත), පුවරු ලිපි (සිනිඳු ගල් පුවරු), සහ ආසන ලිපි.',
        'මුල් බ්‍රාහ්මී ලේඛන සහ පරුමකවරු: ක්‍රි.පූ. 3 වන සියවසේ සිට සංඝයා වහන්සේලාට ලෙන් පූජා කිරීම සහ වැව් හිමි ප්‍රභූන් (පරුමක) පිළිබඳ සාක්ෂි.'
      ];
    }
    if (language === 'ta') {
      return [
        'மூலாதாரங்களின் வகைப்பாடு: முதன்மை மூலாதாரங்கள் (கல்வெட்டுகள், நாணயங்கள்) மற்றும் துணை மூலாதாரங்கள் (நூல்கள்).',
        'கல்வெட்டு வகைகள்: குகைக் கல்வெட்டுகள், பாறைக் கல்வெட்டுகள், தூண் கல்வெட்டுகள், பலகைக் கல்வெட்டுகள் மற்றும் ஆசனக் கல்வெட்டுகள்.',
        'ஆரம்ப பிராமி கல்வெட்டுகள்: இலங்கையின் ஆரம்ப சமூக, பொருளாதார மற்றும் அரசியல் கட்டமைப்பு பற்றிய வரலாற்றுச் சான்றுகள்.'
      ];
    }
    return [
      'Source Classification: Primary sources (epigraphy, coins, archaeological ruins) vs Secondary sources (chronicles, historical treaties).',
      'The 5 Types of Inscriptions: Cave (Len), Rock (Giri), Pillar (Tam), Slab (Puwaru), and Seat (Asana) inscriptions.',
      'Early Brahmi Script & Parumakas: Inscriptional evidence from 3rd century BCE documenting monastic cave donations by regional clan leaders.'
    ];
  }

  // 8. ICT: Number Systems
  if (idLower.includes('number-system') || (chNum === 1 && idLower.includes('ict'))) {
    if (language === 'si') {
      return [
        'සංඛ්‍යා පද්ධති: ද්විමය (Binary - පාදය 2), අෂ්ටමය (Octal - පාදය 8), දශමය (Decimal - පාදය 10) සහ ෂඩ්දශමය (Hexadecimal - පාදය 16).',
        'ද්විමය පරිවර්තනය: දශමය සංඛ්‍යාවක් 2 න් අනුක්‍රමිකව බෙදමින් ඉතිරිය පහළ සිට ඉහළට සටහන් කර ද්විමය බවට පත්කිරීම.',
        'දත්ත නිරූපණය: බිටු (Bit - 0 හෝ 1), බයිට් (Byte - බිටු 8), කිලෝබයිට් (KB = 1024 Bytes), මෙගාබයිට් (MB), සහ ASCII අක්ෂර කේතනය.'
      ];
    }
    if (language === 'ta') {
      return [
        'எண் முறைகள்: இருமம் (அடி 2), எண்மம் (அடி 8), பதின்மம் (அடி 10) மற்றும் பதினறுமம் (அடி 16).',
        'இரும மாற்றம்: பதின்ம எண்ணை 2 ஆல் தொடர்ச்சியாக வகுத்து மீதிகளைக் கொண்டு இரும எண்ணைப் பெறுதல்.',
        'தரவுப் பிரதிநிதித்துவம்: பிட் (0 அல்லது 1), பைட் (8 பிட்டுகள்), கிலோபைட் (KB), மெகாபைட் (MB) மற்றும் ASCII குறியீட்டு முறை.'
      ];
    }
    return [
      'Number Systems: Binary (base 2), Octal (base 8), Decimal (base 10), and Hexadecimal (base 16).',
      'Base Conversions: Converting decimal numbers to binary via successive division by 2, recording remainders from bottom to top.',
      'Data Representation Units: Bit (0 or 1), Byte (8 bits), Kilobyte (1024 Bytes), Megabyte (1024 KB), and ASCII/Unicode character encoding.'
    ];
  }

  // 9. Step-driven synthesis: If steps are available, synthesize structured key points from each step
  if (steps && steps.length > 0) {
    return steps.map((s, idx) => {
      const stepTitle = s.title?.[language] || s.title?.en || `Part ${idx + 1}`;
      const firstSentence = (s.concept?.[language] || s.concept?.en || '')
        .split('\n')
        .find((line: string) => line.trim().length > 10 && !line.startsWith('#')) || '';
      const cleanSnippet = firstSentence.replace(/[*_#`]/g, '').trim();
      return `${stepTitle}: ${cleanSnippet || (language === 'si' ? 'විෂය නිර්දේශයේ ප්‍රධාන සංකල්පය සහ විභාග මූලධර්මය.' : language === 'ta' ? 'பாடத்திட்டத்தின் அடிப்படைக் கோட்பாடு மற்றும் பரீட்சைக் குறிப்பு.' : 'Core curriculum principle and exam standard.')}`;
    });
  }

  // 10. Fallback / Universal Synthesis for any other chapter
  const desc = topic.description?.[language] || topic.description?.en || '';
  const parts = desc.split(/[.,;–()]+/).map(p => p.trim()).filter(p => p.length > 5);
  if (parts.length >= 3) {
    return parts.slice(0, 5).map((p, idx) => {
      const prefix = language === 'si' ? `ප්‍රධාන කරුණ ${idx + 1}: ` : language === 'ta' ? `முக்கிய கருத்து ${idx + 1}: ` : `Core Principle ${idx + 1}: `;
      return `${prefix}${p}`;
    });
  }

  return [
    language === 'si' ? 'නිල විෂය නිර්දේශයේ මූලික සංකල්ප සහ නිර්වචන නිවැරදිව අවබෝධ කර ගැනීම.' : language === 'ta' ? 'அங்கீகரிக்கப்பட்ட பாடத்திட்டத்தின் அடிப்படைக் கோட்பாடுகள் மற்றும் வரைவிலக்கணங்கள்.' : 'Comprehending syllabus foundational principles and precise textbook definitions.',
    language === 'si' ? 'පෙළපොතේ රූප සටහන්, සමීකරණ සහ විද්‍යාත්මක හෝ ඓතිහාසික ක්‍රමවේදය ප්‍රගුණ කිරීම.' : language === 'ta' ? 'பாடநூல் வரைபடங்கள், சமன்பாடுகள் மற்றும் அறிவியல்/வரலாற்று முறைகளைப் பயிற்சி செய்தல்.' : 'Mastering official textbook diagrams, formulas, and scientific/analytical methodologies.',
    language === 'si' ? 'ශ්‍රී ලංකා ජාතික විභාග ප්‍රශ්න පත්‍ර රටාවට අනුව ව්‍යුහගත පිළිතුරු සැකසීම.' : language === 'ta' ? 'இலங்கை தேசிய பரீட்சை வினாத்தாள் முறைக்கு ஏற்ப கட்டமைக்கப்பட்ட விடைகளைத் தயாரித்தல்.' : 'Structuring exam responses according to Sri Lankan national marking schemes.'
  ];
}

export const TeachMePage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language, setTutorState, tutorState, setCurriculumSubject, isAuthenticated, isGuestPreview, learningContext } = useStudent();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isLessonFinished, setIsLessonFinished] = useState(false);

  const [resolvedTopic, setResolvedTopic] = useState<Topic | null>(() => {
    return findTopicResilient(MOCK_TOPICS, topicId, learningContext.subjectId, learningContext.grade) || null;
  });

  useEffect(() => {
    let isMounted = true;
    if (!topicId) return;

    const localMatch = findTopicResilient(MOCK_TOPICS, topicId, learningContext.subjectId, learningContext.grade);
    if (localMatch) {
      setResolvedTopic(localMatch);
    }

    fetchCurriculumTopics(undefined, learningContext.grade).then((topics) => {
      if (isMounted && topics && topics.length > 0) {
        const match = findTopicResilient(topics, topicId, learningContext.subjectId, learningContext.grade);
        if (match) {
          setResolvedTopic(match);
        }
      }
    }).catch((err) => console.warn('[TeachMePage] Curriculum topic lookup error:', err));

    return () => { isMounted = false; };
  }, [topicId, learningContext.grade, learningContext.subjectId]);

  const effectiveTopicId = resolvedTopic?.id || topicId;
  const resolvedSubjectId = resolvedTopic?.subjectId || (learningContext.topicId === topicId ? learningContext.subjectId : undefined) || 'science';
  const steps = getLessonStepsForTopic(effectiveTopicId, resolvedSubjectId, learningContext.grade);
  const currentStep = steps[currentStepIndex] || steps[0];
  const question = currentStep?.checkQuestion;

  const currentSubject = MOCK_SUBJECTS.find((s) => s.id === resolvedSubjectId) || MOCK_SUBJECTS.find((s) => s.id === resolvedTopic?.subjectId) || MOCK_SUBJECTS[0];
  const keyPoints = getChapterKeyPoints(resolvedTopic, language, steps);
  const subjectName = currentSubject?.name?.[language] || currentSubject?.name?.en || 'Curriculum';
  const gradeDisplay = learningContext.grade ? learningContext.grade.replace('grade-', 'Grade ') : 'Grade 10';

  useEffect(() => {
    if (resolvedSubjectId && effectiveTopicId) {
      setCurriculumSubject(resolvedSubjectId, effectiveTopicId);
    }
    setCurrentStepIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setIsLessonFinished(false);
  }, [effectiveTopicId, resolvedSubjectId]);

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || !question) return;
    setIsAnswerSubmitted(true);

    if (selectedOptionId === question.correctOptionId) {
      setTutorState('celebrating');
    } else {
      setTutorState('encouraging');
    }
  };

  const handleNextStep = () => {
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setTutorState('idle');

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsLessonFinished(true);
      setTutorState('celebrating');
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
      setTutorState('idle');
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  if (!isAuthenticated) {
    return <AuthGate featureName="Interactive Guided Curriculum Lessons" />;
  }

  return (
    <div className="max-w-4xl lg:max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      <GuestBanner />

      {/* Header bar with Back button and Progress indicator */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 transition-all shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">
            {t('teachMe.step', { current: currentStepIndex + 1, total: steps.length })}
          </span>
          <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-teal-400 rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 0. Dedicated Chapter Overview & Key Points Card */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30 uppercase tracking-wide">
              {subjectName} • Chapter {resolvedTopic?.chapterNumber} • {gradeDisplay}
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{language === 'si' ? 'විෂය නිර්දේශ මූලික පාඩම' : language === 'ta' ? 'பாடத்திட்ட அத்தியாயம்' : 'National Syllabus Chapter'}</span>
            </span>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            {language === 'si' ? 'අධ්‍යාපන ප්‍රකාශන දෙපාර්තමේන්තුව' : language === 'ta' ? 'கல்வி வெளியீட்டுத் திணைக்களம்' : 'Educational Publications Dept'}
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {resolvedTopic?.title?.[language] || resolvedTopic?.title?.en}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {resolvedTopic?.description?.[language] || resolvedTopic?.description?.en}
          </p>
        </div>

        {/* High-Yield Key Points of the Lesson */}
        {keyPoints.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-300 font-mono">
                {language === 'si' ? 'පාඩමේ ප්‍රධාන විෂය කරුණු (Key Points)' : language === 'ta' ? 'பாடத்தின் முக்கிய கோட்பாடுகள் (Key Points)' : 'Lesson Key Points'}
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800/90 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">{point}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Simulation Workbench if Available */}
        {hasSimulation(effectiveTopicId, resolvedSubjectId) && (
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 font-mono">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{language === 'si' ? 'තත්‍ය කාලීන අන්තර්ක්‍රියාකාරී ආකෘතිය' : language === 'ta' ? 'நிகழ்நேர ஊடாடும் மாதிரி' : 'Real-time Interactive Simulation'}</span>
              </span>
              <span className="text-[10px] text-cyan-300 font-mono">Interactive Lab</span>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              {effectiveTopicId === 'number-systems' ? (
                <ElectricSwitchVisualizer language={language} showByteBuilder={true} />
              ) : effectiveTopicId === 'configuring-formatting-computer' ? (
                <ResolutionVisualizer language={language} />
              ) : effectiveTopicId === 'programming' ? (
                <ScratchBlockVisualizer language={language} />
              ) : effectiveTopicId === 'physical-computing' ? (
                <MicrocontrollerVisualizer language={language} />
              ) : effectiveTopicId === 'internet' ? (
                <UrlAnatomyVisualizer language={language} />
              ) : effectiveTopicId === 'word-processing' ? (
                <WordProcessingVisualizer language={language} />
              ) : (
                <SubjectConceptVisualizer topicId={effectiveTopicId} subjectId={resolvedSubjectId} language={language} />
              )}
            </div>
          </div>
        )}
      </div>

      {!isLessonFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-6">
          {/* Top Step Banner with Mini Tutor companion */}
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-atlas-blue text-xs font-bold border border-sky-100 mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>{t('teachMe.badge')}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {currentStep.title[language]}
              </h1>
            </div>

            <TutorAvatar state={tutorState} size="md" />
          </div>

          {/* 1. Core Concept Explanation */}
          <div className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            <RichContentRenderer content={currentStep.concept[language]} />
          </div>

          {/* 2. Visual / Formula Card */}
          {currentStep.visualCard && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50/90 via-indigo-50/50 to-slate-50 border border-sky-200/90 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-atlas-blue uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-atlas-cyan" />
                  <span>{currentStep.visualCard.title}</span>
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200/60">
                  {currentStep.visualCard.diagramType === 'formula' ? 'Key Formula' : 'Key Concept'}
                </span>
              </div>

              {currentStep.visualCard.diagramType === 'formula' || /[\^=+\-\\×÷√]/.test(currentStep.visualCard.content) ? (
                <MathView formula={currentStep.visualCard.content} displayMode={true} />
              ) : (
                <div className="py-2.5 px-4 bg-white/80 rounded-xl border border-sky-100 text-slate-800 text-center font-medium text-xs sm:text-sm shadow-2xs">
                  {currentStep.visualCard.content}
                </div>
              )}

              {currentStep.visualCard.caption && (
                <p className="text-[11px] text-slate-500 mt-2 text-center font-medium">
                  {currentStep.visualCard.caption}
                </p>
              )}
            </div>
          )}

          {/* 3. Real-World Sri Lankan Context */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>{t('teachMe.realWorldTitle')}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentStep.realWorldExample[language]}
            </p>
          </div>

          {/* 4. G.C.E. O/L Competency Check / Exam Mastery */}
          {question && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600">
                    <Award className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {language === 'si'
                      ? 'අ.පො.ස. සා/පෙළ මට්ටමේ ඇගයීම'
                      : language === 'ta'
                      ? 'க.பொ.த சா/தர பரீட்சை மதிப்பீடு'
                      : 'G.C.E. O/L Competency Check'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] bg-indigo-50 border border-indigo-200/80 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
                    {question.grade === 'grade-10'
                      ? (language === 'si' ? '10 ශ්‍රේණිය' : language === 'ta' ? 'தரம் 10' : 'Grade 10')
                      : 'National Syllabus'}
                  </span>
                  <span className="text-[10px] bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
                    {language === 'si' ? 'විභාග ප්‍රමිතිය' : language === 'ta' ? 'பரீட்சை மாதிரி' : 'Exam Standard'}
                  </span>
                </div>
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {question.questionText[language]}
              </h4>

              <div className="space-y-2">
                {question.options.map((opt, idx) => {
                  const isSelected = selectedOptionId === opt.id;
                  const isCorrect = opt.id === question.correctOptionId;
                  const optionLabel = String.fromCharCode(65 + idx); // A, B, C, D

                  let optStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';
                  let labelStyle = 'bg-slate-100 text-slate-600 border border-slate-200';
                  if (isSelected && !isAnswerSubmitted) {
                    optStyle = 'border-indigo-500 bg-indigo-50/60 ring-2 ring-indigo-500/20 text-slate-900 font-medium';
                    labelStyle = 'bg-indigo-600 text-white border-transparent';
                  } else if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optStyle = 'border-emerald-400 bg-emerald-50 text-emerald-950 font-medium';
                      labelStyle = 'bg-emerald-600 text-white border-transparent';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'border-rose-300 bg-rose-50 text-rose-950';
                      labelStyle = 'bg-rose-500 text-white border-transparent';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-2.5 transition-all ${optStyle}`}
                    >
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 transition-colors ${labelStyle}`}>
                        {optionLabel}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt.text[language]}</span>
                      {isAnswerSubmitted && isCorrect && (
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-1 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit / Feedback */}
              {!isAnswerSubmitted ? (
                <button
                  type="button"
                  disabled={!selectedOptionId}
                  onClick={handleSubmitAnswer}
                  className={`mt-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedOptionId
                      ? 'bg-slate-900 hover:bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {t('practice.checkAnswer')}
                </button>
              ) : (
                <div className="mt-3 p-3.5 rounded-xl bg-white border border-slate-200/90 text-xs space-y-2.5 animate-in fade-in shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="font-bold">
                      {selectedOptionId === question.correctOptionId ? (
                        <span className="text-emerald-700 flex items-center gap-1.5">
                          <span>🌟</span>
                          <span>
                            {language === 'si' ? 'විශිෂ්ටයි! නිවැරදි විභාග පිළිතුරකි.' : language === 'ta' ? 'அருமை! சரியான பரீட்சை விடை.' : 'Outstanding! Correct Exam Answer.'}
                          </span>
                        </span>
                      ) : (
                        <span className="text-amber-700 flex items-center gap-1.5">
                          <span>🌱</span>
                          <span>
                            {language === 'si' ? 'විභාග විශ්ලේෂණය සහ නිවැරදි කරුණ' : language === 'ta' ? 'பரீட்சை மாதிரி பகுப்பாய்வு' : "Examiner's Guidance & Key Principle"}
                          </span>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {language === 'si' ? 'ලකුණු දීමේ පටිපාටිය' : language === 'ta' ? 'மதிப்பீட்டுத் திட்டம்' : 'Marking Scheme Insight'}
                    </span>
                  </div>

                  <p className="text-slate-700 leading-relaxed bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
                    {question.educationalFeedback[language]}
                  </p>

                  {question.syllabusReference && (
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 pt-1 border-t border-slate-100">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                      <span>{question.syllabusReference}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const subId = resolvedTopic?.subjectId || resolvedSubjectId;
                      const topId = resolvedTopic?.id || topicId || '';
                      if (!subId) {
                        console.error('TeachMePage: Missing subject context for topic navigation', { topicId });
                        navigate('/subjects');
                        return;
                      }
                      setCurriculumSubject(subId, topId);
                      const qText = question.questionText[language];
                      const prompt = language === 'si'
                        ? `මෙම විභාග ප්‍රශ්නය සහ එහි මූලධර්මය මට තවදුරටත් විස්තර කරන්න: "${qText}"`
                        : language === 'ta'
                        ? `இந்த பரீட்சை வினாவின் கோட்பாட்டை எனக்கு மேலும் விளக்க முடியுமா: "${qText}"`
                        : `Can you explain the syllabus concept behind this exam question in detail: "${qText}"?`;
                      navigate(`/tutor?subject=${encodeURIComponent(subId)}&topic=${encodeURIComponent(topId)}&q=${encodeURIComponent(prompt)}`);
                    }}
                    className="w-full py-1.5 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 text-indigo-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>
                      {language === 'si'
                        ? 'මෙම ප්‍රශ්නය ගැන AI ගුරුතුමාගෙන් අසන්න'
                        : language === 'ta'
                        ? 'இந்த வினா பற்றி AI ஆசிரியரிடம் கேட்க'
                        : 'Ask AI Tutor about this Exam Question'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                const subId = resolvedTopic?.subjectId || resolvedSubjectId;
                const topId = resolvedTopic?.id || topicId || '';
                if (!subId) {
                  console.error('TeachMePage: Missing subject context for step navigation', { topicId });
                  navigate('/subjects');
                  return;
                }
                setCurriculumSubject(subId, topId);
                const topicTitle = resolvedTopic?.title?.[language] || resolvedTopic?.title?.en || '';
                const stepTitle = currentStep?.title?.[language] || currentStep?.title?.en || '';
                const chapterPrefix = resolvedTopic?.chapterNumber ? `Chapter ${resolvedTopic.chapterNumber}` : '';
                const queryText = language === 'si'
                  ? `${topicTitle} (${stepTitle}) ${chapterPrefix ? `${chapterPrefix} ගැන විස්තර කරන්න` : 'ගැන විස්තර කරන්න'}`
                  : language === 'ta'
                  ? `${topicTitle} (${stepTitle}) ${chapterPrefix ? `${chapterPrefix} பற்றி விளக்குக` : 'பற்றி விளக்குக'}`
                  : `Can you explain ${topicTitle} (${stepTitle}) ${chapterPrefix ? `in ${chapterPrefix}` : ''}?`;
                navigate(`/tutor?subject=${encodeURIComponent(subId)}&topic=${encodeURIComponent(topId)}&q=${encodeURIComponent(queryText)}`);
              }}
              className="text-xs font-bold text-atlas-cyan hover:text-atlas-blue flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{t('teachMe.askTutorAboutStep')}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {currentStepIndex > 0 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs"
                >
                  {t('teachMe.previous')}
                </button>
              )}

              <button
                type="button"
                onClick={handleNextStep}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-atlas-deep to-atlas-blue hover:from-slate-900 hover:to-atlas-deep text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all"
              >
                <span>
                  {currentStepIndex === steps.length - 1
                    ? t('teachMe.finishLesson')
                    : t('teachMe.next')}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Lesson Completion Card */
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-soft text-center space-y-5">
          <TutorAvatar state="celebrating" size="lg" className="mx-auto" />

          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {t('teachMe.congratsTitle')}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
              {t('teachMe.congratsSubtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={() => navigate('/practice')}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-atlas-deep to-atlas-blue text-white rounded-2xl font-bold text-xs shadow-md hover:scale-[1.02] transition-transform"
            >
              {t('teachMe.practiceNow')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-bold text-xs"
            >
              {t('teachMe.backToHome')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
