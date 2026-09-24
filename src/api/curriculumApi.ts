import { apiClient } from './client';

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
];

export async function fetchCurriculumResources(): Promise<CurriculumResourceItem[]> {
  try {
    const { data } = await apiClient.get<CurriculumResourceItem[]>('/api/learn/resources');
    if (Array.isArray(data) && data.length > 0) return data;
  } catch (err) {
    try {
      const { data } = await apiClient.get<CurriculumResourceItem[]>('/api/v1/learn/resources');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch (innerErr) {
      console.warn('[CurriculumApi] Could not fetch remote curriculum resources, using local fallback:', innerErr);
    }
  }
  return FALLBACK_CURRICULUM_RESOURCES;
}
