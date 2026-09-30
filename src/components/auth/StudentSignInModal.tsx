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
  CheckCircle2,
  ArrowRight,
  Key,
  UserPlus,
  Globe,
  Loader2,
  Phone,
  Copy,
  Check,
  MessageCircle,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import { registerStudent, loginWithPassword, type RegisterResponse } from '../../api/authApi';
import type { LearnSessionData } from '../../api/authApi';
import { ATLAS_MARK } from '../../brand/assets';
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
    refreshSession,
  } = useStudent();

  const showDemoProfiles = import.meta.env.VITE_ENABLE_DEMO_PROFILES === 'true';

  type ModalView = 'signin' | 'register' | 'success' | 'pilot';
  const [currentView, setCurrentView] = useState<ModalView>('signin');
  const [selectedPilotId, setSelectedPilotId] = useState<string>(PILOT_PROFILES[0].id);

  // Sign In Form State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form State
  const [fullName, setFullName] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<Grade>('grade-10');
  const [selectedLang, setSelectedLang] = useState<Language>('en');

  // Registration Success Result State
  const [regResult, setRegResult] = useState<RegisterResponse | null>(null);
  const [hasCopiedId, setHasCopiedId] = useState(false);

  // Submission & Error State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isSignInModalOpen) {
      setErrorMessage(null);
      if (signInModalTab === 'pilot' && showDemoProfiles) {
        setCurrentView('pilot');
      } else if (signInModalTab === 'manual') {
        setCurrentView('signin');
      }
    }
  }, [isSignInModalOpen, signInModalTab, showDemoProfiles]);

  if (!isSignInModalOpen) return null;

  const handleClose = () => {
    setIsSignInModalOpen(false);
    if (!isAuthenticated && !localStorage.getItem('atlas_onboarding_completed')) {
      setIsOnboardingOpen(true);
    }
  };

  const handleCopyStudentId = () => {
    if (regResult?.studentId) {
      navigator.clipboard.writeText(regResult.studentId);
      setHasCopiedId(true);
      setTimeout(() => setHasCopiedId(false), 2500);
    }
  };

  /** Maps a successful LearnSessionData response into the student context */
  const applySession = (data: LearnSessionData) => {
    const learner = data.activeLearner;
    signInStudent({
      id: data.studentId || learner?.id || data.userId || `stu-${Date.now()}`,
      displayName: learner?.displayName || data.displayName || loginUsername || 'Student',
      grade: (data.registeredGrade as Grade) || (learner?.grade as Grade) || selectedGrade,
      language: (learner?.preferredLanguage as Language) || selectedLang,
      curriculumCode: learner?.curriculumCode || 'SL-MOE',
      enrolledSubjects: learner?.enrolledSubjects || ['History', 'Science', 'Mathematics', 'ICT'],
    });
    localStorage.setItem('atlas_onboarding_completed', 'true');
    setIsSignInModalOpen(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const data = await loginWithPassword({
        username: loginUsername.trim(),
        password: loginPassword,
      });

      // If backend reports account status is pending payment or suspended
      if (data.accountStatus === 'PENDING_PAYMENT') {
        setErrorMessage(
          'Your account is awaiting payment activation. Please send your payment slip via WhatsApp to Neural Works.'
        );
        return;
      }
      if (data.accountStatus === 'SUSPENDED' || data.accountStatus === 'EXPIRED') {
        setErrorMessage(
          `Your ATLAS Learn account is ${data.accountStatus.toLowerCase()}. Please contact support via WhatsApp.`
        );
        return;
      }

      applySession(data);
      await refreshSession();
    } catch (err: unknown) {
      const resp = (err as { response?: { status?: number; data?: { message?: string; error?: string } } })?.response;
      const status = resp?.status;
      const serverMsg = resp?.data?.message || resp?.data?.error;

      if (status === 401) {
        setErrorMessage('Incorrect username or password. Please verify your credentials.');
      } else if (status === 403) {
        if (serverMsg && serverMsg.toLowerCase().includes('device')) {
          setErrorMessage(
            'Device limit reached: You can register a maximum of 2 devices. Please sign in from an existing device or contact support.'
          );
        } else if (serverMsg && serverMsg.toLowerCase().includes('activation')) {
          setErrorMessage(serverMsg);
        } else {
          setErrorMessage(serverMsg || 'Access denied. Your account may be pending payment activation or suspended.');
        }
      } else {
        setErrorMessage(serverMsg || 'Could not connect to the authentication server. Please check your internet connection.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await registerStudent({
        fullName: fullName.trim(),
        username: registerUsername.trim(),
        password: registerPassword,
        mobileNumber: mobileNumber.trim(),
        grade: selectedGrade,
        preferredLanguage: selectedLang,
      });

      setRegResult(res);
      setLoginUsername(res.username);
      setCurrentView('success');
    } catch (err: unknown) {
      const resp = (err as { response?: { status?: number; data?: { message?: string; error?: string } } })?.response;
      const status = resp?.status;
      const serverMsg = resp?.data?.message || resp?.data?.error;

      if (status === 409) {
        setErrorMessage(
          'That username is already taken. Please choose a different username or sign in if you already registered.'
        );
      } else if (status === 400) {
        setErrorMessage(serverMsg || 'Please ensure all required fields are filled correctly.');
      } else {
        setErrorMessage(serverMsg || 'Failed to create student account. Please check your network and try again.');
      }
    } finally {
      setIsSubmitting(false);
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

  const whatsappHref = regResult
    ? `https://wa.me/${(regResult.whatsappSupportNumber || '+94771234567').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
        `Hello Neural Works! I just registered for ATLAS Learn.\n\nStudent ID: ${regResult.studentId}\nName: ${regResult.fullName}\nGrade: ${regResult.grade}\n\nHere is my payment slip for account activation.`
      )}`
    : '#';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0284c7] p-6 text-white relative">
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
                  Student Portal
                </span>
              </div>
              <p className="text-xs text-slate-300">National EdTech Platform &bull; Neural Works</p>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-extrabold text-white">
              {currentView === 'register' && 'Create Your Student Account'}
              {currentView === 'signin' && 'Welcome Back, Student'}
              {currentView === 'success' && 'Registration Complete!'}
              {currentView === 'pilot' && 'Demo Sandbox Profiles'}
            </h2>
            <p className="text-xs text-cyan-100/90 mt-1 leading-relaxed">
              {currentView === 'register' && 'Get your permanent Student ID (ATL-26-XXXXXX) and personalized syllabus access.'}
              {currentView === 'signin' && 'Sign in to access your registered curriculum, AI Tutor, and study progress.'}
              {currentView === 'success' && 'Your Student ID has been generated. Activate your account to start learning.'}
              {currentView === 'pilot' && 'Select an evaluation profile for testing without creating an account.'}
            </p>
          </div>

          {/* Tab Switcher (Sign In vs Create Account) */}
          {currentView !== 'success' && (
            <div className="mt-4 flex gap-1.5 p-1 bg-black/25 rounded-2xl backdrop-blur-sm border border-white/10">
              <button
                type="button"
                onClick={() => { setCurrentView('signin'); setErrorMessage(null); }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  currentView === 'signin'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-cyan-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 text-sky-600" />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => { setCurrentView('register'); setErrorMessage(null); }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  currentView === 'register'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-cyan-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5 text-cyan-500" />
                <span>Create Account</span>
              </button>

              {showDemoProfiles && (
                <button
                  type="button"
                  onClick={() => { setCurrentView('pilot'); setErrorMessage(null); }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    currentView === 'pilot'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-cyan-100 hover:text-white hover:bg-white/10'
                  }`}
                  title="Demo Profiles"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Demo</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {/* VIEW 1: SIGN IN */}
          {currentView === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-600" />
                  <span>Username or Student ID *</span>
                </label>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="e.g. amila or ATL-26-001001"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-sky-600" />
                  <span>Password *</span>
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !loginUsername || !loginPassword}
                  className="w-full py-3.5 px-5 bg-gradient-to-r from-sky-600 to-indigo-700 hover:from-sky-500 hover:to-indigo-600 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 text-sky-200 animate-spin" />
                      <span>Signing In…</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 text-sky-200" />
                      <span>Sign In to Learn</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-3 text-center border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  New to ATLAS Learn?{' '}
                  <button
                    type="button"
                    onClick={() => { setCurrentView('register'); setErrorMessage(null); }}
                    className="text-sky-600 hover:text-sky-800 font-bold hover:underline cursor-pointer"
                  >
                    Create Account &amp; Get Student ID
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* VIEW 2: CREATE ACCOUNT */}
          {currentView === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-sky-600" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Kasun Bandara"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-sky-600" />
                    <span>WhatsApp Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="e.g. 0771234567"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-sky-600" />
                    <span>Desired Username *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_.-]/g, ''))}
                    placeholder="e.g. kasun_b"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-sky-600" />
                    <span>Password *</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                    <span>Registered Grade *</span>
                  </label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value as Grade)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                  >
                    <option value="grade-6">Grade 6 (Junior)</option>
                    <option value="grade-7">Grade 7 (Junior)</option>
                    <option value="grade-8">Grade 8 (Junior)</option>
                    <option value="grade-9">Grade 9 (Secondary)</option>
                    <option value="grade-10">Grade 10 (G.C.E. O/L)</option>
                    <option value="grade-11">Grade 11 (G.C.E. O/L)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-sky-600" />
                    <span>Language Medium *</span>
                  </label>
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value as Language)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                  >
                    <option value="en">English Medium</option>
                    <option value="si">Sinhala Medium (සිංහල)</option>
                    <option value="ta">Tamil Medium (தமிழ்)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-[11px] text-amber-900 leading-relaxed">
                <span className="font-bold">Note:</span> After creating your account, your unique Student ID (e.g. <span className="font-mono font-bold">ATL-26-XXXXXX</span>) will be issued. Account activation occurs upon WhatsApp payment slip verification.
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !fullName || !registerUsername || !registerPassword || !mobileNumber}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-700 hover:from-sky-500 hover:to-indigo-600 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 text-sky-200 animate-spin" />
                    <span>Creating Account…</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 text-sky-200" />
                    <span>Create Account &amp; Get Student ID</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => { setCurrentView('signin'); setErrorMessage(null); }}
                    className="text-sky-600 hover:text-sky-800 font-bold hover:underline cursor-pointer"
                  >
                    Sign In here
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* VIEW 3: REGISTRATION SUCCESS / PAYMENT INSTRUCTIONS */}
          {currentView === 'success' && regResult && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-emerald-950">Student Account Created!</h4>
                  <p className="text-xs text-emerald-800">Your account is created and awaiting payment activation.</p>
                </div>
              </div>

              {/* Student ID Card */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Student ID</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 uppercase tracking-wide">
                    Payment Pending
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="font-mono text-lg font-black text-slate-900 tracking-wider">
                    {regResult.studentId}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyStudentId}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    {hasCopiedId ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1 border-t border-slate-200/60">
                  <div>
                    <span className="text-slate-400">Student Name:</span>
                    <p className="font-bold text-slate-800 truncate">{regResult.fullName}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Registered Grade:</span>
                    <p className="font-bold text-slate-800 uppercase">{regResult.grade.replace('-', ' ')}</p>
                  </div>
                </div>
              </div>

              {/* Activation Instructions */}
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl space-y-3">
                <div className="flex items-start gap-2.5">
                  <MessageCircle className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-sky-950 leading-relaxed">
                    <span className="font-bold">Next Step: Account Activation</span>
                    <p className="mt-1 text-sky-900">
                      Send your <span className="font-mono font-bold">{regResult.studentId}</span> and bank deposit / transfer slip via WhatsApp to Neural Works. Our team will verify and activate your account immediately.
                    </p>
                  </div>
                </div>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Payment Slip via WhatsApp</span>
                </a>
              </div>

              {/* Proceed to Sign In */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('signin');
                    setErrorMessage(null);
                  }}
                  className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Go to Sign In</span>
                </button>
              </div>
            </div>
          )}

          {/* VIEW 4: DEMO PROFILES (ONLY WHEN VITE_ENABLE_DEMO_PROFILES === 'true') */}
          {currentView === 'pilot' && showDemoProfiles && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>Select an authorized sandbox profile for evaluation:</span>
              </div>

              <div className="grid gap-2.5">
                {PILOT_PROFILES.map((profile) => {
                  const isSelected = selectedPilotId === profile.id;
                  return (
                    <div
                      key={profile.id}
                      onClick={() => setSelectedPilotId(profile.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/50 ring-2 ring-sky-500/20 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${profile.avatarColor} text-white font-extrabold flex items-center justify-center text-xs shadow-sm flex-shrink-0`}
                        >
                          {profile.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{profile.name}</h4>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {profile.gradeLabel} &bull; {profile.school}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePilotSignIn(profile);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <LogIn className="w-3 h-3 text-cyan-400" />
                        <span>Sign In</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-center border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentView('signin')}
                  className="text-xs text-sky-600 hover:text-sky-800 font-semibold cursor-pointer"
                >
                  Return to standard Student Sign In
                </button>
              </div>
            </div>
          )}

          {/* Help & Support Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              Need assistance?
            </span>
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:underline font-semibold"
            >
              WhatsApp Support (+94 77 123 4567)
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
