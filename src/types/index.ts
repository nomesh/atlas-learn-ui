export type Language = 'en' | 'si' | 'ta';

export type Grade = 
  | 'grade-6'
  | 'grade-7'
  | 'grade-8'
  | 'grade-9'
  | 'grade-10'
  | 'grade-11'
  | 'grade-12'
  | 'grade-13';

export type TutorState = 
  | 'idle' 
  | 'listening' 
  | 'thinking' 
  | 'speaking' 
  | 'celebrating' 
  | 'encouraging';

export interface LearningContext {
  grade: Grade;
  subjectId?: string;
  topicId?: string;
  language: Language;
  activeLessonId?: string;
  conversationId: string;
  imageUrl?: string;
  /** Pedagogical action type (e.g. "TEACH_ME", "CLARIFY", "SIMPLIFY"). Maps to backend TutorActionType. */
  action?: string;
  /** Chapter context forwarded to backend TutorChatRequest. */
  chapterId?: string;
  /** Product boundary, defaults to LEARN_CURRICULUM */
  productType?: string;
}

// Exact wire citation structure from ATLAS backend
export interface SourceCitation {
  documentId?: string | null;
  source: string;
  fileType?: string | null;
  pageNumber?: number | null;
  chunkNumber?: number | null;
  distance?: number | null;
  // Excerpt is strictly optional - NEVER fabricated. Only displayed when genuine API supplies it.
  excerpt?: string | null;
  supporting?: boolean | null;
}

/**
 * Verified curriculum provenance of a textbook visual, from the backend's relational curriculum catalogue.
 * Never filled in or guessed by the UI.
 */
export interface SourceVisualCurriculum {
  resourceRevisionId: string;
  grade?: number | null;
  subjectCode?: string | null;
  subjectName?: string | null;
  language?: string | null;
}

/**
 * Wire structure for a source visual (a textbook page preview) resolved by the backend.
 * previewUrl / openUrl are server-built and must be used unchanged: the UI never constructs curriculum URLs.
 */
export interface SourceVisual {
  visualId: string;
  documentId?: string | null;
  documentName?: string | null;
  fileType?: string | null;
  /** Physical 1-based PDF page index (not the printed page label). */
  pageNumber?: number | null;
  pageLabel?: string | null;
  kind: 'PAGE_PREVIEW' | 'FIGURE_CROP';
  caption?: string | null;
  bbox?: { x0: number; y0: number; x1: number; y1: number } | null;
  previewUrl: string;
  openUrl?: string | null;
  label?: string | null;
  /** Present for ATLAS Learn curriculum visuals only. */
  curriculum?: SourceVisualCurriculum | null;
}


export interface MemoryTrick {
  concept: string;
  trick: string;
  rhyme?: string;
  audioText: string;
  languageVersions?: {
    en?: { concept?: string; trick?: string; rhyme?: string; audioText: string };
    si?: { concept?: string; trick?: string; rhyme?: string; audioText: string };
    ta?: { concept?: string; trick?: string; rhyme?: string; audioText: string };
  };
}

// Exact wire answer structure from ATLAS backend
export interface RAGResponse {
  answer: string;
  sources: SourceCitation[];
  suggestedFollowUps?: string[] | TutorAction[];
  languageVersions?: {
    en?: string;
    si?: string;
    ta?: string;
  };
  memoryTrick?: MemoryTrick;
  keyPoints?: string[];
  /** Model that produced this answer, as reported by the backend (LIVE only; dev diagnostics). */
  runtime?: { provider?: string; model?: string };
  /** Textbook page previews; only present when the student asked for a visual and one was verified. */
  visuals?: SourceVisual[];
  /** LIVE only: evidence the backend actually used. safeFailure = no approved textbook evidence, no generated answer. */
  grounding?: { evidenceCount?: number; safeFailure?: boolean };
}

export interface TutorAction {
  id: string;
  label: Record<Language, string> | string;
  prompt: string;
  icon?: string;
}

export interface QuizOption {
  id: string;
  text: Record<Language, string>;
}

export interface QuizQuestion {
  id: string;
  subjectId: string;
  topicId: string;
  grade: Grade;
  examCategory: 'general' | 'ol' | 'al';
  questionText: Record<Language, string>;
  options: QuizOption[];
  correctOptionId: string;
  educationalFeedback: Record<Language, string>;
  syllabusReference: string;
  isDemonstrationSample: boolean; // Explicit label that this is sample demo content
}

export interface ChatMessage {
  id: string;
  role: 'student' | 'tutor' | 'system';
  content: string;
  timestamp: string;
  citations?: SourceCitation[];
  suggestedActions?: TutorAction[];
  tutorState?: TutorState;
  quizPrompt?: QuizQuestion;
  languageVersions?: {
    en?: string;
    si?: string;
    ta?: string;
  };
  activeLang?: Language;
  memoryTrick?: MemoryTrick;
  keyPoints?: string[];
  imageUrl?: string;
  visuals?: SourceVisual[];
  /** LIVE: the backend found no approved textbook evidence, so this answer is not textbook-grounded. */
  noTextbookEvidence?: boolean;
}

export interface Subject {
  id: string;
  code: string;
  name: Record<Language, string>;
  gradeLevel: string;
  iconName: string;
  color: string;
  accentColor: string;
  gradient: string;
  description: Record<Language, string>;
  topicsCount: number;
  masteryPercentage: number;
}

export interface Topic {
  id: string;
  subjectId: string;
  chapterNumber: number;
  title: Record<Language, string>;
  description: Record<Language, string>;
  grade: Grade;
  lessonsCount: number;
  completedPercentage: number;
}

export interface LessonStep {
  id: string;
  stepNumber: number;
  title: Record<Language, string>;
  concept: Record<Language, string>;
  visualCard?: {
    title: string;
    diagramType: 'diagram' | 'formula' | 'infographic';
    content: string;
    caption: string;
  };
  realWorldExample: Record<Language, string>;
  checkQuestion?: QuizQuestion;
}

export interface Badge {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  unlockedAt?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  grade: Grade;
  language: Language;
  streakDays: number;
  topicsMastered: number;
  questionsAnswered: number;
  accuracyPercent: number;
  badges: Badge[];
}
