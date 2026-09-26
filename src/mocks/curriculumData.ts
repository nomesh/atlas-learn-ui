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
    id: 'maths-gr10-ch1-perimeter',
    subjectId: 'maths',
    chapterNumber: 1,
    grade: 'grade-10',
    title: {
      en: 'Perimeter',
      si: 'පරිමිතිය',
      ta: 'சுற்றளவு',
    },
    description: {
      en: 'Arc length of a sector of a circle, perimeter of sectors and composite plane figures (Textbook Part 1, p. 1–14).',
      si: 'වෘත්තයක කේන්ද්‍රික ඛණ්ඩයක චාප දිග, කේන්ද්‍රික ඛණ්ඩ හා සංයුක්ත තල රූපවල පරිමිතිය (පෙළපොත 1 කොටස, පිටු 1–14).',
      ta: 'ஆரைச்சிறையின் வில்லின் நீளம், ஆரைச்சிறைகள் மற்றும் கூட்டு உருவங்களின் சுற்றளவு (பாடநூல் பகுதி 1, பக். 1–14).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch2-real-numbers',
    subjectId: 'maths',
    chapterNumber: 2,
    grade: 'grade-10',
    title: {
      en: 'Real Numbers & Decimals',
      si: 'තාත්වික සංඛ්‍යා සහ දශම',
      ta: 'மெய் எண்களும் தசமங்களும்',
    },
    description: {
      en: 'Rational and irrational numbers, terminating and recurring decimals, and surds on the number line (Textbook Part 1, p. 15–28).',
      si: 'පරිමේය හා අපරිමේය සංඛ්‍යා, අන්ත සහ ආවර්තී දශම, සහ සංඛ්‍යා රේඛාව මත කරණි (පෙළපොත 1 කොටස, පිටු 15–28).',
      ta: 'விகிதமுறு மற்றும் விகிதமுறா எண்கள், முடிவுறு மற்றும் மீளும் தசமங்கள் (பாடநூல் பகுதி 1, பக். 15–28).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch3-indices-logarithms',
    subjectId: 'maths',
    chapterNumber: 3,
    grade: 'grade-10',
    title: {
      en: 'Indices & Logarithms I',
      si: 'දර්ශක හා ලඝුගණක I',
      ta: 'சுட்டிகளும் மடக்கைகளும் I',
    },
    description: {
      en: 'Laws of indices with fractional and negative powers, expressing numbers in scientific notation, and log conversions (Textbook Part 1, p. 29–48).',
      si: 'භාගික සහ සෘණ දර්ශක නීති, සම්මත ආකාරයෙන් සංඛ්‍යා ලිවීම, සහ ලඝුගණක පරිවර්තන (පෙළපොත 1 කොටස, පිටු 29–48).',
      ta: 'சுட்டி விதிகள், விஞ்ஞானக் குறியீட்டு முறை மற்றும் மடக்கை அடிப்படைகள் (பாடநூல் பகுதி 1, பக். 29–48).',
    },
    lessonsCount: 5,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch4-algebraic-expressions',
    subjectId: 'maths',
    chapterNumber: 4,
    grade: 'grade-10',
    title: {
      en: 'Algebraic Expressions',
      si: 'වීජීය ප්‍රකාශන',
      ta: 'இயற்கணிதக் கோவைகள்',
    },
    description: {
      en: 'Expansion of binomial products (a+b)(c+d), (a+b)², factorizing quadratic expressions of form ax² + bx + c (Textbook Part 1, p. 49–64).',
      si: 'ද්විපද ගුණිත ප්‍රසාරණය, (a+b)², ax² + bx + c ආකාරයේ වර්ගජ ප්‍රකාශන සාධක වෙන් කිරීම (පෙළපොත 1 කොටස, පිටු 49–64).',
      ta: 'ஈருறுப்புக் கோவைகளின் பெருக்கம் மற்றும் இருபடி இயற்கணிதக் கோவைகளின் காரணிப்படுத்தல் (பாடநூல் பகுதி 1, பக். 49–64).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch5-linear-equations',
    subjectId: 'maths',
    chapterNumber: 5,
    grade: 'grade-10',
    title: {
      en: 'Linear Equations',
      si: 'සරල සමීකරණ',
      ta: 'எளிய சமன்பாடுகள்',
    },
    description: {
      en: 'Solving single-variable linear equations with brackets/fractions and simultaneous linear equations with two unknowns (Textbook Part 1, p. 65–82).',
      si: 'වරහන් සහ භාග සහිත ඒකජ සමීකරණ සහ විචල්‍ය දෙකක් සහිත සමගාමී සමීකරණ විසඳීම (පෙළපොත 1 කොටස, පිටු 65–82).',
      ta: 'ஒரு மாறியுடைய எளிய சமன்பாடுகள் மற்றும் இரு மாறிகளுடைய ஒருங்கமை சமன்பாடுகளைத் தீர்த்தல் (பாடநூல் பகுதி 1, பக். 65–82).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch6-angles-polygons',
    subjectId: 'maths',
    chapterNumber: 6,
    grade: 'grade-10',
    title: {
      en: 'Angles of Polygons',
      si: 'බහුඅස්‍රවල කෝණ',
      ta: 'பல்கோணிகளின் கோணங்கள்',
    },
    description: {
      en: 'Sum of interior angles of an n-sided polygon (2n-4)×90°, sum of exterior angles = 360°, and regular polygons (Textbook Part 1, p. 83–98).',
      si: 'n-පාද බහුඅස්‍රයක අභ්‍යන්තර කෝණවල එකතුව (2n-4)×90°, බාහිර කෝණවල එකතුව = 360°, සහ සවිධි බහුඅස්‍ර (පෙළපොත 1 කොටස, පිටු 83–98).',
      ta: 'பல்கோணியின் அகக் கோணங்களின் கூட்டுத்தொகை (2n-4)×90° மற்றும் புறக் கோணங்களின் கூட்டுத்தொகை (பாடநூல் பகுதி 1, பக். 83–98).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch7-scale-diagrams',
    subjectId: 'maths',
    chapterNumber: 7,
    grade: 'grade-10',
    title: {
      en: 'Scale Diagrams & Bearings',
      si: 'පරිමාණ රූප සහ දිශානති',
      ta: 'அளவுத்திட்டப் படங்களும் திசைகோள்களும்',
    },
    description: {
      en: 'Scale representation, three-figure bearings, angles of elevation and depression, and navigational diagrams (Textbook Part 1, p. 99–114).',
      si: 'පරිමාණ නිරූපණය, ත්‍රියංක දිශානති, ආරෝහණ සහ අවරෝහණ කෝණ, සහ සිතියම් සටහන් (පෙළපොත 1 කොටස, පිටු 99–114).',
      ta: 'அளவுத்திட்டம், முவ்விலக்கத் திசைகோள்கள், ஏற்றக் கோணம் மற்றும் இறக்கக் கோணம் (பாடநூல் பகுதி 1, பக். 99–114).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch8-surface-area',
    subjectId: 'maths',
    chapterNumber: 8,
    grade: 'grade-10',
    title: {
      en: 'Surface Area of Solids',
      si: 'ඝන වස්තුවල පෘෂ්ඨ වර්ගඵලය',
      ta: 'திண்மங்களின் மேற்பரப்பளவு',
    },
    description: {
      en: 'Curved and total surface area of right circular cylinders (2πrh + 2πr²), triangular and rectangular prisms (Textbook Part 1, p. 115–128).',
      si: 'සෘජු වෘත්තාකාර සිලින්ඩරයක වක්‍ර හා මුළු පෘෂ්ඨ වර්ගඵලය (2πrh + 2πr²), ප්‍රිස්මවල පෘෂ්ඨ වර්ගඵලය (පෙළපොත 1 කොටස, පිටු 115–128).',
      ta: 'செவ்வட்ட உருளையின் வளைபரப்பும் மொத்த மேற்பரப்பளவும் மற்றும் முக்கோண அரியங்கள் (பாடநூல் பகுதி 1, பக். 115–128).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch9-volume-solids',
    subjectId: 'maths',
    chapterNumber: 9,
    grade: 'grade-10',
    title: {
      en: 'Volume of Solids',
      si: 'ඝන වස්තුවල පරිමාව',
      ta: 'திண்மங்களின் கனவளவு',
    },
    description: {
      en: 'Volume of right circular cylinders (V = πr²h), right triangular prisms, and composite solid geometry (Textbook Part 1, p. 129–142).',
      si: 'සෘජු වෘත්තාකාර සිලින්ඩරයක පරිමාව (V = πr²h), සෘජු ප්‍රිස්මවල පරිමාව සහ සංයුක්ත ඝන වස්තු (පෙළපොත 1 කොටස, පිටු 129–142).',
      ta: 'செவ்வட்ட உருளையின் கனவளவு (V = πr²h) மற்றும் அரியங்களின் கனவளவு (பாடநூல் பகுதி 1, பக். 129–142).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch10-pythagoras',
    subjectId: 'maths',
    chapterNumber: 10,
    grade: 'grade-10',
    title: {
      en: "Pythagoras' Theorem",
      si: 'පයිතගරස් ප්‍රමේයය',
      ta: 'பைதகரசு தேற்றம்',
    },
    description: {
      en: 'Hypotenuse property in right-angled triangles a² + b² = c², converse theorem, and calculating missing lengths in 2D/3D (Textbook Part 1, p. 143–158).',
      si: 'සෘජුකෝණී ත්‍රිකෝණයක කර්ණය සහ පාද අතර සම්බන්ධය a² + b² = c², ප්‍රතිලෝම ප්‍රමේයය සහ දිග ගණනය කිරීම් (පෙළපොත 1 කොටස, පිටු 143–158).',
      ta: 'செங்கோண முக்கோணத்தில் செம்பக்கத் தொடர்பு a² + b² = c² மற்றும் அதன் மறுதலைத் தேற்றம் (பாடநூல் பகுதி 1, பக். 143–158).',
    },
    lessonsCount: 5,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch11-fractions',
    subjectId: 'maths',
    chapterNumber: 11,
    grade: 'grade-10',
    title: {
      en: 'Algebraic Fractions',
      si: 'වීජීය භාග',
      ta: 'இயற்கணிதப் பின்னங்கள்',
    },
    description: {
      en: 'Simplifying algebraic fractions, finding common denominators (LCM), addition, subtraction, multiplication, and division (Textbook Part 1, p. 159–172).',
      si: 'වීජීය භාග සරල කිරීම, පොදු හරය (කු.පො.ගු.) සෙවීම, වීජීය භාග එකතු කිරීම, අඩු කිරීම, ගුණ කිරීම හා බෙදීම (පෙළපොත 1 කොටස, පිටු 159–172).',
      ta: 'இயற்கணிதப் பின்னங்களைச் சுருக்குதல், பொதுப் பகுதி காணுதல் மற்றும் கூட்டல், கழித்தல் (பாடநூல் பகுதி 1, பக். 159–172).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch12-percentages',
    subjectId: 'maths',
    chapterNumber: 12,
    grade: 'grade-10',
    title: {
      en: 'Percentages, Duties & Taxes',
      si: 'ප්‍රතිශත, තීරුබදු සහ බදු',
      ta: 'சதவீதங்கள், தீர்வைகள் மற்றும் வரிகள்',
    },
    description: {
      en: 'Rates, customs duty, VAT, income tax, and percentage calculations in commercial and civic contexts (Textbook Part 1, p. 173–190).',
      si: 'වරිපනම් බදු, රේගු තීරුබදු, එකතු කළ අගය මත බද්ද (VAT), ආදායම් බදු සහ වාණිජ ගණනය කිරීම් (පෙළපොත 1 කොටස, පිටු 173–190).',
      ta: 'மதிப்பீட்டு வரிகள், சுங்கத் தீர்வை, பெறுமதி சேர் வரி (VAT) மற்றும் வருமான வரி (பாடநூல் பகுதி 1, பக். 173–190).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch13-congruence',
    subjectId: 'maths',
    chapterNumber: 13,
    grade: 'grade-10',
    title: {
      en: 'Congruence of Triangles',
      si: 'ත්‍රිකෝණ අංගසමතාව',
      ta: 'முக்கோணங்களின் ஒருங்கமைவு',
    },
    description: {
      en: 'Conditions for congruency of triangles: SSS, SAS, AAS, RHS and formal geometric proofs (Textbook Part 2, p. 1–18).',
      si: 'ත්‍රිකෝණ අංගසම වීමේ අවස්ථා: පා.පා.පා., පා.කෝ.පා., කෝ.කෝ.පා., කර්ණ.පා. සහ ජ්‍යාමිතික සාධන (පෙළපොත 2 කොටස, පිටු 1–18).',
      ta: 'முக்கோணங்கள் ஒருங்கமைவதற்கான நிபந்தனைகள்: ப.ப.ப., ப.கோ.ப., கோ.கோ.ப., செ.ப. மற்றும் நிறுவல்கள் (பாடநூல் பகுதி 2, பக். 1–18).',
    },
    lessonsCount: 5,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch14-quadratic-equations',
    subjectId: 'maths',
    chapterNumber: 14,
    grade: 'grade-10',
    title: {
      en: 'Quadratic Equations',
      si: 'වර්ගජ සමීකරණ',
      ta: 'இருபடிச் சமன்பாடுகள்',
    },
    description: {
      en: 'Solving quadratic equations ax² + bx + c = 0 by factorisation and completing the square, word problems (Textbook Part 2, p. 19–34).',
      si: 'ax² + bx + c = 0 වර්ගජ සමීකරණ සාධක මඟින් සහ වර්ගපූර්ණයෙන් විසඳීම, ව්‍යවහාරික ගැටලු (පෙළපොත 2 කොටස, පිටු 19–34).',
      ta: 'காரணிப்படுத்தல் மற்றும் வர்க்க நிறைவாக்கல் மூலம் இருபடிச் சமன்பாடுகளைத் தீர்த்தல் (பாடநூல் பகுதி 2, பக். 19–34).',
    },
    lessonsCount: 5,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch15-chords',
    subjectId: 'maths',
    chapterNumber: 15,
    grade: 'grade-10',
    title: {
      en: 'Chords of a Circle',
      si: 'වෘත්තයක කෝඩ',
      ta: 'வட்டத்தின் நாண்கள்',
    },
    description: {
      en: 'Theorems on chords: perpendicular from center bisects chord, chords equidistant from center are equal in length (Textbook Part 2, p. 35–48).',
      si: 'කෝඩ ආශ්‍රිත ප්‍රමේය: කේන්ද්‍රයේ සිට කෝඩයකට අඳින ලම්භය කෝඩය සමච්ඡේදනය කරයි, කේන්ද්‍රයට සමදුරින් ඇති කෝඩ සමාන වේ (පෙළපොත 2 කොටස, පිටු 35–48).',
      ta: 'வட்டத்தின் மையம் மற்றும் நாண் தொடர்பான தேற்றங்கள் மற்றும் நிறுவல்கள் (பாடநூல் பகுதி 2, பக். 35–48).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch16-inequalities',
    subjectId: 'maths',
    chapterNumber: 16,
    grade: 'grade-10',
    title: {
      en: 'Inequalities',
      si: 'අසමානතා',
      ta: 'சமனிலிகள்',
    },
    description: {
      en: 'Solving linear inequalities with one variable, representing integer solution sets on number lines (Textbook Part 2, p. 49–60).',
      si: 'විචල්‍යයක් සහිත සරල අසමානතා විසඳීම සහ විසඳුම් කුලකය සංඛ්‍යා රේඛාවක නිරූපණය කිරීම (පෙළපොත 2 කොටස, පිටු 49–60).',
      ta: 'ஓர் மாறிலியிலான சமனிலிகளைத் தீர்த்தல் மற்றும் எண் கோட்டில் தீர்வுகளைக் குறித்தல் (பாடநூல் பகுதி 2, பக். 49–60).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch17-tangents',
    subjectId: 'maths',
    chapterNumber: 17,
    grade: 'grade-10',
    title: {
      en: 'Tangents to a Circle',
      si: 'වෘත්තයක ස්පර්ශක',
      ta: 'வட்டத்தின் தொடலிகள்',
    },
    description: {
      en: 'Radius drawn to point of contact is perpendicular to tangent; tangents from external point are equal in length (Textbook Part 2, p. 61–74).',
      si: 'ස්පර්ශ ලක්ෂ්‍යයට අඳින අරය ස්පර්ශකයට ලම්භ වේ; බාහිර ලක්ෂ්‍යයක සිට අඳින ස්පර්ශක සමාන වේ (පෙළපොත 2 කොටස, පිටු 61–74).',
      ta: 'தொடலி மற்றும் ஆரைக்கு இடையிலான செங்குத்துத் தொடர்பு, வெளிப்புள்ளியிலிருந்து வரையப்படும் தொடலிகள் (பாடநூல் பகுதி 2, பக். 61–74).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch18-loci-constructions',
    subjectId: 'maths',
    chapterNumber: 18,
    grade: 'grade-10',
    title: {
      en: 'Loci and Constructions',
      si: 'පථ සහ නිර්මාණ',
      ta: 'ஒழுக்குகளும் அமைப்புகளும்',
    },
    description: {
      en: 'Four fundamental loci in plane geometry, constructing perpendicular bisectors, angle bisectors, and geometric figures (Textbook Part 2, p. 75–90).',
      si: 'තල ජ්‍යාමිතියේ මූලික පථ 4, ලම්භ සමච්ඡේදක, කෝණ සමච්ඡේදක සහ ත්‍රිකෝණ නිර්මාණය (පෙළපොත 2 කොටස, පිටු 75–90).',
      ta: 'அடிப்படை ஒழுக்குகள், செங்குத்து இருசமகூறாக்கி, கோண இருசமகூறாக்கி மற்றும் அமைப்புகள் (பாடநூல் பகுதி 2, பக். 75–90).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch19-coordinate-geometry',
    subjectId: 'maths',
    chapterNumber: 19,
    grade: 'grade-10',
    title: {
      en: 'Coordinate Geometry',
      si: 'ඛණ්ඩාංක ජ්‍යාමිතිය',
      ta: 'ஆள்கூற்று வடிவவியல்',
    },
    description: {
      en: 'Gradient of straight line m = (y₂ - y₁)/(x₂ - x₁), intercept c, equation of straight line y = mx + c (Textbook Part 2, p. 91–108).',
      si: 'සරල රේඛාවක අනුක්‍රමණය m = (y₂ - y₁)/(x₂ - x₁), අන්තඃඛණ්ඩය c, සරල රේඛා සමීකරණය y = mx + c (පෙළපොත 2 කොටස, පිටු 91–108).',
      ta: 'நேர்கோட்டின் படித்திறன், வெட்டுத்துண்டு மற்றும் y = mx + c வடிவிலான நேர்கோட்டுச் சமன்பாடு (பாடநூல் பகுதி 2, பக். 91–108).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch20-graphs-functions',
    subjectId: 'maths',
    chapterNumber: 20,
    grade: 'grade-10',
    title: {
      en: 'Graphs of Functions',
      si: 'ශ්‍රිතවල ප්‍රස්ථාර',
      ta: 'சார்புகளின் வரைபுகள்',
    },
    description: {
      en: 'Graphing quadratic functions y = ax² + bx + c, turning point, axis of symmetry, roots and sign intervals (Textbook Part 2, p. 109–126).',
      si: 'y = ax² + bx + c වර්ගජ ශ්‍රිත ප්‍රස්ථාර ඇඳීම, හැරුම් ලක්ෂ්‍යය, සමමිතික අක්ෂය, මුල් සහ ධන/සෘණ අන්තර (පෙළපොත 2 කොටස, පිටු 109–126).',
      ta: 'இருபடிச் சார்புகளின் வரைபுகள், திரும்பற் புள்ளி, சமச்சீர் அச்சு மற்றும் சார்பின் குறிகள் (பாடநூல் பகுதி 2, பக். 109–126).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch21-sets',
    subjectId: 'maths',
    chapterNumber: 21,
    grade: 'grade-10',
    title: {
      en: 'Sets and Venn Diagrams',
      si: 'කුලක සහ වෙන් රූප',
      ta: 'தொடைகளும் வென் வரிப்படங்களும்',
    },
    description: {
      en: 'Universal set, subsets, intersection, union, complement, and problem-solving with two-set Venn diagrams (Textbook Part 2, p. 127–140).',
      si: 'සර්වත්‍ර කුලකය, අනුකුලක, ඡේදනය, මේලය, අනුපූරකය, සහ කුලක දෙකක වෙන් රූප ආශ්‍රිත ගැටලු (පෙළපොත 2 කොටස, පිටු 127–140).',
      ta: 'அகில தொடை, உப தொடைகள், இடைவெட்டு, ஒன்றிப்பு மற்றும் வென் வரிப்படப் பிரயோகங்கள் (பாடநூல் பகுதி 2, பக். 127–140).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch22-probability',
    subjectId: 'maths',
    chapterNumber: 22,
    grade: 'grade-10',
    title: {
      en: 'Probability',
      si: 'සම්භාවිතාව',
      ta: 'நிகழ்தகவு',
    },
    description: {
      en: 'Equally likely outcomes, theoretical and experimental probability, sample space, and simple tree diagrams (Textbook Part 2, p. 141–154).',
      si: 'සමසම්භාවිත ප්‍රතිඵල, සෛද්ධාන්තික හා ප්‍රායෝගික සම්භාවිතාව, නියැදි අවකාශය සහ සරල රුක් සටහන් (පෙළපොත 2 කොටස, පිටු 141–154).',
      ta: 'நிகழ்தகவு கோட்பாடுகள், மாதிரி வெளி மற்றும் மர வரிப்படங்கள் (பாடநூல் பகுதி 2, பக். 141–154).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'maths-gr10-ch23-statistics',
    subjectId: 'maths',
    chapterNumber: 23,
    grade: 'grade-10',
    title: {
      en: 'Statistics',
      si: 'සංඛ්‍යානය',
      ta: 'புள்ளியியல்',
    },
    description: {
      en: 'Grouped frequency distribution, calculating mean using assumed mean method, modal class, median class, and histogram (Textbook Part 2, p. 155–174).',
      si: 'ප්‍රවර්ගගත සංඛ්‍යාත ව්‍යාප්ති, උපකල්පිත මධ්‍යනය ක්‍රමයෙන් මධ්‍යන්‍යය සෙවීම, මාත පන්තිය, මධ්‍යස්ථ පන්තිය සහ හිස්ටෝග්‍රෑම් (පෙළපොත 2 කොටස, පිටු 155–174).',
      ta: 'கூட்டமாக்கப்பட்ட மீடிறன் பரம்பல், இடை, ஆகார வகுப்பு மற்றும் இடைநிலைக் கணிப்பீடுகள் (பாடநூல் பகுதி 2, பக். 155–174).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
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
    lessonsCount: 5,
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
    id: 'history-gr10-sources',
    subjectId: 'history',
    chapterNumber: 1,
    grade: 'grade-10',
    title: {
      en: 'Sources of Studying History',
      si: 'ඉතිහාසය හැදෑරීමේ මූලාශ්‍ර',
      ta: 'வரலாற்றைக் கற்பதற்கான மூலங்கள்',
    },
    description: {
      en: 'Classification of sources (Literary vs. Archaeological: Inscriptions/Sellipi, Coins/Kahapana, Ruins), importance of learning history, and protecting archaeological sources (Textbook p. 1–9).',
      si: 'මූලාශ්‍ර වර්ගීකරණය (සාහිත්‍ය සහ පුරාවිද්‍යාත්මක: සෙල්ලිපි, කාසි, නටබුන්), ඉතිහාසය හැදෑරීමේ වැදගත්කම සහ පුරාවිද්‍යා මූලාශ්‍ර ආරක්ෂා කිරීම (පෙළපොත පිටු 1–9).',
      ta: 'மூலாதாரங்களின் வகைப்பாடு (இலக்கிய மற்றும் தொல்பொருள்: கல்வெட்டுகள், நாணயங்கள், இடிபாடுகள்), வரலாறு கற்பதன் முக்கியத்துவம் மற்றும் தொல்பொருட்களைப் பாதுகாத்தல் (பாடநூல் பக். 1–9).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'history-gr10-settlements',
    subjectId: 'history',
    chapterNumber: 2,
    grade: 'grade-10',
    title: {
      en: 'Ancient Settlements',
      si: 'පුරාණ ජනාවාස',
      ta: 'பண்டைய குடியேற்றங்கள்',
    },
    description: {
      en: 'Settlements in Pre-historic era (Pahiyangala, Batadombalena), Proto-historic era (Ibbankatuwa megalithic cemeteries), and Early Historic era (Textbook p. 10–30).',
      si: 'ප්‍රාග් ඓතිහාසික යුගයේ ජනාවාස (පාහියංගල, බටදොඹලෙන), පූර්ව ඓතිහාසික යුගය (ඉබ්බන්කටුව සුසානය) සහ මූල ඓතිහාසික යුගයේ ජනාවාස (පෙළපොත පිටු 10–30).',
      ta: 'வரலாற்றுக்கு முற்பட்ட காலம் (பாகியன்கல, பட்டதொம்பலென), ஆதி வரலாற்றுக் காலம் (இப்பன்கட்டுவ) மற்றும் ஆரம்ப வரலாற்றுக் காலக் குடியேற்றங்கள் (பாடநூல் பக். 10–30).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'history-gr10-political-power',
    subjectId: 'history',
    chapterNumber: 3,
    grade: 'grade-10',
    title: {
      en: 'Evolution of Political Power in Sri Lanka',
      si: 'ශ්‍රී ලංකාවේ දේශපාලන බලය විකාශනය වීම',
      ta: 'இலங்கையில் அரசியல் அதிகாரத்தின் வளர்ச்சி',
    },
    description: {
      en: 'Pre-state era leadership (Gamika, Parumaka), concept of state formation, and great kings who unified and ruled the country (Textbook p. 31–43).',
      si: 'පූර්ව රාජ්‍ය යුගය (ගාමිණී, පරුමක), රාජ්‍ය සංකල්පයේ ආරම්භය සහ රට එක්සේසත් කළ ශ්‍රේෂ්ඨ රජවරු (පෙළපොත පිටු 31–43).',
      ta: 'அரசுக்கு முற்பட்ட காலம் (காமிக, பருமக), அரச உருவாக்கம் மற்றும் நாட்டை ஆண்ட பெரும் மன்னர்கள் (பாடநூல் பக். 31–43).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'history-gr10-ancient-society',
    subjectId: 'history',
    chapterNumber: 4,
    grade: 'grade-10',
    title: {
      en: 'The Ancient Society of Sri Lanka',
      si: 'ශ්‍රී ලංකාවේ පුරාණ සමාජය',
      ta: 'இலங்கையின் பண்டைய சமூகம்',
    },
    description: {
      en: 'Nature of ruling, agrarian economy, village social structure, culture, and harmonious ethnic co-existence in ancient cities (Textbook p. 44–62).',
      si: 'රාජ්‍ය පාලනයේ ස්වභාවය, කෘෂිකාර්මික ආර්ථිකය, ග්‍රාමීය සමාජය, සංස්කෘතිය සහ ජනවාර්ගික සහජීවනය (පෙළපොත පිටු 44–62).',
      ta: 'ஆட்சியின் தன்மை, பொருளாதார அமைப்பு, சமூக கலாசாரம் மற்றும் பண்டைய நகரங்களின் இன நல்லிணக்கம் (பாடநூல் பக். 44–62).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'history-gr10-science-tech',
    subjectId: 'history',
    chapterNumber: 5,
    grade: 'grade-10',
    title: {
      en: 'The Ancient Science and Technology in Sri Lanka',
      si: 'ශ්‍රී ලංකාවේ පුරාණ විද්‍යාව සහ තාක්ෂණය',
      ta: 'இலங்கையின் பண்டைய அறிவியலும் தொழினுட்பமும்',
    },
    description: {
      en: 'Early scientific ideas, maturity of scientific usage: irrigation engineering (Bisokotuwa, Yoda Ela), monumental architecture, medicine, and metallurgy (Textbook p. 63–76).',
      si: 'විද්‍යාත්මක අදහස්වල මුල් අවධිය, පරිණත තාක්ෂණික භාවිතය: වාරි තාක්ෂණය (බිසෝකොටුව, යෝධ ඇළ), වාස්තු විද්‍යාව, දේශීය වෛද්‍යවේදය සහ ලෝහ කර්මාන්තය (පෙළපොත පිටු 63–76).',
      ta: 'அறிவியல் கருத்துக்களின் ஆரம்பம், முதிர்ந்த தொழினுட்பப் பயன்பாடு: நீர்ப்பாசனம் (பிசோகொட்டுவ, யோத எல), கட்டடக் கலை, மருத்துவம் மற்றும் உலோகவியல் (பாடநூல் பக். 63–76).',
    },
    lessonsCount: 2,
    completedPercentage: 0,
  },
  {
    id: 'history-gr10-historical-knowledge',
    subjectId: 'history',
    chapterNumber: 6,
    grade: 'grade-10',
    title: {
      en: 'Historical Knowledge and Its Practical Application',
      si: 'ඓතිහාසික දැනුම සහ එහි ප්‍රායෝගික යෙදීම',
      ta: 'வரலாற்று அறிவும் அதன் நடைமுறைப் பயன்பாடும்',
    },
    description: {
      en: 'Social organization, law and tradition, finance and exchange systems, representation of women, indigenous food, and environmental protection (Textbook p. 77–90).',
      si: 'සමාජ සංවිධානය, නීතිය සහ සම්ප්‍රදාය, මූල්‍ය හා විනිමය, කාන්තා නියෝජනය, දේශීය ආහාර සහ පරිසර සංරක්ෂණය (පෙළපොත පිටු 77–90).',
      ta: 'சமூக ஒழுங்கமைப்பு, சட்டமும் பாரம்பரியமும், நாணயமும் பரிமாற்றமும், பெண்களின் பிரதிநிதித்துவம், பாரம்பரிய உணவு மற்றும் சுற்றாடல் பாதுகாப்பு (பாடநூல் பக். 77–90).',
    },
    lessonsCount: 6,
    completedPercentage: 0,
  },
  {
    id: 'history-gr10-decline-new-kingdoms',
    subjectId: 'history',
    chapterNumber: 7,
    grade: 'grade-10',
    title: {
      en: 'Decline of Ancient Cities in the Dry Zone & Origin of New Kingdoms in South West',
      si: 'වියළි කලාපයේ පුරාණ නගර පරිහානිය සහ නිරිතදිග නව රාජධානි බිහිවීම',
      ta: 'உலர் வலய பண்டைய நகரங்களின் வீழ்ச்சியும் தென்மேற்கில் புதிய இராச்சியங்களின் தோற்றமும்',
    },
    description: {
      en: 'Background of urban life, downfall of Polonnaruwa, the second urbanization, and shift of capitals to Dambadeniya, Yapahuwa, Kurunegala, Gampola, and Kotte (Textbook p. 91–105).',
      si: 'නාගරික ජීවිතය, පොළොන්නරුවේ බිඳවැටීම, දෙවන නාගරීකරණය සහ දඹදෙණිය, යාපහුව, කුරුණෑගල, ගම්පොළ හා කෝට්ටේ නව රාජධානි බිහිවීම (පෙළපොත පිටු 91–105).',
      ta: 'நகர வாழ்க்கை பின்னணி, பொலன்னறுவையின் வீழ்ச்சி, இரண்டாம் நகரமயமாக்கம், தம்பதெனிய, யாப்பகுவ, குருநாகல், கம்பளை மற்றும் கோட்டை இராச்சியங்கள் (பாடநூல் பக். 91–105).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'history-gr10-kandyan-kingdom',
    subjectId: 'history',
    chapterNumber: 8,
    grade: 'grade-10',
    title: {
      en: 'Kandyan Kingdom',
      si: 'උඩරට රාජධානිය',
      ta: 'கண்டி இராச்சியம்',
    },
    description: {
      en: 'Origin and expansion of the Senkadagala kingdom, administrative structure, economic system, and social organization under Kandyan monarchs (Textbook p. 106–117).',
      si: 'සෙන්කඩගල රාජධානියේ ආරම්භය හා ව්‍යාප්තිය, පරිපාලන ව්‍යුහය, ආර්ථික ක්‍රමය සහ උඩරට සමාජ සංවිධානය (පෙළපොත පිටු 106–117).',
      ta: 'கண்டி இராச்சியத்தின் தோற்றமும் விரிவாக்கமும், நிர்வாகக் கட்டமைப்பு, பொருளாதார முறைமை மற்றும் சமூக அமைப்பு (பாடநூல் பக். 106–117).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'history-gr10-renaissance',
    subjectId: 'history',
    chapterNumber: 9,
    grade: 'grade-10',
    title: {
      en: 'Renaissance',
      si: 'පුනරුදය',
      ta: 'மறுமலர்ச்சி',
    },
    description: {
      en: 'Causes of the European Renaissance, scientific revolution, geographical discoveries, and its worldwide influence including Sri Lanka (Textbook p. 118–126).',
      si: 'යුරෝපීය පුනරුදයට හේතු, විද්‍යාත්මක පුනරුදය, දේශ ගවේෂණ සහ ශ්‍රී ලංකාව ඇතුළු ලෝකයට එහි බලපෑම (පෙළපොත පිටු 118–126).',
      ta: 'ஐரோப்பிய மறுமலர்ச்சிக்கான காரணங்கள், அறிவியல் புரட்சி, புதிய நிலங்களைக் கண்டுபிடித்தல் மற்றும் இலங்கையில் அதன் தாக்கம் (பாடநூல் பக். 118–126).',
    },
    lessonsCount: 2,
    completedPercentage: 0,
  },
  {
    id: 'history-gr10-western-world',
    subjectId: 'history',
    chapterNumber: 10,
    grade: 'grade-10',
    title: {
      en: 'Sri Lanka and the Western World',
      si: 'ශ්‍රී ලංකාව සහ බටහිර ලෝකය',
      ta: 'இலங்கையும் மேலைத்தேய உலகமும்',
    },
    description: {
      en: 'Arrival of Portuguese in 1505, political condition in Sri Lanka during Kotte kingdom, and the Dutch colonial rule from 1658 (Textbook p. 127–144).',
      si: '1505 පෘතුගීසි ආගමනය, කෝට්ටේ යුගයේ දේශපාලන තත්ත්වය සහ 1658 ලන්දේසි පාලනය ස්ථාපනය වීම (පෙළපොත පිටු 127–144).',
      ta: '1505 இல் போர்த்துக்கேயர் வருகை, இலங்கையின் அப்போதைய அரசியல் நிலைமை மற்றும் 1658 டச்சுக்காரர் ஆட்சி (பாடநூல் பக். 127–144).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch1-chemical-basis',
    subjectId: 'science',
    chapterNumber: 1,
    grade: 'grade-10',
    title: {
      en: 'Chemical basis of life',
      si: 'ජීවයේ රසායනික පදනම',
      ta: 'வாழ்க்கையின் இரசாயன அடிப்படை',
    },
    description: {
      en: 'Biomolecules in living systems: Carbohydrates, proteins, lipids, nucleic acids, vitamins, minerals, water and their significance (Textbook Part 1, p. 1–22).',
      si: 'ජීවී පද්ධතිවල ඇති ජෛව අණු: කාබෝහයිඩ්‍රේට, ප්‍රෝටීන, ලිපිඩ, න්‍යෂ්ටික අම්ල, විටමින්, ඛනිජ ලවණ සහ ජලය (පෙළපොත 1 කොටස, පිටු 1–22).',
      ta: 'உயிரின அமைப்பிலுள்ள உயிரியல் மூலக்கூறுகள்: காபோவைதரேற்று, புரதங்கள், லிப்பிட்டுகள், கரு அமிலங்கள், விற்றமின்கள் மற்றும் நீர் (பாடநூல் பகுதி 1, பக். 1–22).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch2-motion',
    subjectId: 'science',
    chapterNumber: 2,
    grade: 'grade-10',
    title: {
      en: 'Motion in a straight line',
      si: 'සරල රේඛීය චලිතය',
      ta: 'நேர்கோட்டு இயக்கம்',
    },
    description: {
      en: 'Distance, displacement, speed, velocity, acceleration, ticker-timer analysis, and motion graphs (Textbook Part 1, p. 23–51).',
      si: 'දුර, විස්ථාපනය, වේගය, ප්‍රවේගය, ත්වරණය, ටිකර් ටේප් කාල ගණකය සහ චලිත ප්‍රස්ථාර (පෙළපොත 1 කොටස, පිටු 23–51).',
      ta: 'தூரம், இடப்பெயர்ச்சி, கதி, வேகம், ஆர்முடுகல் மற்றும் இயக்க வரைபுகள் (பாடநூல் பகுதி 1, பக். 23–51).',
    },
    lessonsCount: 5,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch3-structure-of-matter',
    subjectId: 'science',
    chapterNumber: 3,
    grade: 'grade-10',
    title: {
      en: 'Structure of matter',
      si: 'පදාර්ථයේ ව්‍යුහය',
      ta: 'சடப்பொருளின் கட்டமைப்பு',
    },
    description: {
      en: 'Atoms, subatomic particles, atomic number, mass number, isotopes, electron configuration, and the periodic table (Textbook Part 1, p. 52–83).',
      si: 'පරමාණු, උප පරමාණුක අංශු, පරමාණුක ක්‍රමාංකය, ස්කන්ධ ක්‍රමාංකය, සමස්ථානික, ඉලෙක්ට්‍රෝන වින්‍යාසය සහ ආවර්තිතා වගුව (පෙළපොත 1 කොටස, පිටු 52–83).',
      ta: 'அணுக்கள், உப-அணுத் துணிக்கைகள், அணுவெண், திணிவெண், சமதானிகள் மற்றும் ஆவர்த்தன அட்டவணை (பாடநூல் பகுதி 1, பக். 52–83).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch4-newtons-laws',
    subjectId: 'science',
    chapterNumber: 4,
    grade: 'grade-10',
    title: {
      en: "Newton's laws of motion",
      si: 'නිව්ටන්ගේ චලිත නියම',
      ta: 'நியூட்டனின் இயக்க விதிகள்',
    },
    description: {
      en: "Balanced and unbalanced forces, Newton's first, second, and third laws of motion, inertia, and momentum (Textbook Part 1, p. 84–97).",
      si: 'සමතුලිත සහ අසමතුලිත බල, නිව්ටන්ගේ පළමු, දෙවන සහ තෙවන චලිත නියම, අවස්ථිතිය සහ ගම්‍යතාව (පෙළපොත 1 කොටස, පිටු 84–97).',
      ta: 'சமநிலையான மற்றும் சமநிலையற்ற விசைகள், நியூட்டனின் மூன்று இயக்க விதிகள் மற்றும் உந்தம் (பாடநூல் பகுதி 1, பக். 84–97).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch5-friction',
    subjectId: 'science',
    chapterNumber: 5,
    grade: 'grade-10',
    title: {
      en: 'Friction',
      si: 'ඝර්ෂණය',
      ta: 'உராய்வு',
    },
    description: {
      en: 'Static, limiting, and dynamic friction, laws of friction, factors affecting friction, and methods of reducing friction (Textbook Part 1, p. 98–109).',
      si: 'ස්ථිතික, සීමාකාරී සහ චාලක ඝර්ෂණය, ඝර්ෂණ නියම, බලපාන සාධක සහ ඝර්ෂණය අවම කිරීමේ ක්‍රම (පෙළපොත 1 කොටස, පිටු 98–109).',
      ta: 'நிலையான, எல்லை மற்றும் இயக்க உராய்வு, உராய்வு விதிகள் மற்றும் உராய்வைக் குறைக்கும் வழிகள் (பாடநூல் பகுதி 1, பக். 98–109).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch6-cells',
    subjectId: 'science',
    chapterNumber: 6,
    grade: 'grade-10',
    title: {
      en: 'Plant and animal cells',
      si: 'ශාක හා සත්ත්ව සෛල',
      ta: 'தாவர மற்றும் விலங்கு கலங்கள்',
    },
    description: {
      en: 'Light microscope, structures of plant and animal cells, cell organelles (nucleus, mitochondria, chloroplasts), and functions (Textbook Part 1, p. 110–122).',
      si: 'ආලෝක අන්වීක්ෂය, ශාක හා සත්ත්ව සෛලවල ව්‍යුහය, සෛල ඉන්ද්‍රයිකා (න්‍යෂ්ටිය, මයිටොකොන්ඩ්‍රියා, හරිතලව) සහ ක්‍රියාකාරිත්වය (පෙළපොත 1 කොටස, පිටු 110–122).',
      ta: 'ஒளி நுணுக்குக்காட்டி, தாவர மற்றும் விலங்கு கலங்களின் கட்டமைப்பு, கல நுண்ணுறுப்புகள் மற்றும் தொழிற்பாடுகள் (பாடநூல் பகுதி 1, பக். 110–122).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch7-quantification',
    subjectId: 'science',
    chapterNumber: 7,
    grade: 'grade-10',
    title: {
      en: 'Quantification of elements and compounds',
      si: 'මූලද්‍රව්‍ය හා සංයෝග ප්‍රමාණනය',
      ta: 'மூலகங்கள் மற்றும் சேர்வைகளின் அளவறிதல்',
    },
    description: {
      en: 'Relative atomic mass, the mole concept, Avogadro constant, molar mass, and concentration of solutions (Textbook Part 1, p. 123–138).',
      si: 'සාපේක්ෂ පරමාණුක ස්කන්ධය, මවුල සංකල්පය, ඇවගාඩ්රෝ නියතය, මවුලික ස්කන්ධය සහ ද්‍රාවණවල සාන්ද්‍රණය (පෙළපොත 1 කොටස, පිටු 123–138).',
      ta: 'சார்பு அணுத்திணிவு, மூல் எண்ணக்கரு, அவகாதரோ மாறிலி, மூலர் திணிவு மற்றும் கரைசல்களின் செறிவு (பாடநூல் பகுதி 1, பக். 123–138).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch8-characteristics-of-organisms',
    subjectId: 'science',
    chapterNumber: 8,
    grade: 'grade-10',
    title: {
      en: 'Characteristics of organisms',
      si: 'ජීවීන්ගේ ලක්ෂණ',
      ta: 'உயிரினங்களின் சிறப்பியல்புகள்',
    },
    description: {
      en: 'Growth, nutrition, respiration, excretion, irritability, movement, and reproduction in living organisms (Textbook Part 1, p. 139–155).',
      si: 'වර්ධනය, පෝෂණය, ශ්වසනය, බහිස්ස්‍රාවය, උද්දීප්‍යතාව, චලනය සහ ප්‍රජනනය වැනි ජීවී ලක්ෂණ (පෙළපොත 1 කොටස, පිටු 139–155).',
      ta: 'வளர்ச்சி, போசணை, சுவாசம், கழிவகற்றல், தூண்டற்பேறு மற்றும் இனப்பெருக்கம் (பாடநூல் பகுதி 1, பக். 139–155).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch9-resultant-force',
    subjectId: 'science',
    chapterNumber: 9,
    grade: 'grade-10',
    title: {
      en: 'Resultant force',
      si: 'සම්ප්‍රයුක්ත බලය',
      ta: 'விளையுள் விசை',
    },
    description: {
      en: 'Collinear forces, parallel forces, forces acting at an angle, triangle law of forces, and resolving forces (Textbook Part 1, p. 156–167).',
      si: 'ඒකරේඛීය බල, සමාන්තර බල, කෝණිකව ක්‍රියාකරන බල, බල ත්‍රිකෝණ නියමය සහ බල විභේදනය (පෙළපොත 1 කොටස, පිටු 156–167).',
      ta: 'ஒருங்கிணைந்த விசைகள், சமாந்தர விசைகள், கோணத்தில் செயல்படும் விசைகள் மற்றும் விசைத் தொடர்புகள் (பாடநூல் பகுதி 1, பக். 156–167).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch10-chemical-bonds',
    subjectId: 'science',
    chapterNumber: 10,
    grade: 'grade-10',
    title: {
      en: 'Chemical bonds',
      si: 'රසායනික බන්ධන',
      ta: 'இரசாயனப் பிணைப்புகள்',
    },
    description: {
      en: 'Octet rule, ionic bonds, covalent bonds, electronegativity, polar covalent molecules, and metallic bonding (Textbook Part 1, p. 168–188).',
      si: 'අෂ්ටක නියමය, අයනික බන්ධන, සහසංයුජ බන්ධන, විද්‍යුත් සෘණතාව, ධ්‍රැවීය අණු සහ ලෝහක බන්ධන (පෙළපොත 1 කොටස, පිටු 168–188).',
      ta: 'எண்ம விதி, அயன் பிணைப்புகள், பங்கீட்டுப் பிணைப்புகள் மற்றும் உலோகப் பிணைப்புகள் (பாடநூல் பகுதி 1, பக். 168–188).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch11-turning-effect',
    subjectId: 'science',
    chapterNumber: 11,
    grade: 'grade-10',
    title: {
      en: 'Turning effect of a force',
      si: 'බලයක භ්‍රමණ ඵලය',
      ta: 'விசையின் திருப்ப விளைவு',
    },
    description: {
      en: 'Moment of a force, principle of moments, levers, couple of forces, and everyday applications (Textbook Part 1, p. 189–200).',
      si: 'බල ඝූර්ණය, ඝූර්ණ මූලධර්මය, ලීවර වර්ග, බල යුග්ම සහ එදිනෙදා ජීවිතයේ යෙදීම් (පෙළපොත 1 කොටස, පිටු 189–200).',
      ta: 'விசையின் திருப்புத்திறன், திருப்புத்திறன் தத்துவம், நெம்புகோல்கள் மற்றும் அன்றாடப் பயன்பாடுகள் (பாடநூல் பகுதி 1, பக். 189–200).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch12-equilibrium-of-forces',
    subjectId: 'science',
    chapterNumber: 12,
    grade: 'grade-10',
    title: {
      en: 'Equilibrium of forces',
      si: 'බල සමතුලිතතාව',
      ta: 'விசைகளின் சமநிலை',
    },
    description: {
      en: 'Conditions for equilibrium under two forces, three concurrent forces, center of gravity, and stability of objects (Textbook Part 1, p. 201–212).',
      si: 'බල දෙකක් සහ එකලඟ බල තුනක් යටතේ සමතුලිතතාව, ගුරුත්ව කේන්ද්‍රය සහ වස්තුවල ස්ථායීතාව (පෙළපොත 1 කොටස, පිටු 201–212).',
      ta: 'இரு விசைகள் மற்றும் மூன்று விசைகளின் சமநிலை நிபந்தனைகள், ஈர்ப்பு மையம் மற்றும் நிலைத்தன்மை (பாடநூல் பகுதி 1, பக். 201–212).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch13-classification-of-organisms',
    subjectId: 'science',
    chapterNumber: 13,
    grade: 'grade-10',
    title: {
      en: 'Classification of organisms',
      si: 'ජීවීන් වර්ගීකරණය',
      ta: 'உயிரினங்களின் வகைப்பாடு',
    },
    description: {
      en: 'Artificial and natural classification, Five-kingdom system (Monera, Protista, Fungi, Plantae, Animalia), and dichotomous keys (Textbook Part 2, p. 1–26).',
      si: 'කෘතිම සහ ස්වාභාවික වර්ගීකරණය, පංච රාජධානි වර්ගීකරණය (මොනෙරා, ප්‍රොටිස්ටා, දිලීර, ශාක, සත්ත්ව) සහ ද්විපද යතුරු (පෙළපොත 2 කොටස, පිටු 1–26).',
      ta: 'செயற்கை மற்றும் இயற்கை வகைப்பாடு, ஐந்து இராச்சிய வகைப்பாடு மற்றும் இருகூற்றுச் சாவிகள் (பாடநூல் பகுதி 2, பக். 1–26).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch14-continuity-of-life',
    subjectId: 'science',
    chapterNumber: 14,
    grade: 'grade-10',
    title: {
      en: 'Continuity of life',
      si: 'ජීවයේ අඛණ්ඩතාව',
      ta: 'வாழ்க்கையின் தொடர்ச்சி',
    },
    description: {
      en: 'Cell division (mitosis and meiosis), asexual and sexual reproduction, and human reproduction systems (Textbook Part 2, p. 27–62).',
      si: 'සෛල බෙදීම (අනුනනය සහ ඌනනය), අලිංගික සහ ලිංගික ප්‍රජනනය සහ මානව ප්‍රජනන පද්ධතිය (පෙළපොත 2 කොටස, පිටු 27–62).',
      ta: 'கலப்பிரிவு (இழையுருப்பிரிவு மற்றும் ஒடுக்கற்பிரிவு), இலிங்கமில் மற்றும் இலிங்கமுறை இனப்பெருக்கம் (பாடநூல் பகுதி 2, பக். 27–62).',
    },
    lessonsCount: 5,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch15-hydrostatic-pressure',
    subjectId: 'science',
    chapterNumber: 15,
    grade: 'grade-10',
    title: {
      en: 'Hydrostatic pressure and its applications',
      si: 'ද්‍රවස්ථිතික පීඩනය හා එහි යෙදීම්',
      ta: 'திரவநிலையியல் அமுக்கமும் அதன் பயன்பாடுகளும்',
    },
    description: {
      en: 'Liquid pressure (P = hρg), Pascal’s principle, hydraulic press, atmospheric pressure, and Archimedes’ principle (Textbook Part 2, p. 63–85).',
      si: 'ද්‍රව පීඩනය (P = hρg), පැස්කල් මූලධර්මය, හයිඩ්‍රොලික් මුද්‍රණාලය, වායුගෝලීය පීඩනය සහ ආකිමිඩීස් මූලධර්මය (පෙළපොත 2 කොටස, පිටු 63–85).',
      ta: 'திரவ அமுக்கம் (P = hρg), பாஸ்கல் தத்துவம், நீரியல் அழுத்தி, வளிமண்டல அமுக்கம் மற்றும் ஆர்க்கிமிடிஸ் தத்துவம் (பாடநூல் பகுதி 2, பக். 63–85).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch16-changes-in-matter',
    subjectId: 'science',
    chapterNumber: 16,
    grade: 'grade-10',
    title: {
      en: 'Changes in matter',
      si: 'පදාර්ථයේ වෙනස්වීම්',
      ta: 'சடப்பொருளில் ஏற்படும் மாற்றங்கள்',
    },
    description: {
      en: 'Physical and chemical changes, exothermic and endothermic reactions, and balanced chemical equations (Textbook Part 2, p. 86–114).',
      si: 'භෞතික සහ රසායනික වෙනස්වීම්, තාපදායක සහ තාපඅවශෝෂක ප්‍රතික්‍රියා සහ තුලිත රසායනික සමීකරණ (පෙළපොත 2 කොටස, පිටු 86–114).',
      ta: 'பௌதீக மற்றும் இரசாயன மாற்றங்கள், வெப்பம் விடு மற்றும் வெப்பம் கொள் தாக்கங்கள், இரசாயனச் சமன்பாடுகள் (பாடநூல் பகுதி 2, பக். 86–114).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch17-rate-of-reactions',
    subjectId: 'science',
    chapterNumber: 17,
    grade: 'grade-10',
    title: {
      en: 'Rate of reactions',
      si: 'ප්‍රතික්‍රියා සීඝ්‍රතාව',
      ta: 'தாக்க வீதம்',
    },
    description: {
      en: 'Collision theory, measuring reaction rates, and factors affecting rate: temperature, concentration, surface area, catalyst (Textbook Part 2, p. 115–124).',
      si: 'ගැටුම් වාදය, ප්‍රතික්‍රියා සීඝ්‍රතාව මැනීම සහ බලපාන සාධක: උෂ්ණත්වය, සාන්ද්‍රණය, පෘෂ්ඨික වර්ගඵලය, උත්ප්‍රේරක (පෙළපොත 2 කොටස, පිටු 115–124).',
      ta: 'மோதுகைத் கொள்கை, தாக்க வீதத்தை அளவிடுதல் மற்றும் வீதத்தைப் பாதிக்கும் காரணிகள்: வெப்பநிலை, செறிவு, மேற்பரப்பளவு, ஊக்கி (பாடநூல் பகுதி 2, பக். 115–124).',
    },
    lessonsCount: 3,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch18-work-energy-power',
    subjectId: 'science',
    chapterNumber: 18,
    grade: 'grade-10',
    title: {
      en: 'Work, energy and power',
      si: 'කාර්යය, ශක්තිය සහ ජවය',
      ta: 'வேலை, சக்தி மற்றும் வலு',
    },
    description: {
      en: 'Mechanical work (W = Fs), kinetic energy, potential energy, conservation of energy, and power calculation (Textbook Part 2, p. 125–139).',
      si: 'යාන්ත්‍රික කාර්යය (W = Fs), චාලක ශක්තිය, විභව ශක්තිය, ශක්ති සංස්ථිති නියමය සහ ජවය ගණනය කිරීම (පෙළපොත 2 කොටස, පිටු 125–139).',
      ta: 'பொறிமுறை வேலை (W = Fs), இயக்கச் சக்தி, அழுத்தச் சக்தி, சக்தி காப்பு விதி மற்றும் வலு (பாடநூல் பகுதி 2, பக். 125–139).',
    },
    lessonsCount: 4,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch19-current-electricity',
    subjectId: 'science',
    chapterNumber: 19,
    grade: 'grade-10',
    title: {
      en: 'Current electricity',
      si: 'ධාරා විද්‍යුතය',
      ta: 'மின்னோட்டம்',
    },
    description: {
      en: 'Electric potential, EMF, Ohm’s law (V = IR), series and parallel resistor circuits, and electrical power (Textbook Part 2, p. 140–168).',
      si: 'විද්‍යුත් විභවය, වි.ගා.බ., ඕම්ගේ නියමය (V = IR), ශ්‍රේණිගත සහ සමාන්තරගත පරිපථ සහ විද්‍යුත් ජවය (පෙළපොත 2 කොටස, පිටු 140–168).',
      ta: 'மின்னழுத்தம், மின்சார விசை, ஓமின் விதி (V = IR), தொடர் மற்றும் சமாந்தர சுற்றுகள், மின் வலு (பாடநூல் பகுதி 2, பக். 140–168).',
    },
    lessonsCount: 5,
    completedPercentage: 0,
  },
  {
    id: 'science-gr10-ch20-inheritance',
    subjectId: 'science',
    chapterNumber: 20,
    grade: 'grade-10',
    title: {
      en: 'Inheritance',
      si: 'පාරම්පරිකතාව',
      ta: 'பரம்பரையியல்',
    },
    description: {
      en: 'Gregor Mendel’s experiments, monohybrid crosses, dominant and recessive alleles, chromosomes, DNA, and inherited traits (Textbook Part 2, p. 169–185).',
      si: 'ග්‍රෙගර් මෙන්ඩල්ගේ පරීක්ෂණ, ඒකමුහුම් අභිජනනය, ප්‍රමුඛ සහ නිලීන ඇලීල, වර්ණදේහ, DNA සහ පාරම්පරික ලක්ෂණ (පෙළපොත 2 කොටස, පිටු 169–185).',
      ta: 'மெண்டலின் சோதனைகள், ஒருபண்புக் கலப்பு, ஆட்சியுடைய மற்றும் பின்னடைவான பரம்பரையலகுகள், நிறமூர்த்தங்கள், DNA மற்றும் பரம்பரை இயல்புகள் (பாடநூல் பகுதி 2, பக். 169–185).',
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
      en: 'Introduction to Word Processing & Common Documents (Fig 3.1)',
      si: 'වදන් සැකසුම හැඳින්වීම සහ ලේඛන වර්ග (රූපය 3.1)',
      ta: 'சொல் செயலாக்கம் அறிமுகம் மற்றும் ஆவண வகைகள் (படம் 3.1)',
    },
    concept: {
      en: 'Word processing software enables users to create, edit, format, store, and print documents electronically. As illustrated in the Grade 8 textbook dialogue (p. 34), preparing invitations and souvenirs by hand results in messy handwriting, difficult corrections, and inconsistent copies. Figure 3.1 identifies 7 common document types produced using word processing: Letters, Question papers, Newspapers, Application forms, Invitations, Greeting cards, and Magazines.',
      si: 'වදන් සැකසුම් මෘදුකාංග මඟින් ලේඛන විද්‍යුත් ආකාරයෙන් නිර්මාණය කිරීම, සංස්කරණය, හැඩසවි ගැන්වීම, සුරැකීම සහ මුද්‍රණය සිදුකළ හැක. පෙළපොතේ 34 පිටුවේ සඳහන් පරිදි අතින් ලියන විට අකුරු වෙනස්වීම්, මැකීම් නිසා අපිරිසිදු වීම සහ පිටපත් රාශියක් ගැනීම අපහසු වේ. රූපය 3.1 හි වදන් සැකසුමෙන් සකසන ප්‍රධාන ලේඛන වර්ග 7ක් දක්වා ඇත: ලිපි, ප්‍රශ්න පත්‍ර, පුවත්පත්, අයදුම්පත්, ආරාධනා පත්‍ර, සුබපැතුම් පත් සහ සඟරා.',
      ta: 'சொல் செயலாக்க மென்பொருள் மூலம் ஆவணங்களை இலத்திரனியல் முறையில் உருவாக்க, திருத்த, வடிவமைக்க, சேமிக்க மற்றும் அச்சிட முடியும். கையால் எழுதும் போது ஏற்படும் அழித்தல்கள், நேர விரயம் என்பவற்றை இது தவிர்க்கிறது. படம் 3.1 சொல் செயலாக்கம் மூலம் உருவாக்கப்படும் 7 ஆவண வகைகளைக் காட்டுகிறது: கடிதங்கள், வினாத்தாள்கள், பத்திரிகைகள், விண்ணப்பப் படிவங்கள், அழைப்பிதழ்கள், வாழ்த்து அட்டைகள் மற்றும் சஞ்சிகைகள்.',
    },
    visualCard: {
      title: 'Figure 3.1: 7 Document Types in Word Processing',
      diagramType: 'infographic',
      content: 'Letters | Question Papers | Newspapers | Application Forms | Invitations | Greeting Cards | Magazines',
      caption: 'Authentic Sri Lankan Grade 8 ICT Textbook Figure 3.1 (Page 35)'
    },
    realWorldExample: {
      en: 'Sithum and his committee used a word processor to type 200 identical English Day invitation cards with the school emblem, saving hours of handwriting and eliminating ink smudges!',
      si: 'සිතුම් සහ මිතුරන් ඉංග්‍රීසි දින තරගාවලිය සඳහා ආරාධනා පත්‍ර 200ක් පාසල් ලාංඡනයද සහිතව පරිගණක වදන් සැකසුමෙන් අලංකාරව හා එක හා සමානව නිර්මාණය කළහ.',
      ta: 'சிதுமும் அவனது நண்பர்களும் ஆங்கில தின போட்டிக்கான 200 அழைப்பிதழ்களை பாடசாலை இலச்சினையுடன் சொல் செயலாக்க மென்பொருளைப் பயன்படுத்தி நேர்த்தியாக தயாரித்தனர்.',
    },
    checkQuestion: {
      id: 'wp-q1',
      subjectId: 'ict',
      topicId: 'word-processing',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'According to Figure 3.1 in the Grade 8 ICT textbook, which of the following lists the 7 common document types created using word processing?',
        si: '8 ශ්‍රේණියේ තොරතුරු තාක්ෂණ පෙළපොතේ රූපය 3.1 අනුව වදන් සැකසුම් මෘදුකාංග මඟින් නිර්මාණය කරන ලේඛන වර්ග 7 වන්නේ මොනවාද?',
        ta: 'தரம் 8 தகவல் தொடர்பாடல் தொழில்நுட்ப பாடநூலின் படம் 3.1 இன் படி சொல் செயலாக்கம் மூலம் உருவாக்கப்படும் 7 ஆவண வகைகள் யாவை?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Letters, Question papers, Newspapers, Application forms, Invitations, Greeting cards, Magazines', si: 'ලිපි, ප්‍රශ්න පත්‍ර, පුවත්පත්, අයදුම්පත්, ආරාධනා පත්‍ර, සුබපැතුම් පත්, සඟරා', ta: 'கடிதங்கள், வினாத்தாள்கள், பத்திரிகைகள், விண்ணப்பப் படிவங்கள், அழைப்பிதழ்கள், வாழ்த்து அட்டைகள், சஞ்சிகைகள்' } },
        { id: 'opt-2', text: { en: 'Spreadsheets, Databases, Web servers, Operating systems, Compilers, Device drivers, Kernel', si: 'පැතුරුම්පත්, දත්ත සමුදා, වෙබ් සේවාදායක, මෙහෙයුම් පද්ධති', ta: 'விரிதாள், தரவுத்தளம், வலை சேவையகம், இயக்க முறைமைகள்' } },
        { id: 'opt-3', text: { en: 'Motherboards, CPUs, RAM sticks, Hard drives, Power supply, Graphics card, Monitor', si: 'මවුපුවරු, මධ්‍ය සැකසුම් ඒකක, මතක චිප, දෘඩ තැටි', ta: 'தாய்ப்பலகை, நினைவகம், வன்வட்டு, மின் வழங்கி' } },
        { id: 'opt-4', text: { en: 'Video games, MP3 songs, 3D animations, Video renderers, Audio synthesizers', si: 'වීඩියෝ ක්‍රීඩා, ගීත, ත්‍රිමාණ සජීවීකරණ', ta: 'வீடியோ கேம்கள், பாடல்கள், அசைவூட்டங்கள்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Textbook Figure 3.1 (Page 35) explicitly identifies these 7 everyday documents as standard products of word processing software.',
        si: 'පෙළපොතේ 35 වන පිටුවේ රූපය 3.1 මඟින් මෙම ලේඛන 7 වදන් සැකසුම් මෘදුකාංග මඟින් සකසන ප්‍රධාන ලේඛන ලෙස නම් කර ඇත.',
        ta: 'பாடநூல் பக்கம் 35 இல் உள்ள படம் 3.1 இந்த 7 ஆவணங்களையும் சொல் செயலாக்கத்தின் பிரதான வெளியீடுகளாகக் குறிப்பிடுகிறது.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 3: Word Processing (Textbook p. 34–35, Fig 3.1)',
    }
  },
  {
    id: 'wp-step-2',
    stepNumber: 2,
    title: {
      en: 'Common Tools & Edit Operations (Textbook p. 35–36)',
      si: 'පොදු මෙවලම් සහ සංස්කරණ මෙවලම් (පිටු 35–36)',
      ta: 'பொது ஆவணக் கருவிகள் மற்றும் திருத்தல் கருவிகள் (பக். 35–36)',
    },
    concept: {
      en: 'Word processors provide two core groups of foundational tools:\n1. Common File Tools (p. 35): New (Ctrl+N, create blank file), Open (Ctrl+O, open existing document), Save (Ctrl+S, save changes to current file), Save As (save under a new name, location, or file type), Print Preview (inspect layout before printing), and Print (Ctrl+P, output to paper).\n2. Edit & Clipboard Tools (p. 36): Undo (Ctrl+Z, reverse last action), Redo (Ctrl+Y, re-apply undone action), Cut (Ctrl+X, remove to clipboard), Copy (Ctrl+C, duplicate to clipboard), Paste (Ctrl+V, insert from clipboard), and Spell Check (F7, identify spelling errors with red wavy underlines and grammar with green/blue wavy underlines).',
      si: 'වදන් සැකසුම් මෘදුකාංගවල මූලික මෙවලම් කාණ්ඩ දෙකක් ඇත:\n1. පොදු මෙවලම් (පිටුව 35): New (නව ලේඛනයක්), Open (පවතින ලේඛනයක් විවෘත කිරීම), Save (සුරැකීම), Save As (වෙනත් නමකින් හෝ ස්ථානයක සුරැකීම), Print Preview (මුද්‍රණයට පෙර පෙරදසුන), Print (මුද්‍රණය කිරීම).\n2. සංස්කරණ මෙවලම් (පිටුව 36): Undo (අවසන් ක්‍රියාව අහෝසි කිරීම), Redo (අහෝසි කළ ක්‍රියාව නැවත කිරීම), Cut (කපා ගැනීම), Copy (පිටපත් කිරීම), Paste (ඇලවීම), Spell Check (අක්ෂර වින්‍යාස පරීක්ෂාව - රතු/නිල් රැලි සහිත ඉරි).',
      ta: 'சொல் செயலாக்க மென்பொருளில் இரண்டு பிரதான கருவிக் குழுக்கள் உள்ளன:\n1. பொதுக் கருவிகள் (பக். 35): New (புதிய ஆவணம்), Open (திறத்தல்), Save (சேமித்தல்), Save As (வேறு பெயரில் சேமித்தல்), Print Preview (அச்சு முன்னோட்டம்), Print (அச்சிடுதல்).\n2. திருத்தல் கருவிகள் (பக். 36): Undo (செயல்தவிர்), Redo (மீண்டும் செய்), Cut (வெட்டு), Copy (பிரதி செய்), Paste (ஒட்டு), Spell Check (எழுத்துப்பிழை திருத்தம் - சிவப்பு/நீல அலை அலையான கோடுகள்).',
    },
    visualCard: {
      title: 'Common & Edit Tools Ribbon',
      diagramType: 'infographic',
      content: 'File: New | Open | Save | Save As | Print Preview | Print  ||  Edit: Undo | Redo | Cut | Copy | Paste | Spell Check',
      caption: 'Official toolbars defined in Grade 8 ICT Pages 35–36'
    },
    realWorldExample: {
      en: 'If you accidentally erase an entire paragraph while preparing your school report, pressing Undo (Ctrl+Z) restores the lost text instantly!',
      si: 'වාර්තාවක් සකස් කිරීමේදී අත්වැරදීමකින් ඡේදයක් මැකී ගියහොත් Undo (Ctrl+Z) මඟින් ක්ෂණිකව එම ඡේදය නැවත ලබාගත හැක.',
      ta: 'அறிக்கையைத் தயாரிக்கும் போது தவறுதலாக ஒரு பந்தியை அழித்துவிட்டால் Undo (Ctrl+Z) மூலம் அதை உடனடியாக மீளப்பெறலாம்.',
    },
    checkQuestion: {
      id: 'wp-q2',
      subjectId: 'ict',
      topicId: 'word-processing',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'What is the precise distinction between the "Save" and "Save As" tools in word processing software?',
        si: 'වදන් සැකසුම් මෘදුකාංගයක "Save" සහ "Save As" අතර ඇති නිශ්චිත වෙනස කුමක්ද?',
        ta: 'சொல் செயலாக்க மென்பொருளில் "Save" மற்றும் "Save As" கருவிகளுக்கு இடையிலான துல்லியமான வேறுபாடு யாது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Save updates the existing file, while Save As saves a copy under a new name, location, or format', si: 'Save මඟින් පවතින ගොනුවට වෙනස්කම් සුරකින අතර Save As මඟින් නව නමකින් හෝ ස්ථානයක පිටපතක් සුරකියි', ta: 'Save தற்போதைய ஆவணத்தை புதுப்பிக்கும், Save As புதிய பெயரில் அல்லது கோப்பு வடிவத்தில் சேமிக்கும்' } },
        { id: 'opt-2', text: { en: 'Save prints the document, while Save As closes the computer', si: 'Save මඟින් ලේඛනය මුද්‍රණය කරන අතර Save As මඟින් පරිගණකය වසා දමයි', ta: 'Save ஆவணத்தை அச்சிடும், Save As கணினியை மூடும்' } },
        { id: 'opt-3', text: { en: 'Save creates a new empty document, while Save As checks spelling', si: 'Save මඟින් හිස් ලේඛනයක් සාදන අතර Save As මඟින් අක්ෂර වින්‍යාසය බලයි', ta: 'Save புதிய ஆவணத்தை உருவாக்கும், Save As எழுத்துப் பிழையைச் சரிபார்க்கும்' } },
        { id: 'opt-4', text: { en: 'There is no difference; both commands perform the exact same task', si: 'කිසිදු වෙනසක් නැත, දෙකෙන්ම එකම දේ සිදුවේ', ta: 'எந்த வேறுபாடும் இல்லை, இரண்டும் ஒரே பணியைச் செய்யும்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'According to page 35, Save writes modifications to the currently opened file, whereas Save As allows saving the document under another name or at a different storage destination.',
        si: '35 පිටුව අනුව Save මඟින් පවතින ගොනුව යාවත්කාලීන වන අතර, Save As මඟින් නව නමකින් හෝ නව ස්ථානයක සුරැකිය හැක.',
        ta: 'பக்கம் 35 இன் படி Save தற்போதைய கோப்பில் மாற்றங்களைச் சேமிக்கும், Save As வேறொரு பெயரில் புதிய கோப்பாகச் சேமிக்கும்.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 3: Word Processing (Textbook p. 35)',
    }
  },
  {
    id: 'wp-step-3',
    stepNumber: 3,
    title: {
      en: 'Font Formatting, Styles & Subscript/Superscript (Textbook p. 36)',
      si: 'අකුරු හැඩසවි ගැන්වීම, විලාස සහ උපලකුණු/උඩුලකුණු (පිටුව 36)',
      ta: 'எழுத்துரு வடிவமைப்பு, பாணிகள் மற்றும் கீழ்/மேல் ஒட்டுகள் (பக். 36)',
    },
    concept: {
      en: 'Text formatting alters character appearance without altering wording (Textbook p. 36):\n- Font Selection: Times New Roman, Cambria, Arial for English; Nirmala UI (Unicode) or FMAbhaya for Sinhala; Latha or Nirmala UI for Tamil.\n- Font Size: Typically 18pt+ for titles, 14pt for sub-headings, and 12pt for body paragraphs.\n- Styles: Bold (B, Ctrl+B for emphasis), Italic (I, Ctrl+I for terms/titles), Underline (U, Ctrl+U), Font Color, and Text Highlight Color.\n- Subscript & Superscript (Activities 3.4 & 3.5):\n  • Subscript (x₂): Lowers text below the normal line, essential for chemical formulas like CO₂ and H₂O.\n  • Superscript (x²): Raises text above the line, essential for mathematical powers (2³, 5²) and ordinal numbers (1ˢᵗ, 2ⁿᵈ).',
      si: 'අකුරු හැඩසවි ගැන්වීම (පෙළපොත පිටුව 36):\n- අකුරු වර්ගය (Font): ඉංග්‍රීසි සඳහා Times New Roman, Cambria; සිංහල යුනිකෝඩ් සඳහා Nirmala UI හෝ FMAbhaya.\n- අකුරු ප්‍රමාණය (Font Size): මාතෘකා සඳහා 18pt+, උපමාතෘකා 14pt, සාමාන්‍ය ඡේද සඳහා 12pt.\n- විලාස (Styles): තද අකුරු (Bold, Ctrl+B), ඇල අකුරු (Italic, Ctrl+I), යටි ඉරි (Underline, Ctrl+U), අකුරු වර්ණ සහ Highlight.\n- උපලකුණු සහ උඩුලකුණු (ක්‍රියාකාරකම් 3.4 සහ 3.5):\n  • Subscript (x₂ - උපලකුණ): සාමාන්‍ය පෙළ මට්ටමට වඩා පහළින් ලියයි. රසායනික සූත්‍ර සඳහා (උදා: CO₂, H₂O).\n  • Superscript (x² - උඩුලකුණ): සාමාන්‍ය පෙළ මට්ටමට වඩා ඉහළින් ලියයි. ගණිතමය බල සහ දර්ශක සඳහා (උදා: 2³, 5², 1ˢᵗ).',
      ta: 'எழுத்து வடிவமைப்பு (பாடநூல் பக்கம் 36):\n- எழுத்துரு வகை: ஆங்கிலத்திற்கு Times New Roman, Cambria; தமிழுக்கு Latha, Nirmala UI.\n- எழுத்து அளவு: தலைப்புகளுக்கு 18pt+, உப தலைப்புகளுக்கு 14pt, பந்திகளுக்கு 12pt.\n- பாணிகள்: தடித்த (Bold, Ctrl+B), சாய்வான (Italic, Ctrl+I), அடிக்கோடு (Underline, Ctrl+U), நிறங்கள்.\n- Subscript & Superscript (செயற்பாடுகள் 3.4 & 3.5):\n  • Subscript (x₂ - கீழ் ஒட்டு): வரிக் கோட்டிற்கு கீழே எழுதும். இரசாயன சூத்திரங்களுக்கு (உதா: CO₂, H₂O).\n  • Superscript (x² - மேல் ஒட்டு): வரிக் கோட்டிற்கு மேலே எழுதும். கணித அடுக்குகளுக்கு (உதா: 2³, 5²).'
    },
    visualCard: {
      title: 'Subscript (x₂) vs Superscript (x²)',
      diagramType: 'infographic',
      content: 'Subscript (x₂): Chemical Formulas like CO₂, H₂O  ||  Superscript (x²): Mathematical Powers like 2³, 5²',
      caption: 'Grade 8 ICT Page 36 Activity 3.4 & 3.5'
    },
    realWorldExample: {
      en: 'When creating an 8th-grade Science examination paper, you must format carbon dioxide as CO₂ using Subscript, and in the Mathematics paper, format two-cubed as 2³ using Superscript!',
      si: '8 ශ්‍රේණියේ විද්‍යාව ප්‍රශ්න පත්‍රයක් සකස් කිරීමේදී කාබන්ඩයොක්සයිඩ් CO₂ ලෙස ලිවීමට Subscript ද, ගණිතය ප්‍රශ්න පත්‍රයේ 2³ ලිවීමට Superscript ද භාවිත කළ යුතුය!',
      ta: 'விஞ்ஞான வினாத்தாளில் காபனீரொட்சைட்டு CO₂ என எழுத Subscript உம், கணித வினாத்தாளில் 2³ என எழுத Superscript உம் பயன்படுகின்றன!',
    },
    checkQuestion: {
      id: 'wp-q3',
      subjectId: 'ict',
      topicId: 'word-processing',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'When typing a school examination paper, which font tools must be selected to format the chemical formula CO₂ and the mathematical power 2³ correctly?',
        si: 'පාසල් විභාග ප්‍රශ්න පත්‍රයක් සකස් කිරීමේදී CO₂ රසායනික සූත්‍රය සහ 2³ ගණිතමය ප්‍රකාශනය ලිවීමට තෝරාගත යුතු අකුරු හැඩසවි මෙවලම් මොනවාද?',
        ta: 'பரீட்சை வினாத்தாளில் CO₂ இரசாயன சூத்திரத்தையும் 2³ கணித அடுக்கையும் தட்டச்சு செய்ய முறையே தெரிவு செய்யப்பட வேண்டிய கருவிகள் எவை?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Subscript for the "2" in CO₂ and Superscript for the "3" in 2³', si: 'CO₂ හි "2" සඳහා Subscript (උපලකුණ) සහ 2³ හි "3" සඳහා Superscript (උඩුලකුණ)', ta: 'CO₂ இல் உள்ள "2" இற்கு Subscript மற்றும் 2³ இல் உள்ள "3" இற்கு Superscript' } },
        { id: 'opt-2', text: { en: 'Strikethrough for CO₂ and Double Underline for 2³', si: 'CO₂ සඳහා Strikethrough සහ 2³ සඳහා යටි ඉරි', ta: 'CO₂ இற்கு Strikethrough மற்றும் 2³ இற்கு அடிக்கோடு' } },
        { id: 'opt-3', text: { en: 'Center Alignment for CO₂ and Right Alignment for 2³', si: 'CO₂ සඳහා Center පෙළගැස්ම සහ 2³ සඳහා Right පෙළගැස්ම', ta: 'CO₂ இற்கு Center மற்றும் 2³ இற்கு Right' } },
        { id: 'opt-4', text: { en: 'Uppercase for CO₂ and Lowercase for 2³', si: 'CO₂ සඳහා ලොකු අකුරු සහ 2³ සඳහා කුඩා අකුරු', ta: 'CO₂ இற்கு பெரிய எழுத்து மற்றும் 2³ இற்கு சிறிய எழுத்து' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'As highlighted on page 36 (Activities 3.4 & 3.5), Subscript places numbers below the text baseline for chemical notation (CO₂), while Superscript elevates numbers above for algebraic exponents (2³).',
        si: 'පෙළපොතේ 36 පිටුවේ දැක්වෙන පරිදි රසායනික සූත්‍රවල පාදස්ථ අංක සඳහා Subscript ද, ගණිතයේ දර්ශක සඳහා Superscript ද යොදාගනී.',
        ta: 'பக்கம் 36 இன் படி இரசாயன சூத்திரங்களுக்கு Subscript உம், கணித அடுக்குகளுக்கு Superscript உம் பயன்படுத்தப்படுகின்றன.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 3: Word Processing (Textbook p. 36)',
    }
  },
  {
    id: 'wp-step-4',
    stepNumber: 4,
    title: {
      en: 'Paragraph Alignment, Spacing & Lists (Textbook p. 37)',
      si: 'ඡේද පෙළගැස්වීම්, පරතරය සහ ලැයිස්තු (පිටුව 37)',
      ta: 'பந்தி சீரமைப்பு, இடைவெளி மற்றும் பட்டியல்கள் (பக். 37)',
    },
    concept: {
      en: 'Paragraph formatting controls text layout across document margins (Textbook p. 37):\n- 4 Alignment Options:\n  1. Align Left (Ctrl+L): Text aligns neatly with the left margin; right margin remains ragged. Standard default for letters and essays.\n  2. Center (Ctrl+E): Centers text equidistant between margins. Used for headings, titles, certificates, and cover pages.\n  3. Align Right (Ctrl+R): Text aligns squarely along the right margin. Used for dates, sender addresses, and signatures.\n  4. Justify (Ctrl+J): Dynamically adjusts spacing between words so text aligns squarely against BOTH the left and right margins simultaneously, creating the crisp, clean columns seen in textbooks, newspapers, and magazines.\n- Line Spacing: Adjusts vertical distance between lines of text (1.0 single, 1.15, 1.5).\n- Bullets & Numbering: Creates ordered and unordered lists (Activities 3.7 & 3.8).\n- Borders & Shading: Highlights important announcement callouts.',
      si: 'ඡේද හැඩසවි ගැන්වීම මඟින් ලේඛනයේ පෙනුම මනාව පාලනය කරයි (පෙළපොත පිටුව 37):\n- පෙළගැස්වීම් 4 (Alignment):\n  1. වම් පෙළගැස්ම (Align Left, Ctrl+L): වම් දාරය කෙළින් පිහිටන අතර දකුණු දාරය අසමපාත වේ. සාමාන්‍ය ලිපි සඳහා සම්මතයයි.\n  2. මැදට පෙළගැස්ම (Center, Ctrl+E): දෙපස දාරවලට මැදිව පෙළගස්වයි. මාතෘකා, සහතිකපත් සහ ආවරණ පිටු සඳහා යොදාගනී.\n  3. දකුණු පෙළගැස්ම (Align Right, Ctrl+R): දකුණු දාරයට සමපාත වේ. දිනයන්, ලිපිනයන් සහ අත්සන් සඳහා යොදාගනී.\n  4. දෙපස සමපාත කිරීම (Justify, Ctrl+J): වචන අතර පරතරය ස්වයංක්‍රීයව සකසා වම් සහ දකුණු දාර දෙකටම එකවර සෘජුව පෙළගස්වයි. පෙළපොත්, පුවත්පත් සහ සඟරාවල මෙය සම්මතයයි.\n- පේළි පරතරය (Line Spacing), බුලට් සහ අංකනය (Bullets & Numbering), මායිම් සහ සෙවනැලි (Borders & Shading).',
      ta: 'பந்தி வடிவமைப்பு (பாடநூல் பக்கம் 37):\n- 4 சீரமைப்பு வகைகள்:\n  1. இடது சீரமைப்பு (Align Left, Ctrl+L): இடது ஓரம் நேராகவும் வலது ஓரம் ஒழுங்கற்றும் இருக்கும்.\n  2. மைய சீரமைப்பு (Center, Ctrl+E): பந்தியை நடுவில் வைக்கும். தலைப்புகளுக்கு உகந்தது.\n  3. வலது சீரமைப்பு (Align Right, Ctrl+R): வலது ஓரம் நேராக இருக்கும். திகதி, கையொப்பங்களுக்கு உகந்தது.\n  4. இருபுற சீரமைப்பு (Justify, Ctrl+J): இடது மற்றும் வலது இரு ஓரங்களையும் நேர்த்தியாக சமப்படுத்தும். பாடநூல்கள், பத்திரிகைகளில் பயன்படும்.\n- வரி இடைவெளி (Line Spacing), புல்லட்டுகள் மற்றும் இலக்கமிடல் (Bullets & Numbering).'
    },
    visualCard: {
      title: 'Four Paragraph Alignment Types',
      diagramType: 'infographic',
      content: 'Left (Default) | Center (Headings) | Right (Dates/Signatures) | Justify (Books/Newspapers both margins)',
      caption: 'Textbook Page 37 Alignment Options'
    },
    realWorldExample: {
      en: 'Open your Grade 8 ICT textbook right now: Notice how the chapter title "Word Processing" is Centered, the header with page number is Right-aligned, and all the body paragraphs are Justified on both sides!',
      si: 'ඔබේ 8 ශ්‍රේණියේ තොරතුරු තාක්ෂණ පෙළපොත දෙස බලන්න: "වදන් සැකසුම" ප්‍රධාන මාතෘකාව Center කර ඇති අතර, පිටු අංක දකුණටද, සියලුම ප්‍රධාන ඡේද දෙපසම සෘජුව Justify කර ඇත!',
      ta: 'உங்கள் தரம் 8 பாடநூலை கவனியுங்கள்: "சொல் செயலாக்கம்" தலைப்பு மையப்படுத்தப்பட்டும் (Center), பந்திகள் இருபுறமும் சமமாகவும் (Justify) அச்சிடப்பட்டுள்ளன!',
    },
    checkQuestion: {
      id: 'wp-q4',
      subjectId: 'ict',
      topicId: 'word-processing',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which paragraph alignment option adjusts spacing between words so text aligns evenly along BOTH the left and right margins simultaneously, as seen in published textbooks?',
        si: 'පෙළපොත් සහ පුවත්පත්වල දක්නට ලැබෙන පරිදි, වචන අතර පරතරය සකසමින් වම් සහ දකුණු දාර දෙකටම එකවර සමපාත වන සේ පෙළගස්වන විකල්පය කුමක්ද?',
        ta: 'பாடநூல்கள் மற்றும் பத்திரிகைகளில் காணப்படுவது போல், பந்தியின் உரையை இடது மற்றும் வலது இரு ஓரங்களிலும் ஒரே சீராக சமப்படுத்தும் சீரமைப்பு எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Justify (Ctrl+J)', si: 'Justify (දෙපස සමපාත කිරීම, Ctrl+J)', ta: 'Justify (இருபுற சீரமைப்பு, Ctrl+J)' } },
        { id: 'opt-2', text: { en: 'Align Left (Ctrl+L)', si: 'Align Left (වම් පෙළගැස්ම, Ctrl+L)', ta: 'Align Left (இடது சீரமைப்பு, Ctrl+L)' } },
        { id: 'opt-3', text: { en: 'Align Right (Ctrl+R)', si: 'Align Right (දකුණු පෙළගැස්ම, Ctrl+R)', ta: 'Align Right (வலது சீரமைப்பு, Ctrl+R)' } },
        { id: 'opt-4', text: { en: 'Center (Ctrl+E)', si: 'Center (මැදට පෙළගැස්ම, Ctrl+E)', ta: 'Center (மைய சீரமைப்பு, Ctrl+E)' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Justify inserts subtle micro-spacing between words so every line starts flush against the left margin and ends flush against the right margin.',
        si: 'Justify මඟින් වචන අතර පරතරය සකසා පෙළෙහි දෙපසම දාරවලට සෘජුව එක සමානව සමපාත කරයි.',
        ta: 'Justify சொற்களுக்கு இடையில் இடைவெளியைச் சரிசெய்து பந்தியின் இரு ஓரங்களையும் நேர்த்தியாக சமப்படுத்துகிறது.',
      },
      syllabusReference: 'Sri Lankan Grade 8 ICT — Chapter 3: Word Processing (Textbook p. 37)',
    }
  },
  {
    id: 'wp-step-5',
    stepNumber: 5,
    title: {
      en: 'Inserting Objects, Tables & Official Summary (Textbook p. 37–38)',
      si: 'වස්තු ඇතුළත් කිරීම, වගු, පිටු සැකසුම සහ නිල සාරාංශය (පිටු 37–38)',
      ta: 'உருப்படிகள் சேர்த்தல், அட்டவணைகள், பக்க வடிவமைப்பு மற்றும் சுருக்கம் (பக். 37–38)',
    },
    concept: {
      en: 'Modern word processing goes beyond plain text by incorporating rich graphic objects and structured data (Textbook p. 37–38):\n- Insertable Objects:\n  • Pictures & Images: Importing digital photos from storage (e.g. school crest, scientific diagrams).\n  • Clip Art & Shapes: Geometric shapes (rectangles, banners, callouts, arrows) to construct flowcharts and diagrams.\n  • Word Art: Decorative, stylized artistic lettering for posters, certificates, and souvenir headings.\n  • Text Boxes: Floating, movable text containers used for highlighting quotations or side notes.\n  • Tables: Formed by intersecting horizontal Rows and vertical Columns to create Cells, perfect for class timetables, mark sheets, and price lists.\n- Page Setup & Layout: Margins (Top, Bottom, Left, Right), Orientation (Portrait for standard documents, Landscape for wide tables), and Paper Size (A4 standard).\n- Official Chapter 3 Summary (Textbook p. 38):\n  1. Word processors facilitate easy electronic creation, editing, and formatting of documents.\n  2. Common tools like New, Open, Save, and Print manage documents reliably.\n  3. Character formatting provides complete control over fonts, sizes, styles, and Subscript/Superscript.\n  4. Paragraph alignment tools (Left, Center, Right, Justify) produce professionally organized layouts.\n  5. Inserting visual objects, shapes, and tables transforms simple text into engaging, communicative publications.',
      si: 'වදන් සැකසුම් මෘදුකාංග මඟින් සාමාන්‍ය පෙළට අමතරව විවිධ වස්තු සහ වගු ඇතුළත් කළ හැක (පෙළපොත පිටු 37–38):\n- ඇතුළත් කළ හැකි වස්තු (Insert Objects):\n  • පින්තූර (Pictures): පාසල් ලාංඡනය, විද්‍යාත්මක රූප සටහන් ආදිය ගොනු මඟින් ඇතුළත් කිරීම.\n  • හැඩතල (Shapes): ඊතල, බැනර්, ජ්‍යාමිතික හැඩතල මඟින් ප්‍රස්ථාර හා සටහන් නිර්මාණය කිරීම.\n  • Word Art: ආකර්ෂණීය අලංකාර අකුරු කලාව මඟින් සමරු කලාප, පෝස්ටර්වල ප්‍රධාන මාතෘකා සැකසීම.\n  • පෙළ කොටු (Text Boxes): නිදහසේ එහා මෙහා ගෙන යා හැකි පෙළ කොටු.\n  • වගු (Tables): තිරස් පේළි (Rows) සහ සිරස් තීරු (Columns) කැපී සෑදෙන කොටු (Cells) මඟින් කාලසටහන්, ලකුණු ලැයිස්තු සැකසීම.\n- පිටු සැකසුම (Page Setup): දිශානතිය (Portrait / Landscape), මායිම් (Margins).\n- නිල පාඩම් සාරාංශය (පිටුව 38): ලේඛන පහසුවෙන් සකස් කිරීම, පොදු මෙවලම් භාවිතය, අකුරු හා ඡේද හැඩසවි ගැන්වීම, වස්තු හා වගු මඟින් ලේඛනය ආකර්ෂණීය කර ගැනීම.',
      ta: 'சொல் செயலாக்க மென்பொருளில் உரையைத் தவிர பல்வேறு உருப்படிகளையும் அட்டவணைகளையும் சேர்க்கலாம் (பாடநூல் பக். 37–38):\n- சேர்க்கக்கூடிய உருப்படிகள்:\n  • படங்கள் (Pictures): புகைப்படங்கள், பாடசாலை இலச்சினை.\n  • வடிவங்கள் (Shapes): அம்புக்குறிகள், வடிவங்கள்.\n  • Word Art: கவர்ச்சிகரமான அலங்கார எழுத்துக்கள்.\n  • Text Boxes: நகர்த்தக்கூடிய உரைப்பெட்டிகள்.\n  • அட்டவணைகள் (Tables): வரிசைகள் மற்றும் நிரல்களால் ஆன சிற்றறைகள் (Cells), நேர அட்டவணைகளுக்கு உகந்தது.\n- பக்க வடிவமைப்பு: Orientation (Portrait / Landscape), ஓரங்கள் (Margins).\n- உத்தியோகபூர்வ சுருக்கம் (பக்கம் 38): ஆவண உருவாக்கம், பொதுக் கருவிகள், எழுத்துரு/பந்தி வடிவமைப்பு, அட்டவணைகள் மற்றும் உருப்படிகளைப் பயன்படுத்தி கவர்ச்சிகரமான ஆவணங்களை உருவாக்குதல்.'
    },
    visualCard: {
      title: 'Objects, Tables & Page Setup',
      diagramType: 'infographic',
      content: 'Insert: Pictures | Clip Art | Shapes | Word Art | Text Boxes | Tables  ||  Layout: Margins | Portrait vs Landscape',
      caption: 'Ministry Grade 8 ICT Chapter 3 Summary (Pages 37–38)'
    },
    realWorldExample: {
      en: 'When organizing the Grade 8 English Day souvenir, students used Word Art for the decorative cover title, a Table with 5 columns for the prize-giving schedule, and inserted the school crest picture!',
      si: '8 ශ්‍රේණියේ ඉංග්‍රීසි දින සමරු කලාපය සකස් කිරීමේදී ප්‍රධාන මාතෘකාවට Word Art ද, ත්‍යාග ප්‍රදානෝත්සව කාලසටහනට තීරු 5ක වගුවක්ද (Table), පාසල් ලාංඡනයද (Picture) ඇතුළත් කළහ!',
      ta: 'ஆங்கில தின மலர் தயாரிப்பில் மாணவர்கள் தலைப்பிற்கு Word Art உம், பரிசளிப்பு நேர அட்டவணைக்கு 5 நிரல்களைக் கொண்ட Table உம், பாடசாலை இலச்சினைப் படமும் சேர்த்தனர்!',
    },
    checkQuestion: {
      id: 'wp-q5',
      subjectId: 'ict',
      topicId: 'word-processing',
      grade: 'grade-8',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which tool in a word processor should you use to structure a weekly school class timetable with days across the top and periods down the side?',
        si: 'සතියේ දින ඉහළින්ද, කාලච්ඡේද පහළින්ද සිටින සේ සතිපතා පාසල් කාලසටහනක් පිළිවෙළකට සකස් කිරීමට යොදාගත යුතු වඩාත්ම සුදුසු මෙවලම කුමක්ද?',
        ta: 'கிழமைகள் மேலேயும் பாடவேளைகள் பக்கவாட்டிலும் அமையுமாறு பள்ளி நேர அட்டவணையை நேர்த்தியாக அமைக்கப் பயன்படும் மிகச் சிறந்த கருவி எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Table (composed of rows and columns)', si: 'Table (පේළි සහ තීරු වලින් සමන්විත වගු)', ta: 'Table (வரிசைகள் மற்றும் நிரல்களால் ஆன அட்டவணை)' } },
        { id: 'opt-2', text: { en: 'Word Art', si: 'Word Art (අලංකාර අකුරු)', ta: 'Word Art (அலங்கார எழுத்து)' } },
        { id: 'opt-3', text: { en: 'Subscript tool', si: 'Subscript (උපලකුණු මෙවලම)', ta: 'Subscript (கீழ் ஒட்டுக் கருவி)' } },
        { id: 'opt-4', text: { en: 'Spell check', si: 'Spell Check (අක්ෂර වින්‍යාස පරීක්ෂාව)', ta: 'Spell Check (எழுத்துப்பிழை திருத்தி)' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'A Table organizes information systematically into a grid of rows and columns, making it ideal for timetables, registers, and schedules.',
        si: 'වගුවක් (Table) මඟින් පේළි සහ තීරු ජාලයක් තුළ තොරතුරු ක්‍රමානුකූලව දැක්විය හැකි බැවින් කාලසටහන් සඳහා වඩාත්ම සුදුසු වේ.',
        ta: 'அட்டவணை (Table) வரிசைகள் மற்றும் நிரல்களில் தகவல்களை ஒழுங்கமைக்க உதவுவதால் நேர அட்டவணைகளுக்கு மிகவும் ஏற்றது.',
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
  },
  {
    id: 'hist-her-2',
    stepNumber: 2,
    title: {
      en: 'Inscriptions (Sellipi) & Epigraphy Media',
      si: 'සෙල්ලිපි සහ අභිලේඛන මාධ්‍ය',
      ta: 'கல்வெட்டுகளும் கல்வெட்டு ஊடகங்களும்',
    },
    concept: {
      en: 'Inscriptions (Sellipi / Shilalipi) are ancient writings engraved on stone, categorized by stone shape: Cave inscriptions (ලෙන් ලිපි), Rock inscriptions (ගිරි ලිපි), Pillar inscriptions (ටැම් ලිපි), Slab inscriptions (පුවරු ලිපි), and Seat inscriptions (ආසන ලිපි). The oldest are Brahmi cave inscriptions from the 2nd century B.C. recording cave donations to Buddhist monks ("සඟසතු කර ලෙන් පූජා කිරීම"). Media of Epigraphy include Stone (Galpotha), Walls (Sigiriya Kurutu Gee), Copper Plates (Panakaduwa), Gold Plates (Vallipuram), and Wood (Embekke Devalaya).',
      si: 'ගල් මත කොටන ලද ලේඛන සෙල්ලිපි නම් වේ. ගල්වල හැඩය අනුව ප්‍රධාන වර්ග 5කි: ලෙන් ලිපි, ගිරි ලිපි, ටැම් ලිපි, පුවරු ලිපි සහ ආසන ලිපි. මෙරට පැරණිතම සෙල්ලිපි වන්නේ ක්‍රි.පූ. 2 වන සියවසේ මහා සංඝරත්නයට ලෙන් පූජා කිරීම වාර්තා කළ බ්‍රාහ්මී ලෙන් ලිපි වේ. අභිලේඛන මාධ්‍ය ලෙස ගල් (ගල්පොත සෙල්ලිපිය), බිත්ති (සීගිරි කුරුටු ගී), තඹ පත් (පනාකඩුව තඹ සන්නස), රන් පත් (වල්ලිපුරම් රන් පත) සහ ලී (ඇම්බැක්කේ දේවාලය) භාවිත වී ඇත.',
      ta: 'கற்களில் பொறிக்கப்பட்ட எழுத்துக்கள் கல்வெட்டுகள் (Sellipi) எனப்படும். பாறையின் வடிவம் சார்ந்து 5 வகைகள்: குகைக் கல்வெட்டுகள், பாறைக் கல்வெட்டுகள், தூண் கல்வெட்டுகள், பலகைக் கல்வெட்டுகள் மற்றும் ஆசனக் கல்வெட்டுகள். கி.மு. 2 ஆம் நூற்றாண்டில் பௌத்த துறவிகளுக்கு குகைகளை தானமாக வழங்கியதை பதிவு செய்த பிராமி குகைக் கல்வெட்டுகளே நாட்டின் மிகப்பழைய கல்வெட்டுகளாகும். கல்வெட்டு ஊடகங்களாக கல் (கல்பொத கல்வெட்டு), சுவர் (சிகிரியா குருட்டுக் கீ), செப்புத் தகடு (பனக்கடுவ), தங்கத் தகடு (வல்லிபுரம்) மற்றும் மரம் (எம்பக்க தேவாலயம்) பயன்பட்டன.',
    },
    visualCard: {
      title: '5 Types of Inscriptions (Sellipi) & Epigraphy Media',
      diagramType: 'infographic',
      content: '1. Cave (ලෙන්)  2. Rock (ගිරි)  3. Pillar (ටැම්)  4. Slab (පුවරු)  5. Seat (ආසන)  |  Media: Galpotha, Sigiri Graffiti, Panakaduwa Copper Plate',
      caption: 'Textbook Table 1.4: Different Media of Epigraphy across Sri Lanka.'
    },
    realWorldExample: {
      en: 'In Mihintale and Dambulla, ancient cave drip-ledges (කටාරම්) still clearly display 2,200-year-old Early Brahmi inscriptions recording pious donations to Buddhist monks by royal chieftains (Parumaka) and village heads (Gamika).',
      si: 'මිහින්තලේ සහ දඹුල්ලේ ලෙන් කටාරම් යට අදටත් පැහැදිලිව දකින්නට ඇති ක්‍රි.පූ. 2 වන සියවසේ බ්‍රාහ්මී සෙල්ලිපි මඟින් ප්‍රාදේශීය ප්‍රධානීන් (පරුමක) සහ ගම් ප්‍රධානීන් (ගාමිණී) කළ ලෙන් පූජාවන් සනාථ වේ.',
      ta: 'மிஹிந்தலை மற்றும் தம்புள்ளை குகைகளின் கீழ் 2200 ஆண்டுகள் பழமையான பிராமி கல்வெட்டுகள் பௌத்த துறவிகளுக்கு நிலங்கள் மற்றும் குகைகள் தானமாக வழங்கப்பட்டதை இன்றும் தெளிவாகக் காட்டுகின்றன.',
    },
    checkQuestion: {
      id: 'hist-her-q2',
      subjectId: 'history',
      topicId: 'history-gr10-sources',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'According to the Grade 10 History textbook, what are the five categories of inscriptions based on stone shapes?',
        si: '10 ශ්‍රේණිය ඉතිහාසය පෙළපොතට අනුව, ගල්වල හැඩය අනුව වර්ගීකරණය කරන ලද සෙල්ලිපි වර්ග 5 මොනවාද?',
        ta: 'தரம் 10 வரலாற்று பாடநூலின் படி, பாறைகளின் வடிவத்தை அடிப்படையாகக் கொண்ட 5 வகையான கல்வெட்டுகள் எவை?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Cave, Rock, Pillar, Slab, and Seat inscriptions', si: 'ලෙන් ලිපි, ගිරි ලිපි, ටැම් ලිපි, පුවරු ලිපි සහ ආසන ලිපි', ta: 'குகை, பாறை, தூண், பலகை மற்றும் ஆசனக் கல்வெட்டுகள்' } },
        { id: 'opt-2', text: { en: 'Clay tablets, Papyrus, Wall, Metal, and Paper', si: 'මැටි පුවරු, පැපිරස්, බිත්ති, ලෝහ සහ කඩදාසි', ta: 'களிமண் பலகை, பப்பிரஸ், சுவர், உலோகம், காகிதம்' } },
        { id: 'opt-3', text: { en: 'Palm-leaf, Copper, Gold, Silver, and Wood only', si: 'පුස්කොළ, තඹ, රන්, රිදී සහ ලී පමණි', ta: 'ஓலைச்சுவடி, செப்பு, தங்கம், வெள்ளி, மரம்' } },
        { id: 'opt-4', text: { en: 'Coins, Stupas, Tanks, Statues, and Palaces', si: 'කාසි, ස්තූප, වැව්, පිළිම සහ මාළිගා', ta: 'நாணயங்கள், தூபிகள், குளங்கள், சிலைகள், அரண்மனைகள்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Textbook page 3 specifies: According to the shapes of stones, inscriptions are categorized as Cave (Len), Rock (Giri), Pillar (Tam), Slab (Puwaru), and Seat (Asana) inscriptions.',
        si: 'පෙළපොතේ 3 පිටුවට අනුව: ගල්වල හැඩය අනුව සෙල්ලිපි ලෙන් ලිපි, ගිරි ලිපි, ටැම් ලිපි, පුවරු ලිපි සහ ආසන ලිපි ලෙස වර්ග 5කට බෙදා දක්වයි.',
        ta: 'பாடநூலின் பக்கம் 3 இன் படி: குகை, பாறை, தூண், பலகை மற்றும் ஆசனக் கல்வெட்டுகள் என 5 பிரிவுகளாக வகைப்படுத்தப்படுகின்றன.',
      },
      syllabusReference: 'Sri Lankan Grade 10 History — Chapter 1: Sources of Studying History (Textbook p. 3–5)',
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

export const TEACH_ME_RATE_OF_REACTIONS_STEPS: LessonStep[] = [
  {
    id: 'rate-step-1',
    stepNumber: 1,
    title: {
      en: 'What is Rate of Reaction & How Do We Measure It?',
      si: 'ප්‍රතික්‍රියා සීඝ්‍රතාව යනු කුමක්ද සහ එය මනින්නේ කෙසේද?',
      ta: 'தாக்க வீதம் என்றால் என்ன? அதனை எவ்வாறு அளவிடுவது?',
    },
    concept: {
      en: 'In any chemical reaction, reactants are gradually used up while new products are formed. The Rate of Reaction measures how rapidly reactants turn into products over time:\n\n$$\\text{Rate of Reaction} = \\frac{\\text{Change in Quantity (Volume or Mass) of Reactants or Products}}{\\text{Time Taken}}$$\n\nTwo practical methods used in school laboratories:\n1. **Measuring Gas Volume Over Time:** Collecting gas (like $H_2$ or $CO_2$) in a gas syringe or inverted measuring cylinder (e.g. $Mg + 2HCl \\rightarrow MgCl_2 + H_2\\uparrow$).\n2. **Measuring Mass Loss Over Time:** Placing the reaction flask on a digital balance with a cotton wool plug. As gas escapes, the total mass steadily decreases (e.g. $CaCO_3 + 2HCl \\rightarrow CaCl_2 + H_2O + CO_2\\uparrow$).',
      si: 'ඕනෑම රසායනික ප්‍රතික්‍රියාවකදී ප්‍රතික්‍රියක ක්‍රමයෙන් වැය වන අතර නව ඵල සෑදේ. ප්‍රතික්‍රියා සීඝ්‍රතාව යනු ඒකක කාලයකදී ප්‍රතික්‍රියක ඵල බවට පත්වන වේගයයි:\n\n$$\\text{ප්‍රතික්‍රියා සීඝ්‍රතාව} = \\frac{\\text{ප්‍රතික්‍රියක හෝ ඵලවල ප්‍රමාණයේ (පරිමාව හෝ ස්කන්ධය) වෙනස}}{\\text{ගතවූ කාලය}}$$\n\nපාසල් විද්‍යාගාරයේදී මෙය මනින ප්‍රධාන ක්‍රම දෙකක් ඇත:\n1. **වායු පරිමාව මැනීම:** වායු සිරින්ජයක් මඟින් පිටවන වායු පරිමාව කාලය සමඟ සටහන් කරගැනීම ($Mg + 2HCl \\rightarrow MgCl_2 + H_2\\uparrow$).\n2. **ස්කන්ධ හානිය මැනීම:** ඉලෙක්ට්‍රොනික තුලාවක් මත ප්ලාස්කුව තබා, පිටවන වායුව නිසා සිදුවන ස්කන්ධ අඩුවීම කාලය සමඟ මැනීම ($CaCO_3 + 2HCl \\rightarrow CaCl_2 + H_2O + CO_2\\uparrow$).',
      ta: 'எந்தவொரு இரசாயனத் தாக்கத்திலும் தாக்கிகள் படிப்படியாக செலவிடப்பட்டு புதிய விளைவுகள் உருவாகின்றன. தாக்க வீதம் என்பது ஓரலகு நேரத்தில் தாக்கிகள் விளைவுகளாக மாறும் வேகத்தை அளவிடுவதாகும்:\n\n$$\\text{தாக்க வீதம்} = \\frac{\\text{தாக்கிகள் அல்லது விளைவுகளின் அளவில் ஏற்படும் மாற்றம்}}{\\text{எடுத்த நேரம்}}$$\n\nபாடசாலை ஆய்வுகூடத்தில் அளவிடும் இரு முக்கிய முறைகள்:\n1. **வாயுவின் கனவளவை அளவிடுதல்:** வெளியேறும் வாயுவை (ஹைட்ரஜன் அல்லது காபனீரொட்சைட்டு) வாயு உறிஞ்சுகுழல் மூலம் அளவிடுதல்.\n2. **திணிவு இழப்பை அளவிடுதல்:** மின்னணு தராசில் தாக்கம் நிகழும் குடுவையை வைத்து, வெளியேறும் வாயுவினால் ஏற்படும் திணிவு இழப்பை அளவிடுதல்.',
    },
    visualCard: {
      title: 'Measuring Reaction Rates in the Laboratory',
      diagramType: 'diagram',
      content: 'Rate = ΔV (Gas in cm³) / Δt (seconds)  OR  Δm (Mass Loss in grams) / Δt (seconds)',
      caption: 'Initial rate is highest when reactant concentration is peak, tapering off as reactants deplete.'
    },
    realWorldExample: {
      en: 'Drop an effervescent antacid tablet (or vitamin C tablet) into a glass of warm water. In the first 10 seconds, it fizzes violently with a massive rush of CO₂ bubbles (high initial rate). As reactants get used up, the fizzing gently dies down.',
      si: 'වතුර වීදුරුවකට ගැස්ට්‍රයිටිස් සඳහා ගන්නා Antacid පෙත්තක් හෝ විටමින් C පෙත්තක් දැමූ විට, පළමු තත්පර 10 තුළ අධික ලෙස කාබන් ඩයොක්සයිඩ් බුබුළු පිටවෙමින් වේගයෙන් දියවේ (ඉහළ ආරම්භක සීඝ්‍රතාව). ප්‍රතික්‍රියක වැයවත්ම බුබුළු දැමීම සෙමින් අඩුවේ.',
      ta: 'ஒரு குவளை வெதுவெதுப்பான நீரில் Antacid மாத்திரையை இடும்போது, முதல் 10 வினாடிகளில் தீவிரமாக காபனீரொட்சைட்டு குமிழ்கள் வெளியேறும். தாக்கிகள் தீரத் தீர குமிழ்கள் குறைந்து தாக்கம் நின்றுவிடும்.',
    },
    checkQuestion: {
      id: 'rate-q1',
      subjectId: 'science',
      topicId: 'science-gr10-ch17-rate-of-reactions',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which experimental setup is most suitable to measure the reaction rate between marble chips (CaCO₃) and dilute hydrochloric acid (HCl)?',
        si: 'කිරිගරුඬ කැබලි (CaCO₃) සහ තනුක හයිඩ්‍රොක්ලෝරික් අම්ලය (HCl) අතර ප්‍රතික්‍රියා සීඝ්‍රතාව මැනීමට වඩාත් සුදුසු ක්‍රමය කුමක්ද?',
        ta: 'சுண்ணாம்புக் கற்கள் (CaCO₃) மற்றும் நீர்த்த ஹைட்ரோகுளோரிக் அமிலம் (HCl) இடையேயான தாக்க வீதத்தை அளவிட மிகவும் பொருத்தமான முறை எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Placing the reaction flask on a digital balance with cotton wool to track mass loss as CO₂ escapes', si: 'කාබන් ඩයොක්සයිඩ් පිටවීම නිසා සිදුවන ස්කන්ධ හානිය ඉලෙක්ට්‍රොනික තුලාවක් මඟින් කාලය සමඟ මැනීම', ta: 'காபனீரொட்சைட்டு வெளியேறுவதால் ஏற்படும் திணிவு இழப்பை மின்னணு தராசு மூலம் அளவிடுதல்' } },
        { id: 'opt-2', text: { en: 'Measuring the change in room atmospheric pressure using a barometer', si: 'කාමරයේ වායුගෝලීය පීඩනය බැරෝමීටරයකින් මැනීම', ta: 'பாரமானி மூலம் வளிமண்டல அமுக்கத்தை அளவிடுதல்' } },
        { id: 'opt-3', text: { en: 'Measuring the electrical resistance of the glass flask with a galvanometer', si: 'ගැල්වනෝමීටරයක් භාවිතයෙන් වීදුරු ප්ලාස්කුවේ විද්‍යුත් ප්‍රතිරෝධය මැනීම', ta: 'கல்வனோமானி மூலம் மின் எதிர்ப்பை அளவிடுதல்' } },
        { id: 'opt-4', text: { en: 'Weighing the flask after 24 hours only', si: 'පැය 24කට පසුව පමණක් ප්ලාස්කුව කිරා බැලීම', ta: '24 மணித்தியாலங்களுக்குப் பிறகு மட்டும் நிறுத்தல்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Since carbon dioxide (CO₂) is a dense gas that escapes into the atmosphere, continuous measurement of mass loss using a digital balance provides an accurate rate-of-reaction graph.',
        si: 'කාබන් ඩයොක්සයිඩ් (CO₂) වායුවක් ලෙස පිටවන බැවින්, ඉලෙක්ට්‍රොනික තුලාවක් මඟින් ස්කන්ධය අඩුවීම මැනීමෙන් නිවැරදි ප්‍රස්ථාරයක් ලබාගත හැක.',
        ta: 'காபனீரொட்சைட்டு வெளியேறுவதால் குடுவையின் திணிவு குறையும்; இதனை மின்னணு தராசு கொண்டு துல்லியமாக அளவிடலாம்.',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 17: Rate of Reactions (Textbook Part 2, p. 115–117)',
    }
  },
  {
    id: 'rate-step-2',
    stepNumber: 2,
    title: {
      en: 'Collision Theory: Why Do Molecules Need to Crash?',
      si: 'ගැටුම් වාදය: අණු එකිනෙක ගැටිය යුත්තේ ඇයි?',
      ta: 'மோதுகைத் கொள்கை: மூலக்கூறுகள் ஏன் மோத வேண்டும்?',
    },
    concept: {
      en: 'According to the **Collision Theory**, reactant particles are constantly in random thermal motion. However, not every collision results in a chemical reaction! For a collision to produce new molecules, two strict criteria must be met:\n\n1. **Activation Energy ($E_a$):** Colliding particles must possess a minimum threshold kinetic energy to break existing chemical bonds. Collisions with energy below $E_a$ simply bounce off each other without reacting.\n2. **Proper Spatial Orientation:** Reactant molecules must collide at the correct geometric angle so that reactive bonds align.\n\nCollisions meeting both conditions are called **Effective Collisions (ඵලදායී ගැටුම්)**. The rate of reaction is directly proportional to the number of effective collisions per unit time!',
      si: '**ගැටුම් වාදයට (Collision Theory)** අනුව ප්‍රතික්‍රියක අංශු නිරන්තරයෙන් අවිධිමත් චලිතයක යෙදේ. එහෙත් සෑම ගැටුමක්ම රසායනික ප්‍රතික්‍රියාවකට මඟ පාදන්නේ නැත! ප්‍රතික්‍රියාවක් සිදුවීමට කරුණු 2ක් අත්‍යවශ්‍ය වේ:\n\n1. **සක්‍රියන ශක්තිය (Activation Energy - $E_a$):** පවතින රසායනික බන්ධන බිඳදැමීම සඳහා ගැටෙන අංශු සතුව තිබිය යුතු අවම ශක්තියයි. මෙම ශක්තියට වඩා අඩු ශක්තියකින් ගැටෙන අංශු ප්‍රතික්‍රියා නොවී ආපසු ඉවතට විසිවේ.\n2. **නිවැරදි දිශානතිය (Proper Orientation):** නව බන්ධන සෑදීමට හැකිවන පරිදි නිවැරදි ජ්‍යාමිතික කෝණයකින් අංශු එකිනෙක ගැටිය යුතුය.\n\nමෙම කොන්දේසි සපුරන ගැටුම් **ඵලදායී ගැටුම්** නම් වේ. ඒකක කාලයකදී සිදුවන ඵලදායී ගැටුම් සංඛ්‍යාව වැඩිවන විට ප්‍රතික්‍රියා සීඝ්‍රතාව වැඩිවේ!',
      ta: '**மோதுகைத் கொள்கையின்படி**, தாக்கித் துணிக்கைகள் தொடர்ந்து இயக்கத்தில் உள்ளன. ஆனால் எல்லா மோதுகைகளும் இரசாயனத் தாக்கத்தை ஏற்படுத்துவதில்லை! தாக்கம் நிகழ இரு நிபந்தனைகள் பூர்த்தியாக வேண்டும்:\n\n1. **செயலாக்கு சக்தி (Activation Energy - $E_a$):** பிணைப்புகளை உடைக்கத் தேவையான குறைந்தபட்ச இயக்க சக்தி. இதற்கு குறைவான சக்தியுடன் மோதும் துணிக்கைகள் தாக்கமடையாமல் விலகிவிடும்.\n2. **சரியான திசைமுக அமைவு:** மூலக்கூறுகள் சரியான கோணத்தில் மோத வேண்டும்.\n\nஇரு நிபந்தனைகளையும் பூர்த்தி செய்யும் மோதுகைகள் **பயனுள்ள மோதுகைகள் (Effective Collisions)** எனப்படும்.',
    },
    visualCard: {
      title: 'Ineffective Collision vs Effective Collision',
      diagramType: 'diagram',
      content: 'Low Energy Hit ➔ Bounce Away (No Reaction) | High Energy (≥ Ea) + Proper Angle ➔ Bonds Break ➔ Products Formed! ✨',
      caption: 'Only a fraction of total collisions possess energy ≥ Ea to become effective collisions.'
    },
    realWorldExample: {
      en: 'Think of striking a matchstick against the rough side of a matchbox. If you gently rub it, nothing happens because the energy is lower than the activation energy ($E < E_a$). Only when you strike it with sufficient speed and friction does it overcome $E_a$ and burst into flame!',
      si: 'ගිනිපෙට්ටියක පැත්තේ ගිනිකූරක් ගසන ආකාරය සිතන්න. ඉතා මෘදුව අතුල්ලුවහොත් ගිනි නොගනී (ශක්තිය සක්‍රියන ශක්තියට වඩා අඩුය). ප්‍රමාණවත් වේගයකින් සහ ඝර්ෂණයකින් ගැසූ විට පමණක් සක්‍රියන ශක්තිය ඉක්මවා ගොස් ගිනි දැල්වේ!',
      ta: 'தீப்பெட்டியில் தீக்குச்சியை மெதுவாக உரசினால் தீ பற்றாது (சக்தி < Ea). வேகமாகவும் சரியான கோணத்திலும் உரசும்போது மட்டுமே செயலாக்கு சக்தியைத் தாண்டி தீப்பிடிக்கும்!',
    },
    checkQuestion: {
      id: 'rate-q2',
      subjectId: 'science',
      topicId: 'science-gr10-ch17-rate-of-reactions',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'According to Collision Theory, what two essential conditions must be fulfilled for a collision to be an "effective collision"?',
        si: 'ගැටුම් වාදයට අනුව ගැටුමක් "ඵලදායී ගැටුමක්" බවට පත්වීමට සපුරාලිය යුතු අත්‍යවශ්‍ය කොන්දේසි දෙක කුමක්ද?',
        ta: 'மோதுகைத் கொள்கையின்படி ஒரு மோதுகை "பயனுள்ள மோதுகையாக" அமைய பூர்த்தியாக வேண்டிய இரு நிபந்தனைகள் யாவை?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Kinetic energy ≥ Activation Energy (Ea) and proper spatial orientation', si: 'සක්‍රියන ශක්තියට (Ea) සමාන හෝ වැඩි ශක්තියක් තිබීම සහ නිවැරදි දිශානතියකින් ගැටීම', ta: 'இயக்க சக்தி ≥ செயலாக்கு சக்தி (Ea) மற்றும் சரியான திசைமுக அமைவு' } },
        { id: 'opt-2', text: { en: 'Particles must be cooled to absolute zero', si: 'අංශු නිරපේක්ෂ ශූන්‍යය දක්වා සිසිල් කර තිබීම', ta: 'துணிக்கைகள் பூச்சிய வெப்பநிலைக்கு குளிரூட்டப்படுதல்' } },
        { id: 'opt-3', text: { en: 'Particles must have the same electrical charge', si: 'අංශුවලට සමාන විද්‍යුත් ආරෝපණ තිබීම', ta: 'ஒரே மின்னேற்றத்தைக் கொண்டிருத்தல்' } },
        { id: 'opt-4', text: { en: 'The reaction must take place in complete darkness', si: 'ප්‍රතික්‍රියාව සම්පූර්ණ අන්ධකාරයේ සිදුවීම', ta: 'முழுமையான இருட்டில் தாக்கம் நிகழ்தல்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Correct! Without energy greater than or equal to Ea, bonds cannot break; and without proper orientation, new bonds cannot form.',
        si: 'නිවැරදියි! සක්‍රියන ශක්තිය නොමැතිව පවතින බන්ධන බිඳිය නොහැකි අතර නිවැරදි දිශානතියකින් තොරව නව බන්ධන සෑදිය නොහැක.',
        ta: 'சரியானது! செயலாக்கு சக்தியும் சரியான திசைமுக அமைவும் இன்றி பயனுள்ள மோதுகை நிகழ முடியாது.',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 17: Collision Theory (Textbook Part 2, p. 117–119)',
    }
  },
  {
    id: 'rate-step-3',
    stepNumber: 3,
    title: {
      en: 'Factors Affecting Rates: Temperature, Concentration & Surface Area',
      si: 'ප්‍රතික්‍රියා සීඝ්‍රතාව කෙරෙහි බලපාන සාධක: උෂ්ණත්වය, සාන්ද්‍රණය සහ පෘෂ්ඨික වර්ගඵලය',
      ta: 'தாக்க வீதத்தைப் பாதிக்கும் காரணிகள்: வெப்பநிலை, செறிவு மற்றும் மேற்பரப்பளவு',
    },
    concept: {
      en: 'We can speed up or slow down chemical reactions by manipulating three core physical factors:\n\n1. **Temperature:** Heating increases the average kinetic energy of particles. They move faster (higher collision frequency) AND a far higher percentage of collisions exceed Activation Energy $E_a$. (Rule of thumb: a $10^\\circ\\text{C}$ temperature rise roughly **doubles** the reaction rate!).\n2. **Concentration:** Concentrated solutions pack more reactant ions/molecules into the same volume. More particles mean more collisions per second.\n3. **Surface Area (Physical Nature of Solid):** Crushing a solid lump into fine powder exposes millions of interior atoms to the surrounding acid. With vastly more surface contact area, collision frequency multiplies dramatically!',
      si: 'ප්‍රධාන භෞතික සාධක 3ක් වෙනස් කිරීමෙන් අපට ප්‍රතික්‍රියා සීඝ්‍රතාව පාලනය කළ හැක:\n\n1. **උෂ්ණත්වය:** උෂ්ණත්වය වැඩි කරන විට අංශුවල චාලක ශක්තිය වැඩිවේ. අංශු වේගයෙන් චලනය වන අතර (ගැටුම් වාර ගණන වැඩිවේ) සක්‍රියන ශක්තිය ($E_a$) ඉක්මවා යන අංශු ප්‍රතිශතය විශාල ලෙස ඉහළ යයි. (සාමාන්‍යයෙන් උෂ්ණත්වය $10^\\circ\\text{C}$ කින් වැඩිවන විට සීඝ්‍රතාව දෙගුණයක් පමණ වේ!).\n2. **සාන්ද්‍රණය:** සාන්ද්‍රණය වැඩි ද්‍රාවණයක ඒකක පරිමාවක් තුළ ප්‍රතික්‍රියක අංශු වැඩි සංඛ්‍යාවක් ඇත. එමඟින් තත්පරයකදී සිදුවන ගැටුම් සංඛ්‍යාව වැඩිවේ.\n3. **පෘෂ්ඨික වර්ගඵලය:** ඝන ද්‍රව්‍යයක් කුඩු කළ විට අභ්‍යන්තරයේ වූ සියලුම අංශු අම්ලය සමඟ ගැටීමට නිරාවරණය වේ. පෘෂ්ඨික වර්ගඵලය වැඩිවත්ම ඵලදායී ගැටුම් වාර ගණන සීඝ්‍රයෙන් වැඩිවේ!',
      ta: 'மூன்று முக்கிய காரணிகள் மூலம் நாம் தாக்க வீதத்தை மாற்றலாம்:\n\n1. **வெப்பநிலை:** வெப்பநிலை அதிகரிக்கும் போது துணிக்கைகளின் இயக்க சக்தி அதிகரிக்கும். வேகமான இயக்கமும், செயலாக்கு சக்தியைத் தாண்டும் துணிக்கைகளின் எண்ணிக்கையும் அதிகரிப்பதால் தாக்க வீதம் கூடுகிறது.\n2. **செறிவு:** அதிக செறிவுள்ள கரைசலில் ஓரலகு கனவளவில் அதிக துணிக்கைகள் உள்ளன; இதனால் மோதும் சந்தர்ப்பங்கள் கூடுகின்றன.\n3. **மேற்பரப்பளவு:** ஒரு திண்மத்தை தூளாக்கும் போது அதன் மேற்பரப்பளவு பன்மடங்கு அதிகரிக்கிறது; அமிலத்துடன் மோதும் துணிக்கைகளின் எண்ணிக்கை பெருமளவில் கூடுகிறது.',
    },
    visualCard: {
      title: 'Comparing Gas Evolution Curves',
      diagramType: 'diagram',
      content: 'Powder / High Temp ➔ Steep Initial Slope (Very Fast Rate) | Solid Lump / Low Temp ➔ Gentle Slope (Slow Rate)',
      caption: 'Both reactions yield the same total gas volume at completion, but powder finishes in 1 minute while lump takes 10 minutes!'
    },
    realWorldExample: {
      en: 'Sri Lankan culinary & domestic examples:\n- Fresh fish at Negombo or Beruwala fish market is packed in crushed ice because low temperature slows down bacterial decomposition reactions.\n- When lighting a traditional firewood hearth, cooks cut dry firewood into thin shavings and splinters (high surface area) to catch fire instantly!',
      si: 'ශ්‍රී ලාංකීය එදිනෙදා ජීවිතයෙන් උදාහරණ:\n- මීගමුව හෝ බේරුවල ධීවර වරායේදී අලුත් මාළු අයිස් කැට තුළ අසුරන්නේ අඩු උෂ්ණත්වයේදී ක්ෂුද්‍රජීවී නරක්වීමේ ප්‍රතික්‍රියා සීඝ්‍රතාව අඩුවන බැවිනි.\n- දර ලිපක් පත්තු කිරීමේදී ලොකු කොටන් වෙනුවට කුඩා දර පතුරු සහ ලී කුඩු යොදාගන්නේ පෘෂ්ඨික වර්ගඵලය වැඩි නිසා ඉක්මනින් ගිනි ඇවිලෙන බැවිනි!',
      ta: 'நடைமுறை உதாரணங்கள்:\n- மீன்கள் கெட்டுப்போகாமல் இருக்க ஐஸ் கட்டிகளில் வைக்கப்படுகின்றன (குறைந்த வெப்பநிலை தாக்க வீதத்தைக் குறைக்கும்).\n- விறகு அடுப்பில் பெரிய மரக்கட்டைக்கு பதிலாக சிறிய விறகுச் சீவல்களைப் பயன்படுத்தும்போது அதிக மேற்பரப்பளவினால் உடனே தீப்பிடிக்கும்!',
    },
    checkQuestion: {
      id: 'rate-q3',
      subjectId: 'science',
      topicId: 'science-gr10-ch17-rate-of-reactions',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Why does 5g of powdered calcium carbonate react with dilute acid much faster than a single 5g lump of marble chip?',
        si: 'තනි 5g කිරිගරුඬ කැබැල්ලකට වඩා 5g කිරිගරුඬ කුඩු තනුක අම්ලය සමඟ ඉතා වේගයෙන් ප්‍රතික්‍රියා කරන්නේ ඇයි?',
        ta: '5g எடையுள்ள ஒரே கல்லை விட, 5g சுண்ணாம்புத் தூள் அமிலத்துடன் மிக வேகமாகத் தாக்கமடைவது ஏன்?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Powder exposes a far greater total surface area for acid particles to collide with', si: 'කුඩු කළ විට අම්ල අංශු සමඟ ගැටීමට ඇති මුළු පෘෂ්ඨික වර්ගඵලය විශාල ලෙස වැඩිවන බැවින්', ta: 'தூளாக்கும் போது அமிலத் துணிக்கைகளுடன் மோதும் மொத்த மேற்பரப்பளவு பெருமளவு அதிகரிப்பதால்' } },
        { id: 'opt-2', text: { en: 'Powdered calcium carbonate has a different chemical formula than the lump', si: 'කිරිගරුඬ කුඩුවල රසායනික සූත්‍රය කැබැල්ලට වඩා වෙනස් බැවින්', ta: 'தூளின் இரசாயனச் சூத்திரம் கட்டியை விட வேறுபட்டது என்பதால்' } },
        { id: 'opt-3', text: { en: 'Powder heats up the acid to boiling point automatically', si: 'කුඩු මඟින් අම්ලයේ උෂ්ණත්වය නටන මට්ටමට ස්වයංක්‍රීයව ඉහළ නංවන බැවින්', ta: 'தூள் அமிலத்தை கொதிநிலைக்கு தானாக சூடாக்குவதால்' } },
        { id: 'opt-4', text: { en: 'The solid lump repels all acid ions magnetically', si: 'ඝන කැබැල්ල චුම්භකව අම්ල අංශු විකර්ෂණය කරන බැවින්', ta: 'கட்டியானது அமிலத்தை காந்தவியல் ரீதியாக விலக்குகிறது என்பதால்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Splitting a solid into millions of microscopic powder grains exposes immense surface area, multiplying the collision frequency between solid reactant atoms and acid ions.',
        si: 'ඝන ද්‍රව්‍යයක් කුඩා කුඩු අංශු බවට පත්කිරීමෙන් පෘෂ්ඨික වර්ගඵලය විශාල ලෙස වැඩිවන අතර අම්ල අංශු සමඟ ගැටුම් වාර ගණන ඉහළ යයි.',
        ta: 'திண்மத்தை தூளாக்கும் போது அதன் மேற்பரப்பளவு அதிகரித்து, அமிலத் துணிக்கைகளுடன் மோதும் அதிர்வெண் அதிகரிக்கிறது.',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 17: Factors Affecting Reaction Rate (Textbook Part 2, p. 119–122)',
    }
  },
  {
    id: 'rate-step-4',
    stepNumber: 4,
    title: {
      en: 'Catalysts & Biological Enzymes: The Chemical Shortcuts',
      si: 'උත්ප්‍රේරක සහ ජෛව එන්සයිම: රසායනික කෙටිමං',
      ta: 'ஊக்கிகளும் உயிரியல் நொதியங்களும்: இரசாயன குறுக்குவழிகள்',
    },
    concept: {
      en: 'A **Catalyst** is a substance that dramatically increases the rate of a chemical reaction without undergoing any permanent chemical change itself:\n\n- **Mechanism:** It provides an **alternative reaction pathway with a lower activation energy ($E_a\'$)**. Because the energy mountain is lower, a huge fraction of ordinary collisions now have enough energy to react successfully!\n- **Conservation:** At the end of the reaction, the catalyst is recovered completely intact with no change in mass or chemical composition.\n\n### Classic Laboratory Demonstration:\nAt room temperature, the decomposition of Hydrogen Peroxide ($2H_2O_2 \\rightarrow 2H_2O + O_2\\uparrow$) is extremely sluggish. But adding a pinch of black **Manganese Dioxide ($MnO_2$)** powder triggers explosive, foaming effervescence of pure oxygen gas! Inserting a glowing wooden splint causes it to burst into brilliant flame!\n\nBiological catalysts produced by living cells are called **Enzymes** (e.g., salivary amylase, pepsin in stomach, catalase).',
      si: '**උත්ප්‍රේරකයක් (Catalyst)** යනු රසායනික ප්‍රතික්‍රියාවකදී ස්ථිර රසායනික වෙනසකට භාජනය නොවී ප්‍රතික්‍රියා සීඝ්‍රතාව විශාල ලෙස වැඩි කරන ද්‍රව්‍යයකි:\n\n- **ක්‍රියාකාරීත්වය:** එය ප්‍රතික්‍රියාවට **අඩු සක්‍රියන ශක්තියක් ($E_a\'$) සහිත විකල්ප මාර්ගයක්** සපයයි. ශක්ති බාධකය අඩු බැවින් සාමාන්‍ය ගැටුම් විශාල ප්‍රමාණයකට පවා පහසුවෙන් ප්‍රතික්‍රියා කිරීමට හැකිවේ!\n- **සංරක්ෂණය:** ප්‍රතික්‍රියාව අවසානයේදී උත්ප්‍රේරකය රසායනිකව නොවෙනස්ව පෙර ස්කන්ධයෙන්ම නැවත ලබාගත හැක.\n\n### ප්‍රසිද්ධ විද්‍යාගාර පරීක්ෂණය:\nකාමර උෂ්ණත්වයේදී හයිඩ්‍රජන් පෙරොක්සයිඩ් ($2H_2O_2 \\rightarrow 2H_2O + O_2\\uparrow$) වියෝජනය ඉතා මන්දගාමී වේ. නමුත් ඊට කළු පැහැති **මැංගනීස් ඩයොක්සයිඩ් ($MnO_2$)** කුඩු ස්වල්පයක් දැමූ වහාම අධික ලෙස පෙණ දමමින් ඔක්සිජන් වායුව පිටවේ! දැල්වෙන හබල පෙත්තක් දැමූ විට එය දීප්තිමත්ව ඇවිලී යයි!\n\nජීවී සිරුරු තුළ ක්‍රියාකරන ජෛව උත්ප්‍රේරක **එන්සයිම (Enzymes)** නම් වේ.',
      ta: '**ஊக்கி (Catalyst)** என்பது ஒரு தாக்கத்தில் நிரந்தர இரசாயன மாற்றமடையாமல் தாக்க வீதத்தை அதிகரிக்கும் பதார்த்தமாகும்:\n\n- **செயற்பாடு:** இது **குறைந்த செயலாக்கு சக்தி ($E_a\'$) கொண்ட மாற்றுப் பாதையை** வழங்குகிறது. இதனால் அதிகளவான துணிக்கைகள் வெற்றிகரமாகத் தாக்கமடைய முடிகிறது!\n- தாக்க முடிவில் ஊக்கியின் திணிவிலோ இரசாயன அமைப்பிலோ எந்த மாற்றமும் ஏற்படுவதில்லை.\n\n### ஆய்வுகூடப் பரிசோதனை:\nஹைட்ரஜன் பெரொட்சைட்டு சிதைவடைதல் ($2H_2O_2 \\rightarrow 2H_2O + O_2\\uparrow$) மிக மெதுவானது. இதற்கு கருப்பு நிற **மங்கனீசு ஈரொட்சைட்டு ($MnO_2$)** தூளை சேர்த்தவுடன் தீவிரமாக ஒக்சிசன் குமிழ்கள் பொங்கி எழும்! சுடரும் தீக்குச்சியை வைத்தால் அது பிரகாசமாக எரியும்!\n\nஉயிரினங்களில் உள்ள இயற்கை ஊக்கிகள் **நொதியங்கள் (Enzymes)** எனப்படும்.',
    },
    visualCard: {
      title: 'Energy Profile Diagram (The Catalyst Effect)',
      diagramType: 'diagram',
      content: 'Reactants ──[Tall Mountain: Uncatalyzed Ea]──➔ Products  VS  Reactants ──[Low Tunnel: Catalyzed Ea\']──➔ Products ⚡',
      caption: 'Catalyst lowers the energy barrier without shifting the energy of reactants or products.'
    },
    realWorldExample: {
      en: 'Sri Lankan culinary tradition: Sri Lankan mothers and grandmothers have long used raw green papaya skin or crushed papaya leaves when marinating tough beef or mutton. Raw papaya contains **papain**, a powerful proteolytic enzyme (biological catalyst) that breaks down tough muscle proteins within minutes before cooking!',
      si: 'ශ්‍රී ලාංකීය සම්ප්‍රදායික රහසක්: ගෘහණියන් දැඩි හරක් මස් හෝ එළු මස් පිසීමට පෙර අමු ගස්ලබු පොතු හෝ කොළ යුෂ සමඟ කලවම් කර තබයි. අමු ගස්ලබු වල ඇති **පැපේන් (Papain)** නම් ස්වාභාවික එන්සයිමය (ජෛව උත්ප්‍රේරකය) මස්වල ඇති තද ප්‍රෝටීන තන්තු විනාඩි කිහිපයකින් මෘදු කර දෙයි!',
      ta: 'இலங்கை சமையல் முறை: கடினமான மாட்டிறைச்சியை சமைப்பதற்கு முன் பப்பாசி இலை அல்லது தோலில் ஊறவைப்பர். பப்பாளியில் உள்ள **பப்பேயின் (Papain)** நொதியம் (உயிரியல் ஊக்கி) புரதங்களை உடைத்து இறைச்சியை மென்மையாக்குகிறது!',
    },
    checkQuestion: {
      id: 'rate-q4',
      subjectId: 'science',
      topicId: 'science-gr10-ch17-rate-of-reactions',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'How does a catalyst like manganese dioxide (MnO₂) speed up a chemical reaction?',
        si: 'මැංගනීස් ඩයොක්සයිඩ් (MnO₂) වැනි උත්ප්‍රේරකයක් මඟින් රසායනික ප්‍රතික්‍රියාවක සීඝ්‍රතාව වැඩි කරන්නේ කෙසේද?',
        ta: 'மங்கனீசு ஈரொட்சைட்டு (MnO₂) போன்ற ஓர் ஊக்கி எவ்வாறு தாக்க வீதத்தை அதிகரிக்கிறது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'It provides an alternative reaction pathway with a lower activation energy', si: 'අඩු සක්‍රියන ශක්තියක් සහිත විකල්ප ප්‍රතික්‍රියා මාර්ගයක් සැපයීමෙන්', ta: 'குறைந்த செயலாக்கு சக்தி கொண்ட மாற்றுப் பாதையை வழங்குவதன் மூலம்' } },
        { id: 'opt-2', text: { en: 'It is consumed as an additional reactant fuel', si: 'එය අමතර ඉන්ධනයක් ලෙස දැවී පරිභෝජනය වීමෙන්', ta: 'கூடுதல் தாக்கியாக அது செலவிடப்படுவதன் மூலம்' } },
        { id: 'opt-3', text: { en: 'It raises the boiling point of water by 50°C', si: 'ජලයේ තාපාංකය 50°C කින් ඉහළ දැමීමෙන්', ta: 'நீரின் கொதிநிலையை உயர்த்துவதன் மூலம்' } },
        { id: 'opt-4', text: { en: 'It permanently alters the chemical formula of products', si: 'ඵලවල රසායනික සූත්‍රය ස්ථිරව වෙනස් කිරීමෙන්', ta: 'விளைவுகளின் இரசாயனச் சூத்திரத்தை மாற்றுவதன் மூலம்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'A catalyst lowers the activation energy hill ($E_a$), allowing a vastly greater proportion of molecular collisions to be effective collisions, while remaining completely chemically unchanged at the end.',
        si: 'උත්ප්‍රේරකය සක්‍රියන ශක්ති බාධකය අඩු කරන අතර අවසානයේදී එය නොවෙනස්ව පවතී.',
        ta: 'ஊக்கி செயலாக்கு சக்தியைக் குறைத்து பயனுள்ள மோதுகைகளை அதிகரிக்கிறது; தாக்க முடிவில் ஊக்கி மாற்றமடைவதில்லை.',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 17: Catalysts (Textbook Part 2, p. 122–124)',
    }
  }
];

export const TEACH_ME_CHEMICAL_BASIS_STEPS: LessonStep[] = [
  {
    id: 'chem-step-1',
    stepNumber: 1,
    title: {
      en: 'Biomolecules & Carbohydrates: Energy for Life',
      si: 'ජෛව අණු සහ කාබෝහයිඩ්‍රේට: ජීවයේ ශක්ති ප්‍රභවය',
      ta: 'உயிரியல் மூலக்கூறுகளும் காபோவைதரேற்றுகளும்: வாழ்வின் சக்தி',
    },
    concept: {
      en: 'All living cells are built from organic biomolecules. The most abundant energy source is **Carbohydrates**, containing Carbon ($C$), Hydrogen ($H$), and Oxygen ($O$) in a characteristic $H:O = 2:1$ ratio.\n\n### Three Main Carbohydrate Groups:\n1. **Monosaccharides (Single Sugars):** Glucose, Fructose (fruit sugar), Galactose. These are reducing sugars that give a brick-red precipitate with Benedict’s solution.\n2. **Disaccharides (Double Sugars):**\n   - $\\text{Glucose} + \\text{Glucose} = \\text{Maltose}$ (germinating barley / seeds)\n   - $\\text{Glucose} + \\text{Fructose} = \\text{Sucrose}$ (Sri Lankan sugarcane / jaggery)\n   - $\\text{Glucose} + \\text{Galactose} = \\text{Lactose}$ (cow and buffalo milk)\n3. **Polysaccharides (Complex Sugars):** Starch (stored in yams, jakfruit, and rice), Glycogen (stored in animal liver), and Cellulose (plant cell walls).',
      si: 'සියලුම ජීවී සෛල කාබනික ජෛව අණු වලින් සමන්විත වේ. ප්‍රධාන ශක්ති ප්‍රභවය වන්නේ $H:O = 2:1$ අනුපාතයට කාබන්, හයිඩ්‍රජන් සහ ඔක්සිජන් අඩංගු **කාබෝහයිඩ්‍රේටයි**.\n\n### කාබෝහයිඩ්‍රේට කාණ්ඩ 3:\n1. **මොනොසැකරයිඩ (සරල සීනි):** ග්ලූකෝස්, ෆෲක්ටෝස් (පළතුරු සීනි), ගැලැක්ටෝස්. බෙනඩික්ට් ද්‍රාවණය සමඟ රත් කළ විට ගඩොල් රතු අවක්ෂේපයක් ලබාදෙයි.\n2. **ඩයිසැකරයිඩ (ද්විත්ව සීනි):**\n   - ග්ලූකෝස් + ග්ලූකෝස් = මෝල්ටෝස් (පැළවෙන ධාන්‍ය)\n   - ග්ලූකෝස් + ෆෲක්ටෝස් = සුක්‍රෝස් (උක් සීනි / හකුරු)\n   - ග්ලූකෝස් + ගැලැක්ටෝස් = ලැක්ටෝස් (කිරි සීනි)\n3. **පොලිසැකරයිඩ (සංකීර්ණ කාබෝහයිඩ්‍රේට):** පිෂ්ටය (බතල, කොස්, බත්), ග්ලයිකොජන් (සත්ත්ව අක්මාව) සහ සෙලියුලෝස් (ශාක සෛල බිත්ති).',
      ta: 'அனைத்து உயிர்க்கலங்களும் உயிரியல் மூலக்கூறுகளால் ஆனவை. முக்கிய சக்தி மூலம் $H:O = 2:1$ விகிதத்தில் உள்ள **காபோவைதரேற்றுகள்** ஆகும்.\n\n### மூன்று முக்கிய பிரிவுகள்:\n1. **ஒற்றைச் சர்க்கரை:** குளுக்கோஸ், பிரக்டோஸ், கலக்டோஸ்.\n2. **இரட்டைச் சர்க்கரை:**\n   - குளுக்கோஸ் + குளுக்கோஸ் = மோல்ட்டோஸ்\n   - குளுக்கோஸ் + பிரக்டோஸ் = சுக்குரோஸ்\n   - குளுக்கோஸ் + கலக்டோஸ் = லக்ரோஸ்\n3. **பல்சர்க்கரை:** மாப்பொருள், கிளைக்கோஜன், செல்லுலோஸ்.',
    },
    visualCard: {
      title: 'Carbohydrate Classification & Food Tests',
      diagramType: 'diagram',
      content: 'Reducing Sugar + Benedict Heat ➔ Brick-Red Precipitate 🧱 | Starch + Iodine ➔ Blue-Black Color 🔵',
      caption: 'Glucose is the immediate fuel utilized in cellular respiration to synthesize ATP.'
    },
    realWorldExample: {
      en: 'Sri Lankan athletes eating a ripe Cavendish banana (Ambul / Kolikuttu) before running: The immediate simple sugars (glucose and fructose) enter the bloodstream within minutes, while starch provides sustained stamina!',
      si: 'ශ්‍රී ලංකාවේ ක්‍රීඩකයින් ධාවන තරගයකට පෙර ඇඹුල් හෝ කෝලිකුට්ටු කෙසෙල් ගෙඩියක් ආහාරයට ගන්නේ, එහි ඇති සරල සීනි ක්ෂණිකව රුධිරයට අවශෝෂණය වී ශක්තිය ලබාදෙන බැවිනි!',
      ta: 'இலங்கை விளையாட்டு வீரர்கள் ஓட்டப் போட்டிக்கு முன் வாழைப்பழம் உண்பது: எளிய சர்க்கரைகள் உடனடியாக இரத்தத்தில் கலந்து உடனடி சக்தியை வழங்குகின்றன!',
    },
    checkQuestion: {
      id: 'chem-q1',
      subjectId: 'science',
      topicId: 'science-gr10-ch1-chemical-basis',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which two monosaccharides combine to form a molecule of sucrose (table sugar)?',
        si: 'සුක්‍රෝස් (ගෘහස්ථ සීනි) අණුවක් සෑදීමට එකිනෙක සංයෝජනය වන මොනොසැකරයිඩ දෙක කුමක්ද?',
        ta: 'சுக்குரோஸ் மூலக்கூறை உருவாக்க இணையும் இரு ஒற்றைச் சர்க்கரைகள் யாவை?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Glucose and Fructose', si: 'ග්ලූකෝස් සහ ෆෲක්ටෝස්', ta: 'குளுக்கோஸ் மற்றும் பிரக்டோஸ்' } },
        { id: 'opt-2', text: { en: 'Glucose and Galactose', si: 'ග්ලූකෝස් සහ ගැලැක්ටෝස්', ta: 'குளுக்கோஸ் மற்றும் கலக்டோஸ்' } },
        { id: 'opt-3', text: { en: 'Two molecules of Galactose', si: 'ගැලැක්ටෝස් අණු දෙකක්', ta: 'இரு கலக்டோஸ் மூலக்கூறுகள்' } },
        { id: 'opt-4', text: { en: 'Fructose and Maltose', si: 'ෆෲක්ටෝස් සහ මෝල්ටෝස්', ta: 'பிரக்டோஸ் மற்றும் மோல்ட்டோஸ்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Correct! Glucose + Fructose forms Sucrose with the elimination of a water molecule (condensation reaction).',
        si: 'නිවැරදියි! ග්ලූකෝස් අණුවක් සහ ෆෲක්ටෝස් අණුවක් එක්වී ජල අණුවක් පිටකරමින් සුක්‍රෝස් සෑදේ.',
        ta: 'சரியானது! குளுக்கோஸும் பிரக்டோஸும் இணைந்து சுக்குரோஸை உருவாக்குகின்றன.',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 1: Chemical Basis of Life (Textbook Part 1, p. 1–8)',
    }
  },
  {
    id: 'chem-step-2',
    stepNumber: 2,
    title: {
      en: 'Proteins, Lipids & Nucleic Acids: Cellular Architecture',
      si: 'ප්‍රෝටීන, ලිපිඩ සහ න්‍යෂ්ටික අම්ල: සෛලීය ව්‍යුහය',
      ta: 'புரதங்கள், லிப்பிட்டுகள் மற்றும் கரு அமிலங்கள்: கலக் கட்டமைப்பு',
    },
    concept: {
      en: 'Beyond carbohydrates, three other vital biomolecule classes sustain living organisms:\n\n1. **Proteins (Building Blocks):** Polymer of **amino acids** joined by peptide bonds ($C, H, O, N$, and often $S$). Form structural components (muscle, hair keratin), transport molecules (hemoglobin), antibodies, and metabolic enzymes. **Biuret Test** turns purple/violet.\n2. **Lipids (Energy & Insulation):** Triglycerides made of **1 Glycerol + 3 Fatty Acids** joined by ester bonds. Provide concentrated energy reserves ($38\\text{ kJ/g}$) and thermal insulation beneath the skin.\n3. **Nucleic Acids (Genetic Blueprint):** **DNA** and **RNA**, composed of nucleotide chains (pentose sugar + phosphate group + nitrogenous base). DNA holds hereditary instructions in genes inside chromosomes.',
      si: 'කාබෝහයිඩ්‍රේට හැරුණු විට අනෙකුත් ප්‍රධාන ජෛව අණු 3ක් ජීවී පැවැත්ම තහවුරු කරයි:\n\n1. **ප්‍රෝටීන (ව්‍යුහාත්මක තැනුම් ඒකක):** පෙප්ටයිඩ බන්ධන මඟින් බැඳුණු **ඇමයිනෝ අම්ල** බහුඅවයවිකයකි ($C, H, O, N, S$). පේශි, හිසකෙස් කෙරටින්, හිමොග්ලොබින්, ප්‍රතිදේහ සහ එන්සයිම සාදයි. **බයියුරෙට් පරීක්ෂාවේදී** දම් පැහැයක් ලබාදෙයි.\n2. **ලිපිඩ (ශක්ති සංචිත හා තාප පරිවරණය):** එස්ටර බන්ධන මඟින් බැඳුණු **ග්ලිසරෝල් අණුවක් සහ මේද අම්ල අණු 3ක්** සහිත ට්‍රයිග්ලිසරයිඩයි. අධික ශක්තියක් ($38\\text{ kJ/g}$) සහ සම යට තාප පරිවරණයක් සපයයි.\n3. **න්‍යෂ්ටික අම්ල (පාරම්පරික තොරතුරු):** නියුක්ලියෝටයිඩ වලින් සැදි **DNA** සහ **RNA**. DNA මඟින් සෛල න්‍යෂ්ටිය තුළ පාරම්පරික ජාන තොරතුරු ගබඩා කරයි.',
      ta: 'காபோவைதரேற்றுகள் தவிர மற்ற மூன்று முக்கிய உயிரியல் மூலக்கூறுகள்:\n\n1. **புரதங்கள்:** பெப்டைடு பிணைப்புகளால் இணைக்கப்பட்ட **அமினோ அமிலங்கள்**. தசை, முடி, நொதியங்கள் மற்றும் ஹீமோகுளோபின் ஆகியவற்றை உருவாக்குகின்றன. **பையூரெட் பரிசோதனை** ஊதா நிறத்தைத் தரும்.\n2. **லிப்பிட்டுகள்:** கொழுப்பு அமிலங்களும் கிளிசரோலும் சேர்ந்தவை. அதிக சக்தியையும் ($38\\text{ kJ/g}$) வெப்பக் காப்பையும் வழங்குகின்றன.\n3. **கரு அமிலங்கள்:** நியூக்ளியோடைடுகளால் ஆன **DNA** மற்றும் **RNA**. பரம்பரைத் தகவல்களைச் சேமிக்கின்றன.',
    },
    visualCard: {
      title: 'Biomolecule Detection Tests',
      diagramType: 'diagram',
      content: 'Protein + Biuret Reagent ➔ Violet/Purple 🟣 | Lipid + Sudan III ➔ Red Stained Droplets 🔴',
      caption: 'Water acts as the universal biological solvent facilitating all cellular biochemical reactions.'
    },
    realWorldExample: {
      en: 'Sri Lankan traditional breakfast of boiled green gram (Mun Ata) or chick peas (Kadala) with scraped coconut: Green gram supplies rich vegetable proteins to build tissues, while scraped coconut provides healthy plant lipids for sustained energy!',
      si: 'මුං ඇට හෝ කඩල සමඟ පොල් කෑලි ආහාරයට ගන්නා සාම්ප්‍රදායික ශ්‍රී ලාංකීය උදෑසන ආහාරය: මුං ඇට මඟින් පටක වර්ධනයට අවශ්‍ය ප්‍රෝටීන ද, පොල් මඟින් ශරීරයට අවශ්‍ය සෞඛ්‍ය සම්පන්න ලිපිඩ ද සපයයි!',
      ta: 'முங் அட்டா அல்லது கொண்டைக்கடலை தேங்காய்ப்பூவுடன் உண்பது: பயறு வகைகளில் உள்ள புரதம் தசையை வளர்க்கவும், தேங்காய் கொழுப்பு சக்தியை வழங்கவும் உதவுகிறது!',
    },
    checkQuestion: {
      id: 'chem-q2',
      subjectId: 'science',
      topicId: 'science-gr10-ch1-chemical-basis',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which chemical reagent turns from blue to purple/violet in the presence of proteins in food testing?',
        si: 'ආහාර පරීක්ෂාවකදී ප්‍රෝටීන හමුවේ නිල් පැහැයේ සිට දම් පැහැයට හැරෙන රසායනික ප්‍රතිකාරකය කුමක්ද?',
        ta: 'உணவுப் பரிசோதனையில் புரதம் உள்ளபோது நீல நிறத்திலிருந்து ஊதா நிறமாக மாறும் இரசாயனக் காரணி எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Biuret reagent (Dilute NaOH + CuSO₄)', si: 'බයියුරෙට් ප්‍රතිකාරකය (තනුක NaOH + CuSO₄)', ta: 'பையூரெட் காரணி (நீர்த்த NaOH + CuSO₄)' } },
        { id: 'opt-2', text: { en: 'Iodine solution', si: 'අයඩින් ද්‍රාවණය', ta: 'அயடீன் கரைசல்' } },
        { id: 'opt-3', text: { en: 'Benedict’s solution', si: 'බෙනඩික්ට් ද්‍රාවණය', ta: 'பெனடிக்ட் கரைசல்' } },
        { id: 'opt-4', text: { en: 'Cobalt chloride paper', si: 'කොබෝල්ට් ක්ලෝරයිඩ් කඩදාසි', ta: 'கோபால்ட் குளோரைடு தாள்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Correct! Copper ions (Cu²⁺) in Biuret reagent coordinate with peptide bonds in proteins, generating a characteristic purple/violet complex.',
        si: 'නිවැරදියි! බයියුරෙට් ප්‍රතිකාරකයේ ඇති Cu²⁺ අයන පෙප්ටයිඩ බන්ධන සමඟ සංකීර්ණ සෑදීම නිසා දම් පැහැය ලැබේ.',
        ta: 'சரியானது! பையூரெட் காரணியிலுள்ள செப்பு அயன்கள் பெப்டைடு பிணைப்புகளுடன் இணைந்து ஊதா நிறத்தைத் தருகின்றன.',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 1: Food Tests (Textbook Part 1, p. 8–15)',
    }
  }
];

export const TEACH_ME_NEWTONS_LAWS_STEPS: LessonStep[] = [
  {
    id: 'newton-step-1',
    stepNumber: 1,
    title: {
      en: 'Newton\'s First Law: The Power of Inertia',
      si: 'නිව්ටන්ගේ පළමු නියමය: අවස්ථිතියේ බලය',
      ta: 'நியூட்டனின் முதலாம் விதி: சடத்துவத்தின் வலிமை',
    },
    concept: {
      en: 'Sir Isaac Newton uncovered the fundamental rules of motion. His **First Law of Motion (Law of Inertia)** states:\n\n> "Every object remains in its state of rest or uniform motion in a straight line unless acted upon by an external unbalanced force."\n\n- **Inertia:** The inherent resistance of any object to changing its state of motion or rest.\n- **Mass is the Measure of Inertia:** Heavier objects possess greater inertia. Pushing a loaded Colombo red CTB bus requires tremendous force compared to pushing an empty bicycle because the bus has vastly greater mass and inertia!',
      si: 'අයිසැක් නිව්ටන් තුමා විසින් ඉදිරිපත් කළ **පළමු චලිත නියමය (අවස්ථිති නියමය)** මෙසේ ප්‍රකාශ වේ:\n\n> "අසමතුලිත බාහිර බලයක් නොයෙදෙන තාක් කල්, නිශ්චලව පවතින වස්තුවක් දිගටම නිශ්චලතාවයේද, ඒකාකාර ප්‍රවේගයෙන් සරල රේඛාවක චලනය වන වස්තුවක් දිගටම එම ප්‍රවේගයෙන්මද පවතී."\n\n- **අවස්ථිතිය:** වස්තුවක පවතින චලිත හෝ නිශ්චල තත්ත්වය වෙනස් කිරීමට දක්වන සහජ ප්‍රතිරෝධයයි.\n- **ස්කන්ධය යනු අවස්ථිතියේ මිණුමයි:** බර වැඩි වස්තුවල අවස්ථිතිය වැඩිය. මගීන් පිරවූ CTB ලංගම බස් රථයකට පාපැදියකට වඩා වැඩි අවස්ථිතියක් ඇත්තේ එහි ස්කන්ධය වැඩි බැවිනි!',
      ta: '**நியூட்டனின் முதலாம் இயக்க விதி (சடத்துவ விதி)**:\n\n> "புறவிசை ஒன்று தொழிற்படாத வரை எந்தவொரு பொருளும் தனது ஓய்வு நிலையிலோ அல்லது மாறா வேக நிலையிலோ தொடர்ந்து இருக்கும்."\n\n- **சடத்துவம்:** இயக்க நிலையை மாற்ற எதிர்க்கும் இயல்பு.\n- **திணிவே சடத்துவத்தின் அளவீடு:** அதிக திணிவுள்ள பொருட்களுக்கு அதிக சடத்துவம் உண்டு.',
    },
    visualCard: {
      title: 'Newton\'s First Law & Inertia',
      diagramType: 'diagram',
      content: 'Zero Unbalanced Force ➔ Velocity Remains Constant | Sudden Braking ➔ Passengers Lurch Forward!',
      caption: 'Seatbelts supply the unbalanced external force needed to safely decelerate passengers.'
    },
    realWorldExample: {
      en: 'Travelling on an express train to Kandy: When the train applies sudden emergency brakes, your body immediately lurches forward! Your feet stop with the train floor, but your upper body continues moving forward at the train\'s previous 60 km/h due to inertia.',
      si: 'මහනුවර බලා ධාවනය වන සීඝ්‍රගාමී දුම්රියක ගමන් කරන විට: දුම්රිය හදිසියේ තිරිංග තද කළ විට ඔබේ සිරුර ඉදිරියට විසිවේ! ඔබේ පාද දුම්රිය සමඟ නතර වුවද, ඔබේ සිරුර අවස්ථිතිය නිසා පැවති වේගයෙන්ම ඉදිරියට යයි.',
      ta: 'கண்டி செல்லும் புகையிரதத்தில் பயணிக்கும் போது: திடீரென பிரேக் போடும்போது உடல் முன்னோக்கி சாய்கிறது; கால்கள் நின்றாலும் உடல் சடத்துவத்தினால் தொடர்ந்து முன்னோக்கி நகர்கிறது.',
    },
    checkQuestion: {
      id: 'newton-q1',
      subjectId: 'science',
      topicId: 'science-gr10-ch4-newtons-laws',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'What physical quantity directly determines the amount of inertia possessed by an object?',
        si: 'වස්තුවක් සතු අවස්ථිතියේ ප්‍රමාණය සෘජුවම තීරණය කරන භෞතික රාශිය කුමක්ද?',
        ta: 'பொருளொன்றின் சடத்துவத்தின் அளவை நேரடியாகத் தீர்மானிக்கும் பௌதீகக் கணியம் எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Mass (kg)', si: 'ස්කන්ධය (kg)', ta: 'திணிவு (kg)' } },
        { id: 'opt-2', text: { en: 'Speed of light', si: 'ආලෝකයේ වේගය', ta: 'ஒளியின் வேகம்' } },
        { id: 'opt-3', text: { en: 'Color of the surface', si: 'පෘෂ්ඨයේ වර්ණය', ta: 'மேற்பரப்பின் நிறம்' } },
        { id: 'opt-4', text: { en: 'Electric potential', si: 'විද්‍යුත් විභවය', ta: 'மின்னழுத்தம்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Correct! Mass is the fundamental measure of inertia. Greater mass equals greater resistance to acceleration.',
        si: 'නිවැරදියි! ස්කන්ධය යනු අවස්ථිතියේ මිණුමයි. ස්කන්ධය වැඩිවත්ම ත්වරණය වීමට දක්වන ප්‍රතිරෝධය වැඩිවේ.',
        ta: 'சரியானது! திணிவே சடத்துவத்தின் அடிப்படை அளவீடாகும்.',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 4: Newton\'s Laws (Textbook Part 1, p. 84–89)',
    }
  },
  {
    id: 'newton-step-2',
    stepNumber: 2,
    title: {
      en: 'Newton\'s Second & Third Laws: F = ma and Action-Reaction',
      si: 'නිව්ටන්ගේ දෙවන හා තෙවන නියම: F = ma සහ ක්‍රියාව-ප්‍රතික්‍රියාව',
      ta: 'நியூட்டனின் இரண்டாம் & மூன்றாம் விதிகள்: F = ma மற்றும் மறுதாக்கம்',
    },
    concept: {
      en: '### Newton\'s Second Law of Motion ($F = ma$):\n> "The rate of change of momentum is directly proportional to the applied unbalanced force, and takes place in the direction of the force."\n\n$$F = ma$$\nWhere $F$ is Force in Newtons ($\\text{N}$), $m$ is Mass in $\\text{kg}$, and $a$ is Acceleration in $\\text{m/s}^2$.\n\n### Newton\'s Third Law of Motion:\n> "To every action, there is always an equal and opposite reaction."\n\n- Key Rule: Action and reaction forces act on **two different bodies**, so they **never cancel each other out**!\n- When swimming in the sea, your arms push water backward (Action) $\\rightarrow$ the water pushes you forward (Reaction)!\n- A space rocket expels high-velocity exhaust gases downward (Action) $\\rightarrow$ the exhaust gases propel the rocket upward into space (Reaction)!',
      si: '### නිව්ටන්ගේ දෙවන චලිත නියමය ($F = ma$):\n> "වස්තුවක ගම්‍යතාව වෙනස්වීමේ සීඝ්‍රතාව, ඒ මත ක්‍රියාකරන අසමතුලිත බලයට අනුලෝමව සමානුපාතික වන අතර බලය යෙදෙන දිශාවට සිදුවේ."\n\n$$F = ma$$\n($F$ = බලය නිව්ටන් වලින්, $m$ = ස්කන්ධය $\\text{kg}$, $a$ = ත්වරණය $\\text{m/s}^2$)\n\n### නිව්ටන්ගේ තෙවන චලිත නියමය:\n> "සෑම ක්‍රියාවකටම විශාලත්වයෙන් සමාන දිශාවෙන් ප්‍රතිවිරුද්ධ වූ ප්‍රතික්‍රියාවක් ඇත."\n\n- වැදගත්ම කරුණ: ක්‍රියා බලය සහ ප්‍රතික්‍රියා බලය **වස්තු දෙකක් මත** ක්‍රියාකරන බැවින් එකිනෙක කැපී නොයයි!\n- මුහුදේ පිහිනන විට අත්වලින් ජලය පසුපසට තල්ලු කරයි (ක්‍රියාව) $\\rightarrow$ ජලය මඟින් පිහිනුම්කරු ඉදිරියට තල්ලු කරයි (ප්‍රතික්‍රියාව)!\n- රොකට්ටුවකින් අධිවේගී වායු පහළට පිටකරයි (ක්‍රියාව) $\\rightarrow$ රොකට්ටුව ඉහළට තල්ලු වේ (ප්‍රතික්‍රියාව)!',
      ta: '### நியூட்டனின் இரண்டாம் விதி ($F = ma$):\n$$F = ma$$\n($F$ = விசை $\\text{N}$, $m$ = திணிவு $\\text{kg}$, $a$ = ஆர்முடுகல் $\\text{m/s}^2$)\n\n### நியூட்டனின் மூன்றாம் விதி:\n> "ஒவ்வொரு தாக்கத்திற்கும் சமனானதும் எதிரானதுமான மறுதாக்கம் உண்டு."\n- தாக்கமும் மறுதாக்கமும் **வெவ்வேறு பொருட்களில்** செயல்படுவதால் சமனாவதில்லை!\n- நீந்தும்போது நீரைப் பின்னோக்கித் தள்ளுதல் (தாக்கம்) $\\rightarrow$ நீர் நம்மை முன்னோக்கித் தள்ளுதல் (மறுதாக்கம்).',
    },
    visualCard: {
      title: 'Action and Reaction Pair',
      diagramType: 'diagram',
      content: 'Action: Gas Expelled Downward ⬇️  <===>  Reaction: Rocket Lift-off Upward ⬆️',
      caption: 'Forces always occur in matched action-reaction pairs acting on different bodies.'
    },
    realWorldExample: {
      en: 'Sri Lankan cricket match: When a fast bowler delivers a ball at 140 km/h and the batsman hits a six over long-on, the bat applies an immense force to the ball (accelerating it in reverse), and the ball applies an equal and opposite force to the bat (which the batsman feels in his hands)!',
      si: 'ක්‍රිකට් තරගයකදී: වේග පන්දු යවන්නෙකු යැවූ පන්දුවකට පිතිකරුවා හයේ පහරක් එල්ල කරන විට, පිත්තෙන් පන්දුව මත බලයක් යොදයි (ක්‍රියාව), එමෙන්ම පන්දුවෙන් පිත්ත මත සමාන ප්‍රතිවිරුද්ධ බලයක් යොදයි (පිතිකරුවාගේ අතට එම තෙරපුම දැනේ)!',
      ta: 'கிரிக்கெட் ஆட்டத்தில்: மட்டையாளர் பந்தை அடிக்கும் போது, மட்டை பந்தின் மீது விசையைச் செலுத்துகிறது; அதே சமயம் பந்தும் மட்டையின் மீது சமமான மறுதாக்க விசையைச் செலுத்துகிறது!',
    },
    checkQuestion: {
      id: 'newton-q2',
      subjectId: 'science',
      topicId: 'science-gr10-ch4-newtons-laws',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'A force of 20 N is applied to a trolley of mass 4 kg on a frictionless surface. What is the acceleration produced?',
        si: 'ඝර්ෂණයක් රහිත තිරස් තලයක් මත ඇති 4 kg ස්කන්ධයක් සහිත කරත්තයක් මත 20 N බලයක් යෙදූ විට ඇතිවන ත්වරණය කොපමණද?',
        ta: 'உராய்வற்ற கிடைமட்டத்தில் உள்ள 4 kg திணிவுடைய வண்டியின் மீது 20 N விசை செலுத்தப்படும் போது உருவாகும் ஆர்முடுகல் யாது?',
      },
      options: [
        { id: 'opt-1', text: { en: '5 m/s² (using a = F/m = 20 / 4)', si: '5 m/s² (a = F/m = 20 / 4 සූත්‍රයෙන්)', ta: '5 m/s² (a = F/m = 20 / 4)' } },
        { id: 'opt-2', text: { en: '80 m/s²', si: '80 m/s²', ta: '80 m/s²' } },
        { id: 'opt-3', text: { en: '0.2 m/s²', si: '0.2 m/s²', ta: '0.2 m/s²' } },
        { id: 'opt-4', text: { en: '16 m/s²', si: '16 m/s²', ta: '16 m/s²' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'From Newton\'s Second Law, F = ma => a = F / m = 20 N / 4 kg = 5 m/s².',
        si: 'නිව්ටන්ගේ දෙවන නියමයෙන් F = ma => a = F / m = 20 N / 4 kg = 5 m/s² වේ.',
        ta: 'நியூட்டனின் இரண்டாம் விதியிலிருந்து a = F / m = 20 / 4 = 5 m/s².',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 4: Newton\'s Second Law (Textbook Part 1, p. 90–97)',
    }
  }
];

export const TEACH_ME_MOTION_STEPS: LessonStep[] = [
  {
    id: 'mot-step-1',
    stepNumber: 1,
    title: {
      en: 'Distance, Displacement, Speed & Velocity',
      si: 'දුර, විස්ථාපනය, වේගය සහ ප්‍රවේගය',
      ta: 'தூரம், இடப்பெயர்ச்சி, வேகம் மற்றும் திசைவேகம்',
    },
    concept: {
      en: 'Motion is described through scalar and vector quantities. **Distance** is the total ground covered regardless of direction (scalar). **Displacement** is the straight-line shortest distance between initial and final points in a specified direction (vector). Similarly, **Speed** is the rate of change of distance ($\\text{Speed} = d/t$), whereas **Velocity** is the rate of change of displacement in a specified direction ($\\vec{v} = \\vec{s}/t$). Both are measured in meters per second ($\\text{m/s}$).',
      si: 'චලිතය අදිශ හා දෛශික රාශීන්ගෙන් විස්තර කෙරේ. **දුර** යනු වස්තුවක් ගමන් කළ මුළු මාර්ගයේ දිගයි (අදිශ). **විස්ථාපනය** යනු නිශ්චිත දිශාවකට ආරම්භක හා අවසාන ලක්ෂ්‍ය අතර කෙටිම සරල රේඛීය දුරයි (දෛශික). එසේම **වේගය** යනු දුර වෙනස්වීමේ සීඝ්‍රතාවයි (වේගය = දුර / කාලය), **ප්‍රවේගය** යනු නිශ්චිත දිශාවකට විස්ථාපනය වෙනස්වීමේ සීඝ්‍රතාවයි (ප්‍රවේගය = විස්ථාපනය / කාලය). දෙකෙහිම ඒකකය $\\text{m/s}$ වේ.',
      ta: 'இயக்கம் அளவி மற்றும் காவி கணியங்களால் விவரிக்கப்படுகிறது. **தூரம்** என்பது திசையைக் கருதாது பயணம் செய்த மொத்தப் பாதை (அளவி). **இடப்பெயர்ச்சி** என்பது ஆரம்ப மற்றும் இறுதிப் புள்ளிகளுக்கு இடையிலான குறைந்தபட்ச நேர்கோட்டுத் தூரம் (காவி). **வேகம்** என்பது தூர மாற்ற வீதம் (வேகம் = தூரம் / நேரம்). **திசைவேகம்** என்பது இடப்பெயர்ச்சி மாற்ற வீதம் (திசைவேகம் = இடப்பெயர்ச்சி / நேரம்). இரண்டின் அலகும் $\\text{m/s}$ ஆகும்.',
    },
    visualCard: {
      title: 'Scalar vs. Vector Kinematics',
      diagramType: 'infographic',
      content: 'Distance (Scalar: 120 km)  vs.  Displacement (Vector: 95 km South-East)',
      caption: 'Displacement includes magnitude AND direction.'
    },
    realWorldExample: {
      en: 'Traveling from Colombo to Galle along the winding old coastal Galle Road takes 116 km (distance), but along the direct Southern Expressway or as the crow flies, the displacement is only around 95 km South-East!',
      si: 'පැරණි ගාලු පාරේ කොළඹ සිට ගාල්ලට යන විට දුර 116 km ක් වන නමුත්, සෘජු දක්ෂිණ අධිවේගී මාර්ගයේ හෝ ගුවන් මඟින් විස්ථාපනය දකුණු-නැගෙනහිර දෙසට 95 km පමණක් වේ!',
      ta: 'பழைய காலி வீதியில் கொழும்பிலிருந்து காலிக்கு பயணம் செய்யும் போது தூரம் 116 km, ஆனால் நேரான தெற்கு அதிவேக நெடுஞ்சாலையில் தென்கிழக்கு நோக்கிய இடப்பெயர்ச்சி 95 km மட்டுமே!',
    },
    checkQuestion: {
      id: 'mot-q1',
      subjectId: 'science',
      topicId: 'science-gr10-ch2-motion',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'A student walks 400 m around a circular school running track and returns to the exact starting point in 100 seconds. What is their displacement?',
        si: 'ශිෂ්‍යයෙක් පාසල් ධාවන පථය වටා 400 m ගමන් කර තත්පර 100 කින් නැවත ආරම්භක ලක්ෂ්‍යයටම පැමිණෙයි. ශිෂ්‍යයාගේ විස්ථාපනය කොපමණද?',
        ta: 'ஒரு மாணவர் 400 m வட்ட ஓடுதளத்தை சுற்றி 100 வினாடிகளில் புறப்பட்ட இடத்திற்கே மீள வருகின்றார். அவரின் இடப்பெயர்ச்சி யாது?',
      },
      options: [
        { id: 'opt-1', text: { en: '0 m (since initial and final positions are identical)', si: '0 m (ආරම්භක සහ අවසාන ලක්ෂ්‍ය සමාන බැවින්)', ta: '0 m (ஆரம்ப மற்றும் இறுதிப் புள்ளிகள் ஒரே இடமாதலால்)' } },
        { id: 'opt-2', text: { en: '400 m', si: '400 m', ta: '400 m' } },
        { id: 'opt-3', text: { en: '4 m/s', si: '4 m/s', ta: '4 m/s' } },
        { id: 'opt-4', text: { en: '40,000 m', si: '40,000 m', ta: '40,000 m' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Because displacement is measured from initial position to final position, returning to the starting point results in zero displacement, even though 400 m of distance was covered!',
        si: 'විස්ථාපනය මනින්නේ ආරම්භක ලක්ෂ්‍යයේ සිට අවසාන ලක්ෂ්‍යයට බැවින්, නැවත ආරම්භක ස්ථානයටම පැමිණි විට ගමන් කළ දුර 400 m වුවද විස්ථාපනය ශුන්‍ය වේ!',
        ta: 'இடப்பெயர்ச்சி ஆரம்ப நிலையிலிருந்து இறுதி நிலைக்கு அளக்கப்படுவதால், புறப்பட்ட இடத்திற்கே மீளும் போது தூரம் 400 m ஆக இருந்தாலும் இடப்பெயர்ச்சி பூச்சியமாகும்!',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 2: Motion in a Straight Line (Textbook Part 1, p. 23–35)',
    }
  },
  {
    id: 'mot-step-2',
    stepNumber: 2,
    title: {
      en: 'Acceleration & Equations of Motion',
      si: 'ත්වරණය සහ චලිත සමීකරණ',
      ta: 'ஆர்முடுகல் மற்றும் இயக்கச் சமன்பாடுகள்',
    },
    concept: {
      en: 'Acceleration ($a$) is the rate of change of velocity: $$a = \\frac{v - u}{t}$$ where $u$ is initial velocity, $v$ is final velocity, and $t$ is time. When acceleration is uniform, three fundamental kinematic equations describe motion: \n1. $v = u + at$\n2. $s = ut + \\frac{1}{2}at^2$\n3. $v^2 = u^2 + 2as$\nWhen a vehicle slows down, its acceleration is negative, termed **deceleration** or **retardation**.',
      si: 'ත්වරණය ($a$) යනු ප්‍රවේගය වෙනස්වීමේ සීඝ්‍රතාවයි: $$a = \\frac{v - u}{t}$$ මෙහි $u$ යනු ආරම්භක ප්‍රවේගය, $v$ යනු අවසාන ප්‍රවේගය, $t$ යනු කාලයයි. ඒකාකාර ත්වරණයකදී ප්‍රධාන චලිත සමීකරණ 3ක් භාවිත වේ: \n1. $v = u + at$\n2. $s = ut + \\frac{1}{2}at^2$\n3. $v^2 = u^2 + 2as$\nවාහනයක වේගය අඩුවන විට ත්වරණය සෘණ අගයක් ගන්නා අතර එය **මන්දනය** ලෙස හැඳින්වේ.',
      ta: 'ஆர்முடுகல் ($a$) என்பது திசைவேக மாற்ற வீதமாகும்: $$a = \\frac{v - u}{t}$$ இங்கு $u$ ஆரம்ப திசைவேகம், $v$ இறுதி திசைவேகம், $t$ நேரம். மாறா ஆர்முடுகலில் 3 சமன்பாடுகள்: \n1. $v = u + at$\n2. $s = ut + \\frac{1}{2}at^2$\n3. $v^2 = u^2 + 2as$\nதிசைவேகம் குறையும் போது அது **அமர்முடுகல்** எனப்படும்.',
    },
    visualCard: {
      title: '3 Kinematic Equations of Uniform Acceleration',
      diagramType: 'formula',
      content: 'v = u + at   |   s = ut + ½at²   |   v² = u² + 2as',
      caption: 'Applies strictly when acceleration is uniform in a straight line.'
    },
    realWorldExample: {
      en: 'When the Yal Devi express train departs Colombo Fort station from rest ($u = 0$), accelerating uniformly at $0.5\\text{ m/s}^2$ for 40 seconds, its velocity reaches $v = 0 + (0.5 \\times 40) = 20\\text{ m/s}$ ($72\\text{ km/h}$) as it passes Maradana!',
      si: 'යාල් දේවි සීඝ්‍රගාමී දුම්රිය කොළඹ කොටුව දුම්රිය ස්ථානයෙන් නිශ්චලතාවයෙන් ($u = 0$) පිටත්ව $0.5\\text{ m/s}^2$ ඒකාකාර ත්වරණයෙන් තත්පර 40ක් ධාවනය වන විට මරදාන පසුකරන විට එහි ප්‍රවේගය $v = 0 + (0.5 \\times 40) = 20\\text{ m/s}$ ($72\\text{ km/h}$) වේ!',
      ta: 'யாழ் தேவி புகையிரதம் கொழும்பு கோட்டை நிலையத்திலிருந்து ஓய்விலிருந்து புறப்பட்டு $0.5\\text{ m/s}^2$ சீரான ஆர்முடுகலுடன் 40 வினாடிகள் செல்லும் போது மருதானையைக் கடக்கும் போது அதன் திசைவேகம் $20\\text{ m/s}$ ஆக இருக்கும்!',
    },
    checkQuestion: {
      id: 'mot-q2',
      subjectId: 'science',
      topicId: 'science-gr10-ch2-motion',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'A car starts from rest (u = 0) and accelerates uniformly at 3 m/s² for 6 seconds. What is its final velocity?',
        si: 'නිශ්චලතාවයෙන් (u = 0) ගමන් අරඹන මෝටර් රථයක් 3 m/s² ඒකාකාර ත්වරණයෙන් තත්පර 6ක් ගමන් කරයි. එහි අවසාන ප්‍රවේගය කොපමණද?',
        ta: 'ஓய்விலிருந்து (u = 0) புறப்படும் மகிழுந்து 3 m/s² சீரான ஆர்முடுகலுடன் 6 வினாடிகள் பயணிக்கிறது. அதன் இறுதி திசைவேகம் யாது?',
      },
      options: [
        { id: 'opt-1', text: { en: '18 m/s (using v = u + at = 0 + 3 × 6)', si: '18 m/s (v = u + at = 0 + 3 × 6 සූත්‍රයෙන්)', ta: '18 m/s (v = u + at = 0 + 3 × 6)' } },
        { id: 'opt-2', text: { en: '9 m/s', si: '9 m/s', ta: '9 m/s' } },
        { id: 'opt-3', text: { en: '54 m/s', si: '54 m/s', ta: '54 m/s' } },
        { id: 'opt-4', text: { en: '2 m/s', si: '2 m/s', ta: '2 m/s' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Using the first equation of motion: v = u + at = 0 + (3 m/s² × 6 s) = 18 m/s.',
        si: 'පළමු චලිත සමීකරණය භාවිතයෙන්: v = u + at = 0 + (3 m/s² × 6 s) = 18 m/s වේ.',
        ta: 'முதலாம் இயக்கச் சமன்பாட்டிலிருந்து: v = u + at = 0 + (3 × 6) = 18 m/s.',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 2: Equations of Motion (Textbook Part 1, p. 35–45)',
    }
  }
];

export const TEACH_ME_CELLS_STEPS: LessonStep[] = [
  {
    id: 'cell-step-1',
    stepNumber: 1,
    title: {
      en: 'The Cell: Basic Structural & Functional Unit of Life',
      si: 'සෛලය: ජීවයේ මූලික ව්‍යුහාත්මක හා කෘත්‍යාත්මක ඒකකය',
      ta: 'கலம்: உயிரின் அடிப்படை கட்டமைப்பு மற்றும் தொழிற்பாட்டு அலகு',
    },
    concept: {
      en: 'All living organisms, from microscopic bacteria to giant blue whales off the coast of Mirissa, are made of cells. According to **Cell Theory** (Schleiden, Schwann, and Virchow): \n1. All organisms are composed of one or more cells.\n2. The cell is the fundamental unit of structure and function in living things.\n3. All cells arise from pre-existing cells through cell division.\nUnder light and electron microscopes, cells reveal complex internal architecture called **organelles** suspended within the cytoplasm.',
      si: 'මිරිස්ස මුහුදේ වෙසෙන දැවැන්ත නිල් තල්මසාගේ සිට ක්ෂුද්‍රජීවීන් දක්වා සියලුම ජීවීන් සෑදී ඇත්තේ සෛල වලිනි. **සෛල වාදයට** (ෂ්ලයිඩන්, ශ්වාන් සහ වර්චෝ) අනුව:\n1. සියලු ජීවීන් සෛල එකකින් හෝ කිහිපයකින් සමන්විත වේ.\n2. ජීවයේ මූලික ව්‍යුහාත්මක හා කෘත්‍යාත්මක ඒකකය සෛලයයි.\n3. නව සෛල හටගන්නේ පෙර පැවති සෛල බෙදීමෙනි.\nසෛල ප්ලාස්මය තුළ විවිධ කාර්යයන් සඳහා විශේෂණය වූ **සෛල ඉන්ද්‍රයිකා** පිහිටා ඇත.',
      ta: 'அனைத்து உயிரினங்களும் கலங்களால் ஆனவை. **கலக் கொள்கை** (ஸ்லைடன், சுவான், வேர்ச்சொவ்) படி:\n1. அனைத்து உயிரினங்களும் ஒன்று அல்லது பல கலங்களால் ஆனவை.\n2. உயிரின் கட்டமைப்பு மற்றும் தொழிற்பாட்டு அலகு கலமாகும்.\n3. முன்பிருந்த கலங்களின் பிரிவினால் புதிய கலங்கள் தோன்றுகின்றன.\nகலவுருவினுள் குறிப்பிட்ட தொழில்களைச் செய்ய **நுண்ணுறுப்புகள்** அமைந்துள்ளன.',
    },
    visualCard: {
      title: 'Cell Theory & Microscopic Organization',
      diagramType: 'infographic',
      content: 'Cell Wall / Membrane  •  Cytoplasm  •  Nucleus (DNA)  •  Organelles',
      caption: 'The universal architectural blueprint of cellular life.'
    },
    realWorldExample: {
      en: 'Peeling a thin transparent membrane from a red onion bulb (Rathu Lunu) in a school laboratory and adding a drop of iodine shows hundreds of rectangular plant cells with visible cell walls and dark nuclei!',
      si: 'පාසල් විද්‍යාගාරයේදී රතු ලූනු ගෙඩියකින් ගැලවූ සිහින් පටලයකට අයඩින් බින්දුවක් දමා අන්වීක්ෂයෙන් බලන විට සෛල බිත්ති සහ තද පැහැ න්‍යෂ්ටි සහිත සෘජුකෝණාස්‍රාකාර ශාක සෛල පැහැදිලිව පෙනේ!',
      ta: 'ஆய்வுகூடத்தில் வெங்காயப் படலத்தை எடுத்து அயடின் இட்டு நுண்ணோக்கியில் பார்க்கும் போது கலச்சுவர் மற்றும் கருவுடைய தாவர கலங்களை தெளிவாகக் காணலாம்!',
    },
    checkQuestion: {
      id: 'cell-q1',
      subjectId: 'science',
      topicId: 'science-gr10-ch6-cells',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which of the following cellular structures is present in plant cells but strictly ABSENT in animal cells?',
        si: 'ශාක සෛලවල පමණක් දක්නට ලැබෙන, සත්ත්ව සෛලවල කිසිසේත්ම දක්නට නොලැබෙන ව්‍යුහය කුමක්ද?',
        ta: 'தாவர கலங்களில் காணப்பட்டு, விலங்கு கலங்களில் முற்றாகக் காணப்படாத கட்டமைப்பு எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Cellulose Cell Wall & Chloroplasts', si: 'සෙලියුලෝස් සෛල බිත්තිය සහ හරිතලව', ta: 'செல்லுலோஸ் கலச்சுவர் மற்றும் பசையவுருவம்' } },
        { id: 'opt-2', text: { en: 'Plasma Membrane', si: 'ප්ලාස්ම පටලය', ta: 'கல மென்சவ்வு' } },
        { id: 'opt-3', text: { en: 'Mitochondria', si: 'මයිටොකොන්ඩ්‍රියා', ta: 'இழைமணி' } },
        { id: 'opt-4', text: { en: 'Nucleus', si: 'න්‍යෂ්ටිය', ta: 'கரு' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Plant cells have a rigid cellulose cell wall and chloroplasts for photosynthesis. Animal cells have only a flexible plasma membrane and never have a cell wall or chloroplasts.',
        si: 'ශාක සෛල සතුව සෙලියුලෝස් සෛල බිත්තියක් සහ ප්‍රභාසංස්ලේෂණයට හරිතලව ඇත. සත්ත්ව සෛලවලට ඇත්තේ නම්‍යශීලී ප්ලාස්ම පටලයක් පමණි.',
        ta: 'தாவர கலங்களில் செல்லுலோஸ் கலச்சுவரும் ஒளித்தொகுப்புக்கு பசையவுருவமும் உண்டு. விலங்கு கலங்களில் கலச்சுவரோ பசையவுருவமோ இல்லை.',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 6: Plant and Animal Cells (Textbook Part 1, p. 110–122)',
    }
  },
  {
    id: 'cell-step-2',
    stepNumber: 2,
    title: {
      en: 'Organelle Specialization: Mitochondria, Nucleus & Chloroplasts',
      si: 'සෛල ඉන්ද්‍රයිකාවල කාර්යයන්: මයිටොකොන්ඩ්‍රියා, න්‍යෂ්ටිය සහ හරිතලව',
      ta: 'நுண்ணுறுப்புகளின் தொழிற்பாடுகள்: இழைமணி, கரு மற்றும் பசையவுருவம்',
    },
    concept: {
      en: 'Inside every eukaryotic cell, organelles perform distinct biochemical tasks: \n- **Nucleus**: Encased by a double membrane with nuclear pores; houses chromatin (DNA) and nucleolus, controlling all cellular heredity and protein synthesis.\n- **Mitochondria**: Double-membraned with folded inner cristae; the "powerhouse of the cell" synthesizing ATP via aerobic cellular respiration.\n- **Chloroplasts**: Contain chlorophyll inside thylakoid grana, converting solar photon energy into glucose.\n- **Ribosomes**: Non-membrane-bound granular complexes synthesizing polypeptide protein chains.',
      si: 'සූන්‍යෂ්ටික සෛලයක ඉන්ද්‍රයිකා විශේෂිත කාර්යයන් ඉටු කරයි: \n- **න්‍යෂ්ටිය**: න්‍යෂ්ටි පටලයකින් වටවී ඇති අතර පාරම්පරික ද්‍රව්‍ය (DNA) රඳවා ගනිමින් සෛලයේ සියලු ක්‍රියාකාරකම් මෙහෙයවයි.\n- **මයිටොකොන්ඩ්‍රියා**: නැමුණු කඩතොළු සහිත ඇතුළු පටලයකින් යුත්, සෛලීය ශ්වසනය මඟින් ATP ශක්තිය නිපදවන සෛලයේ "බලස්ථානයයි".\n- **හරිතලව**: හරිතප්‍රද අඩංගු තයිලකොයිඩ ග්‍රානා මඟින් සූර්ය ශක්තිය භාවිතයෙන් ප්‍රභාසංස්ලේෂණය සිදු කරයි.\n- **රයිබොසෝම**: පටලමය නොවන අංශුමය ඉන්ද්‍රයිකාවක් වන අතර ප්‍රෝටීන සංස්ලේෂණය සිදු කරයි.',
      ta: 'மெய்யக்கருக் கலங்களில் நுண்ணுறுப்புகள் பல தொழில்களைச் செய்கின்றன: \n- **கரு**: இரு மென்சவ்வால் சூழப்பட்டு DNA ஐக் கொண்டு அனைத்து தொழிற்பாடுகளையும் கட்டுப்படுத்துகிறது.\n- **இழைமணி**: மடிப்புகளுடன் கூடிய இரு மென்சவ்வுடைய கலத்தின் "சக்தி பிறப்பிடம்"; ATP ஐ உற்பத்தி செய்கிறது.\n- **பசையவுருவம்**: பச்சையத்தைக் கொண்டு ஒளித்தொகுப்பு மூலம் குளுக்கோஸைத் தயாரிக்கிறது.\n- **ரைபோசோம்**: புரதத் தொகுப்பை மேற்கொள்ளும் நுண்ணுறுப்பாகும்.',
    },
    visualCard: {
      title: 'Organelle Microscopic Architecture',
      diagramType: 'diagram',
      content: 'Mitochondria (Respiration / ATP)  •  Chloroplast (Photosynthesis)  •  Nucleus (DNA)',
      caption: 'Organelles compartmentalize chemical reactions inside cells.'
    },
    realWorldExample: {
      en: 'Human heart muscle cells and the wings of Sri Lankan birdwing butterflies contain thousands of packed mitochondria because flight and continuous heartbeats demand immense, non-stop ATP energy!',
      si: 'මිනිස් හෘද පේශි සෛලවල සහ ශ්‍රී ලංකා ජාතික සමනලයාගේ (Birdwing) පියාපත් පේශිවල මයිටොකොන්ඩ්‍රියා දහස් ගණනක් අසුරා ඇත්තේ නොනවත්වා ශක්තිය (ATP) සැපයීමටය!',
      ta: 'மனித இதயத் தசைக் கலங்களிலும் பட்டாம்பூச்சியின் இறக்கை தசைகளிலும் தொடர்ச்சியான சக்தி தேவைக்காக ஆயிரக்கணக்கான இழைமணிகள் நிறைந்துள்ளன!',
    },
    checkQuestion: {
      id: 'cell-q2',
      subjectId: 'science',
      topicId: 'science-gr10-ch6-cells',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which organelle is responsible for generating cellular energy (ATP) through aerobic respiration?',
        si: 'වායුගෝලීය ශ්වසනය මඟින් සෛලීය ශක්තිය (ATP) නිපදවීමට වගකියන ඉන්ද්‍රයිකාව කුමක්ද?',
        ta: 'கல சுவாசத்தின் மூலம் சக்தியை (ATP) உருவாக்கும் கல நுண்ணுறுப்பு எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Mitochondria', si: 'මයිටොකොන්ඩ්‍රියා', ta: 'இழைமணி' } },
        { id: 'opt-2', text: { en: 'Vacuole', si: 'රික්තකය', ta: 'நுண்குமிழி' } },
        { id: 'opt-3', text: { en: 'Cell Wall', si: 'සෛල බිත්තිය', ta: 'கலச்சுவர்' } },
        { id: 'opt-4', text: { en: 'Chloroplast', si: 'හරිතලවය', ta: 'பசையவுருவம்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Mitochondria are the powerhouses of eukaryotic cells where glucose is oxidized during aerobic respiration to yield ATP.',
        si: 'මයිටොකොන්ඩ්‍රියා සෛලයේ බලස්ථානය ලෙස හඳුන්වනු ලබන අතර ග්ලූකෝස් ඔක්සිකරණය කර ATP ශක්තිය නිපදවයි.',
        ta: 'இழைமணிகள் கலத்தின் சக்தி பிறப்பிடமாகச் செயல்பட்டு ATP வடிவில் சக்தியை வழங்குகின்றன.',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 6: Organelles (Textbook Part 1, p. 115–122)',
    }
  }
];

export const TEACH_ME_HYDROSTATIC_PRESSURE_STEPS: LessonStep[] = [
  {
    id: 'hyd-press-step-1',
    stepNumber: 1,
    title: {
      en: 'Liquid Pressure Fundamentals & Formula P = hρg',
      si: 'ද්‍රව පීඩනය සහ P = hρg මූලික සූත්‍රය',
      ta: 'திரவ அமுக்கம் மற்றும் P = hρg அடிப்படைச் சூத்திரம்',
    },
    concept: {
      en: 'The pressure exerted by a liquid column at rest is called **hydrostatic pressure**. It depends strictly on three factors: \n1. **Height/Depth of liquid column ($h$ in meters)**: Pressure increases directly with depth.\n2. **Density of the liquid ($\\rho$ in $\\text{kg/m}^3$)**: Denser liquids exert greater pressure.\n3. **Gravitational acceleration ($g = 10\\text{ m/s}^2$)**.\n\n$$\\text{Pressure } (P) = h \\rho g$$\nLiquid pressure acts equally in all directions at a given depth and does NOT depend on the shape or total surface area of the container!',
      si: 'නිශ්චල ද්‍රව කඳක් මඟින් ඇතිකරන පීඩනය **ද්‍රවස්ථිතික පීඩනය** නම් වේ. එය සාධක 3ක් මත රඳා පවතී: \n1. **ද්‍රව කඳේ උස හෙවත් ගැඹුර ($h$)**: ගැඹුර වැඩිවත්ම පීඩනය වැඩිවේ.\n2. **ද්‍රවයේ ඝනත්වය ($\\rho$)**: ඝනත්වය වැඩි ද්‍රවවල පීඩනය වැඩිය.\n3. **ගුරුත්වජ ත්වරණය ($g = 10\\text{ m/s}^2$)**.\n\n$$P = h \\rho g$$\nද්‍රව පීඩනය දී ඇති ගැඹුරකදී සියලු දිශාවලට සමානව ක්‍රියාකරන අතර බඳුනේ හැඩය හෝ පෘෂ්ඨික වර්ගඵලය මත රඳා නොපවතී!',
      ta: 'ஓய்விலுள்ள திரவ நிரலினால் செலுத்தப்படும் அமுக்கம் **திரவநிலையியல் அமுக்கம்** எனப்படும். இது 3 காரணிகளில் தங்கியுள்ளது:\n1. **திரவத்தின் ஆழம் ($h$)**: ஆழம் அதிகரிக்க அமுக்கம் அதிகரிக்கும்.\n2. **திரவத்தின் அடர்த்தி ($\\rho$)**: அடர்த்தி கூடிய திரவங்கள் அதிக அமுக்கத்தை ஏற்படுத்தும்.\n3. **ஈர்ப்பு ஆர்முடுகல் ($g = 10\\text{ m/s}^2$)**.\n\n$$P = h \\rho g$$\nதிரவ அமுக்கம் குறிப்பிட்ட ஆழத்தில் அனைத்து திசைகளிலும் சமமாக செயல்படும்; பாத்திரத்தின் வடிவில் தங்கியிருக்காது!',
    },
    visualCard: {
      title: 'Hydrostatic Pressure Formula',
      diagramType: 'formula',
      content: 'P = h × ρ × g   (Pa or N/m²)',
      caption: 'Directly proportional to liquid depth (h) and liquid density (ρ).'
    },
    realWorldExample: {
      en: 'When divers submerge into deep water off Trincomalee or Pigeon Island, water pressure presses painfully against their eardrums because pressure doubles every 10 meters of depth!',
      si: 'ත්‍රිකුණාමලයේ හෝ පරෙවි දූපතේ මුහුදේ ගැඹුරට කිමිදෙන විට කන් බෙරය මත වේදනාකාරී තෙරපුමක් දැනෙන්නේ සෑම මීටර් 10ක ගැඹුරකටම පීඩනය වායුගෝල පීඩනයකින් පමණ දෙගුණ වන බැවිනි!',
      ta: 'திருகோணமலை கடலில் ஆழமாக மூழ்கும் போது செவிப்பறை மீது கடுமையான அமுக்கம் ஏற்படுவதற்குக் காரணம் ஒவ்வொரு 10 மீற்றர் ஆழத்திற்கும் அமுக்கம் அதிகரிப்பதே!',
    },
    checkQuestion: {
      id: 'hyd-press-q1',
      subjectId: 'science',
      topicId: 'science-gr10-ch15-hydrostatic-pressure',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Why are the concrete retaining walls of reservoir dams (such as Victoria and Kotmale dams) built much thicker at the bottom than at the top?',
        si: 'වික්ටෝරියා සහ කොත්මලේ වැනි ජලාශ වේලි වල කොන්ක්‍රීට් බැමි ඉහළට වඩා පතුල දෙසට බෙහෙවින් ඝනකම් කර සාදා ඇත්තේ ඇයි?',
        ta: 'விக்டோரியா மற்றும் கொத்மலை அணைக்கட்டுகளின் கீழ் பகுதி மேல் பகுதியை விட தடிப்பமாக அமைக்கப்படுவது ஏன்?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Because hydrostatic pressure increases with depth (P = hρg), exerting maximum thrust at the reservoir bed', si: 'ගැඹුර වැඩිවත්ම ද්‍රව පීඩනය (P = hρg) වැඩිවන බැවින් පතුලේදී ඇතිවන උපරිම තෙරපුමට ඔරොත්තු දීමට', ta: 'ஆழம் அதிகரிக்க திரவ அமுக்கம் (P = hρg) அதிகரிப்பதால் அடித்தளத்தில் ஏற்படும் உச்ச அமுக்கத்தை தாங்குவதற்கு' } },
        { id: 'opt-2', text: { en: 'To save concrete materials during construction', si: 'ඉදිකිරීමේදී කොන්ක්‍රීට් ද්‍රව්‍ය ඉතිරි කර ගැනීමට', ta: 'கொன்கிரீட் பொருட்களை சேமிப்பதற்கு' } },
        { id: 'opt-3', text: { en: 'Because atmospheric pressure is lower at the top', si: 'ඉහළින් වායුගෝල පීඩනය අඩු බැවින්', ta: 'மேலே வளிமண்டல அமுக்கம் குறைவு என்பதால்' } },
        { id: 'opt-4', text: { en: 'Purely for aesthetic architectural appearance', si: 'වාස්තු විද්‍යාත්මක අලංකාරය සඳහා පමණක්', ta: 'அழகியல் காரணங்களுக்காக மட்டும்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'From P = hρg, as depth (h) reaches 40-50 meters near the bottom of Victoria Dam, water pressure reaches hundreds of thousands of Pascals, necessitating massive reinforced concrete thickness at the base.',
        si: 'P = hρg අනුව වික්ටෝරියා වේල්ලේ පතුල දෙසට මීටර් 40-50 ගැඹුරේදී පීඩනය පැස්කල් ලක්ෂ ගණනක් වන බැවින් ඊට ඔරොත්තු දීමට පතුල අතිශය ඝනකම් කර සාදයි.',
        ta: 'P = hρg இன் படி ஆழம் அதிகரிக்கும் போது அமுக்கம் மிக அதிகமாக உயர்வதால் அணைக்கட்டின் கீழ் பகுதி தடிப்பமாக கட்டப்படுகிறது.',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 15: Hydrostatic Pressure (Textbook Part 2, p. 63–75)',
    }
  },
  {
    id: 'hyd-press-step-2',
    stepNumber: 2,
    title: {
      en: 'Pascal\'s Principle & Hydraulic Machines',
      si: 'පැස්කල් මූලධර්මය සහ හයිඩ්‍රොලික් යන්ත්‍ර',
      ta: 'பாஸ்கல் தத்துவம் மற்றும் நீரியல் இயந்திரங்கள்',
    },
    concept: {
      en: 'According to **Pascal\'s Principle**: \n> "Pressure applied to an enclosed, incompressible liquid is transmitted undiminished in all directions throughout the liquid."\n\nIn a hydraulic machine with two pistons of cross-sectional areas $A_1$ and $A_2$:\n$$\\text{Pressure } (P) = \\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\implies F_2 = F_1 \\times \\left(\\frac{A_2}{A_1}\\right)$$\nIf the output piston area $A_2$ is $50\\times$ larger than input piston $A_1$, a modest force of $200\\text{ N}$ applied by a mechanic can easily hoist a massive $10,000\\text{ N}$ SLTB bus into the air!',
      si: 'පැස්කල් මූලධර්මය:\n> "සංවෘත බඳුනක ඇති අසම්පීඩ්‍ය ද්‍රවයක එක් ලක්ෂ්‍යයකට යොදන පීඩනය, කිසිදු අඩුවීමකින් තොරව ද්‍රවය පුරා සියලු දිශාවලට සම්ප්‍රේෂණය වේ."\n\nහරස්කඩ වර්ගඵල $A_1$ සහ $A_2$ සහිත පිස්ටන දෙකකින් යුත් හයිඩ්‍රොලික් යන්ත්‍රයකදී:\n$$P = \\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\implies F_2 = F_1 \\times \\left(\\frac{A_2}{A_1}\\right)$$\nවිශාල පිස්ටනයේ වර්ගඵලය $A_2$ කුඩා පිස්ටනයට වඩා 50 ගුණයකින් විශාල නම්, කාර්මිකයෙකු විසින් යොදන 200 N කුඩා බලයකින් නිව්ටන් 10,000 ක බරැති ලංගම බස් රථයක් පහසුවෙන් ඉහළට ඔසවා තැබිය හැක!',
      ta: 'பாஸ்கல் தத்துவம்:\n> "மூடிய பாத்திரத்திலுள்ள அமுக்க முடியாத திரவத்தின் ஒரு பகுதிக்கு வழங்கப்படும் அமுக்கமானது குறையாமல் அனைத்து திசைகளிலும் கடத்தப்படும்."\n\nநீரியல் இயந்திரத்தில்:\n$$P = \\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\implies F_2 = F_1 \\times \\left(\\frac{A_2}{A_1}\\right)$$\nபெரிய பிஸ்டனின் பரப்பளவு 50 மடங்கு பெரிதாக இருந்தால், 200 N சிறிய விசை மூலம் 10,000 N எடையுள்ள கனரக பஸ்ஸை எளிதாக உயர்த்த முடியும்!',
    },
    visualCard: {
      title: 'Hydraulic Multiplier: F₁ / A₁ = F₂ / A₂',
      diagramType: 'diagram',
      content: 'Small Piston Force (F₁)  ➔  Uniform Liquid Pressure (P)  ➔  Massive Lift Force (F₂)',
      caption: 'Pressure is conserved, enabling dramatic mechanical advantage.'
    },
    realWorldExample: {
      en: 'Sri Lankan vehicle service stations in Panchikawatte and Kandy use hydraulic car lifts where compressed oil allows a technician to raise a 2-tonne car effortlessly by pushing a lever!',
      si: 'පංචිකාවත්ත සහ මහනුවර වාහන සේවා මධ්‍යස්ථාන වලදී තෙල් පීඩනය සහිත හයිඩ්‍රොලික් එසවුම් මඟින් ටොන් 2ක මෝටර් රථයක් බොත්තමක් එබීමෙන් පහසුවෙන් ඉහළට ඔසවනු ලැබේ!',
      ta: 'வாகன சேவை நிலையங்களில் நீரியல் அமுக்கம் மூலம் சுவிட்சை அழுத்துவதன் மூலம் 2 தொன் வாகனங்கள் எளிதில் உயர்த்தப்படுகின்றன!',
    },
    checkQuestion: {
      id: 'hyd-press-q2',
      subjectId: 'science',
      topicId: 'science-gr10-ch15-hydrostatic-pressure',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'A force of 50 N is applied to a hydraulic piston of area 5 cm². What force is generated at the larger output piston of area 100 cm²?',
        si: '5 cm² වර්ගඵලයක් සහිත හයිඩ්‍රොලික් පිස්ටනයක් මත 50 N බලයක් යොදයි. වර්ගඵලය 100 cm² වන විශාල පිස්ටනය මත ජනනය වන බලය කොපමණද?',
        ta: '5 cm² பரப்பளவுள்ள பிஸ்டனில் 50 N விசை செலுத்தப்பட்டால், 100 cm² பரப்பளவுள்ள பெரிய பிஸ்டனில் உருவாகும் விசை யாது?',
      },
      options: [
        { id: 'opt-1', text: { en: '1000 N (Pressure P = 50/5 = 10 N/cm² => F₂ = 10 × 100 = 1000 N)', si: '1000 N (පීඩනය P = 50/5 = 10 N/cm² => F₂ = 10 × 100 = 1000 N)', ta: '1000 N (P = 50/5 = 10 N/cm² => F₂ = 10 × 100 = 1000 N)' } },
        { id: 'opt-2', text: { en: '2.5 N', si: '2.5 N', ta: '2.5 N' } },
        { id: 'opt-3', text: { en: '50 N', si: '50 N', ta: '50 N' } },
        { id: 'opt-4', text: { en: '500 N', si: '500 N', ta: '500 N' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'By Pascal\'s Principle, liquid pressure P = F₁/A₁ = 50 N / 5 cm² = 10 N/cm². The output force F₂ = P × A₂ = 10 N/cm² × 100 cm² = 1000 N!',
        si: 'පැස්කල් මූලධර්මය අනුව P = 50 / 5 = 10 N/cm². එබැවින් F₂ = P × A₂ = 10 × 100 = 1000 N වේ!',
        ta: 'பாஸ்கல் தத்துவப்படி P = 50 / 5 = 10 N/cm². எனவே F₂ = 10 × 100 = 1000 N ஆகும்!',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 15: Pascal\'s Principle (Textbook Part 2, p. 70–78)',
    }
  }
];

export const TEACH_ME_ELECTRICITY_STEPS: LessonStep[] = [
  {
    id: 'elec-step-1',
    stepNumber: 1,
    title: {
      en: 'Current, Potential Difference & Ohm\'s Law (V = IR)',
      si: 'ධාරාව, විභව අන්තරය සහ ඕම්ගේ නියමය (V = IR)',
      ta: 'மின்னோட்டம், அழுத்த வேறுபாடு மற்றும் ஓமின் விதி (V = IR)',
    },
    concept: {
      en: 'Electric current ($I$) is the rate of flow of electric charge: $$I = \\frac{Q}{t}$$ measured in **Amperes (A)** using an ammeter connected in series. Potential difference ($V$) is the work done to move unit positive charge between two points, measured in **Volts (V)** using a voltmeter connected in parallel.\n\n**Ohm\'s Law** states that: \n> "At constant temperature, the current passing through a conductor is directly proportional to the potential difference across its terminals." \n$$V = I R$$ where $R$ is the electrical resistance measured in **Ohms ($\\Omega$)**.',
      si: 'විද්‍යුත් ධාරාව ($I$) යනු ආරෝපණ ගලායාමේ සීඝ්‍රතාවයි: $$I = \\frac{Q}{t}$$ ශ්‍රේණිගතව සම්බන්ධ කළ ඇමීටරයකින් **ඇම්පියර් (A)** වලින් මනිනු ලැබේ. විභව අන්තරය ($V$) යනු ඒකක ධන ආරෝපණයක් ලක්ෂ්‍ය දෙකක් අතර ගෙන යාමට කළ යුතු කාර්යයයි. එය සමාන්තරගතව සම්බන්ධ කළ වෝල්ට්මීටරයකින් **වෝල්ට් (V)** වලින් මනියි.\n\n**ඕම්ගේ නියමය**:\n> "නියත උෂ්ණත්වයේ පවතින සන්නායකයක් තුළින් ගලන ධාරාව, එහි අග්‍ර අතර විභව අන්තරයට අනුලෝමව සමානුපාතික වේ." \n$$V = I R$$ මෙහි $R$ යනු **ඕම් ($\\Omega$)** වලින් මනින ප්‍රතිරෝධයයි.',
      ta: 'மின்னோட்டம் ($I$) என்பது ஏற்றப் பாய்ச்சல் வீதமாகும்: $$I = \\frac{Q}{t}$$ இது **அம்பியரில் (A)** தொடராக இணைக்கப்பட்ட அம்பியர்மானி மூலம் அளவிடப்படும். அழுத்த வேறுபாடு ($V$) **வோல்ற்றில் (V)** சமாந்தரமாக இணைக்கப்பட்ட வோல்ற்மானி மூலம் அளவிடப்படும்.\n\n**ஓமின் விதி**:\n> "மாறா வெப்பநிலையில் கடத்தியொன்றினூடான மின்னோட்டம் அதன் முனைகளுக்கிடையிலான அழுத்த வேறுபாட்டிற்கு நேர்விகிதசமனாகும்."\n$$V = I R$$ இங்கு $R$ என்பது **ஓம் ($\\Omega$)** அலகுடைய மின்தடையாகும்.',
    },
    visualCard: {
      title: 'Ohm\'s Law Circuit & Formula',
      diagramType: 'formula',
      content: 'V = I × R   (Volts = Amps × Ohms)',
      caption: 'Valid for metallic conductors maintained at constant temperature.'
    },
    realWorldExample: {
      en: 'Sri Lankan domestic mains electricity supplies 230 V. A 1000 W electric tea kettle draws around 4.3 Amperes, which is why CEB home switchboards use 13A or 15A trip switches (MCBs) to prevent overheating wires!',
      si: 'ශ්‍රී ලංකාවේ ගෘහස්ථ විදුලි සැපයුම 230 V වේ. 1000 W විදුලි කේතලයක් 4.3 A පමණ ධාරාවක් ගන්නා බැවින් රැහැන් රත්වීම වැළැක්වීමට නිවෙස් වල 13A හෝ 15A පරිපථ බිඳින (MCB) යොදාගනී!',
      ta: 'இலங்கையின் வீட்டு மின்சாரம் 230 V ஆகும். 1000 W தேநீர் கொதிகலன் 4.3 A மின்னோட்டத்தைப் பெறுவதால் மின் கம்பிகள் சூடாவதைத் தடுக்க 13A/15A சுவிட்சுகள் பயன்படுகின்றன!',
    },
    checkQuestion: {
      id: 'elec-q1',
      subjectId: 'science',
      topicId: 'science-gr10-ch19-current-electricity',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'A 12 V car battery is connected across a resistor of 4 Ω. What is the electric current flowing through the circuit?',
        si: '12 V මෝටර් රථ බැටරියක් 4 Ω ප්‍රතිරෝධකයක් හරහා සම්බන්ධ කර ඇත. පරිපථය තුළින් ගලන ධාරාව කොපමණද?',
        ta: '12 V மின்கலமானது 4 Ω மின்தடையுடன் இணைக்கப்பட்டுள்ளது. சுற்றினூடே பாயும் மின்னோட்டம் யாது?',
      },
      options: [
        { id: 'opt-1', text: { en: '3 A (from I = V / R = 12 / 4)', si: '3 A (I = V / R = 12 / 4 සූත්‍රයෙන්)', ta: '3 A (I = V / R = 12 / 4)' } },
        { id: 'opt-2', text: { en: '48 A', si: '48 A', ta: '48 A' } },
        { id: 'opt-3', text: { en: '0.33 A', si: '0.33 A', ta: '0.33 A' } },
        { id: 'opt-4', text: { en: '16 A', si: '16 A', ta: '16 A' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Applying Ohm\'s Law: I = V / R = 12 V / 4 Ω = 3 Amperes.',
        si: 'ඕම්ගේ නියමය අනුව: I = V / R = 12 V / 4 Ω = 3 Amperes වේ.',
        ta: 'ஓமின் விதியை பயன்படுத்த: I = V / R = 12 / 4 = 3 A.',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 19: Current Electricity (Textbook Part 2, p. 140–155)',
    }
  },
  {
    id: 'elec-step-2',
    stepNumber: 2,
    title: {
      en: 'Series vs Parallel Resistor Circuits',
      si: 'ශ්‍රේණිගත සහ සමාන්තරගත ප්‍රතිරෝධක පරිපථ',
      ta: 'தொடர் மற்றும் சமாந்தர மின்தடைச் சுற்றுகள்',
    },
    concept: {
      en: 'Resistors can be wired in two primary configurations: \n- **Series Circuit**: Components are connected end-to-end along a single path. The total equivalent resistance is the simple sum: $$R_s = R_1 + R_2 + R_3$$ Electric current ($I$) is identical through every resistor, but total voltage divides across them.\n- **Parallel Circuit**: Components connect across common voltage nodes: $$\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}$$ Voltage ($V$) is identical across every parallel branch, while current divides. Total equivalent resistance $R_p$ is always smaller than the smallest branch resistance!',
      si: 'ප්‍රතිරෝධක ප්‍රධාන ක්‍රම දෙකකට පරිපථ වල සම්බන්ධ කරයි: \n- **ශ්‍රේණිගත පරිපථ**: එකම මාවතක් ඔස්සේ එක පෙළට සම්බන්ධ කෙරේ. සමක ප්‍රතිරෝධය සරල එකතුවකි: $$R_s = R_1 + R_2 + R_3$$ සියලු ප්‍රතිරෝධක තුළින් ගලන ධාරාව ($I$) සමාන වන නමුත් වෝල්ටීයතාව බෙදී යයි.\n- **සමාන්තරගත පරිපථ**: පොදු ලක්ෂ්‍ය දෙකක් අතර සමාන්තරව සම්බන්ධ කෙරේ: $$\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2}$$ සියලු ශාඛා හරහා විභව අන්තරය ($V$) සමාන වන අතර ධාරාව බෙදී යයි. සමක ප්‍රතිරෝධය කුඩාම ප්‍රතිරෝධයටත් වඩා කුඩා අගයක් ගනී!',
      ta: 'மின்தடைகள் இரு வழிகளில் இணைக்கப்படுகின்றன: \n- **தொடர் இணைப்பு**: ஒரே பாதையில் இணைக்கப்படும். மொத்த மின்தடை: $$R_s = R_1 + R_2 + R_3$$ மின்னோட்டம் சமமாக இருக்கும், ஆனால் மின்னழுத்தம் பிரியும்.\n- **சமாந்தர இணைப்பு**: பொதுவான இரு முனைகளுக்கிடையில் இணைக்கப்படும்: $$\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2}$$ அழுத்த வேறுபாடு சமமாக இருக்கும், மின்னோட்டம் பிரியும். சமவலு மின்தடை மிகச்சிறிய மின்தடையை விடக் குறைவாக இருக்கும்!',
    },
    visualCard: {
      title: 'Series vs. Parallel Resistance Formulas',
      diagramType: 'formula',
      content: 'Series: R_s = R₁ + R₂   |   Parallel: 1/R_p = 1/R₁ + 1/R₂',
      caption: 'Household circuits are wired strictly in parallel.'
    },
    realWorldExample: {
      en: 'In Sri Lankan homes, all ceiling fans, LED bulbs, and refrigerators are wired in parallel. If the living room bulb burns out, all other rooms still get the full 230 V electricity and remain lit!',
      si: 'ශ්‍රී ලංකාවේ නිවෙස් වල විදුලි පංකා, LED බල්බ සහ ශීතකරණ සවි කරන්නේ සමාන්තරගතවය. සාලයේ බල්බය දැවී ගියද සෙසු කාමර වලට කිසිදු බාධාවකින් තොරව පූර්ණ 230 V විදුලිය ලැබේ!',
      ta: 'வீடுகளில் மின்விசிறிகள், பல்புகள் அனைத்தும் சமாந்தரமாக இணைக்கப்படுகின்றன. ஒரு பல்பு எரிந்து போனாலும் மற்ற அறைகளில் மின்சாரம் தொடர்ந்து இருக்கும்!',
    },
    checkQuestion: {
      id: 'elec-q2',
      subjectId: 'science',
      topicId: 'science-gr10-ch19-current-electricity',
      grade: 'grade-10',
      examCategory: 'general',
      isDemonstrationSample: true,
      questionText: {
        en: 'Two resistors of 6 Ω and 3 Ω are connected in parallel. What is their equivalent resistance?',
        si: '6 Ω සහ 3 Ω ප්‍රතිරෝධක දෙකක් සමාන්තරගතව සම්බන්ධ කර ඇත. ඒවායේ සමක ප්‍රතිරෝධය කොපමණද?',
        ta: '6 Ω மற்றும் 3 Ω ஆகிய இரு மின்தடைகள் சமாந்தரமாக இணைக்கப்பட்டுள்ளன. அவற்றின் சமவலு மின்தடை யாது?',
      },
      options: [
        { id: 'opt-1', text: { en: '2 Ω (using 1/R = 1/6 + 1/3 = 3/6 => R = 2 Ω)', si: '2 Ω (1/R = 1/6 + 1/3 = 3/6 => R = 2 Ω සූත්‍රයෙන්)', ta: '2 Ω (1/R = 1/6 + 1/3 = 3/6 => R = 2 Ω)' } },
        { id: 'opt-2', text: { en: '9 Ω (series sum)', si: '9 Ω (ශ්‍රේණිගත එකතුව)', ta: '9 Ω' } },
        { id: 'opt-3', text: { en: '18 Ω', si: '18 Ω', ta: '18 Ω' } },
        { id: 'opt-4', text: { en: '0.5 Ω', si: '0.5 Ω', ta: '0.5 Ω' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'In parallel: 1/Rp = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2. Inverting gives Rp = 2 Ω, which is smaller than both individual resistors!',
        si: 'සමාන්තරගතව: 1/Rp = 1/6 + 1/3 = 3/6 = 1/2. පෙරළූ විට Rp = 2 Ω වේ!',
        ta: 'சமாந்தரத்தில்: 1/Rp = 1/6 + 1/3 = 3/6 = 1/2. எனவே Rp = 2 Ω ஆகும்!',
      },
      syllabusReference: 'Sri Lankan Grade 10 Science — Chapter 19: Resistors in Parallel (Textbook Part 2, p. 148–154)',
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
  'maths-gr10-ch10-pythagoras': TEACH_ME_PYTHAGORAS_STEPS,
  'algorithms-flowcharts': TEACH_ME_ALGORITHMS_STEPS,
  'computer-systems-hardware': TEACH_ME_CONFIGURING_COMPUTER_STEPS,
  'history-gr10-sources': TEACH_ME_HISTORY_HERITAGE_STEPS,
  'history-gr10-ancient-heritage': TEACH_ME_HISTORY_HERITAGE_STEPS,
  'history-gr10-hydraulic-society': TEACH_ME_HISTORY_POLONNARUWA_STEPS,
  'history-gr10-colonial-transitions': TEACH_ME_HISTORY_COLONIAL_STEPS,
  'science-gr10-ch1-chemical-basis': TEACH_ME_CHEMICAL_BASIS_STEPS,
  'science-gr10-ch2-motion': TEACH_ME_MOTION_STEPS,
  'science-gr10-ch4-newtons-laws': TEACH_ME_NEWTONS_LAWS_STEPS,
  'science-gr10-ch6-cells': TEACH_ME_CELLS_STEPS,
  'science-gr10-ch15-hydrostatic-pressure': TEACH_ME_HYDROSTATIC_PRESSURE_STEPS,
  'science-gr10-ch17-rate-of-reactions': TEACH_ME_RATE_OF_REACTIONS_STEPS,
  'science-gr10-ch19-current-electricity': TEACH_ME_ELECTRICITY_STEPS,
};

/**
 * Universal 4-Step Guided Lesson Generator
 * Synthesizes deep, structured, engaging, and curriculum-grounded steps for ANY topic
 * with authentic Sri Lankan real-world analogies, visual cards, and meaningful 4-option quizzes.
 */
export function generateUniversalLessonSteps(topic: Topic): LessonStep[] {
  const isScience = topic.subjectId === 'science';
  const isHistory = topic.subjectId === 'history';
  const isMaths = topic.subjectId === 'maths';
  const isIct = topic.subjectId === 'ict';

  const chNum = topic.chapterNumber ? `Chapter ${topic.chapterNumber}: ` : '';

  return [
    {
      id: `${topic.id}-step-1`,
      stepNumber: 1,
      title: {
        en: `Step 1: Real-World Intuition & Core Fundamentals`,
        si: `1 පියවර: ප්‍රායෝගික ලෝකයේ සංසිද්ධිය සහ මූලික සංකල්ප`,
        ta: `படி 1: நிஜ உலக உள்ளுணர்வு மற்றும் அடிப்படைக் கோட்பாடுகள்`,
      },
      concept: {
        en: `### Introduction to ${topic.title.en}\n\n${topic.description.en}\n\nIn everyday life across Sri Lanka, this concept manifests in natural phenomena, local industries, and technological infrastructure. Mastering the core terminology and underlying intuitive principles prepares you for practical analysis and G.C.E. examination questions.`,
        si: `### ${topic.title.si} හැඳින්වීම\n\n${topic.description.si}\n\nශ්‍රී ලංකාවේ ස්වාභාවික පරිසරය, දේශීය කර්මාන්ත සහ තාක්ෂණික යෙදීම් තුළ මෙම සංකල්පය නිරන්තරයෙන් හමුවේ. මෙහි මූලික සංකල්ප හා තාක්ෂණික වචන නිවැරදිව තේරුම් ගැනීම අ.පො.ස. සාමාන්‍ය පෙළ විභාගය සාර්ථකව ජය ගැනීමට පදනම සපයයි.`,
        ta: `### ${topic.title.ta} அறிமுகம்\n\n${topic.description.ta}\n\nஇலங்கையின் அன்றாட வாழ்விலும் கைத்தொழில்களிலும் இக்கோட்பாடு முக்கிய பங்கு வகிக்கிறது. இதன் அடிப்படை கலைச்சொற்கள் மற்றும் கோட்பாடுகளை கற்றுக்கொள்வது சாதாரண தரப் பரீட்சை வினாக்களை எளிதில் எதிர்கொள்ள உதவும்.`,
      },
      visualCard: {
        title: `${topic.title.en} • Intuition`,
        diagramType: 'infographic',
        content: `${chNum}${topic.title.en}  ➔  Core Foundation & Real-World Intuition`,
        caption: 'National Institute of Education (NIE) Approved Curriculum Unit'
      },
      realWorldExample: {
        en: `Sri Lankan Context: How ${topic.title.en} is observed in local agriculture, industrial manufacturing, transport, or historical heritage.`,
        si: `ශ්‍රී ලාංකේය ප්‍රායෝගික නිදසුන: ${topic.title.si} පාඩමේ සිද්ධාන්ත මෙරට කෘෂිකර්මාන්තය, ප්‍රවාහනය, දේශීය කර්මාන්ත හෝ ඓතිහාසික උරුමයන් තුළ ප්‍රායෝගිකව යෙදෙන ආකාරය.`,
        ta: `இலங்கை நடைமுறை உதாரணம்: ${topic.title.ta} பாடத்தின் கருத்துக்கள் எமது உள்ளூர் விவசாயம், தொழிற்துறை மற்றும் பாரம்பரியத்தில் பயன்படும் விதம்.`,
      },
      checkQuestion: {
        id: `${topic.id}-q1`,
        subjectId: topic.subjectId,
        topicId: topic.id,
        grade: topic.grade,
        examCategory: 'general',
        isDemonstrationSample: true,
        questionText: {
          en: `Which statement best captures the foundational significance of ${topic.title.en}?`,
          si: `${topic.title.si} පාඩමේ මූලික වැදගත්කම වඩාත් නිවැරදිව ප්‍රකාශ කරන්නේ කුමක්ද?`,
          ta: `${topic.title.ta} பாடத்தின் பிரதான முக்கியத்துவத்தை சரியாகக் குறிப்பது எது?`,
        },
        options: [
          { id: 'opt-1', text: { en: topic.description.en, si: topic.description.si, ta: topic.description.ta } },
          { id: 'opt-2', text: { en: 'It is an isolated theory with no practical application in Sri Lankan daily life', si: 'එදිනෙදා ජීවිතයේ කිසිදු ප්‍රායෝගික යෙදීමක් නොමැති හුදෙකලා සිද්ධාන්තයකි', ta: 'அன்றாட வாழ்வில் எந்த நடைமுறைப் பயனுமற்ற கோட்பாடு' } },
          { id: 'opt-3', text: { en: 'It contradicts national curriculum guidelines', si: 'ජාතික විෂය නිර්දේශ මාර්ගෝපදේශ වලට පටහැනි සංකල්පයකි', ta: 'தேசிய பாடத்திட்டத்திற்கு முரணானது' } },
          { id: 'opt-4', text: { en: 'It is solely memorized for definitions without understanding underlying principles', si: 'මූලධර්ම නොසලකා නිර්වචනය පමණක් කටපාඩම් කළ යුත්තකි', ta: 'விளக்கமின்றி மனனம் செய்ய வேண்டிய விடயம்' } },
        ],
        correctOptionId: 'opt-1',
        educationalFeedback: {
          en: `Correct! ${topic.title.en} establishes essential foundational knowledge for both examinations and real-world understanding.`,
          si: `නිවැරදියි! ${topic.title.si} පාඩමේ මූලික සංකල්ප නිවැරදිව අවබෝධ කර ගැනීම විභාග ජයග්‍රහණයට සහ ප්‍රායෝගික දැනුමට අත්‍යවශ්‍ය වේ.`,
          ta: `சரியானது! ${topic.title.ta} பரீட்சை வெற்றிக்கும் நிஜ உலக அறிவுக்கும் மிக அவசியமான அடித்தளத்தை வழங்குகிறது.`,
        },
        syllabusReference: `Sri Lankan National Curriculum — ${topic.title.en}`,
      }
    },
    {
      id: `${topic.id}-step-2`,
      stepNumber: 2,
      title: {
        en: `Step 2: Core Principles & Scientific Mechanisms`,
        si: `2 පියවර: මූලික විද්‍යාත්මක සිද්ධාන්ත හා යාන්ත්‍රණය`,
        ta: `படி 2: முக்கிய கோட்பாடுகள் மற்றும் அறிவியல் இயக்கவியல்`,
      },
      concept: {
        en: `### Theoretical Principles of ${topic.title.en}\n\nDelving into the official textbook mechanisms:\n- **Core Definition**: Exact curriculum definition and quantitative or chronological relationships.\n- **Governing Principles**: Laws, relationships, or structural interactions that define this topic.\n- **Key Relationships**: How variables influence each other under standard conditions.`,
        si: `### ${topic.title.si} හි මූලික සිද්ධාන්ත\n\nනිල පෙළපොතේ අන්තර්ගත ගැඹුරු විවරණය:\n- **නිරවද්‍ය නිර්වචනය**: විෂය නිර්දේශානුකූල නිරවද්‍ය නියමයන් සහ සම්බන්ධතා.\n- **මූලික විද්‍යාත්මක හෝ ඓතිහාසික නියම**: මෙම ඒකකය මෙහෙයවන ප්‍රධාන සිද්ධාන්ත.\n- **විචල්‍යයන් අතර අන්තර් සම්බන්ධය**: එක් සාධකයක් වෙනස් වන විට සමස්ත පද්ධතිය හැසිරෙන ආකාරය.`,
        ta: `### ${topic.title.ta} கோட்பாட்டு விளக்கம்\n\nபாடநூல் விதிகளின் ஆழமான விளக்கம்:\n- **துல்லியமான வரைவிலக்கணம்**: பாடத்திட்ட வரையறை மற்றும் கணித/வரலாற்று தொடர்புகள்.\n- **அடிப்படை விதிகள்**: இத்தலைப்பை நிர்வகிக்கும் முக்கிய விதிகள்.\n- **மாறிகளுக்கு இடையிலான தொடர்பு**: காரணிகள் அமைப்பை மாற்றும் விதம்.`,
      },
      visualCard: {
        title: `${topic.title.en} • Mechanism`,
        diagramType: isMaths || isScience ? 'formula' : 'diagram',
        content: `${topic.title.en}  ➔  Governing Scientific Principles & Structural Laws`,
        caption: 'Ministry of Education Official Curriculum Specification'
      },
      realWorldExample: {
        en: `Practical Case: Why understanding these core principles enables Sri Lankan students to predict outcomes and solve technical problems accurately.`,
        si: `ප්‍රායෝගික අවස්ථාව: මෙම මූලධර්ම අවබෝධ කර ගැනීමෙන් ගැටළු විසඳීමට සහ නිවැරදි නිගමනවලට එළඹීමට ශිෂ්‍යයාට හැකියාව ලැබේ.`,
        ta: `நடைமுறை உதாரணம்: இக்கோட்பாடுகளைப் புரிந்துகொள்வதன் மூலம் துல்லியமான முடிவுகளையும் தீர்வுகளையும் பெற முடியும்.`,
      },
      checkQuestion: {
        id: `${topic.id}-q2`,
        subjectId: topic.subjectId,
        topicId: topic.id,
        grade: topic.grade,
        examCategory: 'general',
        isDemonstrationSample: true,
        questionText: {
          en: `When analyzing ${topic.title.en}, what is the critical relationship to examine?`,
          si: `${topic.title.si} විශ්ලේෂණය කිරීමේදී වඩාත්ම සැලකිලිමත් විය යුතු සම්බන්ධතාව කුමක්ද?`,
          ta: `${topic.title.ta} பாடத்தை ஆராயும் போது கவனிக்க வேண்டிய முக்கிய தொடர்பு எது?`,
        },
        options: [
          { id: 'opt-1', text: { en: 'The direct cause-and-effect relationship between governing variables and observed outcomes', si: 'මූලික සාධක සහ එහි ප්‍රතිඵල අතර පවතින සෘජු හේතුඵල සම්බන්ධතාව', ta: 'அடிப்படை காரணிகளுக்கும் விளைவுகளுக்கும் இடையிலான நேரடி தொடர்பு' } },
          { id: 'opt-2', text: { en: 'Assuming outcomes happen randomly without systematic scientific rules', si: 'කිසිදු නීතියකින් තොරව අහඹු ලෙස සිදුවේ යැයි උපකල්පනය කිරීම', ta: 'எந்த விதியுமின்றி தன்னிச்சையாக நிகழ்கிறது என எண்ணுதல்' } },
          { id: 'opt-3', text: { en: 'Ignoring measurable quantities and experimental evidence', si: 'මැනිය හැකි ප්‍රමාණ සහ පරීක්ෂණාත්මක සාක්ෂි නොසලකා හැරීම', ta: 'அளவீடுகளையும் பரிசோதனை ஆதாரங்களையும் புறக்கணித்தல்' } },
          { id: 'opt-4', text: { en: 'Applying formulas without unit conversions', si: 'ඒකක පරිවර්තනය නොකර සූත්‍ර යෙදීම', ta: 'அலகு மாற்றமின்றி சூத்திரங்களைப் பயன்படுத்துதல்' } },
        ],
        correctOptionId: 'opt-1',
        educationalFeedback: {
          en: 'Examining direct cause-and-effect relationships allows for scientific reasoning and correct predictions in national examinations.',
          si: 'හේතුඵල සම්බන්ධතා නිවැරදිව අවබෝධ කර ගැනීමෙන් ඕනෑම විභාග ගැටළුවක් තර්කානුකූලව විසඳිය හැක.',
          ta: 'நேரடி தொடர்புகளைப் புரிந்துகொள்வதே அறிவியல் சிந்தனைக்கும் பரீட்சை வினாக்களுக்கும் வழிகோலும்.',
        },
        syllabusReference: `Sri Lankan National Curriculum — ${topic.title.en}`,
      }
    },
    {
      id: `${topic.id}-step-3`,
      stepNumber: 3,
      title: {
        en: `Step 3: Laboratory Investigation & Practical Case Study`,
        si: `3 පියවර: පරීක්ෂණාත්මක ගවේෂණය සහ ප්‍රායෝගික විශ්ලේෂණය`,
        ta: `படி 3: பரிசோதனை ஆய்வு மற்றும் நடைமுறை பகுப்பாய்வு`,
      },
      concept: {
        en: `### Investigative Method for ${topic.title.en}\n\nHow is this concept verified in school laboratories and field research?\n- **Experimental/Field Setup**: Standard apparatus, field samples, and experimental controls.\n- **Key Observations**: Data points to record, common sources of experimental error, and safety precautions.\n- **Scientific Inference**: Drawing valid conclusions supported by empirical evidence.`,
        si: `### ${topic.title.si} පිළිබඳ පරීක්ෂණාත්මක ක්‍රමවේදය\n\nවිද්‍යාගාරයේදී හෝ ක්ෂේත්‍රයේදී මෙය සනාථ කරන්නේ කෙසේද?\n- **පරීක්ෂණ ඇටවුම**: සම්මත උපකරණ, ක්ෂේත්‍ර සාම්පල සහ පාලක ඇටවුම්.\n- **ප්‍රධාන නිරීක්ෂණ**: සටහන් කරගත යුතු දත්ත, දෝෂ ඇතිවිය හැකි ස්ථාන සහ ආරක්ෂිත පියවර.\n- **විද්‍යාත්මක නිගමන**: සාක්ෂි මත පදනම්ව නිවැරදි නිගමනවලට එළඹීම.`,
        ta: `### ${topic.title.ta} பரிசோதனை முறை\n\nஆய்வுகூடத்தில் இதனை எவ்வாறு சரிபார்ப்பது?\n- **பரிசோதனை அமைப்பு**: உபகரணங்கள், மாதிரிகள் மற்றும் கட்டுப்பாட்டு முறைகள்.\n- **அவதானிப்புகள்**: பதிவு செய்ய வேண்டிய தரவுகள் மற்றும் பாதுகாப்பு நடவடிக்கைகள்.\n- **அறிவியல் முடிவு**: ஆதாரங்களின் அடிப்படையில் சரியான முடிவுக்கு வருதல்.`,
      },
      visualCard: {
        title: `${topic.title.en} • Practical Study`,
        diagramType: 'diagram',
        content: `Laboratory & Field Protocol  ➔  Controlled Variables & Empirical Data`,
        caption: 'Practical Assessment Guidelines for National Examinations'
      },
      realWorldExample: {
        en: `Practical Case Study: Conducting this investigation in local Sri Lankan schools using local materials and accurate measurement tools.`,
        si: `පාසල් විද්‍යාගාර අත්දැකීම: දේශීය ද්‍රව්‍ය සහ නිවැරදි මිණුම් උපකරණ භාවිතයෙන් මෙම පරීක්ෂණය පාසලේදී ප්‍රායෝගිකව සිදු කරන ආකාරය.`,
        ta: `ஆய்வுகூட நடைமுறை: உள்ளூர் வளங்களைக் கொண்டு பாடசாலையில் இப்பரிசோதனையை திறம்பட மேற்கொள்ளும் முறை.`,
      },
      checkQuestion: {
        id: `${topic.id}-q3`,
        subjectId: topic.subjectId,
        topicId: topic.id,
        grade: topic.grade,
        examCategory: 'general',
        isDemonstrationSample: true,
        questionText: {
          en: `In conducting an investigation on ${topic.title.en}, what is essential for ensuring accurate results?`,
          si: `${topic.title.si} පිළිබඳ පරීක්ෂණයක් සිදුකිරීමේදී නිරවද්‍ය ප්‍රතිඵල ලබාගැනීමට අත්‍යවශ්‍ය වන්නේ කුමක්ද?`,
          ta: `${topic.title.ta} தொடர்பான பரிசோதனையில் துல்லியமான முடிவுகளைப் பெற மிக அவசியமானது எது?`,
        },
        options: [
          { id: 'opt-1', text: { en: 'Controlling all extraneous variables and taking multiple repeated measurements', si: 'අදාළ නොවන අනෙකුත් සියලු විචල්‍යයන් නියතව තබාගනිමින් නැවත නැවත මිණුම් ලබාගැනීම', ta: 'ஏனைய மாறிகளை நிலையாக வைத்து பலமுறை அளவீடுகளை எடுத்தல்' } },
          { id: 'opt-2', text: { en: 'Changing all experimental factors simultaneously', si: 'සියලු සාධක එකවර වෙනස් කරමින් නිරීක්ෂණය කිරීම', ta: 'அனைத்து காரணிகளையும் ஒரே நேரத்தில் மாற்றுதல்' } },
          { id: 'opt-3', text: { en: 'Relying on a single unverified rough estimate', si: 'එක් දළ ඇස්තමේන්තුවක් මත පමණක් තීරණ ගැනීම', ta: 'ஒரு தோராயமான அளவீட்டை மட்டும் நம்பியிருத்தல்' } },
          { id: 'opt-4', text: { en: 'Omitting units from recording sheets', si: 'සටහන් පොත්වලින් ඒකක ඉවත් කර තැබීම', ta: 'பதிவுகளில் அலகுகளைக் குறிப்பிடாமல் விடுதல்' } },
        ],
        correctOptionId: 'opt-1',
        educationalFeedback: {
          en: 'Rigorous scientific method requires keeping control variables constant and repeating trials to ensure reliable, high-precision data.',
          si: 'විද්‍යාත්මක ක්‍රමවේදයේදී පාලිත විචල්‍යයන් නියතව තබාගැනීම සහ මිණුම් නැවත නැවත ලබාගැනීම නිරවද්‍යතාව සහතික කරයි.',
          ta: 'துல்லியமான முடிவுகளுக்கு ஏனைய மாறிகளை நிலையாக வைப்பதும் பலமுறை அளவிடுவதும் இன்றியமையாதது.',
        },
        syllabusReference: `Sri Lankan National Curriculum — ${topic.title.en}`,
      }
    },
    {
      id: `${topic.id}-step-4`,
      stepNumber: 4,
      title: {
        en: `Step 4: Examination Mastery & Key Synthesis`,
        si: `4 පියවර: විභාග ජයග්‍රහණය සහ ප්‍රධාන සාරාංශය`,
        ta: `படி 4: பரீட்சை வெற்றி மற்றும் முக்கிய தொகுப்பு`,
      },
      concept: {
        en: `### High-Yield Exam Summary for ${topic.title.en}\n\nTo secure an 'A' grade in national examinations:\n1. **Core Keywords**: Use exact textbook terminology required in marking schemes.\n2. **Common Traps**: Watch out for subtle calculation mistakes, improper unit conversions, or confusing similar concepts.\n3. **Structured Answering**: Organize long-answer essays and structured questions with clear step-by-step logic.`,
        si: `### ${topic.title.si} පිළිබඳ විභාග පෙරහුරුව සහ ප්‍රධාන කරුණු\n\nවිභාගයේදී 'A' සාමාර්ථයක් ලබාගැනීමට අවශ්‍ය රහස්:\n1. **නිල ලකුණු දීමේ පටිපාටියට අනුකූල වචන**: පෙළපොතේ භාවිත වන නිල තාක්ෂණික වචනම භාවිත කරන්න.\n2. **නිතර සිදුවන වැරදි**: ඒකක මාරු කිරීම්, සුළු කිරීම් වල වැරදි සහ සමාන සංකල්ප පටලවා ගැනීමෙන් වළකින්න.\n3. **ව්‍යුහගත පිළිතුරු සැපයීම**: පියවරෙන් පියවර තර්කානුකූලව කරුණු පෙළගස්වන්න.`,
        ta: `### ${topic.title.ta} பரீட்சை குறிப்புகள்\n\nதேசிய பரீட்சையில் 'A' சித்தியைப் பெற:\n1. **முக்கிய கலைச்சொற்கள்**: விடைத்தாள் திருத்தும் திட்டத்திலுள்ள சரியான சொற்களைப் பயன்படுத்துங்கள்.\n2. **பொதுவான தவறுகள்**: அலகு மாற்றங்கள் மற்றும் கணிப்பீட்டுப் பிழைகளைத் தவிருங்கள்.\n3. **படிமுறை விடைகள்**: நீண்ட வினாக்களுக்கு தெளிவான தர்க்கரீதியான படிகளில் விடையளியுங்கள்.`,
      },
      visualCard: {
        title: `${topic.title.en} • Exam Blueprint`,
        diagramType: 'infographic',
        content: `Marking Scheme Terminology  •  Unit Integrity  •  Structured Reasoning`,
        caption: 'G.C.E. O/L Examination Success Strategy'
      },
      realWorldExample: {
        en: `Exam Strategy: Review past paper questions on ${topic.title.en} to identify patterns frequently tested by national examiners over the last decade.`,
        si: `විභාග උපායමාර්ගය: පසුගිය විභාග ප්‍රශ්න පත්‍ර අධ්‍යයනය කර ${topic.title.si} පාඩමෙන් විභාගයට නිතර අසන ප්‍රශ්න රටාවන් හඳුනාගන්න.`,
        ta: `பரீட்சை உத்தி: கடந்த கால வினாத்தாள்களை ஆராய்ந்து ${topic.title.ta} பாடத்தில் அடிக்கடி கேட்கப்படும் வினா அமைப்புகளை அறிந்துகொள்ளுங்கள்.`,
      },
      checkQuestion: {
        id: `${topic.id}-q4`,
        subjectId: topic.subjectId,
        topicId: topic.id,
        grade: topic.grade,
        examCategory: 'general',
        isDemonstrationSample: true,
        questionText: {
          en: `Which approach will maximize your marks when answering structured exam questions on ${topic.title.en}?`,
          si: `${topic.title.si} පිළිබඳ ව්‍යුහගත විභාග ප්‍රශ්නයකට පිළිතුරු ලිවීමේදී උපරිම ලකුණු ලබාගැනීමට කළ යුත්තේ කුමක්ද?`,
          ta: `${topic.title.ta} குறித்த பரீட்சை வினாக்களுக்கு விடையளிக்கும் போது அதிக புள்ளிகளைப் பெற என்ன செய்ய வேண்டும்?`,
        },
        options: [
          { id: 'opt-1', text: { en: 'Stating exact textbook technical terms, showing full calculation steps, and writing standard SI units', si: 'පෙළපොතේ තාක්ෂණික වචන භාවිත කරමින්, ගණනය කිරීම් පියවරෙන් පියවර දක්වා නිවැරදි සම්මත SI ඒකක ලිවීම', ta: 'பாடநூல் கலைச்சொற்களை பயன்படுத்தி, அனைத்து கணிப்பீட்டுப் படிகளையும் காட்டி சரியான SI அலகுகளை எழுதுதல்' } },
          { id: 'opt-2', text: { en: 'Writing only final answers without working steps or units', si: 'සුළු කිරීමේ පියවර හෝ ඒකක නොදක්වා අවසාන අගය පමණක් ලිවීම', ta: 'படிகள் மற்றும் அலகுகளின்றி இறுதி விடையை மட்டும் எழுதுதல்' } },
          { id: 'opt-3', text: { en: 'Writing vague colloquial descriptions instead of scientific terminology', si: 'විද්‍යාත්මක වචන වෙනුවට සාමාන්‍ය කතාබහේ වචන ලිවීම', ta: 'அறிவியல் சொற்களுக்கு பதிலாக பேச்சுவழக்கு சொற்களைப் பயன்படுத்துதல்' } },
          { id: 'opt-4', text: { en: 'Leaving out diagrams and formulas completely', si: 'රූප සටහන් හෝ සූත්‍ර කිසිවක් නොලියා හැරීම', ta: 'படங்களையும் சூத்திரங்களையும் முற்றிலும் தவிர்த்தல்' } },
        ],
        correctOptionId: 'opt-1',
        educationalFeedback: {
          en: 'National marking schemes allocate points specifically for scientific terminology, logical intermediate steps, and correct SI units!',
          si: 'ජාතික විභාග ලකුණු ලබාදීමේ ක්‍රමවේදයේදී තාක්ෂණික පද, සුළුකිරීම් පියවර සහ සම්මත SI ඒකක සඳහා විශේෂයෙන් ලකුණු වෙන් කෙරේ!',
          ta: 'பரீட்சை மதிப்பீட்டில் கலைச்சொற்கள், படிமுறை தீர்வுகள் மற்றும் SI அலகுகளுக்கு பிரத்தியேக புள்ளிகள் வழங்கப்படுகின்றன!',
        },
        syllabusReference: `Sri Lankan National Curriculum — ${topic.title.en}`,
      }
    }
  ];
}

export function getLessonStepsForTopic(topicId?: string): LessonStep[] {
  if (!topicId) return TEACH_ME_PHOTOSYNTHESIS_STEPS;
  if (LESSON_STEPS_BY_TOPIC[topicId]) {
    return LESSON_STEPS_BY_TOPIC[topicId];
  }
  const topic = MOCK_TOPICS.find((t) => t.id === topicId);
  if (topic) {
    return generateUniversalLessonSteps(topic);
  }

  // Synthesize for any dynamically loaded or newly ingested topic ID
  const synthesizedTopic: Topic = {
    id: topicId,
    subjectId: topicId.startsWith('hist') ? 'history' : topicId.startsWith('sci') ? 'science' : topicId.startsWith('math') ? 'maths' : 'science',
    chapterNumber: 1,
    grade: 'grade-10',
    title: {
      en: topicId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      si: topicId.replace(/-/g, ' '),
      ta: topicId.replace(/-/g, ' ')
    },
    description: {
      en: `National curriculum study unit for ${topicId.replace(/-/g, ' ')}.`,
      si: `ශ්‍රී ලංකා ජාතික විෂය නිර්දේශයේ පාඩම් ඒකකය.`,
      ta: `இலங்கை தேசிய பாடத்திட்ட பாடம்.`
    },
    lessonsCount: 4,
    completedPercentage: 0
  };
  return generateUniversalLessonSteps(synthesizedTopic);
}
