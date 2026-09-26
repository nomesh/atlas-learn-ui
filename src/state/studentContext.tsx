import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { Grade, Language, LearningContext, TutorState } from '../types';
import {
  getSession,
  getProfile,
  updateProfile,
  logout as apiLogout,
  redirectToLogin,
  type LearnSessionData,
  type LearnerProfile,
} from '../api/authApi';

export interface StudentSignInData {
  id: string;
  displayName: string;
  grade: Grade;
  language: Language;
  school?: string;
  curriculumCode?: string;
  enrolledSubjects?: string[];
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
  isSignInModalOpen: boolean;
  setIsSignInModalOpen: (open: boolean) => void;
  signInStudent: (data: StudentSignInData) => void;
  isDeviceModalOpen: boolean;
  setIsDeviceModalOpen: (open: boolean) => void;
  conversationId: string;
  learningContext: LearningContext;
  setCurriculumSubject: (subjectId: string, topicId?: string, lessonId?: string) => void;
  tutorState: TutorState;
  setTutorState: (state: TutorState) => void;

  // Real Authentication & Session fields
  session: LearnSessionData | null;
  isAuthenticated: boolean;
  isGuestPreview: boolean;
  enableGuestPreview: () => void;
  disableGuestPreview: () => void;
  currentUser: { id: string; email: string; displayName: string } | null;
  accountType: 'GUARDIAN' | 'INDEPENDENT_STUDENT' | null;
  learners: LearnerProfile[];
  activeLearner: LearnerProfile | null;
  login: () => void;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  saveProfileToServer: (name: string, grade: Grade, language: Language) => Promise<void>;
}

const StudentContext = createContext<StudentContextValue | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();

  const [session, setSession] = useState<LearnSessionData | null>(null);

  const [localStudentSession, setLocalStudentSession] = useState<StudentSignInData | null>(() => {
    try {
      const saved = localStorage.getItem('atlas_student_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('[studentContext] Parse session error:', e);
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
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
    return (
      localStudentSession?.displayName ||
      localStorage.getItem('atlas_student_name') ||
      'Nimali'
    );
  });

  const [grade, setGradeState] = useState<Grade>(() => {
    return (
      (localStudentSession?.grade as Grade) ||
      (localStorage.getItem('atlas_student_grade') as Grade) ||
      'grade-10'
    );
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (
      (localStudentSession?.language as Language) ||
      (localStorage.getItem('atlas_learn_lang') as Language) ||
      'en'
    );
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    return !localStorage.getItem('atlas_onboarding_completed');
  });

  const [conversationId] = useState<string>(() => {
    const existing = sessionStorage.getItem('atlas_tutor_conversation_id');
    if (existing) return existing;
    const newId = `learn-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('atlas_tutor_conversation_id', newId);
    return newId;
  });

  const [subjectId, setSubjectId] = useState<string | undefined>('science');
  const [topicId, setTopicId] = useState<string | undefined>('photosynthesis');
  const [activeLessonId, setActiveLessonId] = useState<string | undefined>('sci-8-photo-1');
  const [tutorState, setTutorState] = useState<TutorState>('idle');

  const [streakDays, setStreakDays] = useState<number>(0);
  const [topicsMastered, setTopicsMastered] = useState<number>(0);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [accuracyPercent, setAccuracyPercent] = useState<number>(0);

  // Load session from BFF on initial mount
  const refreshSession = useCallback(async () => {
    try {
      const data = await getSession();
      setSession(data);
      setIsAuthenticated(data.authenticated);

      if (data.authenticated) {
        if (data.activeLearner) {
          setStudentNameState(data.activeLearner.displayName);
          localStorage.setItem('atlas_student_name', data.activeLearner.displayName);
          if (data.activeLearner.grade) {
            setGradeState(data.activeLearner.grade as Grade);
            localStorage.setItem('atlas_student_grade', data.activeLearner.grade);
          }
          if (data.activeLearner.preferredLanguage) {
            setLanguageState(data.activeLearner.preferredLanguage as Language);
            localStorage.setItem('atlas_learn_lang', data.activeLearner.preferredLanguage);
            i18n.changeLanguage(data.activeLearner.preferredLanguage);
          }
        }

        // Also fetch metrics from durable profile
        try {
          const profile = await getProfile();
          if (profile.name) {
            setStudentNameState(profile.name);
          }
          if (profile.grade) {
            setGradeState(profile.grade as Grade);
          }
          if (profile.language) {
            setLanguageState(profile.language as Language);
            i18n.changeLanguage(profile.language);
          }
          setStreakDays(profile.streakDays);
          setTopicsMastered(profile.topicsMastered);
          setQuestionsAnswered(profile.questionsAnswered);
          setAccuracyPercent(profile.accuracyPercent);
        } catch (pErr) {
          console.warn('[studentContext] Could not load extended profile:', pErr);
        }
      }
    } catch (err) {
      console.warn('[studentContext] Could not fetch session:', err);
      setIsAuthenticated(false);
      setSession(null);
    }
  }, [i18n]);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const saveProfileToServer = async (name: string, newGrade: Grade, newLang: Language) => {
    setStudentNameState(name);
    setGradeState(newGrade);
    setLanguageState(newLang);
    localStorage.setItem('atlas_student_name', name);
    localStorage.setItem('atlas_student_grade', newGrade);
    localStorage.setItem('atlas_learn_lang', newLang);
    i18n.changeLanguage(newLang);

    if (isAuthenticated) {
      try {
        await updateProfile({ name, grade: newGrade, language: newLang });
      } catch (err) {
        console.error('[studentContext] Failed to persist profile to PostgreSQL:', err);
      }
    }
  };

  const setStudentName = (name: string) => {
    setStudentNameState(name);
    localStorage.setItem('atlas_student_name', name);
    if (isAuthenticated) {
      updateProfile({ name }).catch((e) => console.warn(e));
    }
  };

  const setGrade = (newGrade: Grade) => {
    setGradeState(newGrade);
    localStorage.setItem('atlas_student_grade', newGrade);
    if (isAuthenticated) {
      updateProfile({ grade: newGrade }).catch((e) => console.warn(e));
    }
  };

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem('atlas_learn_lang', newLang);
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

  const login = () => {
    setIsSignInModalOpen(true);
  };

  const logout = async () => {
    try {
      localStorage.removeItem('atlas_student_session');
      localStorage.removeItem('atlas_guest_preview');
      sessionStorage.removeItem('atlas_guest_preview');
      sessionStorage.removeItem('atlas_tutor_lease_token');
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
      window.location.href = '/';
    }
  };

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  const learningContext: LearningContext = {
    grade,
    subjectId,
    topicId,
    activeLessonId,
    language,
    conversationId,
  };

  const currentUser = session && session.authenticated && session.userId ? {
    id: session.userId,
    email: session.email || '',
    displayName: session.displayName || studentName,
  } : localStudentSession ? {
    id: localStudentSession.id,
    email: `${localStudentSession.id}@student.atlas.learn`,
    displayName: localStudentSession.displayName,
  } : null;

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
        conversationId,
        learningContext,
        setCurriculumSubject,
        tutorState,
        setTutorState,

        session,
        isAuthenticated,
        isGuestPreview,
        enableGuestPreview,
        disableGuestPreview,
        currentUser,
        accountType: session?.accountType || (localStudentSession ? 'INDEPENDENT_STUDENT' : null),
        learners: session?.learners || (activeLearner ? [activeLearner] : []),
        activeLearner,
        login,
        logout,
        refreshSession,
        saveProfileToServer,
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
