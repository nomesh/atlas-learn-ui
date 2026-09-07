import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StudentProvider } from './state/studentContext';
import { AppShell } from './components/layout/AppShell';
import { StudentHomePage } from './features/home/StudentHomePage';
import { TutorPage } from './features/tutor/TutorPage';
import { SubjectsPage } from './features/subjects/SubjectsPage';
import { SubjectDetailPage } from './features/subjects/SubjectDetailPage';
import { TeachMePage } from './features/teach-me/TeachMePage';
import { PracticePage } from './features/practice/PracticePage';
import { ProgressPage } from './features/progress/ProgressPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StudentProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<AppShell />}>
              <Route index element={<StudentHomePage />} />
              <Route path="tutor" element={<TutorPage />} />
              <Route path="subjects" element={<SubjectsPage />} />
              <Route path="subjects/:subjectId" element={<SubjectDetailPage />} />
              <Route path="learn/:topicId" element={<TeachMePage />} />
              <Route path="practice" element={<PracticePage />} />
              <Route path="progress" element={<ProgressPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StudentProvider>
    </QueryClientProvider>
  );
};
