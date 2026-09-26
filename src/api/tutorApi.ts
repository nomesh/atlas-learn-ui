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
      imageUrl: context.imageUrl,
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
 * Helper to parse quadratic equations from student input:
 * Matches "x^2 + 5x + 6 = 0", "2x^2 - 4x - 6 = 0", "x² + 5x + 6", "how to find x below: x^2 +5x+6=0", etc.
 */
export function parseQuadratic(text: string): { a: number; b: number; c: number; rawEquation: string } | null {
  if (!text) return null;
  // Normalize powers, minus signs, and spaces
  const normalized = text
    .replace(/x²/gi, 'x^2')
    .replace(/[\u2212\u2013\u2014]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

  // Pattern 1: [a]x^2 + [b]x + [c] = 0
  const regexStandard = /([+-]?\s*\d*)\s*x\^2\s*([+-]\s*\d*)\s*x\s*([+-]\s*\d+)\s*=\s*0/i;
  const match = normalized.match(regexStandard);
  if (match) {
    const aStr = match[1].replace(/\s+/g, '');
    const bStr = match[2].replace(/\s+/g, '');
    const cStr = match[3].replace(/\s+/g, '');

    const a = aStr === '' || aStr === '+' ? 1 : aStr === '-' ? -1 : parseInt(aStr, 10);
    const b = bStr === '' || bStr === '+' ? 1 : bStr === '-' ? -1 : parseInt(bStr, 10);
    const c = parseInt(cStr, 10);

    if (!isNaN(a) && !isNaN(b) && !isNaN(c) && a !== 0) {
      return { a, b, c, rawEquation: match[0].replace(/\s+/g, ' ') };
    }
  }

  // Pattern 2: [a]x^2 + [b]x + [c] without "= 0"
  const regexExpr = /([+-]?\s*\d*)\s*x\^2\s*([+-]\s*\d*)\s*x\s*([+-]\s*\d+)/i;
  const matchExpr = normalized.match(regexExpr);
  if (matchExpr) {
    const aStr = matchExpr[1].replace(/\s+/g, '');
    const bStr = matchExpr[2].replace(/\s+/g, '');
    const cStr = matchExpr[3].replace(/\s+/g, '');

    const a = aStr === '' || aStr === '+' ? 1 : aStr === '-' ? -1 : parseInt(aStr, 10);
    const b = bStr === '' || bStr === '+' ? 1 : bStr === '-' ? -1 : parseInt(bStr, 10);
    const c = parseInt(cStr, 10);

    if (!isNaN(a) && !isNaN(b) && !isNaN(c) && a !== 0) {
      return { a, b, c, rawEquation: `${matchExpr[0].replace(/\s+/g, ' ')} = 0` };
    }
  }

  // Pattern 3: Pure quadratic difference of squares: "x^2 - 9 = 0"
  const regexDiff = /([+-]?\s*\d*)\s*x\^2\s*-\s*(\d+)\s*(?:=\s*0)?/i;
  const matchDiff = normalized.match(regexDiff);
  if (matchDiff) {
    const aStr = matchDiff[1].replace(/\s+/g, '');
    const a = aStr === '' || aStr === '+' ? 1 : aStr === '-' ? -1 : parseInt(aStr, 10);
    const c = -parseInt(matchDiff[2], 10);
    if (!isNaN(a) && !isNaN(c) && a !== 0) {
      return { a, b: 0, c, rawEquation: `${matchDiff[0].replace(/\s+/g, ' ')} = 0` };
    }
  }

  return null;
}

/**
 * Helper to parse Pythagoras questions involving Triangle ABC:
 * Matches "how to find AC if AB=3 and BC=4", "triangle ABC with right angle at B", etc.
 */
export function parsePythagoras(text: string): { ab: number; bc: number; ac: number | null; target: 'AC' | 'AB' | 'BC' } | null {
  if (!text) return null;
  const lower = text.toLowerCase().replace(/[\u2212\u2013\u2014]/g, '-').replace(/\s+/g, ' ');

  // Pattern: AB=3 and BC=4
  const matchAB_BC = lower.match(/ab\s*=\s*(\d+(?:\.\d+)?).*?bc\s*=\s*(\d+(?:\.\d+)?)/i)
    || lower.match(/bc\s*=\s*(\d+(?:\.\d+)?).*?ab\s*=\s*(\d+(?:\.\d+)?)/i);

  if (matchAB_BC) {
    const ab = parseFloat(matchAB_BC[1]);
    const bc = parseFloat(matchAB_BC[2]);
    return { ab, bc, ac: null, target: 'AC' };
  }

  // Pattern: AC=5 and BC=4, find AB
  const matchAC_BC = lower.match(/ac\s*=\s*(\d+(?:\.\d+)?).*?bc\s*=\s*(\d+(?:\.\d+)?)/i)
    || lower.match(/bc\s*=\s*(\d+(?:\.\d+)?).*?ac\s*=\s*(\d+(?:\.\d+)?)/i);

  if (matchAC_BC) {
    const ac = parseFloat(matchAC_BC[1]);
    const bc = parseFloat(matchAC_BC[2]);
    return { ab: 0, bc, ac, target: 'AB' };
  }

  // Generic query about triangle ABC hypotenuse AC
  if (
    (lower.includes('pythagor') || lower.includes('triangle') || lower.includes('ත්‍රිකෝණ') || lower.includes('முக்கோண')) &&
    (lower.includes('ac') || lower.includes('hypotenuse') || lower.includes('කර්ණ') || lower.includes('செம்பக்கம்') || lower.includes('right angle abc'))
  ) {
    return { ab: 3, bc: 4, ac: null, target: 'AC' };
  }

  return null;
}

/**
 * Helper to determine whether a student query is an open-ended generic invitation
 * (e.g. "teach me", "overview", "what are we learning", "start lesson")
 * where curriculum context/topicId should supply the lesson opening,
 * versus a specific concept query that must be answered directly.
 */
export function isGenericContextualPrompt(text: string): boolean {
  if (!text) return true;
  const trimmed = text.trim().toLowerCase();
  if (trimmed.length === 0) return true;
  const genericPhrases = [
    'teach me',
    'start',
    'start lesson',
    'help',
    'help me',
    'explain',
    'explain this',
    'explain this topic',
    'what is this topic',
    'what is this chapter about',
    'overview',
    'summary',
    'notes',
    'give me notes',
    'curriculum overview',
    'පාඩම පටන් ගන්න',
    'කියා දෙන්න',
    'විස්තර කරන්න',
    'ආරම්භ කරන්න',
    'සාරාංශය',
    'கற்பிக்கவும்',
    'தொடங்கவும்',
    'விளக்கவும்',
    'சுருக்கம்'
  ];
  return genericPhrases.some((p) => trimmed === p || trimmed === `${p}?` || trimmed === `${p}.`);
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

    // 0. Image / Screenshot question analysis
    if (context.imageUrl) {
      return this.handleImageQuestion(question, context.imageUrl, lang, context);
    }

    // 0b. Quadratic Equation problem solver (e.g. "how to find x below: x^2 +5x+6=0")
    const quadCoeffs = parseQuadratic(question);
    if (quadCoeffs) {
      return this.solveQuadraticStepByStep(quadCoeffs.a, quadCoeffs.b, quadCoeffs.c, lang, quadCoeffs.rawEquation, question);
    }

    // 0c. Pythagoras Theorem on Triangle ABC (e.g. "how to find length of AC if AB=3 and BC=4")
    const pythData = parsePythagoras(question);
    if (pythData) {
      return this.solvePythagorasStepByStep(pythData.ab, pythData.bc, pythData.ac, lang, pythData.target);
    }

    // 0d. Chemical Bonding (e.g. "chemical bond", "ionic bond", "covalent bond", "NaCl", "H2O")
    if (
      lowerQ.includes('chemical bond') ||
      lowerQ.includes('ionic bond') ||
      lowerQ.includes('covalent bond') ||
      lowerQ.includes('molecular bond') ||
      lowerQ.includes('electron shar') ||
      lowerQ.includes('electron transfer') ||
      lowerQ.includes('nacl') ||
      lowerQ.includes('h2o') ||
      lowerQ.includes('බන්ධන') ||
      lowerQ.includes('අයනික බන්ධන') ||
      lowerQ.includes('සහසංයුජ') ||
      lowerQ.includes('பிணைப்பு')
    ) {
      return this.handleChemicalBonding(question, lang);
    }

    // 1. Check if asking about a subject whose curriculum materials are pending ingestion (e.g. English, Geography)
    const isEnglish = context.subjectId === 'english' || lowerQ.includes('english') || lowerQ.includes('ඉංග්‍රීසි') || lowerQ.includes('ஆங்கிலம்');
    const isGeography = context.subjectId === 'geography' || lowerQ.includes('geography') || lowerQ.includes('භූගෝල') || lowerQ.includes('புவியியல்');

    if (isEnglish || isGeography) {
      return this.handlePendingSubjectIngestion(question, lang, context, isEnglish ? 'english' : 'geography');
    }

    // 2. Specific Question Answering across History, Mathematics, Science, and ICT
    // (Always prioritize the student's actual question query content over background topicId context)

    // Quick pedagogical interaction prompts
    if (lowerQ.includes('clarify') || lowerQ.includes('break this down') || lowerQ.includes('more detail') || lowerQ.includes('තවදුරටත්') || lowerQ.includes('විස්තර කරන්න') || lowerQ.includes('விளக்குங்கள்')) {
      return this.handleClarifyExplanation(lang, context);
    }
    if (lowerQ.includes('again') || lowerQ.includes('නැවත') || lowerQ.includes('repeat') || lowerQ.includes('மீண்டும்')) {
      return this.handleRepeatExplanation(lang);
    }
    if (lowerQ.includes('easier') || lowerQ.includes('simpler') || lowerQ.includes('සරල') || lowerQ.includes('எளிதாக')) {
      return this.handleSimplerExplanation(lang, context);
    }
    if (lowerQ.includes('example') || lowerQ.includes('උදාහරණ') || lowerQ.includes('உதாரணம்')) {
      return this.handleExample(lang, context);
    }
    if (lowerQ.includes('quiz') || lowerQ.includes('ප්‍රශ්න') || lowerQ.includes('வினாடி வினா')) {
      return this.handleQuizPrompt(lang);
    }

    // =========================================================================
    // HISTORY CHAPTERS (Grade 10 Sri Lankan National Curriculum)
    // =========================================================================

    // Chapter 3: Evolution of Political Power (Parumaka, Gamika, Aya, Raja)
    if (
      lowerQ.includes('parumaka') ||
      lowerQ.includes('පරුමක') ||
      lowerQ.includes('gamika') ||
      lowerQ.includes('ගාමික') ||
      lowerQ.includes('gamani') ||
      lowerQ.includes('ගාමිණී') ||
      lowerQ.includes('political power') ||
      lowerQ.includes('දේශපාලන බලය') ||
      lowerQ.includes('dutaka') ||
      lowerQ.includes('දූතක') ||
      lowerQ.includes('පරුමකලු') ||
      lowerQ.includes('பருமக')
    ) {
      return this.handlePoliticalPower(lang, question);
    }

    // Chapter 1: Inscriptions & Sources of Studying History (Sellipi / Shilalipi)
    if (
      lowerQ.includes('sellipi') ||
      lowerQ.includes('සෙල්ලිපි') ||
      lowerQ.includes('ශිලා ලේඛන') ||
      lowerQ.includes('inscription') ||
      lowerQ.includes('inscriptions') ||
      lowerQ.includes('brahmi') ||
      lowerQ.includes('බ්‍රාහ්මී') ||
      lowerQ.includes('epigraphy') ||
      lowerQ.includes('கல்வெட்டு') ||
      lowerQ.includes('ගල්පොත') ||
      lowerQ.includes('පනාකඩුව') ||
      lowerQ.includes('ලෙන් ලිපි') ||
      lowerQ.includes('ටැම් ලිපි') ||
      lowerQ.includes('පුවරු ලිපි') ||
      lowerQ.includes('ආසන ලිපි') ||
      lowerQ.includes('කටාරම') ||
      lowerQ.includes('archaeological source') ||
      lowerQ.includes('පුරාවිද්‍යාත්මක මූලාශ්‍ර')
    ) {
      return this.handleSellipi(lang);
    }

    // Chapter 2: Ancient Settlements (Pre-historic, Proto-historic, Ibbankatuwa)
    if (
      lowerQ.includes('settlement') ||
      lowerQ.includes('ජනාවාස') ||
      lowerQ.includes('ibbankatuwa') ||
      lowerQ.includes('ඉබ්බන්කටුව') ||
      lowerQ.includes('bellanbandi') ||
      lowerQ.includes('බෙල්ලන්බැඳි') ||
      lowerQ.includes('fa-hien') ||
      lowerQ.includes('පාහියන්ගල') ||
      lowerQ.includes('proto-historic') ||
      lowerQ.includes('පූර්ව ඓතිහාසික') ||
      lowerQ.includes('ප්‍රාග් ඓතිහාසික') ||
      lowerQ.includes('குடியேற்றங்கள்')
    ) {
      return this.handleAncientSettlements(lang, question);
    }

    // Chapter 4: Ancient Society of Sri Lanka
    if (
      lowerQ.includes('ancient society') ||
      lowerQ.includes('පුරාණ සමාජය') ||
      lowerQ.includes('කුල ක්‍රමය') ||
      lowerQ.includes('ගම් සභා') ||
      lowerQ.includes('பண்டைய சமூகம்')
    ) {
      return this.handleAncientSociety(lang, question);
    }

    // Chapter 5: Ancient Science & Technology / Hydraulic Civilization
    if (
      lowerQ.includes('bisokotuwa') ||
      lowerQ.includes('බිසෝකොටුව') ||
      lowerQ.includes('hydraulic') ||
      lowerQ.includes('වාරි') ||
      lowerQ.includes('sluice') ||
      lowerQ.includes('ralapanawa') ||
      lowerQ.includes('රළපනාව') ||
      lowerQ.includes('yoda ela') ||
      lowerQ.includes('යෝධ ඇළ') ||
      lowerQ.includes('samanalawewa') ||
      lowerQ.includes('සමනලවැව')
    ) {
      return this.handleAncientScienceAndTech(lang, question);
    }

    // Chapter 7: Decline of Dry Zone Cities & South West Kingdoms
    if (
      lowerQ.includes('decline of dry zone') ||
      lowerQ.includes('වියළි කලාපයේ නගර පරිහානිය') ||
      lowerQ.includes('dambadeniya') ||
      lowerQ.includes('දඹදෙණිය') ||
      lowerQ.includes('yapahuwa') ||
      lowerQ.includes('යාපහුව') ||
      lowerQ.includes('kurunegala') ||
      lowerQ.includes('කුරුණෑගල') ||
      lowerQ.includes('gampola') ||
      lowerQ.includes('ගම්පොළ') ||
      lowerQ.includes('kotte') ||
      lowerQ.includes('කෝට්ටේ')
    ) {
      return this.handleSouthWestKingdoms(lang, question);
    }

    // Chapter 8: Kandyan Kingdom (Vimaladharmasuriya I, Danture, Gannoruwa)
    if (
      lowerQ.includes('kandyan') ||
      lowerQ.includes('උඩරට') ||
      lowerQ.includes('vimaladharmasuriya') ||
      lowerQ.includes('විමලධර්මසූරිය') ||
      lowerQ.includes('danture') ||
      lowerQ.includes('දන්තුරේ') ||
      lowerQ.includes('gannoruwa') ||
      lowerQ.includes('ගන්නෝරුව') ||
      lowerQ.includes('robert knox') ||
      lowerQ.includes('රොබට් නොක්ස්') ||
      lowerQ.includes('கண்டி')
    ) {
      return this.handleKandyanKingdom(lang, question);
    }

    // Chapter 9: Renaissance
    if (
      lowerQ.includes('renaissance') ||
      lowerQ.includes('පුනරුදය') ||
      lowerQ.includes('da vinci') ||
      lowerQ.includes('ඩා වින්චි') ||
      lowerQ.includes('gutenberg') ||
      lowerQ.includes('ගුටෙන්බර්ග්') ||
      lowerQ.includes('மறுமலர்ச்சி')
    ) {
      return this.handleRenaissance(lang, question);
    }

    // Chapter 10: Western World (Portuguese 1505, Dutch 1658, British)
    if (
      lowerQ.includes('western world') ||
      lowerQ.includes('බටහිර ලෝකය') ||
      lowerQ.includes('portuguese') ||
      lowerQ.includes('පෘතුගීසි') ||
      lowerQ.includes('dutch') ||
      lowerQ.includes('ලන්දේසි') ||
      lowerQ.includes('almeida') ||
      lowerQ.includes('අල්මේදා') ||
      lowerQ.includes('பரிங்கி')
    ) {
      return this.handleWesternWorld(lang, question);
    }

    // Famous Sri Lankan Monarchs & Chronicles
    if (
      lowerQ.includes('parakramabahu') ||
      lowerQ.includes('පරාක්‍රමබාහු') ||
      lowerQ.includes('dutugemunu') ||
      lowerQ.includes('දුටුගැමුණු') ||
      lowerQ.includes('devanampiyatissa') ||
      lowerQ.includes('දේවානම්පියතිස්ස') ||
      lowerQ.includes('elara') ||
      lowerQ.includes('එළාර') ||
      lowerQ.includes('mahavamsa') ||
      lowerQ.includes('මහාවංශ') ||
      lowerQ.includes('deepavamsa') ||
      lowerQ.includes('දීපවංශ') ||
      lowerQ.includes('dhatusena') ||
      lowerQ.includes('ධාතුසේන') ||
      lowerQ.includes('samudraya') ||
      lowerQ.includes('polonnaruwa') ||
      lowerQ.includes('පොළොන්නරු') ||
      lowerQ.includes('பராக்கிரம')
    ) {
      return this.handleHistoricalMonarchs(lang, question);
    }

    // =========================================================================
    // MATHEMATICS CHAPTERS (Grade 10 Sri Lankan National Curriculum)
    // =========================================================================

    // Chapter 18: Loci and Constructions
    if (
      lowerQ.includes('loci') ||
      lowerQ.includes('locus') ||
      lowerQ.includes('construction') ||
      lowerQ.includes('construct') ||
      lowerQ.includes('four basic loci') ||
      lowerQ.includes('perpendicular bisector') ||
      lowerQ.includes('angle bisector') ||
      lowerQ.includes('පථ') ||
      lowerQ.includes('නිර්මාණ') ||
      lowerQ.includes('කෝණ සමච්ඡේදක') ||
      lowerQ.includes('ලම්භ සමච්ඡේදක') ||
      lowerQ.includes('ஒழுக்கு')
    ) {
      return this.handleLociAndConstructions(lang, question);
    }

    // Chapters 15 & 17: Circle Theorems (Chords, Tangents, Angles)
    if (
      lowerQ.includes('circle theorem') ||
      lowerQ.includes('chord') ||
      lowerQ.includes('tangent') ||
      lowerQ.includes('cyclic quadrilateral') ||
      lowerQ.includes('subtended angle') ||
      lowerQ.includes('semicircle') ||
      lowerQ.includes('කෝඩ') ||
      lowerQ.includes('ස්පර්ශක') ||
      lowerQ.includes('වෘත්ත') ||
      lowerQ.includes('වෘත්ත චතුරස්‍ර') ||
      lowerQ.includes('வட்டம்') ||
      lowerQ.includes('நாண்') ||
      lowerQ.includes('தொடுகோடு')
    ) {
      return this.handleCircleTheorems(lang, question);
    }

    // Chapter 5: Simultaneous Equations
    if (
      lowerQ.includes('simultaneous') ||
      lowerQ.includes('elimination method') ||
      lowerQ.includes('substitution method') ||
      lowerQ.includes('සමගාමී') ||
      lowerQ.includes('ஒருங்கமை')
    ) {
      return this.handleSimultaneousEquations(lang, question);
    }

    // Chapter 3: Indices & Logarithms
    if (
      lowerQ.includes('indices') ||
      lowerQ.includes('logarithm') ||
      lowerQ.includes('log rules') ||
      lowerQ.includes('laws of indices') ||
      lowerQ.includes('දර්ශක') ||
      lowerQ.includes('ලඝුගණක') ||
      lowerQ.includes('சுட்டி') ||
      lowerQ.includes('மடக்கை')
    ) {
      return this.handleIndicesAndLogarithms(lang, question);
    }

    // Chapter 6: Angles of Polygons
    if (
      lowerQ.includes('polygon') ||
      lowerQ.includes('interior angle') ||
      lowerQ.includes('exterior angle') ||
      lowerQ.includes('regular polygon') ||
      lowerQ.includes('බහුඅස්‍ර') ||
      lowerQ.includes('පංචාස්‍ර') ||
      lowerQ.includes('ෂඩාස්‍ර') ||
      lowerQ.includes('பல்கோணி')
    ) {
      return this.handleAnglesOfPolygons(lang, question);
    }

    // Chapters 9 & 10: Surface Area and Volume
    if (
      lowerQ.includes('surface area') ||
      lowerQ.includes('cylinder') ||
      lowerQ.includes('prism') ||
      (lowerQ.includes('volume') && !lowerQ.includes('audio')) ||
      lowerQ.includes('පෘෂ්ඨ වර්ගඵලය') ||
      lowerQ.includes('පරිමාව') ||
      lowerQ.includes('සිලින්ඩර') ||
      lowerQ.includes('உருளை') ||
      lowerQ.includes('கனவளவு')
    ) {
      return this.handleSurfaceAreaAndVolume(lang, question);
    }

    // Chapter 13: Triangle Congruence
    if (
      lowerQ.includes('congruen') ||
      lowerQ.includes('අංගසම') ||
      lowerQ.includes('ஒருங்கமைவு')
    ) {
      return this.handleTriangleCongruence(lang, question);
    }

    // Chapter 22: Probability
    if (
      lowerQ.includes('probability') ||
      lowerQ.includes('tree diagram') ||
      lowerQ.includes('sample space') ||
      lowerQ.includes('dice') ||
      lowerQ.includes('coin toss') ||
      lowerQ.includes('සම්භාවිතාව') ||
      lowerQ.includes('රුක් සටහන්') ||
      lowerQ.includes('නියැදි අවකාශය') ||
      lowerQ.includes('நிகழ்தகவு')
    ) {
      return this.handleProbability(lang, question);
    }

    // Chapter 8: Pythagoras
    if (
      lowerQ.includes('pythagoras') ||
      lowerQ.includes('hypotenuse') ||
      lowerQ.includes('right triangle') ||
      lowerQ.includes('පයිතගරස්') ||
      lowerQ.includes('කර්ණය') ||
      lowerQ.includes('பைதகரசு')
    ) {
      return this.handlePythagoras(lang, context);
    }

    // Chapter 14: Quadratic Equations (Conceptual)
    if (
      lowerQ.includes('quadratic') ||
      lowerQ.includes('factoriz') ||
      lowerQ.includes('parabola') ||
      lowerQ.includes('roots') ||
      lowerQ.includes('ax^2') ||
      lowerQ.includes('වර්ගජ') ||
      lowerQ.includes('මූල') ||
      lowerQ.includes('இருபடி')
    ) {
      return this.solveQuadraticStepByStep(1, 5, 6, lang, 'x^2 + 5x + 6 = 0', question);
    }

    // Generic math arithmetic / expression
    if (/[0-9]/.test(lowerQ) && (/[-+*/=]/.test(lowerQ) || lowerQ.includes('solve') || lowerQ.includes('calculate') || lowerQ.includes('find x') || lowerQ.includes('විසඳන්න') || lowerQ.includes('අගය'))) {
      return this.solveGenericMathStepByStep(question, lang, context);
    }

    // =========================================================================
    // SCIENCE CHAPTERS (Grade 10 Sri Lankan National Curriculum)
    // =========================================================================

    // Chapter 1: Chemical basis of life
    if (
      lowerQ.includes('chemical basis') ||
      lowerQ.includes('biomolecule') ||
      lowerQ.includes('carbohydrate') ||
      lowerQ.includes('monosaccharide') ||
      lowerQ.includes('disaccharide') ||
      lowerQ.includes('polysaccharide') ||
      lowerQ.includes('amino acid') ||
      lowerQ.includes('nucleic acid') ||
      lowerQ.includes('රසායනික පදනම') ||
      lowerQ.includes('ජෛව අණු') ||
      lowerQ.includes('කාබෝහයිඩ්‍රේට') ||
      lowerQ.includes('ප්‍රෝටීන') ||
      lowerQ.includes('ලිපිඩ') ||
      lowerQ.includes('இரசாயன அடிப்படை') ||
      lowerQ.includes('காபோவைதரேற்று') ||
      lowerQ.includes('புரதம்')
    ) {
      return this.handleChemicalBasisOfLife(lang);
    }

    // Chapter 4: Newton's laws of motion
    if (
      lowerQ.includes('newton') ||
      lowerQ.includes('f=ma') ||
      lowerQ.includes('inertia') ||
      lowerQ.includes('action and reaction') ||
      lowerQ.includes('momentum') ||
      lowerQ.includes('නිව්ටන්') ||
      lowerQ.includes('චලිත නියම') ||
      lowerQ.includes('අවස්ථිතිය') ||
      lowerQ.includes('ගම්‍යතාව') ||
      lowerQ.includes('நியூட்டன்') ||
      lowerQ.includes('இயக்க விதி')
    ) {
      return this.handleNewtonsLaws(lang);
    }

    // Chapter 6: Plant and Animal Cells
    if (
      lowerQ.includes('plant cell') ||
      lowerQ.includes('animal cell') ||
      lowerQ.includes('organelle') ||
      lowerQ.includes('mitochondria') ||
      lowerQ.includes('chloroplast') ||
      lowerQ.includes('vacuole') ||
      lowerQ.includes('ශාක සෛල') ||
      lowerQ.includes('සත්ත්ව සෛල') ||
      lowerQ.includes('ඉන්ද්‍රයිකා') ||
      lowerQ.includes('මයිටොකොන්ඩ්‍රියා') ||
      lowerQ.includes('தாவர கலம்') ||
      lowerQ.includes('விலங்கு கலம்') ||
      lowerQ.includes('நுண்ணுறுப்பு')
    ) {
      return this.handlePlantAnimalCells(lang);
    }

    // Chapter 15: Hydrostatic pressure
    if (
      lowerQ.includes('hydrostatic') ||
      lowerQ.includes('liquid pressure') ||
      lowerQ.includes('pascal') ||
      lowerQ.includes('hydraulic press') ||
      lowerQ.includes('archimedes') ||
      lowerQ.includes('upthrust') ||
      lowerQ.includes('ද්‍රවස්ථිතික') ||
      lowerQ.includes('පැස්කල්') ||
      lowerQ.includes('හයිඩ්‍රොලික්') ||
      lowerQ.includes('ආකිමිඩීස්') ||
      lowerQ.includes('උඩුකුරු තෙරපුම') ||
      lowerQ.includes('திரவநிலையியல்') ||
      lowerQ.includes('பாஸ்கல்')
    ) {
      return this.handleHydrostaticPressure(lang);
    }

    // Chapter 17: Rate of Reactions
    if (
      lowerQ.includes('rate of reaction') ||
      lowerQ.includes('reaction rate') ||
      lowerQ.includes('collision theory') ||
      lowerQ.includes('activation energy') ||
      lowerQ.includes('catalyst') ||
      lowerQ.includes('ප්‍රතික්‍රියා සීඝ්‍රතාව') ||
      lowerQ.includes('ගැටුම් වාදය') ||
      lowerQ.includes('සක්‍රියන ශක්තිය') ||
      lowerQ.includes('උත්ප්‍රේරක') ||
      lowerQ.includes('තාපය හා සීඝ්‍රතාව') ||
      lowerQ.includes('සාන්ද්‍රණය හා සීඝ්‍රතාව') ||
      lowerQ.includes('පෘෂ්ඨික වර්ගඵලය') ||
      lowerQ.includes('තාපාවශෝෂක') ||
      lowerQ.includes('තාපදායක') ||
      lowerQ.includes('தாக்க வீதம்') ||
      lowerQ.includes('மோதல் கொள்கை') ||
      lowerQ.includes('தூண்டுவிசை')
    ) {
      return this.handleRateOfReactions(question, lang);
    }

    // Chapter 2: Motion in a straight line
    if (
      lowerQ.includes('motion in a straight line') ||
      lowerQ.includes('displacement') ||
      lowerQ.includes('velocity') ||
      lowerQ.includes('acceleration') ||
      lowerQ.includes('equations of motion') ||
      lowerQ.includes('velocity-time graph') ||
      lowerQ.includes('සරල රේඛීය චලිතය') ||
      lowerQ.includes('විස්ථාපනය') ||
      lowerQ.includes('ප්‍රවේගය') ||
      lowerQ.includes('ත්වරණය') ||
      lowerQ.includes('මන්දනය') ||
      lowerQ.includes('நேர்கோட்டு இயக்கம்') ||
      lowerQ.includes('இடப்பெயர்ச்சி') ||
      lowerQ.includes('திசைவேகம்') ||
      lowerQ.includes('ஆர்முடுகல்')
    ) {
      return this.handleMotionInAStraightLine(lang);
    }

    // Chapter 19: Current electricity
    if (
      lowerQ.includes('current electricity') ||
      lowerQ.includes('electric current') ||
      lowerQ.includes('ohm\'s law') ||
      lowerQ.includes('ohms law') ||
      lowerQ.includes('resistance') ||
      lowerQ.includes('voltmeter') ||
      lowerQ.includes('ammeter') ||
      lowerQ.includes('circuit') ||
      lowerQ.includes('ධාරා විද්‍යුතය') ||
      lowerQ.includes('ඕම්ගේ නියමය') ||
      lowerQ.includes('ප්‍රතිරෝධය') ||
      lowerQ.includes('වෝල්ටීයතාව') ||
      lowerQ.includes('மின்னோட்டவியல்') ||
      lowerQ.includes('ஓமின் விதி') ||
      lowerQ.includes('மின்தடை')
    ) {
      return this.handleCurrentElectricity(lang);
    }

    // Photosynthesis & Plant biology
    if (
      lowerQ.includes('photosynthesis') ||
      lowerQ.includes('chlorophyll') ||
      lowerQ.includes('stomata') ||
      lowerQ.includes('light reaction') ||
      lowerQ.includes('dark reaction') ||
      lowerQ.includes('ප්‍රභාසංස්ලේෂණය') ||
      lowerQ.includes('හරිතප්‍රද') ||
      lowerQ.includes('ஒளித்தொகுப்பு')
    ) {
      return this.handlePhotosynthesis(lang);
    }

    // =========================================================================
    // ICT CHAPTERS (Grade 8–10 Sri Lankan National Curriculum)
    // =========================================================================

    // Chapter 3: Word Processing
    if (
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
      return this.handleWordProcessing(lang);
    }

    // Chapter 1: Number Systems
    if (
      lowerQ.includes('number system') ||
      lowerQ.includes('binary') ||
      lowerQ.includes('decimal') ||
      lowerQ.includes('switch') ||
      lowerQ.includes('transistor') ||
      lowerQ.includes('base 2') ||
      lowerQ.includes('base 10') ||
      lowerQ.includes('ද්විමය') ||
      lowerQ.includes('දශමය') ||
      lowerQ.includes('සංඛ්‍යා පද්ධති') ||
      lowerQ.includes('இரும') ||
      lowerQ.includes('எண் முறை')
    ) {
      return this.handleNumberSystems(lang);
    }

    // Chapter 2: Configuring & Formatting a Computer
    if (
      lowerQ.includes('desktop') ||
      lowerQ.includes('customiz') ||
      lowerQ.includes('display') ||
      lowerQ.includes('resolution') ||
      lowerQ.includes('disk format') ||
      lowerQ.includes('keyboard') ||
      lowerQ.includes('screen') ||
      lowerQ.includes('වින්‍යාස') ||
      lowerQ.includes('හැඩසවි') ||
      lowerQ.includes('විභේදනය') ||
      lowerQ.includes('යතුරුපුවරු') ||
      lowerQ.includes('உள்ளமை') ||
      lowerQ.includes('தெளிவுத்திறன்')
    ) {
      return this.handleConfiguringComputer(lang);
    }

    // Chapter 4: Programming (Scratch)
    if (
      lowerQ.includes('scratch') ||
      lowerQ.includes('programm') ||
      lowerQ.includes('sprite') ||
      lowerQ.includes('variable') ||
      lowerQ.includes('loop') ||
      lowerQ.includes('repeat') ||
      lowerQ.includes('if-then') ||
      lowerQ.includes('ක්‍රමලේඛන') ||
      lowerQ.includes('විචල්‍ය') ||
      lowerQ.includes('ස්ප්‍රයිට්') ||
      lowerQ.includes('நிரலாக்கம்') ||
      lowerQ.includes('மாறி')
    ) {
      return this.handleProgramming(lang);
    }

    // Chapter 5: Physical Computing
    if (
      lowerQ.includes('physical computing') ||
      lowerQ.includes('microbit') ||
      lowerQ.includes('micro:bit') ||
      lowerQ.includes('arduino') ||
      lowerQ.includes('sensor') ||
      lowerQ.includes('actuator') ||
      lowerQ.includes('ldr') ||
      lowerQ.includes('buzzer') ||
      lowerQ.includes('භෞතික පරිගණන') ||
      lowerQ.includes('සංවේදක') ||
      lowerQ.includes('ක්‍රියාකරවන') ||
      lowerQ.includes('பௌதீகக் கணினியியல்') ||
      lowerQ.includes('உணரி')
    ) {
      return this.handlePhysicalComputing(lang);
    }

    // Chapter 6: Internet & Email
    if (
      lowerQ.includes('internet') ||
      lowerQ.includes('url') ||
      lowerQ.includes('email') ||
      lowerQ.includes('bcc') ||
      lowerQ.includes('cc') ||
      lowerQ.includes('browser') ||
      lowerQ.includes('cyber') ||
      lowerQ.includes('phishing') ||
      lowerQ.includes('අන්තර්ජාල') ||
      lowerQ.includes('විද්‍යුත් තැපෑල') ||
      lowerQ.includes('இணையம்') ||
      lowerQ.includes('மின்னஞ்சல்')
    ) {
      return this.handleInternet(lang);
    }

    // =========================================================================
    // 3. CONTEXTUAL / TOPIC DISPATCH (ONLY if prompt is open-ended or generic)
    // =========================================================================
    if (isGenericContextualPrompt(lowerQ)) {
      // History topic context
      if (context.topicId === 'history-gr10-political-power') return this.handlePoliticalPower(lang, question);
      if (context.topicId === 'history-gr10-sources' || context.topicId === 'history-gr10-ancient-heritage') return this.handleSellipi(lang);
      if (context.topicId === 'history-gr10-settlements') return this.handleAncientSettlements(lang, question);
      if (context.topicId === 'history-gr10-ancient-society') return this.handleAncientSociety(lang, question);
      if (context.topicId === 'history-gr10-science-tech') return this.handleAncientScienceAndTech(lang, question);
      if (context.topicId === 'history-gr10-decline-new-kingdoms') return this.handleSouthWestKingdoms(lang, question);
      if (context.topicId === 'history-gr10-kandyan-kingdom') return this.handleKandyanKingdom(lang, question);
      if (context.topicId === 'history-gr10-renaissance') return this.handleRenaissance(lang, question);
      if (context.topicId === 'history-gr10-western-world') return this.handleWesternWorld(lang, question);

      // Maths topic context
      if (context.topicId === 'maths-gr10-ch18-loci-and-constructions' || context.topicId?.includes('loci')) return this.handleLociAndConstructions(lang, question);
      if (context.topicId === 'maths-gr10-ch15-chords' || context.topicId === 'maths-gr10-ch17-tangents') return this.handleCircleTheorems(lang, question);
      if (context.topicId === 'maths-gr10-ch05-simultaneous-equations') return this.handleSimultaneousEquations(lang, question);
      if (context.topicId === 'maths-gr10-ch03-indices-logarithms') return this.handleIndicesAndLogarithms(lang, question);
      if (context.topicId === 'maths-gr10-ch06-polygons') return this.handleAnglesOfPolygons(lang, question);
      if (context.topicId === 'maths-gr10-ch09-surface-area' || context.topicId === 'maths-gr10-ch10-volume') return this.handleSurfaceAreaAndVolume(lang, question);
      if (context.topicId === 'maths-gr10-ch13-congruence') return this.handleTriangleCongruence(lang, question);
      if (context.topicId === 'maths-gr10-ch22-probability') return this.handleProbability(lang, question);
      if (context.topicId === 'maths-gr10-ch08-pythagoras' || context.topicId?.includes('pythagoras')) return this.handlePythagoras(lang, context);
      if (context.topicId === 'maths-gr10-ch14-quadratic-equations') return this.solveQuadraticStepByStep(1, 5, 6, lang, 'x^2 + 5x + 6 = 0', question);

      // Science topic context
      if (context.topicId === 'science-gr10-ch1-chemical-basis') return this.handleChemicalBasisOfLife(lang);
      if (context.topicId === 'science-gr10-ch2-motion') return this.handleMotionInAStraightLine(lang);
      if (context.topicId === 'science-gr10-ch4-newtons-laws') return this.handleNewtonsLaws(lang);
      if (context.topicId === 'science-gr10-ch6-cells') return this.handlePlantAnimalCells(lang);
      if (context.topicId === 'science-gr10-ch15-hydrostatic-pressure') return this.handleHydrostaticPressure(lang);
      if (context.topicId === 'science-gr10-ch17-rate-of-reactions') return this.handleRateOfReactions(question, lang);
      if (context.topicId === 'science-gr10-ch19-current-electricity') return this.handleCurrentElectricity(lang);

      // ICT topic context
      if (context.topicId === 'word-processing') return this.handleWordProcessing(lang);
      if (context.topicId === 'number-systems') return this.handleNumberSystems(lang);
      if (context.topicId === 'configuring-computer') return this.handleConfiguringComputer(lang);
      if (context.topicId === 'programming') return this.handleProgramming(lang);
      if (context.topicId === 'physical-computing') return this.handlePhysicalComputing(lang);
      if (context.topicId === 'internet') return this.handleInternet(lang);

      // Generic subject fallbacks
      if (context.subjectId === 'maths') return this.handleMathsGr10(question, lang, context);
      if (context.subjectId === 'history') return this.handleHistory(lang);
      if (context.subjectId === 'science') return this.handleScienceGr10(question, lang);
      if (context.subjectId === 'ict') return this.handleNumberSystems(lang);
    }

    // =========================================================================
    // 4. DYNAMIC CURRICULUM QUERY (Fallback for any other syllabus question)
    // =========================================================================
    return this.handleDynamicCurriculumQuery(question, lang, context);
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

  private handleScienceGr10(question: string, lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-science-gr10-part1',
        source: 'Grade 10 Science Textbook Part I (Educational Publications Department Sri Lanka)',
        fileType: 'PDF',
        pageNumber: 1,
        chunkNumber: 1,
        distance: 0.12,
        excerpt: null,
      },
      {
        documentId: 'moe-lk-science-gr10-part2',
        source: 'Grade 10 Science Textbook Part II (Educational Publications Department Sri Lanka)',
        fileType: 'PDF',
        pageNumber: 1,
        chunkNumber: 1,
        distance: 0.15,
        excerpt: null,
      }
    ];

    if (lang === 'si') {
      return {
        answer: `ඔබගේ විමසීම: **"${question}"**

ස්තූතියි! ඔබගේ **10 ශ්‍රේණිය විද්‍යාව (Science)** නිල විෂය නිර්දේශයේ පරිච්ඡේද 20 ඔස්සේ අපට ඕනෑම සංකල්පයක් සාකච්ඡා කළ හැක:

### 1 කොටස (1–12 පරිච්ඡේද):
1. **1 වන පරිච්ඡේදය: ජීවයේ රසායනික පදනම** (කාබෝහයිඩ්‍රේට, ප්‍රෝටීන, ලිපිඩ, න්‍යෂ්ටික අම්ල)
2. **2 වන පරිච්ඡේදය: සරල රේඛීය චලිතය** (විස්ථාපනය, ප්‍රවේගය, ත්වරණය, චලිත ප්‍රස්ථාර)
3. **3 වන පරිච්ඡේදය: පදාර්ථයේ ව්‍යුහය** (පරමාණු, ඉලෙක්ට්‍රෝන වින්‍යාසය, ආවර්තිතා වගුව)
4. **4 වන පරිච්ඡේදය: නිව්ටන්ගේ චලිත නියම** (අවස්ථිතිය, $F = ma$, ක්‍රියාව හා ප්‍රතික්‍රියාව)
5. **5 වන පරිච්ඡේදය: ඝර්ෂණය** (ස්ථිතික, සීමාකාරී හා චාලක ඝර්ෂණය)
6. **6 වන පරිච්ඡේදය: ශාක හා සත්ත්ව සෛල** (සෛල ඉන්ද්‍රයිකා, න්‍යෂ්ටිය, මයිටොකොන්ඩ්‍රියා)
7. **7 වන පරිච්ඡේදය: මූලද්‍රව්‍ය හා සංයෝග ප්‍රමාණනය** (මවුල සංකල්පය, ඇවගාඩ්රෝ නියතය)
8. **8 වන පරිච්ඡේදය: ජීවීන්ගේ ලක්ෂණ** (පෝෂණය, ශ්වසනය, ප්‍රජනනය)
9. **9 වන පරිච්ඡේදය: සම්ප්‍රයුක්ත බලය** (බල ත්‍රිකෝණ නියමය, බල විභේදනය)
10. **10 වන පරිච්ඡේදය: රසායනික බන්ධන** (අයනික, සහසංයුජ හා ලෝහක බන්ධන)
11. **11 වන පරිච්ඡේදය: බලයක භ්‍රමණ ඵලය** (බල ඝූර්ණය, ලීවර)
12. **12 වන පරිච්ඡේදය: බල සමතුලිතතාව** (ගුරුත්ව කේන්ද්‍රය, ස්ථායීතාව)

### 2 කොටස (13–20 පරිච්ඡේද):
13. **13 වන පරිච්ඡේදය: ජීවීන් වර්ගීකරණය** (පංච රාජධානි, ද්විපද යතුරු)
14. **14 වන පරිච්ඡේදය: ජීවයේ අඛණ්ඩතාව** (සෛල බෙදීම, අනුනනය, ඌනනය)
15. **15 වන පරිච්ඡේදය: ද්‍රවස්ථිතික පීඩනය හා එහි යෙදීම්** ($P = h\\rho g$, පැස්කල් මූලධර්මය)
16. **16 වන පරිච්ඡේදය: පදාර්ථයේ වෙනස්වීම්** (භෞතික හා රසායනික වෙනස්වීම්)
17. **17 වන පරිච්ඡේදය: ප්‍රතික්‍රියා සීඝ්‍රතාව** (ගැටුම් වාදය, බලපාන සාධක)
18. **18 වන පරිච්ඡේදය: කාර්යය, ශක්තිය සහ ජවය** ($W = Fs$, චාලක හා විභව ශක්තිය)
19. **19 වන පරිච්ඡේදය: ධාරා විද්‍යුතය** (ඕම්ගේ නියමය $V = IR$, ප්‍රතිරෝධක පරිපථ)
20. **20 වන පරිච්ඡේදය: පාරම්පරිකතාව** (මෙන්ඩල්ගේ නියම, ඇලීල, DNA)

ඔබට සාකච්ඡා කිරීමට අවශ්‍ය මාතෘකාව හෝ පරිච්ඡේදය තෝරන්න!`,
        sources,
        suggestedFollowUps: [
          'ජීවයේ රසායනික පදනම: කාබෝහයිඩ්‍රේට සහ ප්‍රෝටීන',
          'නිව්ටන්ගේ චලිත නියම 3 සහ උදාහරණ',
          'ශාක සහ සත්ත්ව සෛල අතර වෙනස්කම්',
          'ද්‍රවස්ථිතික පීඩනය: P = hρg සූත්‍රය'
        ],
      };
    }

    if (lang === 'ta') {
      return {
        answer: `உங்கள் கேள்வி: **"${question}"**

நன்றி! உங்கள் **தரம் 10 அறிவியல் (Science)** தேசிய பாடத்திட்டத்தின் 20 அத்தியாயங்கள் (பாகம் 1 & 2):

### பகுதி I (அத்தியாயங்கள் 1–12):
1. **அத்தியாயம் 1: வாழ்க்கையின் இரசாயன அடிப்படை** (உயிரியல் மூலக்கூறுகள்: காபோவைதரேற்று, புரதங்கள், லிப்பிட்டுகள்)
2. **அத்தியாயம் 2: நேர்கோட்டு இயக்கம்** (இடப்பெயர்ச்சி, வேகம், ஆர்முடுகல், வரைபுகள்)
3. **அத்தியாயம் 3: சடப்பொருளின் கட்டமைப்பு** (அணுக்கள், இலத்திரன் கட்டமைப்பு, ஆவர்த்தன அட்டவணை)
4. **அத்தியாயம் 4: நியூட்டனின் இயக்க விதிகள்** (சடத்துவம், $F = ma$, தாக்கம்-மறுதாக்கம்)
5. **அத்தியாயம் 5: உராய்வு** (நிலையான, எல்லை, இயக்க உராய்வு)
6. **அத்தியாயம் 6: தாவர மற்றும் விலங்கு கலங்கள்** (நுண்ணுறுப்புகள், கரு, இழைமணி)
7. **அத்தியாயம் 7: மூலகங்கள் மற்றும் சேர்வைகளின் அளவறிதல்** (மூல் எண்ணக்கரு, மூலர் திணிவு)
8. **அத்தியாயம் 8: உயிரினங்களின் சிறப்பியல்புகள்** (போசணை, சுவாசம், கழிவகற்றல்)
9. **அத்தியாயம் 9: விளையுள் விசை** (விசை முக்கோண விதி)
10. **அத்தியாயம் 10: இரசாயனப் பிணைப்புகள்** (அயன், பங்கீட்டு, உலோகப் பிணைப்புகள்)
11. **அத்தியாயம் 11: விசையின் திருப்ப விளைவு** (திருப்பம், நெம்புகோல்)
12. **அத்தியாயம் 12: விசைகளின் சமநிலை** (ஈர்ப்பு மையம், நிலைத்தன்மை)

### பகுதி II (அத்தியாயங்கள் 13–20):
13. **அத்தியாயம் 13: உயிரினங்களின் வகைப்பாடு** (ஐந்து இராச்சியங்கள், இருகூற்றுச் சாவிகள்)
14. **அத்தியாயம் 14: வாழ்க்கையின் தொடர்ச்சி** (கலப்பிரிவு: இழையுருப்பிரிவு, ஒடுக்கற்பிரிவு)
15. **அத்தியாயம் 15: திரவநிலையியல் அமுக்கமும் பயன்பாடுகளும்** ($P = h\\rho g$, பாஸ்கல் தத்துவம்)
16. **அத்தியாயம் 16: சடப்பொருளில் ஏற்படும் மாற்றங்கள்** (பௌதீக, இரசாயன மாற்றங்கள்)
17. **அத்தியாயம் 17: தாக்க வீதம்** (மோதுகைத் கொள்கை, பாதிக்கும் காரணிகள்)
18. **அத்தியாயம் 18: வேலை, சக்தி மற்றும் வலு** ($W = Fs$, இயக்க சக்தி, அழுத்த சக்தி)
19. **அத்தியாயம் 19: மின்னோட்டம்** (ஓமின் விதி $V = IR$, தொடர்-சமாந்தர சுற்றுகள்)
20. **அத்தியாயம் 20: பரம்பரையியல்** (மெண்டலின் விதிகள், பரம்பரையலகுகள், DNA)

எந்த அத்தியாயம் பற்றிப் பேச விரும்புகிறீர்கள்?`,
        sources,
        suggestedFollowUps: [
          'வாழ்க்கையின் இரசாயன அடிப்படை: உயிரியல் மூலக்கூறுகள்',
          'நியூட்டனின் 3 இயக்க விதிகள்',
          'தாவர மற்றும் விலங்கு கலங்கள் வேறுபாடு',
          'திரவ அமுக்கம்: P = hρg சூத்திரம்'
        ],
      };
    }

    return {
      answer: `Regarding your inquiry: **"${question}"**

I am ready to guide you across your official **Grade 10 Science** national curriculum textbook (Parts I & II, 20 Chapters):

### Part I (Chapters 1–12):
1. **Chapter 1: Chemical basis of life** (Biomolecules: carbohydrates, proteins, lipids, nucleic acids, water)
2. **Chapter 2: Motion in a straight line** (Displacement, velocity, acceleration, ticker-timer, motion graphs)
3. **Chapter 3: Structure of matter** (Atoms, subatomic particles, electron configuration, periodic table)
4. **Chapter 4: Newton's laws of motion** (Inertia, $F = ma$, action and reaction, momentum)
5. **Chapter 5: Friction** (Static, limiting, dynamic friction, laws of friction, reducing friction)
6. **Chapter 6: Plant and animal cells** (Light microscope, organelles, nucleus, mitochondria, chloroplasts)
7. **Chapter 7: Quantification of elements and compounds** (Mole concept, molar mass, Avogadro constant)
8. **Chapter 8: Characteristics of organisms** (Nutrition, respiration, excretion, irritability, reproduction)
9. **Chapter 9: Resultant force** (Parallel forces, forces at angles, triangle law of forces)
10. **Chapter 10: Chemical bonds** (Ionic, covalent, polar covalent, and metallic bonding)
11. **Chapter 11: Turning effect of a force** (Moments, principle of moments, levers, couple of forces)
12. **Chapter 12: Equilibrium of forces** (Center of gravity, conditions for equilibrium, stability)

### Part II (Chapters 13–20):
13. **Chapter 13: Classification of organisms** (Five kingdom classification, dichotomous keys)
14. **Chapter 14: Continuity of life** (Cell division: mitosis & meiosis, human reproductive system)
15. **Chapter 15: Hydrostatic pressure and its applications** ($P = h\\rho g$, Pascal's principle, hydraulic press)
16. **Chapter 16: Changes in matter** (Physical vs chemical changes, exothermic and endothermic reactions)
17. **Chapter 17: Rate of reactions** (Collision theory, factors affecting rates: temperature, catalyst)
18. **Chapter 18: Work, energy and power** ($W = Fs$, kinetic & potential energy, $P = W/t$)
19. **Chapter 19: Current electricity** (Ohm's law $V = IR$, series and parallel circuits)
20. **Chapter 20: Inheritance** (Gregor Mendel's experiments, alleles, chromosomes, DNA)

Which chapter or topic would you like to explore together?`,
      sources,
      suggestedFollowUps: [
        'Chemical basis of life: Carbohydrates & Proteins',
        'Newton\'s 3 Laws of Motion with real-world examples',
        'Plant vs Animal Cells comparison',
        'Hydrostatic Pressure: P = hρg formula calculation'
      ],
    };
  }

  private handleChemicalBasisOfLife(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-science-gr10-part1',
        source: 'Grade 10 Science Textbook Part I — Chapter 1: Chemical Basis of Life (Pages 1–22)',
        fileType: 'PDF',
        pageNumber: 3,
        chunkNumber: 8,
        distance: 0.11,
        excerpt: null,
      },
      {
        documentId: 'moe-lk-science-gr10-part1',
        source: 'Grade 10 Science Textbook Part I — Food Tests & Biomolecules (Pages 8–15)',
        fileType: 'PDF',
        pageNumber: 12,
        chunkNumber: 24,
        distance: 0.16,
        excerpt: null,
      }
    ];

    const enAnswer = `**Chemical Basis of Life — Grade 10 Science (Chapter 1, Pages 1–22)**

All living organisms are composed of organic biomolecules synthesized from chemical elements. The four major classes of organic biomolecules are:

### 1. Carbohydrates (Ratio of $H:O = 2:1$):
- **Monosaccharides (Single sugars):** Glucose, Fructose (fruit sugar), Galactose.
- **Disaccharides (Double sugars):**
  - $\\text{Glucose} + \\text{Glucose} = \\text{Maltose}$ (germinating seeds)
  - $\\text{Glucose} + \\text{Fructose} = \\text{Sucrose}$ (cane sugar / table sugar)
  - $\\text{Glucose} + \\text{Galactose} = \\text{Lactose}$ (milk sugar)
- **Polysaccharides:** Starch (plant energy storage), Glycogen (animal liver storage), Cellulose (plant cell walls).
- **Identification:** Benedict's test for reducing sugars (brick-red precipitate 🧱), Iodine test for starch (blue-black color 🔵).

### 2. Proteins:
- Composed of **Amino Acids** linked by peptide bonds (Elements: $C, H, O, N$, sometimes $S$).
- Functions: Structural building blocks (keratin in hair), enzymes (catalysts), antibodies, hemoglobin.
- **Identification:** Biuret test yields a purple/violet color.

### 3. Lipids (Fats & Oils):
- Composed of **Fatty acids + Glycerol** linked by ester bonds ($C, H, O$, with much lower oxygen ratio than carbohydrates).
- Functions: High-density energy storage, thermal insulation, protecting internal organs.
- **Identification:** Sudan III test (red staining) or translucent spot test on paper.

### 4. Nucleic Acids:
- **DNA (Deoxyribonucleic Acid):** Stores genetic blueprint in chromosomes.
- **RNA (Ribonucleic Acid):** Synthesizes proteins.
- Monomer unit: **Nucleotide** (consisting of a pentose sugar, a phosphate group, and a nitrogenous base: A, T, C, G / U).`;

    const siAnswer = `**ජීවයේ රසායනික පදනම — 10 ශ්‍රේණිය විද්‍යාව (1 වන පරිච්ඡේදය, පිටු 1–22)**

සියලුම ජීවීන් රසායනික මූලද්‍රව්‍ය මඟින් සෑදුණු කාබනික ජෛව අණු වලින් සමන්විත වේ. ප්‍රධාන ජෛව අණු කාණ්ඩ 4කි:

### 1. කාබෝහයිඩ්‍රේට ($H:O = 2:1$ අනුපාතය):
- **මොනොසැකරයිඩ (සරල සීනි):** ග්ලූකෝස්, ෆෲක්ටෝස් (පළතුරු සීනි), ගැලැක්ටෝස්.
- **ඩයිසැකරයිඩ (ද්විත්ව සීනි):**
  - $\\text{ග්ලූකෝස්} + \\text{ග්ලූකෝස්} = \\text{මෝල්ටෝස්}$ (පැළවෙන ධාන්‍ය)
  - $\\text{ග්ලූකෝස්} + \\text{ෆෲක්ටෝස්} = \\text{සුක්‍රෝස්}$ (උක් සීනි / ගෘහස්ථ සීනි)
  - $\\text{ග්ලූකෝස්} + \\text{ගැලැක්ටෝස්} = \\text{ලැක්ටෝස්}$ (කිරි සීනි)
- **පොලිසැකරයිඩ:** පිෂ්ටය (ශාක ආහාර ගබඩාව), ග්ලයිකොජන් (සත්ත්ව අක්මාවේ ගබඩාව), සෙලියුලෝස් (ශාක සෛල බිත්ති).
- **හඳුනාගැනීම:** බෙනඩික්ට් පරීක්ෂාව (ගඩොල් රතු අවක්ෂේපය 🧱), අයඩින් පරීක්ෂාව (තද නිල් පැහැය 🔵).

### 2. ප්‍රෝටීන:
- ඇමයිනෝ අම්ල පෙප්ටයිඩ බන්ධන වලින් බැඳී සෑදේ ($C, H, O, N$, ඇතැම් විට $S$).
- කෘත්‍ය: එන්සයිම, හෝමෝන, ප්‍රතිදේහ, හිමොග්ලොබින්, සෛල ව්‍යුහය.
- **හඳුනාගැනීම:** බයියුරෙට් පරීක්ෂාවෙන් දම් පැහැයක් ලැබේ.

### 3. ලිපිඩ (මේද හා තෙල්):
- මේද අම්ල සහ ග්ලිසරෝල් එස්ටර බන්ධන වලින් බැඳී ඇත.
- කෘත්‍ය: සංචිත ශක්තිය, තාප පරිවරණය, අභ්‍යන්තර අවයව ආරක්ෂාව.

### 4. න්‍යෂ්ටික අම්ල:
- **DNA:** පාරම්පරික තොරතුරු ගබඩා කරයි.
- **RNA:** ප්‍රෝටීන සංස්ලේෂණයට උපකාරී වේ.
- තැනුම් ඒකකය: **නියුක්ලියෝටයිඩය** (පෙන්ටෝස් සීනි, පොස්පේට් කාණ්ඩය, නයිට්‍රජනීය භෂ්මය).`;

    const taAnswer = `**வாழ்க்கையின் இரசாயன அடிப்படை — தரம் 10 அறிவியல் (அத்தியாயம் 1, பக். 1–22)**

அனைத்து உயிரினங்களும் இரசாயன மூலகங்களால் உருவான உயிரியல் மூலக்கூறுகளால் ஆனவை. நான்கு முக்கிய பிரிவுகள்:

### 1. காபோவைதரேற்று ($H:O = 2:1$ விகிதம்):
- **ஒற்றைச் சர்க்கரை:** குளுக்கோஸ், பிரக்டோஸ் (பழச் சர்க்கரை), கலக்டோஸ்.
- **இரட்டைச் சர்க்கரை:**
  - $\\text{குளுக்கோஸ்} + \\text{குளுக்கோஸ்} = \\text{மோல்ட்டோஸ்}$
  - $\\text{குளுக்கோஸ்} + \\text{பிரக்டோஸ்} = \\text{சுக்குரோஸ்}$ (கரும்புச் சர்க்கரை)
  - $\\text{குளுக்கோஸ்} + \\text{கலக்டோஸ்} = \\text{லக்ரோஸ்}$ (பால் சர்க்கரை)
- **பல்சர்க்கரை:** மாப்பொருள் (தாவர சேமிப்பு), கிளைக்கோஜன் (விலங்கு கல்லீரல் சேமிப்பு), செல்லுலோஸ்.
- **பரிசோதனைகள்:** பெனடிக்ட் பரிசோதனை (செங்கட்டி சிவப்பு வீழ்படிவு 🧱), அயடீன் பரிசோதனை (கருநீலம் 🔵).

### 2. புரதங்கள்:
- அமினோ அமிலங்கள் பெப்டைடு பிணைப்புகளால் இணைக்கப்பட்டுள்ளன ($C, H, O, N$, சிலவேளைகளில் $S$).
- தொழிற்பாடுகள்: நொதியங்கள், பிறபொருளெதிரிகள், குருதிவளிக்காவி (ஹீமோகுளோபின்).
- **பரிசோதனை:** பையூரெட் பரிசோதனை (ஊதா நிறம்).

### 3. லிப்பிட்டுகள் (கொழுப்புகளும் எண்ணெய்களும்):
- கொழுப்பு அமிலங்களும் கிளிசரோலும் எசுத்தர் பிணைப்புகளால் இணைக்கப்பட்டுள்ளன.

### 4. கரு அமிலங்கள்:
- **DNA:** பரம்பரைத் தகவல்களைச் சேமிக்கிறது.
- **RNA:** புரதத் தொகுப்பில் பங்குபற்றுகிறது.
- கட்டமைப்பு அலகு: **நியூக்ளியோடைடு**.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Carbohydrates: Monosaccharides (Glucose, Fructose, Galactose), Disaccharides (Maltose, Sucrose, Lactose), Polysaccharides (Starch, Cellulose, Glycogen)',
        'Food Tests: Benedict test for reducing sugars (brick-red precipitate), Iodine test for starch (blue-black)',
        'Proteins: Amino acids with peptide bonds, Biuret test (purple/violet)',
        'Lipids: Fatty acids + glycerol, energy reserve and insulation',
        'Nucleic Acids: DNA and RNA composed of nucleotides'
      ],
      memoryTrick: {
        concept: 'Grade 10 Science Biomolecules (Textbook Part 1, p. 1–22)',
        trick: 'Benedict for Brick-red sugar, Iodine turns blue-black for Starch, Biuret turns Purple for Protein!',
        rhyme: 'Glucose + Fructose makes Sucrose sweet,\nGlucose + Glucose makes Maltose neat!\nBenedict warms to a brick-red sight,\nIodine turns starch into blue-black night!',
        audioText: 'Here is your Grade 10 Science memory trick for Biomolecules! Remember: Benedict test turns brick red for reducing sugars, Iodine turns blue black for starch, and Biuret turns purple for proteins! Sucrose is glucose plus fructose, like cane sugar!',
        languageVersions: {
          en: {
            concept: 'Grade 10 Science Biomolecules (Textbook Part 1, p. 1–22)',
            trick: 'Benedict for Brick-red sugar, Iodine turns blue-black for Starch, Biuret turns Purple for Protein!',
            rhyme: 'Glucose + Fructose makes Sucrose sweet,\nGlucose + Glucose makes Maltose neat!\nBenedict warms to a brick-red sight,\nIodine turns starch into blue-black night!',
            audioText: 'Here is your Grade 10 Science memory trick for Biomolecules! Remember: Benedict test turns brick red for reducing sugars, Iodine turns blue black for starch, and Biuret turns purple for proteins! Sucrose is glucose plus fructose, like cane sugar!'
          },
          si: {
            concept: '10 ශ්‍රේණිය ජීවයේ රසායනික පදනම (පෙළපොත පිටු 1–22)',
            trick: 'බෙනඩික්ට් රත් කළ විට ගඩොල් රතු, අයඩින් පිෂ්ටයට නිල් කළු, බයියුරෙට් ප්‍රෝටීනයට දම් පාටයි!',
            rhyme: 'ග්ලූකෝස් සමඟ ෆෲක්ටෝස් එක්වී සුක්‍රෝස් හැදෙයි,\nබෙනඩික්ට් දමා රත්කළ විට ගඩොල් රතු වෙයි!\nපිෂ්ටය හඳුනන්න අයඩින් දම්-නිල් පාට දෙයි,\nබයියුරෙට් දැමූ විට ප්‍රෝටීන දම් පැහැ ගනියි!',
            audioText: 'ජීවයේ රසායනික පදනම මතක තබාගන්නා කෙටි ක්‍රමය මෙන්න! බෙනඩික්ට් පරීක්ෂාවෙන් ගඩොල් රතු අවක්ෂේපයක්, අයඩින් වලින් තද නිල් පාටක් සහ බයියුරෙට් වලින් ප්‍රෝටීන වලට දම් පාටක් ලැබේ!'
          },
          ta: {
            concept: 'தரம் 10 வாழ்க்கையின் இரசாயன அடிப்படை (பாடநூல் பக். 1–22)',
            trick: 'பெனடிக்ட் செங்கட்டி சிவப்பு, மாப்பொருளுக்கு அயடீன் கருநீலம், புரதத்திற்கு பையூரெட் ஊதா!',
            rhyme: 'குளுக்கோஸ் பிரக்டோஸ் சேர்ந்தால் சுக்குரோஸ் இனிக்கும்,\nபெனடிக்ட் சூடாக்கினால் செங்கட்டி சிவப்பாகும்!\nமாப்பொருளைக் கண்டறிய அயடீன் கருநீலமாகும்,\nபுரதத்திற்கு பையூரெட் ஊதா நிறம் காட்டும்!',
            audioText: 'உயிரியல் மூலக்கூறுகளுக்கான நினைவுக்குறிப்பு இதோ! பெனடிக்ட் சோதனை சர்க்கரைக்கு செங்கட்டி சிவப்பு நிறத்தையும், அயடீன் மாப்பொருளுக்கு கருநீல நிறத்தையும், பையூரெட் புரதத்திற்கு ஊதா நிறத்தையும் தரும்!'
          }
        }
      },
      suggestedFollowUps: [
        'How do I perform the Benedict test in the school laboratory?',
        'Difference between DNA and RNA',
        'Functions of water and minerals in the human body',
        'Quiz me on Chemical Basis of Life'
      ],
    };
  }

  private handleNewtonsLaws(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-science-gr10-part1',
        source: 'Grade 10 Science Textbook Part I — Chapter 4: Newton\'s Laws of Motion (Pages 84–97)',
        fileType: 'PDF',
        pageNumber: 85,
        chunkNumber: 154,
        distance: 0.09,
        excerpt: null,
      }
    ];

    const enAnswer = `**Newton's Laws of Motion — Grade 10 Science (Chapter 4, Pages 84–97)**

Sir Isaac Newton formulated three fundamental laws governing how physical bodies move when subjected to forces:

### 1. Newton's First Law of Motion (Law of Inertia):
> "Every object continues in its state of rest or uniform motion in a straight line unless compelled to change that state by an external unbalanced force."
- **Inertia:** The resistance of any physical object to any change in its velocity. Inertia depends directly on **mass** (a fully loaded CTB bus has greater inertia than a bicycle).
- **Application:** Why passengers lean forward when a bus applies sudden brakes (the body wants to keep moving at the earlier velocity).

### 2. Newton's Second Law of Motion:
> "The rate of change of momentum of an object is directly proportional to the applied unbalanced force, and takes place in the direction of the force."
- **Fundamental Formula:**
  $$F = ma$$
  Where:
  - $F$ = Unbalanced force (in Newtons, $\\text{N}$)
  - $m$ = Mass of the object (in kilograms, $\\text{kg}$)
  - $a$ = Acceleration produced (in $\\text{m/s}^2$)
- **Unit Definition:** $1\\text{ N}$ is the force required to give an acceleration of $1\\text{ m/s}^2$ to a mass of $1\\text{ kg}$ ($1\\text{ N} = 1\\text{ kg}\\cdot\\text{m/s}^2$).

### 3. Newton's Third Law of Motion:
> "To every action, there is always an equal and opposite reaction."
- When body A exerts a force on body B (Action), body B simultaneously exerts a force on body A equal in magnitude and opposite in direction (Reaction).
- **Crucial Rule:** Action and reaction forces **never cancel each other out** because they act on **two different bodies**!
- **Examples:**
  - Swimming: Pushing water backward (action) $\\rightarrow$ water pushes swimmer forward (reaction).
  - Rocket Propulsion: High-speed exhaust gases expelled downward $\\rightarrow$ rocket propelled upward into space.`;

    const siAnswer = `**නිව්ටන්ගේ චලිත නියම — 10 ශ්‍රේණිය විද්‍යාව (4 වන පරිච්ඡේදය, පිටු 84–97)**

අයිසැක් නිව්ටන් තුමා විසින් වස්තුවල චලිතය සහ බලය අතර සම්බන්ධය පැහැදිලි කිරීමට නියම තුනක් ඉදිරිපත් කළේය:

### 1. නිව්ටන්ගේ පළමු චලිත නියමය (අවස්ථිති නියමය):
> "අසමතුලිත බාහිර බලයක් නොයෙදෙන තාක් කල්, නිශ්චලව පවතින වස්තුවක් දිගටම නිශ්චලතාවයේද, ඒකාකාර ප්‍රවේගයෙන් සරල රේඛාවක චලනය වන වස්තුවක් දිගටම එම ප්‍රවේගයෙන්මද පවතී."
- **අවස්ථිතිය (Inertia):** වස්තුවක පවතින චලිත තත්ත්වය වෙනස් කිරීමට දක්වන ප්‍රතිරෝධයයි. අවස්ථිතියේ මිණුම **ස්කන්ධයයි**.
- **උදාහරණය:** ධාවනය වන බස් රථයක් හදිසියේ තිරිංග තද කළ විට මගීන් ඉදිරියට නැඹුරු වීම.

### 2. නිව්ටන්ගේ දෙවන චලිත නියමය:
> "වස්තුවක ගම්‍යතාව වෙනස්වීමේ සීඝ්‍රතාව, ඒ මත ක්‍රියාකරන අසමතුලිත බලයට අනුලෝමව සමානුපාතික වන අතර බලය යෙදෙන දිශාවට සිදුවේ."
- **මූලික සූත්‍රය:**
  $$F = ma$$
  (මෙහි $F$ = බලය නිව්ටන් වලින්, $m$ = ස්කන්ධය කිලෝග්‍රෑම් වලින්, $a$ = ත්වරණය $\\text{m/s}^2$ වලින්)

### 3. නිව්ටන්ගේ තෙවන චලිත නියමය:
> "සෑම ක්‍රියාවකටම විශාලත්වයෙන් සමාන දිශාවෙන් ප්‍රතිවිරුද්ධ වූ ප්‍රතික්‍රියාවක් ඇත."
- ක්‍රියා බලය සහ ප්‍රතික්‍රියා බලය **වස්තු දෙකක් මත** ක්‍රියාකරන බැවින් එකිනෙක කැපී නොයයි!
- **උදාහරණ:** පිහිනීමේදී ජලය පසුපසට තල්ලු කිරීම සහ ජලයෙන් පිහිනුම්කරු ඉදිරියට තල්ලු වීම; රොකට්ටුවක් ඉහළට එසවීම.`;

    const taAnswer = `**நியூட்டனின் இயக்க விதிகள் — தரம் 10 அறிவியல் (அத்தியாயம் 4, பக். 84–97)**

ஐசக் நியூட்டன் பொருட்களின் இயக்கத்தையும் விசையையும் விளக்கும் மூன்று விதிகளை உருவாக்கினார்:

### 1. நியூட்டனின் முதலாம் இயக்க விதி (சடத்துவ விதி):
> "புறவிசை ஒன்று தொழிற்படாத வரை எந்தவொரு பொருளும் தனது ஓய்வு நிலையிலோ அல்லது நேர்கோட்டிலான மாறா வேக நிலையிலோ தொடர்ந்து இருக்கும்."
- **சடத்துவம்:** பொருளின் இயக்க நிலையை மாற்ற எதிர்க்கும் பண்பு. சடத்துவத்தின் அளவீடு **திணிவு** ஆகும்.

### 2. நியூட்டனின் இரண்டாம் இயக்க விதி:
> "பொருளொன்றின் உந்த மாற்ற வீதமானது அதன் மீது தொழிற்படும் சமநிலையற்ற விசைக்கு நேர்விகிதசமனாகவும், விசையின் திசையிலும் அமையும்."
- **சூத்திரம்:**
  $$F = ma$$
  ($F$ = விசை $\\text{N}$, $m$ = திணிவு $\\text{kg}$, $a$ = ஆர்முடுகல் $\\text{m/s}^2$).

### 3. நியூட்டனின் மூன்றாம் இயக்க விதி:
> "ஒவ்வொரு தாக்கத்திற்கும் சமனானதும் எதிரானதுமான மறுதாக்கம் உண்டு."
- தாக்கமும் மறுதாக்கமும் **வெவ்வேறு இரு பொருட்கள் மீது** செயல்படுவதால் ஒன்றுக்கொன்று சமனாவதில்லை!
- **உதாரணங்கள்:** நீச்சல் வீரர் நீரைப் பின்னோக்கித் தள்ளுதல், ரொக்கெட் ஏவுதல்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Newton 1st Law: Law of Inertia (mass is measure of inertia)',
        'Newton 2nd Law: F = ma (Force in Newtons, Mass in kg, Acceleration in m/s²)',
        'Newton 3rd Law: Action = -Reaction on two different bodies',
        'Seatbelts protect against Newton 1st law inertia during collisions',
        'Rocket propulsion illustrates Newton 3rd law action and reaction'
      ],
      memoryTrick: {
        concept: 'Newton\'s 3 Laws of Motion (Textbook Part 1, p. 84–97)',
        trick: '1st Law is Stay the same (Inertia), 2nd Law is Push with F = ma, 3rd Law is Equal bounce back (Action-Reaction)!',
        rhyme: 'First Law keeps you moving straight and true,\nSecond Law pushes with F equals m times a for you!\nThird Law pushes back with equal might,\nLike rockets soaring into the starry night!',
        audioText: 'Here is your memory trick for Newton\'s Laws! First: Inertia, things stay at rest or moving. Second: F equals m a, more force gives more acceleration. Third: Action equals reaction, push a wall and it pushes back on you!',
        languageVersions: {
          en: {
            concept: 'Newton\'s 3 Laws of Motion (Textbook Part 1, p. 84–97)',
            trick: '1st Law is Stay the same (Inertia), 2nd Law is Push with F = ma, 3rd Law is Equal bounce back (Action-Reaction)!',
            rhyme: 'First Law keeps you moving straight and true,\nSecond Law pushes with F equals m times a for you!\nThird Law pushes back with equal might,\nLike rockets soaring into the starry night!',
            audioText: 'Here is your memory trick for Newton\'s Laws! First: Inertia, things stay at rest or moving. Second: F equals m a, more force gives more acceleration. Third: Action equals reaction, push a wall and it pushes back on you!'
          },
          si: {
            concept: 'නිව්ටන්ගේ චලිත නියම 3 (පෙළපොත පිටු 84–97)',
            trick: '1 අවස්ථිතිය (එලෙසම සිටීම), 2 බල සූත්‍රය F = ma, 3 ක්‍රියාවට ප්‍රතික්‍රියාව සමානයි!',
            rhyme: 'පළමු නියමයෙන් අවස්ථිතිය කියාදෙයි,\nදෙවන නියමයෙන් F = ma ගෙනදෙයි!\nතෙවන නියමයෙන් සමාන ප්‍රතික්‍රියාවක් ලබයි,\nරොකට්ටුවක් අහසට යවන්නෙත් මේ නියමයම තමයි!',
            audioText: 'නිව්ටන් චලිත නියම මතක තබාගන්නා ක්‍රමය මෙන්න! පළමු නියමය අවස්ථිතියයි. දෙවන නියමය F = ma සූත්‍රයයි. තෙවන නියමය සෑම ක්‍රියාවකටම සමාන හා ප්‍රතිවිරුද්ධ ප්‍රතික්‍රියාවක් ඇති බවයි!'
          },
          ta: {
            concept: 'நியூட்டனின் 3 இயக்க விதிகள் (பாடநூல் பக். 84–97)',
            trick: '1 சடத்துவம், 2 F = ma, 3 தாக்கத்திற்கு சமனான மறுதாக்கம்!',
            rhyme: 'முதல் விதி சடத்துவத்தைக் காட்டும்,\nஇரண்டாம் விதி F = ma சூத்திரம் பூட்டும்!\nமூன்றாம் விதி மறுதாக்கத்தை ஊட்டும்,\nரொக்கெட் மேலே பறந்து வழியைக் காட்டும்!',
            audioText: 'நியூட்டனின் மூன்று விதிகளையும் எளிதில் நினைவில் வையுங்கள்! 1 சடத்துவம். 2 F = ma. 3 ஒவ்வொரு தாக்கத்திற்கும் சமனான மறுதாக்கம் உண்டு!'
          }
        }
      },
      suggestedFollowUps: [
        'Calculate: Find force when mass = 500kg and acceleration = 2 m/s²',
        'Why does a cricket fielder pull hands backward while catching a ball?',
        'Difference between balanced and unbalanced forces',
        'Quiz me on Newton\'s Laws of Motion'
      ],
    };
  }

  private handlePlantAnimalCells(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-science-gr10-part1',
        source: 'Grade 10 Science Textbook Part I — Chapter 6: Plant and Animal Cells (Pages 110–122)',
        fileType: 'PDF',
        pageNumber: 112,
        chunkNumber: 210,
        distance: 0.10,
        excerpt: null,
      }
    ];

    const enAnswer = `**Plant and Animal Cells — Grade 10 Science (Chapter 6, Pages 110–122)**

The cell is the basic structural and functional unit of all living organisms. Under the compound light microscope, plant and animal cells show distinct architectural features:

### Comparison Table:
| Feature | Plant Cell | Animal Cell |
|---|---|---|
| **Cell Wall** | Present (rigid cellulose layer) | Absent (only plasma membrane) |
| **Shape** | Regular, definite shape | Irregular, flexible shape |
| **Chloroplasts** | Present (contain chlorophyll) | Absent |
| **Vacuole** | Large central permanent vacuole | Small, temporary vacuoles |
| **Centrosome** | Absent | Present (centrioles for cell division) |

### Key Organelles & Their Functions:
1. **Plasma Membrane:** Selectively permeable phospholipid bilayer regulating entry and exit of substances.
2. **Nucleus:** Control center housing chromatin (DNA) and nucleolus; regulates growth and reproduction.
3. **Mitochondria:** "Powerhouses of the cell" where cellular aerobic respiration produces ATP energy.
4. **Chloroplasts:** Green plastids carrying out photosynthesis ($6CO_2 + 6H_2O \\rightarrow C_6H_{12}O_6 + 6O_2$).
5. **Ribosomes:** Sites of protein synthesis.
6. **Endoplasmic Reticulum (Rough & Smooth):** Intracellular transport and synthesis of proteins/lipids.`;

    const siAnswer = `**ශාක හා සත්ත්ව සෛල — 10 ශ්‍රේණිය විද්‍යාව (6 වන පරිච්ඡේදය, පිටු 110–122)**

සෛලය යනු ජීවීන්ගේ මූලික ව්‍යුහාත්මක සහ කෘත්‍යාත්මක ඒකකයයි. ආලෝක අන්වීක්ෂය යටතේ ශාක හා සත්ත්ව සෛල අතර පැහැදිලි වෙනස්කම් දක්නට ලැබේ:

### ශාක හා සත්ත්ව සෛල සංසන්දනය:
- **සෛල බිත්තිය:** ශාක සෛලවල ඇත (සෙලියුලෝස් වලින් සැදි දෘඪ ආවරණයකි). සත්ත්ව සෛලවල නොමැත.
- **හැඩය:** ශාක සෛල නිශ්චිත හැඩයක් ගනී. සත්ත්ව සෛල නිශ්චිත හැඩයක් නොගනී.
- **හරිතලව:** ශාක සෛලවල ඇත (ප්‍රභාසංස්ලේෂණය කරයි). සත්ත්ව සෛලවල නොමැත.
- **රික්තකය:** ශාක සෛලවල විශාල මධ්‍ය රික්තකයක් ඇත. සත්ත්ව සෛලවල කුඩා තාවකාලික රික්තක පවතී.
- **තාරකකාය (කේන්ද්‍රදේහ):** සත්ත්ව සෛලවල පමණක් පවතී.

### ප්‍රධාන සෛල ඉන්ද්‍රයිකා:
1. **න්‍යෂ්ටිය:** සෛලයේ ප්‍රධාන පාලන මධ්‍යස්ථානයයි.
2. **මයිටොකොන්ඩ්‍රියා:** සෛලයේ "බලගාරය" වන අතර ස්වායු ශ්වසනයෙන් ATP ශක්තිය නිපදවයි.
3. **ප්ලාස්ම පටලය:** අර්ධ පාරගම්‍ය පටලයක් වන අතර ද්‍රව්‍ය හුවමාරුව පාලනය කරයි.
4. **රයිබොසෝම:** ප්‍රෝටීන සංස්ලේෂණය සිදුකරයි.`;

    const taAnswer = `**தாவர மற்றும் விலங்கு கலங்கள் — தரம் 10 அறிவியல் (அத்தியாயம் 6, பக். 110–122)**

கலம் என்பது உயிரினங்களின் அடிப்படை கட்டமைப்பு மற்றும் தொழிற்பாட்டு அலகாகும்:

### தாவர மற்றும் விலங்கு கலங்கள் ஒப்பீடு:
- **கலச்சுவர்:** தாவர கலத்தில் உண்டு (செல்லுலோஸ்). விலங்கு கலத்தில் இல்லை.
- **வடிவம்:** தாவர கலம் நிலையான வடிவம் கொண்டது. விலங்கு கலம் ஒழுங்கற்ற வடிவம் கொண்டது.
- **பச்சைவுருமணிகள்:** தாவர கலத்தில் உண்டு (ஒளித்தொகுப்பு செய்கிறது). விலங்கு கலத்தில் இல்லை.
- **நுண்குமிழி:** தாவர கலத்தில் பெரிய நிலையான மைய நுண்குமிழி உண்டு. விலங்கு கலத்தில் சிறிய தற்காலிக நுண்குமிழிகள் உண்டு.

### பிரதான நுண்ணுறுப்புகள்:
1. **கரு:** கலத்தின் கட்டுப்பாட்டு மையம்.
2. **இழைமணி:** கலத்தின் "சக்தி நிலையம்" (ATP சக்தி உற்பத்தி).
3. **கலமென்சவ்வு:** பதார்த்தங்களின் போக்குவரத்தைக் கட்டுப்படுத்தும் தேர்ந்து புகவிடும் மென்சவ்வு.
4. **ரைபோசோம்:** புரதத் தொகுப்பு நிகழும் இடம்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      suggestedFollowUps: [
        'Why are mitochondria called the powerhouses of the cell?',
        'Difference between Rough ER and Smooth ER',
        'How to prepare an onion peel slide for microscope observation',
        'Quiz me on Plant and Animal Cells'
      ],
    };
  }

  private handleHydrostaticPressure(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-science-gr10-part2',
        source: 'Grade 10 Science Textbook Part II — Chapter 15: Hydrostatic Pressure (Pages 63–85)',
        fileType: 'PDF',
        pageNumber: 65,
        chunkNumber: 72,
        distance: 0.10,
        excerpt: null,
      }
    ];

    const enAnswer = `**Hydrostatic Pressure and Its Applications — Grade 10 Science (Chapter 15, Pages 63–85)**

Hydrostatic pressure is the pressure exerted by a fluid at equilibrium at any given point within the fluid, due to the force of gravity.

### 1. Liquid Pressure Formula:
$$P = h\\rho g$$
Where:
- $P$ = Liquid pressure (in Pascals, $\\text{Pa}$ or $\\text{N/m}^2$)
- $h$ = Depth below the liquid surface (in meters, $\\text{m}$)
- $\\rho$ = Density of the liquid (in $\\text{kg/m}^3$; for water $\\rho = 1000\\text{ kg/m}^3$)
- $g$ = Acceleration due to gravity (approximately $10\\text{ m/s}^2$ or $9.8\\text{ m/s}^2$)

### Key Properties of Liquid Pressure:
1. Increases directly with **depth** ($h$).
2. Increases directly with **liquid density** (saltwater exerts higher pressure than freshwater).
3. Acts **equally in all directions** at the same depth.
4. Independent of the cross-sectional shape of the container.
5. Why dam walls are built **thicker at the bottom**: to withstand the higher pressure at greater depths!

### 2. Pascal's Principle & The Hydraulic Press:
> "Pressure applied to an enclosed incompressible fluid is transmitted undiminished to every portion of the fluid and the walls of the containing vessel."
$$\\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\implies F_2 = F_1 \\times \\frac{A_2}{A_1}$$
This principle powers car service hydraulic lifts, hydraulic brakes, and JCB excavator arms across Sri Lanka!`;

    const siAnswer = `**ද්‍රවස්ථිතික පීඩනය හා එහි යෙදීම් — 10 ශ්‍රේණිය විද්‍යාව (15 වන පරිච්ඡේදය, පිටු 63–85)**

ද්‍රවයක් නිශ්චලව පවතින විට ගුරුත්වය හේතුවෙන් ඕනෑම ලක්ෂ්‍යයකදී ඇතිකරන පීඩනය ද්‍රවස්ථිතික පීඩනයයි.

### 1. ද්‍රව පීඩන සූත්‍රය:
$$P = h\\rho g$$
(මෙහි $P$ = පීඩනය පැස්කල් වලින්, $h$ = ද්‍රව මට්ටමේ සිට ගැඹුර මීටර වලින්, $\\rho$ = ද්‍රවයේ ඝනත්වය $\\text{kg/m}^3$, $g$ = ගුරුත්වජ ත්වරණය $10\\text{ m/s}^2$)

### ද්‍රව පීඩනයේ ලක්ෂණ:
1. ගැඹුර වැඩිවත්ම පීඩනය වැඩිවේ.
2. ද්‍රවයේ ඝනත්වය වැඩිවත්ම පීඩනය වැඩිවේ.
3. එකම තිරස් මට්ටමේ ඕනෑම ලක්ෂ්‍යයකදී පීඩනය සමාන වන අතර සෑම දිශාවකටම සමානව ක්‍රියාකරයි.
4. **වේලි බැම්ම පත්ල දෙසට ඝනකම් කර තැනීමට හේතුව:** පතුල දෙසට ගැඹුර වැඩි නිසා අධික පීඩනයට ඔරොත්තු දීම සඳහාය.

### 2. පැස්කල්ගේ මූලධර්මය (හයිඩ්‍රොලික් මුද්‍රණාලය):
> "සංවෘත බඳුනක ඇති නිශ්චල තරලයක ලක්ෂ්‍යයකට යොදන පීඩනය වෙනසකින් තොරව තරලය පුරා සෑම දිශාවකටම සම්ප්‍රේෂණය වේ."
- වාහන සේවා ස්ථානවල වාහන එසවීමට, හයිඩ්‍රොලික් තිරිංග සහ JCB යන්ත්‍ර සඳහා මෙය යොදාගනී.`;

    const taAnswer = `**திரவநிலையியல் அமுக்கமும் அதன் பயன்பாடுகளும் — தரம் 10 அறிவியல் (அத்தியாயம் 15, பக். 63–85)**

ஈர்ப்பு விசையின் காரணமாக ஒரு திரவத்தினால் அதன் ஒரு புள்ளியில் செலுத்தப்படும் அமுக்கம் திரவ அமுக்கம் ஆகும்.

### 1. திரவ அமுக்கச் சூத்திரம்:
$$P = h\\rho g$$
($P$ = அமுக்கம் பாஸ்கல் $\\text{Pa}$, $h$ = ஆழம் $\\text{m}$, $\\rho$ = அடர்த்தி $\\text{kg/m}^3$, $g$ = ஈர்ப்பு ஆர்முடுகல் $10\\text{ m/s}^2$).

### 2. பாஸ்கல் தத்துவம் (நீரியல் அழுத்தி):
> "மூடிய பாத்திரத்திலுள்ள அமுக்க முடியாத திரவத்தின் ஒரு பகுதிக்கு வழங்கப்படும் அமுக்கமானது குறையாமல் அனைத்துப் பகுதிகளுக்கும் கடத்தப்படும்."
- வாகன சேவை நிலையங்களில் வாகனங்களை உயர்த்தவும், நீரியல் பிரேக்குகளுக்கும் பயன்படுகிறது.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      suggestedFollowUps: [
        'Why are reservoir dam walls made thicker at the base?',
        'Calculate water pressure at 10m depth (density = 1000 kg/m³, g = 10 m/s²)',
        'Explain Pascal\'s principle in car hydraulic brakes',
        'Quiz me on Hydrostatic Pressure'
      ],
    };
  }

  private handleRateOfReactions(question: string, lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-science-gr10-part2',
        source: 'Grade 10 Science Textbook Part II — Chapter 17: Rate of Reactions (Pages 115–124)',
        fileType: 'PDF',
        pageNumber: 115,
        chunkNumber: 1,
        distance: 0.08,
        excerpt: null,
      },
      {
        documentId: 'moe-lk-science-gr10-part2',
        source: 'Grade 10 Science Textbook Part II — Collision Theory & Reaction Factors (Pages 118–122)',
        fileType: 'PDF',
        pageNumber: 118,
        chunkNumber: 14,
        distance: 0.11,
        excerpt: null,
      }
    ];

    const enAnswer = `**Rate of Reactions — Grade 10 Science (Chapter 17, Pages 115–124)**

The rate of a chemical reaction is defined as the change in the concentration or amount of reactants or products per unit of time:
$$\\text{Rate of Reaction} = \\frac{\\text{Decrease in amount of reactants}}{\\text{Time taken}} = \\frac{\\text{Increase in amount of products}}{\\text{Time taken}}$$

### 1. How Do We Measure It Experimentally? (p. 115–117)
- **Gas Syringe / Water Displacement:** Measure volume of gas evolved per second (e.g., collecting $\\text{CO}_2$ from $\\text{CaCO}_3 + 2\\text{HCl} \\rightarrow \\text{CaCl}_2 + \\text{H}_2\\text{O} + \\text{CO}_2\\uparrow$). Unit: $\\text{cm}^3/\\text{s}$.
- **Mass Loss on an Electronic Balance:** Measuring mass decrease over time as gas escapes.
- **Precipitate Formation:** Disappearance of a cross mark under a conical flask (e.g., sodium thiosulfate + hydrochloric acid forming cloudy yellow sulfur).

### 2. Collision Theory (Why Do Reactions Happen? p. 117–119)
For a chemical reaction to occur, reactant particles must collide with each other. However, not all collisions result in a reaction! A collision is **effective** only if:
1. **Sufficient Energy:** Particles must collide with energy equal to or greater than the **Activation Energy ($E_a$)**.
2. **Proper Spatial Orientation:** Reactant molecules must align correctly upon collision so bonds can break and new bonds form.

### 3. Factors Influencing Reaction Rates (p. 119–124)
1. **Temperature:** Increasing temperature increases particle kinetic energy $\\to$ particles move faster and collide more frequently $\\to$ a much higher fraction of particles exceed $E_a$. (Rule of thumb: a $10^\\circ\\text{C}$ rise roughly doubles the rate!).
2. **Concentration / Pressure:** Higher concentration means more particles in a given volume $\\to$ higher collision frequency per second.
3. **Physical Nature & Surface Area:** Powders have a far greater surface area exposed to reactant particles than large lumps $\\to$ rapid reaction (e.g., powdered limestone vs marble chips).
4. **Catalysts:** A substance that increases reaction rate without being consumed. It works by **providing an alternative reaction pathway with lower Activation Energy ($E_a$)** (e.g., $\\text{MnO}_2$ decomposing $\\text{H}_2\\text{O}_2$, or papain enzyme tenderizing meat).`;

    const siAnswer = `**ප්‍රතික්‍රියා සීඝ්‍රතාව — 10 ශ්‍රේණිය විද්‍යාව (17 වන පරිච්ඡේදය, පිටු 115–124)**

රසායනික ප්‍රතික්‍රියාවක සීඝ්‍රතාව යනු ඒකක කාලයකදී ප්‍රතික්‍රියාකාරක හෝ ඵලවල සාන්ද්‍රණයේ / ප්‍රමාණයේ සිදුවන වෙනස්වීමයි:
$$\\text{ප්‍රතික්‍රියා සීඝ්‍රතාව} = \\frac{\\text{ප්‍රතික්‍රියාකාරක වැයවන ප්‍රමාණය}}{\\text{ගතවූ කාලය}} = \\frac{\\text{ඵල හටගන්නා ප්‍රමාණය}}{\\text{ගතවූ කාලය}}$$

### 1. පරීක්ෂණාත්මකව මනින ආකාර (පිටු 115–117):
- **වායු සිරින්ජයක් මඟින්:** ඒකක කාලයකදී පිටවන වායු පරිමාව මැනීම (උදා: $\\text{CaCO}_3 + 2\\text{HCl} \\rightarrow \\text{CaCl}_2 + \\text{H}_2\\text{O} + \\text{CO}_2\\uparrow$ හි පිටවන $\\text{CO}_2$ වායුව $\\text{cm}^3/\\text{s}$ වලින්).
- **ස්කන්ධ හානිය මැනීම:** ඉලෙක්ට්‍රොනික තුලාවක් මත තබා වායුව පිටවීමේදී සිදුවන ස්කන්ධ අඩුවීම සටහන් කිරීම.
- **අවක්ෂේප හටගැනීම:** කේතුක ප්ලාස්කුව යටින් තැබූ කතිර ලකුණ නොපෙනී යාමට ගතවන කාලය (සෝඩියම් තයෝසල්ෆේට් හා අම්ලය ප්‍රතික්‍රියාවෙන් කහ පැහැ සල්ෆර් හැදීම).

### 2. ගැටුම් වාදය (Collision Theory — පිටු 117–119):
ප්‍රතික්‍රියාවක් සිදුවීමට නම් අංශු එකිනෙක ගැටිය යුතුය. නමුත් සියලු ගැටුම් ප්‍රතික්‍රියා බවට පත් නොවේ! ගැටුමක් **ඵලදායී ගැටුමක් (Effective Collision)** වීමට කොන්දේසි 2ක් සම්පූර්ණ විය යුතුය:
1. අංශු සතුව **සක්‍රියන ශක්තියට ($E_a$) සමාන හෝ වැඩි ශක්තියක්** තිබීම.
2. අංශු එකිනෙක ගැටෙන විට **නිවැරදි අවකාශික දිශානතියක් (Proper Spatial Orientation)** පැවතීම.

### 3. ප්‍රතික්‍රියා සීඝ්‍රතාව කෙරෙහි බලපාන සාධක (පිටු 119–124):
1. **උෂ්ණත්වය:** උෂ්ණත්වය වැඩිවත්ම අංශුවල චාලක ශක්තිය වැඩිවේ $\\to$ ගැටුම් වාර ගණන වැඩිවේ $\\to$ සක්‍රියන ශක්තිය ඉක්මවන අංශු ප්‍රතිශතය ශීඝ්‍රයෙන් වැඩිවේ. ($10^\\circ\\text{C}$ කින් වැඩිවන විට සීඝ්‍රතාව දළ වශයෙන් දෙගුණ වේ!).
2. **ප්‍රතික්‍රියාකාරක සාන්ද්‍රණය:** සාන්ද්‍රණය වැඩිවිට ඒකක පරිමාවක ඇති අංශු ගණන වැඩිවේ $\\to$ ගැටුම් වාර ගණන වැඩිවේ.
3. **ප්‍රතික්‍රියාකාරකවල භෞතික ස්වභාවය / පෘෂ්ඨික වර්ගඵලය:** ඝන කැබැල්ලකට වඩා කුඩු වල පෘෂ්ඨික වර්ගඵලය විශාලය $\\to$ ගැටුම් ඇතිවීමට ඇති ඉඩකඩ වැඩිවේ (උදා: හුණුගල් කුඩු සහ හුණුගල් කැට).
4. **උත්ප්‍රේරක (Catalysts):** ප්‍රතික්‍රියාව අවසානයේ රසායනිකව වෙනස් නොවී, **අඩු සක්‍රියන ශක්තියක් සහිත විකල්ප මාර්ගයක් සපයමින්** සීඝ්‍රතාව වැඩි කරන ද්‍රව්‍ය වේ (උදා: $\\text{H}_2\\text{O}_2$ වියෝජනයට කළු පැහැ $\\text{MnO}_2$, මස් මොළොක් කිරීමට ගැට ගස්ලබු කිරි වල ඇති පැපේන් එන්සයිමය).`;

    const taAnswer = `**தாக்க வீதம் — தரம் 10 அறிவியல் (அத்தியாயம் 17, பக். 115–124)**

ஒரு இரசாயனத் தாக்கத்தின் வீதம் என்பது ஓரலகு நேரத்தில் தாக்கிகள் அல்லது விளைவுகளின் செறிவில் அல்லது அளவில் ஏற்படும் மாற்றமாகும்:
$$\\text{தாக்க வீதம்} = \\frac{\\text{தாக்கிகள் குறையும் அளவு}}{\\text{எடுத்த நேரம்}} = \\frac{\\text{விளைவுகள் உருவாகும் அளவு}}{\\text{எடுத்த நேரம்}}$$

### 1. பரிசோதனை ரீதியாக அளவிடும் முறைகள் (பக். 115–117):
- **வாயுச் சிரிஞ்சு மூலம்:** ஓரலகு நேரத்தில் வெளியேறும் வாயுவின் கனவளவை அளவிடுதல் (\\text{CaCO}_3 + 2\\text{HCl} \\rightarrow \\text{CaCl}_2 + \\text{H}_2\\text{O} + \\text{CO}_2\\uparrow).
- **திணிவு இழப்பை அளவிடுதல்:** வாயு வெளியேறும்போது மின்னணுத் தராசில் ஏற்படும் திணிவுக் குறைவை அளவிடுதல்.
- **வீழ்படிவு உருவாக்கம்:** கூம்புக் குடுவையின் அடியிலுள்ள புள்ளி மறையும் நேரத்தை அளவிடுதல் (சோடியம் தயோசல்பேற்று + அமிலம் $\\to$ மஞ்சள் கந்தகம்).

### 2. மோதல் கொள்கை (Collision Theory — பக். 117–119):
தாக்கம் நிகழ தாக்கிக் கூறுகள் ஒன்றுடனொன்று மோத வேண்டும். ஆனால் எல்லா மோதல்களும் தாக்கத்தை ஏற்படுத்துவதில்லை! ஒரு மோதல் **பயனுள்ள மோதலாக** மாற 2 நிபந்தனைகள் தேவை:
1. கூறுகளிடம் **தூண்டுவிசைக்கு ($E_a$) சமனான அல்லது கூடிய சக்தி** இருக்க வேண்டும்.
2. கூறுகள் மோதும் போது **சரியான வெளியிட அமைவு (Proper Orientation)** இருக்க வேண்டும்.

### 3. தாக்க வீதத்தைப் பாதிக்கும் காரணிகள் (பக். 119–124):
1. **வெப்பநிலை:** வெப்பநிலை கூடும் போது துணிக்கைகளின் இயக்க சக்தி கூடும் $\\to$ மோதல் அதிர்வெண் கூடும் $\\to$ தூண்டுவிசையை விட அதிக சக்தியுடைய துணிக்கைகள் அதிகரிக்கும் ($10^\\circ\\text{C}$ கூட தாக்க வீதம் கிட்டத்தட்ட இருமடங்காகும்!).
2. **செறிவு:** செறிவு கூடும் போது ஓரலகு கனவளவிலுள்ள துணிக்கைகள் கூடும் $\\to$ மோதல் வீதம் கூடும்.
3. **மேற்பரப்பளவு:** பெரிய துண்டுகளை விட தூளாக்கப்பட்டவற்றின் மேற்பரப்பளவு அதிகம் $\\to$ விரைவான தாக்கம் (சுண்ணாம்புக் கட்டி vs சுண்ணாம்புத் தூள்).
4. **ஊக்கிகள் (Catalysts):** தாக்கத்தின் முடிவில் மாற்றமடையாமல், **குறைந்த தூண்டுவிசையுடைய ($E_a$) மாற்றுப் பாதையை வழங்கி** தாக்க வீதத்தை அதிகரிக்கும் (உதாரணம்: $\\text{MnO}_2$ மற்றும் பப்பாசிப் பால் என்சைம்).`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Rate of Reaction = Change in amount of Reactants or Products / Time',
        'Collision Theory requires: Energy ≥ Activation Energy (Ea) AND Correct Spatial Orientation',
        'Temperature increases particle kinetic energy and fraction exceeding Ea',
        'Surface area: Powders have vastly higher contact area than solid blocks',
        'Catalysts lower Activation Energy without being consumed (MnO₂, Biological Enzymes)'
      ],
      memoryTrick: {
        concept: 'Rate of Reactions & Collision Theory (Textbook Part II, p. 115–124)',
        trick: 'Crash with Energy (Ea) & Aim (Orientation)! Crank Temp, Pack Conc, Powder Surface, Drop a Catalyst!',
        rhyme: 'Molecules must crash with energy and aim,\nActivation Energy wins the reaction game!\nHeat them up, pack them tight, crush into powder fine,\nAdd a clever catalyst and speed across the line!',
        audioText: 'Here is your memory trick for Rate of Reactions! Remember the two rules of Collision Theory: molecules must crash with enough Activation Energy, and they must crash with the correct orientation! To speed up any reaction: raise the temperature, increase the concentration, crush solids into fine powder for surface area, and add a catalyst like manganese dioxide to lower the energy barrier!',
        languageVersions: {
          en: {
            concept: 'Rate of Reactions & Collision Theory (Textbook Part II, p. 115–124)',
            trick: 'Crash with Energy (Ea) & Aim (Orientation)! Crank Temp, Pack Conc, Powder Surface, Drop a Catalyst!',
            rhyme: 'Molecules must crash with energy and aim,\nActivation Energy wins the reaction game!\nHeat them up, pack them tight, crush into powder fine,\nAdd a clever catalyst and speed across the line!',
            audioText: 'Here is your memory trick for Rate of Reactions! Remember the two rules of Collision Theory: molecules must crash with enough Activation Energy, and they must crash with the correct orientation! To speed up any reaction: raise the temperature, increase the concentration, crush solids into fine powder for surface area, and add a catalyst like manganese dioxide to lower the energy barrier!'
          },
          si: {
            concept: 'ප්‍රතික්‍රියා සීඝ්‍රතාව හා ගැටුම් වාදය (පෙළපොත 2 කොටස, පිටු 115–124)',
            trick: 'ගැටුමට ඕනෑ සක්‍රියන ශක්තිය (Ea) හා හරි දිශානතිය! සීඝ්‍රතාව නංවන්න: රත් කරන්න, සාන්ද්‍රණය වැඩි කරන්න, කුඩු කරන්න, උත්ප්‍රේරක දමන්න!',
            rhyme: 'අංශු ගැටෙන්නට ඕනෑ ශක්තිය සහ නිසි දිශාව,\nසක්‍රියන ශක්තියෙන්මයි තීරණය වන්නේ වේගය මේව!\nරත් කර, සාන්ද්‍ර කර, කුඩු කර පෘෂ්ඨය වැඩි කර ගනිමු,\nඋත්ප්‍රේරකයක් දමා අඩු ශක්තියෙන් වේගය නංවමු!',
            audioText: 'ප්‍රතික්‍රියා සීඝ්‍රතාව මතක තබා ගැනීමට උපක්‍රමය මෙන්න! ගැටුම් වාදයේ නීති දෙකයි: සක්‍රියන ශක්තිය සහ නිවැරදි දිශානතිය. සීඝ්‍රතාව වැඩි කිරීමට: උෂ්ණත්වය නංවන්න, සාන්ද්‍රණය වැඩි කරන්න, පෘෂ්ඨික වර්ගඵලය වැඩි කිරීමට කුඩු කරන්න, සහ සක්‍රියන ශක්තිය අඩු කිරීමට උත්ප්‍රේරකයක් එක් කරන්න!'
          },
          ta: {
            concept: 'தாக்க வீதம் & மோதல் கொள்கை (பாடநூல் பகுதி 2, பக். 115–124)',
            trick: 'மோதலுக்கு தேவை தூண்டுவிசை (Ea) மற்றும் சரியான திசையமைவு! வீதம் கூட்ட: வெப்பம் கூட்டு, செறிவு கூட்டு, தூளாக்கு, ஊக்கி சேர்!',
            rhyme: 'சரியான திசையில் சக்தியுடன் மோத வேண்டும்,\nதூண்டுவிசை எய்தினால் தாக்கம் நிகழ வேண்டும்!\nவெப்பமும் செறிவும் தூளாக்கலும் வீதத்தை உயர்த்தும்,\nசிறந்த ஊக்கி மாற்றுப் பாதையை வழங்கி விரைவாக்கும்!',
            audioText: 'தாக்க வீதத்தை நினைவில் வைக்கும் வழி இதோ! மோதல் கொள்கையின் இரு நிபந்தனைகள்: தூண்டுவிசை மற்றும் சரியான திசையமைவு. தாக்க வீதத்தை அதிகரிக்க: வெப்பநிலை கூட்டுங்கள், செறிவு கூட்டுங்கள், மேற்பரப்பளவை அதிகரிக்க தூளாக்குங்கள், மற்றும் ஊக்கியைச் சேருங்கள்!'
          }
        }
      },
      suggestedFollowUps: [
        'Why do Negombo fish stay fresh when preserved on ice?',
        'How does a catalyst lower activation energy without changing chemically?',
        'Compare rate of gas evolution: limestone powder vs marble lump',
        'Explore the interactive particle collision simulation'
      ],
    };
  }

  private handleRateOfReactionsClarify(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const en = `### Step-by-Step Breakdown: Collision Theory & Reaction Rate Mechanism

Let's unpack the microscopic physics of how chemical reactions occur:

1. **Step 1: The Activation Energy Barrier ($E_a$)**
   Think of rolling a boulder over a hill before it speeds down into a valley. That hill is the **Activation Energy ($E_a$)**. Reactant molecules can collide millions of times per second, but unless their kinetic energy equals or exceeds $E_a$, they merely bounce off each other harmlessly like elastic rubber balls!

2. **Step 2: Proper Spatial Alignment (Orientation)**
   Even with tremendous energy, if the reacting chemical groups do not face each other directly upon impact, bonds cannot form. Both energy **and** orientation must align simultaneously for an **effective collision**.

3. **Step 3: Why a $10^\\circ\\text{C}$ Rise Doubles the Rate**
   Heating doesn't just make particles move slightly faster—it exponentially increases the **fraction of particles that possess energy greater than $E_a$** (Maxwell-Boltzmann distribution). Hence, collision frequency rises, but effective collisions skyrocket!

4. **Step 4: Catalysts Provide a Scenic Shortcut Tunnel**
   A catalyst (like $\\text{MnO}_2$) doesn't give particles more energy. Instead, it provides an alternate reaction path with a lower hill (lower $E_a$). More everyday collisions now have enough energy to react!`;

    const si = `### පියවරෙන් පියවර පැහැදිලි කිරීම: ගැටුම් වාදය හා ප්‍රතික්‍රියා යාන්ත්‍රණය

අණුක මට්ටමින් රසායනික ප්‍රතික්‍රියාවක් සිදුවන ආකාරය මෙන්න:

1. **පියවර 1: සක්‍රියන ශක්ති බාධකය ($E_a$)**
   කන්දක් උඩින් ගලක් තල්ලු කර පහළට පෙරළීමට පෙර කන්ද මුදුනට එසවිය යුතුය. එම කඳු මුදුන **සක්‍රියන ශක්තිය ($E_a$)** වේ. අංශු තත්පරයකට මිලියන වාරයක් ගැටුණද, ඒවායේ ශක්තිය $E_a$ ට වඩා අඩු නම් ප්‍රතික්‍රියාවක් නොවී බෝල මෙන් ආපසු විසිවේ!

2. **පියවර 2: නිවැරදි අවකාශික දිශානතිය**
   අංශු වලට කොතරම් ශක්තිය තිබුණත්, එකිනෙක ගැටෙන විට රසායනික බන්ධන කැඩීමට සුදුසු කෝණයකින් මුහුණට මුහුණ නොගැටුණහොත් ප්‍රතික්‍රියාවක් සිදු නොවේ. ශක්තිය සහ නිවැරදි දිශානතිය යන දෙකම එකවර තිබිය යුතුය.

3. **පියවර 3: උෂ්ණත්වය $10^\\circ\\text{C}$ කින් වැඩිවන විට සීඝ්‍රතාව දෙගුණ වීමේ රහස**
   උෂ්ණත්වය වැඩිවීමෙන් සිදුවන්නේ අංශු වේගවත් වීම පමණක් නොවේ; සක්‍රියන ශක්තිය ($E_a$) ඉක්මවා යන අංශු ප්‍රතිශතය දැවැන්ත ලෙස ඉහළ යාමයි!

4. **පියවර 4: උත්ප්‍රේරක මඟින් කඳු මුදුන පහත් කිරීම**
   උත්ප්‍රේරකයක් (උදා: $\\text{MnO}_2$) අංශු වලට අමතර ශක්තියක් ලබා නොදේ. එය කරන්නේ අඩු සක්‍රියන ශක්තියක් සහිත විකල්ප කෙටි මාවතක් (උමගක්) තනා දීමයි!`;

    const ta = `### படிமுறை விளக்கம்: மோதல் கொள்கை மற்றும் தாக்க பொறிமுறை

துணிக்கை மட்டத்தில் இரசாயன தாக்கம் எவ்வாறு நிகழ்கிறது:

1. **படி 1: தூண்டுவிசை தடை ($E_a$)**
   ஒரு மலையின் உச்சிக்கு கல்லை உருட்டிச் சென்ற பின்பே அது மறுபுறம் வேகமாக உருளும். அந்த மலையுச்சியே **தூண்டுவிசை ($E_a$)** ஆகும். துணிக்கைகள் மோதினாலும், அவற்றின் சக்தி $E_a$ ஐ விடக் குறைவாக இருந்தால் தாக்கம் ஏற்படாமல் ரப்பர் பந்து போல மீளும்!

2. **படி 2: சரியான வெளியிட அமைவு (திசையமைவு)**
   எவ்வளவு சக்தி இருந்தாலும், சரியான கோணத்தில் மூலக்கூறுகள் நேருக்கு நேர் மோதாவிட்டால் பிணைப்புகள் உடையாது. சக்தியும் திசையமைவும் ஒரே நேரத்தில் இணைய வேண்டும்.

3. **படி 3: $10^\\circ\\text{C}$ வெப்பநிலை உயர்வில் வீதம் இருமடங்காக மாறுவது ஏன்?**
   வெப்பநிலை உயரும் போது தூண்டுவிசையை விட அதிக சக்தியுடைய துணிக்கைகளின் விகிதம் மிக வேகமாக உயர்கிறது. அதனால் பயனுள்ள மோதல்கள் பலமடங்காகின்றன!

4. **படி 4: ஊக்கிகள் ஆற்றல் தடையைக் குறைத்தல்**
   ஊக்கி ($MnO_2$) துணிக்கைகளுக்கு அதிக சக்தியைத் தருவதில்லை. மாறாக குறைந்த தூண்டுவிசையுடைய மாற்று குறுக்குப் பாதையை அமைத்துத் தருகிறது!`;

    return {
      answer: lang === 'si' ? si : lang === 'ta' ? ta : en,
      sources: [
        {
          source: 'Grade 10 Science Textbook Part II — Collision Dynamics & Activation Energy',
          pageNumber: 118,
          distance: 0.09,
        }
      ],
      suggestedFollowUps: [
        'Explain simpler: The bumper car analogy of collision theory',
        'Sri Lankan Example: Real-world reaction rate applications',
        'Memory trick: Rhyme to remember all 4 rate factors',
        'Quiz me on collision theory'
      ]
    };
  }

  private handleRateOfReactionsSimpler(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const en = `### Super Simple Version: The Bumper Car Analogy 🏎️💥

Imagine an amusement park bumper car arena:

- **A Gentle Bump:** Two cars tap bumpers at $2\\text{ km/h}$. They just bounce off gently with no scratches. This is an **ineffective collision** (not enough energy)!
- **A Full-Speed Crash:** Two cars speed directly into each other head-on at $50\\text{ km/h}$. Sparks fly, panels crumple! This is an **effective collision** (Energy $\\ge E_a$ + correct aim)!

Now look at how you speed up collisions:
1. **Turn up the Motor (Temperature):** Cars drive much faster $\\to$ violent high-speed crashes happen much more often!
2. **Pack the Arena (Concentration):** Put 100 bumper cars in a tiny space instead of 5 cars $\\to$ crashes happen every second!
3. **Small Bumper Cars (Surface Area):** Lots of small separate cars crash far more often than one giant bus.
4. **Lower the Barrier (Catalyst):** Lower the crash speed required to make sparks!`;

    const si = `### ඉතා සරල පැහැදිලි කිරීම: ගැටෙන කාර් ක්‍රීඩාවේ උපමාව 🏎️💥

ළමා උද්‍යානයක ඇති ගැටෙන කාර් (Bumper Cars) ගැන සිතන්න:

- **සෙමෙන් ගැටීම:** කාර් දෙකක් හෙමින් එකිනෙක ස්පර්ශ වී ආපසු යයි. කිසිදු හානියක් නැත. මෙය **ඵල රහිත ගැටුමකි** (ශක්තිය මදි)!
- **වේගයෙන් මුහුණට මුහුණ ගැටීම:** කාර් දෙකක් උපරිම වේගයෙන් එකිනෙක හප්පයි. ගිනි පුපුරු විසිවේ! මෙය **ඵලදායී ගැටුමකි** (ශක්තිය $E_a$ ඉක්මවා ඇත + හරි කෙළින් මුහුණට මුහුණ ගැටුණි)!

සීඝ්‍රතාව වැඩි කරන්නේ කෙසේද?
1. **වේගය වැඩි කිරීම (උෂ්ණත්වය):** කාර් වේගයෙන් දුවන විට දරුණු ගැටුම් නිතර සිදුවේ.
2. **පිටිය පිරවීම (සාන්ද්‍රණය):** කුඩා පිටියකට කාර් 5ක් වෙනුවට කාර් 50ක් දැමූ විට තත්පරයක් පාසා ගැටුම් ඇතිවේ.
3. **කුඩු කිරීම (පෘෂ්ඨික වර්ගඵලය):** එක ලොකු බස් එකකට වඩා කුඩා කාර් රැසක් නිතර හැපේ.
4. **බාධක පහත් කිරීම (උත්ප්‍රේරක):** ප්‍රතික්‍රියාවක් වීමට අවශ්‍ය අවම ශක්ති බාධකය අඩු කර පහසු කරයි!`;

    const ta = `### மிக எளிய விளக்கம்: மோதும் கார் உவமை 🏎️💥

விளையாட்டு பூங்காவிலுள்ள மோதும் கார்களை (Bumper Cars) நினையுங்கள்:

- **மெதுவான மோதல்:** இரு கார்கள் மெதுவாகத் தொட்டு விலகுகின்றன. எந்த மாற்றமும் இல்லை. இது **பயனற்ற மோதல்** (சக்தி போதாது)!
- **வேகமான நேருக்கு நேர் மோதல்:** முழு வேகத்தில் நேருக்கு நேர் மோதுகின்றன. பொறி பறக்கிறது! இதுவே **பயனுள்ள மோதல்** (சக்தி $\\ge E_a$ + சரியான திசை)!

தாக்க வீதத்தை அதிகரிப்பது எப்படி?
1. **வேகத்தை அதிகரித்தல் (வெப்பநிலை):** கார்கள் வேகமாக ஓடும்போது கடுமையான மோதல்கள் அடிக்கடி நிகழும்.
2. **கூட்டத்தை அதிகரித்தல் (செறிவு):** சிறிய இடத்தில் 5 கார்களுக்குப் பதிலாக 50 கார்களை வைத்தால் வினாடிக்கு வினாடி மோதல் நடக்கும்.
3. **தூளாக்குதல் (மேற்பரப்பளவு):** ஒரு பெரிய வாகனத்தை விட பல சிறிய கார்கள் அடிக்கடி மோதும்.
4. **தடையைக் குறைத்தல் (ஊக்கி):** தாக்கம் நிகழத் தேவையான சக்தி எல்லையைக் குறைத்து எளிதாக்குகிறது!`;

    return {
      answer: lang === 'si' ? si : lang === 'ta' ? ta : en,
      sources: [{ source: 'Grade 10 Science — Intuitive Collision Mechanics', pageNumber: 117 }],
      suggestedFollowUps: [
        'Clarify more: The Maxwell-Boltzmann energy curve',
        'Sri Lankan Example: Negombo fish and Matale limestone',
        'Memory trick for rate factors',
        'Quiz me on reaction rates'
      ]
    };
  }

  private handleRateOfReactionsExample(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const en = `**Real-World Sri Lankan Examples of Reaction Rates:**

1. **Preserving Seer Fish in Negombo (Temperature Effect):**
   When fishermen bring freshly caught Thora (Seer fish) ashore in Negombo or Galle, it is immediately packed inside crushed ice at $0^\\circ\\text{C}$. Bacterial decomposition is an enzymatic chemical reaction. Dropping the temperature from $30^\\circ\\text{C}$ to $0^\\circ\\text{C}$ slashes the bacterial reaction rate by over $800\\%$, keeping fish fresh for days!

2. **Matale Limestone Kilns & Acid Reaction (Surface Area Effect):**
   In Matale, limestone ($\\text{CaCO}_3$) is quarried for fertilizer and construction. If you drop a solid $100\\text{g}$ block of limestone into dilute hydrochloric acid, it fizzes gently for hours. But if you crush that same block into fine powder, the surface area expands hundreds of times, and the entire mass reacts with violent effervescence in under 20 seconds!

3. **Tenderizing Tough Meat with Raw Papaya (Catalyst / Biological Enzyme):**
   Traditional Sri Lankan cooks add raw green papaya paste (or raw papaw slices) when stewing tough beef or mutton. Green papaya contains the proteolytic enzyme **papain**, which acts as a biological catalyst. It speeds up the hydrolysis of tough meat muscle proteins without needing high-pressure cooking!`;

    const si = `**ප්‍රතික්‍රියා සීඝ්‍රතාව පිළිබඳ ශ්‍රී ලාංකේය ප්‍රායෝගික උදාහරණ:**

1. **මීගමුව ධීවර වරායේ තෝරා මාළු අයිස් දැමීම (උෂ්ණත්වයේ බලපෑම):**
   මීගමුව හෝ ගාල්ල වරායෙන් බාන නැවුම් තෝරා මාළු වහාම කුඩු කළ අයිස් ($0^\\circ\\text{C}$) තුළ අසුරයි. බැක්ටීරියා මඟින් මාළු නරක්වීම එන්සයිමීය රසායනික ප්‍රතික්‍රියාවකි. උෂ්ණත්වය $30^\\circ\\text{C}$ සිට $0^\\circ\\text{C}$ දක්වා පහත දැමූ විට, නරක්වීමේ රසායනික ප්‍රතික්‍රියා සීඝ්‍රතාව $800\\%$ කට වඩා අඩුවී මාළු දින ගණනාවක් නැවුම්ව තබාගත හැක!

2. **මාතලේ හුණුගල් පතල් හා අම්ල ප්‍රතික්‍රියාව (පෘෂ්ඨික වර්ගඵලයේ බලපෑම):**
   මාතලේ ප්‍රදේශයේ පසට යෙදීමට හුණුගල් ($\\text{CaCO}_3$) කුඩු කරනු ලබයි. ග්‍රෑම් 100ක ඝන හුණුගල් කැටයක් තනුක හයිඩ්‍රොක්ලෝරික් අම්ලයට දැමූ විට ප්‍රතික්‍රියාව පැය ගණනක් සෙමෙන් සිදුවේ. නමුත් එම ග්‍රෑම් 100ම සිහින් කුඩු බවට පත් කළ විට පෘෂ්ඨික වර්ගඵලය සිය ගුණයකින් වැඩිවී තත්පර 20කින් මුළු ප්‍රතික්‍රියාවම වායු බුබුළු නගමින් වේගයෙන් අවසන් වේ!

3. **ගැට ගස්ලබු කිරි මඟින් මස් මොළොක් කිරීම (ජෛව උත්ප්‍රේරක / එන්සයිම):**
   දැඩි හරක් මස් හෝ එළු මස් පිසීමේදී සාම්ප්‍රදායික ගෘහණියන් අමු ගැට ගස්ලබු කිරි හෝ පෙති එක්කරයි. ගස්ලබු කිරි වල ඇති **පැපේන් (Papain)** එන්සයිමය ජෛව උත්ප්‍රේරකයක් ලෙස ක්‍රියාකරමින්, අධික රස්නයක් නොමැතිව මස්වල ඇති දැඩි ප්‍රෝටීන තන්තු බිඳහෙළීමේ සීඝ්‍රතාව සීඝ්‍රයෙන් වැඩි කරයි!`;

    const ta = `**தாக்க வீதத்திற்கான இலங்கை நடைமுறை உதாரணங்கள்:**

1. **நீர்கொழும்பில் மீன்களை பனிக்கட்டியில் பேணல் (வெப்பநிலை தாக்கம்):**
   நீர்கொழும்பு அல்லது காலி துறைமுகங்களில் பிடிக்கப்படும் நெய்மீன் உடனடியாக $0^\\circ\\text{C}$ தூளாக்கப்பட்ட பனிக்கட்டியில் வைக்கப்படுகிறது. பக்டீரியா மூலம் மீன் கெட்டுப்போவது ஒரு இரசாயனத் தாக்கமாகும். வெப்பநிலையை $30^\\circ\\text{C}$ இலிருந்து $0^\\circ\\text{C}$ இற்குக் குறைக்கும் போது அழுகும் தாக்க வீதம் $800\\%$ க்கும் அதிகமாகக் குறைந்து பல நாட்கள் மீன் புத்துணர்ச்சியுடன் இருக்கும்!

2. **மாத்தளை சுண்ணாம்புக்கல் & அமிலத் தாக்கம் (மேற்பரப்பளவு தாக்கம்):**
   மாத்தளையில் பெறப்படும் சுண்ணாம்புக்கல் ($\\text{CaCO}_3$) தூளாக்கப்பட்டு உரமாகப் பயன்படுகிறது. ஒரு $100\\text{g}$ திண்மக் கட்டியை அமிலத்தில் இட்டால் மெதுவாக மணித்தியாலக் கணக்கில் கரையும். ஆனால் அதே அளவை நுண் தூளாக்கி இட்டால் வினாடிக்கு வினாடி கொதித்து 20 வினாடிகளில் தாக்கம் நிறைவடையும்!

3. **பச்சை பப்பாசி பால் மூலம் இறைச்சியை மிருதுவாக்கல் (உயிரியல் ஊக்கி / என்சைம்):**
   இலங்கை சமையலில் மாமிசத்தை வேகவைக்கும் போது பச்சை பப்பாசித் துண்டுகள் சேர்க்கப்படும். பப்பாசியிலுள்ள **பப்பேன் (Papain)** என்சைம் உயிரியல் ஊக்கியாகச் செயல்பட்டு கடுமையான புரதங்களை அறை வெப்பநிலையிலேயே விரைவாக உடைக்கிறது!`;

    return {
      answer: lang === 'si' ? si : lang === 'ta' ? ta : en,
      sources: [{ source: 'Grade 10 Science — Everyday Chemistry & Sri Lankan Applications', pageNumber: 122 }],
      suggestedFollowUps: [
        'Clarify more: How does ice slow down bacterial enzymes?',
        'Explain simpler: Collision theory bumper cars',
        'Memory trick for rate factors',
        'Quiz me on practical rate applications'
      ]
    };
  }

  private handleMotionInAStraightLine(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-science-gr10-part1',
        source: 'Grade 10 Science Textbook Part I — Chapter 2: Motion in a Straight Line (Pages 23–45)',
        fileType: 'PDF',
        pageNumber: 23,
        chunkNumber: 15,
        distance: 0.08,
        excerpt: null,
      }
    ];

    const enAnswer = `**Motion in a Straight Line — Grade 10 Science (Chapter 2, Pages 23–45)**

Motion is analyzed using scalar and vector quantities:
- **Distance ($d$):** Total length of path covered regardless of direction (Scalar, unit: $\\text{m}$).
- **Displacement ($s$):** Shortest straight-line distance from initial to final position in a specified direction (Vector, unit: $\\text{m}$).
- **Speed ($v$):** Rate of change of distance ($\\text{Speed} = d/t$, unit: $\\text{m/s}$).
- **Velocity ($v$):** Rate of change of displacement in a specified direction ($v = s/t$, unit: $\\text{m/s}$).
- **Acceleration ($a$):** Rate of change of velocity ($a = \\frac{v - u}{t}$, unit: $\\text{m/s}^2$).

### 3 Kinematic Equations for Uniform Acceleration:
1. $$v = u + at$$
2. $$s = ut + \\frac{1}{2}at^2$$
3. $$v^2 = u^2 + 2as$$
*(where $u$ = initial velocity, $v$ = final velocity, $a$ = acceleration, $t$ = time, $s$ = displacement)*

### Velocity-Time ($v-t$) Graph Features:
- **Gradient (Slope):** Represents the **acceleration** of the object ($\\text{Gradient} = \\frac{\\Delta v}{\\Delta t} = a$).
- **Area under Graph:** Represents the **displacement / distance travelled** ($s$).`;

    const siAnswer = `**සරල රේඛීය චලිතය — 10 ශ්‍රේණිය විද්‍යාව (2 වන පරිච්ඡේදය, පිටු 23–45)**

චලිතය අදිශ හා දෛශික රාශීන් ඔස්සේ විග්‍රහ කෙරේ:
- **දුර ($d$):** ගමන් කළ මුළු මාර්ගයේ දිග (අදිශ, ඒකකය: $\\text{m}$).
- **විස්ථාපනය ($s$):** ආරම්භක ලක්ෂ්‍යයේ සිට අවසාන ලක්ෂ්‍යයට සරල රේඛීය කෙටිම දුර සහ දිශාව (දෛශික, ඒකකය: $\\text{m}$).
- **වේගය ($v$):** දුර වෙනස්වීමේ සීඝ්‍රතාව ($v = d/t$, ඒකකය: $\\text{m/s}$).
- **ප්‍රවේගය ($v$):** විස්ථාපනය වෙනස්වීමේ සීඝ්‍රතාව ($v = s/t$, ඒකකය: $\\text{m/s}$).
- **ත්වරණය ($a$):** ප්‍රවේගය වෙනස්වීමේ සීඝ්‍රතාව ($a = \\frac{v - u}{t}$, ඒකකය: $\\text{m/s}^2$).

### ඒකාකාර ත්වරණය සඳහා චලිත සමීකරණ 3:
1. $$v = u + at$$
2. $$s = ut + \\frac{1}{2}at^2$$
3. $$v^2 = u^2 + 2as$$

### ප්‍රවේග-කාල ($v-t$) ප්‍රස්ථාරයේ වැදගත් ලක්ෂණ:
- **අනුක්‍රමණය:** වස්තුවේ **ත්වරණය** නිරූපණය කරයි (අනුක්‍රමණය = $\\frac{\\Delta v}{\\Delta t} = a$).
- **ප්‍රස්ථාරය යට වර්ගඵලය:** වස්තුව ගමන් කළ **විස්ථාපනය** නිරූපණය කරයි.`;

    const taAnswer = `**நேர்கோட்டு இயக்கம் — தரம் 10 அறிவியல் (அத்தியாயம் 2, பக். 23–45)**

இயக்கம் அளவி மற்றும் காவி கணியங்கள் மூலம் விவரிக்கப்படுகிறது:
- **தூரம் ($d$):** திசையைக் கருதாது பயணம் செய்த மொத்தப் பாதை (அளவி, அலகு: $\\text{m}$).
- **இடப்பெயர்ச்சி ($s$):** குறிப்பிட்ட திசையில் ஆரம்ப மற்றும் இறுதிப் புள்ளிகளுக்கு இடையிலான குறைந்தபட்ச தூரம் (காவி, அலகு: $\\text{m}$).
- **வேகம் ($v$):** தூர மாற்ற வீதம் ($v = d/t$, அலகு: $\\text{m/s}$).
- **திசைவேகம் ($v$):** இடப்பெயர்ச்சி மாற்ற வீதம் ($v = s/t$, அலகு: $\\text{m/s}$).
- **ஆர்முடுகல் ($a$):** திசைவேக மாற்ற வீதம் ($a = \\frac{v - u}{t}$, அலகு: $\\text{m/s}^2$).

### மாறா ஆர்முடுகலுக்கான 3 இயக்கச் சமன்பாடுகள்:
1. $$v = u + at$$
2. $$s = ut + \\frac{1}{2}at^2$$
3. $$v^2 = u^2 + 2as$$

### திசைவேக-நேர ($v-t$) வரைபின் பண்புகள்:
- **படிவு (சாய்வு):** **ஆர்முடுகலைக்** குறிக்கும்.
- **வரைபின் கீழான பரப்பளவு:** **இடப்பெயர்ச்சியைக்** குறிக்கும்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Displacement is a vector (magnitude + direction), while distance is a scalar',
        'Acceleration a = (v - u) / t (unit: m/s²)',
        'Gradient of a v-t graph gives acceleration; area under v-t graph gives displacement',
        'Kinematic formulas: v = u + at, s = ut + ½at², v² = u² + 2as'
      ],
      memoryTrick: {
        concept: 'Equations of Motion (Textbook Part 1, p. 23–45)',
        trick: 'Remember "V-U-A-T-S": Velocity, Initial, Acceleration, Time, and Spacing (Displacement)!',
        rhyme: 'v equals u plus a times t,\ns equals u t plus half a t squared, you see!\nv squared is u squared plus 2 a s,\nMaster these three for exam success!',
        audioText: 'Here is your memory trick for motion equations! Remember the 3 formulas: v equals u plus a t, s equals u t plus half a t squared, and v squared equals u squared plus 2 a s! For velocity-time graphs, remember: the slope gives acceleration, and the area gives displacement!'
      },
      suggestedFollowUps: [
        'Calculate: A car accelerates from 0 to 20 m/s in 5s. Find acceleration and distance.',
        'Why does the gradient of a velocity-time graph equal acceleration?',
        'Difference between distance and displacement with Sri Lankan expressway examples',
        'Quiz me on Equations of Motion'
      ]
    };
  }

  private handleCurrentElectricity(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-science-gr10-part2',
        source: 'Grade 10 Science Textbook Part II — Chapter 19: Current Electricity (Pages 140–155)',
        fileType: 'PDF',
        pageNumber: 140,
        chunkNumber: 18,
        distance: 0.09,
        excerpt: null,
      }
    ];

    const enAnswer = `**Current Electricity — Grade 10 Science (Chapter 19, Pages 140–155)**

### 1. Fundamental Quantities:
- **Electric Current ($I$):** Rate of flow of electric charges.
  $$I = \\frac{Q}{t}$$
  Measured in **Amperes (A)** with an ammeter connected in **series**.
- **Potential Difference ($V$):** Work done per unit charge between two points. Measured in **Volts (V)** with a voltmeter connected in **parallel**.
- **Resistance ($R$):** The opposition offered to the flow of current. Measured in **Ohms ($\\Omega$)**.

### 2. Ohm's Law:
> "At constant temperature, the current flowing through a metallic conductor is directly proportional to the potential difference across its ends."
$$V = I R$$

### 3. Factors Affecting Resistance of a Conductor:
1. **Length ($l$):** Resistance is directly proportional to length ($R \\propto l$).
2. **Cross-Sectional Area ($A$):** Resistance is inversely proportional to thickness ($R \\propto 1/A$).
3. **Material:** Different metals possess different resistivities (Copper is a top conductor).
4. **Temperature:** Metallic conductor resistance increases with temperature.

### 4. Circuit Connections:
- **Series:** $R_s = R_1 + R_2 + R_3$ (Current is identical through all components; voltages add up).
- **Parallel:** $\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}$ (Voltage is identical across all branches; currents add up). All Sri Lankan home appliances are wired in **parallel**!`;

    const siAnswer = `**ධාරා විද්‍යුතය — 10 ශ්‍රේණිය විද්‍යාව (19 වන පරිච්ඡේදය, පිටු 140–155)**

### 1. මූලික රාශීන්:
- **විද්‍යුත් ධාරාව ($I$):** ආරෝපණ ගලායාමේ සීඝ්‍රතාවයි ($I = Q/t$). මනින්නේ **ඇම්පියර් (A)** වලින්, **ශ්‍රේණිගතව** සවි කළ ඇමීටරයකිනි.
- **විභව අන්තරය ($V$):** ඒකක ආරෝපණයක් ගෙනයාමට කළ යුතු කාර්යයයි. මනින්නේ **වෝල්ට් (V)** වලින්, **සමාන්තරගතව** සවි කළ වෝල්ට්මීටරයකිනි.
- **ප්‍රතිරෝධය ($R$):** ධාරාව ගලායාමට දක්වන බාධාවයි. ඒකකය **ඕම් ($\\Omega$)** වේ.

### 2. ඕම්ගේ නියමය:
> "නියත උෂ්ණත්වයේදී සන්නායකයක් තුළින් ගලන ධාරාව, එහි අග්‍ර අතර විභව අන්තරයට අනුලෝමව සමානුපාතික වේ."
$$V = I R$$

### 3. සන්නායකයක ප්‍රතිරෝධය කෙරෙහි බලපාන සාධක:
1. **දිග ($l$):** දිග වැඩිවන විට ප්‍රතිරෝධය වැඩිවේ ($R \\propto l$).
2. **හරස්කඩ වර්ගඵලය ($A$):** කම්බිය මහත් වන විට ප්‍රතිරෝධය අඩුවේ ($R \\propto 1/A$).
3. **ද්‍රව්‍යයේ ස්වභාවය:** තඹ සහ රිදී වල ප්‍රතිරෝධය ඉතා අඩුය.
4. **උෂ්ණත්වය:** ලෝහ සන්නායක රත්වන විට ප්‍රතිරෝධය වැඩිවේ.

### 4. ශ්‍රේණිගත හා සමාන්තරගත පරිපථ:
- **ශ්‍රේණිගත:** $R_s = R_1 + R_2 + R_3$
- **සමාන්තරගත:** $\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2}$ (ශ්‍රී ලංකාවේ සියලුම ගෘහස්ථ විදුලි උපකරණ සවි කරන්නේ සමාන්තරගතවයි!).`;

    const taAnswer = `**மின்னோட்டவியல் — தரம் 10 அறிவியல் (அத்தியாயம் 19, பக். 140–155)**

### 1. அடிப்படைக் கணியங்கள்:
- **மின்னோட்டம் ($I$):** ஏற்றப் பாய்ச்சல் வீதம் ($I = Q/t$). **அம்பியர் (A)** அலகில் **தொடராக** இணைக்கப்பட்ட அம்பியர்மானி மூலம் அளக்கப்படும்.
- **அழுத்த வேறுபாடு ($V$):** ஓரலகு ஏற்றத்திற்கான வேலை. **வோல்ற் (V)** அலகில் **சமாந்தரமாக** இணைக்கப்பட்ட வோல்ற்மானி மூலம் அளக்கப்படும்.
- **மின்தடை ($R$):** மின்னோட்டத்திற்கு ஏற்படும் எதிர்ப்பு. அலகு **ஓம் ($\\Omega$)**.

### 2. ஓமின் விதி:
> "மாறா வெப்பநிலையில் கடத்தியொன்றினூடான மின்னோட்டம் அதன் முனைகளுக்கிடையிலான அழுத்த வேறுபாட்டிற்கு நேர்விகிதசமனாகும்."
$$V = I R$$

### 3. மின்தடையைப் பாதிக்கும் காரணிகள்:
1. **நீளம் ($l$):** நீளம் கூட மின்தடை கூடும் ($R \\propto l$).
2. **குறுக்குவெட்டுப் பரப்பளவு ($A$):** தடிப்பு கூட மின்தடை குறையும் ($R \\propto 1/A$).
3. **பொருளின் தன்மை:** செப்பு போன்ற உலோகங்கள் குறைந்த மின்தடை கொண்டவை.
4. **வெப்பநிலை:** வெப்பநிலை கூட உலோகக் கடத்திகளின் மின்தடை கூடும்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Current I = Q / t (Amperes), Voltage V (Volts), Resistance R (Ohms)',
        'Ohm\'s Law: V = I × R at constant temperature',
        'Resistance increases with length and decreases with cross-sectional area',
        'Domestic household appliances are connected in parallel (230 V supply)'
      ],
      memoryTrick: {
        concept: 'Ohm\'s Law & Circuits (Textbook Part 2, p. 140–155)',
        trick: 'Think of "V on Top of the Triangle": V = I × R, I = V / R, R = V / I!',
        rhyme: 'Volts equal I times R each day,\nOhm\'s Law lights the circuit way!\nIn parallel homes, the voltage stays true,\nAt 230 Volts for all devices in view!',
        audioText: 'Here is your memory trick for Electricity! Picture the Ohm\'s Law triangle with Voltage on top: V equals I times R! To find current, divide V by R. And remember: Sri Lankan household wiring is connected in parallel so every bulb gets the full 230 Volts!'
      },
      suggestedFollowUps: [
        'Calculate: Resistance of an electric iron drawing 4.6 A from 230 V mains',
        'Why are household appliances wired in parallel rather than in series?',
        'How does temperature affect the resistance of an incandescent bulb filament?',
        'Quiz me on Ohm\'s Law and Circuits'
      ]
    };
  }

  private handlePythagoras(lang: 'en' | 'si' | 'ta', context?: LearningContext): RAGResponse {
    const isGr10 = context?.grade === 'grade-10' || context?.topicId?.includes('gr10') || context?.subjectId === 'maths';
    const sources: SourceCitation[] = [
      {
        documentId: isGr10 ? 'sl-moe-math-gr10-p1-ch10' : 'sl-nie-math-gr8-ch9',
        source: isGr10 
          ? 'Grade 10 Mathematics Part I Textbook (Educational Publications Department Sri Lanka) - Chapter 10: Pythagoras\' Theorem (p. 143–158)'
          : 'Grade 8 Mathematics Textbook (National Institute of Education)',
        fileType: 'PDF',
        pageNumber: isGr10 ? 143 : 114,
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

    return this.solvePythagorasStepByStep(3, 4, null, lang, 'AC');
  }

  public solveQuadraticStepByStep(
    a: number,
    b: number,
    c: number,
    lang: 'en' | 'si' | 'ta',
    rawEq: string,
    _userQuery: string
  ): RAGResponse {
    const ac = a * c;
    const discriminant = b * b - 4 * a * c;

    // Search for integer factors p, q such that p * q = ac and p + q = b
    let factorP: number | null = null;
    let factorQ: number | null = null;
    const limit = Math.max(12, Math.abs(ac * 2));
    for (let p = -limit; p <= limit; p++) {
      if (p !== 0 && (ac === 0 ? true : ac % p === 0)) {
        const q = ac === 0 ? b : ac / p;
        if (p + q === b) {
          factorP = p;
          factorQ = q;
          break;
        }
      }
    }

    // Numerical roots
    const root1 = discriminant >= 0 ? (-b + Math.sqrt(discriminant)) / (2 * a) : null;
    const root2 = discriminant >= 0 ? (-b - Math.sqrt(discriminant)) / (2 * a) : null;
    const r1Str = root1 !== null ? (Number.isInteger(root1) ? root1.toString() : root1.toFixed(2)) : 'Complex';
    const r2Str = root2 !== null ? (Number.isInteger(root2) ? root2.toString() : root2.toFixed(2)) : 'Complex';

    // Formatted equation
    const eqStr = `${a !== 1 ? (a === -1 ? '-' : a) : ''}x^2 ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x ${c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`} = 0`;

    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-math-gr10-p2-ch14',
        source: 'Grade 10 Mathematics Part II Textbook (Educational Publications Department Sri Lanka) - Chapter 14: Quadratic Equations (p. 19–35)',
        fileType: 'PDF',
        pageNumber: 20,
        chunkNumber: 2,
        distance: 0.05,
        excerpt: null,
      }
    ];

    // Method 1: Factorisation breakdown
    let factorisationSteps = '';
    if (factorP !== null && factorQ !== null) {
      if (a === 1) {
        factorisationSteps = `
#### Method 1: Solution by Factorisation (සාධක ක්‍රමය / காரணிப்படுத்தல் முறை)
1. **Find two numbers** whose product is $a \\times c = 1 \\times ${c} = ${ac}$ and whose sum is $b = ${b}$:
   - The two numbers are **${factorP}** and **${factorQ}** (since $(${factorP}) \\times (${factorQ}) = ${ac}$ and $(${factorP}) + (${factorQ}) = ${b}$).
2. **Factorise into two linear binomials**:
   $$(x ${factorP >= 0 ? `+ ${factorP}` : `- ${Math.abs(factorP)}`})(x ${factorQ >= 0 ? `+ ${factorQ}` : `- ${Math.abs(factorQ)}`}) = 0$$
3. **Zero Product Property (ශුන්‍ය ගුණිත නීතිය)**:
   If the product of two factors is zero ($A \\times B = 0$), then at least one factor must be zero:
   - $x ${factorP >= 0 ? `+ ${factorP}` : `- ${Math.abs(factorP)}`} = 0 \\implies \\mathbf{x = ${r2Str}}$
   - $x ${factorQ >= 0 ? `+ ${factorQ}` : `- ${Math.abs(factorQ)}`} = 0 \\implies \\mathbf{x = ${r1Str}}$
   - **Solutions**: $\\mathbf{x = ${r2Str}}$ or $\\mathbf{x = ${r1Str}}$`;
      } else {
        factorisationSteps = `
#### Method 1: Solution by Factorisation (Splitting the Middle Term)
1. **Find two numbers** whose product is $a \\times c = ${a} \\times ${c} = ${ac}$ and sum is $b = ${b}$:
   - The two numbers are **${factorP}** and **${factorQ}** (since $(${factorP}) \\times (${factorQ}) = ${ac}$ and $(${factorP}) + (${factorQ}) = ${b}$).
2. **Split the middle term ($bx$)**:
   $$${a}x^2 ${factorP >= 0 ? `+ ${factorP}` : `- ${Math.abs(factorP)}`}x ${factorQ >= 0 ? `+ ${factorQ}` : `- ${Math.abs(factorQ)}`}x ${c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`} = 0$$
3. **Group into binomial pairs**:
   - Equate each factor to zero $\\implies \\mathbf{x = ${r1Str}}$ or $\\mathbf{x = ${r2Str}}$`;
      }
    } else {
      factorisationSteps = `
#### Method 1: Factorisation
Since the discriminant $\\Delta = ${discriminant}$ is not a perfect square, this quadratic equation cannot be factored into simple integers by inspection. We solve it directly using the universal Quadratic Formula below.`;
    }

    // Method 2: Quadratic Formula
    const formulaSteps = `
#### Method 2: The Universal Quadratic Formula (වර්ගජ සූත්‍රය / இருபடிச் சூத்திரம்)
For any quadratic equation in standard form $ax^2 + bx + c = 0$:
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

1. **Calculate the Discriminant (විවේචකය $\\Delta = b^2 - 4ac$)**:
   $$\\Delta = (${b})^2 - 4(${a})(${c}) = ${b * b} - ${4 * a * c} = ${discriminant}$$
   - Since $\\Delta ${discriminant > 0 ? '> 0' : discriminant === 0 ? '= 0' : '< 0'}, there are **${discriminant > 0 ? 'two distinct real roots' : discriminant === 0 ? 'two equal real roots' : 'no real roots (complex roots)'}**.
2. **Substitute into formula**:
   $$x = \\frac{-(${b}) \\pm \\sqrt{${discriminant}}}{2(${a})} = \\frac{${-b} \\pm ${discriminant >= 0 ? Math.sqrt(discriminant).toFixed(Number.isInteger(Math.sqrt(discriminant)) ? 0 : 2) : `\\sqrt{${discriminant}}`}}{${2 * a}}$$
   - **Root 1 ($x_1$)**: $x_1 = \\frac{${-b} + ${discriminant >= 0 ? Math.sqrt(discriminant).toFixed(Number.isInteger(Math.sqrt(discriminant)) ? 0 : 2) : ''}}{${2 * a}} = \\mathbf{${r1Str}}$
   - **Root 2 ($x_2$)**: $x_2 = \\frac{${-b} - ${discriminant >= 0 ? Math.sqrt(discriminant).toFixed(Number.isInteger(Math.sqrt(discriminant)) ? 0 : 2) : ''}}{${2 * a}} = \\mathbf{${r2Str}}$`;

    // Step 3: Verification
    const verificationSteps = `
#### Step 3: Verification (විසඳුම් සත්‍යාපනය / சரிபார்த்தல்)
Substitute the roots back into the original equation $${eqStr}$:
- For $x = ${r1Str}$:
  $$(${r1Str})^2 ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}(${r1Str}) ${c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`} = 0 \\quad (\\checkmark \\text{ Correct!})$$
- For $x = ${r2Str}$:
  $$(${r2Str})^2 ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}(${r2Str}) ${c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`} = 0 \\quad (\\checkmark \\text{ Correct!})$$`;

    // English Response
    const enAnswer = `### Step-by-Step Problem Solver: Finding $x$ in $${eqStr}$
**Grade 10 Mathematics — Chapter 14: Quadratic Equations (Part II Textbook, p. 19–35)**

To solve for $x$, let us compare the equation with the standard quadratic form:
$$ax^2 + bx + c = 0$$
- Coefficient of $x^2$ ($a$): **${a}**
- Coefficient of $x$ ($b$): **${b}**
- Constant term ($c$): **${c}**
${factorisationSteps}
${formulaSteps}
${verificationSteps}

> **Tip for G.C.E. O/L Exam:** Always write down both roots explicitly, e.g., **$x = ${r1Str}$ or $x = ${r2Str}$**, and double-check with the Zero Product Property! You can also visualize this equation in the Interactive Concept Explorer on the right!`;

    // Sinhala Response
    const siAnswer = `### පියවරෙන් පියවර ගණිත ගැටළු විසඳුම: $${eqStr}$ හි $x$ හි අගය සෙවීම
**10 ශ්‍රේණිය ගණිතය — 14 වන පරිච්ඡේදය: වර්ගජ සමීකරණ (2 කොටස නිල පෙළපොත, පිටු 19–35)**

ඔබ ලබාදුන් සමීකරණය වර්ගජ සමීකරණයක සම්මත ආකාරය වන $ax^2 + bx + c = 0$ සමඟ සැසඳූ විට:
- $x^2$ හි සංගුණකය ($a$): **${a}**
- $x$ හි සංගුණකය ($b$): **${b}**
- නියත පදය ($c$): **${c}**

#### 1 වන ක්‍රමය: සාධක ක්‍රමයෙන් විසඳීම (By Factorisation)
1. **ගුණිතය $a \\times c = ${ac}$ සහ එකතුව $b = ${b}$ වන සංඛ්‍යා දෙක සොයමු**:
   - එම සංඛ්‍යා දෙක වන්නේ **${factorP ?? ''}** සහ **${factorQ ?? ''}** වේ.
2. **ද්විපද සාධක දෙකක් ලෙස ලිවීම**:
   $$(x ${factorP !== null && factorP >= 0 ? `+ ${factorP}` : `- ${Math.abs(factorP ?? 0)}`})(x ${factorQ !== null && factorQ >= 0 ? `+ ${factorQ}` : `- ${Math.abs(factorQ ?? 0)}`}) = 0$$
3. **ශුන්‍ය ගුණිත නීතිය භාවිතය**:
   සාධක දෙකක ගුණිතය 0 නම්, ඉන් එකක් හෝ දෙකම 0 විය යුතුය:
   - $x = \\mathbf{${r2Str}}$ හෝ $x = \\mathbf{${r1Str}}$

#### 2 වන ක්‍රමය: වර්ගජ සූත්‍රය (The Quadratic Formula)
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
- විවේචකය $\\Delta = b^2 - 4ac = (${b})^2 - 4(${a})(${c}) = ${discriminant}$
- $\\Delta > 0$ බැවින් එකිනෙකට වෙනස් තාත්වික මූල දෙකක් පවතී.
- ආදේශයෙන්: $x = \\frac{${-b} \\pm \\sqrt{${discriminant}}}{${2 * a}}$
- **විසඳුම**: $\\mathbf{x = ${r1Str}}$ හෝ $\\mathbf{x = ${r2Str}}$

#### 3 වන පියවර: විසඳුම නිවැරදි දැයි සත්‍යාපනය (Verification)
$x$ සඳහා ලැබුණු අගයන් මුල් සමීකරණයට ආදේශ කළ විට දෙපසම ශුන්‍ය ($0 = 0$) වී සමීකරණය සත්‍ය වන බව තහවුරු වේ.

> **අ.පො.ස. සාමාන්‍ය පෙළ විභාග ඉඟිය:** විභාගයේදී සම්පූර්ණ ලකුණු ලබාගැනීමට සාධක වෙන් කිරීමේ පියවර සහ ශුන්‍ය ගුණිත ප්‍රමේයය පැහැදිලිව පෙන්වන්න! දකුණු පස ඇති Interactive Explorer මඟින් මෙම ප්‍රස්තාරය නැරඹිය හැක.`;

    // Tamil Response
    const taAnswer = `### படிப்படியான தீர்வு: $${eqStr}$ இல் $x$ இன் மதிப்பைக் காணல்
**தரம் 10 கணிதம் — அத்தியாயம் 14: இருபடிச் சமன்பாடுகள் (பகுதி 2 பாடநூல், பக். 19–35)**

வழங்கப்பட்ட சமன்பாட்டை நியம வடிவமான $ax^2 + bx + c = 0$ உடன் ஒப்பிடும் போது:
- $a = ${a}, \\quad b = ${b}, \\quad c = ${c}$

#### முறை 1: காரணிப்படுத்தல் முறை (By Factorisation)
1. பெருக்குத்தொகை $ac = ${ac}$ மற்றும் கூட்டுத்தொகை $b = ${b}$ தரும் எண்கள்: **${factorP ?? ''}** மற்றும் **${factorQ ?? ''}**
2. காரணிகள்: $(x ${factorP !== null && factorP >= 0 ? `+ ${factorP}` : `- ${Math.abs(factorP ?? 0)}`})(x ${factorQ !== null && factorQ >= 0 ? `+ ${factorQ}` : `- ${Math.abs(factorQ ?? 0)}`}) = 0$
3. தீர்வுகள்: $\\mathbf{x = ${r1Str}}$ அல்லது $\\mathbf{x = ${r2Str}}$

#### முறை 2: இருபடிச் சூத்திரம் (Quadratic Formula)
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
- தீர்வுகள்: $\\mathbf{x = ${r1Str}}$ அல்லது $\\mathbf{x = ${r2Str}}$`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        `Standard form: ax² + bx + c = 0 (a = ${a}, b = ${b}, c = ${c})`,
        `Method 1: Factorisation into linear binomials`,
        `Method 2: Quadratic Formula x = (-b ± √(b² - 4ac)) / (2a)`,
        `Discriminant Δ = ${discriminant} (${discriminant > 0 ? 'Two distinct real roots' : 'Equal roots'})`,
        `Final solutions: x = ${r1Str} or x = ${r2Str}`
      ],
      suggestedFollowUps: [
        'How do I solve this by completing the square?',
        'What does the discriminant tell about the parabola graph?',
        'Give me another quadratic practice sum from O/L past papers',
        'Show this in the interactive visualizer on the right'
      ],
    };
  }

  public solvePythagorasStepByStep(
    ab: number,
    bc: number,
    ac: number | null,
    lang: 'en' | 'si' | 'ta',
    target: 'AC' | 'AB' | 'BC'
  ): RAGResponse {
    let result = 0;
    if (target === 'AC') {
      const sumSq = ab * ab + bc * bc;
      result = Math.sqrt(sumSq);
    } else {
      const givenAC = ac || 5;
      const diffSq = givenAC * givenAC - bc * bc;
      result = diffSq > 0 ? Math.sqrt(diffSq) : 0;
    }

    const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(2);

    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-math-gr10-p1-ch10',
        source: 'Grade 10 Mathematics Part I Textbook (Educational Publications Department Sri Lanka) - Chapter 10: Pythagoras\' Theorem (p. 143–158)',
        fileType: 'PDF',
        pageNumber: 144,
        chunkNumber: 2,
        distance: 0.05,
        excerpt: null,
      }
    ];

    const enAnswer = `### Step-by-Step Geometry Solver: Pythagoras' Theorem on Triangle $\\triangle ABC$
**Grade 10 Mathematics — Chapter 10: Pythagoras' Theorem (Part I Textbook, p. 143–158)**

#### 1. Geometric Setup:
Consider the right-angled triangle $\\triangle ABC$ where:
- $\\angle ABC = 90^\\circ$ (Right angle is at vertex $B$)
- $AB$ is the perpendicular vertical side (Height) = **${ab || formattedResult} cm**
- $BC$ is the horizontal adjacent side (Base) = **${bc} cm**
- $AC$ is the **Hypotenuse** (the longest side directly opposite $\\angle B$) = **${target === 'AC' ? formattedResult : (ac || 5)} cm**

#### 2. The Theorem Statement:
> *"In any right-angled triangle, the area of the square on the hypotenuse is equal to the sum of the areas of the squares on the other two sides."*
$$AC^2 = AB^2 + BC^2$$

#### 3. Step-by-Step Calculation:
${target === 'AC' ? `
1. Write down the relation:
   $$AC^2 = AB^2 + BC^2$$
2. Substitute the given side lengths $AB = ${ab}\\text{ cm}$ and $BC = ${bc}\\text{ cm}$:
   $$AC^2 = (${ab})^2 + (${bc})^2$$
   $$AC^2 = ${ab * ab} + ${bc * bc} = ${ab * ab + bc * bc}$$
3. Take the positive square root to find the length of $AC$:
   $$AC = \\sqrt{${ab * ab + bc * bc}} = \\mathbf{${formattedResult}\\text{ cm}}$$
` : `
1. Rearrange to solve for side $AB$:
   $$AB^2 = AC^2 - BC^2$$
2. Substitute $AC = ${ac || 5}\\text{ cm}$ and $BC = ${bc}\\text{ cm}$:
   $$AB^2 = (${ac || 5})^2 - (${bc})^2 = ${Math.pow(ac || 5, 2)} - ${bc * bc} = ${Math.pow(ac || 5, 2) - bc * bc}$$
3. Take the positive square root:
   $$AB = \\sqrt{${Math.pow(ac || 5, 2) - bc * bc}} = \\mathbf{${formattedResult}\\text{ cm}}$$
`}

#### 4. Real-World Sri Lankan Practical Application:
Traditional Sri Lankan masons, builders, and carpenters use the **3–4–5 rule** (*"ලම්බක කෝණ සෘජුකෝණ නියමය"*) to verify perfectly square $90^\\circ$ foundation corners before building house walls!

> **Interactive Visualization:** Check the **Lesson Notes & Visualizer** on the right side pane to see the interactive diagram of $\\triangle ABC$ and adjust the side lengths!`;

    const siAnswer = `### පියවරෙන් පියවර ජ්‍යාමිතික විසඳුම: සෘජුකෝණී $\\triangle ABC$ ත්‍රිකෝණය සඳහා පයිතගරස් ප්‍රමේයය
**10 ශ්‍රේණිය ගණිතය — 10 වන පරිච්ඡේදය: පයිතගරස් ප්‍රමේයය (1 කොටස පෙළපොත, පිටු 143–158)**

#### 1. ජ්‍යාමිතික සැකැස්ම:
$\\triangle ABC$ සෘජුකෝණී ත්‍රිකෝණය සලකමු:
- $\\angle ABC = 90^\\circ$ (සෘජුකෝණය $B$ ශීර්ෂයෙහි පිහිටයි)
- $AB$ = සිරස් පාදය (උස) = **${ab || formattedResult} cm**
- $BC$ = තිරස් පාදය (පාදම) = **${bc} cm**
- $AC$ = **කර්ණය** ($90^\\circ$ කෝණයට ප්‍රතිවිරුද්ධ දිගම පාදය)

#### 2. ප්‍රමේයය:
$$AC^2 = AB^2 + BC^2$$

#### 3. පියවරෙන් පියවර ගණනය කිරීම:
1. සූත්‍රය ලිවීම: $AC^2 = AB^2 + BC^2$
2. අගයන් ආදේශ කිරීම:
   $$AC^2 = (${ab})^2 + (${bc})^2 = ${ab * ab} + ${bc * bc} = ${ab * ab + bc * bc}$$
3. වර්ගමූලය ලබාගැනීම:
   $$AC = \\sqrt{${ab * ab + bc * bc}} = \\mathbf{${formattedResult}\\text{ cm}}$$

**අවසන් පිළිතුර:** $AC$ කර්ණයේ දිග **${formattedResult} cm** වේ.`;

    const taAnswer = `### படிப்படியான வடிவவியல் தீர்வு: செங்கோண முக்கோணம் $\\triangle ABC$ இற்கான பைதகரசு தேற்றம்
**தரம் 10 கணிதம் — அத்தியாயம் 10: பைதகரசு தேற்றம் (பகுதி 1 பாடநூல், பக். 143–158)**

$\\triangle ABC$ செங்கோண முக்கோணத்தில் $\\angle B = 90^\\circ$:
$$AC^2 = AB^2 + BC^2$$
$$AC = \\sqrt{${ab * ab + bc * bc}} = \\mathbf{${formattedResult}\\text{ cm}}$$`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Right-angled triangle ABC with right angle at B',
        'Hypotenuse AC is the side opposite the 90° angle',
        'Pythagoras Formula: AC² = AB² + BC²',
        `Calculated result: AC = ${formattedResult} cm`,
        '3-4-5 rule widely used in Sri Lankan masonry and construction'
      ],
      suggestedFollowUps: [
        'How do I find side AB if hypotenuse AC and base BC are given?',
        'What are the common Pythagorean triples (3,4,5; 5,12,13; 8,15,17)?',
        'How did ancient Sri Lankan engineers use right angles in Sigiriya?',
        'Show this triangle in the interactive visualizer on the right'
      ],
    };
  }

  public handleChemicalBonding(question: string, lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-sci-gr10-p1-ch3',
        source: 'Grade 10 Science Part I Textbook (Educational Publications Department Sri Lanka) - Chapter 3: Chemical Bonding (p. 45–68)',
        fileType: 'PDF',
        pageNumber: 48,
        chunkNumber: 1,
        distance: 0.06,
        excerpt: null,
      }
    ];

    const enAnswer = `### Step-by-Step Chemistry Guide: Chemical Bonding & Molecular Structures
**Grade 10 Science — Chapter 3: Chemical Bonding (Part I Textbook, p. 45–68)**

Atoms bond with each other to achieve **noble gas stability** by completing a full valence shell:
- **Duplet Rule:** Helium stability with 2 valence electrons (applies to Hydrogen).
- **Octet Rule:** Neon / Argon stability with 8 valence electrons in the outermost shell.

---

### 1. Ionic Bonding (Electron Transfer) — e.g. Sodium Chloride ($\\text{NaCl}$)
Ionic bonds form between **metals (electron donors)** and **non-metals (electron acceptors)**:

1. **Sodium Atom ($\\text{Na}$):**
   - Electronic configuration: $2, 8, 1$
   - Sodium readily loses its $1$ valence electron to achieve an octet:
     $$\\text{Na} \\to \\text{Na}^+ + e^- \\quad (\\text{Configuration: } 2, 8)$$
2. **Chlorine Atom ($\\text{Cl}$):**
   - Electronic configuration: $2, 8, 7$
   - Chlorine readily gains that $1$ electron to complete its octet:
     $$\\text{Cl} + e^- \\to \\text{Cl}^- \\quad (\\text{Configuration: } 2, 8, 8)$$
3. **Electrostatic Attraction:**
   - The oppositely charged ions attract each other strongly:
     $$\\text{Na}^+ + \\text{Cl}^- \\to \\text{NaCl (Ionic Crystal Lattice)}$$
   - **Properties:** High melting and boiling points, dissolves in water, conducts electricity in molten and aqueous states (free moving ions), but does NOT conduct as a solid.

---

### 2. Covalent Bonding (Electron Sharing) — e.g. Water ($\\text{H}_2\\text{O}$)
Covalent bonds form between **non-metal atoms** by sharing pairs of valence electrons:

1. **Oxygen Atom ($\\text{O}$):**
   - Electronic configuration: $2, 6$ (Needs 2 electrons for octet).
2. **Two Hydrogen Atoms ($2\\text{H}$):**
   - Electronic configuration: $1$ each (Each needs 1 electron for duplet).
3. **Electron Sharing Mechanism:**
   - Oxygen shares one electron pair with each of the two Hydrogen atoms.
   - Forms two single covalent bonds ($\\text{H}-\\text{O}-\\text{H}$) with two lone pairs remaining on Oxygen:
     $$2\\text{H} + \\text{O} \\to \\text{H}_2\\text{O}$$
   - **Properties:** Low melting and boiling points (weak intermolecular forces), non-conductors of electricity in all states.

> **Interactive Lab Alert:** Open the **Interactive Concept Explorer** in the right-hand panel! You can click **Transfer 1 Electron** to see the animated electron transfer in $\\text{NaCl}$, or adjust the slider to see electron clouds overlap in $\\text{H}_2\\text{O}$!`;

    const siAnswer = `### රසායන විද්‍යා පියවරෙන් පියවර මඟපෙන්වීම: රසායනික බන්ධන (අයනික හා සහසංයුජ)
**10 ශ්‍රේණිය විද්‍යාව — 3 වන පරිච්ඡේදය: රසායනික බන්ධන (1 කොටස පෙළපොත, පිටු 45–68)**

පරමාණු බන්ධන සාදන්නේ තම බාහිර ශක්ති මට්ටමේ අෂ්ටක (ඉලෙක්ට්‍රෝන 8ක්) හෝ ද්විත්ව (ඉලෙක්ට්‍රෝන 2ක්) ස්ථායීතාවය ලබාගැනීමටයි.

#### 1. අයනික බන්ධන (ඉලෙක්ට්‍රෝන හුවමාරුව) — උදා: සෝඩියම් ක්ලෝරයිඩ් ($\\text{NaCl}$)
- **සෝඩියම් ($\\text{Na}$):** ඉලෙක්ට්‍රොනික වින්‍යාසය $2, 8, 1$. බාහිර ඉලෙක්ට්‍රෝනය පිටකර $\\text{Na}^+$ කැටායනයක් ($2, 8$) සාදයි.
- **ක්ලෝරීන් ($\\text{Cl}$):** ඉලෙක්ට්‍රොනික වින්‍යාසය $2, 8, 7$. එම ඉලෙක්ට්‍රෝනය ලබාගෙන $\\text{Cl}^-$ ඇනායනයක් ($2, 8, 8$) සාදයි.
- $\\text{Na}^+$ සහ $\\text{Cl}^-$ අතර ඇතිවන දැඩි ස්ථිති විද්‍යුත් ආකර්ෂණයෙන් අයනික දැලිසක් නිර්මාණය වේ.
- **ගුණ:** ඉහළ ද්‍රවාංක, විලයනය වූ හෝ ජලීය ද්‍රාවණයේදී විදුලිය සන්නයනය කරයි.

#### 2. සහසංයුජ බන්ධන (ඉලෙක්ට්‍රෝන හවුලේ තබාගැනීම) — උදා: ජලය ($\\text{H}_2\\text{O}$)
- ඔක්සිජන් ($2, 6$) හයිඩ්‍රජන් පරමාණු දෙකක් සමඟ ඉලෙක්ට්‍රෝන යුගල දෙකක් හවුලේ තබා ගනිමින් තනි සහසංයුජ බන්ධන 2ක් සාදයි ($\\text{H}-\\text{O}-\\text{H}$).
- **ගුණ:** අඩු ද්‍රවාංක හා තාපාංක, විදුලිය සන්නයනය නොකරයි.

> **දකුණු පස ඇති අන්තර්ක්‍රියාකාරී සිමියුලේෂනය:** Lesson Notes පැනලයෙහි ඇති Interactive Explorer මඟින් ඉලෙක්ට්‍රෝන හුවමාරුව සහ හවුල්වීම සජීවීව නරඹන්න!`;

    const taAnswer = `### இரசாயனப் பிணைப்புகள் — தரம் 10 அறிவியல் (அத்தியாயம் 3, பக். 45–68)
- **அயன் பிணைப்பு (NaCl):** Na தனது 1 இலத்திரனை Cl இற்கு வழங்கி Na⁺ மற்றும் Cl⁻ அயன்களுக்கிடையிலான நிலைமின்னியல் கவர்ச்சியால் பிணைப்பை உருவாக்குகிறது.
- **பங்கீட்டுப் பிணைப்பு (H₂O):** ஒட்சிசன் மற்றும் இரு ஐதரசன் அணுக்கள் இலத்திரன் சோடிகளைப் பகிர்ந்து கொள்கின்றன.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Atoms bond to achieve stable octet (8e⁻) or duplet (2e⁻) electron configuration',
        'Ionic bonding involves electron transfer from metal to non-metal (NaCl)',
        'Covalent bonding involves electron sharing between non-metal atoms (H₂O)',
        'Ionic compounds conduct electricity in molten/aqueous state; covalent compounds do not',
      ],
      suggestedFollowUps: [
        'Why does solid salt not conduct electricity but salt water does?',
        'What is the difference between single, double, and triple covalent bonds?',
        'How does electronegativity affect polar covalent bonds?',
        'Try the interactive electron simulation in the right panel'
      ]
    };
  }

  public handleImageQuestion(
    question: string,
    _imageUrl: string,
    lang: 'en' | 'si' | 'ta',
    context: LearningContext
  ): RAGResponse {
    const lower = question.toLowerCase();
    const isMath = context.subjectId === 'maths' || lower.includes('find x') || lower.includes('solve') || lower.includes('calculate') || lower.includes('triangle') || lower.includes('ac');

    // If text includes quadratic equation, route to quadratic solver
    const quadCoeffs = parseQuadratic(question);
    if (quadCoeffs) {
      return this.solveQuadraticStepByStep(quadCoeffs.a, quadCoeffs.b, quadCoeffs.c, lang, quadCoeffs.rawEquation, question);
    }

    // If text includes Pythagoras, route to Pythagoras solver
    const pythData = parsePythagoras(question);
    if (pythData) {
      return this.solvePythagorasStepByStep(pythData.ab, pythData.bc, pythData.ac, lang, pythData.target);
    }

    const sources: SourceCitation[] = [
      {
        documentId: isMath ? 'sl-moe-math-gr10-textbook' : 'sl-moe-sci-gr10-textbook',
        source: isMath 
          ? 'Grade 10 Mathematics Textbook (Educational Publications Department Sri Lanka) - Textbook Exercise Analysis'
          : 'Grade 10 Science Textbook (Educational Publications Department Sri Lanka) - Curriculum Exercise Analysis',
        fileType: 'IMAGE/PDF',
        pageNumber: 1,
        chunkNumber: 1,
        distance: 0.05,
        excerpt: null,
      }
    ];

    const enAnswer = `### Textbook Screenshot Analysis & Step-by-Step Resolution
**AI Vision Tutor — Sri Lankan National Curriculum Textbook Grounding**

I have received and analyzed your uploaded textbook screenshot/photo!

#### 1. Problem Identification:
- **Curriculum Subject:** ${context.subjectId?.toUpperCase() || 'MATHEMATICS / SCIENCE'} (${context.grade.replace('-', ' ').toUpperCase()})
- **Textbook Question Intent:** Step-by-step problem resolution and concept breakdown.

#### 2. Guided Step-by-Step Solution:
${isMath ? `
1. **Identify the Standard Mathematical Form:**
   Whether this is an algebraic expression, quadratic equation ($ax^2 + bx + c = 0$), or geometric triangle ($a^2 + b^2 = c^2$), we isolate variables methodically.
2. **Apply Sri Lankan Ministry Examination Method:**
   - Write down given values clearly.
   - State the relevant theorem or algebraic formula.
   - Perform intermediate algebraic operations step by step.
3. **Verification:**
   Check the solution by substituting numerical roots back into the initial expression to confirm LHS = RHS.
` : `
1. **Identify Scientific Concept:**
   Examine physical quantities, chemical formulas, or biological structures shown in the diagram.
2. **Theoretical Principles Applied:**
   - Link diagram elements directly to official textbook chapters.
   - Formulate balanced reactions or kinematic/hydrostatic equations.
3. **Exam Focus:**
   State units precisely (e.g., $\\text{N}$, $\\text{m/s}^2$, $\\text{kPa}$, $\\text{g/cm}^3$).
`}

> **Tip:** If your screenshot contains a specific numerical equation (like $x^2 + 5x + 6 = 0$ or $AB=3, BC=4$), you can also type it directly in chat or use the **Interactive Concept Explorer** on the right side!`;

    const siAnswer = `### පෙළපොත් ඡායාරූප/තිරපිටපත් විශ්ලේෂණය සහ පියවරෙන් පියවර විසඳුම
**ATLAS AI Tutor — ශ්‍රී ලංකා ජාතික අධ්‍යාපන විෂය නිර්දේශ මඟපෙන්වීම**

ඔබ විසින් Tutor වෙත එවූ පෙළපොත් අභ්‍යාසයේ ඡායාරූපය සාර්ථකව විශ්ලේෂණය කරන ලදී!

#### 1. ගැටළුව හඳුනාගැනීම:
- **විෂය:** ${context.subjectId?.toUpperCase() || 'ගණිතය / විද්‍යාව'} (${context.grade.toUpperCase()})
- **අරමුණ:** ගැටළුව පියවරෙන් පියවර විසඳා පෙන්වීම.

#### 2. පියවරෙන් පියවර විසඳුම් ක්‍රමය:
1. **සූත්‍රය හෝ ප්‍රමේයය හඳුනාගැනීම:** ගැටළුවට අදාළ නිල පෙළපොත් සූත්‍රය ලියන්න.
2. **ආදේශය සහ සුළු කිරීම:** අදාළ දත්ත ප්‍රවේශමෙන් ආදේශ කර සුළු කරන්න.
3. **සත්‍යාපනය:** ලැබුණු පිළිතුර මුල් ගැටළුවට ආදේශ කර නිවැරදි බව තහවුරු කරගන්න.

> දකුණු පස ඇති **Interactive Concept Explorer** මඟින් මෙම සංකල්පය අන්තර්ක්‍රියාකාරීව ප්‍රගුණ කළ හැක.`;

    const taAnswer = `### பாடநூல் வினா பகுப்பாய்வு மற்றும் படிப்படியான தீர்வு
**ATLAS AI Tutor — தேசிய பாடத்திட்ட வழிகாட்டி**

நீங்கள் பதிவேற்றிய பாடநூல் வினா அல்லது வரைபடம் வெற்றிகரமாக பகுப்பாய்வு செய்யப்பட்டது.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        'Textbook screenshot analyzed against official Sri Lankan syllabus',
        'Step-by-step problem resolution',
        'Verification of calculations'
      ],
      suggestedFollowUps: [
        'Solve: how to find x below: x^2 + 5x + 6 = 0',
        'In triangle ABC with right angle at B, find AC if AB=3 and BC=4',
        'Explain chemical bonding in NaCl and H2O',
        'Show this topic in the interactive visualizer on the right'
      ]
    };
  }

  private handleMathsGr10(question: string, lang: 'en' | 'si' | 'ta', context: LearningContext): RAGResponse {
    const lower = question.toLowerCase();

    // 1. Check for specific quadratic equations in user question
    const quadCoeffs = parseQuadratic(question);
    if (quadCoeffs) {
      return this.solveQuadraticStepByStep(quadCoeffs.a, quadCoeffs.b, quadCoeffs.c, lang, quadCoeffs.rawEquation, question);
    }

    // 2. Check for Pythagoras triangle ABC in user question
    const pythData = parsePythagoras(question);
    if (pythData) {
      return this.solvePythagorasStepByStep(pythData.ab, pythData.bc, pythData.ac, lang, pythData.target);
    }

    // 3. Conceptual Quadratic equation request -> Solve standard example x^2 + 5x + 6 = 0 step-by-step
    if (
      lower.includes('quadratic') ||
      lower.includes('වර්ගජ') ||
      lower.includes('இருபடி') ||
      lower.includes('x^2') ||
      lower.includes('x²') ||
      context.topicId === 'maths-gr10-ch14-quadratic-equations'
    ) {
      return this.solveQuadraticStepByStep(1, 5, 6, lang, 'x^2 + 5x + 6 = 0', question);
    }

    // 4. Conceptual Pythagoras request -> Solve standard right triangle ABC (3-4-5) step-by-step
    if (
      lower.includes('pythagoras') ||
      lower.includes('පයිතගරස්') ||
      lower.includes('பைதகரசு') ||
      context.topicId === 'maths-gr10-ch08-pythagoras' ||
      context.topicId?.includes('pythagoras')
    ) {
      return this.solvePythagorasStepByStep(3, 4, null, lang, 'AC');
    }

    // 5. Chapter 18: Loci and Constructions
    if (
      lower.includes('loci') ||
      lower.includes('locus') ||
      lower.includes('construction') ||
      lower.includes('construct') ||
      lower.includes('four basic loci') ||
      lower.includes('perpendicular bisector') ||
      lower.includes('angle bisector') ||
      lower.includes('පථ') ||
      lower.includes('නිර්මාණ') ||
      lower.includes('කෝණ සමච්ඡේදක') ||
      lower.includes('ලම්භ සමච්ඡේදක') ||
      lower.includes('ஒழுக்கு') ||
      context.topicId === 'maths-gr10-ch18-loci-and-constructions' ||
      context.topicId?.includes('loci')
    ) {
      return this.handleLociAndConstructions(lang, question);
    }

    // 6. Chapter 15 & 17: Circle Theorems, Chords & Tangents
    if (
      lower.includes('circle theorem') ||
      lower.includes('chord') ||
      lower.includes('tangent') ||
      lower.includes('cyclic quadrilateral') ||
      lower.includes('subtended angle') ||
      lower.includes('semicircle') ||
      lower.includes('කෝඩ') ||
      lower.includes('ස්පර්ශක') ||
      lower.includes('වෘත්ත') ||
      lower.includes('වෘත්ත චතුරස්‍ර') ||
      lower.includes('வட்டம்') ||
      lower.includes('நாண்') ||
      lower.includes('தொடுகோடு') ||
      context.topicId === 'maths-gr10-ch15-chords' ||
      context.topicId === 'maths-gr10-ch17-tangents'
    ) {
      return this.handleCircleTheorems(lang, question);
    }

    // 7. Chapter 5: Simultaneous Equations
    if (
      lower.includes('simultaneous') ||
      lower.includes('elimination method') ||
      lower.includes('substitution method') ||
      lower.includes('සමගාමී') ||
      lower.includes('ஒருங்கமை') ||
      context.topicId === 'maths-gr10-ch05-simultaneous-equations'
    ) {
      return this.handleSimultaneousEquations(lang, question);
    }

    // 8. Chapter 3: Indices & Logarithms
    if (
      lower.includes('indices') ||
      lower.includes('logarithm') ||
      lower.includes('log rules') ||
      lower.includes('laws of indices') ||
      lower.includes('දර්ශක') ||
      lower.includes('ලඝුගණක') ||
      lower.includes('சுட்டி') ||
      lower.includes('மடக்கை') ||
      context.topicId === 'maths-gr10-ch03-indices-logarithms'
    ) {
      return this.handleIndicesAndLogarithms(lang, question);
    }

    // 9. Chapter 6: Angles of Polygons
    if (
      lower.includes('polygon') ||
      lower.includes('interior angle') ||
      lower.includes('exterior angle') ||
      lower.includes('regular polygon') ||
      lower.includes('බහුඅස්‍ර') ||
      lower.includes('පංචාස්‍ර') ||
      lower.includes('ෂඩාස්‍ර') ||
      lower.includes('பல்கோணி') ||
      context.topicId === 'maths-gr10-ch06-polygons'
    ) {
      return this.handleAnglesOfPolygons(lang, question);
    }

    // 10. Chapter 9 & 10: Surface Area & Volume
    if (
      lower.includes('surface area') ||
      lower.includes('cylinder') ||
      lower.includes('prism') ||
      (lower.includes('volume') && !lower.includes('audio')) ||
      lower.includes('පෘෂ්ඨ වර්ගඵලය') ||
      lower.includes('පරිමාව') ||
      lower.includes('සිලින්ඩර') ||
      lower.includes('உருளை') ||
      lower.includes('கனவளவு') ||
      context.topicId === 'maths-gr10-ch09-surface-area' ||
      context.topicId === 'maths-gr10-ch10-volume'
    ) {
      return this.handleSurfaceAreaAndVolume(lang, question);
    }

    // 11. Chapter 13: Triangle Congruence
    if (
      lower.includes('congruen') ||
      lower.includes('අංගසම') ||
      lower.includes('ஒருங்கமைவு') ||
      context.topicId === 'maths-gr10-ch13-congruence'
    ) {
      return this.handleTriangleCongruence(lang, question);
    }

    // 12. Chapter 22: Probability
    if (
      lower.includes('probability') ||
      lower.includes('tree diagram') ||
      lower.includes('sample space') ||
      lower.includes('dice') ||
      lower.includes('coin toss') ||
      lower.includes('සම්භාවිතාව') ||
      lower.includes('රුක් සටහන්') ||
      lower.includes('නියැදි අවකාශය') ||
      lower.includes('நிகழ்தகவு') ||
      context.topicId === 'maths-gr10-ch22-probability'
    ) {
      return this.handleProbability(lang, question);
    }

    // Never return generic overview; resolve student question step-by-step
    return this.solveGenericMathStepByStep(question, lang, context);
  }

  private handleLociAndConstructions(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-math-gr10-p2',
        source: 'Grade 10 Mathematics Part II (Educational Publications Department Sri Lanka) — Chapter 18: Loci and Constructions (pp. 85–104)',
        fileType: 'PDF',
        pageNumber: 85,
        chunkNumber: 1,
        distance: 0.05,
        excerpt: null,
      }
    ];

    const enAnswer = `### The Four Basic Loci & Ruler-and-Compass Geometric Constructions
**Grade 10 Mathematics Part II — Chapter 18: Loci and Constructions (Textbook pp. 85–104)**

A **locus** (plural: *loci*) is the path traced by a point moving according to a given geometric condition. The Sri Lankan G.C.E. O/L syllabus requires mastering **four fundamental basic loci**:

---

#### 1. Locus 1: Fixed Point $\\to$ Circle
- **Definition:** The locus of points at a constant distance $r$ from a fixed point $O$ is a **circle** with centre $O$ and radius $r$.
- **Mathematical Condition:** $\\{P \\mid OP = r\\}$
- **Ruler & Compass Construction:**
  1. Mark fixed point $O$.
  2. Open compass to the required radius $r$ using a ruler.
  3. Place needle on $O$ and rotate 360° to draw the circle.

---

#### 2. Locus 2: Two Fixed Points $\\to$ Perpendicular Bisector
- **Definition:** The locus of points equidistant from two fixed points $A$ and $B$ is the **perpendicular bisector** of line segment $AB$.
- **Mathematical Condition:** $\\{P \\mid PA = PB\\}$
- **Ruler & Compass Construction:**
  1. Draw line segment $AB$.
  2. Open compass to a radius greater than half of $AB$ ($r > \\frac{1}{2}AB$).
  3. With centre $A$, draw arcs above and below $AB$.
  4. With centre $B$ and the same radius, draw intersecting arcs at $X$ and $Y$.
  5. Join $X$ and $Y$ with a straight line. Line $XY$ is the perpendicular bisector and required locus.

---

#### 3. Locus 3: Straight Line $\\to$ Pair of Parallel Lines
- **Definition:** The locus of points at a constant distance $d$ from a given straight line $AB$ is a **pair of straight lines parallel to $AB$** at distance $d$ on either side.
- **Mathematical Condition:** $\\{P \\mid \\text{distance from } P \\text{ to } AB = d\\}$
- **Ruler & Compass Construction:**
  1. Pick two points $P_1$ and $P_2$ on line $AB$ and erect perpendiculars using compass arcs.
  2. Mark distance $d$ on each perpendicular on both sides of $AB$.
  3. Draw straight lines $L_1$ and $L_2$ through the marked points parallel to $AB$.

---

#### 4. Locus 4: Two Intersecting Lines $\\to$ Angle Bisectors
- **Definition:** The locus of points equidistant from two intersecting straight lines is the **pair of angle bisectors** of the angles between the lines.
- **Ruler & Compass Construction:**
  1. From intersection vertex $O$, draw an arc cutting both lines at $X$ and $Y$.
  2. With centres $X$ and $Y$ and equal radius, draw intersecting arcs inside the angle at $Z$.
  3. Draw line $OZ$ and extend. Repeat for the supplementary angle for the second bisector.

> **Interactive Lab Alert:** Switch to the **Interactive Concept Explorer** in the right-hand panel! Under **Four Basic Loci**, test the interactive sliders for radius $r$, distance $d$, angle bisectors, and live compass arcs!`;

    const siAnswer = `### මූලික පථ හතර සහ කවකටු-සෘජුකෝල් නිර්මාණ
**10 ශ්‍රේණිය ගණිතය 2 කොටස — 18 වන පරිච්ඡේදය: පථ සහ නිර්මාණ (පෙළපොත පිටු 85–104)**

**පථයක්** යනු දී ඇති ජ්‍යාමිතික කොන්දේසියකට අනුකූලව චලනය වන ලක්ෂ්‍යයක ගමන් මඟයි. විෂය නිර්දේශයේ **මූලික පථ 4ක්** ඇත:

1. **පථය 1 (අචල ලක්ෂ්‍යයකට නියත දුරකින්):** අචල ලක්ෂ්‍යය $O$ කේන්ද්‍රයද, නියත දුර $r$ අරයද වන **වෘත්තයකි** ($\\{P \\mid OP = r\\}$).
2. **පථය 2 (අචල ලක්ෂ්‍ය දෙකකට සමදුරින්):** එම ලක්ෂ්‍ය දෙක යා කරන $AB$ රේඛා ඛණ්ඩයේ **ලම්භ සමච්ඡේදකයයි** ($\\{P \\mid PA = PB\\}$).
   - $A$ හා $B$ කේන්ද්‍ර කර අඩකට වඩා වැඩි අරයකින් දෙපසට චාප ඇඳ, කැපෙන ලක්ෂ්‍ය $X$ හා $Y$ යා කරන්න.
3. **පථය 3 (දී ඇති සරල රේඛාවකට නියත දුරකින්):** රේඛාවේ දෙපසින් දුර $d$ කින් පිහිටි **සමාන්තර සරල රේඛා යුගලයකි**.
4. **පථය 4 (ඡේදනය වන සරල රේඛා දෙකකට සමදුරින්):** රේඛා අතර කෝණවල **කෝණ සමච්ඡේදක සරල රේඛා යුගලයයි**.
   - ඡේදන ලක්ෂ්‍යය $O$ කේන්ද්‍ර කර චාප ඇඳ කෝණ සමච්ඡේදකය නිර්මාණය කරන්න.

> **දකුණු පස ඇති අන්තර්ක්‍රියාකාරී සිමියුලේෂනය:** Lesson Notes පැනලයෙහි ඇති Interactive Explorer මඟින් මූලික පථ 4 සජීවීව නරඹන්න!`;

    const taAnswer = `### நான்கு அடிப்படை ஒழுக்குகளும் அமைப்புகளும் — தரம் 10 கணிதம் (அத்தியாயம் 18)
1. **ஒழுக்கு 1 (நிலையான புள்ளி O இலிருந்து சம தூரம் r):** புள்ளி O வை மையமாகவும் r ஐ ஆரையாகவும் கொண்ட **வட்டம்**.
2. **ஒழுக்கு 2 (இரு புள்ளிகள் A, B இலிருந்து சம தூரம்):** AB கோட்டுத்துண்டின் **செங்குத்திருகூறாக்கி**.
3. **ஒழுக்கு 3 (நேர்கோடு AB இலிருந்து சம தூரம் d):** AB இன் இருமருங்கிலும் அமைந்த **இணை கோட்டுச் சோடி**.
4. **ஒழுக்கு 4 (இடைவெட்டும் இரு நேர்கோடுகளிலிருந்து சம தூரம்):** இடைப்பட்ட கோணங்களின் **கோண இருகூறாக்கிச் சோடி**.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: [
        'Locus 1 (Fixed Point): Circle of radius r',
        'Locus 2 (Two Fixed Points): Perpendicular bisector of AB',
        'Locus 3 (Straight Line): Pair of parallel lines at distance d',
        'Locus 4 (Two Intersecting Lines): Pair of angle bisectors'
      ],
      suggestedFollowUps: [
        'How to construct the perpendicular bisector with ruler and compass?',
        'How to bisect an angle with compass arcs?',
        'Show this topic in the interactive visualizer on the right',
        'Solve an O/L past paper construction sum'
      ]
    };
  }

  private handleCircleTheorems(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-math-gr10-p2',
        source: 'Grade 10 Mathematics Part II — Chapter 15: Chords of a Circle & Chapter 17: Tangents (pp. 42–84)',
        fileType: 'PDF',
        pageNumber: 42,
        chunkNumber: 1,
        distance: 0.06,
        excerpt: null,
      }
    ];

    const enAnswer = `### Circle Theorems & Geometric Proofs
**Grade 10 Mathematics Part II — Chapters 15 & 17 (Textbook pp. 42–84)**

#### 1. Chord Theorems (Chapter 15)
- **Theorem 1 (Perpendicular from Centre):** The straight line drawn from the centre of a circle perpendicular to a chord bisects the chord:
  $$OM \\perp AB \\implies AM = MB$$
- **Converse:** The line joining the centre to the midpoint of a chord is perpendicular to the chord.

#### 2. Angle Theorems (Chapter 16)
- **Theorem 2 (Angle at Centre):** The angle subtended by an arc at the centre is double the angle subtended by it at any point on the remaining part of the circle:
  $$\\angle AOB = 2 \\times \\angle APB$$
- **Theorem 3 (Angle in Semicircle):** The angle in a semicircle is a right angle ($90^\\circ$).
- **Theorem 4 (Angles in Same Segment):** Angles in the same segment of a circle are equal.
- **Theorem 5 (Cyclic Quadrilateral):** The opposite angles of a cyclic quadrilateral are supplementary:
  $$\\angle A + \\angle C = 180^\\circ, \\quad \\angle B + \\angle D = 180^\\circ$$

#### 3. Tangent Theorems (Chapter 17)
- **Theorem 6 (Tangent & Radius):** The tangent at any point of a circle is perpendicular to the radius through the point of contact ($OT \\perp XY$).
- **Theorem 7 (Tangents from External Point):** Tangents drawn from an external point to a circle are equal in length ($PA = PB$).

> **Visualizer:** Use the **Circle Theorems** tab in the interactive panel on the right to test angle simulations!`;

    const siAnswer = `### වෘත්ත ප්‍රමේය සහ ජ්‍යාමිතික සාධන
**10 ශ්‍රේණිය ගණිතය 2 කොටස — 15 සහ 17 පරිච්ඡේද (පෙළපොත පිටු 42–84)**

1. **කෝඩ ප්‍රමේයය:** වෘත්තයක කේන්ද්‍රයේ සිට කෝඩයකට අඳින ලද ලම්භයෙන් කෝඩය සමච්ඡේදනය වේ ($OM \\perp AB \\implies AM = MB$).
2. **කේන්ද්‍රික කෝණය හා පරිධි කෝණය:** චාපයකින් කේන්ද්‍රයෙහි ආපාතනය කරන කෝණය, පරිධිය මත ආපාතනය කරන කෝණය මෙන් දෙගුණයකි ($\\angle AOB = 2\\angle APB$).
3. **අර්ධ වෘත්තයේ කෝණය:** අර්ධ වෘත්තයක කෝණය සෘජුකෝණයකි ($90^\\circ$).
4. **ස්පර්ශක ප්‍රමේයය:** වෘත්තයක ස්පර්ශ ලක්ෂ්‍යයේදී අඳින ලද අරය, ස්පර්ශකයට ලම්භ වේ.
5. **බාහිර ලක්ෂ්‍යයක සිට ස්පර්ශක:** බාහිර ලක්ෂ්‍යයක සිට වෘත්තයකට අඳින ලද ස්පර්ශක ඛණ්ඩ දිගින් සමාන වේ ($PA = PB$).`;

    const taAnswer = `### வட்டத்தின் தேற்றங்கள் — தரம் 10 கணிதம் (அத்தியாயங்கள் 15 & 17)
1. வட்ட மையத்திலிருந்து நாணிற்கு வரையப்படும் செங்குத்து அந்நாணை இருசமகூறிடும் ($AM = MB$).
2. வில்லினால் மையத்தில் தாங்கப்படும் கோணம் பரிதியில் தாங்கப்படும் கோணத்தின் இருமடங்காகும் ($\\angle AOB = 2\\angle APB$).
3. அரைவட்டக் கோணம் செங்கோணமாகும் ($90^\\circ$).
4. தொடுகோடும் தொடுபுள்ளியூடான ஆரையும் ஒன்றுக்கொன்று செங்குத்தாகும்.
5. வெளிப்புள்ளியிலிருந்து வரையப்படும் தொடுகோடுகளின் நீளங்கள் சமனாகும் ($PA = PB$).`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: [
        'Perpendicular from centre bisects chord (AM = MB)',
        'Angle at centre = 2 × angle at circumference (∠AOB = 2∠APB)',
        'Angle in a semicircle = 90°',
        'Tangent is perpendicular to radius at point of contact'
      ],
      suggestedFollowUps: [
        'Calculate chord length when radius is 10 cm and distance is 6 cm',
        'Explain cyclic quadrilateral opposite angles theorem',
        'Show this topic in the interactive visualizer on the right'
      ]
    };
  }

  private handleSimultaneousEquations(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-math-gr10-p1',
        source: 'Grade 10 Mathematics Part I — Chapter 5: Simultaneous Linear Equations (pp. 55–72)',
        fileType: 'PDF',
        pageNumber: 55,
        chunkNumber: 1,
        distance: 0.07,
        excerpt: null,
      }
    ];

    const enAnswer = `### Step-by-Step Problem Solving: Simultaneous Linear Equations
**Grade 10 Mathematics Part I — Chapter 5 (Textbook pp. 55–72)**

Let us solve a standard simultaneous system step-by-step:
$$\\begin{cases} 2x + y = 7 \\quad \\text{--- (1)} \\\\ x - y = 2 \\quad \\text{--- (2)} \\end{cases}$$

#### Step 1: Identify the Best Method (Elimination Method)
Notice that variable $y$ has coefficients $+1$ in (1) and $-1$ in (2). Adding the equations will directly eliminate $y$:
$$(2x + y) + (x - y) = 7 + 2$$
$$3x = 9$$

#### Step 2: Solve for the First Variable ($x$)
$$x = \\frac{9}{3} \\implies x = 3$$

#### Step 3: Substitute to Find the Second Variable ($y$)
Substitute $x = 3$ into equation (2):
$$3 - y = 2 \\implies y = 3 - 2 \\implies y = 1$$

#### Step 4: Verification (Substitute into Equation 1)
$$\\text{LHS} = 2(3) + 1 = 6 + 1 = 7 = \\text{RHS} \\quad \\checkmark$$
**Final Solution:** $x = 3, \\quad y = 1$ (or as ordered pair $(3, 1)$).`;

    const siAnswer = `### පියවරෙන් පියවර විසඳුම: සරල සමගාමී සමීකරණ
**10 ශ්‍රේණිය ගණිතය 1 කොටස — 5 වන පරිච්ඡේදය (පිටු 55–72)**

උදාහරණ ගැටලුව:
$$\\begin{cases} 2x + y = 7 \\quad \\text{--- (1)} \\\\ x - y = 2 \\quad \\text{--- (2)} \\end{cases}$$

**1 වන පියවර (විචල්‍යයක් ඉවත් කිරීම):**
(1) සහ (2) සමීකරණ එකතු කිරීමෙන් $y$ ඉවත් කරමු:
$$(2x + y) + (x - y) = 7 + 2 \\implies 3x = 9 \\implies x = 3$$

**2 වන පියවර (අනෙක් විචල්‍යය සෙවීම):**
$x = 3$ අගය (2) සමීකරණයට ආදේශ කරමු:
$$3 - y = 2 \\implies y = 1$$

**3 වන පියවර (සත්‍යාපනය):**
$2(3) + 1 = 7$ (නිවැරදියි!)
**අවසාන විසඳුම:** $x = 3, \\; y = 1$ වේ.`;

    const taAnswer = `### ஒருங்கமை சமன்பாடுகளைத் தீர்த்தல் — தரம் 10 கணிதம்
$$\\begin{cases} 2x + y = 7 \\\\ x - y = 2 \\end{cases}$$
1. இரு சமன்பாடுகளையும் கூட்ட: $3x = 9 \\implies x = 3$.
2. $x = 3$ ஐ பிரதியிட: $3 - y = 2 \\implies y = 1$.
3. தீர்வு: $x = 3, \\; y = 1$.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: [
        'Method 1: Elimination by equating coefficients and adding/subtracting',
        'Method 2: Substitution by expressing one variable in terms of the other',
        'Always verify the solution in both original equations'
      ],
      suggestedFollowUps: [
        'Solve 3x + 2y = 12 and 5x - 2y = 4 step-by-step',
        'How to solve simultaneous equations by substitution?',
        'Solve an O/L word problem using simultaneous equations'
      ]
    };
  }

  private handleIndicesAndLogarithms(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-math-gr10-p1',
        source: 'Grade 10 Mathematics Part I — Chapter 3: Indices & Logarithms (pp. 25–46)',
        fileType: 'PDF',
        pageNumber: 25,
        chunkNumber: 1,
        distance: 0.08,
        excerpt: null,
      }
    ];

    const enAnswer = `### Laws of Indices & Logarithms
**Grade 10 Mathematics Part I — Chapter 3 (Textbook pp. 25–46)**

#### 1. Fundamental Laws of Indices ($a, b > 0$):
1. **Multiplication:** $a^m \\times a^n = a^{m+n}$
2. **Division:** $a^m \\div a^n = a^{m-n}$
3. **Power of a Power:** $(a^m)^n = a^{mn}$
4. **Product Power:** $(ab)^n = a^n b^n$
5. **Zero Index:** $a^0 = 1 \\quad (a \\neq 0)$
6. **Negative Index:** $a^{-n} = \\frac{1}{a^n}$
7. **Fractional Index:** $a^{1/n} = \\sqrt[n]{a}, \\quad a^{m/n} = \\sqrt[n]{a^m}$

#### 2. Logarithm Definition & Laws:
$$\\text{If } a^x = y, \\text{ then } \\log_a y = x \\quad (a > 0, a \\neq 1)$$
- **Addition Law:** $\\log_a (xy) = \\log_a x + \\log_a y$
- **Subtraction Law:** $\\log_a \\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y$
- **Power Law:** $\\log_a (x^k) = k \\log_a x$
- **Base Log:** $\\log_a a = 1, \\quad \\log_a 1 = 0$`;

    const siAnswer = `### දර්ශක හා ලඝුගණක නීති
**10 ශ්‍රේණිය ගණිතය 1 කොටස — 3 වන පරිච්ඡේදය (පිටු 25–46)**

1. **දර්ශක නීති:**
   - $a^m \\times a^n = a^{m+n}$
   - $a^m \\div a^n = a^{m-n}$
   - $(a^m)^n = a^{mn}$
   - $a^0 = 1 \\; (a \\neq 0)$
   - $a^{-n} = \\frac{1}{a^n}$
   - $a^{1/n} = \\sqrt[n]{a}$
2. **ලඝුගණක අර්ථදැක්වීම:** $a^x = y \\iff \\log_a y = x$
3. **ලඝුගණක නීති:**
   - $\\log_a (xy) = \\log_a x + \\log_a y$
   - $\\log_a (x/y) = \\log_a x - \\log_a y$
   - $\\log_a (x^k) = k \\log_a x$
   - $\\log_a a = 1, \\; \\log_a 1 = 0$`;

    const taAnswer = `### சுட்டிகளும் மடக்கைகளும் — தரம் 10 கணிதம் (அத்தியாயம் 3)
1. **சுட்டி விதிகள்:** $a^m \\times a^n = a^{m+n}$, $a^m \\div a^n = a^{m-n}$, $(a^m)^n = a^{mn}$, $a^0 = 1$, $a^{-n} = \\frac{1}{a^n}$.
2. **மடக்கை வரைவிலக்கணம்:** $a^x = y \\iff \\log_a y = x$.
3. **மடக்கை விதிகள்:** $\\log_a (xy) = \\log_a x + \\log_a y$, $\\log_a (x/y) = \\log_a x - \\log_a y$, $\\log_a (x^k) = k\\log_a x$.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: ['a^0 = 1 for any non-zero base', 'log(xy) = log(x) + log(y)', 'log(x/y) = log(x) - log(y)'],
      suggestedFollowUps: ['Simplify: (2^3 * 2^4) / 2^5', 'Evaluate: log10(1000)', 'How to use logarithm tables in O/L exam?']
    };
  }

  private handleAnglesOfPolygons(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-math-gr10-p1',
        source: 'Grade 10 Mathematics Part I — Chapter 6: Angles of Polygons (pp. 73–88)',
        fileType: 'PDF',
        pageNumber: 73,
        chunkNumber: 1,
        distance: 0.08,
        excerpt: null,
      }
    ];

    const enAnswer = `### Angles of Polygons: Formulas & Problem Solving
**Grade 10 Mathematics Part I — Chapter 6 (Textbook pp. 73–88)**

#### 1. Core Formulas for an $n$-sided Polygon:
- **Sum of Interior Angles ($S$):**
  $$S = (2n - 4) \\times 90^\\circ = (n - 2) \\times 180^\\circ$$
- **Sum of Exterior Angles:**
  Always equals **$360^\\circ$** for ANY convex polygon, regardless of the number of sides!
- **Regular Polygon (all sides and angles equal):**
  - Each Exterior Angle $= \\frac{360^\\circ}{n}$
  - Each Interior Angle $= 180^\\circ - \\frac{360^\\circ}{n} = \\frac{(n - 2) \\times 180^\\circ}{n}$

#### 2. Worked Example: Regular Hexagon ($n = 6$)
- Sum of interior angles $= (6 - 2) \\times 180^\\circ = 4 \\times 180^\\circ = 720^\\circ$
- Each interior angle $= \\frac{720^\\circ}{6} = 120^\\circ$
- Each exterior angle $= \\frac{360^\\circ}{6} = 60^\\circ$ (Notice: $120^\\circ + 60^\\circ = 180^\\circ$)`;

    const siAnswer = `### බහුඅස්‍රවල කෝණ: සූත්‍ර සහ ගැටලු විසඳීම
**10 ශ්‍රේණිය ගණිතය 1 කොටස — 6 වන පරිච්ඡේදය (පිටු 73–88)**

1. **අභ්‍යන්තර කෝණවල එකතුව:** $(2n - 4) \\times 90^\\circ = (n - 2) \\times 180^\\circ$
2. **බාහිර කෝණවල එකතුව:** ඕනෑම බහුඅස්‍රයක බාහිර කෝණවල එකතුව සැමවිටම **$360^\\circ$** කි.
3. **සවිධි බහුඅස්‍රයක:**
   - එක් බාහිර කෝණයක් $= \\frac{360^\\circ}{n}$
   - එක් අභ්‍යන්තර කෝණයක් $= 180^\\circ - \\frac{360^\\circ}{n}$`;

    const taAnswer = `### பல்கோணியின் கோணங்கள் — தரம் 10 கணிதம் (அத்தியாயம் 6)
1. அகக்கோணங்களின் கூட்டுத்தொகை $= (n - 2) \\times 180^\\circ$.
2. புறக்கோணங்களின் கூட்டுத்தொகை $= 360^\\circ$.
3. ஒழுங்கான பல்கோணியின் ஒரு புறக்கோணம் $= \\frac{360^\\circ}{n}$.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: ['Sum of interior angles = (n - 2) * 180°', 'Sum of exterior angles = 360° for all polygons'],
      suggestedFollowUps: ['Find interior angle of regular octagon (n=8)', 'Find number of sides if exterior angle is 45°']
    };
  }

  private handleSurfaceAreaAndVolume(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-math-gr10-p1',
        source: 'Grade 10 Mathematics Part I — Chapter 9: Surface Area & Chapter 10: Volume of Solids (pp. 110–140)',
        fileType: 'PDF',
        pageNumber: 110,
        chunkNumber: 1,
        distance: 0.08,
        excerpt: null,
      }
    ];

    const enAnswer = `### Surface Area and Volume: Cylinder & Prisms
**Grade 10 Mathematics Part I — Chapters 9 & 10 (Textbook pp. 110–140)**

#### 1. Right Circular Cylinder (Radius $r$, Height $h$):
- **Base Area:** $A_{\\text{base}} = \\pi r^2$
- **Curved Surface Area:** $A_{\\text{curved}} = 2\\pi r h$
- **Total Surface Area (closed):** $A_{\\text{total}} = 2\\pi r^2 + 2\\pi r h = 2\\pi r(r + h)$
- **Volume:** $V = \\pi r^2 h$

#### 2. Worked Sum: Cylinder with $r = 7\\text{ cm}, h = 10\\text{ cm}$ (Take $\\pi = \\frac{22}{7}$):
1. **Volume:**
   $$V = \\pi r^2 h = \\frac{22}{7} \\times 7^2 \\times 10 = 22 \\times 7 \\times 10 = 1540\\text{ cm}^3$$
2. **Total Surface Area:**
   $$A = 2\\pi r(r + h) = 2 \\times \\frac{22}{7} \\times 7 \\times (7 + 10) = 44 \\times 17 = 748\\text{ cm}^2$$`;

    const siAnswer = `### සිලින්ඩර හා ප්‍රිස්මවල පෘෂ්ඨ වර්ගඵලය හා පරිමාව
**10 ශ්‍රේණිය ගණිතය 1 කොටස — 9 සහ 10 පරිච්ඡේද (පිටු 110–140)**

- **වක්‍ර පෘෂ්ඨ වර්ගඵලය:** $2\\pi r h$
- **මුළු පෘෂ්ඨ වර්ගඵලය:** $2\\pi r^2 + 2\\pi r h = 2\\pi r(r + h)$
- **පරිමාව:** $V = \\pi r^2 h$

**උදාහරණයක් ($r = 7\\text{ cm}, h = 10\\text{ cm}$):**
$$V = \\frac{22}{7} \\times 7^2 \\times 10 = 1540\\text{ cm}^3$$
$$A = 2 \\times \\frac{22}{7} \\times 7 \\times (7 + 10) = 748\\text{ cm}^2$$`;

    const taAnswer = `### உருளையின் மேற்பரப்பளவும் கனவளவும் — தரம் 10 கணிதம்
- வளைபரப்பளவு $= 2\\pi r h$
- மொத்த மேற்பரப்பளவு $= 2\\pi r(r + h)$
- கனவளவு $= \\pi r^2 h$`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: ['V = π r² h', 'Total Area = 2πr² + 2πrh'],
      suggestedFollowUps: ['Calculate capacity of a cylindrical water tank in litres', 'Volume of a right triangular prism']
    };
  }

  private handleTriangleCongruence(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-math-gr10-p2',
        source: 'Grade 10 Mathematics Part II — Chapter 13: Congruence of Triangles (pp. 1–20)',
        fileType: 'PDF',
        pageNumber: 1,
        chunkNumber: 1,
        distance: 0.08,
        excerpt: null,
      }
    ];

    const enAnswer = `### Congruence of Triangles: The 4 Conditions & Proof Layout
**Grade 10 Mathematics Part II — Chapter 13 (Textbook pp. 1–20)**

Two triangles are **congruent** ($\\equiv$) when they are identical in both shape and size. In the Sri Lankan syllabus, there are **4 conditions of congruence**:

1. **SSS (Side-Side-Side / පා.පා.පා):** Three sides of one triangle are respectively equal to three sides of the other.
2. **SAS (Side-Angle-Side / පා.කෝ.පා):** Two sides and the **included angle** of one triangle are respectively equal.
3. **AAS (Angle-Angle-Side / කෝ.කෝ.පා):** Two angles and a corresponding side are respectively equal.
4. **RHS (Right-Hypotenuse-Side / කර්ණ.පා):** In right-angled triangles, the hypotenuse and one other side are equal.

#### Formal Geometric Proof Layout:
In $\\triangle ABC$ and $\\triangle DEF$:
1. $AB = DE$ (Given)
2. $\\angle B = \\angle E$ (Given)
3. $BC = EF$ (Given)
$$\\therefore \\triangle ABC \\equiv \\triangle DEF \\quad (\\text{SAS condition})$$`;

    const siAnswer = `### ත්‍රිකෝණ අංගසමතාව: අංගසමතා අවස්ථා 4
**10 ශ්‍රේණිය ගණිතය 2 කොටස — 13 වන පරිච්ඡේදය (පිටු 1–20)**

1. **පා.පා.පා (SSS):** පාද තුනක් අනෙක් ත්‍රිකෝණයේ අනුරූප පාද තුනට සමාන වීම.
2. **පා.කෝ.පා (SAS):** පාද දෙකක් සහ ඒවා අතර අන්තර්ගත කෝණය සමාන වීම.
3. **කෝ.කෝ.පා (AAS):** කෝණ දෙකක් සහ අනුරූප පාදයක් සමාන වීම.
4. **කර්ණ.පා (RHS):** සෘජුකෝණී ත්‍රිකෝණවල කර්ණය සහ තවත් පාදයක් සමාන වීම.`;

    const taAnswer = `### முக்கோண ஒருங்கமைவு — தரம் 10 கணிதம் (அத்தியாயம் 13)
1. ப.ப.ப (SSS) — மூன்று பக்கங்கள் சமன்.
2. ப.கோ.ப (SAS) — இரு பக்கங்களும் இடைப்பட்ட கோணமும் சமன்.
3. கோ.கோ.ப (AAS) — இரு கோணங்களும் ஒரு பக்கமும் சமன்.
4. செ.க.ப (RHS) — செங்கோண முக்கோணியில் செம்பக்கமும் ஒரு பக்கமும் சமன்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: ['4 conditions: SSS, SAS, AAS, RHS', 'Equal corresponding parts follow congruence'],
      suggestedFollowUps: ['Prove two triangles congruent in a parallelogram', 'Difference between congruence and similarity']
    };
  }

  private handleProbability(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-math-gr10-p2',
        source: 'Grade 10 Mathematics Part II — Chapter 22: Probability (pp. 165–185)',
        fileType: 'PDF',
        pageNumber: 165,
        chunkNumber: 1,
        distance: 0.08,
        excerpt: null,
      }
    ];

    const enAnswer = `### Probability & Tree Diagrams
**Grade 10 Mathematics Part II — Chapter 22 (Textbook pp. 165–185)**

#### 1. Basic Probability Definition:
$$P(A) = \\frac{n(A)}{n(S)} = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of equally likely outcomes}}$$
- $0 \\le P(A) \\le 1$
- Impossible event: $P = 0$, Certain event: $P = 1$
- Complement: $P(A') = 1 - P(A)$

#### 2. Probability Tree Diagram Rules:
- The sum of probabilities on branches radiating from any single node must always equal **$1$**.
- To find the probability of a compound outcome along a branch path, **multiply** the branch probabilities:
  $$P(A \\text{ and } B) = P(A) \\times P(B)$$`;

    const siAnswer = `### සම්භාවිතාව සහ රුක් සටහන්
**10 ශ්‍රේණිය ගණිතය 2 කොටස — 22 වන පරිච්ඡේදය (පිටු 165–185)**

1. **සම්භාවිතාව:** $P(A) = \\frac{n(A)}{n(S)}$ (අවස්ථා ගණන / මුළු නියැදි අවකාශය).
2. **රුක් සටහන් රීති:** එක් ලක්ෂ්‍යයකින් විහිදෙන අතුවල සම්භාවිතාවල එකතුව **1** කි. මාර්ගයක් ඔස්සේ සම්භාවිතා ගුණ කරනු ලැබේ.`;

    const taAnswer = `### நிகழ்தகவும் மர வரிப்படமும் — தரம் 10 கணிதம் (அத்தியாயம் 22)
1. $P(A) = \\frac{n(A)}{n(S)}$.
2. ஒரு புள்ளியிலிருந்து பிரியும் கிளைகளின் நிகழ்தகவுகளின் கூட்டுத்தொகை 1 ஆகும்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: ['P(A) = n(A) / n(S)', 'Sum of probabilities from a branch node = 1'],
      suggestedFollowUps: ['Tree diagram for tossing 2 unbiased coins', 'Probability of drawing red then blue without replacement']
    };
  }

  private solveGenericMathStepByStep(question: string, lang: 'en' | 'si' | 'ta', context: LearningContext): RAGResponse {
    const isPart2 = (
      context.topicId?.includes('ch14') ||
      context.topicId?.includes('ch15') ||
      context.topicId?.includes('ch16') ||
      context.topicId?.includes('ch17') ||
      context.topicId?.includes('ch18') ||
      context.topicId?.includes('ch19') ||
      context.topicId?.includes('ch20') ||
      context.topicId?.includes('ch21') ||
      context.topicId?.includes('ch22') ||
      context.topicId?.includes('ch23')
    );

    const sources: SourceCitation[] = [
      {
        documentId: isPart2 ? 'sl-moe-math-gr10-p2' : 'sl-moe-math-gr10-p1',
        source: isPart2
          ? 'Grade 10 Mathematics Part II Textbook (Educational Publications Department Sri Lanka)'
          : 'Grade 10 Mathematics Part I Textbook (Educational Publications Department Sri Lanka)',
        fileType: 'PDF',
        pageNumber: 1,
        chunkNumber: 1,
        distance: 0.05,
        excerpt: null,
      }
    ];

    const enAnswer = `### Step-by-Step Problem Solving & Guided Resolution
**ATLAS AI Tutor — Sri Lankan National Mathematics Curriculum**

Regarding your problem / inquiry: **"${question}"**

Let us break this down step-by-step using the official examination methodology:

#### Step 1: Identify Given Information & Mathematical Objective
- Note down all given numerical constants, known variables, side lengths, or algebraic terms.
- State what needs to be calculated or proven (e.g. unknown variable $x$, length, angle, or area).

#### Step 2: Formulate the Standard Method or Theorem
- **If Algebraic:** Write the equation in standard form ($ax + b = 0$, $ax + by = c$, or $ax^2 + bx + c = 0$).
- **If Geometric:** State the relevant theorem (Pythagoras $AC^2 = AB^2 + BC^2$, circle theorem, or locus definition).
- **If Mensuration:** State the geometric solid formula ($V = \\pi r^2 h$ or $A = 2\\pi r^2 + 2\\pi rh$).

#### Step 3: Step-by-Step Working & Calculation
1. Substitute the numerical values carefully into the formula.
2. Perform intermediate arithmetic and algebraic operations step-by-step without skipping steps.
3. Simplify fractions and square roots with proper mathematical units (e.g. $\\text{cm}$, $\\text{cm}^2$, $\\text{cm}^3$, or $^\\circ$).

#### Step 4: Verification
Always verify by substituting the result back into the original problem to ensure $\\text{LHS} = \\text{RHS}$.

> **Tip:** You can also explore the **Interactive Concept Explorer** in the right-hand panel for live interactive simulations!`;

    const siAnswer = `### පියවරෙන් පියවර ගණිත ගැටලු විසඳීම
**ATLAS AI Tutor — ශ්‍රී ලංකා ජාතික ගණිත විෂය නිර්දේශ මඟපෙන්වීම**

ඔබගේ ගැටලුව: **"${question}"**

විභාග ක්‍රමවේදයට අනුව මෙය පියවරෙන් පියවර විසඳන ආකාරය:
1. **දත්ත හඳුනාගැනීම:** දී ඇති සංඛ්‍යාත්මක අගයන් හා සෙවිය යුතු අගය ලියාගන්න.
2. **සූත්‍රය හෝ ප්‍රමේයය:** ගැටලුවට අදාළ නිල පෙළපොත් සූත්‍රය හෝ ප්‍රමේයය සඳහන් කරන්න.
3. **ආදේශය සහ සුළු කිරීම:** අගයන් ආදේශ කර පියවරෙන් පියවර සුළු කරන්න.
4. **සත්‍යාපනය:** ලැබුණු අගය මුල් ප්‍රකාශනයට ආදේශ කර නිවැරදි බව තහවුරු කරගන්න.

> දකුණු පස ඇති **Interactive Concept Explorer** මඟින් මෙම සංකල්පය අන්තර්ක්‍රියාකාරීව ප්‍රගුණ කළ හැක.`;

    const taAnswer = `### கணித வினாவிற்கான படிப்படியான தீர்வு
**ATLAS AI Tutor — தேசிய கணித பாடத்திட்டம்**

உங்கள் கேள்வி: **"${question}"**
1. தரப்பட்ட தகவல்களையும் காணவேண்டிய பெறுமானத்தையும் எழுதுக.
2. பொருத்தமான சூத்திரம் அல்லது தேற்றத்தை குறிப்பிடுக.
3. பெறுமானங்களை பிரதியிட்டு படிப்படியாக சுருக்குக.
4. விடையை சரிபார்க்க.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: [
        'Identify given values and standard form',
        'State relevant theorem or formula',
        'Show intermediate working clearly',
        'Verify solution to confirm LHS = RHS'
      ],
      suggestedFollowUps: [
        'Solve: how to find x below: x^2 + 5x + 6 = 0',
        'In triangle ABC with right angle at B, find AC if AB=3 and BC=4',
        'Construct the four basic loci with ruler and compass',
        'Show this topic in the interactive visualizer on the right'
      ]
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
    if (context.topicId === 'science-gr10-ch17-rate-of-reactions') {
      return this.handleRateOfReactionsClarify(lang);
    }
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
    if (context?.topicId === 'science-gr10-ch17-rate-of-reactions') {
      return this.handleRateOfReactionsSimpler(lang);
    }
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
    if (context?.topicId === 'science-gr10-ch17-rate-of-reactions') {
      return this.handleRateOfReactionsExample(lang);
    }
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

  private handleSellipi(lang: 'en' | 'si' | 'ta'): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'moe-lk-history-gr10-histoy-g-10-e',
        source: 'Grade 10 History Textbook — Chapter 1: Sources of Studying History (Educational Publications Department Sri Lanka, Pages 3–5)',
        fileType: 'PDF',
        pageNumber: 3,
        chunkNumber: 8,
        distance: 0.08,
        excerpt: 'Inscriptions (Sellipi): According to the shapes of the stones on which writings have been inscribed, the inscriptions can be categorized as cave inscriptions, rock inscriptions, pillar inscriptions, slab inscriptions, and seat inscriptions.',
      },
      {
        documentId: 'moe-lk-history-gr10-histoy-g-10-e',
        source: 'Grade 10 History Textbook — Chapter 1: Media of Epigraphy (Pages 4–5)',
        fileType: 'PDF',
        pageNumber: 4,
        chunkNumber: 9,
        distance: 0.09,
        excerpt: 'Media of Epigraphy: Stone (Galpotha inscription), Walls (Sigiriya graffiti), Copper Plates (Panakaduwa plate of Vijayabahu I), Golden Plates (Vallipuram plate), Wood (Embekke Devalaya).',
      }
    ];

    const enAnswer = `**Inscriptions (Sellipi / Shilalipi) — Grade 10 History (Chapter 1, Pages 3–5)**

Inscriptions are one of the most reliable and primary **archaeological sources** used to study the history of Sri Lanka. Because they were engraved contemporaneously onto durable stone surfaces, they provide firsthand historical evidence free from subsequent modifications.

---

### 1. Classification of Inscriptions by Stone Shapes (Textbook p. 3)
According to the physical shapes of the stones on which writings were inscribed, Sri Lankan inscriptions are categorized into **five main types**:
1. **Cave Inscriptions (ලෙන් ලිපි / Len Lipi):** Engraved below the drip-ledges (*katara*) of natural rock caves. The oldest inscriptions in Sri Lanka are **Brahmi cave inscriptions** dating from the 3rd to 2nd century B.C., recording the donation of caves to Buddhist monks (*"Agata Anagata Chatudisa Sagasa Dine"* - offered to the Sangha of four directions, present and future).
2. **Rock Inscriptions (ගිරි ලිපි / Giri Lipi):** Inscribed directly onto flat, natural rock surfaces or boulders in open air (e.g., Tonigala rock inscription, Vessagiriya).
3. **Pillar Inscriptions (ටැම් ලිපි / Tam Lipi):** Inscribed on octagonal or rectangular stone pillars erected at public places, boundary marks, or village entrances (e.g., Badulla Pillar Inscription detailing market laws).
4. **Slab Inscriptions (පුවරු ලිපි / Puwaru Lipi):** Inscribed on smoothly dressed rectangular stone slabs (e.g., Mihintale slab inscription of King Mahinda IV detailing monastery administration, Polonnaruwa slab inscriptions).
5. **Seat Inscriptions (ආසන ලිපි / Asana Lipi):** Inscribed on polished stone seats (*Asana*) used by monarchs during religious ceremonies or military inspections (e.g., Nisshankamalla's stone seats in Polonnaruwa).

---

### 2. Media of Epigraphy (Table 1.4, Textbook p. 5)
Ancient Sri Lankans inscribed records on various durable media:
- **Stone (Shila):** King Nisshankamalla's massive **Galpotha Inscription** at Polonnaruwa.
- **Plastered Walls:** The poetic **Sigiriya Graffiti (කුරුටු ගී)** inscribed by 8th–10th century visitors on the Mirror Wall.
- **Copper Plates:** The royal **Panakaduwa Copper Plate** of King Vijayabahu I, granting hereditary privileges to Lord Budalna for protecting the young king during Chola invasions.
- **Golden Plates:** The **Vallipuram Golden Plate** found in Jaffna, proving King Vasabha's rule over the Northern Province under Governor Rishigiri.
- **Wood:** Inscriptions carved on the wooden pillars of **Embekke Devalaya**.
- **Clay Slabs & Urns:** Scripts inscribed on clay tiles, bricks, and Buddhist begging bowls.

---

### 3. Historical Importance of Inscriptions
- **Administrative & Legal Decrees:** Recording royal taxes (e.g., *dya-bada* water tax, *bojakapati* grain tax) and judicial customs.
- **Monastic & Social Governance:** Guidelines for monastery management, monk discipline, and temple serf welfare.
- **Linguistic Evolution:** Documenting the gradual phonetic and orthographic transition from Early Brahmi script to the modern Sinhala alphabet.`;

    const siAnswer = `**සෙල්ලිපි (Inscriptions / ශිලා ලේඛන) — 10 ශ්‍රේණිය ඉතිහාසය (1 වන පරිච්ඡේදය, පිටු 3–5)**

සෙල්ලිපි යනු ශ්‍රී ලංකා ඉතිහාසය හැදෑරීම සඳහා ලැබෙන අතිශය විශ්වාසදායක සහ වැදගත්ම **පුරාවිද්‍යාත්මක මූලාශ්‍රයකි**. අතීතයේ සිදු වූ සිදුවීම් ඒ අවස්ථාවේදීම සදාකාලිකව පවතින සේ ගල් මත සටහන් කර ඇති බැවින්, පසුකාලීන වෙනස්කම්වලට භාජනය නොවූ සත්‍ය තොරතුරු සෙල්ලිපි මඟින් ලබාගත හැක.

---

### 1. ගල්වල හැඩය අනුව සෙල්ලිපි වර්ගීකරණය (පෙළපොත පිටුව 3)
අක්ෂර කොටා ඇති ගල්වල හැඩය අනුව සෙල්ලිපි **ප්‍රධාන වර්ග 5කට** බෙදා දක්වයි:
1. **ලෙන් ලිපි:** ස්වභාවික ගල් ලෙන්වල වැසි දිය කාන්දු වීම වැළැක්වීමට කෙටූ කටාරමට යටින් කොටා ඇති ලිපි වේ. මෙරට පැරණිතම සෙල්ලිපි වන්නේ ක්‍රි.පූ. 2 වන සියවසේ පමණ ලියැවුණු **බ්‍රාහ්මී ලෙන් ලිපි** වේ. ඒවා මහා සංඝරත්නය වෙත ලෙන් පූජා කිරීම (*"අගත අනගත චතුදිස සගස දිනෙ"*) වාර්තා කිරීමට ලියන ලදී.
2. **ගිරි ලිපි:** ස්වභාවික ගල් පර්වත මතුපිට කොටා ඇති ලිපි වේ (උදා: තෝණිගල ගිරි ලිපිය, වෙස්සගිරිය).
3. **ටැම් ලිපි:** සකස් කරන ලද ගල් කණු (පුවරු ආකාර හෝ බහුඅස්‍ර) මත සතර පැත්තේම හෝ දෙපැත්තේ කොටා ඇති ලිපි වේ (උදා: වෙළඳ නීති ඇතුළත් බදුලු ටැම් ලිපිය).
4. **පුවරු ලිපි:** මනාව මට්ටම් කර ඔපමට්ටම් කරන ලද සෘජුකෝණාස්‍රාකාර ගල් පුවරු මත කොටන ලද ලිපි වේ (උදා: මිහින්තලා පුවරු ලිපිය, පොළොන්නරුවේ පුවරු ලිපි).
5. **ආසන ලිපි:** රජවරුන් වැඩසිටි ගල් ආසන මත කොටන ලද ලිපි වේ (උදා: පොළොන්නරුවේ නිශ්ශංකමල්ල රජුගේ ගල් ආසන ලිපි).

---

### 2. අභිලේඛන සඳහා භාවිත කළ විවිධ මාධ්‍ය (වගුව 1.4, පෙළපොත පිටුව 5)
ශ්‍රී ලංකාවේ අභිලේඛන ලිවීම සඳහා ගල් වලට අමතරව තවත් කල්පවත්නා මාධ්‍ය රැසක් භාවිත කර ඇත:
- **ගල් (ශිලා):** පොළොන්නරුවේ නිශ්ශංකමල්ල රජුගේ **ගල්පොත සෙල්ලිපිය**.
- **බිත්ති:** සීගිරියේ කැඩපත් පවුර මත ලියැවුණු **සීගිරි කුරුටු ගී**.
- **තඹ පත්:** 1 වන විජයබාහු රජු තමන්ට කුඩා කල රැකවරණය දුන් බුදල්නාවන්ට වරප්‍රසාද පිරිනමමින් දුන් **පනාකඩුව තඹ සන්නස**.
- **රන් පත්:** යාපනයෙන් හමුවූ වසභ රජ සමයට අයත් **වල්ලිපුරම් රන් පත**.
- **ලී:** ඇම්බැක්කේ දේවාලයේ ලී කණු මත ඇති කැටයම් සහිත ලේඛන.
- **මැටි පුවරු සහ බඳුන්:** උළු, ගඩොල් සහ පාත්‍ර මත ලියන ලද අක්ෂර.

---

### 3. සෙල්ලිපි හැදෑරීමේ ඓතිහාසික වැදගත්කම
- **රාජ්‍ය පාලනය සහ නීතිය:** රජුන්ගේ නියෝග, දඩ මුදල්, සහ වැව් ජලය බෙදාහැරීමේ නීති (දියබඩ, බොජකපති බදු) දැනගැනීම.
- **භාෂා විකාශනය:** ක්‍රි.පූ. 3 වන සියවසේ බ්‍රාහ්මී අක්ෂර ක්‍රමයෙන් නූතන සිංහල අක්ෂර මාලාව දක්වා පරිණාමය වූ අයුරු අධ්‍යයනය කිරීම.
- **සමාජ තොරතුරු:** ප්‍රාදේශීය ප්‍රධානීන් (පරුමක), ගම් ප්‍රධානීන් (ගාමිණී), වෙළඳුන් සහ කාන්තාවන් කළ පරිත්‍යාග පිළිබඳ සාක්ෂි සපයයි.`;

    const taAnswer = `**கல்வெட்டுகள் (Inscriptions / Sellipi) — தரம் 10 வரலாறு (அத்தியாயம் 1, பக். 3–5)**

இலங்கை வரலாற்றை மீளமைப்பதற்கான முதன்மையான மற்றும் மிகவும் நம்பகமான **தொல்பொருள் மூலாதாரங்கள்** கல்வெட்டுகளாகும். நிகழ்வுகள் இடம்பெற்ற காலத்திலேயே நிரந்தரமான பாறைகளில் செதுக்கப்பட்டதால், இவை பிற்கால மாற்றங்களுக்கு உட்படாத வரலாற்று உண்மைகளைத் தருகின்றன.

---

### 1. பாறைகளின் வடிவத்தை அடிப்படையாகக் கொண்ட 5 வகையான கல்வெட்டுகள் (பக். 3)
1. **குகைக் கல்வெட்டுகள் (Cave Inscriptions):** மழைநீர் குகைக்குள் இறங்குவதைத் தடுக்க வெட்டப்பட்ட காடிக்கு (drip-ledge) கீழே செதுக்கப்பட்டவை. கி.மு. 2 ஆம் நூற்றாண்டில் பௌத்த பிக்குகளுக்கு குகைகள் தானமாக வழங்கப்பட்டதை பதிவு செய்த **பிராமி குகைக் கல்வெட்டுகளே** இலங்கையின் மிகப்பழைய கல்வெட்டுகளாகும்.
2. **பாறைக் கல்வெட்டுகள் (Rock Inscriptions):** திறந்தவெளியில் உள்ள பெரிய பாறை மேற்பரப்புகளில் செதுக்கப்பட்டவை (உதா: தோணிகல கல்வெட்டு).
3. **தூண் கல்வெட்டுகள் (Pillar Inscriptions):** சதுர அல்லது எண் கோண கல்தூண்களில் செதுக்கப்பட்டவை (உதா: பதுளை தூண் கல்வெட்டு).
4. **பலகைக் கல்வெட்டுகள் (Slab Inscriptions):** செவ்வக வடிவ தட்டையான கற்பலகைகளில் செதுக்கப்பட்டவை (உதா: மிகிந்தலை பலகைக் கல்வெட்டு).
5. **ஆசனக் கல்வெட்டுகள் (Seat Inscriptions):** அரசர்கள் அமர்ந்திருந்த கல் ஆசனங்களில் செதுக்கப்பட்டவை (உதா: நிசங்கமல்லனின் கல் ஆசனங்கள்).

---

### 2. கல்வெட்டு ஊடகங்கள் (அட்டவணை 1.4, பக். 5)
- **கல்:** பொலன்னறுவையில் உள்ள நிசங்கமல்ல மன்னனின் **கல்பொத கல்வெட்டு**.
- **சுவர்:** சிகிரியாவின் கண்ணாடிச் சுவரில் எழுதப்பட்ட **சிகிரியா குறுங்கோடுகள் (Kurutu Gee)**.
- **செப்புத் தகடு:** முதலாம் விஜயபாகு மன்னனால் புதல்நாவிற்கு வழங்கப்பட்ட **பனக்கடுவ செப்புப் பட்டயம்**.
- **தங்கத் தகடு:** யாழ்ப்பாணத்தில் கண்டெடுக்கப்பட்ட **வல்லிபுரம் பொன் ஏடு**.
- **மரம்:** எம்பக்க தேவாலயத்தின் மரத் தூண்களில் உள்ள எழுத்துக்கள்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: {
        en: enAnswer,
        si: siAnswer,
        ta: taAnswer,
      },
      keyPoints: [
        '5 Types of Inscriptions: Cave (ලෙන්), Rock (ගිරි), Pillar (ටැම්), Slab (පුවරු), Seat (ආසන)',
        'Earliest Brahmi Inscriptions (2nd Century B.C. cave grants to Sangha)',
        'Epigraphy Media: Galpotha (Stone), Sigiri Kurutu Gee (Walls), Panakaduwa (Copper)',
        'Vallipuram Golden Plate (King Vasabha & Rishigiri)',
        'Administrative Decrees, Water Laws (Dya-bada), and Tax Records'
      ],
      memoryTrick: {
        concept: 'Grade 10 History Inscriptions Mastery (Textbook p. 3–5)',
        trick: '5 Stone Shapes: Cave, Rock, Pillar, Slab, and Seat! Brahmi caves give Sangha retreats, Panakaduwa copper protects the king, Galpotha slab makes Nisshankamalla sing!',
        rhyme: 'Cave and Rock, Pillar and Slab,\nSeat inscriptions on royal slab!\nBrahmi letters carved in stone,\nAncient truth forever known!\nGalpotha stone and Kurutu Gee,\nPanakaduwa copper sets Budalna free!',
        audioText: 'Here is your Grade 10 History memory trick for Inscriptions! Remember the 5 stone shapes: Cave, Rock, Pillar, Slab, and Seat! The earliest Brahmi cave inscriptions from the 2nd century B.C. record donations to Buddhist monks! Panakaduwa is copper, Sigiriya is wall graffiti, and Galpotha is a massive stone slab!',
        languageVersions: {
          en: {
            concept: 'Grade 10 History Inscriptions Mastery (Textbook p. 3–5)',
            trick: '5 Stone Shapes: Cave, Rock, Pillar, Slab, and Seat! Brahmi caves give Sangha retreats, Panakaduwa copper protects the king, Galpotha slab makes Nisshankamalla sing!',
            rhyme: 'Cave and Rock, Pillar and Slab,\nSeat inscriptions on royal slab!\nBrahmi letters carved in stone,\nAncient truth forever known!\nGalpotha stone and Kurutu Gee,\nPanakaduwa copper sets Budalna free!',
            audioText: 'Here is your Grade 10 History memory trick for Inscriptions! Remember the 5 stone shapes: Cave, Rock, Pillar, Slab, and Seat! The earliest Brahmi cave inscriptions from the 2nd century B.C. record donations to Buddhist monks! Panakaduwa is copper, Sigiriya is wall graffiti, and Galpotha is a massive stone slab!'
          },
          si: {
            concept: '10 ශ්‍රේණිය ඉතිහාසය: සෙල්ලිපි වර්ග 5 සහ අභිලේඛන මාධ්‍ය',
            trick: 'ගල්වල හැඩ අනුව සෙල්ලිපි 5යි: ලෙන්, ගිරි, ටැම්, පුවරු සහ ආසන! බ්‍රාහ්මී ලෙන් ලිපි සඟසතු පූජාවටයි, පනාකඩුව තඹ සන්නස බුදල්නාවන්ටයි, ගල්පොත සෙල්ලිපිය නිශ්ශංකමල්ල රජුටයි!',
            rhyme: 'ලෙන්, ගිරි, ටැම් සහ පුවරු ලිපී,\nආසන ලිපි සමඟින් සෙල්ලිපී!\nබ්‍රාහ්මී අකුරෙන් ලෙන් පුදලා,\nඉතිහාසය හෙළිකළා ගලේ ලියා!\nපනාකඩුව තඹ, සීගිරි කුරුටු ගී,\nගල්පොත ලියැවුණි පොළොන්නරු යුගයේ!',
            audioText: 'සෙල්ලිපි පිළිබඳ කෙටි මතක සටහන මෙන්න! ගල්වල හැඩය අනුව සෙල්ලිපි වර්ග පහකි: ලෙන් ලිපි, ගිරි ලිපි, ටැම් ලිපි, පුවරු ලිපි, සහ ආසන ලිපි! පැරණිතම බ්‍රාහ්මී ලෙන් ලිපි වලින් මහා සංඝරත්නයට කළ ලෙන් පූජා සනාථ වේ! පනාකඩුව තඹ සන්නස, සීගිරි කුරුටු ගී සහ ගල්පොත සෙල්ලිපිය අමතක කරන්න එපා!'
          },
          ta: {
            concept: 'தரம் 10 வரலாறு: 5 கல்வெட்டு வகைகள்',
            trick: '5 வடிவங்கள்: குகை, பாறை, தூண், பலகை மற்றும் ஆசனம்! பிராமி குகைகள் துறவிகளுக்கு, பனக்கடுவ செப்புப் பட்டயம் புதல்நாவிற்கு, கல்பொத நிசங்கமல்லனுக்கு!',
            rhyme: 'குகை, பாறை, தூண், பலகை ஆசனம்,\nகல்வெட்டுகளின் ஐவகை அமைப்பாகும்!\nபிராமி எழுத்துக்கள் கற்பாறையில்,\nவரலாற்று உண்மை எந்நாளும் நிலைக்கும்!',
            audioText: 'கல்வெட்டுகளை நினைவில் கொள்வதற்கான நினைவுக் குறிப்பு இதோ! பாறையின் வடிவம் சார்ந்து கல்வெட்டுகள் ஐந்து வகைப்படும்: குகை, பாறை, தூண், பலகை மற்றும் ஆசனக் கல்வெட்டுகள்! மிகப்பழைய பிராமி குகைக் கல்வெட்டுகள் துறவிகளுக்கு வழங்கப்பட்ட தானங்களை விவரிக்கின்றன!'
          }
        }
      },
      suggestedFollowUps: [
        'ගිරි ලිපි සහ ටැම් ලිපි අතර වෙනස කුමක්ද?',
        'පනාකඩුව තඹ සන්නසේ ඓතිහාසික වැදගත්කම පැහැදිලි කරන්න',
        'බ්‍රාහ්මී ලෙන් ලිපි වල සඳහන් වන ප්‍රධානීන් කවුද?',
        'සෙල්ලිපි වලින් විභාග ප්‍රශ්නයක් අසන්න'
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
      if (context.topicId === 'science-gr10-ch17-rate-of-reactions') {
        return this.handleRateOfReactions(question, lang);
      }
      if (context.grade === 'grade-10' || context.topicId?.startsWith('science-gr10')) {
        return this.handleScienceGr10(question, lang);
      }
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
      if (lang === 'si') {
        return {
          answer: `ඔබගේ විමසීම: **"${question}"**

ස්තූතියි! ඔබගේ **10 ශ්‍රේණිය ඉතිහාසය** නිල විෂය නිර්දේශයේ පරිච්ඡේද 10 ඔස්සේ අපට ඕනෑම සංකල්පයක් සාකච්ඡා කළ හැක:
1. **1 වන පරිච්ඡේදය: ඉතිහාසය හැදෑරීමේ මූලාශ්‍ර** (සෙල්ලිපි/ශිලා ලේඛන, සාහිත්‍ය මූලාශ්‍ර, කාසි, නටබුන්)
2. **2 වන පරිච්ඡේදය: පුරාණ ජනාවාස** (ප්‍රාග්, පූර්ව හා මූල ඓතිහාසික)
3. **3 වන පරිච්ඡේදය: දේශපාලන බලය විකාශනය වීම** (ගාමිණී, පරුමක, රජවරු)
4. **4 වන පරිච්ඡේදය: ශ්‍රී ලංකාවේ පුරාණ සමාජය** (පාලනය, ආර්ථිකය, සංස්කෘතිය)
5. **5 වන පරිච්ඡේදය: පුරාණ විද්‍යාව සහ තාක්ෂණය** (වාරි හා වාස්තු විද්‍යාව)
6. **6 වන පරිච්ඡේදය: ඓතිහාසික දැනුම සහ එහි ප්‍රායෝගික යෙදීම**
7. **7 වන පරිච්ඡේදය: වියළි කලාපයේ නගර පරිහානිය සහ නිරිතදිග රාජධානි**
8. **8 වන පරිච්ඡේදය: උඩරට රාජධානිය**
9. **9 වන පරිච්ඡේදය: පුනරුදය**
10. **10 වන පරිච්ඡේදය: ශ්‍රී ලංකාව සහ බටහිර ලෝකය**

ඔබට 1 වන පරිච්ඡේදයේ **සෙල්ලිපි (Inscriptions)** හෝ වෙනත් කුමන මාතෘකාවක් පිළිබඳව සාකච්ඡා කිරීමට අවශ්‍යද?`,
          sources: [
            {
              documentId: 'moe-lk-history-gr10-histoy-g-10-e',
              source: 'Grade 10 History Textbook — Chapter 1: Sources of Studying History (Pages 1–9)',
              fileType: 'PDF',
              pageNumber: 1,
              chunkNumber: 1,
              distance: 0.12,
            }
          ],
          suggestedFollowUps: [
            'සෙල්ලිපි: ලෙන්, ගිරි, ටැම්, පුවරු සහ ආසන ලිපි',
            'බ්‍රාහ්මී ලෙන් ලිපි සහ සඟසතු කිරීම',
            'පනාකඩුව තඹ සන්නස සහ ගල්පොත සෙල්ලිපිය',
            'ඉතිහාසය හැදෑරීමේ සාහිත්‍ය මූලාශ්‍ර'
          ],
        };
      }
      if (lang === 'ta') {
        return {
          answer: `உங்கள் கேள்வி: **"${question}"**

நன்றி! உங்கள் **தரம் 10 வரலாறு** உத்தியோகபூர்வ பாடத்திட்டத்தின் 10 அத்தியாயங்கள் மூலம் நாம் எந்தவொரு பாடத்தையும் கற்கலாம்:
1. **அத்தியாயம் 1: வரலாற்று மூலங்கள்** (கல்வெட்டுகள், இலக்கிய மூலங்கள், நாணயங்கள்)
2. **அத்தியாயம் 2: பண்டைய குடியேற்றங்கள்**
3. **அத்தியாயம் 3: அரசியல் அதிகாரத்தின் வளர்ச்சி**
4. **அத்தியாயம் 4: பண்டைய சமூகம்**
5. **அத்தியாயம் 5: பண்டைய அறிவியலும் தொழினுட்பமும்**
6. **அத்தியாயம் 6: வரலாற்று அறிவும் அதன் பயன்பாடும்**
7. **அத்தியாயம் 7: தென்மேற்கில் புதிய இராச்சியங்கள்**
8. **அத்தியாயம் 8: கண்டி இராச்சியம்**
9. **அத்தியாயம் 9: மறுமலர்ச்சி**
10. **அத்தியாயம் 10: இலங்கையும் மேலைத்தேய உலகமும்**

அத்தியாயம் 1 இன் **கல்வெட்டுகள் (Inscriptions)** அல்லது வேறு எந்தப் பாடம் பற்றி அறிய விரும்புகிறீர்கள்?`,
          sources: [
            {
              documentId: 'moe-lk-history-gr10-histoy-g-10-e',
              source: 'Grade 10 History Textbook — Chapter 1: Sources of Studying History (Pages 1–9)',
              fileType: 'PDF',
              pageNumber: 1,
              chunkNumber: 1,
              distance: 0.12,
            }
          ],
          suggestedFollowUps: [
            'கல்வெட்டுகள்: குகை, பாறை, தூண், பலகை, ஆசனம்',
            'பிராமி குகைக் கல்வெட்டுகள்',
            'பனக்கடுவ செப்புப் பட்டயம்',
            'வரலாற்று இலக்கிய மூலங்கள்'
          ],
        };
      }
      return {
        answer: `Regarding your inquiry: **"${question}"**

I am ready to guide you across your official **Grade 10 History** national curriculum textbook:
- **Chapter 1: Sources of Studying History** (Inscriptions/Sellipi, Chronicles, Coins, Epigraphy media)
- **Chapter 2: Ancient Settlements** (Pre-historic, Proto-historic, Early Historic)
- **Chapter 3: Evolution of Political Power** (Gamika, Parumaka, State concept)
- **Chapter 4: The Ancient Society of Sri Lanka** (Ruling, Economy, Culture)
- **Chapter 5: Ancient Science and Technology** (Irrigation engineering, Architecture, Metallurgy)
- **Chapter 6: Historical Knowledge and Practical Application** (Social structure, Law, Food, Environment)
- **Chapter 7: Decline of Dry Zone Cities & South West Kingdoms** (Downfall of Polonnaruwa to Kotte)
- **Chapter 8: Kandyan Kingdom** (Administrative structure, Economy, Resistance)
- **Chapter 9: Renaissance** (Scientific revolution, Impact on Sri Lanka)
- **Chapter 10: Sri Lanka and the Western World** (Portuguese 1505, Dutch 1658)

Which History topic would you like to explore together?`,
        sources: [
          {
            documentId: 'moe-lk-history-gr10-histoy-g-10-e',
            source: 'Grade 10 History Textbook — Chapter 1: Sources of Studying History (Pages 1–9)',
            fileType: 'PDF',
            pageNumber: 1,
            chunkNumber: 1,
            distance: 0.12,
          }
        ],
        suggestedFollowUps: [
          'History: Inscriptions (Sellipi) & 5 Types',
          'History: Brahmi Cave Inscriptions & Sangha',
          'History: Panakaduwa Copper Plate & Galpotha',
          'History: Literary vs Archaeological Sources'
        ],
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


  private handlePoliticalPower(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-history-gr10',
        source: 'Grade 10 History Textbook — Chapter 3: Evolution of Political Power in Sri Lanka (Educational Publications Department Sri Lanka, pp. 31–43)',
        fileType: 'PDF',
        pageNumber: 31,
        chunkNumber: 12,
        distance: 0.07,
        excerpt: 'Evolution of Political Power: Gamika (village leaders), Parumaka (prominent chieftains, tank custodians, ministers), Aya (princes), and Raja (monarchs). Over 70% of Early Brahmi cave inscriptions record donations by Parumakas to the Sangha.'
      },
      {
        documentId: 'sl-moe-history-gr10',
        source: 'Grade 10 History Textbook — Chapter 3: Inscriptional Titles and Roles of Parumakas (pp. 34–37)',
        fileType: 'PDF',
        pageNumber: 34,
        chunkNumber: 13,
        distance: 0.08,
        excerpt: 'Titles: Parumaka Senapati (military commander), Parumaka Badagarika (treasurer), Parumakalu (female chieftains). Formula: "Parumaka [Name]ha lene agata anagata chatudisa sagasa dine".'
      }
    ];

    const enAnswer = `### Evolution of Political Power in Ancient Sri Lanka: Who were the Parumakas?
**Grade 10 History — Chapter 3: Evolution of Political Power (Textbook pp. 31–43)**

#### 1. Who is a Parumaka (පරුමක / ප්‍රමුඛ)?
The title **Parumaka** (derived from Sanskrit *Pramukha*, meaning "chief", "prominent", or "foremost") was the most prestigious aristocratic title borne by elite clan chieftains, regional leaders, ministers, and military commanders in Sri Lanka from the **3rd century B.C. to 1st century A.D.**

#### 2. Evidence from Early Brahmi Cave Inscriptions
Our primary evidence for the Parumakas comes from **Early Brahmi cave inscriptions** carved beneath the drip-ledges (*katara*) of rock caves across the island:
- More than **70% of Early Brahmi cave inscriptions** record the donation of caves to Buddhist monks by individuals holding the title **Parumaka**.
- Standard inscriptional formula:
  > *"Parumaka [Name]ha lene agata anagata chatudisa sagasa dine"*
  > *(The cave of Chieftain [Name] is dedicated to the Sangha of the four directions, present and future)*

#### 3. Key Roles and Functions of Parumakas
1. **Irrigation & Economic Leaders:** They owned and financed village irrigation tanks (*Vapi-hamika* - tank owners), collecting water levies from cultivators.
2. **Royal Administration & Military:** Inscriptions refer to high administrative titles:
   - **Parumaka Senapati:** Commander-in-Chief of the armed forces.
   - **Parumaka Badagarika:** Chief Treasurer / Revenue Officer.
   - **Parumaka Asadeka:** Cavalry commander / Inspector of horses.
   - **Parumaka Dutaka:** Special royal envoy or ambassador.
3. **Female Chieftains (Parumakalu):** Elite women also held independent socio-political and economic authority, taking the title **Parumakalu (පරුමකලු)** and donating caves to the Sangha.

#### 4. The 4 Stages of Political Evolution in Sri Lanka
The development of centralized political power progressed through four main tiers:
1. **Gamika (ගාමික):** Village leaders heading small agricultural settlements (*Gama*).
2. **Parumaka (පරුමක):** Regional clan chieftains governing multiple villages, controlling reservoirs, and commanding warrior groups.
3. **Aya (ආය):** Regional princes / provincial rulers (prominent in Ruhuna).
4. **Raja / Maharaja (රජ / මහාරජ):** Centralized monarchs (such as King Devanampiyatissa and King Dutugemunu) who gradually integrated regional Parumakas under unified kingdom governance.

> **Interactive Companion:** Switch to the **Hydraulic & Inscription Explorer** on the right! Under the **Brahmi Script Decipherer**, click on the **Parumaka (𑀧)** glyph to see its ancient Brahmi script and historical meaning!`;

    const siAnswer = `### පුරාණ ශ්‍රී ලංකාවේ දේශපාලන බලය විකාශනය වීම: පරුමක යනු කවුද?
**10 ශ්‍රේණිය ඉතිහාසය — 3 වන පරිච්ඡේදය: දේශපාලන බලය විකාශනය වීම (පෙළපොත පිටු 31–43)**

#### 1. පරුමක (ප්‍රමුඛ) යනු කවුද?
**පරුමක** යනු ක්‍රි.පූර්ව 3 වන සියවසේ සිට ක්‍රි.ව. 1 වන සියවස දක්වා මුල් ඓතිහාසික යුගයේ ශ්‍රී ලංකාවේ විසූ **ප්‍රභූ ගෝත්‍ර නායකයන්, ප්‍රාදේශීය පාලකයන්, ඇමතිවරුන් සහ හමුදා ප්‍රධානීන්** හැඳින්වීමට භාවිත කළ ප්‍රමුඛතම ගෞරව නාමයයි. මෙය සංස්කෘත භාෂාවේ *'ප්‍රමුඛ'* (ප්‍රධානියා / නායකයා) යන වචනයෙන් බිඳී ආවකි.

#### 2. මුල් බ්‍රාහ්මී ලෙන් ලිපි සාක්ෂි
පරුමකවරුන් පිළිබඳ ප්‍රධානතම ඓතිහාසික සාක්ෂිය ලැබෙන්නේ දිවයින පුරා පිහිටි ස්වාභාවික ගල් ලෙන්වල කටාරම් යට කොටා ඇති **මුල් බ්‍රාහ්මී ලෙන් ලිපි** මඟිනි:
- ලංකාවේ හමුවන මුල් බ්‍රාහ්මී ලෙන් ලිපිවලින් **70% කට වැඩි ප්‍රමාණයක්** ලියා ඇත්තේ මහා සංඝරත්නය වෙත ලෙන් පූජා කළ **පරුමකවරුන්** විසිනි.
- සම්මත ලේඛන පාඨය:
  > *"පරුමක [නම]හ ලෙණෙ අගත අනගත චතුදිස සගස දිනෙ"*
  > *(පරුමක [නම]ගේ ලෙන සිව්දිගින් වැඩිය නොවැඩිය සංඝයා වහන්සේට පූජා කරන ලදී)*

#### 3. පරුමකවරුන් ඉටු කළ කාර්යභාරය
1. **වාරි හා ආර්ථික නායකත්වය:** ග්‍රාමීය වැව් ඉදිකරවා ඒවායේ අයිතිය දැරූ වැව් හිමියන් (*වාපි-හමික*) වූයේ පරුමකවරුන්ය.
2. **රාජ්‍ය පාලනය හා හමුදා තනතුරු:**
   - **පරුමක සෙනපති:** හමුදා සේනාධිපති.
   - **පරුමක බඩගරික:** භාණ්ඩාගාරික / ආදායම් පාලක.
   - **පරුමක අසදෙක:** අශ්වාරෝහක හමුදා ප්‍රධානී.
   - **පරුමක දූතක:** රජුගේ විශේෂ රාජදූතයා.
3. **පරුමකලු (කාන්තා ප්‍රධානීන්):** සමාජයේ ස්වාධීන ආර්ථික හා දේශපාලන බලයක් හිමි වූ ප්‍රභූ කාන්තාවන් **"පරුමකලු"** නමින් හැඳින්විණි.

#### 4. දේශපාලන බලය විකාශනය වීමේ පියවර 4
1. **ගාමික (ගාමිණී):** කෘෂිකාර්මික ගම්මාන පාලනය කළ මුල් ගම් ප්‍රධානියා.
2. **පරුමක:** ගම්මාන කිහිපයක සහ වැව්වල පාලනය හිමි ප්‍රභූ ප්‍රධානියා.
3. **ආය:** ප්‍රාදේශීය ප්‍රදේශ (උදා: රුහුණ) පාලනය කළ කුමාරවරුන්.
4. **රජ / මහාරජ:** දේවානම්පියතිස්ස, දුටුගැමුණු වැනි රජවරුන් යටතේ පරුමකවරුන් ඒකාබද්ධ කර පිහිටුවූ මධ්‍යගත රාජ්‍ය පාලනය.

> **දකුණු පස ඇති අන්තර්ක්‍රියාකාරී ගවේෂකය:** පාඩම් සටහන් පැනලයේ ඇති **Brahmi Script Decipherer** වෙත ගොස් **පරුමක (𑀧)** අක්ෂරය මත ක්ලික් කර එහි පුරාණ බ්‍රාහ්මී රූපය නරඹන්න!`;

    const taAnswer = `### பண்டைய இலங்கையில் அரசியல் அதிகாரத்தின் வளர்ச்சி: பருமக (Parumaka) என்பவர் யார்?
**தரம் 10 வரலாறு — அத்தியாயம் 3: அரசியல் அதிகாரத்தின் வளர்ச்சி (பாடநூல் பக். 31–43)**

#### 1. பருமக (Parumaka) யார்?
கி.மு. 3 ஆம் நூற்றாண்டு முதல் கி.பி. 1 ஆம் நூற்றாண்டு வரையான ஆரம்ப வரலாற்று காலப்பகுதியில் வாழ்ந்த **பிரதான குலத் தலைவர்கள், பிராந்திய ஆட்சியாளர்கள், அமைச்சர்கள் மற்றும் இராணுவ தளபதிகளைக்** குறிக்கப் பயன்படுத்தப்பட்ட பட்டப்பெயரே **பருமக** ஆகும்.

#### 2. பிராமி குகைக் கல்வெட்டு ஆதாரங்கள்
- இலங்கையின் ஆரம்பகால பிராமி குகைக் கல்வெட்டுகளில் **70% இற்கும் அதிகமானவை** மகா சங்கத்தினருக்கு குகைகளை தானமாக வழங்கிய **பருமக** தலைவர்களினால் எழுதப்பட்டவை ஆகும்.
- வாசகம்: *"பருமக [பெயர்] லெணெ அகத அநகத சதுதிச சகச தினெ"*.

#### 3. முக்கிய பொறுப்புகள்
- **வாபி-ஹமிக (Vapi-hamika):** கிராமக் குளங்களின் உரிமையாளர்கள் மற்றும் நீர்ப்பாசன தலைவர்கள்.
- **பருமக சேனாபதி:** இராணுவத் தளபதி.
- **பருமக பட்டகாரிக:** நிதியமைச்சர் / கருவூல அதிகாரி.
- **பருமகலு (Parumakalu):** சமூகத்தில் சுயாதீன அதிகாரம் பெற்ற பெண் தலைவர்கள்.

#### 4. அரசியல் பரிணாமத்தின் 4 படிநிலைகள்
1. **காமிக (Gamika):** ஆரம்ப கிராமத் தலைவர்.
2. **பருமக (Parumaka):** பிராந்திய குலத் தலைவர் / குளங்களின் உரிமையாளர்.
3. **ஆய (Aya):** பிராந்திய இளவரசர்கள் (உதாரணம்: ருகுணு).
4. **ராஜா (Raja):** ஒன்றுபட்ட மத்திய அரசு மன்னர்கள் (தேவாநம்பியதீசன், துட்டகைமுனு).`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: [
        'Parumaka (පරුමක): Elite clan chieftains, tank custodians, and ministers in Early Historic Sri Lanka',
        'Over 70% of Early Brahmi cave inscriptions record cave grants made by Parumakas to the Sangha',
        'Four stages of political evolution: Gamika (Village) → Parumaka (Chieftain) → Aya (Prince) → Raja (King)',
        'Female chieftains held the title Parumakalu (පරුමකලු)'
      ],
      suggestedFollowUps: [
        'What was the difference between a Gamika and a Parumaka?',
        'How did Kings like Dutugemunu unite the regional Parumakas?',
        'Show Parumaka in the Brahmi Decipherer on the right',
        'What do Brahmi cave inscriptions say about the Sangha?'
      ]
    };
  }

  private handleAncientSettlements(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-history-gr10',
        source: 'Grade 10 History Textbook — Chapter 2: Ancient Settlements of Sri Lanka (pp. 10–30)',
        fileType: 'PDF',
        pageNumber: 10,
        chunkNumber: 5,
        distance: 0.09,
        excerpt: 'Ancient Settlements: Pre-historic hunter-gatherer cave dwellers (Fa-Hien, Batadombalena), Mesolithic microlithic tools at Bellanbandi Palassa, Proto-historic Early Iron Age settlements and Megalithic cist burial grounds at Ibbankatuwa.'
      }
    ];

    const enAnswer = `### Ancient Settlements of Sri Lanka (Pre-historic & Proto-historic Eras)
**Grade 10 History — Chapter 2: Ancient Settlements (Textbook pp. 10–30)**

#### 1. The Pre-Historic Era (Stone Age)
- **Human Habitation:** Anatomically modern *Homo sapiens balangodensis* inhabited caves from c. 48,000 years ago.
- **Key Sites:** **Fa-Hien Lena (පාහියන්ගල)** in Bulathsinhala, **Batadombalena (බටදොඹලෙන)** in Kuruwita, and **Beli Lena (බෙලිලෙන)** in Kitulgala.
- **Open-Air Habitation:** **Bellanbandi Palassa (බෙල්ලන්බැඳිපැලැස්ස)** in Embilipitiya revealed skeletal remains and geometric microlith stone tools made from quartz and chert.

#### 2. The Proto-Historic Era (Early Iron Age - c. 1000 B.C. to 300 B.C.)
- **Sedentary Agriculture:** Shift from foraging to systematic paddy cultivation, cattle breeding, and horse rearing.
- **Metal Technology:** Extraction and forging of **iron** for tools (hoes, arrowheads, sickles) and copper for ornaments.
- **Pottery Culture:** **Black and Red Ware (BRW)** produced in kilns with controlled oxygen.
- **Megalithic Burial Grounds:** The cemetery at **Ibbankatuwa (ඉබ්බන්කටුව)** near Dambulla contains stone cist tombs with urns containing human cremated remains, carnelian beads, and copper eye-liner rods.`;

    const siAnswer = `### ශ්‍රී ලංකාවේ පුරාණ ජනාවාස (ප්‍රාග් හා පූර්ව ඓතිහාසික යුග)
**10 ශ්‍රේණිය ඉතිහාසය — 2 වන පරිච්ඡේදය: පුරාණ ජනාවාස (පෙළපොත පිටු 10–30)**

#### 1. ප්‍රාග් ඓතිහාසික යුගය (ශිලා යුගය)
- **මධ්‍ය ශිලා යුගයේ මානවයා:** වසර 48,000 කට පෙර සිට ලංකාවේ ස්වාභාවික ගල් ලෙන්වල විසූ බලංගොඩ මානවයා (*Homo sapiens balangodensis*).
- **ප්‍රධාන ලෙන් ජනාවාස:** **පාහියන්ගල** (බුලත්සිංහල), **බටදොඹලෙන** (කුරුවිට), **බෙලිලෙන** (කිතුල්ගල).
- **එළිමහන් ජනාවාසය:** ඇඹිලිපිටිය **බෙල්ලන්බැඳිපැලැස්ස** (ඇටසැකිලි හා ක්ෂුද්‍ර ශිලා මෙවලම්).

#### 2. පූර්ව ඓතිහාසික යුගය (මුල් යකඩ යුගය — ක්‍රි.පූ. 1000 සිට ක්‍රි.පූ. 300 දක්වා)
- **කෘෂිකර්මාන්තය හා ගම්මාන:** දඩයම් දිවියෙන් මිදී ස්ථිර ගොවිතැන, වී වගාව සහ සත්ත්ව පාලනය ඇරඹීම.
- **යකඩ භාවිතය:** කෘෂිකාර්මික හා යුද මෙවලම් සඳහා යකඩ තාක්ෂණය භාවිතය.
- **කළු සහ රතු මැටි බඳුන් (BRW):** උසස් කුඹල් තාක්ෂණය.
- **ඉබ්බන්කටුව මහා ශිලා සුසානය:** දඹුල්ල අසල ඉබ්බන්කටුවෙන් හමුවූ ගල් පෙට්ටි සුසාන (Cist Burials), භෂ්මාවශේෂ මැටි බඳුන් සහ කානීලියන් පබළු.`;

    const taAnswer = `### இலங்கையின் பண்டைய குடியேற்றங்கள் — தரம் 10 வரலாறு (அத்தியாயம் 2)
1. **வரலாற்றுக்கு முற்பட்ட காலம்:** பாகியன்கல, பட்டதொம்பலென குகைகள் மற்றும் பெல்லன்பெந்திபெலஸ்ஸ திறந்தவெளி தளம்.
2. **ஆரம்ப இரும்புக்காலம்:** இப்பத்கட்டுவ (Ibbankatuwa) பெருங்கற்கால புதைகுழி, கறுப்பு-சிவப்பு மட்பாண்டங்கள் (BRW) மற்றும் இரும்பு தொழினுட்பம்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: [
        'Pre-historic sites: Fa-Hien, Batadombalena, Bellanbandi Palassa (Microliths)',
        'Proto-historic sites: Ibbankatuwa megalithic cist cemetery (c. 1000–300 B.C.)',
        'Technological leaps: Iron metallurgy and Black and Red Ware (BRW) pottery'
      ],
      suggestedFollowUps: [
        'What was discovered at the Ibbankatuwa Megalithic burial site?',
        'How did iron tools transform ancient agriculture?',
        'Difference between Pre-historic and Proto-historic eras'
      ]
    };
  }

  private handleAncientSociety(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-history-gr10',
        source: 'Grade 10 History Textbook — Chapter 4: The Ancient Society of Sri Lanka (pp. 44–62)',
        fileType: 'PDF',
        pageNumber: 44,
        chunkNumber: 15,
        distance: 0.1,
        excerpt: 'Ancient Society: Village agrarian organization, caste system (Kula), Gam Sabha village councils, guild associations, and Buddhist ethical foundations centered on the Tank and Stupa.'
      }
    ];

    const enAnswer = `### The Ancient Society of Sri Lanka: Structure, Economy & Culture
**Grade 10 History — Chapter 4: The Ancient Society of Sri Lanka (Textbook pp. 44–62)**

#### 1. Social Organization & Caste (*Kula*)
- Ancient society was stratified according to hereditary occupational divisions (*Kula*).
- **Goigama (Govi Kula):** Agrarian landholders and cultivators, forming the largest segment.
- Specialized artisan castes: Metalworkers (*Kammaru*), potters (*Kumbhakara*), weavers (*Tantuvaya*), and leatherworkers.
- Unlike the rigid Indian Varna model, the Sri Lankan caste system had lower ritual rigidity due to the compassionate ethos of Buddhism.

#### 2. Village Administration (*Gam Sabha*)
- Autonomous village councils (**Gam Sabha**) presided over local legal disputes, water distribution from village tanks, and communal labour (*Kariya* / *Katty* work).

#### 3. Cultural Pillar: "Wewa, Dagoba, Ketha, Gamgoda"
- The harmonious balance between the reservoir (*Wewa* for sustenance), the Stupa (*Dagoba* for spiritual uplift), the paddy field (*Ketha*), and the village cluster (*Gamgoda*).`;

    const siAnswer = `### ශ්‍රී ලංකාවේ පුරාණ සමාජය: ව්‍යුහය, ආර්ථිකය හා සංස්කෘතිය
**10 ශ්‍රේණිය ඉතිහාසය — 4 වන පරිච්ඡේදය: ශ්‍රී ලංකාවේ පුරාණ සමාජය (පෙළපොත පිටු 44–62)**

#### 1. සමාජ සංවිධානය හා කුල ක්‍රමය
- වෘත්තීය පදනම මත ගොඩනැඟුණු කුල ක්‍රමයක් පැවති අතර, ගොවිතැන ප්‍රධාන ජීවනෝපාය වූ ගොවි කුලය ප්‍රමුඛ විය.
- කම්මල්කරුවන්, කුඹල්කරුවන්, රෙදි වියන්නන් වැනි ශිල්පීය ශ්‍රේණි පැවතිණි. බුදුදහමේ ආභාසය නිසා කුල පීඩනය අවම මට්ටමක පැවතුණි.

#### 2. ග්‍රාමීය පාලනය සහ ගම් සභාව
- ගමේ පොදු කටයුතු, වාරිමාර්ග නඩත්තුව සහ සුළු ආරවුල් විසඳීම **ගම් සභාව** මඟින් ස්වාධීනව සිදු කෙරිණි.

#### 3. වැවයි දාගැබයි ගමයි පන්සලයි සංකල්පය
- ගොවියාගේ ආර්ථික පදනම වැවෙන්ද, අධ්‍යාත්මික හා සදාචාරාත්මක මඟපෙන්වීම දාගැබ සහිත පන්සලෙන්ද තහවුරු වූ ආදර්ශවත් සහජීවනයකි.`;

    const taAnswer = `### இலங்கையின் பண்டைய சமூகம் — தரம் 10 வரலாறு (அத்தியாயம் 4)
- **சமூக அமைப்பு:** தொழில் சார்ந்த குல முறைமை மற்றும் விவசாயத்தை அடிப்படையாகக் கொண்ட வாழ்க்கை.
- **கிராம நிர்வாகம்:** கிராம சபை (Gam Sabha) மூலம் உள்ளூர் பிணக்குகள் தீர்க்கப்பட்டன.
- **குளமும் தாதுகோபமும்:** விவசாயத்திற்கு குளமும், ஆன்மீகத்திற்கு விகாரையும் மையமாகத் திகழ்ந்தன.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: [
        'Occupational caste division tempered by Buddhist humanism',
        'Gam Sabha: Autonomous local dispute and water management council',
        'The holistic "Wewa and Dagoba" cultural civilization'
      ],
      suggestedFollowUps: [
        'How did Gam Sabha councils administer ancient villages?',
        'Difference between Sri Lankan and Indian caste models',
        'Significance of the "Wewa and Dagoba" cultural concept'
      ]
    };
  }

  private handleAncientScienceAndTech(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-history-gr10',
        source: 'Grade 10 History Textbook — Chapter 5: Ancient Science and Technology in Sri Lanka (pp. 63–76)',
        fileType: 'PDF',
        pageNumber: 63,
        chunkNumber: 22,
        distance: 0.06,
        excerpt: 'Ancient Science and Technology: The Bisokotuwa cistern sluice valve, Yoda Ela trans-basin canal engineering (1 foot gradient per mile), Ralapanawa wave breaker stone pitching, and monsoon wind-powered iron furnaces at Samanalawewa.'
      }
    ];

    const enAnswer = `### Ancient Science and Technology in Sri Lanka: The Hydraulic Miracle
**Grade 10 History — Chapter 5: Ancient Science & Technology (Textbook pp. 63–76)**

#### 1. The Bisokotuwa (Cistern Sluice / බිසෝකොටුව)
- **The Problem:** Deep water reservoirs (e.g., Minneriya, Kalawewa) generated tremendous hydrostatic pressure ($P = h\rho g$) that would obliterate earthen embankments if water were released directly.
- **The Sinhala Invention:** A rectangular stone pressure-release chamber built inside the dam. Water flows into the chamber, loses turbulent kinetic energy, and exits smoothly through stone conduits into irrigation canals.
- **Historical Verdict:** British engineer Henry Parker noted that ancient Sinhala engineers solved water pressure mechanics over 2,000 years before modern European engineering.

#### 2. Gradient Engineering: The Jaya Ganga / Yoda Ela
- King Dhatusena's **Yoda Ela (87 km)** carries water from Kala Wewa to Tissa Wewa at an astonishing gradient of just **6 inches to 1 foot per mile (1:10,000)**!

#### 3. Ralapanawa (රළපනාව)
- Dry-stone pitching on the inner slope of reservoir bunds that dissipates crashing wave energy and prevents embankment erosion.

#### 4. Metallurgy: Monsoon-Wind Iron Smelting at Samanalawewa
- Smelters positioned on western hilltops utilized the high-speed southwest monsoon winds to achieve temperatures exceeding 1400°C without hand bellows!`;

    const siAnswer = `### ශ්‍රී ලංකාවේ පුරාණ විද්‍යාව සහ තාක්ෂණය: මහා වාරි ආශ්චර්යය
**10 ශ්‍රේණිය ඉතිහාසය — 5 වන පරිච්ඡේදය: පුරාණ විද්‍යාව සහ තාක්ෂණය (පෙළපොත පිටු 63–76)**

#### 1. බිසෝකොටුව (Cistern Sluice Gate)
- **තාක්ෂණික ගැටලුව:** මින්නේරිය, කලා වැව වැනි ගැඹුරු මහා වැව්වල ගැඹුරු ජල පීඩනය ($P = h\rho g$) වැව් බැම්ම පුපුරුවා හැරීමට සමත් තරම් ප්‍රබල විය.
- **දේශීය විසඳුම:** වැව් බැම්ම තුළ ගලින් බඳින ලද සෘජුකෝණාස්‍රාකාර ළිඳක් වැනි කුටීරය (බිසෝකොටුව). ජලය මෙහි පිරී කැළඹුම හා පීඩනය බිඳ වැටී, සොරොව් නළ මඟින් ඇළ මාර්ග වෙත සුමටව මුදාහැරිණි.
- බ්‍රිතාන්‍ය ඉංජිනේරු හෙන්රි පාකර් ප්‍රකාශ කළේ, යුරෝපීයයන් 19 වන සියවසේදී සොයාගත් කපාට කුටීර මූලධර්මය ක්‍රි.පූ. 3 වන සියවසේදී හෙළ ඉංජිනේරුවන් සතුව තිබූ බවයි.

#### 2. මන්දගාමී බැවුම් තාක්ෂණය: ජය ගඟ / යෝධ ඇළ
- ධාතුසේන රජු විසින් ඉදිකළ යෝධ ඇළ සැතපුම් 54ක් පුරා කලා වැවේ සිට තිසා වැව දක්වා ජලය රැගෙන යන්නේ **සැතපුමකට අඟල් 6 සිට 12 දක්වා** විස්මිත මෘදු බැවුමකිනි.

#### 3. රළපනාව (Ralapanawa)
- වැවේ රළ පහරින් වැව් බැම්ම ඛාදනය වීම වැළැක්වීම සඳහා බැම්මේ ඇතුළු බෑවුම මත අතුරා ඇති සෘජුකෝණාස්‍රාකාර කළුගල් පුවරු පෙළගැස්මයි.

#### 4. සමනලවැව යකඩ උණුකිරීමේ තාක්ෂණය
- මෝසම් සුළං බලය භාවිතයෙන් බටහිර කඳු බෑවුම්වල උදුන් තනා අංශක 1400 ඉක්මවූ අධික උෂ්ණත්වයෙන් වානේ නිපදවූ ලොව පුරෝගාමී තාක්ෂණය.`;

    const taAnswer = `### பண்டைய இலங்கையின் அறிவியலும் தொழினுட்பமும் — தரம் 10 வரலாறு (அத்தியாயம் 5)
1. **பிசோகொட்டுவ (Bisokotuwa):** அணைக்கட்டின் ஆழமான நீர் அழுத்தத்தைக் கட்டுப்படுத்தி வாய்க்கால்களுக்கு சீராக நீர் வழங்கும் கல் அறை (Cistern Sluice).
2. **யோத எல (Yoda Ela):** ஒரு மைலுக்கு 6-12 அங்குல மிக நுட்பமான சாய்வில் 87 கி.மீ தூரம் நீர் கொண்டு சென்ற வாய்க்கால்.
3. **சமனலவெவ இரும்பு உருக்கு தொழினுட்பம்:** பருவக்காற்றின் வேகத்தைப் பயன்படுத்தி 1400°C வெப்பத்தில் இரும்பை உருக்கிய பண்டைய நுட்பம்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: [
        'Bisokotuwa: Cistern sluice pressure-break chamber protecting reservoir bunds',
        'Yoda Ela: 87 km canal built at a gradient of just 6 inches to 1 foot per mile',
        'Samanalawewa: World-first monsoon wind-powered high-grade steel smelting'
      ],
      suggestedFollowUps: [
        'How does a Bisokotuwa control hydraulic water pressure?',
        'How did ancient engineers survey the Yoda Ela gradient?',
        'Show Bisokotuwa simulation in the interactive visualizer on the right'
      ]
    };
  }

  private handleSouthWestKingdoms(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-history-gr10',
        source: 'Grade 10 History Textbook — Chapter 7: Decline of Dry Zone Cities & Origin of South West Kingdoms (pp. 91–105)',
        fileType: 'PDF',
        pageNumber: 91,
        chunkNumber: 28,
        distance: 0.11,
        excerpt: 'South West Kingdoms: Shift of political capitals following Magha of Kalinga invasion: Dambadeniya, Yapahuwa, Kurunegala, Gampola, and Kotte.'
      }
    ];

    const enAnswer = `### Decline of Dry Zone Cities & Origin of South-West Kingdoms
**Grade 10 History — Chapter 7: South-West Kingdoms (Textbook pp. 91–105)**

#### 1. Causes for the Fall of Polonnaruwa
- The destructive invasion of **Kalinga Magha (1215 CE)** devastated the hydraulic irrigation infrastructure.
- Malaria epidemics in stagnant breached tanks made dry-zone cities uninhabitable.

#### 2. The Succession of Capital Cities
1. **Dambadeniya (දඹදෙණිය):** Established by King Vijayabahu III; King Parakramabahu II was a great literary patron (*Kalikala Sahitya Sarvajna Pandita*).
2. **Yapahuwa (යාපහුව):** King Bhuvanekabahu I fortified a steep rock fortress with an exquisite ornamental stone staircase and Chinese ceramic trade ties.
3. **Kurunegala (කුරුණෑගල):** King Parakramabahu IV compiled the *Sinhala Jataka Pothe* and *Dalada Siritha*.
4. **Gampola (ගම්පොළ):** Hill kingdom era featuring Kings Bhuvanekabahu IV and Wickramabahu III; built Embekke, Gadaladeniya, and Lankatilaka temples.
5. **Kotte (කෝට්ටේ):** Founded as an impregnable water fortress by Minister Nissanka Alagakkonara; reached its golden apex under **King Parakramabahu VI (1412–1467 CE)**, the last ruler to unite all of Sri Lanka under one crown before the arrival of Europeans.`;

    const siAnswer = `### වියළි කලාපයේ නගර පරිහානිය සහ නිරිතදිග රාජධානි
**10 ශ්‍රේණිය ඉතිහාසය — 7 වන පරිච්ඡේදය: නිරිතදිග රාජධානි (පෙළපොත පිටු 91–105)**

#### 1. පොළොන්නරුව බිඳවැටීමට හේතු
- කාලිංග මාඝ ආක්‍රමණය (1215) මඟින් වාරි ශිෂ්ටාචාරය සහ වෙහෙර විහාර විනාශ වීම.
- බිඳී ගිය වැව් ආශ්‍රිතව මැලේරියා වසංගතය පැතිරීම.

#### 2. නිරිතදිග රාජධානි පෙළගැස්ම
1. **දඹදෙණිය:** 3 වන විජයබාහු රජු ඇරඹූ අතර 2 වන පරාක්‍රමබාහු රජු සාහිත්‍ය පුනරුදයක් ඇති කළේය.
2. **යාපහුව:** 1 වන බුවනෙකබාහු රජු පර්වත බලකොටුවක් ලෙස තැනූ අතර අලංකාර ගල් පඩිපෙළ සහ චීන කාසි හමුවිය.
3. **කුරුණෑගල:** 4 වන පරාක්‍රමබාහු රජු සිංහල ජාතක පොත රචනා කරවීය.
4. **ගම්පොළ:** ඇම්බැක්කේ, ලංකාතිලක, ගඩලාදෙණිය විහාර බිහි විය.
5. **කෝට්ටේ:** නිශ්ශංක අලගක්කෝනාර බලකොටුවක් ලෙස තැනූ අතර, **6 වන පරාක්‍රමබාහු රජු (1412–1467)** යටතේ මුළු ලංකාවම එක්සේසත් කර සන්දේශ කාව්‍ය සාහිත්‍යයේ ස්වර්ණමය යුගය බිහි කළේය.`;

    const taAnswer = `### தென்மேற்கு இராச்சியங்களின் தோற்றம் — தரம் 10 வரலாறு (அத்தியாயம் 7)
- கலிங்க மாகனின் படையெடுப்பால் பொலன்னறுவை வீழ்ச்சியடைந்தது.
- புதிய தலைநகரங்கள்: தம்பதெனிய, யாப்பகுவ, குருநாகல், கம்பளை, மற்றும் கோட்டை.
- **6 ஆம் பராக்கிரமபாகு மன்னன் (கோட்டை):** முழு இலங்கையையும் தனது ஆட்சியின் கீழ் கொண்டுவந்தார்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: [
        'Fall of Polonnaruwa caused by Magha invasion (1215) and malaria',
        'Succession of capitals: Dambadeniya → Yapahuwa → Kurunegala → Gampola → Kotte',
        'King Parakramabahu VI of Kotte was the last king to unify the entire island'
      ],
      suggestedFollowUps: [
        'Why did political power shift to the South-West?',
        'Achievements of King Parakramabahu VI of Kotte',
        'Significance of the Yapahuwa stone staircase'
      ]
    };
  }

  private handleKandyanKingdom(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-history-gr10',
        source: 'Grade 10 History Textbook — Chapter 8: The Kandyan Kingdom (pp. 106–117)',
        fileType: 'PDF',
        pageNumber: 106,
        chunkNumber: 33,
        distance: 0.08,
        excerpt: 'Kandyan Kingdom: Senkadagala, King Vimaladharmasuriya I, military resistance against Portuguese invasions at Danture (1594) and Gannoruwa (1638), and historical accounts by Robert Knox.'
      }
    ];

    const enAnswer = `### The Kandyan Kingdom (Senkadagala): The Mountain Fortress
**Grade 10 History — Chapter 8: The Kandyan Kingdom (Textbook pp. 106–117)**

#### 1. Foundation & Legitimacy
- Unified by **King Vimaladharmasuriya I (1592–1604 CE)** (formerly Konappu Bandara).
- Secured religious and political legitimacy by retrieving the **Sacred Tooth Relic** to Kandy and marrying Princess Kusumasana Devi (Dona Catherina).

#### 2. Historic Military Victories
- **Battle of Danture (1594 CE):** Decisive annihilation of the Portuguese army commanded by Pero Lopes de Sousa, saving the kingdom from subjugation.
- **Battle of Randeniwela (1630 CE):** King Senarath and his sons defeated Constantine de Sa.
- **Battle of Gannoruwa (1638 CE):** King Rajasinha II crushed the Portuguese invasion under Diogo de Melo Coutinho.

#### 3. Robert Knox's Account (1660–1679 CE)
- English captive Robert Knox lived 19 years in Kandy and authored *"An Historical Relation of the Island Ceylon"* (1681), providing an invaluable firsthand ethnographic record of Kandyan agriculture, law, society, and King Rajasinha II's court.`;

    const siAnswer = `### උඩරට රාජධානිය (සෙංකඩගල පුරවරය)
**10 ශ්‍රේණිය ඉතිහාසය — 8 වන පරිච්ඡේදය: උඩරට රාජධානිය (පෙළපොත පිටු 106–117)**

#### 1. රාජධානියේ ආරම්භය හා ස්ථාවරත්වය
- **1 වන විමලධර්මසූරිය රජු (1592–1604)** විසින් සෙංකඩගල කේන්ද්‍ර කරගෙන උඩරට රාජධානිය ශක්තිමත් කරන ලදී.
- දෙල්ගමුව රජමහා විහාරයේ සඟවා තිබූ **ශ්‍රී දන්ත ධාතූන් වහන්සේ** උඩරටට වැඩම කරවා කුසුමාසන දේවිය (දෝන කැතරිනා) විවාහ කරගැනීමෙන් රාජ්‍ය උරුමය තහවුරු කළේය.

#### 2. විදේශ ආක්‍රමණ පරාජය කළ ඓතිහාසික සටන්
- **දන්තුරේ සටන (1594):** පේරෝ ලෝපෙස් ද සූසා ප්‍රමුඛ පෘතුගීසි හමුදාව සම්පූර්ණයෙන්ම සමූලඝාතනය කර උඩරට නිදහස රැකගැනීම.
- **රන්දෙනිවෙල සටන (1630):** කොන්ස්තන්තීනු ද සා පරාජය කිරීම.
- **ගන්නෝරුව සටන (1638):** 2 වන රාජසිංහ රජු දියෝගු ද මේලෝ කුටීඤ්ඤෝගේ පෘතුගීසි හමුදාව පරාජය කළ ලංකා ඉතිහාසයේ අවසන් මහා විජයග්‍රාහී විවෘත සටන.

#### 3. රොබට් නොක්ස්ගේ ඓතිහාසික වාර්තාව
- 2 වන රාජසිංහ රජු සමයේ වසර 19ක් උඩරට සිරකරුවෙකු ලෙස සිටි ඉංග්‍රීසි ජාතික රොබට් නොක්ස් ලියූ *"එදා හෙළදිව"* (An Historical Relation of Ceylon) ග්‍රන්ථය එකල සමාජය, සිරිත් විරිත් සහ ආර්ථිකය හැදෑරීමට ලැබෙන අගනා මූලාශ්‍රයකි.`;

    const taAnswer = `### கண்டி இராச்சியம் — தரம் 10 வரலாறு (அத்தியாயம் 8)
- **1 ஆம் விமலதர்மசூரியன்:** கண்டி இராச்சியத்தை ஸ்தாபித்து, தந்த தாதுவை கண்டிக்குக் கொண்டுவந்து ஆட்சியை உறுதிப்படுத்தினார்.
- **முக்கிய போர்கள்:** தந்தூரே போர் (1594) மற்றும் கன்னோறுவை போர் (1638) ஆகியவற்றில் போர்த்துக்கேயர் தோற்கடிக்கப்பட்டனர்.
- **ராபர்ட் நாக்ஸ்:** கண்டி சமூகத்தைப் பற்றி "இலங்கை பற்றிய வரலாற்று விபரிப்பு" நூலை எழுதினார்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: [
        'Vimaladharmasuriya I unified Kandy and established the Temple of the Tooth',
        'Historic battlefield triumphs: Danture (1594) and Gannoruwa (1638)',
        'Robert Knox provided firsthand insights into Kandyan social institutions'
      ],
      suggestedFollowUps: [
        'Significance of the Battle of Danture in 1594',
        'How did Robert Knox describe Kandyan life?',
        'Why was the Kandyan Kingdom difficult for Europeans to conquer?'
      ]
    };
  }

  private handleRenaissance(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-history-gr10',
        source: 'Grade 10 History Textbook — Chapter 9: The Renaissance (pp. 118–126)',
        fileType: 'PDF',
        pageNumber: 118,
        chunkNumber: 36,
        distance: 0.09,
        excerpt: 'Renaissance: The rebirth of learning in 14th-16th century Italy, Humanism, artistic masters (Leonardo da Vinci, Michelangelo), Gutenberg movable type printing, and scientific revolutions.'
      }
    ];

    const enAnswer = `### The European Renaissance: Rebirth of Art, Science & Humanism
**Grade 10 History — Chapter 9: The Renaissance (Textbook pp. 118–126)**

#### 1. What was the Renaissance?
The Renaissance ("rebirth") was a transformative cultural, intellectual, and scientific revival that began in Italian city-states (e.g., Florence) in the **14th century** and spread across Europe. It marked the transition from the Middle Ages to the Modern Era.

#### 2. Key Pillars of the Renaissance
1. **Humanism:** Moving away from medieval scholasticism to focus on human dignity, critical reasoning, and worldly potential.
2. **Masterpieces in Fine Arts:**
   - **Leonardo da Vinci:** The quintessential Renaissance polymath (painter of *Mona Lisa*, *The Last Supper*, and pioneer of anatomy and engineering sketches).
   - **Michelangelo:** Master sculptor (*David*, *Pietà*) and painter of the Sistine Chapel ceiling.
3. **The Printing Revolution:**
   - **Johannes Gutenberg (1440 CE):** Invented the movable-type metal printing press, democratizing knowledge and Bible translation.
4. **The Scientific Revolution:**
   - **Nicolaus Copernicus & Galileo Galilei:** Heliocentric astronomical model (the Earth revolves around the Sun), replacing geocentric dogmas.`;

    const siAnswer = `### යුරෝපීය පුනරුදය: කලාව, විද්‍යාව සහ මානවවාදයේ පුනර්ජීවනය
**10 ශ්‍රේණිය ඉතිහාසය — 9 වන පරිච්ඡේදය: පුනරුදය (පෙළපොත පිටු 118–126)**

#### 1. පුනරුදය යනු කුමක්ද?
14 වන සියවසේදී ඉතාලියේ ෆ්ලොරන්ස් වැනි නගර කේන්ද්‍ර කරගනිමින් ආරම්භ වූ සම්භාව්‍ය ග්‍රීක-රෝම දැනුම, කලාව සහ චින්තනයේ පුනර්ජීවනය **පුනරුදය** නම් වේ.

#### 2. පුනරුදයේ ප්‍රධාන ලක්ෂණ
1. **මානවවාදය (Humanism):** මධ්‍යතන යුගයේ අන්ධ ආගමික මත වෙනුවට මිනිසාගේ බුද්ධිය, නිදහස සහ ලෞකික සතුට අගය කිරීම.
2. **චිත්‍ර හා මූර්ති කලාව:**
   - **ලියනාඩෝ ඩා වින්චි:** *මොනාලිසා* සහ *අවසාන රාත්‍රී භෝජනය* සිතුවම් කළ සර්වතෝභද්‍ර ප්‍රඥාවන්තයා.
   - **මයිකල් ආන්ජලෝ:** *දාවිත්* ප්‍රතිමාව සහ සිස්ටයින් දේවස්ථානයේ සිවිලිම් සිතුවම්.
3. **මුද්‍රණ ශිල්පයේ විප්ලවය:**
   - **යොහානස් ගුටෙන්බර්ග් (1440):** අකුරු අමුණා මුද්‍රණය කළ හැකි මුද්‍රණ යන්ත්‍රය සොයාගැනීමෙන් පොතපත ලොව පුරා ව්‍යාප්ත විය.
4. **විද්‍යාත්මක පුනරුදය:**
   - කොපර්නිකස් සහ ගැලීලියෝ ගැලීලි විසින් සූර්ය කේන්ද්‍රවාදය තහවුරු කරමින් පෘථිවිය විශ්වයේ කේන්ද්‍රය නොවන බව ඔප්පු කිරීම.`;

    const taAnswer = `### ஐரோப்பிய மறுமலர்ச்சி — தரம் 10 வரலாறு (அத்தியாயம் 9)
- **மறுமலர்ச்சி (Renaissance):** 14 ஆம் நூற்றாண்டில் இத்தாலியில் தொடங்கிய கலாசார, கலை, அறிவியல் புத்துயிர்ப்பு.
- **லியனார்டோ டா வின்சி:** மொனாலிசா, இறுதி விருந்து ஓவியங்களை வரைந்த மேதை.
- **குட்டன்பேர்க்:** 1440 இல் அச்சு இயந்திரத்தைக் கண்டுபிடித்தார்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: [
        'Renaissance began in 14th-century Italy, emphasizing Humanism over medieval dogma',
        'Artistic masters: Leonardo da Vinci (Mona Lisa) and Michelangelo (David)',
        'Johannes Gutenberg revolutionized literacy via the movable-type printing press'
      ],
      suggestedFollowUps: [
        'Why did the Renaissance begin in Italy?',
        'How did Gutenberg\'s printing press change the world?',
        'Who was Leonardo da Vinci and what were his achievements?'
      ]
    };
  }

  private handleWesternWorld(lang: 'en' | 'si' | 'ta', _question: string): RAGResponse {
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-history-gr10',
        source: 'Grade 10 History Textbook — Chapter 10: Sri Lanka and the Western World (pp. 127–144)',
        fileType: 'PDF',
        pageNumber: 127,
        chunkNumber: 40,
        distance: 0.08,
        excerpt: 'Western Encounters: Portuguese arrival (1505, Lourenço de Almeida), fortress at Colombo, cinnamon monopoly, Dutch VOC treaty and conquest (1658), and British takeover in 1796/1815.'
      }
    ];

    const enAnswer = `### Sri Lanka and the Western World: Portuguese, Dutch & British Eras
**Grade 10 History — Chapter 10: Sri Lanka and the Western World (Textbook pp. 127–144)**

#### 1. Portuguese Arrival (1505 CE)
- Wind-blown fleet under **Lourenço de Almeida** landed at Galle and then Colombo in 1505.
- Famous Sinhala observation recorded in Rajavaliya: *"There is in our harbour of Colombo a race of people of fair skin and great beauty; they eat hunks of stone and drink blood (bread and wine), and wear jackets of iron."*
- Established a fort at Colombo through a treaty with King Dharma Parakramabahu IX of Kotte to trade cinnamon.

#### 2. Dutch Conquest (1638–1658 CE)
- King Rajasinha II of Kandy sought Dutch assistance under the **Kandyan-Dutch Treaty of 1638** to expel the Portuguese ("Exchanging ginger for chili").
- Dutch captured Colombo (1656) and Jaffna (1658), seizing coastal territories under the Dutch East India Company (**VOC**).
- Legacy: Roman-Dutch law, canal networks (*Dutch canals*), and Fort structures (Galle, Matara).

#### 3. British Takeover (1796 & 1815 CE)
- British seized maritime provinces in 1796, and subsequently annexed the entire island in 1815 under the **Kandyan Convention (උඩරට ගිවිසුම)**.`;

    const siAnswer = `### ශ්‍රී ලංකාව සහ බටහිර ලෝකය: පෘතුගීසි, ලන්දේසි හා ඉංග්‍රීසි යුග
**10 ශ්‍රේණිය ඉතිහාසය — 10 වන පරිච්ඡේදය: ශ්‍රී ලංකාව සහ බටහිර ලෝකය (පෙළපොත පිටු 127–144)**

#### 1. පෘතුගීසීන්ගේ පැමිණීම (1505)
- **ලොරෙන්සෝ ද අල්මේදා** ප්‍රමුඛ පෘතුගීසි නැව් කුණාටුවකට හසුව ගාල්ලටත් පසුව කොළඹ වරායටත් ළඟා විය.
- රාජාවලියේ සඳහන් ප්‍රසිද්ධ ඔත්තු වාර්තාව: *"අපේ කොළඹ තොටේ ඉතා සුදු වූ, යකඩ ඇඳුම් ඇඳගත්, ගල් කැබලි කමින් ලේ බොන ජාතියක් පැමිණ සිටිති."*
- 9 වන ධර්ම පරාක්‍රමබාහු රජු සමඟ කුරුඳු වෙළඳ ගිවිසුමක් ඇතිකරගෙන කොළඹ කොටුවක් තැනූහ.

#### 2. ලන්දේසීන් පැමිණීම (1638–1658)
- 2 වන රාජසිංහ රජු පෘතුගීසීන් එළවීමට ලන්දේසි පෙරදිග ඉන්දියා වෙළඳ සමාගම (**VOC**) සමඟ 1638 දී ගිවිසුමක් අත්සන් කළේය ("ඉඟුරු දී මිරිස් ගත්තාක් මෙන්").
- 1656 කොළඹ සහ 1658 යාපනය අල්ලාගත් ලන්දේසීන් මුහුදුබඩ පාලනය තහවුරු කළේය (රෝම-ලන්දේසි නීතිය, ඇළ මාර්ග, ගාල්ල කොටුව).

#### 3. බ්‍රිතාන්‍ය ආධිපත්‍යය (1796 & 1815)
- 1796 දී මුහුදුබඩ ප්‍රදේශ අල්ලාගත් බ්‍රිතාන්‍යයන්, 1815 **උඩරට ගිවිසුම** මඟින් මුළු දිවයිනම යටත් කරගන්නා ලදී.`;

    const taAnswer = `### இலங்கையும் மேலைத்தேய உலகமும் — தரம் 10 வரலாறு (அத்தியாயம் 10)
1. **போர்த்துக்கேயர் (1505):** லொரென்சோ டி அல்மெய்தா கொழும்பை வந்தடைந்து கறுவா வர்த்தகத்தில் ஈடுபட்டார்.
2. **ஒல்லாந்தர் (1658):** 1638 உடன்படிக்கை மூலம் போர்த்துக்கேயரை வெளியேற்றி ரோம-ஒல்லாந்த சட்டத்தை அறிமுகப்படுத்தினர்.
3. **பிரித்தானியர் (1796/1815):** 1815 கண்டி ஒப்பந்தம் மூலம் முழு இலங்கையையும் தமது ஆட்சியின் கீழ் கொண்டுவந்தனர்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: [
        'Portuguese arrival in 1505 under Lourenço de Almeida for cinnamon trade',
        'Dutch VOC rule (1658–1796) introduced Roman-Dutch law and fortified towns',
        'British took maritime areas in 1796 and full control in the 1815 Kandyan Convention'
      ],
      suggestedFollowUps: [
        'How did the Rajavaliya chronicle describe the Portuguese arrival in 1505?',
        'What was the meaning behind "exchanging ginger for chili"?',
        'What were the main terms of the 1815 Kandyan Convention?'
      ]
    };
  }

  private handleHistoricalMonarchs(lang: 'en' | 'si' | 'ta', question: string): RAGResponse {
    const lower = question.toLowerCase();
    const sources: SourceCitation[] = [
      {
        documentId: 'sl-moe-history-gr10',
        source: 'Grade 10 History Textbook — National Curriculum Historical Personalities',
        fileType: 'PDF',
        pageNumber: 35,
        chunkNumber: 14,
        distance: 0.08,
        excerpt: 'Prominent Monarchs of Sri Lanka: King Devanampiyatissa, King Dutugemunu, King Dhatusena, King Parakramabahu the Great, and Chronicles (Mahavamsa, Deepavamsa).'
      }
    ];

    let king = 'King Parakramabahu I the Great';
    let kingSi = 'මහා පරාක්‍රමබාහු රජු';
    let kingTa = 'மகா பராக்கிரமபாகு மன்னன்';

    if (lower.includes('dutugemunu') || lower.includes('දුටුගැමුණු')) {
      king = 'King Dutugemunu the Great';
      kingSi = 'දුටුගැමුණු මහා රජතුමා';
      kingTa = 'துட்டகைமுனு மன்னன்';
    } else if (lower.includes('devanampiyatissa') || lower.includes('දේවානම්පියතිස්ස')) {
      king = 'King Devanampiyatissa';
      kingSi = 'දේවානම්පියතිස්ස රජතුමා';
      kingTa = 'தேவாநம்பியதீசன்';
    }

    const enAnswer = `### Sri Lankan History: ${king}
**Grade 10 History National Curriculum Context**

- **Historical Legacy:** A defining monarch who left indelible contributions to Sri Lankan sovereignty, Buddhist heritage, and irrigation architecture.
- **Key Achievements:**
  - **King Dutugemunu (161–137 BCE):** Unified Sri Lanka, built the Great Stupa **Ruwanweliseya (මහා සෑය)**, **Mirisawetiya**, and the 9-storey monastic chapter house **Lovamahapaya**.
  - **King Parakramabahu I (1153–1186 CE):** Consolidated Polonnaruwa, constructed the colossal **Parakrama Samudraya**, and built Gal Viharaya.
  - **King Devanampiyatissa (307–267 BCE):** Formally accepted Theravada Buddhism from Arahant Mahinda, planted the sacred **Jaya Sri Maha Bodhi**, and founded Mahavihara.
- **Chronicle Authority:** Detailed in the **Mahavamsa** written in Pali by Venerable Mahanama Thero.`;

    const siAnswer = `### ශ්‍රී ලංකා ඉතිහාසය: ${kingSi}
**10 ශ්‍රේණිය ඉතිහාසය නිල විෂය නිර්දේශය**

- **ඓතිහාසික කාර්යභාරය:** ශ්‍රී ලාංකේය රාජ්‍ය ස්වෛරීභාවය, බෞද්ධ ශාසනය සහ වාරි ශිෂ්ටාචාරය උදෙසා අමරණීය සේවයක් ඉටු කළ ශ්‍රේෂ්ඨ නරපතියෙකි.
- **ප්‍රධාන මෙහෙවර:**
  - **දුටුගැමුණු මහාරජ (ක්‍රි.පූ. 161–137):** මුළු දිවයින එක්සේසත් කර **රුවන්වැලි මහා සෑය**, **මිරිසවැටිය** සහ නවලක්ෂයක් භික්ෂූන් උදෙසා **ලෝවාමහාපාය** ඉදිකිරීම.
  - **මහා පරාක්‍රමබාහු රජු (1153–1186):** "අහසින් වැටෙන එකදු දිය බිඳක්වත් මිනිසාගේ ප්‍රයෝජනයට නොගෙන මුහුදට නොයවනු" යයි පවසමින් **පරාක්‍රම සමුද්‍රය** හා ගල් විහාරය නිර්මාණය කිරීම.
  - **දේවානම්පියතිස්ස රජු (ක්‍රි.පූ. 307–267):** මිහිඳු මාහිමියන්ගෙන් බුදුදහම වැළඳගෙන **ජය ශ්‍රී මහා බෝධීන් වහන්සේ** රෝපණය කර මහාවිහාර සම්ප්‍රදාය ඇරඹීම.`;

    const taAnswer = `### இலங்கை வரலாறு: ${kingTa}
- **துட்டகைமுனு மன்னன்:** நாட்டை ஒன்றுபடுத்தி ருவன்வெலிசாய தாதுகோபத்தையும் லோவமகாபாயவையும் அமைத்தார்.
- **மகா பராக்கிரமபாகு:** பராக்கிரம சமுத்திரம் மற்றும் கல் விகாரையைக் கட்டியமைத்தார்.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: [
        'King Dutugemunu built Ruwanweliseya and unified Sri Lanka',
        'King Parakramabahu built the Parakrama Samudraya in Polonnaruwa',
        'King Devanampiyatissa introduced Buddhism alongside Arahant Mahinda'
      ],
      suggestedFollowUps: [
        'What were King Dutugemunu\'s greatest architectural contributions?',
        'How did King Parakramabahu develop irrigation in Polonnaruwa?',
        'How did Buddhism transform ancient Sri Lankan society?'
      ]
    };
  }

  private handleDynamicCurriculumQuery(question: string, lang: 'en' | 'si' | 'ta', context: LearningContext): RAGResponse {
    const subject = context.subjectId || 'curriculum';
    const gradeDisplay = (context.grade || 'grade-10').replace('-', ' ').toUpperCase();

    const sources: SourceCitation[] = [
      {
        documentId: `sl-moe-${subject}-${context.grade || 'gr10'}`,
        source: `${gradeDisplay} ${subject.toUpperCase()} Textbook — Educational Publications Department Sri Lanka`,
        fileType: 'PDF',
        pageNumber: 15,
        chunkNumber: 1,
        distance: 0.1,
        excerpt: null
      }
    ];

    const enAnswer = `### ${gradeDisplay} Curriculum Guide: Addressing Your Inquiry
**Your Question:** "${question}"

Thank you for your question! Here is a structured educational explanation based on the official Sri Lankan national syllabus guidelines:

1. **Core Syllabus Principle:**
   Every topic in your **${gradeDisplay} ${subject.toUpperCase()}** curriculum is designed to build foundational analytical thinking and real-world application.

2. **Step-by-Step Educational Breakdown:**
   - **Context:** Identify the core principles, definitions, or historical era related to your inquiry.
   - **Key Mechanics:** Observe how variables, rules, or historical drivers interact according to textbook standards.
   - **Practical Application:** Connect this concept to Sri Lankan context and examinations.

3. **Next Steps:**
   Would you like a worked step-by-step problem, a diagram explanation, or an O/L past paper question on this topic?`;

    const siAnswer = `### ${gradeDisplay} විෂය නිර්දේශ මඟපෙන්වීම: ඔබගේ ප්‍රශ්නයට පිළිතුර
**ඔබගේ විමසීම:** "${question}"

ඔබගේ ප්‍රශ්නයට ස්තූතියි! ශ්‍රී ලංකා අධ්‍යාපන ප්‍රකාශන දෙපාර්තමේන්තුවේ නිල පෙළපොත් මාර්ගෝපදේශ අනුව පියවරෙන් පියවර පැහැදිලි කිරීම මෙන්න:

1. **මූලික විෂය සංකල්පය:**
   ඔබගේ **${gradeDisplay}** විෂය නිර්දේශයේ මෙම කොටස විභාග ප්‍රශ්න පත්‍රවල බහුලව විමසන ප්‍රධාන සංකල්පයකි.

2. **පියවරෙන් පියවර විග්‍රහය:**
   - **මූලධර්මය / නිර්වචනය:** අදාළ විෂය කරුණ හෝ ඓතිහාසික/විද්‍යාත්මක නියමය නිවැරදිව හඳුනාගැනීම.
   - **ක්‍රියාවලිය හා සූත්‍රය:** පියවරෙන් පියවර ගණනය කිරීම හෝ සිදුවීම් පෙළගැස්ම විමසා බැලීම.
   - **විභාග උපදෙස්:** අ.පො.ස. සාමාන්‍ය පෙළ විභාගයේදී සම්පූර්ණ ලකුණු ලබාගැනීම සඳහා අවශ්‍ය ප්‍රධාන කරුණු සටහන් කිරීම.

ඔබට මෙම මාතෘකාවට අදාළ අමතර උදාහරණයක් හෝ අ.පො.ස. සා/පෙළ පසුගිය විභාග ප්‍රශ්නයක් විසඳීමට අවශ්‍යද?`;

    const taAnswer = `### ${gradeDisplay} பாடத்திட்ட வழிகாட்டல்: உங்கள் கேள்விக்கான விளக்கம்
**உங்கள் கேள்வி:** "${question}"

உங்கள் **${gradeDisplay}** பாடத்திட்டத்தின் அடிப்படையில் படிப்படியான விளக்கம் இதோ. இலங்கை உத்தியோகபூர்வ பாடநூல்களின் வழிகாட்டலின்படி கருத்துக்கள் கட்டமைக்கப்பட்டுள்ளன.`;

    return {
      answer: lang === 'si' ? siAnswer : lang === 'ta' ? taAnswer : enAnswer,
      sources,
      languageVersions: { en: enAnswer, si: siAnswer, ta: taAnswer },
      keyPoints: [
        'Systematic syllabus-grounded explanation',
        'Aligned with Sri Lankan Educational Publications Department guidelines',
        'Ready for O/L examination practice and verification'
      ],
      suggestedFollowUps: [
        'Can you break this down step-by-step with more details?',
        'Solve an O/L past paper question on this topic',
        'Explain this simpler with a real-world Sri Lankan example'
      ]
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
    const useMock = storedMode !== null ? storedMode === 'true' : (typeof import.meta !== 'undefined' && import.meta.env?.VITE_USE_MOCK_API !== 'false');
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
