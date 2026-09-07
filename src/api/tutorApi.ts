import { apiClient } from './client';
import type { LearningContext, RAGResponse, SourceCitation } from '../types';

/**
 * Interface contract for Tutor backend adapters.
 * UI components interact strictly through this boundary.
 */
export interface TutorAdapter {
  ask(question: string, context: LearningContext): Promise<RAGResponse>;
  clearConversation(conversationId: string): Promise<void>;
}

/**
 * AtlasLiveTutorAdapter
 * Directly targets the ATLAS Learn backend AI Tutor endpoint.
 * Live Contract: POST /api/learn/tutor
 */
export class AtlasLiveTutorAdapter implements TutorAdapter {
  async ask(question: string, context: LearningContext): Promise<RAGResponse> {
    const { data } = await apiClient.post<RAGResponse & { suggestedFollowUps?: string[] }>('/api/learn/tutor', {
      conversationId: context.conversationId,
      message: question,
      grade: context.grade,
      subject: context.subjectId,
      language: context.language,
      topicId: context.topicId,
    });

    return {
      answer: data.answer,
      sources: data.sources || [],
      suggestedFollowUps: data.suggestedFollowUps || [],
    };
  }

  async clearConversation(conversationId: string): Promise<void> {
    try {
      await apiClient.delete(`/api/learn/conversations/${conversationId}`);
    } catch (err) {
      console.warn('[AtlasLiveTutorAdapter] Failed to clear remote conversation:', err);
    }
  }
}

/**
 * MockTutorAdapter
 * Provides realistic, grounded Sri Lankan educational responses with real curriculum references.
 * Explicitly isolated under the mock boundary for prototype exploration and offline demonstration.
 */
export class MockTutorAdapter implements TutorAdapter {
  async ask(question: string, context: LearningContext): Promise<RAGResponse> {
    // Simulate natural AI thinking latency (400ms - 800ms)
    await new Promise((resolve) => setTimeout(resolve, 600));

    const lowerQ = question.toLowerCase();
    const lang = context.language;

    // 1. Check if asking about a subject whose curriculum materials are pending ingestion (e.g. English, Geography)
    const isEnglish = context.subjectId === 'english' || lowerQ.includes('english') || lowerQ.includes('ඉංග්‍රීසි') || lowerQ.includes('ஆங்கிலம்');
    const isGeography = context.subjectId === 'geography' || lowerQ.includes('geography') || lowerQ.includes('භූගෝල') || lowerQ.includes('புவியியல்');

    if (isEnglish || isGeography) {
      return this.handlePendingSubjectIngestion(question, lang, context, isEnglish ? 'english' : 'geography');
    }

    // 2. Response generation based on Sri Lankan curriculum topics & student intent
    if (lowerQ.includes('photosynthesis') || lowerQ.includes('ප්‍රභාසංස්ලේෂණය') || lowerQ.includes('ஒளித்தொகுப்பு') || lowerQ.includes('plant') || lowerQ.includes('leaf')) {
      return this.handlePhotosynthesis(lang);
    }

    if (lowerQ.includes('pythagoras') || lowerQ.includes('පයිතගරස්') || lowerQ.includes('பைதகரசு') || lowerQ.includes('triangle')) {
      return this.handlePythagoras(lang);
    }

    if (lowerQ.includes('hydraulic') || lowerQ.includes('වාරි') || lowerQ.includes('tank') || lowerQ.includes('bisokotuwa') || lowerQ.includes('history') || lowerQ.includes('ඉතිහාසය') || lowerQ.includes('வரலாறு')) {
      return this.handleAncientHydraulics(lang);
    }

    if (lowerQ.includes('network') || lowerQ.includes('පරිගණක ජාල') || lowerQ.includes('valayam') || lowerQ.includes('ict') || lowerQ.includes('තොරතුරු තාක්ෂණය') || lowerQ.includes('தகவல்')) {
      return this.handleComputerNetworks(lang);
    }

    if (lowerQ.includes('again') || lowerQ.includes('නැවත') || lowerQ.includes('மீண்டும்')) {
      return this.handleRepeatExplanation(lang);
    }

    if (lowerQ.includes('easier') || lowerQ.includes('simpler') || lowerQ.includes('සරල') || lowerQ.includes('எளிதாக')) {
      return this.handleSimplerExplanation(lang);
    }

    if (lowerQ.includes('example') || lowerQ.includes('උදාහරණ') || lowerQ.includes('உதாரணம்')) {
      return this.handleExample(lang);
    }

    if (lowerQ.includes('sinhala') || lowerQ.includes('සිංහල')) {
      return this.handlePhotosynthesis('si');
    }

    if (lowerQ.includes('tamil') || lowerQ.includes('දෙමළ') || lowerQ.includes('தமிழ்')) {
      return this.handlePhotosynthesis('ta');
    }

    if (lowerQ.includes('quiz') || lowerQ.includes('ප්‍රශ්න') || lowerQ.includes('வினாடி வினா')) {
      return this.handleQuizPrompt(lang);
    }

    // Default friendly educational guidance grounded in curriculum reality
    return this.handleDefault(question, lang, context);
  }

  private handlePhotosynthesis(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-nie-sci-gr8-ch4',
        source: 'Grade 8 Science Textbook (National Institute of Education)',
        fileType: 'PDF',
        pageNumber: 42,
        chunkNumber: 3,
        distance: 0.14,
        excerpt: null, // As per guidelines: excerpt is null unless genuinely provided
      },
      {
        documentId: 'sl-pastpaper-ol-sci-2023',
        source: 'G.C.E. O/L Science Syllabus Guide — Plant Nutrition Unit',
        fileType: 'PDF',
        pageNumber: 18,
        chunkNumber: 7,
        distance: 0.22,
        excerpt: null,
      }
    ];

    if (lang === 'si') {
      return {
        answer: `**ප්‍රභාසංස්ලේෂණය (Photosynthesis)** යනු හරිත ශාක සූර්යාලෝක ශක්තිය උපයෝගී කරගනිමින් ජලය සහ කාබන් ඩයොක්සයිඩ් සංයෝජනය කර තමන්ට අවශ්‍ය ආහාර (ග්ලූකෝස්) සහ අපට හුස්ම ගැනීමට අවශ්‍ය ඔක්සිජන් නිපදවන මූලික ජෛව රසායනික ක්‍රියාවලියයි.

### ප්‍රධාන අමුද්‍රව්‍ය 4:
1. **සූර්යාලෝකය (Sunlight):** ශක්තිය සපයයි.
2. **හරිතප්‍රද (Chlorophyll):** පත්‍ර සෛල තුළ ආලෝකය උරාගනී.
3. **කාබන් ඩයොක්සයිඩ් (CO₂):** පත්‍ර රන්ධ්‍ර (Stomata) මඟින් වාතයෙන් ලබාගනී.
4. **ජලය (H₂O):** මුල් මඟින් පසෙන් උරාගෙන දැව පටක හරහා පත්‍ර වෙත රැගෙන එයි.

### රසායනික සමීකරණය:
$$6CO_2 + 6H_2O \\xrightarrow[හරිතප්‍රද]{සූර්යාලෝකය} C_6H_{12}O_6 + 6O_2$$

ඔබට මෙහි ප්‍රායෝගික උදාහරණයක් හෝ පත්‍ර රන්ධ්‍ර ක්‍රියාකාරීත්වය ගැන තවත් දැනගැනීමට අවශ්‍යද?`,
        sources,
        suggestedFollowUps: [
          'හරිතප්‍රද වල කාර්යය කුමක්ද?',
          'රසායනික සමීකරණය සරලව පැහැදිලි කරන්න',
          'ශ්‍රී ලාංකික උදාහරණයක් දෙන්න',
          'ප්‍රභාසංස්ලේෂණයෙන් ප්‍රශ්නයක් අසන්න'
        ],
      };
    }

    if (lang === 'ta') {
      return {
        answer: `**ஒளித்தொகுப்பு (Photosynthesis)** என்பது பச்சைத் தாவரங்கள் சூரிய ஒளியைப் பயன்படுத்தி நீர் மற்றும் காபனீரொட்சைட்டை இணைத்து குளுக்கோஸ் (உணவு) மற்றும் ஒக்சிசனை உருவாக்கும் முக்கிய செயல்முறையாகும்.

### தேவையான 4 முக்கிய காரணிகள்:
1. **சூரிய ஒளி:** செயல்முறைக்குத் தேவையான ஆற்றலை வழங்குகிறது.
2. **பச்சையம் (Chlorophyll):** சூரிய ஒளியை உறிஞ்சும் இலைகளில் உள்ள நிறமி.
3. **காபனீரொட்சைட்டு (CO₂):** இலைவாய்கள் மூலம் வளிமண்டலத்திலிருந்து பெறப்படுகிறது.
4. **நீர் (H₂O):** வேர்களின் மூலம் உறிஞ்சப்பட்டு இலைகளுக்குக் கொண்டு செல்லப்படுகிறது.

### சமன்பாடு:
$$6CO_2 + 6H_2O \\xrightarrow[பச்சையம்]{சூரிய ஒளி} C_6H_{12}O_6 + 6O_2$$

இதற்கான நிஜ உலக உதாரணம் அல்லது மாதிரி வினாக்களைப் பார்க்க விரும்புகிறீர்களா?`,
        sources,
        suggestedFollowUps: [
          'பச்சையத்தின் பங்கு என்ன?',
          'வேதியியல் சமன்பாட்டை விளக்குங்கள்',
          'ஒரு நிஜ உலக உதாரணம் தாருங்கள்',
          'ஒளித்தொகுப்பு பற்றிய வினாடி வினா'
        ],
      };
    }

    return {
      answer: `**Photosynthesis** is the biological process by which green plants harness solar energy to synthesize food (glucose) from water and carbon dioxide, releasing oxygen as a byproduct.

### The 4 Essential Ingredients:
1. **Sunlight:** The solar radiant energy source.
2. **Chlorophyll:** The green pigment inside chloroplasts that captures sunlight.
3. **Carbon Dioxide ($CO_2$):** Diffuses from the atmosphere through microscopic leaf openings called **stomata**.
4. **Water ($H_2O$):** Absorbed from the soil by root hairs and transported upward through xylem tissue.

### Balanced Chemical Equation:
$$6CO_2 + 6H_2O \\xrightarrow[Chlorophyll]{Sunlight} C_6H_{12}O_6 + 6O_2$$

The glucose produced is stored as starch (like in yams or bananas), and the oxygen provides the breathable atmosphere essential for humans and animals across Sri Lanka!`,
      sources,
      suggestedFollowUps: [
        'What is the role of chlorophyll?',
        'Explain the chemical equation in simple terms',
        'Give me a Sri Lankan real-world example',
        'Quiz me on plant photosynthesis'
      ],
    };
  }

  private handlePythagoras(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-nie-math-gr8-ch9',
        source: 'Grade 8 Mathematics Textbook (National Institute of Education)',
        fileType: 'PDF',
        pageNumber: 114,
        chunkNumber: 2,
        distance: 0.11,
        excerpt: null,
      }
    ];

    if (lang === 'si') {
      return {
        answer: `**පයිතගරස් ප්‍රමේයය (Pythagoras Theorem)** අදාළ වන්නේ **සෘජුකෝණී ත්‍රිකෝණ** සඳහා පමණි.

> "සෘජුකෝණී ත්‍රිකෝණයක කර්ණය මත වර්ගඵලය, සෘජුකෝණය සාදන අනෙක් පාද දෙක මත වර්ගඵලයන්ගේ එකතුවට සමාන වේ."

### සූත්‍රය:
$$a^2 + b^2 = c^2$$
*(මෙහි $c$ යනු කර්ණය හෙවත් දිගම පාදයයි)*

**උදාහරණයක්:**
පාද $3\\text{ cm}$ සහ $4\\text{ cm}$ නම්:
$$c^2 = 3^2 + 4^2 = 9 + 16 = 25$$
$$c = \\sqrt{25} = 5\\text{ cm}$$`,
        sources,
        suggestedFollowUps: [
          'කර්ණය (Hypotenuse) යනු කුමක්ද?',
          'තවත් උදාහරණ ගැටළුවක් හදමු',
          'සැබෑ ජීවිතයේ ප්‍රායෝගික යෙදීම් මොනවාද?',
          'පයිතගරස් ප්‍රමේයයෙන් ප්‍රශ්නයක් අසන්න'
        ],
      };
    }

    if (lang === 'ta') {
      return {
        answer: `**பைதகரசு தேற்றம் (Pythagoras Theorem)** செங்கோண முக்கோணங்களுக்கு மட்டுமே பொருந்தும்.

> "ஒரு செங்கோண முக்கோணத்தில் செம்பக்கத்தின் மீதான வர்க்கமானது, மற்ற இரு பக்கங்களின் வர்க்கங்களின் கூட்டுத்தொகைக்கு சமனாகும்."

### சூத்திரம்:
$$a^2 + b^2 = c^2$$
*(இங்கு $c$ என்பது செம்பக்கம் அல்லது மிக நீண்ட பக்கமாகும்)*

**உதாரணம்:**
பக்கங்கள் $3\\text{ cm}$ மற்றும் $4\\text{ cm}$ எனில்:
$$c^2 = 3^2 + 4^2 = 9 + 16 = 25$$
$$c = \\sqrt{25} = 5\\text{ cm}$$`,
        sources,
        suggestedFollowUps: [
          'செம்பக்கம் (Hypotenuse) என்றால் என்ன?',
          'ஒரு உதாரணக் கணக்கு செய்வோம்',
          'நிஜ வாழ்க்கையில் எங்கு பயன்படுகிறது?',
          'பைதகரசு தேற்றம் பற்றிய வினாடி வினா'
        ],
      };
    }

    return {
      answer: `**Pythagoras' Theorem** states a fundamental relationship among the three sides of any **right-angled triangle**:

> "In any right-angled triangle, the area of the square on the hypotenuse (the longest side opposite the right angle) is equal to the sum of the areas of the squares on the other two sides."

### The Formula:
$$a^2 + b^2 = c^2$$
Where:
- $c$ is the **hypotenuse** (longest side)
- $a$ and $b$ are the two perpendicular sides

**Quick Classic Example (Pythagorean Triple):**
If side $a = 6\\text{ cm}$ and side $b = 8\\text{ cm}$:
$$c^2 = 6^2 + 8^2 = 36 + 64 = 100$$
$$c = \\sqrt{100} = 10\\text{ cm}$$

Would you like to try calculating a hypotenuse together?`,
      sources,
      suggestedFollowUps: [
        'What is a hypotenuse?',
        'Solve a 3-4-5 triangle example',
        'Real-world applications in construction',
        'Quiz me on Pythagoras Theorem'
      ],
    };
  }

  private handleRepeatExplanation(lang: 'en' | 'si' | 'ta'): RAGResponse {
    return {
      answer: lang === 'si' 
        ? `සතුටින් නැවත සලකා බලමු! සරලවම කිව්වොත්: ශාක වලට ජීවත් වෙන්නත් කෑම අවශ්‍යයි. සතුන් වගේ ඇවිදලා කෑම හොයන්න බැරි නිසා, ශාක තමන්ගේ පත්‍ර වල තියෙන **හරිතප්‍රද** සහ **හිරු එළිය** පාවිච්චි කරලා, බිමෙන් **වතුරයි** හුස්ම ගන්න වාතයෙන් **කාබන් ඩයොක්සයිඩුයි** අරගෙන රසවත් ග්ලූකෝස් ආහාර හදනවා. මෙයට අපි **ප්‍රභාසංස්ලේෂණය** කියනවා.`
        : `Let's break it down in a fresh, simple way! Think of a green leaf as a tiny solar-powered kitchen:
- **Chef:** The Chlorophyll inside chloroplasts
- **Stove / Power:** Sunlight streaming from above
- **Groceries:** Water from the roots + Carbon Dioxide from the air
- **Finished Meal:** Sweet Glucose food + Fresh Oxygen released into the air.`,
      sources: [
        {
          documentId: 'sl-nie-sci-gr8-ch4',
          source: 'Grade 8 Science Textbook (National Institute of Education)',
          pageNumber: 43,
          distance: 0.16,
        }
      ],
    };
  }

  private handleSimplerExplanation(lang: 'en' | 'si' | 'ta'): RAGResponse {
    return {
      answer: lang === 'si'
        ? `තවත් සරල කරමු:
- **ශාකය ගන්නේ:** හිරු එළිය ☀️ + ජලය 💧 + කාබන් ඩයොක්සයිඩ් 💨
- **ශාකය හදන්නේ:** ආහාර (ග්ලූකෝස්) 🍯 + අපට හුස්ම ගන්න ඔක්සිජන් 🍃

මේ ක්‍රියාවලිය නැත්නම් මිහිමත කිසිම සතෙකුට හෝ මිනිසෙකුට ඔක්සිජන් ලැබෙන්නේ නැහැ!`
        : `Super simple version:
- **What goes in:** Sunlight ☀️ + Water 💧 + Air ($CO_2$) 💨
- **What comes out:** Plant Food (Glucose) 🍯 + Clean Oxygen ($O_2$) 🍃

Without this simple plant magic, living creatures wouldn't have oxygen to breathe!`,
      sources: [
        {
          documentId: 'sl-nie-sci-gr8-ch4',
          source: 'Grade 8 Science — Foundation Concepts',
          pageNumber: 42,
          distance: 0.15,
        }
      ],
    };
  }

  private handleExample(lang: 'en' | 'si' | 'ta'): RAGResponse {
    return {
      answer: lang === 'si'
        ? `**ශ්‍රී ලාංකික සැබෑ උදාහරණයක්:**
ඔබ පොල් ගසක් දෙස බලන්න. පොල් අතු දිග හැරෙන්නේ හිරු එළිය උපරිමයෙන් ලබාගන්නයි. ඒ පොල් අතුවල සිදුවන ප්‍රභාසංස්ලේෂණයෙන් නිපදවන ශක්තියෙන් තමයි පොල් ගෙඩිය තුළ පැණි රස පොල් වතුර සහ මදය හැදෙන්නේ! ඔබ බොන තැඹිලි වතුරෙහි අඩංගු ග්ලූකෝස් මුලින්ම හැදුණේ හිරු එළියෙනි.`
        : `**A Real-World Sri Lankan Example:**
Think of a King Coconut (Thambili) tree in your garden. The tall fronds spread wide to catch equatorial sunshine. 
Through photosynthesis, the palm creates glucose and electrolytes, which it pumps into the young king coconuts. The sweet, refreshing water you drink on a hot afternoon was synthesized by the leaves using sunlight!`,
      sources: [
        {
          documentId: 'sl-nie-sci-gr8-ch4',
          source: 'Grade 8 Science Textbook — Plant Physiology in Tropical Ecosystems',
          pageNumber: 45,
          distance: 0.18,
        }
      ],
    };
  }

  private handleQuizPrompt(lang: 'en' | 'si' | 'ta'): RAGResponse {
    return {
      answer: lang === 'si'
        ? `**ඔබේ අවබෝධය පරීක්ෂා කරමු! මෙන්න ප්‍රශ්නයක්:**
ශාක පත්‍රවල හරිත වර්ණය ලබාදෙන සහ සූර්යාලෝකය උරාගන්නා වර්ණකය කුමක්ද?

1. හිමොග්ලොබින්
2. හරිතප්‍රද (Chlorophyll)
3. මෙලනින්

ඔබේ පිළිතුර කියන්න, මම පැහැදිලි කරන්නම්!`
        : `**Let's test your understanding with a quick question:**
What is the name of the green pigment inside plant leaves that captures sunlight?

1. Hemoglobin
2. Chlorophyll
3. Melanin

Type or tap your answer, and let's check it together!`,
      sources: [
        {
          documentId: 'sl-nie-sci-gr8-ch4',
          source: 'Grade 8 Science Revision Review',
          pageNumber: 46,
          distance: 0.12,
        }
      ],
    };
  }

  private handlePendingSubjectIngestion(
    question: string,
    lang: 'en' | 'si' | 'ta',
    context: LearningContext,
    subjectKey: 'english' | 'geography'
  ): RAGResponse {
    const gradeDisplay = context.grade.replace('-', ' ').toUpperCase();
    const isEnglish = subjectKey === 'english';
    const subjectName = isEnglish
      ? (lang === 'si' ? 'ඉංග්‍රීසි භාෂාව (English Language)' : lang === 'ta' ? 'ஆங்கில மொழி (English Language)' : 'English Language')
      : (lang === 'si' ? 'භූගෝල විද්‍යාව (Geography)' : lang === 'ta' ? 'புவியியல் (Geography)' : 'Geography');

    if (lang === 'si') {
      return {
        answer: `ඔබගේ විමසීම: **"${question}"**

කරුණාවෙන් සලකන්න: **${gradeDisplay}** ශ්‍රේණිය සඳහා **${subjectName}** විෂය නිර්දේශයේ පාඩම් හෝ පෙළපොත් කොටස් තවමත් ATLAS Learn පද්ධතියට ඇතුළත් කර නොමැත (දැනට සකස් වෙමින් පවතී).

ATLAS Tutor පදනම් වන්නේ අනුමත නිල විෂය නිර්දේශ මූලාශ්‍ර මත පමණක් බැවින්, සුචිගත කළ අන්තර්ගතයක් නොමැතිව පිළිතුරු සපයනු නොලැබේ. 

ඔබට දැනට පද්ධතිය තුළ සක්‍රියව පවතින **ගණිතය (Mathematics)** හෝ **විද්‍යාව (Science)** වැනි විෂයයන් පිළිබඳව ප්‍රශ්න ඇසීමට හෝ පාඩම් සාකච්ඡා කිරීමට අවශ්‍යද?`,
        sources: [],
        suggestedFollowUps: [
          'ගණිතය: පයිතගරස් ප්‍රමේයය',
          'විද්‍යාව: ප්‍රභාසංස්ලේෂණය',
          'ඉතිහාසය: පුරාණ වාරි ශිෂ්ටාචාරය',
          'දැනට ඇති විෂයයන් මොනවාද?'
        ],
      };
    }

    if (lang === 'ta') {
      return {
        answer: `உங்கள் கேள்வி: **"${question}"**

கவனிக்கவும்: **${gradeDisplay}** இற்கான **${subjectName}** பாடத்திட்ட ஆதாரங்கள் மற்றும் குறிப்புகள் இன்னும் ATLAS Learn இல் உள்ளடக்கப்படவில்லை (தற்போது சேர்க்கப்பட்டு வருகின்றன).

அங்கீகரிக்கப்பட்ட பாடத்திட்ட ஆதாரங்கள் இல்லாமல் ATLAS Tutor பதில்களை வழங்காது.

தற்போது பயன்பாட்டில் உள்ள **கணிதம் (Mathematics)** அல்லது **அறிவியல் (Science)** பாடங்களை ஆராய விரும்புகிறீர்களா?`,
        sources: [],
        suggestedFollowUps: [
          'கணிதம்: பைதகரசு தேற்றம்',
          'அறிவியல்: ஒளித்தொகுப்பு',
          'வரலாறு: பண்டைய நீரியல் நாகரிகம்',
          'கிடைக்கக்கூடிய பாடங்கள் எவை?'
        ],
      };
    }

    return {
      answer: `Regarding your inquiry: **"${question}"**

Please note: Official curriculum materials and textbook chapters for **${subjectName}** in **${gradeDisplay}** have not yet been ingested into ATLAS Learn (currently pending ingestion).

Because ATLAS Tutor strictly grounds explanations in verified educational resources, answers cannot be generated without approved curriculum evidence.

Would you like to explore subjects currently active in your syllabus, such as **Mathematics**, **Science**, or **History**?`,
      sources: [],
      suggestedFollowUps: [
        'Maths: Pythagoras Theorem',
        'Science: Photosynthesis',
        'History: Hydraulic Civilization',
        'Which subjects are available?'
      ],
    };
  }

  private handleAncientHydraulics(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-nie-his-gr8-ch3',
        source: 'Grade 8 History Textbook (National Institute of Education)',
        fileType: 'PDF',
        pageNumber: 35,
        chunkNumber: 1,
        distance: 0.13,
        excerpt: null,
      }
    ];

    if (lang === 'si') {
      return {
        answer: `**ශ්‍රී ලංකාවේ පුරාණ වාරි ශිෂ්ටාචාරය (Ancient Hydraulic Civilization)** යනු අපගේ මුතුන්මිත්තන් ජල කළමනාකරණය සඳහා නිර්මාණය කළ ලෝක ප්‍රකට තාක්ෂණික විස්මයකි.

### ප්‍රධාන අංග 3:
1. **මහ වැව් (Reservoirs):** මහා පරාක්‍රමබාහු, ධාතුසේන රජවරුන් විසින් ඉදිකළ පරාක්‍රම සමුද්‍රය, කලා වැව ආදිය.
2. **බිසෝකොටුව (Cistern Sluice):** වැවක ගැඹුරු ජල පීඩනය පාලනය කර පිටතට ජලය නිකුත් කිරීම සඳහා නිර්මාණය කළ ලොව ප්‍රථම සොරොව් තාක්ෂණයයි.
3. **ඇළ මාර්ග (Canals):** සැතපුමකට අඟලක පමණ ඉතා සියුම් බෑවුමක් සහිතව සැතපුම් 54ක් දුරට ජලය ගෙන ගිය **ජය ගඟ (යෝධ ඇළ)**.

ඔබට බිසෝකොටුවේ ක්‍රියාකාරීත්වය හෝ යෝධ ඇළ පිළිබඳව වැඩිදුර දැනගැනීමට අවශ්‍යද?`,
        sources,
        suggestedFollowUps: [
          'බිසෝකොටුව ක්‍රියා කරන්නේ කෙසේද?',
          'යෝධ ඇළේ තාක්ෂණික විශේෂත්වය',
          'වාරි ශිෂ්ටාචාරයෙන් ප්‍රශ්නයක් අසන්න'
        ],
      };
    }

    if (lang === 'ta') {
      return {
        answer: `**இலங்கையின் பண்டைய நீரியல் நாகரிகம் (Ancient Hydraulic Civilization)** என்பது நமது முன்னோர்கள் நீர் நிர்வாகத்திற்காக உருவாக்கிய உலகப் புகழ்பெற்ற தொழில்நுட்பமாகும்.

### 3 முக்கிய கூறுகள்:
1. **பெரிய குளங்கள்:** பராக்கிரம சமுத்திரம், கலா வாவி போன்ற பிரமாண்ட குளங்கள்.
2. **பிசோகொட்டுவ (Bisokotuwa):** நீரின் அழுத்தத்தைக் கட்டுப்படுத்தி பாதுகாப்பாக வெளியேற்ற அமைக்கப்பட்ட பண்டைய மதகுத் தொழில்நுட்பம்.
3. **கால்வாய்கள்:** மிகக் குறைந்த சரிவுடன் மைல்கள் தூரம் நீர் கொண்டு சென்ற **யோத எல (ஜெய கங்கை)**.`,
        sources,
        suggestedFollowUps: [
          'பிசோகொட்டுவ எவ்வாறு செயல்படுகிறது?',
          'யோத எல கால்வாயின் சிறப்பு',
          'மாதிரி வினாடி வினா கேளுங்கள்'
        ],
      };
    }

    return {
      answer: `**The Ancient Hydraulic Civilization of Sri Lanka** represents one of antiquity's most sophisticated hydrological engineering achievements.

### 3 Fundamental Engineering Innovations:
1. **Cascade Tank Systems (Wewa):** Massive reservoirs like Parakrama Samudra, Minneriya, and Kala Wewa.
2. **Bisokotuwa (Cistern Sluice):** The world's earliest pressure-regulating valve invented by ancient Sinhala engineers to release high-pressure water safely without damaging earth embankments.
3. **Trans-Basin Canals:** Engineering marvels like the **Yoda Ela (Jaya Ganga)**, traversing 54 miles at an astonishingly subtle gradient of less than 6 inches per mile.`,
      sources,
      suggestedFollowUps: [
        'How does a Bisokotuwa work?',
        'Engineering of Yoda Ela canal',
        'Quiz me on Hydraulic Civilization'
      ],
    };
  }

  private handleComputerNetworks(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-nie-ict-gr8-ch2',
        source: 'Grade 8 ICT Textbook (National Institute of Education)',
        fileType: 'PDF',
        pageNumber: 22,
        chunkNumber: 1,
        distance: 0.15,
        excerpt: null,
      }
    ];

    if (lang === 'si') {
      return {
        answer: `**පරිගණක ජාල (Computer Networks)** යනු සම්පත්, දත්ත සහ තොරතුරු හුවමාරු කරගැනීම සඳහා එකිනෙකට සම්බන්ධ කරන ලද පරිගණක සහ උපාංග එකතුවකි.

### ප්‍රධාන ජාල වර්ග:
1. **LAN (Local Area Network):** පාසල් පරිගණක විද්‍යාගාරයක් හෝ නිවසක් වැනි සීමිත භූමි ප්‍රදේශයක පවතින ජාල.
2. **WAN (Wide Area Network):** අන්තර්ජාලය (Internet) මෙන් රටවල් සහ මුළු ලෝකයම ආවරණය වන පුළුල් ජාල.

ඔබට LAN සහ WAN අතර වෙනස හෝ ජාල උපාංග (Router, Switch) ගැන වැඩිදුර දැනගැනීමට අවශ්‍යද?`,
        sources,
        suggestedFollowUps: [
          'LAN සහ WAN අතර වෙනස කුමක්ද?',
          'Router සහ Switch ක්‍රියාකාරීත්වය',
          'ICT ප්‍රශ්නයක් අසන්න'
        ],
      };
    }

    if (lang === 'ta') {
      return {
        answer: `**கணினி வலையமைப்புகள் (Computer Networks)** என்பது தரவு, வளங்கள் மற்றும் தகவல்களைப் பகிர்வதற்காக இணைக்கப்பட்ட கணினிகள் மற்றும் சாதனங்களின் தொகுப்பாகும்.

### முக்கிய வகைகள்:
1. **LAN (Local Area Network):** ஆய்வகம் அல்லது ஒரு கட்டிடத்திற்குள் மட்டுப்படுத்தப்பட்ட வலையமைப்பு.
2. **WAN (Wide Area Network):** இணையம் (Internet) போன்ற உலகளாவிய வலையமைப்பு.`,
        sources,
        suggestedFollowUps: [
          'LAN மற்றும் WAN வேறுபாடு என்ன?',
          'Router மற்றும் Switch செயல்பாடு',
          'தகவல் தொழில்நுட்ப வினாடி வினா'
        ],
      };
    }

    return {
      answer: `A **Computer Network** is a collection of interconnected computing devices that communicate and share resources, files, and applications.

### Primary Network Classifications:
1. **LAN (Local Area Network):** Geographically confined to a single room, school computer lab, or building.
2. **WAN (Wide Area Network):** Covers vast geographical distances, nations, or continents (the Internet is the largest example of a WAN).`,
      sources,
      suggestedFollowUps: [
        'Difference between LAN and WAN',
        'What is a Router vs Switch?',
        'Quiz me on ICT Networks'
      ],
    };
  }

  private handleDefault(question: string, lang: 'en' | 'si' | 'ta', context: LearningContext): RAGResponse {
    const gradeDisplay = context.grade.replace('-', ' ').toUpperCase();

    if (lang === 'si') {
      return {
        answer: `ඔබගේ විමසීම: **"${question}"**

ස්තූතියි! කෙසේ වෙතත්, ඔබ ඉල්ලූ මෙම නිශ්චිත කරුණට අදාළ අනුමත පෙළපොත් කොටස් තවමත් ATLAS Learn සුචිය තුළ අන්තර්ගත කර නොමැත.

ATLAS Tutor පදනම් වන්නේ අනුමත නිල විෂය නිර්දේශ මූලාශ්‍ර මත පමණක් බැවින්, තහවුරු නොකළ කරුණු සැපයීමෙන් වැළකී සිටී. 

ඔබගේ **${gradeDisplay}** ශ්‍රේණිය සඳහා දැනට පද්ධතිය තුළ සක්‍රියව පවතින **ගණිතය (Mathematics)**, **විද්‍යාව (Science)** හෝ **ඉතිහාසය (History)** වැනි විෂයයන් පිළිබඳව පාඩම් සාකච්ඡා කිරීමට ඔබ කැමතිද?`,
        sources: [],
        suggestedFollowUps: [
          'ගණිතය: පයිතගරස් ප්‍රමේයය',
          'විද්‍යාව: ප්‍රභාසංස්ලේෂණය',
          'ඉතිහාසය: පුරාණ වාරි ශිෂ්ටාචාරය',
          'දැනට ඇති විෂයයන් මොනවාද?'
        ],
      };
    }

    if (lang === 'ta') {
      return {
        answer: `உங்கள் கேள்வி: **"${question}"**

நன்றி! எனினும், இந்த குறிப்பிட்ட விவரம் தொடர்பான அங்கீகரிக்கப்பட்ட பாடநூல் குறிப்புகள் இன்னும் ATLAS Learn இல் உள்ளடக்கப்படவில்லை.

அங்கீகரிக்கப்பட்ட பாடத்திட்ட ஆதாரங்கள் இல்லாமல் ATLAS Tutor பதில்களை வழங்காது. உங்கள் **${gradeDisplay}** இற்கான **கணிதம் (Mathematics)**, **அறிவியல் (Science)** அல்லது **வரலாறு (History)** பாடங்களை ஆராய விரும்புகிறீர்களா?`,
        sources: [],
        suggestedFollowUps: [
          'கணிதம்: பைதகரசு தேற்றம்',
          'அறிவியல்: ஒளித்தொகுப்பு',
          'வரலாறு: பண்டைய நீரியல் நாகரிகம்',
          'கிடைக்கக்கூடிய பாடங்கள் எவை?'
        ],
      };
    }

    return {
      answer: `Regarding your inquiry: **"${question}"**

Thank you for your inquiry! However, verified curriculum textbook passages for this specific query have not yet been indexed in ATLAS Learn.

ATLAS Tutor strictly adheres to verified official curriculum resources to ensure high academic integrity.

Would you like to explore subjects currently active in your **${gradeDisplay}** syllabus, such as **Mathematics**, **Science**, or **History**?`,
      sources: [],
      suggestedFollowUps: [
        'Maths: Pythagoras Theorem',
        'Science: Photosynthesis',
        'History: Hydraulic Civilization',
        'What subjects are available?'
      ],
    };
  }

  async clearConversation(_conversationId: string): Promise<void> {
    // No-op for mock adapter
  }
}

/**
 * TutorService: Factory / Coordinator
 * Switches transparently between MockTutorAdapter and AtlasLiveTutorAdapter based on VITE_USE_MOCK_API.
 */
class TutorService {
  private adapter: TutorAdapter;
  private mockMode: boolean;

  constructor() {
    const storedMode = typeof localStorage !== 'undefined' ? localStorage.getItem('atlas_force_mock') : null;
    const useMock = storedMode !== null ? storedMode === 'true' : import.meta.env.VITE_USE_MOCK_API !== 'false';
    this.mockMode = useMock;
    this.adapter = useMock ? new MockTutorAdapter() : new AtlasLiveTutorAdapter();
    console.info(`[TutorService] Initialized with ${useMock ? 'MockTutorAdapter' : 'AtlasLiveTutorAdapter'}`);
  }

  public isMockMode(): boolean {
    return this.mockMode;
  }

  public setMockMode(useMock: boolean): void {
    this.mockMode = useMock;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('atlas_force_mock', String(useMock));
    }
    this.adapter = useMock ? new MockTutorAdapter() : new AtlasLiveTutorAdapter();
    console.info(`[TutorService] Switched to ${useMock ? 'MockTutorAdapter' : 'AtlasLiveTutorAdapter'}`);
  }

  public async askTutor(question: string, context: LearningContext): Promise<RAGResponse> {
    return this.adapter.ask(question, context);
  }

  public async clearConversation(conversationId: string): Promise<void> {
    await this.adapter.clearConversation(conversationId);
  }
}

export const tutorService = new TutorService();
