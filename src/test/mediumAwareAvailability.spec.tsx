import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Polyfill scrollTo in JSDOM so chat container scrolling doesn't throw
if (typeof Element !== 'undefined' && !Element.prototype.scrollTo) {
  Element.prototype.scrollTo = vi.fn();
}

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
    ensureTutorLease: vi.fn().mockResolvedValue({ status: 'GRANTED', leaseToken: 'mock-token' }),
    acquireTutorLease: vi.fn().mockResolvedValue({ status: 'GRANTED', leaseToken: 'mock-token' }),
    sendTutorHeartbeat: vi.fn().mockResolvedValue({ status: 'ACTIVE' }),
    releaseTutorLease: vi.fn().mockResolvedValue({ released: true }),
  };
});

import '../i18n';
import { tutorService } from '../api/tutorApi';
import { StudentProvider, useStudent } from '../state/studentContext';
import { LiveStudentHome, resolveSubjectOpenAction } from '../features/home/LiveStudentHome';
import { LiveSubjectsView, LiveSubjectDetailView, LiveCompanionPane } from '../curriculum/LiveCurriculumViews';
import { TutorPage } from '../features/tutor/TutorPage';
import {
  canAskTutor,
  canOpenLessons,
  hasLearnerMedium,
  getMediumUnavailableText,
  isSubjectOtherMediumOnly,
  MEDIUM_UNAVAILABLE_TEXT,
  type CurriculumAvailability,
  type SubjectAvailability,
} from '../curriculum/liveCurriculum';
import {
  CURRICULUM_UNAVAILABLE_TEXT,
  CURRICULUM_LOADING_TEXT,
  CURRICULUM_LOAD_ERROR_TEXT,
} from '../curriculum/CurriculumUnavailable';
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
      subjectCode: 'CIVICS',
      subjectName: 'Civics',
      languages: ['si'],
      indexedResources: 1,
      topics: 2,
      tutorScopeVerified: false,
      tutorAvailable: false,
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

  apiGet.mockImplementation((url: string) => {
    if (url === '/api/learn/auth/session') return Promise.resolve({ data: session });
    if (url === '/api/learn/profile') return Promise.resolve({ data: profile });
    if (url === '/api/learn/entitlements/allowed-grades') return Promise.resolve({ data: { allowedGrades: ['grade-10'] } });
    if (url === '/api/learn/curriculum/availability') return Promise.resolve({ data: availability });
    if (url === '/api/learn/curriculum') {
      return Promise.resolve({
        data: [
          {
            id: 'top-1',
            chapterNumber: '1',
            title: { en: 'Chapter One', si: 'පළමු පරිච්ඡේදය', ta: 'அத்தியாயம் ஒன்று' },
          },
        ],
      });
    }
    if (url === '/api/learn/resources') return Promise.resolve({ data: [] });
    return Promise.reject(new Error(`unexpected GET ${url}`));
  });

  apiPut.mockImplementation((url: string, body: unknown) => {
    if (url === '/api/learn/profile') return Promise.resolve({ data: { ...profile, ...(body as object) } });
    return Promise.reject(new Error(`unexpected PUT ${url}`));
  });

  apiPost.mockImplementation((url: string) => {
    if (url === '/api/learn/tutor' || url === '/api/learn/tutor/chat') {
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

    const topicsNoTutorSub: SubjectAvailability = {
      subjectCode: 'CIVICS',
      subjectName: 'Civics',
      languages: ['si'],
      indexedResources: 1,
      topics: 2,
      tutorAvailable: false,
      topicsAvailable: true,
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

    it('hasLearnerMedium checks language membership case-insensitively', () => {
      expect(hasLearnerMedium(sinhalaSub, 'si')).toBe(true);
      expect(hasLearnerMedium(sinhalaSub, 'SI')).toBe(true);
      expect(hasLearnerMedium(sinhalaSub, 'en')).toBe(false);
      expect(hasLearnerMedium(multiSub, 'en')).toBe(true);
      expect(hasLearnerMedium(multiSub, 'si')).toBe(true);
      expect(hasLearnerMedium(multiSub, 'ta')).toBe(false);
      expect(hasLearnerMedium(null, 'si')).toBe(false);
      expect(hasLearnerMedium(sinhalaSub, null)).toBe(false);
    });

    it('canAskTutor requires both tutorAvailable=true and matching learner medium', () => {
      expect(canAskTutor(sinhalaSub, 'si')).toBe(true);
      expect(canAskTutor(sinhalaSub, 'en')).toBe(false);
      expect(canAskTutor(topicsNoTutorSub, 'si')).toBe(false);
      expect(canAskTutor(unverifiedSub, 'si')).toBe(false);
      expect(canAskTutor(null, 'si')).toBe(false);
    });

    it('canOpenLessons requires both topicsAvailable=true and matching learner medium', () => {
      expect(canOpenLessons(topicsNoTutorSub, 'si')).toBe(true);
      expect(canOpenLessons(topicsNoTutorSub, 'en')).toBe(false);
      expect(canOpenLessons(sinhalaSub, 'si')).toBe(false);
      expect(canOpenLessons(unverifiedSub, 'si')).toBe(false);
      expect(canOpenLessons(null, 'si')).toBe(false);
    });

    it('isSubjectOtherMediumOnly returns true only when content exists strictly in other medium', () => {
      expect(isSubjectOtherMediumOnly(sinhalaSub, 'en')).toBe(true);
      expect(isSubjectOtherMediumOnly(sinhalaSub, 'ta')).toBe(true);
      expect(isSubjectOtherMediumOnly(sinhalaSub, 'si')).toBe(false);
      expect(isSubjectOtherMediumOnly(multiSub, 'en')).toBe(false);
      expect(isSubjectOtherMediumOnly(multiSub, 'si')).toBe(false);
      // Civics has topics in SI, so for EN learner it is otherMediumOnly
      expect(isSubjectOtherMediumOnly(topicsNoTutorSub, 'en')).toBe(true);
      // Unverified subject has neither tutor nor topics available
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

      await screen.findByTestId('live-home-subject-SCIENCE');
      await screen.findByTestId('live-home-subject-ENGLISH_LIT');
      expect(screen.queryByTestId('live-home-subject-HISTORY')).toBeNull();
    });

    it('History card on Subjects page stays visible but disabled with localized notice and role status', async () => {
      renderWithProviders(<LiveSubjectsView />, '/subjects');
      await screen.findByTestId('live-subjects');

      const historyCard = await screen.findByTestId('subject-unavailable-HISTORY');
      expect(historyCard.getAttribute('aria-disabled')).toBe('true');
      expect(historyCard.textContent).toContain('Not available in your selected medium');
      expect(historyCard.textContent).toContain('Available in: SI');
      const notice = historyCard.querySelector('[role="status"]');
      expect(notice).not.toBeNull();
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

      const banner = await screen.findByTestId('tutor-subject-unavailable');
      expect(banner.textContent).toContain('Not available in your selected medium');
      expect(banner.textContent).toContain('History');
      expect(banner.getAttribute('role')).toBe('status');

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.disabled).toBe(true);
      expect(textarea.placeholder).toContain('Not available in your selected medium');

      const companionNotice = await screen.findByTestId('companion-medium-notice');
      expect(companionNotice.textContent).toBe('Not available in your selected medium');
      expect(companionNotice.getAttribute('role')).toBe('status');
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

  describe('Published topics + matching medium + Tutor disabled (Decoupled Lessons vs Tutor)', () => {
    beforeEach(() => {
      setupMockApi(TEST_AVAILABILITY, 'si');
    });

    it('Civics (topicsAvailable=true, tutorAvailable=false) has lessons visible on Home and Subjects, but Tutor is disabled', async () => {
      // 1. Home metrics and chip: Civics is in withTopics partition
      renderWithProviders(<LiveStudentHome />, '/');
      await screen.findByTestId('live-home');

      const civicsChip = await screen.findByTestId('live-home-subject-CIVICS');
      expect(civicsChip).toBeTruthy();

      // 2. Subjects catalogue: rendered as available lessons card, but does NOT offer Ask Tutor
      cleanup();
      renderWithProviders(<LiveSubjectsView />, '/subjects');
      await screen.findByTestId('live-subjects');

      const civicsCard = await screen.findByTestId('subject-available-CIVICS');
      expect(civicsCard).toBeTruthy();
      expect(screen.queryByTestId('subject-textbook-questions-CIVICS')).toBeNull();
      expect(civicsCard.textContent).not.toContain('Ask the Tutor');

      // 3. Subject Detail View: issues topics request, displays topics, but has no Tutor button
      cleanup();
      renderWithProviders(<LiveSubjectDetailView />, '/subjects/civics');
      await screen.findByTestId('live-subject-detail');
      expect(apiGet).toHaveBeenCalledWith('/api/learn/curriculum', expect.anything());
      const topicsList = await screen.findByTestId('live-topics');
      expect(topicsList.textContent).toContain('පළමු පරිච්ඡේදය');
      expect(screen.queryByRole('button', { name: /ask the tutor/i })).toBeNull();

      // 4. Tutor Page: direct entry fails closed
      cleanup();
      renderWithProviders(<TutorPage />, '/tutor?subject=civics');
      await screen.findByRole('textbox');
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.disabled).toBe(true);
      const banner = await screen.findByTestId('tutor-subject-unavailable');
      expect(banner).toBeTruthy();
    });
  });

  describe('Mutant Killers: Strict Defensive Guards', () => {
    it('defensively refuses to open unsupported subjects when resolveSubjectOpenAction is called', () => {
      const sinhalaSub: SubjectAvailability = {
        subjectCode: 'HISTORY',
        subjectName: 'History',
        languages: ['si'],
        indexedResources: 1,
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
      const topicsSub: SubjectAvailability = {
        subjectCode: 'BUDDHISM',
        subjectName: 'Buddhism',
        languages: ['si'],
        indexedResources: 1,
        topics: 3,
        tutorAvailable: true,
        topicsAvailable: true,
      };

      // Unverified subject -> null
      expect(resolveSubjectOpenAction(unverifiedSub, 'si')).toBeNull();
      // Subject only in another medium -> null
      expect(resolveSubjectOpenAction(sinhalaSub, 'en')).toBeNull();
      // Valid topic subject -> route to /subjects/:code
      expect(resolveSubjectOpenAction(topicsSub, 'si')).toEqual({ path: '/subjects/buddhism', subjectCode: 'buddhism' });
      // Valid tutor-only subject -> route to /tutor?subject=:code
      expect(resolveSubjectOpenAction(sinhalaSub, 'si')).toEqual({ path: '/tutor?subject=history', subjectCode: 'history' });
    });

    it('unsupported subject cannot call tutor API through suggestion pills or message submit (0 POST calls)', async () => {
      setupMockApi(TEST_AVAILABILITY, 'en');
      renderWithProviders(<TutorPage />, '/tutor?subject=history');
      await screen.findByRole('textbox');

      // Banner confirms subject is unsupported for this learner medium
      await screen.findByTestId('tutor-subject-unavailable');

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.disabled).toBe(true);

      // Attempt to submit via textarea Enter
      fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' });

      // Check all suggestion buttons are disabled
      const buttons = screen.queryAllByRole('button');
      for (const btn of buttons) {
        if (btn.textContent?.includes('Clarify') || btn.textContent?.includes('simpler')) {
          expect((btn as HTMLButtonElement).disabled).toBe(true);
          fireEvent.click(btn);
        }
      }

      // Assert 0 calls were dispatched to tutor endpoint
      expect(apiPost).not.toHaveBeenCalledWith('/api/learn/tutor/chat', expect.anything(), expect.anything());
    });

    it('another-medium subject does NOT issue a topics request on detail view', async () => {
      setupMockApi(TEST_AVAILABILITY, 'en');
      // Buddhism is si-only. English learner visits /subjects/buddhism
      renderWithProviders(<LiveSubjectDetailView />, '/subjects/buddhism');

      const unavailable = await screen.findByTestId('curriculum-unavailable');
      expect(unavailable.textContent).toContain('Not available in your selected medium');

      // API for /api/learn/curriculum must never be called for another-medium subject
      expect(apiGet).not.toHaveBeenCalledWith('/api/learn/curriculum', expect.anything());
    });

    it('availability loading and error states fail closed with 0 Tutor POSTs', async () => {
      // 1. Loading state: availability query never resolves
      setupMockApi(TEST_AVAILABILITY, 'si');
      apiGet.mockImplementation((url: string) => {
        if (url === '/api/learn/curriculum/availability') {
          return new Promise(() => {}); // never resolves
        }
        if (url === '/api/learn/auth/session') return Promise.resolve({ data: { authenticated: true, activeLearner: { preferredLanguage: 'si' } } });
        if (url === '/api/learn/profile') return Promise.resolve({ data: { language: 'si' } });
        if (url === '/api/learn/entitlements/allowed-grades') return Promise.resolve({ data: { allowedGrades: ['grade-10'] } });
        return Promise.reject(new Error(`unexpected ${url}`));
      });

      renderWithProviders(<TutorPage />, '/tutor?subject=science');
      await screen.findByRole('textbox');

      const loadingTextarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(loadingTextarea.disabled).toBe(true);
      expect(loadingTextarea.placeholder).toBe(CURRICULUM_LOADING_TEXT.si);

      // Attempt sending
      fireEvent.keyDown(loadingTextarea, { key: 'Enter' });
      expect(apiPost).not.toHaveBeenCalled();

      // 2. Error state: availability query rejects
      cleanup();
      apiGet.mockImplementation((url: string) => {
        if (url === '/api/learn/curriculum/availability') {
          return Promise.reject(new Error('Network error loading availability'));
        }
        if (url === '/api/learn/auth/session') return Promise.resolve({ data: { authenticated: true, activeLearner: { preferredLanguage: 'si' } } });
        if (url === '/api/learn/profile') return Promise.resolve({ data: { language: 'si' } });
        if (url === '/api/learn/entitlements/allowed-grades') return Promise.resolve({ data: { allowedGrades: ['grade-10'] } });
        return Promise.reject(new Error(`unexpected ${url}`));
      });

      renderWithProviders(<TutorPage />, '/tutor?subject=science');
      await screen.findByRole('textbox');

      const errorTextarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(errorTextarea.disabled).toBe(true);

      const errorBanner = await screen.findByTestId('tutor-subject-unavailable');
      await waitFor(() => {
        expect(errorBanner.getAttribute('role')).toBe('alert');
        expect(errorBanner.textContent).toBe(CURRICULUM_LOAD_ERROR_TEXT.si);
        expect(errorTextarea.placeholder).toBe(CURRICULUM_LOAD_ERROR_TEXT.si);
      });

      // Attempt sending
      fireEvent.keyDown(errorTextarea, { key: 'Enter' });
      expect(apiPost).not.toHaveBeenCalled();
    });

    it('drops in-flight tutor response if learner switches medium before response resolves', async () => {
      setupMockApi(TEST_AVAILABILITY, 'si');

      let resolveAskTutor: (value: unknown) => void = () => {};
      const pendingAsk = new Promise((resolve) => {
        resolveAskTutor = resolve;
      });

      apiPost.mockImplementation((url: string) => {
        if (url === '/api/learn/tutor' || url === '/api/learn/tutor/chat') {
          return pendingAsk;
        }
        return Promise.reject(new Error(`unexpected POST ${url}`));
      });

      const TestHost: React.FC = () => {
        const { setLanguage } = useStudent();
        return (
          <div>
            <button type="button" data-testid="switch-en" onClick={() => setLanguage('en')}>
              Switch to EN
            </button>
            <TutorPage />
          </div>
        );
      };

      renderWithProviders(<TestHost />, '/tutor?subject=science');
      await screen.findByRole('textbox');

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const sendBtn = screen.getByRole('button', { name: /send|යවන්න/i });

      // Student submits message while in Sinhala
      await act(async () => {
        fireEvent.change(textarea, { target: { value: 'ප්‍රභාසංස්ලේෂණය යනු කුමක්ද?' } });
      });
      await act(async () => {
        fireEvent.click(sendBtn);
      });

      // Verify request is in flight
      expect(apiPost).toHaveBeenCalledWith('/api/learn/tutor', expect.anything(), expect.anything());

      // While in-flight, learner switches medium to English
      await act(async () => {
        fireEvent.click(screen.getByTestId('switch-en'));
      });

      // Now response arrives for Sinhala question
      await act(async () => {
        resolveAskTutor({
          data: {
            answer: 'පැරණි සිංහල පිළිතුරක් මෙහි අඩංගු වේ.',
            sources: [{ pageNumber: 12, citationText: 'සාක්ෂිය' }],
            suggestedFollowUps: [],
            metadata: { safeFailure: false, evidenceCount: 1 },
          },
        });
      });

      // Assert stale response was discarded and is NOT rendered in conversation
      expect(screen.queryByText('පැරණි සිංහල පිළිතුරක් මෙහි අඩංගු වේ.')).toBeNull();
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
      expect(geoCard.textContent).toContain('විෂය නිර්දේශ අන්තර්ගතය තවමත් ලබා ගත නොහැක');
      expect(geoCard.textContent).not.toContain('Not available in your selected medium');
      expect(geoCard.textContent).not.toContain('ඔබ තෝරාගත් මාධ්‍යයෙන් ලබා ගත නොහැක');
    });
  });

  describe('Home counts use effective availability', () => {
    it('accurately partitions subjects based on effective medium availability for Sinhala learner', async () => {
      setupMockApi(TEST_AVAILABILITY, 'si');
      renderWithProviders(<LiveStudentHome />, '/');
      await screen.findByTestId('live-home');

      // With topics: BUDDHISM, CIVICS (2)
      const withTopics = screen.getByTestId('summary-with-topics');
      expect(withTopics.textContent).toContain('2');

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

      // With topics: BUDDHISM & CIVICS are si-only, so 0 with topics in English
      const withTopics = screen.getByTestId('summary-with-topics');
      expect(withTopics.textContent).toContain('0');

      // Textbook only: SCIENCE, ENGLISH_LIT (2)
      const textbookOnly = screen.getByTestId('summary-textbook-only');
      expect(textbookOnly.textContent).toContain('2');

      // Not yet: HISTORY (si), BUDDHISM (si), CIVICS (si), GEOGRAPHY (unverified), MATHEMATICS (0 resources) (5)
      const notYet = screen.getByTestId('summary-not-yet');
      expect(notYet.textContent).toContain('5');
    });

    it('accurately partitions subjects for Tamil learner (0 available)', async () => {
      setupMockApi(TEST_AVAILABILITY, 'ta');
      renderWithProviders(<LiveStudentHome />, '/');
      await screen.findByTestId('live-home');

      const withTopics = screen.getByTestId('summary-with-topics');
      expect(withTopics.textContent).toContain('0');

      const textbookOnly = screen.getByTestId('summary-textbook-only');
      expect(textbookOnly.textContent).toContain('0');

      // All 7 are not yet available in Tamil
      const notYet = screen.getByTestId('summary-not-yet');
      expect(notYet.textContent).toContain('7');
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
      expect(screen.getByTestId('summary-with-topics').textContent).toContain('2');
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
        expect(screen.getByTestId('summary-with-topics').textContent).toContain('0');
        expect(screen.getByTestId('summary-textbook-only').textContent).toContain('2');
        expect(screen.getByTestId('summary-not-yet').textContent).toContain('5');
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
        expect(screen.getByTestId('summary-not-yet').textContent).toContain('7');
      });
      expect(screen.queryByTestId('live-home-subject-SCIENCE')).toBeNull();
      expect(screen.queryByTestId('live-home-subject-HISTORY')).toBeNull();
      expect(screen.queryByTestId('live-home-subject-ENGLISH_LIT')).toBeNull();
    });
  });
});
