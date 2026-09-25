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

    // ICT Chapter 1: Number Systems
    if (lowerQ.includes('number system') || lowerQ.includes('binary') || lowerQ.includes('decimal') || lowerQ.includes('switch') || lowerQ.includes('transistor') || lowerQ.includes('base 2') || lowerQ.includes('base 10') || lowerQ.includes('ද්විමය') || lowerQ.includes('දශමය') || lowerQ.includes('සංඛ්‍යා පද්ධති') || lowerQ.includes('இரும') || lowerQ.includes('எண் முறை')) {
      return this.handleNumberSystems(lang);
    }

    // ICT Chapter 2: Configuring & Formatting a Computer (Desktop customization, resolution, keyboard, formatting)
    if (lowerQ.includes('desktop') || lowerQ.includes('customiz') || lowerQ.includes('display') || lowerQ.includes('resolution') || lowerQ.includes('format') || lowerQ.includes('keyboard') || lowerQ.includes('screen') || lowerQ.includes('වින්‍යාස') || lowerQ.includes('හැඩසවි') || lowerQ.includes('විභේදනය') || lowerQ.includes('யතුරුපුවරු') || lowerQ.includes('உள்ளமை') || lowerQ.includes('தெளிவுத்திறன்')) {
      return this.handleConfiguringComputer(lang);
    }

    // ICT Chapter 3: Word Processing
    if (lowerQ.includes('word process') || lowerQ.includes('justify') || lowerQ.includes('font') || lowerQ.includes('paragraph') || lowerQ.includes('alignment') || lowerQ.includes('orientation') || lowerQ.includes('landscape') || lowerQ.includes('portrait') || lowerQ.includes('වදන් සැකසුම') || lowerQ.includes('සමපාත') || lowerQ.includes('சொல் செயலாக்கம்')) {
      return this.handleWordProcessing(lang);
    }

    // ICT Chapter 4: Programming (Scratch)
    if (lowerQ.includes('scratch') || lowerQ.includes('programm') || lowerQ.includes('sprite') || lowerQ.includes('variable') || lowerQ.includes('loop') || lowerQ.includes('repeat') || lowerQ.includes('if-then') || lowerQ.includes('ක්‍රමලේඛන') || lowerQ.includes('විචල්‍ය') || lowerQ.includes('ස්ප්‍රයිට්') || lowerQ.includes('නிரலாக்கம்') || lowerQ.includes('மாறி')) {
      return this.handleProgramming(lang);
    }

    // ICT Chapter 5: Physical Computing
    if (lowerQ.includes('physical computing') || lowerQ.includes('microbit') || lowerQ.includes('micro:bit') || lowerQ.includes('arduino') || lowerQ.includes('sensor') || lowerQ.includes('actuator') || lowerQ.includes('ldr') || lowerQ.includes('buzzer') || lowerQ.includes('භෞතික පරිගණන') || lowerQ.includes('සංවේදක') || lowerQ.includes('ක්‍රියාකරවන') || lowerQ.includes('பௌதீகக் கணினியியல்') || lowerQ.includes('உணரி')) {
      return this.handlePhysicalComputing(lang);
    }

    // ICT Chapter 6: Internet & Email
    if (lowerQ.includes('internet') || lowerQ.includes('url') || lowerQ.includes('email') || lowerQ.includes('bcc') || lowerQ.includes('cc') || lowerQ.includes('browser') || lowerQ.includes('cyber') || lowerQ.includes('phishing') || lowerQ.includes('අන්තර්ජාල') || lowerQ.includes('විද්‍යුත් තැපෑල') || lowerQ.includes('இணையம்') || lowerQ.includes('மின்னஞ்சல்')) {
      return this.handleInternet(lang);
    }

    // History Grade 10 & Grade 8
    if (lowerQ.includes('parakramabahu') || lowerQ.includes('samudraya') || lowerQ.includes('polonnaruwa') || lowerQ.includes('danture') || lowerQ.includes('colonial') || lowerQ.includes('mahavamsa') || lowerQ.includes('inscription') || lowerQ.includes('kandyan') || lowerQ.includes('පරාක්‍රමබාහු') || lowerQ.includes('පොළොන්නරු') || lowerQ.includes('මහාවංශ') || lowerQ.includes('பராக்கிரம')) {
      return this.handleHistory(lang);
    }

    // General ICT fallback
    if (lowerQ.includes('network') || lowerQ.includes('පරිගණක ජාල') || lowerQ.includes('valayam') || lowerQ.includes('ict') || lowerQ.includes('තොරතුරු තාක්ෂණය') || lowerQ.includes('தகவல்')) {
      return this.handleNumberSystems(lang);
    }

    if (lowerQ.includes('photosynthesis') || lowerQ.includes('ප්‍රභාසංස්ලේෂණය') || lowerQ.includes('ஒளித்தொகுப்பு') || lowerQ.includes('plant') || lowerQ.includes('leaf')) {
      return this.handlePhotosynthesis(lang);
    }

    if (lowerQ.includes('pythagoras') || lowerQ.includes('පයිතගරස්') || lowerQ.includes('பைதகரசு') || lowerQ.includes('triangle')) {
      return this.handlePythagoras(lang);
    }

    if (lowerQ.includes('hydraulic') || lowerQ.includes('වාරි') || lowerQ.includes('tank') || lowerQ.includes('bisokotuwa') || lowerQ.includes('history') || lowerQ.includes('ඉතිහාසය') || lowerQ.includes('வரலாறு')) {
      return this.handleAncientHydraulics(lang);
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

  private handleNumberSystems(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-ict-gr8-ict-gr8-en',
        source: 'Grade 8 ICT Textbook — Chapter 1: Number Systems (Educational Publications Department Sri Lanka)',
        fileType: 'PDF',
        pageNumber: 3,
        chunkNumber: 12,
        distance: 0.12,
        excerpt: null,
      },
      {
        documentId: 'moe-lk-ict-gr8-ict-gr8-en',
        source: 'National ICT Curriculum Guide — Data Representation & Binary Systems',
        fileType: 'PDF',
        pageNumber: 7,
        chunkNumber: 18,
        distance: 0.18,
        excerpt: null,
      }
    ];

    if (lang === 'si') {
      return {
        answer: `**සංඛ්‍යා පද්ධති (Number Systems) — 1 වන පරිච්ඡේදය**

ඩිජිටල් පරිගණක ක්‍රියාත්මක වන්නේ **ද්විමය (Binary / පාදය 2)** සංඛ්‍යා පද්ධතියෙනි. මිනිසුන් වන අප සාමාන්‍යයෙන් 0 සිට 9 දක්වා සංකේත 10ක් සහිත **දශමය (Decimal / පාදය 10)** පද්ධතිය භාවිත කළද, පරිගණක ඉලෙක්ට්‍රොනික පරිපථ (ට්‍රාන්සිස්ටර) පහසුවෙන් පාලනය කළ හැකි තත්ත්ව දෙකක් පමණක් හඳුනාගනී:
- **0 (OFF):** අඩු වෝල්ටීයතාවය (0V) / විදුලි ස්විචය විසන්ධි තත්ත්වය.
- **1 (ON):** ඉහළ වෝල්ටීයතාවය (+3.3V හෝ +5V) / විදුලි ස්විචය සක්‍රිය තත්ත්වය.

### 2 හි බල සහ ස්ථානීය අගයන් (දකුණේ සිට වමට):
$2^7(128) \quad 2^6(64) \quad 2^5(32) \quad 2^4(16) \quad 2^3(8) \quad 2^2(4) \quad 2^1(2) \quad 2^0(1)$

### දශමය 13 ද්විමය බවට පත්කිරීම (Successive Division by 2):
- $13 \div 2 = 6$ (ඉතිරිය **1**)
- $6 \div 2 = 3$ (ඉතිරිය **0**)
- $3 \div 2 = 1$ (ඉතිරිය **1**)
- $1 \div 2 = 0$ (ඉතිරිය **1**)
පහළ සිට ඉහළට කියවූ විට: **$13_{10} = 1101_2$** ($8 + 4 + 0 + 1 = 13$).`,
        sources,
        suggestedFollowUps: [
          'දශමය සංඛ්‍යාවක් ද්විමය කිරීමට තවත් උදාහරණයක් දෙන්න',
          'විදුලි ස්විචය (OFF/ON) සහ පරිගණක ට්‍රාන්සිස්ටර අතර සම්බන්ධය කුමක්ද?',
          'බිටු 8ක් (Byte) මඟින් නිරූපණය කළ හැකි උපරිම අගය කීයද?',
        ],
      };
    }

    if (lang === 'ta') {
      return {
        answer: `**எண் முறைகள் (Number Systems) — அத்தியாயம் 1**

கணினிகள் **இரும (Binary / அடி 2)** எண் முறையில் இயங்குகின்றன. மனிதர்கள் 0 முதல் 9 வரையிலான 10 இலக்கங்களைக் கொண்ட **தசம (Decimal / அடி 10)** முறையைப் பயன்படுத்துகின்றனர். கணினியின் டிரான்சிஸ்டர்கள் இரு மின் நிலைகளை மட்டுமே உணர்கின்றன:
- **0 (OFF):** குறைந்த மின்னழுத்தம் (0V) / மின் சுவிட்ச் அணைக்கப்பட்டது.
- **1 (ON):** உயர் மின்னழுத்தம் (+3.3V / +5V) / மின் சுவிட்ச் இயக்கப்பட்டது.

### 2 இன் அடுக்குகள் (வலமிருந்து இடமாக):
$2^7(128) \quad 2^6(64) \quad 2^5(32) \quad 2^4(16) \quad 2^3(8) \quad 2^2(4) \quad 2^1(2) \quad 2^0(1)$

### தசம எண் 13 ஐ இருமமாக மாற்றுதல்:
- $13 \div 2 = 6$ (மீதி **1**)
- $6 \div 2 = 3$ (மீதி **0**)
- $3 \div 2 = 1$ (மீதி **1**)
- $1 \div 2 = 0$ (மீதி **1**)
கீழிருந்து மேலாக: **$13_{10} = 1101_2$** ($8 + 4 + 0 + 1 = 13$).`,
        sources,
        suggestedFollowUps: [
          'தசமத்திலிருந்து இருமத்திற்கு மாற்றும் முறை',
          'டிரான்சிஸ்டர் சுவிட்ச் எவ்வாறு செயல்படுகிறது?',
          'இரும எண் முறை வினாடி வினா',
        ],
      };
    }

    return {
      answer: `**Number Systems — Grade 8 ICT (Chapter 1)**

Modern digital computers operate using the **Binary Number System (Base 2)** consisting of only two digits: **0** and **1**. While humans naturally use the **Decimal System (Base 10)** with digits 0 through 9, electronic computer hardware relies on microscopic transistors acting as physical electrical switches:
- **State 0 (OFF):** Low voltage ($0\text{V}$), electric switch open / circuit disconnected.
- **State 1 (ON):** High voltage ($+3.3\text{V}$ or $+5\text{V}$), electric switch closed / circuit connected.

### Positional Weights (Powers of 2 from Right to Left):
$$2^7(128) \quad 2^6(64) \quad 2^5(32) \quad 2^4(16) \quad 2^3(8) \quad 2^2(4) \quad 2^1(2) \quad 2^0(1)$$

### Example: Converting Decimal 13 to Binary
Using successive division by 2:
1. $13 \div 2 = 6$ (Remainder **1**)
2. $6 \div 2 = 3$ (Remainder **0**)
3. $3 \div 2 = 1$ (Remainder **1**)
4. $1 \div 2 = 0$ (Remainder **1**)

Reading remainders from bottom to top (MSB to LSB) yields: **$13_{10} = 1101_2$** ($8 + 4 + 0 + 1 = 13$).`,
      sources,
      suggestedFollowUps: [
        'How do I convert decimal 25 to binary?',
        'Explain the Electric Switch ON/OFF logic in CPUs',
        'What is the maximum decimal value an 8-bit byte can store?',
        'Quiz me on Grade 8 Number Systems'
      ],
    };
  }

  private handleConfiguringComputer(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-ict-gr8-ict-gr8-en',
        source: 'Grade 8 ICT Textbook — Chapter 2: Configuring and Formatting a Computer (Educational Publications Department Sri Lanka)',
        fileType: 'PDF',
        pageNumber: 15,
        chunkNumber: 42,
        distance: 0.11,
        excerpt: null,
      },
      {
        documentId: 'moe-lk-ict-gr8-ict-gr8-en',
        source: 'Official Ministry ICT Curriculum Guide — OS Personalization & Storage Maintenance',
        fileType: 'PDF',
        pageNumber: 26,
        chunkNumber: 58,
        distance: 0.16,
        excerpt: null,
      }
    ];

    if (lang === 'si') {
      return {
        answer: `**පරිගණකයක් වින්‍යාසගත කිරීම සහ හැඩසවි ගැන්වීම — 2 වන පරිච්ඡේදය**

පරිගණකයක් කාර්යක්ෂමව භාවිත කිරීමට ඩෙස්ක්ටොප් පරිසරය, භාෂා සහ ආචයන තැටි නිවැරදිව සකසා ගැනීම අත්‍යවශ්‍ය වේ:

### 1. තිර විභේදනය (Screen Resolution):
- තිරයේ තිරස්ව සහ සිරස්ව ඇති පික්සෙල් (Pixels) සංඛ්‍යාව මනිනු ලබයි.
- සම්මත Full HD විභේදනය: **1920 × 1080 Pixels** (පික්සෙල් 2,073,600).
- විභේදනය නිවැරදිව සැකසූ විට අකුරු සහ රූප පැහැදිලිව දර්ශනය වේ.

### 2. සිංහල සහ දෙමළ යුනිකෝඩ් යතුරුපුවරු:
- ශ්‍රී ලංකාවේ සම්මත වේලා කලාපය **UTC+05:30** (Sri Lanka Standard Time) ලෙස සකසයි.
- **Windows Key + Spacebar** එබීමෙන් ඉංග්‍රීසි, සිංහල (විජේසේකර) සහ දෙමළ යතුරුපුවරු අතර ක්ෂණිකව මාරු විය හැක.

### 3. ආචයන තැටි හැඩසවි ගැන්වීම (Drive Formatting):
- USB ධාවක හෝ දෘඪ තැටි Format කිරීමේදී නව ගොනු පද්ධතියක් (NTFS, FAT32) ස්ථාපනය වේ.
- **අවවාදයයි:** Format කිරීමෙන් එහි ඇති සියලුම දත්ත මුළුමනින්ම මැකී යයි. එබැවින් පෙර සූදානමක් ලෙස පිටපතක් (Backup) ලබාගැනීම අනිවාර්ය වේ!`,
        sources,
        suggestedFollowUps: [
          'FAT32 සහ NTFS ගොනු පද්ධති අතර වෙනස කුමක්ද?',
          'Format කිරීමට පෙර Backup ගන්නේ කෙසේද?',
          'සිංහල යුනිකෝඩ් යතුරුපුවරුව පරිගණකයට එක්කරන්නේ කෙසේද?',
        ],
      };
    }

    if (lang === 'ta') {
      return {
        answer: `**கணினியை உள்ளமைத்தல் மற்றும் வடிவமைத்தல் — அத்தியாயம் 2**

### 1. திரை தெளிவுத்திறன் (Screen Resolution):
- கிடைமட்ட மற்றும் செங்குத்து பிக்சல்களின் எண்ணிக்கை (எ.கா: 1920 × 1080 Full HD).
- சரியான தெளிவுத்திறன் எழுத்துக்களையும் படங்களையும் மிகத் தெளிவாகக் காட்டும்.

### 2. மொழி விசைப்பலகை மற்றும் நேர வலயம்:
- இலங்கைக்கான நேர வலயம் **UTC+05:30** ஆகும்.
- **Windows Key + Spacebar** அழுத்துவதன் மூலம் ஆங்கிலம், தமிழ் (தமிழ் 99) மற்றும் சிங்கள விசைப்பலகைகளுக்கு மாறலாம்.

### 3. சேமிப்பக வடிவமைத்தல் (Drive Formatting):
- பென்டிரைவ் அல்லது வன்தட்டை Format செய்யும் போது புதிய கோப்பு அமைப்பு (NTFS, FAT32) உருவாகிறது.
- **எச்சரிக்கை:** Format செய்தால் அனைத்து தரவுகளும் அழியும், எனவே முன்கூட்டியே Backup எடுக்க வேண்டும்!`,
        sources,
        suggestedFollowUps: [
          'FAT32 மற்றும் NTFS வேறுபாடுகள் என்ன?',
          'Format செய்வதற்கு முன் Backup எடுப்பது ஏன் முக்கியம்?',
          'தமிழ் விசைப்பலகையை எவ்வாறு அமைப்பது?',
        ],
      };
    }

    return {
      answer: `**Configuring and Formatting a Computer — Grade 8 ICT (Chapter 2)**

Configuring your computer system optimizes productivity, ergonomic comfort, and hardware stability:

### 1. Display Resolution & Screen Personalization:
- **Screen Resolution:** Measures the total number of distinct pixels displayed horizontally and vertically (e.g. **1920 × 1080 Full HD** contains 2,073,600 individual pixels).
- Selecting the monitor's native resolution prevents image stretching and blurred fonts.
- Desktop wallpapers, screen savers, and font scaling can be adjusted under *Windows Settings $\rightarrow$ Personalization $\rightarrow$ Display*.

### 2. Sri Lankan Regional Language & Keyboard Setup:
- **Time Zone:** Set to **UTC+05:30** (Sri Lanka Standard Time - Colombo).
- **Unicode Keyboards:** Installing the Sinhala (Wijesekara) and Tamil (Tamil 99/Phonetic) input packages allows typing across web browsers and word processors.
- Shortcut: Press **Windows Key + Spacebar** to toggle between English, Sinhala, and Tamil input methods.

### 3. Storage Drive Formatting & Precautions:
- **Formatting:** Prepares a storage partition by creating a file system index table:
  - **NTFS:** Windows internal drives (supports files > 4GB and disk encryption).
  - **FAT32:** High compatibility for USB flash drives across school labs.
- **CRITICAL PRECAUTION:** Formatting completely erases all existing data! Always create a **Backup copy** on external cloud or physical storage before initiating a drive format.`,
      sources,
      suggestedFollowUps: [
        'What is the difference between FAT32 and NTFS file systems?',
        'Why must you always backup files before formatting a USB drive?',
        'How do I configure Sinhala and Tamil Unicode keyboards?',
        'Quiz me on Grade 8 Computer Configuration'
      ],
    };
  }

  private handleWordProcessing(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-ict-gr8-ict-gr8-en',
        source: 'Grade 8 ICT Textbook — Chapter 3: Word Processing (Educational Publications Department Sri Lanka)',
        fileType: 'PDF',
        pageNumber: 35,
        chunkNumber: 74,
        distance: 0.13,
        excerpt: null,
      }
    ];

    return {
      answer: `**Word Processing — Grade 8 ICT (Chapter 3)**

Word processing software (such as LibreOffice Writer or Microsoft Word) is used to create and format professional documents.

### Key Formatting Principles:
1. **Font Typography:** Font family, font size, bold (Ctrl+B), italic (Ctrl+I), and underline (Ctrl+U).
2. **Four Paragraph Alignments:**
   - **Align Left:** Standard alignment for English letters and notes.
   - **Center:** Headings, certificates, and poem verses.
   - **Align Right:** Signatures, dates, and reference numbers.
   - **Justify (Ctrl+J):** Aligns text evenly against **both left and right margins** simultaneously by adjusting word spacing, standard in official ministry textbooks and newspapers!
3. **Tables & Page Setup:**
   - Tables are composed of Rows, Columns, and Cells.
   - **Page Orientation:** Portrait (vertical) for standard essays vs **Landscape** (horizontal) for wide school timetables and mark sheets.`,
      sources,
      suggestedFollowUps: [
        'When should I use Justify paragraph alignment?',
        'What is the difference between Portrait and Landscape orientation?',
        'How do I insert and format a table in Word?'
      ],
    };
  }

  private handleProgramming(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-ict-gr8-ict-gr8-en',
        source: 'Grade 8 ICT Textbook — Chapter 4: Programming (Educational Publications Department Sri Lanka)',
        fileType: 'PDF',
        pageNumber: 44,
        chunkNumber: 96,
        distance: 0.12,
        excerpt: null,
      }
    ];

    return {
      answer: `**Programming with Scratch — Grade 8 ICT (Chapter 4)**

Scratch is a visual block-based programming environment developed by MIT that teaches algorithmic thinking without syntax errors:

### Core Scratch Components:
1. **Stage:** The background area where the interactive project runs ($480\times360$ pixels).
2. **Sprites:** The characters or objects that execute instructions (e.g. the Scratch Cat).
3. **Variables:** Named storage containers that hold dynamic values (e.g. \`Score\`, \`Timer\`, \`Lives\`).

### Control Structures:
- **Selection (If-Then / If-Then-Else):** Executes actions only when a condition is met (e.g. *If touching Edge, bounce*).
- **Iteration (Repeat / Forever):** Repeats a set of blocks multiple times without copying code:
  - \`repeat (4) [move 100 steps, turn 90 degrees]\` draws a perfect square on the stage!`,
      sources,
      suggestedFollowUps: [
        'How do variables work in Scratch games?',
        'How to draw a square using Repeat (4) loop',
        'What is the difference between If-Then and If-Then-Else?'
      ],
    };
  }

  private handlePhysicalComputing(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-ict-gr8-ict-gr8-en',
        source: 'Grade 8 ICT Textbook — Chapter 5: Physical Computing (Educational Publications Department Sri Lanka)',
        fileType: 'PDF',
        pageNumber: 57,
        chunkNumber: 128,
        distance: 0.14,
        excerpt: null,
      }
    ];

    return {
      answer: `**Physical Computing — Grade 8 ICT (Chapter 5)**

Physical computing involves building interactive systems that sense and respond to the real physical world using programmable microcontrollers:

### 1. Microcontrollers (BBC micro:bit & Arduino):
- Unlike general-purpose PCs, microcontrollers are compact single-chip computers dedicated to controlling physical hardware.
- The BBC micro:bit has built-in buttons A/B, a 5×5 LED matrix display, and accelerometer tilt sensors.

### 2. Sensors (Inputs) vs Actuators (Outputs):
- **Sensors (Inputs):** Detect environmental phenomena:
  - Light Dependent Resistor (LDR) measures ambient illumination.
  - Temperature sensor probes measure warmth.
  - Push button switches detect mechanical press.
- **Actuators (Outputs):** Perform physical work or produce signals:
  - 5×5 LED matrix displays numbers or status smileys.
  - Piezo buzzers emit audible alert beeps.
  - DC motors and servos rotate wheels and gates.`,
      sources,
      suggestedFollowUps: [
        'What is the difference between a sensor and an actuator?',
        'How does an LDR light sensor work in smart street lamps?',
        'Explain the Sense-Think-Act loop in physical computing'
      ],
    };
  }

  private handleInternet(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-ict-gr8-ict-gr8-en',
        source: 'Grade 8 ICT Textbook — Chapter 6: Internet (Educational Publications Department Sri Lanka)',
        fileType: 'PDF',
        pageNumber: 65,
        chunkNumber: 154,
        distance: 0.12,
        excerpt: null,
      }
    ];

    return {
      answer: `**Internet & Digital Communication — Grade 8 ICT (Chapter 6)**

### 1. Uniform Resource Locator (URL) Anatomy:
In \`https://www.moe.gov.lk/textbooks.pdf\`:
- **Protocol (\`https://\`):** Secure encrypted communication protocol.
- **Domain Name (\`moe.gov\`):** Ministry of Education government portal.
- **Country Code (\`.lk\`):** Sri Lanka top-level country domain.
- **Path (\`/textbooks.pdf\`):** Specific file location on the server.

### 2. Email Communication & Privacy:
- **To:** Primary recipient expected to take action.
- **Cc (Carbon Copy):** Secondary recipients kept informed transparently.
- **Bcc (Blind Carbon Copy):** Addresses are **hidden** from all other recipients. Always use Bcc when emailing large groups of parents or students to protect their personal privacy!

### 3. Cyber Safety:
- Never share passwords or OTP codes.
- Beware of phishing emails asking for login credentials.
- Look for the padlock icon (HTTPS) before entering credentials on websites.`,
      sources,
      suggestedFollowUps: [
        'Why should you use Bcc when emailing school groups?',
        'What does the .lk domain indicate?',
        'How to recognize phishing scam emails'
      ],
    };
  }

  private handleHistory(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-history-gr10-histoy-g-10-e',
        source: 'Grade 10 History Textbook — National Institute of Education & Educational Publications Department Sri Lanka',
        fileType: 'PDF',
        pageNumber: 12,
        chunkNumber: 38,
        distance: 0.15,
        excerpt: null,
      }
    ];

    return {
      answer: `**Sri Lankan History — Grade 10 National Curriculum**

### 1. Historical & Archaeological Sources:
- **Literary Sources:** Indigenous chronicles (Deepavamsa, Mahavamsa by Ven. Mahanama, Pujavaliya) and foreign travelogues (Faxian, Ibn Battuta, Robert Knox).
- **Epigraphy:** Cave Brahmi inscriptions, pillar inscriptions (Badulla pillar), and slab inscriptions (Polonnaruwa).
- **Numismatics:** Ancient coins (Kahavanu, punch-marked coins) establishing trade relations with Rome, China, and India.

### 2. Polonnaruwa Era & Parakrama Samudraya:
- King Parakramabahu the Great (1153–1186 CE) declared: *"Not even a single drop of rain water must flow into the ocean without being of use to mankind."*
- Constructed the massive **Parakrama Samudraya**, unifying Topa Wewa, Dambulu Wewa, and Eramudu Wewa.

### 3. Colonial Era & Kandyan Resistance:
- Portuguese arrival (1505) and Dutch conquest (1658) controlled maritime coastal regions.
- The independent Kingdom of Kandy defeated Portuguese invasions at the **Battle of Danture (1594)** and **Battle of Gannoruwa (1638)**.`,
      sources,
      suggestedFollowUps: [
        'What were the archaeological sources used to reconstruct Sri Lankan history?',
        'How did King Parakramabahu I develop agriculture in Polonnaruwa?',
        'Significance of the Battle of Danture in 1594'
      ],
    };
  }

  private handleDefault(question: string, lang: 'en' | 'si' | 'ta', context: LearningContext): RAGResponse {
    const gradeDisplay = context.grade.replace('-', ' ').toUpperCase();
    const isIct = context.subjectId === 'ict';
    const isScience = context.subjectId === 'science';
    const isHistory = context.subjectId === 'history';
    const isMaths = context.subjectId === 'maths';

    if (isIct) {
      if (lang === 'si') {
        return {
          answer: `ඔබගේ විමසීම: **"${question}"**

ස්තූතියි! ඔබගේ **${gradeDisplay} තොරතුරු හා සන්නිවේදන තාක්ෂණය (ICT)** නිල විෂය නිර්දේශයේ පරිච්ඡේද 6 ඔස්සේ අපට ඕනෑම සංකල්පයක් සාකච්ඡා කළ හැක:
1. **1 වන පරිච්ඡේදය: සංඛ්‍යා පද්ධති** (ද්විමය හා දශමය, 2 හි බල, විදුලි ස්විචය)
2. **2 වන පරිච්ඡේදය: පරිගණකයක් වින්‍යාසගත කිරීම හා Format කිරීම** (තිර විභේදනය, සිංහල/දෙමළ යතුරුපුවරු)
3. **3 වන පරිච්ඡේදය: වදන් සැකසුම** (අකුරු හැඩසවි, Justify සමපාත කිරීම, වගු)
4. **4 වන පරිච්ඡේදය: ක්‍රමලේඛනය** (Scratch දෘශ්‍ය කේත, විචල්‍යයන්, Loops)
5. **5 වන පරිච්ඡේදය: භෞතික පරිගණනය** (micro:bit / Arduino, සංවේදක හා ක්‍රියාකරවන)
6. **6 වන පරිච්ඡේදය: අන්තර්ජාලය** (URL ව්‍යුහය, විද්‍යුත් තැපෑල To/Cc/Bcc, සයිබර් ආරක්ෂාව)`,
          sources: [],
          suggestedFollowUps: [
            'සංඛ්‍යා පද්ධති: දශමය-ද්විමය පරිවර්තනය',
            'පරිගණක වින්‍යාසය: තිර විභේදනය සහ යතුරුපුවරු',
            'Scratch ක්‍රමලේඛනය: විචල්‍යයන් සහ Loops',
            'භෞතික පරිගණනය: සංවේදක සහ ක්‍රියාකරවන'
          ],
        };
      }
      return {
        answer: `Regarding your inquiry: **"${question}"**

I am ready to guide you across your official **${gradeDisplay} ICT** national curriculum textbook:
- **Chapter 1: Number Systems** (Binary & Decimal, Powers of 2, Electric switch logic)
- **Chapter 2: Configuring & Formatting a Computer** (Screen resolution, Sinhala/Tamil keyboards, NTFS/FAT32 formatting)
- **Chapter 3: Word Processing** (Typography, Justify alignment, Tables, Landscape/Portrait)
- **Chapter 4: Programming** (Scratch visual block coding, Variables, If-Then, Loops)
- **Chapter 5: Physical Computing** (BBC micro:bit, Arduino, Sensors vs Actuators)
- **Chapter 6: Internet** (URL anatomy, Email To/Cc/Bcc, Cyber safety)

Which ICT topic would you like to explore together?`,
        sources: [],
        suggestedFollowUps: [
          'Number Systems: Decimal to Binary conversion',
          'Configuring Computer: Display Resolution & Keyboards',
          'Programming: Scratch Variables & Repeat Loops',
          'Physical Computing: Sensors vs Actuators'
        ],
      };
    }

    if (isScience) {
      return {
        answer: `Regarding your inquiry: **"${question}"**\n\nLet us explore your **${gradeDisplay} Science** syllabus, such as Plant Physiology, Photosynthesis, or Human Respiration.`,
        sources: [],
        suggestedFollowUps: [
          'Science: Photosynthesis Process',
          'Science: Leaf Stomata & Chloroplasts',
          'Science: Plant Starch Testing'
        ]
      };
    }

    if (isHistory) {
      return {
        answer: `Regarding your inquiry: **"${question}"**\n\nLet us explore your **${gradeDisplay} History** syllabus, such as Ancient Hydraulic Civilization, Epigraphical Inscriptions, or the Polonnaruwa Era.`,
        sources: [],
        suggestedFollowUps: [
          'History: Ancient Hydraulic Civilization',
          'History: Parakrama Samudraya & King Parakramabahu',
          'History: Inscriptions & Archaeological Sources'
        ]
      };
    }

    return {
      answer: `Regarding your inquiry: **"${question}"**\n\nI am your ATLAS Tutor for **${gradeDisplay}**. You can explore topics in Mathematics, Science, History, or ICT grounded directly in your official Sri Lankan textbooks.`,
      sources: [],
      suggestedFollowUps: [
        'ICT: Number Systems & Binary',
        'Science: Photosynthesis',
        'Maths: Pythagoras Theorem',
        'History: Hydraulic Civilization'
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
