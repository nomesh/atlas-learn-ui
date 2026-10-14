/**
 * LIVE curriculum source of truth for the real application.
 *
 * In LIVE mode every subject, topic and availability fact shown to a learner comes from the ATLAS API. Nothing is
 * filled in from the bundled prototype catalogue: empty API data stays empty and is shown as an honest
 * "not yet available" state. MOCK mode (GitHub Pages demo, explicit local mock development) keeps using the bundled
 * catalogue. The mode is the Tutor mode, which is fixed at build time in production builds: URL parameters, browser
 * storage and environment overrides cannot switch a production build to MOCK (see api/tutorMode.ts).
 */
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { tutorService } from '../api/tutorApi';
import type { Language, Topic } from '../types';

export const MEDIUM_UNAVAILABLE_TEXT: Record<Language, string> = {
  en: 'Not available in your selected medium',
  si: 'ඔබ තෝරාගත් මාධ්‍යයෙන් ලබා ගත නොහැක',
  ta: 'நீங்கள் தேர்ந்தெடுத்த மொழியில் கிடைக்கவில்லை',
};

/** True only where bundled MOCK curriculum is intentional (Pages demo build or explicit dev mock mode). */
export function isMockCurriculum(): boolean {
  return tutorService.isMockMode();
}

export interface SubjectAvailability {
  subjectCode: string;
  subjectName: string;
  languages: string[];
  indexedResources: number;
  topics: number;
  /** An operator verified this grade/subject for textbook-grounded Tutor answers. */
  tutorScopeVerified?: boolean;
  /**
   * Textbook questions only: an indexed textbook in a verified scope. Every answer is grounded in retrieved evidence
   * or refused. This alone never makes the subject's curriculum available.
   */
  tutorAvailable: boolean;
  /** Approved persisted chapter/topic records exist: the only basis for Teach Me, Practice, Progress, topics. */
  topicsAvailable: boolean;
}

export interface CurriculumAvailability {
  grade: string;
  subjects: SubjectAvailability[];
}

/** Legacy subject ids used by older links and the MOCK catalogue, mapped to catalogue codes. */
const SUBJECT_ALIASES: Readonly<Record<string, string>> = {
  maths: 'MATHEMATICS',
  math: 'MATHEMATICS',
};

export function toSubjectCode(subjectId?: string | null): string {
  const clean = (subjectId || '').trim();
  return SUBJECT_ALIASES[clean.toLowerCase()] ?? clean.toUpperCase();
}

export function findSubjectAvailability(
  availability: CurriculumAvailability | undefined,
  subjectId?: string | null,
): SubjectAvailability | undefined {
  if (!availability || !subjectId) return undefined;
  const code = toSubjectCode(subjectId);
  return availability.subjects.find((s) => s.subjectCode.toUpperCase() === code);
}

/** Returns true if the learner's selected medium exists in subject.languages (case-insensitive). */
export function hasLearnerMedium(
  subject: SubjectAvailability | undefined | null,
  medium: Language | string | undefined | null,
): boolean {
  if (!subject || !medium) return false;
  const target = medium.trim().toLowerCase();
  return (subject.languages || []).some((l) => l.trim().toLowerCase() === target);
}

/** Subject is available for textbook questions with the AI Tutor in the learner's medium. */
export function canAskTutor(
  subject: SubjectAvailability | undefined | null,
  medium: Language | string | undefined | null,
): boolean {
  if (!subject || !subject.tutorAvailable) return false;
  return hasLearnerMedium(subject, medium);
}

/** Subject has approved structured lessons and topics in the learner's medium. */
export function canOpenLessons(
  subject: SubjectAvailability | undefined | null,
  medium: Language | string | undefined | null,
): boolean {
  if (!subject || !subject.topicsAvailable) return false;
  return hasLearnerMedium(subject, medium);
}

/**
 * Returns true if content exists only in another medium (i.e. tutorAvailable is true
 * or topicsAvailable is true, has languages, but the learner's medium is not among them).
 */
export function isSubjectOtherMediumOnly(
  subject: SubjectAvailability | undefined | null,
  medium: Language | string | undefined | null,
): boolean {
  if (!subject || !medium) return false;
  if (hasLearnerMedium(subject, medium)) return false;
  const hasContent = Boolean(subject.tutorAvailable || subject.topicsAvailable);
  return hasContent && (subject.languages || []).length > 0;
}

/** One subject entry as the API reports it; anything else is not shown (booleans default to "not available"). */
function toSubjectAvailability(raw: unknown): SubjectAvailability | null {
  if (!raw || typeof raw !== 'object') return null;
  const s = raw as Record<string, unknown>;
  if (typeof s.subjectCode !== 'string' || !s.subjectCode.trim() || typeof s.subjectName !== 'string') return null;
  return {
    subjectCode: s.subjectCode,
    subjectName: s.subjectName,
    languages: Array.isArray(s.languages)
      ? s.languages.filter((l): l is string => typeof l === 'string' && l.trim().length > 0).map((l) => l.trim().toLowerCase())
      : [],
    indexedResources: typeof s.indexedResources === 'number' ? s.indexedResources : 0,
    topics: typeof s.topics === 'number' ? s.topics : 0,
    tutorScopeVerified: s.tutorScopeVerified === true,
    tutorAvailable: s.tutorAvailable === true,
    topicsAvailable: s.topicsAvailable === true,
  };
}

export async function fetchCurriculumAvailability(grade: string): Promise<CurriculumAvailability> {
  const { data } = await apiClient.get<CurriculumAvailability>('/api/learn/curriculum/availability', { params: { grade } });
  // A malformed answer is an error the views show as such, never an empty (or partially fabricated) catalogue.
  if (!data || typeof data !== 'object' || !Array.isArray(data.subjects)) {
    throw new Error('Malformed curriculum availability response');
  }
  return {
    grade: typeof data.grade === 'string' ? data.grade : grade,
    subjects: data.subjects.map(toSubjectAvailability).filter((s): s is SubjectAvailability => s !== null),
  };
}

/** Verified topics for a subject and grade, exactly as returned by the API (no local fallback). */
export async function fetchLiveTopics(subjectId: string, grade: string): Promise<Topic[]> {
  const { data } = await apiClient.get<Topic[]>('/api/learn/curriculum', {
    params: { subjectId: toSubjectCode(subjectId), grade },
  });
  return Array.isArray(data) ? data : [];
}

export function useCurriculumAvailability(grade: string) {
  return useQuery({
    queryKey: ['learn', 'curriculum-availability', grade],
    queryFn: () => fetchCurriculumAvailability(grade),
    enabled: !isMockCurriculum() && Boolean(grade),
    staleTime: 5 * 60_000,
    retry: 1,
  });
}

export function useLiveTopics(subjectId: string | undefined, grade: string) {
  return useQuery({
    queryKey: ['learn', 'curriculum-topics', toSubjectCode(subjectId), grade],
    queryFn: () => fetchLiveTopics(subjectId as string, grade),
    enabled: !isMockCurriculum() && Boolean(subjectId) && Boolean(grade),
    staleTime: 5 * 60_000,
    retry: 1,
  });
}

/** A topic id is usable in LIVE only if the API returned it for this subject and grade. */
export function findVerifiedTopic(topics: Topic[] | undefined, topicId?: string | null): Topic | undefined {
  if (!topics || !topicId) return undefined;
  const wanted = topicId.trim().toLowerCase();
  return topics.find((t) => t.id.toLowerCase() === wanted);
}
