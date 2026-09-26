import { apiClient } from './client';
import type { Topic } from '../types';

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

export const FALLBACK_CURRICULUM_RESOURCES: CurriculumResourceItem[] = [
  {
    resourceId: 'b6a86c7d-fd7a-47a8-9d30-ec2dc5b40438',
    revisionId: 'b6a86c7d-fd7a-47a8-9d30-ec2dc5b40438',
    originalTitle: 'hisotry_gr_10EN.pdf (histoy G 10 E)',
    resourceType: 'SYLLABUS',
    grade: 10,
    subjectCode: 'HISTORY',
    subjectName: 'History',
    languageCode: 'EN',
    publisherAuthority: 'Educational Publications Department Sri Lanka',
    sourceReference: 'Ministry of Education National Curriculum',
    versionIdentifier: '1.0.0',
    ingestionStatus: 'INDEXED',
    checksumSha256: 'history-gr10-en-sha256',
    indexedChunks: 554,
  },
  {
    resourceId: '788cf34b-fc4b-47b7-a002-2a8792a356c0',
    revisionId: '788cf34b-fc4b-47b7-a002-2a8792a356c0',
    originalTitle: 'ICT_Gr8_EN.pdf (ICT Gr8 EN)',
    resourceType: 'SYLLABUS',
    grade: 8,
    subjectCode: 'ICT',
    subjectName: 'Ict',
    languageCode: 'EN',
    publisherAuthority: 'Educational Publications Department Sri Lanka',
    sourceReference: 'Ministry of Education National Curriculum',
    versionIdentifier: '1.0.0',
    ingestionStatus: 'INDEXED',
    checksumSha256: 'ict-gr8-en-sha256',
    indexedChunks: 210,
  },
  {
    resourceId: '1bb95df9-abc3-4e4a-a5fc-92eaf7a575ab',
    revisionId: '1bb95df9-abc3-4e4a-a5fc-92eaf7a575ab',
    originalTitle: 'science G 10 P I E 2 5',
    resourceType: 'SYLLABUS',
    grade: 10,
    subjectCode: 'SCIENCE',
    subjectName: 'Science',
    languageCode: 'EN',
    publisherAuthority: 'Educational Publications Department Sri Lanka',
    sourceReference: 'Ministry of Education National Curriculum',
    versionIdentifier: '1.0.0',
    ingestionStatus: 'INDEXED',
    checksumSha256: 'science-gr10-en-sha256',
    indexedChunks: 464,
  },
  {
    resourceId: '8148ac07-244c-41d5-82d4-64e9e449897a',
    revisionId: '8148ac07-244c-41d5-82d4-64e9e449897a',
    originalTitle: 'Mathematics Grade 6 Part II',
    resourceType: 'SYLLABUS',
    grade: 6,
    subjectCode: 'MATHEMATICS',
    subjectName: 'Mathematics',
    languageCode: 'EN',
    publisherAuthority: 'Educational Publications Department Sri Lanka',
    sourceReference: 'Ministry of Education National Curriculum',
    versionIdentifier: '1.0.0',
    ingestionStatus: 'INDEXED',
    checksumSha256: 'maths-gr6-en-sha256',
    indexedChunks: 366,
  },
  {
    resourceId: '3d5b7a12-8f3a-4b92-91f8-0c6a32d1e101',
    revisionId: '3d5b7a12-8f3a-4b92-91f8-0c6a32d1e101',
    originalTitle: 'Mathematics Grade 10 Part I',
    resourceType: 'TEXTBOOK',
    grade: 10,
    subjectCode: 'MATHEMATICS',
    subjectName: 'Mathematics',
    languageCode: 'EN',
    publisherAuthority: 'Educational Publications Department Sri Lanka',
    sourceReference: 'Ministry of Education National Curriculum',
    versionIdentifier: '1.0.0',
    ingestionStatus: 'INDEXED',
    checksumSha256: 'maths-gr10-p1-en-sha256',
    indexedChunks: 412,
  },
  {
    resourceId: '4e6c8b23-9a4b-4c03-a2f9-1d7b43e2f202',
    revisionId: '4e6c8b23-9a4b-4c03-a2f9-1d7b43e2f202',
    originalTitle: 'Mathematics Grade 10 Part II',
    resourceType: 'TEXTBOOK',
    grade: 10,
    subjectCode: 'MATHEMATICS',
    subjectName: 'Mathematics',
    languageCode: 'EN',
    publisherAuthority: 'Educational Publications Department Sri Lanka',
    sourceReference: 'Ministry of Education National Curriculum',
    versionIdentifier: '1.0.0',
    ingestionStatus: 'INDEXED',
    checksumSha256: 'maths-gr10-p2-en-sha256',
    indexedChunks: 388,
  },
];

export async function fetchCurriculumResources(): Promise<CurriculumResourceItem[]> {
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
