import type { Subject, Topic, LessonStep, QuizQuestion } from '../types';

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 'science',
    code: 'SCI',
    name: {
      en: 'Science',
      si: 'විද්‍යාව',
      ta: 'அறிவியல்',
    },
    gradeLevel: 'Grades 6–11',
    iconName: 'Atom',
    color: '#0ea5e9',
    accentColor: '#38bdf8',
    gradient: 'from-sky-500 to-cyan-600',
    description: {
      en: 'Biology, Chemistry, Physics, and Environmental Science for Sri Lankan school syllabus.',
      si: 'ජීව විද්‍යාව, රසායන විද්‍යාව, භෞතික විද්‍යාව සහ පරිසර විද්‍යාව.',
      ta: 'உயிரியல், வேதியியல், இயற்பியல் மற்றும் சுற்றுச்சூழல் அறிவியல்.',
    },
    topicsCount: 18,
    masteryPercentage: 68,
  },
  {
    id: 'maths',
    code: 'MTH',
    name: {
      en: 'Mathematics',
      si: 'ගණිතය',
      ta: 'கணிதம்',
    },
    gradeLevel: 'Grades 6–11',
    iconName: 'Calculator',
    color: '#6366f1',
    accentColor: '#818cf8',
    gradient: 'from-indigo-500 to-blue-600',
    description: {
      en: 'Numbers, Algebra, Geometry, Statistics, and Mathematical problem-solving.',
      si: 'සංඛ්‍යා, වීජ ගණිතය, ජ්‍යාමිතිය, සංඛ්‍යානය සහ ගැටළු විසඳීම.',
      ta: 'எண்கள், இயற்கணிதம், வடிவியல், புள்ளியியல் மற்றும் கணிதச் சிக்கல் தீர்வு.',
    },
    topicsCount: 22,
    masteryPercentage: 54,
  },
  {
    id: 'history',
    code: 'HIS',
    name: {
      en: 'History',
      si: 'ඉතිහාසය',
      ta: 'வரலாறு',
    },
    gradeLevel: 'Grades 6–11',
    iconName: 'Landmark',
    color: '#f59e0b',
    accentColor: '#fbbf24',
    gradient: 'from-amber-500 to-orange-600',
    description: {
      en: 'Heritage of Sri Lanka, Ancient hydraulic civilization, and world history.',
      si: 'ශ්‍රී ලාංකේය උරුමය, පුරාණ වාරි ශිෂ්ටාචාරය සහ ලෝක ඉතිහාසය.',
      ta: 'இலங்கையின் பாரம்பரியம், பண்டைய நீரியல் நாகரிகம் மற்றும் உலக வரலாறு.',
    },
    topicsCount: 14,
    masteryPercentage: 80,
  },
  {
    id: 'ict',
    code: 'ICT',
    name: {
      en: 'ICT',
      si: 'තොරතුරු තාක්ෂණය',
      ta: 'தகவல் தொழில்நுட்பம்',
    },
    gradeLevel: 'Grades 6–11',
    iconName: 'Cpu',
    color: '#10b981',
    accentColor: '#34d399',
    gradient: 'from-emerald-500 to-teal-600',
    description: {
      en: 'Algorithms, Computer Systems, Productivity Tools, and Digital Literacy.',
      si: 'ඇල්ගොරිතම, පරිගණක පද්ධති, මෘදුකාංග සහ ඩිජිටල් සාක්ෂරතාව.',
      ta: 'படிமுறை, கணினி அமைப்புகள், பயன்பாட்டு மென்பொருள் மற்றும் டிஜிட்டல் அறிவு.',
    },
    topicsCount: 16,
    masteryPercentage: 72,
  },
  {
    id: 'english',
    code: 'ENG',
    name: {
      en: 'English Language',
      si: 'ඉංග්‍රීසි භාෂාව',
      ta: 'ஆங்கில மொழி',
    },
    gradeLevel: 'Grades 6–11',
    iconName: 'BookOpen',
    color: '#8b5cf6',
    accentColor: '#a78bfa',
    gradient: 'from-violet-500 to-purple-600',
    description: {
      en: 'Grammar, Reading comprehension, Vocabulary, and Conversational skills.',
      si: 'ව්‍යාකරණ, කියවීම් අවබෝධය, වචන මාලාව සහ ලිවීමේ හැකියාව.',
      ta: 'இலக்கணம், வாசிப்புப் புரிதல், சொல்லகராதி மற்றும் எழுத்துத் திறன்.',
    },
    topicsCount: 20,
    masteryPercentage: 65,
  },
  {
    id: 'geography',
    code: 'GEO',
    name: {
      en: 'Geography',
      si: 'භූගෝල විද්‍යාව',
      ta: 'புவியியல்',
    },
    gradeLevel: 'Grades 6–11',
    iconName: 'Globe',
    color: '#0d9488',
    accentColor: '#2dd4bf',
    gradient: 'from-teal-500 to-emerald-600',
    description: {
      en: 'Physical landscapes of Sri Lanka, Climate zones, Rivers, and Global geography.',
      si: 'ශ්‍රී ලංකාවේ භූමි රූප, දේශගුණික කලාප, ගංගා පද්ධති සහ ලෝක භූගෝලය.',
      ta: 'இலங்கையின் நிலப்பரப்பு, காலநிலை மண்டலங்கள், ஆறுகள் மற்றும் உலக புவியியல்.',
    },
    topicsCount: 12,
    masteryPercentage: 45,
  }
];

export const MOCK_TOPICS: Topic[] = [
  {
    id: 'photosynthesis',
    subjectId: 'science',
    chapterNumber: 4,
    grade: 'grade-8',
    title: {
      en: 'Photosynthesis & Plant Processes',
      si: 'ප්‍රභාසංස්ලේෂණය සහ ශාක ක්‍රියාවලි',
      ta: 'ஒளித்தொகுப்பும் தாவர செயல்முறைகளும்',
    },
    description: {
      en: 'How green plants harness solar energy to synthesize glucose and release oxygen.',
      si: 'හරිත ශාක සූර්යාලෝකය භාවිතයෙන් ග්ලූකෝස් නිපදවීම සහ ඔක්සිජන් පිට කිරීම.',
      ta: 'பச்சைத் தாவரங்கள் சூரிய ஒளியைப் பயன்படுத்தி குளுக்கோஸைத் தயாரித்து ஒக்சிசனை வெளியிடும் முறை.',
    },
    lessonsCount: 4,
    completedPercentage: 75,
  },
  {
    id: 'human-respiration',
    subjectId: 'science',
    chapterNumber: 6,
    grade: 'grade-8',
    title: {
      en: 'Human Respiratory System',
      si: 'මිනිසාගේ ශ්වසන පද්ධතිය',
      ta: 'மனித சுவாசத் தொகுதி',
    },
    description: {
      en: 'Organs of respiration, mechanism of breathing, and cellular gas exchange.',
      si: 'ශ්වසන අවයව, ආශ්වාස ප්‍රශ්වාස ක්‍රියාවලිය සහ වායු හුවමාරුව.',
      ta: 'சுவாச உறுப்புகள், சுவாச இயக்கவியல் மற்றும் வாயுப் பரிமாற்றம்.',
    },
    lessonsCount: 3,
    completedPercentage: 40,
  },
  {
    id: 'pythagoras-theorem',
    subjectId: 'maths',
    chapterNumber: 9,
    grade: 'grade-8',
    title: {
      en: 'Pythagoras Theorem',
      si: 'පයිතගරස් ප්‍රමේයය',
      ta: 'பைதகரசு தேற்றம்',
    },
    description: {
      en: 'Geometric properties of right-angled triangles: a² + b² = c².',
      si: 'සෘජුකෝණී ත්‍රිකෝණයක පාද අතර සම්බන්ධය: a² + b² = c².',
      ta: 'செங்கோண முக்கோணங்களின் பண்புகள்: a² + b² = c².',
    },
    lessonsCount: 5,
    completedPercentage: 60,
  },
  {
    id: 'ancient-hydraulics',
    subjectId: 'history',
    chapterNumber: 3,
    grade: 'grade-8',
    title: {
      en: 'Ancient Hydraulic Civilization of Sri Lanka',
      si: 'ශ්‍රී ලංකාවේ පුරාණ වාරි ශිෂ්ටාචාරය',
      ta: 'இலங்கையின் பண்டைய நீரியல் நாகரிகம்',
    },
    description: {
      en: 'Tanks, canals, and bisokotuwa technology of Anuradhapura and Polonnaruwa kingdoms.',
      si: 'අනුරාධපුර සහ පොළොන්නරු යුගයන්හි වැව්, ඇළ මාර්ග සහ බිසෝකොටු තාක්ෂණය.',
      ta: 'அனுராதபுரம், பொலன்னறுவை காலங்களின் குளங்கள் மற்றும் பிசோகொட்டுவ தொழினுட்பம்.',
    },
    lessonsCount: 4,
    completedPercentage: 90,
  },
  {
    id: 'computer-systems-hardware',
    subjectId: 'ict',
    chapterNumber: 1,
    grade: 'grade-8',
    title: {
      en: 'Computer Systems & Hardware Architecture',
      si: 'පරිගණක පද්ධති සහ දෘඪාංග ව්‍යුහය',
      ta: 'கணினி அமைப்புகளும் வன்பொருள் கட்டமைப்பும்',
    },
    description: {
      en: 'Input, processing, output, and secondary storage devices. Understanding system components and specifications.',
      si: 'ආදාන, සැකසුම්, ප්‍රතිදාන සහ ද්විතීයික ආචයන උපාංග. පද්ධති උපාංග සහ තාක්ෂණික පිරිවිතර.',
      ta: 'உள்ளீட்டு, செயலாக்க, வெளியீட்டு மற்றும் சேமிப்பக சாதனங்கள். அமைப்புக் கூறுகளைப் புரிந்துகொள்ளுதல்.',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'algorithms-flowcharts',
    subjectId: 'ict',
    chapterNumber: 2,
    grade: 'grade-8',
    title: {
      en: 'Algorithms, Flowcharts & Problem Solving',
      si: 'ඇල්ගොරිතම, ගැලීම් සටහන් සහ ගැටලු විසඳීම',
      ta: 'படிமுறைகள், பாய்வுப்படங்கள் மற்றும் சிக்கல் தீர்த்தல்',
    },
    description: {
      en: 'Step-by-step instructions, standard flowchart symbols, sequence, selection, and simple loops.',
      si: 'පියවරෙන් පියවර උපදෙස්, සම්මත ගැලීම් සටහන් සංකේත, අනුක්‍රම, තේරීම් සහ සරල පුනරාවර්තන.',
      ta: 'படிமுறை அறிவுறுத்தல்கள், பாய்வுப்படக் குறியீடுகள், வரிசைமுறை மற்றும் எளிய சுழற்சிகள்.',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'productivity-word-spreadsheets',
    subjectId: 'ict',
    chapterNumber: 3,
    grade: 'grade-8',
    title: {
      en: 'Productivity Tools: Word Processing & Spreadsheets',
      si: 'කාර්යාලීය මෘදුකාංග: ලේඛන සැකසුම් සහ පැතුරුම්පත්',
      ta: 'பயன்பாட்டு மென்பொருள்: சொல் செயலாக்கம் மற்றும் விரிதாள்கள்',
    },
    description: {
      en: 'Document formatting, tables, spreadsheet grid, basic formulas (SUM, AVERAGE), and data charts.',
      si: 'ලේඛන හැඩසවි ගැන්වීම, වගු, පැතුරුම්පත් ජාලකය, සරල සූත්‍ර (SUM, AVERAGE) සහ දත්ත ප්‍රස්ථාර.',
      ta: 'ஆவண வடிவமைப்பு, அட்டவணைகள், விரிதாள் கட்டமைப்பு, எளிய சூத்திரங்கள் மற்றும் தரவு வரைபடங்கள்.',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'internet-cybersecurity',
    subjectId: 'ict',
    chapterNumber: 4,
    grade: 'grade-8',
    title: {
      en: 'Internet, Digital Literacy & Cybersecurity',
      si: 'අන්තර්ජාලය, ඩිජිටල් සාක්ෂරතාව සහ සයිබර් ආරක්ෂාව',
      ta: 'இணையம், டிஜிட்டல் அறிவு மற்றும் இணையப் பாதுகாப்பு',
    },
    description: {
      en: 'Web searching techniques, email communication, safe browsing, protecting passwords, and cyber hygiene.',
      si: 'වෙබ් සෙවුම් ක්‍රම, විද්‍යුත් තැපෑල, ආරක්ෂිත අන්තර්ජාල භාවිතය, මුරපද සුරැකීම සහ සයිබර් ආචාරධර්ම.',
      ta: 'இணைய தேடல் முறைகள், மின்னஞ்சல் தொடர்பு, பாதுகாப்பான இணையப் பயன்பாடு மற்றும் கடவுச்சொல் பாதுகாப்பு.',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'history-gr10-ancient-heritage',
    subjectId: 'history',
    chapterNumber: 1,
    grade: 'grade-10',
    title: {
      en: 'Sri Lankan Heritage & Archaeological Sources',
      si: 'ශ්‍රී ලංකාවේ උරුමය සහ පුරාවිද්‍යාත්මක මූලාශ්‍ර',
      ta: 'இலங்கையின் பாரம்பரியமும் தொல்பொருள் மூலாதாரங்களும்',
    },
    description: {
      en: 'Inscriptions, chronicles (Mahavamsa, Dipavamsa), coins, and material evidence of ancient Sri Lankan civilization.',
      si: 'සෙල්ලිපි, වංශකථා (මහාවංශය, දීපවංශය), කාසි සහ පුරාණ ශ්‍රී ලාංකේය ශිෂ්ටාචාරයේ භෞතික සාක්ෂි.',
      ta: 'கல்வெட்டுகள், வரலாற்று நூல்கள் (மகாவம்சம், தீபவம்சம்), நாணயங்கள் மற்றும் தொல்பொருள் சான்றுகள்.',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'history-gr10-hydraulic-society',
    subjectId: 'history',
    chapterNumber: 2,
    grade: 'grade-10',
    title: {
      en: 'Hydraulic Civilization & Polonnaruwa Era',
      si: 'වාරි ශිෂ්ටාචාරය සහ පොළොන්නරු යුගය',
      ta: 'நீரியல் நாகரிகமும் பொலன்னறுவை காலமும்',
    },
    description: {
      en: 'Parakrama Samudraya, Minneriya, canal networks, and the socio-economic structure of the dry zone agrarian society.',
      si: 'පරාක්‍රම සමුද්‍රය, මින්නේරිය, ඇළ මාර්ග පද්ධති සහ වියළි කලාපීය ගොවි සමාජයේ සමාජ-ආර්ථික ව්‍යුහය.',
      ta: 'பராக்கிரம சமுத்திரம், மின்னேரியா, கால்வாய் அமைப்புகள் மற்றும் உலர் வலய விவசாய சமூகம்.',
    },
    lessonsCount: 5,
    completedPercentage: 0,
  },
  {
    id: 'history-gr10-colonial-transitions',
    subjectId: 'history',
    chapterNumber: 3,
    grade: 'grade-10',
    title: {
      en: 'Colonial Encounters & The Kandyan Kingdom',
      si: 'යුරෝපීය ආක්‍රමණ සහ උඩරට රාජධානිය',
      ta: 'ஐரோப்பியர் ஆக்கிரமிப்பும் கண்டி இராச்சியமும்',
    },
    description: {
      en: 'Portuguese, Dutch, and British administrative impact and the resistance of the Kingdom of Kandy.',
      si: 'පෘතුගීසි, ලන්දේසි සහ බ්‍රිතාන්‍ය පාලන බලපෑම සහ උඩරට රාජධානියේ ප්‍රතිරෝධය.',
      ta: 'போர்த்துக்கேயர், டச்சுக்காரர் மற்றும் பிரித்தானியர் ஆட்சிகளின் தாக்கம் மற்றும் கண்டி இராச்சியத்தின் எதிர்ப்பு.',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  }
];

export const TEACH_ME_PHOTOSYNTHESIS_STEPS: LessonStep[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: {
      en: 'What is Photosynthesis?',
      si: 'ප්‍රභාසංස්ලේෂණය යනු කුමක්ද?',
      ta: 'ஒளித்தொகுப்பு என்றால் என்ன?',
    },
    concept: {
      en: 'Photosynthesis is the bio-chemical process by which green plants, algae, and certain bacteria use light energy (normally from the sun) to convert water and carbon dioxide into oxygen and energy-rich glucose.',
      si: 'ප්‍රභාසංස්ලේෂණය යනු හරිත ශාක සූර්යාලෝක ශක්තිය උපයෝගී කරගනිමින් ජලය සහ කාබන් ඩයොක්සයිඩ් සංයෝජනය කර ග්ලූකෝස් සහ ඔක්සිජන් නිපදවන ජෛව රසායනික ක්‍රියාවලියයි.',
      ta: 'ஒளித்தொகுப்பு என்பது பச்சைத் தாவரங்கள் சூரிய ஒளியைப் பயன்படுத்தி நீர் மற்றும் காபனீரொட்சைட்டை குளுக்கோஸ் மற்றும் ஒக்சிசனாக மாற்றும் உயிர்வேதியியல் செயல்முறையாகும்.',
    },
    visualCard: {
      title: 'Solar Energy Conversion',
      diagramType: 'diagram',
      content: 'Light Energy ☀️ + Carbon Dioxide (CO₂) + Water (H₂O) ➔ Glucose (C₆H₁₂O₆) + Oxygen (O₂)',
      caption: 'Energy transformation from solar radiation to chemical food storage in chloroplasts.'
    },
    realWorldExample: {
      en: 'Look at the lush green tea leaves across the central highlands of Nuwara Eliya. Each leaf absorbs sunlight on misty mornings to produce energy that nourishes the tea plant.',
      si: 'නුවරඑළියේ සරුසාර තේ වතුවල හරිත තේ දලු දෙස බලන්න. උදෑසන හිරු එළිය උරාගන්නා සෑම පත්‍රයක්ම තේ පඳුර පෝෂණය කිරීමට මෙම ශක්තිය නිපදවයි.',
      ta: 'நுவரெலியாவின் பசுமையான தேயிலைத் தோட்டங்களைப் பாருங்கள். பனிமூட்டமான காலை வேளையில் சூரிய ஒளியை உறிஞ்சி தேயிலைச் செடிக்கு உணவை உருவாக்குகிறது.',
    },
    checkQuestion: {
      id: 'step-1-q',
      subjectId: 'science',
      topicId: 'photosynthesis',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which primary energy source powers the process of photosynthesis?',
        si: 'ප්‍රභාසංස්ලේෂණ ක්‍රියාවලිය සක්‍රීය කරන මූලික ශක්ති ප්‍රභවය කුමක්ද?',
        ta: 'ஒளித்தொகுப்பு செயல்முறைக்கு சக்தியை வழங்கும் முதன்மையான ஆற்றல் எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Geothermal heat from soil', si: 'පසෙහි භූතාපය', ta: 'மண்ணின் புவிவெப்பம்' } },
        { id: 'opt-2', text: { en: 'Sunlight (Solar radiant energy)', si: 'සූර්යාලෝකය (විකිරණ ශක්තිය)', ta: 'சூரிய ஒளி (கதிர்வீச்சு ஆற்றல்)' } },
        { id: 'opt-3', text: { en: 'Atmospheric wind energy', si: 'වායුගෝලීය සුළං ශක්තිය', ta: 'வளிமண்டல காற்று ஆற்றல்' } },
        { id: 'opt-4', text: { en: 'Sound vibrations from rain', si: 'වැසි ශබ්ද තරංග', ta: 'மழையின் ஒலி அலைகள்' } },
      ],
      correctOptionId: 'opt-2',
      educationalFeedback: {
        en: 'Chloroplasts contain chlorophyll pigments that absorb blue and red light wavelengths from sunlight to energize electron transport.',
        si: 'හරිතප්‍රද වර්ණකය සූර්යාලෝකයේ නිල් සහ රතු ආලෝක කිරණ උරාගෙන ඉලෙක්ට්‍රෝන ප්‍රවාහය සක්‍රීය කරයි.',
        ta: 'குளோரோபில் நிறமி சூரிய ஒளியை உறிஞ்சி ஒளித்தொகுப்புக்குத் தேவையான சக்தியை வழங்குகிறது.',
      },
      syllabusReference: 'Sri Lankan Grade 8 Science — Chapter 4: Plant Nutrition and Photosynthesis',
    }
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: {
      en: 'The Essential Ingredients & The Chemical Equation',
      si: 'අත්‍යවශ්‍ය සාධක සහ රසායනික සමීකරණය',
      ta: 'அத்தியாவசிய காரணிகளும் இரசாயனச் சமன்பாடும்',
    },
    concept: {
      en: 'Plants require four key components: Carbon dioxide (absorbed through stomata), Water (absorbed by roots via osmosis), Sunlight, and Chlorophyll (inside green chloroplasts).',
      si: 'ශාක සඳහා සාධක හතරක් අවශ්‍ය වේ: පත්‍ර රන්ධ්‍ර හරහා කාබන් ඩයොක්සයිඩ්, මුල් මඟින් ජලය, සූර්යාලෝකය සහ පත්‍ර සෛල තුළ ඇති හරිතප්‍රද.',
      ta: 'தாவரங்களுக்கு நான்கு காரணிகள் தேவை: இலைவாய்கள் மூலம் காபனீரொட்சைட்டு, வேர்கள் மூலம் நீர், சூரிய ஒளி, மற்றும் பச்சையம்.',
    },
    visualCard: {
      title: 'Balanced Chemical Equation',
      diagramType: 'formula',
      content: '6 CO₂ + 6 H₂O  ──(Light + Chlorophyll)──➔  C₆H₁₂O₆ + 6 O₂',
      caption: '6 molecules of Carbon Dioxide + 6 molecules of Water yield 1 molecule of Glucose + 6 molecules of Oxygen.'
    },
    realWorldExample: {
      en: 'In paddy fields across Kurunegala and Polonnaruwa, rice plants take in water from irrigation channels and absorb carbon dioxide from the air to produce rice grains.',
      si: 'කුරුණෑගල සහ පොළොන්නරුවේ කුඹුරුවල ගොයම් ගස් වාරි ඇළ මාර්ගවලින් ජලය ලබාගෙන වී කරල් පිරවීම සඳහා ප්‍රභාසංස්ලේෂණය සිදු කරයි.',
      ta: 'குருநாகல் மற்றும் பொலன்னறுவை நெல் வயல்களில், நெற்பயிர்கள் நீரையும் காபனீரொட்சைட்டையும் உறிஞ்சி தானியங்களை உருவாக்குகின்றன.',
    },
    checkQuestion: {
      id: 'step-2-q',
      subjectId: 'science',
      topicId: 'photosynthesis',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Through which microscopic leaf structures does carbon dioxide enter plant leaves?',
        si: 'ශාක පත්‍ර තුළට කාබන් ඩයොක්සයිඩ් ඇතුළු වන්නේ කුමන ක්ෂුද්‍ර ව්‍යුහ හරහාද?',
        ta: 'காபனீரொட்சைட்டு எந்த நுண்ணிய இலை அமைப்புகளின் வழியாக உட்செல்லுகிறது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Stomata (Guard cells)', si: 'පත්‍ර රන්ධ්‍ර (පාලක සෛල)', ta: 'இலைவாய்கள் (காப்பணுக்கள்)' } },
        { id: 'opt-2', text: { en: 'Root hairs', si: 'මූලකේශ', ta: 'வேர் மயிர்கள்' } },
        { id: 'opt-3', text: { en: 'Xylem vessels', si: 'දැව පටක නාල', ta: 'காழ்க்கலங்கள்' } },
        { id: 'opt-4', text: { en: 'Flower petals', si: 'මල් පෙති', ta: 'பூவிதழ்கள்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Stomata are tiny openings located predominantly on the lower epidermis of leaves, regulated by guard cells to permit gas exchange while minimizing transpiration.',
        si: 'පත්‍ර රන්ධ්‍ර යනු පත්‍රයේ යටි අපිචර්මයේ පිහිටි කුඩා විවර වන අතර, වායු හුවමාරුව පාලනය කරන්නේ පාලක සෛල මඟිනි.',
        ta: 'இலைவாய்கள் இலைகளின் அடிப்பகுதியில் காணப்படும் சிறிய துளைகள் ஆகும், இவை வாயுப் பரிமாற்றத்தை ஒழுங்குபடுத்துகின்றன.',
      },
      syllabusReference: 'Sri Lankan Grade 8 Science — Chapter 4: Plant Nutrition and Photosynthesis',
    }
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: {
      en: 'What Happens to the Products (Glucose & Oxygen)?',
      si: 'නිපදවෙන ඵල (ග්ලූකෝස් සහ ඔක්සිජන්) වලට කුමක් සිදුවේද?',
      ta: 'உற்பத்திப் பொருட்களுக்கு (குளுக்கோஸ் & ஒக்சிசன்) என்ன நடக்கிறது?',
    },
    concept: {
      en: '1. Glucose is converted to starch for storage in roots, stems, and fruits (like sweet potatoes or jackfruit).\n2. Oxygen is released into the atmosphere, providing vital breathable air for animals and humans!',
      si: '1. ග්ලූකෝස් පිෂ්ඨය බවට පත්කර අල, කඳන් හෝ ඵලදාවල (කොස්, අල වර්ග) ගබඩා කෙරේ.\n2. ඔක්සිජන් වාතයට මුදාහැර මිනිසුන් සහ සතුන්ගේ හුස්ම ගැනීම සඳහා උපකාරී වේ!',
      ta: '1. குளுக்கோஸ் மாப்பொருளாக மாற்றப்பட்டு வேர்கள், தண்டுகள் மற்றும் பழங்களில் சேமிக்கப்படுகிறது.\n2. ஒக்சிசன் வளிமண்டலத்தில் வெளியிடப்பட்டு மனிதர்களுக்கும் விலங்குகளுக்கும் பயன்படுகிறது!',
    },
    visualCard: {
      title: 'Oxygen & Storage Flow',
      diagramType: 'infographic',
      content: 'Glucose ➔ Converted to Starch (Storage) & Cellulose (Plant Cell Walls) | Oxygen ➔ Diffuses out for human & animal respiration',
      caption: 'The mutual balance of oxygen and carbon dioxide between plants and living organisms.'
    },
    realWorldExample: {
      en: 'When you eat a sweet banana from Embilipitiya or manioc from Jaffna, you are eating stored starch originally synthesized through photosynthesis!',
      si: 'ඇඹිලිපිටියේ කෙසෙල් ගෙඩියක් හෝ යාපනයේ මඤ්ඤොක්කා අලයක් අනුභව කරන විට, ඔබ ආහාරයට ගන්නේ ප්‍රභාසංස්ලේෂණයෙන් නිපදවූ පිෂ්ඨයයි!',
      ta: 'நீங்கள் அம்பிலாந்தோட்டையின் வாழைப்பழத்தையோ அல்லது யாழ்ப்பாணத்தின் மரவள்ளிக் கிழங்கையோ சாப்பிடும் போது, ஒளித்தொகுப்பால் உருவான மாப்பொருளையே உட்கொள்கிறீர்கள்!',
    },
    checkQuestion: {
      id: 'step-3-q',
      subjectId: 'science',
      topicId: 'photosynthesis',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'In which form do plants primarily store excess glucose produced by photosynthesis?',
        si: 'ප්‍රභාසංස්ලේෂණයෙන් නිපදවන අතිරික්ත ග්ලූකෝස් ශාක තුළ ප්‍රධාන වශයෙන් ගබඩා වන්නේ කුමන ස්වරූපයෙන්ද?',
        ta: 'ஒளித்தொகுப்பினால் உருவாகும் அதிகப்படியான குளுக்கோஸ் தாவரங்களில் எவ்வாறு சேமிக்கப்படுகிறது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Starch (Polysaccharide)', si: 'පිෂ්ඨය', ta: 'மாப்பொருள்' } },
        { id: 'opt-2', text: { en: 'Atmospheric Nitrogen', si: 'නයිට්‍රජන් වායුව', ta: 'நைதரசன்' } },
        { id: 'opt-3', text: { en: 'Pure Calcium carbonate', si: 'කැල්සියම් කාබනේට්', ta: 'கல்சியம் காபனேற்று' } },
        { id: 'opt-4', text: { en: 'Liquid Petroleum', si: 'ඛනිජ තෙල්', ta: 'பெட்ரோலியம்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Glucose is water-soluble, so plants convert it into insoluble starch so it can be stored compactly without affecting the cell\'s osmotic balance.',
        si: 'ග්ලූකෝස් ජලයේ දියවන බැවින්, සෛලවල ආස්‍රැති පීඩනය ආරක්ෂා කරගනිමින් සංයුක්තව ගබඩා කිරීමට එය පිෂ්ඨය බවට පත් කරයි.',
        ta: 'குளுக்கோஸ் நீரில் கரையக்கூடியது என்பதால், தாவரங்கள் அதை கரையாத மாப்பொருளாக மாற்றி சேமிக்கின்றன.',
      },
      syllabusReference: 'Sri Lankan Grade 8 Science — Chapter 4: Plant Nutrition and Photosynthesis',
    }
  }
];

export const MOCK_PRACTICE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'pq-sci-1',
    subjectId: 'science',
    topicId: 'photosynthesis',
    grade: 'grade-8',
    examCategory: 'ol',
    isDemonstrationSample: true,
    questionText: {
      en: 'A student placed a healthy potted plant in the dark for 48 hours. When testing a leaf with iodine solution, what expected observation demonstrates destarching?',
      si: 'සිසුවෙකු සරුසාර ශාකයක් පැය 48ක් අඳුරු කාමරයක තැබීය. අයඩින් ද්‍රාවණයෙන් පරීක්ෂා කළ විට පත්‍රයේ පිෂ්ඨය ඉවත්වී ඇති බව පෙන්වන නිරීක්ෂණය කුමක්ද?',
      ta: 'ஒரு மாணவர் ஒரு தாவரத்தை 48 மணிநேரம் இருட்டில் வைத்தார். அயடீன் கரைசலைக் கொண்டு இலையை சோதிக்கும் போது மாப்பொருள் அகற்றப்பட்டதைக் காட்டும் அவதானிப்பு யாது?',
    },
    options: [
      { id: 'a', text: { en: 'Leaf turns dark blue/black', si: 'පත්‍රය තද නිල්/කළු පැහැයට හැරේ', ta: 'இலை அடர் நீலம்/கருப்பாக மாறும்' } },
      { id: 'b', text: { en: 'Leaf retains pale yellow/brown iodine color (no blue-black change)', si: 'පත්‍රය අයඩින්හි ලා දුඹුරු පැහැයම පවතී (නිල්-කළු පැහැයක් නොගනී)', ta: 'அயடீனின் வெளிர் பழுப்பு நிறமே இருக்கும் (நீல-கருப்பு மாற்றம் இல்லை)' } },
      { id: 'c', text: { en: 'Leaf dissolves into bubbling gas', si: 'පත්‍රය වායුවක් බවට දියවී යයි', ta: 'இலை வாயுவாகக் கரையும்' } },
      { id: 'd', text: { en: 'Leaf turns bright fluorescent red', si: 'පත්‍රය දීප්තිමත් රතු පැහැයට හැරේ', ta: 'இலை பிரகாசமான சிவப்பு நிறமாக மாறும்' } },
    ],
    correctOptionId: 'b',
    educationalFeedback: {
      en: 'In the dark, photosynthesis halts while respiration continues, utilizing stored starch. Iodine solution only turns blue-black in the presence of starch.',
      si: 'අඳුරේදී ප්‍රභාසංස්ලේෂණය නතර වන නමුත් ශ්වසනය සඳහා ගබඩා කර තිබූ පිෂ්ඨය වැය වේ. පිෂ්ඨය නොමැති විට අයඩින් ද්‍රාවණය දුඹුරු පැහැයෙන්ම පවතී.',
      ta: 'இருட்டில் ஒளித்தொகுப்பு நடைபெறாது. சேமிக்கப்பட்ட மாப்பொருள் சுவாசித்தலுக்கு பயன்படுத்தப்படுவதால், அயடீன் நீல-கருப்பாக மாறாமல் பழுப்பு நிறமாகவே இருக்கும்.',
    },
    syllabusReference: 'Sri Lankan G.C.E. O/L Science Practice — Plant Physiology & Starch Testing',
  },
  {
    id: 'pq-math-1',
    subjectId: 'maths',
    topicId: 'pythagoras-theorem',
    grade: 'grade-8',
    examCategory: 'ol',
    isDemonstrationSample: true,
    questionText: {
      en: 'In a right-angled triangle ABC (with right angle at B), side AB = 6 cm and side BC = 8 cm. What is the length of hypotenuse AC?',
      si: 'B හි සෘජුකෝණය පිහිටි ABC සෘජුකෝණී ත්‍රිකෝණයේ AB = 6 cm ද, BC = 8 cm ද වේ. කර්ණය වන AC හි දිග කීයද?',
      ta: 'செங்கோண முக்கோணம் ABC இல் (B இல் செங்கோணம்), AB = 6 cm மற்றும் BC = 8 cm எனின், செம்பக்கம் AC இன் நீளம் யாது?',
    },
    options: [
      { id: 'a', text: { en: '14 cm', si: '14 cm', ta: '14 cm' } },
      { id: 'b', text: { en: '10 cm', si: '10 cm', ta: '10 cm' } },
      { id: 'c', text: { en: '12 cm', si: '12 cm', ta: '12 cm' } },
      { id: 'd', text: { en: '48 cm', si: '48 cm', ta: '48 cm' } },
    ],
    correctOptionId: 'b',
    educationalFeedback: {
      en: 'Using Pythagoras theorem: AC² = AB² + BC² = 6² + 8² = 36 + 64 = 100. Thus AC = √100 = 10 cm.',
      si: 'පයිතගරස් ප්‍රමේයය අනුව: AC² = AB² + BC² = 6² + 8² = 36 + 64 = 100. එබැවින් AC = √100 = 10 cm වේ.',
      ta: 'பைதகரசு தேற்றப்படி: AC² = AB² + BC² = 6² + 8² = 36 + 64 = 100. ஆகவே AC = √100 = 10 cm.',
    },
    syllabusReference: 'Sri Lankan Grade 8 Mathematics — Chapter 9: Pythagoras Theorem and Pythagorean Triples',
  },
  {
    id: 'pq-hist-1',
    subjectId: 'history',
    topicId: 'ancient-hydraulics',
    grade: 'grade-8',
    examCategory: 'general',
    isDemonstrationSample: true,
    questionText: {
      en: 'Which ingenious ancient Sri Lankan engineering invention controlled water pressure and regulated outflow through sluice gates in major reservoir bunds?',
      si: 'පුරාණ ශ්‍රී ලංකාවේ මහා වැව් බැමි හරහා ජල පීඩනය පාලනය කරමින් ජලය පිටකිරීම විධිමත් කළ විශිෂ්ට ඉංජිනේරු නිර්මාණය කුමක්ද?',
      ta: 'பண்டைய இலங்கையில் பாரிய குளங்களிலிருந்து நீரின் அழுத்தத்தைக் கட்டுப்படுத்தி நீர் வெளியேற்றத்தை ஒழுங்குபடுத்திய அற்புதமான கண்டுபிடிப்பு எது?',
    },
    options: [
      { id: 'a', text: { en: 'Bisokotuwa (Cistern sluice)', si: 'බිසෝකොටුව', ta: 'பிசோகொட்டுவ (மதகு அமைப்பு)' } },
      { id: 'b', text: { en: 'Ralapanawa', si: 'රළපනාව', ta: 'அலைதாங்கி (ரலபனாவ)' } },
      { id: 'c', text: { en: 'Pitavana', si: 'පිටවාන', ta: 'வான்பாயும் வழி' } },
      { id: 'd', text: { en: 'Sorowwa door', si: 'සොරොව් දොර', ta: 'மதகுக் கதவு' } },
    ],
    correctOptionId: 'a',
    educationalFeedback: {
      en: 'The Bisokotuwa (cistern sluice) was invented in Sri Lanka around the 3rd century BCE to dissipate enormous water pressure inside deep reservoirs before releasing water into irrigation canals.',
      si: 'බිසෝකොටුව යනු ක්‍රි.පූ. 3 වන සියවසේදී ශ්‍රී ලංකාවේ බිහිවූ අගනා තාක්ෂණයක් වන අතර එමඟින් ගැඹුරු වැව්වල අධික ජල පීඩනය සමනය කර ආරක්ෂිතව ඇළ මාර්ගවලට ජලය මුදාහරින ලදී.',
      ta: 'பிசோகொட்டுவ என்பது கி.மு. 3 ஆம் நூற்றாண்டில் இலங்கையில் கண்டுபிடிக்கப்பட்ட ஒரு தனித்துவமான நீரியல் தொழினுட்பமாகும்.',
    },
    syllabusReference: 'Sri Lankan Grade 8 History — Chapter 3: Ancient Hydraulic Civilization and Water Engineering',
  }
];

export const TEACH_ME_HARDWARE_STEPS: LessonStep[] = [
  {
    id: 'hw-step-1',
    stepNumber: 1,
    title: {
      en: 'Computer System Architecture & Components',
      si: 'පරිගණක පද්ධති ව්‍යුහය සහ ප්‍රධාන උපාංග',
      ta: 'கணினி அமைப்புக் கட்டமைப்பும் பிரதான கூறுகளும்',
    },
    concept: {
      en: 'A computer system operates on the Input-Process-Output-Storage (IPOS) model. The Central Processing Unit (CPU) interprets instructions, performs calculations, and manages data flow.',
      si: 'පරිගණක පද්ධතියක් ආදානය-සැකසුම-ප්‍රතිදානය-ආචයනය (IPOS) ආකෘතිය මත ක්‍රියාත්මක වේ. මධ්‍ය සැකසුම් ඒකකය (CPU) උපදෙස් විශ්ලේෂණය කර ගණනය කිරීම් සිදු කරයි.',
      ta: 'கணினி அமைப்பு உள்ளீடு-செயலாக்கம்-வெளியீடு-சேமிப்பகம் (IPOS) மாதிரியில் இயங்குகிறது. மத்திய செயலாக்கப் பிரிவு (CPU) அறிவுறுத்தல்களைச் செயல்படுத்துகிறது.',
    },
    visualCard: {
      title: 'IPOS Processing Cycle',
      diagramType: 'diagram',
      content: 'Input (Keyboard/Mouse) ➔ CPU (Control Unit + ALU) ➔ Output (Monitor/Printer) | Storage (RAM & SSD)',
      caption: 'Data flows into the CPU for processing and registers results to memory and output devices.'
    },
    realWorldExample: {
      en: 'In school computer labs across Sri Lanka, typing on the keyboard sends keystroke signals to the CPU, which instantly displays Sinhala, Tamil, or English characters on the screen.',
      si: 'පාසල් පරිගණක විද්‍යාගාරවල යතුරුපුවරුවෙන් ටයිප් කරන අකුරු CPU මඟින් තත්පරයෙන් පංගුවකින් තිරය මත ප්‍රදර්ශනය කරයි.',
      ta: 'பாடசாலை கணினி ஆய்வகங்களில் விசைப்பலகை மூலம் தட்டச்சு செய்யப்படும் தரவுகள் CPU இனால் உடனடியாக திரையில் காட்டப்படுகின்றன.',
    },
    checkQuestion: {
      id: 'hw-q1',
      subjectId: 'ict',
      topicId: 'computer-systems-hardware',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which component inside the CPU is responsible for carrying out mathematical and logical comparisons?',
        si: 'CPU තුළ ගණිතමය සහ තාර්කික සංසන්දනයන් සිදුකරන ප්‍රධාන ඒකකය කුමක්ද?',
        ta: 'CPU இல் கணித மற்றும் தர்க்கரீதியான ஒப்பீடுகளைச் செய்யப் பொறுப்பான கூறு எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Arithmetic Logic Unit (ALU)', si: 'ගණිත හා තාර්කික ඒකකය (ALU)', ta: 'கணித மற்றும் தர்க்க அலகு (ALU)' } },
        { id: 'opt-2', text: { en: 'Power Supply Unit (PSU)', si: 'විදුලි සැපයුම් ඒකකය (PSU)', ta: 'மின் விநியோக அலகு (PSU)' } },
        { id: 'opt-3', text: { en: 'Cooling Heat Sink', si: 'තාප අපනයන විදුලි පංකාව', ta: 'குளிரூட்டும் விசிறி' } },
        { id: 'opt-4', text: { en: 'Optical Disc Drive', si: 'ප්‍රකාශ තැටි ධාවකය', ta: 'ஒளியியல் வட்டு இயக்கி' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The ALU performs all basic arithmetic calculations (addition, subtraction) and logical decisions (AND, OR, NOT, comparisons).',
        si: 'ALU මඟින් එකතු කිරීම්, අඩුකිරීම් වැනි ගණිතමය ක්‍රියා සහ තාර්කික සංසන්දනයන් සිදුකරනු ලබයි.',
        ta: 'ALU அனைத்து அடிப்படை கணித மற்றும் தர்க்கரீதியான செயல்பாடுகளையும் நிறைவேற்றுகிறது.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 1: Computer Systems & Hardware Architecture',
    }
  },
  {
    id: 'hw-step-2',
    stepNumber: 2,
    title: {
      en: 'Primary Memory (RAM) vs Secondary Storage (SSD/HDD)',
      si: 'ප්‍රාථමික මතකය (RAM) සහ ද්විතීයික ආචයනය (SSD/HDD)',
      ta: 'முதன்மை நினைவகம் (RAM) மற்றும் இரண்டாம் நிலை சேமிப்பகம் (SSD/HDD)',
    },
    concept: {
      en: 'RAM (Random Access Memory) is high-speed volatile working memory: its contents are lost when power is switched off. Secondary storage (SSD, HDD) is non-volatile and preserves files permanently.',
      si: 'RAM යනු අධිවේගී තාවකාලික (volatile) මතකයකි. විදුලිය විසන්ධි වූ විට එහි ඇති දත්ත මැකී යයි. ද්විතීයික ආචයනය (SSD, HDD) ස්ථිරව ගොනු සුරකියි.',
      ta: 'RAM என்பது அதிவேக தற்காலிக நினைவகம் ஆகும். மின்சாரம் அணைக்கப்படும் போது இதன் தரவுகள் அழியும். இரண்டாம் நிலை சேமிப்பகம் நிரந்தரமாக தரவுகளைப் பாதுகாக்கிறது.',
    },
    visualCard: {
      title: 'Memory Hierarchy Comparison',
      diagramType: 'infographic',
      content: 'CPU Cache (Ultra Fast) ➔ RAM (Fast, Volatile) ➔ NVMe/SSD (Fast, Persistent) ➔ HDD (Capacity)',
      caption: 'Programs must be loaded into RAM to execute, but must be saved to SSD/HDD to persist.'
    },
    realWorldExample: {
      en: 'When writing an assignment in Word or LibreOffice, if the power suddenly goes out before clicking Save, unsaved changes in RAM disappear, while previously saved files on the SSD remain safe.',
      si: 'ලිපියක් ටයිප් කරද්දී Save කිරීමට පෙර විදුලිය විසන්ධි වුවහොත් RAM හි තිබූ නොසුරැකි වෙනස්කම් මැකී යයි.',
      ta: 'Word ஆவணத்தில் தட்டச்சு செய்யும் போது சேமிக்காமல் மின்சாரம் துண்டிக்கப்பட்டால் RAM இல் உள்ள தரவு அழியும்.',
    },
    checkQuestion: {
      id: 'hw-q2',
      subjectId: 'ict',
      topicId: 'computer-systems-hardware',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which of the following memory types is volatile and loses all stored data when electricity is cut off?',
        si: 'විදුලිය ඇනහිටි විටක එහි ඇති සියලු දත්ත ක්ෂණිකව මැකී යන විචල්‍ය මතකය කුමක්ද?',
        ta: 'மின்சாரம் துண்டிக்கப்படும் போது சேமிக்கப்பட்ட தரவுகளை இழக்கும் தற்காலிக நினைவகம் எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'RAM (Random Access Memory)', si: 'RAM (සසම්භාවී ප්‍රවේශ මතකය)', ta: 'RAM (நேரடி அணுகல் நினைவகம்)' } },
        { id: 'opt-2', text: { en: 'Solid State Drive (SSD)', si: 'SSD ධාවකය', ta: 'திட நிலை இயக்கி (SSD)' } },
        { id: 'opt-3', text: { en: 'USB Flash Drive', si: 'USB මතක පෑන', ta: 'USB நினைவகம்' } },
        { id: 'opt-4', text: { en: 'ROM (Read Only Memory)', si: 'ROM මතකය', ta: 'வாசிக்க மட்டும் நினைவகம் (ROM)' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'RAM requires electrical charge to maintain its memory cells. When power cuts, all current data in RAM is cleared.',
        si: 'RAM මතක සෛල පවත්වා ගැනීමට විදුලිය අවශ්‍ය බැවින් විදුලිය විසන්ධි වූ විට එහි දත්ත මැකී යයි.',
        ta: 'RAM மின்சாரம் இருக்கும் போது மட்டுமே தரவைத் தக்கவைத்துக் கொள்ளும் தற்காலிக நினைவகம் ஆகும்.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 1: Computer Systems & Hardware Architecture',
    }
  },
  {
    id: 'hw-step-3',
    stepNumber: 3,
    title: {
      en: 'System Ports, Connectivity & Modern Storage',
      si: 'පද්ධති තොටු (Ports), සම්බන්ධකතා සහ නවීන ආචයනය',
      ta: 'தொகுப்புத் துறைகள் (Ports), இணைப்பு மற்றும் நவீன சேமிப்பகம்',
    },
    concept: {
      en: 'Modern computers communicate through high-speed interfaces: USB-C for universal data and charging, HDMI for high-definition video and digital audio, and Solid State Drives (SSDs) utilizing NAND flash without moving parts.',
      si: 'නවීන පරිගණක USB-C, HDMI සහ යාන්ත්‍රික චලනයන් රහිත NAND ෆ්ලෑෂ් තාක්ෂණය සහිත SSD ආචයන භාවිත කරයි.',
      ta: 'நவீன கணினிகள் USB-C, HDMI மற்றும் அசையும் பாகங்கள் இல்லாத NAND ஃபிளாஷ் நினைவகத்தைக் கொண்ட SSD சேமிப்பகங்களைப் பயன்படுத்துகின்றன.',
    },
    visualCard: {
      title: 'Standard External Interfaces',
      diagramType: 'diagram',
      content: 'USB-C (Fast Data/Charging) | HDMI (Digital Video & Multi-channel Audio) | RJ-45 (Ethernet LAN)',
      caption: 'Direct connection ports for modern monitors, networks, and external peripherals.'
    },
    realWorldExample: {
      en: 'Connecting a teacher\'s laptop to the smart television or projector in your school classroom uses an HDMI cable to stream both high-definition video and lesson sound together.',
      si: 'පාසල් පන්ති කාමරයේ Smart TV තිරයට ගුරුතුමාගේ ලැප්ටොප් පරිගණකය සම්බන්ධ කිරීමට HDMI කේබලයක් භාවිත කරයි.',
      ta: 'பாடசாலை ஸ்மார்ட் திரையுடன் ஆசிரியரின் மடிக்கணினியை இணைக்க HDMI கேபிள் பயன்படுத்தப்படுகிறது.',
    },
    checkQuestion: {
      id: 'hw-q3',
      subjectId: 'ict',
      topicId: 'computer-systems-hardware',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which interface port transmits uncompressed digital high-definition video and multi-channel audio through a single cable?',
        si: 'තනි කේබලයක් මඟින් උසස් තත්ත්වයේ ඩිජිටල් රූප සහ හඬ එකවර සම්ප්‍රේෂණය කරන තොට කුමක්ද?',
        ta: 'ஒரே கேபிள் மூலம் உயர் வரையறை வீடியோ மற்றும் ஒலியை கடத்தும் துறை எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'HDMI Port', si: 'HDMI තොට', ta: 'HDMI துறை' } },
        { id: 'opt-2', text: { en: 'Legacy VGA Port', si: 'පැරණි VGA තොට', ta: 'VGA துறை' } },
        { id: 'opt-3', text: { en: 'Serial COM Port', si: 'COM තොට', ta: 'COM துறை' } },
        { id: 'opt-4', text: { en: 'PS/2 Port', si: 'PS/2 තොට', ta: 'PS/2 துறை' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'HDMI (High-Definition Multimedia Interface) combines video and multi-channel audio into a single digital link.',
        si: 'HDMI මඟින් රූප සහ හඬ සංඥා දෙකම තනි ඩිජිටල් මාර්ගයකින් උසස් තත්ත්වයෙන් සම්ප්‍රේෂණය කරයි.',
        ta: 'HDMI ஒரே டிஜிட்டல் இணைப்பு மூலம் உயர்தர வீடியோ மற்றும் ஆடியோ இரண்டையும் கடத்துகிறது.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 1: Computer Systems & Hardware Architecture',
    }
  }
];

export const TEACH_ME_HYDRAULICS_STEPS: LessonStep[] = [
  {
    id: 'hyd-step-1',
    stepNumber: 1,
    title: {
      en: 'The Cascading Tank System (Ellangawa)',
      si: 'එල්ලංගා වැව් පද්ධතිය (Cascading Tanks)',
      ta: 'தொடர் குள அமைப்பு (எல்லங்காவ முறை)',
    },
    concept: {
      en: 'The cascading tank system (Ellangawa) is a unique ancient Sri Lankan watershed management innovation. Interconnected small, medium, and large reservoirs trap seasonal monsoon water and reuse runoff sequentially across the dry zone terrain.',
      si: 'එල්ලංගා වැව් පද්ධතිය යනු ශ්‍රී ලංකාවේ වියළි කලාපයේ ජල පෝෂක කළමනාකරණය සඳහා බිහිවූ අසමසම තාක්ෂණයකි. එකිනෙකට සම්බන්ධ වැව් මාලාවක් මඟින් වැසි ජලය රැස්කර ක්‍රමානුකූලව නැවත නැවත භාවිතයට ගනී.',
      ta: 'எல்லங்காவ என்பது உலர் வலய நீரேந்து பகுதிகளை நிர்வகிக்க பண்டைய இலங்கையில் உருவாக்கப்பட்ட தனித்துவமான குளத் தொடர் அமைப்பாகும்.',
    },
    visualCard: {
      title: 'Cascade Flow Model',
      diagramType: 'diagram',
      content: 'Watershed Rain ➔ Kuluwewa (Silt Trap) ➔ Village Tank (Gama Wewa) ➔ Paddy Fields ➔ Lower Cascade',
      caption: 'Gravity-driven water recycling preventing soil salinity and preserving groundwater.'
    },
    realWorldExample: {
      en: 'Across Anuradhapura and Polonnaruwa, hundreds of ancient tank cascades continue to provide irrigation for paddy cultivation and drinking water for village ecosystems.',
      si: 'අනුරාධපුර සහ පොළොන්නරු දිස්ත්‍රික්කවල අදටත් කුඹුරු ගොවිතැනට සහ ගම්මානවලට ජලය සපයන්නේ මෙම එල්ලංගා වැව් පද්ධතියයි.',
      ta: 'அனுராதபுரம் மற்றும் பொலன்னறுவை மாவட்டங்களில் இன்றும் நெற்செய்கைக்கு இந்த எல்லங்காவ குளங்களே நீரை வழங்குகின்றன.',
    },
    checkQuestion: {
      id: 'hyd-q1',
      subjectId: 'history',
      topicId: 'ancient-hydraulics',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'What was the primary function of the "Kuluwewa" (upper silt tank) in a cascading tank ecosystem?',
        si: 'එල්ලංගා වැව් පද්ධතියක ඉහළින්ම පිහිටි "කුළු වැවේ" ප්‍රධාන කාර්යය කුමක්ද?',
        ta: 'எல்லங்காவ அமைப்பில் மிக உயரத்தில் உள்ள "குளுவெவ"வின் பிரதான பணி என்ன?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Trapping silt and sediment before water reaches the main village tank', si: 'ප්‍රධාන වැවට රොන්මඩ ගලා ඒම වළක්වා රොන්මඩ රඳවා ගැනීම', ta: 'வண்டல் மற்றும் சேற்றைத் தடுத்து நிறுத்துதல்' } },
        { id: 'opt-2', text: { en: 'Commercial fish breeding for coastal ports', si: 'වරාය සඳහා මත්ස්‍ය බෝකිරීම', ta: 'வணிக மீன் வளர்ப்பு' } },
        { id: 'opt-3', text: { en: 'Generating kinetic watermill power', si: 'දියමෝල් ක්‍රියාත්මක කිරීම', ta: 'ஆலைகளை இயக்குதல்' } },
        { id: 'opt-4', text: { en: 'Bathing royal war elephants exclusively', si: 'රාජකීය ඇතුන් නැහැවීම සඳහා පමණක්', ta: 'யானைகளைக் குளிப்பாட்டுதல்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The Kuluwewa traps soil erosion and organic debris flowing from upstream forests, preventing the main irrigation tank from silting up.',
        si: 'කුළු වැව මඟින් ඉහළ වනාන්තරවලින් ගලා එන රොන්මඩ රඳවාගෙන පහළ ප්‍රධාන ගම් වැව ගොඩවීම වළක්වයි.',
        ta: 'குளுவெவ காடுகளிலிருந்து அடித்து வரப்படும் வண்டலைத் தடுத்து கீழ் குளங்கள் தூர்ந்துபோவதைத் தடுக்கிறது.',
      },
      syllabusReference: 'Sri Lankan Grade 8 History — Chapter 3: Ancient Hydraulic Civilization',
    }
  },
  {
    id: 'hyd-step-2',
    stepNumber: 2,
    title: {
      en: 'The Bisokotuwa: Cistern Sluice Innovation',
      si: 'බිසෝකොටුව: ලෝක ප්‍රකට වාරි තාක්ෂණික නිර්මාණය',
      ta: 'பிசோகொட்டுவ: நீரியல் தொழினுட்பப் புரட்சி',
    },
    concept: {
      en: 'Invented around the 3rd century BCE, the Bisokotuwa is a rectangular stone cistern chamber constructed inside the reservoir bund. It dissipates the intense water pressure of deep lakes before water is safely released into stone conduits.',
      si: 'ක්‍රි.පූ. 3 වන සියවසේදී පමණ බිහිවූ බිසෝකොටුව යනු වැව් බැම්ම තුළ ඉදිකළ සෘජුකෝණාස්‍රාකාර ගල් කුටීරයකි. එය ගැඹුරු වැව්වල අධික ජල පීඩනය බිඳ හෙළා පාලනයකින් යුතුව සොරොව්වෙන් ජලය මුදාහරියි.',
      ta: 'கி.மு. 3 ஆம் நூற்றாண்டில் கண்டுபிடிக்கப்பட்ட பிசோகொட்டுவ என்பது குளக்கட்டின் உள்ளே அமைக்கப்பட்ட ஒரு கல் தொட்டி அறை ஆகும்.',
    },
    visualCard: {
      title: 'Bisokotuwa Pressure Dissipation',
      diagramType: 'diagram',
      content: 'High-Pressure Lake Water ➔ Enters Stone Chamber (Bisokotuwa) ➔ Velocity Dissipated ➔ Smooth Low-Pressure Canal Flow',
      caption: 'Prevented reservoir breaches and allowed dams exceeding 40 feet in height to endure for centuries.'
    },
    realWorldExample: {
      en: 'Historian Henry Parker recorded that the Bisokotuwa was invented in Sri Lanka over a thousand years before European engineers developed modern valve pits for massive dams.',
      si: 'යුරෝපීය ඉංජිනේරුවන් විශාල වේලි සඳහා කපාට කුටි නිපදවීමට වසර දහසකට පෙර ශ්‍රී ලාංකික ඉංජිනේරුවන් බිසෝකොටුව නිර්මාණය කර තිබුණි.',
      ta: 'ஐரோப்பாவில் நவீன அணைக்கட்டு வால்வுகள் கண்டுபிடிக்கப்படுவதற்கு ஆயிரம் ஆண்டுகளுக்கு முன்பே இலங்கையில் பிசோகொட்டுவ உருவாக்கப்பட்டது.',
    },
    checkQuestion: {
      id: 'hyd-q2',
      subjectId: 'history',
      topicId: 'ancient-hydraulics',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'How did the invention of the Bisokotuwa revolutionize large-scale dam construction in Sri Lanka?',
        si: 'බිසෝකොටුව සොයාගැනීම ශ්‍රී ලංකාවේ මහා පරිමාණ වැව් නිර්මාණයේදී සිදුකළ විප්ලවීය වෙනස කුමක්ද?',
        ta: 'பிசோகொட்டுவவின் கண்டுபிடிப்பு இலங்கையின் பாரிய அணைக்கட்டுக் கட்டுமானத்தில் ஏற்படுத்திய புரட்சி யாது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'It absorbed immense hydrostatic pressure, preventing massive reservoir bunds from bursting', si: 'අධික ජල පීඩනය සමනය කර මහා වැව් බැමි පුපුරා යාම වැළැක්වීම', ta: 'நீரின் அழுத்தத்தைச் சீராக்கி அணைக் கரைகள் உடைவதைத் தடுத்தது' } },
        { id: 'opt-2', text: { en: 'It forced river water to flow backward to mountain peaks', si: 'ගංගා ආපසු කඳු මුදුන් දෙසට ගලා යෑමට සැලැස්වීම', ta: 'ஆற்று நீரை மேல்நோக்கி பாயச் செய்தது' } },
        { id: 'opt-3', text: { en: 'It prevented rainwater from evaporating in the sun', si: 'සූර්ය රශ්මියෙන් ජලය වාෂ්ප වීම මුළුමනින්ම නැවැත්වීම', ta: 'நீர் ஆவியாவதைத் தடுத்தது' } },
        { id: 'opt-4', text: { en: 'It replaced stone bunds with wooden fencing', si: 'ගල් බැමි වෙනුවට ලී වැටවල් යෙදීම', ta: 'மர வேலிகளை அமைத்தது' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Without a pressure-breaking chamber, releasing deep water from massive lakes would wash away earthen bunds. The Bisokotuwa solved this fundamental hydraulic challenge.',
        si: 'පීඩනය පාලනය නොකළේ නම් අධික ජල වේගයට වැව් බැම්ම ඛාදනය වී බිඳී යයි. බිසෝකොටුව මෙම ගැටලුව සාර්ථකව විසඳීය.',
        ta: 'அழுத்தத்தைக் கட்டுப்படுத்தாவிட்டால் அணைக் கரைகள் உடைந்துவிடும். பிசோகொட்டுவ அந்த அழுத்தத்தை தணித்தது.',
      },
      syllabusReference: 'Sri Lankan Grade 8 History — Chapter 3: Ancient Hydraulic Civilization',
    }
  },
  {
    id: 'hyd-step-3',
    stepNumber: 3,
    title: {
      en: 'Canal Engineering & The Jaya Ganga (Yoda Ela)',
      si: 'මහා ඇළ මාර්ග සහ ජය ගඟ (යෝධ ඇළ)',
      ta: 'கால்வாய்ப் பொறியியலும் ஜய கங்கையும் (யோத எல)',
    },
    concept: {
      en: 'Ancient engineers mapped long-distance canal courses through subtle topography with microscopic precision. Built in the 5th century CE by King Dhatusena, the Jaya Ganga (Yoda Ela) travels 87 km from Kala Wewa to Tissa Wewa at a gradient of less than 6 inches per mile (1 in 10,000).',
      si: 'ධාතුසේන රජු විසින් කරවූ ජය ගඟ (යෝධ ඇළ) කලා වැවේ සිට තිසා වැව දක්වා කිලෝමීටර් 87ක් පුරා ගලා බසින්නේ සැතපුමකට අඟල් 6කට අඩු (1:10,000) විශ්මයජනක බැස්මකිනි.',
      ta: 'தாதுசேன மன்னனால் அமைக்கப்பட்ட ஜய கங்கை (யோத எல) கலா வாபியிலிருந்து திஸ்ஸ வாபி வரை 87 கி.மீ தூரத்திற்கு ஒரு மைலுக்கு 6 அங்குலத்திற்கும் குறைவான சரிவில் பாய்கிறது.',
    },
    visualCard: {
      title: 'Jaya Ganga Elevation Profile',
      diagramType: 'infographic',
      content: 'Kala Wewa (Origin) ──[87 km Channel @ <6 in/mi gradient]──➔ Tissa Wewa (Anuradhapura)',
      caption: 'Gentle gradient prevents soil erosion along the banks while maintaining steady laminar water transport.'
    },
    realWorldExample: {
      en: 'Modern British surveyor R.L. Brohier remarked that even with contemporary high-precision optical laser levels, reproducing the Yoda Ela\'s gentle slope across 87 km would challenge modern surveyors.',
      si: 'නූතන මිනින්දෝරු උපකරණ භාවිතයෙන් වුවද කි.මී. 87ක් පුරා මෙවැනි මෘදු බෑවුමක් නිර්මාණය කිරීම අතිශය අසීරු බව ආර්. එල්. බ්‍රෝහියර් මහතා පෙන්වා දී ඇත.',
      ta: 'நவீன லேசர் கருவிகளைக் கொண்டு கூட இவ்வளவு துல்லியமான சரிவில் 87 கி.மீ கால்வாய் அமைப்பது சவாலானது.',
    },
    checkQuestion: {
      id: 'hyd-q3',
      subjectId: 'history',
      topicId: 'ancient-hydraulics',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Why was maintaining an extremely gentle gradient (less than 6 inches per mile) along the Yoda Ela essential?',
        si: 'යෝධ ඇළ ඔස්සේ සැතපුමකට අඟල් 6කට අඩු ඉතා සියුම් බෑවුමක් පවත්වා ගැනීම අත්‍යවශ්‍ය වූයේ මන්ද?',
        ta: 'யோத எலவில் மைலுக்கு 6 அங்குலத்திற்கும் குறைவான மிதமான சரிவைப் பராமரிப்பது ஏன் அவசியமாக இருந்தது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'It ensured steady flow without causing catastrophic erosion to earthen canal banks', si: 'ඇළ මාර්ගයේ දෙපස බැමි සේදීයාම වළක්වමින් ජලය ක්‍රමවත්ව ගලායාමට', ta: 'கால்வாய் கரைகள் அரிக்கப்படாமல் நீர் சீராக பாய்வதை உறுதி செய்ய' } },
        { id: 'opt-2', text: { en: 'It stopped canal water from turning into steam', si: 'ඇළේ ජලය වාෂ්ප වීම නැවැත්වීමට', ta: 'நீர் நீராவியாக மாறுவதைத் தடுக்க' } },
        { id: 'opt-3', text: { en: 'It allowed ocean sailing ships to navigate into the dry zone', si: 'විශාල මුහුදු නැව් ඇළ දිගේ යාත්‍රා කිරීමට', ta: 'கடல் கப்பல்கள் பயணிக்க' } },
        { id: 'opt-4', text: { en: 'It turned river water into salt water', si: 'ඇළ ජලය කරදිය බවට පත්කිරීමට', ta: 'நன்னீரை உவர்நீராக மாற்ற' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'If the canal gradient were too steep, fast rushing water would wash away unlined earthen canal banks. If too flat, water would become stagnant and deposit silt prematurely.',
        si: 'බෑවුම වැඩි වූයේ නම් වේගවත් ජල පහරින් ඇළ බැමි සේදී යයි. බෑවුම අඩු වූයේ නම් ජලය ගලා නොගොස් රොන්මඩ තැන්පත් වේ.',
        ta: 'சரிவு அதிகமாக இருந்தால் கரைகள் அரித்துச் செல்லப்படும். எனவே மிகத் துல்லியமான சரிவு அவசியமானது.',
      },
      syllabusReference: 'Sri Lankan Grade 8 History — Chapter 3: Ancient Hydraulic Civilization',
    }
  }
];

export const TEACH_ME_ALGORITHMS_STEPS: LessonStep[] = [
  {
    id: 'algo-step-1',
    stepNumber: 1,
    title: {
      en: 'What is an Algorithm?',
      si: 'ඇල්ගොරිතමයක් යනු කුමක්ද?',
      ta: 'படிமுறை என்றால் என்ன?',
    },
    concept: {
      en: 'An algorithm is a finite, ordered sequence of well-defined instructions for solving a specific computational problem or executing a task. An algorithm must always terminate after a countable number of steps.',
      si: 'ඇල්ගොරිතමයක් යනු යම් ගැටලුවක් විසඳීම සඳහා සම්පාදනය කරන ලද පියවරෙන් පියවර උපදෙස් මාලාවකි. එය නිශ්චිත පියවර ගණනකින් පසුව අවසන් විය යුතුය.',
      ta: 'படிமுறை என்பது ஒரு குறிப்பிட்ட சிக்கலைத் தீர்ப்பதற்கான வரையறுக்கப்பட்ட, ஒழுங்கமைக்கப்பட்ட படிமுறை அறிவுறுத்தல்களின் வரிசையாகும்.',
    },
    visualCard: {
      title: 'Algorithm Characteristics',
      diagramType: 'diagram',
      content: 'Clear Input ➔ Finite & Unambiguous Sequential Steps ➔ Defined Output & Termination',
      caption: 'Every step must be precisely defined without ambiguity.'
    },
    realWorldExample: {
      en: 'A recipe for brewing Ceylon tea: 1. Boil fresh water, 2. Add tea leaves, 3. Steep for 3 minutes, 4. Strain into a cup, 5. Serve.',
      si: 'තේ කෝප්පයක් පිළියෙල කිරීමේ පියවර: 1. වතුර උණු කිරීම, 2. තේ කොළ දැමීම, 3. විනාඩි 3ක් තැම්බීම, 4. පෙරා කෝප්පයට වත්කිරීම.',
      ta: 'தேநீர் தயாரிக்கும் முறை: 1. தண்ணீரை கொதிக்க வைத்தல், 2. தேயிலை போடுதல், 3. மூன்று நிமிடங்கள் ஊறவைத்தல், 4. வடிகட்டுதல்.',
    },
    checkQuestion: {
      id: 'algo-q1',
      subjectId: 'ict',
      topicId: 'algorithms-flowcharts',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which of the following is a mandatory characteristic of any valid algorithm?',
        si: 'වලංගු ඇල්ගොරිතමයක අනිවාර්ය ලක්ෂණයක් වන්නේ පහත සඳහන් කවරක්ද?',
        ta: 'ஒரு செல்லுபடியாகும் படிமுறையின் கட்டாயப் பண்பு எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'It must terminate after a finite number of steps', si: 'එය සීමිත පියවර සංඛ්‍යාවකින් අවසන් විය යුතුය', ta: 'அது ஒரு குறிப்பிட்ட எண்ணிக்கையிலான படிகளுக்குப் பிறகு முடிவடைய வேண்டும்' } },
        { id: 'opt-2', text: { en: 'It must run endlessly forever in an infinite loop', si: 'එය කිසිදා අවසන් නොවී අනන්තව ක්‍රියාත්මක විය යුතුය', ta: 'அது முடிவில்லாமல் இயங்க வேண்டும்' } },
        { id: 'opt-3', text: { en: 'It can only be written in French language', si: 'එය ප්‍රංශ භාෂාවෙන් පමණක් ලිවිය යුතුය', ta: 'அது பிரெஞ்சு மொழியில் மட்டுமே எழுதப்பட வேண்டும்' } },
        { id: 'opt-4', text: { en: 'It must require an internet connection', si: 'එයට අන්තර්ජාල සම්බන්ධතාවක් තිබිය යුතුය', ta: 'அதற்கு இணைய இணைப்பு தேவை' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'A true algorithm must guarantee finiteness: it must produce a result and conclude after a finite sequence of operations.',
        si: 'සැබෑ ඇල්ගොරිතමයක් සීමිත පියවර ගණනකින් නිශ්චිත ප්‍රතිදානයක් ලබාදී අවසන් විය යුතුය.',
        ta: 'ஒரு படிமுறை குறிப்பிட்ட படிகளுக்குப் பிறகு முடிவுக்கு வந்து வெளியீட்டைத் தர வேண்டும்.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 2: Algorithms, Flowcharts & Problem Solving',
    }
  },
  {
    id: 'algo-step-2',
    stepNumber: 2,
    title: {
      en: 'Flowchart Symbols & Visual Logic',
      si: 'ගැලීම් සටහන් සංකේත සහ දෘශ්‍ය තර්කනය',
      ta: 'பாய்வுப்படக் குறியீடுகளும் காட்சி தர்க்கமும்',
    },
    concept: {
      en: 'A flowchart uses standard ANSI/ISO geometric symbols connected by flowlines: Ovals for Start/End terminals, Parallelograms for Input/Output, Rectangles for Processes/Calculations, and Diamonds for Decision branching.',
      si: 'ගැලීම් සටහනක සම්මත සංකේත භාවිත වේ: ආරම්භය/අවසානය සඳහා ඉලිප්සය, ආදාන/ප්‍රතිදාන සඳහා සමාන්තරාස්‍රය, සැකසුම් සඳහා සෘජුකෝණාස්‍රය සහ තීරණ සඳහා රොම්බසය.',
      ta: 'பாய்வுப்படம் நியமக் குறியீடுகளைப் பயன்படுத்துகிறது: ஆரம்பம்/முடிவுக்கு நீள்வட்டம், உள்ளீடு/வெளியீட்டுக்கு இணைகரம், செயலாக்கத்திற்கு செவ்வகம், முடிவெடுத்தலுக்கு வைரம்.',
    },
    visualCard: {
      title: 'Standard Flowchart Geometric Symbols',
      diagramType: 'diagram',
      content: '⬭ Oval (Start/Stop) ➔ ▱ Parallelogram (Input/Output) ➔ ▭ Rectangle (Process) ➔ ◇ Diamond (Decision / If Condition)',
      caption: 'Arrows (flowlines) indicate the exact execution direction.'
    },
    realWorldExample: {
      en: 'ATM cash dispensing logic: If PIN is correct (Diamond Decision), check account balance (Process), dispense bank notes (Output).',
      si: 'ATM යන්ත්‍රයකින් මුදල් ගැනීමේදී: PIN අංකය නිවැරදිද (තීරණ රොම්බසය), ගිණුම් ශේෂය පරීක්ෂා කිරීම (සැකසුම), මුදල් නිකුත් කිරීම (ප්‍රතිදානය).',
      ta: 'ATM பணம் பெறும் முறை: PIN சரியானதா (வைர முடிவெடுத்தல்), இருப்பைச் சரிபார்த்தல் (செயலாக்கம்), பணம் வழங்குதல் (வெளியீடு).',
    },
    checkQuestion: {
      id: 'algo-q2',
      subjectId: 'ict',
      topicId: 'algorithms-flowcharts',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which flowchart symbol represents a conditional decision branching between "Yes" and "No"?',
        si: '"ඔව්" හෝ "නැත" ලෙස තීරණයක් ගෙන දෙපසට ශාඛා කිරීම දක්වන සංකේතය කුමක්ද?',
        ta: '"ஆம்" அல்லது "இல்லை" என முடிவெடுக்கும் நிலையை குறிக்கும் பாய்வுப்பட குறியீடு எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Diamond (Rhombus)', si: 'රොම්බසය (දියමන්ති හැඩය)', ta: 'வைரக் குறியீடு (Rhombus)' } },
        { id: 'opt-2', text: { en: 'Rectangle', si: 'සෘජුකෝණාස්‍රය', ta: 'செவ்வகம்' } },
        { id: 'opt-3', text: { en: 'Circle (Connector)', si: 'වෘත්තය', ta: 'வட்டம்' } },
        { id: 'opt-4', text: { en: 'Triangle', si: 'ත්‍රිකෝණය', ta: 'முக்கோணம்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The diamond shape has one incoming line and at least two outgoing lines (e.g. Yes/No, True/False) representing decision branches.',
        si: 'රොම්බස සංකේතයට එක් ඇතුළුවීමේ රේඛාවක් සහ අවම වශයෙන් පිටවීමේ රේඛා දෙකක් (ඔව්/නැත) ඇත.',
        ta: 'வைரக் குறியீடு ஒரு நிபந்தனையை சோதித்து ஆம்/இல்லை என இரு வழிகளில் கிளையமைக்கும்.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 2: Algorithms, Flowcharts & Problem Solving',
    }
  }
];

export const TEACH_ME_PYTHAGORAS_STEPS: LessonStep[] = [
  {
    id: 'pyth-step-1',
    stepNumber: 1,
    title: {
      en: 'Right-Angled Triangles & The Hypotenuse',
      si: 'සෘජුකෝණී ත්‍රිකෝණ සහ කර්ණය',
      ta: 'செங்கோண முக்கோணங்களும் செம்பக்கமும்',
    },
    concept: {
      en: 'A right-angled triangle contains one interior angle of exactly 90°. The side directly opposite the 90° angle is always the longest side of the triangle, known as the hypotenuse.',
      si: 'සෘජුකෝණී ත්‍රිකෝණයක එක් අභ්‍යන්තර කෝණයක් 90° කි. 90° කෝණයට සම්මුඛව ඇති දිගම පාදය කර්ණය ලෙස හැඳින්වේ.',
      ta: 'செங்கோண முக்கோணத்தில் ஒரு கோணம் 90° ஆக இருக்கும். 90° கோணத்திற்கு எதிரே உள்ள மிக நீளமான பக்கம் செம்பக்கம் எனப்படும்.',
    },
    visualCard: {
      title: 'Right-Angled Triangle Geometry',
      diagramType: 'formula',
      content: 'Hypotenuse (c) is opposite 90° angle | Other two perpendicular sides: a and b',
      caption: 'The foundation of Greek and ancient geometric land surveying.'
    },
    realWorldExample: {
      en: 'A carpenter building a wooden roof truss in Kandy checks that the two perpendicular beams meet at a true 90-degree right angle by measuring a 3m base, 4m height, and ensuring the diagonal is exactly 5m.',
      si: 'වඩු කාර්මිකයෙකු වහලක යටලීය සෘජුකෝණී දැයි පරීක්ෂා කිරීමට 3m, 4m පාද මැන විකර්ණය 5m දැයි තහවුරු කරයි.',
      ta: 'தச்சு வேலை செய்பவர் ஒரு கூரையின் செங்கோணத்தை சரிபார்க்க 3m, 4m பக்கங்களை அளந்து குறுக்கு விட்டம் 5m ஆக உள்ளதா எனப் பார்ப்பார்.',
    },
    checkQuestion: {
      id: 'pyth-q1',
      subjectId: 'maths',
      topicId: 'pythagoras-theorem',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'In any right-angled triangle, where is the hypotenuse always located?',
        si: 'ඕනෑම සෘජුකෝණී ත්‍රිකෝණයක කර්ණය පිහිටන්නේ කොතැනද?',
        ta: 'எந்தவொரு செங்கோண முக்கோணத்திலும் செம்பக்கம் எப்போதும் எங்கு அமைந்திருக்கும்?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Opposite the 90° right angle (the longest side)', si: '90° සෘජුකෝණයට සම්මුඛව (දිගම පාදය ලෙස)', ta: '90° செங்கோணத்திற்கு எதிரே (நீளமான பக்கம்)' } },
        { id: 'opt-2', text: { en: 'Adjacent to the smallest acute angle', si: 'කුඩාම කෝණයට බද්ධව', ta: 'மிகச் சிறிய கோணத்தை அடுத்து' } },
        { id: 'opt-3', text: { en: 'Along the shortest vertical edge', si: 'කෙටිම සිරස් දාරය දිගේ', ta: 'குட்டையான பக்கத்தில்' } },
        { id: 'opt-4', text: { en: 'Inside the centroid of the triangle', si: 'ත්‍රිකෝණයේ කේන්ද්‍රකය තුළ', ta: 'முக்கோணத்தின் மையத்தில்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The hypotenuse is unequivocally the longest side in a Euclidean right triangle, positioned directly opposite the right angle.',
        si: 'කර්ණය යනු සෘජුකෝණයට සම්මුඛව පිහිටන ත්‍රිකෝණයේ දිගම පාදයයි.',
        ta: 'செம்பக்கம் என்பது எப்போதும் செங்கோணத்திற்கு எதிரே காணப்படும் மிக நீளமான பக்கமாகும்.',
      },
      syllabusReference: 'Sri Lankan Grade 8 Mathematics — Chapter 9: Pythagoras Theorem',
    }
  },
  {
    id: 'pyth-step-2',
    stepNumber: 2,
    title: {
      en: 'The Theorem: a² + b² = c²',
      si: 'ප්‍රමේයය: a² + b² = c²',
      ta: 'தேற்றம்: a² + b² = c²',
    },
    concept: {
      en: 'In any right-angled triangle, the area of the square constructed on the hypotenuse (c²) is exactly equal to the sum of the areas of the squares on the other two perpendicular sides (a² + b²).',
      si: 'සෘජුකෝණී ත්‍රිකෝණයක කර්ණය මත වර්ගඵලය (c²), අනෙක් පාද දෙක මත වර්ගඵලයන්ගේ එකතුවට (a² + b²) සමාන වේ.',
      ta: 'செங்கோண முக்கோணத்தில் செம்பக்கத்தின் மீதான சதுரத்தின் பரப்பளவு (c²) மற்ற இரு பக்கங்களின் மீதான சதுரங்களின் பரப்பளவுகளின் கூடுதலுக்கு (a² + b²) சமනாகும்.',
    },
    visualCard: {
      title: 'Pythagorean Equation',
      diagramType: 'formula',
      content: 'a² + b² = c²  ➔  c = √(a² + b²)',
      caption: 'Example: 3² + 4² = 9 + 16 = 25 = 5².'
    },
    realWorldExample: {
      en: 'If a 10-meter ladder leans against a vertical wall such that its base is 6 meters away from the wall, how high up the wall does it reach? h² = 10² - 6² = 100 - 36 = 64, so h = 8 meters!',
      si: 'මීටර් 10ක ඉනිමඟක් බිත්තියෙන් මීටර් 6ක් ඈතින් තැබූ විට බිත්තියේ උස: h² = 10² - 6² = 64, එබැවින් උස මීටර් 8කි!',
      ta: '10m ஏணி சுவரிலிருந்து 6m தொலைவில் வைக்கப்பட்டால், சுவரின் உயரம்: h² = 10² - 6² = 64, எனவே உயரம் = 8m!',
    },
    checkQuestion: {
      id: 'pyth-q2',
      subjectId: 'maths',
      topicId: 'pythagoras-theorem',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'If the two perpendicular sides of a right triangle are 6 cm and 8 cm, what is the length of the hypotenuse?',
        si: 'සෘජුකෝණී ත්‍රිකෝණයක සෘජුකෝණය සාදන පාද 6 cm සහ 8 cm නම් කර්ණයේ දිග කීයද?',
        ta: 'செங்கோணத்தை ஆக்கும் பக்கங்கள் 6 cm மற்றும் 8 cm எனின், செம்பக்கத்தின் நீளம் யாது?',
      },
      options: [
        { id: 'opt-1', text: { en: '10 cm', si: '10 cm', ta: '10 cm' } },
        { id: 'opt-2', text: { en: '14 cm', si: '14 cm', ta: '14 cm' } },
        { id: 'opt-3', text: { en: '12 cm', si: '12 cm', ta: '12 cm' } },
        { id: 'opt-4', text: { en: '48 cm', si: '48 cm', ta: '48 cm' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'c² = 6² + 8² = 36 + 64 = 100. Taking the square root: c = √100 = 10 cm.',
        si: 'c² = 6² + 8² = 36 + 64 = 100. වර්ගමූලය: c = √100 = 10 cm වේ.',
        ta: 'c² = 6² + 8² = 36 + 64 = 100. ஆகவே c = √100 = 10 cm.',
      },
      syllabusReference: 'Sri Lankan Grade 8 Mathematics — Chapter 9: Pythagoras Theorem',
    }
  }
];

export const LESSON_STEPS_BY_TOPIC: Record<string, LessonStep[]> = {
  'photosynthesis': TEACH_ME_PHOTOSYNTHESIS_STEPS,
  'computer-systems-hardware': TEACH_ME_HARDWARE_STEPS,
  'algorithms-flowcharts': TEACH_ME_ALGORITHMS_STEPS,
  'ancient-hydraulics': TEACH_ME_HYDRAULICS_STEPS,
  'pythagoras-theorem': TEACH_ME_PYTHAGORAS_STEPS,
};

export function getLessonStepsForTopic(topicId?: string): LessonStep[] {
  if (!topicId) return TEACH_ME_PHOTOSYNTHESIS_STEPS;
  if (LESSON_STEPS_BY_TOPIC[topicId]) {
    return LESSON_STEPS_BY_TOPIC[topicId];
  }
  const topic = MOCK_TOPICS.find((t) => t.id === topicId);
  if (topic) {
    return [
      {
        id: `${topic.id}-overview`,
        stepNumber: 1,
        title: topic.title,
        concept: {
          en: `${topic.description.en}\n\nThis curriculum unit covers fundamental concepts outlined in the official Sri Lankan national syllabus. Use the Atlas AI Tutor to ask interactive questions and explore textbook citations grounded directly in the ministry curriculum.`,
          si: `${topic.description.si}\n\nමෙම විෂය ඒකකය ශ්‍රී ලංකා ජාතික විෂය නිර්දේශයේ මූලික සංකල්ප ආවරණය කරයි. Atlas AI උපදේශක වෙතින් ප්‍රශ්න අසමින් නිල පෙළපොත් ඇසුරෙන් ඉගෙන ගන්න.`,
          ta: `${topic.description.ta}\n\nஇந்த பாட அலகு இலங்கை தேசிய பாடத்திட்டத்தின் முக்கிய கருத்துக்களை உள்ளடக்கியுள்ளது. Atlas AI ஆசிரியரிடம் வினாக்களைக் கேட்டு பாடநூல் குறிப்புகளுடன் கற்கவும்.`,
        },
        visualCard: {
          title: topic.title.en,
          diagramType: 'infographic',
          content: `Chapter ${topic.chapterNumber} • ${topic.title.en}`,
          caption: 'National Curriculum Grounded Unit'
        },
        realWorldExample: {
          en: `Practical real-world applications of ${topic.title.en} across Sri Lankan industry, everyday life, and academic examinations.`,
          si: `${topic.title.si} සංකල්පය ශ්‍රී ලංකාවේ එදිනෙදා ජීවිතය සහ විභාග සඳහා ප්‍රායෝගිකව යොදාගන්නා ආකාරය.`,
          ta: `${topic.title.ta} நடைமுறை வாழ்வில் மற்றும் பரீட்சைகளில் பயன்படும் முறை.`,
        },
        checkQuestion: {
          id: `${topic.id}-q1`,
          subjectId: topic.subjectId,
          topicId: topic.id,
          grade: topic.grade,
          examCategory: 'general',
          isDemonstrationSample: true,
          questionText: {
            en: `What is the core focus of Chapter ${topic.chapterNumber}: ${topic.title.en}?`,
            si: `${topic.title.si} පාඩමේ ප්‍රධාන අවධානය යොමුවන්නේ කුමක් කෙරෙහිද?`,
            ta: `${topic.title.ta} பாடத்தின் பிரதான நோக்கம் என்ன?`,
          },
          options: [
            { id: 'opt-1', text: { en: topic.description.en, si: topic.description.si, ta: topic.description.ta } },
            { id: 'opt-2', text: { en: 'Unrelated miscellaneous concepts', si: 'අදාළ නොවන වෙනත් කරුණු', ta: 'தொடர்பற்ற பிற விடயங்கள்' } },
          ],
          correctOptionId: 'opt-1',
          educationalFeedback: {
            en: `Mastering ${topic.title.en} prepares students for the G.C.E. O/L national examinations.`,
            si: `මෙම පාඩම අධ්‍යයනය කිරීම අ.පො.ස. සා/පෙළ විභාගය සඳහා මනා පිටුවහලක් වේ.`,
            ta: `இப்பாடம் க.பொ.த சாதாரண தரப் பரீட்சைக்கு மாணவர்களை தயார்படுத்துகிறது.`,
          },
          syllabusReference: `Sri Lankan National Curriculum — ${topic.title.en}`,
        }
      }
    ];
  }
  return TEACH_ME_PHOTOSYNTHESIS_STEPS;
}
