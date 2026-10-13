import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, GraduationCap, Flame, Menu, X, Sparkles, LogIn, LogOut, Shield, User, ChevronDown } from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import { isMockCurriculum } from '../../curriculum/liveCurriculum';
import { ATLAS_MARK, NEURAL_WORKS_LOGO } from '../../brand/assets';
import { DeviceManagementModal } from '../../features/account/DeviceManagementModal';
import type { Grade, Language } from '../../types';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const {
    studentName,
    grade,
    setGrade,
    language,
    setLanguage,
    streakDays,
    openProfileEditor,
    isAuthenticated,
    studentId,
    accountStatus,
    registeredGrade,
    currentUser,
    accountType,
    login,
    logout,
    isDeviceModalOpen,
    setIsDeviceModalOpen,
  } = useStudent();

  const [isGradeMenuOpen, setIsGradeMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // Stays mounted while the menu closes: the profile editor returns focus here.
  const accountMenuToggleRef = useRef<HTMLButtonElement>(null);

  const grades: { id: Grade; label: string }[] = [
    { id: 'grade-6', label: 'Grade 6' },
    { id: 'grade-7', label: 'Grade 7' },
    { id: 'grade-8', label: 'Grade 8' },
    { id: 'grade-9', label: 'Grade 9' },
    { id: 'grade-10', label: 'Grade 10 (O/L)' },
    { id: 'grade-11', label: 'Grade 11 (O/L)' },
    { id: 'grade-12', label: 'Grade 12 (A/L)' },
    { id: 'grade-13', label: 'Grade 13 (A/L)' },
  ];

  const languages: { id: Language; label: string; flag: string }[] = [
    { id: 'en', label: 'English', flag: 'EN' },
    { id: 'si', label: 'සිංහල', flag: 'SI' },
    { id: 'ta', label: 'தமிழ்', flag: 'TA' },
  ];

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/tutor', label: t('nav.tutor'), highlight: true },
    { to: '/subjects', label: t('nav.subjects') },
    { to: '/practice', label: t('nav.practice') },
    { to: '/progress', label: t('nav.progress') },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo & Brand */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <img
                    src={ATLAS_MARK}
                    alt="ATLAS Mark"
                    className="w-9 h-9 object-contain rounded-xl bg-slate-900 p-1 shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-teal-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-extrabold tracking-tight text-slate-900">
                      ATLAS <span className="text-atlas-cyan">Learn</span>
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Neural Works</span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden md:flex items-center gap-1 ml-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-sm'
                          : link.highlight
                          ? 'text-atlas-blue hover:bg-sky-50'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {link.highlight && (
                        <img
                          src="/assets/tutor-avatar-icon.jpg"
                          alt=""
                          className="w-4 h-4 rounded-full inline mr-1.5 object-cover align-middle border border-cyan-400/50 -mt-0.5"
                        />
                      )}
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Controls: Grade, Language, Streak, Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Grade Switcher / Enrolled Grade Indicator */}
              <div className="relative">
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsGradeMenuOpen(!isGradeMenuOpen);
                      setIsLangMenuOpen(false);
                      setIsUserMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-sky-200 bg-sky-50/70 hover:bg-sky-100 text-xs font-bold text-sky-900 transition-all"
                    title="Enrolled Grade"
                  >
                    <GraduationCap className="w-4 h-4 text-sky-600" />
                    <span>{grades.find((g) => g.id === (registeredGrade || grade))?.label.replace('Grade ', 'Gr. ')}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-sky-200 text-sky-800">
                      Enrolled
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsGradeMenuOpen(!isGradeMenuOpen);
                      setIsLangMenuOpen(false);
                      setIsUserMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all"
                    title="Change Grade"
                  >
                    <GraduationCap className="w-4 h-4 text-atlas-cyan" />
                    <span>{grades.find((g) => g.id === grade)?.label.replace('Grade ', 'Gr. ')}</span>
                  </button>
                )}

                {isGradeMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95">
                    {isAuthenticated ? (
                      <div className="p-2 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                          <GraduationCap className="w-4 h-4 text-sky-600" />
                          <span>{grades.find((g) => g.id === (registeredGrade || grade))?.label}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                          You are enrolled in this grade. Your syllabus and AI Tutor are strictly aligned with this level. Contact{' '}
                          <a
                            href="https://wa.me/94714219219?text=Hello%20Neural%20Works%20support%2C%20I%20would%20like%20to%20request%20a%20grade%20transfer%20for%20my%20ATLAS%20Learn%20account."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-600 hover:underline font-semibold"
                          >
                            WhatsApp support (+94 714 219219)
                          </a>{' '}
                          to transfer grades.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Select Grade
                        </div>
                        {grades.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setGrade(item.id);
                              setIsGradeMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 rounded-lg ${
                              grade === item.id ? 'text-atlas-blue font-bold bg-sky-50' : 'text-slate-700'
                            }`}
                          >
                            {item.label}
                            {grade === item.id && <span className="w-2 h-2 rounded-full bg-atlas-blue" />}
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsLangMenuOpen(!isLangMenuOpen);
                    setIsGradeMenuOpen(false);
                    setIsUserMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all"
                  title="Change Language"
                >
                  <Globe className="w-4 h-4 text-atlas-teal" />
                  <span className="uppercase">{languages.find((l) => l.id === language)?.flag}</span>
                </button>

                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-slate-100 py-1 z-50">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Language
                    </div>
                    {languages.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setLanguage(item.id);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 ${
                          language === item.id ? 'text-atlas-teal font-bold bg-teal-50' : 'text-slate-700'
                        }`}
                      >
                        <span>{item.label}</span>
                        {language === item.id && <span className="w-2 h-2 rounded-full bg-atlas-teal" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Streak Counter: Pages demo only. LIVE has no genuine streak data (the profile API returns fixed values). */}
              {isMockCurriculum() && isAuthenticated && streakDays > 0 && (
                <div
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 border border-amber-200/80 rounded-xl text-xs font-bold text-amber-800"
                  title="Consecutive Learning Days"
                >
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                  <span>{streakDays}d</span>
                </div>
              )}

              {/* Authentication: User Dropdown or Sign In */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    ref={accountMenuToggleRef}
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={isUserMenuOpen}
                    data-testid="account-menu-toggle"
                    onClick={() => {
                      setIsUserMenuOpen(!isUserMenuOpen);
                      setIsGradeMenuOpen(false);
                      setIsLangMenuOpen(false);
                    }}
                    className="flex items-center gap-2 p-1 pl-2 pr-2.5 bg-slate-100 hover:bg-slate-200/80 rounded-full border border-slate-200/60 transition-all"
                    title="Account & Devices"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-atlas-navy to-atlas-cyan text-white text-[11px] font-bold flex items-center justify-center">
                      {(currentUser?.displayName || studentName).charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline text-xs font-semibold text-slate-800 truncate max-w-[130px]">
                      {currentUser?.displayName || studentName}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 py-2.5 border-b border-slate-100 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {currentUser?.displayName || studentName}
                          </p>
                          {accountStatus && (
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase flex-shrink-0 ${
                                accountStatus === 'ACTIVE'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : accountStatus === 'PENDING_PAYMENT'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-red-100 text-red-800 border border-red-200'
                              }`}
                            >
                              {accountStatus.replace('_', ' ')}
                            </span>
                          )}
                        </div>

                        {studentId && (
                          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded w-fit">
                            <span>ID: {studentId}</span>
                          </div>
                        )}

                        <div className="text-[10px] text-slate-500">
                          <span>{grades.find((g) => g.id === (registeredGrade || grade))?.label || 'Grade 10'}</span>
                          <span> &bull; Sri Lanka National Curriculum</span>
                        </div>
                      </div>

                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            openProfileEditor(accountMenuToggleRef.current);
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>Edit Profile</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            setIsDeviceModalOpen(true);
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Shield className="w-4 h-4 text-cyan-600" />
                          <span>Registered Devices</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={login}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                  title="Sign In with Student Account"
                >
                  <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Registered Devices Management Modal */}
      <DeviceManagementModal
        isOpen={isDeviceModalOpen}
        onClose={() => setIsDeviceModalOpen(false)}
      />
    </>
  );
};
