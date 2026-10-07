/*
 * Production replacement for ./curriculumData (see vite.config.ts).
 *
 * The real application (learn.neuralworks.lk) must never show bundled prototype curriculum: subjects, chapters,
 * topics, mastery values, page ranges, lesson steps, practice items or simulations. Real production builds resolve
 * every import of mocks/curriculumData to this module instead, so none of that content is even emitted into the
 * bundle. Live pages read curriculum only from the ATLAS API. The GitHub Pages demo (VITE_DEPLOYMENT_TARGET=pages-demo),
 * the dev server and the tests keep the real mock module.
 */
import type { LessonStep, QuizQuestion, Subject, Topic } from '../types';
import type { CurriculumResourceItem } from '../api/curriculumApi';

export const MOCK_SUBJECTS: Subject[] = [];
export const MOCK_TOPICS: Topic[] = [];
export const MOCK_PRACTICE_QUESTIONS: QuizQuestion[] = [];
export const LESSON_STEPS_BY_TOPIC: Record<string, LessonStep[]> = {};
export const FALLBACK_CURRICULUM_RESOURCES: CurriculumResourceItem[] = [];
export const TOPIC_ID_ALIASES: Readonly<Record<string, string>> = {};

export const TEACH_ME_PHOTOSYNTHESIS_STEPS: LessonStep[] = [];
export const TEACH_ME_NUMBER_SYSTEMS_STEPS: LessonStep[] = [];
export const TEACH_ME_CONFIGURING_COMPUTER_STEPS: LessonStep[] = [];
export const TEACH_ME_WORD_PROCESSING_STEPS: LessonStep[] = [];
export const TEACH_ME_PROGRAMMING_STEPS: LessonStep[] = [];
export const TEACH_ME_PHYSICAL_COMPUTING_STEPS: LessonStep[] = [];
export const TEACH_ME_INTERNET_STEPS: LessonStep[] = [];
export const TEACH_ME_HARDWARE_STEPS: LessonStep[] = [];
export const TEACH_ME_HISTORY_HERITAGE_STEPS: LessonStep[] = [];
export const TEACH_ME_HISTORY_POLONNARUWA_STEPS: LessonStep[] = [];
export const TEACH_ME_HISTORY_COLONIAL_STEPS: LessonStep[] = [];
export const TEACH_ME_HYDRAULICS_STEPS: LessonStep[] = [];
export const TEACH_ME_ALGORITHMS_STEPS: LessonStep[] = [];
export const TEACH_ME_PYTHAGORAS_STEPS: LessonStep[] = [];
export const TEACH_ME_RATE_OF_REACTIONS_STEPS: LessonStep[] = [];
export const TEACH_ME_CHEMICAL_BASIS_STEPS: LessonStep[] = [];
export const TEACH_ME_NEWTONS_LAWS_STEPS: LessonStep[] = [];
export const TEACH_ME_MOTION_STEPS: LessonStep[] = [];
export const TEACH_ME_CELLS_STEPS: LessonStep[] = [];
export const TEACH_ME_HYDROSTATIC_PRESSURE_STEPS: LessonStep[] = [];
export const TEACH_ME_ELECTRICITY_STEPS: LessonStep[] = [];

export function generateUniversalLessonSteps(_topic: Topic): LessonStep[] {
  return [];
}

export function canonicalTopicId(id?: string | null): string {
  return (id || '').toLowerCase().trim();
}

export function findTopicResilient(
  _list: Topic[],
  _id?: string | null,
  _preferredSubjectId?: string | null,
  _preferredGrade?: string | null
): Topic | undefined {
  return undefined;
}

export function getLessonStepsForTopic(
  _topicId?: string,
  _preferredSubjectId?: string,
  _preferredGrade?: string
): LessonStep[] {
  return [];
}
