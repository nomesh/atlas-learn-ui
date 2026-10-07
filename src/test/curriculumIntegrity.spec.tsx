import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Fixed learner context (no auth/session side effects).
const studentState = {
  grade: 'grade-10',
  language: 'en',
  setCurriculumSubject: vi.fn(),
  learningContext: { grade: 'grade-10', language: 'en', conversationId: 'c-1' },
};
vi.mock('../state/studentContext', () => ({ useStudent: () => studentState }));

// The ATLAS API, as production currently answers: Grade 10 English Science indexed (no topic records yet);
// every other Grade 10 subject has no indexed textbook.
const apiGet = vi.fn();
const apiPost = vi.fn();
vi.mock('../api/client', () => ({ apiClient: { get: (...a: unknown[]) => apiGet(...a), post: (...a: unknown[]) => apiPost(...a), delete: vi.fn() } }));

import { tutorService, AtlasLiveTutorAdapter } from '../api/tutorApi';
import { resolveTutorMode } from '../api/tutorMode';
import { MOCK_SUBJECTS, MOCK_TOPICS } from '../mocks/curriculumData';
import { SubjectsPage } from '../features/subjects/SubjectsPage';
import { SubjectDetailPage } from '../features/subjects/SubjectDetailPage';
import { TeachMePage } from '../features/teach-me/TeachMePage';
import { PracticePage } from '../features/practice/PracticePage';
import { ProgressPage } from '../features/progress/ProgressPage';
import { CurriculumCompanionPane } from '../features/tutor/CurriculumCompanionPane';
import { hasSimulation } from '../components/interactive/SubjectConceptVisualizer';
import { findVerifiedTopic, isMockCurriculum } from '../curriculum/liveCurriculum';

const availability = {
  grade: 'grade-10',
  subjects: [
    { subjectCode: 'MATHEMATICS', subjectName: 'Mathematics', languages: [], indexedResources: 0, topics: 0, tutorAvailable: false, topicsAvailable: false },
    { subjectCode: 'SCIENCE', subjectName: 'Science', languages: ['en'], indexedResources: 1, topics: 0, tutorAvailable: true, topicsAvailable: false },
  ],
};

function answerApi() {
  apiGet.mockImplementation((url: string) => {
    if (url === '/api/learn/curriculum/availability') return Promise.resolve({ data: availability });
    if (url === '/api/learn/curriculum') return Promise.resolve({ data: [] });
    if (url === '/api/learn/resources') return Promise.resolve({ data: [] });
    return Promise.reject(new Error(`unexpected GET ${url}`));
  });
}

function renderAt(path: string, element: React.ReactElement, route = '*') {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={route} element={element} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

/** Text that only the bundled prototype catalogue contains. */
const prototypeMarkers = () => [
  ...MOCK_SUBJECTS.flatMap((s) => [s.description.en]).filter(Boolean),
  ...MOCK_TOPICS.slice(0, 25).map((t) => t.title.en),
];

const GROUNDED_CLAIMS = /Textbook Grounded|Ministry Textbook Active|Syllabus Grounded|Official Ministry Textbook Grounded|Live Simulation|Real-time Simulation|Mastery Progress|% Complete/i;

describe('LIVE production content integrity', () => {
  beforeEach(() => {
    tutorService.setMockMode(false);
    apiGet.mockReset();
    apiPost.mockReset();
    answerApi();
  });
  afterEach(cleanup);

  it('1. LIVE never loads the bundled fallback curriculum', async () => {
    expect(isMockCurriculum()).toBe(false);
    renderAt('/subjects', <SubjectsPage />);
    await screen.findByTestId('subject-available-SCIENCE');
    const text = document.body.textContent || '';
    for (const marker of prototypeMarkers()) {
      expect(text.includes(marker), `prototype text leaked: ${marker}`).toBe(false);
    }
    expect(text).not.toMatch(GROUNDED_CLAIMS);
    expect(apiGet).toHaveBeenCalledWith('/api/learn/curriculum/availability', { params: { grade: 'grade-10' } });
  });

  it('2. an unsupported Maths subject shows an honest unavailable state', async () => {
    renderAt('/subjects', <SubjectsPage />);
    const maths = await screen.findByTestId('subject-unavailable-MATHEMATICS');
    expect(maths.textContent).toContain('Curriculum content is not yet available');
    expect(maths.getAttribute('aria-disabled')).toBe('true');
    expect(maths.querySelector('button')).toBeNull();

    cleanup();
    renderAt('/subjects/maths', <SubjectDetailPage />, '/subjects/:subjectId');
    await screen.findByTestId('curriculum-unavailable');
    expect(document.body.textContent).not.toMatch(GROUNDED_CLAIMS);
    expect(document.body.textContent).not.toMatch(/Pythagoras|Chapter \d+|pages? \d+/i);
  });

  it('3. unsupported topics never show grounded labels, page ranges, lesson structures or simulations', async () => {
    renderAt('/learn/maths-gr10-ch10-pythagoras', <TeachMePage />, '/learn/:topicId');
    expect(screen.getByTestId('curriculum-unavailable')).toBeTruthy();
    const text = document.body.textContent || '';
    expect(text).not.toMatch(GROUNDED_CLAIMS);
    expect(text).not.toMatch(/Step \d|Pythagoras|pages? \d+/i);

    for (const t of MOCK_TOPICS.slice(0, 40)) {
      expect(hasSimulation(t.id, t.subjectId, undefined, t.grade), `simulation offered for ${t.id}`).toBe(false);
    }

    cleanup();
    renderAt('/tutor', (
      <CurriculumCompanionPane subjectId="maths" topicId="maths-gr10-ch10-pythagoras" topics={MOCK_TOPICS} language="en"
        onAskQuestion={() => {}} onSelectTopic={() => {}} />
    ));
    await screen.findByTestId('live-companion-unavailable');
    expect(document.body.textContent).not.toMatch(GROUNDED_CLAIMS);
    expect(document.body.textContent).not.toMatch(/Pythagoras/);

    cleanup();
    renderAt('/practice', <PracticePage />);
    expect(screen.getByTestId('curriculum-unavailable')).toBeTruthy();
    cleanup();
    renderAt('/progress', <ProgressPage />);
    expect(screen.getByTestId('curriculum-unavailable')).toBeTruthy();
    expect(document.body.textContent).not.toMatch(/% Complete|Mastery/);
  });

  it('4. a no-evidence Tutor answer is reported as not grounded (backend safe failure, no sources)', async () => {
    apiPost.mockResolvedValue({
      data: {
        answer: 'I could not find this in your indexed textbook.',
        sources: [],
        suggestedFollowUps: [],
        metadata: { safeFailure: true, evidenceCount: 0 },
      },
    });
    const response = await new AtlasLiveTutorAdapter().ask('Solve x^2+5x+6=0', {
      grade: 'grade-10', language: 'en', conversationId: 'c-2', subjectId: 'maths',
    });
    expect(response.sources).toEqual([]);
    expect(response.grounding).toEqual({ evidenceCount: 0, safeFailure: true });
    const body = apiPost.mock.calls[0][1] as Record<string, unknown>;
    expect(body.topicId).toBeUndefined();
  });

  it('5. Grade 10 English Science remains usable when indexed evidence exists', async () => {
    renderAt('/subjects/science', <SubjectDetailPage />, '/subjects/:subjectId');
    await screen.findByTestId('live-subject-detail');
    expect(screen.getByText('Ask the Tutor')).toBeTruthy();
    expect(document.body.textContent).toContain('Textbook indexed (EN)');
    expect(screen.getByTestId('live-no-topics')).toBeTruthy();

    apiPost.mockResolvedValue({
      data: {
        answer: 'Velocity is displacement per unit time.',
        sources: [{ source: 'Grade 10 Science Part 1', pageNumber: 40 }],
        metadata: { safeFailure: false, evidenceCount: 1 },
      },
    });
    const response = await new AtlasLiveTutorAdapter().ask('What is velocity?', {
      grade: 'grade-10', language: 'si', conversationId: 'c-3', subjectId: 'science',
    });
    expect(response.sources).toHaveLength(1);
    expect(response.grounding?.safeFailure).toBe(false);
  });

  it('7. attacker-controlled query parameters, storage and env flags cannot force MOCK in production', () => {
    for (const storedOverride of [null, 'true', 'false']) {
      for (const envFlag of [undefined, 'true', 'false', 'TRUE']) {
        expect(resolveTutorMode({ isProd: true, hasViteEnv: true, storedOverride, envFlag, deploymentTarget: undefined }).mode).toBe('live');
        expect(resolveTutorMode({ isProd: true, hasViteEnv: true, storedOverride, envFlag, deploymentTarget: 'production' }).mode).toBe('live');
      }
    }
    // A crafted ?topic= is never accepted unless the API returned it for this subject and grade.
    expect(findVerifiedTopic([], 'maths-gr10-ch10-pythagoras')).toBeUndefined();
    expect(findVerifiedTopic(MOCK_TOPICS.slice(0, 0), "x' OR 1=1")).toBeUndefined();
    renderAt('/subjects?mock=true&demo=1&VITE_USE_MOCK_API=true', <SubjectsPage />);
    expect(isMockCurriculum()).toBe(false);
  });
});

describe('MOCK (Pages demo) keeps the intentional demo catalogue', () => {
  afterEach(() => {
    cleanup();
    tutorService.setMockMode(false);
  });

  it('6. pages-demo resolves MOCK and renders the bundled demo subjects', () => {
    expect(resolveTutorMode({ isProd: true, hasViteEnv: true, storedOverride: null, envFlag: 'true', deploymentTarget: 'pages-demo' }).mode).toBe('mock');
    tutorService.setMockMode(true);
    renderAt('/subjects', <SubjectsPage />);
    expect(MOCK_SUBJECTS.length).toBeGreaterThan(0);
    expect(screen.getByText(MOCK_SUBJECTS[0].name.en)).toBeTruthy();
    expect(apiGet).not.toHaveBeenCalledWith('/api/learn/curriculum/availability', expect.anything());
  });
});
