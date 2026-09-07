import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  Compass, 
  ArrowRight, 
  Flame, 
  Play, 
  Atom, 
  Calculator, 
  Landmark, 
  Cpu, 
  Globe, 
  Info
} from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import { TutorAvatar } from '../avatar/TutorAvatar';
import { MOCK_SUBJECTS, MOCK_TOPICS } from '../../mocks/curriculumData';

export const StudentHomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { studentName, grade, language, streakDays, tutorState, setCurriculumSubject } = useStudent();

  const continueTopic = MOCK_TOPICS.find((t) => t.id === 'photosynthesis') || MOCK_TOPICS[0];
  const continueSubject = MOCK_SUBJECTS.find((s) => s.id === continueTopic.subjectId) || MOCK_SUBJECTS[0];

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom': return <Atom className="w-5 h-5 text-sky-500" />;
      case 'Calculator': return <Calculator className="w-5 h-5 text-indigo-500" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-amber-500" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-500" />;
      case 'Globe': return <Globe className="w-5 h-5 text-teal-500" />;
      default: return <BookOpen className="w-5 h-5 text-violet-500" />;
    }
  };

  const actions = [
    {
      id: 'teach-me',
      title: t('home.actions.teachMe'),
      desc: t('home.actions.teachMeDesc'),
      icon: Compass,
      color: 'bg-sky-500 text-white',
      border: 'hover:border-sky-300',
      glow: 'shadow-sky-100',
      onClick: () => {
        setCurriculumSubject('science', 'photosynthesis');
        navigate('/learn/photosynthesis');
      },
    },
    {
      id: 'ask-question',
      title: t('home.actions.question'),
      desc: t('home.actions.questionDesc'),
      icon: Sparkles,
      color: 'bg-atlas-navy text-cyan-300',
      border: 'hover:border-cyan-400',
      glow: 'shadow-cyan-100',
      onClick: () => navigate('/tutor'),
    },
    {
      id: 'homework',
      title: t('home.actions.homework'),
      desc: t('home.actions.homeworkDesc'),
      icon: FileText,
      color: 'bg-teal-600 text-white',
      border: 'hover:border-teal-300',
      glow: 'shadow-teal-100',
      onClick: () => navigate('/tutor?mode=homework'),
    },
    {
      id: 'practice-exam',
      title: t('home.actions.practice'),
      desc: t('home.actions.practiceDesc'),
      icon: CheckCircle2,
      color: 'bg-amber-500 text-white',
      border: 'hover:border-amber-300',
      glow: 'shadow-amber-100',
      onClick: () => navigate('/practice'),
    },
    {
      id: 'textbook',
      title: t('home.actions.textbook'),
      desc: t('home.actions.textbookDesc'),
      icon: BookOpen,
      color: 'bg-indigo-600 text-white',
      border: 'hover:border-indigo-300',
      glow: 'shadow-indigo-100',
      onClick: () => navigate('/subjects'),
    },
    {
      id: 'continue',
      title: t('home.actions.continue'),
      desc: t('home.actions.continueDesc'),
      icon: Play,
      color: 'bg-emerald-600 text-white',
      border: 'hover:border-emerald-300',
      glow: 'shadow-emerald-100',
      onClick: () => {
        setCurriculumSubject('science', 'photosynthesis');
        navigate('/learn/photosynthesis');
      },
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. Hero & Personalized Greeting Area with ATLAS Tutor Companion */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B192C] via-[#1E3E62] to-[#0ea5e9] text-white p-6 sm:p-8 shadow-xl">
        {/* Subtle background circuit/ambient glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Greeting Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-cyan-200 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{grade.replace('-', ' ').toUpperCase()} • Sri Lankan Syllabus</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              {t('home.greetingTitle', { name: studentName })}
            </h1>
            <p className="text-sm sm:text-base text-cyan-100/90 mt-2 max-w-xl">
              {t('home.greetingSubtitle')}
            </p>

            {/* Quick Ask Bar */}
            <div className="mt-5 flex items-center gap-2 max-w-md bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
              <input
                type="text"
                placeholder={t('home.askTutorPrompt')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    navigate(`/tutor?q=${encodeURIComponent(e.currentTarget.value.trim())}`);
                  }
                }}
                className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder:text-cyan-200/60 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => navigate('/tutor')}
                className="px-4 py-2 bg-white text-atlas-navy hover:bg-cyan-50 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Ask</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Tutor Companion Card */}
          <div className="flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 sm:p-6 w-full md:w-72 shadow-inner">
            <TutorAvatar state={tutorState} size="lg" />

            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ATLAS Tutor</span>
              </div>
              <p className="text-xs text-cyan-100/90 mt-1 italic leading-relaxed">
                "{t('home.tutorSpeech')}"
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/tutor')}
              className="mt-4 w-full py-2.5 px-4 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-900 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Talk with Tutor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Primary Learning Action Grid (6 Key Student Actions) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-atlas-cyan" />
            <span>Learning Actions</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">Select an activity to begin</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                type="button"
                onClick={act.onClick}
                className={`group flex flex-col items-start p-4 rounded-2xl bg-white border border-slate-200/90 hover:shadow-lg transition-all text-left ${act.border}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-sm ${act.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-atlas-blue transition-colors line-clamp-1">
                  {act.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-snug">
                  {act.desc}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Continue Learning Card */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0 text-sky-600">
              <Atom className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                  {continueSubject.name[language]}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-medium text-slate-500">
                  {t('home.continueLearning.chapter', { chapter: continueTopic.chapterNumber })}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                {continueTopic.title[language]}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                {continueTopic.description[language]}
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-3">
            <div className="w-36 sm:w-32">
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Progress</span>
                <span className="text-sky-600">{continueTopic.completedPercentage}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full"
                  style={{ width: `${continueTopic.completedPercentage}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setCurriculumSubject('science', 'photosynthesis');
                navigate('/learn/photosynthesis');
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-atlas-blue text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm flex-shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{t('home.continueLearning.resume')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Subject Discovery Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {t('home.subjects.title')}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('home.subjects.subtitle')}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/subjects')}
            className="text-xs font-bold text-atlas-blue hover:text-atlas-deep flex items-center gap-1"
          >
            <span>{t('home.subjects.viewAll')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_SUBJECTS.map((sub) => {
            return (
              <div
                key={sub.id}
                onClick={() => {
                  setCurriculumSubject(sub.id);
                  navigate(`/subjects/${sub.id}`);
                }}
                className="group p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getSubjectIcon(sub.iconName)}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 px-2.5 py-1 bg-slate-50 rounded-full">
                      {t('home.subjects.topicsCount', { count: sub.topicsCount })}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-atlas-blue transition-colors">
                    {sub.name[language]}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {sub.description[language]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400">
                      {t('home.subjects.mastery')}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {sub.masteryPercentage}%
                    </span>
                  </div>
                  <span className="text-xs font-bold text-atlas-cyan group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Explicit Non-Official Demo Disclaimer */}
      <div className="flex items-center gap-2 p-3 bg-slate-100/80 rounded-2xl text-[11px] text-slate-500 border border-slate-200/60">
        <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <span>{t('home.sampleNotice')}</span>
      </div>
    </div>
  );
};
