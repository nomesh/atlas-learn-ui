import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// The ATLAS API as a signed-in, ACTIVE Grade 10 STUDENT sees it. Every request is recorded.
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
  getTutorLeaseToken: () => null,
  setTutorLeaseToken: vi.fn(),
}));

import '../i18n';
import { tutorService } from '../api/tutorApi';
import { StudentProvider, useStudent } from '../state/studentContext';
import { EditProfileModal } from '../features/account/EditProfileModal';
import { StudentHomePage } from '../features/home/StudentHomePage';
import { SubjectsPage } from '../features/subjects/SubjectsPage';
import { MOCK_SUBJECTS, MOCK_TOPICS } from '../mocks/curriculumData';

const SESSION = {
  authenticated: true,
  userId: 'u-1',
  email: null,
  displayName: 'Kasun Perera',
  accountId: 'a-1',
  studentId: 'ATL-26-009999',
  accountStatus: 'ACTIVE',
  registeredGrade: 'grade-10',
  accountType: 'INDEPENDENT_STUDENT',
  activeLearner: {
    id: 'p-1', displayName: 'Kasun Perera', grade: 'grade-10', curriculumCode: 'SL_NATIONAL',
    preferredLanguage: 'en', enrolledSubjects: [], isPrimary: true, status: 'ACTIVE',
  },
  learners: [],
};
const PROFILE = {
  id: 'p-1', name: 'Kasun Perera', grade: 'grade-10', language: 'en',
  streakDays: 0, topicsMastered: 0, questionsAnswered: 0, accuracyPercent: 0, badges: [],
};
const AVAILABILITY = {
  grade: 'grade-10',
  subjects: [
    { subjectCode: 'SCIENCE', subjectName: 'Science', languages: ['en'], indexedResources: 1, topics: 0, tutorScopeVerified: true, tutorAvailable: true, topicsAvailable: false },
    { subjectCode: 'MATHEMATICS', subjectName: 'Mathematics', languages: [], indexedResources: 0, topics: 0, tutorAvailable: false, topicsAvailable: false },
    { subjectCode: 'GEOGRAPHY', subjectName: 'Geography', languages: ['si'], indexedResources: 1, topics: 0, tutorScopeVerified: false, tutorAvailable: false, topicsAvailable: false },
  ],
};

type Api = { allowedGrades?: string[] | 'error'; availability?: typeof AVAILABILITY; nameless?: boolean };
function answerApi(opts: Api = {}) {
  apiGet.mockImplementation((url: string) => {
    if (url === '/api/learn/auth/session') {
      return Promise.resolve({
        data: opts.nameless ? { ...SESSION, displayName: '', activeLearner: { ...SESSION.activeLearner, displayName: '' } } : SESSION,
      });
    }
    if (url === '/api/learn/profile') return Promise.resolve({ data: opts.nameless ? { ...PROFILE, name: '' } : PROFILE });
    if (url === '/api/learn/entitlements/allowed-grades') {
      if (opts.allowedGrades === 'error') return Promise.reject(new Error('entitlements unavailable'));
      return Promise.resolve({
        data: { studentId: SESSION.studentId, accountType: 'STUDENT', defaultGrade: 'grade-10', allowedGrades: opts.allowedGrades ?? ['grade-10'] },
      });
    }
    if (url === '/api/learn/curriculum/availability') return Promise.resolve({ data: opts.availability ?? AVAILABILITY });
    return Promise.reject(new Error(`unexpected GET ${url}`));
  });
}

/** Router navigation from outside the (inert) page, like a link click, programmatic navigation or browser Back. */
let routerNavigate: ReturnType<typeof useNavigate> = () => {};

/** Shows the learner state the rest of the app sees, and offers the opener / navigation the tests need. */
const Probe: React.FC = () => {
  const { studentName, grade, language, setIsProfileEditorOpen } = useStudent();
  const navigate = useNavigate();
  routerNavigate = navigate;
  const location = useLocation();
  return (
    <div>
      <span data-testid="probe-name">{studentName}</span>
      <span data-testid="probe-grade">{grade}</span>
      <span data-testid="probe-language">{language}</span>
      <span data-testid="probe-path">{location.pathname}</span>
      <span data-testid="probe-search">{location.search}</span>
      <button type="button" onClick={() => setIsProfileEditorOpen(true)}>Open editor</button>
      <button type="button" onClick={() => navigate('/subjects')}>Go to subjects</button>
      <button type="button" onClick={() => navigate(-1)}>Browser back</button>
    </div>
  );
};

function renderApp(initialEntries: string[] = ['/'], initialIndex?: number) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <StudentProvider>
        <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
          <Probe />
          <Routes>
            <Route path="/" element={<StudentHomePage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="*" element={<div data-testid="other-route" />} />
          </Routes>
          <EditProfileModal />
        </MemoryRouter>
      </StudentProvider>
    </QueryClientProvider>,
  );
}

/** Renders, waits until the server profile is applied, and returns the GET count after loading. */
async function renderLoaded(opts: Api = {}, entries?: string[], index?: number) {
  answerApi(opts);
  renderApp(entries, index);
  await waitFor(() => expect(screen.getByTestId('probe-name').textContent).toBe('Kasun Perera'));
  await waitFor(() => expect(apiGet).toHaveBeenCalledWith('/api/learn/entitlements/allowed-grades'));
  await waitFor(() => expect(apiGet).toHaveBeenCalledWith('/api/learn/profile'));
}

const openEditor = async () => {
  const opener = screen.getByRole('button', { name: 'Open editor' });
  opener.focus();
  fireEvent.click(opener);
  const dialog = await screen.findByRole('dialog', { name: 'Edit profile' });
  await waitFor(() => expect(document.activeElement).toBe(screen.getByLabelText('Display name')));
  return { opener, dialog };
};

const storageSnapshot = () => ({
  name: localStorage.getItem('atlas_student_name'),
  grade: localStorage.getItem('atlas_student_grade'),
  lang: localStorage.getItem('atlas_learn_lang'),
});

beforeEach(() => {
  tutorService.setMockMode(false);
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem('atlas_onboarding_completed', 'true');
  apiGet.mockReset();
  apiPut.mockReset();
  apiPost.mockReset();
});
afterEach(cleanup);

describe('signed-in profile editor', () => {
  it('opens as a distinct editor with the server values and makes no API call', async () => {
    await renderLoaded();
    const getsBefore = apiGet.mock.calls.length;
    const { dialog } = await openEditor();
    expect(dialog.textContent).not.toMatch(/Prototype|Welcome|Get Started|Sign In/i);
    expect((screen.getByLabelText('Display name') as HTMLInputElement).value).toBe('Kasun Perera');
    expect(apiGet.mock.calls.length).toBe(getsBefore);
    expect(apiPut).not.toHaveBeenCalled();
    expect(apiPost).not.toHaveBeenCalled();
  });

  const closeWays: [string, () => void][] = [
    ['Close', () => fireEvent.click(screen.getByRole('button', { name: 'Close' }))],
    ['Cancel', () => fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))],
    ['Escape', () => fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })],
    ['backdrop', () => fireEvent.mouseDown(screen.getByTestId('profile-editor-backdrop'))],
  ];
  for (const [how, doClose] of closeWays) {
    it(`closes via ${how}, discards the draft, makes no PUT and restores focus`, async () => {
      await renderLoaded();
      const before = storageSnapshot();
      const getsBefore = apiGet.mock.calls.length;
      const { opener } = await openEditor();
      fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'Somebody Else' } });
      fireEvent.click(screen.getByRole('button', { name: /සිංහල/ }));
      doClose();
      expect(screen.queryByRole('dialog')).toBeNull();
      await waitFor(() => expect(document.activeElement).toBe(opener));
      expect(apiPut).not.toHaveBeenCalled();
      expect(apiGet.mock.calls.length).toBe(getsBefore);
      expect(screen.getByTestId('probe-name').textContent).toBe('Kasun Perera');
      expect(screen.getByTestId('probe-language').textContent).toBe('en');
      expect(storageSnapshot()).toEqual(before);
      // Reopening starts from the saved values, not the discarded draft.
      await openEditor();
      expect((screen.getByLabelText('Display name') as HTMLInputElement).value).toBe('Kasun Perera');
    });
  }

  it('a click inside the dialog does not close it', async () => {
    await renderLoaded();
    const { dialog } = await openEditor();
    fireEvent.mouseDown(dialog);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('closes on route navigation and on browser Back without saving', async () => {
    await renderLoaded();
    await openEditor();
    act(() => {
      routerNavigate('/subjects');
    });
    await waitFor(() => expect(screen.getByTestId('probe-path').textContent).toBe('/subjects'));
    expect(screen.queryByRole('dialog')).toBeNull();

    await openEditor();
    act(() => {
      routerNavigate(-1);
    });
    await waitFor(() => expect(screen.getByTestId('probe-path').textContent).toBe('/'));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(apiPut).not.toHaveBeenCalled();
  });

  it('keeps keyboard focus inside the dialog (focus trap)', async () => {
    await renderLoaded();
    const { dialog } = await openEditor();
    const close = screen.getByRole('button', { name: 'Close' });
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    // Save is disabled while nothing changed, so Cancel is the last focusable control.
    cancel.focus();
    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(document.activeElement).toBe(close);
    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(cancel);
  });

  it('saves to the server first, then updates state and local storage', async () => {
    await renderLoaded();
    let resolvePut: (v: unknown) => void = () => {};
    apiPut.mockImplementation(() => new Promise((r) => { resolvePut = r; }));
    await openEditor();
    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: '  Kasun P.  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    // Only the changed field is sent.
    expect(apiPut).toHaveBeenCalledWith('/api/learn/profile', { name: 'Kasun P.' });
    // While the server has not answered, nothing changed locally.
    expect(screen.getByTestId('probe-name').textContent).toBe('Kasun Perera');
    expect(localStorage.getItem('atlas_student_name')).not.toBe('Kasun P.');
    await act(async () => {
      resolvePut({ data: { ...PROFILE, name: 'Kasun P.' } });
    });
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(screen.getByTestId('probe-name').textContent).toBe('Kasun P.');
    expect(localStorage.getItem('atlas_student_name')).toBe('Kasun P.');
  });

  it('a failed save keeps the prior state, keeps the draft and shows an actionable error', async () => {
    await renderLoaded();
    apiPut.mockRejectedValue(new Error('503'));
    const before = storageSnapshot();
    await openEditor();
    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'New Name' } });
    fireEvent.click(screen.getByRole('button', { name: /සිංහල/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toMatch(/could not be saved, so nothing was changed/);
    expect(alert.textContent).toMatch(/try again/);
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect((screen.getByLabelText('Display name') as HTMLInputElement).value).toBe('New Name');
    expect(screen.getByTestId('probe-name').textContent).toBe('Kasun Perera');
    expect(screen.getByTestId('probe-language').textContent).toBe('en');
    expect(storageSnapshot()).toEqual(before);
  });

  it('has no hard-coded name: an empty name cannot be saved', async () => {
    await renderLoaded();
    await openEditor();
    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: '   ' } });
    expect((screen.getByRole('button', { name: 'Save changes' }) as HTMLButtonElement).disabled).toBe(true);
    expect(document.body.textContent).not.toMatch(/Amila/);
  });

  it('a learner the server returns without a name gets no invented name anywhere', async () => {
    answerApi({ nameless: true });
    renderApp();
    await waitFor(() => expect(apiGet).toHaveBeenCalledWith('/api/learn/profile'));
    await waitFor(() => expect(apiGet).toHaveBeenCalledWith('/api/learn/entitlements/allowed-grades'));
    expect(screen.getByTestId('probe-name').textContent).toBe('');
    expect((await screen.findByTestId('live-home-greeting')).textContent).toBe('Welcome back! 👋');
    await openEditor();
    expect((screen.getByLabelText('Display name') as HTMLInputElement).value).toBe('');
    expect((screen.getByRole('button', { name: 'Save changes' }) as HTMLButtonElement).disabled).toBe(true);
    expect(document.body.textContent).not.toMatch(/Amila|Nimali/);
  });

  it('shows no invented name while the session is still loading', async () => {
    apiGet.mockImplementation(() => new Promise(() => {}));
    renderApp();
    expect(screen.getByTestId('probe-name').textContent).toBe('');
    expect(screen.getByTestId('live-home-greeting').textContent).toBe('Welcome back! 👋');
    expect(document.body.textContent).not.toMatch(/Amila|Nimali/);
  });

  it('a STUDENT with one entitled grade sees the grade read-only', async () => {
    await renderLoaded({ allowedGrades: ['grade-10'] });
    await openEditor();
    expect(screen.getByTestId('profile-grade-readonly').textContent).toMatch(/Grade 10/);
    expect(screen.queryByRole('group', { name: 'Entitled grades' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Grade 11' })).toBeNull();
  });

  it('grade stays read-only when the entitlement lookup fails', async () => {
    await renderLoaded({ allowedGrades: 'error' });
    await openEditor();
    expect(screen.getByTestId('profile-grade-readonly')).toBeTruthy();
  });

  it('offers only entitled grades (never beyond the entitlements) and saves an entitled change', async () => {
    await renderLoaded({ allowedGrades: ['grade-8', 'grade-10', 'grade-99', 'grade-12; DROP'] });
    apiPut.mockResolvedValue({ data: { ...PROFILE, grade: 'grade-8' } });
    await openEditor();
    const group = screen.getByRole('group', { name: 'Entitled grades' });
    const offered = Array.from(group.querySelectorAll('button')).map((b) => b.textContent);
    expect(offered).toEqual(['Grade 8', 'Grade 10']);
    fireEvent.click(screen.getByRole('button', { name: 'Grade 8' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(apiPut).toHaveBeenCalledWith('/api/learn/profile', { grade: 'grade-8' });
    expect(screen.getByTestId('probe-grade').textContent).toBe('grade-8');
  });
});

/** Text only the bundled prototype catalogue contains. */
const prototypeMarkers = () => [
  ...MOCK_SUBJECTS.map((s) => s.description.en).filter(Boolean),
  ...MOCK_TOPICS.slice(0, 25).map((t) => t.title.en),
];
const FABRICATED = /Mastery|Continue Learning|Resume Lesson|\d+\s?%|Progress|sample|demo|Chapter \d+|\d+ Topics/i;

describe('LIVE home dashboard', () => {
  it('renders the real learner context, live availability and safe actions only', async () => {
    await renderLoaded();
    const home = await screen.findByTestId('live-home');
    expect(screen.getByTestId('live-home-greeting').textContent).toContain('Kasun Perera');
    expect(screen.getByTestId('live-home-grade').textContent).toBe('GRADE 10');
    await waitFor(() => expect(screen.getByTestId('summary-textbook-only').textContent).toBe('1'));
    expect(screen.getByTestId('summary-with-topics').textContent).toBe('0');
    expect(screen.getByTestId('summary-not-yet').textContent).toBe('2');
    expect(screen.getByTestId('live-home-subject-SCIENCE')).toBeTruthy();
    expect(screen.queryByTestId('live-home-subject-MATHEMATICS')).toBeNull();
    expect(apiGet).toHaveBeenCalledWith('/api/learn/curriculum/availability', { params: { grade: 'grade-10' } });
    // No topic is approved, so no lesson action is offered.
    expect(screen.queryByTestId('live-home-action-study-topic')).toBeNull();
    const text = home.textContent || '';
    for (const marker of prototypeMarkers()) expect(text.includes(marker), `prototype text: ${marker}`).toBe(false);
    expect(text).not.toMatch(FABRICATED);
    expect(text).not.toMatch(/Amila/);
  });

  it('offers "Study a topic" only when the API reports approved topics', async () => {
    const withTopics = {
      ...AVAILABILITY,
      subjects: AVAILABILITY.subjects.map((s) => (s.subjectCode === 'SCIENCE' ? { ...s, topics: 3, topicsAvailable: true } : s)),
    };
    await renderLoaded({ availability: withTopics });
    const action = await screen.findByTestId('live-home-action-study-topic');
    expect(action.textContent).toContain('Science');
    fireEvent.click(action);
    await waitFor(() => expect(screen.getByTestId('probe-path').textContent).toBe('/subjects/science'));
  });

  it('the Ask bar opens the Tutor with only the question', async () => {
    await renderLoaded();
    const input = await screen.findByLabelText('Ask ATLAS Tutor a question...');
    fireEvent.change(input, { target: { value: 'What is inertia?' } });
    fireEvent.click(screen.getByRole('button', { name: 'Ask' }));
    await waitFor(() => expect(screen.getByTestId('probe-path').textContent).toBe('/tutor'));
    expect(screen.getByTestId('probe-search').textContent).toBe('?q=What+is+inertia%3F');
  });

  it('"/" and "/subjects" are distinct views', async () => {
    await renderLoaded(undefined, ['/']);
    await screen.findByTestId('live-home');
    expect(screen.queryByTestId('live-subjects')).toBeNull();
    cleanup();
    await renderLoaded(undefined, ['/subjects']);
    await screen.findByTestId('live-subjects');
    expect(screen.queryByTestId('live-home')).toBeNull();
  });
});
