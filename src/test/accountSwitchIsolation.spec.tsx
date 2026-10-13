import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
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
  getTutorLeaseToken: () => null,
  setTutorLeaseToken: vi.fn(),
}));

import i18n from '../i18n';
import { tutorService } from '../api/tutorApi';
import { StudentProvider, useStudent } from '../state/studentContext';
import { GUEST_GRADE_KEY, GUEST_LANGUAGE_KEY } from '../state/devicePreferences';
import { AppShell } from '../components/layout/AppShell';
import { StudentHomePage } from '../features/home/StudentHomePage';
import { SubjectsPage } from '../features/subjects/SubjectsPage';
import { EDITOR_BACKDROP_Z_INDEX, LATE_SAVE_FAILED_TEXT, SAVE_NOTICE_Z_INDEX } from '../features/account/EditProfileModal';

// Learner A (Student ID ATL-A-0001) and learner B / a non-student account B without a Student ID.
type Session = Record<string, unknown>;
const sessionOf = (userId: string, name: string, studentId: string | null, grade = 'grade-10', language = 'en'): Session => ({
  authenticated: true, userId, email: null, displayName: name, accountId: `acc-${userId}`, studentId,
  accountStatus: 'ACTIVE', registeredGrade: grade, accountType: studentId ? 'INDEPENDENT_STUDENT' : null,
  activeLearner: { id: `p-${userId}`, displayName: name, grade, curriculumCode: 'SL_NATIONAL', preferredLanguage: language, enrolledSubjects: [], isPrimary: true, status: 'ACTIVE' },
  learners: [],
});
const A = sessionOf('u-a', 'Amara Alpha', 'ATL-A-0001', 'grade-11', 'ta');
const B = sessionOf('u-b', 'Bimal Beta', 'ATL-B-0002', 'grade-10', 'en');
const B_NO_ID = sessionOf('u-b', 'Bimal Beta', null, 'grade-10', 'en');
const profileOf = (s: Session) => {
  const l = s.activeLearner as Record<string, string>;
  return { id: l.id, name: l.displayName, grade: l.grade, language: l.preferredLanguage, streakDays: 5, topicsMastered: 14, questionsAnswered: 52, accuracyPercent: 94, badges: [] };
};

type Deferred<T> = { promise: Promise<T>; resolve: (v: T) => void; reject: (e: unknown) => void };
function deferred<T>(): Deferred<T> {
  let resolve!: (v: T) => void;
  let reject!: (e: unknown) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

/** Per-request answers: the next session/profile answers can be queued (e.g. a slow one for A, then B). */
let sessionQueue: (() => Promise<{ data: unknown }>)[] = [];
let profileQueue: (() => Promise<{ data: unknown }>)[] = [];
let currentSession: Session = A;
function answerApi() {
  apiGet.mockImplementation((url: string) => {
    if (url === '/api/learn/auth/session') return (sessionQueue.shift() ?? (() => Promise.resolve({ data: currentSession })))();
    if (url === '/api/learn/profile') return (profileQueue.shift() ?? (() => Promise.resolve({ data: profileOf(currentSession) })))();
    if (url === '/api/learn/entitlements/allowed-grades') {
      return Promise.resolve({ data: { studentId: currentSession.studentId, accountType: 'STUDENT', defaultGrade: currentSession.registeredGrade, allowedGrades: [currentSession.registeredGrade] } });
    }
    if (url === '/api/learn/curriculum/availability') return Promise.resolve({ data: { grade: 'grade-10', subjects: [] } });
    if (url === '/api/learn/devices') return Promise.resolve({ data: [] });
    return Promise.reject(new Error(`unexpected GET ${url}`));
  });
  apiPost.mockImplementation((url: string) =>
    url === '/api/learn/auth/logout' ? Promise.resolve({ data: { status: 'ok' } }) : Promise.reject(new Error(`unexpected POST ${url}`)),
  );
}

let student: ReturnType<typeof useStudent>;
let routerNavigate: ReturnType<typeof useNavigate> = () => {};
const Probe: React.FC = () => {
  student = useStudent();
  routerNavigate = useNavigate();
  return null;
};

function renderShell() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <StudentProvider>
        <MemoryRouter initialEntries={['/']}>
          <Probe />
          <Routes>
            <Route path="/" element={<AppShell />}>
              <Route index element={<StudentHomePage />} />
              <Route path="subjects" element={<SubjectsPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </StudentProvider>
    </QueryClientProvider>,
  );
}

/** Learner A as the sign-in flow leaves it: the cached sign-in (with A's Student ID) plus a confirmed session. */
async function signInAsA() {
  currentSession = A;
  renderShell();
  await waitFor(() => expect(student.isAuthenticated).toBe(true));
  act(() =>
    student.signInStudent({ id: 'ATL-A-0001', displayName: 'Amara Alpha', grade: 'grade-11', language: 'ta', studentId: 'ATL-A-0001' }),
  );
  await act(async () => {
    await student.refreshSession();
  });
  await waitFor(() => expect(student.studentName).toBe('Amara Alpha'));
  expect(student.studentId).toBe('ATL-A-0001');
  expect(localStorage.getItem('atlas_student_session')).toContain('ATL-A-0001');
}

async function confirm(session: Session) {
  currentSession = session;
  await act(async () => {
    await student.refreshSession();
  });
}

const openAccountMenu = async () => {
  fireEvent.click(await screen.findByTestId('account-menu-toggle'));
};
const noTraceOfA = () => {
  expect(document.body.textContent).not.toContain('Amara Alpha');
  expect(document.body.textContent).not.toContain('ATL-A-0001');
  expect(JSON.stringify({ ...localStorage })).not.toMatch(/Amara|ATL-A-0001/);
};

beforeEach(async () => {
  tutorService.setMockMode(false);
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem('atlas_onboarding_completed', 'true');
  apiGet.mockReset();
  apiPut.mockReset();
  apiPost.mockReset();
  sessionQueue = [];
  profileQueue = [];
  answerApi();
  await i18n.changeLanguage('en');
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------------------------------------------
describe('confirmed account switch: no identity of the previous learner survives', () => {
  it('A → B switches Student ID and display identity cleanly', async () => {
    await signInAsA();
    act(() => student.setProfileSaveNotice(LATE_SAVE_FAILED_TEXT)); // A's notice
    expect(await screen.findByTestId('profile-save-notice')).toBeTruthy();
    await confirm(B);
    expect(student.profileSaveNotice).toBeNull();
    expect(screen.queryByTestId('profile-save-notice')).toBeNull();
    await waitFor(() => expect(student.studentName).toBe('Bimal Beta'));
    expect(student.studentId).toBe('ATL-B-0002');
    expect(student.currentUser?.displayName).toBe('Bimal Beta');
    expect(student.activeLearner?.displayName).toBe('Bimal Beta');
    expect(student.grade).toBe('grade-10');
    expect(student.language).toBe('en');
    await openAccountMenu();
    expect(screen.getByText('ID: ATL-B-0002')).toBeTruthy();
    expect(screen.getByTestId('account-name').textContent).toBe('Bimal Beta');
    noTraceOfA();
  });

  it('A → a confirmed account without a Student ID shows no Student ID from A', async () => {
    await signInAsA();
    await confirm(B_NO_ID);
    await waitFor(() => expect(student.studentName).toBe('Bimal Beta'));
    expect(student.studentId).toBeNull();
    expect(student.accountType).toBeNull();
    await openAccountMenu();
    expect(screen.queryByText(/^ID: /)).toBeNull();
    noTraceOfA();
  });

  it("while B's own grade and language are not known yet, A's are not shown", async () => {
    await signInAsA();
    expect(student.grade).toBe('grade-11');
    expect(student.language).toBe('ta');
    const bWithoutPreferences = {
      ...B,
      registeredGrade: null,
      activeLearner: { ...(B.activeLearner as Record<string, unknown>), grade: '', preferredLanguage: '' },
    };
    const slowProfileB = deferred<{ data: unknown }>();
    profileQueue.push(() => slowProfileB.promise); // B's profile has not answered yet
    currentSession = bWithoutPreferences;
    let pending: Promise<void> = Promise.resolve();
    act(() => {
      pending = student.refreshSession();
    });
    await waitFor(() => expect(student.studentName).toBe('Bimal Beta'));
    expect(student.grade).toBe('grade-10'); // the neutral default, not A's grade-11
    expect(student.language).toBe('en'); // not A's ta
    noTraceOfA();
    await act(async () => {
      slowProfileB.resolve({ data: profileOf(B) });
      await pending;
    });
  });

  it('A → an account with no active learner shows no learner from A', async () => {
    await signInAsA();
    await confirm({ ...B_NO_ID, activeLearner: null, learners: [] });
    await waitFor(() => expect(student.session?.userId).toBe('u-b'));
    expect(student.activeLearner).toBeNull();
    expect(student.learners).toEqual([]);
    expect(student.studentId).toBeNull();
    noTraceOfA();
  });

  it('persisted learner-session storage no longer contains A after the switch', async () => {
    await signInAsA();
    await confirm(B);
    await waitFor(() => expect(student.studentName).toBe('Bimal Beta'));
    expect(localStorage.getItem('atlas_student_session')).toBeNull();
    expect(localStorage.getItem('atlas_student_name')).toBe('Bimal Beta');
    expect(localStorage.getItem('atlas_learn_lang')).toBe('en');
    expect(localStorage.getItem('atlas_student_grade')).toBe('grade-10');
    noTraceOfA();
  });

  it('a delayed session read for A that completes after B is confirmed is ignored', async () => {
    await signInAsA();
    const slowA = deferred<{ data: unknown }>();
    sessionQueue.push(() => slowA.promise);
    let staleRefresh: Promise<void> = Promise.resolve();
    act(() => {
      staleRefresh = student.refreshSession();
    });
    await confirm(B); // a later refresh confirms B
    await waitFor(() => expect(student.studentName).toBe('Bimal Beta'));
    await act(async () => {
      slowA.resolve({ data: A });
      await staleRefresh;
    });
    expect(student.studentName).toBe('Bimal Beta');
    expect(student.studentId).toBe('ATL-B-0002');
    noTraceOfA();
  });

  it('a delayed profile read for A that completes after B is confirmed is ignored', async () => {
    await signInAsA();
    const slowProfileA = deferred<{ data: unknown }>();
    profileQueue.push(() => slowProfileA.promise);
    let staleRefresh: Promise<void> = Promise.resolve();
    await act(async () => {
      staleRefresh = student.refreshSession(); // A confirmed again, its profile read hangs
    });
    await confirm(B);
    await waitFor(() => expect(student.studentName).toBe('Bimal Beta'));
    await act(async () => {
      slowProfileA.resolve({ data: profileOf(A) });
      await staleRefresh;
    });
    expect(student.studentName).toBe('Bimal Beta');
    expect(student.grade).toBe('grade-10');
    expect(student.language).toBe('en');
    noTraceOfA();
  });

  it("a save of A that succeeds while B's session check is in flight cannot keep A's data for B", async () => {
    await signInAsA();
    const putA = deferred<{ data: unknown }>();
    apiPut.mockReturnValueOnce(putA.promise);
    act(() => student.openProfileEditor(null));
    await screen.findByRole('dialog');
    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'Amara Alpha Changed' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

    // B's session check starts; A's save succeeds before it answers (a newer local write by the previous learner).
    const slowB = deferred<{ data: unknown }>();
    sessionQueue.push(() => slowB.promise);
    let switchRefresh: Promise<void> = Promise.resolve();
    act(() => {
      switchRefresh = student.refreshSession();
    });
    await act(async () => putA.resolve({ data: { ...profileOf(A), name: 'Amara Alpha Changed' } }));
    currentSession = B;
    await act(async () => {
      slowB.resolve({ data: B });
      await switchRefresh;
    });
    await waitFor(() => expect(student.studentName).toBe('Bimal Beta'));
    expect(student.grade).toBe('grade-10');
    expect(student.language).toBe('en');
    expect(document.body.textContent).not.toContain('Amara Alpha Changed');
    noTraceOfA();
  });

  it("a save of A that completes after B is confirmed (success or failure) changes nothing for B and shows no notice", async () => {
    for (const outcome of ['success', 'failure'] as const) {
      cleanup();
      localStorage.clear();
      localStorage.setItem('atlas_onboarding_completed', 'true');
      sessionQueue = [];
      profileQueue = [];
      await signInAsA();
      const putA = deferred<{ data: unknown }>();
      apiPut.mockReturnValueOnce(putA.promise);
      act(() => student.openProfileEditor(null));
      await screen.findByRole('dialog');
      fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'Amara Alpha Changed' } });
      fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
      await confirm(B);
      await waitFor(() => expect(student.studentName).toBe('Bimal Beta'));
      expect(screen.queryByRole('dialog')).toBeNull();
      await act(async () => {
        if (outcome === 'success') putA.resolve({ data: { ...profileOf(A), name: 'Amara Alpha Changed' } });
        else putA.reject(new Error('503'));
      });
      expect(student.studentName, outcome).toBe('Bimal Beta');
      expect(student.profileSaveNotice, outcome).toBeNull();
      expect(screen.queryByTestId('profile-save-notice'), outcome).toBeNull();
      expect(document.body.textContent, outcome).not.toContain('Amara Alpha Changed');
      noTraceOfA();
    }
  });

  it('a new sign-in (B) drops anything still in flight for A', async () => {
    await signInAsA();
    const putA = deferred<{ data: unknown }>();
    apiPut.mockReturnValueOnce(putA.promise);
    act(() => student.openProfileEditor(null));
    await screen.findByRole('dialog');
    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'Amara Alpha Changed' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    currentSession = B;
    act(() => student.signInStudent({ id: 'ATL-B-0002', displayName: 'Bimal Beta', grade: 'grade-10', language: 'en', studentId: 'ATL-B-0002' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    await act(async () => putA.resolve({ data: { ...profileOf(A), name: 'Amara Alpha Changed' } }));
    expect(student.studentName).toBe('Bimal Beta');
    expect(student.studentId).toBe('ATL-B-0002');
    expect(localStorage.getItem('atlas_student_session')).toContain('ATL-B-0002');
    noTraceOfA();
  });

  it('guest preferences are never derived from either learner', async () => {
    localStorage.setItem(GUEST_GRADE_KEY, 'grade-8');
    localStorage.setItem(GUEST_LANGUAGE_KEY, 'si');
    await signInAsA();
    await confirm(B);
    await waitFor(() => expect(student.studentName).toBe('Bimal Beta'));
    expect(localStorage.getItem(GUEST_GRADE_KEY)).toBe('grade-8');
    expect(localStorage.getItem(GUEST_LANGUAGE_KEY)).toBe('si');
    sessionQueue = [];
    await confirm({ authenticated: false, userId: null, email: null, displayName: null, accountId: null, accountType: null, activeLearner: null, learners: [] });
    expect(student.grade).toBe('grade-8');
    expect(student.language).toBe('si');
    expect(localStorage.getItem(GUEST_GRADE_KEY)).toBe('grade-8');
    expect(localStorage.getItem(GUEST_LANGUAGE_KEY)).toBe('si');
  });

  it('logout after a switch still clears everything', async () => {
    await signInAsA();
    await confirm(B);
    await waitFor(() => expect(student.studentName).toBe('Bimal Beta'));
    vi.spyOn(console, 'error').mockImplementation(() => {}); // jsdom: "Not implemented: navigation"
    await act(async () => {
      await student.logout();
    });
    expect(student.isAuthenticated).toBe(false);
    expect(student.studentId).toBeNull();
    expect(student.studentName).toBe('');
    for (const key of ['atlas_student_session', 'atlas_student_name', 'atlas_student_grade', 'atlas_learn_lang']) {
      expect(localStorage.getItem(key), key).toBeNull();
    }
  });
});

// ---------------------------------------------------------------------------------------------------------------
describe('save notice above a reopened editor', () => {
  async function lateFailureWithReopenedEditor() {
    currentSession = B;
    renderShell();
    await waitFor(() => expect(student.isAuthenticated).toBe(true));
    await waitFor(() => expect(student.studentName).toBe('Bimal Beta'));
    const put = deferred<{ data: unknown }>();
    apiPut.mockReturnValueOnce(put.promise);
    act(() => student.openProfileEditor(null));
    await screen.findByRole('dialog');
    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'Changed' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    act(() => routerNavigate('/subjects'));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    act(() => student.openProfileEditor(null));
    const dialog = await screen.findByRole('dialog');
    await act(async () => put.reject(new Error('503')));
    const notice = await screen.findByTestId('profile-save-notice');
    return { dialog, notice };
  }

  it('is stacked above the editor backdrop', async () => {
    const { notice } = await lateFailureWithReopenedEditor();
    const backdrop = screen.getByTestId('profile-editor-backdrop');
    expect(Number(notice.style.zIndex)).toBe(SAVE_NOTICE_Z_INDEX);
    expect(Number(backdrop.style.zIndex)).toBe(EDITOR_BACKDROP_Z_INDEX);
    expect(SAVE_NOTICE_Z_INDEX).toBeGreaterThan(EDITOR_BACKDROP_Z_INDEX);
    // Not inside the backdrop: a press on the notice can never be a backdrop press.
    expect(backdrop.contains(notice)).toBe(false);
    expect(notice.textContent).toContain(LATE_SAVE_FAILED_TEXT);
  });

  it('pressing or reading the notice does not close the editor; Dismiss removes only the notice', async () => {
    const { dialog, notice } = await lateFailureWithReopenedEditor();
    fireEvent.mouseDown(notice);
    fireEvent.click(notice);
    expect(screen.getByRole('dialog')).toBe(dialog);
    const dismiss = screen.getByRole('button', { name: 'Dismiss' });
    fireEvent.mouseDown(dismiss);
    act(() => dismiss.focus());
    expect(document.activeElement).toBe(dismiss); // focus is not pulled back into the editor
    fireEvent.click(dismiss);
    expect(screen.queryByTestId('profile-save-notice')).toBeNull();
    expect(screen.getByRole('dialog')).toBe(dialog); // the editor stays open
  });

  it('stays an announced live region outside the inert tree', async () => {
    const { notice } = await lateFailureWithReopenedEditor();
    expect(notice.getAttribute('role')).toBe('alert');
    expect(notice.closest('[inert]')).toBeNull();
    expect(notice.closest('[aria-hidden="true"]')).toBeNull();
  });
});
