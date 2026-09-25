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

    if (lowerQ.includes('clarify') || lowerQ.includes('break this down') || lowerQ.includes('more detail') || lowerQ.includes('තවදුරටත්') || lowerQ.includes('விளக்குங்கள்')) {
      return this.handleClarifyExplanation(lang, context);
    }

    if (lowerQ.includes('again') || lowerQ.includes('නැවත') || lowerQ.includes('மீண்டும்')) {
      return this.handleRepeatExplanation(lang);
    }

    if (lowerQ.includes('easier') || lowerQ.includes('simpler') || lowerQ.includes('සරල') || lowerQ.includes('எளிதாக')) {
      return this.handleSimplerExplanation(lang, context);
    }

    if (lowerQ.includes('example') || lowerQ.includes('උදාහරණ') || lowerQ.includes('உதாரணம்')) {
      return this.handleExample(lang, context);
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

    private handleClarifyExplanation(lang: 'en' | 'si' | 'ta', context: LearningContext): RAGResponse {
    const isIct = context.subjectId === 'ict';
    const isHistory = context.subjectId === 'history';

    if (isIct) {
      const en = `### Detailed Step-by-Step Breakdown: Number Systems & Binary Logic

Let's examine how electrical circuits calculate numbers step by step:

1. **Step 1: The Transistor as an On/Off Valve**
   Inside your computer's CPU, billions of microscopic transistors act just like a home wall switch. When $+3.3\\text{V}$ electrical current flows through, the circuit closes ($1$). When voltage is cut ($0\\text{V}$), the circuit opens ($0$).

2. **Step 2: Positional Powers of 2**
   Why powers of 2? Because there are only 2 states ($0$ and $1$):
   - First column on the right: $2^0 = 1$
   - Second column: $2^1 = 2$
   - Third column: $2^2 = 4$
   - Fourth column: $2^3 = 8$
   Each position to the left is worth exactly **double** the one before it!

3. **Step 3: Calculating Decimal from Binary (e.g. $1011_2$)**
   - Position 3 ($2^3 = 8$): bit is 1 $\\to 8$
   - Position 2 ($2^2 = 4$): bit is 0 $\\to 0$
   - Position 1 ($2^1 = 2$): bit is 1 $\\to 2$
   - Position 0 ($2^0 = 1$): bit is 1 $\\to 1$
   - Total Sum: $8 + 0 + 2 + 1 = \\mathbf{11_{10}}$.

Would you like to try converting another decimal number or test it in the interactive 8-bit switchboard?`;

      return {
        answer: en,
        sources: [
          {
            source: 'Grade 8 ICT Textbook — Deep Dive into Positional Weights',
            pageNumber: 5,
            distance: 0.10,
          }
        ],
        suggestedFollowUps: [
          'Explain simpler: Can you explain binary in simpler terms for a beginner?',
          'Sri Lankan Example: How is this used in smartphones in Sri Lanka?',
          'Memory trick: Give me a rhyme to remember powers of 2',
          'Quiz me on binary conversion'
        ],
      };
    }

    if (isHistory) {
      return {
        answer: `### Step-by-Step Breakdown: Ancient Hydraulic Engineering

1. **Catchment Basin:** Rain falling in the central highlands was caught by trans-basin earthen bunds.
2. **Bisokotuwa Water Gate:** Water entered an inner stone chamber (Biso-Kotuwa). Thick stone baffles absorbed the massive hydrostatic pressure of the deep water, slowing the rush to a safe trickle.
3. **Distribution Canal (Yoda Ela):** The water was released into long canals engineered with a gradient of less than 6 inches per mile, irrigating dry-zone paddy fields across hundreds of villages!`,
        sources: [
          {
            source: 'Grade 10 History Textbook — Ancient Engineering Innovations',
            pageNumber: 25,
            distance: 0.12,
          }
        ],
        suggestedFollowUps: [
          'Explain simpler: How does the Bisokotuwa work like a bathroom tap?',
          'Sri Lankan Example: The engineering of Jaya Ganga',
          'Memory trick: Parakramabahu\'s famous motto',
          'Quiz me on ancient hydraulics'
        ],
      };
    }

    return {
      answer: `### Step-by-Step Clarification: Photosynthesis Chemistry

1. **Light Reaction (Granum):** Sunlight hits chlorophyll in the leaf. Water ($H_2O$) is split into Hydrogen and Oxygen ($O_2$). Oxygen diffuses out into the air.
2. **Dark Reaction / Calvin Cycle (Stroma):** Carbon Dioxide ($CO_2$) combines with Hydrogen to build Glucose ($C_6H_{12}O_6$).
3. **Storage:** The plant links glucose molecules into insoluble starch, stored in roots, tubers, and fruits!`,
      sources: [
        {
          source: 'Grade 8 Science — Photosynthesis In-Depth Mechanism',
          pageNumber: 44,
          distance: 0.11,
        }
      ],
      suggestedFollowUps: [
        'Explain simpler: What goes in and what comes out?',
        'Sri Lankan Example: Why do king coconuts have sweet water?',
        'Memory trick: Photosynthesis equation rhyme',
        'Quiz me on photosynthesis'
      ]
    };
  }

  private handleSimplerExplanation(lang: 'en' | 'si' | 'ta', context?: LearningContext): RAGResponse {
    const isIct = context?.subjectId === 'ict';
    const isHistory = context?.subjectId === 'history';

    if (isIct) {
      const en = `### Super Simple Version: Binary & Bits

Think of your bedroom ceiling light switch:
- **Switch down (OFF):** No electricity flows. That is a **0**!
- **Switch up (ON):** Electricity flows and lights up the bulb. That is a **1**!

Because computer chips have billions of microscopic switches, they count only using **0** and **1**:
- One switch = **1 Bit** (a tiny piece of information).
- A group of 8 switches = **1 Byte** (enough to store 1 English letter, like 'A').

When you type 'A', the keyboard simply sets 8 switches to: \`01000001\`! That's all there is to it!`;
      return {
        answer: en,
        sources: [{ source: 'Grade 8 ICT Basics', pageNumber: 2 }],
        suggestedFollowUps: [
          'Clarify more: How do 8 bits add up to numbers?',
          'Sri Lankan Example: Why does a USB drive say 32GB or 64GB?',
          'Memory trick: Catchy rhyme for bits and bytes',
          'Quiz me on bits and bytes'
        ]
      };
    }

    if (isHistory) {
      return {
        answer: `### Super Simple Version: The Bisokotuwa Sluice Gate

Imagine blowing water through a straw with full force: it blasts out wildly. But if you blow into a cup with tiny holes first, the water flows out smoothly without splashing.

Ancient Sinhala kings built stone chambers inside reservoirs called **Bisokotuwa**. It trapped the wild, roaring water pressure so it wouldn't smash the mud dam, letting smooth water flow safely to the farmers!`,
        sources: [{ source: 'Grade 10 History Basics', pageNumber: 15 }],
        suggestedFollowUps: [
          'Clarify more: The technical design of Bisokotuwa',
          'Sri Lankan Example: Reservoirs in Anuradhapura',
          'Memory trick for King Parakramabahu',
          'Quiz me on history'
        ]
      };
    }

    return {
      answer: `Super simple version:
- **What goes in:** Sunlight ☀️ + Water 💧 + Air ($CO_2$) 💨
- **What comes out:** Plant Food (Glucose) 🍯 + Clean Oxygen ($O_2$) 🍃

Without this simple plant magic, living creatures wouldn't have oxygen to breathe!`,
      sources: [{ source: 'Grade 8 Science — Foundation Concepts', pageNumber: 42 }],
      suggestedFollowUps: [
        'Clarify more: Step-by-step chemical reaction',
        'Sri Lankan Example: King Coconut tree',
        'Memory trick for photosynthesis',
        'Quiz me on science'
      ]
    };
  }

  private handleExample(lang: 'en' | 'si' | 'ta', context?: LearningContext): RAGResponse {
    const isIct = context?.subjectId === 'ict';
    const isHistory = context?.subjectId === 'history';

    if (isIct) {
      return {
        answer: `**A Real-World Sri Lankan Example of ICT & Binary:**

Next time you visit a computer shop at **Majestic City** or **Unity Plaza** in Colombo, look at the memory cards and pen drives for sale:
- **16 GB**, **32 GB**, **64 GB**, **128 GB**, **256 GB**!

Have you ever wondered why there is no 20 GB or 50 GB pen drive? 
Because computer memory is physically wired in **Powers of 2**:
- $2^4 = 16$
- $2^5 = 32$
- $2^6 = 64$
- $2^7 = 128$

Every single memory device sold across Sri Lanka follows the exact binary place values taught in Grade 8 ICT Chapter 1!`,
        sources: [{ source: 'Grade 8 ICT — Real World Digital Storage', pageNumber: 8 }],
        suggestedFollowUps: [
          'Clarify more: Why does binary double every step?',
          'Explain simpler: Bits vs Bytes in plain English',
          'Memory trick: Rhyme for powers of 2',
          'Quiz me on ICT examples'
        ]
      };
    }

    return {
      answer: `**A Real-World Sri Lankan Example:**
Think of a King Coconut (Thambili) tree in your garden. The tall fronds spread wide to catch equatorial sunshine. 
Through photosynthesis, the palm creates glucose and electrolytes, which it pumps into the young king coconuts. The sweet, refreshing water you drink on a hot afternoon was synthesized by the leaves using sunlight!`,
      sources: [{ source: 'Grade 8 Science Textbook — Plant Physiology in Tropical Ecosystems', pageNumber: 45 }],
      suggestedFollowUps: [
        'Clarify more: How do roots pump water upward?',
        'Explain simpler: Photosynthesis basics',
        'Memory trick for plant nutrition',
        'Quiz me on photosynthesis'
      ]
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

    const enAnswer = `**Number Systems — Grade 8 ICT (Chapter 1)**

Modern digital computers operate using the **Binary Number System (Base 2)** consisting of only two digits: **0** and **1**. While humans naturally use the **Decimal System (Base 10)** with digits 0 through 9, electronic computer hardware relies on microscopic transistors acting as physical electrical switches:
- **State 0 (OFF):** Low voltage ($0\\text{V}$), electric switch open / circuit disconnected.
- **State 1 (ON):** High voltage ($+3.3\\text{V}$ or $+5\\text{V}$), electric switch closed / circuit connected.

### Positional Weights (Powers of 2 from Right to Left):
$2^7(128) \\quad 2^6(64) \\quad 2^5(32) \\quad 2^4(16) \\quad 2^3(8) \\quad 2^2(4) \\quad 2^1(2) \\quad 2^0(1)$

### Example: Converting Decimal 13 to Binary
Using successive division by 2:
1. $13 \\div 2 = 6$ (Remainder **1**)
2. $6 \\div 2 = 3$ (Remainder **0**)
3. $3 \\div 2 = 1$ (Remainder **1**)
4. $1 \\div 2 = 0$ (Remainder **1**)

Reading remainders from bottom to top (MSB to LSB) yields: **$13_{10} = 1101_2$** ($8 + 4 + 0 + 1 = 13$).`;

    const siAnswer = `**සංඛ්‍යා පද්ධති (Number Systems) — 1 වන පරිච්ඡේදය**

ඩිජිටල් පරිගණක ක්‍රියාත්මක වන්නේ **ද්විමය (Binary / පාදය 2)** සංඛ්‍යා පද්ධතියෙනි. මිනිසුන් වන අප සාමාන්‍යයෙන් 0 සිට 9 දක්වා සංකේත 10ක් සහිත **දශමය (Decimal / පාදය 10)** පද්ධතිය භාවිත කළද, පරිගණක ඉලෙක්ට්‍රොනික පරිපථ (ට්‍රාන්සිස්ටර) පහසුවෙන් පාලනය කළ හැකි තත්ත්ව දෙකක් පමණක් හඳුනාගනී:
- **0 (OFF):** අඩු වෝල්ටීයතාවය (0V) / විදුලි ස්විචය විසන්ධි තත්ත්වය.
- **1 (ON):** ඉහළ වෝල්ටීයතාවය (+3.3V හෝ +5V) / විදුලි ස්විචය සක්‍රිය තත්ත්වය.

### 2 හි බල සහ ස්ථානීය අගයන් (දකුණේ සිට වමට):
$2^7(128) \\quad 2^6(64) \\quad 2^5(32) \\quad 2^4(16) \\quad 2^3(8) \\quad 2^2(4) \\quad 2^1(2) \\quad 2^0(1)$

### දශමය 13 ද්විමය බවට පත්කිරීම (Successive Division by 2):
- $13 \\div 2 = 6$ (ඉතිරිය **1**)
- $6 \\div 2 = 3$ (ඉතිරිය **0**)
- $3 \\div 2 = 1$ (ඉතිරිය **1**)
- $1 \\div 2 = 0$ (ඉතිරිය **1**)
පහළ සිට ඉහළට කියවූ විට: **$13_{10} = 1101_2$** ($8 + 4 + 0 + 1 = 13$).`;

    const taAnswer = `**எண் முறைகள் (Number Systems) — அத்தியாயம் 1**

கணினிகள் **இரும (Binary / அடி 2)** எண் முறையில் இயங்குகின்றன. மனிதர்கள் 0 முதல் 9 வரையிலான 10 இலக்கங்களைக் கொண்ட **தசம (Decimal / அடி 10)** முறையைப் பயன்படுத்துகின்றனர். கணினியின் டிரான்சிஸ்டர்கள் இரு மின் நிலைகளை மட்டுமே உணர்கின்றன:
- **0 (OFF):** குறைந்த மின்னழுத்தம் (0V) / மின் சுவிட்ச் அணைக்கப்பட்டது.
- **1 (ON):** உயர் மின்னழுத்தம் (+3.3V / +5V) / மின் சுவிட்ச் இயக்கப்பட்டது.

### 2 இன் அடுக்குகள் (வலமிருந்து இடமாக):
$2^7(128) \\quad 2^6(64) \\quad 2^5(32) \\quad 2^4(16) \\quad 2^3(8) \\quad 2^2(4) \\quad 2^1(2) \\quad 2^0(1)$

### தசம எண் 13 ஐ இருமமாக மாற்றுதல்:
- $13 \\div 2 = 6$ (மீதி **1**)
- $6 \\div 2 = 3$ (மீதி **0**)
- $3 \\div 2 = 1$ (மீதி **1**)
- $1 \\div 2 = 0$ (மீதி **1**)
கீழிருந்து மேலாக: **$13_{10} = 1101_2$** ($8 + 4 + 0 + 1 = 13$).`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Binary (Base 2: 0 and 1)',
        'Decimal (Base 10: 0 to 9)',
        'State 0 (OFF: 0V)',
        'State 1 (ON: +3.3V)',
        'Powers of 2 (1, 2, 4, 8, 16, 32, 64, 128)',
        'Successive Division by 2'
      ],
      memoryTrick: {
        concept: 'Powers of 2 & Binary Place Values',
        trick: 'Double trouble from Right to Left! Start at 1, then double each step: 1, 2, 4, 8, 16, 32, 64, 128!',
        rhyme: 'Start at ONE on the far Right,\nDouble each step with all your might!\n1, 2, 4, 8, sixteen more,\n32, 64, 128 in store!',
        audioText: 'Here is your memory trick for binary numbers! Start at one on the far right, and double every step: 1, 2, 4, 8, 16, 32, 64, and 128! Every bit to the left is twice as big!'
      },
      suggestedFollowUps: [
        'Clarify more: Can you break this down step-by-step with more details?',
        'Explain simpler: Can you explain binary in simpler terms for a beginner?',
        'Sri Lankan Example: Give a real-world Sri Lankan application',
        'How do I convert decimal 25 to binary?',
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

    const enAnswer = `**Configuring and Formatting a Computer — Grade 8 ICT (Chapter 2)**

Setting up your desktop environment, regional languages, and storage volumes correctly ensures your workstation runs smoothly:

### 1. Screen Resolution:
- Measured as **Horizontal Pixels × Vertical Pixels**.
- Standard Full HD: **1920 × 1080 Pixels** ($2,073,600$ dots of light).
- Matching your monitor's native aspect ratio (typically 16:9) prevents stretching or blurriness.

### 2. Regional Language Keyboard Setup:
- **Wijesekara Layout:** Standard Sri Lankan government keyboard layout.
- **Phonetic (Singlish/Tamil):** Typing sounds (e.g., 'k'+'a' produces 'ක', 'k'+'i' produces 'කි').
- Configured via Windows Settings $\\to$ Time & Language $\\to$ Preferred Languages.

### 3. Storage Drive Formatting:
- **FAT32:** Compatible across Windows, Mac, and Linux, but max file size is $4\\text{GB}$.
- **NTFS:** Default for modern Windows, supports large files and file encryption security.
- *Caution:* Formatting creates a new File Allocation Table and deletes all existing files!`;

    const siAnswer = `**පරිගණකයක් වින්‍යාසගත කිරීම සහ හැඩසවි ගැන්වීම — 2 වන පරිච්ඡේදය**

පරිගණකයක් කාර්යක්ෂමව භාවිත කිරීමට ඩෙස්ක්ටොප් පරිසරය, භාෂා සහ ආචයන තැටි නිවැරදිව සකසා ගැනීම අත්‍යවශ්‍ය වේ:

### 1. තිර විභේදනය (Screen Resolution):
- තිරයේ තිරස්ව සහ සිරස්ව ඇති පික්සෙල් (Pixels) සංඛ්‍යාව මනිනු ලබයි.
- සම්මත Full HD විභේදනය: **1920 × 1080 Pixels** (පික්සෙල් 2,073,600).
- විභේදනය නිවැරදිව සැකසූ විට අකුරු සහ රූප පැහැදිලිව දර්ශනය වේ.

### 2. ප්‍රාදේශීය භාෂා යතුරුපුවරු සකස් කිරීම:
- **විජේසේකර යතුරුපුවරුව:** ශ්‍රී ලංකා ප්‍රමිති කාර්යාංශය විසින් අනුමත නිල සිංහල යතුරුපුවරු සැකසුමයි.
- **ශබ්දානුකූල (Phonetic / Singlish):** උච්චාරණය අනුව ටයිප් කිරීම (උදා: 'k'+'a' $\\to$ 'ක').

### 3. ආචයන තැටි හැඩසවි ගැන්වීම (Drive Formatting):
- **FAT32:** සියලුම මෙහෙයුම් පද්ධති වලට ගැළපෙන නමුත් 4GB ට වඩා විශාල තනි ගොනු ගබඩා කළ නොහැක.
- **NTFS:** නවීන Windows සඳහා සම්මත ගොනු පද්ධතියයි (විශාල ගොනු සහ ආරක්ෂණ පහසුකම් ඇත).
- *අවවාදයයි:* Format කිරීමේදී තැටියේ ඇති සියලුම දත්ත මැකී යයි!`;

    const taAnswer = `**கணினியை உள்ளமைத்தல் மற்றும் வடிவமைத்தல் — அத்தியாயம் 2**

### 1. திரை தெளிவுத்திறன் (Screen Resolution):
- கிடைமட்ட மற்றும் செங்குத்து பிக்சல்களின் எண்ணிக்கை (**1920 × 1080** Full HD).

### 2. பிராந்திய மொழி விசைப்பலகை அமைப்புகள்:
- **விஜேசேகர விசைப்பலகை** மற்றும் **ஒலியியல் (Phonetic)** விசைப்பலகை அமைப்புகள்.

### 3. சேமிப்பக வடிவமைத்தல் (Drive Formatting):
- **FAT32 vs NTFS:** FAT32 அதிகபட்சம் 4GB கோப்புகளை ஆதரிக்கிறது; NTFS பெரிய கோப்புகளை ஆதரிக்கிறது.
- நினைவில் கொள்க: வடிவமைத்தல் (Formatting) செய்யும் போது கோப்புகள் அனைத்தும் அழிக்கப்படும்!`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Screen Resolution (1920 × 1080 Full HD)',
        'Aspect Ratio (16:9 widescreen)',
        'Wijesekara Keyboard Layout',
        'Unicode Font Rendering',
        'Drive Formatting (NTFS vs FAT32)'
      ],
      memoryTrick: {
        concept: 'Screen Resolution & Drive Formats',
        trick: 'Pixels = Width × Height! NTFS for Big Files, FAT32 for Universal Sharing!',
        rhyme: 'Pixels across and pixels down,\nCrisp Full HD all over town!\nNineteen-twenty by ten-eighty wide,\nFormat with care and backup inside!',
        audioText: 'Here is your memory trick for screen resolution and drive formatting! Resolution is width times height in dots! Remember, NTFS handles big files over four gigabytes, while FAT32 works everywhere! Always backup before formatting!'
      },
      suggestedFollowUps: [
        'Clarify more: Can you break this down step-by-step with more details?',
        'Explain simpler: Can you explain screen resolution in simple terms?',
        'Sri Lankan Example: How to type Sinhala and Tamil in school labs?',
        'What is the difference between FAT32 and NTFS?',
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
        chunkNumber: 82,
        distance: 0.13,
        excerpt: null,
      }
    ];

    const enAnswer = `**Word Processing — Grade 8 ICT (Chapter 3)**

Word processing software allows creating, editing, formatting, and printing standardized electronic documents:

### 1. Text Formatting & Alignment:
- **Left Align (Ctrl+L):** Standard for informal English reading left-to-right.
- **Center Align (Ctrl+E):** Used for titles, certificates, and poem stanzas.
- **Right Align (Ctrl+R):** Used for date lines and sender addresses.
- **Justify (Ctrl+J):** Aligns text evenly along **both** left and right margins with uniform spacing. Used in official textbooks and newspapers!

### 2. Document Setup:
- **Page Orientation:** Portrait (vertical) vs Landscape (horizontal).
- **Margins:** Top, Bottom, Left, and Right whitespace borders.
- **Headers & Footers:** Automatic page numbering, document titles, or dates displayed consistently across all pages.`;

    const siAnswer = `**වදන් සැකසුම (Word Processing) — 3 වන පරිච්ඡේදය**

### 1. ඡේද පෙළගැස්වීම් (Paragraph Alignments):
- **වමට පෙළගැස්වීම (Ctrl+L):** සාමාන්‍ය ලේඛන සඳහා.
- **මධ්‍යගත කිරීම (Ctrl+E):** ප්‍රධාන මාතෘකා සහ සහතිකපත් සඳහා.
- **දකුණට පෙළගැස්වීම (Ctrl+R):** ලිපින සහ දිනයන් සඳහා.
- **සමපාත කිරීම (Justify - Ctrl+J):** වම් සහ දකුණු දෙපසම පිළිවෙළට සමානව තැබීම. පුවත්පත් සහ පෙළපොත් වල භාවිත වේ!

### 2. පිටු සැකසුම (Page Setup):
- **දිශානතිය (Orientation):** සිරස් (Portrait) සහ තිරස් (Landscape).
- **ශීර්ෂක සහ පාදක (Header & Footer):** සෑම පිටුවකම ඉහළ සහ පහළින් පිටු අංක හෝ මාතෘකා යෙදීම.`;

    const taAnswer = `**சொல் செயலாக்கம் (Word Processing) — அத்தியாயம் 3**

### 1. உரை சீரமைப்பு (Text Alignment):
- **இடது சீரமைப்பு (Ctrl+L)**
- **மையச் சீரமைப்பு (Ctrl+E)**
- **வலது சீரமைப்பு (Ctrl+R)**
- **நேர்த்தி செய்தல் (Justify - Ctrl+J):** இருபுறமும் சீராக அமையச்செய்தல்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Justify Alignment (Ctrl+J)',
        'Portrait vs Landscape Orientation',
        'Header & Footer (Page numbers)',
        'Table Insertion & Formatting',
        'Font Typography & Styles'
      ],
      memoryTrick: {
        concept: 'Word Processing Shortcuts & Justify',
        trick: 'L=Left, R=Right, E=cEnter, and J=Justify for perfect textbook margins!',
        rhyme: 'Left, Center, Right, or Justify line,\nCtrl+J makes publications shine!\nPortrait stands tall, Landscape lies flat,\nHeaders on top keep page numbers pat!',
        audioText: 'Here is your memory trick for word processing! Remember: L is Left, R is Right, E is Center, and J is Justify! Ctrl plus J aligns both left and right margins straight like your school textbook!'
      },
      suggestedFollowUps: [
        'Clarify more: Can you break this down step-by-step with more details?',
        'Explain simpler: Why do books use Justify alignment?',
        'Sri Lankan Example: How to format an official school permission letter',
        'How to insert and customize tables in Word',
      ],
    };
  }

  private handleProgramming(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-ict-gr8-ict-gr8-en',
        source: 'Grade 8 ICT Textbook — Chapter 4: Programming (Educational Publications Department Sri Lanka)',
        fileType: 'PDF',
        pageNumber: 62,
        chunkNumber: 110,
        distance: 0.10,
        excerpt: null,
      }
    ];

    const enAnswer = `**Visual Programming with Scratch — Grade 8 ICT (Chapter 4)**

Scratch is a visual block-based programming environment developed by MIT to teach computational thinking:

### 1. Core Programming Concepts:
- **Sprites:** Characters or objects on the Stage that carry out code instructions.
- **Variables:** Named storage containers holding numbers, words, or scores that change during execution (e.g. \`score = score + 1\`).
- **Conditionals (If-Then-Else):** Make logical decisions based on a true/false condition (e.g. \`If touching edge, bounce\`).
- **Loops (Iteration):**
  - **Repeat (N):** Runs code a fixed number of times.
  - **Forever:** Continuous animation until stopped.
  - **Repeat Until:** Loops until a specific condition becomes true.`;

    const siAnswer = `**Scratch දෘශ්‍ය ක්‍රමලේඛනය — 4 වන පරිච්ඡේදය**

### 1. ප්‍රධාන ක්‍රමලේඛන සංකල්ප:
- **ස්ප්‍රයිට් (Sprites):** තිරය මත චලනය වන සහ විධාන ක්‍රියාත්මක කරන චරිත හෝ වස්තූන්.
- **විචල්‍යයන් (Variables):** ක්‍රමලේඛනය ක්‍රියාත්මක වන විට වෙනස් වන අගයන් ගබඩා කර තබා ගන්නා මතක බහාලුම් (උදා: \`ලකුණු = ලකුණු + 1\`).
- **තේරීම් (Conditionals: If-Then):** කොන්දේසියක් සත්‍ය නම් පමණක් විධාන ක්‍රියාත්මක කිරීම.
- **පුනරාවර්තන (Loops):**
  - **නියමිත වාර ගණනක් (Repeat N):** නිශ්චිත වට ගණනක් නැවත නැවත සිදු කිරීම.
  - **නිරන්තරයෙන් (Forever):** නවත්වන තුරුම අඛණ්ඩව ක්‍රියාත්මක වීම.`;

    const taAnswer = `**Scratch நிரலாக்கம் — அத்தியாயம் 4**

### 1. முக்கிய கருத்துக்கள்:
- **உருவங்கள் (Sprites)**
- **மாறிகள் (Variables):** மதிப்புகளைச் சேமிக்கும் கொள்கலன்கள்.
- **சுழற்சிகள் (Loops: Repeat, Forever, Repeat Until)**`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Sprites & Stage',
        'Variables (Data storage)',
        'Repeat Loops (Iteration)',
        'If-Then Conditionals',
        'Event Triggers (Green Flag)'
      ],
      memoryTrick: {
        concept: 'Scratch Loops & Variables',
        trick: 'Variables store what changes fast, Repeat loops save typing and make code last!',
        rhyme: 'Variables store what changes fast,\nRepeat loops make our programs last!\nCheck the condition, test the clue,\nIf it is true, execute through!',
        audioText: 'Here is your memory trick for Scratch programming! Variables store what changes fast, like your game score! Repeat loops save you from writing the same code again and again!'
      },
      suggestedFollowUps: [
        'Clarify more: Can you break this down step-by-step with more details?',
        'Explain simpler: How do loops make drawings in Scratch?',
        'Sri Lankan Example: How to build a traffic light simulator in Scratch',
        'Difference between Repeat and Repeat-Until loops',
      ],
    };
  }

  private handlePhysicalComputing(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-ict-gr8-ict-gr8-en',
        source: 'Grade 8 ICT Textbook — Chapter 5: Physical Computing (Educational Publications Department Sri Lanka)',
        fileType: 'PDF',
        pageNumber: 88,
        chunkNumber: 145,
        distance: 0.12,
        excerpt: null,
      }
    ];

    const enAnswer = `**Physical Computing & Microcontrollers — Grade 8 ICT (Chapter 5)**

Physical computing bridges digital code and physical reality using single-board microcontrollers like the **BBC micro:bit** or **Arduino**:

### 1. Sensors (Input Devices):
Detect physical environmental phenomena and convert them into electrical data:
- **LDR (Light Dependent Resistor):** Measures ambient light intensity.
- **Push Buttons (Button A / B):** Detect user touches and button presses.
- **Temperature Sensor:** Measures ambient classroom temperature.

### 2. Actuators (Output Devices):
Take computer electrical signals and produce physical effects:
- **5×5 LED Matrix Display:** Displays numbers, text, and heart icons.
- **Piezo Buzzer:** Generates sound waves and alert beeps.
- **Servo Motor:** Produces mechanical physical rotation.`;

    const siAnswer = `**භෞතික පරිගණනය සහ ක්ෂුද්‍ර පාලක — 5 වන පරිච්ඡේදය**

### 1. සංවේදක (Sensors / ආදාන උපාංග):
පරිසරයේ භෞතික වෙනස්කම් හඳුනාගෙන විද්‍යුත් සංඥා බවට පත්කරයි:
- **LDR (ආලෝක පරායත්ත ප්‍රතිරෝධකය):** ආලෝක තීව්‍රතාවය මනියි.
- **තල්ලු බොත්තම් (Button A / B):** පරිශීලක එබීම් හඳුනාගනී.

### 2. ක්‍රියාකරවන (Actuators / ප්‍රතිදාන උපාංග):
පරිගණක සංඥා මඟින් භෞතික ක්‍රියාවක් සිදුකරයි:
- **5×5 LED න්‍යාසය:** අකුරු, සංඛ්‍යා සහ රූප ප්‍රදර්ශනය කරයි.
- **Piezo Buzzer (නාදකය):** ශබ්ද සහ අනතුරු ඇඟවීමේ නාද නිකුත් කරයි.`;

    const taAnswer = `**பௌதீகக் கணினியியல் — அத்தியாயம் 5**

### 1. உணரிகள் (Sensors):
- **LDR:** ஒளிச்செறிவை உணரும் கருவி.
- **பொத்தான்கள் (Buttons)**

### 2. இயங்கிகள் (Actuators):
- **LED அணி (5x5 Matrix)**
- **ஒலிப்பான் (Buzzer)**`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Microcontrollers (micro:bit & Arduino)',
        'Sensors (Input: LDR, Temperature, Buttons)',
        'Actuators (Output: LEDs, Buzzer, Servo Motor)',
        'Analog vs Digital Signals'
      ],
      memoryTrick: {
        concept: 'Sensors vs Actuators',
        trick: 'Sensors SENSE in (Input), Actuators ACT out (Output)!',
        rhyme: 'Sensors listen, feel, and see,\nInputs telling what could be!\nActuators move, display, and ring,\nOutputs doing everything!',
        audioText: 'Here is your memory trick for physical computing! Remember: Sensors sense inward as Inputs, while Actuators act outward as Outputs! Like eyes versus hands!'
      },
      suggestedFollowUps: [
        'Clarify more: Can you break this down step-by-step with more details?',
        'Explain simpler: How does an automatic street light work with an LDR?',
        'Sri Lankan Example: Automated paddy storage alarm using micro:bit',
        'Difference between microcontrollers and personal computers',
      ],
    };
  }

  private handleInternet(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-ict-gr8-ict-gr8-en',
        source: 'Grade 8 ICT Textbook — Chapter 6: Internet (Educational Publications Department Sri Lanka)',
        fileType: 'PDF',
        pageNumber: 110,
        chunkNumber: 180,
        distance: 0.11,
        excerpt: null,
      }
    ];

    const enAnswer = `**Internet & Electronic Communication — Grade 8 ICT (Chapter 6)**

### 1. Anatomy of a URL (Uniform Resource Locator):
Example: \`https://www.moe.gov.lk/textbooks.pdf\`
- **Protocol (\`https://\`):** Secure encrypted hypertext transfer protocol.
- **Domain Name (\`moe.gov\`):** Registered server name (Ministry of Education).
- **Country Code TLD (\`.lk\`):** Official Sri Lanka top-level country code domain.
- **Path (\`/textbooks.pdf\`):** Specific resource file on the server.

### 2. Email Address Fields & Privacy:
- **To:** Primary recipients expected to respond.
- **Cc (Carbon Copy):** Secondary recipients kept informed transparently.
- **Bcc (Blind Carbon Copy):** Addresses are **hidden** from all recipients. Always use Bcc when emailing groups to protect student and parent personal privacy!

### 3. Cyber Safety:
- Never share passwords or two-factor OTPs.
- Verify HTTPS padlock before entering school credentials.`;

    const siAnswer = `**අන්තර්ජාලය සහ සන්නිවේදනය — 6 වන පරිච්ඡේදය**

### 1. URL එකක ව්‍යුහය:
උදා: \`https://www.moe.gov.lk/textbooks.pdf\`
- **ප්‍රොටෝකෝලය (\`https://\`):** ආරක්ෂිත දත්ත සම්ප්‍රේෂණය.
- **වසම් නාමය (\`moe.gov\`):** අදාළ ආයතනයේ නම.
- **රට සංකේතය (\`.lk\`):** ශ්‍රී ලංකාව සඳහා වන ඉහළ මට්ටමේ වසම.

### 2. විද්‍යුත් තැපෑල (Email) රහස්‍යතාව:
- **To:** ප්‍රධාන ලබන්නා.
- **Cc:** පිටපත් ලබන්නන් (සැමට පෙනේ).
- **Bcc:** රහස්‍ය පිටපත් ලබන්නන් (කිසිවෙකුට නොපෙනේ). පෞද්ගලිකත්වය රැකීමට Bcc භාවිත කරන්න!`;

    const taAnswer = `**இணையம் மற்றும் மின்னஞ்சல் — அத்தியாயம் 6**

### 1. URL அமைப்பியல்:
- **HTTPS:** பாதுகாப்பான நெறிமுறை.
- **.lk:** இலங்கைக்கான ஆள்களப் பெயர்.

### 2. மின்னஞ்சல் புலங்கள்:
- **To:** முதன்மை பெறுநர்.
- **Cc:** நகல் பெறுநர்.
- **Bcc:** மறைக்கப்பட்ட நகல் பெறுநர்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Protocol (HTTPS - Secure)',
        'Domain Name (.gov.lk)',
        'URL Path & Resources',
        'Email To vs Cc vs Bcc',
        'Cyber Safety & Privacy'
      ],
      memoryTrick: {
        concept: 'URL Anatomy & Email Bcc',
        trick: 'HTTPS is the lock, .lk is our rock! And Blind Carbon Copy (Bcc) hides email addresses for privacy!',
        rhyme: 'HTTPS keeps secrets safe,\nDot LK is our country\'s place!\nSend with Bcc to friends,\nTheir private email it defends!',
        audioText: 'Here is your memory trick for the Internet! HTTPS keeps your passwords safe with encryption! And always remember to use Bcc when sending emails to groups so nobody\'s email is exposed!'
      },
      suggestedFollowUps: [
        'Clarify more: Can you break this down step-by-step with more details?',
        'Explain simpler: Why does Bcc protect student privacy?',
        'Sri Lankan Example: How to identify authentic .gov.lk school portals',
        'Common phishing scam indicators',
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

    const enAnswer = `**Sri Lankan History — Grade 10 National Curriculum**

### 1. Historical & Archaeological Sources:
- **Literary Sources:** Indigenous chronicles (Deepavamsa, Mahavamsa by Ven. Mahanama, Pujavaliya) and foreign travelogues (Faxian, Ibn Battuta, Robert Knox).
- **Epigraphy:** Cave Brahmi inscriptions, pillar inscriptions (Badulla pillar), and slab inscriptions (Polonnaruwa).
- **Numismatics:** Ancient coins (Kahavanu, punch-marked coins) establishing trade relations with Rome, China, and India.

### 2. Polonnaruwa Era & Parakrama Samudraya:
- King Parakramabahu the Great (1153–1186 CE) declared: *"Not even a single drop of rain water must flow into the ocean without being of use to mankind."*
- Constructed the massive **Parakrama Samudraya**, unifying Topa Wewa, Dambulu Wewa, and Eramudu Wewa.

### 3. Colonial Era & Kandyan Resistance:
- Portuguese arrival (1505) and Dutch conquest (1658) controlled maritime coastal regions.
- The independent Kingdom of Kandy defeated Portuguese invasions at the **Battle of Danture (1594)** and **Battle of Gannoruwa (1638)**.`;

    const siAnswer = `**ශ්‍රී ලංකා ඉතිහාසය — 10 ශ්‍රේණිය නිල විෂය නිර්දේශය**

### 1. ඓතිහාසික සහ පුරාවිද්‍යාත්මක මූලාශ්‍ර:
- **සාහිත්‍ය මූලාශ්‍ර:** දීපවංශය, මහාවංශය (මහානාම හිමි), පූජාවලිය සහ විදේශීය වාර්තා (පාහියන්, ඉබන් බතූතා, රොබට් නොක්ස්).
- **සෙල්ලිපි (Epigraphy):** ලෙන් බ්‍රාහ්මී ලිපි, ටැම් ලිපි (බදුලු ටැම් ලිපිය) සහ පුවරු ලිපි (පොළොන්නරුව).
- **කාසි (Numismatics):** කහවණු, හස්ති රූප කාසි (රෝමය, චීනය සහ ඉන්දියාව සමඟ පැවති වෙළඳ සබඳතා).

### 2. පොළොන්නරු යුගය සහ පරාක්‍රම සමුද්‍රය:
- මහා පරාක්‍රමබාහු රජු (1153–1186): *"අහසින් වැටෙන එකදු දිය බිඳක්වත් මිනිසාගේ ප්‍රයෝජනයට නොගෙන මුහුදට ගලා යාමට ඉඩ නොතැබිය යුතුය."*
- තෝපා වැව, දඹුළු වැව, එරමුදු වැව එක්කොට **පරාක්‍රම සමුද්‍රය** ඉදිකරන ලදී.

### 3. යටත්විජිත සමය සහ උඩරට ප්‍රතිරෝධය:
- පෘතුගීසි (1505) සහ ලන්දේසි (1658) මුහුදුබඩ ප්‍රදේශ පාලනය කළහ.
- ස්වාධීන උඩරට රාජධානිය විසින් **දන්තුරේ සටන (1594)** සහ **ගන්නෝරුව සටන (1638)** දී පෘතුගීසීන් පරාජය කරන ලදී.`;

    const taAnswer = `**இலங்கை வரலாறு — தரம் 10 தேசிய பாடத்திட்டம்**

### 1. வரலாற்று மற்றும் தொல்பொருள் மூலங்கள்:
- **இலக்கிய மூலங்கள்:** தீபவம்சம், மகாவம்சம்.
- **கல்வெட்டுகள் & நாணயங்கள்:** கஹவணு நாணயங்கள்.

### 2. பொலன்னறுவை காலம்:
- மகா பராக்கிரமபாகு மன்னர் (1153–1186) கட்டிய **பராக்கிரம சமுத்திரம்**.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'King Parakramabahu the Great (1153–1186)',
        'Parakrama Samudraya (Topa, Dambulu, Eramudu Wewa)',
        'Bisokotuwa (Cistern Sluice valve)',
        'Mahavamsa & Inscriptions',
        'Kandyan Battles (Danture 1594, Gannoruwa 1638)'
      ],
      memoryTrick: {
        concept: 'Parakramabahu & Water Conservation',
        trick: 'Every rain drop counts! Bisokotuwa controls water pressure, Parakrama Samudra stores it all!',
        rhyme: 'Not a single drop of rain,\nShall reach the ocean all in vain!\nBisokotuwa calms the water\'s might,\nFeeding golden fields with ancient light!',
        audioText: 'Here is your memory trick for Sri Lankan history! King Parakramabahu the Great declared: Not even a single drop of rain water must flow into the ocean without being of use to mankind! Remember the Bisokotuwa regulates the pressure, and Parakrama Samudraya catches every drop!'
      },
      suggestedFollowUps: [
        'Clarify more: Can you break this down step-by-step with more details?',
        'Explain simpler: How did the Bisokotuwa release water without breaking?',
        'Sri Lankan Example: Archaeological remains at Polonnaruwa',
        'Significance of the Battle of Danture in 1594',
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
