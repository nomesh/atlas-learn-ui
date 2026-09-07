import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Sparkles, BookOpen, CheckCircle2, Award } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { t } = useTranslation();

  const items = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/tutor', label: t('nav.tutor'), icon: Sparkles, highlight: true },
    { to: '/subjects', label: t('nav.subjects'), icon: BookOpen },
    { to: '/practice', label: t('nav.practice'), icon: CheckCircle2 },
    { to: '/progress', label: t('nav.progress'), icon: Award },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 px-1 py-1 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] safe-area-pb">
      <div className="grid grid-cols-5 h-14 items-center">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-h-[44px] py-1 rounded-xl transition-all relative ${
                  isActive
                    ? item.highlight
                      ? 'text-atlas-cyan font-bold'
                      : 'text-atlas-navy font-bold'
                    : 'text-slate-400 hover:text-slate-600 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-xl transition-all ${
                      isActive && item.highlight
                        ? 'bg-cyan-50 text-atlas-cyan scale-105'
                        : isActive
                        ? 'bg-slate-100 text-atlas-navy'
                        : ''
                    }`}
                  >
                    {item.to === '/tutor' ? (
                      <div className={`w-5 h-5 rounded-full overflow-hidden border ${isActive ? 'border-atlas-cyan ring-2 ring-cyan-400/40' : 'border-slate-300'}`}>
                        <img src="/assets/tutor-avatar-icon.jpg" alt="Tutor" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <Icon
                        className={`w-5 h-5 ${
                          item.highlight && isActive ? 'stroke-[2.5]' : 'stroke-2'
                        }`}
                      />
                    )}
                  </div>
                  <span className={`text-[10px] mt-0.5 tracking-tight truncate max-w-[64px] text-center leading-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
