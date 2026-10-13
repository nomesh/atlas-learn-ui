import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { Grade, Language, LearningContext, TutorState } from '../types';
import { isMockCurriculum } from '../curriculum/liveCurriculum';
import {
  getSession,
  getProfile,
  getAllowedGrades,
  updateProfile,
  logout as apiLogout,
  redirectToLogin,
  type AllowedGradesData,
  type LearnSessionData,
  type LearnerProfile,
  type StudentProfileUpdateRequest,
} from '../api/authApi';
import {
  LEARNER_DATA_KEYS,
  LEARNER_GRADE_KEY,
  LEARNER_LANGUAGE_KEY,
  clearLearnerData,
  initialLanguage,
  migrateLegacyPreferences,
  readGuestGrade,
  readGuestLanguage,
  writeGuestGrade,
  writeGuestLanguage,
} from './devicePreferences';

/** LIVE = the real application. MOCK = the Pages demo / explicit mock development (sample learner allowed). */
const isLive = () => !isMockCurriculum();

const DEFAULT_GRADE: Grade = 'grade-10';
const ENTITLED_GRADE = /^grade-(?:[6-9]|1[0-3])$/;

/** Learner-specific values cached in browser storage (see devicePreferences.ts); guest preferences are separate. */
export { LEARNER_DATA_KEYS };

/**
 * Entitled grades from GET /api/learn/entitlements/allowed-grades, failing closed: anything but an array of
 * "grade-6".."grade-13" strings is dropped, duplicates are removed, and no usable grade means null (no grade choice).
 */
export function parseAllowedGrades(data: AllowedGradesData | null | undefined): Grade[] | null {
  const raw = (data as { allowedGrades?: unknown } | null | undefined)?.allowedGrades;
  if (!Array.isArray(raw)) return null;
  const grades = [...new Set(raw.filter((g): g is Grade => typeof g === 'string' && ENTITLED_GRADE.test(g)))];
  return grades.length > 0 ? grades : null;
}

/** Outcome of a profile save: applied, or superseded by a newer save / another learner (nothing applied). */
export type ProfileSaveResult = 'applied' | 'superseded';

export interface StudentSignInData {
  id: string;
  displayName: string;
  grade: Grade;
  language: Language;
  school?: string;
  curriculumCode?: string;
  enrolledSubjects?: string[];
  studentId?: string;
  accountStatus?: string;
  registeredGrade?: string;
}

interface StudentContextValue {
  studentName: string;
  setStudentName: (name: string) => void;
  grade: Grade;
  setGrade: (grade: Grade) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  streakDays: number;
  topicsMastered: number;
  questionsAnswered: number;
  accuracyPercent: number;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  /** Signed-in learner profile editor (distinct from first-run onboarding). */
  isProfileEditorOpen: boolean;
  setIsProfileEditorOpen: (open: boolean) => void;
  /**
   * Opens the profile editor. `returnFocusTo` is a persistent element (e.g. the account-menu toggle) that receives
   * focus on close when the element that opened the editor no longer exists.
   */
  openProfileEditor: (returnFocusTo?: HTMLElement | null) => void;
  profileEditorReturnFocusRef: React.MutableRefObject<HTMLElement | null>;
  /**
   * Closes the profile editor. Every close path (the editor's own controls, navigation, identity changes) goes through
   * this, which advances the editor session so a still-running save can no longer touch any editor.
   */
  closeProfileEditor: () => void;
  /** Identifies the current editor session; advanced by every open and every close. */
  profileEditorSessionRef: React.MutableRefObject<number>;
  /** Shown outside the editor when a save fails after its editor was closed. */
  profileSaveNotice: string | null;
  setProfileSaveNotice: (notice: string | null) => void;
  /**
   * Grades the signed-in learner is entitled to, loaded with the session (never when the editor opens).
   * null = unknown (not signed in, or the entitlement lookup failed): grade changes are then not offered.
   */
  allowedGrades: Grade[] | null;
  isSignInModalOpen: boolean;
  setIsSignInModalOpen: (open: boolean) => void;
  signInStudent: (data: StudentSignInData) => void;
  isDeviceModalOpen: boolean;
  setIsDeviceModalOpen: (open: boolean) => void;
  getOrCreateConversationId: (subjectId: string, topicId: string, userKey?: string, gradeKey?: string) => string;
  learningContext: LearningContext;
  setCurriculumSubject: (subjectId: string, topicId?: string, lessonId?: string) => void;
  tutorState: TutorState;
  setTutorState: (state: TutorState) => void;

  // Real Authentication & Session fields
  session: LearnSessionData | null;
  studentId: string | null;
  accountStatus: string | null;
  registeredGrade: string | null;
  isAuthenticated: boolean;
  isGuestPreview: boolean;
  enableGuestPreview: () => void;
  disableGuestPreview: () => void;
  currentUser: { id: string; email: string; displayName: string } | null;
  accountType: 'GUARDIAN' | 'INDEPENDENT_STUDENT' | null;
  learners: LearnerProfile[];
  activeLearner: LearnerProfile | null;
  signInModalTab: 'pilot' | 'manual';
  setSignInModalTab: (tab: 'pilot' | 'manual') => void;
  login: (tabOrEvent?: 'pilot' | 'manual' | unknown) => void;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  /**
   * Signed-in: sends only the changed fields to the server and applies the server's saved values to React state and
   * local storage only after it accepted them. Throws (state unchanged) on failure. A response that arrives after a
   * newer save, or after the learner changed, is not applied ('superseded'). Guest: local only.
   */
  saveProfileChanges: (changes: StudentProfileUpdateRequest) => Promise<ProfileSaveResult>;
}

const StudentContext = createContext<StudentContextValue | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();

  // LIVE: split pre-existing language/grade keys into guest preferences only when no learner was cached (never
  // restores identity). Runs before any state below reads storage.
  useState(() => {
    if (isLive()) migrateLegacyPreferences();
    return true;
  });

  // One-time migration for legacy demo profiles: MOCK (Pages demo) only. LIVE never rewrites or invents identity.
  if (typeof localStorage !== 'undefined' && !isLive()) {
    try {
      const rawSession = localStorage.getItem('atlas_student_session');
      if (rawSession && (rawSession.includes('Nimali') || rawSession.includes('nimali'))) {
        const parsed = JSON.parse(rawSession);
        parsed.id = 'stu-ol-10-amila';
        parsed.displayName = 'Amila Jayasinghe';
        localStorage.setItem('atlas_student_session', JSON.stringify(parsed));
      }
      const rawName = localStorage.getItem('atlas_student_name');
      if (rawName && (rawName.includes('Nimali') || rawName === 'Nimali')) {
        localStorage.setItem('atlas_student_name', 'Amila');
      }
    } catch {
      // ignore
    }
  }

  const [session, setSession] = useState<LearnSessionData | null>(null);

  const [localStudentSession, setLocalStudentSession] = useState<StudentSignInData | null>(() => {
    // LIVE: a cached sign-in is not proof of a session; identity comes only from a confirmed server session.
    if (isLive()) return null;
    try {
      const saved = localStorage.getItem('atlas_student_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.displayName?.includes('Nimali')) {
          parsed.displayName = 'Amila Jayasinghe';
        }
        return parsed;
      }
    } catch (e) {
      console.warn('[studentContext] Parse session error:', e);
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (isLive()) return false;
    try {
      const saved = localStorage.getItem('atlas_student_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        return !!parsed && !!parsed.id;
      }
    } catch (e) {
      // ignore
    }
    return false;
  });

  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
  const [signInModalTab, setSignInModalTab] = useState<'pilot' | 'manual'>('pilot');

  const [isGuestPreview, setIsGuestPreview] = useState<boolean>(() => {
    return sessionStorage.getItem('atlas_guest_preview') === 'true';
  });
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState<boolean>(false);

  const enableGuestPreview = useCallback(() => {
    sessionStorage.setItem('atlas_guest_preview', 'true');
    setIsGuestPreview(true);
  }, []);

  const disableGuestPreview = useCallback(() => {
    sessionStorage.removeItem('atlas_guest_preview');
    setIsGuestPreview(false);
  }, []);

  const [studentName, setStudentNameState] = useState<string>(() => {
    // LIVE shows no name until a confirmed session provides the real one (never a cached or sample name).
    if (isLive()) return '';
    const raw = localStudentSession?.displayName || localStorage.getItem('atlas_student_name');
    if (!raw || raw.includes('Nimali')) {
      return 'Amila';
    }
    return raw;
  });

  const [grade, setGradeState] = useState<Grade>(() => {
    // LIVE: the guest's own browsing grade until a confirmed session provides the learner's grade.
    if (isLive()) return readGuestGrade() ?? DEFAULT_GRADE;
    return (
      (localStudentSession?.grade as Grade) ||
      (localStorage.getItem('atlas_student_grade') as Grade) ||
      DEFAULT_GRADE
    );
  });

  const [language, setLanguageState] = useState<Language>(() => {
    if (isLive()) return initialLanguage();
    return (
      (localStudentSession?.language as Language) ||
      (localStorage.getItem('atlas_learn_lang') as Language) ||
      'en'
    );
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    return !localStorage.getItem('atlas_onboarding_completed');
  });
  const [isProfileEditorOpen, setProfileEditorOpenState] = useState<boolean>(false);
  const profileEditorReturnFocusRef = useRef<HTMLElement | null>(null);
  const profileEditorSessionRef = useRef(0);
  const openProfileEditor = useCallback((returnFocusTo?: HTMLElement | null) => {
    profileEditorSessionRef.current += 1;
    profileEditorReturnFocusRef.current = returnFocusTo ?? null;
    setProfileEditorOpenState(true);
  }, []);
  const closeProfileEditor = useCallback(() => {
    profileEditorSessionRef.current += 1;
    setProfileEditorOpenState(false);
  }, []);
  /** Kept for existing callers; routes through the session-advancing open/close. */
  const setIsProfileEditorOpen = useCallback(
    (open: boolean) => (open ? openProfileEditor(null) : closeProfileEditor()),
    [openProfileEditor, closeProfileEditor],
  );
  const [profileSaveNotice, setProfileSaveNotice] = useState<string | null>(null);
  const [allowedGrades, setAllowedGrades] = useState<Grade[] | null>(null);

  /** Bumped whenever the learner identity is cleared: responses started for another identity are dropped. */
  const identityEpochRef = useRef(0);
  /** Only the latest session refresh may apply its results. */
  const refreshSeqRef = useRef(0);
  /** Bumped on every local profile write: an older profile read never overwrites a newer write. */
  const profileWriteRef = useRef(0);
  /** Save ordering: a save response is applied only if no later-started save was applied already. */
  const saveSeqRef = useRef(0);
  const appliedSaveSeqRef = useRef(0);
  /** The learner of the last confirmed session (a different one means a learner switch). */
  const confirmedUserIdRef = useRef<string | null>(null);

  /**
   * Per-lesson conversation ID map: key = "subjectId:topicId" → UUID.
   * Stored in sessionStorage as JSON so each browser tab keeps its own isolated memory.
   */
  const conversationMapRef = React.useRef<Map<string, string> | null>(null);
  if (conversationMapRef.current === null) {
    try {
      const saved = sessionStorage.getItem('atlas_tutor_conversation_map');
      conversationMapRef.current = saved
        ? new Map<string, string>(JSON.parse(saved))
        : new Map<string, string>();
    } catch {
      conversationMapRef.current = new Map<string, string>();
    }
  }

  const getOrCreateConversationId = useCallback((
    sid: string,
    tid: string,
    userKey?: string,
    gradeKey?: string
  ): string => {
    const map = conversationMapRef.current!;
    const resolvedUser = userKey || session?.userId || localStudentSession?.id || 'guest';
    const resolvedGrade = gradeKey || grade || 'grade-10';
    const key = `${resolvedUser}:${resolvedGrade}:${sid}:${tid}`;
    if (!map.has(key)) {
      const newId = `learn-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      map.set(key, newId);
      try {
        sessionStorage.setItem(
          'atlas_tutor_conversation_map',
          JSON.stringify([...map.entries()]),
        );
      } catch { /* quota exceeded — silently skip persistence */ }
    }
    return map.get(key)!;
  }, [session?.userId, localStudentSession?.id, grade]);

  const [subjectId, setSubjectId] = useState<string | undefined>('science');
  // The demo starts on a prototype lesson; LIVE starts with no topic (only API-verified topics may be selected).
  const [topicId, setTopicId] = useState<string | undefined>(() => (isMockCurriculum() ? 'photosynthesis' : undefined));
  const [activeLessonId, setActiveLessonId] = useState<string | undefined>(() => (isMockCurriculum() ? 'sci-8-photo-1' : undefined));
  const [tutorState, setTutorState] = useState<TutorState>('idle');

  const [streakDays, setStreakDays] = useState<number>(0);
  const [topicsMastered, setTopicsMastered] = useState<number>(0);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [accuracyPercent, setAccuracyPercent] = useState<number>(0);

  /**
   * Clears every learner-specific value (state and browser storage), keeps the device's guest preferences, and puts
   * the in-memory grade and language back to those preferences. Closes the editor through the session-advancing path
   * and drops any notice that belonged to the learner.
   */
  const clearLearnerIdentity = useCallback(() => {
    identityEpochRef.current += 1;
    confirmedUserIdRef.current = null;
    if (isLive()) {
      clearLearnerData();
    } else {
      try {
        localStorage.removeItem('atlas_student_session');
      } catch {
        // ignore
      }
    }
    setSession(null);
    setLocalStudentSession(null);
    setIsAuthenticated(false);
    setStudentNameState(isLive() ? '' : 'Amila');
    setGradeState((isLive() ? readGuestGrade() : null) ?? DEFAULT_GRADE);
    if (isLive()) {
      const deviceLanguage = readGuestLanguage() ?? 'en';
      setLanguageState(deviceLanguage);
      i18n.changeLanguage(deviceLanguage);
    }
    setAllowedGrades(null);
    setStreakDays(0);
    setTopicsMastered(0);
    setQuestionsAnswered(0);
    setAccuracyPercent(0);
    setProfileSaveNotice(null);
    closeProfileEditor();
  }, [i18n, closeProfileEditor]);

  // Load session from BFF on initial mount (and after sign-in)
  const refreshSession = useCallback(async () => {
    const seq = ++refreshSeqRef.current;
    const epoch = identityEpochRef.current;
    const writeAtStart = profileWriteRef.current;
    const isCurrent = () => seq === refreshSeqRef.current && epoch === identityEpochRef.current;
    const noNewerWrite = () => profileWriteRef.current === writeAtStart;

    try {
      const data = await getSession();
      if (!isCurrent()) return;

      if (!data?.authenticated) {
        if (isLive()) {
          // Signed out, expired or reset session: no learner identity may remain (guest preferences stay).
          clearLearnerIdentity();
        } else {
          setSession(null);
          setIsAuthenticated(false);
        }
        return;
      }

      // A different learner than the last confirmed one: nothing of the previous learner's editor or notices remains.
      if (confirmedUserIdRef.current !== null && confirmedUserIdRef.current !== data.userId) {
        identityEpochRef.current += 1;
        setProfileSaveNotice(null);
        setAllowedGrades(null);
        closeProfileEditor();
      }
      confirmedUserIdRef.current = data.userId ?? null;
      const confirmedEpoch = identityEpochRef.current;
      const stillCurrent = () => seq === refreshSeqRef.current && confirmedEpoch === identityEpochRef.current;

      setSession(data);
      setIsAuthenticated(true);
      if (noNewerWrite()) {
        if (data.registeredGrade) {
          setGradeState(data.registeredGrade as Grade);
          localStorage.setItem('atlas_student_grade', data.registeredGrade);
        } else if (data.activeLearner?.grade) {
          setGradeState(data.activeLearner.grade as Grade);
          localStorage.setItem('atlas_student_grade', data.activeLearner.grade);
        }
        if (data.activeLearner) {
          setStudentNameState(data.activeLearner.displayName || '');
          localStorage.setItem('atlas_student_name', data.activeLearner.displayName || '');
          if (data.activeLearner.preferredLanguage) {
            setLanguageState(data.activeLearner.preferredLanguage as Language);
            localStorage.setItem(LEARNER_LANGUAGE_KEY, data.activeLearner.preferredLanguage);
            i18n.changeLanguage(data.activeLearner.preferredLanguage);
          }
        }
      }

      // Entitlements (so opening the editor makes no API call) and the durable profile, concurrently.
      const [entitlements, profileResult] = await Promise.allSettled([getAllowedGrades(), getProfile()]);
      if (!stillCurrent()) return;

      if (entitlements.status === 'fulfilled') {
        setAllowedGrades(parseAllowedGrades(entitlements.value));
      } else {
        console.warn('[studentContext] Could not load grade entitlements; grade changes stay locked:', entitlements.reason);
        setAllowedGrades(null);
      }

      if (profileResult.status === 'fulfilled') {
        const profile = profileResult.value;
        // A save that finished while this read was in flight is newer than this read: keep it.
        if (noNewerWrite()) {
          if (profile?.name) setStudentNameState(profile.name);
          if (profile?.grade) setGradeState(profile.grade as Grade);
          if (profile?.language) {
            setLanguageState(profile.language as Language);
            i18n.changeLanguage(profile.language);
          }
        }
        // LIVE never shows backend streak/mastery/accuracy figures (the profile API currently returns fixed values).
        if (!isLive() && profile) {
          setStreakDays(profile.streakDays);
          setTopicsMastered(profile.topicsMastered);
          setQuestionsAnswered(profile.questionsAnswered);
          setAccuracyPercent(profile.accuracyPercent);
        }
      } else {
        console.warn('[studentContext] Could not load extended profile:', profileResult.reason);
      }
    } catch (err) {
      if (!isCurrent()) return;
      console.warn('[studentContext] Could not fetch session:', err);
      if (isLive()) {
        clearLearnerIdentity();
      } else {
        setIsAuthenticated(false);
        setSession(null);
      }
    }
  }, [i18n, clearLearnerIdentity, closeProfileEditor]);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  /** Applies only the given profile fields to state and storage, and marks a newer local profile write. */
  const applyProfileFields = (fields: { name?: string; grade?: Grade; language?: Language }) => {
    profileWriteRef.current += 1;
    if (fields.name !== undefined) {
      setStudentNameState(fields.name);
      localStorage.setItem('atlas_student_name', fields.name);
    }
    if (fields.grade !== undefined) {
      setGradeState(fields.grade);
      localStorage.setItem(LEARNER_GRADE_KEY, fields.grade);
    }
    if (fields.language !== undefined) {
      setLanguageState(fields.language);
      localStorage.setItem(LEARNER_LANGUAGE_KEY, fields.language);
      i18n.changeLanguage(fields.language);
    }
  };

  const saveProfileChanges = async (changes: StudentProfileUpdateRequest): Promise<ProfileSaveResult> => {
    if (!isAuthenticated) {
      applyProfileFields({
        name: changes.name,
        grade: changes.grade as Grade | undefined,
        language: changes.language as Language | undefined,
      });
      return 'applied';
    }
    const seq = ++saveSeqRef.current;
    const epoch = identityEpochRef.current;
    // Server first: nothing changes locally unless the server accepted it (errors propagate to the caller, unless the
    // learner changed meanwhile: then the outcome belongs to nobody on screen).
    let saved: Awaited<ReturnType<typeof updateProfile>>;
    try {
      saved = await updateProfile(changes);
    } catch (err) {
      if (epoch !== identityEpochRef.current) return 'superseded';
      throw err;
    }
    if (epoch !== identityEpochRef.current || seq <= appliedSaveSeqRef.current) {
      return 'superseded';
    }
    appliedSaveSeqRef.current = seq;
    applyProfileFields({
      name: changes.name !== undefined ? saved?.name || changes.name : undefined,
      grade: changes.grade !== undefined ? ((saved?.grade || changes.grade) as Grade) : undefined,
      language: changes.language !== undefined ? ((saved?.language || changes.language) as Language) : undefined,
    });
    return 'applied';
  };

  const setStudentName = (name: string) => {
    profileWriteRef.current += 1;
    setStudentNameState(name);
    localStorage.setItem('atlas_student_name', name);
    if (isAuthenticated) {
      updateProfile({ name }).catch((e) => console.warn(e));
    }
  };

  const setGrade = (newGrade: Grade) => {
    if (isAuthenticated && session?.registeredGrade && session.registeredGrade !== newGrade) {
      console.warn(`[studentContext] Enrolled for ${session.registeredGrade}. Grade changes are locked.`);
      return;
    }
    profileWriteRef.current += 1;
    setGradeState(newGrade);
    if (isLive() && !isAuthenticated) {
      writeGuestGrade(newGrade);
    } else {
      localStorage.setItem(LEARNER_GRADE_KEY, newGrade);
    }
    if (isAuthenticated) {
      updateProfile({ grade: newGrade }).catch((e) => console.warn(e));
    }
  };

  const setLanguage = (newLang: Language) => {
    profileWriteRef.current += 1;
    setLanguageState(newLang);
    if (isLive() && !isAuthenticated) {
      writeGuestLanguage(newLang);
    } else {
      localStorage.setItem(LEARNER_LANGUAGE_KEY, newLang);
    }
    i18n.changeLanguage(newLang);
    if (isAuthenticated) {
      updateProfile({ language: newLang }).catch((e) => console.warn(e));
    }
  };

  const setCurriculumSubject = (newSubjectId: string, newTopicId?: string, newLessonId?: string) => {
    setSubjectId(newSubjectId);
    setTopicId(newTopicId);
    setActiveLessonId(newLessonId);
  };

  const signInStudent = useCallback((data: StudentSignInData) => {
    setLocalStudentSession(data);
    localStorage.setItem('atlas_student_session', JSON.stringify(data));
    localStorage.setItem('atlas_student_name', data.displayName);
    localStorage.setItem('atlas_student_grade', data.grade);
    localStorage.setItem('atlas_learn_lang', data.language);
    setStudentNameState(data.displayName);
    setGradeState(data.grade);
    setLanguageState(data.language);
    setIsAuthenticated(true);
    i18n.changeLanguage(data.language);
  }, [i18n]);

  const login = (tabOrEvent?: 'pilot' | 'manual' | unknown) => {
    const tab = tabOrEvent === 'manual' ? 'manual' : 'pilot';
    setSignInModalTab(tab);
    setIsSignInModalOpen(true);
  };

  const clearSessionStorageTutorState = () => {
    try {
      sessionStorage.removeItem('atlas_tutor_conversation_map');
      if (conversationMapRef.current) {
        conversationMapRef.current.clear();
      }
      const keysToRemove: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const k = sessionStorage.key(i);
        if (k && (k.startsWith('atlas_messages_') || k.startsWith('atlas_tutor_'))) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => sessionStorage.removeItem(k));
    } catch {
      // ignore
    }
  };

  const logout = async () => {
    // No learner identity may survive a logout, whatever the server answers (guest preferences stay).
    clearLearnerIdentity();
    try {
      localStorage.removeItem('atlas_student_session');
      localStorage.removeItem('atlas_guest_preview');
      sessionStorage.removeItem('atlas_guest_preview');
      sessionStorage.removeItem('atlas_tutor_lease_token');
      clearSessionStorageTutorState();
      setLocalStudentSession(null);
      setIsAuthenticated(false);
      const logoutUrl = await apiLogout();
      if (logoutUrl) {
        window.location.href = logoutUrl;
        return;
      }
    } catch (err) {
      console.warn('[studentContext] Logout error:', err);
    } finally {
      setIsAuthenticated(false);
      setSession(null);
      setLocalStudentSession(null);
      localStorage.removeItem('atlas_student_session');
      localStorage.removeItem('atlas_guest_preview');
      sessionStorage.removeItem('atlas_guest_preview');
      sessionStorage.removeItem('atlas_tutor_lease_token');
      clearSessionStorageTutorState();
      window.location.href = '/';
    }
  };

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  const currentUser = session && session.authenticated && session.userId ? {
    id: session.userId,
    email: session.email || '',
    displayName: session.displayName || studentName,
  } : localStudentSession ? {
    id: localStudentSession.id,
    email: `${localStudentSession.id}@student.atlas.learn`,
    displayName: localStudentSession.displayName,
  } : null;

  const currentUserId = currentUser?.id || 'guest';

  const learningContext: LearningContext = {
    grade,
    subjectId,
    topicId,
    activeLessonId,
    language,
    // Derive the per-lesson conversationId so the context is always up-to-date and isolated per user+grade+subject+topic
    conversationId: subjectId && topicId
      ? getOrCreateConversationId(subjectId, topicId, currentUserId, grade)
      : getOrCreateConversationId('default', 'default', currentUserId, grade),
  };

  const activeLearner: LearnerProfile | null = session?.activeLearner || (localStudentSession ? {
    id: localStudentSession.id,
    displayName: localStudentSession.displayName,
    grade: localStudentSession.grade,
    curriculumCode: localStudentSession.curriculumCode || 'SL-MOE',
    preferredLanguage: localStudentSession.language,
    enrolledSubjects: localStudentSession.enrolledSubjects || ['History', 'Science', 'Mathematics', 'ICT'],
    isPrimary: true,
    status: 'ACTIVE',
  } : null);

  return (
    <StudentContext.Provider
      value={{
        studentName,
        setStudentName,
        grade,
        setGrade,
        language,
        setLanguage,
        streakDays,
        topicsMastered,
        questionsAnswered,
        accuracyPercent,
        isProfileEditorOpen,
        setIsProfileEditorOpen,
        openProfileEditor,
        closeProfileEditor,
        profileEditorSessionRef,
        profileEditorReturnFocusRef,
        profileSaveNotice,
        setProfileSaveNotice,
        allowedGrades,
        isOnboardingOpen,
        setIsOnboardingOpen: (open: boolean) => {
          setIsOnboardingOpen(open);
          if (!open) {
            localStorage.setItem('atlas_onboarding_completed', 'true');
          }
        },
        isSignInModalOpen,
        setIsSignInModalOpen,
        signInStudent,
        isDeviceModalOpen,
        setIsDeviceModalOpen,
        getOrCreateConversationId,
        learningContext,
        setCurriculumSubject,
        tutorState,
        setTutorState,

        session,
        studentId: session?.studentId || localStudentSession?.studentId || null,
        accountStatus: session?.accountStatus || (isAuthenticated ? 'ACTIVE' : null),
        registeredGrade: session?.registeredGrade || (isAuthenticated ? grade : null),
        isAuthenticated,
        isGuestPreview,
        enableGuestPreview,
        disableGuestPreview,
        currentUser,
        accountType: session?.accountType || (localStudentSession ? 'INDEPENDENT_STUDENT' : null),
        learners: session?.learners || (activeLearner ? [activeLearner] : []),
        activeLearner,
        signInModalTab,
        setSignInModalTab,
        login,
        logout,
        refreshSession,
        saveProfileChanges,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = (): StudentContextValue => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
