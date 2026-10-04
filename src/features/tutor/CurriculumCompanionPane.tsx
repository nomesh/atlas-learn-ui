import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  Lightbulb, 
  Zap, 
  Cpu, 
  CheckCircle2, 
  HelpCircle, 
  ExternalLink, 
  Layers, 
  ArrowRight, 
  AlertTriangle 
} from 'lucide-react';
import { MOCK_SUBJECTS, MOCK_TOPICS, getLessonStepsForTopic, findTopicResilient as findTopicResilientCore } from '../../mocks/curriculumData';
import { useStudent } from '../../state/studentContext';
import { ElectricSwitchVisualizer } from '../../components/interactive/ElectricSwitchVisualizer';
import { ResolutionVisualizer } from '../../components/interactive/ResolutionVisualizer';
import { ScratchBlockVisualizer } from '../../components/interactive/ScratchBlockVisualizer';
import { MicrocontrollerVisualizer } from '../../components/interactive/MicrocontrollerVisualizer';
import { UrlAnatomyVisualizer } from '../../components/interactive/UrlAnatomyVisualizer';
import { WordProcessingVisualizer } from '../../components/interactive/WordProcessingVisualizer';
import { SubjectConceptVisualizer, hasSimulation } from '../../components/interactive/SubjectConceptVisualizer';
import { RichContentRenderer } from './RichContentRenderer';
import type { Topic } from '../../types';

export function findTopicResilient(list: Topic[], id?: string, preferredSubjectId?: string): Topic | undefined {
  return findTopicResilientCore(list, id, preferredSubjectId);
}

interface CurriculumCompanionPaneProps {
  subjectId: string;
  topicId?: string;
  topics?: Topic[];
  language: 'en' | 'si' | 'ta';
  activeModeHint?: string;
  onAskQuestion: (query: string) => void;
  onSelectTopic: (newTopicId: string) => void;
}

const getTopicDeepDive = (topicId: string, language: 'en' | 'si' | 'ta' = 'en', topic?: Topic) => {
  const lower = (topicId || '').toLowerCase();

  // Science Chapter 10: Chemical Bonds
  if (lower.includes('chemical-bond') || lower.includes('chemical-basis') === false && (lower.includes('bond') || lower.includes('ch10') || lower.includes('ch-10'))) {
    return {
      examTrap: language === 'si'
        ? '⚠️ අ.පො.ස. සා/පෙළ විභාග උගුල: අයනික බන්ධන (Ionic bonds) සෑදෙන්නේ ලෝහ සහ අලෝහ අතර ඉලෙක්ට්‍රෝන හුවමාරුවෙනි. සහසංයුජ බන්ධන (Covalent bonds) සෑදෙන්නේ අලෝහ පරමාණු අතර ඉලෙක්ට්‍රෝන හවුලේ තබා ගැනීමෙනි (Octet rule). ලෝහක බන්ධන වල නිදහස් ඉලෙක්ට්‍රෝන සමුද්‍රයක් පවතී!'
        : language === 'ta'
        ? '⚠️ க.பொ.த சா/தர பரீட்சை எச்சரிக்கை: அயன் பிணைப்புகள் உலோகங்களுக்கும் அல்லுலோகங்களுக்கும் இடையே இலத்திரன் பரிமாற்றத்தால் உருவாகின்றன. பங்கீட்டுப் பிணைப்புகள் இலத்திரன் பகிர்வால் உருவாகின்றன!'
        : '⚠️ O/L Exam Trap: Ionic bonds form via transfer of electrons between metal and non-metal atoms; Covalent bonds form via mutual sharing of electron pairs between non-metals to satisfy the Octet Rule!',
      challenge: language === 'si'
        ? '🎯 අන්තර්ක්‍රියාකාරී අභියෝගය: NaCl (අයනික) සහ CH₄ හෝ H₂O (සහසංයුජ) අණු අතර බන්ධන ව්‍යුහය සංසන්දනය කරන්න!'
        : language === 'ta'
        ? '🎯 சவால்: NaCl (அயன்) மற்றும் H₂O (பங்கீட்டு) மூலக்கூறுகளின் பிணைப்பு அமைப்பை ஒப்பிடுக!'
        : '🎯 Interactive Challenge: Compare electron sharing vs transfer in NaCl (ionic) and H₂O/CH₄ (covalent) structures!',
      clarifyPrompt: language === 'si'
        ? 'රසායනික බන්ධන: අෂ්ටක නියමය, අයනික බන්ධන සහ සහසංයුජ බන්ධන සෑදෙන ආකාරය පියවරෙන් පියවර පැහැදිලි කරන්න'
        : language === 'ta'
        ? 'இரசாயனப் பிணைப்புகள்: எண்ம விதி, அயன் மற்றும் பங்கீட்டுப் பிணைப்புகள் உருவாவதை விளக்குக'
        : 'Can you explain Chemical Bonds: Octet Rule, Ionic bonding, and Covalent bonding step-by-step?',
      verifyPrompt: language === 'si'
        ? 'NaCl අණුවේ අයනික බන්ධනය සහ Cl₂ අණුවේ සහසංයුජ බන්ධනය අතර වෙනස කුමක්ද?'
        : language === 'ta'
        ? 'NaCl அயன் பிணைப்புக்கும் Cl₂ பங்கீட்டுப் பிணைப்புக்கும் உள்ள வேறுபாடு என்ன?'
        : 'What is the key difference between the ionic bond in NaCl and covalent bond in Cl₂?'
    };
  }

  // Science Chapter 14: Continuity of Life
  if (lower.includes('continuity') || lower.includes('ch14')) {
    return {
      examTrap: language === 'si'
        ? '⚠️ අ.පො.ස. සා/පෙළ විභාග උගුල: අනුනනයේදී (Mitosis) දූහිතෘ සෛලවල වර්ණදේහ සංඛ්‍යාව නොවෙනස්ව පවතී (2n ➔ 2n). නමුත් ඌනනයේදී (Meiosis) වර්ණදේහ සංඛ්‍යාව අර්ධයක් බවට පත්වේ (2n ➔ n) සහ ප්‍රවේණික ප්‍රභේදනය ඇතිවේ!'
        : language === 'ta'
        ? '⚠️ க.பொ.த சா/தர பரீட்சை எச்சரிக்கை: இழையுருப்பிரிவில் நிறமூர்த்த எண்ணிக்கை மாறாது (2n ➔ 2n). ஒடுக்கற்பிரிவில் நிறமூர்த்த எண்ணிக்கை பாதியாகக் குறைகிறது (2n ➔ n)!'
        : '⚠️ O/L Exam Trap: Mitosis produces 2 identical diploid daughter cells (2n ➔ 2n) for growth & repair; Meiosis produces 4 non-identical haploid gametes (2n ➔ n) introducing genetic variation!',
      challenge: language === 'si'
        ? '🎯 අන්තර්ක්‍රියාකාරී අභියෝගය: ඉහත සෛල බෙදීමේ ආකෘතිය භාවිතයෙන් අනුනනය සහ ඌනනය අතර වෙනස්කම් සංසන්දනය කරන්න!'
        : language === 'ta'
        ? '🎯 சவால்: இழையுருப்பிரிவு மற்றும் ஒடுக்கற்பிரிவு படிநிலைகளை ஒப்பிட்டுப் பாருங்கள்!'
        : '🎯 Interactive Challenge: Toggle between Mitosis and Meiosis in the simulation above to trace chromosome behavior across all stages!',
      clarifyPrompt: language === 'si'
        ? 'ජීවයේ අඛණ්ඩතාව: සෛල බෙදීම, අනුනනය සහ ඌනනය අතර වෙනස පියවරෙන් පියවර විස්තර කරන්න'
        : language === 'ta'
        ? 'வாழ்க்கையின் தொடர்ச்சி: கலப்பிரிவு, இழையுருப்பிரிவு மற்றும் ஒடுக்கற்பிரிவு படிநிலைகளை விளக்குங்கள்'
        : 'Can you explain the main concepts of Continuity of Life (Mitosis vs Meiosis) step-by-step?',
      verifyPrompt: language === 'si'
        ? 'අනුනනය මගින් සෑදෙන සෛල ගණන සහ ඌනනය මගින් සෑදෙන සෛල ගණන අතර වෙනස කුමක්ද?'
        : language === 'ta'
        ? 'இழையுருப்பிரிவு மற்றும் ஒடுக்கற்பிரிவு மூலம் உருவாகும் மகவுக்கலங்களின் வேறுபாடுகள் எவை?'
        : 'What is the difference between chromosome numbers in daughter cells of mitosis vs meiosis?'
    };
  }

  // Science Chapter 13: Classification of Organisms
  if (lower.includes('classification') || lower.includes('ch13')) {
    return {
      examTrap: language === 'si'
        ? '⚠️ සා/පෙළ විභාග උගුල: පංච රාජධානි වර්ගීකරණයේදී මොනෙරා (Monera) රාජධානියේ ජීවීන් ප්‍රාග්න්‍යෂ්ටික වන අතර අනෙකුත් රාජධානි 4 (ප්‍රොටිස්ටා, දිලීර, ශාක, සත්ත්ව) සුන්‍යෂ්ටික වේ!'
        : language === 'ta'
        ? '⚠️ பரீட்சை எச்சரிக்கை: மொனேரா இராச்சியம் முன்கருவுடையது, ஏனைய நான்கு இராச்சியங்களும் மெய்க்கருவுடையவை!'
        : '⚠️ Exam Trap: Monera contains prokaryotes (lacking true membrane-bound nucleus); Protista, Fungi, Plantae, and Animalia are eukaryotes!',
      challenge: language === 'si'
        ? '🎯 අභියෝගය: ද්විපද යතුරක් භාවිතයෙන් ජීවීන් හඳුනාගන්නා ආකාරය ගුරුතුමාගෙන් අසන්න!'
        : language === 'ta'
        ? '🎯 சவால்: இருகூற்றுச் சாவி மூலம் உயிரினங்களை எவ்வாறு இனம் காண்பது என வினவுங்கள்!'
        : '🎯 Challenge: Ask the Tutor to show you how a dichotomous key classifies organisms step-by-step!',
      clarifyPrompt: language === 'si'
        ? 'ජීවීන් වර්ගීකරණයේ ප්‍රධාන සංකල්ප සහ පංච රාජධානි වර්ගීකරණය පියවරෙන් පියවර පහදා දෙන්න'
        : language === 'ta'
        ? 'உயிரினங்களின் வகைப்பாடு மற்றும் ஐந்து இராச்சிய வகைப்பாட்டை விளக்குங்கள்'
        : 'Can you explain the main ideas of Classification of organisms step-by-step?',
      verifyPrompt: language === 'si'
        ? 'පංච රාජධානි වර්ගීකරණය ඉදිරිපත් කළේ කවුද? එහි රාජධානි 5 මොනවාද?'
        : language === 'ta'
        ? 'ஐந்து இராச்சிய வகைப்பாட்டை முன்வைத்தவர் யார்? அந்த 5 இராச்சியங்கள் எவை?'
        : 'Who proposed the Five Kingdom classification and what are the five kingdoms?'
    };
  }

  switch (topicId) {
    case 'number-systems':
      return {
        examTrap: '⚠️ O/L Paper 1 Trap: Remember that 2⁰ = 1, NOT 0! Any positive number raised to power 0 equals 1. Many students mistakenly lose marks here!',
        challenge: '🎯 Interactive Challenge: Use the 8-bit switchboard above to toggle bits and build the decimal number 77 (64 + 8 + 4 + 1)!',
        clarifyPrompt: 'Can you clarify how decimal 77 is represented in 8-bit binary step-by-step?',
        verifyPrompt: 'I set binary bits for decimal 77 (01001101). Can you verify if my calculation is correct?'
      };
    case 'configuring-formatting-computer':
      return {
        examTrap: '⚠️ O/L Exam Trap: Formatting a USB storage drive removes the entire File Allocation Table. Backup your files before choosing NTFS or FAT32!',
        challenge: '🎯 Interactive Challenge: Compare 1920×1080 Full HD vs 800×600 SVGA in the visualizer above to see the pixel density difference!',
        clarifyPrompt: 'Can you clarify why Full HD has over 2 million pixels and how aspect ratio works?',
        verifyPrompt: 'Can you explain why FAT32 cannot store a single movie file larger than 4GB?'
      };
    case 'word-processing':
      return {
        examTrap: '⚠️ O/L & Term Exam Trap: Justify (Ctrl+J) aligns BOTH left and right margins, while Center (Ctrl+E) only balances text in the middle. Subscript (x₂) lowers text for formulas like CO₂, while Superscript (x²) raises text for powers like 2³!',
        challenge: '🎯 Interactive Studio Challenge: In the ribbon above, switch document presets between the English Day Invitation, Science Exam Paper (with CO₂ and 2³), and School Magazine!',
        clarifyPrompt: 'Can you clarify the difference between Justify (Ctrl+J) and Align Left (Ctrl+L) with textbook examples?',
        verifyPrompt: 'In a Science exam paper, should CO₂ use Subscript or Superscript, and how do I format 2³?'
      };
    case 'programming':
      return {
        examTrap: '⚠️ Scratch Trap: In a "repeat until" loop, if the condition variable does not change inside the loop, the program gets stuck in an infinite loop!',
        challenge: '🎯 Interactive Challenge: In the block visualizer above, set a repeat count of 4 and a turn of 90 degrees to draw a perfect square!',
        clarifyPrompt: 'Can you clarify how variables and repeat loops work together in Scratch?',
        verifyPrompt: 'Why does my Scratch sprite draw a square when turning 90 degrees 4 times?'
      };
    case 'physical-computing':
      return {
        examTrap: '⚠️ Sensor vs Actuator Trap: Sensors are INPUT devices (detecting light/heat); Actuators are OUTPUT devices (moving/lighting/beeping)!',
        challenge: '🎯 Interactive Challenge: Move the LDR light sensor slider below 30% to see if the night light activates on the micro:bit matrix!',
        clarifyPrompt: 'Can you clarify the difference between digital and analog sensor inputs on a micro:bit?',
        verifyPrompt: 'How can I program an automated street lamp using an LDR sensor and LED?'
      };
    case 'internet':
      return {
        examTrap: '⚠️ Cyber Privacy Trap: When emailing notices to a large group of parents or students, always put addresses in Bcc (Blind Carbon Copy) to prevent exposing private email addresses!',
        challenge: '🎯 Interactive Challenge: Click each part of the URL in the anatomy visualizer above to identify the protocol, domain, and file path!',
        clarifyPrompt: 'Can you clarify the difference between Cc and Bcc in email communication?',
        verifyPrompt: 'What should I do if I receive a suspicious email asking for my school account password?'
      };
    case 'history-gr10-sources':
    case 'history-gr10-ancient-heritage':
      return {
        examTrap: '⚠️ O/L History Trap: Inscriptions (Sellipi) are primary archaeological sources, NOT secondary literary sources! The 5 types are: Cave (ලෙන්), Rock (ගිරි), Pillar (ටැම්), Slab (පුවරු), and Seat (ආසන). Don\'t confuse Panakaduwa (copper plate of King Vijayabahu I) with Vallipuram (gold plate of King Vasabha)!',
        challenge: '🎯 Interactive Challenge: Ask the Tutor about the 5 types of Sellipi or how early Brahmi cave inscriptions helped Buddhist monks (Sangha) during the rainy season (Wassana)!',
        clarifyPrompt: 'ඉතිහාසය හැදෑරීමේ මූලාශ්‍ර වල සෙල්ලිපි (Sellipi) වර්ග සහ බ්‍රාහ්මී ලේඛන ගැන විස්තර කරන්න',
        verifyPrompt: 'ලංකාවේ ශිලා ලේඛන සහ වෙනත් ලේඛන මාධ්‍ය (ගල්පොත, සීගිරි කුරුටු ගී, පනාකඩුව තඹ සන්නස) මොනවාද?'
      };
    case 'history-gr10-settlements':
      return {
        examTrap: '⚠️ O/L Exam Trap: Pre-historic era belongs to stone-age foragers (Fa-Hien, Batadombalena); Proto-historic era introduced iron metallurgy, BRW pottery, and Ibbankatuwa megalithic cist burials (c. 1000–300 B.C.)!',
        challenge: '🎯 Practice Challenge: Compare the stone microliths of Bellanbandi Palassa with the iron tools found at proto-historic sites!',
        clarifyPrompt: 'ශ්‍රී ලංකාවේ ප්‍රාග් සහ පූර්ව ඓතිහාසික ජනාවාස (පාහියන්ගල, ඉබ්බන්කටුව) ගැන විස්තර කරන්න',
        verifyPrompt: 'ඉබ්බන්කටුව මහා ශිලා සුසානයෙන් හමුවූ පුරාවිද්‍යාත්මක සාක්ෂි මොනවාද?'
      };
    case 'history-gr10-political-power':
      return {
        examTrap: '⚠️ O/L History Trap: More than 70% of Early Brahmi cave inscriptions record donations by Parumakas (clan chieftains & tank owners), NOT kings! Over time, regional Parumakas were integrated under unified monarchs (Raja).',
        challenge: '🎯 Inscription Challenge: Notice the inscriptional formula "Parumaka [Name]ha lene agata anagata chatudisa sagasa dine"!',
        clarifyPrompt: 'දේශපාලන බලය විකාශනය වීම සහ පරුමකවරුන්ගේ කාර්යභාරය ගැන විස්තර කරන්න',
        verifyPrompt: 'මුල් බ්‍රාහ්මී ලෙන් ලිපිවල සඳහන් පරුමක, ගාමික, සහ ආය යන තනතුරු අතර වෙනස කුමක්ද?'
      };
    case 'history-gr10-ancient-society':
      return {
        examTrap: '⚠️ O/L Exam Trap: The ancient Sri Lankan caste system (Kula) was based on occupational hereditary services, but was far more flexible and less ritually rigid than Indian Varna due to Buddhist ethical philosophy!',
        challenge: '🎯 Cultural Challenge: Ask the Tutor how the Gam Sabha (village council) peacefully resolved tank water distribution and village disputes!',
        clarifyPrompt: 'පුරාණ ශ්‍රී ලංකාවේ සමාජ ව්‍යුහය, කුල ක්‍රමය සහ ගම් සභා ගැන විස්තර කරන්න',
        verifyPrompt: 'පුරාණ ගම්මානයක "වැවයි දාගැබයි ගමයි කෙතයි" සංකල්පයේ වැදගත්කම කුමක්ද?'
      };
    case 'history-gr10-science-tech':
    case 'history-gr10-hydraulic-society':
    case 'ancient-hydraulics':
      return {
        examTrap: '⚠️ O/L Engineering Trap: The Bisokotuwa (cistern sluice) was a hydrostatic pressure regulator placed INSIDE the tank to break water force, preventing tank bund breach!',
        challenge: '🎯 Irrigation Challenge: Ask the Tutor how the 54-mile Yoda Ela maintained a gradient of less than 6 inches per mile across dense jungle!',
        clarifyPrompt: 'පුරාණ වාරි ශිෂ්ටාචාරයේ බිසෝකොටුව සහ යෝධ ඇළ තාක්ෂණය ගැන විස්තර කරන්න',
        verifyPrompt: 'බිසෝකොටුව මඟින් වැව් බැම්ම කැඩීයාම වළක්වා ගත්තේ කෙසේද?'
      };
    case 'history-gr10-historical-knowledge':
      return {
        examTrap: '⚠️ O/L Exam Trap: Studying history is not just rote memorization—it provides practical lessons for environmental conservation (cascade wewa systems) and social tolerance!',
        challenge: '🎯 Practical Challenge: Discover how ancient water laws recorded in the Badulla Pillar Inscription apply to modern resource sharing!',
        clarifyPrompt: 'ඓතිහාසික දැනුම සහ එහි ප්‍රායෝගික භාවිතය ගැන විස්තර කරන්න',
        verifyPrompt: 'පුරාණ එල්ලංගා වැව් පද්ධති මඟින් නූතන පරිසර සංරක්ෂණයට ලැබෙන පාඩම් මොනවාද?'
      };
    case 'history-gr10-decline-new-kingdoms':
      return {
        examTrap: '⚠️ O/L History Trap: The shift of political centers to the Southwest was driven by security (Kalinga Magha invasion 1215 CE), malaria, and collapse of irrigation, shifting capital to rock fortresses (Dambadeniya, Yapahuwa)!',
        challenge: '🎯 Strategic Challenge: Ask about the defensive architecture of Yapahuwa rock citadel and the protection of the Sacred Tooth Relic!',
        clarifyPrompt: 'වියළි කලාපයේ නගර පරිහානිය සහ නිරිතදිග රාජධානි බිහිවීම ගැන විස්තර කරන්න',
        verifyPrompt: 'දඹදෙණිය සහ යාපහුව රාජධානි ආරක්ෂිත බලකොටු ලෙස තෝරාගත්තේ ඇයි?'
      };
    case 'history-gr10-kandyan-kingdom':
      return {
        examTrap: '⚠️ O/L History Trap: The Battle of Danture (1594) under King Vimaladharmasuriya I secured Kandyan independence; the Battle of Gannoruwa (1638) under King Rajasinha II crushed the Portuguese expedition led by Diogo de Melo!',
        challenge: '🎯 Resistance Challenge: Explore how the geographic mountain terrain and guerrilla warfare defended the Kingdom of Kandy for over two centuries!',
        clarifyPrompt: 'කන්ද උඩරට රාජධානිය සහ 1 වන විමලධර්මසූරිය රජුගේ කාර්යභාරය ගැන විස්තර කරන්න',
        verifyPrompt: 'දන්තුරේ සහ ගන්නෝරුව සටන්වල ඓතිහාසික වැදගත්කම කුමක්ද?'
      };
    case 'history-gr10-renaissance':
      return {
        examTrap: '⚠️ O/L World History Trap: The Renaissance began in Italy (Florence) due to Mediterranean maritime trade, Byzantine scholars fleeing the fall of Constantinople (1453), and wealthy patrons like the Medici family!',
        challenge: '🎯 Discovery Challenge: Ask the Tutor about Gutenberg’s printing press and Leonardo da Vinci’s scientific sketches!',
        clarifyPrompt: 'යුරෝපීය පුනරුදය සහ විද්‍යාත්මක සොයාගැනීම් ගැන විස්තර කරන්න',
        verifyPrompt: 'පුනරුද සමයේ මුද්‍රණ ශිල්පය සහ මානවවාදය පැතිර ගියේ කෙසේද?'
      };
    case 'history-gr10-western-world':
      return {
        examTrap: '⚠️ O/L History Trap: Portuguese arrived in Sri Lanka in 1505 accidentally (Lourenço de Almeida blown by storm to Galle), seeking cinnamon; Dutch took maritime provinces in 1658; British captured them in 1796!',
        challenge: '🎯 Trade Challenge: Explore how European maritime powers exploited the internal rivalries of the Kotte Kingdom and Sitawaka!',
        clarifyPrompt: 'ශ්‍රී ලංකාවට බටහිර ජාතීන්ගේ පැමිණීම සහ එහි ප්‍රතිඵල ගැන විස්තර කරන්න',
        verifyPrompt: 'පෘතුගීසි සහ ලන්දේසි පාලනයෙන් ලංකාවේ ආර්ථිකයට සහ නීතියට සිදුවූ බලපෑම් මොනවාද?'
      };
    default: {
      const topicName = topic?.title?.[language] || topic?.title?.en || 'this chapter';
      return {
        examTrap: language === 'si'
          ? `⚠️ ජාතික විෂය නිර්දේශ අවධානය: ${topicName} පිළිබඳ විභාග ගැටළු විසඳීමේදී නිල පෙළපොතේ තාක්ෂණික පද සහ සම්මත ඒකක කෙරෙහි විශේෂයෙන් සැලකිලිමත් වන්න!`
          : language === 'ta'
          ? `⚠️ தேசிய பாடத்திட்ட கவனம்: ${topicName} தொடர்பான பரீட்சை வினாக்களுக்கு விடையளிக்கும் போது பாடநூல் கலைச்சொற்களைப் பயன்படுத்துங்கள்!`
          : `⚠️ National Syllabus Focus: In ${topicName}, ensure you review past paper questions from the Educational Publications Department using precise textbook terminology!`,
        challenge: language === 'si'
          ? `🎯 අභියෝගය: ${topicName} පිළිබඳ විභාග පෙරහුරු ප්‍රශ්න සහ ප්‍රධාන සංකල්ප ගුරුතුමාගෙන් විමසන්න!`
          : language === 'ta'
          ? `🎯 சவால்: ${topicName} குறித்த முக்கிய கோட்பாடுகளை ஆசிரியரிடம் கேட்டுத் தெரிந்து கொள்ளுங்கள்!`
          : `🎯 Practice Challenge: Ask the Tutor to quiz you on key terms from ${topicName}!`,
        clarifyPrompt: language === 'si'
          ? `${topicName} හි ප්‍රධාන කරුණු සහ විභාග සටහන් පියවරෙන් පියවර සරලව පැහැදිලි කරන්න`
          : language === 'ta'
          ? `${topicName} இன் முக்கிய கருத்துக்களை விரிவாகவும் எளிமையாகவும் விளக்குங்கள்`
          : `Can you clarify the core concepts of ${topicName} step-by-step?`,
        verifyPrompt: language === 'si'
          ? `${topicName} පිළිබඳ පසුගිය විභාග ප්‍රශ්නයක් ලබාදෙන්න`
          : language === 'ta'
          ? `${topicName} தொடர்பான கடந்த கால வினா ஒன்றை வழங்குங்கள்`
          : `Can you give me a past paper question on ${topicName}?`
      };
    }
  }
};

export const CurriculumCompanionPane: React.FC<CurriculumCompanionPaneProps> = ({
  subjectId,
  topicId,
  topics,
  language,
  activeModeHint,
  onAskQuestion,
  onSelectTopic,
}) => {
  const { grade: studentGrade } = useStudent();
  const baseTopics = (topics && topics.length > 0) ? topics : MOCK_TOPICS;

  // Resolve topic if topicId was provided (scoped to subjectId first)
  const targetTopic = findTopicResilient(baseTopics, topicId, subjectId);

  // Current subject: from explicit subjectId, or deduced from target topic, or fallback
  const currentSubject = 
    MOCK_SUBJECTS.find((s) => s.id === subjectId) || 
    (targetTopic ? MOCK_SUBJECTS.find((s) => s.id === targetTopic.subjectId) : null) ||
    MOCK_SUBJECTS[0];

  // Grade filter logic: ICT core topics apply across grades 8-11
  const isMatchingGrade = (t: Topic) => {
    if (!t.grade || !studentGrade) return true;
    if (t.grade === studentGrade) return true;
    if (t.subjectId === 'ict' && (studentGrade === 'grade-10' || studentGrade === 'grade-11' || studentGrade === 'grade-8' || studentGrade === 'grade-9')) {
      return true;
    }
    return false;
  };

  const rawSubjectTopics = baseTopics.filter(
    (t) => t.subjectId === currentSubject.id && isMatchingGrade(t)
  );
  let subjectTopics = rawSubjectTopics.length > 0
    ? rawSubjectTopics
    : baseTopics.filter((t) => t.subjectId === currentSubject.id);

  // Ensure targetTopic is included in the subject list if present
  if (targetTopic && !subjectTopics.some((t) => t.id === targetTopic.id)) {
    subjectTopics = [targetTopic, ...subjectTopics];
  }

  // Active topic or first topic of subject - strictly within currentSubject
  const activeTopic = 
    findTopicResilient(subjectTopics, topicId, currentSubject.id) || 
    targetTopic || 
    subjectTopics[0] || 
    baseTopics[0];

  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTopic?.id]);

  const steps = getLessonStepsForTopic(activeTopic.id, currentSubject.id, studentGrade || activeTopic.grade);
  const [activeStepTab, setActiveStepTab] = useState(0);

  const currentStep = steps[activeStepTab] || steps[0];
  const gradeDisplay = studentGrade
    ? studentGrade.replace('grade-', 'Grade ')
    : (activeTopic.grade ? activeTopic.grade.replace('grade-', 'Grade ') : 'Grade 10');

  return (
    <aside className="h-full flex flex-col bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden text-white">
      {/* 1. Header: Curriculum Breadcrumbs & Subject Context */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border-b border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-bold border border-cyan-500/30 uppercase tracking-wide">
              {currentSubject.name[language]} • {gradeDisplay}
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Syllabus Grounded
            </span>
          </div>

          <span className="text-[10px] text-slate-400 font-mono">
            Ministry Textbook Active
          </span>
        </div>

        {/* Chapter Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {subjectTopics.map((topic) => {
            const isSelected = topic.id === activeTopic.id;
            return (
              <button
                key={topic.id}
                ref={isSelected ? activeTabRef : null}
                type="button"
                onClick={() => {
                  setActiveStepTab(0);
                  onSelectTopic(topic.id);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold ring-2 ring-cyan-300'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>Ch. {topic.chapterNumber}</span>
                <span className="max-w-[120px] truncate">{topic.title[language]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Scrollable Body: Visualizer & Detailed Notes */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-slate-700">
        {/* Active Chapter Overview Banner */}
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Chapter {activeTopic.chapterNumber} • National Curriculum
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Textbook Grounded
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-extrabold text-white">
            {activeTopic.title[language]}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {activeTopic.description[language]}
          </p>
        </div>

        {/* 3. Interactive Data Representation / Visualizer Widget (Only rendered if topic has simulation) */}
        {hasSimulation(activeTopic.id, currentSubject.id, activeModeHint) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interactive Concept Explorer</span>
              </span>
              <span className="text-[10px] text-cyan-300 font-mono">Real-time Simulation</span>
            </div>

            {activeTopic.id === 'number-systems' && (
              <ElectricSwitchVisualizer language={language} showByteBuilder={true} />
            )}

            {activeTopic.id === 'configuring-formatting-computer' && (
              <ResolutionVisualizer language={language} />
            )}

            {activeTopic.id === 'programming' && (
              <ScratchBlockVisualizer language={language} />
            )}

            {activeTopic.id === 'physical-computing' && (
              <MicrocontrollerVisualizer language={language} />
            )}

            {activeTopic.id === 'internet' && (
              <UrlAnatomyVisualizer language={language} />
            )}

            {activeTopic.id === 'word-processing' && (
              <WordProcessingVisualizer language={language} />
            )}

            {/* Interactive Subject Concept Visualizer for Maths, Science, History, etc. */}
            {currentSubject.id !== 'ict' && !['number-systems', 'configuring-formatting-computer', 'programming', 'physical-computing', 'internet', 'word-processing'].includes(activeTopic.id) && (
              <SubjectConceptVisualizer
                topicId={activeTopic.id}
                subjectId={currentSubject.id}
                grade={studentGrade || activeTopic.grade}
                topicTitle={activeTopic.title}
                language={language}
                activeModeHint={activeModeHint}
              />
            )}
          </div>
        )}

        {/* 4. Multi-Step Detailed Lesson Walkthrough */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Lesson Steps & Key Explanations</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">
              Step {activeStepTab + 1} of {steps.length}
            </span>
          </div>

          {/* Step Pill Buttons */}
          <div className="flex items-center gap-1.5">
            {steps.map((st, idx) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setActiveStepTab(idx)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all text-center border ${
                  activeStepTab === idx
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                Part {idx + 1}
              </button>
            ))}
          </div>

          {/* Current Step Detailed Content Card */}
          {currentStep && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                    Part {currentStep.stepNumber}: Key Concept
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                    {currentStep.title[language]}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => onAskQuestion(
                    language === 'si'
                      ? `${currentSubject.name.si} ${activeTopic.chapterNumber} වන පරිච්ඡේදය (${activeTopic.title.si} - ${currentStep.title.si}) ගැන විස්තර කරන්න`
                      : language === 'ta'
                      ? `${currentSubject.name.ta} அத்தியாயம் ${activeTopic.chapterNumber} (${activeTopic.title.ta} - ${currentStep.title.ta}) பற்றி விளக்குக`
                      : `Can you explain ${activeTopic.title.en} (${currentStep.title.en}) in Grade 10 ${currentSubject.name.en} Chapter ${activeTopic.chapterNumber}?`
                  )}
                  className="px-2.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1 transition-all flex-shrink-0"
                  title="Ask Tutor about this specific concept"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask Tutor</span>
                </button>
              </div>

              <RichContentRenderer 
                content={currentStep.concept[language]} 
                darkTheme={true} 
              />

              {/* Real World Example Callout */}
              {currentStep.realWorldExample && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Sri Lankan Practical Application:</span>
                  </div>
                  <p className="text-amber-100/90 leading-relaxed text-[11px]">
                    {currentStep.realWorldExample[language]}
                  </p>
                </div>
              )}

              {/* Quick Prompt Generator */}
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">
                  {language === 'si'
                    ? 'මෙම සංකල්පය පිළිබඳ නිතර අසන ප්‍රශ්න:'
                    : language === 'ta'
                    ? 'இக்கோட்பாடு குறித்த அடிக்கடி கேட்கப்படும் வினாக்கள்:'
                    : 'Frequently Asked Questions on This Concept:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    language === 'si'
                      ? `${activeTopic.title.si || activeTopic.title.en} (${currentStep.title.si || currentStep.title.en}) සඳහා සරල උදාහරණයක් දෙන්න`
                      : language === 'ta'
                      ? `${activeTopic.title.ta || activeTopic.title.en} (${currentStep.title.ta || currentStep.title.en}) க்கான எளிய உதாரணத்தை வழங்கவும்`
                      : `Give me a simple example of ${activeTopic.title.en} (${currentStep.title.en})`,
                    language === 'si'
                      ? `අ.පො.ස. සා/පෙළ විභාගයට ${activeTopic.title.si || activeTopic.title.en} වැදගත් වන්නේ ඇයි?`
                      : language === 'ta'
                      ? `க.பொ.த சா/தர பரீட்சைக்கு ${activeTopic.title.ta || activeTopic.title.en} ஏன் முக்கியமானது?`
                      : `Why is ${activeTopic.title.en} important for G.C.E. O/L exams?`,
                    language === 'si'
                      ? `${activeTopic.title.si || activeTopic.title.en} පිළිබඳ විභාග පෙරහුරු ප්‍රශ්නයක් ලබාදෙන්න`
                      : language === 'ta'
                      ? `${activeTopic.title.ta || activeTopic.title.en} தொடர்பான மாதிரிப் பரீட்சை வினா ஒன்றை வழங்கவும்`
                      : `Quiz me with an exam question on ${activeTopic.title.en}`
                  ].map((promptText) => (
                    <button
                      key={promptText}
                      type="button"
                      onClick={() => onAskQuestion(promptText)}
                      className="text-[11px] text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700/80 transition-colors flex items-center gap-1"
                    >
                      <ChevronRight className="w-3 h-3 text-cyan-400" />
                      <span>{promptText}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4.5 Curriculum Deep Dive & Smart Recommendations */}
        {(() => {
          const deepDive = getTopicDeepDive(activeTopic.id, language, activeTopic);
          return (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {language === 'si'
                      ? 'විෂය කරුණු ගැඹුරින් විමසීම & උපදෙස්'
                      : language === 'ta'
                      ? 'ஆழமான வழிகாட்டல் & குறிப்புகள்'
                      : 'Deep Dive & Smart Suggestions'}
                  </span>
                </span>
                <span className="text-[10px] text-cyan-300 font-mono">
                  {language === 'si' ? 'විභාග සාර්ථකත්වයට උපදෙස්' : language === 'ta' ? 'பரீட்சை வெற்றி குறிப்புகள்' : 'Exam Master Tips'}
                </span>
              </div>

              {/* Exam Trap Alert */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed font-medium">
                {deepDive.examTrap}
              </div>

              {/* Interactive Challenge */}
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-100 leading-relaxed font-medium space-y-2">
                <p>{deepDive.challenge}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onAskQuestion(deepDive.verifyPrompt)}
                    className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>
                      {language === 'si' ? 'මගේ පිළිතුර පරීක්ෂා කරන්න' : language === 'ta' ? 'எனது பதிலைச் சரிபார்க்கவும்' : 'Verify My Solution'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onAskQuestion(deepDive.clarifyPrompt)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1"
                  >
                    <span>
                      {language === 'si' ? 'මෙම සංකල්පය තවදුරටත් පැහැදිලි කරන්න' : language === 'ta' ? 'இக்கோட்பாட்டை மேலும் விளக்குங்கள்' : 'Clarify This Concept'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 5. Next Chapters Recommendations */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {language === 'si'
                ? `${currentSubject.name.si || currentSubject.name.en} විෂයේ අනෙකුත් පාඩම්`
                : language === 'ta'
                ? `${currentSubject.name.ta || currentSubject.name.en} பாடத்தின் ஏனைய அத்தியாயங்கள்`
                : `Other Chapters in ${currentSubject.name.en}`}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {subjectTopics
              .filter((t) => t.id !== activeTopic.id)
              .slice(0, 4)
              .map((rec) => (
                <button
                  key={rec.id}
                  type="button"
                  onClick={() => {
                    setActiveStepTab(0);
                    onSelectTopic(rec.id);
                  }}
                  className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition-all flex items-center justify-between text-xs group"
                >
                  <div className="truncate pr-2">
                    <span className="text-[10px] text-cyan-400 font-bold block">
                      Chapter {rec.chapterNumber}
                    </span>
                    <span className="font-semibold text-slate-200 group-hover:text-white truncate block">
                      {rec.title[language]}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
