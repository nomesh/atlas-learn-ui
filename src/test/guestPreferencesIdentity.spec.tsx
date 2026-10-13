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
import { GUEST_GRADE_KEY, GUEST_LANGUAGE_KEY, initialLanguage, LEARNER_DATA_KEYS } from '../state/devicePreferences';
import { learnerDisplayName, learnerInitial, STUDENT_FALLBACK } from '../state/learnerDisplay';
import { AppShell } from '../components/layout/AppShell';
import { StudentHomePage } from '../features/home/StudentHomePage';
import { SubjectsPage } from '../features/subjects/SubjectsPage';
import { LATE_SAVE_FAILED_TEXT } from '../features/account/EditProfileModal';
import { buildLiveGreeting } from '../features/tutor/liveTutorContent';

// ---------------------------------------------------------------------------------------------------------------
const learnerSession = (userId: string, name: string, grade = 'grade-10', language = 'en') => ({
  authenticated: true, userId, email: null, displayName: name, accountId: `a-${userId}`, studentId: `ATL-${userId}`,
  accountStatus: 'ACTIVE', registeredGrade: grade, accountType: 'INDEPENDENT_STUDENT',
  activeLearner: { id: `p-${userId}`, displayName: name, grade, curriculumCode: 'SL_NATIONAL', preferredLanguage: language, enrolledSubjects: [], isPrimary: true, status: 'ACTIVE' },
  learners: [],
});
const SIGNED_OUT = { authenticated: false, userId: null, email: null, displayName: null, accountId: null, accountType: null, activeLearner: null, learners: [] };
const profileOf = (name: string, grade = 'grade-10', language = 'en') => ({
  id: 'p', name, grade, language, streakDays: 5, topicsMastered: 14, questionsAnswered: 52, accuracyPercent: 94, badges: [],
});
const AVAILABILITY = { grade: 'grade-10', subjects: [] as unknown[] };

let sessionData: unknown = SIGNED_OUT;
let profileData: unknown = profileOf('Kasun Perera');
let allowedGrades: unknown = ['grade-10'];
function answerApi() {
  apiGet.mockImplementation((url: string) => {
    if (url === '/api/learn/auth/session') return Promise.resolve({ data: sessionData });
    if (url === '/api/learn/profile') return Promise.resolve({ data: profileData });
    if (url === '/api/learn/entitlements/allowed-grades') return Promise.resolve({ data: { studentId: 's', accountType: 'STUDENT', defaultGrade: 'grade-10', allowedGrades } });
    if (url === '/api/learn/curriculum/availability') return Promise.resolve({ data: AVAILABILITY });
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

/** Renders and waits until the session check finished (signed in or not). */
async function renderAndSettle() {
  renderShell();
  await waitFor(() => expect(apiGet).toHaveBeenCalledWith('/api/learn/auth/session'));
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
}
async function signedIn(userId = 'u-1', name = 'Kasun Perera', grade = 'grade-10', language = 'en') {
  sessionData = learnerSession(userId, name, grade, language);
  profileData = profileOf(name, grade, language);
  await renderAndSettle();
  await waitFor(() => expect(student.isAuthenticated).toBe(true));
  await waitFor(() => expect(apiGet).toHaveBeenCalledWith('/api/learn/profile'));
}
/** A browser reload: unmount and mount the application again on the same storage. */
async function reload() {
  cleanup();
  apiGet.mockClear();
  await renderAndSettle();
}
const learnerKeys = () => Object.fromEntries(LEARNER_DATA_KEYS.map((k) => [k, localStorage.getItem(k)]));
const noLearnerKeys = () => Object.fromEntries(LEARNER_DATA_KEYS.map((k) => [k, null]));

beforeEach(async () => {
  tutorService.setMockMode(false);
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem('atlas_onboarding_completed', 'true');
  apiGet.mockReset();
  apiPut.mockReset();
  apiPost.mockReset();
  sessionData = SIGNED_OUT;
  profileData = profileOf('Kasun Perera');
  allowedGrades = ['grade-10'];
  answerApi();
  await i18n.changeLanguage('en');
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------------------------------------------
describe('guest device preferences', () => {
  it('a guest choosing Sinhala and a grade in the header keeps both across an unauthenticated reload', async () => {
    await renderAndSettle();
    fireEvent.click(screen.getByTitle('Change Language'));
    fireEvent.click(screen.getByRole('button', { name: /සිංහල/ }));
    fireEvent.click(screen.getByTitle('Change Grade'));
    fireEvent.click(screen.getByRole('button', { name: 'Grade 10 (O/L)' }));
    expect(localStorage.getItem(GUEST_LANGUAGE_KEY)).toBe('si');
    expect(localStorage.getItem(GUEST_GRADE_KEY)).toBe('grade-10');
    expect(learnerKeys()).toEqual(noLearnerKeys()); // a guest's choices are not learner data

    await reload();
    expect(student.isAuthenticated).toBe(false);
    expect(student.language).toBe('si');
    expect(i18n.language).toBe('si');
    expect(student.grade).toBe('grade-10');
    expect(localStorage.getItem(GUEST_LANGUAGE_KEY)).toBe('si');
    expect(localStorage.getItem(GUEST_GRADE_KEY)).toBe('grade-10');
  });

  it('the first paint, before the session check answers, already uses the guest preferences', async () => {
    localStorage.setItem(GUEST_LANGUAGE_KEY, 'si');
    localStorage.setItem(GUEST_GRADE_KEY, 'grade-8');
    apiGet.mockImplementation(() => new Promise(() => {})); // session check never answers
    renderShell();
    expect(student.language).toBe('si');
    expect(student.grade).toBe('grade-8');
    expect(screen.getByTestId('live-home-grade').textContent).toBe('GRADE 8');
  });

  it('a non-default guest grade (Grade 8) also survives the reload', async () => {
    await renderAndSettle();
    fireEvent.click(screen.getByTitle('Change Grade'));
    fireEvent.click(screen.getByRole('button', { name: 'Grade 8' }));
    await reload();
    expect(student.grade).toBe('grade-8');
    expect(screen.getByTestId('live-home-grade').textContent).toBe('GRADE 8');
  });

  it("the confirmed learner's grade overrides the guest grade, without changing the guest preference", async () => {
    localStorage.setItem(GUEST_GRADE_KEY, 'grade-8');
    localStorage.setItem(GUEST_LANGUAGE_KEY, 'si');
    await signedIn('u-1', 'Kasun Perera', 'grade-10', 'en');
    await waitFor(() => expect(student.grade).toBe('grade-10'));
    expect(student.language).toBe('en');
    expect(student.allowedGrades).toEqual(['grade-10']);
    expect(localStorage.getItem(GUEST_GRADE_KEY)).toBe('grade-8');
    expect(localStorage.getItem(GUEST_LANGUAGE_KEY)).toBe('si');
  });

  const endings: [string, () => Promise<void>][] = [
    ['logout', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {}); // jsdom: "Not implemented: navigation"
      await act(async () => {
        await student.logout();
      });
    }],
    ['session expiry', async () => {
      sessionData = SIGNED_OUT;
      await act(async () => {
        await student.refreshSession();
      });
    }],
    ['device reset (server session revoked)', async () => {
      sessionData = { ...SIGNED_OUT };
      await act(async () => {
        await student.refreshSession();
      });
    }],
  ];
  for (const [how, end] of endings) {
    it(`${how} clears the learner but keeps the device's guest preferences and restores them in memory`, async () => {
      localStorage.setItem(GUEST_GRADE_KEY, 'grade-9');
      localStorage.setItem(GUEST_LANGUAGE_KEY, 'en');
      await signedIn('u-1', 'Tamil Learner', 'grade-11', 'ta');
      await waitFor(() => expect(student.language).toBe('ta'));
      expect(localStorage.getItem('atlas_learn_lang')).toBe('ta');
      await end();
      expect(learnerKeys()).toEqual(noLearnerKeys());
      expect(localStorage.getItem(GUEST_GRADE_KEY)).toBe('grade-9'); // not the learner's grade-11
      expect(localStorage.getItem(GUEST_LANGUAGE_KEY)).toBe('en'); // not the learner's ta
      expect(student.grade).toBe('grade-9');
      expect(student.language).toBe('en');
      expect(i18n.language).toBe('en');
      expect(student.studentName).toBe('');
      expect(document.body.textContent).not.toContain('Tamil Learner');
    });
  }

  it("a learner's data never becomes a guest preference when no guest preference existed", async () => {
    await signedIn('u-1', 'Tamil Learner', 'grade-11', 'ta');
    sessionData = SIGNED_OUT;
    await act(async () => {
      await student.refreshSession();
    });
    expect(localStorage.getItem(GUEST_GRADE_KEY)).toBeNull();
    expect(localStorage.getItem(GUEST_LANGUAGE_KEY)).toBeNull();
    expect(student.grade).toBe('grade-10');
    expect(student.language).toBe('en');
    await reload();
    expect(student.grade).toBe('grade-10');
    expect(student.language).toBe('en');
  });
});

// ---------------------------------------------------------------------------------------------------------------
describe('legacy key migration', () => {
  it('pre-split values on a device without a cached learner become guest preferences', async () => {
    localStorage.setItem('atlas_learn_lang', 'si');
    localStorage.setItem('atlas_student_grade', 'grade-8');
    expect(initialLanguage()).toBe('si');
    await renderAndSettle();
    expect(localStorage.getItem(GUEST_LANGUAGE_KEY)).toBe('si');
    expect(localStorage.getItem(GUEST_GRADE_KEY)).toBe('grade-8');
    expect(localStorage.getItem('atlas_learn_lang')).toBeNull();
    expect(localStorage.getItem('atlas_student_grade')).toBeNull();
    expect(student.language).toBe('si');
    expect(student.grade).toBe('grade-8');
  });

  it("pre-split values next to a cached learner never restore that learner or become guest preferences", async () => {
    localStorage.setItem('atlas_student_session', JSON.stringify({ id: 'stu-prev', displayName: 'Previous Learner', grade: 'grade-11', language: 'ta' }));
    localStorage.setItem('atlas_student_name', 'Previous Learner');
    localStorage.setItem('atlas_student_grade', 'grade-11');
    localStorage.setItem('atlas_learn_lang', 'ta');
    renderShell();
    // First paint: no previous identity or grade.
    expect(document.body.textContent).not.toContain('Previous Learner');
    expect(student.studentName).toBe('');
    expect(student.grade).toBe('grade-10');
    await waitFor(() => expect(learnerKeys()).toEqual(noLearnerKeys()));
    expect(localStorage.getItem(GUEST_GRADE_KEY)).toBeNull();
    expect(localStorage.getItem(GUEST_LANGUAGE_KEY)).toBeNull();
    expect(student.isAuthenticated).toBe(false);
    expect(student.grade).toBe('grade-10');
    expect(student.language).toBe('en');
    await reload();
    expect(student.studentName).toBe('');
    expect(student.grade).toBe('grade-10');
    expect(student.language).toBe('en');
  });

  it('first-paint language: a cached learner uses its own cached language, otherwise the guest preference', () => {
    localStorage.setItem(GUEST_LANGUAGE_KEY, 'si');
    expect(initialLanguage()).toBe('si');
    localStorage.setItem('atlas_student_name', 'Cached Learner');
    localStorage.setItem('atlas_learn_lang', 'ta');
    expect(initialLanguage()).toBe('ta');
    localStorage.removeItem('atlas_learn_lang');
    expect(initialLanguage()).toBe('si');
    localStorage.clear();
    expect(initialLanguage()).toBe('en');
  });

  it('invalid legacy values are discarded, not migrated', async () => {
    localStorage.setItem('atlas_learn_lang', 'xx');
    localStorage.setItem('atlas_student_grade', 'grade-99');
    await renderAndSettle();
    expect(localStorage.getItem(GUEST_LANGUAGE_KEY)).toBeNull();
    expect(localStorage.getItem(GUEST_GRADE_KEY)).toBeNull();
    expect(student.grade).toBe('grade-10');
  });
});

// ---------------------------------------------------------------------------------------------------------------
describe('profile save notice is scoped to one learner session', () => {
  const transitions: [string, () => Promise<void>][] = [
    ['logout', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      await act(async () => {
        await student.logout();
      });
    }],
    ['expiry', async () => {
      sessionData = SIGNED_OUT;
      await act(async () => {
        await student.refreshSession();
      });
    }],
    ['learner switch', async () => {
      sessionData = learnerSession('u-2', 'Other Learner');
      profileData = profileOf('Other Learner');
      await act(async () => {
        await student.refreshSession();
      });
      await waitFor(() => expect(student.studentName).toBe('Other Learner'));
    }],
  ];
  for (const [how, transition] of transitions) {
    it(`is cleared on ${how}`, async () => {
      await signedIn();
      act(() => student.setProfileSaveNotice(LATE_SAVE_FAILED_TEXT));
      expect(await screen.findByTestId('profile-save-notice')).toBeTruthy();
      await transition();
      expect(student.profileSaveNotice).toBeNull();
      expect(screen.queryByTestId('profile-save-notice')).toBeNull();
    });
  }

  it('a save of the previous learner that fails after a learner switch is reported to nobody', async () => {
    await signedIn();
    let rejectPut: (e: unknown) => void = () => {};
    apiPut.mockReturnValueOnce(new Promise((_, rej) => { rejectPut = rej; }));
    act(() => student.openProfileEditor(null));
    await screen.findByRole('dialog');
    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'Changed' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    sessionData = learnerSession('u-2', 'Other Learner');
    profileData = profileOf('Other Learner');
    await act(async () => {
      await student.refreshSession();
    });
    expect(screen.queryByRole('dialog')).toBeNull();
    await act(async () => rejectPut(new Error('503')));
    expect(student.profileSaveNotice).toBeNull();
    expect(screen.queryByTestId('profile-save-notice')).toBeNull();
    expect(student.studentName).toBe('Other Learner');
  });

  it('a late failure notice is announced outside the inert tree while a reopened editor is open', async () => {
    await signedIn();
    let rejectPut: (e: unknown) => void = () => {};
    apiPut.mockReturnValueOnce(new Promise((_, rej) => { rejectPut = rej; }));
    act(() => student.openProfileEditor(null));
    await screen.findByRole('dialog');
    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'Changed' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    act(() => routerNavigate('/subjects'));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    act(() => student.openProfileEditor(null));
    const dialog = await screen.findByRole('dialog');
    await act(async () => rejectPut(new Error('503')));
    const notice = await screen.findByTestId('profile-save-notice');
    expect(notice.getAttribute('role')).toBe('alert');
    expect(notice.closest('[inert]')).toBeNull();
    expect(notice.closest('[aria-hidden="true"]')).toBeNull();
    expect(dialog.contains(notice)).toBe(false);
    expect(screen.getByRole('dialog')).toBe(dialog); // the reopened editor stays open
    // Its own top-level region, not inside the application tree that the editor makes inert.
    expect(notice.parentElement?.hasAttribute('data-profile-save-notice-portal')).toBe(true);
    expect(notice.parentElement?.parentElement).toBe(document.body);
  });
});

// ---------------------------------------------------------------------------------------------------------------
describe('a notice that exists before the editor opens', () => {
  it('stays outside the inert background', async () => {
    await signedIn();
    act(() => student.setProfileSaveNotice(LATE_SAVE_FAILED_TEXT));
    const notice = await screen.findByTestId('profile-save-notice');
    act(() => student.openProfileEditor(null));
    await screen.findByRole('dialog');
    expect(notice.closest('[inert]')).toBeNull();
    expect(notice.closest('[aria-hidden="true"]')).toBeNull();
    expect(document.querySelector('[inert]')).not.toBeNull(); // the application tree itself is inert
  });
});

describe('every editor close path advances the editor session', () => {
  const closes: [string, () => Promise<void> | void][] = [
    ['Close', () => fireEvent.click(screen.getByRole('button', { name: 'Close' }))],
    ['Cancel', () => fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))],
    ['Escape', () => fireEvent.keyDown(document, { key: 'Escape' })],
    ['backdrop', () => fireEvent.mouseDown(screen.getByTestId('profile-editor-backdrop'))],
    ['route change', () => act(() => routerNavigate('/subjects'))],
    ['legacy setIsProfileEditorOpen(false)', () => act(() => student.setIsProfileEditorOpen(false))],
    ['expiry', async () => {
      sessionData = SIGNED_OUT;
      await act(async () => {
        await student.refreshSession();
      });
    }],
    ['logout', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      await act(async () => {
        await student.logout();
      });
    }],
    ['learner switch', async () => {
      sessionData = learnerSession('u-2', 'Other Learner');
      await act(async () => {
        await student.refreshSession();
      });
    }],
  ];
  for (const [how, doClose] of closes) {
    it(`advances on ${how}`, async () => {
      await signedIn();
      const beforeOpen = student.profileEditorSessionRef.current;
      act(() => student.openProfileEditor(null));
      await screen.findByRole('dialog');
      const opened = student.profileEditorSessionRef.current;
      expect(opened).toBeGreaterThan(beforeOpen);
      await doClose();
      await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
      expect(student.profileEditorSessionRef.current).toBeGreaterThan(opened);
    });
  }
});

// ---------------------------------------------------------------------------------------------------------------
describe('nameless signed-in learner', () => {
  it('Header shows a localized generic label and a generic avatar', async () => {
    await signedIn('u-1', '');
    profileData = profileOf('');
    const name = await screen.findByTestId('account-name');
    expect(name.textContent).toBe('Student');
    const avatar = screen.getByTestId('account-avatar');
    expect(avatar.textContent).toBe('');
    expect(avatar.querySelector('svg')).toBeTruthy();
    act(() => student.setLanguage('si'));
    await waitFor(() => expect(screen.getByTestId('account-name').textContent).toBe(STUDENT_FALLBACK.si));
    act(() => student.setLanguage('ta'));
    await waitFor(() => expect(screen.getByTestId('account-name').textContent).toBe(STUDENT_FALLBACK.ta));
  });

  it('display helpers never produce an empty or malformed label', () => {
    for (const lang of ['en', 'si', 'ta'] as const) {
      expect(learnerDisplayName('', lang)).toBe(STUDENT_FALLBACK[lang]);
      expect(learnerDisplayName('   ', lang)).toBe(STUDENT_FALLBACK[lang]);
      expect(learnerDisplayName(' Kasun ', lang)).toBe('Kasun');
    }
    expect(learnerInitial('')).toBeNull();
    expect(learnerInitial(null)).toBeNull();
    expect(learnerInitial(' kasun')).toBe('K');
  });

  it('the Tutor greeting stays valid without a name in all languages', () => {
    for (const lang of ['en', 'si', 'ta'] as const) {
      const text = buildLiveGreeting('science', '', lang, '', 'grade-10').content;
      expect(text).not.toMatch(/\s!|^\s*!|,\s*\?/);
      expect(text).not.toContain('undefined');
    }
  });
});

// ---------------------------------------------------------------------------------------------------------------
describe('unchanged behaviour', () => {
  it('guest first-run onboarding still opens for a guest and leads to sign-in', async () => {
    localStorage.removeItem('atlas_onboarding_completed');
    await renderAndSettle();
    const button = await screen.findByRole('button', { name: 'Continue to Student Sign In' });
    fireEvent.click(button);
    expect(localStorage.getItem('atlas_onboarding_completed')).toBe('true');
    await waitFor(() => expect(student.isSignInModalOpen).toBe(true));
  });

  it('Pages demo (MOCK) keeps its original keys: no guest keys, no migration', async () => {
    tutorService.setMockMode(true);
    try {
      localStorage.setItem('atlas_learn_lang', 'si');
      localStorage.setItem('atlas_student_grade', 'grade-8');
      renderShell();
      expect(student.language).toBe('si');
      expect(student.grade).toBe('grade-8');
      expect(student.studentName).toBe('Amila');
      expect(localStorage.getItem('atlas_learn_lang')).toBe('si'); // not migrated
      expect(localStorage.getItem(GUEST_LANGUAGE_KEY)).toBeNull();
      act(() => student.setGrade('grade-9'));
      act(() => student.setLanguage('ta'));
      expect(localStorage.getItem('atlas_student_grade')).toBe('grade-9');
      expect(localStorage.getItem('atlas_learn_lang')).toBe('ta');
      expect(localStorage.getItem(GUEST_GRADE_KEY)).toBeNull();
      expect(localStorage.getItem(GUEST_LANGUAGE_KEY)).toBeNull();
    } finally {
      tutorService.setMockMode(false);
    }
  });
});
