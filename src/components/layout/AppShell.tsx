import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';
import { OnboardingModal } from '../../features/onboarding/OnboardingModal';

export const AppShell: React.FC = () => {
  const location = useLocation();
  const isTutorPage = location.pathname.startsWith('/tutor');

  return (
    <div
      className={`flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-cyan-100 selection:text-atlas-navy ${
        isTutorPage ? 'h-screen overflow-hidden' : 'min-h-screen'
      }`}
    >
      {/* Top Header Navigation */}
      <Header />

      {/* Main Content Viewport */}
      <main
        className={`flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 ${
          isTutorPage
            ? 'py-2 sm:py-3.5 flex flex-col min-h-0 overflow-hidden'
            : 'py-4 sm:py-6 pb-24 md:pb-12'
        }`}
      >
        <Outlet />
      </main>

      {/* Neural Works Platform Footer (shown on all pages except the full-height chat workspace) */}
      {!isTutorPage && <Footer />}

      {/* Mobile Bottom Navigation (< 768px, shown on non-tutor pages) */}
      {!isTutorPage && <MobileBottomNav />}

      {/* Global First-Time or Edit Onboarding Modal */}
      <OnboardingModal />
    </div>
  );
};
