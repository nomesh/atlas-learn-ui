import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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

import '../i18n';
import { tutorService } from '../api/tutorApi';
import { StudentProvider, useStudent, parseAllowedGrades } from '../state/studentContext';
import { AppShell } from '../components/layout/AppShell';
import { StudentHomePage } from '../features/home/StudentHomePage';
import { SubjectsPage } from '../features/subjects/SubjectsPage';
import { LATE_SAVE_FAILED_TEXT } from '../features/account/EditProfileModal';
import { buildLiveGreeting, buildRestartMessage } from '../features/tutor/liveTutorContent';

// ---------------------------------------------------------------------------------------------------------------
// API fixture: a signed-in, ACTIVE Grade 10 learner. Each endpoint can be made slow (deferred) or changed per test.

const learnerSession = (name: string) => ({
  authenticated: true,
  userId: 'u-1',
  email: null,
  displayName: name,
  accountId: 'a-1',
  studentId: 'ATL-26-009999',
  accountStatus: 'ACTIVE',
  registeredGrade: 'grade-10',
  accountType: 'INDEPENDENT_STUDENT',
  activeLearner: {
    id: 'p-1', displayName: name, grade: 'grade-10', curriculumCode: 'SL_NATIONAL',
    preferredLanguage: 'en', enrolledSubjects: [], isPrimary: true, status: 'ACTIVE',
  },
  learners: [],
});
const SIGNED_OUT = { authenticated: false, userId: null, email: null, displayName: null, accountId: null, accountType: null, activeLearner: null, learners: [] };
const profile = (over: Record<string, unknown> = {}) => ({
  id: 'p-1', name: 'Kasun Perera', grade: 'grade-10', language: 'en',
  // What the deployed backend returns today: fixed, fabricated metrics.
  streakDays: 5, topicsMastered: 14, questionsAnswered: 52, accuracyPercent: 94, badges: [], ...over,
});
const AVAILABILITY = {
  grade: 'grade-10',
  subjects: [
    { subjectCode: 'SCIENCE', subjectName: 'Science', languages: ['en'], indexedResources: 1, topics: 0, tutorScopeVerified: true, tutorAvailable: true, topicsAvailable: false },
    { subjectCode: 'MATHEMATICS', subjectName: 'Mathematics', languages: [], indexedResources: 0, topics: 0, tutorAvailable: false, topicsAvailable: false },
  ],
};

type Deferred<T> = { promise: Promise<T>; resolve: (v: T) => void; reject: (e: unknown) => void };
function deferred<T>(): Deferred<T> {
  let resolve!: (v: T) => void;
  let reject!: (e: unknown) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

type Fixture = {
  session?: () => Promise<{ data: unknown }>;
  profile?: () => Promise<{ data: unknown }>;
  allowedGrades?: unknown;
  availability?: unknown;
};
let fixture: Fixture = {};
function answerApi(f: Fixture = {}) {
  fixture = f;
  apiGet.mockImplementation((url: string) => {
    if (url === '/api/learn/auth/session') return fixture.session ? fixture.session() : Promise.resolve({ data: learnerSession('Kasun Perera') });
    if (url === '/api/learn/profile') return fixture.profile ? fixture.profile() : Promise.resolve({ data: profile() });
    if (url === '/api/learn/entitlements/allowed-grades') {
      return Promise.resolve({ data: { studentId: 'ATL-26-009999', accountType: 'STUDENT', defaultGrade: 'grade-10', allowedGrades: 'allowedGrades' in fixture ? fixture.allowedGrades : ['grade-10'] } });
    }
    if (url === '/api/learn/curriculum/availability') return Promise.resolve({ data: 'availability' in fixture ? fixture.availability : AVAILABILITY });
    if (url === '/api/learn/devices') return Promise.resolve({ data: [] });
    return Promise.reject(new Error(`unexpected GET ${url}`));
  });
}

let routerNavigate: ReturnType<typeof useNavigate> = () => {};
let student: ReturnType<typeof useStudent>;

const Probe: React.FC = () => {
  student = useStudent();
  routerNavigate = useNavigate();
  const location = useLocation();
  return (
    <div data-testid="probe" hidden>
      <span data-testid="probe-name">{student.studentName}</span>
      <span data-testid="probe-grade">{student.grade}</span>
      <span data-testid="probe-path">{location.pathname}</span>
    </div>
  );
};

/** The real application shell (Header, Footer, onboarding, editor, notices) around Home and Subjects. */
function renderShell(entries: string[] = ['/']) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <StudentProvider>
        <MemoryRouter initialEntries={entries}>
          <Probe />
          <Routes>
            <Route path="/" element={<AppShell />}>
              <Route index element={<StudentHomePage />} />
              <Route path="subjects" element={<SubjectsPage />} />
              <Route path="*" element={<div data-testid="other-route" />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </StudentProvider>
    </QueryClientProvider>,
  );
}

async function renderSignedIn(f: Fixture = {}, entries?: string[]) {
  answerApi(f);
  renderShell(entries);
  await waitFor(() => expect(screen.getByTestId('probe-name').textContent).toBe('Kasun Perera'));
  await waitFor(() => expect(apiGet).toHaveBeenCalledWith('/api/learn/entitlements/allowed-grades'));
}

/** Opens the editor through the real account menu, as a learner does. */
async function openViaAccountMenu() {
  const toggle = await screen.findByTestId('account-menu-toggle');
  fireEvent.click(toggle);
  fireEvent.click(await screen.findByRole('button', { name: 'Edit Profile' }));
  const dialog = await screen.findByRole('dialog', { name: 'Edit profile' });
  await waitFor(() => expect(document.activeElement).toBe(screen.getByLabelText('Display name')));
  return { toggle, dialog };
}

/** Opens through the context (used where the account menu is not the subject of the test). */
async function openDirect() {
  act(() => student.openProfileEditor(null));
  const dialog = await screen.findByRole('dialog', { name: 'Edit profile' });
  await waitFor(() => expect(document.activeElement).toBe(screen.getByLabelText('Display name')));
  return dialog;
}

const backgroundRoots = () => Array.from(document.body.children).filter((el) => !el.hasAttribute('data-profile-editor-portal'));
const blurToBody = () => act(() => (document.activeElement as HTMLElement | null)?.blur());

beforeEach(() => {
  tutorService.setMockMode(false);
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem('atlas_onboarding_completed', 'true');
  apiGet.mockReset();
  apiPut.mockReset();
  apiPost.mockReset();
  document.body.style.overflow = '';
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------------------------------------------
describe('focus restoration with the real Header and AppShell', () => {
  const closeWays: [string, () => void][] = [
    ['Escape', () => fireEvent.keyDown(document, { key: 'Escape' })],
    ['Close', () => fireEvent.click(screen.getByRole('button', { name: 'Close' }))],
    ['Cancel', () => fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))],
    ['backdrop', () => fireEvent.mouseDown(screen.getByTestId('profile-editor-backdrop'))],
  ];
  for (const [how, doClose] of closeWays) {
    it(`returns focus to the account-menu toggle after ${how} (the Edit Profile item no longer exists)`, async () => {
      await renderSignedIn();
      const { toggle } = await openViaAccountMenu();
      expect(screen.queryByRole('button', { name: 'Edit Profile', hidden: true })).toBeNull(); // menu item unmounted
      doClose();
      expect(screen.queryByRole('dialog')).toBeNull();
      await waitFor(() => expect(document.activeElement).toBe(toggle));
    });
  }

  it('handles a fallback target that was unmounted meanwhile', async () => {
    await renderSignedIn();
    const gone = document.createElement('button');
    document.body.appendChild(gone);
    act(() => student.openProfileEditor(gone));
    await screen.findByRole('dialog');
    gone.remove();
    expect(() => fireEvent.keyDown(document, { key: 'Escape' })).not.toThrow();
    expect(screen.queryByRole('dialog')).toBeNull();
    await new Promise((r) => setTimeout(r, 10));
    expect(document.activeElement).not.toBe(gone);
  });
});

// ---------------------------------------------------------------------------------------------------------------
describe('document-level keyboard handling', () => {
  it('Escape closes even after clicking non-focusable dialog content', async () => {
    await renderSignedIn();
    const dialog = await openDirect();
    fireEvent.mouseDown(screen.getByText('Edit profile'));
    blurToBody();
    expect(document.activeElement).toBe(document.body);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(dialog.isConnected).toBe(false);
  });

  it('Tab and Shift+Tab stay in the dialog after clicking its whitespace', async () => {
    await renderSignedIn();
    await openDirect();
    const close = screen.getByRole('button', { name: 'Close' });
    const cancel = screen.getByRole('button', { name: 'Cancel' }); // Save is disabled: Cancel is the last control
    blurToBody();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(close);
    blurToBody();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(cancel);
    // Wrapping at both ends.
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(close);
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(cancel);
  });

  it('focus moved to the background is pulled back into the dialog', async () => {
    await renderSignedIn();
    await openDirect();
    const background = screen.getByTestId('account-menu-toggle');
    act(() => background.focus());
    expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true);
  });
});

// ---------------------------------------------------------------------------------------------------------------
describe('listeners, inert background and scroll lock are cleaned up on every close path', () => {
  const closeWays: [string, () => void][] = [
    ['Close', () => fireEvent.click(screen.getByRole('button', { name: 'Close' }))],
    ['Cancel', () => fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))],
    ['Escape', () => fireEvent.keyDown(document, { key: 'Escape' })],
    ['backdrop', () => fireEvent.mouseDown(screen.getByTestId('profile-editor-backdrop'))],
    ['route change', () => act(() => routerNavigate('/subjects'))],
    ['browser Back', () => act(() => routerNavigate(-1))],
  ];
  for (const [how, doClose] of closeWays) {
    it(`after ${how}`, async () => {
      await renderSignedIn({}, ['/subjects', '/']);
      const added: string[] = [];
      const removed: string[] = [];
      const add = document.addEventListener.bind(document);
      const remove = document.removeEventListener.bind(document);
      vi.spyOn(document, 'addEventListener').mockImplementation((type: string, l: EventListenerOrEventListenerObject, o?: boolean | AddEventListenerOptions) => {
        if (type === 'keydown' || type === 'focusin') added.push(type);
        add(type, l, o);
      });
      vi.spyOn(document, 'removeEventListener').mockImplementation((type: string, l: EventListenerOrEventListenerObject, o?: boolean | EventListenerOptions) => {
        if (type === 'keydown' || type === 'focusin') removed.push(type);
        remove(type, l, o);
      });
      document.body.style.overflow = 'auto';

      await openDirect();
      expect(document.body.style.overflow).toBe('hidden');
      for (const el of backgroundRoots()) {
        expect(el.hasAttribute('inert')).toBe(true);
        expect(el.getAttribute('aria-hidden')).toBe('true');
      }
      expect(added.sort()).toEqual(['focusin', 'keydown']);

      doClose();
      await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
      expect(document.body.style.overflow).toBe('auto');
      expect(document.querySelectorAll('[inert]').length).toBe(0);
      for (const el of backgroundRoots()) expect(el.hasAttribute('aria-hidden')).toBe(false);
      expect(removed.sort()).toEqual(['focusin', 'keydown']);
      // A stray Escape after closing does nothing.
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  }
});

// ---------------------------------------------------------------------------------------------------------------
describe('stale and overlapping requests', () => {
  it('loads entitlements and profile concurrently', async () => {
    const slowProfile = deferred<{ data: unknown }>();
    answerApi({ profile: () => slowProfile.promise });
    renderShell();
    await waitFor(() => expect(apiGet).toHaveBeenCalledWith('/api/learn/profile'));
    expect(apiGet).toHaveBeenCalledWith('/api/learn/entitlements/allowed-grades');
    slowProfile.resolve({ data: profile() });
  });

  it('a slow initial profile response never overwrites a newer successful save', async () => {
    const slowProfile = deferred<{ data: unknown }>();
    answerApi({ profile: () => slowProfile.promise });
    renderShell();
    await waitFor(() => expect(screen.getByTestId('probe-name').textContent).toBe('Kasun Perera')); // from the session
    apiPut.mockResolvedValue({ data: profile({ name: 'Kasun New' }) });
    await openDirect();
    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'Kasun New' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(screen.getByTestId('probe-name').textContent).toBe('Kasun New');
    await act(async () => slowProfile.resolve({ data: profile({ name: 'Kasun Perera' }) }));
    expect(screen.getByTestId('probe-name').textContent).toBe('Kasun New');
    expect(localStorage.getItem('atlas_student_name')).toBe('Kasun New');
  });

  it('two overlapping saves resolving out of order keep the newer one', async () => {
    await renderSignedIn();
    const first = deferred<{ data: unknown }>();
    const second = deferred<{ data: unknown }>();
    apiPut.mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);

    await openDirect();
    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'First Name' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    act(() => routerNavigate('/subjects')); // route change during the save closes the editor
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());

    await openDirect();
    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'Second Name' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    await act(async () => second.resolve({ data: profile({ name: 'Second Name' }) }));
    await waitFor(() => expect(screen.getByTestId('probe-name').textContent).toBe('Second Name'));
    await act(async () => first.resolve({ data: profile({ name: 'First Name' }) }));
    expect(screen.getByTestId('probe-name').textContent).toBe('Second Name');
    expect(localStorage.getItem('atlas_student_name')).toBe('Second Name');
  });

  it('a save that succeeds after close-and-reopen never closes the reopened editor', async () => {
    await renderSignedIn();
    const pending = deferred<{ data: unknown }>();
    apiPut.mockReturnValueOnce(pending.promise);
    await openDirect();
    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'First Name' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    act(() => routerNavigate('/subjects'));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    await openDirect();
    await act(async () => pending.resolve({ data: profile({ name: 'First Name' }) }));
    expect(screen.getByRole('dialog')).toBeTruthy(); // the reopened editor stays open
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByTestId('probe-name').textContent).toBe('First Name'); // the accepted save is applied
  });

  it('a save that fails after close-and-reopen shows a notice and changes nothing', async () => {
    await renderSignedIn();
    const pending = deferred<{ data: unknown }>();
    apiPut.mockReturnValueOnce(pending.promise);
    const before = { name: localStorage.getItem('atlas_student_name'), grade: localStorage.getItem('atlas_student_grade') };
    await openDirect();
    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'First Name' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    act(() => routerNavigate('/subjects'));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    await openDirect();
    await act(async () => pending.reject(new Error('503')));
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByRole('dialog').querySelector('[role="alert"]')).toBeNull(); // the newer editor is not blamed
    expect((await screen.findByTestId('profile-save-notice', {}, { timeout: 2000 })).textContent).toContain(LATE_SAVE_FAILED_TEXT);
    expect(screen.getByTestId('probe-name').textContent).toBe('Kasun Perera');
    expect({ name: localStorage.getItem('atlas_student_name'), grade: localStorage.getItem('atlas_student_grade') }).toEqual(before);
  });
});

// ---------------------------------------------------------------------------------------------------------------
describe('no cross-user identity', () => {
  const plantPreviousLearner = () => {
    localStorage.setItem('atlas_student_session', JSON.stringify({ id: 'stu-prev', displayName: 'Previous Learner', grade: 'grade-11', language: 'si' }));
    localStorage.setItem('atlas_student_name', 'Previous Learner');
    localStorage.setItem('atlas_student_grade', 'grade-11');
    localStorage.setItem('atlas_learn_lang', 'si');
  };

  it('logout clears every cached learner value', async () => {
    await renderSignedIn();
    apiPost.mockResolvedValue({ data: { status: 'ok' } });
    vi.spyOn(console, 'error').mockImplementation(() => {}); // jsdom: "Not implemented: navigation"
    await act(async () => {
      await student.logout();
    });
    for (const key of ['atlas_student_session', 'atlas_student_name', 'atlas_student_grade', 'atlas_learn_lang']) {
      expect(localStorage.getItem(key), key).toBeNull();
    }
    expect(screen.getByTestId('probe-name').textContent).toBe('');
    expect(student.isAuthenticated).toBe(false);
    expect(student.allowedGrades).toBeNull();
  });

  it("another learner's first paint shows no previous identity before the session is confirmed", async () => {
    plantPreviousLearner();
    answerApi({ session: () => new Promise(() => {}) }); // the new learner's session is not confirmed yet
    renderShell();
    expect(document.body.textContent).not.toContain('Previous Learner');
    expect(screen.getByTestId('probe-name').textContent).toBe('');
    expect(screen.getByTestId('probe-grade').textContent).toBe('grade-10');
    expect(screen.queryByTestId('account-menu-toggle')).toBeNull(); // not presented as signed in
    // No identity anywhere in the context either.
    expect(student.isAuthenticated).toBe(false);
    expect(student.currentUser).toBeNull();
    expect(student.studentId).toBeNull();
    expect(student.activeLearner).toBeNull();
    expect(student.learners).toEqual([]);
    // A no-name greeting (the device's language preference may still apply until the session check clears it).
    expect(['Welcome back! 👋', 'නැවතත් සාදරයෙන් පිළිගනිමු! 👋', 'மீண்டும் வருக! 👋']).toContain(
      screen.getByTestId('live-home-greeting').textContent,
    );
    expect(screen.getByTestId('live-home-grade').textContent).toBe('GRADE 10');
  });

  it('an unauthenticated (expired, reset) session clears all learner state', async () => {
    await renderSignedIn({ allowedGrades: ['grade-8', 'grade-10'] });
    expect(student.allowedGrades).toEqual(['grade-8', 'grade-10']);
    await openDirect();
    fixture.session = () => Promise.resolve({ data: SIGNED_OUT });
    await act(async () => {
      await student.refreshSession();
    });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByTestId('probe-name').textContent).toBe('');
    expect(screen.getByTestId('probe-grade').textContent).toBe('grade-10');
    expect(student.isAuthenticated).toBe(false);
    expect(student.allowedGrades).toBeNull();
    expect(student.streakDays).toBe(0);
    for (const key of ['atlas_student_session', 'atlas_student_name', 'atlas_student_grade', 'atlas_learn_lang']) {
      expect(localStorage.getItem(key), key).toBeNull();
    }
    expect(document.body.textContent).not.toContain('Kasun Perera');
  });

  it('a failed session request also leaves no learner identity', async () => {
    await renderSignedIn();
    fixture.session = () => Promise.reject(new Error('network'));
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    await act(async () => {
      await student.refreshSession();
    });
    expect(screen.getByTestId('probe-name').textContent).toBe('');
    expect(localStorage.getItem('atlas_student_name')).toBeNull();
  });

  it('the legacy Nimali → Amila migration does not run in LIVE', async () => {
    localStorage.setItem('atlas_student_name', 'Nimali');
    answerApi({ session: () => new Promise(() => {}) });
    renderShell();
    expect(localStorage.getItem('atlas_student_name')).toBe('Nimali'); // untouched, and never displayed
    expect(document.body.textContent).not.toMatch(/Amila|Nimali/);
  });
});

describe('empty-name Tutor text is grammatical', () => {
  it('greets without a name', () => {
    for (const lang of ['en', 'si', 'ta'] as const) {
      const msg = buildLiveGreeting('science', '', lang, '', 'grade-10');
      for (const text of Object.values(msg.languageVersions ?? {})) {
        expect(text).not.toMatch(/\s!|\s,|,\s*\?|^\s*[!,]/);
      }
    }
    expect(buildLiveGreeting('science', '', 'en', '', 'grade-10').content.startsWith('Ayubowan! I am your')).toBe(true);
    expect(buildLiveGreeting('science', '', 'en', 'Kasun', 'grade-10').content.startsWith('Ayubowan Kasun! I am your')).toBe(true);
  });

  it('restarts without a name', () => {
    for (const lang of ['en', 'si', 'ta'] as const) {
      const text = buildRestartMessage(lang, '');
      expect(text).not.toMatch(/\s!|\s,|,\s*\?|\.\s*,/);
    }
    expect(buildRestartMessage('en', '')).toBe('Conversation restarted. What would you like to learn next?');
    expect(buildRestartMessage('en', ' Kasun ')).toBe('Conversation restarted. What would you like to learn next, Kasun?');
  });
});

// ---------------------------------------------------------------------------------------------------------------
describe('entitlements fail closed', () => {
  it('parses only an array of entitled grade ids, deduplicated', () => {
    const parse = (allowedGrades: unknown) => parseAllowedGrades({ studentId: 's', accountType: 'DEMO', defaultGrade: null, allowedGrades } as never);
    expect(parse(['grade-10', 'grade-10'])).toEqual(['grade-10']);
    expect(parse(['grade-8', 'grade-10', 'grade-8'])).toEqual(['grade-8', 'grade-10']);
    expect(parse('grade-10')).toBeNull();
    expect(parse(null)).toBeNull();
    expect(parse({ 0: 'grade-10' })).toBeNull();
    expect(parse([])).toBeNull();
    expect(parse(['grade-5', 'grade-14', '10', 'GRADE-10', ' grade-10', 10, null])).toBeNull();
    expect(parseAllowedGrades(null)).toBeNull();
    expect(parseAllowedGrades(undefined)).toBeNull();
  });

  const readOnlyCases: [string, unknown][] = [
    ['duplicates of one grade', ['grade-10', 'grade-10']],
    ['a string instead of a list', 'grade-10'],
    ['null', null],
    ['out-of-range values', ['grade-5', 'grade-14', 'grade-99']],
  ];
  for (const [name, allowedGrades] of readOnlyCases) {
    it(`shows the grade read-only for ${name}`, async () => {
      await renderSignedIn({ allowedGrades });
      await openDirect();
      expect(screen.getByTestId('profile-grade-readonly')).toBeTruthy();
      expect(screen.queryByRole('group', { name: 'Entitled grades' })).toBeNull();
    });
  }

  it('never re-sends an unentitled stored grade with a name change', async () => {
    await renderSignedIn({ profile: () => Promise.resolve({ data: profile({ grade: 'grade-11' }) }) });
    await waitFor(() => expect(screen.getByTestId('probe-grade').textContent).toBe('grade-11'));
    apiPut.mockResolvedValue({ data: profile({ name: 'Kasun P', grade: 'grade-11' }) });
    await openDirect();
    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'Kasun P' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    await waitFor(() => expect(apiPut).toHaveBeenCalled());
    expect(apiPut).toHaveBeenCalledWith('/api/learn/profile', { name: 'Kasun P' });
  });

  it('a language change sends only the language', async () => {
    await renderSignedIn({ allowedGrades: ['grade-8', 'grade-10'] });
    apiPut.mockResolvedValue({ data: profile({ language: 'si' }) });
    await openDirect();
    fireEvent.click(screen.getByRole('button', { name: /සිංහල/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(apiPut).toHaveBeenCalledWith('/api/learn/profile', { language: 'si' });
    expect(screen.getByTestId('probe-grade').textContent).toBe('grade-10');
  });
});

// ---------------------------------------------------------------------------------------------------------------
describe('LIVE Home and Header integrity', () => {
  it('a malformed availability payload shows a safe error, not a crash or an empty catalogue', async () => {
    await renderSignedIn({ availability: { grade: 'grade-10', subjects: 'not-a-list' } });
    const summary = await screen.findByTestId('live-home-subject-summary');
    await waitFor(() => expect(summary.textContent).toContain('could not be loaded'));
    expect(summary.textContent).not.toContain('No subjects are available');
  });

  it('invalid subject entries are dropped, valid ones still shown', async () => {
    await renderSignedIn({
      availability: { grade: 'grade-10', subjects: [null, 7, { subjectCode: 5 }, { subjectName: 'No code' }, AVAILABILITY.subjects[0]] },
    });
    await waitFor(() => expect(screen.getByTestId('summary-textbook-only').textContent).toBe('1'));
    expect(screen.getByTestId('summary-not-yet').textContent).toBe('0');
    expect(screen.getByTestId('live-home-subject-SCIENCE')).toBeTruthy();
  });

  it('the LIVE header shows no streak or other backend progress figures', async () => {
    await renderSignedIn(); // the profile API returns streakDays 5, topicsMastered 14, accuracy 94
    await waitFor(() => expect(apiGet).toHaveBeenCalledWith('/api/learn/profile'));
    await screen.findByTestId('account-menu-toggle');
    const header = document.querySelector('header') ?? document.body;
    expect(header.querySelector('[title="Consecutive Learning Days"]')).toBeNull();
    expect(header.textContent).not.toMatch(/\b5d\b|\b14\b|\b52\b|94\s?%/);
    expect(student.streakDays).toBe(0);
    expect(student.topicsMastered).toBe(0);
    expect(student.questionsAnswered).toBe(0);
    expect(student.accuracyPercent).toBe(0);
  });
});
