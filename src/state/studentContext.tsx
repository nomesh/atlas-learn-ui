import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Grade, Language, LearningContext, TutorState } from '../types';

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
  conversationId: string;
  learningContext: LearningContext;
  setCurriculumSubject: (subjectId: string, topicId?: string, lessonId?: string) => void;
  tutorState: TutorState;
  setTutorState: (state: TutorState) => void;
}

const StudentContext = createContext<StudentContextValue | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();

  const [studentName, setStudentNameState] = useState<string>(() => {
    return localStorage.getItem('atlas_student_name') || 'Nimali';
  });

  const [grade, setGradeState] = useState<Grade>(() => {
    return (localStorage.getItem('atlas_student_grade') as Grade) || 'grade-8';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('atlas_learn_lang') as Language) || 'en';
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

  const [streakDays] = useState<number>(5);
  const [topicsMastered] = useState<number>(14);
  const [questionsAnswered] = useState<number>(52);
  const [accuracyPercent] = useState<number>(94);

  const setStudentName = (name: string) => {
    setStudentNameState(name);
    localStorage.setItem('atlas_student_name', name);
  };

  const setGrade = (newGrade: Grade) => {
    setGradeState(newGrade);
    localStorage.setItem('atlas_student_grade', newGrade);
  };

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem('atlas_learn_lang', newLang);
    i18n.changeLanguage(newLang);
  };

  const setCurriculumSubject = (newSubjectId: string, newTopicId?: string, newLessonId?: string) => {
    setSubjectId(newSubjectId);
    setTopicId(newTopicId);
    setActiveLessonId(newLessonId);
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
        conversationId,
        learningContext,
        setCurriculumSubject,
        tutorState,
        setTutorState,
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
