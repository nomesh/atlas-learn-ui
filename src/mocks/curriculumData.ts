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
