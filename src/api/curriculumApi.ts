import { apiClient } from './client';
import type { Topic } from '../types';
// Prototype resource list (MOCK only); production builds resolve this module to an empty stub.
import { FALLBACK_CURRICULUM_RESOURCES } from '../mocks/curriculumData';
import { tutorService } from './tutorApi';

export interface CurriculumResourceItem {
  resourceId: string;
  revisionId: string;
  originalTitle: string;
  resourceType: string;
  grade: number;
  subjectCode: string;
  subjectName: string;
  languageCode: string;
  publicationYear?: number;
  publisherAuthority: string;
  sourceReference: string;
  versionIdentifier: string;
  ingestionStatus: string;
  ingestedAt?: string;
  checksumSha256: string;
  indexedChunks: number;
}


export async function fetchCurriculumResources(): Promise<CurriculumResourceItem[]> {
  if (!tutorService.isMockMode()) {
    // LIVE: only resources the API actually reports; never the bundled fallback list.
    try {
      const { data } = await apiClient.get<CurriculumResourceItem[]>('/api/learn/resources');
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }
  try {
    let remote: CurriculumResourceItem[] = [];
    try {
      const { data } = await apiClient.get<CurriculumResourceItem[]>('/api/learn/resources');
      if (Array.isArray(data) && data.length > 0) remote = data;
    } catch {
      try {
        const { data } = await apiClient.get<CurriculumResourceItem[]>('/api/v1/learn/resources');
        if (Array.isArray(data) && data.length > 0) remote = data;
      } catch (inner) {
        // Fallback to local
      }
    }

    if (remote.length > 0) {
      // Merge remote resources with any missing fallback curriculum items (e.g. Grade 10 Mathematics)
      const existingKeys = new Set(
        remote.map((r) => `${(r.subjectCode || '').toUpperCase()}_${r.grade}_${(r.originalTitle || '').toLowerCase().trim()}`)
      );
      const missingFallbacks = FALLBACK_CURRICULUM_RESOURCES.filter(
        (f) => !existingKeys.has(`${(f.subjectCode || '').toUpperCase()}_${f.grade}_${(f.originalTitle || '').toLowerCase().trim()}`)
      );
      return [...remote, ...missingFallbacks];
    }
  } catch (err) {
    console.warn('[CurriculumApi] Could not fetch remote curriculum resources, using local fallback:', err);
  }
  return FALLBACK_CURRICULUM_RESOURCES;
}

export async function fetchCurriculumTopics(subjectId?: string, grade?: string): Promise<Topic[]> {
  try {
    const params = new URLSearchParams();
    if (subjectId) params.set('subjectId', subjectId);
    if (grade) params.set('grade', grade);
    const query = params.toString() ? `?${params.toString()}` : '';
    const { data } = await apiClient.get<Topic[]>(`/api/learn/curriculum${query}`);
    if (Array.isArray(data) && data.length > 0) return data;
  } catch (err) {
    try {
      const params = new URLSearchParams();
      if (subjectId) params.set('subjectId', subjectId);
      if (grade) params.set('grade', grade);
      const query = params.toString() ? `?${params.toString()}` : '';
      const { data } = await apiClient.get<Topic[]>(`/api/v1/learn/curriculum${query}`);
      if (Array.isArray(data) && data.length > 0) return data;
    } catch (innerErr) {
      console.warn('[CurriculumApi] Could not fetch remote curriculum topics:', innerErr);
    }
  }
  return [];
}
