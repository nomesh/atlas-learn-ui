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
}

// Exact wire answer structure from ATLAS backend
export interface RAGResponse {
  answer: string;
  sources: SourceCitation[];
  suggestedFollowUps?: string[] | TutorAction[];
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
