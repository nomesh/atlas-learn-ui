/*
 * Production replacement for ./mockTutorAdapter (see vite.config.ts). The real application is always LIVE
 * (tutorMode.ts), so the scripted offline Tutor is never shipped; constructing it is a programming error.
 */
import type { LearningContext, RAGResponse } from '../types';
import type { TutorAdapter, TutorClearOptions } from './tutorApi';

export class MockTutorAdapter implements TutorAdapter {
  constructor() {
    throw new Error('The offline MOCK Tutor is not part of the production ATLAS Learn application.');
  }

  async ask(_question: string, _context: LearningContext): Promise<RAGResponse> {
    throw new Error('The offline MOCK Tutor is not part of the production ATLAS Learn application.');
  }

  async clearConversation(_conversationId: string, _options?: TutorClearOptions): Promise<void> {
    /* not reachable */
  }
}
