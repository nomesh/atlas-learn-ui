import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  X,
  LogIn,
  GraduationCap,
  Sparkles,
  Lock,
  User,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  School,
  Key,
  UserPlus,
  UserCheck,
  Globe,
} from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import { redirectToLogin } from '../../api/authApi';
import { ATLAS_MARK, NEURAL_WORKS_LOGO } from '../../brand/assets';
import type { Grade, Language } from '../../types';

interface PilotStudentProfile {
  id: string;
  name: string;
  grade: Grade;
  gradeLabel: string;
  language: Language;
  school: string;
  curriculum: string;
  avatarColor: string;
  subjects: string[];
}

const PILOT_PROFILES: PilotStudentProfile[] = [
  {
    id: 'stu-ol-10-amila',
    name: 'Amila Jayasinghe',
    grade: 'grade-10',
    gradeLabel: 'Grade 10 (G.C.E. O/L)',
    language: 'en',
    school: 'Ananda College, Colombo',
    curriculum: 'Sri Lankan National Curriculum (O/L Candidate)',
    avatarColor: 'from-sky-500 to-indigo-600',
    subjects: ['History', 'Science', 'Mathematics', 'ICT'],
  },
  {
    id: 'stu-jr-08-kaveen',
    name: 'Kaveen Silva',
    grade: 'grade-8',
    gradeLabel: 'Grade 8 (Junior Secondary)',
    language: 'en',
    school: 'St. Joseph\'s College, Colombo',
    curriculum: 'Sri Lankan National Curriculum (Junior)',
    avatarColor: 'from-emerald-500 to-teal-700',
    subjects: ['Science', 'ICT', 'Mathematics', 'English'],
  },
  {
    id: 'stu-ol-10-priya',
    name: 'Priya Sivalingam',
    grade: 'grade-10',
    gradeLabel: 'Grade 10 (G.C.E. O/L)',
    language: 'ta',
    school: 'Chundikuli Girls\' College, Jaffna',
    curriculum: 'Sri Lankan National Curriculum (O/L Candidate)',
    avatarColor: 'from-amber-500 to-rose-600',
    subjects: ['Mathematics', 'Science', 'History', 'Tamil'],
  },
];

export const StudentSignInModal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const {
    isSignInModalOpen,
    setIsSignInModalOpen,
    signInModalTab,
    signInStudent,
    isAuthenticated,
    setIsOnboardingOpen,
  } = useStudent();

  const [activeTab, setActiveTab] = useState<'pilot' | 'manual'>('pilot');
  const [selectedPilotId, setSelectedPilotId] = useState<string>(PILOT_PROFILES[0].id);

  // Manual Credentials Form State
  const [studentId, setStudentId] = useState('');
  const [studentNameInput, setStudentNameInput] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<Grade>('grade-10');
  const [selectedLang, setSelectedLang] = useState<Language>('en');
  const [schoolName, setSchoolName] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSignInModalOpen && signInModalTab) {
      setActiveTab(signInModalTab);
    }
  }, [isSignInModalOpen, signInModalTab]);

  if (!isSignInModalOpen) return null;

  const handleClose = () => {
    setIsSignInModalOpen(false);
    if (!isAuthenticated && !localStorage.getItem('atlas_onboarding_completed')) {
      setIsOnboardingOpen(true);
    }
  };

  const handlePilotSignIn = async (profile: PilotStudentProfile) => {
    setIsSubmitting(true);
    try {
      signInStudent({
        id: profile.id,
        displayName: profile.name,
        grade: profile.grade,
        language: profile.language,
        school: profile.school,
        curriculumCode: 'SL-MOE',
        enrolledSubjects: profile.subjects,
      });
      localStorage.setItem('atlas_onboarding_completed', 'true');
      setIsSignInModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = studentNameInput.trim() || 'Amila Perera';
    const finalId = studentId.trim() || `STU-${Date.now().toString().slice(-6)}`;
    const finalSchool = schoolName.trim() || 'Sri Lanka National School';

    setIsSubmitting(true);
    try {
      signInStudent({
        id: finalId,
        displayName: finalName,
        grade: selectedGrade,
        language: selectedLang,
        school: finalSchool,
        curriculumCode: 'SL-MOE',
        enrolledSubjects: ['History', 'Science', 'Mathematics', 'ICT'],
      });
      localStorage.setItem('atlas_onboarding_completed', 'true');
      setIsSignInModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0ea5e9] p-6 sm:p-7 text-white relative">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={ATLAS_MARK}
                alt="ATLAS"
                className="w-10 h-10 object-contain rounded-xl bg-white/10 p-1 backdrop-blur-sm"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-400 rounded-full flex items-center justify-center border-2 border-[#0B192C]">
                <Lock className="w-2.5 h-2.5 text-slate-900" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold tracking-tight text-white">ATLAS Learn</h3>
                <span className="text-[10px] font-mono bg-cyan-400/20 text-cyan-200 border border-cyan-400/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Student Sign-In
                </span>
              </div>
              <p className="text-xs text-slate-300">Sri Lanka National EdTech Platform &bull; Neural Works</p>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Student Authentication Portal
            </h2>
            <p className="text-xs sm:text-sm text-cyan-100/90 mt-1 leading-relaxed">
              Sign in to unlock your verified AI Tutor, syllabus-grounded guided lessons, exam simulator, and persistent study streaks.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-5 flex gap-2 p-1 bg-black/20 rounded-2xl backdrop-blur-sm border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('pilot')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'pilot'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-cyan-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Quick Demo Profiles</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'manual'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-cyan-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 text-cyan-500" />
              <span>Create New Account</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {activeTab === 'pilot' ? (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>Select an authorized pilot student profile to authenticate instantly:</span>
              </div>

              <div className="grid gap-3">
                {PILOT_PROFILES.map((profile) => {
                  const isSelected = selectedPilotId === profile.id;
                  return (
                    <div
                      key={profile.id}
                      onClick={() => setSelectedPilotId(profile.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-cyan-500 bg-cyan-50/40 ring-2 ring-cyan-500/20 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${profile.avatarColor} text-white font-extrabold flex items-center justify-center text-sm shadow-sm flex-shrink-0`}
                        >
                          {profile.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900 truncate">{profile.name}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                              {profile.language.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                            {profile.gradeLabel} &bull; {profile.school}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                            {profile.subjects.map((sub) => (
                              <span
                                key={sub}
                                className="text-[10px] bg-white border border-slate-200 text-slate-600 px-1.5 py-0.2 rounded"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePilotSignIn(profile);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all flex-shrink-0 ${
                          isSelected
                            ? 'bg-slate-900 hover:bg-slate-800 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                      >
                        <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Sign In</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Instant sign in with currently selected profile button */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  const p = PILOT_PROFILES.find((x) => x.id === selectedPilotId) || PILOT_PROFILES[0];
                  handlePilotSignIn(p);
                }}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 hover:from-slate-900 hover:to-slate-800 text-white font-bold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>
                  Sign In as {PILOT_PROFILES.find((x) => x.id === selectedPilotId)?.name || 'Selected Student'}
                </span>
                <ArrowRight className="w-4 h-4 text-cyan-400 ml-1" />
              </button>

              <div className="pt-2 text-center border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveTab('manual')}
                  className="text-xs text-sky-600 hover:text-sky-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Want to create a custom profile with your own name & grade? Register here</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div className="p-3 bg-sky-50 border border-sky-100 rounded-2xl text-xs text-sky-900 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>
                  Register as a new student to unlock full interactive AI Tutoring, exam prep, and study progress.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-atlas-cyan" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentNameInput}
                    onChange={(e) => setStudentNameInput(e.target.value)}
                    placeholder="e.g. Amila Perera"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-atlas-cyan" />
                    <span>Grade Level *</span>
                  </label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value as Grade)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  >
                    <option value="grade-6">Grade 6 (Junior)</option>
                    <option value="grade-7">Grade 7 (Junior)</option>
                    <option value="grade-8">Grade 8 (Junior Secondary)</option>
                    <option value="grade-9">Grade 9 (Secondary)</option>
                    <option value="grade-10">Grade 10 (G.C.E. O/L Candidate)</option>
                    <option value="grade-11">Grade 11 (G.C.E. O/L Candidate)</option>
                    <option value="grade-12">Grade 12 (G.C.E. A/L)</option>
                    <option value="grade-13">Grade 13 (G.C.E. A/L)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-atlas-cyan" />
                    <span>Preferred Language</span>
                  </label>
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value as Language)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  >
                    <option value="en">English</option>
                    <option value="si">Sinhala (සිංහල)</option>
                    <option value="ta">Tamil (தமிழ்)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <School className="w-3.5 h-3.5 text-atlas-cyan" />
                    <span>School / Institution (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="e.g. Ananda College, Colombo"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-atlas-cyan" />
                    <span>Student / Index No (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Auto-assigned if blank"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-atlas-cyan" />
                    <span>PIN Code / Password (Optional)</span>
                  </label>
                  <input
                    type="password"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="e.g. 2026 or leave blank"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-700 hover:from-cyan-500 hover:to-indigo-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-cyan-200" />
                <span>Create Student Account &amp; Start Learning</span>
              </button>
            </form>
          )}

          {/* Institutional SSO Section */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>School District or Institutional User?</span>
            </div>
            <button
              type="button"
              onClick={() => redirectToLogin('/')}
              className="text-xs text-sky-700 hover:text-sky-900 font-bold underline underline-offset-4 transition-colors cursor-pointer"
            >
              Sign In via Institutional Keycloak SSO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
