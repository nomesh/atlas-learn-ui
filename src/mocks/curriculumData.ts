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
    id: 'number-systems',
    subjectId: 'ict',
    chapterNumber: 1,
    grade: 'grade-8',
    title: {
      en: 'Number Systems',
      si: 'සංඛ්‍යා පද්ධති',
      ta: 'எண் முறைகள்',
    },
    description: {
      en: 'Decimal and binary number systems, powers of 2, place values, converting between decimal and binary numbers, and data representation (Textbook p. 1–10).',
      si: 'දශමය සහ ද්විමය සංඛ්‍යා පද්ධති, 2 හි බල, ස්ථානීය අගය, දශමය-ද්විමය අන්‍යෝන්‍ය පරිවර්තනය සහ දත්ත නිරූපණය (පෙළපොත පිටු 1–10).',
      ta: 'தசம மற்றும் இரும எண் முறைகள், 2 இன் அடுக்குகள், இடப்பெறுமானம், தசம-இரும மாற்றங்கள் மற்றும் தரவுப் பிரதிநிதித்துவம் (பாடநூல் பக். 1–10).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'configuring-formatting-computer',
    subjectId: 'ict',
    chapterNumber: 2,
    grade: 'grade-8',
    title: {
      en: 'Configuring and Formatting a Computer',
      si: 'පරිගණකයක් වින්‍යාසගත කිරීම සහ හැඩසවි ගැන්වීම',
      ta: 'கணினியை உள்ளமைத்தல் மற்றும் வடிவமைத்தல்',
    },
    description: {
      en: 'Desktop customization, screen resolution, regional language keyboard setup, formatting storage drives, and software management (Textbook p. 11–33).',
      si: 'ඩෙස්ක්ටොප් සැකසුම්, තිර විභේදනය, ප්‍රාදේශීය භාෂා යතුරුපුවරු, ආචයන තැටි හැඩසවි ගැන්වීම (Format) සහ මෘදුකාංග ස්ථාපනය (පෙළපොත පිටු 11–33).',
      ta: 'திரை அமைப்பு, பிராந்திய மொழி அமைப்புகள், சேமிப்பக வடிவமைத்தல் (Format) மற்றும் மென்பொருள் மேலாண்மை (பாடநூல் பக். 11–33).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'word-processing',
    subjectId: 'ict',
    chapterNumber: 3,
    grade: 'grade-8',
    title: {
      en: 'Word Processing',
      si: 'වදන් සැකසුම',
      ta: 'சொல் செயலாக்கம்',
    },
    description: {
      en: 'Document creation, font formatting, paragraph alignment, inserting tables and graphics, headers and footers, and page layout (Textbook p. 34–38).',
      si: 'ලේඛන සකස් කිරීම, අකුරු සහ ඡේද හැඩසවි ගැන්වීම, වගු සහ රූප ඇතුළත් කිරීම, ශීර්ෂ සහ පාදක, සහ පිටු සැකසුම (පෙළපොත පිටු 34–38).',
      ta: 'ஆவண உருவாக்கம், எழுத்துரு மற்றும் பந்தி வடிவமைப்பு, அட்டவணைகள் மற்றும் படங்களைச் சேர்த்தல், தலைப்புகள் மற்றும் பக்க அமைப்பு (பாடநூல் பக். 34–38).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'programming',
    subjectId: 'ict',
    chapterNumber: 4,
    grade: 'grade-8',
    title: {
      en: 'Programming',
      si: 'ක්‍රමලේඛනය',
      ta: 'நிரலாக்கம்',
    },
    description: {
      en: 'Visual block-based programming with Scratch, sprites and stage, motion and events, variables, conditional statements (If-Then), and loops (Textbook p. 39–54).',
      si: 'Scratch දෘශ්‍ය ක්‍රමලේඛනය, ස්ප්‍රයිට් සහ වේදිකාව, විචල්‍යයන්, කොන්දේසි සහිත තේරීම් (If-Then) සහ පුනරාවර්තන (පෙළපොත පිටු 39–54).',
      ta: 'Scratch காட்சி நிரலாக்கம், மாறிகள், நிபந்தனை கூற்றுகள் (If-Then) மற்றும் சுழற்சிகள் (பாடநூல் பக். 39–54).',
    },
    lessonsCount: 5,
    completedPercentage: 0,
  },
  {
    id: 'physical-computing',
    subjectId: 'ict',
    chapterNumber: 5,
    grade: 'grade-8',
    title: {
      en: 'Physical Computing',
      si: 'භෞතික පරිගණනය (Physical Computing)',
      ta: 'பௌதீகக் கணினியியல்',
    },
    description: {
      en: 'Microcontrollers (micro:bit / Arduino), input sensors (light, temperature, buttons), output actuators (LEDs, buzzers), and simple robotics (Textbook p. 55–62).',
      si: 'ක්ෂුද්‍ර පාලක (micro:bit / Arduino), ආදාන සංවේදක (ආලෝක, උෂ්ණත්ව), ප්‍රතිදාන උපාංග (LED, බසර) සහ ස්වයංක්‍රීය පද්ධති (පෙළපොත පිටු 55–62).',
      ta: 'மைக்ரோகண்ட்ரோலர்கள் (micro:bit / Arduino), உள்ளீட்டு உணரிகள், வெளியீட்டுக் கூறுகள் (LED, பஸர்) மற்றும் தானியங்கி அமைப்புகள் (பாடநூல் பக். 55–62).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'internet',
    subjectId: 'ict',
    chapterNumber: 6,
    grade: 'grade-8',
    title: {
      en: 'Internet',
      si: 'අන්තර්ජාලය',
      ta: 'இணையம்',
    },
    description: {
      en: 'World Wide Web, web browsers, search engines, URLs, electronic mail (email), safe internet practices, and digital ethics (Textbook p. 63–76).',
      si: 'ලෝක විසිරී වියමන, වෙබ් බ්‍රවුසර, සෙවුම් යන්ත්‍ර, URL, විද්‍යුත් තැපෑල (Email), ආරක්ෂිත අන්තර්ජාල භාවිතය සහ සයිබර් ආචාරධර්ම (පෙළපොත පිටු 63–76).',
      ta: 'வலை உலாவிகள், தேடுபொறிகள், URL, மின்னஞ்சல் தொடர்பு, இணையப் பாதுகாப்பு மற்றும் டிஜிட்டல் ஒழுக்கவியல் (பாடநூல் பக். 63–76).',
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

export const TEACH_ME_NUMBER_SYSTEMS_STEPS: LessonStep[] = [
  {
    id: 'num-step-1',
    stepNumber: 1,
    title: {
      en: 'Decimal (Base 10) vs Binary (Base 2) System',
      si: 'දශමය (පාදය 10) සහ ද්විමය (පාදය 2) සංඛ්‍යා පද්ධති',
      ta: 'தசம (அடி 10) மற்றும் இரும (அடி 2) எண் முறைகள்',
    },
    concept: {
      en: 'Humans naturally count in base 10 (decimal) using digits 0 to 9, likely because we have 10 fingers. However, electronic computers operate using base 2 (binary) with only two digits: 0 and 1. Electronic circuits (transistors) can easily detect two reliable physical states: OFF (0, low voltage) and ON (1, high voltage).',
      si: 'මිනිසුන් වන අප සාමාන්‍යයෙන් ගණනය කිරීම් සඳහා 0 සිට 9 දක්වා සංකේත සහිත දශමය (පාදය 10) පද්ධතිය භාවිත කරමු. නමුත් ඩිජිටල් පරිගණක ක්‍රියාකරන්නේ 0 සහ 1 යන සංකේත දෙක පමණක් ඇති ද්විමය (පාදය 2) පද්ධතියෙනි. ඉලෙක්ට්‍රොනික ස්විච (ට්‍රාන්සිස්ටර) සඳහා විසන්ධි (0) සහ සක්‍රිය (1) යන තත්ත්ව දෙක පහසුවෙන් නිරූපණය කළ හැක.',
      ta: 'மனிதர்கள் பொதுவாக 0 முதல் 9 வரையிலான எண்களைக் கொண்ட தசம (அடி 10) முறையைப் பயன்படுத்துகின்றனர். ஆனால் கணினிகள் 0 மற்றும் 1 ஆகிய இரு இலக்கங்களை மட்டுமே கொண்ட இரும (அடி 2) முறையில் இயங்குகின்றன. மின்சுற்றுகளில் அணைத்தல் (0) மற்றும் இயக்குதல் (1) நிலைகளை எளிதாகக் குறிக்கலாம்.',
    },
    visualCard: {
      title: 'Transistor Voltage States',
      diagramType: 'diagram',
      content: 'Electric Switch OFF (0V) = Bit 0  |  Electric Switch ON (+3.3V / +5V) = Bit 1',
      caption: 'Every text character, photo, and video in computer memory is fundamentally stored as sequences of 0s and 1s.'
    },
    realWorldExample: {
      en: 'Consider a room light switch on the wall: when turned down the bulb is dark (State 0), and when flipped up it illuminates (State 1). Millions of microscopic microscopic transistors inside a computer processor operate just like tiny wall switches!',
      si: 'නිවසේ විදුලි බුබුලක ස්විචය සිතන්න: පහළට දැමූ විට ආලෝකය නැත (0 තත්ත්වය), ඉහළට දැමූ විට දැල්වේ (1 තත්ත්වය). පරිගණක ප්‍රොසෙසරයක ඇති මිලියන ගණනක් වූ ට්‍රාන්සිස්ටර ක්‍රියා කරන්නේද මෙලෙසිනි.',
      ta: 'வீட்டு மின்விளக்கு சுவிட்சைப் போன்றது: அணைக்கும் போது விளக்கு எரியாது (0 நிலை), போடும் போது எரியும் (1 நிலை). கணினி செயலியில் உள்ள டிரான்சிஸ்டர்களும் இதேபோன்று செயல்படுகின்றன.',
    },
    checkQuestion: {
      id: 'num-q1',
      subjectId: 'ict',
      topicId: 'number-systems',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Why do modern digital computers use the binary number system (base 2) instead of the decimal system (base 10)?',
        si: 'නූතන ඩිජිටල් පරිගණක දශමය පද්ධතිය (පාදය 10) වෙනුවට ද්විමය පද්ධතිය (පාදය 2) භාවිත කරන්නේ ඇයි?',
        ta: 'நவீன கணினிகள் தசம முறைக்கு (அடி 10) பதிலாக இரும முறையை (அடி 2) பயன்படுத்துவது ஏன்?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Electronic circuits reliably detect two physical electrical states: ON (1) and OFF (0)', si: 'ඉලෙක්ට්‍රොනික පරිපථවලට සක්‍රිය (1) සහ අක්‍රිය (0) යන විද්‍යුත් තත්ත්ව දෙක නිවැරදිව පාලනය කළ හැකි බැවින්', ta: 'மின்சுற்றுகள் ON (1) மற்றும் OFF (0) ஆகிய இரு நிலைகளை துல்லியமாக கையாளக்கூடியவை' } },
        { id: 'opt-2', text: { en: 'Computers do not have enough memory to store numbers larger than 1', si: 'පරිගණක මතකයේ 1ට වඩා වැඩි අගයන් තැන්පත් කළ නොහැකි නිසා', ta: 'கணினிகளில் 1 ஐ விட பெரிய எண்களை சேமிக்க முடியாது' } },
        { id: 'opt-3', text: { en: 'Binary calculations require no electricity at all', si: 'ද්විමය ගණනය කිරීම් සඳහා කිසිසේත්ම විදුලිය අවශ්‍ය නොවන නිසා', ta: 'இரும கணக்கீடுகளுக்கு மின்சாரம் தேவையில்லை' } },
        { id: 'opt-4', text: { en: 'Binary numbers were invented exclusively for computer games', si: 'ද්විමය සංඛ්‍යා පරිගණක ක්‍රීඩා සඳහා පමණක් නිපදවූවක් නිසා', ta: 'இரும எண்கள் கணினி விளையாட்டுகளுக்காக மட்டுமே உருவாக்கப்பட்டன' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Transistors act as microscopic electronic switches. Having only two distinct voltage levels (High and Low) makes computers highly resistant to electrical noise and hardware error.',
        si: 'ට්‍රාන්සිස්ටර ක්‍රියා කරන්නේ ක්ෂුද්‍ර ඉලෙක්ට්‍රොනික ස්විච ලෙසිනි. වෝල්ටීයතා මට්ටම් දෙකක් පමණක් පැවතීම නිසා දෝෂ ඇතිවීම අවම වේ.',
        ta: 'டிரான்சிஸ்டர்கள் இரு மின்னழுத்த நிலைகளில் இயங்குவதால், சத்தத்தினால் ஏற்படும் பிழைகள் தவிர்க்கப்பட்டு துல்லியம் பெறப்படுகிறது.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 1: Number Systems (Textbook p. 1–3)',
    }
  },
  {
    id: 'num-step-2',
    stepNumber: 2,
    title: {
      en: 'Place Values & Positional Weights (Powers of 2)',
      si: 'ස්ථානීය අගයන් සහ 2 හි බල (Powers of 2)',
      ta: 'இடப்பெறுமானங்களும் 2 இன் அடுக்குகளும்',
    },
    concept: {
      en: 'In any positional number system, each column represents an increasing power of the base. In binary (base 2), moving from right to left represents powers of 2: 2⁰=1, 2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32, 2⁶=64, 2⁷=128. An 8-bit binary group forms 1 Byte.',
      si: 'ස්ථානීය සංඛ්‍යා පද්ධතියක දකුණේ සිට වමට යනවිට එක් එක් ස්ථානයේ අගය පාදයේ බලයකින් වැඩිවේ. ද්විමය පද්ධතියේදී එය 2 හි බලයන් වේ: 2⁰=1, 2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32, 2⁶=64, 2⁷=128. බිටු 8ක එකතුවක් බයිටයක් (Byte) ලෙස හැඳින්වේ.',
      ta: 'எந்தவொரு இடப்பெறுமான எண் முறையிலும், வலமிருந்து இடமாகச் செல்லும் போது அடி எண்ணின் அடுக்குகள் அதிகரிக்கும். இரும முறையில் 2 இன் அடுக்குகள்: 2⁰=1, 2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32, 2⁶=64, 2⁷=128 ஆகும். 8 பிட்டுகள் சேர்ந்தது 1 பைட் (Byte).',
    },
    visualCard: {
      title: 'Binary Positional Weights (Right to Left)',
      diagramType: 'formula',
      content: '2⁷ (128) | 2⁶ (64) | 2⁵ (32) | 2⁴ (16) | 2³ (8) | 2² (4) | 2¹ (2) | 2⁰ (1)',
      caption: 'Example: Binary 00001101 = 8 + 4 + 1 = Decimal 13.'
    },
    realWorldExample: {
      en: 'When your smartphone or flash drive has 16GB, 32GB, 64GB, or 128GB of storage, notice that every single storage capacity is an exact power of 2: 2⁴=16, 2⁵=32, 2⁶=64, 2⁷=128!',
      si: 'ස්මාර්ට් දුරකථන සහ පෙන්ඩ්‍රයිව් ධාරිතාව 16GB, 32GB, 64GB, 128GB ලෙස ලැබෙන්නේ ඇයිදැයි කල්පනා කර තිබේද? ඒ සෑම අගයක්ම 2 හි බලයන් වන බැවිනි!',
      ta: 'ஸ்மார்ட்போன் மற்றும் பென்டிரைவ் சேமிப்பகங்கள் 16GB, 32GB, 64GB, 128GB என இருப்பதற்குக் காரணம், அவை அனைத்தும் 2 இன் துல்லியமான அடுக்குகள் ஆகும்!',
    },
    checkQuestion: {
      id: 'num-q2',
      subjectId: 'ict',
      topicId: 'number-systems',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'What is the positional decimal place value of 2⁴ in the binary number system?',
        si: 'ද්විමය සංඛ්‍යා පද්ධතියේ 2⁴ ස්ථානීය අගයේ දශමය වටිනාකම කීයද?',
        ta: 'இரும எண் முறையில் 2⁴ இன் தசம இடப்பெறுமானம் யாது?',
      },
      options: [
        { id: 'opt-1', text: { en: '16', si: '16', ta: '16' } },
        { id: 'opt-2', text: { en: '8', si: '8', ta: '8' } },
        { id: 'opt-3', text: { en: '32', si: '32', ta: '32' } },
        { id: 'opt-4', text: { en: '4', si: '4', ta: '4' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: '2⁴ = 2 × 2 × 2 × 2 = 16. The powers of 2 ascend from right to left: 1, 2, 4, 8, 16, 32, 64, 128.',
        si: '2⁴ = 2 × 2 × 2 × 2 = 16. දකුණේ සිට වමට: 1, 2, 4, 8, 16, 32, 64, 128 වේ.',
        ta: '2⁴ = 2 × 2 × 2 × 2 = 16 ஆகும். வலமிருந்து இடமாக: 1, 2, 4, 8, 16, 32...',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 1: Number Systems (Textbook p. 4–6)',
    }
  },
  {
    id: 'num-step-3',
    stepNumber: 3,
    title: {
      en: 'Conversions: Decimal to Binary and Binary to Decimal',
      si: 'පරිවර්තනය: දශමය-ද්විමය සහ ද්විමය-දශමය',
      ta: 'மாற்றங்கள்: தசமத்திலிருந்து இருமத்திற்கும் இருமத்திலிருந்து தசமத்திற்கும்',
    },
    concept: {
      en: 'To convert Decimal to Binary: repeatedly divide the decimal number by 2 and record the remainders (0 or 1), then write the remainders from bottom to top (MSB to LSB). To convert Binary to Decimal: multiply each binary digit by its corresponding power of 2 and sum the results.',
      si: 'දශමය සංඛ්‍යාවක් ද්විමය බවට පත්කිරීමට: සංඛ්‍යාව අඛණ්ඩව 2න් බෙදමින් ඉතිරිය (0 හෝ 1) සටහන් කරගෙන, පහළ සිට ඉහළට ලියා තබන්න. ද්විමය සංඛ්‍යාවක් දශමය කිරීමට: එක් එක් බිටුව අදාළ 2 හි බලයෙන් ගුණ කර එකතු කරන්න.',
      ta: 'தசம எண்ணை இருமமாக மாற்ற: எண்ணை தொடர்ந்து 2 ஆல் வகுத்து மீதிகளைக் குறித்து, கீழிருந்து மேலாக எழுதவும். இருமத்தை தசமமாக மாற்ற: ஒவ்வொரு இலக்கத்தையும் அதன் 2 இன் அடுக்கினால் பெருக்கி கூட்டவும்.',
    },
    visualCard: {
      title: 'Successive Division of 13 by 2',
      diagramType: 'formula',
      content: '13 ÷ 2 = 6 (R1)  ➔  6 ÷ 2 = 3 (R0)  ➔  3 ÷ 2 = 1 (R1)  ➔  1 ÷ 2 = 0 (R1)  |  Result: 1101₂',
      caption: 'Reading remainders from bottom to top yields: 13₁₀ = 1101₂ (8 + 4 + 0 + 1 = 13).'
    },
    realWorldExample: {
      en: 'When a teacher gives you a score of 25 in class, the computer lab grading software converts 25 into binary: 16 + 8 + 1 = 11001₂ before saving it onto the school server hard disk!',
      si: 'ගුරුතුමිය ලකුණු 25ක් ලබාදුන් විට, පාසල් පරිගණකය එම 25 ද්විමය බවට (16 + 8 + 1 = 11001₂) හරවා දෘඪ තැටියේ තැන්පත් කරයි!',
      ta: 'ஆசிரியர் 25 புள்ளிகள் வழங்கும் போது, பள்ளி கணினி அதை 11001₂ (16 + 8 + 1) என இருமமாக மாற்றி சேமிக்கிறது!',
    },
    checkQuestion: {
      id: 'num-q3',
      subjectId: 'ict',
      topicId: 'number-systems',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'What is the binary representation of the decimal number 19?',
        si: '19 යන දශමය සංඛ්‍යාවට අනුරූප ද්විමය සංඛ්‍යාව කුමක්ද?',
        ta: '19 என்ற தசம எண்ணின் இரும வடிவம் என்ன?',
      },
      options: [
        { id: 'opt-1', text: { en: '10011₂ (16 + 2 + 1)', si: '10011₂ (16 + 2 + 1)', ta: '10011₂ (16 + 2 + 1)' } },
        { id: 'opt-2', text: { en: '11001₂ (16 + 8 + 1)', si: '11001₂ (16 + 8 + 1)', ta: '11001₂ (16 + 8 + 1)' } },
        { id: 'opt-3', text: { en: '10101₂ (16 + 4 + 1)', si: '10101₂ (16 + 4 + 1)', ta: '10101₂ (16 + 4 + 1)' } },
        { id: 'opt-4', text: { en: '11111₂ (16 + 8 + 4 + 2 + 1)', si: '11111₂ (31)', ta: '11111₂ (31)' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: '19 = 16 + 2 + 1 = 2⁴(1) + 2³(0) + 2²(0) + 2¹(1) + 2⁰(1) = 10011₂.',
        si: '19 = 16 + 2 + 1 බැවින් ද්විමය අගය 10011₂ වේ.',
        ta: '19 = 16 + 2 + 1 = 2⁴(1) + 2³(0) + 2²(0) + 2¹(1) + 2⁰(1) = 10011₂.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 1: Number Systems (Textbook p. 7–10)',
    }
  }
];

export const TEACH_ME_CONFIGURING_COMPUTER_STEPS: LessonStep[] = [
  {
    id: 'cfg-step-1',
    stepNumber: 1,
    title: {
      en: 'Desktop Customization & Display Settings',
      si: 'ඩෙස්ක්ටොප් පරිසරය සැකසීම සහ දර්ශන තිර විභේදනය',
      ta: 'திரை அமைப்பு மற்றும் திரை தெளிவுத்திறன்',
    },
    concept: {
      en: 'Configuring the desktop involves customizing visual parameters to enhance comfort and productivity: setting screen resolution (e.g., 1920x1080 Full HD), adjusting screen refresh rates, setting desktop wallpapers, screen savers, and organizing desktop shortcuts and system icons.',
      si: 'ඩෙස්ක්ටොප් පරිසරය සැකසීම යනු පරිගණක භාවිතය පහසු සහ කාර්යක්ෂම කරගැනීමට තිර විභේදනය (Screen Resolution), ඩෙස්ක්ටොප් පසුබිම් රූප (Wallpaper), තිර සුරැකුම් (Screen Savers) සහ කෙටිමං (Shortcuts) අවශ්‍ය පරිදි සකසා ගැනීමයි.',
      ta: 'திரை அமைப்பைத் தனிப்பயனாக்குவது என்பது திரை தெளிவுத்திறன் (Screen Resolution), பின்புலப் படங்கள் (Wallpaper) மற்றும் குறுக்குவழிகளை ஒழுங்கமைப்பதன் மூலம் பயன்பாட்டு வசதியை அதிகரிப்பதாகும்.',
    },
    visualCard: {
      title: 'Display Resolution (Pixels)',
      diagramType: 'diagram',
      content: 'Horizontal Pixels (Width) × Vertical Pixels (Height)  |  Standard Full HD = 1920 × 1080 Pixels',
      caption: 'Higher resolution displays sharper text and more on-screen workspace.'
    },
    realWorldExample: {
      en: 'In your school computer lab, if fonts appear blurry or stretched sideways, adjusting the display resolution to the monitor native setting (e.g. 1920x1080) instantly restores crisp, readable text.',
      si: 'පාසල් පරිගණකයේ අකුරු අපැහැදිලිව හෝ ඇදී පෙනේ නම්, තිර විභේදනය (Resolution) මොනිටරයට ගැළපෙන අගයට සැකසූ විට පැහැදිලිව දිස්වේ.',
      ta: 'கணினி ஆய்வகத்தில் எழுத்துக்கள் மங்கலாகத் தெரிந்தால், திரை தெளிவுத்திறனை மாற்றுவதன் மூலம் தெளிவாக்கலாம்.',
    },
    checkQuestion: {
      id: 'cfg-q1',
      subjectId: 'ict',
      topicId: 'configuring-formatting-computer',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'What does "Screen Resolution" measure on a computer monitor?',
        si: 'පරිගණක මොනිටරයක "Screen Resolution" (තිර විභේදනය) මඟින් මනිනු ලබන්නේ කුමක්ද?',
        ta: 'கணினித் திரையில் "Screen Resolution" எதனை அளவிடுகிறது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'The number of individual pixels displayed horizontally and vertically on the screen', si: 'තිරය මත තිරස්ව සහ සිරස්ව ප්‍රදර්ශනය වන පික්සෙල් (Pixels) සංඛ්‍යාව', ta: 'திரையில் கிடைமட்டமாகவும் செங்குத்தாகவும் உள்ள பிக்சல்களின் எண்ணிக்கை' } },
        { id: 'opt-2', text: { en: 'The physical weight of the monitor glass in kilograms', si: 'මොනිටරයේ බර කිලෝග්‍රෑම් වලින්', ta: 'திரையின் எடை' } },
        { id: 'opt-3', text: { en: 'The internet download speed of the computer', si: 'අන්තර්ජාල බාගත කිරීමේ වේගය', ta: 'இணைய வேகம்' } },
        { id: 'opt-4', text: { en: 'The sound volume of the internal speakers', si: 'පරිගණක ස්පීකරයේ ශබ්දය', ta: 'ஒலி அளவு' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Resolution is specified as width × height in pixels (such as 1920 × 1080). More pixels per inch deliver sharper clarity.',
        si: 'තිර විභේදනය පික්සෙල් (Pixel) ගණනින් මනිනු ලබන අතර පික්සෙල් වැඩිවන තරමට පැහැදිලිතාව වැඩිවේ.',
        ta: 'தெளிவுத்திறன் பிக்சல்களின் எண்ணிக்கையால் அளவிடப்படுகிறது (உதா: 1920 × 1080). பிக்சல்கள் அதிகமாகும் போது தெளிவு அதிகரிக்கும்.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 2: Configuring and Formatting a Computer (Textbook p. 11–17)',
    }
  },
  {
    id: 'cfg-step-2',
    stepNumber: 2,
    title: {
      en: 'Regional Settings & Sri Lankan Language Keyboard Setup',
      si: 'ප්‍රාදේශීය සැකසුම් සහ සිංහල/දෙමළ යුනිකෝඩ් යතුරුපුවරු සැකසීම',
      ta: 'பிராந்திய அமைப்புகளும் சிங்கள/தமிழ் யூனிகோட் விசைப்பலகை அமைப்பும்',
    },
    concept: {
      en: 'To type in mother tongues across Sri Lanka, operating systems support Unicode font rendering and phonetic/Wijesekara keyboard layouts. Configuring Time Zone to UTC+05:30 (Sri Lanka Standard Time) and adding Sinhala and Tamil input methods enables typing in educational software and web searches.',
      si: 'ශ්‍රී ලංකාවේ මව්භාෂාවලින් පරිගණකයේ ලිවීමට යුනිකෝඩ් (Unicode) සහ විජේසේකර/ශබ්ද පරිපාලිත (Phonetic) යතුරුපුවරු එක්කළ හැක. වේලා කලාපය UTC+05:30 (ශ්‍රී ලංකා සම්මත වේලාව) ලෙස සැකසීමද මෙහිදී සිදුකෙරේ.',
      ta: 'இலங்கையின் தேசிய மொழிகளில் தட்டச்சு செய்ய யூனிகோட் (Unicode) எழுத்துருக்களும் விசைப்பலகை அமைப்புகளும் பயன்படுத்தப்படுகின்றன. நேர வலயத்தை UTC+05:30 என அமைப்பது அவசியம்.',
    },
    visualCard: {
      title: 'Multi-Language Keyboard Layouts',
      diagramType: 'infographic',
      content: 'Win + Spacebar ➔ Switch Input Language (EN ↔ SI ↔ TA)  |  Standard: Wijesekara Layout & Tamil 99',
      caption: 'Unicode ensures text typed in Sri Lanka renders properly on any phone or computer worldwide.'
    },
    realWorldExample: {
      en: 'When writing an essay in Sinhala (සිංහල) or Tamil (தமிழ்) for your school magazine, pressing Windows Key + Spacebar toggles directly between English and your national language keyboard!',
      si: 'පාසල් සඟරාවට සිංහලෙන් හෝ දෙමළෙන් ලිපියක් ටයිප් කිරීමේදී Windows Key + Spacebar එබීමෙන් භාෂාවන් අතර මාරුවිය හැක!',
      ta: 'பள்ளி இதழுக்கு தமிழில் தட்டச்சு செய்யும் போது Windows Key + Spacebar அழுத்தி மொழிகளை மாற்றலாம்!',
    },
    checkQuestion: {
      id: 'cfg-q2',
      subjectId: 'ict',
      topicId: 'configuring-formatting-computer',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'What is the correct standard time zone offset for Sri Lanka in the computer date and time settings?',
        si: 'පරිගණක දිනය සහ වේලාව සැකසීමේදී ශ්‍රී ලංකාවේ සම්මත වේලා කලාපය (Time Zone) කුමක්ද?',
        ta: 'கணினி அமைப்பில் இலங்கையின் உத்தியோகபூர்வ நேர வலயம் எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'UTC+05:30 (Sri Jayawardenepura / Colombo)', si: 'UTC+05:30 (ශ්‍රී ජයවර්ධනපුර කෝට්ටේ / කොළඹ)', ta: 'UTC+05:30 (கொழும்பு / ஸ்ரீ ஜெயவர்த்தனபுர)' } },
        { id: 'opt-2', text: { en: 'UTC+00:00 (London Greenwich)', si: 'UTC+00:00 (ලන්ඩන්)', ta: 'UTC+00:00 (லண்டன்)' } },
        { id: 'opt-3', text: { en: 'UTC-05:00 (New York)', si: 'UTC-05:00 (නිව්යෝර්ක්)', ta: 'UTC-05:00 (நியூயோர்க்)' } },
        { id: 'opt-4', text: { en: 'UTC+10:00 (Sydney)', si: 'UTC+10:00 (සිඩ්නි)', ta: 'UTC+10:00 (சிட்னி)' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Sri Lanka Standard Time is five hours and thirty minutes ahead of Coordinated Universal Time (UTC+05:30).',
        si: 'ශ්‍රී ලංකාවේ සම්මත වේලාව විශ්ව සම්මත වේලාවට (UTC) වඩා පැය 5යි මිනිත්තු 30ක් ඉදිරියෙන් (UTC+05:30) පවතී.',
        ta: 'இலங்கை நேரமானது சர்வதேச ஒருங்கிணைந்த நேரத்தை விட 5 மணி 30 நிமிடங்கள் முன்னதாக (UTC+05:30) உள்ளது.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 2: Configuring and Formatting a Computer (Textbook p. 18–24)',
    }
  },
  {
    id: 'cfg-step-3',
    stepNumber: 3,
    title: {
      en: 'Storage Formatting & Drive Maintenance',
      si: 'ආචයන තැටි හැඩසවි ගැන්වීම (Formatting) සහ නඩත්තුව',
      ta: 'சேமிப்பக வடிவமைத்தல் (Formatting) மற்றும் பராமரிப்பு',
    },
    concept: {
      en: 'Formatting a storage device (USB flash drive, SSD, or hard drive) prepares the medium for initial file storage by creating a file system (such as FAT32, exFAT, or NTFS). CAUTION: Formatting completely erases all existing data on that partition. Always back up important files before formatting!',
      si: 'ආචයන උපකරණයක් හැඩසවි ගැන්වීම (Format කිරීම) යනු ලිපිගොනු සුරැකීම සඳහා ගොනු පද්ධතියක් (FAT32, NTFS, exFAT) නිර්මාණය කිරීමයි. අවවාදයයි: Format කිරීමෙන් එහි ඇති සියලුම දත්ත මුළුමනින්ම මැකී යයි! එබැවින් Format කිරීමට පෙර වැදගත් ලිපිගොනු වෙනත් තැනක සුරැකිය යුතුය (Backup).',
      ta: 'Format செய்வது என்பது ஒரு சேமிப்பகத்தில் கோப்பு அமைப்பை (FAT32, NTFS, exFAT) உருவாக்கி புதிய கோப்புகளைச் சேமிக்க தயார்படுத்துவதாகும். எச்சரிக்கை: Format செய்தால் அனைத்து தரவுகளும் நிரந்தரமாக அழியும்! எனவே முன்கூட்டியே காப்புப் பிரதி (Backup) எடுக்கவும்.',
    },
    visualCard: {
      title: 'File System Hierarchy',
      diagramType: 'diagram',
      content: 'Raw Flash/Disk Drive ➔ Format Command ➔ Write File System Table (NTFS/FAT32) ➔ Ready for Files',
      caption: 'Warning: All previous sectors and cluster allocation tables are cleared during formatting.'
    },
    realWorldExample: {
      en: 'When a USB flash drive gets corrupted by a laboratory computer virus, formatting the pen drive recreates a fresh, clean FAT32 file system, completely removing virus scripts.',
      si: 'පරිගණක විද්‍යාගාරයේදී පෙන්ඩ්‍රයිව් එකකට වයිරසයක් ආසාදනය වී ක්‍රියා විරහිත වූ විට, එය Format කිරීමෙන් වයිරස ඉවත්කර නැවත පිරිසිදු තත්ත්වයට පත්කරගත හැක.',
      ta: 'வைரஸ் தாக்கப்பட்ட பென்டிரைவை Format செய்வதன் மூலம் வைரஸ்கள் அகற்றப்பட்டு சுத்தமான புதிய கோப்பு அமைப்பு உருவாகிறது.',
    },
    checkQuestion: {
      id: 'cfg-q3',
      subjectId: 'ict',
      topicId: 'configuring-formatting-computer',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'What crucial precaution MUST be taken prior to formatting a storage drive or USB pen drive?',
        si: 'ආචයන තැටියක් හෝ USB පෙන්ඩ්‍රයිව් එකක් Format කිරීමට පෙර අනිවාර්යයෙන්ම ගතයුතු පූර්වෝපාය කුමක්ද?',
        ta: 'ஒரு சேமிப்பகத்தை Format செய்வதற்கு முன் எடுக்க வேண்டிய மிக முக்கியமான முன்னெச்சரிக்கை நடவடிக்கை என்ன?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Back up all critical files to another storage location because formatting erases all data', si: 'Format කිරීමෙන් සියලු දත්ත මැකී යන බැවින් වැදගත් ලිපිගොනු වෙනත් තැනක සුරක්ෂිතව තැන්පත් කරගැනීම (Backup)', ta: 'அனைத்து முக்கிய கோப்புகளையும் மற்றொரு இடத்தில் காப்புப் பிரதி (Backup) எடுத்தல்' } },
        { id: 'opt-2', text: { en: 'Disconnect the computer from electricity during the formatting process', si: 'Format වන අතරතුර විදුලිය විසන්ධි කිරීම', ta: 'மின்சாரத்தை துண்டித்தல்' } },
        { id: 'opt-3', text: { en: 'Submerge the USB drive in water to cool the memory chips', si: 'මතක චිප සිසිල් කිරීමට පෙන්ඩ්‍රයිව් එක වතුරේ ගිල්වීම', ta: 'பென்டிரைவை தண்ணீரில் நனைத்தல்' } },
        { id: 'opt-4', text: { en: 'Increase screen brightness to maximum', si: 'තිරයේ දීප්තිය උපරිමයට වැඩි කිරීම', ta: 'திரை வெளிச்சத்தை அதிகரித்தல்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Formatting reinitializes the directory index and removes all existing files. Once formatted, data recovery is difficult or impossible.',
        si: 'Format කිරීමෙන් තැටියේ ඇති සියලු ලිපිගොනු මැකී යන බැවින් පෙර සැලකිල්ලක් ලෙස Backup ලබාගත යුතුය.',
        ta: 'Format செய்வது அனைத்து தரவுகளையும் அழித்துவிடும் என்பதால், முன்னதாகவே காப்புப் பிரதி (Backup) எடுப்பது இன்றியமையாதது.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 2: Configuring and Formatting a Computer (Textbook p. 25–33)',
    }
  }
];

export const TEACH_ME_WORD_PROCESSING_STEPS: LessonStep[] = [
  {
    id: 'wp-step-1',
    stepNumber: 1,
    title: {
      en: 'Text Formatting & Paragraph Alignment',
      si: 'අකුරු හැඩසවි ගැන්වීම සහ ඡේද පෙළගැස්වීම',
      ta: 'உரை வடிவமைப்பு மற்றும் பந்தி சீரமைப்பு',
    },
    concept: {
      en: 'Word processors allow precise styling: font typeface, font size, emphasis (Bold, Italic, Underline), and paragraph alignment (Align Left, Center, Align Right, Justify). Justify alignment spaces words evenly so text aligns neatly along both left and right margins, standard in textbooks and newspapers.',
      si: 'වදන් සැකසුම් මෘදුකාංග මඟින් අකුරු වර්ගය (Font), ප්‍රමාණය (Size), තද අකුරු (Bold), ඇල අකුරු (Italic), යටි ඉරි (Underline) සහ ඡේද පෙළගැස්වීම (Left, Center, Right, Justify) සිදුකළ හැක. Justify මඟින් දෙපස දාර එක හා සමානව පෙළගස්වයි.',
      ta: 'சொல் செயலாக்க மென்பொருள் மூலம் எழுத்துரு வகை, அளவு, தடித்த எழுத்து (Bold), சாய்வெழுத்து (Italic) மற்றும் பந்தி சீரமைப்புகளை (Left, Center, Right, Justify) செய்யலாம்.',
    },
    visualCard: {
      title: 'Four Paragraph Alignment Types',
      diagramType: 'infographic',
      content: 'Left Align (Standard) | Center (Headings) | Right Align (Dates/Signatures) | Justify (Books/Newspapers)',
      caption: 'Justify aligns words smoothly against both the left and right margins.'
    },
    realWorldExample: {
      en: 'Open your Grade 8 ICT textbook: notice how the chapter headings are centered, dates or references are right-aligned, and the body paragraphs are justified evenly on both sides!',
      si: 'ඔබේ පෙළපොත දෙස බලන්න: මාතෘකා මැදට (Center) පෙළගස්වා ඇති අතර ප්‍රධාන ඡේද දෙපසම සමපාත වන සේ Justify කර ඇත.',
      ta: 'பாடநூலை கவனியுங்கள்: தலைப்புகள் மையப்படுத்தப்பட்டும் (Center), பந்திகள் இருபுறமும் சீராகவும் (Justify) இருக்கும்!',
    },
    checkQuestion: {
      id: 'wp-q1',
      subjectId: 'ict',
      topicId: 'word-processing',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which paragraph alignment option aligns text evenly along BOTH the left and right margins simultaneously?',
        si: 'ඡේදයක පෙළ වම් සහ දකුණු දාර දෙකටම එකවර සමපාත වන සේ සකසන පෙළගැස්ම කුමක්ද?',
        ta: 'ஒரு பந்தியின் உரையை இடது மற்றும் வலது இரு ஓரங்களிலும் சமமாக சீரமைக்கும் தெரிவு எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Justify', si: 'Justify (දෙපස සමපාත කිරීම)', ta: 'Justify (இருபுற சீரமைப்பு)' } },
        { id: 'opt-2', text: { en: 'Align Left', si: 'Align Left (වම් පෙළගැස්ම)', ta: 'Align Left (இடது சீரமைப்பு)' } },
        { id: 'opt-3', text: { en: 'Align Right', si: 'Align Right (දකුණු පෙළගැස්ම)', ta: 'Align Right (வலது சீரமைப்பு)' } },
        { id: 'opt-4', text: { en: 'Center', si: 'Center (මැදට පෙළගැස්ම)', ta: 'Center (மைய சீரமைப்பு)' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Justify adjusts spacing between words so text touches both margins cleanly, giving printed documents a professional finish.',
        si: 'Justify මඟින් වචන අතර පරතරය සකසා දෙපසම දාරවලට පෙළගස්වයි.',
        ta: 'Justify பந்தியின் இரு ஓரங்களையும் நேர்த்தியாக சமப்படுத்துகிறது.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 3: Word Processing (Textbook p. 34–36)',
    }
  },
  {
    id: 'wp-step-2',
    stepNumber: 2,
    title: {
      en: 'Tables, Graphics & Page Setup',
      si: 'වගු, පින්තූර සහ පිටු සැකසුම (Page Setup)',
      ta: 'அட்டவணைகள், படங்கள் மற்றும் பக்க வடிவமைப்பு',
    },
    concept: {
      en: 'Organizing information in Word processors uses Tables (composed of Rows, Columns, and Cells). Documents are framed by Page Setup: Margins (Top, Bottom, Left, Right), Orientation (Portrait for standard reports, Landscape for wide tables), and Headers/Footers containing page numbers and school names.',
      si: 'තොරතුරු පිළිවෙළකට දැක්වීමට පේළි (Rows), තීරු (Columns) සහ කොටු (Cells) වලින් සමන්විත වගු (Tables) භාවිත කෙරේ. තවද පිටු සැකසුම (Page Setup) මඟින් පිටු මායිම් (Margins), දිශානතිය (Portrait / Landscape) සහ ශීර්ෂ/පාදක (Headers/Footers) සකසයි.',
      ta: 'தகவல்களை நேர்த்தியாக காட்ட அட்டவணைகள் (வரிசைகள், நிரல்கள், சிற்றறைகள்) பயன்படுகின்றன. பக்க அமைப்பில் ஓரங்கள் (Margins), பக்க அமைவு (Portrait / Landscape) மற்றும் தலைப்புகள்/அடிக்குறிப்புகள் அடங்கும்.',
    },
    visualCard: {
      title: 'Page Orientation Types',
      diagramType: 'infographic',
      content: 'Portrait (Height > Width, e.g. Letters)  vs  Landscape (Width > Height, e.g. Wide Timetables)',
      caption: 'Header appears at the top of every page; Footer appears at the bottom.'
    },
    realWorldExample: {
      en: 'When creating your weekly school class timetable, changing page orientation from Portrait to Landscape provides enough horizontal space to show all 8 school periods across Monday to Friday cleanly.',
      si: 'පාසලේ සතිපතා කාලසටහන සකස් කිරීමේදී Landscape දිශානතිය තෝරාගැනීමෙන් සඳුදා සිට සිකුරාදා දක්වා කාලච්ඡේද 8ම එක පිටුවකට පහසුවෙන් ඇතුළත් කළ හැක.',
      ta: 'பள்ளி நேர அட்டவணையை உருவாக்கும் போது Landscape அமைப்பை தெரிவு செய்தால் அனைத்து பாடவேளைகளையும் ஒரே பக்கத்தில் காட்டலாம்.',
    },
    checkQuestion: {
      id: 'wp-q2',
      subjectId: 'ict',
      topicId: 'word-processing',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which page orientation is best suited for printing a wide multi-column table such as a school timetable?',
        si: 'පාසල් කාලසටහනක් වැනි තීරු රාශියක් සහිත පුළුල් වගුවක් මුද්‍රණය කිරීමට වඩාත්ම සුදුසු පිටු දිශානතිය (Orientation) කුමක්ද?',
        ta: 'பள்ளி நேர அட்டவணை போன்ற அகலமான அட்டவணையை அச்சிட மிகவும் பொருத்தமான பக்க அமைவு எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Landscape', si: 'Landscape (තිරස් දිශානතිය)', ta: 'Landscape (கிடைமட்ட அமைவு)' } },
        { id: 'opt-2', text: { en: 'Portrait', si: 'Portrait (සිරස් දිශානතිය)', ta: 'Portrait (செங்குத்து அமைவு)' } },
        { id: 'opt-3', text: { en: 'Inverted Mirror', si: 'කැඩපත් ප්‍රතිබිම්බය', ta: 'தலைகீழ் அமைவு' } },
        { id: 'opt-4', text: { en: 'Circular wrap', si: 'වෘත්තාකාර සැකසුම', ta: 'வட்ட அமைவு' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Landscape orientation orients the page horizontally (width greater than height), providing ample lateral width for broad columns.',
        si: 'Landscape මඟින් පිටුව තිරස් අතට හරවන බැවින් වැඩි තීරු ගණනක් පැහැදිලිව මුද්‍රණය කළ හැක.',
        ta: 'Landscape அமைப்பில் அகலம் அதிகமாக இருப்பதால் விரிவான அட்டவணைகளை எளிதில் அச்சிடலாம்.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 3: Word Processing (Textbook p. 37–38)',
    }
  }
];

export const TEACH_ME_PROGRAMMING_STEPS: LessonStep[] = [
  {
    id: 'prg-step-1',
    stepNumber: 1,
    title: {
      en: 'Introduction to Visual Block Programming (Scratch)',
      si: 'Scratch දෘශ්‍ය ක්‍රමලේඛනය සහ මූලික පරිසරය',
      ta: 'Scratch காட்சி நிரலாக்கமும் அதன் சூழலும்',
    },
    concept: {
      en: 'Visual block programming allows students to create animations and games by snapping code blocks together like puzzle pieces, preventing syntax typing errors. In Scratch: the Stage is the canvas where action takes place, Sprites are characters or objects that perform actions, and Scripts are stacks of interlocking blocks.',
      si: 'දෘශ්‍ය ක්‍රමලේඛනයේදී අකුරු වැරදීම් (syntax errors) නොවී ප්‍රහේලිකා කැබලි මෙන් කේත කුට්ටි (blocks) එකිනෙක සම්බන්ධ කර වැඩසටහන් නිර්මාණය කළ හැක. Scratch හි: Stage යනු නාට්‍ය වේදිකාවයි, Sprites යනු චරිත වන අතර Scripts යනු කේත පෙළයි.',
      ta: 'காட்சி நிரலாக்கத்தில் பிழைகளின்றி புதிர் துண்டுகளைப் போல கட்டளைத் தொகுதிகளை இணைத்து நிரல்களை உருவாக்கலாம். Scratch இல்: Stage என்பது அரங்கம், Sprites என்பவை கதாபாத்திரங்கள், Scripts என்பவை கட்டளைத் தொகுதிகள் ஆகும்.',
    },
    visualCard: {
      title: 'Scratch Workspace Anatomy',
      diagramType: 'infographic',
      content: 'Block Palette (Motion/Looks/Sound/Events) ➔ Scripts Area (Drag & Snap) ➔ Stage with Sprite (Execution)',
      caption: 'The Green Flag event starts the project execution.'
    },
    realWorldExample: {
      en: 'When you drag the "when green flag clicked" block connected to "move 10 steps", clicking the green flag on the top right makes the Scratch Cat take 10 steps across the stage!',
      si: '"when green flag clicked" කුට්ටියට යටින් "move 10 steps" සවි කළ විට, කොළ කොඩිය ක්ලික් කළ සැනින් බළලා ඉදිරියට පියවර 10ක් ගමන් කරයි!',
      ta: '"when green flag clicked" கட்டளையுடன் "move 10 steps" இணைத்தால், கொடியை கிளிக் செய்யும் போது பூனை 10 அடிகள் நகரும்!',
    },
    checkQuestion: {
      id: 'prg-q1',
      subjectId: 'ict',
      topicId: 'programming',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'In the Scratch visual programming environment, what is the character or object that executes script instructions called?',
        si: 'Scratch ක්‍රමලේඛන පරිසරයේදී විධාන ක්‍රියාත්මක කරන චරිතය හෝ වස්තුව හඳුන්වන්නේ කුමන නමකින්ද?',
        ta: 'Scratch நிரலாக்க சூழலில் கட்டளைகளை நிறைவேற்றும் கதாபாத்திரம் எவ்வாறு அழைக்கப்படுகிறது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Sprite', si: 'Sprite (ස්ප්‍රයිට්)', ta: 'Sprite (ஸ்ப்ரைட்)' } },
        { id: 'opt-2', text: { en: 'Stage', si: 'Stage (වේදිකාව)', ta: 'Stage (அரங்கம்)' } },
        { id: 'opt-3', text: { en: 'Backdrop', si: 'Backdrop (පසුබිම)', ta: 'Backdrop (பின்புலம்)' } },
        { id: 'opt-4', text: { en: 'Palette', si: 'Palette (වර්ණ තැටිය)', ta: 'Palette' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Sprites are the actors/characters in Scratch that move, speak, and respond to triggers based on the script blocks attached to them.',
        si: 'ස්ප්‍රයිට් (Sprite) යනු Scratch හි කේත කුට්ටි මඟින් පාලනය වන චරිත වේ.',
        ta: 'Sprite என்பது Scratch இல் அசைவுகளையும் கட்டளைகளையும் செய்யும் கதாபாத்திரமாகும்.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 4: Programming (Textbook p. 39–45)',
    }
  },
  {
    id: 'prg-step-2',
    stepNumber: 2,
    title: {
      en: 'Variables, User Input & Arithmetic Expressions',
      si: 'විචල්‍යයන් (Variables), පරිශීලක ආදාන සහ ගණිත ප්‍රකාශන',
      ta: 'மாறிகள் (Variables), பயனர் உள்ளீடு மற்றும் கணித கோவைகள்',
    },
    concept: {
      en: 'A Variable is a named storage container in computer memory that holds a value which can change during program execution (such as "score", "lives", or "studentAge"). The "ask [Question] and wait" block pauses to collect student typing into the built-in "answer" block.',
      si: 'විචල්‍යයක් (Variable) යනු වැඩසටහන ක්‍රියාත්මක වන අතරතුර වෙනස් විය හැකි අගයන් (ලකුණු, වයස ආදිය) ගබඩා කර තබාගන්නා මතක ස්ථානයකි. "ask and wait" කුට්ටිය මඟින් පරිශීලකයාගෙන් ආදාන ලබාගත හැක.',
      ta: 'மாறி (Variable) என்பது நிரல் இயங்கும் போது மாறக்கூடிய மதிப்புகளை (புள்ளிகள், வயது) சேமிக்கும் நினைவக இடமாகும். "ask and wait" கட்டளை மூலம் பயனரிடம் இருந்து உள்ளீட்டைப் பெறலாம்.',
    },
    visualCard: {
      title: 'Variable Memory Box',
      diagramType: 'diagram',
      content: 'User types "15" ➔ answer block = 15 ➔ set [score] to (score + answer)',
      caption: 'Variables hold numbers or text strings to track state in interactive games.'
    },
    realWorldExample: {
      en: 'In a school quiz game built in Scratch, each time you answer a question correctly, a variable named "Score" increments by 1: "change [Score] by 1".',
      si: 'Scratch ක්‍රීඩාවකදී ප්‍රශ්නයකට නිවැරදි පිළිතුරක් දුන් විට "Score" නැමැති විචල්‍යයේ අගය 1කින් වැඩිවේ: "change [Score] by 1".',
      ta: 'வினாடி வினா விளையாட்டில் சரியான விடை அளிக்கும் போது "Score" என்ற மாறியின் மதிப்பு 1 ஆல் கூடுகிறது.',
    },
    checkQuestion: {
      id: 'prg-q2',
      subjectId: 'ict',
      topicId: 'programming',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'What is the purpose of a "Variable" in a computer program?',
        si: 'පරිගණක වැඩසටහනක "විචල්‍යයක්" (Variable) භාවිත කිරීමේ ප්‍රධාන අරමුණ කුමක්ද?',
        ta: 'ஒரு கணினி நிரலில் மாறியின் (Variable) நோக்கம் என்ன?',
      },
      options: [
        { id: 'opt-1', text: { en: 'To store data that can change and be retrieved during program execution', si: 'වැඩසටහන ක්‍රියාත්මක වන අතරතුර වෙනස්විය හැකි දත්ත තාවකාලිකව ගබඩා කර තබාගැනීම', ta: 'நிரல் இயங்கும் போது மாறக்கூடிய தரவுகளை சேமித்து வைத்தல்' } },
        { id: 'opt-2', text: { en: 'To permanently turn off the computer monitor', si: 'මොනිටරය ස්ථිරවම අක්‍රිය කිරීම', ta: 'திரையை அணைத்தல்' } },
        { id: 'opt-3', text: { en: 'To print physical sheets of paper from the printer', si: 'මුද්‍රණ යන්ත්‍රයෙන් කඩදාසි මුද්‍රණය කිරීම', ta: 'காகிதத்தில் அச்சிடுதல்' } },
        { id: 'opt-4', text: { en: 'To change the physical color of the keyboard keys', si: 'යතුරුපුවරුවේ පාට වෙනස් කිරීම', ta: 'விசைப்பலகை நிறத்தை மாற்றுதல்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Variables are fundamental memory locations assigned a label (like score, timer, or radius) to hold dynamic data.',
        si: 'විචල්‍ය මඟින් වෙනස්වන දත්ත මතකයේ රඳවා තබාගෙන අවශ්‍ය විට ප්‍රයෝජනයට ගනී.',
        ta: 'மாறிகள் என்பவை மதிப்புகளை சேமித்து தேவைப்படும் போது பயன்படுத்த உதவும் நினைவக இடங்கள்.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 4: Programming (Textbook p. 46–49)',
    }
  },
  {
    id: 'prg-step-3',
    stepNumber: 3,
    title: {
      en: 'Control Structures: Selection (If-Then) and Loops (Iteration)',
      si: 'පාලන ව්‍යුහ: තේරීම් (If-Then) සහ පුනරාවර්තන (Loops)',
      ta: 'கட்டுப்பாட்டுக் கட்டமைப்புகள்: தெரிவு (If-Then) மற்றும் சுழற்சிகள் (Loops)',
    },
    concept: {
      en: 'Programs make decisions and repeat actions using control structures: 1. Selection (If-Then / If-Then-Else): executes code only if a Boolean condition is True (e.g. If score > 50, say "Pass"). 2. Iteration (Repeat / Forever): repeats a sequence of blocks multiple times without rewriting them.',
      si: 'වැඩසටහන් තීරණ ගැනීම සහ නැවත නැවත ක්‍රියාත්මක කිරීම පාලන ව්‍යුහ මඟින් සිදුවේ: 1. තේරීම් (If-Then): යම් කොන්දේසියක් සත්‍ය වූ විට පමණක් ක්‍රියාත්මක වේ. 2. පුනරාවර්තන (Loops): එකම උපදෙස් පෙළක් නැවත නැවත ක්‍රියාත්මක කරයි.',
      ta: 'நிரல்கள் முடிவெடுக்கவும் மீண்டும் செய்யவும் கட்டுப்பாட்டுக் கட்டமைப்புகளைப் பயன்படுத்துகின்றன: 1. தெரிவு (If-Then): நிபந்தனை மெய்யாகும் போது மட்டும் இயங்கும். 2. சுழற்சி (Loop): கட்டளைகளை மீண்டும் மீண்டும் செயல்படுத்தும்.',
    },
    visualCard: {
      title: 'Selection vs Iteration Blocks',
      diagramType: 'formula',
      content: 'If <touching color yellow?> then [play sound Win!]  |  repeat (4) [move 100 steps, turn 90 degrees]',
      caption: 'A repeat 4 loop with a 90-degree turn draws a perfect square!'
    },
    realWorldExample: {
      en: 'To draw a square in Scratch: instead of dragging "move 100 steps, turn 90 degrees" 4 separate times, placing it inside a "repeat (4)" block achieves the same drawing with elegant simplicity.',
      si: 'සමචතුරස්‍රයක් ඇඳීමට: "පියවර 100ක් ගොස් අංශක 90ක් හැරෙන්න" යන්න 4 වතාවක් ලියනවා වෙනුවට "repeat (4)" කුට්ටිය තුළ එක්වරක් යෙදීම ප්‍රමාණවත්ය.',
      ta: 'சதுரம் வரைய: 4 முறை கட்டளைகளை எழுதுவதற்கு பதிலாக "repeat (4)" கட்டளைக்குள் ஒருமுறை எழுதினால் போதுமானது.',
    },
    checkQuestion: {
      id: 'prg-q3',
      subjectId: 'ict',
      topicId: 'programming',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which control block is used to execute a set of actions endlessly until the user clicks the red Stop button?',
        si: 'පරිශීලකයා රතු නැවතුම් බොත්තම ඔබන තෙක් කිසිදා නොනැවතී අඛණ්ඩව ක්‍රියාත්මක වන පුනරාවර්තන කුට්ටිය කුමක්ද?',
        ta: 'பயனர் சிவப்பு நிறுத்தப் பொத்தானை அழுத்தும் வரை முடிவின்றி தொடர்ந்து இயங்கும் கட்டளை எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'forever', si: 'forever (සදාකාලික පුනරාවර්තනය)', ta: 'forever (முடிவிலி சுழற்சி)' } },
        { id: 'opt-2', text: { en: 'repeat (10)', si: 'repeat (10) (10 වතාවක්)', ta: 'repeat (10)' } },
        { id: 'opt-3', text: { en: 'stop all', si: 'stop all', ta: 'stop all' } },
        { id: 'opt-4', text: { en: 'wait 1 secs', si: 'wait 1 secs', ta: 'wait 1 secs' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The "forever" block creates an infinite loop that continues cycling until explicitly stopped by an event or the stop button.',
        si: '"forever" කුට්ටිය මඟින් නැවතුම් සංඥාවක් ලැබෙන තුරු අඛණ්ඩව ක්‍රියාත්මක වන ලූපයක් නිර්මාණය කරයි.',
        ta: '"forever" கட்டளை நிறுத்தப்படும் வரை முடிவின்றி இயங்கும் சுழற்சியை உருவாக்குகிறது.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 4: Programming (Textbook p. 50–54)',
    }
  }
];

export const TEACH_ME_PHYSICAL_COMPUTING_STEPS: LessonStep[] = [
  {
    id: 'pc-step-1',
    stepNumber: 1,
    title: {
      en: 'What is Physical Computing? (Microcontrollers)',
      si: 'භෞතික පරිගණනය යනු කුමක්ද? (ක්ෂුද්‍ර පාලක)',
      ta: 'பௌதீகக் கணினியியல் என்றால் என்ன? (நுண்கட்டுப்படுத்திகள்)',
    },
    concept: {
      en: 'Physical computing means building interactive physical systems that sense and respond to the analog real world using programmable hardware. While personal computers have screens and keyboards, Microcontrollers (like the BBC micro:bit and Arduino) are compact single-chip computers built specifically to control lights, motors, and electronic sensors.',
      si: 'භෞතික පරිගණනය යනු ක්‍රමලේඛගත කළ හැකි ක්ෂුද්‍ර පරිපථ මඟින් භෞතික පරිසරය සමඟ සංවේදනය කර ප්‍රතිචාර දක්වන පද්ධති නිර්මාණය කිරීමයි. ක්ෂුද්‍ර පාලක (micro:bit / Arduino) යනු මෝටර්, ලයිට් සහ සංවේදක පාලනය කිරීමට විශේෂයෙන් නිර්මාණය කළ කුඩා පරිගණක වේ.',
      ta: 'பௌதீகக் கணினியியல் என்பது புறச் சூழலை உணர்ந்து அதற்கு எதிர்வினையாற்றும் வன்பொருள் அமைப்புகளை உருவாக்குவதாகும். நுண்கட்டுப்படுத்திகள் (micro:bit / Arduino) உணரிகள் மற்றும் மோட்டார்களை கட்டுப்படுத்த உதவுகின்றன.',
    },
    visualCard: {
      title: 'Microcontroller vs Desktop PC',
      diagramType: 'diagram',
      content: 'Desktop PC (Complex OS, Monitor, Keyboard)  vs  Microcontroller (Dedicated single program, GPIO Pins, Ultra Low Power)',
      caption: 'The BBC micro:bit has a 5x5 LED display, buttons A/B, and motion sensors built directly on the board.'
    },
    realWorldExample: {
      en: 'An automatic street lamp along the Southern Expressway that turns on by itself when the sun sets is a physical computing system powered by a microcontroller and a light sensor!',
      si: 'දක්ෂිණ අධිවේගී මාර්ගයේ සවස් වරුවේ හිරු බැසයත්ම ඉබේ දැල්වෙන වීථි ලාම්පු ක්‍රියාත්මක වන්නේ ආලෝක සංවේදකයක් සහ ක්ෂුද්‍ර පාලකයක් මඟිනි.',
      ta: 'சூரியன் மறைந்ததும் தானாக ஒளிரும் வீதி விளக்குகள் நுண்கட்டுப்படுத்தியினால் இயக்கப்படும் ஒரு பௌதீகக் கணினி அமைப்பாகும்!',
    },
    checkQuestion: {
      id: 'pc-q1',
      subjectId: 'ict',
      topicId: 'physical-computing',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which device is a compact, programmable single-chip board designed specifically to sense and interact with the physical environment?',
        si: 'භෞතික පරිසරය සංවේදනය කර ක්‍රියාත්මක වීම සඳහා විශේෂයෙන් නිර්මාණය කර ඇති කුඩා, ක්‍රමලේඛගත පරිපථ පුවරුව කුමක්ද?',
        ta: 'சுற்றுச்சூழலை உணர்ந்து செயல்பட பிரத்யேகமாக வடிவமைக்கப்பட்ட சிறிய, நிரல்படுத்தக்கூடிய பலகை எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Microcontroller (such as BBC micro:bit or Arduino)', si: 'ක්ෂුද්‍ර පාලකය (micro:bit හෝ Arduino)', ta: 'நுண்கட்டுப்படுத்தி (micro:bit அல்லது Arduino)' } },
        { id: 'opt-2', text: { en: 'Mechanical hard disk drive', si: 'යාන්ත්‍රික දෘඪ තැටිය', ta: 'வன்தட்டு இயக்கி' } },
        { id: 'opt-3', text: { en: 'Flatbed scanner', si: 'ස්කෑනරය', ta: 'ஸ்கேனர்' } },
        { id: 'opt-4', text: { en: 'Inkjet paper printer', si: 'තීන්ත මුද්‍රණ යන්ත්‍රය', ta: 'அச்சுப்பொறி' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Microcontrollers contain a processor, memory, and programmable input/output pins on a single compact chip to interface with sensors and actuators.',
        si: 'ක්ෂුද්‍ර පාලක තුළ ප්‍රොසෙසරය, මතකය සහ ආදාන/ප්‍රතිදාන පින් එකම චිපයක් තුළ අන්තර්ගත වේ.',
        ta: 'நுண்கட்டுப்படுத்திகள் செயலி, நினைவகம் மற்றும் உள்ளீட்டு/வெளியீட்டு ஊசிகளை ஒரே சில்லில் கொண்டுள்ளன.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 5: Physical Computing (Textbook p. 55–58)',
    }
  },
  {
    id: 'pc-step-2',
    stepNumber: 2,
    title: {
      en: 'Sensors (Inputs) vs Actuators (Outputs)',
      si: 'සංවේදක (ආදාන) සහ ක්‍රියාකරවන (ප්‍රතිදාන)',
      ta: 'உணரிகள் (உள்ளீடுகள்) மற்றும் இயங்கிகள் (வெளியீடுகள்)',
    },
    concept: {
      en: 'Physical computing operates through two complementary hardware elements: 1. Sensors (Inputs): detect physical changes in the environment (e.g. Light dependent resistors, temperature sensors, motion accelerometers, push buttons). 2. Actuators (Outputs): produce physical action in response (e.g. LEDs, buzzers, servo motors, solenoid locks).',
      si: 'භෞතික පරිගණනය මූලික උපාංග කොටස් දෙකකින් සමන්විත වේ: 1. සංවේදක (Sensors/ආදාන): පරිසරයේ සිදුවන භෞතික වෙනස්කම් (ආලෝකය, උෂ්ණත්වය, පීඩනය) හඳුනාගනී. 2. ක්‍රියාකරවන (Actuators/ප්‍රතිදාන): ඊට ප්‍රතිචාර ලෙස භෞතික ක්‍රියාවක් (LED ආලෝකය, ශබ්ද, මෝටර් කැරකැවීම) සිදුකරයි.',
      ta: 'பௌதீகக் கணினியியல் இரு முக்கிய கூறுகளைக் கொண்டது: 1. உணரிகள் (Sensors): சுற்றுப்புற மாற்றங்களை (ஒளி, வெப்பநிலை) உணர்கின்றன. 2. இயங்கிகள் (Actuators): அதற்கு ஏற்ப இயக்கங்களை (LED, ஒலி, மோட்டார்) உருவாக்குகின்றன.',
    },
    visualCard: {
      title: 'Physical Computing Sense-Think-Act Loop',
      diagramType: 'infographic',
      content: 'Sensor Input (Detects Darkness) ➔ Microcontroller Logic (If light < 20) ➔ Actuator Output (Turn ON LED Light)',
      caption: 'The microcontroller serves as the brain between the sensor and the actuator.'
    },
    realWorldExample: {
      en: 'In an automated agricultural greenhouse in Nuwara Eliya: when the soil moisture sensor detects that soil is dry (Sensor Input), the microcontroller signals a water pump motor (Actuator Output) to water the plants!',
      si: 'නුවරඑළියේ හරිතාගාරයක: පසේ තෙතමනය අඩුවූ විට තෙතමන සංවේදකය (Sensor) එය හඳුනාගෙන ජල පොම්ප මෝටරය (Actuator) ක්‍රියාත්මක කර පැළවලට ජලය සපයයි.',
      ta: 'நுவரெலியா பசுமை இல்லத்தில்: மண் உலர்வதை உணரி (Sensor) உணர்ந்ததும், நீர் பம்பை (Actuator) இயக்கி பயிர்களுக்கு நீரூற்றுகிறது!',
    },
    checkQuestion: {
      id: 'pc-q2',
      subjectId: 'ict',
      topicId: 'physical-computing',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which of the following devices acts as an ACTUATOR (output component) in a physical computing system?',
        si: 'භෞතික පරිගණක පද්ධතියක "ක්‍රියාකරවනයක්" (Actuator / ප්‍රතිදාන උපාංගයක්) ලෙස ක්‍රියාකරන්නේ පහත කවරක්ද?',
        ta: 'பௌதீகக் கணினி அமைப்பில் ஓர் இயங்கியாக (Actuator / வெளியீட்டுக் கூறு) செயல்படுவது எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Piezo Buzzer (Sound emitter)', si: 'පීසෝ බසරය (Piezo Buzzer - ශබ්ද නිකුත් කරන)', ta: 'பஸர் (Piezo Buzzer - ஒலி எழுப்பி)' } },
        { id: 'opt-2', text: { en: 'Light Dependent Resistor (LDR)', si: 'ආලෝක සංවේදී ප්‍රතිරෝධකය (LDR)', ta: 'ஒளி உணரி (LDR)' } },
        { id: 'opt-3', text: { en: 'Temperature sensor probe', si: 'උෂ්ණත්ව සංවේදකය', ta: 'வெப்பநிலை உணரி' } },
        { id: 'opt-4', text: { en: 'Push button switch', si: 'තද කරන බොත්තම', ta: 'அழுத்தும் பொத்தான்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'A buzzer converts electrical control signals from the microcontroller into sound waves (an output action), making it an actuator.',
        si: 'බසරය විද්‍යුත් සංඥා ශබ්ද තරංග බවට පත්කරන ප්‍රතිදාන උපාංගයක් (Actuator) වේ.',
        ta: 'பஸர் மின் சமிக்ஞைகளை ஒலியாக மாற்றும் வெளியீட்டுக் கூறு (Actuator) ஆகும்.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 5: Physical Computing (Textbook p. 59–62)',
    }
  }
];

export const TEACH_ME_INTERNET_STEPS: LessonStep[] = [
  {
    id: 'net-step-1',
    stepNumber: 1,
    title: {
      en: 'The Internet, World Wide Web & Anatomy of a URL',
      si: 'අන්තර්ජාලය, ලෝක විසිරී වියමන සහ URL ලිපිනයක ව්‍යුහය',
      ta: 'இணையம், உலகளாவிய வலை மற்றும் URL இன் கட்டமைப்பு',
    },
    concept: {
      en: 'The Internet is a global network of interconnected computer networks. The World Wide Web (WWW) is an information service operating over the internet using hyperlinked documents. Every resource on the web has a unique Uniform Resource Locator (URL): Protocol (https://) + Domain Name (e.g., moe.gov.lk) + Path (/curriculum/grade8).',
      si: 'අන්තර්ජාලය යනු ලොව පුරා පරිගණක ජාල එකිනෙක සම්බන්ධ කරන දැවැන්ත ජාලයයි. ලෝක විසිරී වියමන (WWW) යනු අන්තර්ජාලය හරහා වෙබ් පිටු බෙදාහරින සේවාවයි. වෙබ් අඩවියකට පිවිසීමට URL ලිපිනයක් භාවිත කරයි: ප්‍රොටෝකෝලය (https://) + වසම් නාමය (moe.gov.lk) + මාර්ගය (/index.html).',
      ta: 'இணையம் என்பது உலகளாவிய கணினி வலையமைப்பாகும். உலகளாவிய வலை (WWW) என்பது ஆவணங்களை பகிரும் சேவையாகும். ஒவ்வொரு பக்கத்திற்கும் ஒரு தனித்துவமான URL முகவரி உண்டு: Protocol (https://) + Domain Name + Path.',
    },
    visualCard: {
      title: 'URL Address Breakdown',
      diagramType: 'infographic',
      content: 'https:// (Secure Protocol)  +  www.moe.gov.lk (Domain Name: Ministry of Education Sri Lanka)  +  /index.html (Resource Path)',
      caption: 'Top-level domains in Sri Lanka: .lk (Country code), .gov (Government), .ac (Academic/Universities).'
    },
    realWorldExample: {
      en: 'When downloading your school textbooks, typing "https://www.moe.gov.lk" in your browser connects directly to the official Sri Lankan Ministry of Education web server in Colombo!',
      si: 'පාසල් පෙළපොත් බාගත කිරීමට බ්‍රවුසරයේ "https://www.moe.gov.lk" යෙදූ විට, එය කොළඹ පිහිටි අධ්‍යාපන අමාත්‍යාංශයේ සර්වරය වෙත සෘජුවම සම්බන්ධ වේ.',
      ta: 'பாடநூல்களைப் பதிவிறக்க உலாவியில் "https://www.moe.gov.lk" என தட்டச்சு செய்யும் போது, கல்வி அமைச்சின் சேவையகத்துடன் இணைகிறது.',
    },
    checkQuestion: {
      id: 'net-q1',
      subjectId: 'ict',
      topicId: 'internet',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'In the web address "https://www.govdoc.lk/textbooks", what does the ".lk" suffix represent?',
        si: '"https://www.govdoc.lk/textbooks" යන වෙබ් ලිපිනයේ ".lk" මඟින් නියෝජනය වන්නේ කුමක්ද?',
        ta: '"https://www.govdoc.lk/textbooks" என்ற முகவரியில் ".lk" எதனை குறிக்கிறது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Country Code Top-Level Domain (ccTLD) for Sri Lanka', si: 'ශ්‍රී ලංකාව සඳහා වන රට නිරූපණය කරන වසම (ccTLD)', ta: 'இலங்கைக்கான நாட்டின் குறியீட்டு மேல்நிலை டொமைன் (ccTLD)' } },
        { id: 'opt-2', text: { en: 'The physical serial number of the keyboard', si: 'යතුරුපුවරුවේ අනුක්‍රමික අංකය', ta: 'விசைப்பலகை எண்' } },
        { id: 'opt-3', text: { en: 'The battery level of the laptop', si: 'ලැප්ටොප් බැටරි මට්ටම', ta: 'மடிக்கணினி மின்கல அளவு' } },
        { id: 'opt-4', text: { en: 'A code indicating a computer virus', si: 'වයිරසයක් හඳුන්වන කේතයක්', ta: 'வைரஸ் குறியீடு' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: '".lk" is the designated ISO country-code top-level domain managed for organizations and services located in Sri Lanka.',
        si: '".lk" යනු ශ්‍රී ලංකාවේ ආයතන සඳහා වෙන්කර ඇති නිල රටේ ඩොමේන් නාමයයි.',
        ta: '".lk" என்பது இலங்கைக்கான உத்தியோகபூர்வ நாட்டு குறியீட்டு டொமைன் ஆகும்.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 6: Internet (Textbook p. 63–68)',
    }
  },
  {
    id: 'net-step-2',
    stepNumber: 2,
    title: {
      en: 'Electronic Mail (Email) & Cyber Safety Practices',
      si: 'විද්‍යුත් තැපෑල (Email) සහ ආරක්ෂිත අන්තර්ජාල භාවිතය',
      ta: 'மின்னஞ்சல் (Email) மற்றும் இணையப் பாதுகாப்பு முறைகள்',
    },
    concept: {
      en: 'Email components: "To" (Primary recipient), "Cc" (Carbon Copy - transparently informs other parties), "Bcc" (Blind Carbon Copy - hides recipient addresses for privacy). Cyber Safety: Never share passwords, beware of phishing emails asking for personal credentials, and verify HTTPS encryption padlock before entering sensitive information.',
      si: 'විද්‍යුත් තැපැල් (Email) කොටස්: "To" (ප්‍රධාන ලබන්නා), "Cc" (පිටපත් ලබන්නන්), "Bcc" (රහස්‍ය පිටපත් ලබන්නන්). සයිබර් ආරක්ෂාව: මුරපද (Passwords) කිසිවෙකුට නොදෙන්න, වංචනික (Phishing) ඊමේල්වල ඇති සැකකටයුතු සබැඳි ක්ලික් නොකරන්න.',
      ta: 'மின்னஞ்சல் கூறுகள்: "To" (முதன்மை பெறுநர்), "Cc" (வெளிப்படையான நகல்), "Bcc" (ரகசிய நகல்). இணையப் பாதுகாப்பு: கடவுச்சொற்களை பகிர வேண்டாம், போலியான (Phishing) மின்னஞ்சல்கள் குறித்து எச்சரிக்கையாக இருக்கவும்.',
    },
    visualCard: {
      title: 'Email Addressing Privacy',
      diagramType: 'infographic',
      content: 'To: Principal | Cc: Vice Principal (Visible to all) | Bcc: 50 Students (Addresses kept completely hidden)',
      caption: 'Bcc protects recipient privacy when emailing large school groups.'
    },
    realWorldExample: {
      en: 'When your school sends an announcement to 200 parents, using Bcc prevents parents from seeing each other personal private email addresses, respecting digital privacy laws.',
      si: 'පාසලේ නිවේදනයක් දෙමාපියන් 200 දෙනෙකුට යැවීමේදී Bcc භාවිත කළ විට එකිනෙකාගේ පෞද්ගලික ඊමේල් ලිපින අනෙක් අයට නොපෙනී ආරක්ෂා වේ.',
      ta: 'பள்ளி அறிவிப்பை பல பெற்றோருக்கு அனுப்பும் போது Bcc ஐப் பயன்படுத்தினால், மற்றவர்களின் மின்னஞ்சல் முகவரிகள் வெளிப்படாமல் பாதுகாக்கப்படும்.',
    },
    checkQuestion: {
      id: 'net-q2',
      subjectId: 'ict',
      topicId: 'internet',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which email addressing field should you use to send a message to a recipient without revealing their email address to other recipients?',
        si: 'අනෙකුත් ලබන්නන්ට ලිපිනය රහසිගතව තබාගනිමින් ඊමේල් පණිවිඩයක් යැවීමට භාවිත කළ යුතු ක්ෂේත්‍රය කුමක්ද?',
        ta: 'மற்ற பெறுநர்களுக்கு தெரியாமல் ரகசியமாக மின்னஞ்சல் நகலை அனுப்ப எந்தப் புலத்தைப் பயன்படுத்த வேண்டும்?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Bcc (Blind Carbon Copy)', si: 'Bcc (Blind Carbon Copy)', ta: 'Bcc (மறைக்கப்பட்ட நகல்)' } },
        { id: 'opt-2', text: { en: 'Cc (Carbon Copy)', si: 'Cc (Carbon Copy)', ta: 'Cc (வெளிப்படை நகல்)' } },
        { id: 'opt-3', text: { en: 'Subject line', si: 'Subject (මාතෘකාව)', ta: 'Subject (தலைப்பு)' } },
        { id: 'opt-4', text: { en: 'Spam folder', si: 'Spam ෆෝල්ඩරය', ta: 'Spam கோப்புறை' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Bcc (Blind Carbon Copy) conceals recipient addresses from everyone else on the email thread.',
        si: 'Bcc මඟින් අනෙකුත් ලබන්නන්ට නොපෙනෙන පරිදි ලිපිනය රහසිගතව තබාගනී.',
        ta: 'Bcc என்பது மற்ற பெறுநர்களுக்கு முகவரியைக் காட்டாமல் அனுப்பும் ரகசிய நகல் ஆகும்.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 6: Internet (Textbook p. 69–76)',
    }
  }
];

export const TEACH_ME_HARDWARE_STEPS = TEACH_ME_CONFIGURING_COMPUTER_STEPS;

export const TEACH_ME_HISTORY_HERITAGE_STEPS: LessonStep[] = [
  {
    id: 'hist-her-1',
    stepNumber: 1,
    title: {
      en: 'Literary Sources & Historical Chronicles',
      si: 'සාහිත්‍ය මූලාශ්‍ර සහ ඓතිහාසික වංශකථා',
      ta: 'இலக்கிய மூலாதாரங்களும் வரலாற்று நூல்களும்',
    },
    concept: {
      en: 'Historians reconstruct Sri Lankan history through literary sources: Indigenous chronicles written in Pali and Sinhala (Deepavamsa, Mahavamsa by Ven. Mahanama, Chulavamsa, Pujavaliya, Rajavaliya) and Foreign travelogues (Greek accounts of Taprobane, Chinese monk Faxian, Moroccan traveler Ibn Battuta, Robert Knox).',
      si: 'ශ්‍රී ලංකා ඉතිහාසය ගොඩනැඟීමට සාහිත්‍ය මූලාශ්‍ර උපකාරී වේ: දේශීය වංශකථා (දීපවංශය, මහානාම හිමියන්ගේ මහාවංශය, චූලවංශය, පූජාවලිය) සහ විදේශීය වාර්තා (ෆාහියන් හිමි, ඉබන් බතූතා, රොබට් නොක්ස්).',
      ta: 'இலங்கை வரலாற்றை அறிய இலக்கிய மூலாதாரங்கள் பயன்படுகின்றன: உள்நாட்டு நூல்கள் (தீபவம்சம், மகாவம்சம், சூளவம்சம், பூஜாவலிய) மற்றும் வெளிநாட்டு குறிப்புகள் (பாஹியான் துறவி, இப்னு பதூதா, ரொபர்ட் நொக்ஸ்).',
    },
    visualCard: {
      title: 'Sources of Sri Lankan History',
      diagramType: 'infographic',
      content: 'Literary Sources (Mahavamsa/Dipavamsa)  +  Archaeological Inscriptions (Brahmi Inscriptions, Coins, Slabs)',
      caption: 'The Mahavamsa provides an unbroken chronological account of the island monarchy.'
    },
    realWorldExample: {
      en: 'When visiting Sigiriya or Anuradhapura, the events described in ancient palm-leaf ola manuscripts (Mahavamsa) match the massive brick stupas and stone ruins standing right before your eyes!',
      si: 'අනුරාධපුරයේ හෝ සීගිරියේ සංචාරය කරන විට පුස්කොළ පොත්වල සඳහන් විස්තර සහ අද දකින්නට ඇති නටබුන් එකිනෙක මනාව ගැළපේ!',
      ta: 'அனுராதபுரத்தின் சிதைவுகளைப் பார்க்கும் போது, மகாவம்சத்தில் எழுதப்பட்ட வரலாற்று நிகழ்வுகளுடன் அவை பொருந்துவதைக் காணலாம்!',
    },
    checkQuestion: {
      id: 'hist-her-q1',
      subjectId: 'history',
      topicId: 'history-gr10-ancient-heritage',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Who is recognized as the author of the first part of the ancient Sri Lankan chronicle "Mahavamsa"?',
        si: 'ශ්‍රී ලංකාවේ ප්‍රමුඛතම ඓතිහාසික වංශකථාව වන "මහාවංශයේ" ප්‍රථම භාගයේ කතුවරයා කවුරුන්ද?',
        ta: 'மகாவம்சத்தின் முதற் பகுதியை இயற்றிய ஆசிரியர் யார்?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Ven. Mahanama Thero', si: 'මහානාම හිමි', ta: 'மகாநாம தேரர்' } },
        { id: 'opt-2', text: { en: 'King Dutugemunu', si: 'දුටුගැමුණු රජු', ta: 'துட்டகைமுனு மன்னன்' } },
        { id: 'opt-3', text: { en: 'Robert Knox', si: 'රොබට් නොක්ස්', ta: 'ரொபர்ட் நொக்ஸ்' } },
        { id: 'opt-4', text: { en: 'Ven. Walpola Rahula Thero', si: 'වල්පොල රාහුල හිමි', ta: 'வால்பொல ராஹுல தேரர்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Ven. Mahanama Thero authored the first 37 chapters of the Mahavamsa at the Mahavihara in Anuradhapura during the 5th century CE.',
        si: 'ක්‍රි.ව. 5 වන සියවසේදී අනුරාධපුර මහා විහාරයේදී මහානාම හිමියන් විසින් මහාවංශයේ මුල් කොටස රචනා කරන ලදී.',
        ta: 'கி.பி. 5 ஆம் நூற்றாண்டில் மகாநாம தேரரால் மகாவம்சத்தின் முதல் பகுதி இயற்றப்பட்டது.',
      },
      syllabusReference: 'Sri Lankan Grade 10 History — Chapter 1: Sources of Sri Lankan History',
    }
  }
];

export const TEACH_ME_HISTORY_POLONNARUWA_STEPS: LessonStep[] = [
  {
    id: 'hist-pol-1',
    stepNumber: 1,
    title: {
      en: 'The Polonnaruwa Kingdom & Parakrama Samudraya',
      si: 'පොළොන්නරු රාජධානිය සහ පරාක්‍රම සමුද්‍රය',
      ta: 'பொலன்னறுவை இராச்சியமும் பராக்கிரம சமுத்திரமும்',
    },
    concept: {
      en: 'After King Vijayabahu I liberated the country from Chola occupation in 1070 CE, Polonnaruwa reached its zenith under King Parakramabahu the Great (1153–1186 CE). Famous for his decree that "Not even a drop of rain water must flow into the ocean without serving the welfare of mankind", he constructed the magnificent Parakrama Samudraya.',
      si: '1070දී විජයබාහු රජු චෝළ ආක්‍රමණිකයන් පලවාහැරීමෙන් පසු, මහා පරාක්‍රමබාහු රජු (1153–1186) "අහසින් වැටෙන එකදු දිය බිඳක් හෝ මිනිසාගේ ප්‍රයෝජනයට නොගෙන මුහුදට නොගැලිය යුතුය" යන උදාර සංකල්පය පෙරදැරි කරගෙන පරාක්‍රම සමුද්‍රය කරවීය.',
      ta: '1070 இல் விஜயபாகு மன்னன் சோழர்களை விரட்டியடித்த பின், மகா பராக்கிரமபாகு மன்னன் (1153–1186) "வானத்திலிருந்து விழும் ஒரு துளி நீரும் மனிதனுக்கு பயன்படாமல் கடலில் கலக்கக் கூடாது" என்ற கோட்பாட்டின் கீழ் பராக்கிரம சமுத்திரத்தை அமைத்தார்.',
    },
    visualCard: {
      title: 'Parakrama Samudraya Giant Reservoir',
      diagramType: 'infographic',
      content: 'Merges Topa Wewa + Dambulu Wewa + Eramudu Wewa ➔ Fed by Angamedilla canal from Amban Ganga',
      caption: 'Irrigated vast tracts of dry zone paddy fields, transforming Sri Lanka into the "Granary of the East".'
    },
    realWorldExample: {
      en: 'Stand on the massive earthen bund of Parakrama Samudraya in Polonnaruwa today: the reservoir stretches so far that the opposite shore disappears over the horizon like a true inland sea (Samudraya)!',
      si: 'අදත් පොළොන්නරුවේ පරාක්‍රම සමුද්‍රය අසල සිට බලන විට එහි අනෙක් ඉවුර නොපෙනෙන තරම් විශාල සාගරයක් බඳුය!',
      ta: 'இன்று பொலன்னறுவை பராக்கிரம சமுத்திரத்தின் கரையில் நின்று பார்த்தால் அதன் மறுபக்கம் தெரியாத அளவு கடலைப் போல பரந்து விரிந்து காணப்படும்!',
    },
    checkQuestion: {
      id: 'hist-pol-q1',
      subjectId: 'history',
      topicId: 'history-gr10-hydraulic-society',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which monarch is famous for declaring: "Not even a single drop of rain water must flow into the ocean without being useful to mankind"?',
        si: '"අහසින් වැටෙන එකදු දිය බිඳක් හෝ ලෝකෝපකාරයෙන් තොරව මුහුදට නොගැලිය යුතුය" යනුවෙන් ප්‍රකාශ කළ ශ්‍රේෂ්ඨ රජු කවුද?',
        ta: '"வானத்திலிருந்து விழும் ஒரு துளி நீரும் மனிதனுக்கு பயன்படாமல் கடலுக்கு செல்லக்கூடாது" என பிரகடனம் செய்த மன்னன் யார்?',
      },
      options: [
        { id: 'opt-1', text: { en: 'King Parakramabahu I (The Great)', si: 'මහා පරාක්‍රමබාහු රජු', ta: 'மகா பராக்கிரமபாகு மன்னன்' } },
        { id: 'opt-2', text: { en: 'King Devanampiyatissa', si: 'දේවානම්පියතිස්ස රජු', ta: 'தேவாநாம்ப்பியதிஸ்ஸ மன்னன்' } },
        { id: 'opt-3', text: { en: 'King Mahasen', si: 'මහසෙන් රජු', ta: 'மகாசென் மன்னன்' } },
        { id: 'opt-4', text: { en: 'King Kashyapa', si: 'කාශ්‍යප රජු', ta: 'காசியப்ப மன்னன்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'King Parakramabahu I of Polonnaruwa prioritized nationwide irrigation networks to make the nation self-sufficient in food.',
        si: 'පොළොන්නරුවේ මහා පරාක්‍රමබාහු රජු රට සහලින් ස්වයංපෝෂිත කිරීම සඳහා මෙම දැවැන්ත වාරි ව්‍යාපාර ඇරඹීය.',
        ta: 'மகா பராக்கிரமபாகு மன்னன் விவசாயத்தை தன்னிறைவு அடையச் செய்ய இந்த நீரியல் புரட்சியை முன்னெடுத்தார்.',
      },
      syllabusReference: 'Sri Lankan Grade 10 History — Chapter 2: The Polonnaruwa Era & Hydraulic Civilization',
    }
  }
];

export const TEACH_ME_HISTORY_COLONIAL_STEPS: LessonStep[] = [
  {
    id: 'hist-col-1',
    stepNumber: 1,
    title: {
      en: 'Colonial Maritime Arrivals & Kandyan Resistance',
      si: 'යුරෝපීය ආක්‍රමණ සහ උඩරට රාජධානියේ ප්‍රතිරෝධය',
      ta: 'ஐரோப்பியர் ஆக்கிரமிப்பும் கண்டி இராச்சியத்தின் எதிர்ப்பும்',
    },
    concept: {
      en: 'The Portuguese arrived in 1505 CE seeking spices (especially cinnamon) and maritime control, followed by the Dutch in 1658 CE. While European powers controlled the coastal lowlands, the independent Kingdom of Kandy defended national sovereignty through mountainous terrain and guerrilla warfare in battles such as Danture (1594) and Gannoruwa (1638).',
      si: 'කුළුබඩු (විශේෂයෙන් කුරුඳු) සහ වෙළඳ ආධිපත්‍යය සොයා 1505දී පෘතුගීසීන්ද, පසුව 1658දී ලන්දේසීන්ද පැමිණියහ. මුහුදුබඩ තීරය ඔවුන් යටතට පත්වුවද, උඩරට රාජධානිය දන්තුරේ (1594) සහ ගන්නෝරුව (1638) සටන් මඟින් සිය ස්වාධීනත්වය රැකගත්තේය.',
      ta: '1505 இல் போர்த்துக்கேயரும், 1658 இல் டச்சுக்காரரும் கறுவா வர்த்தகத்திற்காக வந்தனர். கரையோரப் பகுதிகளை அவர்கள் பிடித்த போதும், கண்டி இராச்சியம் தந்தூரே, கன்னொருவ போர்கள் மூலம் தனது சுதந்திரத்தை பாதுகாத்தது.',
    },
    visualCard: {
      title: 'Colonial Eras Timeline',
      diagramType: 'infographic',
      content: 'Portuguese Maritime Rule (1505–1658) ➔ Dutch Rule (1658–1796) ➔ British Rule (1796–1948)',
      caption: 'The Kingdom of Kandy remained an independent sovereign bastion until the 1815 Kandyan Convention.'
    },
    realWorldExample: {
      en: 'Walk along the ramparts of Galle Fort: built by the Portuguese and expanded by the Dutch in 1663, it stands as an enduring physical monument of maritime colonial history in Sri Lanka.',
      si: 'ගාල්ල කොටු පවුර දෙස බලන්න: 1663දී ලන්දේසීන් විසින් ඉදිකළ එම කොටු බැම්ම අදටත් යටත් විජිත සමයේ ජීවමාන සාක්ෂියකි.',
      ta: 'காலி கோட்டையை பாருங்கள்: டச்சுக்காரர்களால் 1663 இல் அமைக்கப்பட்ட இக்கோட்டை காலனித்துவ வரலாற்றின் நேரடி சான்றாகும்.',
    },
    checkQuestion: {
      id: 'hist-col-q1',
      subjectId: 'history',
      topicId: 'history-gr10-colonial-transitions',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which decisive battle fought in 1594 secured the independence of the Kingdom of Kandy against Portuguese invasion?',
        si: '1594දී පෘතුගීසි ආක්‍රමණය පරාජය කරමින් උඩරට රාජධානියේ ස්වාධීනත්වය තහවුරු කළ තීරණාත්මක සටන කුමක්ද?',
        ta: '1594 இல் போர்த்துக்கேய ஆக்கிரமிப்பை முறியடித்து கண்டி இராச்சியத்தின் சுதந்திரத்தை உறுதி செய்த வரலாற்றுச் சமர் எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Battle of Danture (1594)', si: 'දන්තුරේ සටන (1594)', ta: 'தந்தூரே சமர் (1594)' } },
        { id: 'opt-2', text: { en: 'Battle of Mulleriyawa', si: 'මුල්ලේරියාව සටන', ta: 'முல்லேரியாவ சமர்' } },
        { id: 'opt-3', text: { en: 'Battle of Randeniwela', si: 'රන්දෙනිවෙල සටන', ta: 'ரந்தெனிவெல சமர்' } },
        { id: 'opt-4', text: { en: 'Battle of Gannoruwa', si: 'ගන්නෝරුව සටන', ta: 'கன்னொருவ சமர்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'At the Battle of Danture in 1594, King Vimaladharmasuriya I completely annihilated the Portuguese invading force led by Pero Lopes de Sousa, safeguarding Kandyan sovereignty.',
        si: '1594 දන්තුරේ සටනේදී පළමුවන විමලධර්මසූරිය රජු පෘතුගීසි සේනාව සම්පූර්ණයෙන්ම පරාජය කළේය.',
        ta: '1594 இல் நடைபெற்ற தந்தூரே சமரில் முதலாம் விமலதர்மசூரிய மன்னன் போர்த்துக்கேய படையை முழுமையாக தோற்கடித்தார்.',
      },
      syllabusReference: 'Sri Lankan Grade 10 History — Chapter 3: Colonial Encounters & Kandyan Resistance',
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
  'number-systems': TEACH_ME_NUMBER_SYSTEMS_STEPS,
  'configuring-formatting-computer': TEACH_ME_CONFIGURING_COMPUTER_STEPS,
  'word-processing': TEACH_ME_WORD_PROCESSING_STEPS,
  'programming': TEACH_ME_PROGRAMMING_STEPS,
  'physical-computing': TEACH_ME_PHYSICAL_COMPUTING_STEPS,
  'internet': TEACH_ME_INTERNET_STEPS,
  'ancient-hydraulics': TEACH_ME_HYDRAULICS_STEPS,
  'pythagoras-theorem': TEACH_ME_PYTHAGORAS_STEPS,
  'algorithms-flowcharts': TEACH_ME_ALGORITHMS_STEPS,
  'computer-systems-hardware': TEACH_ME_CONFIGURING_COMPUTER_STEPS,
  'history-gr10-ancient-heritage': TEACH_ME_HISTORY_HERITAGE_STEPS,
  'history-gr10-hydraulic-society': TEACH_ME_HISTORY_POLONNARUWA_STEPS,
  'history-gr10-colonial-transitions': TEACH_ME_HISTORY_COLONIAL_STEPS,
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
