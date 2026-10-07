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
import type { Topic } from '../types';

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
  /** An approved, indexed textbook exists: Tutor answers can be grounded in retrieved evidence. */
  tutorAvailable: boolean;
  /** Verified chapter/topic records exist. */
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

export async function fetchCurriculumAvailability(grade: string): Promise<CurriculumAvailability> {
  const { data } = await apiClient.get<CurriculumAvailability>('/api/learn/curriculum/availability', { params: { grade } });
  return {
    grade: typeof data?.grade === 'string' ? data.grade : grade,
    subjects: Array.isArray(data?.subjects) ? data.subjects : [],
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
