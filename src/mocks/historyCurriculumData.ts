import type { LessonStep } from '../types';

/**
 * ============================================================================
 * GRADE 10 HISTORY CURRICULUM — CURATED HIGH-YIELD EXAMINATION STEPS
 * Fully grounded in the official Sri Lankan National Institute of Education (NIE)
 * Grade 10 History Textbooks (Parts 1 & 2) and G.C.E. O/L Examination Standards.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// CHAPTER 1: SOURCES OF STUDYING HISTORY (ඉතිහාසය හැදෑරීමේ මූලාශ්‍ර)
// ----------------------------------------------------------------------------
export const TEACH_ME_HISTORY_SOURCES_STEPS: LessonStep[] = [
  {
    id: 'hist-src-1',
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
      id: 'hist-src-q1',
      subjectId: 'history',
      topicId: 'history-gr10-sources',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Who is recognized as the author of the first part of the ancient Sri Lankan chronicle "Mahavamsa"?',
        si: 'ශ්‍රී ලංකාවේ ප්‍රමුඛතම ඓතිහාසික වංශකථාව වන "මහාවංශයේ" ප්‍රථම භාගයේ කතුවරයා කවුරුන්ද?',
        ta: 'மகாவம்சத்தின் முதற் பகுதியை இயற்றிய ஆசிரியர் யார்?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Ven. Mahanama Thero of Mahavihara (5th Century CE)', si: 'අනුරාධපුර මහා විහාරයේ මහානාම හිමි (ක්‍රි.ව. 5 වන සියවස)', ta: 'மகா விகாரையின் மகாநாம தேரர் (கி.பி. 5 ஆம் நூற்றாண்டு)' } },
        { id: 'opt-2', text: { en: 'Ven. Walpola Rahula Thero', si: 'වල්පොල රාහුල හිමි', ta: 'வால்பொல ராஹுல தேரர்' } },
        { id: 'opt-3', text: { en: 'King Dutugemunu', si: 'දුටුගැමුණු රජු', ta: 'துட்டகைமுனு மன்னன்' } },
        { id: 'opt-4', text: { en: 'English chronicler Robert Knox', si: 'ඉංග්‍රීසි ජාතික රොබට් නොක්ස්', ta: 'ரொபர்ட் நொக்ஸ்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Ven. Mahanama Thero authored the first 37 chapters of the Mahavamsa at the Diksanda Senevi Pirivena of the Mahavihara in Anuradhapura during the 5th century CE, drawing upon older Sinhala-Atthakatha commentaries.',
        si: 'ක්‍රි.ව. 5 වන සියවසේදී අනුරාධපුර මහා විහාරයේ දික්සඳ සෙනවියා පිරිවෙනේ වැඩවිසූ මහානාම හිමියන් විසින් සීහලට්ඨකථා ආශ්‍රයෙන් මහාවංශයේ මුල් පරිච්ඡේද 37 රචනා කරන ලදී.',
        ta: 'கி.பி. 5 ஆம் நூற்றாண்டில் அநுராதபுர மகா விகாரையில் வாழ்ந்த மகாநாம தேரரால் பழைய சிங்கள அட்டகதைகளை அடிப்படையாகக் கொண்டு மகாவம்சத்தின் முதல் பகுதி இயற்றப்பட்டது.',
      },
      syllabusReference: 'Grade 10 History — Chapter 1: Sources of Studying History (Textbook p. 1–3)',
    }
  },
  {
    id: 'hist-src-2',
    stepNumber: 2,
    title: {
      en: 'Inscriptions (Sellipi) & Epigraphy Media',
      si: 'සෙල්ලිපි සහ අභිලේඛන මාධ්‍ය',
      ta: 'கல்வெட்டுகளும் கல்வெட்டு ஊடகங்களும்',
    },
    concept: {
      en: 'Inscriptions (Sellipi / Shilalipi) are ancient writings engraved on stone, categorized by stone shape: Cave inscriptions (ලෙන් ලිපි), Rock inscriptions (ගිරි ලිපි), Pillar inscriptions (ටැම් ලිපි), Slab inscriptions (පුවරු ලිපි), and Seat inscriptions (ආසන ලිපි). The oldest are Brahmi cave inscriptions from the 3rd century BCE recording cave donations to Buddhist monks ("සඟසතු කර ලෙන් පූජා කිරීම"). Epigraphy media also include walls (Sigiriya Graffiti), copper plates (Panakaduwa), and gold plates (Vallipuram).',
      si: 'ගල් මත කොටන ලද ලේඛන සෙල්ලිපි නම් වේ. ගල්වල හැඩය අනුව ප්‍රධාන වර්ග 5කි: ලෙන් ලිපි, ගිරි ලිපි, ටැම් ලිපි, පුවරු ලිපි සහ ආසන ලිපි. මෙරට පැරණිතම සෙල්ලිපි වන්නේ ක්‍රි.පූ. 3 වන සියවසේ මහා සංඝරත්නයට ලෙන් පූජා කිරීම වාර්තා කළ බ්‍රාහ්මී ලෙන් ලිපි වේ. අභිලේඛන මාධ්‍ය ලෙස ගල් (ගල්පොත සෙල්ලිපිය), බිත්ති (සීගිරි කුරුටු ගී), තඹ පත් (පනාකඩුව තඹ සන්නස) සහ රන් පත් (වල්ලිපුරම් රන් පත) භාවිත වී ඇත.',
      ta: 'கற்களில் பொறிக்கப்பட்ட எழுத்துக்கள் கல்வெட்டுகள் (Sellipi) எனப்படும். பாறையின் வடிவம் சார்ந்து 5 வகைகள்: குகைக் கல்வெட்டுகள், பாறைக் கல்வெட்டுகள், தூண் கல்வெட்டுகள், பலகைக் கல்வெட்டுகள் மற்றும் ஆசனக் கல்வெட்டுகள். கி.மு. 3 ஆம் நூற்றாண்டில் பௌத்த துறவிகளுக்கு குகைகளை தானமாக வழங்கியதை பதிவு செய்த பிராமி குகைக் கல்வெட்டுகளே நாட்டின் மிகப்பழைய கல்வெட்டுகளாகும்.',
    },
    visualCard: {
      title: '5 Types of Inscriptions by Stone Shape',
      diagramType: 'infographic',
      content: '1. Cave (ලෙන්)  •  2. Rock (ගිරි)  •  3. Pillar (ටැම්)  •  4. Slab (පුවරු)  •  5. Seat (ආසන)',
      caption: 'Textbook Table 1.4: Media of Epigraphy across Ancient Sri Lanka.'
    },
    realWorldExample: {
      en: 'In Mihintale and Dambulla, ancient cave drip-ledges (කටාරම්) still clearly display 2,200-year-old Early Brahmi inscriptions recording pious donations to Buddhist monks by royal chieftains (Parumaka) and village heads (Gamika).',
      si: 'මිහින්තලේ සහ දඹුල්ලේ ලෙන් කටාරම් යට අදටත් පැහැදිලිව දකින්නට ඇති ක්‍රි.පූ. 3 වන සියවසේ බ්‍රාහ්මී සෙල්ලිපි මඟින් ප්‍රාදේශීය ප්‍රධානීන් (පරුමක) සහ ගම් ප්‍රධානීන් (ගාමිණී) කළ ලෙන් පූජාවන් සනාථ වේ.',
      ta: 'மிஹிந்தலை மற்றும் தம்புள்ளை குகைகளின் கீழ் 2200 ஆண்டுகள் பழமையான பிராமி கல்வெட்டுகள் பௌத்த துறவிகளுக்கு குகைகள் தானமாக வழங்கப்பட்டதை இன்றும் காட்டுகின்றன.',
    },
    checkQuestion: {
      id: 'hist-src-q2',
      subjectId: 'history',
      topicId: 'history-gr10-sources',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'According to the Grade 10 History textbook, what are the five categories of stone inscriptions classified by stone shape?',
        si: '10 ශ්‍රේණිය ඉතිහාසය පෙළපොතට අනුව, ගල්වල හැඩය අනුව වර්ගීකරණය කරන ලද සෙල්ලිපි වර්ග 5 මොනවාද?',
        ta: 'தரம் 10 வரலாற்று பாடநூலின் படி, பாறைகளின் வடிவத்தை அடிப்படையாகக் கொண்ட 5 வகையான கல்வெட்டுகள் எவை?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Cave, Rock, Pillar, Slab, and Seat inscriptions', si: 'ලෙන් ලිපි, ගිරි ලිපි, ටැම් ලිපි, පුවරු ලිපි සහ ආසන ලිපි', ta: 'குகை, பாறை, தூண், பலகை மற்றும் ஆசனக் கல்வெட்டுகள்' } },
        { id: 'opt-2', text: { en: 'Palm-leaf, Papyrus, Metal plates, Clay bricks, and Wall paintings', si: 'පුස්කොළ, පැපිරස්, ලෝහ පත්, මැටි ගඩොල් සහ බිතුසිතුවම්', ta: 'ஓலைச்சுவடி, பப்பிரஸ், உலோகத் தகடுகள் மற்றும் சுவரோவியங்கள்' } },
        { id: 'opt-3', text: { en: 'Coins, Stupas, Irrigation Tanks, Statues, and Palaces', si: 'කාසි, ස්තූප, වාරි වැව්, පිළිම සහ මාළිගා', ta: 'நாணயங்கள், தூபிகள், குளங்கள், சிலைகள் மற்றும் அரண்மனைகள்' } },
        { id: 'opt-4', text: { en: 'Copper charters, Gold leaves, Silver reliquaries, and Timber beams only', si: 'තඹ සන්නස්, රන් පත්, රිදී කරඬු සහ ලී බාල්ක පමණි', ta: 'செப்புத் தகடுகள், தங்க ஏடுகள் மற்றும் மர உத்தரங்கள் மட்டுமே' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Official textbook classification (p. 3): Depending on the natural or prepared surface, inscriptions are divided into Cave (Len), Rock (Giri), Pillar (Tam), Slab (Puwaru), and Seat (Asana) inscriptions.',
        si: 'නිල පෙළපොතේ 3 පිටුවට අනුව සෙල්ලිපි ගලේ ස්වභාවය අනුව ලෙන් ලිපි, ගිරි ලිපි, ටැම් ලිපි, පුවරු ලිපි සහ ආසන ලිපි ලෙස වර්ග 5කට බෙදා දක්වයි.',
        ta: 'பாடநூலின் பக்கம் 3 இன் படி: குகை, பாறை, தூண், பலகை மற்றும் ஆசனக் கல்வெட்டுகள் என 5 பிரிவுகளாக வகைப்படுத்தப்படுகின்றன.',
      },
      syllabusReference: 'Grade 10 History — Chapter 1: Sources of Studying History (Textbook p. 3–5)',
    }
  },
  {
    id: 'hist-src-3',
    stepNumber: 3,
    title: {
      en: 'Numismatics: Ancient Coinage & Economic History',
      si: 'කාසි විද්‍යාව: පුරාණ කාසි සහ ආර්ථික ඉතිහාසය',
      ta: 'நாணயவியல்: பண்டைய நாணயங்களும் பொருளாதார வரலாறும்',
    },
    concept: {
      en: 'Numismatics (the study of coins) reveals ancient trade routes, economic prosperity, and metallurgical technology. In ancient Sri Lanka, the earliest currency was the punch-marked **Kahapana** (Purana / Elingas). Later local coins included Elephant and Swastika coins, Tree and Swastika coins, Lakshmi plaques, and gold Kahavanu. Foreign coins discovered in Sri Lanka (Roman, Persian Sassanian, Chinese Tang/Song Dynasty, and Arab dinars) prove vibrant international maritime Silk Road trade.',
      si: 'කාසි හැදෑරීමෙන් පැරණි වෙළඳ මාවත්, ආර්ථික සෞභාග්‍යය සහ ලෝහ තාක්ෂණය හෙළිවේ. පුරාණ ශ්‍රී ලංකාවේ මුල්ම කාසි වර්ගය හමස්පහන් හෙවත් **කහවණු (කහාපණ / පුරාණ)** වේ. පසුව ඇත්-ස්වස්තික, වෘක්ෂ-ස්වස්තික, ලක්ෂ්මි කාසි සහ රන් කහවණු භාවිත විය. මෙරටින් හමුවන විදේශීය කාසි (රෝම, පර්සියානු සසානියානු, චීන සහ අරාබි කාසි) පුරාණ මුහුදු සේද මාවතේ කේන්ද්‍රස්ථානයක් ලෙස ලංකාව පැවති බව සනාථ කරයි.',
      ta: 'நாணயங்களை ஆராய்வதன் மூலம் பண்டைய வர்த்தக வழிகள், பொருளாதார நிலை மற்றும் உலோகத் தொழில்நுட்பத்தை அறியலாம். இலங்கையின் ஆரம்பகால நாணயமாக **கஹாபண (Kahapana)** விளங்கியது.',
    },
    visualCard: {
      title: 'Ancient Sri Lankan Coinage Progression',
      diagramType: 'infographic',
      content: 'Punch-Marked Kahapana (3rd C. BCE) ➔ Lakshmi Plaques ➔ Roman Imports ➔ Gold Kahavanu',
      caption: 'Found extensively along trade hubs at Mantai, Godawaya, and Anuradhapura.'
    },
    realWorldExample: {
      en: 'Over 200,000 ancient Roman coins from emperors Nero, Constantine, and Arcadius have been found across Sri Lanka (from Sigiriya to Galle), proving Sri Lanka was the prime transshipment port of the ancient Indian Ocean.',
      si: 'සීගිරිය සහ ගාල්ල ඇතුළු ප්‍රදේශ රැසකින් නීරෝ, කොන්ස්ටන්ටයින් වැනි රෝම අධිරාජ්‍යවරුන්ගේ කාසි ලක්ෂ දෙකකට අධික ප්‍රමාණයක් හමුවීමෙන් පැරණි ඉන්දීය සාගරයේ ප්‍රධාන වෙළඳ මධ්‍යස්ථානයක් ලෙස ලංකාව පැවති බව ඔප්පු වේ.',
      ta: 'சிகிரியா மற்றும் காலி பகுதிகளில் ஆயிரக்கணக்கான உரோம நாணயங்கள் கண்டெடுக்கப்பட்டமை இலங்கையின் சர்வதேச வர்த்தக முக்கியத்துவத்தை காட்டுகிறது.',
    },
    checkQuestion: {
      id: 'hist-src-q3',
      subjectId: 'history',
      topicId: 'history-gr10-sources',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'What is the earliest indigenous punch-marked coin variety used for commercial trade in ancient Sri Lanka?',
        si: 'පුරාණ ශ්‍රී ලංකාවේ වාණිජ ගනුදෙනු සඳහා භාවිත කරන ලද පැරණිතම මුද්‍රා තැබූ (හමස්පහන්) කාසි වර්ගය කුමක්ද?',
        ta: 'பண்டைய இலங்கையில் வர்த்தகப் பரிமாற்றங்களுக்குப் பயன்படுத்தப்பட்ட ஆரம்பகால முத்திரை நாணய வகை எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Kahapana (Purana / Dharana)', si: 'කහාපණ (පුරාණ / හමස්පහන්)', ta: 'கஹாபண (Kahapana / Purana)' } },
        { id: 'opt-2', text: { en: 'Dutch VOC Copper Duit', si: 'ලන්දේසි VOC තඹ දුවිටු', ta: 'டச்சு VOC நாணயம்' } },
        { id: 'opt-3', text: { en: 'British Sterling Silver Shilling', si: 'බ්‍රිතාන්‍ය රිදී සිලිම', ta: 'பிரித்தானிய வெள்ளி ஷில்லிங்' } },
        { id: 'opt-4', text: { en: 'Portuguese Gold Cruzado', si: 'පෘතුගීසි රන් කෲසේඩෝ', ta: 'போர்த்துக்கேய பொற்காசு' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The earliest coin type in Sri Lanka is the Kahapana (also called Purana or Dharana), made of silver alloy stamped with symbols such as the sun, tree, and taurine, dating from the 3rd century BCE.',
        si: 'ක්‍රි.පූ. 3 වන සියවසේ සිට මෙරට භාවිත වූ පැරණිතම කාසි වර්ගය වන්නේ හිරු, වෘක්ෂය ආදී සංකේත මුද්‍රා තැබූ රිදී කහාපණ (පුරාණ) කාසි වේ.',
        ta: 'கி.மு. 3 ஆம் நூற்றாண்டிலிருந்து புழக்கத்திலிருந்த கஹாபண (Kahapana) நாணயங்களே இலங்கையின் மிகப்பழைய நாணய வகையாகும்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 1: Coins as an Archaeological Source (Textbook p. 6–7)',
    }
  },
  {
    id: 'hist-src-4',
    stepNumber: 4,
    title: {
      en: 'Preservation of Archaeological Heritage & In Situ Context',
      si: 'පුරාවිද්‍යා උරුමයන් සංරක්ෂණය සහ මුල් ස්ථානයේදීම (In Situ) රැකගැනීම',
      ta: 'தொல்பொருள் மரபுகளைப் பாதுகாத்தலும் அதன் முக்கியத்துவமும்',
    },
    concept: {
      en: 'Archaeological sources are non-renewable national treasures. When illicit treasure hunters dig up stupas or blast stone inscriptions with chemicals, the stratigraphic layer (stratigraphy) and contextual chronological evidence are permanently destroyed. Under the Antiquities Ordinance of Sri Lanka, defacing monuments is a serious non-bailable criminal offense.',
      si: 'පුරාවිද්‍යාත්මක මූලාශ්‍ර යනු නැවත නිර්මාණය කළ නොහැකි ජාතික උරුමයකි. නිධන් හොරුන් ස්තූප කැනීමෙන් හෝ සෙල්ලිපි වලට හානි කිරීමෙන් ඓතිහාසික කාල නිර්ණය සඳහා අවශ්‍ය පාංශු ස්ථරගත සාක්ෂි (Stratigraphy) සදහටම විනාශ වේ. පුරාවස්තු ආඥාපනත යටතේ ස්මාරක විනාශ කිරීම ඇප දිය නොහැකි බරපතළ වරදකි.',
      ta: 'தொல்பொருள் மூலாதாரங்கள் மீள உருவாக்க முடியாத தேசிய பொக்கிஷங்கள் ஆகும். சட்டவிரோத அகழ்வுகள் வரலாற்று காலக்கணிப்பிற்கு தேவையான படிவு சான்றுகளை அழிக்கின்றன.',
    },
    visualCard: {
      title: 'Stratigraphic In Situ Context',
      diagramType: 'diagram',
      content: 'Artifact + Undisturbed Soil Layer ➔ Accurate Scientific Dating (C-14 / Thermoluminescence)',
      caption: 'Once removed from its original layer, valuable chronological context is lost forever.'
    },
    realWorldExample: {
      en: 'When the Panakaduwa Copper Plate charter (පනාකඩුව තඹ සන්නස) was discovered in Morawaka by a farmer, it provided firsthand proof of King Vijayabahu I rewarding Lord Budalnavan for saving his life as an infant prince.',
      si: 'මොරවක ගොවියෙකුට හමුවූ පනාකඩුව තඹ සන්නස මඟින් පළමුවන විජයබාහු රජු ළමා වියේදී සිය ජීවිතය රැකදුන් බුදල්නාවන් සෙනෙවියාට ප්‍රශංසා කර කළ වරප්‍රසාද පූජාව පිළිබඳ සජීවී සාක්ෂි හෙළිවිය.',
      ta: 'பனக்கடுவ செப்புப் பட்டயம் முதலாம் விஜயபாகு மன்னன் தனது சிறுவயதில் உயிரைக் காப்பாற்றிய தளபதிக்கு வழங்கிய நன்றிக் கொடையை வெளிப்படுத்துகிறது.',
    },
    checkQuestion: {
      id: 'hist-src-q4',
      subjectId: 'history',
      topicId: 'history-gr10-sources',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Why is it critically important for archaeologists to study historical artifacts in their original location (in situ) rather than after looting or displacement?',
        si: 'පුරාවස්තු ඒවා පිහිටි මුල් ස්ථානයේදීම (In Situ) විද්‍යාත්මකව හැදෑරීම අත්‍යවශ්‍ය වන්නේ ඇයි?',
        ta: 'தொல்பொருட்களை அவை இருந்த அசல் இடத்திலேயே (In Situ) ஆராய்வது மிக முக்கியமானது ஏன்?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Displacement destroys the undisturbed soil layers (stratigraphy) necessary to determine exact chronological dating and cultural context', si: 'ස්ථානය වෙනස් කිරීමෙන් නිවැරදි කාල නිර්ණයට හා සංස්කෘතික පසුබිම හඳුනාගැනීමට අවශ්‍ය පාංශු ස්ථරගත සාක්ෂි (Stratigraphy) විනාශ වන බැවින්', ta: 'இடமாற்றம் செய்வது துல்லியமான காலக்கணிப்பிற்கு அவசியமான மண் படிவு சான்றுகளை (Stratigraphy) அழித்துவிடும் என்பதால்' } },
        { id: 'opt-2', text: { en: 'Stone inscriptions lose their religious magical powers if touched by modern archaeologists', si: 'නූතන විද්‍යාඥයින් ඇල්ලූ විට සෙල්ලිපි වල ගුප්ත බලය නැතිවී යන බැවින්', ta: 'நவீன ஆய்வாளர்கள் தொட்டால் கல்வெட்டுகளின் மாயம் போய்விடும் என்பதால்' } },
        { id: 'opt-3', text: { en: 'Ancient artifacts instantly evaporate if exposed to air', si: 'පුරාවස්තු වාතයට නිරාවරණය වූ වහාම ක්ෂණිකව වාෂ්ප වන බැවින්', ta: 'காற்று பட்டவுடன் தொல்பொருட்கள் ஆவியாகிவிடும் என்பதால்' } },
        { id: 'opt-4', text: { en: 'All ancient artifacts are radioactive and dangerous to transport', si: 'සියලුම පුරාවස්තු විකිරණශීලී බැවින් ප්‍රවාහනය කළ නොහැකි නිසා', ta: 'அனைத்து தொல்பொருட்களும் கதிரியக்கம் கொண்டவை என்பதால்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'In scientific archaeology, an artifact’s location within undisturbed soil layers (stratigraphy) gives it true historical meaning. Looting removes the item from its context, forever destroying scientific dating and cultural association.',
        si: 'විද්‍යාත්මක පුරාවිද්‍යාවේදී භාණ්ඩයක් හමුවන පාංශු ස්ථරය (Stratigraphy) මඟින් නිවැරදි කාලය තහවුරු කරයි. නිධන් සෙවීම නිසා මෙම විද්‍යාත්මක පසුබිම සදහටම අහිමි වේ.',
        ta: 'தொல்பொருளியலில் படிவு அடுக்குகள் மூலம் காலத்தை துல்லியமாக நிர்ணயிக்கலாம். இடம் மாற்றப்பட்டால் அந்த வரலாற்று சான்று முற்றிலும் அழிந்துவிடும்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 1: Protection of Archaeological Sources (Textbook p. 8–9)',
    }
  }
];

// ----------------------------------------------------------------------------
// CHAPTER 2: ANCIENT SETTLEMENTS (පුරාණ ජනාවාස)
// ----------------------------------------------------------------------------
export const TEACH_ME_HISTORY_SETTLEMENTS_STEPS: LessonStep[] = [
  {
    id: 'hist-set-1',
    stepNumber: 1,
    title: {
      en: 'Pre-Historic Hunter-Gatherers & The Balangoda Man',
      si: 'ප්‍රාග් ඓතිහාසික දඩයම්-එක්රැස්කිරීම් යුගය සහ බලංගොඩ මානවයා',
      ta: 'வரலாற்றுக்கு முற்பட்ட வேட்டையாடும் காலம் மற்றும் பலங்கொடை மனிதன்',
    },
    concept: {
      en: 'Sri Lanka\'s pre-historic era spans the Stone Age, represented by anatomically modern humans (*Homo sapiens balangodensis*). Habitation sites exist in wet zone cave shelters: **Pahiyangala (Fa-Hien Cave)** in Bulathsinhala (~38,000 BP), **Batadombalena** in Kuruwita, Beli-lena in Kitulgala, and open-air sites like Bellanbandi Palassa. They produced refined geometric microliths (චන්ද්‍රවංක ක්ෂුද්‍ර ශිලා මෙවලම්) from quartz and consumed wild breadfruit, canarium (Kekuna) nuts, and arboreal game.',
      si: 'ශ්‍රී ලංකාවේ ප්‍රාග් ඓතිහාසික යුගය නියෝජනය කරන්නේ **බලංගොඩ මානවයා (Homo sapiens balangodensis)** විසිනි. තෙත් කලාපයේ **පාහියංගල (බුලත්සිංහල)** ලෙනෙහි වසර 38,000කට පෙර සාක්ෂි හමුවී ඇත. කුරුවිට බටදොඹලෙන, කිතුල්ගල බෙලිලෙන සහ බෙල්ලන්බැඳි පැලැස්ස සෙසු ප්‍රධාන ස්ථාන වේ. ඔවුහු තිරුවාණා වලින් ජ්‍යාමිතික ක්ෂුද්‍ර ශිලා මෙවලම් තනා, වල් දෙල්, කැකුණ ඇට සහ ගස් උඩ වෙසෙන වඳුරන් දඩයම් කර ආහාරයට ගත්හ.',
      ta: 'இலங்கையின் வரலாற்றுக்கு முற்பட்ட காலத்தை **பலங்கொடை மனிதன்** பிரதிநிதித்துவப்படுத்துகிறான். பாகியன்கல குகையில் 38,000 ஆண்டுகளுக்கு முந்தைய சான்றுகள் கிடைத்துள்ளன.',
    },
    visualCard: {
      title: 'Pre-Historic Microlithic Culture',
      diagramType: 'infographic',
      content: 'Pahiyangala (38,000 BP) ➔ Quartz Geometric Microliths ➔ Arboreal Hunting & Foraging',
      caption: 'Proves continuous human habitation in Sri Lanka for tens of thousands of years.'
    },
    realWorldExample: {
      en: 'Excavations in the Batadombalena cave near Ratnapura revealed sea shell beads and shark teeth brought from the ocean over 80 km away, proving pre-historic inland humans engaged in barter exchange with coastal dwellers 30,000 years ago!',
      si: 'රත්නපුර කුරුවිට බටදොඹලෙන කැනීම්වලදී කි.මී. 80ක් ඈත මුහුදෙන් ගෙනෙන ලද මුහුදු බෙලි කටු සහ මෝර දත් හමුවීමෙන්, ප්‍රාග් ඓතිහාසික මිනිසුන් වෙරළබඩ වැසියන් සමඟ භාණ්ඩ හුවමාරු කරගත් බව ඔප්පු වේ!',
      ta: 'படகும்பலென குகையில் கடல்வாழ் சங்கு மணிகள் கண்டெடுக்கப்பட்டமை பண்டைய மனிதர்களின் பண்டமாற்று வர்த்தகத்தைக் காட்டுகிறது.',
    },
    checkQuestion: {
      id: 'hist-set-q1',
      subjectId: 'history',
      topicId: 'history-gr10-settlements',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which archaeological cave site in Sri Lanka has provided skeletal and cultural evidence of anatomically modern humans dating back approximately 38,000 years?',
        si: 'ශ්‍රී ලංකාවේ ආසන්න වශයෙන් වසර 38,000කට පෙර විසූ හෝමෝ සේපියන් මානව සාධක හමුවූ ප්‍රමුඛතම ස්වාභාවික ලෙන් සංකීර්ණය කුමක්ද?',
        ta: 'இலங்கையில் சுமார் 38,000 ஆண்டுகளுக்கு முற்பட்ட மனித எச்சங்களும் கலாசார சான்றுகளும் கண்டெடுக்கப்பட்ட வரலாற்று முக்கியத்துவம் வாய்ந்த குகை எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Pahiyangala (Fa-Hien Cave) in Bulathsinhala', si: 'බුලත්සිංහල පාහියංගල ලෙන', ta: 'புளத்சிங்கள பாகியன்கல குகை' } },
        { id: 'opt-2', text: { en: 'Sigiriya Rock Fortress', si: 'සීගිරිය පර්වත බලකොටුව', ta: 'சிகிரியா பாறை' } },
        { id: 'opt-3', text: { en: 'Polonnaruwa Vatadageya', si: 'පොළොන්නරුව වටදාගෙය', ta: 'பொலன்னறுவை வட்டதாகே' } },
        { id: 'opt-4', text: { en: 'Dambulla Golden Rock Temple', si: 'දඹුල්ල රජමහා විහාරය', ta: 'தம்புள்ளை ரஜமகா விகாரை' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Pahiyangala (Fa-Hien Cave) in Kalutara district is South Asia’s largest natural rock shelter, yielding stratified radiocarbon dates confirming human occupancy from 38,000 to 48,000 years BP.',
        si: 'කළුතර දිස්ත්‍රික්කයේ පිහිටි පාහියංගල ලෙන දකුණු ආසියාවේ විශාලතම ස්වාභාවික ගල් ලෙන වන අතර, කාබන්-14 කාල නිර්ණය අනුව වසර 38,000 කට එපිට විසූ මානව සාධක එහිදී තහවුරු විය.',
        ta: 'பாகியன்கல குகை தெற்காசியாவின் மிகப்பெரிய இயற்கை குகைகளில் ஒன்றாகும்; இங்கு 38,000 ஆண்டுகளுக்கு முந்தைய மனித வாழ்விடச் சான்றுகள் உறுதி செய்யப்பட்டுள்ளன.',
      },
      syllabusReference: 'Grade 10 History — Chapter 2: Ancient Settlements (Textbook p. 10–14)',
    }
  },
  {
    id: 'hist-set-2',
    stepNumber: 2,
    title: {
      en: 'Proto-Historic Megalithic Settlement & Iron Metallurgy',
      si: 'පූර්ව ඓතිහාසික මහා ශිලා සංස්කෘතිය සහ ලෝහ භාවිතය',
      ta: 'ஆதி வரலாற்றுக் கால பெருங்கற்கால கலாசாரமும் உலோக பயன்பாடும்',
    },
    concept: {
      en: 'The Proto-Historic Early Iron Age (~1000 BCE to 300 BCE) marked a revolutionary socio-economic transformation: transition from nomadic foraging to permanent sedentary farming. Key hallmarks include: **Megalithic Cist Cemeteries** (e.g. Ibbankatuwa near Dambulla, Pomparippu, Pinwewa), iron smelting metallurgy for agricultural ploughshares and weapons, **Black and Red Ware (BRW)** pottery with potters\' graffiti marks, and cultivation of wet-rice in small reservoir settlements.',
      si: 'පූර්ව ඓතිහාසික යුගයේදී (ක්‍රි.පූ. 1000 - ක්‍රි.පූ. 300) සංචාරක දඩයම් දිවියෙන් මිදී ස්ථිර ගොවිතැන් ජනාවාස බිහිවිය. ප්‍රධාන ලක්ෂණ: **මහා ශිලා සුසාන** (දඹුල්ල අසල ඉබ්බන්කටුව, පොම්පරිප්පුව), ලෝපස් උණුකර යකඩ ආයුධ හා ගොවි උපකරණ තැනීම, **කළු සහ රතු මැටි බඳුන් (BRW)** භාවිතය සහ කුඩා වැව් ආශ්‍රිත වී ගොවිතැනයි.',
      ta: 'ஆதி வரலாற்றுக் காலத்தில் (கி.மு. 1000 - கி.மு. 300) நாடோடி வாழ்க்கையிலிருந்து விடுபட்டு நிலையான விவசாயக் குடியேற்றங்கள் தோன்றின. **இப்பன்கட்டுவ பெருங்கற்கால மயானங்கள்** மற்றும் இரும்பு பயன்பாடு இதற்கு சான்றுகளாகும்.',
    },
    visualCard: {
      title: 'Megalithic Cist Tomb Architecture',
      diagramType: 'diagram',
      content: '4 Vertical Stone Slabs Form Box (Cist) ➔ Burial Urn with Ashes & Grave Goods ➔ Heavy Capstone Lid',
      caption: 'Demonstrates deep ancestral reverence and advanced quarrying engineering.'
    },
    realWorldExample: {
      en: 'At the Ibbankatuwa megalithic site along the Kurunegala-Dambulla highway, visitors can view open stone cist tombs containing clay urns filled with carnelian beads originating from Gujarat and onyx from Rajasthan, proving early maritime mercantile networks.',
      si: 'කුරුණෑගල-දඹුල්ල ප්‍රධාන මාර්ගයේ ඉබ්බන්කටුව සුසාන භූමියේදී ගල් පුවරු හතරකින් තැනූ සොහොන් ගැබ් තුළ ඉන්දියාවෙන් ආනයනය කළ කානිලියන් හා ඇගේට් පබළු තැන්පත් කර තිබූ අයුරු දැකගත හැක.',
      ta: 'இப்பன்கட்டுவ பெருங்கற்கால மயானத்தில் குஜராத் மற்றும் ராஜஸ்தானிலிருந்து தருவிக்கப்பட்ட கார்னீலியன் மணிகள் கண்டெடுக்கப்பட்டுள்ளன.',
    },
    checkQuestion: {
      id: 'hist-set-q2',
      subjectId: 'history',
      topicId: 'history-gr10-settlements',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'What architectural and material culture characterizes the Proto-Historic Early Iron Age site discovered at Ibbankatuwa near Dambulla?',
        si: 'දඹුල්ල අසල ඉබ්බන්කටුව ප්‍රදේශයෙන් හමුවූ පූර්ව ඓතිහාසික යකඩ යුගයට අයත් ජනාවාසයේ ප්‍රධාන සංස්කෘතික ලක්ෂණය කුමක්ද?',
        ta: 'தம்புள்ளைக்கு அருகிலுள்ள இப்பன்கட்டுவ ஆதி வரலாற்றுத் தளத்தில் காணப்படும் பிரதான கலாசார பண்பு எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Megalithic stone slab cist tombs containing Black and Red Ware (BRW) burial urns, iron tools, and carnelian beads', si: 'කළු සහ රතු මැටි බඳුන් (BRW), යකඩ ආයුධ සහ කානිලියන් පබළු තැන්පත් කළ මහා ශිලා ගල් පෙට්ටි (Cist) සොහොන් ගැබ්', ta: 'பெருங்கற்கால கல் பெட்டி மயானங்கள், கறுப்பு-சிவப்பு மட்பாண்டங்கள் (BRW) மற்றும் இரும்பு கருவிகள்' } },
        { id: 'opt-2', text: { en: 'Colossal polished marble pyramids without any metallic artifacts', si: 'කිසිදු ලෝහයක් නොමැති කිරිගරුඬ පිරමිඩ', ta: 'உலோகங்களற்ற பளிங்கு பிரமிடுகள்' } },
        { id: 'opt-3', text: { en: 'European style brick churches with pipe organs', si: 'යුරෝපීය ආකෘතියේ ගඩොල් දේවස්ථාන', ta: 'ஐரோப்பிய பாணி தேவாலயங்கள்' } },
        { id: 'opt-4', text: { en: 'Modern concrete high-rise foundations with glass artifacts only', si: 'වීදුරු සහිත නූතන කොන්ක්‍රීට් ගොඩනැගිලි අත්තිවාරම්', ta: 'நவீன கொன்கிரீட் கட்டட எச்சங்கள்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Ibbankatuwa is Sri Lanka\'s most prominent megalithic cist cemetery (~750 BCE). Deceased remains were cremated, placed inside terracotta burial urns together with iron weapons, copper rods, and beads, and sealed inside four-slab stone chambers.',
        si: 'ඉබ්බන්කටුව යනු ලංකාවේ ප්‍රමුඛතම මහා ශිලා සොහොන් බිමයි. ආදාහනය කළ අළු මැටි බඳුන්වල දමා, යකඩ උපකරණ හා පබළු සමඟ ගල් පුවරු හතරකින් තැනූ කුටීරවල තැන්පත් කර විශාල ගල් පියනකින් වසා තිබුණි.',
        ta: 'இப்பன்கட்டுவவில் பெருங்கற்கால பெட்டி வடிவ மயானங்கள் கண்டெடுக்கப்பட்டுள்ளன; இதில் மண்பாண்டங்கள், இரும்பு பொருட்கள் மற்றும் அணிகலன்கள் காணப்பட்டன.',
      },
      syllabusReference: 'Grade 10 History — Chapter 2: The Proto-Historic Era (Textbook p. 15–20)',
    }
  },
  {
    id: 'hist-set-3',
    stepNumber: 3,
    title: {
      en: 'Early Historic River Basin Settlements & The Dry Zone',
      si: 'මූල ඓතිහාසික ගංගා නිම්න ජනාවාස සහ වියළි කලාපය',
      ta: 'ஆரம்ப வரலாற்றுக் கால நதிக்கரை குடியேற்றங்களும் உலர் வலயமும்',
    },
    concept: {
      en: 'From around the 5th century BCE, human settlements expanded rapidly into the Dry Zone river valleys: the Malwathu Oya (Anuradhapura), Kala Oya, Deduru Oya, Mahaweli Ganga, and Walawe Ganga in the south (Ruhuna). Settlers chose dry zone plains because: 1. Flat terrain was ideal for large-scale paddy field (*Ketha*) construction, 2. Dense rainforests of the wet zone were difficult to clear with early iron axes, and 3. Reliable river water could be trapped in small village earth embankments.',
      si: 'ක්‍රි.පූ. 5 වන සියවසේ සිට ජනාවාස ප්‍රධාන ගංගා නිම්න ඔස්සේ වියළි කලාපය පුරා ව්‍යාප්ත විය: මල්වතු ඔය (අනුරාධපුරය), කලා ඔය, දැදුරු ඔය, මහවැලි ගඟ සහ දකුණේ වලවේ ගඟ (රුහුණ). වියළි කලාපය තෝරාගැනීමට හේතු: 1. කුඹුරු ගොවිතැනට සමතලා තැනිතලා භූමිය සුදුසු වීම, 2. තෙත් කලාපයේ ඝන වැසි වනාන්තර එළිපෙහෙළි කිරීමට වඩා වියළි කලාපය ගොවිතැනට පහසු වීම, සහ 3. වැසි ජලය කුඩා වැව් මඟින් රඳවා ගැනීමට හැකිවීම.',
      ta: 'கி.மு. 5 ஆம் நூற்றாண்டிலிருந்து குடியேற்றங்கள் உலர் வலய நதிக்கரைகளில் பரவின: மல்வத்து ஓயா (அநுராதபுரம்), கலா ஓயா, தெதुरु ஓயா, மகாவலி கங்கை மற்றும் வலவை கங்கை.',
    },
    visualCard: {
      title: 'River Basin Settlement Network',
      diagramType: 'infographic',
      content: 'Malwathu Oya ➔ Kala Oya ➔ Deduru Oya ➔ Mahaweli ➔ Walawe Ganga',
      caption: 'The cradle of the hydraulic agrarian civilization of Sri Lanka.'
    },
    realWorldExample: {
      en: 'Anuradhapura arose on the banks of the Malwathu Oya because small boat navigation down the river led directly to the international sea port of Mantai (Manthai/Mahatittha) in Mannar, connecting the inland kingdom to the global maritime Silk Road.',
      si: 'අනුරාධපුරය මල්වතු ඔය ඉවුරේ ස්ථාපනය වූයේ, එම ගඟ ඔස්සේ බෝට්ටු මඟින් මන්නාරමේ මහාතිත්ථ (මන්තායි) ජාත්‍යන්තර වරායට සෘජුවම ළඟාවී මුහුදු සේද මාවත හා සම්බන්ධ වීමට හැකි වූ බැවිනි.',
      ta: 'மல்வத்து ஓயா நதிக்கரையில் அநுராதபுரம் அமைந்ததால், மன்னாரின் மந்தை (Mantai) துறைமுகம் வழியே சர்வதேச கடல் வர்த்தகத்தை எளிதில் மேற்கொள்ள முடிந்தது.',
    },
    checkQuestion: {
      id: 'hist-set-q3',
      subjectId: 'history',
      topicId: 'history-gr10-settlements',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Why did early historic agricultural settlers in Sri Lanka concentrate predominantly along the river basins of the Dry Zone rather than the Wet Zone?',
        si: 'මූල ඓතිහාසික යුගයේ මුල් පදිංචිකරුවන් තෙත් කලාපයට වඩා වියළි කලාපීය ගංගා නිම්නවල සිය ජනාවාස සංකේන්ද්‍රණය කිරීමට ප්‍රධාන හේතුව කුමක්ද?',
        ta: 'ஆரம்ப வரலாற்றுக் கால குடியேற்றவாசிகள் ஈரவலயத்தை விட உலர் வலய நதிப் படுகைகளில் பெருமளவில் குடியேற பிரதான காரணம் என்ன?',
      },
      options: [
        { id: 'opt-1', text: { en: 'The vast flat lowlands were ideal for extensive wet-rice paddy fields and village tank irrigation, unlike the rugged dense wet-zone forests', si: 'තෙත් කලාපයේ ඝන වැසි වනාන්තර හා කඳුකර බෑවුම්වලට වඩා වියළි කලාපයේ සමතලා තැනිතලා බිම් කුඹුරු ගොවිතැනට සහ වැව් තැනීමට වඩාත් පහසු වූ බැවින්', ta: 'ஈரவலய அடர்ந்த காடுகளை விட உலர் வலய சமவெளி நிலங்கள் நெற்செய்கைக்கும் குளங்கள் அமைப்பதற்கும் மிகவும் பொருத்தமாக இருந்ததால்' } },
        { id: 'opt-2', text: { en: 'Because it never rained in the Dry Zone at any time of the year', si: 'වියළි කලාපයට වසරේ කිසිම දිනක වැසි නොලැබුණු බැවින්', ta: 'உலர் வலயத்தில் எப்போதுமே மழை பெய்யாது என்பதால்' } },
        { id: 'opt-3', text: { en: 'To escape foreign European naval artillery along the coastal borders', si: 'වෙරළබඩ යුරෝපීය කාලතුවක්කු ප්‍රහාර වලින් බේරීමට', ta: 'ஐரோப்பிய கடற்படை பீரங்கித் தாக்குதல்களிலிருந்து தப்ப' } },
        { id: 'opt-4', text: { en: 'Because rice can only germinate in frozen mountain glaciers', si: 'වී පැළවිය හැක්කේ හිම සහිත කඳු මුදුන් වල පමණක් වන නිසා', ta: 'பனி படர்ந்த மலைகளில் மட்டுமே நெல் முளைக்கும் என்பதால்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The Dry Zone offered wide alluvial plains easily cleared by early iron axes, gentle topographical slopes ideal for water retention in small village cascades, and rich mineral soils suited for paddy farming.',
        si: 'වියළි කලාපීය ගංගා නිම්නවල සමතලා භූමිය, යකඩ ආයුධ වලින් පහසුවෙන් එළිපෙහෙළි කළ හැකි වීම සහ වැසි ජලය කුඩා වැව්වල රඳවාගෙන කුඹුරු අස්වැද්දීමට තිබූ පහසුව මීට ප්‍රධාන හේතු විය.',
        ta: 'உலர் வலய நதிப் படுகைகள் சமவெளி நில அமைப்பைக் கொண்டிருந்ததால் நெற்செய்கைக்கும், குளங்களை அமைப்பதற்கும், ஆரம்பகால இரும்பு கருவிகளால் காடுகளை அழிப்பதற்கும் ஏதுவாக அமைந்தன.',
      },
      syllabusReference: 'Grade 10 History — Chapter 2: River Basin Settlements (Textbook p. 21–28)',
    }
  },
  {
    id: 'hist-set-4',
    stepNumber: 4,
    title: {
      en: 'Examination Synthesis: Chronological Horizons of Settlements',
      si: 'විභාග පෙරහුරුව: ජනාවාස විකාශනයේ යුග සාරාංශය',
      ta: 'பரீட்சை தொகுப்பு: குடியேற்றங்களின் வரலாற்று காலக்கோட்டு ஒப்பீடு',
    },
    concept: {
      en: 'For national G.C.E. O/L examination success, students must master the precise three-tier chronological sequence:\n1. **Pre-Historic Period:** Palaeolithic & Mesolithic stone tool users (Homo sapiens balangodensis, Pahiyangala, Batadombalena, microliths).\n2. **Proto-Historic Period:** Early Iron Age (Ibbankatuwa megalithic cists, Black and Red Ware pottery, iron smelting, early agrarian villages, ~1000–300 BCE).\n3. **Early Historic Period:** Emergence of written Brahmi inscriptions, centralized cities (Anuradhapura), large irrigation reservoirs, and Buddhist monastic architecture (from 3rd century BCE).',
      si: 'අ.පො.ස. සාමාන්‍ය පෙළ විභාගය සඳහා ජනාවාස ඉතිහාසයේ ප්‍රධාන යුග 3 නිවැරදිව හඳුනාගත යුතුය:\n1. **ප්‍රාග් ඓතිහාසික යුගය:** ක්ෂුද්‍ර ශිලා මෙවලම් භාවිත කළ බලංගොඩ මානවයා (පාහියංගල, බටදොඹලෙන).\n2. **පූර්ව ඓතිහාසික යුගය:** මුල් යකඩ යුගය (ඉබ්බන්කටුව මහා ශිලා සුසාන, කළු සහ රතු මැටි බඳුන්, ක්‍රි.පූ. 1000 - 300).\n3. **මූල ඓතිහාසික යුගය:** බ්‍රාහ්මී අක්ෂර ලේඛන, අනුරාධපුර නගරය, මහා වැව් සහ බුදුදහම ස්ථාපනය වීම (ක්‍රි.පූ. 3 වන සියවසේ සිට).',
      ta: 'பரீட்சை வெற்றிக்கான 3 முக்கிய காலப்பகுதிகள்:\n1. வரலாற்றுக்கு முற்பட்ட காலம் (பலங்கொடை மனிதன், நுண்கற்காலம்).\n2. ஆதி வரலாற்றுக் காலம் (பெருங்கற்காலம், இப்பன்கட்டுவ, இரும்பு யுகம்).\n3. ஆரம்ப வரலாற்றுக் காலம் (பிராமி கல்வெட்டுகள், அநுராதபுர நகரம், குளங்கள்).',
    },
    visualCard: {
      title: 'Sri Lankan Settlement Timeline',
      diagramType: 'infographic',
      content: 'Pre-Historic (~38,000 BP) ➔ Proto-Historic (~1000 BCE) ➔ Early Historic (~300 BCE onwards)',
      caption: 'Chronological framework established through scientific stratigraphy and Carbon-14 dating.'
    },
    realWorldExample: {
      en: 'Archaeological excavations in the Anuradhapura Citadel (ඇතුළු නුවර) directed by Dr. Siran Deraniyagala proved that continuous habitation layers existed directly underneath the royal palace dating from the Stone Age up to the medieval era!',
      si: 'ආචාර්ය සිරාන් දැරණියගල මහතාගේ මූලිකත්වයෙන් අනුරාධපුර ඇතුළු නුවර කළ විද්‍යාත්මක කැනීම්වලදී ප්‍රාග් ඓතිහාසික යුගයේ සිට මධ්‍යතන යුගය දක්වා අඛණ්ඩ මානව ජනාවාස තට්ටු එකම ස්ථානයකින් හමුවිය!',
      ta: 'அநுராதபுர உட்பகுதியில் மேற்கொள்ளப்பட்ட அகழ்வாராய்ச்சிகள் கற்காலம் முதல் இடைக்காலம் வரை தொடர்ச்சியான மனித வாழ்விடப் படிவுகளை நிரூபித்துள்ளன.',
    },
    checkQuestion: {
      id: 'hist-set-q4',
      subjectId: 'history',
      topicId: 'history-gr10-settlements',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which chronological sequence correctly orders the evolutionary stages of human settlements in Sri Lanka from earliest to latest?',
        si: 'ශ්‍රී ලංකාවේ මානව ජනාවාස විකාශනයේ නිවැරදි කාලානුක්‍රමික අනුපිළිවෙල කුමක්ද?',
        ta: 'இலங்கையில் மனிதக் குடியேற்றங்களின் வரலாற்று பரிணாம வளர்ச்சியை சரியாகக் குறிக்கும் காலவரிசை எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Pre-Historic Era (Microliths) ➔ Proto-Historic Era (Megalithic Cists & Iron) ➔ Early Historic Era (Brahmi Inscriptions & Cities)', si: 'ප්‍රාග් ඓතිහාසික යුගය (ක්ෂුද්‍ර ශිලා මෙවලම්) ➔ පූර්ව ඓතිහාසික යුගය (මහා ශිලා සුසාන හා යකඩ) ➔ මූල ඓතිහාසික යුගය (බ්‍රාහ්මී සෙල්ලිපි හා නගර)', ta: 'வரலாற்றுக்கு முற்பட்ட காலம் ➔ ஆதி வரலாற்றுக் காலம் ➔ ஆரம்ப வரலாற்றுக் காலம்' } },
        { id: 'opt-2', text: { en: 'Early Historic Era ➔ Pre-Historic Era ➔ Proto-Historic Era', si: 'මූල ඓතිහාසික යුගය ➔ ප්‍රාග් ඓතිහාසික යුගය ➔ පූර්ව ඓතිහාසික යුගය', ta: 'ஆரம்ப வரலாற்றுக் காலம் ➔ வரலாற்றுக்கு முற்பட்ட காலம் ➔ ஆதி வரலாற்றுக் காலம்' } },
        { id: 'opt-3', text: { en: 'Proto-Historic Era ➔ Industrial Factory Era ➔ Stone Age Caves', si: 'පූර්ව ඓතිහාසික යුගය ➔ කාර්මික යුගය ➔ ශිලා යුගයේ ලෙන්', ta: 'ஆதி வரலாற்றுக் காலம் ➔ தொழிற்புரட்சி காலம் ➔ கற்காலம்' } },
        { id: 'opt-4', text: { en: 'Colonial Maritime Rule ➔ Pre-Historic Microliths ➔ Proto-Historic Iron Age', si: 'යටත්විජිත යුගය ➔ ප්‍රාග් ඓතිහාසික යුගය ➔ පූර්ව ඓතිහාසික යුගය', ta: 'காலனித்துவ காலம் ➔ வரலாற்றுக்கு முற்பட்ட காலம் ➔ ஆதி வரலாற்றுக் காலம்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The definitive Sri Lankan archaeological chronology runs from the hunter-gatherer Pre-historic (Mesolithic/Palaeolithic) to the Early Iron Age Proto-historic, culminating in the literate Early Historic era marked by epigraphy.',
        si: 'නිවැරදි ඓතිහාසික කාලානුක්‍රමය වන්නේ දඩයම් යුගය වූ ප්‍රාග් ඓතිහාසික යුගය, යකඩ හා කෘෂිකර්මය ඇරඹි පූර්ව ඓතිහාසික යුගය සහ අක්ෂර කලාව බිහිවූ මූල ඓතිහාසික යුගයයි.',
        ta: 'சரியான காலவரிசை: வரலாற்றுக்கு முற்பட்ட காலம் (நுண்கற்காலம்) ➔ ஆதி வரலாற்றுக் காலம் (பெருங்கற்காலம், இரும்பு) ➔ ஆரம்ப வரலாற்றுக் காலம் (கல்வெட்டுகள், நகரங்கள்).',
      },
      syllabusReference: 'Grade 10 History — Chapter 2: Summary of Settlement Periods (Textbook p. 29–30)',
    }
  }
];

// ----------------------------------------------------------------------------
// CHAPTER 3: EVOLUTION OF POLITICAL POWER (දේශපාලන බලය විකාශනය වීම)
// ----------------------------------------------------------------------------
export const TEACH_ME_HISTORY_POLITICAL_POWER_STEPS: LessonStep[] = [
  {
    id: 'hist-pol-step-1',
    stepNumber: 1,
    title: {
      en: 'Pre-State Society: Gamika, Parumaka & Parumakalu',
      si: 'පූර්ව රාජ්‍ය යුගය: ගාමික, පරුමක සහ පරුමකලු නායකත්වය',
      ta: 'அரசுக்கு முற்பட்ட காலம்: காமிக, பருமக மற்றும் பருமகலு தலைமைத்துவம்',
    },
    concept: {
      en: 'Before the consolidation of a unified island-wide kingdom, leadership was decentralized among clan institutions. In early Brahmi cave inscriptions (3rd–2nd Century BCE), we encounter two foundational administrative titles: \n- **Gamika (ගාමික):** Village headman directing the local village tank (*Gama Wewa*) and coordinating agrarian labor.\n- **Parumaka (පරුමක):** Clan chieftain and landed nobility (representing prominent clans such as *Kabojha*, *Murundi*, and *Milaka*). Remarkably, numerous inscriptions record **Parumakalu (පරුමකලු)** — female clan leaders donating caves, proving women possessed exceptional civic status and autonomous property rights in early Sri Lanka!',
      si: 'මධ්‍යගත එක්සේසත් රාජ්‍යයක් බිහිවීමට පෙර දේශපාලන බලය විසිරී පැවතුණි. ක්‍රි.පූ. 3 වන සියවසේ මුල් බ්‍රාහ්මී ලෙන් ලිපිවල ප්‍රධාන තනතුරු දෙකක් හමුවේ:\n- **ගාමික (Gamika):** ගමේ වැව පාලනය කරමින් කෘෂිකාර්මික කටයුතු මෙහෙයවූ ගම් ප්‍රධානියා.\n- **පරුමක (Parumaka):** ප්‍රභූ ගෝත්‍ර ප්‍රධානීන් (කබෝජ, මුරුණ්ඩි ආදී). විශේෂයෙන්ම සෙල්ලිපි රැසක **පරුමකලු (Parumakalu)** නමින් කාන්තා ප්‍රධානීන් ලෙන් පූජා කළ බව සටහන්ව තිබීමෙන්, පුරාණ ලංකාවේ කාන්තාවන්ට ඉහළ සමාජ තත්ත්වයක් සහ දේපළ අයිතියක් තිබූ බව සනාථ වේ!',
      ta: 'ஒன்றிணைந்த அரசு உருவாவதற்கு முன் அரசியல் அதிகாரம் பரவலாக்கப்பட்டிருந்தது. பிராமி கல்வெட்டுகளில் **காமிக** (கிராமத் தலைவர்) மற்றும் **பருமக** (குலத் தலைவர்) என்ற பதவிகள் காணப்படுகின்றன. இதில் **பருமகலு** என்ற பெண் தலைவிகளும் குகைகளை தானமாக வழங்கியுள்ளனர்!',
    },
    visualCard: {
      title: 'Pre-State Clan Leadership',
      diagramType: 'infographic',
      content: 'Gamika (Village Head)  ➔  Parumaka / Parumakalu (Clan Chieftains)  ➔  Regional Clan Councils',
      caption: 'Epigraphic evidence from Mihintale, Dambulla, and Periyapuliyankulam caves.'
    },
    realWorldExample: {
      en: 'Cave inscriptions at Periyapuliyankulam in Vavuniya record a donation by "Parumakalu Rohini, wife of Parumaka Velu", documenting that female chieftains held independent status to dedicate multi-chambered rock shelters to the Sangha under their own names.',
      si: 'වවුනියාවේ පෙරියපුලියන්කුලම ලෙන් ලිපියක "පරුමක වේලුගේ බිරිඳ වූ පරුමකලු රෝහිණීගේ ලෙන" යනුවෙන් සටහන්ව ඇත්තේ කාන්තාවන්ට ස්වාධීනව දේපළ පැවරීමට තිබූ බලයයි.',
      ta: 'வவுனியா பெரியபுளியங்குளம் கல்வெட்டில் பருமகலு ரோகிணி தனது பெயரிலேயே குகையை தானமாக வழங்கியமை பதிவாகியுள்ளது.',
    },
    checkQuestion: {
      id: 'hist-pol-q1',
      subjectId: 'history',
      topicId: 'history-gr10-political-power',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which honorary title was engraved in early Brahmi cave inscriptions to designate regional clan chieftains and landed aristocracy prior to unified state formation?',
        si: 'එක්සේසත් රාජ්‍යයක් බිහිවීමට පෙර විසූ ප්‍රභූ ගෝත්‍ර ප්‍රධානීන් සහ ප්‍රාදේශීය නායකයින් හැඳින්වීමට මුල් බ්‍රාහ්මී ලෙන් ලිපිවල බහුලව භාවිත වූ ගෞරව නාමය කුමක්ද?',
        ta: 'ஒன்றிணைந்த அரசு தோன்றுவதற்கு முன் வாழ்ந்த பிராந்திய குலத் தலைவர்களையும் பிரபுக்களையும் குறிக்க பிராமி குகைக் கல்வெட்டுகளில் பயன்படுத்தப்பட்ட பட்டப்பெயர் எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Parumaka (and female chieftains as Parumakalu)', si: 'පරුමක (සහ කාන්තා ප්‍රධානීන් පරුමකලු)', ta: 'பருமக (பெண் தலைவர்கள் பருமகலு)' } },
        { id: 'opt-2', text: { en: 'Maha Adigar', si: 'මහා අදිකාරම්', ta: 'மகா அதிகாரம' } },
        { id: 'opt-3', text: { en: 'Rate Mahattaya', si: 'රටේ මහත්තයා', ta: 'ரட்டே மஹத்தயா' } },
        { id: 'opt-4', text: { en: 'Dissawa of Seven Korales', si: 'හත්කෝරළේ දිසාව', ta: 'ஹத்கோரள திசாவ' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The title "Parumaka" (derived from Sanskrit Pramukha, meaning chief/foremost) was used by regional clan rulers. The feminine form "Parumakalu" confirms the active leadership role of women.',
        si: 'ප්‍රමුඛ (ප්‍රධානියා) යන සංස්කෘත වචනයෙන් බිඳී ආ "පරුමක" නාමය ගෝත්‍ර ප්‍රධානීන් හැඳින්වූ අතර, කාන්තා ප්‍රධානීන් "පරුමකලු" ලෙස හැඳින්විණි.',
        ta: 'பிரமுக என்ற சொல்லிலிருந்து மருவிய "பருமக" என்பது குலத் தலைவர்களைக் குறித்தது. பெண் தலைவர்கள் "பருமகலு" என அழைக்கப்பட்டனர்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 3: Evolution of Political Power (Textbook p. 31–34)',
    }
  },
  {
    id: 'hist-pol-step-2',
    stepNumber: 2,
    title: {
      en: 'Sequential Evolution: Gamika ➔ Parumaka ➔ Aya ➔ Maharaja',
      si: 'දේශපාලන බලයේ විකාශන අනුපිළිවෙල: ගාමික ➔ පරුමක ➔ අය ➔ මහාරජ',
      ta: 'அரசியல் அதிகார வளர்ச்சிப் படிமுறை: காமிக ➔ பருமக ➔ அய ➔ மஹாராஜா',
    },
    concept: {
      en: 'The progression toward monarchical statehood followed four distinct evolutionary tiers: \n1. **Gamika (Village Level):** Administration of individual hamlets.\n2. **Parumaka (Clan/Territorial Level):** Elite chieftains governing clan valleys.\n3. **Aya & Gāmani (Regional Princely Level):** Consolidation of multiple clan territories under an *Aya* (revenue collector / district prince) or *Gāmani* (supreme regional military leader, e.g. Gamani Uttiya, Gamani Tissa).\n4. **Maharaja / Raja (National Monarchy):** Sovereign ruler wielding supreme legitimate authority over the realm, formally beginning with King Devanampiyatissa and consolidated nationwide by King Dutugemunu.',
      si: 'රාජ්‍යත්වයේ විකාශනය ප්‍රධාන අදියර 4ක් ඔස්සේ සිදුවිය:\n1. **ගාමික (ග්‍රාමීය මට්ටම):** තනි ගම්මාන පරිපාලනය.\n2. **පරුමක (ගෝත්‍රික ප්‍රාදේශීය මට්ටම):** ගෝත්‍රික නායකයින්.\n3. **අය සහ ගාමිණී (ප්‍රාන්ත මට්ටම):** ගෝත්‍ර කිහිපයක් එක්කළ ප්‍රාදේශීය කුමාරවරුන් (අය = ආදායම් පාලකයා) සහ ගාමිණී නායකයින්.\n4. **මහාරජ / රජ (එක්සේසත් රාජ්‍යය):** සමස්ත දිවයිනම එක්සේසත් කළ පරමාධිපත්‍ය බලය සහිත රජතුමා (දේවානම්පියතිස්ස සහ දුටුගැමුණු රජවරුන්ගෙන් තහවුරු විය).',
      ta: 'அரச உருவாக்கம் 4 படிகளில் நிகழ்ந்தது: காமிக (கிராமம்) ➔ பருமக (குலம்) ➔ அய / காமிணீ (பிராந்தியம்) ➔ மஹாராஜா (தேசிய அரசு).',
    },
    visualCard: {
      title: 'Evolution of Leadership Hierarchy',
      diagramType: 'infographic',
      content: 'Tier 1: Gamika  ➔  Tier 2: Parumaka  ➔  Tier 3: Aya / Gāmani  ➔  Tier 4: Maharaja (Ekasath)',
      caption: 'The four-stage path to centralized statehood in ancient Sri Lanka.'
    },
    realWorldExample: {
      en: 'The Tonigala rock inscription in Anamaduwa and the Mihintale drip-ledge inscriptions show this exact transition: earlier donors identify as Parumaka or Gamika, whereas later inscriptions refer to "Gamani Damaraja" and "Devanapiya Maharaja".',
      si: 'ආණමඩුව තෝණිගල සහ මිහින්තලා සෙල්ලිපි පරීක්ෂා කිරීමේදී මුල් යුගයේ පරුමක සහ ගාමික ලෙසත්, පසුව "ගාමිණී ධමරජ" සහ "දෙවනපිය මහාරජ" ලෙසත් පාලන නාමයන් උසස් වූ ආකාරය මනාව දැකගත හැක.',
      ta: 'தொணிகல மற்றும் மிஹிந்தலை கல்வெட்டுகளில் பருமக நிலையிலிருந்து மஹாராஜா நிலைக்கு தலைவர்கள் உயர்ந்தமை தெளிவாகப் பதிவாகியுள்ளது.',
    },
    checkQuestion: {
      id: 'hist-pol-q2',
      subjectId: 'history',
      topicId: 'history-gr10-political-power',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which sequential order accurately represents the historical evolution of political leadership titles in ancient Sri Lanka?',
        si: 'ශ්‍රී ලංකාවේ දේශපාලන නායකත්ව තනතුරු විකාශනය වූ නිවැරදි අනුපිළිවෙල කුමක්ද?',
        ta: 'பண்டைய இலங்கையில் அரசியல் தலைமைத்துவப் பட்டங்கள் பரிணாமமடைந்த சரியான வரிசை எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Gamika ➔ Parumaka ➔ Aya / Gāmani ➔ Maharaja (Raja)', si: 'ගාමික ➔ පරුමක ➔ අය / ගාමිණී ➔ මහාරජ (රජ)', ta: 'காமிக ➔ பருமக ➔ அய / காமிணீ ➔ மஹாராஜா' } },
        { id: 'opt-2', text: { en: 'Maharaja ➔ Gamika ➔ Dissawa ➔ Parumaka', si: 'මහාරජ ➔ ගාමික ➔ දිසාව ➔ පරුමක', ta: 'மஹாராஜா ➔ காமிக ➔ திசாவ ➔ பருமக' } },
        { id: 'opt-3', text: { en: 'Rate Mahattaya ➔ King ➔ Gamika ➔ Aya', si: 'රටේ මහත්තයා ➔ රජු ➔ ගාමික ➔ අය', ta: 'ரட்டே மஹத்தயா ➔ அரசன் ➔ காமிக ➔ அய' } },
        { id: 'opt-4', text: { en: 'Parumaka ➔ Adigar ➔ Maha Mudaliyar ➔ Raja', si: 'පරුමක ➔ අදිකාරම් ➔ මහා මුදලි ➔ රජු', ta: 'பருமக ➔ அதிகாரம ➔ மகா முதலியார் ➔ அரசன்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The NIE syllabus explicitly traces the evolution from village leader (Gamika) to clan chieftain (Parumaka), onward to regional prince (Aya/Gāmani), culminating in the sovereign national king (Maharaja).',
        si: 'විෂය නිර්දේශයට අනුව දේශපාලන විකාශනය ගම් ප්‍රධානියාගෙන් (ගාමික) ඇරඹී, ගෝත්‍ර නායකයා (පරුමක), ප්‍රාන්ත කුමාරයා (අය/ගාමිණී) හරහා එක්සේසත් රජතුමා (මහාරජ) දක්වා වර්ධනය විය.',
        ta: 'பாடத்திட்டத்தின் படி: கிராமத் தலைவர் (காமிக) ➔ குலத் தலைவர் (பருமக) ➔ பிராந்திய அரசன் (அய/காமிணீ) ➔ பேரரசன் (மஹாராஜா).',
      },
      syllabusReference: 'Grade 10 History — Chapter 3: Stages of State Formation (Textbook p. 34–37)',
    }
  },
  {
    id: 'hist-pol-step-3',
    stepNumber: 3,
    title: {
      en: 'Unification of the Island & Kingship under Buddhist Ethics',
      si: 'රට එක්සේසත් කිරීම සහ බෞද්ධ සදාචාරය මත පදනම් වූ රාජ්‍යත්වය',
      ta: 'நாட்டை ஒன்றிணைத்தலும் பௌத்த நெறிமுறையிலான அரசும்',
    },
    concept: {
      en: 'Before the 2nd century BCE, Sri Lanka was partitioned among petty regional chieftains. **King Dutugemunu (161–137 BCE)** accomplished the historic feat of **Ekasath Kirima** (uniting the three realms: Rajarata, Ruhuna, and Maya Rata under one royal umbrella) after defeating King Elara. The Buddhist concept of **Dharmaraja** (righteous king ruling via the Ten Royal Virtues) and **Mahasammata** (monarch appointed with consent of the people for collective protection) became the cornerstone of legitimate kingship.',
      si: 'ක්‍රි.පූ. 2 වන සියවසට පෙර රට ප්‍රාදේශීය පාලකයින් අතර බෙදී පැවතුණි. එළාර රජු පරාජය කරමින් රජරට, රුහුණ සහ මායා රට යන ත්‍රිසිංහලයම තනි ධවල ඡත්‍රයක් යටතට ගෙන **රට එක්සේසත් කළේ දුටුගැමුණු රජතුමාය (ක්‍රි.පූ. 161–137)**. බුදුදහම වැළඳගැනීමත් සමඟ රජු දසරාජ ධර්මයෙන් රට පාලනය කරන **ධර්මරාජයෙකු** බවටත්, ජනතා සම්මුතියෙන් පත්වූ **මහාසම්මත** නායකයෙකු බවටත් පත්විය.',
      ta: 'துட்டகைமுனு மன்னன் (கி.மு. 161–137) நாட்டை முதன்முறையாக ஒன்றிணைத்தார் (Ekasath Kirima). பௌத்த தர்மத்தின் வழியில் ஆட்சி செய்யும் தர்மராஜா கோட்பாடு உருவானது.',
    },
    visualCard: {
      title: 'Ekasath Kirima (Island Unification)',
      diagramType: 'infographic',
      content: 'Rajarata  +  Ruhuna  +  Maya Rata  ➔  United Under One Royal Parasol (King Dutugemunu 161 BCE)',
      caption: 'Secured national defense, cultural cohesion, and massive stupa construction (Ruwanweliseya).'
    },
    realWorldExample: {
      en: 'The construction of the colossal Ruwanweliseya (Mahathupa) in Anuradhapura was undertaken by King Dutugemunu without forced unpaid labor: historical records confirm the King paid gold and clothing wages to every artisan and builder!',
      si: 'අනුරාධපුර රුවන්වැලි මහා සෑය ඉදිකිරීමේදී දුටුගැමුණු රජු කිසිදු වැසියෙකුගෙන් නොමිලේ ශ්‍රමය ලබා නොගත් අතර, සියලු ශිල්පීන්ට සහ කම්කරුවන්ට රන් කහවණු හා ඇඳුම් පැළඳුම් වලින් පූර්ණ වැටුප් ගෙවීය!',
      ta: 'துட்டகைமுனு மன்னன் ருவன்வெலிசாய தூபியைக் கட்டிய போது எந்தவொரு தொழிலாளியிடமிருந்தும் கட்டாய ஊதியமற்ற உழைப்பைப் பெறவில்லை; அனைவருக்கும் ஊதியம் வழங்கப்பட்டது!',
    },
    checkQuestion: {
      id: 'hist-pol-q3',
      subjectId: 'history',
      topicId: 'history-gr10-political-power',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'How did the introduction of Buddhism fundamentally transform the moral philosophy of kingship in ancient Sri Lanka?',
        si: 'බුදුදහම මෙරටට හඳුන්වාදීමෙන් පසු රජවරුන්ගේ පාලන දර්ශනයෙහි සිදුවූ මූලික විප්ලවීය වෙනස කුමක්ද?',
        ta: 'பௌத்த மதத்தின் வருகைக்குப் பின்னர் பண்டைய இலங்கையில் மன்னர்களின் ஆட்சி தத்துவத்தில் ஏற்பட்ட அடிப்படை மாற்றம் யாது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'The monarch was expected to govern as a Dharmaraja (Righteous King) following the Ten Royal Virtues (Dasa Raja Dharma) and protect the Sambuddha Sasana', si: 'රජු දසරාජ ධර්මයට අනුකූලව ජනතාව පාලනය කරන ධර්මරාජයෙකු බවට පත්වෙමින් සම්බුද්ධ ශාසනය හා ජනතාව සුරැකීමට බැඳී සිටීම', ta: 'மன்னன் தசராஜ தர்மத்தின் படி ஆட்சி செய்யும் தர்மராஜாவாக மாறி பௌத்த சாசனத்தையும் மக்களையும் பாதுகாக்க கடமைப்பட்டார்' } },
        { id: 'opt-2', text: { en: 'The monarch became an absolute tyrant with divine right to seize all private lands without legal restrictions', si: 'කිසිදු නීතියකට යටත් නොවී සියලු ඉඩම් බලහත්කාරයෙන් පැහැරගන්නා ඒකාධිපතියෙකු බවට පත්වීම', ta: 'சட்ட திட்டங்களுக்கு உட்படாமல் அனைத்து நிலங்களையும் பறிக்கும் சர்வாதிகாரியாக மாறினார்' } },
        { id: 'opt-3', text: { en: 'The king abolished all armed defense forces and disbanded the royal treasury completely', si: 'හමුදාව සහ රාජකීය භාණ්ඩාගාරය සම්පූර්ණයෙන්ම විසුරුවා හැරීම', ta: 'படை மற்றும் திறைசேரியை முற்றாக கலைத்தார்' } },
        { id: 'opt-4', text: { en: 'Monarchs ceased agricultural irrigation construction and banned all overseas commerce', si: 'වාරි කර්මාන්තය හා විදේශ වෙළඳාම මුළුමනින්ම තහනම් කිරීම', ta: 'நீர்ப்பாசனம் மற்றும் வெளிநாட்டு வர்த்தகத்தை தடை செய்தார்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Buddhism introduced the concept that sovereignty is a moral trust: kings ruled as Dharmarajas, bound by Dasa Raja Dharma (charity, morality, non-violence, etc.) and pledged to serve the welfare of the Sangha and the people.',
        si: 'බුදුදහම නිසා රජු අසීමිත ඒකාධිපතියෙකු නොවී, දසරාජ ධර්මය රකිමින් ජනතාවගේ සහ ශාසනයේ සුබසිද්ධිය උදෙසා ක්‍රියාකරන ධර්මරාජයෙකු බවට පත්විය.',
        ta: 'பௌத்த நெறிமுறைகளின் படி மன்னன் தர்மராஜாவாக ஆட்சி செய்து மக்களின் நல்வாழ்விற்கும் பௌத்த சாசனத்தின் வளர்ச்சிக்கும் உழைக்க கடமைப்பட்டிருந்தார்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 3: Concepts of Kingship and Buddhist Influence (Textbook p. 38–41)',
    }
  },
  {
    id: 'hist-pol-step-4',
    stepNumber: 4,
    title: {
      en: 'Great Unifiers & Defense of Sovereignty',
      si: 'රට එක්සේසත් කළ ශ්‍රේෂ්ඨ රජවරු සහ ස්වෛරීභාවය රැකගැනීම',
      ta: 'நாட்டை ஒன்றிணைத்த பெரும் மன்னர்களும் சுதந்திரப் பாதுகாப்பும்',
    },
    concept: {
      en: 'Across Sri Lankan history, three monumental unifiers restored national sovereignty following foreign invasions:\n1. **King Dutugemunu (161 BCE):** Defeated Elara, unified Rajarata and Ruhuna, built Ruwanweliseya and Mirisawetiya.\n2. **King Valagamba (Vattagamani Abhaya, 1st Century BCE):** Defeated five invading Tamil chiefs after 14 years in exile, established Abhayagiri Vihara, and sponsored the transcription of the Tripitaka into writing at Aluvihara.\n3. **King Vijayabahu I (1070 CE):** Liberated the nation after 77 years of brutal Chola imperial occupation, shifting the capital to Polonnaruwa.',
      si: 'ශ්‍රී ලංකා ඉතිහාසයේ විදේශ ආක්‍රමණ පරාජය කර රට එක්සේසත් කළ ශ්‍රේෂ්ඨ රජවරු තිදෙනෙකි:\n1. **දුටුගැමුණු රජතුමා (ක්‍රි.පූ. 161):** එළාර පරාජය කර ත්‍රිසිංහලය එක්සේසත් කර රුවන්වැලි සෑය තැනවීම.\n2. **වළගම්බා රජතුමා (ක්‍රි.පූ. 1 වන සියවස):** වසර 14ක් සඟව සිට සත් ද්‍රවිඩයන් පලවාහැර අභයගිරිය තැනවීම සහ අළුවිහාරයේදී ත්‍රිපිටකය ග්‍රන්ථාරූඪ කිරීම.\n3. **පළමුවන විජයබාහු රජතුමා (ක්‍රි.ව. 1070):** වසර 77ක දරුණු චෝළ පාලනයෙන් රට මුදාගෙන පොළොන්නරුවේ අගනුවර පිහිටුවීම.',
      ta: 'நாட்டை மீட்டெடுத்த 3 பெரும் மன்னர்கள்: துட்டகைமுனு (கி.மு. 161), வலகம்பா (கி.மு. 1 ஆம் நூற்றாண்டு), முதலாம் விஜயபாகு (கி.பி. 1070).',
    },
    visualCard: {
      title: 'Three Great National Unifiers',
      diagramType: 'infographic',
      content: 'Dutugemunu (161 BCE) ➔ Valagamba (89 BCE) ➔ Vijayabahu I (1070 CE)',
      caption: 'Restored sovereignty, irrigation agriculture, and patronized the Buddhist dispensation.'
    },
    realWorldExample: {
      en: 'The Aluvihara Rock Cave Temple in Matale stands today as the site where King Valagamba\'s council of 500 monks transcribed the entire sacred Pali Buddhist Canon (Tripitaka) onto dried palm-leaf manuscripts (Ola leaves) for the first time in world history in the 1st century BCE!',
      si: 'මාතලේ අළුවිහාර ලෙන් විහාරයේදී ක්‍රි.පූ. 1 වන සියවසේ වළගම්බා රජුගේ අනුග්‍රහයෙන් මහා රහතන් වහන්සේලා විසින් ප්‍රථම වරට ත්‍රිපිටක ධර්මය පුස්කොළ පොත්වල ග්‍රන්ථාරූඪ කරන ලදී!',
      ta: 'மாத்தளை அலுவிஹாரையில் வலகம்பா மன்னனின் காலத்தில் திரிபிடகம் முதன்முதலில் ஓலைச்சுவடிகளில் எழுதப்பட்டது!',
    },
    checkQuestion: {
      id: 'hist-pol-q4',
      subjectId: 'history',
      topicId: 'history-gr10-political-power',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Under whose royal patronage was the sacred Buddhist Pali Canon (Tripitaka) transcribed into written manuscripts for the first time in history at Aluvihara, Matale?',
        si: 'මාතලේ අළුවිහාරයේදී ප්‍රථම වරට ත්‍රිපිටක ධර්මය පුස්කොළ පොත්වල ග්‍රන්ථාරූඪ කිරීම සිදු වූයේ කවර රජතුමාගේ රාජ්‍ය අනුග්‍රහය යටතේද?',
        ta: 'மாத்தளை அலுவிஹாரையில் எந்த மன்னனின் ஆட்சிக் காலத்தில் புனித பௌத்த திரிபிடகம் முதன்முதலில் நூலுருவில் எழுதப்பட்டது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'King Valagamba (Vattagamani Abhaya)', si: 'වට්ටගාමිණී අභය (වළගම්බා) රජු', ta: 'வடகாமினி அபய (வலகம்பா) மன்னன்' } },
        { id: 'opt-2', text: { en: 'King Mahasen', si: 'මහසෙන් රජු', ta: 'மகாசென் மன்னன்' } },
        { id: 'opt-3', text: { en: 'King Parakramabahu I', si: 'මහා පරාක්‍රමබාහු රජු', ta: 'மகா பராக்கிரமபாகு மன்னன்' } },
        { id: 'opt-4', text: { en: 'King Kirti Sri Rajasinha', si: 'කීර්ති ශ්‍රී රාජසිංහ රජු', ta: 'கீர்த்தி ஸ்ரீ ராஜசிங்க மன்னன்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'During the severe Beminitiya Seya famine in the 1st century BCE, King Valagamba facilitated 500 learned monks at Aluvihara in Matale to write down the oral Tipitaka onto ola leaves to preserve it for posterity.',
        si: 'ක්‍රි.පූ. 1 වන සියවසේ බැමිණිතියා සෑය සාගතයෙන් පසු ධර්මය අනාගතයට රැකදීම උදෙසා වළගම්බා රජුගේ රැකවරණය යටතේ මාතලේ අළුවිහාරයේදී ත්‍රිපිටකය ග්‍රන්ථාරූඪ කෙරිණි.',
        ta: 'கி.மு. 1 ஆம் நூற்றாண்டில் ஏற்பட்ட பஞ்சத்தைத் தொடர்ந்து தர்மத்தைப் பாதுகாக்க வலகம்பா மன்னனின் ஆதரவுடன் திரிபிடகம் ஓலைச்சுவடிகளில் எழுதப்பட்டது.',
      },
      syllabusReference: 'Grade 10 History — Chapter 3: Great Kings Who Unified Sri Lanka (Textbook p. 41–43)',
    }
  }
];

// ----------------------------------------------------------------------------
// CHAPTER 4: ANCIENT SRI LANKAN SOCIETY & ECONOMY (පැරණි සමාජය හා ආර්ථිකය)
// ----------------------------------------------------------------------------
export const TEACH_ME_HISTORY_ANCIENT_SOCIETY_STEPS: LessonStep[] = [
  {
    id: 'hist-soc-1',
    stepNumber: 1,
    title: {
      en: 'Village Structure & The Tank Culture (Wewa, Dagaba, Gama, Pansala)',
      si: 'ග්‍රාමීය ව්‍යුහය සහ වැවයි දාගැබයි ගමයි පන්සලයි සංකල්පය',
      ta: 'கிராமக் கட்டமைப்பும் குளம், தாதுகோபம், கிராமம், விகாரைக் கோட்பாடும்',
    },
    concept: {
      en: 'Traditional Sri Lankan agrarian society developed around the symbiotic quadruple relationship: Tank (Wewa), Stupa (Dagaba), Village (Gama), and Temple (Pansala). The tank provided year-round water for wet paddy cultivation (Mada Goyama) and domestic needs; the stupa and temple provided ethical and spiritual guidance. Communal labor (Kayya / ශ්‍රමදානය) united villagers to maintain canals, bunds, and cultivate fields harmoniously.',
      si: 'සාම්ප්‍රදායික ශ්‍රී ලාංකේය කෘෂිකාර්මික සමාජය ගොඩනැගුණේ "වැවයි දාගැබයි ගමයි පන්සලයි" යන චතුරංගික සංකල්පය මතය. වැව මඟින් කුඹුරු ගොවිතැනට (මඩ ගොවිතැන) සහ දෛනික පරිභෝජනයට ජලය සැපයූ අතර, දාගැබ සහ පන්සල ආධ්‍යාත්මික හා සදාචාරාත්මක මගපෙන්වීම ලබා දුන්නේය. ඇළවේලි හා වැව් බැමි නඩත්තු කිරීම සහ අස්වනු නෙළීම කයිය (ශ්‍රමදානය) මඟින් සාමූහිකව සිදු කෙරිණි.',
      ta: 'பாரம்பரிய இலங்கை விவசாய சமூகம் குளம், தாதுகோபம், கிராமம், விகாரை என்ற நால்வகை கட்டமைப்பில் வளர்ந்தது. குளம் நெற்செய்கைக்கும் அன்றாட தேவைகளுக்கும் நீர் வழங்கியது; தாதுகோபமும் விகாரையும் ஆன்மீக வழிகாட்டலை வழங்கின. வாய்க்கால்கள் மற்றும் குளங்களை பராமரிக்க மக்கள் கூட்டு உழைப்பைப் (கைய) பயன்படுத்தினர்.',
    },
    visualCard: {
      title: 'The Quadruple Harmony of Ancient Civilization',
      diagramType: 'infographic',
      content: 'Wewa (Life/Agriculture)  +  Gama (Community/Labor)  +  Dagaba (Spiritual Peace)  +  Pansala (Wisdom/Ethics)',
      caption: 'Textbook Chapter 4: Pillars of Ancient Sri Lankan Agrarian Life.'
    },
    realWorldExample: {
      en: 'In historic villages across the Dry Zone (such as around Anuradhapura and Polonnaruwa), every traditional purana village still retains its village tank at the top, terraced paddy fields below the bund, the residential hamlet, and the village temple situated peacefully beneath shady trees.',
      si: 'වියළි කලාපයේ (අනුරාධපුරය, පොළොන්නරුව අවට) පිහිටි පුරාණ ගම්මානවල අදටත් වැව ඉහළින්ද, වැව පාමුල කුඹුරු යායද, ඉන් ඔබ්බට ගම්මානය සහ ගම්මානය අද්දර පන්සලද පිහිටා තිබෙනු දැකගත හැකිය.',
      ta: 'உலர் வலய பாரம்பரிய கிராமங்களில் இன்றும் மேல் பகுதியில் குளம், குளத்தின் கீழ் நெல் வயல்கள், கிராம குடியிருப்புகள் மற்றும் விகாரை அமைந்திருப்பதை தெளிவாகக் காணலாம்.',
    },
    checkQuestion: {
      id: 'hist-soc-q1',
      subjectId: 'history',
      topicId: 'history-gr10-ancient-society',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'What historic Sri Lankan concept embodies the integrated harmony of economic sustenance, community life, and spiritual guidance in ancient agrarian society?',
        si: 'පැරණි ශ්‍රී ලාංකේය කෘෂිකාර්මික සමාජයේ ආර්ථික ස්වයංපෝෂිතභාවය, ප්‍රජා සාමූහිකත්වය සහ ආධ්‍යාත්මික ශික්ෂණය එකට බැඳුණු ඓතිහාසික සංකල්පය කුමක්ද?',
        ta: 'பண்டைய விவசாய சமூகத்தின் பொருளாதார தன்னிறைவு, சமூக ஒற்றுமை மற்றும் ஆன்மீக ஒழுக்கத்தை பிரதிபலிக்கும் வரலாற்று கோட்பாடு எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Wewa, Dagaba, Gama, and Pansala (Tank, Stupa, Village, Temple)', si: 'වැවයි දාගැබයි ගමයි පන්සලයි සංකල්පය', ta: 'குளம், தாதுகோபம், கிராமம், விகாரைக் கோட்பாடு' } },
        { id: 'opt-2', text: { en: 'Feudal European Manorial Estate System', si: 'යුරෝපීය වැඩවසම් මැනර් ක්‍රමය', ta: 'ஐரோப்பிய நிலப்பிரபுத்துவ முறை' } },
        { id: 'opt-3', text: { en: 'Industrial Plantation Capitalist Economy', si: 'කාර්මික වතු ධනවාදී ආර්ථිකය', ta: 'தொழில்துறை பெருந்தோட்ட முதலாளித்துவ முறை' } },
        { id: 'opt-4', text: { en: 'Mercantile Charter Monopoly System', si: 'වාණිජ ඒකාධිකාරී වෙළඳ ක්‍රමය', ta: 'வர்த்தக ஏகபோக முறை' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The "Wewa, Dagaba, Gama, and Pansala" paradigm represents the bedrock of ancient Sri Lankan civilization, symbolizing how material agricultural prosperity (Wewa/Gama) went hand-in-hand with spiritual, moral, and cultural development (Dagaba/Pansala).',
        si: '"වැවයි දාගැබයි ගමයි පන්සලයි" සංකල්පය මඟින් භෞතික කෘෂිකාර්මික සංවර්ධනයත් (වැව/ගම), ආධ්‍යාත්මික සදාචාර සම්පන්න ජීවන පැවැත්මත් (දාගැබ/පන්සල) අන්‍යෝන්‍ය වශයෙන් සමබරව පවත්වාගෙන ගිය ආකාරය මැනවින් විදහා දක්වයි.',
        ta: 'பண்டைய இலங்கையின் பௌதிக விவசாய வளர்ச்சியும் (குளம்/கிராமம்) ஆன்மீக கலாசார வளர்ச்சியும் (தாதுகோபம்/விகாரை) இணைந்து செயல்பட்டதன் அடித்தளமே "குளம், தாதுகோபம், கிராமம், விகாரை" கோட்பாடாகும்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 4: Ancient Social Organization and Values (Textbook p. 48–51)',
    }
  },
  {
    id: 'hist-soc-2',
    stepNumber: 2,
    title: {
      en: 'Craft Guilds (Puga / Sreni) & Occupational Specialization',
      si: 'වෘත්තීය විශේෂීකරණය සහ ශිල්ප ශ්‍රේණි (පූග)',
      ta: 'தொழில் நிபுணத்துவமும் கைவினைக் குழுக்களும் (பூக / சிரேணி)',
    },
    concept: {
      en: 'Ancient Sri Lankan society had an advanced division of labor. Specialized craftsmen formed autonomous trade organizations known in Brahmi inscriptions as "Puga" (පූග) or "Sreni" (ශ්‍රේණි). Key craft groups included metal smiths (Kammara), goldsmiths (Topara), potters (Kumbhakara), weavers (Pesakara), stone masons (Vaddhaki), and ivory carvers. Guilds maintained legal self-regulation, collected contributions, and deposited endowments in Buddhist viharas as recorded in the Perimiyankulama and Tonigala rock inscriptions.',
      si: 'පැරණි ශ්‍රී ලංකාවේ විවිධ වෘත්තිකයන් එක්ව සංවිධානය වූ ශිල්ප ශ්‍රේණි ක්‍රමයක් පැවතිණි. සෙල්ලිපිවල මේවා "පූග" හෝ "ශ්‍රේණි" ලෙස හැඳින්වේ. ප්‍රධාන ශිල්පීන්ට කම්මල්කරුවන් (කම්මාර), රන්කරුවන් (තෝපර), කුඹල්කරුවන් (කුම්භකාර), රෙදි වියන්නන් (පෙසකාර), ගල්වඩුවන් (වඩ්ඪකී) සහ ඇත්දත් ශිල්පීන් අයත් විය. මෙම ශ්‍රේණි ස්වාධීනව ක්‍රියාත්මක වූ අතර, පන්සල්වල ධාන්‍ය තැන්පත් කර පොලී ලබාගැනීමේ බැංකු කටයුතු පවා සිදුකළ බව තෝනිගල හා පෙරිමියන්කුලම සෙල්ලිපි පෙන්වා දෙයි.',
      ta: 'பண்டைய இலங்கையில் கைவினைஞர்கள் "பூக" அல்லது "சிரேணி" எனப்படும் தொழில் குழுக்களாக ஒழுங்கமைக்கப்பட்டிருந்தனர். கொல்லர், தட்டார், குயவர், நெசவாளர், சிற்பிகள் மற்றும் தந்த வேலை செய்வோர் இதில் அடங்குவர். இவர்கள் வங்கிகளைப் போல விகாரைகளில் வைப்புச் செய்து வட்டி பெற்று செயல்பட்டதை தோணிகல கல்வெட்டு காட்டுகிறது.',
    },
    visualCard: {
      title: 'Craft Guilds (Puga) in Ancient Inscriptions',
      diagramType: 'infographic',
      content: 'Kammara (Iron)  •  Topara (Gold)  •  Kumbhakara (Pottery)  •  Pesakara (Textiles)  •  Vaddhaki (Stonemasons)',
      caption: 'Epigraphical evidence of trade specialization and banking (Tonigala Inscription).'
    },
    realWorldExample: {
      en: 'The Tonigala Rock Inscription in Anamaduwa records how a merchant association deposited paddy, beans, and grains with a local guild bank so that the accrued annual interest would feed Buddhist monks during the Vassa retreat.',
      si: 'ආණමඩුව තෝනිගල සෙල්ලිපියේ සඳහන් වන්නේ වස් කාලයේදී භික්ෂූන් වහන්සේලාට දන් පැවැත්වීම සඳහා ප්‍රාදේශීය ශ්‍රේණි බැංකුවක වී, උඳු සහ මුං තැන්පත් කර ලැබෙන වාර්ෂික පොලිය යෙදවූ ආකාරයයි.',
      ta: 'ஆனமடுவ தோணிகல கல்வெட்டில் துறவிகளுக்கு அன்னதானம் வழங்க உள்ளூர் வணிகக் குழு வங்கியில் தானியங்கள் வைப்புச் செய்யப்பட்டு வட்டி பெறப்பட்ட விபரம் பொறிக்கப்பட்டுள்ளது.',
    },
    checkQuestion: {
      id: 'hist-soc-q2',
      subjectId: 'history',
      topicId: 'history-gr10-ancient-society',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'What were the autonomous professional trade and craft guilds known as in ancient Sri Lankan Brahmi rock inscriptions?',
        si: 'පැරණි ශ්‍රී ලාංකේය බ්‍රාහ්මී සෙල්ලිපිවල ස්වාධීනව සංවිධානය වූ වෘත්තීය හා ශිල්පී සංගම් හැඳින්වූයේ කුමන නමකින්ද?',
        ta: 'பண்டைய பிராமி கல்வெட்டுகளில் சுயாதீன தொழில் மற்றும் கைவினைக் குழுக்கள் எப்பெயரால் குறிப்பிடப்பட்டுள்ளன?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Puga or Sreni (පූග / ශ්‍රේණි)', si: 'පූග හෝ ශ්‍රේණි', ta: 'பூக அல்லது சிரேணி' } },
        { id: 'opt-2', text: { en: 'Dakapati', si: 'දකපති', ta: 'தகபதி' } },
        { id: 'opt-3', text: { en: 'Gam Sabha', si: 'ගම් සභා', ta: 'கிராம சபை' } },
        { id: 'opt-4', text: { en: 'Ratasabha', si: 'රට සභා', ta: 'ரட்ட சபை' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Ancient Sri Lankan craft associations were designated as "Puga" (Pali) or "Sreni" (Sanskrit), acting as powerful craft guilds with established business standards and financial deposit roles.',
        si: 'පැරණි සෙල්ලිපිවල වෘත්තිකයන්ගේ සංගම් "පූග" හෝ "ශ්‍රේණි" ලෙස හැඳින්වුණු අතර, ඔවුහු ශිල්පීය නීතිරීති ක්‍රියාත්මක කරමින් බැංකු හා ආර්ථික කටයුතුවල නිරත වූහ.',
        ta: 'பண்டைய பிராமி கல்வெட்டுகளில் கைவினைஞர்களின் சங்கங்கள் "பூக" அல்லது "சிரேணி" என அழைக்கப்பட்டன; இவை உற்பத்தி விதிகளையும் வங்கிப் பணிகளையும் மேற்கொண்டன.',
      },
      syllabusReference: 'Grade 10 History — Chapter 4: Economic Life and Craft Specialization (Textbook p. 52–54)',
    }
  },
  {
    id: 'hist-soc-3',
    stepNumber: 3,
    title: {
      en: 'Social Stratification & The Position of Women',
      si: 'සමාජ ස්ථරීභවනය සහ කාන්තාවගේ උසස් තත්ත්වය',
      ta: 'சமூகப் படிநிலையும் பெண்களின் உயர் நிலையும்',
    },
    concept: {
      en: 'Unlike the rigid caste system of ancient India, Sri Lankan social stratification was flexible and guided by Buddhist egalitarian ethics. Extended families (Kulaya) lived in mutual harmony. Women held high social status, property rights, and independent legal identity. Inscriptions show women donating caves, ponds, and lands to the Sangha under titles such as "Parumakalu" (පරුමකලු - female chieftain), "Abi" (අබි - royal noblewoman), and "Upasika" (උපාසිකා). Queens like Anula and Sugala exercised supreme military and political leadership.',
      si: 'ඉන්දියාවේ පැවති තදබල කුල ක්‍රමයට වඩා මෙරට සමාජය බෞද්ධ ආචාරධර්ම නිසා බොහෝ ලිහිල් ස්වභාවයක් ගත්තේය. විස්තෘත පවුල් ඒකක (කුලය) සාමූහිකව ජීවත් විය. කාන්තාවට ඉහළ සමාජ පිළිගැනීමක්, දේපළ අයිතියක් සහ නීතිමය ස්වාධීනත්වයක් තිබිණි. "පරුමකලු" (ප්‍රධාන කාන්තාව), "අබි" (කුමරිය) සහ "උපාසිකා" යන පදවි දරමින් කාන්තාවන් ස්වාධීනව ලෙන්, පොකුණු හා ඉඩම් සඟසතු කළ බව සෙල්ලිපි සනාථ කරයි. අනුලා බිසව සහ සුගලා දේවිය වැනි කාන්තාවෝ දේශපාලන හා යුද නායකත්වය පවා හෙබවූහ.',
      ta: 'இந்தியாவின் கடுமையான சாதிய அமைப்பைப் போலன்றி, இலங்கையின் சமூகம் பௌத்த நெறிகளினால் நெகிழ்வுத்தன்மை கொண்டதாக இருந்தது. பெண்களுக்கு சொத்துரிமையும் சமூக கௌரவமும் இருந்தது. "பருமகலு", "அபி", "உபாசிகா" போன்ற பட்டங்களுடன் பெண்கள் விகாரைகளுக்கு குகைகளையும் நிலங்களையும் தானமாக வழங்கியதை கல்வெட்டுகள் காட்டுகின்றன.',
    },
    visualCard: {
      title: 'High Status of Women in Early Epigraphy',
      diagramType: 'infographic',
      content: 'Parumakalu (Female Chieftain)  •  Abi (Princess/Noble)  •  Upasika (Religious Patron)  ➔  Property & Donation Rights',
      caption: 'Epigraphical evidence from Mihintale, Dambulla, and Periyapuliyankulam.'
    },
    realWorldExample: {
      en: 'In Periyapuliyankulam and Rajagala cave inscriptions, inscriptions explicitly state that caves were donated by female chieftains designated as "Parumakalu", proving women possessed wealth and independent civic decision-making powers over 2,200 years ago!',
      si: 'පෙරියපුලියන්කුලම සහ රාජගල ලෙන් ලිපිවල "පරුමකලු" යන ගෞරව නාමයෙන් කාන්තාවන් ස්වාධීනව මහා සංඝරත්නයට ලෙන් පූජා කළ බව සටහන්ව තිබීමෙන් වසර 2200කට පෙර මෙරට කාන්තාවන්ට පැවති ස්වාධීන දේපළ හිමිකම පැහැදිලි වේ!',
      ta: 'பெரியபுளியங்குளம் மற்றும் ராஜகல கல்வெட்டுகளில் "பருமகலு" என்ற தலைப்பில் பெண்கள் சொந்தமாக குகைகளை தானமாக வழங்கியமை அவர்கள் 2200 ஆண்டுகளுக்கு முன்பே சுதந்திரமான சொத்துரிமை பெற்றிருந்ததை நிரூபிக்கிறது!',
    },
    checkQuestion: {
      id: 'hist-soc-q3',
      subjectId: 'history',
      topicId: 'history-gr10-ancient-society',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'How does epigraphical evidence from ancient Brahmi cave inscriptions demonstrate the social and legal status of women in ancient Sri Lanka?',
        si: 'පැරණි බ්‍රාහ්මී සෙල්ලිපි මඟින් පැරණි ශ්‍රී ලංකාවේ කාන්තාව සතු වූ සමාජ හා නීතිමය තත්ත්වය ඔප්පු වන්නේ කෙසේද?',
        ta: 'பண்டைய பிராமி கல்வெட்டு ஆதாரங்கள் பண்டைய இலங்கையில் பெண்களின் சமூக மற்றும் சட்ட அந்தஸ்தை எவ்வாறு நிரூபிக்கின்றன?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Women held personal wealth, inherited property, and independently endowed caves and lands under titles like "Parumakalu" and "Abi"', si: 'කාන්තාවන් "පරුමකලු" සහ "අබි" වැනි පදවි දරමින් ස්වාධීන දේපළ හිමිකාරිත්වය සහිතව ලෙන් හා ඉඩම් සඟසතු කර පූජා කිරීම', ta: 'பெண்கள் "பருமகலு", "அபி" போன்ற பட்டங்களுடன் சொந்தமாக நிலங்களையும் குகைகளையும் தானமாக வழங்கியமை' } },
        { id: 'opt-2', text: { en: 'Women were legally barred from owning land or entering sacred temples', si: 'කාන්තාවන්ට ඉඩම් හිමිකම සහ පන්සල්වලට ඇතුළුවීම නීතියෙන් තහනම් කර තිබීම', ta: 'பெண்கள் நிலம் வைத்திருக்கவோ விகாரைகளுக்கு செல்லவோ தடை செய்யப்பட்டிருந்தமை' } },
        { id: 'opt-3', text: { en: 'Women were confined to domestic servitude without marriage rights', si: 'විවාහ අයිතියක් නොමැතිව ගෘහස්ථ දාසභාවයට පමණක් සීමා කර තිබීම', ta: 'பெண்கள் வீட்டு வேலைகளுக்கு மட்டுமே கட்டுப்படுத்தப்பட்டிருந்தமை' } },
        { id: 'opt-4', text: { en: 'Women were forbidden from learning to read or write', si: 'කාන්තාවන්ට අකුරු ලිවීම හෝ කියවීම මුළුමනින්ම තහනම් කර තිබීම', ta: 'பெண்களுக்கு எழுத்தறிவு முற்றிலும் தடை செய்யப்பட்டிருந்தமை' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Brahmi cave inscriptions frequently mention women holding titles like "Parumakalu" (female counterpart of Parumaka), confirming that women held significant independent wealth, land ownership, and societal prestige in ancient Sri Lanka.',
        si: 'සෙල්ලිපිවල "පරුමක" පදවියට සමාන කාන්තා නාමය වන "පරුමකලු" ලෙස කාන්තාවන් සඳහන්වීමෙන් පැහැදිලි වන්නේ පුරාණ ලංකාවේ කාන්තාවට ස්වාධීන දේපළ අයිතිය හා සමාජ පිළිගැනීමක් තිබූ බවයි.',
        ta: 'பிராமி கல்வெட்டுகளில் "பருமகலு" என்ற பட்டத்துடன் பெண்கள் குறிப்பிடப்பட்டிருப்பது, அவர்கள் சுதந்திரமான சொத்துரிமையையும் கௌரவத்தையும் பெற்றிருந்ததை தெளிவாக உறுதிப்படுத்துகிறது.',
      },
      syllabusReference: 'Grade 10 History — Chapter 4: Status of Women and Social Structure (Textbook p. 55–58)',
    }
  },
  {
    id: 'hist-soc-4',
    stepNumber: 4,
    title: {
      en: 'Internal Trade, Currency (Kahavanu) & Global Maritime Ports',
      si: 'දේශීය වෙළඳාම, කාසි (කහවණු) සහ ජාත්‍යන්තර වෙළඳ වරායවල්',
      ta: 'உள்நாட்டு வர்த்தகம், நாணயங்கள் (கஹவணு) மற்றும் சர்வதேச துறைமுகங்கள்',
    },
    concept: {
      en: 'Sri Lanka occupied the central hub of the Indian Ocean Maritime Silk Road. Internal commerce functioned through barter and punch-marked coins (Kahapana / Kahavanu). International trade flourished at famous ports:\n1. **Mantai (Mahatittha / Manthota):** Northwestern port connecting Rome, Persia, Arabia, and China.\n2. **Gokanna (Trincomalee):** Eastern natural deep-water bay trading with Southeast Asia.\n3. **Godawaya (Ambalantota):** Southern port where a 2nd-century CE rock inscription records customs port taxes donated to the Godapawatha Vihara.\nExports included sapphires, pearls, spices (cinnamon), elephants, and high-tensile steel.',
      si: 'ඉන්දියන් සාගරයේ සේද මාවතේ කේන්ද්‍රස්ථානය වූයේ ශ්‍රී ලංකාවයි. දේශීය වෙළඳාම හුවමාරු ක්‍රමය හා කහවණු කාසි භාවිතයෙන් සිදුවිය. ප්‍රධාන ජාත්‍යන්තර වරායවල්:\n1. **මහාතිත්ථ (මාන්තායි / මන්තොට):** බටහිර රෝමය, පර්සියාව, අරාබිය සහ නැගෙනහිර චීනය යා කළ වයඹදිග මහා වරාය.\n2. **ගෝකණ්න (ත්‍රිකුණාමලය):** අග්නිදිග ආසියාව සමඟ ගනුදෙනු කළ නැගෙනහිර ස්වාභාවික වරාය.\n3. **ගොඩවාය (අම්බලන්තොට):** ක්‍රි.ව. 2 වන සියවසේ සෙල්ලිපියකින් වරාය බදු ගොඩපවත විහාරයට පූජා කළ බව සනාථ වන දකුණුදිග වරාය.\nමැණික්, මුතු, කුරුඳු, අලි ඇතුන් සහ උසස් වානේ ප්‍රධාන අපනයන විය.',
      ta: 'இந்து சமுத்திர பட்டுப்பாதையின் முக்கிய மையமாக இலங்கை விளங்கியது. கஹபண நாணயங்கள் மற்றும் பண்டமாற்று மூலம் உள்நாட்டு வர்த்தகம் நடைபெற்றது. மாந்தை (வடமேற்கு), கோகர்ண (கிழக்கு), கொடவாய (தெற்கு) ஆகியவை முக்கிய சர்வதேச துறைமுகங்களாக விளங்கின. முத்து, மாணிக்கம், கறுவா மற்றும் யானைகள் ஏற்றுமதி செய்யப்பட்டன.',
    },
    visualCard: {
      title: 'Ancient Trade Ports & Maritime Network',
      diagramType: 'infographic',
      content: 'Mantai (Northwest)  •  Gokanna (East)  •  Godawaya (South)  ➔  Silk Road Maritime Crossroads',
      caption: 'Exports: Gems, Pearls, Cinnamon, Elephants, and High-Grade Iron.'
    },
    realWorldExample: {
      en: 'At the ancient port of Godawaya near the mouth of the Walawe River, marine archaeologists discovered the oldest shipwreck in the Asia-Pacific region (dating to the 2nd century BCE), laden with carnelian beads, raw glass ingots, and glazed ceramic jars!',
      si: 'වලවේ ගං මෝය අසල ගොඩවාය වරායේ සිදුකළ මුහුදු පුරාවිද්‍යා කැණීම්වලින් ආසියා පැසිෆික් කලාපයේ පැරණිතම නෞකා සුන්බුන් හමුවිය (ක්‍රි.පූ. 2 වන සියවස). එහි කානිලියන් පබළු, වීදුරු කුට්ටි සහ මැටි බඳුන් අඩංගු විය!',
      ta: 'வளவை ஆற்றின் முகத்துவாரத்தில் உள்ள கொடவாய துறைமுகத்தில் ஆசிய பசுபிக் பிராந்தியத்தின் மிகப்பழமையான கப்பல் சிதைவு (கி.மு. 2 ஆம் நூற்றாண்டு) அகழ்ந்தெடுக்கப்பட்டது!',
    },
    checkQuestion: {
      id: 'hist-soc-q4',
      subjectId: 'history',
      topicId: 'history-gr10-ancient-society',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which premier ancient northwestern port of Sri Lanka served as the vital international trading emporium connecting the Mediterranean Greco-Roman world with East Asia and China?',
        si: 'රෝම-ග්‍රීක බටහිර ලෝකයත්, නැගෙනහිර චීනයත් යා කරමින් පැරණි ශ්‍රී ලංකාවේ ප්‍රමුඛතම ජාත්‍යන්තර වෙළඳ මධ්‍යස්ථානය ලෙස ක්‍රියා කළ වයඹදිග වරාය කුමක්ද?',
        ta: 'ரோம கிரேக்க உலகத்தையும் கிழக்காசிய சீனாவையும் இணைத்து சர்வதேச வர்த்தக மையமாக விளங்கிய பண்டைய இலங்கையின் வடமேற்கு துறைமுகம் எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Mantai (Mahatittha / Manthota in Mannar)', si: 'මහාතිත්ථ (මාන්තායි / මන්තොට - මන්නාරම)', ta: 'மாந்தை (மகாதித்த / மந்தோட்டம் - மன்னார்)' } },
        { id: 'opt-2', text: { en: 'Galle International Harbor', si: 'ගාල්ල වරාය', ta: 'காலி துறைமுகம்' } },
        { id: 'opt-3', text: { en: 'Dambakola Patuna', si: 'දඹකොළපටුන', ta: 'தம்பகொளபடுன' } },
        { id: 'opt-4', text: { en: 'Colombo Fort Harbor', si: 'කොළඹ කොටුව වරාය', ta: 'கொழும்பு துறைமுகம்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Mantai (Mahatittha / Manthota), located near modern Mannar, was the premier international maritime transshipment port of ancient Sri Lanka, evidenced by Roman coins, Persian pottery, and Chinese porcelain excavated there.',
        si: 'මන්නාරම අසල පිහිටි මහාතිත්ථ (මාන්තායි) වරාය පැරණි ශ්‍රී ලංකාවේ ප්‍රධානතම ජාත්‍යන්තර වරාය වූ අතර, එහි තිබී රෝම කාසි, පර්සියානු මැටි බඳුන් සහ චීන පිඟන් මැටි බඳුන් හමුවී ඇත.',
        ta: 'மன்னார் அருகிலுள்ள மாந்தை துறைமுகமே இலங்கையின் பிரதான சர்வதேச வர்த்தக துறைமுகமாக விளங்கியது; இங்கு ரோமானிய நாணயங்கள் மற்றும் சீன பீங்கான்கள் அகழ்ந்தெடுக்கப்பட்டுள்ளன.',
      },
      syllabusReference: 'Grade 10 History — Chapter 4: Maritime Trade and Historic Ports (Textbook p. 59–63)',
    }
  }
];

// ----------------------------------------------------------------------------
// CHAPTER 5: SCIENCE & TECHNOLOGY IN ANCIENT SRI LANKA (පැරණි විද්‍යාව හා තාක්ෂණය)
// ----------------------------------------------------------------------------
export const TEACH_ME_HISTORY_SCIENCE_TECH_STEPS: LessonStep[] = [
  {
    id: 'hist-sci-1',
    stepNumber: 1,
    title: {
      en: 'The Cascade System (Ellangawa) & Anatomy of a Tank',
      si: 'එල්ලංගා වැව් පද්ධතිය සහ වැවක මූලික අංග',
      ta: 'தொடர் குளம் (எல்லங்காவ) அமைப்பும் குளத்தின் பிரதான கூறுகளும்',
    },
    concept: {
      en: 'Ancient Sri Lankans adapted to the dry zone using the Tank Cascade System (Ellangawa), recognized globally by the FAO as a GIAHS heritage system. A series of interconnected small village tanks stored rainwater upstream, moderating runoff, capturing silt and salinity, recharging groundwater, and feeding into larger reservoirs.\nEssential structural elements of an ancient reservoir:\n1. **Vev Bamma (Dam Bund):** Earthen embankment holding water.\n2. **Ralapanawa (Rip-rap):** Stone pitching along the inner embankment to cushion waves and prevent erosion.\n3. **Pitawana (Spillway):** Stone weir allowing excess floodwaters to safely escape without breaking the bund.\n4. **Sorowwa (Sluice):** Water discharge conduit.',
      si: 'වියළි කලාපයේ ජල හිඟයට පිළියමක් ලෙස එල්ලංගා වැව් පද්ධතිය (Cascade System) බිහිවිය. මෙය එක් ජල පෝෂක නිම්නයක ඉහළ සිට පහළට එකිනෙකට සම්බන්ධ වූ කුඩා වැව් මාලාවකි. මෙයින් රොන්මඩ සහ ලවණ පෙරා, භූගත ජලය සංරක්ෂණය කර පහළ පිහිටි මහා වැවට ජලය ලබා දුන්නේය.\nවැවක ප්‍රධාන අංග:\n1. **වැව් බැම්ම:** ජලය රඳවා තබන පස් බැම්ම.\n2. **රළපනාව:** වැව් දියේ රළ පහරින් වැව් බැම්ම ඛාදනය වීම වැළැක්වීමට ඇතුළු බැම්මේ අතුරන ලද ගල් තට්ටුව.\n3. **පිටවාන:** ගංවතුර කාලයේදී වැඩිපුර ජලය බැම්මට හානි නොකර පිටතට ගලා යාමට සකස් කළ ගල් බැම්ම.\n4. **සොරොව්ව:** කුඹුරුවලට අවශ්‍ය ජලය පාලනය කර බෙදාහරින විවරය.',
      ta: 'உலர் வலயத்தில் நீரை சேமிக்க எல்லங்காவ (தொடர் குளம்) அமைப்பு பயன்படுத்தப்பட்டது. இது ஐக்கிய நாடுகள் உணவு விவசாய அமைப்பால் (FAO) அங்கீகரிக்கப்பட்ட பாரம்பரிய முறையாகும். குளத்தின் முக்கிய கூறுகள்: குளக்கட்டு (அணைக்கட்டு), ரளபனாவ (அலைகளால் அணை உடைவதைத் தடுக்கும் கல் அடுக்கு), பிடவான (மேலதிக வெள்ள நீரை வெளியேற்றும் கல் வழிந்தோடி), மற்றும் சொரொவ்வ (நீர் மதகு).',
    },
    visualCard: {
      title: 'Anatomy of an Ancient Hydraulic Tank',
      diagramType: 'diagram',
      content: 'Vev Bamma (Bund)  •  Ralapanawa (Wave Buffer)  •  Pitawana (Spillway)  •  Sorowwa (Sluice)  •  Bisokotuwa (Cistern)',
      caption: 'Textbook Figure 5.2: Cross-section of an Ancient Irrigation Reservoir.'
    },
    realWorldExample: {
      en: 'Walk along the massive bund of Parakrama Samudra or Minneriya Tank: observe the thousands of interlocking granite stones laid along the inner water-facing bank—this is the Ralapanawa, still resisting wave impact after 1,500 years!',
      si: 'මහසෙන් රජුගේ මින්නේරිය වැවේ හෝ පරාක්‍රම සමුද්‍රයේ ඇතුළු බැම්ම නිරීක්ෂණය කළහොත්, අදටත් දැවැන්ත රළ පහරින් බැම්ම ආරක්ෂා කරන ක්‍රමානුකූලව අතුරන ලද කළුගල් කැටයම් සහිත රළපනාව දැකගත හැක!',
      ta: 'மின்னேரியா அல்லது பராக்கிரம சமுத்திரத்தின் உட்பகுதியில் அலைகளின் தாக்கத்திலிருந்து அணையைக் காக்க அடுக்கப்பட்டுள்ள கருங்கற்களே "ரளபனாவ" ஆகும்!',
    },
    checkQuestion: {
      id: 'hist-sci-q1',
      subjectId: 'history',
      topicId: 'history-gr10-science-tech',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'What is the primary technological function of the "Ralapanawa" (රළපනාව) built along the inner water-facing slope of an ancient Sri Lankan reservoir bund?',
        si: 'පැරණි ශ්‍රී ලංකාවේ වැව් බැම්මක ඇතුළු බෑවුමෙහි ගල් අතුරා සකස් කරන ලද "රළපනාව" මඟින් ඉටුවූ ප්‍රධාන කාර්යය කුමක්ද?',
        ta: 'பண்டைய குளங்களின் உட்புற அணையில் அமைக்கப்பட்டுள்ள "ரளபனாவ" இன் பிரதான தொழினுட்ப பணி யாது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'To absorb wave kinetic energy and prevent wave action from eroding the earthen embankment', si: 'වැවේ ජල රළ පහරින් පස් වැව් බැම්ම ඛාදනය වී සේදී යාම වැළැක්වීම', ta: 'நீரலைகளின் தாக்கத்தை தடுத்து மண் அணைக்கட்டு அரிப்படைவதைத் தடுத்தல்' } },
        { id: 'opt-2', text: { en: 'To act as an emergency spillway for excess monsoon floods', si: 'අධික ගංවතුර පිටකිරීමේ හදිසි වානක් ලෙස ක්‍රියාකිරීම', ta: 'அதிகப்படியான வெள்ள நீரை வெளியேற்றுதல்' } },
        { id: 'opt-3', text: { en: 'To filter out fine clay silt from entering the downstream canals', si: 'ඇළ මාර්ගවලට රොන්මඩ ඇතුළුවීම වැළැක්වීමේ පෙරහනක් වීම', ta: 'வண்டல் சேறு வாய்க்கால்களில் படிவதைத் தடுத்தல்' } },
        { id: 'opt-4', text: { en: 'To measure water depth fluctuations during dry droughts', si: 'නියං කාලයේදී ජල මට්ටම මැන බැලීම', ta: 'நீர் மட்டத்தை அளவிடுதல்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The Ralapanawa (stone rip-rap) was pitched with precision along the interior face of the earthen bund to absorb the shock of wind-generated waves, preserving the integrity of the embankment from catastrophic erosion.',
        si: 'රළපනාව යනු වැවේ සුළඟින් නැගෙන දරුණු රළ පහරින් වැව් බැම්මේ පස් සේදී යාම වළක්වා බැම්ම ශක්තිමත්ව රැකගැනීමට යෙදූ සුවිශේෂී ඉංජිනේරු නිර්මාණයකි.',
        ta: 'ரளபனாவ என்பது குளத்து நீரலைகளின் மோதலினால் மண் அணை உடைந்து விடாமல் பாதுகாக்க கருங்கற்களைக் கொண்டு அமைக்கப்பட்ட பாதுகாப்பு அமைப்பாகும்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 5: Hydraulic Technology and Irrigation Features (Textbook p. 66–69)',
    }
  },
  {
    id: 'hist-sci-2',
    stepNumber: 2,
    title: {
      en: 'The Bisokotuwa (Cistern Sluice): Mastery of Water Pressure',
      si: 'බිසෝකොටුව (ජල පීඩනය පාලනය කළ අසමසම ඉංජිනේරු නිර්මාණය)',
      ta: 'பிசோகொட்டுவ (நீர் அழுத்தத்தை கட்டுப்படுத்திய தலைசிறந்த மதகு பொறிமுறை)',
    },
    concept: {
      en: 'The Bisokotuwa (Cistern Sluice Gate), invented in Sri Lanka in the 3rd century BCE, is hailed by global hydraulic historians (such as Henry Parker and Joseph Needham) as an epochal invention. Without a Bisokotuwa, deep water pressure at the bottom of a large reservoir would blast through opening conduits, ripping open the earthen bund. The stone-lined cistern submerged in the tank bed traps water, creating a stilling well that kills kinetic hydrostatic pressure before water gently enters the underground stone conduit (Sorowwa) governed by a timber plug (Kərəlla / කැරැල්ල).',
      si: 'ක්‍රි.පූ. 3 වන සියවසේදී මෙරට වාරි ඉංජිනේරුවන් විසින් නිර්මාණය කරන ලද බිසෝකොටුව ලෝක වාරි ඉතිහාසයේ විප්ලවීය සොයාගැනීමකි (හෙන්රි පාකර් මහතා පෙන්වා දෙන්නේ නූතන කපාට කුටීරවල මූලාරම්භය බිසෝකොටුව බවයි). ගැඹුරු මහා වැව්වල පතුලේ ඇති අතිවිශාල ජල පීඩනය කෙළින්ම පිටතට මුදාහැරිය හොත් වැව් බැම්ම පුපුරා යයි. බිසෝකොටුව නම් ගල් කුටිය තුළට ජලය ලබාගෙන එහි පීඩනය බිඳ හෙළා, කැරැල්ල මඟින් ජල ප්‍රමාණය පාලනය කර බිම් සොරොව්ව හරහා ඇළ මාර්ගයට ආරක්ෂිතව ජලය මුදාහැරිණි.',
      ta: 'பிசோகொட்டுவ (மதகு தொட்டி) என்பது கி.மு. 3 ஆம் நூற்றாண்டில் இலங்கையில் கண்டுபிடிக்கப்பட்ட உலகப் புகழ்பெற்ற நீர்ப்பாசன சாதனமாகும். ஆழமான குளங்களின் அடியில் உள்ள அதிகப்படியான நீர் அழுத்தத்தை உள்வாங்கி அதன் வேகத்தை தணித்து வாய்க்கால்களுக்கு அமைதியாக நீரை அனுப்ப இது உதவியது. நவீன வால்வு அறைகளின் (Valve Pit) தாய் இதுவேயாகும்.',
    },
    visualCard: {
      title: 'Bisokotuwa: Hydrostatic Pressure Breaker',
      diagramType: 'diagram',
      content: 'Tank Deep Pressure ➔ Inflow ➔ Stone Cistern Chamber (Pressure Dissipated) ➔ Controlled Sluice Conduit Outflow',
      caption: 'Inventor of the Valve Pit: Documented by Henry Parker in "Ancient Ceylon".'
    },
    realWorldExample: {
      en: 'British hydraulic engineer Henry Parker stated that the Bisokotuwa was the true prototype of modern dam valve towers, functioning centuries before similar pressure-regulating cisterns appeared in the West!',
      si: 'බ්‍රිතාන්‍ය වාරි ඉංජිනේරු හෙන්රි පාකර් සඳහන් කළේ බටහිර ලෝකය කපාට කුටි සොයාගැනීමට සියවස් ගණනාවකට පෙර පැරණි සිංහල ඉංජිනේරුවන් බිසෝකොටුව මඟින් එම තාක්ෂණය ප්‍රගුණ කර තිබූ බවයි!',
      ta: 'நவீன அணைக்கட்டுகளில் பயன்படுத்தப்படும் வால்வு கோபுரங்களின் (Valve Tower) ஆரம்ப வடிவமே இலங்கையின் பிசோகொட்டுவ என பொறியியலாளர் ஹென்றி பார்க்கர் வியந்து போற்றுகிறார்!',
    },
    checkQuestion: {
      id: 'hist-sci-q2',
      subjectId: 'history',
      topicId: 'history-gr10-science-tech',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Why is the invention of the "Bisokotuwa" (Cistern Sluice) considered an unprecedented technological breakthrough in global hydraulic engineering?',
        si: 'ලෝක වාරි ඉංජිනේරු ඉතිහාසයේ සුවිශේෂී තාක්ෂණික සොයාගැනීමක් ලෙස "බිසෝකොටුව" සැලකෙන්නේ මන්ද?',
        ta: 'உலக நீர்ப்பாசன வரலாற்றில் "பிசோகொட்டுவ" ஒரு வரலாற்று முக்கியத்துவம் வாய்ந்த சாதனையாக கருதப்படுவது ஏன்?',
      },
      options: [
        { id: 'opt-1', text: { en: 'It absorbed and dissipated destructive high hydraulic pressure inside a stone chamber, allowing deep reservoirs to release water safely without rupturing the earthen dam', si: 'ගැඹුරු වැව් පතුලේ පවතින දැවැන්ත ජල පීඩනය ගල් කුටිය තුළදී බිඳ හෙළා පාලනය කර වැව් බැම්ම පුපුරා නොයන සේ ආරක්ෂිතව ජලය මුදාහැරීමට හැකිවීම', ta: 'ஆழமான குளத்தின் அதிஉயர் நீர் அழுத்தத்தை கல் தொட்டியினுள் குறைத்து அணை உடையாமல் பாதுகாப்பாக நீரை வெளியேற்ற முடிந்தமை' } },
        { id: 'opt-2', text: { en: 'It generated hydro-electric rotary power for industrial rice mills', si: 'වී මෝල් ක්‍රියාකරවීම සඳහා ජල විදුලි බලය උත්පාදනය කිරීම', ta: 'நீர் மின்சாரத்தை உற்பத்தி செய்ய உதவியமை' } },
        { id: 'opt-3', text: { en: 'It distilled saline mineral water into pure drinking water chemically', si: 'ලවණ සහිත ජලය රසායනිකව පානීය ජලය බවට පත්කිරීම', ta: 'உப்பு நீரை குடிநீராக மாற்றியமை' } },
        { id: 'opt-4', text: { en: 'It pumped water uphill using mechanical steam pistons', si: 'වාෂ්ප පිස්ටන් මඟින් උස් කඳු මුදුන්වලට ජලය පොම්ප කිරීම', ta: 'நீராவியால் இயங்கி மலை உச்சிக்கு நீரை ஏற்றியமை' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The Bisokotuwa revolutionized dam safety: by neutralizing the colossal kinetic hydrostatic pressure of deep water inside a granite cistern chamber, water could be released without washing away the earth bund.',
        si: 'බිසෝකොටුව මඟින් ජලයේ අතිමහත් ස්ථිතික පීඩනය බිඳ හෙළන ලද බැවින්, මහා වැව්වල බැමි කැඩී යාමකින් තොරව ජලය නිරවුල්ව කුඹුරුවලට මුදාහැරීමට ඉංජිනේරුවන්ට හැකිවිය.',
        ta: 'பிசோகொட்டுவ நீர் அழுத்தத்தை கட்டுப்படுத்தியதன் மூலம், பாரிய குளங்களை அமைத்து எந்தவித அணை உடைப்பு ஆபத்துமின்றி நீர்ப்பாசனத்தை மேற்கொள்ள முடிந்தது.',
      },
      syllabusReference: 'Grade 10 History — Chapter 5: Sluice Technology and the Bisokotuwa (Textbook p. 70–73)',
    }
  },
  {
    id: 'hist-sci-3',
    stepNumber: 3,
    title: {
      en: 'Low-Gradient Trans-Basin Canals (The 87km Jaya Ganga)',
      si: 'මිනුම් ශිල්පය සහ සූක්ෂ්ම බෑවුම් සහිත ඇළ මාර්ග (ජය ගඟ / යෝධ ඇළ)',
      ta: 'நில அளவீட்டு நுட்பமும் குறைந்த சாய்வு கால்வாய்களும் (87 கி.மீ. ஜய கங்கை)',
    },
    concept: {
      en: 'Ancient Sri Lankan surveyors possessed extraordinary surveying instruments (such as the water-level measuring device called "Dandubiduma" or Porakatuwa) enabling low-gradient trans-basin canal construction. The crowning achievement is the Jaya Ganga (Yoda Ela), constructed under King Dhatusena (5th Century CE). It carries water 87 km (54 miles) from Kala Wewa to Tissa Wewa across undulating topography with an astonishingly delicate slope of only 6 to 12 inches per mile (1 in 10,000)! This subtle slope prevented fast torrents from eroding the earthen banks while ensuring continuous water flow without stagnant silt deposits.',
      si: 'පැරණි ශ්‍රී ලාංකේය මිනින්දෝරුවරුන් සතුව ජල මට්ටම මනින සුවිශේෂී උපකරණ (දඬුබිඳුම / පොරකටුව) තිබිණි. මෙහි උසස්තම නිදසුන වන්නේ ධාතුසේන රජු (ක්‍රි.ව. 5 වන සියවස) තැනවූ ජය ගඟ (යෝධ ඇළ) ය. කලා වැවේ සිට තිසා වැව දක්වා සැතපුම් 54ක් (කි.මී. 87ක්) දිවෙන මෙම ඇළ මාර්ගයේ මුල් සැතපුම් 17 තුළ බැස්ම සැතපුමකට අඟල් 6ක් තරම් (1:10,000) අතිශය සියුම්ය! මෙයින් ඇළ බැම්ම ඛාදනය නොවී ජලය නිරවුල්ව අනුරාධපුරයට ගලා යාම සහතික විය.',
      ta: 'பண்டைய அளவையியலாளர்கள் "தண்டுபிந்தும" போன்ற நீர் மட்ட கருவிகளைக் கொண்டு மிக நுட்பமான சாய்வு கொண்ட கால்வாய்களை அமைத்தனர். தாதுசேன மன்னன் அமைத்த 87 கி.மீ. நீள ஜய கங்கை (யோத எல) கால்வாய் ஒரு மைலுக்கு 6 அங்குலம் மட்டுமே சாய்வைக் கொண்டு கலை நயத்துடன் அமைக்கப்பட்டது.',
    },
    visualCard: {
      title: 'Jaya Ganga Canal Engineering Precision',
      diagramType: 'infographic',
      content: 'Kala Wewa Reservoir  ➔  87 km Trans-Basin Canal  ➔  Slope: 6 inches per mile (1:10,000)  ➔  Tissa Wewa',
      caption: 'Achieved without modern laser levels: Flow velocity perfectly tuned to zero silt and zero erosion.'
    },
    realWorldExample: {
      en: 'Modern irrigation engineers testing the Jaya Ganga with modern digital laser leveling equipment confirmed that the ancient gradient of 6 inches per mile was the exact theoretical optimum required for water transport without bank scouring!',
      si: 'නූතන ඩිජිටල් ලේසර් උපකරණ භාවිතයෙන් ජය ගඟේ බෑවුම මැන බැලූ ඉංජිනේරුවන් තහවුරු කළේ, ඇළ ඉවුරු ඛාදනය නොවී ජලය ගලා යාමට අවශ්‍ය නිවැරදිම න්‍යායාත්මක බෑවුම පැරණි ඉංජිනේරුවන් සකසා තිබූ බවයි!',
      ta: 'நவீன லேசர் கருவிகளைக் கொண்டு ஜய கங்கையின் சாய்வை பரிசோதித்த பொறியியலாளர்கள், கால்வாய் கரையரிப்பு ஏற்படாமல் நீர் பாய்வதற்குரிய துல்லியமான சாய்வு அதுவென உறுதிப்படுத்தியுள்ளனர்!',
    },
    checkQuestion: {
      id: 'hist-sci-q3',
      subjectId: 'history',
      topicId: 'history-gr10-science-tech',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'What extraordinary surveying and hydraulic feat characterizes the ancient 87-kilometer Jaya Ganga (Yoda Ela) canal built by King Dhatusena?',
        si: 'ධාතුසේන රජතුමා ඉදිකළ කිලෝමීටර් 87ක් දිගැති ජය ගඟ (යෝධ ඇළ) සතු අසමසම ඉංජිනේරු හා මිනුම් වික්‍රමය කුමක්ද?',
        ta: 'தாதுசேன மன்னனால் அமைக்கப்பட்ட 87 கி.மீ. நீள ஜய கங்கை கால்வாயின் வியத்தகு பொறியியல் சாதனை யாது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'A miraculously minute gradient of roughly 6 inches per mile (1 in 10,000), preventing bank erosion while steadily transferring water across river basins', si: 'සැතපුමකට අඟල් 6ක (1:10,000ක) සියුම් බෑවුමක් පවත්වාගනිමින් ඉවුරු ඛාදනය නොවී නිම්න අතර ජලය රැගෙන යාම', ta: 'மைலுக்கு 6 அங்குலம் என்ற மிக நுட்பமான சாய்வைக் கொண்டு கரையரிப்பு ஏற்படாமல் நீரை கொண்டு சென்றமை' } },
        { id: 'opt-2', text: { en: 'It was tunneled entirely underground through deep volcanic rock', si: 'මුළුමනින්ම ගිනිකඳු පාෂාණ විද පොළොව යටින් උමං මාර්ගයක් ලෙස ඉදිකිරීම', ta: 'நிலத்தடி எரிமலைப் பாறைகளை குடைந்து அமைக்கப்பட்டமை' } },
        { id: 'opt-3', text: { en: 'It utilized reinforced concrete pipe conduits and steel valves', si: 'කොන්ක්‍රීට් බට සහ වානේ කපාට යොදාගෙන ඉදිකිරීම', ta: 'கொன்கிறீட் குழாய்கள் மற்றும் ஸ்டீல் வால்வுகளை பயன்படுத்தியமை' } },
        { id: 'opt-4', text: { en: 'It pumped water over the central mountains using steam boilers', si: 'වාෂ්ප බොයිලේරු මඟින් මධ්‍යම කඳුකරය හරහා ජලය ඉහළට පොම්ප කිරීම', ta: 'நீராவியால் இயங்கி மலை வழியே நீரை செலுத்தியமை' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The Jaya Ganga maintains an astounding gradient of 6 inches per mile over its first 17 miles, a testament to ancient Sri Lankan leveling instruments and mathematical precision.',
        si: 'ජය ගඟේ මුල් සැතපුම් 17 පුරා සැතපුමකට අඟල් 6ක බෑවුමක් පවත්වාගෙන යාමෙන් පැරණි මිනුම් ශිල්පීන්ගේ සූක්ෂ්ම විද්‍යාත්මක ඥානය ප්‍රකට වේ.',
        ta: 'ஜய கங்கையின் ஆரம்ப 17 மைல்களில் மைலுக்கு 6 அங்குலம் என்ற சாய்வை பேணியிருப்பது பண்டைய அளவையியலாளர்களின் கணித மற்றும் பொறியியல் துல்லியத்திற்கு சான்றாகும்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 5: Canal Engineering and Surveying (Textbook p. 74–77)',
    }
  },
  {
    id: 'hist-sci-4',
    stepNumber: 4,
    title: {
      en: 'Ancient Metallurgy: Wind-Powered Monsoon Smelting at Samanalawewa',
      si: 'පැරණි ලෝහ තාක්ෂණය: සමනලවැව සුළඟින් ක්‍රියාකළ යකඩ උදුන්',
      ta: 'பண்டைய உலோகவியல்: சமனலவெவ பருவக்காற்று இரும்பு உருக்கு உலைகள்',
    },
    concept: {
      en: 'Ancient Sri Lankans were pioneers of metallurgical engineering. At Samanalawewa in the Balangoda region, archaeologists (led by Dr. Gill Juleff) discovered hundreds of 7th–9th century CE iron-smelting furnaces built on the crests of western-facing mountain ridges. Instead of manual hand bellows, these furnaces used the natural aerodynamic force of the southwest monsoon winds. The wind created temperatures exceeding 1,200°C, producing high-carbon steel shipped across the Indian Ocean to forge legendary Damascus blades. In architecture, brick stupas like Jetavanaramaya (122m high, 93 million bricks) represented the world\'s largest brick structures.',
      si: 'පැරණි ශ්‍රී ලාංකිකයෝ ලෝහ තාක්ෂණයේ පුරෝගාමියෝ වූහ. ආචාර්ය ගිල් ජුලෙෆ් ඇතුළු පුරාවිද්‍යාඥයින් විසින් සමනලවැව ප්‍රදේශයෙන් 7-9 වන සියවස්වලට අයත් අද්විතීය යකඩ උදුන් සොයාගන්නා ලදී. කඳු වැටි මුදුන්වල බටහිරට මුහුණලා ඉදිකළ මෙම උදුන්වලට හුළං ගැසීමට මයිනහම් භාවිත නොකළ අතර, නිරිතදිග මෝසම් සුළඟේ ස්වාභාවික වායුගතික බලය කෙළින්ම උදුන තුළට ඇතුළු කරවන ලදී. එමගින් සෙල්සියස් අංශක 1200 ඉක්මවූ උෂ්ණත්වයක් ලබාගෙන ලොව සුප්‍රකට "දמשක් වානේ" නිපදවා අපනයනය කරන ලදී.',
      ta: 'பண்டைய இலங்கையர் உலோகவியலில் முன்னோடிகளாக விளங்கினர். சமனலவெவ பகுதியில் தென்மேற்கு பருவக்காற்றின் இயற்கையான வேகத்தைப் பயன்படுத்தி 1200°C வெப்பநிலையை உண்டாக்கி உயர்தர உருக்கு தயாரிக்கப்பட்டதை தொல்பொருள் ஆய்வாளர் கில் ஜூலெப் கண்டுபிடித்தார். இந்த உருக்கு உலகப் புகழ்பெற்ற டமாஸ்கஸ் வாள்களைச் செய்ய ஏற்றுமதி செய்யப்பட்டது.',
    },
    visualCard: {
      title: 'Monsoon Wind-Powered Iron Smelting',
      diagramType: 'diagram',
      content: 'SW Monsoon Gale Winds ➔ Curved Furnace Front ➔ 1200°C Intense Heat ➔ High-Carbon Damascus Steel',
      caption: 'Excavated at Samanalawewa (Published in "Nature", 1996).'
    },
    realWorldExample: {
      en: 'In 1996, British archaeologists reconstructed a full-scale replica furnace on a Samanalawewa ridge: when the monsoon winds blew, it successfully smelted iron into molten metal without any human bellows, proving the historical genius of ancient Sri Lankan metallurgists!',
      si: '1996 දී බ්‍රිතාන්‍ය පුරාවිද්‍යාඥයින් සමනලවැව කඳු මුදුනක මෙම උදුනක් ප්‍රතිනිර්මාණය කර මෝසම් සුළං හමන විට ක්‍රියාත්මක කළ අතර, කිසිදු මයිනහමකින් තොරව සාර්ථකව යකඩ උණුකර ලෝහ ලබාගැනීමට හැකිවිය!',
      ta: '1996 இல் தொல்பொருள் ஆராய்ச்சியாளர்கள் சமனலவெவ பகுதியில் இந்த உலை மாதிரியை மீண்டும் இயக்கிய போது, பருவக்காற்றினால் எந்தவித மனித உழைப்பு மின்றி இரும்பு உருக்கப்பட்டது நிரூபிக்கப்பட்டது!',
    },
    checkQuestion: {
      id: 'hist-sci-q4',
      subjectId: 'history',
      topicId: 'history-gr10-science-tech',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'What natural atmospheric force was ingeniously harnessed by ancient Sri Lankan metallurgists at Samanalawewa to smelt high-quality iron and steel?',
        si: 'සමනලවැව පැරණි ලෝහ ශිල්පීන් විසින් උසස් තත්ත්වයේ වානේ නිපදවීම සඳහා සුවිශේෂී ලෙස ප්‍රයෝජනයට ගන්නා ලද ස්වාභාවික ශක්තිය කුමක්ද?',
        ta: 'சமனலவெவ பகுதியில் உயர்தர இரும்பு மற்றும் உருக்கு தயாரிக்க பண்டைய உலோகவியலாளர்கள் பயன்படுத்திய இயற்கை சக்தி எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'The natural aerodynamic velocity of the Southwest Monsoon winds blowing across exposed mountain ridges', si: 'කඳු වැටි මතින් හමා ආ නිරිතදිග මෝසම් සුළඟේ ස්වාභාවික වායුගතික බලය', ta: 'மலை முகடுகளின் வழியே வீசிய தென்மேற்கு பருவக்காற்றின் வேகம்' } },
        { id: 'opt-2', text: { en: 'Underground geothermal volcanic steam chambers', si: 'භූගත ගිනිකඳු වාෂ්ප කුටීර', ta: 'நிலத்தடி புவிவெப்ப நீராவி' } },
        { id: 'opt-3', text: { en: 'Rotary waterwheels powered by rapid river waterfalls', si: 'දියඇලි මඟින් කැරකැවුණු දියරෝද බලය', ta: 'நீர்வீழ்ச்சியினால் சுழன்ற நீர்ச்சக்கரங்கள்' } },
        { id: 'opt-4', text: { en: 'Solar concentrating parabolic bronze mirrors', si: 'ලෝකඩ සූර්ය සාන්ද්‍රණ දර්පණ', ta: 'வெண்கல சூரிய குவி ஆடிகள்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Excavations at Samanalawewa proved that Sri Lankan metallurgists developed wind-powered furnaces using the southwest monsoon gales to achieve temperatures above 1,200°C, producing world-renowned high-tensile steel.',
        si: 'සමනලවැව කැණීම් මඟින් ඔප්පු වූයේ නිරිතදිග මෝසම් සුළඟේ බලය කෙළින්ම උදුන් තුළට ඇතුළු කරවා සෙල්සියස් අංශක 1200ක උෂ්ණත්වයක් ලබාගනිමින් විශිෂ්ට වානේ නිපදවීමට මෙරට ශිල්පීන් සමත් වූ බවයි.',
        ta: 'தென்மேற்கு பருவக்காற்றை உலைக்குள் செலுத்தி 1200°C வெப்பநிலையை உண்டாக்கி உலகப் புகழ்பெற்ற உருக்கை உற்பத்தி செய்யும் தனித்துவமான தொழில்நுட்பத்தை இலங்கையர் பயன்படுத்தினர்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 5: Metallurgy and Architecture (Textbook p. 78–82)',
    }
  }
];

// ----------------------------------------------------------------------------
// CHAPTER 6: PRACTICAL HISTORICAL KNOWLEDGE & HERITAGE CONSERVATION (ප්‍රායෝගික දැනුම හා උරුම සංරක්ෂණය)
// ----------------------------------------------------------------------------
export const TEACH_ME_HISTORY_PRACTICAL_KNOWLEDGE_STEPS: LessonStep[] = [
  {
    id: 'hist-prac-1',
    stepNumber: 1,
    title: {
      en: 'Archaeological Excavations & The Principle of Stratigraphy',
      si: 'පුරාවිද්‍යා කැණීම් ක්‍රමවේදය සහ ස්ථරීභවනය (Stratigraphy)',
      ta: 'தொல்பொருள் அகழ்வாராய்ச்சி முறைகளும் அடுக்குப்படிவியல் (Stratigraphy) கோட்பாடும்',
    },
    concept: {
      en: 'Archaeology reconstructs human past through systematic scientific investigation of material remains. In scientific excavations, archaeologists follow the Principle of Stratigraphy (Law of Superposition): in undisturbed geological layers, deeper soil layers are older than the upper layers. Dating methods include:\n- **Relative Dating:** Typology and seriation of pottery sherds and coins.\n- **Absolute Dating:** Radiocarbon (C-14) dating of organic matter (charcoal, bone) up to ~50,000 years, and Thermoluminescence (TL) for fired terracotta tiles and pottery.',
      si: 'පුරාවිද්‍යාව යනු මානවයාගේ අතීත භෞතික සාධක විද්‍යාත්මකව ගවේෂණය කරමින් අතීතය ප්‍රතිනිර්මාණය කරන විෂයයි. කැණීම්වලදී "ස්ථරීභවන න්‍යාය" (Principle of Stratigraphy) අනුගමනය කෙරේ: බාහිරින් කැළඹීමකට ලක් නොවූ පස් තට්ටු අතරින් ගැඹුරින්ම පිහිටි තට්ටුව පැරණිතම වන අතර, ඉහළින් පිහිටි තට්ටුව සාපේක්ෂව මෑත කාලීන වේ. කාල නිර්ණය කිරීමේ ක්‍රම:\n- **සාපේක්ෂ කාල නිර්ණය:** මැටි බඳුන් කැබලි සහ කාසිවල හැඩතල සැසඳීම.\n- **නිරපේක්ෂ කාල නිර්ණය:** කාබන්-14 (C-14) කාල නිර්ණය (අඟුරු හා ඇටසැකිලි වැනි කාබනික ද්‍රව්‍ය සඳහා) සහ තාපසංදීප්තතාව (TL) (පිලිස්සූ මැටි බඳුන් සඳහා).',
      ta: 'தொல்பொருளியல் என்பது மனித எச்சங்களை அறிவியல் ரீதியாக ஆராயும் துறையாகும். இதில் "அடுக்குப்படிவியல் கோட்பாடு" (Principle of Stratigraphy) பின்பற்றப்படுகிறது: தொந்தரவு செய்யப்படாத நிலப்பரப்பில் ஆழமான அடுக்குகள் பழையதாகவும், மேல் அடுக்குகள் புதியதாகவும் இருக்கும். காலத்தை கணிக்கும் முறைகள்: சார்பு காலக்கணிப்பு (மண்பாண்ட பாணிகள்) மற்றும் துல்லிய காலக்கணிப்பு (கதிரியக்க கார்பன்-14 முறை).',
    },
    visualCard: {
      title: 'Principle of Stratigraphy in Archaeological Excavations',
      diagramType: 'diagram',
      content: 'Layer 1: Modern Humus  ➔  Layer 2: Colonial Era  ➔  Layer 3: Medieval Era  ➔  Layer 4: Early Historic Era (Oldest)',
      caption: 'Law of Superposition: Lower undisturbed strata predate overlying strata.'
    },
    realWorldExample: {
      en: 'During the Citadel excavations of Anuradhapura directed by Dr. Siran Deraniyagala, stratigraphical soil analysis down to 10 meters revealed 4,500 years of unbroken human habitations, pushing back Sri Lankan literate civilization to 900 BCE!',
      si: 'ආචාර්ය සිරාන් දැරණියගලයන් විසින් අනුරාධපුර ඇතුළුනුවර සිදුකළ මීටර් 10ක් ගැඹුරු විද්‍යාත්මක ස්ථර කැණීම්වලදී, වසර 4,500ක අඛණ්ඩ මානව ජනාවාස තහවුරු වූ අතර ක්‍රි.පූ. 900 තරම් ඈතට දිවෙන බ්‍රාහ්මී අක්ෂර සහිත මැටි බඳුන් හමුවිය!',
      ta: 'அனுராதபுர உட்பகுதியில் பேராசிரியர் சிராண் தெரணியகல மேற்கொண்ட 10 மீட்டர் ஆழ அகழ்வாராய்ச்சியில் இலங்கையின் நாகரிகம் கி.மு. 900 வரை பழமையானது என்பது நிரூபிக்கப்பட்டது!',
    },
    checkQuestion: {
      id: 'hist-prac-q1',
      subjectId: 'history',
      topicId: 'history-gr10-historical-knowledge',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'In scientific archaeological excavations, what fundamental principle dictates that undisturbed lower soil strata are older than the strata deposited above them?',
        si: 'විද්‍යාත්මක පුරාවිද්‍යා කැණීම්වලදී බාහිර කැළඹීමකට ලක්නොවූ පස් තට්ටු අතරින් ගැඹුරින්ම පිහිටි තට්ටුව ඉහළ තට්ටුවලට වඩා පැරණි බව දක්වන මූලධර්මය කුමක්ද?',
        ta: 'தொல்பொருள் அகழ்வாராய்ச்சியில் குழப்பமடையாத ஆழமான அடுக்குகள் மேல் அடுக்குகளை விட பழமையானவை என்பதை விளக்கும் அடிப்படைக் கோட்பாடு எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Principle of Stratigraphy (Law of Superposition)', si: 'ස්ථරීභවන න්‍යාය (Principle of Stratigraphy)', ta: 'அடுக்குப்படிவியல் கோட்பாடு (Law of Superposition)' } },
        { id: 'opt-2', text: { en: 'Boyle\'s Law of Atmospheric Pressure', si: 'බොයිල්ගේ වායු පීඩන නියමය', ta: 'போயிலின் அமுக்க விதி' } },
        { id: 'opt-3', text: { en: 'Theory of Continental Drift', si: 'මහාද්වීපික ප්ලාවිත න්‍යාය', ta: 'கண்டப்பெயர்ச்சிக் கோட்பாடு' } },
        { id: 'opt-4', text: { en: 'Archimedes Fluid Buoyancy Principle', si: 'ආකිමිඩීස්ගේ උත්ප්ලාවකතා න්‍යාය', ta: 'ஆர்க்கிமிடீசின் மிதப்பு விதி' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The Principle of Stratigraphy (Law of Superposition) is foundational to field archaeology: older cultural deposits lie at the bottom, while each progressively higher layer represents a more recent era.',
        si: 'ස්ථරීභවන න්‍යායට අනුව භූමියක මුලින්ම තැන්පත් වන පස් තට්ටුව යටින්ද, පසුව තැන්පත් වන තට්ටු ඊට ඉහළින්ද පිහිටන බැවින් අතීත කාලපරාස නිවැරදිව හඳුනාගත හැක.',
        ta: 'அடுக்குப்படிவியல் விதியின் படி முதலில் படிந்த அடுக்கு அடியிலும், பின்னர் படிந்த அடுக்குகள் மேலேயும் இருக்கும் என்பதால் காலத்தை துல்லியமாக வகைப்படுத்த முடிகிறது.',
      },
      syllabusReference: 'Grade 10 History — Chapter 6: Practical Archaeology and Dating Methods (Textbook p. 88–92)',
    }
  },
  {
    id: 'hist-prac-2',
    stepNumber: 2,
    title: {
      en: 'Preservation of Palm-Leaf Manuscripts, Metals & Murals',
      si: 'පුස්කොළ පොත්, ලෝහ පුරාවස්තු සහ බිතුසිතුවම් සංරක්ෂණය',
      ta: 'ஓலைச்சுவடிகள், உலோகப் பொருட்கள் மற்றும் சுவரோவியப் பாதுகாப்பு',
    },
    concept: {
      en: 'Artifact conservation applies specialized preservation techniques to halt deterioration:\n- **Palm-Leaf (Ola) Manuscripts:** Dried leaves from the Talipot palm (තල ගස) are prone to fungal decay and insect attacks. Traditional conservation treats them with Dummala oil (දුම්මල තෙල්) and Kakuna oil to restore flexibility, repel silverfish, and darken ink engravings.\n- **Bronze & Copper Artifacts:** Subject to "bronze disease" (cupric chloride corrosion caused by humidity). Treated via chemical stabilization (benzotriazole) and dry microclimates.\n- **Murals (Sigiriya & Dambulla):** Protected from moisture condensation, bat guano, micro-organisms, and the damaging ultraviolet rays of camera flashes.',
      si: 'පුරාවස්තු සංරක්ෂණයේදී විද්‍යාත්මක හා සාම්ප්‍රදායික ක්‍රමවේද යොදාගැනේ:\n- **පුස්කොළ පොත්:** තල ගසේ කොළවලින් නිපදවන පුස්කොළ පොත් වේළී කැඩී යාමෙන් සහ කෘමීන්ගෙන් (වේයන්, රිදී මසුන්) ආරක්ෂා කිරීමට "දුම්මල තෙල්" සහ කැකුණ තෙල් ආලේප කෙරේ. මෙයින් නම්‍යශීලී බව රැකෙන අතර අකුරු පැහැදිලි වේ.\n- **ලෝහ පුරාවස්තු:** ආර්ද්‍රතාව නිසා තඹ සහ ලෝකඩවල ඇතිවන "ලෝකඩ රෝගය" (Bronze disease) වැළැක්වීමට රසායනික ප්‍රතිකාර සහ වියළි වායුගෝල පවත්වා ගැනේ.\n- **බිතුසිතුවම්:** සීගිරිය සහ දඹුල්ල සිතුවම් තෙතමනය, වවුල් වසංගතය සහ කැමරා ෆ්ලෑෂ් ආලෝකයේ පාරජම්බුල කිරණින් ආරක්ෂා කෙරේ.',
      ta: 'தொல்பொருட்களைப் பாதுகாக்க சிறப்பு உத்திகள் பயன்படுத்தப்படுகின்றன: ஓலைச்சுவடிகளை பூச்சிகளிடமிருந்து காக்க "தும்மல எண்ணெய்" பூசப்படுகிறது. உலோகங்களை துருப்பிடித்தலிலிருந்து காக்க இரசாயன சிகிச்சைகளும், சுவரோவியங்களை பாதுகாக்க கமரா பிளாஷ் மற்றும் ஈரப்பத கட்டுப்பாடும் அவசியமாகும்.',
    },
    visualCard: {
      title: 'Conservation Protocols for Historical Media',
      diagramType: 'infographic',
      content: 'Ola Leaves: Dummala Oil  •  Metals: Desiccation & Benzotriazole  •  Murals: Humidity Control & UV-Flash Ban',
      caption: 'Preserving national historical treasures against climatic and environmental degradation.'
    },
    realWorldExample: {
      en: 'When visiting the Colombo National Museum or temple libraries, you will observe the rich herbal scent of Dummala oil applied to palm-leaf manuscripts, keeping 400-year-old texts flexible and bug-free!',
      si: 'කොළඹ ජාතික කෞතුකාගාරයේ හෝ විහාරස්ථාන පුස්තකාලවල ඇති පුස්කොළ පොත් පරීක්ෂා කිරීමේදී, දුම්මල තෙල් සුවඳ දැකගත හැකි අතර වසර සිය ගණනක් පැරණි පුස්කොළ පොත් නම්‍යශීලීව රැකී ඇත්තේ එම තෙල් ආලේපය නිසාය!',
      ta: 'தேசிய நூதனசாலையில் உள்ள நூற்றுக்கணக்கான ஆண்டுகள் பழமையான ஓலைச்சுவடிகள் இன்றும் உடையாமல் இருப்பதற்கு பாரம்பரிய தும்மல எண்ணெய் பூச்சே காரணமாகும்!',
    },
    checkQuestion: {
      id: 'hist-prac-q2',
      subjectId: 'history',
      topicId: 'history-gr10-historical-knowledge',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'What traditional natural oil preparation is applied to ancient Sri Lankan palm-leaf (Ola) manuscripts to preserve their flexibility and protect them against insect pests?',
        si: 'පුස්කොළ පොත් වේළී කැඩීයාමෙන් සහ කෘමි උවදුරුවලින් ආරක්ෂා කර නම්‍යශීලීව තබාගැනීම සඳහා ශ්‍රී ලංකාවේ සාම්ප්‍රදායිකව ආලේප කරනු ලබන ස්වාභාවික තෙල් වර්ගය කුමක්ද?',
        ta: 'பண்டைய ஓலைச்சுவடிகள் உடையாமல் பாதுகாக்கவும் பூச்சிகளிடமிருந்து காக்கவும் பாரம்பரியமாக பூசப்படும் இயற்கை எண்ணெய் எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Dummala oil (දුම්මල තෙල්) and Kakuna herbal oil extracts', si: 'දුම්මල තෙල් සහ කැකුණ තෙල් සාරය', ta: 'தும்மல எண்ணெய் மற்றும் ககுண மூலிகை எண்ணெய்' } },
        { id: 'opt-2', text: { en: 'Synthetic kerosene mineral solvent', si: 'භූමිතෙල් ද්‍රාවණය', ta: 'மண்ணெண்ணெய் கரைசல்' } },
        { id: 'opt-3', text: { en: 'Concentrated chlorine bleaching chemical', si: 'සාන්ද්‍ර ක්ලෝරීන් ද්‍රාවණය', ta: 'குளோரின் சலவை இரசாயனம்' } },
        { id: 'opt-4', text: { en: 'Saline seawater brine', si: 'ලුණු සහිත මුහුදු වතුර', ta: 'உப்பு நீர்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Dummala oil (derived from resin of Shorea trees) mixed with fine charcoal powder has been used for centuries to darken incised letters on ola leaves while functioning as a powerful antifungal insect repellent.',
        si: 'දුම්මල තෙල් යනු පුස්කොළවල කෘමීන් බෝවීම වළක්වන, පත්‍රය නම්‍යශීලීව තබන සහ අකුරු පැහැදිලිව කළු පැහැයෙන් ඉස්මතු කරවන සාම්ප්‍රදායික සංරක්ෂණ ආලේපනයයි.',
        ta: 'தும்மல எண்ணெய் பூச்சிகளை விரட்டுவதோடு ஓலைச்சுவடிகளை நெகிழ்வாக வைத்திருக்கவும் எழுத்துக்களை தெளிவாகக் காட்டவும் உதவுகிறது.',
      },
      syllabusReference: 'Grade 10 History — Chapter 6: Conservation of Inscriptions and Artifacts (Textbook p. 93–96)',
    }
  },
  {
    id: 'hist-prac-3',
    stepNumber: 3,
    title: {
      en: 'UNESCO World Heritage Sites of Sri Lanka',
      si: 'ශ්‍රී ලංකාවේ යුනෙස්කෝ ලෝක උරුම ස්ථාන',
      ta: 'இலங்கையின் யுனெஸ்கோ உலக பாரம்பரிய களங்கள்',
    },
    concept: {
      en: 'Sri Lanka boasts 8 UNESCO World Heritage Sites celebrated for Outstanding Universal Value (OUV):\n**Cultural Heritage (6):**\n1. Sacred City of Anuradhapura (1982)\n2. Ancient City of Polonnaruwa (1982)\n3. Ancient City of Sigiriya (1982)\n4. Sacred City of Kandy (1988)\n5. Old Town of Galle and its Fortifications (1988)\n6. Rangiri Dambulla Cave Temple (1991)\n**Natural Heritage (2):**\n7. Sinharaja Forest Reserve (1988) - Primary tropical lowland rainforest\n8. Central Highlands of Sri Lanka (2010) - Peak Wilderness Sanctuary, Horton Plains National Park, and Knuckles Conservation Forest.',
      si: 'විශ්වීය අගයකින් යුත් ශ්‍රී ලංකාවේ යුනෙස්කෝ (UNESCO) ලෝක උරුම ස්ථාන 8ක් පවතී:\n**සංස්කෘතික උරුම (6):**\n1. අනුරාධපුර පූජනීය නගරය (1982)\n2. පොළොන්නරුව ඓතිහාසික නගරය (1982)\n3. සීගිරිය පුරාණ නගරය (1982)\n4. මහනුවර පූජනීය නගරය (1988)\n5. ගාල්ල පැරණි නගරය සහ එහි බලකොටුව (1988)\n6. රන්ගිරි දඹුලු ලෙන් විහාරය (1991)\n**ස්වාභාවික උරුම (2):**\n7. සිංහරාජ වැසි වනාන්තරය (1988)\n8. ශ්‍රී ලංකාවේ මධ්‍යම කඳුකරය (2010) - ශ්‍රී පාද අඩවිය, හෝර්ටන් තැන්න සහ නකල්ස් දුම්බර කඳුවැටිය.',
      ta: 'இலங்கையில் 8 யுனெஸ்கோ உலகப் பாரம்பரியக் களங்கள் உள்ளன. கலாசாரக் களங்கள் (6): அநுராதபுரம், பொலன்னறுவை, சீகிரியா, கண்டி, காலி கோட்டை, தம்புள்ளை விகாரை. இயற்கை களங்கள் (2): சிங்கராஜ மழைக்காடு மற்றும் மத்திய மலைநாடு (ஹோர்ட்டன் சமவெளி, நக்கிள்ஸ்).',
    },
    visualCard: {
      title: '8 UNESCO World Heritage Sites of Sri Lanka',
      diagramType: 'infographic',
      content: 'Cultural: Anuradhapura • Polonnaruwa • Sigiriya • Kandy • Galle • Dambulla  |  Natural: Sinharaja • Central Highlands',
      caption: 'Recognized by UNESCO for Outstanding Universal Value to Humanity.'
    },
    realWorldExample: {
      en: 'Galle Dutch Fort is the best preserved example of a fortified European maritime colonial city in South Asia, protected under international UNESCO convention to prevent unauthorized modern alterations.',
      si: 'ගාලු ලන්දේසි කොටුව යනු දකුණු ආසියාවේ ඉතාම හොඳින් සංරක්ෂණය වී ඇති යුරෝපීය සාගර බලකොටු නගරය වන අතර එය යුනෙස්කෝ ආරක්ෂාව ලබන ලෝක උරුමයකි.',
      ta: 'காலி ஒல்லாந்தர் கோட்டை தெற்காசியாவில் மிகச் சிறப்பாகப் பாதுகாக்கப்பட்ட ஐரோப்பிய கடல்சார் கோட்டை நகரமாகும், இது யுனெஸ்கோ உலக பாரம்பரிய களமாகும்.',
    },
    checkQuestion: {
      id: 'hist-prac-q3',
      subjectId: 'history',
      topicId: 'history-gr10-historical-knowledge',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which pair of Sri Lankan locations are recognized as UNESCO Natural World Heritage Sites due to their exceptional biodiversity and cloud forest endemism?',
        si: 'සුවිශේෂී ජෛව විවිධත්වය සහ ආවේණික ශාක හා සත්ත්ව ප්‍රජාව හේතුවෙන් යුනෙස්කෝ ස්වාභාවික ලෝක උරුම ලෙස ප්‍රකාශයට පත් කර ඇති ශ්‍රී ලංකාවේ ස්ථාන යුගලය කුමක්ද?',
        ta: 'விதிவிலக்கான பல்லுயிர் வளம் காரணமாக இலங்கையில் யுனெஸ்கோ இயற்கை உலக பாரம்பரிய களங்களாக அங்கீகரிக்கப்பட்டுள்ள இரட்டை இடங்கள் எவை?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Sinharaja Forest Reserve and the Central Highlands (Horton Plains / Knuckles)', si: 'සිංහරාජ වැසි වනාන්තරය සහ මධ්‍යම කඳුකරය (හෝර්ටන් තැන්න / නකල්ස්)', ta: 'சிங்கராஜ வனமும் மத்திய மலைநாடும் (ஹோர்ட்டன் சமவெளி / நக்கிள்ஸ்)' } },
        { id: 'opt-2', text: { en: 'Sigiriya Rock Fortress and Galle Dutch Fort', si: 'සීගිරිය පර්වත බලකොටුව සහ ගාලු කොටුව', ta: 'சீகிரியா குன்றும் காலி கோட்டையும்' } },
        { id: 'opt-3', text: { en: 'Yala National Park and Wilpattu National Park', si: 'යාල ජාතික වනෝද්‍යානය සහ විල්පත්තු වනෝද්‍යානය', ta: 'யால தேசிய பூங்காவும் வில்பத்து பூங்காவும்' } },
        { id: 'opt-4', text: { en: 'Pidurutalagala Mountain and Adams Bridge', si: 'පිදුරුතලාගල සහ ආදම්ගේ පාලම', ta: 'பிதுருதலாகல மலையும் ஆதாம் பாலமும்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Sinharaja (inscribed 1988) and the Central Highlands comprising Horton Plains, Peak Wilderness, and Knuckles (inscribed 2010) are Sri Lanka\'s two declared UNESCO Natural World Heritage Sites.',
        si: 'ශ්‍රී ලංකාවේ පිහිටි ස්වාභාවික ලෝක උරුම ද්විත්වය වන්නේ 1988 දී ප්‍රකාශිත සිංහරාජ වැසි වනාන්තරය සහ 2010 දී ප්‍රකාශිත මධ්‍යම කඳුකරයයි.',
        ta: 'சிங்கராஜ மழைக்காடு மற்றும் மத்திய மலைநாடு (ஹோர்ட்டன் சமவெளி, நக்கிள்ஸ்) ஆகியவையே இலங்கையின் இரு யுனெஸ்கோ இயற்கை உலக பாரம்பரிய களங்களாகும்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 6: World Heritage Sites in Sri Lanka (Textbook p. 97–100)',
    }
  },
  {
    id: 'hist-prac-4',
    stepNumber: 4,
    title: {
      en: 'Antiquities Ordinance & Citizen Heritage Responsibility',
      si: 'පුරාවස්තු ආඥාපනත සහ උරුමයන් සුරැකීමේ පුරවැසි වගකීම',
      ta: 'பண்டைய நினைவுச் சின்னங்கள் கட்டளைச் சட்டமும் மரபுரிமைப் பாதுகாப்பும்',
    },
    concept: {
      en: 'Cultural heritage belongs to the entire nation. Under Sri Lanka\'s Antiquities Ordinance (No. 9 of 1940 and subsequent amendments), all monuments, inscriptions, and human artifacts older than 100 years are legally protected national antiquities. Illicit treasure hunting (නිධන් හෑරීම), damaging inscriptions, or trafficking ancient artifacts are non-bailable criminal offenses. Every citizen has a constitutional duty to protect antiquities, refrain from defacing historic monuments, and immediately report accidental archaeological discoveries to the Department of Archaeology.',
      si: 'ඓතිහාසික උරුමයන් යනු සමස්ත ජාතිය සතු වටිනා වස්තුවකි. 1940 අංක 9 දරන පුරාවස්තු ආඥාපනත සහ එහි සංශෝධන අනුව, වසර 100කට වඩා පැරණි සියලු ස්මාරක, සෙල්ලිපි සහ මානව නිර්මාණ නීතියෙන් ආරක්ෂිත පුරාවස්තු වේ. නිධන් හෑරීම, සෙල්ලිපි විනාශ කිරීම සහ පුරාවස්තු ජාවාරම ඇප ලබාගත නොහැකි බරපතල දඬුවම් ලැබිය හැකි අපරාධ වේ. ස්මාරක මත කුරුටු ගී ලිවීමෙන් වැළකීම, අනවසර කැණීම් පිළිබඳ පුරාවිද්‍යා දෙපාර්තමේන්තුව දැනුවත් කිරීම සෑම පුරවැසියෙකුගේම පරම වගකීමකි.',
      ta: '1940 ஆம் ஆண்டின் 9 ஆம் இலக்க பண்டைய நினைவுச் சின்னங்கள் சட்டத்தின் படி, 100 ஆண்டுகளுக்கு முற்பட்ட அனைத்து தொல்பொருட்களும் சட்டப்பூர்வமாக பாதுகாக்கப்படுகின்றன. புதையல் தோண்டுவதும் கல்வெட்டுகளை சேதப்படுத்துவதும் பிணையில் வரமுடியாத குற்றங்களாகும். தேசிய மரபுரிமைகளைப் பாதுகாப்பது ஒவ்வொரு பிரஜையினதும் கடமையாகும்.',
    },
    visualCard: {
      title: 'Antiquities Protection Legal Framework',
      diagramType: 'infographic',
      content: 'Antiquities Ordinance (1940)  •  Threshold: 100+ Years  •  Strict Ban on Treasure Hunting & Defacing',
      caption: 'Severe non-bailable criminal penalties protect Sri Lanka\'s archaeological legacy.'
    },
    realWorldExample: {
      en: 'When ancient Roman coins or terra-cotta beads are accidentally discovered during domestic house foundations or well digging, the law requires immediate handover to the nearest police station or archaeological officer without disturbing the soil layer.',
      si: 'ගෙවල් අත්තිවාරම් හෝ ළිං කපන විට පැරණි කාසි හෝ මැටි බඳුන් හමුවුවහොත්, එම ස්ථානයේ පස් තට්ටු නොකැළඹී වහාම ළඟම ඇති පොලිසියට හෝ පුරාවිද්‍යා නිලධාරීන්ට භාරදීම නීතිමය යුතුකමකි.',
      ta: 'கிணறு வெட்டும் போதோ அல்லது வீடு கட்டும் போதோ பழைய நாணயங்கள் கிடைத்தால், அதனை உடனடியாக காவல்துறை அல்லது தொல்பொருள் அதிகாரிகளிடம் ஒப்படைப்பது சட்டக் கடமையாகும்.',
    },
    checkQuestion: {
      id: 'hist-prac-q4',
      subjectId: 'history',
      topicId: 'history-gr10-historical-knowledge',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Under the Antiquities Ordinance of Sri Lanka, what is the minimum historical age that automatically classifies a monument, structure, or material artifact as a protected antiquity?',
        si: 'ශ්‍රී ලංකාවේ පුරාවස්තු ආඥාපනත අනුව, යම් ස්මාරකයක්, නටබුනක් හෝ මානව නිර්මාණයක් නීත්‍යානුකූලව ආරක්ෂිත පුරාවස්තුවක් ලෙස සැලකීමට එයට තිබිය යුතු අවම කාලසීමාව කුමක්ද?',
        ta: 'இலங்கையின் தொல்பொருட்கள் கட்டளைச் சட்டத்தின் படி, ஒரு நினைவுச்சின்னம் அல்லது கலைப்பொருள் தொல்பொருளாக கருதப்பட வேண்டிய குறைந்தபட்ச கால எல்லை யாது?',
      },
      options: [
        { id: 'opt-1', text: { en: '100 years', si: 'වසර 100ක්', ta: '100 ஆண்டுகள்' } },
        { id: 'opt-2', text: { en: '500 years', si: 'වසර 500ක්', ta: '500 ஆண்டுகள்' } },
        { id: 'opt-3', text: { en: '50 years', si: 'වසර 50ක්', ta: '50 ஆண்டுகள்' } },
        { id: 'opt-4', text: { en: '1,000 years', si: 'වසර 1,000ක්', ta: '1,000 ஆண்டுகள்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'According to Section 48 of the Antiquities Ordinance of Sri Lanka, any construction, ruin, or historical object dating back 100 years or more is deemed an antiquity entitled to strict state protection.',
        si: 'පුරාවස්තු ආඥාපනතේ 48 වන වගන්තියට අනුව වසර 100ක් හෝ ඊට පෙර කාලයකට අයත් ඕනෑම ස්මාරකයක් හෝ මානව වස්තුවක් ස්වයංක්‍රීයවම ආරක්ෂිත පුරාවස්තුවක් බවට පත්වේ.',
        ta: 'பண்டைய நினைவுச் சின்னங்கள் சட்டத்தின் படி, 100 ஆண்டுகள் அல்லது அதற்கு மேற்பட்ட பழமை வாய்ந்த எந்தவொரு அமைப்பும் பாதுகாக்கப்பட்ட தொல்பொருளாக கருதப்படுகிறது.',
      },
      syllabusReference: 'Grade 10 History — Chapter 6: Heritage Preservation Laws and Citizen Duty (Textbook p. 101–104)',
    }
  }
];

// ----------------------------------------------------------------------------
// CHAPTER 7: DECLINE OF RAJARATA & THE SOUTHWEST KINGDOMS (රාජරට බිඳවැටීම හා නිරිතදිග රාජධානි)
// ----------------------------------------------------------------------------
export const TEACH_ME_HISTORY_SOUTH_WEST_KINGDOMS_STEPS: LessonStep[] = [
  {
    id: 'hist-sw-1',
    stepNumber: 1,
    title: {
      en: 'The Drift to the Southwest & Collapse of Rajarata',
      si: 'රාජරට ශිෂ්ටාචාරයේ බිඳවැටීම සහ නිරිතදිගට රාජධානිය සංක්‍රමණය වීම',
      ta: 'இராசரட்டை நாகரிகத்தின் வீழ்ச்சியும் தென்மேற்கு நோக்கிய நகர்வும்',
    },
    concept: {
      en: 'In the early 13th century, after the golden ages of Anuradhapura and Polonnaruwa, the Rajarata hydraulic civilization collapsed, causing the political capital and population to drift toward the wet, rugged southwestern hills (Maya Rata). Key causes:\n1. **Devastating Foreign Invasions:** The merciless invasion of Kalinga Magha (1215 CE), who destroyed cities, sacked temples, burnt libraries, and tortured the populace.\n2. **Breakdown of Giant Irrigation Works:** Breached bunds created stagnant floodwaters, giving rise to malaria-carrying mosquitoes.\n3. **Climatic Shifts & Soil Exhaustion:** Dry zone agriculture could no longer support dense imperial concentrations.\n4. **Dynastic Civil Wars:** Frequent succession conflicts weakened domestic defense.',
      si: 'ක්‍රි.ව. 13 වන සියවස මුලදී පොළොන්නරු යුගයෙන් පසු රාජරට ශිෂ්ටාචාරය බිඳවැටී අගනුවර හා ජනතාව නිරිතදිග තෙත් කලාපයට (මායා රට) සංක්‍රමණය විය. ප්‍රධාන හේතු:\n1. **කාලිංග මාඝගේ ආක්‍රමණය (ක්‍රි.ව. 1215):** විහාර විනාශ කරමින්, පුස්කොළ පොත් ගිනිබත් කරමින් සහ වැසියන්ට වධ දෙමින් සිදුකළ අතිශය දරුණු ආක්‍රමණය.\n2. **වාරි පද්ධති විනාශ වීම:** වැව් බැමි කැඩී යාම නිසා ජලය බැස නොගොස් මැලේරියා මදුරුවන් බෝවන වගුරු බිම් බවට පත්වීම.\n3. **පස නිසරු වීම සහ දේශගුණික වෙනස්කම්.**\n4. **නිරන්තර රජකම උදෙසා ඇතිවූ අභ්‍යන්තර ආරවුල්.**',
      ta: 'கி.பி. 13 ஆம் நூற்றாண்டின் தொடக்கத்தில் கலிங்க மாகனின் (1215) கொடூரமான படையெடுப்பினால் பொலன்னறுவை வீழ்ச்சியடைந்தது. பாரிய நீர்ப்பாசனக் கட்டமைப்புகள் உடைக்கப்பட்டு மலேரியா பரவியதால் மக்கள் பாதுகாப்பு தேடி தென்மேற்கு நோக்கி நகர்ந்தனர்.',
    },
    visualCard: {
      title: 'Causes of the Drift to the Southwest',
      diagramType: 'infographic',
      content: 'Kalinga Magha Invasion (1215)  +  Irrigation Destruction / Malaria  +  Dynastic Strife  ➔  Shift to Maya Rata',
      caption: 'Textbook Chapter 7: Transformation from Dry-Zone to Wet-Zone Capital Citadels.'
    },
    realWorldExample: {
      en: 'The Pujavaliya chronicle graphically describes how Kalinga Magha\'s invaders destroyed Buddhist dagabas, untied sacred book strings to scatter pages in the wind, and forced kings to retreat behind natural cliff fortresses like Dambadeniya and Yapahuwa.',
      si: 'පූජාවලියේ විස්තර වන්නේ කාලිංග මාඝගේ ආක්‍රමණිකයන් මහසෑ විනාශ කර, පුස්කොළ පොත්වල බණවර ලී ලිහා සුළඟේ විසුරුවා හැරි ආකාරය සහ රජවරුන් දඹදෙණිය හා යාපහුව වැනි ස්වාභාවික ගල් පර්වත මත අගනුවරවල් පිහිටුවාගත් ආකාරයයි.',
      ta: 'கலிங்க மாகன் நூல்களை தீக்கிரையாக்கி விகாரைகளை அழித்ததை பூஜாவலிய நூல் விவரிக்கிறது. இதன் பின்னரே மன்னர்கள் தம்பதெனியா, யாப்பஹுவா போன்ற பாறைக்கோட்டைகளில் அடைக்கலம் புகுந்தனர்.',
    },
    checkQuestion: {
      id: 'hist-sw-q1',
      subjectId: 'history',
      topicId: 'history-gr10-decline-new-kingdoms',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Whose catastrophic 13th-century foreign invasion (1215 CE) is historically identified as the primary shock that dismantled the Polonnaruwa kingdom and triggered the permanent shift of capitals to the Southwest?',
        si: 'පොළොන්නරු රාජධානිය බිඳවැටීමට සහ අගනුවර නිරිතදිග ප්‍රදේශයට සංක්‍රමණය වීමට සෘජුවම බලපෑ ක්‍රි.ව. 1215 දී එල්ල වූ විනාශකාරී විදේශ ආක්‍රමණය කාගේද?',
        ta: 'பொலன்னறுவை இராச்சியம் வீழ்ச்சியடைந்து தலைநகரம் தென்மேற்கு நோக்கி மாறக் காரணமாக அமைந்த கி.பி. 1215 ஆம் ஆண்டின் கொடூரமான வெளிநாட்டு படையெடுப்பு யாருடையது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Kalinga Magha (කාලිංග මාඝ ආක්‍රමණය)', si: 'කාලිංග මාඝ', ta: 'கலிங்க மாகன்' } },
        { id: 'opt-2', text: { en: 'Rajendra Chola I', si: 'පළමුවන රාජේන්ද්‍ර චෝළ', ta: 'முதலாம் இராஜேந்திர சோழன்' } },
        { id: 'opt-3', text: { en: 'Chandrabhanu of Tambralinga', si: 'චන්ද්‍රභානු', ta: 'சந்திரபானு' } },
        { id: 'opt-4', text: { en: 'Arya Chakravarti', si: 'ආර්ය චක්‍රවර්තී', ta: 'ஆரிய சக்கரவர்த்தி' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The invasion of Kalinga Magha in 1215 CE with 24,000 soldiers dealt a fatal blow to the Rajarata civilization, forcing Sinhala rulers to establish defensible hilltop capitals in Dambadeniya, Yapahuwa, and Kurunegala.',
        si: 'ක්‍රි.ව. 1215 දී කාලිංග මාඝගේ ආක්‍රමණයෙන් රාජරටට එල්ල වූ මහා විනාශය නිසා රජවරුන්ට දඹදෙණිය, යාපහුව, කුරුණෑගල වැනි ආරක්ෂිත පර්වත සහිත නිරිතදිග කලාපයට අගනුවර ගෙනයාමට සිදුවිය.',
        ta: 'கி.பி. 1215 இல் 24,000 படைகளுடன் வந்த கலிங்க மாகனின் படையெடுப்பே பொலன்னறுவையை அழித்து தலைநகரங்களை தென்மேற்கு நோக்கி மாற்றியது.',
      },
      syllabusReference: 'Grade 10 History — Chapter 7: The Shift of Kingdoms to the Southwest (Textbook p. 106–109)',
    }
  },
  {
    id: 'hist-sw-2',
    stepNumber: 2,
    title: {
      en: 'Dambadeniya, Yapahuwa & Kurunegala Kingdoms',
      si: 'දඹදෙණිය, යාපහුව සහ කුරුණෑගල රාජධානි',
      ta: 'தம்பதெனியா, யாப்பஹுவா மற்றும் குருநாகல் இராச்சியங்கள்',
    },
    concept: {
      en: 'The transitional kingdoms were established on defensible rock fortresses:\n1. **Dambadeniya:** Established by King Vijayabahu III; flourished under King Parakramabahu II ("Kalikala Sahitya Sarvajna Pandita"), who unified the realm, repulsed invaders, and composed the Visuddhimarga Sanna and Kavsilumina.\n2. **Yapahuwa:** King Bhuvanekabahu I built this stunning rock fortress citadel featuring the world-famous carved stone Lion Staircase and ornate Chinese-influenced balustrades. Yapahuwa guarded the Sacred Tooth Relic until attacked by the Pandyans under Aryachakravarti.\n3. **Kurunegala:** King Parakramabahu IV sponsored the landmark Sinhala translation of the 550 Buddhist Jataka Tales (Pansiya Panas Jathaka Potha).',
      si: 'නිරිතදිග රාජධානි පිහිටුවන ලද්දේ ස්වාභාවික ආරක්ෂාව සහිත පර්වත කේන්ද්‍ර කරගෙනය:\n1. **දඹදෙණිය:** 3 වන විජයබාහු රජු ආරම්භ කළ අතර 2 වන පැරකුම්බා රජු ("කලිකාල සාහිත්‍ය සර්වඥ පණ්ඩිත") යටතේ ස්වර්ණමය යුගයක් විය. එතුමා කව්සිළුමිණ හා විශුද්ධිමාර්ග සන්නය රචනා කළේය.\n2. **යාපහුව:** 1 වන බුවනෙකබාහු රජු දැවැන්ත ගල් පර්වතය පාමුල තැනවූ අලංකාර සිංහ පියගැටපෙළ හා වා කවුළු සහිත පර්වත බලකොටුවකි. මෙහි ශ්‍රී දන්ත ධාතූන් වහන්සේ වැඩසිටි අතර පාණ්ඩ්‍ය සෙනෙවි ආර්ය චක්‍රවර්තී විසින් දන්ත ධාතුව පැහැරගන්නා ලදී (පසුව 3 වන පරාක්‍රමබාහු රජු එය ආපසු ගෙන ආවේය).\n3. **කුරුණෑගල:** 4 වන පරාක්‍රමබාහු රජුගේ මූලිකත්වයෙන් පන්සිය පනස් ජාතක පොත පාලියෙන් සිංහලට පරිවර්තනය කරන ලදී.',
      ta: 'தென்மேற்கு இராச்சியங்கள் இயற்கை பாறைக் கோட்டைகளில் அமைந்தன: தம்பதெனியாவில் இரண்டாம் பராக்கிரமபாகு மன்னன் ஆட்சியில் இலக்கியம் மலர்ந்தது. யாப்பஹுவாவில் முதலாம் புவனேகபாகு மன்னன் கம்பீரமான சிங்கப் படிக்கட்டுகளுடன் கூடிய பாறைக் கோட்டையை அமைத்தான். குருநாகலில் 550 ஜாதகக் கதைகள் சிங்களத்தில் மொழிபெயர்க்கப்பட்டன.',
    },
    visualCard: {
      title: 'Transitional Hilltop Citadels',
      diagramType: 'infographic',
      content: 'Dambadeniya (Lit. Golden Age)  ➔  Yapahuwa (Lion Staircase Fortress)  ➔  Kurunegala (550 Jataka Translation)',
      caption: 'Textbook Chapter 7: Protecting the Sacred Tooth Relic against foreign raids.'
    },
    realWorldExample: {
      en: 'The soaring granite Lion Staircase at Yapahuwa Rock Fortress with its ornate stone traceries and guardian statues stands today as one of the most photographed and architecturally striking royal ruins in Sri Lanka.',
      si: 'යාපහුව පර්වතයේ අදටත් දැකගත හැකි දැවැන්ත කළුගල් සිංහ රූප සහිත පියගැටපෙළ සහ මනස්කාන්ත වා කවුළුව ශ්‍රී ලංකාවේ වාස්තු විද්‍යාත්මක විශිෂ්ටත්වය ලොවටම කියාපායි.',
      ta: 'யாப்பஹுவா பாறைக் கோட்டையின் பிரமாண்டமான கருங்கல் சிங்கப் படிக்கட்டுகள் இலங்கையின் தலைசிறந்த சிற்பக்கலைக்கு இன்றும் சான்றாக நிற்கின்றன.',
    },
    checkQuestion: {
      id: 'hist-sw-q2',
      subjectId: 'history',
      topicId: 'history-gr10-decline-new-kingdoms',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which medieval Sri Lankan royal capital fortress is world-renowned for its monumental granite Lion Staircase, Chinese-influenced stone window traceries, and high-altitude Tooth Relic shrine?',
        si: 'කළුගල් සිංහ කැටයම් සහිත දැවැන්ත පියගැටපෙළ, චීන ආභාසය ලත් අලංකාර වා කවුළු සහ උස් පර්වතය මත පිහිටි දළදා මැදුර නිසා ලෝක ප්‍රසිද්ධියට පත් මධ්‍යතන අගනුවර කුමක්ද?',
        ta: 'கம்பீரமான கருங்கல் சிங்கப் படிக்கட்டுகள், சீன பாணி சன்னல் வேலைப்பாடுகள் மற்றும் உயரமான பாறைக் கோட்டைக்கு புகழ்பெற்ற மத்தியகால தலைநகரம் எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Yapahuwa (යාපහුව)', si: 'යාපහුව', ta: 'யாப்பஹுவா' } },
        { id: 'opt-2', text: { en: 'Dambadeniya', si: 'දඹදෙණිය', ta: 'தம்பதெனியா' } },
        { id: 'opt-3', text: { en: 'Sitawaka', si: 'සීතාවක', ta: 'சீதாவக்கை' } },
        { id: 'opt-4', text: { en: 'Gampola', si: 'ගම්පොළ', ta: 'கம்பளை' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Yapahuwa, built by King Bhuvanekabahu I in the late 13th century, is renowned for its grand stone stairway flanked by lion sculptures and exquisite medieval stone traceries.',
        si: '1 වන බුවනෙකබාහු රජු විසින් ඉදිකළ යාපහුව පර්වත බලකොටුවේ ඇති විචිත්‍රවත් සිංහ පියගැටපෙළ සහ කැටයම් සහිත වා කවුළුව මෙරට මධ්‍යකාලීන ගල් කැටයම් කලාවේ උච්චතම නිර්මාණයකි.',
        ta: 'முதலாம் புவனேகபாகு மன்னனால் அமைக்கப்பட்ட யாப்பஹுவா பாறைக் கோட்டையின் சிங்கப் படிக்கட்டுகளும் சிற்பங்களும் இடைக்கால கலை நயத்திற்கு தலைசிறந்த சான்றாகும்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 7: Citadels of Yapahuwa and Kurunegala (Textbook p. 110–114)',
    }
  },
  {
    id: 'hist-sw-3',
    stepNumber: 3,
    title: {
      en: 'Gampola Period Architecture & Wood Carvings (Embekke)',
      si: 'ගම්පොළ යුගයේ වාස්තු විද්‍යාව සහ ඇම්බැක්කේ ලී කැටයම්',
      ta: 'கம்பளை கால கட்டிடக்கலையும் அம்பெக்க மரச் சிற்பங்களும்',
    },
    concept: {
      en: 'In 1344 CE, King Bhuvanekabahu IV established the capital at Gampola in the central highlands near the Mahaweli River. This era is immortalized by three architectural masterpieces displaying a synthesis of Sinhala and Dravidian designs:\n1. **Lankatilaka Vihara:** Magnificent multi-story temple constructed of brick and granite on Panhalgala rock by minister Senalankadhikara.\n2. **Gadaladeniya Vihara:** Stone temple constructed entirely of dressed granite under the guidance of South Indian architect Ganesvarachari.\n3. **Embekke Devalaya:** Built by King Vikramabahu III, renowned across the world for the finest wooden carvings in South Asia adorning the pillars of its drum pavilion (Digge), depicting mythical swans (Hansa Puttuwa), wrestlers, dancing maidens, and the dragon-lion (Vrishabha Kunjara).',
      si: 'ක්‍රි.ව. 1344 දී 4 වන බුවනෙකබාහු රජු ගම්පොළ අගනුවර පිහිටුවීය. මෙම යුගය සිංහල හා ද්‍රවිඩ කලා සම්ප්‍රදායන්ගේ සුසංයෝගය පෙන්වන විශිෂ්ට සිද්ධස්ථාන ත්‍රිත්වයකින් ප්‍රකට වේ:\n1. **ලංකාතිලක විහාරය:** සේනාලංකාධිකාර සෙනෙවියා විසින් පන්හල්ගල පර්වතය මත ගඩොලින් හා ගලින් තැනවූ අලංකාර මහල් ප්‍රාසාදය.\n2. **ගඩලාදෙණිය විහාරය:** දකුණු ඉන්දීය ගණේශ්වරාචාරී නම් ශිල්පියාගේ මඟපෙන්වීම යටතේ සම්පූර්ණයෙන්ම කළුගලින් තැනවූ විහාරය.\n3. **ඇම්බැක්කේ දේවාලය:** 3 වන වික්‍රමබාහු රජු විසින් කරවන ලද, දිග්ගෙයි ලී කණුවල නෙළා ඇති හංස පූට්ටුව, මල්ලවපොර, සැරපෙණියා සහ වෘෂභ කුංජර වැනි අසමසම ලී කැටයම් නිසා ලොවක් මවිත කළ දේවාලය.',
      ta: 'கி.பி. 1344 இல் நான்காம் புவனேகபாகு கம்பளையை தலைநகராக்கினான். இக்காலத்தில் லங்காதிலக விகாரை, கடலாதெனிய விகாரை மற்றும் அம்பெக்க தேவாலயம் ஆகியவை அமைக்கப்பட்டன. அம்பெக்க தேவாலயத்தின் மரத்தூண்களில் செதுக்கப்பட்டுள்ள அன்னப்பறவை, மல்யுத்தம், நாட்டியப் பெண்கள் போன்ற மரச் சிற்பங்கள் உலகப் புகழ்பெற்றவை.',
    },
    visualCard: {
      title: 'Architectural Trinity of the Gampola Era',
      diagramType: 'infographic',
      content: 'Lankatilaka (Brick/Granite Pinnacle)  •  Gadaladeniya (Dravidian Stone)  •  Embekke (Master Wood Carvings)',
      caption: 'Textbook Chapter 7: The flowering of hybrid stone and timber sculpture.'
    },
    realWorldExample: {
      en: 'Visiting Embekke Devalaya near Kandy, you can admire 128 distinct intricate wood carvings on the monolithic jackfruit wood pillars—not one pattern is duplicated!',
      si: 'මහනුවර අසල ඇම්බැක්කේ දේවාලයේ දිග්ගෙයි පිහිටි කොස් ලී කණු 32 හි ඇති අලංකාර ලී කැටයම් 128 න් කිසිදු කැටයමක් එකිනෙකට සමාන නොවන සේ විවිධත්වයෙන් යුතුව නිමවා ඇත!',
      ta: 'கண்டி அம்பெக்க தேவாலயத்தின் 32 பலா மரத்தூண்களில் உள்ள 128 சிற்பங்களில் எந்தவொரு சிற்பமும் மற்றொன்றைப் போல இல்லாமல் தனித்துவமாக செதுக்கப்பட்டுள்ளது!',
    },
    checkQuestion: {
      id: 'hist-sw-q3',
      subjectId: 'history',
      topicId: 'history-gr10-decline-new-kingdoms',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which Gampola era shrine is internationally celebrated for containing the finest intricate wooden pillar carvings in Sri Lankan history inside its drum pavilion (Digge)?',
        si: 'දිග්ගෙයි දැව කණුවල නෙළන ලද අසමසම විචිත්‍රවත් ලී කැටයම් හේතුවෙන් දෙස් විදෙස් සම්භාවනාවට පාත්‍ර වූ ගම්පොළ යුගයේ ඓතිහාසික සිද්ධස්ථානය කුමක්ද?',
        ta: 'தனது மண்டப மரத்தூண்களில் செதுக்கப்பட்ட மிகச்சிறந்த மரச் சிற்பங்களுக்காக இலங்கையிலும் சர்வதேச அளவிலும் புகழ்பெற்ற கம்பளை கால வரலாற்று தலம் எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Embekke Devalaya (ඇම්බැක්කේ දේවාලය)', si: 'ඇම්බැක්කේ දේවාලය', ta: 'அம்பெக்க தேவாலயம்' } },
        { id: 'opt-2', text: { en: 'Lankatilaka Vihara', si: 'ලංකාතිලක විහාරය', ta: 'லங்காதிலக விகாரை' } },
        { id: 'opt-3', text: { en: 'Gadaladeniya Vihara', si: 'ගඩලාදෙණිය විහාරය', ta: 'கடலாதெனிய விகாரை' } },
        { id: 'opt-4', text: { en: 'Dambulla Rock Cave Temple', si: 'දඹුලු රජමහා විහාරය', ta: 'தம்புள்ளை குகை விகாரை' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Embekke Devalaya, built during the Gampola period under King Vikramabahu III, is universally acclaimed for its masterfully carved wooden pillars portraying mythical creatures, foliage, and cultural figures.',
        si: '3 වන වික්‍රමබාහු රජු දවස ඉදිකළ ඇම්බැක්කේ දේවාලය මෙරට ලී කැටයම් කලාවේ කූටප්‍රාප්තිය සනිටුහන් කරන විශිෂ්ටතම සිද්ධස්ථානය වේ.',
        ta: 'விக்ரமபாகு மன்னனின் ஆட்சியில் கட்டப்பட்ட அம்பெக்க தேவாலயத்தின் மரத்தூண் சிற்பங்கள் தெற்காசியாவின் மிகச்சிறந்த மரவேலைப்பாடுகளாகப் போற்றப்படுகின்றன.',
      },
      syllabusReference: 'Grade 10 History — Chapter 7: Architecture and Art of Gampola (Textbook p. 115–118)',
    }
  },
  {
    id: 'hist-sw-4',
    stepNumber: 4,
    title: {
      en: 'Kingdom of Kotte (King Parakramabahu VI) & Sandesha Poetry',
      si: 'කෝට්ටේ යුගය (6 වන පරාක්‍රමබාහු රජු සහ සන්දේශ සාහිත්‍යය)',
      ta: 'கோட்டை இராச்சியம் (ஆறாம் பராக்கிரமபாகு மன்னனும் தூது இலக்கியமும்)',
    },
    concept: {
      en: 'King Parakramabahu VI (1412–1467 CE) founded the glorious Kingdom of Kotte (Jayawardanapura). He achieved the monumental feat of unifying the entire island of Sri Lanka under one umbrella for the final time prior to European colonial arrival, subduing the Vanni chieftains and sending Prince Sapumal (Chempaha Perumal) to bring the Northern Kingdom of Jaffna under Kotte allegiance.\nHis reign is celebrated as the "Golden Age of Sinhala Classical Literature", flourishing with Sandesha Kavya (Messenger Poems: Salalihini, Hansa, Gira, Kokila, Paravi Sandeshaya) composed by great scholar-monks like Ven. Totagamuwe Sri Rahula and Ven. Vidagama Maitreya.',
      si: 'කෝට්ටේ ජයවර්ධනපුර රාජධානිය පිහිටුවූ 6 වන පරාක්‍රමබාහු රජතුමා (ක්‍රි.ව. 1412–1467) යුරෝපීය ආක්‍රමණවලට පෙර මුළු ශ්‍රී ලංකාවම එක්සේසත් කළ අවසන් නරපතියා විය. එතුමා වන්නි නායකයින් මෙල්ල කර, සපුමල් කුමරු යවා යාපනය රාජධානිය කෝට්ටේ අණසකට නතු කරගත්තේය.\nමෙම යුගය "සිංහල සන්දේශ සාහිත්‍යයේ ස්වර්ණමය යුගය" ලෙස හැඳින්වේ. තොටගමුවේ ශ්‍රී රාහුල හිමි (සැළලිහිණි, පරවි සන්දේශ) සහ වීදාගම මෛත්‍රිය හිමි (හංස සන්දේශය) වැනි මහා වියතුන් බිහිවූයේ මෙම රාජ්‍ය අනුග්‍රහය යටතේය.',
      ta: 'ஆறாம் பராக்கிரமபாகு மன்னன் (1412–1467) ஐரோப்பியர் வருகைக்கு முன்னர் முழு இலங்கையையும் ஒரே குடையின் கீழ் ஒன்றிணைத்த கடைசி மன்னனாவான். சப்புமல் குமாரனை அனுப்பி யாழ்ப்பாணத்தை கோட்டையுடன் இணைத்தான். இவரது காலம் சிங்கள இலக்கியத்தின் பொற்காலமாகும்; சலலிஹினி, ஹங்ச போன்ற புகழ்பெற்ற தூது இலக்கியங்கள் இக்காலத்தில் இயற்றப்பட்டன.',
    },
    visualCard: {
      title: 'Island Unification & Literary Golden Age of Kotte',
      diagramType: 'infographic',
      content: 'King Parakramabahu VI  ➔  United Entire Island (including Jaffna)  ➔  Golden Age of Sandesha Kavya',
      caption: 'The last sovereign monarch to rule an undivided Sri Lanka (1412–1467 CE).'
    },
    realWorldExample: {
      en: 'The Salalihini Sandeshaya composed by Ven. Sri Rahula of Totagamuwa describes the flight of a starling bird from Kotte to Kelaniya temple, offering modern historians a vivid poetic street map of the bustling moated capital of Jayawardanapura Kotte!',
      si: 'තොටගමුවේ ශ්‍රී රාහුල හිමියන් රචිත සැළලිහිණි සන්දේශය මඟින් කෝට්ටේ සිට කැලණිය දක්වා සැළලිහිණියාගේ ගමන් මඟ විස්තර කරන අතර, එකල දිය අගල්වලින් වටවූ ජයවර්ධනපුර අගනුවර සශ්‍රීකත්වය මනාව චිත්‍රණය කෙරේ!',
      ta: 'தொட்டகமுவே ஸ்ரீ ராஹுல தேரர் இயற்றிய சலலிஹினி சந்தேஷய நூல் கோட்டையிலிருந்து களனி வரையிலான பாதையை விவரிப்பதுடன் பண்டைய கோட்டை நகரின் அழகையும் காட்டுகிறது!',
    },
    checkQuestion: {
      id: 'hist-sw-q4',
      subjectId: 'history',
      topicId: 'history-gr10-decline-new-kingdoms',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'What historic milestone distinguished the reign of King Parakramabahu VI of Kotte (1412–1467 CE)?',
        si: 'කෝට්ටේ 6 වන පරාක්‍රමබාහු රජතුමාගේ (ක්‍රි.ව. 1412–1467) පාලන සමය ශ්‍රී ලංකා ඉතිහාසයේ සුවිශේෂී සන්ධිස්ථානයක් ලෙස සනිටුහන් වන්නේ මන්ද?',
        ta: 'கோட்டையின் ஆறாம் பராக்கிரமபாகு மன்னனின் ஆட்சிக்காலம் (1412–1467) இலங்கை வரலாற்றில் முக்கிய மைல்கல்லாக அமைவது ஏன்?',
      },
      options: [
        { id: 'opt-1', text: { en: 'He brought the entire island under a single sovereign crown for the last time before European colonization and patronized the Golden Age of Sandesha literature', si: 'යුරෝපීය යටත්විජිත යුගයට පෙර මුළු ශ්‍රී ලංකාවම එක්සේසත් කළ අවසන් පාලකයා වෙමින් සන්දේශ සාහිත්‍යයේ ස්වර්ණමය යුගය බිහිකිරීම', ta: 'ஐரோப்பிய வருகைக்கு முன்னர் நாட்டை முழுமையாக ஒன்றிணைத்து தூது இலக்கியப் பொற்காலத்தை தோற்றுவித்தமை' } },
        { id: 'opt-2', text: { en: 'He signed the Kandyan Convention surrendering island sovereignty', si: 'උඩරට ගිවිසුම අත්සන් කරමින් රට ඉංග්‍රීසීන්ට පවරා දීම', ta: 'கண்டி ஒப்பந்தத்தில் கையெழுத்திட்டு நாட்டை ஒப்படைத்தமை' } },
        { id: 'opt-3', text: { en: 'He constructed the ancient Sigiriya Lion Rock Fortress', si: 'සීගිරිය පර්වත බලකොටුව ඉදිකිරීම', ta: 'சீகிரியா பாறைக் கோட்டையைக் கட்டியமை' } },
        { id: 'opt-4', text: { en: 'He abandoned Buddhism to adopt Western European feudal customs', si: 'බුදුදහම අත්හැර යුරෝපීය සිරිත් විරිත් වැළඳ ගැනීම', ta: 'பௌத்த மதத்தைக் கைவிட்டு ஐரோப்பிய முறையை தழுவியமை' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'King Parakramabahu VI was the last native monarch to exercise undisputed sovereignty over the entire territory of Sri Lanka, ushering in the pinnacle of Sandesha poetry in Sinhala literature.',
        si: '6 වන පරාක්‍රමබාහු රජු මුළු ලංකාද්වීපයම එක්සේසත් කළ අවසන් නරපතියා වූ අතර, එතුමන්ගේ පාලන සමයේදී සැළලිහිණි, පරවි, කෝකිල ආදී විශිෂ්ට සන්දේශ කාව්‍ය බිහිවිය.',
        ta: 'ஆறாம் பராக்கிரமபாகு மன்னன் இலங்கை முழுவதையும் தனியொரு குடையின் கீழ் ஆண்ட கடைசி மன்னனாவான்; இவரது காலத்தில் மிகச்சிறந்த தூது இலக்கியங்கள் தோன்றின.',
      },
      syllabusReference: 'Grade 10 History — Chapter 7: The Kingdom of Kotte and Parakramabahu VI (Textbook p. 119–123)',
    }
  }
];

// ----------------------------------------------------------------------------
// CHAPTER 8: THE KANDYAN KINGDOM (උඩරට රාජධානිය)
// ----------------------------------------------------------------------------
export const TEACH_ME_HISTORY_KANDYAN_KINGDOM_STEPS: LessonStep[] = [
  {
    id: 'hist-kan-1',
    stepNumber: 1,
    title: {
      en: 'The Rise of Senkadagala & Natural Highland Fortress',
      si: 'සෙන්කඩගල පුරවරයේ නැගීම සහ ස්වාභාවික කඳුකර බලකොටුව',
      ta: 'செங்கடகல நகரின் எழுச்சியும் இயற்கை மலைக்கோட்டையும்',
    },
    concept: {
      en: 'Founded in 1469 CE by Senasammata Vikramabahu, the Kandyan Kingdom (Senkadagala / Kanda Uda Rata) endured for over three centuries as the ultimate guardian of Sri Lankan independence. Its survival against three successive European maritime empires (Portuguese, Dutch, British) was made possible by impregnable geography:\n- Enclosed on three sides by the looping waters of the Mahaweli River.\n- Hemmed in by dense malaria-ridden jungle ranges and steep mountain walls.\n- Accessible only through treacherous, narrow mountain defiles such as the **Balana Pass (බලන කපොල්ල)** and Kadugannawa.\nPossession of the Sacred Tooth Relic (Dalada) granted legitimate religious sovereignty to the Kandyan monarch.',
      si: 'ක්‍රි.ව. 1469 දී සේනාසම්මත වික්‍රමබාහු රජු ආරම්භ කළ සෙන්කඩගල (කන්ද උඩරට) රාජධානිය සියවස් තුනකට අධික කාලයක් ශ්‍රී ලංකාවේ ස්වාධීනත්වයේ නොසැලෙන මුරදේවතාවා විය. පෘතුගීසි, ලන්දේසි සහ ඉංග්‍රීසි යන යුරෝපීය ආක්‍රමණිකයන් හමුවේ උඩරට රැකුණේ එහි පැවති ස්වාභාවික ආරක්ෂක පිහිටීම නිසාය:\n- තුන් පැත්තකින් මහවැලි ගඟේ දිය වළල්ලෙන් වටවීම.\n- ඝන කැලෑ සහ බෑවුම් සහිත දුෂ්කර කඳු වළල්ලකින් ආවරණය වීම.\n- ඇතුළු විය හැකි වූයේ **බලන කපොල්ල** සහ කඩුගන්නාව වැනි අතිශය දුෂ්කර, පහසුවෙන් රැකගත හැකි පටු කපොලු හරහා පමණක් වීම.\nශ්‍රී දන්ත ධාතූන් වහන්සේගේ භාරකාරිත්වය උඩරට රජුගේ ස්වෛරීභාවයේ සංකේතය විය.',
      ta: 'கி.பி. 1469 இல் சேனசம்மத விக்ரமபாகுவினால் நிறுவப்பட்ட கண்டி இராச்சியம் (செங்கடகல) 300 ஆண்டுகளுக்கும் மேலாக சுதந்திரத்தின் கோட்டையாக விளங்கியது. மகாவலி கங்கையின் வளைவு, அடர்ந்த காடுகள் மற்றும் "பலன கணவாய்" போன்ற இயற்கை அரண்கள் ஐரோப்பிய படையெடுப்புகளில் இருந்து கண்டி ராச்சியத்தைப் பாதுகாத்தன.',
    },
    visualCard: {
      title: 'Geographic Fortifications of the Kandyan Kingdom',
      diagramType: 'infographic',
      content: 'Mahaweli River Loop  +  Dense Tropical Forest  +  Balana Pass Bottleneck  ➔  Impregnable Mountain Citadel',
      caption: 'Textbook Chapter 8: Natural Topography as the Core National Defense System.'
    },
    realWorldExample: {
      en: 'Standing at the Balana Pass observation post today, one can look down across the steep drop toward the western lowlands—ancient Kandyan lookouts stationed here signaled approaching Portuguese troops miles away, preparing devastating rock-fall ambushes!',
      si: 'බලන මුරපොළේ සිට බටහිර පහතරට දෙස බලන විට, කොළඹ සිට එන පෘතුගීසි සේනාවන් සැතපුම් ගණනාවකට පෙර හඳුනාගෙන ගල් පෙරළා පහරදීමට උඩරට සෙබළුන් සූදානම් වූ ආකාරය සිතින් මවාගත හැක!',
      ta: 'பலன கணவாயில் நின்றால் மேற்கே உள்ள தாழ்நிலங்களை தெளிவாகப் பார்க்கலாம்; இங்கு நின்றே கண்டி வீரர்கள் போர்த்துக்கேய படைகளின் வருகையைக் கண்காணித்து பாறைகளை உருட்டி தாக்கும் கெரில்லா தாக்குதல்களை நடத்தினர்!',
    },
    checkQuestion: {
      id: 'hist-kan-q1',
      subjectId: 'history',
      topicId: 'history-gr10-kandyan-kingdom',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which perilous mountain pass served as the crucial strategic choke-point defending the entrance into the Kandyan mountain kingdom against invading coastal colonial armies?',
        si: 'පහතරට වෙරළබඩ ආක්‍රමණික හමුදාවන්ගෙන් කන්ද උඩරට රාජධානිය ආරක්ෂා කරමින් උඩරටට ඇතුළුවන ප්‍රධාන මර්මස්ථානය වූ උපායමාර්ගික කපොල්ල කුමක්ද?',
        ta: 'கரையோர காலனித்துவ படைகளின் ஆக்கிரமிப்பிலிருந்து கண்டி இராச்சியத்தை பாதுகாத்த பிரதான மூலோபாய கணவாய் எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Balana Pass (බලන කපොල්ල)', si: 'බලන කපොල්ල', ta: 'பலன கணவாய்' } },
        { id: 'opt-2', text: { en: 'Ella Gap', si: 'ඇල්ල කපොල්ල', ta: 'எல்ல கணவாய்' } },
        { id: 'opt-3', text: { en: 'Elephant Pass', si: 'අලිමංකඩ', ta: 'ஆனையிறவு' } },
        { id: 'opt-4', text: { en: 'Ramboda Pass', si: 'රම්බොඩ කපොල්ල', ta: 'ரம்பொட கணவாய்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The Balana Pass was the gateway to the Kandyan kingdom. Its sheer precipices allowed Kandyan guerrilla warriors to monitor enemy movements and inflict crushing defeats on invading European armies.',
        si: 'බලන කපොල්ල උඩරටට ඇතුළුවන ප්‍රධාන මුරදොර වූ අතර, එම දුෂ්කර පටු මාර්ගය ඔස්සේ පැමිණි පෘතුගීසි හා ඉංග්‍රීසි හමුදාවන්ට දැඩි ප්‍රහාර එල්ල කිරීමට උඩරට රණවිරුවන්ට හැකිවිය.',
        ta: 'பலன கணவாயே கண்டி இராச்சியத்தின் நுழைவு வாயிலாக இருந்தது; செங்குத்தான இதன் அமைப்பினால் அந்நியப் படைகளை கண்டி வீரர்கள் எளிதில் தாக்கி முறியடித்தனர்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 8: The Geographic Defense of Kandy (Textbook p. 126–129)',
    }
  },
  {
    id: 'hist-kan-2',
    stepNumber: 2,
    title: {
      en: 'Defeat of European Armies: Danture, Randeniwela & Gannoruwa',
      si: 'යුරෝපීය හමුදා පරාජය කළ ඓතිහාසික සටන් (දන්තුරේ, රන්දෙණිවෙල, ගන්නොරුව)',
      ta: 'ஐரோப்பிய படைகளை தோற்கடித்த வரலாற்று போர்கள் (தந்துறை, ரந்தெனிவெல, கன்னொருவ)',
    },
    concept: {
      en: 'The Kandyan army mastered guerrilla warfare, scorched-earth tactics, and forest ambushes, annihilating several powerful European invasion forces:\n1. **Battle of Danture (1594 CE):** King Vimaladharmasuriya I completely wiped out the Portuguese army led by Pero Lopes de Sousa and captured Kusumasana Devi (Dona Catherina), securing the Kandyan throne.\n2. **Battle of Randeniwela (1630 CE):** Prince Rajasinha (later Rajasinha II) surrounded and crushed the Portuguese army; Captain-General Constantino de Sá was killed.\n3. **Battle of Gannoruwa (1638 CE):** King Rajasinha II and his brother Vijayapala annihilated General Diogo de Melo de Castro\'s Portuguese expedition in the last great battle against the Portuguese in the hill country.',
      si: 'උඩරට රණවිරුවෝ ගරිල්ලා සටන් ක්‍රම, සැඟවී සිට පහරදීම් සහ සතුරාට ආහාර නොලැබෙන පරිදි ගම් පාළු කිරීමේ උපක්‍රම මඟින් පෘතුගීසි හමුදා පිට පිට සමූලඝාතනය කළහ:\n1. **දන්තුරේ සටන (ක්‍රි.ව. 1594):** 1 වන විමලධර්මසූරිය රජු විසින් පේරෝ ලෝපෙස් ද සූසාගේ පෘතුගීසි හමුදාව මුළුමනින්ම විනාශ කර කුසුමාසන දේවිය (දෝන කතිරිනා) සරණපාවාගෙන උඩරට රජු බවට පත්වීම.\n2. **රන්දෙණිවෙල සටන (ක්‍රි.ව. 1630):** රාජසිංහ කුමරු ප්‍රමුඛ උඩරට හමුදා කොන්ස්තන්තීනු ද සා සෙනෙවියාගේ පෘතුගීසි සේනාව වටලා සමූලඝාතනය කිරීම.\n3. **ගන්නොරුව සටන (ක්‍රි.ව. 1638):** 2 වන රාජසිංහ රජු සහ විජයපාල කුමරු විසින් දියෝගු ද මේලෝගේ පෘතුගීසි හමුදාව ගන්නොරුවේදී සහමුලින්ම පරාජය කිරීම.',
      ta: 'கண்டி மன்னர்கள் கெரில்லா போர்த்தந்திரங்கள் மூலம் போர்த்துக்கேய படைகளை பெரும் போர்களில் முறியடித்தனர்:\n1. தந்துறைப் போர் (1594): முதலாம் விமலதர்மசூரிய மன்னன் பேரோ லோபஸ் டி சோசாவின் படையை அழித்தான்.\n2. ரந்தெனிவெல போர் (1630): கான்ஸ்டன்டினோ டி சாவின் போர்த்துக்கேய படைகள் அழிக்கப்பட்டன.\n3. கன்னொருவப் போர் (1638): இரண்டாம் ராஜசிங்கன் போர்த்துக்கேய படைகளை முற்றாக தோற்கடித்தான்.',
    },
    visualCard: {
      title: 'Three Decisive Military Triumphs of Kandy',
      diagramType: 'infographic',
      content: 'Danture (1594: Vimaladharmasuriya I) ➔ Randeniwela (1630: Rajasinha II) ➔ Gannoruwa (1638: Decisive Expulsion)',
      caption: 'Guerrilla strategy and monsoon ambushes defended the sovereign sovereignty of Sri Lanka.'
    },
    realWorldExample: {
      en: 'The battleground of Gannoruwa lies right by the modern Peradeniya Botanical Gardens along the Mahaweli River: here in 1638, only 33 Portuguese soldiers survived out of an invading force of thousands!',
      si: 'පේරාදෙණිය උද්භිද උද්‍යානය අසල මහවැලි නදී ඉවුරේ පිහිටි ගන්නොරුව සටන් බිමේදී 1638 වසරේ පැමිණි දහස් ගණනක් වූ පෘතුගීසි සේනාවෙන් දිවි බේරාගැනීමට හැකිවූයේ සෙබළුන් 33 දෙනෙකුට පමණි!',
      ta: 'பேராதனை தாவரவியல் பூங்காவிற்கு அருகில் உள்ள கன்னொருவ போர்க்களத்தில் 1638 இல் வந்த ஆயிரக்கணக்கான போர்த்துக்கேய வீரர்களில் வெறும் 33 பேர் மட்டுமே உயிர்தப்பினர்!',
    },
    checkQuestion: {
      id: 'hist-kan-q2',
      subjectId: 'history',
      topicId: 'history-gr10-kandyan-kingdom',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'In which famous battle of 1594 CE did King Vimaladharmasuriya I annihilate the Portuguese invasion force of Pero Lopes de Sousa, firmly cementing Kandyan independence?',
        si: '1594 දී පේරෝ ලෝපෙස් ද සූසාගේ පෘතුගීසි හමුදාව සමූලඝාතනය කරමින් 1 වන විමලධර්මසූරිය රජු උඩරට රාජධානියේ ස්වාධීනත්වය තහවුරු කළ ඓතිහාසික සටන කුමක්ද?',
        ta: 'கி.பி. 1594 இல் போர்த்துக்கேய தளபதி பேரோ லோபஸ் டி சோசாவின் படையை முற்றாக அழித்து கண்டி ராச்சியத்தின் சுதந்திரத்தை உறுதிப்படுத்திய போர் எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Battle of Danture (දන්තුරේ සටන)', si: 'දන්තුරේ සටන', ta: 'தந்துறைப் போர்' } },
        { id: 'opt-2', text: { en: 'Battle of Mulleriyawa', si: 'මුල්ලේරියාව සටන', ta: 'முல்லேரியாவ போர்' } },
        { id: 'opt-3', text: { en: 'Battle of Gannoruwa', si: 'ගන්නොරුව සටන', ta: 'கன்னொருவ போர்' } },
        { id: 'opt-4', text: { en: 'Battle of Randeniwela', si: 'රන්දෙණිවෙල සටන', ta: 'ரந்தெனிவெல போர்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The Battle of Danture (1594) was a turning point in Sri Lankan history: King Vimaladharmasuriya I crushed the Portuguese army, married Kusumasana Devi, and established the Dynasty of Kandy that lasted over two centuries.',
        si: '1594 දන්තුරේ සටනේදී පෘතුගීසි හමුදාව පරදවා කුසුමාසන දේවිය සරණපාවාගත් 1 වන විමලධර්මසූරිය රජු සියවස් දෙකකට වැඩි කාලයක් පැවති උඩරට රාජවංශය ස්ථිරව පිහිටුවීය.',
        ta: '1594 இல் நடந்த தந்துறைப் போரில் முதலாம் விமலதர்மசூரியன் வெற்றி பெற்று குசுமாசன தேவியை மணந்து இரு நூற்றாண்டுகளுக்கு மேலான கண்டி வம்சத்தை நிலைநாட்டினான்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 8: Battles of Danture, Randeniwela, and Gannoruwa (Textbook p. 130–134)',
    }
  },
  {
    id: 'hist-kan-3',
    stepNumber: 3,
    title: {
      en: 'Kandyan Administration & The Rajakariya Service System',
      si: 'උඩරට පාලන තන්ත්‍රය සහ රාජකාරි ක්‍රමය',
      ta: 'கண்டி நிர்வாகக் கட்டமைப்பும் ராஜகாரிய சேவை முறையும்',
    },
    concept: {
      en: 'The Kandyan state operated under a decentralized feudal administration:\n- **Monarch:** Governed according to custom and Buddhist ethics, assisted by the Supreme Council of Ministers.\n- **Adikars (Maha Nilames):** The two highest ministers of state—Pallegampahe and Udagampahe Adikars.\n- **Disavas:** Governors of the outer provinces (Disavanis: Matale, Uva, Wellassa, Sabaragamuwa, Seven Korales, Four Korales).\n- **Rate Mahattayas:** Governors of the inner home districts (Ratas: Udunuwara, Yatinuwara, Harispattuwa, Dumbara).\n- **The Rajakariya System:** Land ownership was bound to mandatory public service. Landholders rendered specialized services (irrigation repair, defense, palace craftwork, temple rituals) to the crown without monetary salaries.',
      si: 'උඩරට රාජධානිය ක්‍රමානුකූල විමධ්‍යගත පාලන ක්‍රමයකින් සමන්විත විය:\n- **රජතුමා:** රාජ්‍යයේ ප්‍රධානියා වූ අතර සිරිත් විරිත්වලට අනුව පාලනය ගෙන ගියේය.\n- **අදිකාරම්වරු (මහා නිලමේවරු):** රජුට පසු ප්‍රධානතම නිලධාරීන් වූ පල්ලේගම්පහේ සහ උඩගම්පහේ අදිකාරම්වරු.\n- **දිසාවේවරු:** උඩරටට අයත් පිටත පළාත් (දිසාවන්: මාතලේ, ඌව, වෙල්ලස්ස, සබරගමුව, සත් කෝරළය, සතර කෝරළය) පාලනය කළ ප්‍රධානීන්.\n- **රටේ මහත්වරු:** අගනුවර අවට අභ්‍යන්තර රටවල් (උඩුනුවර, යටිනුවර, හාරිස්පත්තුව, දුම්බර) පාලනය කළ ප්‍රධානීන්.\n- **රාජකාරි ක්‍රමය:** ඉඩම් භුක්තිය වෙනුවෙන් රජයට හෝ පන්සලට සේවය සැපයීමේ ක්‍රමයයි. මුදල් වැටුප් නොමැතිව වැව් නඩත්තුව, යුද සේවය හා විහාර කටයුතු පවත්වාගෙන ගියේ රාජකාරි ක්‍රමයෙනි.',
      ta: 'கண்டி நிர்வாகத்தில் மன்னருக்கு அடுத்தபடியாக அதிகாரங்கள் (மகா நிலமேக்கள்) இருந்தனர். எல்லைப்புற மாகாணங்களை திசாவைகளும், உள்நாட்டுப் பகுதிகளை ரட்டே மகத்துவருகளும் நிர்வகித்தனர். நிலத்தை அனுபவிப்பதற்கு பகரமாக மன்னருக்கோ அல்லது விகாரைக்கோ சேவை செய்யும் "ராஜகாரிய முறை" நடைமுறையில் இருந்தது.',
    },
    visualCard: {
      title: 'Administrative Hierarchy of Kandy',
      diagramType: 'infographic',
      content: 'King  ➔  Adikars (Pallegampahe / Udagampahe)  ➔  Disavas (Outer Provinces)  ➔  Rate Mahattayas (Inner Districts)',
      caption: 'Textbook Chapter 8: The Rajakariya system financed public works and national defense.'
    },
    realWorldExample: {
      en: 'The famous Kandy Esala Perahera is organized to this day through traditional Rajakariya: drummers, whip-crackers, and flag-bearers perform their hereditary sacred duties linked to ancient temple lands (Viharagam and Devalagam)!',
      si: 'අදටත් පැවැත්වෙන මහනුවර ඇසළ පෙරහැරේ නැට්ටුවන්, බෙරකරුවන්, කසකරුවන් සහ කොඩි රැගෙන යන්නන් එම පූජනීය කාර්යයන් ඉටුකරන්නේ පාරම්පරික විහාරගම් සහ දේවාලගම් වෙනුවෙන් පැවති රාජකාරි ක්‍රමය අනුවය!',
      ta: 'இன்றும் கண்டி எசல பெரஹராவில் மேளம் அடிப்போர், சவுக்கடி வீரர்கள் மற்றும் நடனக் கலைஞர்கள் தங்கள் பாரம்பரிய கடமைகளை ராஜகாரிய முறையின் படியே மேற்கொள்கின்றனர்!',
    },
    checkQuestion: {
      id: 'hist-kan-q3',
      subjectId: 'history',
      topicId: 'history-gr10-kandyan-kingdom',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Under the Kandyan administrative hierarchy, what official title was held by the provincial governors in charge of the outer border provinces (Disavanis)?',
        si: 'උඩරට රාජධානියේ පාලන ව්‍යුහය තුළ මාතලේ, ඌව, වෙල්ලස්ස වැනි පිටත පළාත් (දිසාවන්) පාලනය කළ ප්‍රධාන නිලධාරීන් හැඳින්වූයේ කුමන නමකින්ද?',
        ta: 'கண்டி நிர்வாக அமைப்பில் மாத்தளை, ஊவா போன்ற எல்லைப்புற மாகாணங்களை (திசாவானிகளை) நிர்வகித்த அதிகாரிகளின் பதவிப்பெயர் யாது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Disava (දිසාව / දිසාවේවරු)', si: 'දිසාවේවරු', ta: 'திசாவை' } },
        { id: 'opt-2', text: { en: 'Rate Mahattaya', si: 'රටේ මහත්වරු', ta: 'ரட்டே மகத்துவய' } },
        { id: 'opt-3', text: { en: 'Vidane', si: 'විදානේ', ta: 'விதானே' } },
        { id: 'opt-4', text: { en: 'Mohottala', si: 'මොහොට්ටාල', ta: 'மொஹொட்டால' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The Disavas governed the outer Disavanis (provinces) of the Kandyan kingdom, exercising civil, military, and judicial authority on behalf of the King.',
        si: 'උඩරට රාජධානියේ පිටත පළාත් පාලනය කළ නිලධාරීන් දිසාවේවරුන් වූ අතර, අගනුවර ආසන්න අභ්‍යන්තර ප්‍රදේශ පාලනය කළේ රටේ මහත්වරුන් විසිනි.',
        ta: 'கண்டி இராச்சியத்தின் வெளி மாகாணங்களை திசாவைகளும், உள் வட்டாரங்களை ரட்டே மகத்துவருகளும் ஆட்சி செய்தனர்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 8: Administrative Structure of Kandy (Textbook p. 135–138)',
    }
  },
  {
    id: 'hist-kan-4',
    stepNumber: 4,
    title: {
      en: 'Buddhist Revival (Velivita Saranankara Thero) & The 1815 Fall of Kandy',
      si: 'සඟරජ හිමියන්ගේ ශාසනික පුනරුදය සහ 1815 උඩරට ගිවිසුම',
      ta: 'சங்கராஜ தேரரின் பௌத்த மறுமலர்ச்சியும் 1815 கண்டி வீழ்ச்சியும்',
    },
    concept: {
      en: 'By the 18th century, monastic discipline and higher ordination (Upasampada) had completely vanished due to ceaseless warfare. Ven. Velivita Sri Saranankara Thero led a heroic revival. With royal support from King Kirti Sri Rajasinha, a diplomatic mission sailed to Siam (Thailand) aboard Dutch ships in 1753. Thai monks led by Ven. Upali Thero arrived in Kandy, restoring Upasampada and founding the **Siyam Nikaya** (Ven. Saranankara was elevated to Sangharaja).\nHowever, during the reign of King Sri Vikrama Rajasinha, internal friction between the Nayakkar royalty and Kandyan chieftains (led by Ehelepola and Molligoda) led to betrayal. On March 2, 1815, the **Kandyan Convention** was signed, ceding sovereignty to the British Empire and extinguishing 2,357 years of independent Sri Lankan monarchy.',
      si: 'නිරන්තර යුද්ධ නිසා 18 වන සියවස වන විට මෙරට උපසම්පදාව මුළුමනින්ම අතුරුදහන්ව ගණින්නාන්සේලා බිහිවී තිබිණි. වැලිවිට ශ්‍රී සරණංකර හිමියන්ගේ මූලිකත්වයෙන් හා කීර්ති ශ්‍රී රාජසිංහ රජුගේ අනුග්‍රහයෙන් 1753 දී ලන්දේසි නැවකින් තායිලන්තයට (සියම) දූත පිරිසක් යවන ලදී. උපාලි තෙරුන් ප්‍රමුඛ තායි මහා සංඝරත්නය මෙරටට වැඩමවා උපසම්පදාව යළි පිහිටුවා **සියම් මහා නිකාය** ආරම්භ කරන ලද අතර, සරණංකර හිමියෝ සංඝරාජ පදවියට පත්වූහ.\nපසුකාලීනව ශ්‍රී වික්‍රම රාජසිංහ රජු සහ ඇහැලේපොළ, මොල්ලීගොඩ වැනි උඩරට රදළයන් අතර ඇතිවූ ගැටුම් හේතුවෙන් 1815 මාර්තු 2 වන දින **උඩරට ගිවිසුම** අත්සන් කරමින් වසර 2357ක මෙරට ස්වාධීන රාජාවලිය නිමාවට පත්වෙමින් රට බ්‍රිතාන්‍ය කිරීටයට යටත් විය.',
      ta: '18 ஆம் நூற்றாண்டில் பௌத்த உபசம்பதா முற்றிலும் அழிந்துபோன போது, வெலிவிட்ட ஸ்ரீ சரணங்கர தேரர் கீர்த்தி ஸ்ரீ ராஜசிங்க மன்னனின் ஆதரவுடன் தாய்லாந்திலிருந்து (சியாம்) துறவிகளை அழைத்து வந்து 1753 இல் உபசம்பதாவை மீள நிறுவினார் (சியாம் நிகாயா).\nபின்னர் ஸ்ரீ விக்கிரம ராஜசிங்க மன்னனுக்கும் பிரதானிகளுக்கும் (எஹெலேபொல) இடையில் ஏற்பட்ட பிளவினால், 1815 மார்ச் 2 இல் கண்டி ஒப்பந்தம் கையெழுத்திடப்பட்டு நாடு பிரித்தானியரிடம் வீழ்ச்சியடைந்தது.',
    },
    visualCard: {
      title: 'Buddhist Renaissance to Colonial Annexation',
      diagramType: 'infographic',
      content: '1753: Siamese Upasampada Restoration (Sangharaja Saranankara)  ➔  1815: Kandyan Convention (British Crown)',
      caption: 'The twilight of the independent Kingdom of Kandy.'
    },
    realWorldExample: {
      en: 'The Malwatta and Asgiriya Maha Viharas in Kandy stand today as the historic twin chapters of the Siyam Nikaya, where the sacred lineage of Higher Ordination restored in 1753 continues unbroken to this day.',
      si: 'මහනුවර මල්වතු සහ අස්ගිරි මහා විහාර ද්විත්වය අදටත් 1753 දී සියමෙන් රැගෙන ආ පූජනීය උපසම්පදා පරම්පරාව අඛණ්ඩව සුරකිමින් සම්බුද්ධ ශාසනය මෙහෙයවන ප්‍රධාන මධ්‍යස්ථාන වේ.',
      ta: 'கண்டி மல்வத்தை மற்றும் அஸ்கிரிய விகாரைகள் 1753 இல் சியாமிலிருந்து கொண்டுவரப்பட்ட உபசம்பதா மரபை இன்றும் பாதுகாத்து வரும் பிரதான பீடங்களாகும்.',
    },
    checkQuestion: {
      id: 'hist-kan-q4',
      subjectId: 'history',
      topicId: 'history-gr10-kandyan-kingdom',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'From which Buddhist nation was the sacred Higher Ordination (Upasampada) reintroduced to Sri Lanka in 1753 CE under the guidance of Ven. Velivita Sri Saranankara Thero?',
        si: 'වැලිවිට ශ්‍රී සරණංකර හිමියන්ගේ සහ කීර්ති ශ්‍රී රාජසිංහ රජුගේ මූලිකත්වයෙන් 1753 දී ශ්‍රී ලංකාවට උපසම්පදාව යළි වැඩමවන ලද්දේ කවර බෞද්ධ රාජ්‍යයෙන්ද?',
        ta: '1753 இல் வெலிவிட்ட ஸ்ரீ சரணங்கர தேரரின் வழிகாட்டலில் எந்த பௌத்த நாட்டிலிருந்து இலங்கைக்கு உபசம்பதா மீளக் கொண்டுவரப்பட்டது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Siam (Thailand / සියම / තායිලන්තය)', si: 'සියම (තායිලන්තය)', ta: 'சியாம் (தாய்லாந்து)' } },
        { id: 'opt-2', text: { en: 'Burma (Myanmar)', si: 'බුරුමය (මියන්මාරය)', ta: 'மியான்மார் (பர்மா)' } },
        { id: 'opt-3', text: { en: 'Cambodia', si: 'කාම්බෝජය', ta: 'கம்போடியா' } },
        { id: 'opt-4', text: { en: 'Tibet', si: 'ටිබෙටය', ta: 'திபெத்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'In 1753 CE, a religious delegation led by Ven. Upali Thero arrived from Siam (modern Thailand) aboard a Dutch vessel, re-establishing legitimate Upasampada and inaugurating the Siyam Maha Nikaya.',
        si: '1753 දී සියමෙන් (තායිලන්තයෙන්) උපාලි තෙරුන් ප්‍රමුඛ සංඝරත්නය වැඩමවා මල්වතු විහාරයේදී උපසම්පදාව යළි පිහිටුවූ අතර එය සියම් මහා නිකාය ලෙස ප්‍රකට විය.',
        ta: '1753 இல் சியாம் (தாய்லாந்து) நாட்டிலிருந்து உபாலி தேரர் தலைமையிலான துறவிகள் மூலம் உபசம்பதா மீள நிறுவப்பட்டு சியாம் நிகாயா தோற்றுவிக்கப்பட்டது.',
      },
      syllabusReference: 'Grade 10 History — Chapter 8: The Buddhist Revival and Fall of Kandy (Textbook p. 139–144)',
    }
  }
];

// ----------------------------------------------------------------------------
// CHAPTER 9: THE EUROPEAN RENAISSANCE (යුරෝපයේ පුනරුදය)
// ----------------------------------------------------------------------------
export const TEACH_ME_HISTORY_RENAISSANCE_STEPS: LessonStep[] = [
  {
    id: 'hist-ren-1',
    stepNumber: 1,
    title: {
      en: 'Birth of the Renaissance & The Rise of Humanism in Italy',
      si: 'පුනරුදයේ උදාව සහ ඉතාලියේ මානවවාදය බිහිවීම',
      ta: 'மறுமலர்ச்சியின் தோற்றமும் இத்தாலியில் மனிதநேயத்தின் எழுச்சியும்',
    },
    concept: {
      en: 'The Renaissance ("Rebirth") was a revolutionary cultural, artistic, and intellectual movement that began in 14th-century northern Italy (Florence, Venice) and swept across Europe into the 17th century. Key catalysts:\n1. **Fall of Constantinople (1453 CE):** When Ottoman Turks conquered the Byzantine capital, fleeing Greek scholars brought ancient Greek and Roman manuscripts to Italy.\n2. **Wealthy Patrons:** Rich banking families, notably the **Medici of Florence**, generously sponsored scholars, architects, and artists.\n3. **Rise of Humanism (මානවවාදය):** Spearheaded by Francesco Petrarch ("Father of Humanism") and Erasmus, humanism shifted thought away from medieval ecclesiastical dogma toward human reason, dignity, free inquiry, and worldly appreciation.',
      si: 'පුනරුදය (Renaissance) යනු 14 වන සියවසේදී ඉතාලියේ ෆ්ලෝරන්ස්, වැනීසිය ආශ්‍රිතව ආරම්භ වී යුරෝපය පුරා ව්‍යාප්ත වූ මහා සංස්කෘතික හා බුද්ධිමය පිබිදීමයි. ප්‍රධාන සාධක:\n1. **කොන්ස්තන්තිනෝපලය තුර්කිවරුන්ට යටත්වීම (ක්‍රි.ව. 1453):** බයිසන්ටයින් අගනුවර ඔටෝමන් තුර්කිවරුන් අතට පත්වූ විට ග්‍රීක විද්වතුන් පැරණි ග්‍රීක-රෝම දර්ශන ග්‍රන්ථ රැගෙන ඉතාලියට පලා ඒම.\n2. **ධනවත් අනුග්‍රාහකයන්:** ෆ්ලෝරන්ස් නුවර මෙඩිසි (Medici) වැනි ධනවත් වෙළඳ පවුල් කලාකරුවන්ට හා දාර්ශනිකයන්ට නොමසුරුව අනුග්‍රහය දැක්වීම.\n3. **මානවවාදය (Humanism):** පෙට්‍රාක් ("මානවවාදයේ පියා") සහ ඉරැස්මස් වැන්නන් මධ්‍යකාලීන පල්ලියේ අන්ධ විශ්වාස වෙනුවට මිනිසාගේ තර්ක බුද්ධිය, ගරුත්වය සහ නිදහස් චින්තනය අගය කළ මානවවාදී දර්ශනය පෙරට ගැනීම.',
      ta: 'மறுமலர்ச்சி (Renaissance) என்பது 14 ஆம் நூற்றாண்டில் இத்தாலியின் புளோரன்ஸ் நகரில் தோன்றி ஐரோப்பாவை மாற்றிய கலாசார இயக்கமாகும். கான்ஸ்டான்டிநோபிலின் வீழ்ச்சி (1453), மெடிசி குடும்பத்தினரின் ஆதரவு மற்றும் பெட்ரார்க்கினால் வழிநடத்தப்பட்ட மனிதநேயம் (Humanism) ஆகியவை இதன் தூண்களாக அமைந்தன.',
    },
    visualCard: {
      title: 'Catalysts of the European Renaissance',
      diagramType: 'infographic',
      content: 'Fall of Constantinople (1453)  +  Medici Family Patronage  +  Humanism (Petrarch)  ➔  Cultural Transformation',
      caption: 'Textbook Chapter 9: The transition from Medieval Scholasticism to Modern Humanism.'
    },
    realWorldExample: {
      en: 'Walking through the Uffizi Gallery in Florence today, you can witness the sudden transition from flat, rigid, emotionless medieval saints to breathtaking, lifelike Renaissance portraits alive with light, shadow, and human joy!',
      si: 'ඉතාලියේ ෆ්ලෝරන්ස් කෞතුකාගාරයේ ඇති චිත්‍ර පරීක්ෂා කිරීමේදී, මධ්‍යකාලීන පැතලි ආගමික රූප වෙනුවට ජීවමාන මිනිස් හැඟීම්, ආලෝකය හා සෙවනැලි සහිත පුනරුද චිත්‍රවල ඇති විස්මිත වෙනස පැහැදිලිව පෙනේ!',
      ta: 'புளோரன்ஸ் நகரின் ஓவியங்களை ஆராயும் போது, இடைக்காலத்தின் உணர்ச்சியற்ற தட்டையான ஓவியங்களுக்குப் பதிலாக ஒளியும் நிழலும் நிறைந்த மனித உணர்வுகளைக் காட்டும் மறுமலர்ச்சி ஓவியங்களின் தனித்துவத்தை உணரலாம்!',
    },
    checkQuestion: {
      id: 'hist-ren-q1',
      subjectId: 'history',
      topicId: 'history-gr10-renaissance',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'What intellectual movement pioneered by Francesco Petrarch during the Renaissance shifted focus from medieval church dogma toward human reason, dignity, and critical inquiry?',
        si: 'පුනරුද සමයේදී ෆ්‍රැන්සිස්කෝ පෙට්‍රාක් විසින් මූලිකත්වය ගනිමින්, මධ්‍යකාලීන පල්ලියේ අන්ධ ආගමික මතවාද වෙනුවට මිනිසාගේ තර්ක බුද්ධිය, නිදහස හා ගරුත්වය පෙරදැරි කරගත් චින්තන ව්‍යාපාරය කුමක්ද?',
        ta: 'மறுமலர்ச்சிக் காலத்தில் பெட்ரார்க் என்பவரால் முன்னெடுக்கப்பட்டு, மதக் கோட்பாடுகளுக்குப் பதிலாக மனித பகுத்தறிவு மற்றும் கண்ணியத்திற்கு முக்கியத்துவம் அளித்த சிந்தனை இயக்கம் எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Humanism (මානවවාදය / மனிதநேயம்)', si: 'මානවවාදය (Humanism)', ta: 'மனிதநேயம் (Humanism)' } },
        { id: 'opt-2', text: { en: 'Scholasticism', si: 'ශාස්ත්‍රාලික වාදය', ta: 'மதவாதக் கல்வி முறை' } },
        { id: 'opt-3', text: { en: 'Feudalism', si: 'වැඩවසම් වාදය', ta: 'நிலப்பிரபுத்துவம்' } },
        { id: 'opt-4', text: { en: 'Mercantilism', si: 'වෙළඳ වාදය', ta: 'வணிகவாதம்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Humanism celebrated the inherent potential, beauty, and intellectual capacity of human beings, displacing blind medieval ecclesiastical authority with secular inquiry.',
        si: 'මානවවාදය මඟින් මධ්‍යකාලීන පල්ලියේ පීඩාකාරී මතවාද බිඳදමා, මිනිසාගේ චින්තන නිදහස සහ ලෞකික ජීවිතයේ සතුට හා අගය ලොවට පෙන්වා දුන්නේය.',
        ta: 'மனிதநேயம் மனிதனின் உள்ளார்ந்த ஆற்றலையும் சிந்திக்கும் திறனையும் போற்றி இடைக்கால மதக் கட்டுப்பாடுகளை உடைத்தெறிந்தது.',
      },
      syllabusReference: 'Grade 10 History — Chapter 9: The Renaissance and Humanism (Textbook p. 148–152)',
    }
  },
  {
    id: 'hist-ren-2',
    stepNumber: 2,
    title: {
      en: 'Renaissance Art, Sculpture & Architecture',
      si: 'පුනරුද කලාව, මූර්ති ශිල්පය සහ වාස්තු විද්‍යාව',
      ta: 'மறுமலர்ச்சி கலை, சிற்பக்கலை மற்றும் கட்டிடக்கலை',
    },
    concept: {
      en: 'Renaissance artists revolutionized aesthetics by applying mathematics, human anatomy, linear perspective (3D illusion of depth), and Chiaroscuro (dramatic light and shadow). Titans of the Renaissance:\n- **Leonardo da Vinci:** The quintessential "Renaissance Polymath"—painter of the *Mona Lisa* and *The Last Supper*, pioneer of anatomy and flying machine designs.\n- **Michelangelo Buonarroti:** Sculptor of the monumental marble *David* and *Pieta*, painter of the Sistine Chapel ceiling frescoes, and architect of St. Peter\'s Basilica dome.\n- **Raphael Sanzio:** Master of balance and harmony, painter of *The School of Athens* depicting Greek philosophers.\nArchitecture returned to classical Roman domes, arches, and symmetrical columns (Brunelleschi\'s dome of Florence Cathedral).',
      si: 'පුනරුද කලාකරුවෝ ගණිතය, මානව කායව්‍යවච්ඡේදය (Anatomy), රේඛීය පර්යාවලෝකනය (ත්‍රිමාණ හැඟීම) සහ ආලෝකය-සෙවනැල්ල (Chiaroscuro) උපයෝගී කරගනිමින් විප්ලවයක් කළහ:\n- **ලියනාඩෝ ඩා වින්චි:** සර්වතෝභද්‍ර ප්‍රාඥයා - *මොනාලිසා* සහ *අවසාන භෝජන සංග්‍රහය* සිතුවම් කළ අතර, විද්‍යාත්මක සොයාගැනීම් හා ගුවන් යානා සැලසුම් කළේය.\n- **මයිකල් ආන්ජලෝ:** *ඩේවිඩ්* සහ *පියෙටා* අසමසම කිරිගරුඬ මූර්ති නෙළූ, සිස්ටීන් දේවස්ථානයේ වහලයේ අලංකාර සිතුවම් ඇඳි සහ ශාන්ත පීතර බැසිලිකාවේ දැවැන්ත ගෝලාකාර වහලය නිර්මාණය කළ මහා ශිල්පියා.\n- **රාෆායෙල් සැන්සියෝ:** ප්ලේටෝ, ඇරිස්ටෝටල් ඇතුළු දාර්ශනිකයන් දැක්වෙන *ඇතැන්ස් ඇකඩමිය* සිතුවම නිර්මාණය කළ ශිල්පියා.\nගෘහ නිර්මාණ ශිල්පයේදී බෲනලෙස්කි විසින් ෆ්ලෝරන්ස් ආසන දෙව්මැඳුරේ දැවැන්ත ගෝලාකාර වහලය තනමින් සම්භාව්‍ය රෝම ආකෘති යළි පණගැන්වීය.',
      ta: 'மறுமலர்ச்சி கலைஞர்கள் மனித உடற்கூறியல், முப்பரிமாணக் காட்சி (Perspective), மற்றும் ஒளிக் கலவையைப் பயன்படுத்தி கலைப் புரட்சி செய்தனர். லியனார்டோ டா வின்சி (மொனாலிசா), மைக்கலேஞ்சலோ (டேவிட் சிலை, சிஸ்டைன் தேவாலய கூரை ஓவியங்கள்), மற்றும் ரபாயெல் (ஏதென்ஸ் பள்ளி) ஆகியோர் இதில் தலைசிறந்தவர்களாவர்.',
    },
    visualCard: {
      title: 'Triumvirate of Renaissance High Art',
      diagramType: 'infographic',
      content: 'Leonardo da Vinci (Mona Lisa)  •  Michelangelo (David / Sistine Chapel)  •  Raphael (School of Athens)',
      caption: 'Infusing mathematical perspective and anatomical realism into world art.'
    },
    realWorldExample: {
      en: 'Looking into the eyes of the Mona Lisa at the Louvre Museum in Paris, you can observe Leonardo da Vinci\'s sfumato technique: blending colors without outlines, mimicking human peripheral vision perfectly!',
      si: 'පැරිසියේ ලූවර් කෞතුකාගාරයේ ඇති මොනාලිසා සිතුවම දෙස බලන විට, දැඩි රේඛා රහිතව වර්ණ ක්‍රමයෙන් මුසුකරමින් මිනිස් ඇසේ ස්වාභාවික දෘෂ්ටිය ප්‍රතිනිර්මාණය කළ ලියනාඩෝගේ ස්ෆුමාටෝ (Sfumato) ශිල්පීය ක්‍රමය දැකගත හැක!',
      ta: 'பாரிஸ் லூவர் அருங்காட்சியகத்திலுள்ள மொனாலிசா ஓவியத்தில் கோடுகளின்றி மென்மையான வண்ணக் கலவை மூலம் முகபாவங்களை உயிரோட்டமாக காட்டிய டா வின்சியின் கலைத்திறனைக் காணலாம்!',
    },
    checkQuestion: {
      id: 'hist-ren-q2',
      subjectId: 'history',
      topicId: 'history-gr10-renaissance',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which iconic Renaissance master polymath created the timeless paintings "Mona Lisa" and "The Last Supper", while pioneering anatomical diagrams and engineering sketches?',
        si: 'ලොව සුප්‍රකට "මොනාලිසා" සහ "අවසාන භෝජන සංග්‍රහය" සිතුවම් කරමින්, මානව කායව්‍යවච්ඡේද විද්‍යාව සහ ඉංජිනේරු සැලසුම් ක්ෂේත්‍රයේ පුරෝගාමී වූ පුනරුද ප්‍රාඥයා කවුද?',
        ta: 'உலகப் புகழ்பெற்ற "மொனாலிசா" மற்றும் "இறுதி விருந்து" ஓவியங்களை வரைந்ததுடன் உடற்கூறியல் வரைபடங்களை வரைந்த மறுமலர்ச்சி மேதை யார்?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Leonardo da Vinci (ලියනාඩෝ ඩා වින්චි)', si: 'ලියනාඩෝ ඩා වින්චි', ta: 'லியனார்டோ டா வின்சி' } },
        { id: 'opt-2', text: { en: 'Michelangelo Buonarroti', si: 'මයිකල් ආන්ජලෝ', ta: 'மைக்கலேஞ்சலோ' } },
        { id: 'opt-3', text: { en: 'Raphael Sanzio', si: 'රාෆායෙල්', ta: 'ரபாயெல்' } },
        { id: 'opt-4', text: { en: 'Donatello', si: 'ඩොනටෙලෝ', ta: 'டொனடெல்லோ' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Leonardo da Vinci embodied the ideal "Renaissance Man", mastering art, engineering, optics, flight dynamics, and anatomy.',
        si: 'ලියනාඩෝ ඩා වින්චි සර්වතෝභද්‍ර ප්‍රඥාවෙන් හෙබි පුනරුද මිනිසාගේ ප්‍රතිමූර්තිය වූ අතර චිත්‍ර, මූර්ති, ඉංජිනේරු විද්‍යාව හා ව්‍යවච්ඡේද විද්‍යාවේ අග්‍රගණ්‍ය සේවයක් කළේය.',
        ta: 'லியனார்டோ டா வின்சி ஓவியம், பொறியியல், உடற்கூறியல் என பல்துறைகளிலும் சிறந்து விளங்கிய மறுமலர்ச்சியின் தலைசிறந்த மேதையாவார்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 9: Masters of Renaissance Art and Sculpture (Textbook p. 153–157)',
    }
  },
  {
    id: 'hist-ren-3',
    stepNumber: 3,
    title: {
      en: 'The Gutenberg Printing Press & The Scientific Revolution',
      si: 'ගුටෙන්බර්ග්ගේ මුද්‍රණ යන්ත්‍රය සහ විද්‍යාත්මක විප්ලවය',
      ta: 'குடன்பேர்க்கின் அச்சு இயந்திரமும் அறிவியல் புரட்சியும்',
    },
    concept: {
      en: 'In the 1450s, **Johannes Gutenberg** of Mainz, Germany, invented the movable metal type printing press. This triggered an unprecedented knowledge explosion: books could be printed rapidly and affordably, breaking the Roman Church\'s information monopoly, boosting European literacy, and circulating scientific papers across borders.\nSimultaneously, the **Scientific Revolution** demolished medieval dogmas through empirical observation and mathematical proof:\n- **Nicolaus Copernicus:** Proposed the **Heliocentric Theory** (the Sun, not Earth, is at the center of the solar system).\n- **Galileo Galilei:** Built the astronomical telescope, observed moons of Jupiter and craters on the Moon, proving Copernicus correct.\n- **Sir Isaac Newton:** Discovered the Universal Law of Gravitation and Laws of Motion.',
      si: 'ක්‍රි.ව. 1450 ගණන්වලදී ජර්මනියේ **යොහානස් ගුටෙන්බර්ග්** විසින් ලෝහමය අකුරු සහිත මුද්‍රණ යන්ත්‍රය නිපදවන ලදී. මෙය ලෝකයේ මහා තොරතුරු විප්ලවයකට මගපෑදීය: පොත්පත් විශාල වශයෙන් හා අඩු මිලට මුද්‍රණය වීම නිසා දැනුම ප්‍රභූ පැලැන්තියෙන් මිදී සාමාන්‍ය ජනයා අතර පැතිර ගිය අතර පල්ලියේ ඒකාධිකාරය බිඳවැටිණි.\nමීට සමගාමීව පරීක්ෂණ සහ නිරීක්ෂණ මත පදනම් වූ **විද්‍යාත්මක විප්ලවය** ඇරඹිණි:\n- **නිකොලස් කොපර්නිකස්:** පෘථිවිය විශ්වයේ කේන්ද්‍රය නොවන බවත්, සූර්යයා කේන්ද්‍ර කරගනිමින් ග්‍රහලෝක භ්‍රමණය වන බවත් දැක්වෙන **සූර්යකේන්ද්‍රවාදය** (Heliocentric theory) ඉදිරිපත් කිරීම.\n- **ගැලීලියෝ ගැලිලි:** දුරදක්නය නිපදවා බ්‍රහස්පතිගේ චන්ද්‍රයන් හා සඳෙහි ආවාට නිරීක්ෂණය කර කොපර්නිකස්ගේ මතය සනාථ කිරීම.\n- **අයිසැක් නිව්ටන්:** ගුරුත්වාකර්ෂණ නියමය සහ චලිත නියම සොයාගැනීම.',
      ta: '1450 இல் ஜொஹானஸ் குடன்பேர்க் இயங்கக்கூடிய அச்சு இயந்திரத்தைக் கண்டுபிடித்தார்; இது அறிவை மக்களிடம் கொண்டு சேர்த்தது. நிகோலஸ் கோப்பர்னிக்கஸ் சூரியனை மையமாகக் கொண்ட கோட்பாட்டையும் (Heliocentric Theory), கலீலியோ கலிலி தொலைநோக்கி மூலம் அதனை நிரூபித்தும், ஐசக் நியூட்டன் புவியீர்ப்பு விதியையும் கண்டறிந்து அறிவியல் புரட்சியை ஏற்படுத்தினர்.',
    },
    visualCard: {
      title: 'Printing Press & The Scientific Awakening',
      diagramType: 'infographic',
      content: 'Gutenberg Printing Press (1450s)  ➔  Knowledge Democratization  ➔  Copernicus / Galileo / Newton',
      caption: 'Transition from blind theological dogma to empirical scientific verification.'
    },
    realWorldExample: {
      en: 'Before Gutenberg, copying a single Bible by hand took a monk an entire year on costly animal vellum; within decades of his press, over 20 million books were printed, igniting universal education and modern science!',
      si: 'ගුටෙන්බර්ග්ට පෙර එක් බයිබලයක් අතින් ලියා නිම කිරීමට වසරක් ගතවූ නමුත්, මුද්‍රණ යන්ත්‍රය නිසා වසර කිහිපයක් තුළ ලක්ෂ සංඛ්‍යාත පොත් මුද්‍රණය වී ලොව පුරා විද්‍යාත්මක දැනුම සීඝ්‍රයෙන් පැතිර ගියේය!',
      ta: 'குடன்பேர்க்கிற்கு முன் ஒரு நூலை கையால் எழுத ஒரு வருடம் ஆனது; ஆனால் அச்சு இயந்திர கண்டுபிடிப்பால் சில ஆண்டுகளில் மில்லியன் கணக்கான நூல்கள் அச்சிடப்பட்டு அறிவுப் புரட்சி ஏற்பட்டது!',
    },
    checkQuestion: {
      id: 'hist-ren-q3',
      subjectId: 'history',
      topicId: 'history-gr10-renaissance',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'What transformative 15th-century technological invention by Johannes Gutenberg revolutionized the spread of knowledge, literature, and empirical science throughout Europe?',
        si: 'යුරෝපය පුරා දැනුම, සාහිත්‍යය සහ විද්‍යාත්මක සොයාගැනීම් සීඝ්‍රයෙන් ව්‍යාප්ත වීමට මගපෑදූ 15 වන සියවසේ යොහානස් ගුටෙන්බර්ග් කළ විප්ලවීය නිර්මාණය කුමක්ද?',
        ta: 'ஐரோப்பா முழுவதும் அறிவு, இலக்கியம் மற்றும் அறிவியல் கருத்துக்கள் பரவ வழிவகுத்த 15 ஆம் நூற்றாண்டின் ஜொஹானஸ் குடன்பேர்க்கின் புரட்சிகர கண்டுபிடிப்பு எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'The Movable Metal Type Printing Press (චංචල අකුරු මුද්‍රණ යන්ත්‍රය)', si: 'චංචල ලෝහ අකුරු මුද්‍රණ යන්ත්‍රය', ta: 'இயங்கக்கூடிய அச்சு இயந்திரம்' } },
        { id: 'opt-2', text: { en: 'The Steam-Powered Locomotive', si: 'වාෂ්ප එන්ජිම', ta: 'நீராவி இயந்திரம்' } },
        { id: 'opt-3', text: { en: 'The Magnetic Compass', si: 'චුම්භක මාලිමාව', ta: 'காந்த திசைகாட்டி' } },
        { id: 'opt-4', text: { en: 'The Optical Compound Microscope', si: 'ප්‍රකාශ අන්වීක්ෂය', ta: 'கூட்டு நுண்ணோக்கி' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Gutenberg\'s movable type printing press (c. 1450) enabled rapid, low-cost book manufacturing, sparking widespread literacy and democratizing scientific discoveries.',
        si: 'ගුටෙන්බර්ග්ගේ මුද්‍රණ යන්ත්‍රය මඟින් පොත්පත් පහසුවෙන් හා විශාල ලෙස මුද්‍රණය කිරීමට හැකිවූ බැවින් සාක්ෂරතාව වර්ධනය වී නව විද්‍යාත්මක අදහස් යුරෝපය පුරා පැතිරිණි.',
        ta: 'குடன்பேர்க்கின் அச்சு இயந்திரம் அறிவை மக்கள் மயப்படுத்தி அறிவியல் புரட்சிக்கும் மறுமலர்ச்சிக்கும் பெரும் உந்துசக்தியாக அமைந்தது.',
      },
      syllabusReference: 'Grade 10 History — Chapter 9: The Printing Press and Scientific Revolution (Textbook p. 158–162)',
    }
  },
  {
    id: 'hist-ren-4',
    stepNumber: 4,
    title: {
      en: 'Transition to the Modern Era & Long-Term World Impact',
      si: 'නූතන යුගයේ උපත සහ ලෝකයට ඇතිවූ බලපෑම',
      ta: 'நவீன யுகத்தின் தோற்றமும் உலகளாவிய தாக்கமும்',
    },
    concept: {
      en: 'The Renaissance marked the definitive watershed between the Middle Ages and the Modern World:\n1. **Erosion of Feudalism & Rise of Nation-States:** Unified nation-states led by strong monarchs emerged in England, France, Spain, and Portugal, replacing fragmented feudal lords.\n2. **Secular Governance:** Separation of religious authority from secular political statecraft (inspired by Niccolò Machiavelli\'s *The Prince*).\n3. **Individualism & Liberty:** Laid ideological foundations for the Enlightenment, democracy, human rights, and the rule of law.\n4. **Inspiration for Maritime Exploration:** Renaissance curiosity, cartography, and navigational science directly inspired sailors to cross uncharted oceans to reach Asia and the Americas.',
      si: 'පුනරුදය මධ්‍යතන යුගය නිමා කරමින් නූතන ලෝකයට පදනම දැමීය:\n1. **වැඩවසම් ක්‍රමය බිඳවැටීම සහ ජාතික රාජ්‍ය බිහිවීම:** වැඩවසම් රදළ බලය බිඳවැටී එංගලන්තය, ප්‍රංශය, ස්පාඤ්ඤය හා පෘතුගාලය වැනි ශක්තිමත් ජාතික රාජ්‍යයන් බිහිවීම.\n2. **ආගමික අධිකාරිය දේශපාලනයෙන් වෙන්වීම:** නිකොලෝ මැකියාවෙලිගේ *ද ප්‍රින්ස්* කෘතිය ආභාසය කරගනිමින් ලෞකික දේශපාලන ක්‍රම බිහිවීම.\n3. **පුද්ගල නිදහස හා මානව අයිතිවාසිකම්:** නූතන ප්‍රජාතන්ත්‍රවාදයට හා විද්‍යාත්මක චින්තනයට පදනම සැකසීම.\n4. **මුහුදු ගවේෂණවලට අනුබල දීම:** පුනරුදයේ කුතුහලය සහ මිනුම් ශිල්පය නිසා නව වෙළඳ මාර්ග සෙවීමේ මහා සාගර ගවේෂණ ඇරඹීම.',
      ta: 'மறுமலர்ச்சி நவீன உலகிற்கு அடித்தளமிட்டது: நிலப்பிரபுத்துவம் வீழ்ச்சியடைந்து தேசிய அரசுகள் தோன்றின. தனிமனித சுதந்திரம் மற்றும் மனித உரிமைகள் மலர்ந்தன. புவியியல் கடல்சார் கண்டுபிடிப்புகளுக்கு இது ஊக்கமளித்தது.',
    },
    visualCard: {
      title: 'Pillars of the Modern World Born in the Renaissance',
      diagramType: 'infographic',
      content: 'Decline of Feudalism  •  Rise of Sovereign Nation-States  •  Empirical Science  •  Age of Discovery',
      caption: 'The bridge spanning the medieval world and modern human civilization.'
    },
    realWorldExample: {
      en: 'The modern medical practice of conducting dissections and clinical trials directly stems from Renaissance physician Andreas Vesalius, who defied taboo to dissect human cadavers and accurately map human anatomy!',
      si: 'වෛද්‍ය විද්‍යාවේ නූතන ශල්‍යකර්ම සහ කායව්‍යවච්ඡේද පදනම සැකසුණේ පුනරුද වෛද්‍ය ඇන්ඩ්‍රියාස් විසාලියස් විසින් සම්ප්‍රදායික තහංචි බිඳදමා මිනිස් සිරුරේ අභ්‍යන්තරය නිවැරදිව පරීක්ෂා කර ලොවට හෙළිදරව් කිරීමෙනි!',
      ta: 'நவீன மருத்துவத்தில் மனித உடற்கூறுகளை ஆராய்ந்து அறுவைசிகிச்சை செய்யும் முறை மறுமலர்ச்சி கால மருத்துவர் வெசாலியஸ் மனித உடலை ஆராய்ந்து வரைந்ததன் மூலமே தொடங்கியது!',
    },
    checkQuestion: {
      id: 'hist-ren-q4',
      subjectId: 'history',
      topicId: 'history-gr10-renaissance',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which Renaissance astronomer was summoned before the Roman Inquisition for using telescopic evidence to defend Copernicus\'s Heliocentric (Sun-centered) planetary model?',
        si: 'දුරදක්නය ආධාරයෙන් නිරීක්ෂණය කර කොපර්නිකස්ගේ සූර්යකේන්ද්‍රවාදය සත්‍ය බව තහවුරු කළ නිසා පල්ලියේ පරීක්ෂණ මණ්ඩලය (Inquisition) හමුවට කැඳවනු ලැබූ ඉතාලි ජාතික විද්‍යාඥයා කවුද?',
        ta: 'தொலைநோக்கி மூலம் அவதானித்து சூரிய மையக் கோட்பாட்டை ஆதரித்ததற்காக கத்தோலிக்க திருச்சபையின் விசாரணைக்கு உட்படுத்தப்பட்ட விஞ்ஞானி யார்?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Galileo Galilei (ගැලීලියෝ ගැලිලි)', si: 'ගැලීලියෝ ගැලිලි', ta: 'கலீலியோ கலிலி' } },
        { id: 'opt-2', text: { en: 'Claudius Ptolemy', si: 'ටොලමි', ta: 'தொலெமி' } },
        { id: 'opt-3', text: { en: 'Johannes Kepler', si: 'යොහානස් කෙප්ලර්', ta: 'ஜொஹானஸ் கெப்லர்' } },
        { id: 'opt-4', text: { en: 'Francis Bacon', si: 'ෆ්‍රැන්සිස් බේකන්', ta: 'பிரான்சிஸ் பேகன்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Galileo Galilei (1564–1642) used his telescope to observe the 4 moons of Jupiter and Venusian phases, empirically validating the Heliocentric theory despite severe inquisitorial persecution.',
        si: 'ගැලීලියෝ ගැලිලි තම දුරදක්නය මඟින් බ්‍රහස්පතිගේ උපග්‍රහයන් නිරීක්ෂණය කරමින් සූර්යයා කේන්ද්‍රයේ පවතින බව සනාථ කළ අතර පල්ලියේ දරුණු විරෝධයට මුහුණ දුන්නේය.',
        ta: 'கலீலியோ கலிலி தனது தொலைநோக்கி மூலம் வியாழனின் சந்திரன்களை அவதானித்து சூரிய மையக் கோட்பாட்டை நிரூபித்தார்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 9: Scientific Inventions and Inquisitorial Trials (Textbook p. 163–166)',
    }
  }
];

// ----------------------------------------------------------------------------
// CHAPTER 10: MODERN WESTERN WORLD & AGE OF DISCOVERY (නූතන බටහිර ලෝකය හා දේශගවේෂණ)
// ----------------------------------------------------------------------------
export const TEACH_ME_HISTORY_WESTERN_WORLD_STEPS: LessonStep[] = [
  {
    id: 'hist-west-1',
    stepNumber: 1,
    title: {
      en: 'Motives of Maritime Exploration & Navigational Inventions',
      si: 'දේශගවේෂණයේ අරමුණු සහ නාවික තාක්ෂණික සොයාගැනීම්',
      ta: 'கடல்சார் கண்டுபிடிப்புகளின் நோக்கங்களும் வழிசெலுத்தல் கருவிகளும்',
    },
    concept: {
      en: 'In the 15th century, Europeans launched voyages of exploration across unknown oceans. Causes:\n1. **Ottoman Blockade of Overland Trade (1453):** The fall of Constantinople allowed Muslims to levy prohibitive taxes on Asian spices (cinnamon, pepper, cloves) and silk, compelling Western powers to find a direct sea route to India.\n2. **The "3 Gs" Motives:** **Gold** (wealth from spice monopoly), **God** (converting non-Christians), and **Glory** (imperial territorial pride).\nTechnological breakthroughs enabling oceanic navigation:\n- **Magnetic Compass:** Adapted from China to establish true direction.\n- **Astrolabe & Quadrant:** Measured the altitude of Polaris or the Sun to calculate latitude at sea.\n- **The Caravel:** Sturdy, highly maneuverable Portuguese three-masted ship combining square sails (for speed) and triangular lateen sails (to sail into the wind).',
      si: '15 වන සියවසේදී යුරෝපීයයෝ නොදන්නා සාගර තරණය කරමින් දේශගවේෂණ ඇරඹූහ. හේතු:\n1. **ගොඩබිම් වෙළඳ මාර්ග අවහිර වීම (ක්‍රි.ව. 1453):** තුර්කිවරුන් කොන්ස්තන්තිනෝපලය අල්ලාගෙන කුළුබඩු (කුරුඳු, ගම්මිරිස්) සහ සේද වෙළඳ මාර්ගවලට අධික බදු පැටවීම නිසා ඉන්දියාවට මුහුදෙන් කෙළින්ම යා හැකි මාර්ගයක් සෙවීමේ අවශ්‍යතාව.\n2. **මූලික අරමුණු (Gold, God, Glory):** ධනය (රන් හා කුළුබඩු ඒකාධිකාරය), ආගම (ක්‍රිස්තියානි ධර්මය පැතිරවීම) සහ කීර්තිය (රාජ්‍ය බලය).\nනාවික තාක්ෂණික දියුණුව:\n- **චුම්භක මාලිමාව:** දිශාව සොයාගැනීමට.\n- **ඇස්ට්‍රොලේබය:** සූර්යයා හෝ තරු පිහිටීම අනුව අක්ෂාංශ මැන බැලීමට.\n- **කැරවල් (Caravel) නෞකාව:** කුණාටුවලට ඔරොත්තු දෙන, සුළඟට එරෙහිව යාත්‍රා කළ හැකි ත්‍රිකෝණාකාර රුවල් සහිත සැහැල්ලු වේගවත් පෘතුගීසි නෞකා.',
      ta: '15 ஆம் நூற்றாண்டில் ஆட்டோமன் துருக்கியர் தரைவழி வர்த்தக பாதைகளை மூடியதால் ஆசியாவிற்கு நேரடி கடல்வழியை தேட ஐரோப்பியர் முற்பட்டனர். தங்கம் (செல்வம்), கடவுள் (மதப்பரப்பல்), புகழ் ஆகியவை பிரதான நோக்கங்களாகும். திசைகாட்டி, அஸ்ட்ரோலேப் (அட்சரேகை காட்டி) மற்றும் காரவெல் கப்பல்கள் இதற்கு உதவின.',
    },
    visualCard: {
      title: 'Technological Enablers of Oceanic Exploration',
      diagramType: 'infographic',
      content: 'Magnetic Compass (Direction)  •  Astrolabe (Latitude)  •  Caravel (Lateen Sails)  ➔  Trans-Oceanic Navigation',
      caption: 'Textbook Chapter 10: The scientific breakthrough that enabled crossing the oceans.'
    },
    realWorldExample: {
      en: 'The replica of Columbus\'s flagship caravel, the Santa Maria, demonstrates how lateen (triangular) sails allowed sailors for the first time to "tack" (zigzag) safely against headwinds instead of drifting hopelessly backwards!',
      si: 'කොලොම්බස් ගමන් කළ සැන්ටා මරියා වැනි කැරවල් නැව්වල තිබූ ත්‍රිකෝණාකාර රුවල් මඟින්, සුළඟ ඉදිරියෙන් හමා ආවද සුළඟ කපාගෙන ඉදිරියට යාත්‍රා කිරීමට නාවිකයන්ට හැකිවිය!',
      ta: 'காரவெல் கப்பல்களின் முக்கோணப் பாய்கள் எதிர்க் காற்றையும் கிழித்துக் கொண்டு படகை முன்னோக்கி செலுத்த உதவியதால் மாலுமிகள் பெருங்கடல்களை கடக்க முடிந்தது!',
    },
    checkQuestion: {
      id: 'hist-west-q1',
      subjectId: 'history',
      topicId: 'history-gr10-western-world',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which crucial navigational instrument, adapted from the Arab world, allowed European oceanic sailors to calculate their latitude at sea by measuring the angle of the sun and stars above the horizon?',
        si: 'ක්ෂිතිජයට ඉහළින් සූර්යයාගේ සහ තාරකාවල උන්නතාංශ කෝණය මැනීම මඟින් නෞකාව පිහිටි අක්ෂාංශය ගණනය කිරීමට යුරෝපීය නාවිකයන්ට උපකාරී වූ මිනුම් උපකරණය කුමක්ද?',
        ta: 'சூரியன் மற்றும் நட்சத்திரங்களின் கோணத்தை அளவிட்டு கப்பலின் அட்சரேகையைக் கண்டறிய ஐரோப்பிய மாலுமிகளுக்கு உதவிய சாதனம் எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Astrolabe (ඇස්ට්‍රොලේබය / அஸ்ட்ரோலேப்)', si: 'ඇස්ට්‍රොලේබය (Astrolabe)', ta: 'அஸ்ட்ரோலேப் (Astrolabe)' } },
        { id: 'opt-2', text: { en: 'Aneroid Barometer', si: 'බැරෝමීටරය', ta: 'பாரமானி' } },
        { id: 'opt-3', text: { en: 'Galvanometer', si: 'ගැල්වනෝමීටරය', ta: 'கல்வனோமானி' } },
        { id: 'opt-4', text: { en: 'Hydrometer', si: 'හයිඩ්‍රෝමීටරය', ta: 'ஹைட்ரோமானி' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'The Astrolabe was essential for celestial navigation, enabling explorers to determine latitude on uncharted open oceans far out of sight of land.',
        si: 'ඇස්ට්‍රොලේබය යනු අහසේ සූර්යයාගේ හෝ උත්තර ධ්‍රැව තාරකාවේ පිහිටුම මැන බලා තමන් සිටින අක්ෂාංශය නිවැරදිව තීරණය කරගැනීමට දේශගවේෂකයන් යොදාගත් අත්‍යවශ්‍ය උපකරණයකි.',
        ta: 'அஸ்ட்ரோலேப் கருவி கடலில் சூரியன் மற்றும் துருவ நட்சத்திரத்தின் உயரத்தை அளவிட்டு கப்பல் இருக்கும் அட்சரேகையை துல்லியமாக அறிய உதவியது.',
      },
      syllabusReference: 'Grade 10 History — Chapter 10: Navigational Inventions and Motives (Textbook p. 170–174)',
    }
  },
  {
    id: 'hist-west-2',
    stepNumber: 2,
    title: {
      en: 'Great Navigators: Dias, Columbus, Da Gama & Magellan',
      si: 'මහා දේශගවේෂකවරු: ඩයස්, කොලොම්බස්, ද ගාමා සහ මැගලාන්',
      ta: 'பெரும் நாடுகாண் பயணிகள்: டயஸ், கொலம்பஸ், டா காமா, மகலன்',
    },
    concept: {
      en: 'Pioneered under Prince Henry the Navigator of Portugal, epic sea voyages redrew the world map:\n- **Bartolomeu Dias (1488 CE):** First European to sail around the treacherous southern tip of Africa, naming it the **Cape of Good Hope (යහපත් බලාපොරොත්තුවේ තුඩුව)**.\n- **Christopher Columbus (1492 CE):** Commissioned by Spain to sail west to Asia, mistakenly landed in the Bahamas/Caribbean, discovering the Americas (the "New World").\n- **Vasco da Gama (1498 CE):** Successfully sailed around Africa and across the Indian Ocean, landing in Calicut, India—establishing the first direct all-sea trade route between Europe and Asia.\n- **Ferdinand Magellan (1519–1522 CE):** Spanish expedition that accomplished the first circumnavigation of the entire globe, proving empirically that the Earth is round.',
      si: 'පෘතුගාලයේ හෙන්රි කුමරුගේ නාවික පාසලේ මගපෙන්වීම යටතේ ලෝක සිතියම වෙනස් කළ මහා දේශගවේෂකයෝ බිහිවූහ:\n- **බර්තොලමියු ඩයස් (ක්‍රි.ව. 1488):** අප්‍රිකාවේ දකුණු කෙළවරට යාත්‍රා කළ මුල්ම යුරෝපීයයා වූ අතර එය **යහපත් බලාපොරොත්තුවේ තුඩුව** ලෙස නම් කෙරිණි.\n- **ක්‍රිස්ටෝෆර් කොලොම්බස් (ක්‍රි.ව. 1492):** ස්පාඤ්ඤ අනුග්‍රහයෙන් බටහිර දෙසට යාත්‍රා කර ඇමරිකානු මහාද්වීපය ("නව ලෝකය") සොයාගැනීම.\n- **වස්කෝ ද ගාමා (ක්‍රි.ව. 1498):** අප්‍රිකාව වටා යාත්‍රා කර ඉන්දියාවේ කැලිකට් වරායට ළඟාවෙමින් යුරෝපයේ සිට ආසියාවට සෘජු මුහුදු මාර්ගය සොයාගැනීම.\n- **ෆර්ඩිනන්ඩ් මැගලාන් (ක්‍රි.ව. 1519–1522):** ලොව වටා මුහුදෙන් යාත්‍රා කළ ප්‍රථම ගවේෂණය මෙහෙයවමින් පෘථිවිය ගෝලාකාර බව ප්‍රායෝගිකව ඔප්පු කිරීම.',
      ta: 'போர்த்துக்கேய இளவரசர் ஹென்றியின் ஆதரவில் பல நாடுகாண் பயணிகள் தோன்றினர்: பார்தலோமியோ டயஸ் (1488 - நன்னம்பிக்கை முனை), கொலம்பஸ் (1492 - அமெரிக்கா), வாஸ்கோ ட காமா (1498 - இந்தியாவுக்கான நேரடி கடல்வழி), பெர்டினண்ட் மகலன் (1519-1522 - உலகை கடல்வழியாக வலம் வந்த முதல் பயணம்).',
    },
    visualCard: {
      title: 'Pioneers of Global Maritime Routes',
      diagramType: 'infographic',
      content: 'Dias (Cape of Good Hope) ➔ Columbus (Americas) ➔ Vasco da Gama (India 1498) ➔ Magellan (Circumnavigation)',
      caption: 'Textbook Chapter 10: Redrawing the global map of trade and empires.'
    },
    realWorldExample: {
      en: 'Vasco da Gama\'s arrival in Calicut in 1498 with three ships broke the centuries-old Arab-Venetian spice monopoly overnight, transforming tiny Portugal into the world\'s richest maritime superpower of the 16th century!',
      si: '1498 දී වස්කෝ ද ගාමා ඉන්දියාවට මුහුදු මාර්ගය සොයාගැනීම නිසා එතෙක් පැවති අරාබි වෙළඳ ඒකාධිකාරය බිඳවැටී, කුඩා පෘතුගාලය 16 වන සියවසේ ලොව ප්‍රබලතම සාගර අධිරාජ්‍යය බවට පත්විය!',
      ta: '1498 இல் வாஸ்கோ ட காமா இந்தியாவை அடைந்ததன் மூலம் அரேபியர்களின் வர்த்தக ஏகபோகம் உடைக்கப்பட்டு, போர்த்துக்கல் பெரும் கடல்சார் வல்லரசாக மாறியது!',
    },
    checkQuestion: {
      id: 'hist-west-q2',
      subjectId: 'history',
      topicId: 'history-gr10-western-world',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'Which Portuguese navigator successfully discovered the direct maritime route from Europe to India via the Cape of Good Hope, landing in Calicut in May 1498?',
        si: 'යහපත් බලාපොරොත්තුවේ තුඩුව වටා යාත්‍රා කරමින් යුරෝපයේ සිට ඉන්දියාව දක්වා සෘජු මුහුදු මාර්ගය සොයාගෙන 1498 දී කැලිකට් වරායට ළඟාවූ පෘතුගීසි නාවිකයා කවුද?',
        ta: 'நன்னம்பிக்கை முனை வழியாக ஐரோப்பாவிலிருந்து இந்தியாவிற்கு நேரடி கடல்வழியைக் கண்டுபிடித்து 1498 மே மாதம் காலிகட் துறைமுகத்தை அடைந்த போர்த்துக்கேய மாலுமி யார்?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Vasco da Gama (වස්කෝ ද ගාමා)', si: 'වස්කෝ ද ගාමා', ta: 'வாஸ்கோ ட காமா' } },
        { id: 'opt-2', text: { en: 'Christopher Columbus', si: 'ක්‍රිස්ටෝෆර් කොලොම්බස්', ta: 'கிறிஸ்டோபர் கொலம்பஸ்' } },
        { id: 'opt-3', text: { en: 'Ferdinand Magellan', si: 'ෆර්ඩිනන්ඩ් මැගලාන්', ta: 'பெர்டினண்ட் மகலன்' } },
        { id: 'opt-4', text: { en: 'Prince Henry the Navigator', si: 'හෙන්රි කුමරු', ta: 'ஹென்றி இளவரசர்' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Vasco da Gama commanded the historic Portuguese fleet that sailed around Africa to India in 1498, opening direct maritime commerce with Asia.',
        si: '1498 දී අප්‍රිකාව වටා යාත්‍රා කර ඉන්දියාවට මුහුදු මග සොයාගත් වස්කෝ ද ගාමා, ආසියාව සමඟ සෘජු වෙළඳාමේ යුගයක් ආරම්භ කළේය.',
        ta: 'வாஸ்கோ ட காமா 1498 இல் நன்னம்பிக்கை முனையை சுற்றி இந்தியாவுக்கான கடல்வழியைக் கண்டறிந்து வரலாற்றுச் சாதனை படைத்தார்.',
      },
      syllabusReference: 'Grade 10 History — Chapter 10: Voyages of Vasco da Gama and Columbus (Textbook p. 175–178)',
    }
  },
  {
    id: 'hist-west-3',
    stepNumber: 3,
    title: {
      en: 'The Protestant Reformation (Martin Luther & 95 Theses)',
      si: 'ප්‍රොතෙස්තන්ත ආගමික ප්‍රතිසංස්කරණය (මාටින් ලූතර් සහ 95 තීසිස්)',
      ta: 'சமய சீர்திருத்தம் (மார்ட்டின் லூதரும் 95 கொள்கைகளும்)',
    },
    concept: {
      en: 'In 1517 CE, German theologian **Martin Luther** sparked the Protestant Reformation by nailing his **95 Theses** to the door of All Saints\' Church in Wittenberg. Luther fiercely protested church corruption, especially the sale of **Indulgences (පාප මෝචන පත්‍ර)**—where the Church sold pardons for sins for monetary profit. Luther asserted that salvation is achieved through faith alone (Sola Fide) and biblical authority, not papal wealth. This divided Western Christianity into Protestantism (Lutheran, Calvinist, Anglican) and Catholicism, leading to the Catholic Counter-Reformation (Jesuit order founded by Ignatius of Loyola).',
      si: 'ක්‍රි.ව. 1517 දී ජර්මන් ජාතික **මාටින් ලූතර්** පියතුමා විසින් විට්න්බර්ග් පල්ලියේ දොරටුවේ **95ක් වූ විරෝධතා කරුණු (95 Theses)** අලවමින් කතෝලික පල්ලියේ දූෂණවලට එරෙහිව ආගමික ප්‍රතිසංස්කරණ ව්‍යාපාරය ඇරඹීය. එතුමා විශේෂයෙන් විරුද්ධ වූයේ මුදලට පව් සමාව දෙන **පාප මෝචන පත්‍ර (Indulgences)** විකිණීමටය. ගැළවීම ලැබෙන්නේ පූජකයන්ට මුදල් ගෙවීමෙන් නොව පුද්ගලික විශ්වාසය සහ බයිබලය කියවීමෙන් බව ලූතර් පෙන්වා දුන්නේය. මෙයින් යුරෝපයේ ක්‍රිස්තියානි ලෝකය ප්‍රොතෙස්තන්ත සහ කතෝලික ලෙස දෙකඩ වූ අතර, කතෝලික පල්ලිය තුළද ප්‍රති-ප්‍රතිසංස්කරණයක් (ජේසුයිට් නිකාය) ඇතිවිය.',
      ta: '1517 இல் ஜேர்மனியைச் சேர்ந்த மார்ட்டின் லூதர் விட்டன்பேர்க் தேவாலய வாசலில் 95 கொள்கைகளை அறைந்து சமய சீர்திருத்த இயக்கத்தைத் தொடங்கினார். பாவமன்னிப்பு சீட்டுகளை விற்பனை செய்வதை எதிர்த்த இவர், பைபிளே உண்மையான அதிகாரம் என்றார். இது கிறிஸ்தவத்தை கத்தோலிக்க மற்றும் புரொட்டஸ்தாந்து என இரு பிரிவுகளாகப் பிரித்தது.',
    },
    visualCard: {
      title: 'The Protestant Reformation Sparked in 1517',
      diagramType: 'infographic',
      content: 'Martin Luther (Wittenberg)  ➔  Protest Against Indulgences  ➔  Split: Catholic & Protestant Europe',
      caption: 'Translation of the Bible into vernacular languages broke religious Latin monopoly.'
    },
    realWorldExample: {
      en: 'Martin Luther translated the Bible from Latin into ordinary everyday German, enabling ordinary citizens to read Scripture directly—this translation established the modern standard German language used today!',
      si: 'මාටින් ලූතර් ලතින් බසින් පමණක් තිබූ බයිබලය සාමාන්‍ය ජර්මන් බසට පරිවර්තනය කළ අතර, එය සාමාන්‍ය ජනයා අතර කියවීමේ රුචිය වර්ධනය කර නූතන ජර්මන් භාෂාවේ ප්‍රමිතිය බවට පත්විය!',
      ta: 'மார்ட்டின் லூதர் லத்தீன் மொழியிலிருந்த பைபிளை ஜேர்மன் மொழியில் மொழிபெயர்த்து சாதாரண மக்களும் வாசிக்க வழிவகுத்தார்; இது நவீன ஜேர்மன் மொழியின் வளர்ச்சியாக அமைந்தது!',
    },
    checkQuestion: {
      id: 'hist-west-q3',
      subjectId: 'history',
      topicId: 'history-gr10-western-world',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'What historic act by Martin Luther in 1517 CE is universally recognized as the catalyst that launched the Protestant Reformation across Europe?',
        si: '1517 දී යුරෝපය පුරා ප්‍රොතෙස්තන්ත ආගමික ප්‍රතිසංස්කරණ ව්‍යාපාරය ඇරඹීමට සෘජුවම බලපෑ මාටින් ලූතර්ගේ ඓතිහාසික ක්‍රියාව කුමක්ද?',
        ta: '1517 இல் ஐரோப்பா முழுவதும் சமய சீர்திருத்த இயக்கம் வெடிக்கக் காரணமான மார்ட்டின் லூதரின் வரலாற்றுச் செயல் எது?',
      },
      options: [
        { id: 'opt-1', text: { en: 'Nailing his 95 Theses protesting the sale of indulgences to the church door in Wittenberg', si: 'පාප මෝචන පත්‍ර විකිණීමට එරෙහිව තම විරෝධතා කරුණු 95 විට්න්බර්ග් පල්ලියේ දොරෙහි ඇලවීම', ta: 'பாவமன்னிப்பு சீட்டு விற்பனைக்கு எதிராக 95 கொள்கைகளை தேவாலய வாசலில் அறைந்தமை' } },
        { id: 'opt-2', text: { en: 'Leading a military naval assault against the Ottoman Sultan', si: 'ඔටෝමන් සුල්තාන්ට එරෙහිව යුද ප්‍රහාරයක් මෙහෙයවීම', ta: 'துருக்கிய சுல்தானுக்கு எதிராக கடற்படை தாக்குதலை நடத்தியமை' } },
        { id: 'opt-3', text: { en: 'Signing the Treaty of Tordesillas with the Pope', si: 'පාප්වහන්සේ සමඟ ටෝඩසිලස් ගිවිසුම අත්සන් කිරීම', ta: 'டோர்டெசில்லாஸ் ஒப்பந்தத்தில் கையெழுத்திட்டமை' } },
        { id: 'opt-4', text: { en: 'Founding the Society of Jesus (Jesuit Order)', si: 'ජේසුයිට් නිකාය ආරම්භ කිරීම', ta: 'இயேசு சபையை (Jesuit Order) தோற்றுவித்தமை' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'Martin Luther\'s posting of the 95 Theses in Wittenberg in October 1517 challenged corruption and papal indulgences, sparking the historic religious reformation.',
        si: '1517 ඔක්තෝබරයේ විට්න්බර්ග් දේවස්ථානයේ දොරෙහි පාප මෝචන පත්‍ර විරෝධී නිබන්ධනය ඇලවීමෙන් පසු ප්‍රොතෙස්තන්ත ප්‍රතිසංස්කරණය යුරෝපය පුරා පැතිර ගියේය.',
        ta: 'மார்ட்டின் லூதரின் 95 கொள்கைகள் திருச்சபையின் ஊழல்களையும் பாவமன்னிப்பு சீட்டுகளையும் வெளிப்படுத்தி பெரும் சமய சீர்திருத்தத்திற்கு வித்திட்டது.',
      },
      syllabusReference: 'Grade 10 History — Chapter 10: Martin Luther and the Reformation (Textbook p. 179–182)',
    }
  },
  {
    id: 'hist-west-4',
    stepNumber: 4,
    title: {
      en: 'Arrival of Western Powers in Sri Lanka (1505 CE) & Global Impact',
      si: 'පෘතුගීසීන් ශ්‍රී ලංකාවට පැමිණීම (ක්‍රි.ව. 1505) සහ ගෝලීය බලපෑම',
      ta: 'இலங்கையில் போர்த்துக்கேயர் வருகையும் (கி.பி. 1505) உலகளாவிய தாக்கமும்',
    },
    concept: {
      en: 'Following Vasco da Gama\'s maritime breakthrough, the Portuguese established naval forts across the Indian Ocean to monopolize the lucrative spice, cinnamon, and elephant trade.\nIn **1505 CE**, a Portuguese fleet commanded by **Dom Lourenço de Almeida** was caught in a storm while pursuing Moorish spice ships in the Maldives and drifted ashore at the port of Galle, subsequently docking at Colombo. They met King **Dharma Parakramabahu IX** of Kotte, establishing a trading factory and engraving the Portuguese coat of arms on a boulder at the Colombo harbor.\nThis fateful event inaugurated over 400 years of European colonial rule in Sri Lanka:\n- Portuguese (1505–1658 CE)\n- Dutch (1658–1796 CE)\n- British (1796–1948 CE)\nTransforming the nation\'s legal system (Roman-Dutch law), religion (Catholicism/Christianity), architecture, education, and language.',
      si: 'ඉන්දියන් සාගරයේ කුළුබඩු සහ කුරුඳු වෙළඳ ඒකාධිකාරය තහවුරු කරගැනීමට පෘතුගීසීන්ට අවශ්‍ය විය.\n**ක්‍රි.ව. 1505 දී**, මාලදිවයින අවට මුස්ලිම් වෙළඳ නැව් ලුහුබඳිමින් සිටි **දොන් ලොරෙන්සෝ ද අල්මේදා** ප්‍රමුඛ පෘතුගීසි නැව් සමූහය දරුණු කුණාටුවකට හසුවී ගාල්ල වරායට ගසාගෙන ආ අතර, පසුව කොළඹ වරායට පැමිණියහ. ඔවුහු කෝට්ටේ **9 වන ධර්ම පරාක්‍රමබාහු රජු** හමුවී කුරුඳු වෙළඳාමේ අවසරය ලබාගත් අතර කොළඹ වරායේ කළුගලක පෘතුගීසි ලාංඡනය කෙටූහ ("පරංගියා කෝට්ටේ ගියා වගේ" යන ජනප්‍රවාදය මෙහිදී බිහිවිය).\nමෙම ඓතිහාසික සිදුවීමෙන් ශ්‍රී ලංකාවේ වසර 400කට වැඩි යුරෝපීය යටත්විජිත පාලනය ඇරඹිණි:\n- පෘතුගීසි යුගය (1505–1658)\n- ලන්දේසි යුගය (1658–1796)\n- බ්‍රිතාන්‍ය යුගය (1796–1948)\nමෙය මෙරට ආගම, නීතිය (රෝම-ලන්දේසි නීතිය), අධ්‍යාපනය සහ සංස්කෘතිය මුළුමනින්ම වෙනස් කළේය.',
      ta: 'கி.பி. 1505 இல் டொம் லொரென்சோ டி அல்மேதா தலைமையிலான போர்த்துக்கேய கப்பல் புயலில் சிக்கி காலி துறைமுகத்தை அடைந்து, பின் கொழும்புக்கு வந்தது. அவர்கள் ஒன்பதாம் தர்ம பராக்கிரமபாகு மன்னனை சந்தித்து கறுவா வர்த்தகத்திற்கு அனுமதி பெற்றனர். இது இலங்கையில் 400 ஆண்டுகால ஐரோப்பிய காலனித்துவ ஆட்சியை (போர்த்துக்கேயர், ஒல்லாந்தர், பிரித்தானியர்) தொடங்கியது.',
    },
    visualCard: {
      title: 'Arrival of Western Colonial Powers in Sri Lanka',
      diagramType: 'infographic',
      content: '1505: Lourenço de Almeida lands in Galle/Colombo  ➔  Portuguese (1505) ➔ Dutch (1658) ➔ British (1796–1948)',
      caption: 'Textbook Chapter 10: The dawn of four centuries of European maritime colonialism in Sri Lanka.'
    },
    realWorldExample: {
      en: 'In the Gordon Gardens inside Colombo Fort (President\'s House grounds), the original granite boulder bearing the coat of arms carved by Lourenço de Almeida\'s sailors in 1505 still stands preserved today as living physical proof of their arrival!',
      si: 'කොළඹ කොටුවේ ජනාධිපති මන්දිර පරිශ්‍රයේ (ගෝඩන් උද්‍යානය) අදටත් සුරක්ෂිතව ඇති 1505 දී ලොරෙන්සෝ ද අල්මේදාගේ නාවිකයන් කෙටූ පෘතුගීසි ලාංඡනය සහිත මුල් කළුගල පෘතුගීසි සම්ප්‍රාප්තියට ජීවමාන සාක්ෂියකි!',
      ta: 'கொழும்பு கோட்டையிலுள்ள ஜனாதிபதி மாளிகை வளாகத்தில் 1505 இல் அல்மேதாவின் வீரர்களால் போர்த்துக்கேய சின்னம் பொறிக்கப்பட்ட உண்மையான பாறை இன்றும் பாதுகாக்கப்படுகிறது!',
    },
    checkQuestion: {
      id: 'hist-west-q4',
      subjectId: 'history',
      topicId: 'history-gr10-western-world',
      grade: 'grade-10',
      examCategory: 'ol',
      isDemonstrationSample: true,
      questionText: {
        en: 'In which year did the Portuguese naval expedition commanded by Dom Lourenço de Almeida arrive in Sri Lanka, inaugurating more than four centuries of Western colonial influence?',
        si: 'දොන් ලොරෙන්සෝ ද අල්මේදාගේ නායකත්වයෙන් යුත් පෘතුගීසි නාවික පිරිස ශ්‍රී ලංකාවට සම්ප්‍රාප්ත වෙමින් මෙරට වසර 400කට වැඩි යුරෝපීය යටත්විජිත පාලනයට මුලපිරූ වර්ෂය කුමක්ද?',
        ta: 'டொம் லொரென்சோ டி அல்மேதா தலைமையிலான போர்த்துக்கேய கப்பல் இலங்கையை அடைந்து 400 ஆண்டுகால ஐரோப்பிய காலனித்துவ ஆதிக்கத்தை தொடங்கிய ஆண்டு எது?',
      },
      options: [
        { id: 'opt-1', text: { en: '1505 CE (ක්‍රි.ව. 1505)', si: 'ක්‍රි.ව. 1505', ta: 'கி.பி. 1505' } },
        { id: 'opt-2', text: { en: '1492 CE', si: 'ක්‍රි.ව. 1492', ta: 'கி.பி. 1492' } },
        { id: 'opt-3', text: { en: '1602 CE', si: 'ක්‍රි.ව. 1602', ta: 'கி.பி. 1602' } },
        { id: 'opt-4', text: { en: '1796 CE', si: 'ක්‍රි.ව. 1796', ta: 'கி.பி. 1796' } },
      ],
      correctOptionId: 'opt-1',
      educationalFeedback: {
        en: 'In 1505 CE, Dom Lourenço de Almeida was blown off course to Galle and sailed to Colombo, making contact with King Dharma Parakramabahu IX of Kotte to begin Portuguese colonial involvement in Sri Lanka.',
        si: 'ක්‍රි.ව. 1505 දී දොන් ලොරෙන්සෝ ද අල්මේදා කුණාටුවකට හසුවී ගාල්ලට ගසාගෙන ආ අතර, පසුව කොළඹට පැමිණ කෝට්ටේ ධර්ම පරාක්‍රමබාහු රජු හමුවී මෙරට පෘතුගීසි බලය පිහිටුවීමට මුලපිරීය.',
        ta: 'கி.பி. 1505 இல் லொரென்சோ டி அல்மேதா புயலில் சிக்கி காலியிலும் பின் கொழும்பிலும் இறங்கி கோட்டை மன்னனை சந்தித்ததன் மூலம் போர்த்துக்கேய ஆதிக்கம் தொடங்கியது.',
      },
      syllabusReference: 'Grade 10 History — Chapter 10: Portuguese Arrival in Sri Lanka (Textbook p. 183–187)',
    }
  }
];

