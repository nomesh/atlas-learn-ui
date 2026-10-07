// MOCK-only prototype Tutor content: keyword -> prototype topic detection, topic starter pills, scripted
// curriculum greetings and demo default topics. Used only by the GitHub Pages demo (MOCK). Real production builds
// replace this module with mockTutorContent.production.ts (vite.config.ts), so none of this prototype curriculum
// is emitted into the production bundle, and LIVE code paths never call it (see TutorPage).
import type { ChatMessage, Language, TutorAction } from '../../types';

export const detectCurriculumContextFromMessage = (
  message: string,
  currentSubject?: string
): { subjectId: string; topicId: string } | null => {
  const lower = message.toLowerCase();

  // 1. ICT Chapter 4: Programming / Scratch
  if (
    lower.includes('scratch') ||
    lower.includes('programming') ||
    lower.includes('ක්‍රමලේඛන') ||
    lower.includes('නිරலாக்கம்') ||
    lower.includes('variable') ||
    lower.includes('විචල්‍ය') ||
    lower.includes('sprite') ||
    lower.includes('ස්ප්‍රයිට්') ||
    lower.includes('repeat loop') ||
    lower.includes('if-then') ||
    ((lower.includes('chapter 4') || lower.includes('4 වන පාඩම') || lower.includes('பாடம் 4') || lower.includes('ch 4')) &&
      (currentSubject === 'ict' || lower.includes('ict') || lower.includes('computer') || lower.includes('code') || lower.includes('loops') || lower.includes('arithmetic')))
  ) {
    return { subjectId: 'ict', topicId: 'programming' };
  }

  // 2. ICT Chapter 1: Number Systems
  if (
    lower.includes('binary') ||
    lower.includes('number system') ||
    lower.includes('decimal and binary') ||
    lower.includes('place value') ||
    lower.includes('powers of 2') ||
    lower.includes('සංඛ්‍යා පද්ධති') ||
    lower.includes('ද්විමය') ||
    lower.includes('දශමය') ||
    lower.includes('எண் முறை') ||
    lower.includes('இருமம்') ||
    ((lower.includes('chapter 1') || lower.includes('1 වන පාඩම') || lower.includes('பாடம் 1') || lower.includes('ch 1')) &&
      (currentSubject === 'ict' || lower.includes('ict')))
  ) {
    return { subjectId: 'ict', topicId: 'number-systems' };
  }

  // 3. ICT Chapter 2: Configuring & Formatting Computer
  if (
    lower.includes('desktop customization') ||
    lower.includes('screen resolution') ||
    lower.includes('formatting storage') ||
    lower.includes('formatting a computer') ||
    lower.includes('වින්‍යාසගත') ||
    lower.includes('පරිගණක වින්‍යාසය') ||
    lower.includes('விசைப்பலகை') ||
    ((lower.includes('chapter 2') || lower.includes('2 වන පාඩම') || lower.includes('பாடம் 2') || lower.includes('ch 2')) &&
      (currentSubject === 'ict' || lower.includes('ict')))
  ) {
    return { subjectId: 'ict', topicId: 'configuring-formatting-computer' };
  }

  // 4. ICT Chapter 3: Word Processing
  if (
    lower.includes('word processing') ||
    lower.includes('justify margins') ||
    lower.includes('paragraph alignment') ||
    lower.includes('document creation') ||
    lower.includes('වදන් සැකසුම') ||
    lower.includes('சொல் செயலாக்கம்') ||
    ((lower.includes('chapter 3') || lower.includes('3 වන පාඩම') || lower.includes('பாடம் 3') || lower.includes('ch 3')) &&
      (currentSubject === 'ict' || lower.includes('ict')))
  ) {
    return { subjectId: 'ict', topicId: 'word-processing' };
  }

  // 5. ICT Chapter 5: Physical Computing
  if (
    lower.includes('physical computing') ||
    lower.includes('microbit') ||
    lower.includes('micro:bit') ||
    lower.includes('arduino') ||
    lower.includes('sensor') ||
    lower.includes('actuator') ||
    lower.includes('භෞතික පරිගණන') ||
    lower.includes('සංවේදක') ||
    lower.includes('பௌதீகக் கணினியியல்') ||
    ((lower.includes('chapter 5') || lower.includes('5 වන පාඩම') || lower.includes('பாடம் 5') || lower.includes('ch 5')) &&
      (currentSubject === 'ict' || lower.includes('ict')))
  ) {
    return { subjectId: 'ict', topicId: 'physical-computing' };
  }

  // 6. ICT Chapter 6: Internet
  if (
    lower.includes('world wide web') ||
    lower.includes('web browser') ||
    lower.includes('url anatomy') ||
    lower.includes('cyber safety') ||
    lower.includes('අන්තර්ජාලය') ||
    lower.includes('இணையம்') ||
    ((lower.includes('chapter 6') || lower.includes('6 වන පාඩම') || lower.includes('பாடம் 6') || lower.includes('ch 6')) &&
      (currentSubject === 'ict' || lower.includes('ict')))
  ) {
    return { subjectId: 'ict', topicId: 'internet' };
  }

  // General ICT
  if (
    lower.includes('ict') ||
    lower.includes('information technology') ||
    lower.includes('තොරතුරු තාක්ෂණය') ||
    lower.includes('தகவல் தொழில்நுட்பம்')
  ) {
    return { subjectId: 'ict', topicId: 'number-systems' };
  }

  // History Chapter 1: Inscriptions & Sources
  if (
    lower.includes('sellipi') ||
    lower.includes('inscription') ||
    lower.includes('සෙල්ලිපි') ||
    lower.includes('கல்வெட்டு') ||
    lower.includes('brahmi') ||
    lower.includes('panakaduwa') ||
    lower.includes('galpotha') ||
    ((lower.includes('chapter 1') || lower.includes('1 වන පාඩම') || lower.includes('பாடம் 1')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය') || lower.includes('வரலாறு')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-sources' };
  }

  // History Chapter 2: Settlements
  if (
    lower.includes('settlement') ||
    lower.includes('ජනාවාස') ||
    lower.includes('ibbankatuwa') ||
    lower.includes('ඉබ්බන්කටුව') ||
    lower.includes('fa-hien') ||
    lower.includes('පාහියන්ගල') ||
    lower.includes('batadombalena') ||
    lower.includes('බටදොඹලෙන') ||
    ((lower.includes('chapter 2') || lower.includes('2 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-settlements' };
  }

  // History Chapter 3: Political Power
  if (
    lower.includes('parumaka') ||
    lower.includes('පරුමක') ||
    lower.includes('gamika') ||
    lower.includes('ගාමික') ||
    lower.includes('political power') ||
    lower.includes('දේශපාලන බලය') ||
    ((lower.includes('chapter 3') || lower.includes('3 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-political-power' };
  }

  // History Chapter 4: Ancient Society
  if (
    lower.includes('ancient society') ||
    lower.includes('පුරාණ සමාජය') ||
    lower.includes('කුල ක්‍රමය') ||
    lower.includes('gam sabha') ||
    lower.includes('ගම් සභා') ||
    ((lower.includes('chapter 4') || lower.includes('4 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-ancient-society' };
  }

  // History Chapter 5: Hydraulic / Science & Tech (Ancient Sri Lankan irrigation)
  if (
    lower.includes('bisokotuwa') ||
    lower.includes('බිසෝකොටුව') ||
    lower.includes('yoda ela') ||
    lower.includes('යෝධ ඇළ') ||
    lower.includes('ralapanawa') ||
    lower.includes('රළපනාව') ||
    lower.includes('sorabora') ||
    lower.includes('සොරබොර') ||
    lower.includes('cascade system') ||
    lower.includes('ellangawa') ||
    lower.includes('ඇල්ලංගාව') ||
    lower.includes('වාරි ශිෂ්ටාචාරය') ||
    lower.includes('ancient hydraulic') ||
    lower.includes('ancient irrigation') ||
    ((lower.includes('chapter 5') || lower.includes('5 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-science-tech' };
  }

  // History Chapter 6: Historical Knowledge
  if (
    lower.includes('historical knowledge') ||
    lower.includes('ඓතිහාසික දැනුම') ||
    lower.includes('ප්‍රායෝගික භාවිතය') ||
    ((lower.includes('chapter 6') || lower.includes('6 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-historical-knowledge' };
  }

  // History Chapter 7: Decline & SW Kingdoms
  if (
    lower.includes('dambadeniya') ||
    lower.includes('දඹදෙණිය') ||
    lower.includes('yapahuwa') ||
    lower.includes('යාපහුව') ||
    lower.includes('kurunegala') ||
    lower.includes('gampola') ||
    lower.includes('kotte') ||
    lower.includes('කෝට්ටේ') ||
    ((lower.includes('chapter 7') || lower.includes('7 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-decline-new-kingdoms' };
  }

  // History Chapter 8: Kandyan Kingdom
  if (
    lower.includes('kandyan') ||
    lower.includes('උඩරට') ||
    lower.includes('vimaladharmasuriya') ||
    lower.includes('විමලධර්මසූරිය') ||
    lower.includes('danture') ||
    lower.includes('දන්තුරේ') ||
    lower.includes('gannoruwa') ||
    lower.includes('ගන්නෝරුව') ||
    ((lower.includes('chapter 8') || lower.includes('8 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-kandyan-kingdom' };
  }

  // History Chapter 9: Renaissance
  if (
    lower.includes('renaissance') ||
    lower.includes('පුනරුදය') ||
    lower.includes('da vinci') ||
    lower.includes('gutenberg') ||
    ((lower.includes('chapter 9') || lower.includes('9 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-renaissance' };
  }

  // History Chapter 10: Western World
  if (
    lower.includes('western world') ||
    lower.includes('බටහිර ලෝකය') ||
    lower.includes('portuguese') ||
    lower.includes('පෘතුගීසි') ||
    lower.includes('dutch') ||
    lower.includes('ලන්දේසි') ||
    ((lower.includes('chapter 10') || lower.includes('10 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-western-world' };
  }

  // History general fallback
  if (
    lower.includes('history') ||
    lower.includes('ඉතිහාසය') ||
    lower.includes('வரலாறு') ||
    lower.includes('anuradhapura') ||
    lower.includes('polonnaruwa') ||
    lower.includes('king') ||
    lower.includes('kingdom')
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-sources' };
  }

  // Maths Chapter 10: Pythagoras
  if (
    lower.includes('pythagor') ||
    lower.includes('hypotenuse') ||
    lower.includes('a² + b²') ||
    lower.includes('right-angled triangle') ||
    lower.includes('පයිතගරස්') ||
    lower.includes('සෘජුකෝණී ත්‍රිකෝණ') ||
    lower.includes('பைதகரசு') ||
    ((lower.includes('chapter 10') || lower.includes('10 වන පාඩම') || lower.includes('ch 10') || lower.includes('ch-10')) &&
      (currentSubject === 'maths' || lower.includes('maths') || lower.includes('ගණිතය') || lower.includes('கணிதம்')))
  ) {
    return { subjectId: 'maths', topicId: 'maths-gr10-ch10-pythagoras' };
  }

  // Maths Chapter 1: Perimeter
  if (
    lower.includes('perimeter') ||
    lower.includes('පරිමිතිය') ||
    lower.includes('சுற்றளவு') ||
    lower.includes('sector of a circle') ||
    lower.includes('arc length') ||
    ((lower.includes('chapter 1') || lower.includes('1 වන පාඩම') || lower.includes('ch 1') || lower.includes('ch-1')) &&
      (currentSubject === 'maths' || lower.includes('maths') || lower.includes('ගණිතය')))
  ) {
    return { subjectId: 'maths', topicId: 'maths-gr10-ch1-perimeter' };
  }

  // Science Chapter 10: Chemical Bonds
  if (
    lower.includes('chemical bond') ||
    lower.includes('රසායනික බන්ධන') ||
    lower.includes('இரசாயனப் பிணைப்புகள்') ||
    lower.includes('ionic bond') ||
    lower.includes('covalent bond') ||
    lower.includes('metallic bond') ||
    lower.includes('අයනික බන්ධන') ||
    lower.includes('සහසංයුජ බන්ධන') ||
    lower.includes('ලෝහක බන්ධන') ||
    lower.includes('octet rule') ||
    lower.includes('අෂ්ටක නියමය') ||
    lower.includes('electronegativity') ||
    lower.includes('විද්‍යුත් සෘණතාව') ||
    ((lower.includes('chapter 10') || lower.includes('10 වන පාඩම') || lower.includes('පාඩම 10') || lower.includes('ch 10') || lower.includes('ch-10')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව') || lower.includes('bond') || lower.includes('බන්ධන') || lower.includes('பிணைப்பு')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch10-chemical-bonds' };
  }

  // Science Chapter 14: Continuity of Life
  if (
    lower.includes('continuity') ||
    lower.includes('mitosis') ||
    lower.includes('meiosis') ||
    lower.includes('cell division') ||
    lower.includes('අඛණ්ඩතාව') ||
    lower.includes('සෛල බෙදීම') ||
    lower.includes('අනුනන') ||
    lower.includes('ඌනන') ||
    lower.includes('கலப்பிரிவு') ||
    lower.includes('இழையுருப்பிரிவு') ||
    lower.includes('ஒடுக்கற்பிரிவு') ||
    ((lower.includes('chapter 14') || lower.includes('14 වන පාඩම') || lower.includes('පාඩම 14') || lower.includes('ch 14')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව') || lower.includes('life')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch14-continuity-of-life' };
  }

  // Science Chapter 13: Classification of Organisms
  if (
    lower.includes('classification') ||
    lower.includes('වර්ගීකරණය') ||
    lower.includes('வகைப்பாடு') ||
    lower.includes('five kingdom') ||
    lower.includes('පංච රාජධානි') ||
    lower.includes('monera') ||
    lower.includes('protista') ||
    lower.includes('dichotomous') ||
    lower.includes('ද්විපද යතුරු') ||
    ((lower.includes('chapter 13') || lower.includes('13 වන පාඩම') || lower.includes('පාඩම 13') || lower.includes('ch 13')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව') || lower.includes('organism')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch13-classification-of-organisms' };
  }

  // Science Chapter 15: Hydrostatic Pressure & Hydraulic Machines
  if (
    lower.includes('hydrostatic') ||
    lower.includes('fluid pressure') ||
    lower.includes('liquid pressure') ||
    lower.includes('පීඩනය') ||
    lower.includes('ද්‍රවස්ථිතික') ||
    lower.includes('ද්‍රව පීඩනය') ||
    lower.includes('அமுக்கம்') ||
    lower.includes('pascal') ||
    lower.includes('පැස්කල්') ||
    lower.includes('archimedes') ||
    lower.includes('hρg') ||
    lower.includes('h*rho*g') ||
    lower.includes('hpg') ||
    lower.includes('u-tube') ||
    lower.includes('manometer') ||
    lower.includes('hydraulic machine') ||
    lower.includes('hydraulic press') ||
    lower.includes('hydraulic jack') ||
    lower.includes('hydraulic brake') ||
    lower.includes('hydraulic lift') ||
    lower.includes('හයිඩ්‍රොලික්') ||
    ((lower.includes('chapter 15') || lower.includes('15 වන පාඩම') || lower.includes('පාඩම 15') || lower.includes('ch 15') || lower.includes('ch-15')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව') || !currentSubject))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch15-hydrostatic-pressure' };
  }

  // Science Chapter 1: Chemical Basis of Life
  if (
    lower.includes('chemical basis') ||
    lower.includes('රසායනික පදනම') ||
    lower.includes('biomolecules') ||
    lower.includes('carbohydrate') ||
    lower.includes('protein') ||
    lower.includes('ජෛව අණු') ||
    ((lower.includes('chapter 1') || lower.includes('1 වන පාඩම') || lower.includes('ch 1')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch1-chemical-basis' };
  }

  // Science Chapter 2: Linear Motion
  if (
    lower.includes('linear motion') ||
    lower.includes('චලිතය') ||
    lower.includes('සරල රේඛීය') ||
    lower.includes('v = u + at') ||
    lower.includes('velocity-time') ||
    ((lower.includes('chapter 2') || lower.includes('2 වන පාඩම') || lower.includes('ch 2')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch2-linear-motion' };
  }

  // Science Chapter 3: Structure of Matter
  if (
    lower.includes('structure of matter') ||
    lower.includes('පදාර්ථයේ ව්‍යුහය') ||
    lower.includes('bohr') ||
    lower.includes('electron configuration') ||
    lower.includes('isotope') ||
    lower.includes('සමස්ථානික') ||
    ((lower.includes('chapter 3') || lower.includes('3 වන පාඩම') || lower.includes('ch 3')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch3-structure-of-matter' };
  }

  // Science Chapter 4: Newton's Laws
  if (
    lower.includes('newton') ||
    lower.includes('නිව්ටන්') ||
    lower.includes('f = ma') ||
    lower.includes('momentum') ||
    ((lower.includes('chapter 4') || lower.includes('4 වන පාඩම') || lower.includes('ch 4')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch4-newton-laws' };
  }

  // Science Chapter 17: Rate of Reactions
  if (
    lower.includes('rate of reaction') ||
    lower.includes('ප්‍රතික්‍රියා සීඝ්‍රතාව') ||
    lower.includes('collision theory') ||
    lower.includes('catalyst') ||
    lower.includes('ගැටුම් වාදය') ||
    ((lower.includes('chapter 17') || lower.includes('17 වන පාඩම') || lower.includes('ch 17')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch17-rate-of-reactions' };
  }

  // Science Chapter 20: Inheritance
  if (
    lower.includes('inheritance') ||
    lower.includes('mendel') ||
    lower.includes('පාරම්පරිකතාව') ||
    lower.includes('monohybrid') ||
    ((lower.includes('chapter 20') || lower.includes('20 වන පාඩම') || lower.includes('ch 20')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch20-inheritance' };
  }

  // Science: Photosynthesis
  if (
    lower.includes('photosynthesis') ||
    lower.includes('stomata') ||
    lower.includes('chlorophyll') ||
    lower.includes('ප්‍රභාසංස්ලේෂණය') ||
    lower.includes('ஒளித்தொகுப்பு')
  ) {
    return { subjectId: 'science', topicId: 'photosynthesis' };
  }

  return null;
};

export function getCurriculumStarterPills(
  subjectId?: string,
  topicId?: string,
  language: Language = 'en'
): TutorAction[] {
  const sub = (subjectId || '').toLowerCase();
  const top = (topicId || '').toLowerCase();

  if (sub === 'science') {
    if (top.includes('matter') || top.includes('bohr') || top.includes('atom') || top.includes('sci-10-matter') || top === 'structure-of-matter') {
      if (language === 'si') {
        return [
          { id: 'sci-bohr', label: 'බෝර් පරමාණුක ආකෘතිය', prompt: 'බෝර් පරමාණුක ආකෘතිය සහ ඉලෙක්ට්‍රෝන වින්‍යාසය (2, 8, 8) පැහැදිලි කරන්න' },
          { id: 'sci-isotopes', label: 'සමස්ථානික සහ පරමාණුක ක්‍රමාංකය', prompt: 'සමස්ථානික යනු මොනවාද? පරමාණුක ක්‍රමාංකය සහ ස්කන්ධ ක්‍රමාංකය අතර වෙනස කුමක්ද?' },
          { id: 'sci-matter', label: 'පදාර්ථයේ ව්‍යුහය', prompt: 'පදාර්ථයේ ව්‍යුහය සහ උපපරමාණුක අංශු (ප්‍රෝටෝන, නියුට්‍රෝන, ඉලෙක්ට්‍රෝන) ගැන පහදා දෙන්න' },
        ];
      }
      if (language === 'ta') {
        return [
          { id: 'sci-bohr', label: 'போர் அணு மாதிரி', prompt: 'போர் அணு மாதிரி மற்றும் இலத்திரன் கட்டமைப்பு (2, 8, 8) பற்றி விளக்குக' },
          { id: 'sci-isotopes', label: 'சமதானிகள் & அணு எண்', prompt: 'சமதானிகள் என்றால் என்ன? அணு எண் மற்றும் திணிவு எண் தொடர்பு என்ன?' },
          { id: 'sci-matter', label: 'சடப்பொருளின் கட்டமைப்பு', prompt: 'சடப்பொருளின் அடிப்படை கட்டமைப்பு மற்றும் உப-அணு துணிக்கைகள் பற்றி விளக்குக' },
        ];
      }
      return [
        { id: 'sci-bohr', label: 'Bohr Atomic Model', prompt: 'Explain the Bohr atomic model and electron configuration (2, 8, 8)' },
        { id: 'sci-isotopes', label: 'Isotopes & Atomic Number', prompt: 'What are isotopes and how do atomic and mass numbers relate?' },
        { id: 'sci-matter', label: 'Structure of Matter', prompt: 'Explain the structure of matter and subatomic particles (protons, neutrons, electrons)' },
      ];
    }

    if (top.includes('reaction') || top.includes('rate') || top.includes('sci-10-reactions') || top === 'rate-of-reactions') {
      if (language === 'si') {
        return [
          { id: 'sci-rate-factors', label: 'ප්‍රතික්‍රියා සීඝ්‍රතාව කෙරෙහි බලපාන සාධක', prompt: 'රසායනික ප්‍රතික්‍රියාවක සීඝ්‍රතාව කෙරෙහි බලපාන සාධක මොනවාද?' },
          { id: 'sci-collision', label: 'ගැටුම් වාදය සහ උත්ප්‍රේරක', prompt: 'ගැටුම් වාදය සහ උත්ප්‍රේරක මගින් ප්‍රතික්‍රියා සීඝ්‍රතාව වැඩි කරන්නේ කෙසේදැයි පැහැදිලි කරන්න' },
        ];
      }
      if (language === 'ta') {
        return [
          { id: 'sci-rate-factors', label: 'தாக்க வீதத்தை பாதிக்கும் காரணிகள்', prompt: 'இரசாயனத் தாக்க வீதத்தை பாதிக்கும் முக்கிய காரணிகள் எவை?' },
          { id: 'sci-collision', label: 'மோதுகைக் கோட்பாடு & ஊக்கிகள்', prompt: 'மோதுகைக் கோட்பாடு மற்றும் ஊக்கிகள் தாக்க வீதத்தை எவ்வாறு அதிகரிக்கின்றன?' },
        ];
      }
      return [
        { id: 'sci-rate-factors', label: 'Factors Affecting Reaction Rate', prompt: 'What factors affect the rate of a chemical reaction?' },
        { id: 'sci-collision', label: 'Collision Theory & Catalysts', prompt: 'Explain collision theory and how catalysts speed up reaction rates' },
      ];
    }

    if (top.includes('motion') || top.includes('linear') || top.includes('sci-10-motion') || top === 'motion-in-a-straight-line') {
      if (language === 'si') {
        return [
          { id: 'sci-motion-eq', label: 'චලිත සමීකරණ (v = u + at)', prompt: 'සරල රේඛීය චලිත සමීකරණ (v = u + at, s = ut + 1/2at²) පැහැදිලි කරන්න' },
          { id: 'sci-vel-time', label: 'ප්‍රවේග-කාල ප්‍රස්තාර', prompt: 'ප්‍රවේග-කාල ප්‍රස්තාරයකින් ත්වරණය සහ විස්ථාපනය සොයන්නේ කෙසේද?' },
        ];
      }
      if (language === 'ta') {
        return [
          { id: 'sci-motion-eq', label: 'இயக்கச் சமன்பாடுகள் (v = u + at)', prompt: 'நேர்கோட்டு இயக்க சமன்பாடுகளை (v = u + at, s = ut + 1/2at²) விளக்குக' },
          { id: 'sci-vel-time', label: 'வேக-நேர வரைபடங்கள்', prompt: 'வேக-நேர வரைபடத்திலிருந்து ஆர்முடுகல் மற்றும் இடப்பெயர்ச்சியை எவ்வாறு கணிப்பது?' },
        ];
      }
      return [
        { id: 'sci-motion-eq', label: 'Equations of Motion', prompt: 'Can you explain the equations of linear motion (v = u + at, s = ut + 1/2at²)?' },
        { id: 'sci-vel-time', label: 'Velocity-Time Graphs', prompt: 'How do you determine acceleration and displacement from a velocity-time graph?' },
      ];
    }

    // Default science / Grade 8 Photosynthesis
    if (language === 'si') {
      return [
        { id: 'sci-photo', label: 'ප්‍රභාසංශ්ලේෂණය', prompt: 'ශාකවල ප්‍රභාසංශ්ලේෂණ ක්‍රියාවලිය පැහැදිලි කරන්න' },
        { id: 'sci-stomata', label: 'පත්‍ර රන්ද්‍ර සහ වායු හුවමාරුව', prompt: 'පත්‍ර රන්ද්‍ර මගින් වායු හුවමාරුව සිදුවන ආකාරය පැහැදිලි කරන්න' },
        { id: 'sci-starch', label: 'පිෂ්ටය හඳුනාගැනීමේ පරීක්ෂාව', prompt: 'පත්‍ර වල පිෂ්ටය හඳුනාගැනීම සඳහා අයඩින් පරීක්ෂාව පැහැදිලි කරන්න' },
      ];
    }
    if (language === 'ta') {
      return [
        { id: 'sci-photo', label: 'ஒளித்தொகுப்பு செயல்முறை', prompt: 'தாவரங்களில் ஒளித்தொகுப்பு நடைபெறும் செயல்முறையை விளக்குக' },
        { id: 'sci-stomata', label: 'இலைவாய்களும் வாயுப் பரிமாற்றமும்', prompt: 'இலைவாய்கள் வாயுப் பரிமாற்றத்தை எவ்வாறு கட்டுப்படுத்துகின்றன?' },
        { id: 'sci-starch', label: 'மாப்பொருள் பரிசோதனை', prompt: 'இலைகளில் மாப்பொருளை கண்டறியும் அயடீன் பரிசோதனையை விளக்குக' },
      ];
    }
    return [
      { id: 'sci-photo', label: 'Science: Photosynthesis', prompt: 'Explain the process of photosynthesis in plants' },
      { id: 'sci-stomata', label: 'Science: Stomata & Gas Exchange', prompt: 'How do leaf stomata regulate gas exchange?' },
      { id: 'sci-starch', label: 'Science: Plant Starch Testing', prompt: 'Explain the iodine test experiment for starch in leaves' },
    ];
  }

  if (sub === 'ict') {
    if (language === 'si') {
      return [
        { id: 'ict-num', label: '1 වන පාඩම: සංඛ්‍යා පද්ධති (ද්විමය)', prompt: 'සංඛ්‍යා පද්ධති සහ ද්විමය පරිවර්තනය පැහැදිලි කරන්න' },
        { id: 'ict-cfg', label: '2 වන පාඩම: පරිගණක වින්‍යාසය සහ යතුරුපුවරු', prompt: 'Can you explain more about Desktop Customization & Display Settings?' },
        { id: 'ict-wp', label: '3 වන පාඩම: වදන් සැකසුම (Word Processing)', prompt: '3 වන පරිච්ඡේදය: වදන් සැකසුම සහ ලේඛන හැඩසවි ගැන්වීම පැහැදිලි කරන්න' },
        { id: 'ict-prg', label: '4 වන පාඩම: Scratch ක්‍රමලේඛනය (Loops)', prompt: 'Scratch හි විචල්‍යයන් සහ පුනරාවර්තන loops ක්‍රියාකරන්නේ කෙසේද?' },
        { id: 'ict-phy', label: '5 වන පාඩම: භෞතික පරිගණනය (micro:bit)', prompt: 'භෞතික පරිගණනයේ සංවේදක සහ ක්‍රියාකරවන අතර වෙනස කුමක්ද?' },
      ];
    }
    if (language === 'ta') {
      return [
        { id: 'ict-num', label: 'பாடம் 1: எண் முறைகள் (இருமம்/தசமம்)', prompt: 'எண் முறைகள் மற்றும் இரும மாற்றங்களை விளக்குங்கள்' },
        { id: 'ict-cfg', label: 'பாடம் 2: கணினி உள்ளமைவு & விசைப்பலகை', prompt: 'Can you explain more about Desktop Customization & Display Settings?' },
        { id: 'ict-wp', label: 'பாடம் 3: சொல் செயலாக்கம் (Word Processing)', prompt: 'பாடம் 3: சொல் செயலாக்கம் மற்றும் ஆவண வடிவமைப்பு பற்றி விளக்குங்கள்' },
        { id: 'ict-prg', label: 'பாடம் 4: Scratch நிரலாக்கம் (Loops)', prompt: 'Scratch இல் மாறிகள் மற்றும் சுழற்சிகள் எவ்வாறு செயல்படுகின்றன?' },
        { id: 'ict-phy', label: 'பாடம் 5: பௌதீகக் கணினியியல் (micro:bit)', prompt: 'உணரிகள் மற்றும் இயங்கிகள் இடையிலான வேறுபாடு என்ன?' },
      ];
    }
    return [
      { id: 'ict-num', label: 'Ch 1: Number Systems (Binary & Decimal)', prompt: 'Can you explain the main concepts of Number Systems and binary conversions?' },
      { id: 'ict-cfg', label: 'Ch 2: Desktop Configuration & Keyboards', prompt: 'Can you explain more about Desktop Customization & Display Settings?' },
      { id: 'ict-wp', label: 'Ch 3: Word Processing & Formatting', prompt: 'Can you teach me Chapter 3: Word Processing and document formatting?' },
      { id: 'ict-prg', label: 'Ch 4: Scratch Programming & Loops', prompt: 'How do variables and repeat loops work in Scratch programming?' },
      { id: 'ict-phy', label: 'Ch 5: Physical Computing & Sensors', prompt: 'What is the difference between sensors and actuators on a micro:bit?' },
    ];
  }

  if (sub === 'history') {
    if (language === 'si') {
      return [
        { id: 'hist-sellipi', label: '1 වන පාඩම: සෙල්ලිපි වර්ග 5 (Sellipi)', prompt: 'ඉතිහාසය හැදෑරීමේ මූලාශ්‍ර වල සෙල්ලිපි (Sellipi) වර්ග සහ බ්‍රාහ්මී ලේඛන ගැන විස්තර කරන්න' },
        { id: 'hist-media', label: 'ශිලා ලේඛන මාධ්‍ය (ගල්පොත, පනාකඩුව)', prompt: 'ලංකාවේ ශිලා ලේඛන සහ වෙනත් ලේඛන මාධ්‍ය (ගල්පොත, සීගිරි කුරුටු ගී, පනාකඩුව තඹ සන්නස) මොනවාද?' },
        { id: 'hist-curriculum', label: '10 ශ්‍රේණිය ඉතිහාසය පරිච්ඡේද 10', prompt: '10 ශ්‍රේණිය ඉතිහාසය විෂය නිර්දේශයේ පරිච්ඡේද 10 මොනවාද?' },
      ];
    }
    if (language === 'ta') {
      return [
        { id: 'hist-sellipi', label: 'பாடம் 1: கல்வெட்டுகள் (Sellipi) & பிராமி', prompt: 'இலங்கையின் வரலாற்று ஆதாரங்களான கல்வெட்டுகள் மற்றும் பிராமி எழுத்துக்கள் பற்றி விளக்குக' },
        { id: 'hist-media', label: 'சாசன ஊடகங்கள் (கற்பொத்த, பனாகடுவ)', prompt: 'இலங்கையின் சாசன ஊடகங்கள் (கற்பொத்த, பனாகடுவ செப்புப்பட்டயம்) எவை?' },
        { id: 'hist-curriculum', label: 'தரம் 10 வரலாறு 10 அத்தியாயங்கள்', prompt: 'தரம் 10 வரலாற்றுப் பாடநூலின் 10 அத்தியாயங்கள் எவை?' },
      ];
    }
    return [
      { id: 'hist-sellipi', label: 'Ch 1: 5 Types of Inscriptions (Sellipi)', prompt: 'Explain the 5 types of Inscriptions (Sellipi) and Brahmi cave records from Chapter 1' },
      { id: 'hist-media', label: 'Epigraphical Media (Panakaduwa, Galpotha)', prompt: 'What are the key epigraphical media like Galpotha, Sigiriya Kurutu Gee, and Panakaduwa copper plate?' },
      { id: 'hist-curriculum', label: 'Grade 10 History: All 10 Chapters', prompt: 'What are the 10 chapters in the Grade 10 History curriculum?' },
    ];
  }

  // Maths or other
  if (language === 'si') {
    return [
      { id: 'math-pyth', label: 'පයිතගරස් ප්‍රමේයය', prompt: 'පයිතගරස් ප්‍රමේයයේ ප්‍රධාන කරුණු පැහැදිලි කරන්න' },
      { id: 'math-triangles', label: 'ඍජුකෝණී ත්‍රිකෝණ', prompt: 'a² + b² = c² භාවිතයෙන් කර්ණය ගණනය කරන්නේ කෙසේද?' },
    ];
  }
  if (language === 'ta') {
    return [
      { id: 'math-pyth', label: 'பைத்தகரசின் தேற்றம்', prompt: 'பைத்தகரசின் தேற்றத்தின் முக்கிய கருத்துக்களை விளக்குக' },
      { id: 'math-triangles', label: 'செங்கோண முக்கோணங்கள்', prompt: 'a² + b² = c² ஐப் பயன்படுத்தி செம்பக்கத்தை எவ்வாறு கணிப்பது?' },
    ];
  }
  return [
    { id: 'math-pyth', label: 'Maths: Pythagoras Theorem', prompt: 'Can you explain the main ideas of Pythagoras Theorem?' },
    { id: 'math-triangles', label: 'Maths: Right-Angled Triangles', prompt: 'How to calculate the hypotenuse using a² + b² = c²?' },
  ];
}

export function buildInitialGreeting(
  subjectId: string,
  topicId: string,
  language: Language,
  studentName: string,
  grade: string
): ChatMessage {
  const sub = (subjectId || '').toLowerCase();
  const top = (topicId || '').toLowerCase();
  const studentGradeLabel = grade ? grade.replace('grade-', 'Grade ') : 'Grade 10';

  let enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for ${studentGradeLabel}**. What topic would you like to explore together today?`;
  let siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **${studentGradeLabel}** ගුරුතුමා. අද අපි කුමන පාඩමෙන් පටන් ගනිමුද?`;
  let taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **${studentGradeLabel}** ஆசிரியர். நாம் இன்று எந்த பாடத்திலிருந்து தொடங்கலாம்?`;

  let keyPoints: string[] | undefined = undefined;

  if (sub === 'science') {
    if (top.includes('matter') || top.includes('bohr') || top.includes('atom') || top.includes('sci-10-matter') || top === 'structure-of-matter') {
      enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for Grade 10 Science — Structure of Matter**.\n\nI can help you explore atomic structure, electron configurations (2, 8, 8), Bohr atomic models, isotopes, and the periodic table.\n\nWhat would you like to explore first?`;
      siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **10 ශ්‍රේණිය විද්‍යාව — පදාර්ථයේ ව්‍යුහය** ගුරුතුමා.\n\nපරමාණුක ව්‍යුහය, ඉලෙක්ට්‍රෝන වින්‍යාසය (2, 8, 8), බෝර් පරමාණු ආකෘති, සමස්ථානික සහ ආවර්තිතා වගුව පිළිබඳ ඕනෑම කරුණක් මා සමඟ සාකච්ඡා කළ හැක.\n\nඅපි කුමන කරුණෙන් පටන් ගනිමුද?`;
      taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **தரம் 10 விஞ்ஞானம் — சடப்பொருளின் கட்டமைப்பு** ஆசிரியர்.\n\nஅணு கட்டமைப்பு, இலத்திரன் கட்டமைப்பு (2, 8, 8), போர் அணு மாதிரிகள், மற்றும் சமதானிகள் பற்றி நாம் கற்கலாம்.\n\nநாம் எதிலிருந்து தொடங்கலாம்?`;
      keyPoints = [
        'Atomic Structure (Protons, Neutrons, Electrons)',
        'Bohr Electron Configuration (2, 8, 8)',
        'Atomic Number (Z) & Mass Number (A)',
        'Isotopes & Chemical Properties'
      ];
    } else if (top.includes('reaction') || top.includes('rate') || top.includes('sci-10-reactions') || top === 'rate-of-reactions') {
      enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for Grade 10 Science — Rate of Reactions**.\n\nI can help you understand how concentration, temperature, surface area, and catalysts affect the speed of chemical reactions using collision theory.\n\nWhat would you like to explore?`;
      siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **10 ශ්‍රේණිය විද්‍යාව — රසායනික ප්‍රතික්‍රියා සීඝ්‍රතාව** ගුරුතුමා.\n\nසාන්ද්‍රණය, උෂ්ණත්වය, පෘෂ්ඨික වර්ගඵලය සහ උත්ප්‍රේරක මගින් ප්‍රතික්‍රියා සීඝ්‍රතාව වෙනස් වන ආකාරය ගැටුම් වාදය ඇසුරින් ඉගෙන ගනිමු.\n\nඅපි ආරම්භ කරමුද?`;
      taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **தரம் 10 விஞ்ஞானம் — இரசாயனத் தாக்க வீதம்** ஆசிரியர்.\n\nசெறிவு, வெப்பநிலை, மேற்பரப்பளவு மற்றும் ஊக்கிகள் தாக்க வீதத்தை எவ்வாறு பாதிக்கின்றன என்பதை நாம் கற்கலாம்.\n\nநாம் தொடங்கலாமா?`;
      keyPoints = [
        'Collision Theory',
        'Effect of Temperature & Concentration',
        'Surface Area & Catalysts',
        'Measuring Reaction Rates'
      ];
    } else if (top.includes('motion') || top.includes('linear') || top.includes('sci-10-motion') || top === 'motion-in-a-straight-line') {
      enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for Grade 10 Science — Linear Motion**.\n\nI can guide you through displacement, velocity, acceleration, the equations of motion, and velocity-time graphs.\n\nWhat would you like to practice?`;
      siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **10 ශ්‍රේණිය විද්‍යාව — සරල රේඛීය චලිතය** ගුරුතුමා.\n\nවිස්ථාපනය, ප්‍රවේගය, ත්වරණය, චලිත සමීකරණ සහ ප්‍රවේග-කාල ප්‍රස්තාර පිළිබඳ ගැටළු විසඳීමට මම ඔබට උදව් කරන්නෙමි.\n\nඅපි කුමන කොටසින් පටන් ගනිමුද?`;
      taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **தரம் 10 விஞ்ஞானம் — நேர்கோட்டு இயக்கம்** ஆசிரியர்.\n\nஇடப்பெயர்ச்சி, வேகம், ஆர்முடுகல், இயக்கச் சமன்பாடுகள் மற்றும் வரைபடங்கள் பற்றி நாம் கற்கலாம்.\n\nநாம் எதிலிருந்து தொடங்கலாம்?`;
      keyPoints = [
        'Displacement & Velocity',
        'Acceleration & Deceleration',
        'Equations of Motion (v=u+at, s=ut+1/2at²)',
        'Velocity-Time Graph Interpretation'
      ];
    } else if (top.includes('chemical-bond') || top.includes('bond') || top.includes('ch10') || top.includes('ch-10')) {
      enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for Grade 10 Science — Chemical Bonds**.\n\nI can help you explore the Octet Rule, Ionic bonds (electron transfer), Covalent bonds (electron sharing), polar molecules, electronegativity, and Metallic bonding.\n\nWhat would you like to explore first?`;
      siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **10 ශ්‍රේණිය විද්‍යාව — රසායනික බන්ධන** ගුරුතුමා.\n\nඅෂ්ටක නියමය, අයනික බන්ධන (ඉලෙක්ට්‍රෝන හුවමාරුව), සහසංයුජ බන්ධන (ඉලෙක්ට්‍රෝන හවුලේ තබා ගැනීම), ධ්‍රැවීය අණු, විද්‍යුත් සෘණතාව සහ ලෝහක බන්ධන පිළිබඳ ඕනෑම කරුණක් මා සමඟ සාකච්ඡා කළ හැක.\n\nඅපි කුමන කරුණෙන් පටන් ගනිමුද?`;
      taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **தரம் 10 விஞ்ஞானம் — இரசாயனப் பிணைப்புகள்** ஆசிரியர்.\n\nஎண்ம விதி, அயன் பிணைப்புகள், பங்கீட்டுப் பிணைப்புகள் மற்றும் உலோகப் பிணைப்புகள் பற்றி நாம் கற்கலாம்.\n\nநாம் எதிலிருந்து தொடங்கலாம்?`;
      keyPoints = [
        'Octet Rule & Stability',
        'Ionic Bonding & Electron Transfer',
        'Covalent Bonding & Electron Sharing',
        'Electronegativity & Polar Molecules',
        'Metallic Bonding'
      ];
    } else if (top.includes('continuity') || top.includes('mitosis') || top.includes('ch14') || top.includes('ch-14')) {
      enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for Grade 10 Science — Continuity of Life**.\n\nI can help you explore Cell Division, Mitosis vs Meiosis, chromosome behaviors, diploid vs haploid daughter cells, and genetic variation.\n\nWhat would you like to explore first?`;
      siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **10 ශ්‍රේණිය විද්‍යාව — ජීවයේ අඛණ්ඩතාව** ගුරුතුමා.\n\nසෛල බෙදීම, අනුනනය (Mitosis) සහ ඌනනය (Meiosis), වර්ණදේහ චලනය, ද්විගුණ සහ ඒකගුණ සෛල මෙන්ම ප්‍රවේණික ප්‍රභේදනය පිළිබඳ කරුණු සාකච්ඡා කරමු.\n\nඅපි කුමන කොටසින් පටන් ගනිමුද?`;
      taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **தரம் 10 விஞ்ஞானம் — வாழ்க்கையின் தொடர்ச்சி** ஆசிரியர்.\n\nகலப்பிரிவு, இழையுருப்பிரிவு மற்றும் ஒடுக்கற்பிரிவு படிநிலைகள் பற்றி நாம் கற்கலாம்.\n\nநாம் எதிலிருந்து தொடங்கலாம்?`;
      keyPoints = [
        'Importance of Cell Division',
        'Mitosis (Stages & Daughter Cells)',
        'Meiosis (Stages & Genetic Variation)',
        'Diploid (2n) vs Haploid (n) Cells'
      ];
    } else {
      enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for Science**.\n\nWhat science topic would you like to explore together today?`;
      siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **විද්‍යාව** ගුරුතුමා.\n\nඅද අපි කුමන විද්‍යා පාඩමෙන් පටන් ගනිමුද?`;
      taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **விஞ்ஞானம்** ஆசிரியர்.\n\nநாம் இன்று எந்த விஞ்ஞானப் பாடத்திலிருந்து தொடங்கலாம்?`;
    }
  } else if (sub === 'history') {
    enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for Grade 10 History**.\n\nI'm here to guide you through your official 10 chapters: Sources of Studying History (Inscriptions & Epigraphy), Ancient Settlements, Political Power, Ancient Society, Science & Technology, Historical Knowledge, Decline of Dry Zone & South-West Kingdoms, Kandyan Kingdom, Renaissance, and Sri Lanka & the Western World.\n\nWould you like to start with Chapter 1: **Inscriptions (Sellipi)** or explore another topic?`;
    siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **10 ශ්‍රේණිය ඉතිහාසය** ගුරුතුමා. ඔබගේ 10 ශ්‍රේණියේ නිල ඉතිහාසය පෙළපොතෙහි පරිච්ඡේද 10 පිළිබඳ ඕනෑම කරුණක් මා සමඟ සාකච්ඡා කළ හැක.\n\nඅද අපි 1 වන පරිච්ඡේදයේ **සෙල්ලිපි (Inscriptions)** හෝ වෙනත් පාඩමකින් පටන් ගනිමුද?`;
    taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **தரம் 10 வரலாறு** ஆசிரியர். உங்கள் தரம் 10 வரலாற்றுப் பாடநூலின் 10 அத்தியாயங்கள் தொடர்பான எந்தவொரு கேள்வியையும் கேட்கலாம்.\n\nநாம் இன்று அத்தியாயம் 1 இன் **கல்வெட்டுகள் (Sellipi)** பற்றித் தொடங்கலாமா?`;
    keyPoints = [
      'Ch 1: Sources of Studying History (Inscriptions & Epigraphy)',
      'Ch 2: Early Settlements (Mesolithic to Proto-historic)',
      'Ch 3: Evolution of Political Power (Monarchy & Anuradhapura)',
      'Ch 4: Ancient Sri Lankan Society & Culture',
      'Ch 5: Science & Technology (Irrigation & Architecture)'
    ];
  } else if (sub === 'ict') {
    enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for ${studentGradeLabel} ICT**.\n\nI'm here to help you learn and master your official Information & Communication Technology curriculum: Number Systems, Configuring Computers, Word Processing, Scratch Programming, Physical Computing, and the Internet.\n\nWhat ICT topic would you like to explore together today?`;
    siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **තොරතුරු හා සන්නිවේදන තාක්ෂණය (ICT)** ගුරුතුමා. ඔබගේ නිල පෙළපොතෙහි පරිච්ඡේද 6 පිළිබඳ ඕනෑම කරුණක් මා සමඟ සාකච්ඡා කළ හැක.\n\nඅද අපි කුමන ICT පාඩමෙන් පටන් ගනිමුද?`;
    taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **தகவல் தொழில்நுட்ப (ICT)** ஆசிரியர். உங்கள் பாடநூலின் அத்தியாயங்கள் தொடர்பான உங்கள் சந்தேகங்களைக் கேளுங்கள்.\n\nநாம் இன்று எந்த ICT பாடத்திலிருந்து தொடங்கலாம்?`;
    keyPoints = [
      'Ch 1: Number Systems (Binary & Switches)',
      'Ch 2: Configuring Computers (Resolution)',
      'Ch 3: Word Processing (Justify Margins)',
      'Ch 4: Programming (Scratch Loops)',
      'Ch 5: Physical Computing (micro:bit)',
      'Ch 6: Internet (URL & Email Privacy)'
    ];
  }

  const primaryContent = language === 'si' ? siGreeting : language === 'ta' ? taGreeting : enGreeting;

  return {
    id: `msg-init-${sub}-${top}`,
    role: 'tutor',
    content: primaryContent,
    timestamp: new Date().toISOString(),
    suggestedActions: getCurriculumStarterPills(subjectId, topicId, language),
    languageVersions: {
      en: enGreeting,
      si: siGreeting,
      ta: taGreeting,
    },
    activeLang: language,
    keyPoints,
  };
}

/** Demo default topic per subject (MOCK only). */
export function mockDefaultTopicForSubject(sub?: string): string | undefined {
  if (sub === 'ict') return 'number-systems';
  if (sub === 'history') return 'history-gr10-sources';
  if (sub === 'maths') return 'maths-gr10-ch10-pythagoras';
  if (sub === 'science') return 'science-gr10-ch1-chemical-basis';
  return undefined;
}

/** True for the scripted offline-mock notices the MOCK adapter emits. */
export function isMockNoticeMessage(content: string): boolean {
  return content.includes('Offline Mock Mode Notice');
}
