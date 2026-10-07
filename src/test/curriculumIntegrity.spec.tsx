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

// The ATLAS API, as production currently answers: Grade 10 English Science indexed in a verified Tutor scope (no
// topic records yet); Grade 10 Geography indexed in Sinhala but unreviewed (not a verified scope, no topics); every
// other Grade 10 subject has no indexed textbook.
const apiGet = vi.fn();
const apiPost = vi.fn();
vi.mock('../api/client', () => ({ apiClient: { get: (...a: unknown[]) => apiGet(...a), post: (...a: unknown[]) => apiPost(...a), delete: vi.fn() } }));

import { tutorService, AtlasLiveTutorAdapter, NO_EVIDENCE_REFUSAL } from '../api/tutorApi';
import { VoiceInputButton, VOICE_INPUT_UNAVAILABLE_TEXT } from '../features/tutor/VoiceInputButton';
import { fireEvent } from '@testing-library/react';
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
    { subjectCode: 'SCIENCE', subjectName: 'Science', languages: ['en'], indexedResources: 1, topics: 0, tutorScopeVerified: true, tutorAvailable: true, topicsAvailable: false },
    { subjectCode: 'GEOGRAPHY', subjectName: 'Geography', languages: ['si'], indexedResources: 1, topics: 0, tutorScopeVerified: false, tutorAvailable: false, topicsAvailable: false },
  ],
};

/** An approved, persisted topic as /api/learn/curriculum returns it (used only where a test opts in). */
const approvedTopic = {
  id: 'science-gr10-ch2-motion', subjectId: 'science', grade: 'grade-10', chapterNumber: 'Chapter 2',
  title: { en: 'Approved persisted topic', si: 'Approved persisted topic', ta: 'Approved persisted topic' },
  description: { en: '', si: '', ta: '' }, masteryPercentage: 0,
};

function answerApi(opts: { scienceTopics?: boolean } = {}) {
  const data = opts.scienceTopics
    ? { ...availability, subjects: availability.subjects.map((s) => (s.subjectCode === 'SCIENCE' ? { ...s, topics: 1, topicsAvailable: true } : s)) }
    : availability;
  apiGet.mockImplementation((url: string) => {
    if (url === '/api/learn/curriculum/availability') return Promise.resolve({ data });
    if (url === '/api/learn/curriculum') return Promise.resolve({ data: opts.scienceTopics ? [approvedTopic] : [] });
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
    await screen.findByTestId('subject-unavailable-SCIENCE');
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

  it('4. a no-evidence Tutor request fails closed: the refusal is shown, never a generated answer', async () => {
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
    expect(response.answer).toBe('I could not find this in your indexed textbook.');
    expect(response.sources).toEqual([]);
    expect(response.grounding).toMatchObject({ evidenceCount: 0, safeFailure: true });
    const body = apiPost.mock.calls[0][1] as Record<string, unknown>;
    expect(body.topicId).toBeUndefined();

    // Defence in depth: any answer that arrives without textbook sources is withheld, not labelled and shown.
    apiPost.mockResolvedValue({
      data: { answer: 'GENERATED-UNGROUNDED-TEXT', sources: [], metadata: { safeFailure: false, evidenceCount: 0 } },
    });
    const withheld = await new AtlasLiveTutorAdapter().ask('Explain trigonometry', {
      grade: 'grade-10', language: 'si', conversationId: 'c-2b', subjectId: 'science',
    });
    expect(withheld.answer).toBe(NO_EVIDENCE_REFUSAL.si);
    expect(withheld.answer).not.toContain('GENERATED-UNGROUNDED-TEXT');
    expect(withheld.sources).toEqual([]);
    expect(withheld.grounding).toMatchObject({ safeFailure: true, withheld: true });
  });

  it('5. Grade 10 English Science remains usable when indexed evidence exists', async () => {
    renderAt('/subjects/science', <SubjectDetailPage />, '/subjects/:subjectId');
    // No approved topics yet: curriculum unavailable, textbook questions offered as a distinct, explained action.
    await screen.findByTestId('subject-textbook-questions-SCIENCE');
    expect(screen.getByTestId('curriculum-unavailable')).toBeTruthy();
    expect(document.body.textContent).toContain('Ask textbook questions (EN)');
    expect(document.body.textContent).toMatch(/refuses when it finds no evidence/);
    expect(document.body.textContent).not.toMatch(GROUNDED_CLAIMS);

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

describe('LIVE availability depends on approved topic records, not on an indexed document', () => {
  beforeEach(() => {
    tutorService.setMockMode(false);
    apiGet.mockReset();
    apiPost.mockReset();
  });
  afterEach(cleanup);

  it('a. an indexed but unverified resource with zero approved topics stays unavailable (no actions, no prototype content)', async () => {
    answerApi();
    renderAt('/subjects', <SubjectsPage />);
    const geography = await screen.findByTestId('subject-unavailable-GEOGRAPHY');
    expect(geography.textContent).toContain('Curriculum content is not yet available');
    expect(geography.querySelector('button')).toBeNull();
    expect(screen.queryByTestId('subject-available-GEOGRAPHY')).toBeNull();
    expect(screen.queryByTestId('subject-textbook-questions-GEOGRAPHY')).toBeNull();

    cleanup();
    renderAt('/subjects/geography', <SubjectDetailPage />, '/subjects/:subjectId');
    await screen.findByTestId('curriculum-unavailable');
    expect(screen.queryByTestId('subject-textbook-questions-GEOGRAPHY')).toBeNull();
    expect(screen.queryByTestId('live-topics')).toBeNull();
    expect(document.body.textContent).not.toMatch(GROUNDED_CLAIMS);
    for (const marker of prototypeMarkers()) expect(document.body.textContent?.includes(marker)).toBe(false);
    expect(apiGet).not.toHaveBeenCalledWith('/api/learn/curriculum', expect.anything());

    cleanup();
    renderAt('/tutor', (
      <CurriculumCompanionPane subjectId="geography" topicId="geo-gr10-ch1" topics={MOCK_TOPICS} language="si"
        onAskQuestion={() => {}} onSelectTopic={() => {}} />
    ));
    await screen.findByTestId('live-companion-unavailable');
    for (const t of MOCK_TOPICS.filter((x) => x.subjectId === 'geography').slice(0, 10)) {
      expect(hasSimulation(t.id, t.subjectId, undefined, t.grade)).toBe(false);
    }
  });

  it('b. approved persisted topics make the subject available, listing only API topics', async () => {
    answerApi({ scienceTopics: true });
    renderAt('/subjects', <SubjectsPage />);
    await screen.findByTestId('subject-available-SCIENCE');

    cleanup();
    renderAt('/subjects/science', <SubjectDetailPage />, '/subjects/:subjectId');
    const list = await screen.findByTestId('live-topics');
    expect(list.textContent).toContain('Approved persisted topic');
    expect(list.querySelectorAll('button')).toHaveLength(1);
    expect(apiGet).toHaveBeenCalledWith('/api/learn/curriculum', { params: { subjectId: 'SCIENCE', grade: 'grade-10' } });
  });

  it('c. an unknown or demo topic id is never selected in LIVE', () => {
    const apiTopics = [approvedTopic as unknown as (typeof MOCK_TOPICS)[number]];
    expect(findVerifiedTopic(apiTopics, 'science-gr10-ch2-motion')?.id).toBe('science-gr10-ch2-motion');
    for (const demo of ['photosynthesis', 'maths-gr10-ch10-pythagoras', 'history-gr10-sources', 'number-systems']) {
      expect(findVerifiedTopic(apiTopics, demo)).toBeUndefined();
    }
  });
});

describe('LIVE microphone', () => {
  afterEach(cleanup);

  it('is disabled with an accessible explanation and never inserts a scripted prompt', () => {
    const capture = vi.fn();
    render(<VoiceInputButton live listening={false} language="en" demoTitle="Voice" onDemoCapture={capture} />);
    const mic = screen.getByTestId('voice-input-unavailable') as HTMLButtonElement;
    expect(mic.disabled).toBe(true);
    expect(mic.getAttribute('aria-label')).toBe(VOICE_INPUT_UNAVAILABLE_TEXT.en);
    fireEvent.click(mic);
    expect(capture).not.toHaveBeenCalled();
    expect(screen.queryByTestId('voice-input-demo')).toBeNull();
  });

  it('keeps the demonstration only in the MOCK (Pages demo) mode', () => {
    const capture = vi.fn();
    render(<VoiceInputButton live={false} listening={false} language="en" demoTitle="Voice" onDemoCapture={capture} />);
    fireEvent.click(screen.getByTestId('voice-input-demo'));
    expect(capture).toHaveBeenCalledTimes(1);
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
