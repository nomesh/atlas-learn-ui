import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Sparkles, User, GraduationCap, Globe } from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import { ATLAS_MARK, NEURAL_WORKS_LOGO } from '../../brand/assets';
import type { Grade, Language } from '../../types';

export const OnboardingModal: React.FC = () => {
  const { t } = useTranslation();
  const {
    studentName,
    setStudentName,
    grade,
    setGrade,
    language,
    setLanguage,
    isOnboardingOpen,
    setIsOnboardingOpen,
  } = useStudent();

  const [localName, setLocalName] = useState(studentName);
  const [selectedLang, setSelectedLang] = useState<Language>(language);
  const [selectedGrade, setSelectedGrade] = useState<Grade>(grade);

  if (!isOnboardingOpen) return null;

  const languages: { id: Language; label: string; nativeName: string }[] = [
    { id: 'en', label: 'English', nativeName: 'English' },
    { id: 'si', label: 'Sinhala', nativeName: 'සිංහල' },
    { id: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  ];

  const grades: { id: Grade; label: string; sub: string }[] = [
    { id: 'grade-6', label: 'Grade 6', sub: 'Primary / Junior' },
    { id: 'grade-7', label: 'Grade 7', sub: 'Junior Secondary' },
    { id: 'grade-8', label: 'Grade 8', sub: 'Junior Secondary' },
    { id: 'grade-9', label: 'Grade 9', sub: 'Secondary' },
    { id: 'grade-10', label: 'Grade 10', sub: 'G.C.E. O/L' },
    { id: 'grade-11', label: 'Grade 11', sub: 'G.C.E. O/L' },
    { id: 'grade-12', label: 'Grade 12', sub: 'G.C.E. A/L' },
    { id: 'grade-13', label: 'Grade 13', sub: 'G.C.E. A/L' },
  ];

  const handleComplete = () => {
    if (localName.trim()) {
      setStudentName(localName.trim());
    }
    setLanguage(selectedLang);
    setGrade(selectedGrade);
    setIsOnboardingOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        {/* Header with Neural Works and ATLAS branding */}
        <div className="bg-gradient-to-br from-[#0B192C] to-[#1E3E62] px-6 py-7 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={ATLAS_MARK}
                alt="ATLAS Logo"
                className="w-10 h-10 object-contain rounded-xl bg-white/10 p-1 backdrop-blur-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-white">ATLAS Learn</h2>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-cyan-400/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-400/30">
                    L0 Prototype
                  </span>
                </div>
                <p className="text-xs text-slate-300">By Neural Works</p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <img
                src={NEURAL_WORKS_LOGO}
                alt="Neural Works"
                className="h-10 sm:h-12 w-auto max-w-[170px] sm:max-w-[210px] object-contain brightness-110 drop-shadow-md"
              />
            </div>
          </div>

          <div className="mt-5">
            <h1 className="text-2xl font-extrabold text-white">
              {t('onboarding.welcomeTitle')}
            </h1>
            <p className="text-sm text-cyan-100/90 mt-1">
              {t('onboarding.welcomeSubtitle')}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Student Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <User className="w-4 h-4 text-atlas-cyan" />
              What should ATLAS Tutor call you?
            </label>
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              placeholder="e.g. Nimali, Kaveen, Priya..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-atlas-cyan/50 focus:border-atlas-cyan transition-all"
            />
          </div>

          {/* 1. Language Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-atlas-cyan" />
              {t('onboarding.chooseLanguage')}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {languages.map((item) => {
                const isSelected = selectedLang === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedLang(item.id)}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'border-atlas-cyan bg-cyan-50/50 text-atlas-navy ring-2 ring-atlas-cyan/30 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className="text-base font-bold">{item.nativeName}</span>
                    <span className="text-xs text-slate-500 mt-0.5">{item.label}</span>
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-atlas-cyan text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Grade Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-atlas-cyan" />
              {t('onboarding.chooseGrade')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {grades.map((item) => {
                const isSelected = selectedGrade === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedGrade(item.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-atlas-cyan bg-cyan-50/50 text-atlas-navy ring-2 ring-atlas-cyan/30'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900">{item.label}</div>
                    <div className="text-[11px] text-slate-500 truncate">{item.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center">
            {t('onboarding.changeAnytime')}
          </p>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleComplete}
            className="w-full py-4 px-6 bg-gradient-to-r from-atlas-deep to-atlas-blue hover:from-slate-900 hover:to-atlas-deep text-white font-bold rounded-2xl shadow-lg shadow-atlas-blue/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]"
          >
            <Sparkles className="w-5 h-5 text-cyan-300" />
            <span>{t('onboarding.getStarted')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
