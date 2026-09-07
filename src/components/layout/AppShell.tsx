import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';
import { OnboardingModal } from '../../features/onboarding/OnboardingModal';

export const AppShell: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-cyan-100 selection:text-atlas-navy">
      {/* Top Header Navigation */}
      <Header />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 md:pb-12">
        <Outlet />
      </main>

      {/* Neural Works Platform Footer */}
      <Footer />

      {/* Mobile Bottom Navigation (< 768px) */}
      <MobileBottomNav />

      {/* Global First-Time or Edit Onboarding Modal */}
      <OnboardingModal />
    </div>
  );
};
