import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const apiGet = vi.fn();
const apiPut = vi.fn();
const apiPost = vi.fn();
vi.mock('../api/client', () => ({
  apiClient: {
    get: (...a: unknown[]) => apiGet(...a),
    put: (...a: unknown[]) => apiPut(...a),
    post: (...a: unknown[]) => apiPost(...a),
    delete: vi.fn(),
  },
  getTutorLeaseToken: () => 'mock-token',
  setTutorLeaseToken: vi.fn(),
}));

vi.mock('../api/authApi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../api/authApi')>();
  return {
    ...actual,
    ensureTutorLease: vi.fn().mockResolvedValue({ status: 'ACTIVE', token: 'mock-token' }),
    acquireTutorLease: vi.fn().mockResolvedValue({ status: 'ACTIVE', token: 'mock-token' }),
    sendTutorHeartbeat: vi.fn().mockResolvedValue({ status: 'ACTIVE' }),
    releaseTutorLease: vi.fn().mockResolvedValue({ released: true }),
  };
});

import '../i18n';
import { tutorService } from '../api/tutorApi';
import { StudentProvider, useStudent } from '../state/studentContext';
import { LiveStudentHome } from '../features/home/LiveStudentHome';
import { LiveSubjectsView, LiveSubjectDetailView, LiveCompanionPane } from '../curriculum/LiveCurriculumViews';
import { TutorPage } from '../features/tutor/TutorPage';
import {
  getMediumUnavailableText,
  isSubjectMediumAvailable,
  isSubjectOtherMediumOnly,
  MEDIUM_UNAVAILABLE_TEXT,
  type CurriculumAvailability,
  type SubjectAvailability,
} from '../curriculum/liveCurriculum';
import type { Language } from '../types';

const TEST_AVAILABILITY: CurriculumAvailability = {
  grade: 'grade-10',
  subjects: [
    {
      subjectCode: 'SCIENCE',
      subjectName: 'Science',
      languages: ['en', 'si'],
      indexedResources: 2,
      topics: 0,
      tutorScopeVerified: true,
      tutorAvailable: true,
      topicsAvailable: false,
    },
    {
      subjectCode: 'HISTORY',
      subjectName: 'History',
      languages: ['si'],
      indexedResources: 1,
      topics: 0,
      tutorScopeVerified: true,
      tutorAvailable: true,
      topicsAvailable: false,
    },
    {
      subjectCode: 'BUDDHISM',
      subjectName: 'Buddhism',
      languages: ['si'],
      indexedResources: 1,
      topics: 3,
      tutorScopeVerified: true,
      tutorAvailable: true,
      topicsAvailable: true,
    },
    {
      subjectCode: 'ENGLISH_LIT',
      subjectName: 'English Literature',
      languages: ['en'],
      indexedResources: 1,
      topics: 0,
      tutorScopeVerified: true,
      tutorAvailable: true,
      topicsAvailable: false,
    },
    {
      subjectCode: 'GEOGRAPHY',
      subjectName: 'Geography',
      languages: ['si'],
      indexedResources: 1,
      topics: 0,
      tutorScopeVerified: false,
      tutorAvailable: false,
      topicsAvailable: false,
    },
    {
      subjectCode: 'MATHEMATICS',
      subjectName: 'Mathematics',
      languages: [],
      indexedResources: 0,
      topics: 0,
      tutorAvailable: false,
      topicsAvailable: false,
    },
  ],
};

function setupMockApi(availability: CurriculumAvailability = TEST_AVAILABILITY, preferredLanguage: Language = 'en') {
  const session = {
    authenticated: true,
    userId: 'u-test',
    email: null,
    displayName: 'Test Learner',
    accountId: 'a-test',
    studentId: 'ATL-26-001001',
    accountStatus: 'ACTIVE',
    registeredGrade: 'grade-10',
    accountType: 'INDEPENDENT_STUDENT',
    activeLearner: {
      id: 'p-test',
      displayName: 'Test Learner',
      grade: 'grade-10',
      curriculumCode: 'SL_NATIONAL',
      preferredLanguage,
      enrolledSubjects: [],
      isPrimary: true,
      status: 'ACTIVE',
    },
    learners: [],
  };

  const profile = {
    id: 'p-test',
    name: 'Test Learner',
    grade: 'grade-10',
    language: preferredLanguage,
    streakDays: 0,
    topicsMastered: 0,
    questionsAnswered: 0,
    accuracyPercent: 0,
    badges: [],
  };

  apiGet.mockImplementation((url: string, config?: { params?: Record<string, string> }) => {
    if (url === '/api/learn/auth/session') return Promise.resolve({ data: session });
    if (url === '/api/learn/profile') return Promise.resolve({ data: profile });
    if (url === '/api/learn/entitlements/allowed-grades') return Promise.resolve({ data: { allowedGrades: ['grade-10'] } });
    if (url === '/api/learn/curriculum/availability') return Promise.resolve({ data: availability });
    if (url === '/api/learn/curriculum') return Promise.resolve({ data: [] });
    if (url === '/api/learn/resources') return Promise.resolve({ data: [] });
    return Promise.reject(new Error(`unexpected GET ${url}`));
  });

  apiPut.mockImplementation((url: string, body: unknown) => {
    if (url === '/api/learn/profile') return Promise.resolve({ data: { ...profile, ...(body as object) } });
    return Promise.reject(new Error(`unexpected PUT ${url}`));
  });

  apiPost.mockImplementation((url: string) => {
    if (url === '/api/learn/tutor/chat') {
      return Promise.resolve({
        data: {
          answer: 'Test tutor answer grounded in textbook.',
          sources: [{ pageNumber: 42, citationText: 'Evidence text' }],
          suggestedFollowUps: [],
          metadata: { safeFailure: false, evidenceCount: 1 },
        },
      });
    }
    return Promise.reject(new Error(`unexpected POST ${url}`));
  });
}

function renderWithProviders(element: React.ReactElement, initialPath = '/') {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  });
  return render(
    <QueryClientProvider client={client}>
      <StudentProvider>
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route path="/" element={element} />
            <Route path="/subjects" element={element} />
            <Route path="/subjects/:subjectId" element={element} />
            <Route path="/tutor" element={element} />
          </Routes>
        </MemoryRouter>
      </StudentProvider>
    </QueryClientProvider>,
  );
}

describe('Medium-aware curriculum availability guard', () => {
  beforeEach(() => {
    tutorService.setMockMode(false);
    sessionStorage.clear();
    localStorage.clear();
    apiGet.mockReset();
    apiPut.mockReset();
    apiPost.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  describe('Pure availability helpers', () => {
    const sinhalaSub: SubjectAvailability = {
      subjectCode: 'HISTORY',
      subjectName: 'History',
      languages: ['si'],
      indexedResources: 1,
      topics: 0,
      tutorAvailable: true,
      topicsAvailable: false,
    };

    const multiSub: SubjectAvailability = {
      subjectCode: 'SCIENCE',
      subjectName: 'Science',
      languages: ['EN', 'SI'],
      indexedResources: 2,
      topics: 0,
      tutorAvailable: true,
      topicsAvailable: false,
    };

    const unverifiedSub: SubjectAvailability = {
      subjectCode: 'GEOGRAPHY',
      subjectName: 'Geography',
      languages: ['si'],
      indexedResources: 1,
      topics: 0,
      tutorAvailable: false,
      topicsAvailable: false,
    };

    it('isSubjectMediumAvailable returns true when tutorAvailable=true and medium exists (case-insensitive)', () => {
      expect(isSubjectMediumAvailable(sinhalaSub, 'si')).toBe(true);
      expect(isSubjectMediumAvailable(sinhalaSub, 'SI')).toBe(true);
      expect(isSubjectMediumAvailable(multiSub, 'en')).toBe(true);
      expect(isSubjectMediumAvailable(multiSub, 'si')).toBe(true);
    });

    it('isSubjectMediumAvailable returns false when medium is missing, mismatched, or tutorAvailable is false', () => {
      expect(isSubjectMediumAvailable(sinhalaSub, 'en')).toBe(false);
      expect(isSubjectMediumAvailable(sinhalaSub, 'ta')).toBe(false);
      expect(isSubjectMediumAvailable(sinhalaSub, null)).toBe(false);
      expect(isSubjectMediumAvailable(undefined, 'si')).toBe(false);
      expect(isSubjectMediumAvailable(unverifiedSub, 'si')).toBe(false);
    });

    it('isSubjectOtherMediumOnly returns true only when content exists in other medium', () => {
      expect(isSubjectOtherMediumOnly(sinhalaSub, 'en')).toBe(true);
      expect(isSubjectOtherMediumOnly(sinhalaSub, 'ta')).toBe(true);
      expect(isSubjectOtherMediumOnly(sinhalaSub, 'si')).toBe(false);
      expect(isSubjectOtherMediumOnly(multiSub, 'en')).toBe(false);
      expect(isSubjectOtherMediumOnly(multiSub, 'si')).toBe(false);
      // Unverified subject is not available in ANY medium
      expect(isSubjectOtherMediumOnly(unverifiedSub, 'en')).toBe(false);
      expect(isSubjectOtherMediumOnly(unverifiedSub, 'si')).toBe(false);
    });

    it('provides localized labels and fallbacks for Sinhala, English, and Tamil', () => {
      expect(getMediumUnavailableText('en')).toBe('Not available in your selected medium');
      expect(getMediumUnavailableText('si')).toBe('ඔබ තෝරාගත් මාධ්‍යයෙන් ලබා ගත නොහැක');
      expect(getMediumUnavailableText('ta')).toBe('நீங்கள் தேர்ந்தெடுத்த மொழியில் கிடைக்கவில்லை');
      expect(getMediumUnavailableText('invalid-code')).toBe('Not available in your selected medium');
      expect(getMediumUnavailableText(null)).toBe('Not available in your selected medium');
    });
  });

  describe('Sinhala learner + Sinhala subject: available', () => {
    beforeEach(() => {
      setupMockApi(TEST_AVAILABILITY, 'si');
    });

    it('History is available for Sinhala learner: chip rendered on Home, Tutor can open', async () => {
      renderWithProviders(<LiveStudentHome />, '/');
      await screen.findByTestId('live-home');

      // History chip should be visible and clickable
      const historyChip = await screen.findByTestId('live-home-subject-HISTORY');
      expect(historyChip).toBeTruthy();
      expect(historyChip.textContent).toContain('History');
    });

    it('History card on Subjects page offers active Ask Tutor action', async () => {
      renderWithProviders(<LiveSubjectsView />, '/subjects');
      await screen.findByTestId('live-subjects');

      const questionsAction = await screen.findByTestId('subject-textbook-questions-HISTORY');
      expect(questionsAction).toBeTruthy();
      expect(questionsAction.querySelector('button')).not.toBeNull();
    });

    it('Tutor opens with input enabled for Sinhala learner on History', async () => {
      renderWithProviders(<TutorPage />, '/tutor?subject=history');
      await screen.findByRole('textbox');
      await screen.findByTestId('live-companion');

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.disabled).toBe(false);
      expect(screen.queryByTestId('tutor-subject-unavailable')).toBeNull();
    });
  });

  describe('English learner + Sinhala-only subject: unavailable and Tutor cannot open', () => {
    beforeEach(() => {
      setupMockApi(TEST_AVAILABILITY, 'en');
    });

    it('History chip is NOT rendered on Home for English learner', async () => {
      renderWithProviders(<LiveStudentHome />, '/');
      await screen.findByTestId('live-home');

      // Science and English Lit chips appear; History chip does NOT
      await screen.findByTestId('live-home-subject-SCIENCE');
      await screen.findByTestId('live-home-subject-ENGLISH_LIT');
      expect(screen.queryByTestId('live-home-subject-HISTORY')).toBeNull();
    });

    it('History card on Subjects page stays visible but disabled with localized notice', async () => {
      renderWithProviders(<LiveSubjectsView />, '/subjects');
      await screen.findByTestId('live-subjects');

      const historyCard = await screen.findByTestId('subject-unavailable-HISTORY');
      expect(historyCard.getAttribute('aria-disabled')).toBe('true');
      expect(historyCard.textContent).toContain('Not available in your selected medium');
      expect(historyCard.textContent).toContain('Available in: SI');
      // No textbook questions button
      expect(screen.queryByTestId('subject-textbook-questions-HISTORY')).toBeNull();
    });

    it('Subject detail view shows CurriculumUnavailable with medium message and no Tutor action', async () => {
      renderWithProviders(<LiveSubjectDetailView />, '/subjects/history');
      const unavailable = await screen.findByTestId('curriculum-unavailable');
      expect(unavailable.textContent).toContain('Not available in your selected medium');
      expect(screen.queryByTestId('subject-textbook-questions-HISTORY')).toBeNull();
    });

    it('Tutor input is disabled and banner is shown on /tutor?subject=history', async () => {
      renderWithProviders(<TutorPage />, '/tutor?subject=history');
      await screen.findByRole('textbox');
      await screen.findByTestId('live-companion');

      // Unavailable banner is shown
      const banner = await screen.findByTestId('tutor-subject-unavailable');
      expect(banner.textContent).toContain('Not available in your selected medium');
      expect(banner.textContent).toContain('History');

      // Input textarea and send button are disabled
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.disabled).toBe(true);
      expect(textarea.placeholder).toContain('Not available in your selected medium');

      // Live companion pane indicates medium unavailable
      const companionNotice = await screen.findByTestId('companion-medium-notice');
      expect(companionNotice.textContent).toBe('Not available in your selected medium');
    });
  });

  describe('English learner + English subject: available', () => {
    beforeEach(() => {
      setupMockApi(TEST_AVAILABILITY, 'en');
    });

    it('English Literature is available for English learner', async () => {
      renderWithProviders(<LiveStudentHome />, '/');
      await screen.findByTestId('live-home');

      const chip = await screen.findByTestId('live-home-subject-ENGLISH_LIT');
      expect(chip).toBeTruthy();
    });

    it('Tutor opens with input enabled for English Lit', async () => {
      renderWithProviders(<TutorPage />, '/tutor?subject=english_lit');
      await screen.findByRole('textbox');
      await screen.findByTestId('live-companion');

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.disabled).toBe(false);
      expect(screen.queryByTestId('tutor-subject-unavailable')).toBeNull();
    });
  });

  describe('Matching medium with tutorAvailable=false: unavailable', () => {
    beforeEach(() => {
      setupMockApi(TEST_AVAILABILITY, 'si');
    });

    it('Geography is unavailable even though language matches, showing generic unavailable text', async () => {
      renderWithProviders(<LiveSubjectsView />, '/subjects');
      await screen.findByTestId('live-subjects');

      const geoCard = await screen.findByTestId('subject-unavailable-GEOGRAPHY');
      expect(geoCard.getAttribute('aria-disabled')).toBe('true');
      // Must NOT claim "Not available in your selected medium" because it is unverified in all mediums
      expect(geoCard.textContent).toContain(MEDIUM_UNAVAILABLE_TEXT.si === 'ඔබ තෝරාගත් මාධ්‍යයෙන් ලබා ගත නොහැක' ? 'විෂය නිර්දේශ අන්තර්ගතය තවමත් ලබා ගත නොහැක' : 'Curriculum content is not yet available');
      expect(geoCard.textContent).not.toContain('Not available in your selected medium');
      expect(geoCard.textContent).not.toContain('ඔබ තෝරාගත් මාධ්‍යයෙන් ලබා ගත නොහැක');
    });
  });

  describe('Home counts use effective availability', () => {
    it('accurately partitions subjects based on effective medium availability for Sinhala learner', async () => {
      setupMockApi(TEST_AVAILABILITY, 'si');
      renderWithProviders(<LiveStudentHome />, '/');
      await screen.findByTestId('live-home');

      // With topics: BUDDHISM (1)
      const withTopics = screen.getByTestId('summary-with-topics');
      expect(withTopics.textContent).toContain('1');

      // Textbook only: SCIENCE, HISTORY (2)
      const textbookOnly = screen.getByTestId('summary-textbook-only');
      expect(textbookOnly.textContent).toContain('2');

      // Not yet: ENGLISH_LIT (en only), GEOGRAPHY (unverified), MATHEMATICS (no resources) (3)
      const notYet = screen.getByTestId('summary-not-yet');
      expect(notYet.textContent).toContain('3');
    });

    it('accurately partitions subjects based on effective medium availability for English learner', async () => {
      setupMockApi(TEST_AVAILABILITY, 'en');
      renderWithProviders(<LiveStudentHome />, '/');
      await screen.findByTestId('live-home');

      // With topics: BUDDHISM is si-only, so 0 with topics in English
      const withTopics = screen.getByTestId('summary-with-topics');
      expect(withTopics.textContent).toContain('0');

      // Textbook only: SCIENCE, ENGLISH_LIT (2)
      const textbookOnly = screen.getByTestId('summary-textbook-only');
      expect(textbookOnly.textContent).toContain('2');

      // Not yet: HISTORY (si only), BUDDHISM (si only), GEOGRAPHY (unverified), MATHEMATICS (no resources) (4)
      const notYet = screen.getByTestId('summary-not-yet');
      expect(notYet.textContent).toContain('4');
    });

    it('accurately partitions subjects for Tamil learner (0 available)', async () => {
      setupMockApi(TEST_AVAILABILITY, 'ta');
      renderWithProviders(<LiveStudentHome />, '/');
      await screen.findByTestId('live-home');

      const withTopics = screen.getByTestId('summary-with-topics');
      expect(withTopics.textContent).toContain('0');

      const textbookOnly = screen.getByTestId('summary-textbook-only');
      expect(textbookOnly.textContent).toContain('0');

      // All 6 are not yet available in Tamil
      const notYet = screen.getByTestId('summary-not-yet');
      expect(notYet.textContent).toContain('6');
    });
  });

  describe('Changing learner medium immediately recalculates availability', () => {
    const LanguageSwitcher: React.FC = () => {
      const { language, setLanguage } = useStudent();
      return (
        <div>
          <button type="button" data-testid="switch-en" onClick={() => setLanguage('en')}>
            EN
          </button>
          <button type="button" data-testid="switch-si" onClick={() => setLanguage('si')}>
            SI
          </button>
          <button type="button" data-testid="switch-ta" onClick={() => setLanguage('ta')}>
            TA
          </button>
          <span data-testid="current-lang">{language}</span>
          <LiveStudentHome />
        </div>
      );
    };

    it('recalculates metrics and chips immediately when medium is switched', async () => {
      setupMockApi(TEST_AVAILABILITY, 'si');
      renderWithProviders(<LanguageSwitcher />, '/');
      await screen.findByTestId('live-home');

      // Initially Sinhala:
      expect(screen.getByTestId('summary-textbook-only').textContent).toContain('2');
      expect(screen.getByTestId('summary-not-yet').textContent).toContain('3');
      expect(screen.getByTestId('live-home-subject-HISTORY')).toBeTruthy();
      expect(screen.queryByTestId('live-home-subject-ENGLISH_LIT')).toBeNull();

      // Switch to English:
      await act(async () => {
        fireEvent.click(screen.getByTestId('switch-en'));
      });

      // Immediately recalculated without full page reload:
      await waitFor(() => {
        expect(screen.getByTestId('summary-textbook-only').textContent).toContain('2');
        expect(screen.getByTestId('summary-not-yet').textContent).toContain('4');
      });
      // History disappears from chips, English Lit appears
      expect(screen.queryByTestId('live-home-subject-HISTORY')).toBeNull();
      expect(screen.getByTestId('live-home-subject-ENGLISH_LIT')).toBeTruthy();

      // Switch to Tamil:
      await act(async () => {
        fireEvent.click(screen.getByTestId('switch-ta'));
      });

      await waitFor(() => {
        expect(screen.getByTestId('summary-with-topics').textContent).toContain('0');
        expect(screen.getByTestId('summary-textbook-only').textContent).toContain('0');
        expect(screen.getByTestId('summary-not-yet').textContent).toContain('6');
      });
      expect(screen.queryByTestId('live-home-subject-SCIENCE')).toBeNull();
      expect(screen.queryByTestId('live-home-subject-HISTORY')).toBeNull();
      expect(screen.queryByTestId('live-home-subject-ENGLISH_LIT')).toBeNull();
    });
  });
});
