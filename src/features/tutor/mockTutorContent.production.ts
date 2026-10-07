// Production replacement for mockTutorContent.ts (aliased in vite.config.ts for real production builds).
// LIVE never calls these; they exist so the production bundle carries no prototype curriculum.
import type { ChatMessage, Language, TutorAction } from '../../types';
import { buildLiveGreeting, getLiveStarterPills } from './liveTutorContent';

export const detectCurriculumContextFromMessage = (
  _message: string,
  _currentSubject?: string
): { subjectId: string; topicId: string } | null => null;

export function getCurriculumStarterPills(_subjectId?: string, _topicId?: string, language: Language = 'en'): TutorAction[] {
  return getLiveStarterPills(language);
}

export function buildInitialGreeting(
  subjectId: string,
  topicId: string,
  language: Language,
  studentName: string,
  grade: string
): ChatMessage {
  return buildLiveGreeting(subjectId, topicId, language, studentName, grade);
}

export function mockDefaultTopicForSubject(_sub?: string): string | undefined {
  return undefined;
}

export function isMockNoticeMessage(_content: string): boolean {
  return false;
}
