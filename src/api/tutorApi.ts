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

    // ICT Chapter 3: Word Processing
    if (
      context.topicId === 'word-processing' ||
      lowerQ.includes('word process') ||
      lowerQ.includes('word art') ||
      lowerQ.includes('clip art') ||
      lowerQ.includes('justify') ||
      lowerQ.includes('font') ||
      lowerQ.includes('paragraph') ||
      lowerQ.includes('alignment') ||
      lowerQ.includes('subscript') ||
      lowerQ.includes('superscript') ||
      lowerQ.includes('table') ||
      lowerQ.includes('save as') ||
      lowerQ.includes('spell check') ||
      lowerQ.includes('orientation') ||
      lowerQ.includes('landscape') ||
      lowerQ.includes('portrait') ||
      lowerQ.includes('co2') ||
      lowerQ.includes('2^3') ||
      lowerQ.includes('වදන් සැකසුම') ||
      lowerQ.includes('සමපාත') ||
      lowerQ.includes('උපලකුණු') ||
      lowerQ.includes('උඩුලකුණු') ||
      lowerQ.includes('අකුරු') ||
      lowerQ.includes('ඡේද') ||
      lowerQ.includes('වගු') ||
      lowerQ.includes('சொல் செயலாக்கம்') ||
      lowerQ.includes('சீரமைப்பு')
    ) {
      if (lowerQ.includes('clarify') || lowerQ.includes('break this down') || lowerQ.includes('more detail') || lowerQ.includes('තවදුරටත්') || lowerQ.includes('விளக்குங்கள்')) {
        return this.handleWordProcessingClarify(lang);
      }
      if (lowerQ.includes('easier') || lowerQ.includes('simpler') || lowerQ.includes('සරල') || lowerQ.includes('எளிதாக')) {
        return this.handleWordProcessingSimpler(lang);
      }
      if (lowerQ.includes('example') || lowerQ.includes('උදාහරණ') || lowerQ.includes('உதாரணம்')) {
        return this.handleWordProcessingExample(lang);
      }
      return this.handleWordProcessing(lang);
    }

    // ICT Chapter 1: Number Systems
    if (lowerQ.includes('number system') || lowerQ.includes('binary') || lowerQ.includes('decimal') || lowerQ.includes('switch') || lowerQ.includes('transistor') || lowerQ.includes('base 2') || lowerQ.includes('base 10') || lowerQ.includes('ද්විමය') || lowerQ.includes('දශමය') || lowerQ.includes('සංඛ්‍යා පද්ධති') || lowerQ.includes('இரும') || lowerQ.includes('எண் முறை')) {
      return this.handleNumberSystems(lang);
    }

    // ICT Chapter 2: Configuring & Formatting a Computer (Desktop customization, resolution, keyboard, formatting)
    if (lowerQ.includes('desktop') || lowerQ.includes('customiz') || lowerQ.includes('display') || lowerQ.includes('resolution') || lowerQ.includes('disk format') || lowerQ.includes('keyboard') || lowerQ.includes('screen') || lowerQ.includes('වින්‍යාස') || lowerQ.includes('හැඩසවි') || lowerQ.includes('විභේදනය') || lowerQ.includes('යතුරුපුවරු') || lowerQ.includes('உள்ளமை') || lowerQ.includes('தெளிவுத்திறன்')) {
      return this.handleConfiguringComputer(lang);
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
    if (context.topicId === 'word-processing') {
      return this.handleWordProcessingClarify(lang);
    }
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
    if (context?.topicId === 'word-processing') {
      return this.handleWordProcessingSimpler(lang);
    }
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
    if (context?.topicId === 'word-processing') {
      return this.handleWordProcessingExample(lang);
    }
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
        audioText: 'Here is your memory trick for binary numbers! Start at one on the far right, and double every step: 1, 2, 4, 8, 16, 32, 64, and 128! Every bit to the left is twice as big!',
        languageVersions: {
          en: {
            concept: 'Powers of 2 & Binary Place Values',
            trick: 'Double trouble from Right to Left! Start at 1, then double each step: 1, 2, 4, 8, 16, 32, 64, 128!',
            rhyme: 'Start at ONE on the far Right,\nDouble each step with all your might!\n1, 2, 4, 8, sixteen more,\n32, 64, 128 in store!',
            audioText: 'Here is your memory trick for binary numbers! Start at one on the far right, and double every step: 1, 2, 4, 8, 16, 32, 64, and 128! Every bit to the left is twice as big!'
          },
          si: {
            concept: 'දෙකේ බල සහ ද්විමය ස්ථානීය අගය',
            trick: 'දකුණේ සිට වමට දෙගුණ කරගෙන යන්න! 1න් පටන් ගෙන දෙගුණ කරන්න: 1, 2, 4, 8, 16, 32, 64, 128!',
            rhyme: 'දකුණු පසින් එකෙන් පටන් ගන්න,\nදෙගුණ කරමින් ඉදිරියටම යන්න!\n1, 2, 4, 8 සහ 16,\n32, 64, 128 මතක තියාගන්න!',
            audioText: 'ද්විමය සංඛ්‍යා මතක තබා ගැනීමේ කෙටි ක්‍රමය මෙන්න! දකුණෙන් එකෙන් පටන් ගෙන, වමට යන සෑම පියවරකදීම අගය දෙගුණ කරන්න: 1, 2, 4, 8, 16, 32, 64, සහ 128!'
          },
          ta: {
            concept: 'இரண்டின் அடுக்குகள் மற்றும் இரும இடப்பெறுமானம்',
            trick: 'வலமிருந்து இடமாக இரட்டிப்பாக்குங்கள்! 1 இலிருந்து தொடங்கி இரட்டிப்பாக்குங்கள்: 1, 2, 4, 8, 16, 32, 64, 128!',
            rhyme: 'வலது பக்கத்தில் ஒன்றில் தொடங்கு,\nஇரட்டிப்பாக்கி முன்னேறிச் செல்லு!\n1, 2, 4, 8 பதினாறுடன்,\n32, 64, 128 நினைவில் நில்லு!',
            audioText: 'இரும எண்களை நினைவில் கொள்வதற்கான எளிய வழி இதோ! வலதுபுறம் ஒன்றில் தொடங்கி, இடப்புறம் செல்லச் செல்ல இரட்டிப்பாக்குங்கள்: 1, 2, 4, 8, 16, 32, 64, மற்றும் 128!'
          }
        }
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
        audioText: 'Here is your memory trick for screen resolution and drive formatting! Resolution is width times height in dots! Remember, NTFS handles big files over four gigabytes, while FAT32 works everywhere! Always backup before formatting!',
        languageVersions: {
          en: {
            concept: 'Screen Resolution & Drive Formats',
            trick: 'Pixels = Width × Height! NTFS for Big Files, FAT32 for Universal Sharing!',
            rhyme: 'Pixels across and pixels down,\nCrisp Full HD all over town!\nNineteen-twenty by ten-eighty wide,\nFormat with care and backup inside!',
            audioText: 'Here is your memory trick for screen resolution and drive formatting! Resolution is width times height in dots! Remember, NTFS handles big files over four gigabytes, while FAT32 works everywhere! Always backup before formatting!'
          },
          si: {
            concept: 'තිර විභේදනය සහ ධාවක හැඩසවි ගැන්වීම',
            trick: 'පික්සල් = පළල × උස! විශාල ලිපිගොනු සඳහා NTFS, පොදු බෙදාගැනීම සඳහා FAT32!',
            rhyme: 'තිරයේ පළලයි උසයි බලා,\nවිභේදනය ගනිමු මැනලා!\nවිශාල ගොනුවලට NTFS නියමයි,\nබැකප් කර ෆෝමැට් කිරීම සුදුසුයි!',
            audioText: 'තිර විභේදනය සහ ධාවක හැඩසවි ගැන්වීම මතක තබා ගැනීමේ ක්‍රමය මෙන්න! විභේදනය කියන්නේ තිරයේ පළල ගුණ කිරීම උසයි. විශාල ගොනු සඳහා NTFS ද, පොදුවේ භාවිතයට FAT32 ද යොදාගන්න! හැමවිටම බැකප් එකක් තබාගන්න!'
          },
          ta: {
            concept: 'திரை தெளிவுத்திறன் & இயக்கக வடிவமைத்தல்',
            trick: 'பிக்சல்கள் = அகலம் × உயரம்! பெரிய கோப்புகளுக்கு NTFS, பொதுவான பயன்பாட்டுக்கு FAT32!',
            rhyme: 'அகலமும் உயரமும் பிக்சல் ஆகும்,\nதெளிவான Full HD கண்ணைக் கவரும்!\nபெரிய கோப்புகளுக்கு NTFS சிறந்தது,\nவடிவமைக்கும் முன் காப்புப்பிரதி எடுப்பது நன்று!',
            audioText: 'திரை தெளிவுத்திறன் மற்றும் இயக்கக வடிவமைத்தலை நினைவில் கொள்வதற்கான வழி இதோ! தெளிவுத்திறன் என்பது அகலம் பெருக்கல் உயரம். பெரிய கோப்புகளுக்கு NTFS இனைப் பயன்படுத்துங்கள்!'
          }
        }
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
        source: 'Grade 8 ICT Textbook — Chapter 3: Word Processing (Educational Publications Department Sri Lanka, Pages 34–38)',
        fileType: 'PDF',
        pageNumber: 34,
        chunkNumber: 80,
        distance: 0.08,
        excerpt: 'Chapter 3: Word Processing. We can create documents like letters, question papers, newspapers, application forms, invitations, greeting cards, and magazines using word processing software.',
      },
      {
        documentId: 'moe-lk-ict-gr8-ict-gr8-en',
        source: 'Grade 8 ICT Textbook — Chapter 3: Common Tools & Character Formatting (Pages 35–36)',
        fileType: 'PDF',
        pageNumber: 36,
        chunkNumber: 82,
        distance: 0.09,
        excerpt: 'Common Tools: New, Open, Save, Save As, Print Preview, Print. Text formatting: Font type, Font size, Font color, Bold, Italic, Underline, Subscript and Superscript.',
      },
      {
        documentId: 'moe-lk-ict-gr8-ict-gr8-en',
        source: 'Grade 8 ICT Textbook — Chapter 3: Paragraph Formatting & Objects (Pages 37–38)',
        fileType: 'PDF',
        pageNumber: 37,
        chunkNumber: 84,
        distance: 0.10,
        excerpt: 'Paragraph alignment: Align Left, Center, Align Right, Justify. Inserting Pictures, Clip Art, Shapes, Word Art, Text boxes, and Tables.',
      }
    ];

    const enAnswer = `**Grade 8 ICT — Chapter 3: Word Processing (Textbook Pages 34–38)**

Word processing software is designed to create, edit, format, store, and print documents electronically. As introduced in the textbook dialogue (p. 34), manual handwriting often leads to uneven letter size, messy erasures, and difficulty producing multiple copies for school events. Word processing solves all these problems with precision tools.

---

### 1. The 7 Common Document Types (Figure 3.1, p. 35)
Word processing software is used in schools and offices to produce:
1. **Letters** (formal official letters, permission slips)
2. **Question Papers** (school term examinations with formulas)
3. **Newspapers** (multi-column journalism)
4. **Application Forms** (structured admission or club sign-up sheets)
5. **Invitations** (English Day, Prize Giving, Sports Meet invitations)
6. **Greeting Cards** (artistic cards with illustrations)
7. **Magazines** (school annual publications with justified articles)

---

### 2. Common Document Management Tools (p. 35)
- **New (Ctrl+N):** Opens a blank new document.
- **Open (Ctrl+O):** Opens an existing file saved on storage.
- **Save (Ctrl+S):** Updates changes to the current document under its existing name.
- **Save As:** Saves a new copy under a *new filename*, location, or format (e.g. PDF).
- **Print Preview:** Displays on screen exactly how the document will appear on paper before printing.
- **Print (Ctrl+P):** Transmits the document to a printer.

---

### 3. Edit & Clipboard Tools (p. 36)
- **Undo (Ctrl+Z):** Reverses the last action or accidental erasure.
- **Redo (Ctrl+Y):** Re-applies an action that was undone.
- **Cut (Ctrl+X):** Removes selected text or objects and places them on the Clipboard.
- **Copy (Ctrl+C):** Duplicates selected text without deleting the original.
- **Paste (Ctrl+V):** Inserts copied or cut content at the cursor position.
- **Spell Check (F7):** Automatically detects spelling mistakes (red wavy underline) and grammatical issues (green or blue wavy underline).

---

### 4. Character & Font Formatting (p. 36)
- **Font Face:** Times New Roman, Cambria, Arial for English; Nirmala UI (Unicode) or FMAbhaya for Sinhala; Latha or Nirmala UI for Tamil.
- **Font Size:** Standard headings use 14–18 pt+, while body paragraphs use 12 pt.
- **Styles & Emphasis:** **Bold (Ctrl+B)**, *Italic (Ctrl+I)*, <u>Underline (Ctrl+U)</u>, Font Color, and Highlight Color.
- **Subscript & Superscript (Activities 3.4 & 3.5):**
  - **Subscript ($x_2$):** Lowers characters below the baseline. Essential for chemical formulas (e.g. $CO_2$, $H_2O$).
  - **Superscript ($x^2$):** Raises characters above the baseline. Essential for mathematical powers ($2^2, 2^3, 5^2$) and ordinal rankings ($1^{st}, 2^{nd}$).

---

### 5. Paragraph Formatting & Alignment (p. 37)
- **Align Left (Ctrl+L):** Flushes text against the left margin; standard default for paragraphs.
- **Center (Ctrl+E):** Centers text between margins; ideal for headings, titles, and certificates.
- **Align Right (Ctrl+R):** Flushes text against the right margin; used for dates, reference numbers, and signatures.
- **Justify (Ctrl+J):** Dynamically adjusts spacing between words so text aligns squarely against **both left and right margins** simultaneously (standard for textbooks, newspapers, and magazines).
- **Line & Paragraph Spacing:** Adjusts vertical breathing room between sentences.
- **Bullets & Numbering:** Organizes lists cleanly into bullet points or numbered sequences.

---

### 6. Inserting Objects, Tables & Layout (p. 37–38)
- **Pictures:** Insert digital photos or school logos from storage.
- **Clip Art & Shapes:** Insert geometric shapes (rectangles, arrows, banners) for diagrams.
- **Word Art:** Decorative, curved artistic text for event banners and souvenir covers.
- **Text Boxes:** Floating movable frames for quotations and sidebar callouts.
- **Tables:** Grids of **Rows**, **Columns**, and **Cells** used for class timetables and grade marksheets.
- **Page Orientation:** **Portrait** (tall/vertical for letters) vs. **Landscape** (wide/horizontal for wide timetables).

---

### 7. Official Chapter Summary (Textbook p. 38)
1. Word processing software provides electronic tools to type, edit, and format documents cleanly.
2. Common file tools (New, Open, Save, Print) ensure systematic document management.
3. Character tools give precise control over fonts, sizes, emphasis, and scientific notation (Subscript/Superscript).
4. Paragraph alignments (Left, Center, Right, Justify) produce neat, professional layouts.
5. Inserting graphics, shapes, and tables makes documents engaging and visually informative.`;

    const siAnswer = `**8 ශ්‍රේණිය තොරතුරු හා සන්නිවේදන තාක්ෂණය — 3 වන පරිච්ඡේදය: වදන් සැකසුම (පෙළපොත පිටු 34–38)**

වදන් සැකසුම් මෘදුකාංග (Word Processing Software) යනු ලේඛන විද්‍යුත් ආකාරයෙන් නිර්මාණය කිරීමට, සංස්කරණය කිරීමට, හැඩසවි ගැන්වීමට, පරිගණකයේ සුරැකීමට සහ මුද්‍රණය කිරීමට භාවිත කරන මෘදුකාංග වේ. පෙළපොතේ 34 වන පිටුවේ දැක්වෙන පරිදි අතින් ලිවීමේදී සිදුවන මැකීම්, අකුරු ප්‍රමාණ අසමාන වීම් සහ පිටපත් කිහිපයක් එක හා සමානව ලබාගැනීමට ඇති අපහසුතා වදන් සැකසුම් මෘදුකාංග මඟින් සම්පූර්ණයෙන්ම මඟහරවා ගත හැක.

---

### 1. වදන් සැකසුම මඟින් සකසන ප්‍රධාන ලේඛන වර්ග 7 (රූපය 3.1, පිටුව 35)
පෙළපොතේ රූපය 3.1 හි දැක්වෙන පරිදි:
1. **ලිපි (Letters)** — නිල සහ පෞද්ගලික ලිපි
2. **ප්‍රශ්න පත්‍ර (Question papers)** — පාසල් වාර විභාග ප්‍රශ්න පත්‍ර
3. **පුවත්පත් (Newspapers)** — තීරු සහිත ප්‍රවෘත්ති පත්‍ර
4. **අයදුම්පත් (Application forms)** — සමිති සහ පාසල් ඇතුළත් වීමේ පෝරම
5. **ආරාධනා පත්‍ර (Invitations)** — ඉංග්‍රීසි දින, ත්‍යාග ප්‍රදානෝත්සව ආරාධනා
6. **සුබපැතුම් පත් (Greeting cards)** — අලංකාර නිදර්ශන සහිත කාඩ්පත්
7. **සඟරා (Magazines)** — පාසල් වාර්ෂික සඟරා සහ ලිපි

---

### 2. පොදු ලේඛන මෙවලම් (Common Tools, පිටුව 35)
- **New (Ctrl+N):** නව හිස් ලේඛනයක් ආරම්භ කිරීම.
- **Open (Ctrl+O):** පරිගණකයේ දැනටමත් සුරකින ලද ලේඛනයක් විවෘත කිරීම.
- **Save (Ctrl+S):** පවතින නමින්ම ලේඛනයට කළ වෙනස්කම් ගොනුවේ සුරැකීම.
- **Save As:** ලේඛනය නව නමකින්, වෙනත් ස්ථානයක හෝ නව ගොනු වර්ගයකින් (උදා: PDF) සුරැකීම.
- **Print Preview:** මුද්‍රණයට පෙර ලේඛනය කඩදාසියේ දිස්වන ආකාරය තිරය මත පරීක්ෂා කිරීම.
- **Print (Ctrl+P):** ලේඛනය මුද්‍රණ යන්ත්‍රය වෙත යවා මුද්‍රිත පිටපතක් ලබා ගැනීම.

---

### 3. සංස්කරණ මෙවලම් (Edit & Clipboard Tools, පිටුව 36)
- **Undo (Ctrl+Z):** අවසන් වරට කළ ක්‍රියාව අහෝසි කිරීම.
- **Redo (Ctrl+Y):** අහෝසි කළ ක්‍රියාව නැවත සිදුකිරීම.
- **Cut (Ctrl+X):** තෝරාගත් පෙළ හෝ රූපය ඉවත් කර Clipboard මත තැබීම.
- **Copy (Ctrl+C):** තෝරාගත් පෙළ මුල් තැනින් ඉවත් නොකර අමතර පිටපතක් Clipboard වෙත ගැනීම.
- **Paste (Ctrl+V):** පිටපත් කළ හෝ කපාගත් දෑ කර්සරය ඇති තැනට ඇතුළත් කිරීම.
- **Spell Check (F7):** අක්ෂර වින්‍යාස (රතු රැලි සහිත ඉරි) සහ ව්‍යාකරණ (කොළ/නිල් රැලි සහිත ඉරි) පරීක්ෂාව.

---

### 4. අකුරු හැඩසවි ගැන්වීම (Font Formatting, පිටුව 36)
- **අකුරු වර්ගය (Font Face):** ඉංග්‍රීසි සඳහා Times New Roman, Cambria; සිංහල යුනිකෝඩ් සඳහා Nirmala UI හෝ FMAbhaya; දෙමළ සඳහා Latha.
- **අකුරු ප්‍රමාණය (Font Size):** මාතෘකා 14–18 pt+, සාමාන්‍ය ඡේද සඳහා 12 pt.
- **විලාස:** **Bold (Ctrl+B - තද අකුරු)**, *Italic (Ctrl+I - ඇල අකුරු)*, <u>Underline (Ctrl+U - යටි ඉරි)</u>, අකුරු වර්ණ සහ Highlight.
- **Subscript සහ Superscript (ක්‍රියාකාරකම් 3.4 සහ 3.5):**
  - **Subscript ($x_2$ - උපලකුණ):** අකුරු සාමාන්‍ය මට්ටමට වඩා පහළින් යෙදීම. රසායනික සූත්‍ර සඳහා අත්‍යවශ්‍ය වේ (උදා: $CO_2, H_2O$).
  - **Superscript ($x^2$ - උඩුලකුණ):** අකුරු සාමාන්‍ය මට්ටමට වඩා ඉහළින් යෙදීම. ගණිතමය බල ($2^2, 2^3, 5^2$) සහ අනුක්‍රමික අංක ($1^{st}, 2^{nd}$) සඳහා යොදාගනී.

---

### 5. ඡේද පෙළගැස්වීම් (Paragraph Alignments, පිටුව 37)
- **වම් පෙළගැස්ම (Align Left, Ctrl+L):** පෙළ වම් දාරයට පෙළගස්වයි; සාමාන්‍ය ඡේද සඳහා පෙරනිමියයි.
- **මධ්‍යගත කිරීම (Center, Ctrl+E):** දෙපස දාරවලට මැදිව පෙළගස්වයි; ප්‍රධාන මාතෘකා, සහතිකපත් සඳහා.
- **දකුණු පෙළගැස්ම (Align Right, Ctrl+R):** දකුණු දාරයට පෙළගස්වයි; දිනයන් සහ අත්සන් සඳහා.
- **දෙපස සමපාත කිරීම (Justify, Ctrl+J):** වචන අතර පරතරය සකසමින් වම් සහ දකුණු දාර දෙකටම එකවර සෘජුව සමපාත කරයි (පෙළපොත් සහ පුවත්පත් සඳහා සම්මතයයි).
- **පේළි පරතරය සහ බුලට්/අංකනය:** පේළි අතර ඉඩ සකස් කිරීම සහ කරුණු ලැයිස්තුගත කිරීම.

---

### 6. වස්තු, වගු සහ පිටු සැකසුම (Objects, Tables & Layout, පිටු 37–38)
- **පින්තූර (Pictures):** පාසල් ලාංඡනය හෝ ඡායාරූප ගොනු මඟින් ඇතුළත් කිරීම.
- **හැඩතල (Shapes & Clip Art):** ඊතල, බැනර්, කොටු මඟින් සටහන් ඇඳීම.
- **Word Art:** ආකර්ෂණීය අලංකාර අකුරු කලාව මඟින් ප්‍රධාන බැනර් මාතෘකා සකස් කිරීම.
- **පෙළ කොටු (Text Boxes):** පිටුවේ කැමති තැනකට ගෙන යා හැකි නිදහස් පෙළ කොටු.
- **වගු (Tables):** පේළි (Rows) සහ තීරු (Columns) මඟින් සෑදෙන කොටු (Cells) තුළ කාලසටහන් හෝ ලකුණු ලැයිස්තු පිළිවෙළට දැක්වීම.
- **පිටු දිශානතිය (Page Orientation):** සිරස් (Portrait) සහ තිරස් (Landscape).

---

### 7. නිල පාඩම් සාරාංශය (පෙළපොත පිටුව 38)
1. වදන් සැකසුම් මෘදුකාංග මඟින් ලේඛන පහසුවෙන් සකස් කිරීමට හා සංස්කරණයට ඉඩ සලසයි.
2. New, Open, Save, Print වැනි පොදු මෙවලම් මඟින් ලේඛන මනා ලෙස කළමනාකරණය කළ හැක.
3. අකුරු හැඩසවි මෙවලම් මඟින් අකුරු වර්ග, ප්‍රමාණ, විලාස සහ Subscript/Superscript පාලනය කළ හැක.
4. ඡේද පෙළගැස්වීම් (Left, Center, Right, Justify) මඟින් ලේඛනය පිළිවෙළකට සකස් කරයි.
5. වගු, හැඩතල සහ රූප ඇතුළත් කිරීමෙන් ලේඛනය වඩාත් ආකර්ෂණීය හා සන්නිවේදනශීලී වේ.`;

    const taAnswer = `**தரம் 8 தகவல் தொடர்பாடல் தொழில்நுட்பம் — அத்தியாயம் 3: சொல் செயலாக்கம் (பாடநூல் பக். 34–38)**

சொல் செயலாக்க மென்பொருள் (Word Processing Software) என்பது ஆவணங்களை இலத்திரனியல் முறையில் உருவாக்க, திருத்த, வடிவமைக்க, கணினியில் சேமிக்க மற்றும் அச்சிடப் பயன்படும் மென்பொருளாகும். கையால் எழுதும் போது ஏற்படும் தவறுகள், அழித்தல்கள் மற்றும் பல பிரதிகளை எடுப்பதில் உள்ள சிரமங்களை சொல் செயலாக்கம் இலகுவாக்குகிறது.

---

### 1. சொல் செயலாக்கம் மூலம் உருவாக்கப்படும் 7 ஆவண வகைகள் (படம் 3.1, பக். 35)
1. **கடிதங்கள் (Letters)** — உத்தியோகபூர்வ மற்றும் தனிப்பட்ட கடிதங்கள்
2. **வினாத்தாள்கள் (Question papers)** — பள்ளி தவணைப் பரீட்சை வினாத்தாள்கள்
3. **பத்திரிகைகள் (Newspapers)** — பல நிரல்களைக் கொண்ட பத்திரிகைகள்
4. **விண்ணப்பப் படிவங்கள் (Application forms)** — அனுமதிப் படிவங்கள்
5. **அழைப்பிதழ்கள் (Invitations)** — ஆங்கில தின, பரிசளிப்பு விழா அழைப்பிதழ்கள்
6. **வாழ்த்து அட்டைகள் (Greeting cards)** — வண்ணமயமான வாழ்த்து அட்டைகள்
7. **சஞ்சிகைகள் (Magazines)** — பள்ளி ஆண்டு மலர்கள் மற்றும் சஞ்சிகைகள்

---

### 2. பொது ஆவணக் கருவிகள் (Common Tools, பக். 35)
- **New (Ctrl+N):** புதிய வெற்று ஆவணத்தைத் தொடங்குதல்.
- **Open (Ctrl+O):** ஏற்கனவே சேமிக்கப்பட்ட ஆவணத்தைத் திறத்தல்.
- **Save (Ctrl+S):** தற்போதைய ஆவணத்தில் மாற்றங்களைச் சேமித்தல்.
- **Save As:** புதிய பெயரில் அல்லது புதிய கோப்பு வடிவத்தில் (PDF) சேமித்தல்.
- **Print Preview:** அச்சிடுவதற்கு முன் காகிதத்தில் தோன்றும் விதத்தை திரையில் பார்த்தல்.
- **Print (Ctrl+P):** ஆவணத்தை அச்சுப்பொறிக்கு அனுப்பி அச்சிடுதல்.

---

### 3. திருத்தல் கருவிகள் (Edit & Clipboard Tools, பக். 36)
- **Undo (Ctrl+Z):** கடைசியாகச் செய்த செயலைத் தவிர்த்தல் (மீளப்பெறுதல்).
- **Redo (Ctrl+Y):** தவிர்த்த செயலை மீண்டும் செய்தல்.
- **Cut (Ctrl+X):** தெரிவுசெய்த பகுதியை நீக்கி Clipboard இற்கு மாற்றுதல்.
- **Copy (Ctrl+C):** மூலத்தை அழிக்காமல் பிரதி எடுத்தல்.
- **Paste (Ctrl+V):** பிரதி அல்லது வெட்டிய பகுதியை ஒட்டுதல்.
- **Spell Check (F7):** எழுத்துப்பிழை (சிவப்பு அலைக்கோடு) மற்றும் இலக்கணப் பிழைகளைச் (நீல/பச்சை அலைக்கோடு) சரிபார்த்தல்.

---

### 4. எழுத்துரு வடிவமைப்பு (Font Formatting, பக். 36)
- **எழுத்துரு வகை:** ஆங்கிலத்திற்கு Times New Roman, Cambria; தமிழுக்கு Latha, Nirmala UI.
- **எழுத்து அளவு:** தலைப்புகளுக்கு 14–18 pt+, பந்திகளுக்கு 12 pt.
- **பாணிகள்:** **Bold (Ctrl+B - தடித்த எழுத்து)**, *Italic (Ctrl+I - சாய்வெழுத்து)*, <u>Underline (Ctrl+U - அடிக்கோடு)</u>, நிறங்கள்.
- **Subscript & Superscript (செயற்பாடுகள் 3.4 & 3.5):**
  - **Subscript ($x_2$ - கீழ் ஒட்டு):** எழுத்தை வரிக் கோட்டிற்கு கீழே அமைத்தல். இரசாயன சூத்திரங்களுக்கு (உதா: $CO_2, H_2O$).
  - **Superscript ($x^2$ - மேல் ஒட்டு):** எழுத்தை வரிக் கோட்டிற்கு மேலே அமைத்தல். கணித அடுக்குகளுக்கு ($2^2, 2^3, 5^2$) மற்றும் வரிசை எண்களுக்கு ($1^{st}, 2^{nd}$).

---

### 5. பந்தி சீரமைப்புகள் (Paragraph Alignments, பக். 37)
- **இடது சீரமைப்பு (Align Left, Ctrl+L):** இடது ஓரம் நேராக அமையும்; சாதாரண பந்திகளுக்குப் பயன்படும்.
- **மையச் சீரமைப்பு (Center, Ctrl+E):** இரு ஓரங்களுக்கும் நடுவில் அமையும்; தலைப்புகளுக்கு உகந்தது.
- **வலது சீரமைப்பு (Align Right, Ctrl+R):** வலது ஓரம் நேராக அமையும்; திகதி, கையொப்பங்களுக்கு உகந்தது.
- **இருபுற சீரமைப்பு (Justify, Ctrl+J):** சொற்களுக்கு இடையில் இடைவெளியைச் சரிசெய்து இடது மற்றும் வலது இரு ஓரங்களையும் சமப்படுத்தும் (பாடநூல்கள், பத்திரிகைகளில் வழமையானது).
- **வரி இடைவெளி மற்றும் பட்டியல்கள் (Bullets & Numbering).**

---

### 6. உருப்படிகள், அட்டவணைகள் மற்றும் பக்க அமைப்பு (பக். 37–38)
- **படங்கள் (Pictures):** புகைப்படங்கள் அல்லது பள்ளி இலச்சினைகளை சேர்த்தல்.
- **வடிவங்கள் (Shapes & Clip Art):** அம்புக்குறிகள் மற்றும் வடிவங்கள் வரைதல்.
- **Word Art:** கவர்ச்சிகரமான அலங்கார எழுத்துக்கள் மூலம் தலைப்புகளை உருவாக்குதல்.
- **உரைப்பெட்டி (Text Boxes):** நகர்த்தக்கூடிய உரைப்பெட்டிகள்.
- **அட்டவணைகள் (Tables):** வரிசைகள் (Rows) மற்றும் நிரல்களால் (Columns) ஆன சிற்றறைகளில் (Cells) நேர அட்டவணைகளை அமைத்தல்.
- **பக்க அமைவு (Orientation):** செங்குத்து (Portrait) மற்றும் கிடைமட்டம் (Landscape).

---

### 7. உத்தியோகபூர்வ சுருக்கம் (பாடநூல் பக். 38)
1. ஆவணங்களை இலகுவாக உருவாக்கவும் திருத்தவும் சொல் செயலாக்க மென்பொருள் உதவுகிறது.
2. பொதுக் கருவிகள் மூலம் ஆவணங்களை முறையாக நிர்வகிக்கலாம்.
3. எழுத்துரு கருவிகள் மூலம் வடிவமைப்பு மற்றும் அறிவியல் குறியீடுகளை (Subscript/Superscript) இடலாம்.
4. பந்தி சீரமைப்புகள் நேர்த்தியான பக்க அமைப்பைத் தருகின்றன.
5. அட்டவணைகள் மற்றும் படங்கள் ஆவணங்களை கவர்ச்சிகரமாகவும் தெளிவானதாகவும் மாற்றுகின்றன.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Figure 3.1: 7 Document Types (Letters, Question papers, Newspapers, Application forms, Invitations, Greeting cards, Magazines)',
        'Common Tools: New, Open, Save, Save As, Print Preview, Print',
        'Edit & Clipboard: Undo (Ctrl+Z), Redo (Ctrl+Y), Cut, Copy, Paste, Spell Check (F7)',
        'Font Formatting: Times New Roman, Nirmala UI, FMAbhaya, Bold, Italic, Underline',
        'Subscript (x₂ for CO₂) vs Superscript (x² for 2³, 5²)',
        'Paragraph Alignments: Left (Ctrl+L), Center (Ctrl+E), Right (Ctrl+R), Justify (Ctrl+J)',
        'Inserting Objects: Pictures, Clip Art, Shapes, Word Art, Text Boxes, Tables (Rows & Columns)',
        'Page Setup: Margins & Orientation (Portrait vs Landscape)'
      ],
      memoryTrick: {
        concept: 'Grade 8 ICT Word Processing Mastery (Textbook p. 34–38)',
        trick: 'Save As for New Copies, Justify (Ctrl+J) for Clean Margins, Subscript (x₂) Below for CO₂, Superscript (x²) Above for 2³!',
        rhyme: 'New and Save to keep your file,\nCut and Paste to change your style,\nSubscript drops for CO₂ in line,\nSuperscript raises 2³ so fine!\nAlign Left, Center, Right in view,\nCtrl+J makes book margins true!',
        audioText: 'Here is your official Grade 8 ICT memory trick for Word Processing! Remember: L is Left, R is Right, E is Center, and J is Justify for textbook borders! Subscript places the two down low for C O 2, while Superscript raises the power three high for two cubed! Save updates your document, and Save As makes a fresh copy!',
        languageVersions: {
          en: {
            concept: 'Grade 8 ICT Word Processing Mastery (Textbook p. 34–38)',
            trick: 'Save As for New Copies, Justify (Ctrl+J) for Clean Margins, Subscript (x₂) Below for CO₂, Superscript (x²) Above for 2³!',
            rhyme: 'New and Save to keep your file,\nCut and Paste to change your style,\nSubscript drops for CO₂ in line,\nSuperscript raises 2³ so fine!\nAlign Left, Center, Right in view,\nCtrl+J makes book margins true!',
            audioText: 'Here is your official Grade 8 ICT memory trick for Word Processing! Remember: L is Left, R is Right, E is Center, and J is Justify for textbook borders! Subscript places the two down low for C O 2, while Superscript raises the power three high for two cubed! Save updates your document, and Save As makes a fresh copy!'
          },
          si: {
            concept: '8 ශ්‍රේණිය වදන් සැකසුම (පෙළපොත පිටු 34–38)',
            trick: 'අලුත් පිටපත් වලට Save As, පුවත්පත් පෙළගැස්මට Justify (Ctrl+J), CO₂ සඳහා උපලකුණ Subscript (x₂), 2³ සඳහා උඩුලකුණ Superscript (x²)!',
            rhyme: 'Save As මඟින් අලුත් පිටපතක් හදමු,\nCtrl+J යොදා දෙපසම පෙළගස්වමු!\nCO₂ සූත්‍රයට Subscript පහළට,\n2³ බලයට Superscript ඉහළට!',
            audioText: 'වදන් සැකසුම පිළිබඳ කෙටි මතක සටහන මෙන්න! L කියන්නේ වමට, R කියන්නේ දකුණට, E කියන්නේ මැදට, සහ J කියන්නේ Justify දෙපසම පෙළගැස්වීමටයි! රසායන සූත්‍ර වලට Subscript ද, ගණිත දර්ශක සඳහා Superscript ද මතක තබාගන්න!'
          },
          ta: {
            concept: 'தரம் 8 சொல் செயலாக்கம் (பாடநூல் பக். 34–38)',
            trick: 'புதிய நகல்களுக்கு Save As, புத்தக சீரமைப்புக்கு Justify (Ctrl+J), CO₂ க்கு Subscript (x₂), 2³ க்கு Superscript (x²)!',
            rhyme: 'புதிய நகலுக்கு Save As செய்வோம்,\nஇருபுற சீரமைப்புக்கு Ctrl+J சேர்ப்போம்!\nCO₂ க்கு Subscript கீழே இறங்கும்,\n2³ அடுக்குக்கு Superscript மேலே உயரும்!',
            audioText: 'சொல் செயலாக்கத்தை நினைவில் கொள்வதற்கான வழி இதோ! Ctrl+L இடது சீரமைப்பு, Ctrl+R வலது சீரமைப்பு, Ctrl+J இருபுற சீரமைப்பு! CO2 க்கு Subscript இனைப் பயன்படுத்துங்கள், கணித அடுக்குகளுக்கு Superscript இனைப் பயன்படுத்துங்கள்!'
          }
        }
      },
      suggestedFollowUps: [
        'Clarify more: Can you explain the 7 document types in Figure 3.1 with textbook examples?',
        'Subscript vs Superscript: How do I write chemical formulas and powers?',
        'Why does Justify (Ctrl+J) look better than Left Align in school magazines?',
        'How do I create a school class timetable using Tables?',
      ],
    };
  }

  private handleWordProcessingClarify(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-ict-gr8-ict-gr8-en',
        source: 'Grade 8 ICT Textbook — Chapter 3: Word Processing Detailed Breakdown (Pages 34–38)',
        fileType: 'PDF',
        pageNumber: 36,
        chunkNumber: 83,
        distance: 0.07,
        excerpt: null,
      }
    ];

    const enAnswer = `### Detailed Step-by-Step Breakdown: Word Processing (Textbook Pages 34–38)

Here is a step-by-step educational guide on how word processing works in Grade 8 ICT:

1. **Step 1: Why Use Word Processing Instead of Handwriting? (p. 34)**
   - When writing handwritten documents (like the English Day invitation cards Sithum and his friends made), mistakes require messy whiteout or crossing out.
   - Word processing allows typing without errors, checking spelling with **F7**, and printing 200 identical crisp copies effortlessly.

2. **Step 2: Understanding Figure 3.1 (7 Document Types, p. 35)**
   - The textbook identifies seven everyday products of word processors:
     * Letters (official correspondence)
     * Question papers (exams with formulas and diagrams)
     * Newspapers (articles arranged in columns)
     * Application forms (blank lines and check boxes)
     * Invitations (decorative fonts and borders)
     * Greeting cards (pictures and colorful verses)
     * Magazines (multi-page illustrated publications)

3. **Step 3: Mastering File Tools — Save vs. Save As (p. 35)**
   - **Save (Ctrl+S):** Writes updates directly into the file you are already working on.
   - **Save As:** Lets you choose a new name, location, or format (e.g. converting a draft to a PDF or creating "Invitation_Final_v2.docx").

4. **Step 4: Character Formatting & Scientific Notation (p. 36)**
   - **Subscript ($x_2$):** Lowers characters below the baseline (e.g. $CO_2, H_2O$ in science test questions).
   - **Superscript ($x^2$):** Elevates characters above the baseline (e.g. $2^3 = 8, x^2 + y^2$ in math test questions).

5. **Step 5: Paragraph Alignments & Justify (p. 37)**
   - **Align Left (Ctrl+L):** Left edge straight, right edge ragged (everyday essays).
   - **Center (Ctrl+E):** Balances text equally between margins (headings and titles).
   - **Align Right (Ctrl+R):** Right edge straight (dates and signatures).
   - **Justify (Ctrl+J):** Inserts micro-spaces between words so that text touches **both left and right margins** squarely, giving printed books and newspapers a neat, rectangular block appearance.

6. **Step 6: Adding Tables and Graphic Objects (p. 37–38)**
   - Tables organize schedules into intersecting Rows and Columns.
   - Insertable objects include Pictures, Clip Art, Shapes, Word Art (for stylized banners), and Text Boxes.`;

    const siAnswer = `### පියවරෙන් පියවර පැහැදිලි කිරීම: වදන් සැකසුම (පෙළපොත පිටු 34–38)

1. **පියවර 1: අතින් ලිවීමට වඩා වදන් සැකසුම භාවිත කිරීමේ වාසි (පිටුව 34)**
   - අතින් ලියන විට අකුරු වැරදුණු විට කැතට මැකීමට සිදුවේ. පිටපත් රාශියක් එක හා සමානව ගැනීම දුෂ්කරය.
   - පරිගණක වදන් සැකසුම මඟින් අකුරු වැරදීම් රහිතව, **F7** අක්ෂර වින්‍යාස පරීක්ෂාව යොදාගෙන, එක හා සමාන ආරාධනා පත්‍ර සිය ගණනක් මුද්‍රණය කරගත හැක.

2. **පියවර 2: රූපය 3.1 ලේඛන වර්ග 7 (පිටුව 35)**
   - ලිපි, ප්‍රශ්න පත්‍ර, පුවත්පත්, අයදුම්පත්, ආරාධනා පත්‍ර, සුබපැතුම් පත්, සඟරා.

3. **පියවර 3: Save සහ Save As වෙනස (පිටුව 35)**
   - **Save (Ctrl+S):** දැනට පවතින ගොනුවටම වෙනස්කම් සුරකියි.
   - **Save As:** නව නමකින් හෝ නව ගොනු වර්ගයකින් (PDF වැනි) නව පිටපතක් සාදයි.

4. **පියවර 4: Subscript (උපලකුණ) සහ Superscript (උඩුලකුණ) (පිටුව 36)**
   - **Subscript ($x_2$):** රසායනික සූත්‍ර සඳහා (උදා: $CO_2, H_2O$).
   - **Superscript ($x^2$):** ගණිතමය බල සහ දර්ශක සඳහා (උදා: $2^3, 5^2$).

5. **පියවර 5: ඡේද පෙළගැස්වීම් සහ Justify (පිටුව 37)**
   - **Justify (Ctrl+J):** වම් සහ දකුණු දෙපසම දාරවලට සෘජුව එක හා සමානව පෙළගස්වයි. පෙළපොත් සහ පුවත්පත්වල භාවිත වන්නේ මෙයයි.

6. **පියවර 6: වගු (Tables) සහ වස්තු ඇතුළත් කිරීම (පිටු 37–38)**
   - පේළි සහ තීරු මඟින් කාලසටහන් සෑදීමට වගු (Tables) ද, බැනර් මාතෘකා සඳහා Word Art ද භාවිත වේ.`;

    const taAnswer = `### படிமுறை விளக்கம்: சொல் செயலாக்கம் (பாடநூல் பக். 34–38)

1. **படி 1: கையால் எழுதுவதை விட சொல் செயலாக்கத்தின் பயன்கள் (பக். 34)**
   - அழித்தல்கள் மற்றும் தவறுகள் இன்றி பல பிரதிகளை இலகுவாக அச்சிடலாம்.

2. **படி 2: படம் 3.1 இன் 7 ஆவண வகைகள் (பக். 35)**
   - கடிதங்கள், வினாத்தாள்கள், பத்திரிகைகள், விண்ணப்பங்கள், அழைப்பிதழ்கள், வாழ்த்து அட்டைகள், சஞ்சிகைகள்.

3. **படி 3: Save vs Save As வேறுபாடு (பக். 35)**
   - Save தற்போதைய ஆவணத்தை புதுப்பிக்கும்; Save As புதிய பெயரில் அல்லது PDF ஆக புதிய நகலை உருவாக்கும்.

4. **படி 4: Subscript ($x_2$) மற்றும் Superscript ($x^2$) (பக். 36)**
   - Subscript: இரசாயன சூத்திரங்கள் ($CO_2, H_2O$).
   - Superscript: கணித அடுக்குகள் ($2^3, 5^2$).

5. **படி 5: Justify இருபுற சீரமைப்பு (பக். 37)**
   - Justify (Ctrl+J) இடது மற்றும் வலது இரு ஓரங்களையும் சமப்படுத்தி நேர்த்தியான புத்தக அமைப்பைத் தரும்.

6. **படி 6: அட்டவணைகள் மற்றும் உருப்படிகள் (பக். 37–38)**
   - நேர அட்டவணைகளுக்கு Tables உம், கவர்ச்சிகரமான தலைப்புகளுக்கு Word Art உம் பயன்படுகின்றன.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Manual handwriting vs Word Processing (p. 34)',
        '7 Document Types in Figure 3.1',
        'Save vs Save As lifecycle',
        'Subscript (CO₂) and Superscript (2³)',
        'Justify alignment for book columns'
      ],
      memoryTrick: {
        concept: 'Grade 8 ICT Word Processing Mastery (Textbook p. 34–38)',
        trick: 'Save As for New Copies, Justify (Ctrl+J) for Clean Margins, Subscript (x₂) Below for CO₂, Superscript (x²) Above for 2³!',
        rhyme: 'New and Save to keep your file,\nCut and Paste to change your style,\nSubscript drops for CO₂ in line,\nSuperscript raises 2³ so fine!\nAlign Left, Center, Right in view,\nCtrl+J makes book margins true!',
        audioText: 'Here is your official Grade 8 ICT memory trick for Word Processing! Remember: L is Left, R is Right, E is Center, and J is Justify for textbook borders! Subscript places the two down low for C O 2, while Superscript raises the power three high for two cubed! Save updates your document, and Save As makes a fresh copy!',
        languageVersions: {
          en: {
            concept: 'Grade 8 ICT Word Processing Mastery (Textbook p. 34–38)',
            trick: 'Save As for New Copies, Justify (Ctrl+J) for Clean Margins, Subscript (x₂) Below for CO₂, Superscript (x²) Above for 2³!',
            rhyme: 'New and Save to keep your file,\nCut and Paste to change your style,\nSubscript drops for CO₂ in line,\nSuperscript raises 2³ so fine!\nAlign Left, Center, Right in view,\nCtrl+J makes book margins true!',
            audioText: 'Here is your official Grade 8 ICT memory trick for Word Processing! Remember: L is Left, R is Right, E is Center, and J is Justify for textbook borders! Subscript places the two down low for C O 2, while Superscript raises the power three high for two cubed! Save updates your document, and Save As makes a fresh copy!'
          },
          si: {
            concept: '8 ශ්‍රේණිය වදන් සැකසුම (පෙළපොත පිටු 34–38)',
            trick: 'අලුත් පිටපත් වලට Save As, පුවත්පත් පෙළගැස්මට Justify (Ctrl+J), CO₂ සඳහා උපලකුණ Subscript (x₂), 2³ සඳහා උඩුලකුණ Superscript (x²)!',
            rhyme: 'Save As මඟින් අලුත් පිටපතක් හදමු,\nCtrl+J යොදා දෙපසම පෙළගස්වමු!\nCO₂ සූත්‍රයට Subscript පහළට,\n2³ බලයට Superscript ඉහළට!',
            audioText: 'වදන් සැකසුම පිළිබඳ කෙටි මතක සටහන මෙන්න! L කියන්නේ වමට, R කියන්නේ දකුණට, E කියන්නේ මැදට, සහ J කියන්නේ Justify දෙපසම පෙළගැස්වීමටයි! රසායන සූත්‍ර වලට Subscript ද, ගණිත දර්ශක සඳහා Superscript ද මතක තබාගන්න!'
          },
          ta: {
            concept: 'தரம் 8 சொல் செயலாக்கம் (பாடநூல் பக். 34–38)',
            trick: 'புதிய நகல்களுக்கு Save As, புத்தக சீரமைப்புக்கு Justify (Ctrl+J), CO₂ க்கு Subscript (x₂), 2³ க்கு Superscript (x²)!',
            rhyme: 'புதிய நகலுக்கு Save As செய்வோம்,\nஇருபுற சீரமைப்புக்கு Ctrl+J சேர்ப்போம்!\nCO₂ க்கு Subscript கீழே இறங்கும்,\n2³ அடுக்குக்கு Superscript மேலே உயரும்!',
            audioText: 'சொல் செயலாக்கத்தை நினைவில் கொள்வதற்கான வழி இதோ! Ctrl+L இடது சீரமைப்பு, Ctrl+R வலது சீரமைப்பு, Ctrl+J இருபுற சீரமைப்பு! CO2 க்கு Subscript இனைப் பயன்படுத்துங்கள், கணித அடுக்குகளுக்கு Superscript இனைப் பயன்படுத்துங்கள்!'
          }
        }
      },
      suggestedFollowUps: [
        'Explain simpler: Can you explain word processing in simpler terms for a beginner?',
        'Sri Lankan Example: How to format an English Day invitation card',
        'Memory trick: Rhyme for word processing shortcuts',
        'Quiz me on word processing'
      ]
    };
  }

  private handleWordProcessingSimpler(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const enAnswer = `### Super Simple Version: Word Processing Explained!

Think of a word processor like a **magic digital typewriter**:

1. **No Eraser Smudges!**
   If you make a typo, you don't need correction fluid or an eraser. Just tap **Backspace** or press **Undo (Ctrl+Z)** and the mistake vanishes!

2. **Why do textbooks use "Justify" (Ctrl+J)?**
   Imagine building a neat brick wall. If the left side is straight but the right side has jagged, sticking-out bricks, it looks messy.
   **Justify** gently stretches the spaces between words so the paragraph forms a perfectly straight brick wall on **both** the left and right sides!

3. **Subscript vs. Superscript:**
   - **Subscript ($x_2$):** Like a **Subway train** under the ground 🚇 — it drops the "2" down low for $CO_2$ (carbon dioxide).
   - **Superscript ($x^2$):** Like **Superman** flying high in the sky 🦸 — it lifts the "3" up high for $2^3$ (two cubed = 8)!

4. **Tables:**
   A table is just a clean grid box (like a tic-tac-toe grid) where you can write your Monday-to-Friday school timetable without lines being crooked!`;

    const siAnswer = `### ඉතා සරලව තේරුම් ගනිමු: වදන් සැකසුම!

වදන් සැකසුම් මෘදුකාංගයක් යනු **මැජික් යතුරු ලියනයක්** වැනිය:

1. **මැකීම් පැල්ලම් නැත!**
   අතින් ලියන විට වැරදුණොත් කටු ගෑමට හෝ White-out දැමීමට සිදුවේ. නමුත් මෙහිදී **Backspace** හෝ **Undo (Ctrl+Z)** මඟින් කිසිදු සලකුණක් නොතබා වැරැද්ද ක්ෂණිකව මකා දැමිය හැක!

2. **පෙළපොත් වල "Justify" (Ctrl+J) කරන්නේ ඇයි?**
   ගඩොල් බැම්මක් බඳින විට වම් පැත්ත කෙළින් තබා දකුණු පැත්ත උස් පහත් වුවහොත් එය අපිරිසිදුය. **Justify** මඟින් වචන අතර ඉඩ මදක් සකසා වම් සහ දකුණු දෙපැත්තම එක හා සමාන කෙළින් බැම්මක් සේ සකසයි!

3. **උපලකුණු (Subscript) සහ උඩුලකුණු (Superscript):**
   - **Subscript ($x_2$):** උමං දුම්රියක් (Subway) පොළොව යටින් යනවා සේ අකුර පහළට ගනී ($CO_2$ සඳහා).
   - **Superscript ($x^2$):** සුපර්මෑන් (Superman) අහසේ පියාසර කරනවා සේ අංකය ඉහළට ඔසවයි ($2^3$ සඳහා)!`;

    const taAnswer = `### மிக எளிமையான விளக்கம்: சொல் செயலாக்கம்!

சொல் செயலாக்கம் என்பது ஒரு **மந்திர தட்டச்சு இயந்திரம்** போன்றது:

1. **அழித்தல் கறைகள் இல்லை!**
   எழுதும் போது தவறு ஏற்பட்டால் Backspace அல்லது Undo (Ctrl+Z) மூலம் எந்தக் கறையும் இன்றி உடனே நீக்கலாம்!

2. **Justify ஏன் பயன்படுகிறது?**
   சுவர் கட்டும் போது இருபுறமும் நேராக இருப்பது போல், Justify பந்தியின் இடது மற்றும் வலது இரு ஓரங்களையும் நேர்த்தியாக சமப்படுத்துகிறது!

3. **Subscript vs Superscript:**
   - **Subscript ($x_2$):** பாதாள ரயில் போல எண்ணை கீழே வைக்கும் ($CO_2$).
   - **Superscript ($x^2$):** சூப்பர்மேன் போல எண்ணை மேலே உயர்த்தும் ($2^3$)!`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources: [{ source: 'Grade 8 ICT Basics — Chapter 3 Simplified', pageNumber: 34 }],
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      suggestedFollowUps: [
        'Clarify more: Can you explain the 7 document types in Figure 3.1?',
        'Sri Lankan Example: How to format an English Day invitation card',
        'Memory trick: Rhyme for word processing shortcuts',
        'Quiz me on word processing'
      ]
    };
  }

  private handleWordProcessingExample(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const enAnswer = `**A Real-World Sri Lankan School Example: Organizing the Grade 8 English Day Competitions (Textbook Page 34 Dialogue)**

Here is how Sithum and the Grade 8 English Day Committee used word processing to organize their event:

1. **The Invitation Card (Figure 3.1, Presets):**
   - **Header:** School Crest inserted as a **Picture**, followed by *"Ananda / Visakha Vidyalaya — English Literary Association"* centered in **Cambria 16pt Bold**.
   - **Event Title:** *"Annual Inter-House English Day Competitions"* in decorative **Word Art**.
   - **Date & Venue:** Right-aligned (Ctrl+R): *"Date: 15th October | Venue: Main Auditorium"*.
   - **Invitation Message:** Formatted with **Justify (Ctrl+J)** for elegant formal wording.

2. **The Science & ICT Quiz Question Paper (Activities 3.4 & 3.5):**
   - Writing Question 1: *"What is the greenhouse gas $CO_2$?"* $\\to$ The committee used **Subscript ($x_2$)** for the 2.
   - Writing Question 2: *"Calculate the value of $2^3$."* $\\to$ They used **Superscript ($x^2$)** for the 3.

3. **The Event Schedule Timetable (Textbook Page 37):**
   - Inserted a **Table** with 4 columns: *Time | Event | Participants | Teacher-in-Charge*.
   - Because the schedule was wide, they changed the page orientation to **Landscape** so all columns fit on one sheet!

4. **Saving and Printing (Textbook Page 35):**
   - They saved the master copy using **Save (Ctrl+S)** as \`English_Day_2026.docx\`.
   - Then they used **Save As** to export a read-only \`English_Day_2026.pdf\` to send to the school principal for final approval before printing!`;

    const siAnswer = `**ශ්‍රී ලාංකේය පාසල් ප්‍රායෝගික උදාහරණය: 8 ශ්‍රේණියේ ඉංග්‍රීසි දින තරගාවලිය (පෙළපොතේ 34 පිටුවේ සිතුම්ගේ කතාව)**

1. **ආරාධනා පත්‍රය (රූපය 3.1):**
   - පාසල් ලාංඡනය **Picture** ලෙස ඇතුළත් කර, පාසල් නම **Cambria 16pt Bold** වලින් Center කරන ලදී.
   - ප්‍රධාන මාතෘකාව **Word Art** මඟින්ද, දිනය සහ වේලාව **Align Right (Ctrl+R)** මඟින්ද සකසන ලදී.
   - ආරාධනා ඡේදය මනාව දෙපස සමපාත වන සේ **Justify (Ctrl+J)** කරන ලදී.

2. **ප්‍රශ්න පත්‍රය සැකසීම (ක්‍රියාකාරකම් 3.4 සහ 3.5):**
   - $CO_2$ ලිවීමට **Subscript ($x_2$)** ද, ගණිතමය $2^3$ ලිවීමට **Superscript ($x^2$)** ද භාවිත කළහ.

3. **ඉසව් කාලසටහන (පිටුව 37):**
   - පේළි සහ තීරු සහිත **වගුවක් (Table)** ඇතුළත් කර, පුළුල් ඉඩක් ලබාගැනීමට පිටුව **Landscape** දිශානතියට හරවන ලදී.

4. **සුරැකීම සහ මුද්‍රණය (පිටුව 35):**
   - මුල් ගොනුව **Save (Ctrl+S)** කර, විදුහල්පතිතුමා වෙත ඉදිරිපත් කිරීමට **Save As** මඟින් PDF පිටපතක් ලබාගත්හ!`;

    const taAnswer = `**இலங்கை பாடசாலை நடைமுறை உதாரணம்: தரம் 8 ஆங்கில தின விழா (பாடநூல் பக்கம் 34)**

1. **அழைப்பிதழ் உருவாக்கம் (படம் 3.1):**
   - பாடசாலை இலச்சினை Picture ஆகவும், தலைப்பு Word Art இலும், திகதி Align Right இலும், பந்தி Justify இலும் வடிவமைக்கப்பட்டது.

2. **வினாத்தாள் தயாரிப்பு (பக். 36):**
   - இரசாயன சூத்திரம் $CO_2$ இற்கு Subscript உம், கணித அடுக்கு $2^3$ இற்கு Superscript உம் பயன்படுத்தப்பட்டது.

3. **நிகழ்ச்சி நிரல் (பக். 37):**
   - நிகழ்ச்சி நிரல் Table இல் அமைக்கப்பட்டு, அகலமான அமைப்பிற்காக Landscape தெரிவு செய்யப்பட்டது.

4. **சேமித்தல் (பக். 35):**
   - Save மூலம் சேமித்து, அதிபரின் ஒப்புதலுக்காக Save As மூலம் PDF ஆக மாற்றப்பட்டது!`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources: [{ source: 'Grade 8 ICT Textbook — Practical Dialogue & Activities (Pages 34–38)', pageNumber: 34 }],
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      suggestedFollowUps: [
        'Clarify more: Can you break down the word processing tools step-by-step?',
        'Explain simpler: Why do books use Justify alignment?',
        'Memory trick: Rhyme for word processing shortcuts',
        'Quiz me on word processing'
      ]
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
        audioText: 'Here is your memory trick for Scratch programming! Variables store what changes fast, like your game score! Repeat loops save you from writing the same code again and again!',
        languageVersions: {
          en: {
            concept: 'Scratch Loops & Variables',
            trick: 'Variables store what changes fast, Repeat loops save typing and make code last!',
            rhyme: 'Variables store what changes fast,\nRepeat loops make our programs last!\nCheck the condition, test the clue,\nIf it is true, execute through!',
            audioText: 'Here is your memory trick for Scratch programming! Variables store what changes fast, like your game score! Repeat loops save you from writing the same code again and again!'
          },
          si: {
            concept: 'Scratch හි විචල්‍යයන් සහ පුනරාවර්තන',
            trick: 'වෙනස්වන අගයන් ගබඩා කරන්නේ විචල්‍යයන් තුළයි, නැවත නැවත සිදුවන දේට Repeat loops යොදාගනී!',
            rhyme: 'ලකුණු වැනි දේ විචල්‍යයේ රඳවන්න,\nකේතය කෙටි කර loops භාවිත කරන්න!\nකොන්දේසිය සත්‍ය නම් ඉදිරියට යන්න,\nScratch ක්‍රමලේඛනය පහසුවෙන් ඉගෙනගන්න!',
            audioText: 'Scratch ක්‍රමලේඛනය මතක තබා ගැනීමේ ක්‍රමය මෙන්න! ක්‍රීඩාවේ ලකුණු වැනි නිතර වෙනස් වන දත්ත විචල්‍යයන් වල රඳවන්න. එකම දේ නැවත නැවත ලිවීමෙන් වැළකීමට Repeat loops භාවිත කරන්න!'
          },
          ta: {
            concept: 'Scratch மாறிகள் & சுழற்சிகள்',
            trick: 'மாறும் மதிப்புகளை மாறிகளில் சேமிப்போம், திரும்பத் திரும்பச் செய்ய Repeat சுழற்சிகளைப் பயன்படுத்துவோம்!',
            rhyme: 'மதிப்புகளை மாறிகளில் பத்திரப்படுத்துவோம்,\nசுழற்சிகள் மூலம் நிரல்களைச் சுருக்குவோம்!\nநிபந்தனை சரியாயின் இயக்கிப் பார்ப்போம்,\nScratch நிரலாக்கத்தில் வெற்றி கொள்வோம்!',
            audioText: 'Scratch நிரலாக்கத்திற்கான நினைவுக் குறிப்பு இதோ! அடிக்கடி மாறும் தகவல்களை மாறிகளில் சேமிக்கவும், மீண்டும் மீண்டும் செய்ய வேண்டியவற்றுக்கு Repeat சுழற்சிகளைப் பயன்படுத்தவும்!'
          }
        }
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
        audioText: 'Here is your memory trick for physical computing! Remember: Sensors sense inward as Inputs, while Actuators act outward as Outputs! Like eyes versus hands!',
        languageVersions: {
          en: {
            concept: 'Sensors vs Actuators',
            trick: 'Sensors SENSE in (Input), Actuators ACT out (Output)!',
            rhyme: 'Sensors listen, feel, and see,\nInputs telling what could be!\nActuators move, display, and ring,\nOutputs doing everything!',
            audioText: 'Here is your memory trick for physical computing! Remember: Sensors sense inward as Inputs, while Actuators act outward as Outputs! Like eyes versus hands!'
          },
          si: {
            concept: 'සංවේදක (Sensors) සහ ක්‍රියාකරවන (Actuators)',
            trick: 'සංවේදක සංවේදනය කර ඇතුළට ගනී (ආදාන), ක්‍රියාකරවන ක්‍රියාත්මක වී එළියට දෙයි (ප්‍රතිදාන)!',
            rhyme: 'පරිසරය මනින සංවේදක ආදාන,\nමෝටර් බසර ලයිට් ක්‍රියාකරවන ප්‍රතිදාන!\nඇස හා කන වගේ සංවේදක දැනගන්න,\nඅත් පා වගේ ක්‍රියාකරවන හඳුනාගන්න!',
            audioText: 'භෞතික පරිගණනය මතක තබා ගැනීමේ ක්‍රමය මෙන්න! සංවේදක පරිසරය සංවේදනය කර ආදානයක් ලෙස දත්ත ලබාදෙයි. ක්‍රියාකරවන මඟින් බසර් හෝ මෝටර් ක්‍රියාත්මක කර ප්‍රතිදානය පෙන්වයි! අපේ ඇස් වගේ ආදාන, අත් වගේ ප්‍රතිදාන!'
          },
          ta: {
            concept: 'உணரிகள் vs இயங்கிகள்',
            trick: 'உணரிகள் உணர்ந்து உள்ளே எடுக்கும் (உள்ளீடு), இயங்கிகள் இயங்கி வெளியே தரும் (வெளியீடு)!',
            rhyme: 'உணரிகள் சூழலை உணரும் உள்ளீடு,\nஇயங்கிகள் காரியம் செய்யும் வெளியீடு!\nகண்கள் காதுகள் உணரிக்கு உதாரணம்,\nகைகள் கால்கள் இயங்கிக்கு காரணம்!',
            audioText: 'பௌதீகக் கணினியியல் நினைவுக் குறிப்பு இதோ! உணரிகள் சூழலை உணர்ந்து உள்ளீடாகச் செலுத்துகின்றன, இயங்கிகள் விளைவுகளை வெளியீடாகத் தருகின்றன!'
          }
        }
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
        audioText: 'Here is your memory trick for the Internet! HTTPS keeps your passwords safe with encryption! And always remember to use Bcc when sending emails to groups so nobody\'s email is exposed!',
        languageVersions: {
          en: {
            concept: 'URL Anatomy & Email Bcc',
            trick: 'HTTPS is the lock, .lk is our rock! And Blind Carbon Copy (Bcc) hides email addresses for privacy!',
            rhyme: 'HTTPS keeps secrets safe,\nDot LK is our country\'s place!\nSend with Bcc to friends,\nTheir private email it defends!',
            audioText: 'Here is your memory trick for the Internet! HTTPS keeps your passwords safe with encryption! And always remember to use Bcc when sending emails to groups so nobody\'s email is exposed!'
          },
          si: {
            concept: 'URL ව්‍යුහය සහ ඊමේල් Bcc රහස්‍යතාව',
            trick: 'HTTPS අගුල ආරක්ෂාව සපයයි, dot lk අපේ රටේ ඩොමේනයයි! Bcc මඟින් අන් අයගේ ඊමේල් ලිපින ආරක්ෂා කරයි!',
            rhyme: 'HTTPS මඟින් දත්ත රහසිගත වේ,\ndot lk අපේ ලංකාවේ වසම වේ!\nBcc දමා යවන විට ලිපි සැමට,\nලිපින නොපෙනෙයි කිසිවෙකුගේ ඇසට!',
            audioText: 'අන්තර්ජාලය පිළිබඳ මතක සටහන මෙන්න! HTTPS මඟින් ඔබගේ මුරපද ආරක්ෂිතව සම්ප්‍රේෂණය කරයි. කණ්ඩායම් වලට ඊමේල් යවන විට Bcc භාවිත කිරීමෙන් සියලු දෙනාගේ පෞද්ගලිකත්වය ආරක්ෂා වේ!'
          },
          ta: {
            concept: 'இணைய URL மற்றும் மின்னஞ்சல் Bcc',
            trick: 'HTTPS பாதுகாப்பானது, dot lk நமது நாட்டின் டொமைன்! Bcc பிறர் மின்னஞ்சல் முகவரிகளைப் பாதுகாக்கும்!',
            rhyme: 'HTTPS தகவலைப் பாதுகாக்கும் நெறிமுறை,\ndot lk நமது நாட்டின் இணைய எல்லை!\nBcc மூலம் மின்னஞ்சல் அனுப்புவோம்,\nஅனைவரின் தனிமனித பாதுகாப்பை உறுதிசெய்வோம்!',
            audioText: 'இணைய பயன்பாட்டுக்கான நினைவுக் குறிப்பு இதோ! HTTPS உங்கள் கடவுச்சொற்களைப் பாதுகாக்கிறது. மின்னஞ்சல் அனுப்பும்போது முகவரிகளை மறைக்க Bcc இனைப் பயன்படுத்துங்கள்!'
          }
        }
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
        audioText: 'Here is your memory trick for Sri Lankan history! King Parakramabahu the Great declared: Not even a single drop of rain water must flow into the ocean without being of use to mankind! Remember the Bisokotuwa regulates the pressure, and Parakrama Samudraya catches every drop!',
        languageVersions: {
          en: {
            concept: 'Parakramabahu & Water Conservation',
            trick: 'Every rain drop counts! Bisokotuwa controls water pressure, Parakrama Samudra stores it all!',
            rhyme: 'Not a single drop of rain,\nShall reach the ocean all in vain!\nBisokotuwa calms the water\'s might,\nFeeding golden fields with ancient light!',
            audioText: 'Here is your memory trick for Sri Lankan history! King Parakramabahu the Great declared: Not even a single drop of rain water must flow into the ocean without being of use to mankind! Remember the Bisokotuwa regulates the pressure, and Parakrama Samudraya catches every drop!'
          },
          si: {
            concept: 'මහා පරාක්‍රමබාහු රජු සහ වාරි තාක්ෂණය',
            trick: 'අහසින් වැටෙන කිසිදු දිය බිඳක් අපතේ නොයවන්න! බිසෝකොටුව පීඩනය පාලනය කරද්දී, පරාක්‍රම සමුද්‍රය ජලය රඳවා තබයි!',
            rhyme: 'අහසින් වැටෙන එක දිය බිඳකුදු නොහැර,\nමුහුදට නොයවා රැකගමු සැමවර!\nබිසෝකොටුවෙන් පීඩනය බිඳ හෙලලා,\nකෙත්බිම් සරු කළා අටුකොටු පුරවාලා!',
            audioText: 'ශ්‍රී ලංකා ඉතිහාසය පිළිබඳ මතක සටහන මෙන්න! මහා පරාක්‍රමබාහු රජතුමා පැවසුවේ, අහසින් වැටෙන එකදු දිය බිඳක්වත් මිනිසාගේ ප්‍රයෝජනයට නොගෙන මුහුදට ගලා යාමට ඉඩ නොතැබිය යුතු බවයි! බිසෝකොටුව ජල පීඩනය පාලනය කර වැව් බැම්ම ආරක්ෂා කළා!'
          },
          ta: {
            concept: 'பராக்கிரமபாகு மன்னன் & நீர்ப்பாசன நுட்பம்',
            trick: 'மழைத்துளி எதுவும் வீணாகக் கூடாது! பிசோகொட்டுவ நீர் அழுத்தத்தைக் கட்டுப்படுத்தும், பராக்கிரம சமுத்திரம் நீரைச் சேமிக்கும்!',
            rhyme: 'வானத்து மழைத்துளி வீணாகக் கடலுக்குப் போகாமல்,\nமனிதனின் பயனுக்குத் தடுத்து நிறுத்துவோம்!\nபிசோகொட்டுவ நீரின் வேகத்தைக் கட்டுப்படுத்தும்,\nபராக்கிரம சமுத்திரம் நாடு முழுதும் செழிக்கச் செய்யும்!',
            audioText: 'இலங்கை வரலாற்றிற்கான நினைவுக் குறிப்பு இதோ! மகா பராக்கிரமபாகு மன்னன் வானிலிருந்து விழும் ஒரு துளி நீரும் வீணாக கடலை அடையக்கூடாது என்றார். பிசோகொட்டுவ அணைக்கட்டின் அழுத்தத்தைக் கட்டுப்படுத்துகிறது!'
          }
        }
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
    if (context.topicId === 'word-processing') {
      return this.handleWordProcessing(lang);
    }

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
