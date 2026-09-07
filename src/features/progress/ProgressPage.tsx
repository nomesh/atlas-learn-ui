import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Flame, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  Calendar, 
  Users, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import { MOCK_SUBJECTS } from '../../mocks/curriculumData';

export const ProgressPage: React.FC = () => {
  const { t } = useTranslation();
  const { studentName, streakDays, topicsMastered, questionsAnswered, accuracyPercent, language } = useStudent();

  const achievements = [
    {
      id: 'badge-1',
      title: 'Curious Mind',
      desc: 'Asked over 20 questions to ATLAS Tutor',
      image: '/assets/badge-curious.jpg',
      unlockedAt: 'Yesterday',
    },
    {
      id: 'badge-2',
      title: 'Science Explorer',
      desc: 'Completed Photosynthesis concept lesson',
      image: '/assets/badge-science.jpg',
      unlockedAt: '3 days ago',
    },
    {
      id: 'badge-3',
      title: '5-Day Streak',
      desc: 'Consistent daily revision on Sri Lankan syllabus',
      image: '/assets/badge-streak.jpg',
      unlockedAt: 'Today',
    },
    {
      id: 'badge-4',
      title: 'Math Wizard',
      desc: 'Attempted 10 Pythagoras calculations',
      image: '/assets/badge-math.jpg',
      unlockedAt: 'Last week',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          {t('progress.title')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t('progress.subtitle')}
        </p>
      </div>

      {/* 1. Core Summary Metrics Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Streak */}
        <div className="p-5 rounded-3xl bg-amber-50/80 border border-amber-200/70 shadow-sm flex flex-col justify-between">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 mb-2">
            <Flame className="w-5 h-5 fill-amber-500" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-950">
              {streakDays} <span className="text-xs font-semibold text-amber-800">days</span>
            </div>
            <div className="text-xs font-bold text-amber-900 mt-0.5">
              {t('progress.streakTitle')}
            </div>
          </div>
        </div>

        {/* Topics Mastered */}
        <div className="p-5 rounded-3xl bg-sky-50/80 border border-sky-200/70 shadow-sm flex flex-col justify-between">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 mb-2">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-950">
              {topicsMastered}
            </div>
            <div className="text-xs font-bold text-sky-900 mt-0.5">
              {t('progress.topicsMastered')}
            </div>
          </div>
        </div>

        {/* Questions Practiced */}
        <div className="p-5 rounded-3xl bg-teal-50/80 border border-teal-200/70 shadow-sm flex flex-col justify-between">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-600 mb-2">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-950">
              {questionsAnswered}
            </div>
            <div className="text-xs font-bold text-teal-900 mt-0.5">
              {t('progress.questionsAttempted')}
            </div>
          </div>
        </div>

        {/* Accuracy Rate */}
        <div className="p-5 rounded-3xl bg-indigo-50/80 border border-indigo-200/70 shadow-sm flex flex-col justify-between">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-2">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-950">
              {accuracyPercent}%
            </div>
            <div className="text-xs font-bold text-indigo-900 mt-0.5">
              {t('progress.accuracyRate')}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Subject Mastery Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-atlas-cyan" />
          <span>{t('progress.subjectMasteryTitle')}</span>
        </h2>

        <div className="space-y-4">
          {MOCK_SUBJECTS.map((sub) => (
            <div key={sub.id} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>{sub.name[language]}</span>
                <span className="text-slate-500">{sub.masteryPercentage}% Mastered</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-atlas-deep to-atlas-cyan rounded-full transition-all duration-500"
                  style={{ width: `${sub.masteryPercentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Subtle Motivational Achievements */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>{t('progress.badgesTitle')}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-3xl bg-gradient-to-br from-white to-slate-50/80 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border-2 border-white bg-slate-900 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    {item.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    Unlocked
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {item.desc}
                </p>
                <span className="text-[11px] text-slate-400 font-semibold block mt-1.5">
                  Achieved {item.unlockedAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Future Parent and Teacher Portal Preview Architecture */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-atlas-navy text-white border border-slate-800 shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-cyan-300 flex-shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {t('progress.futurePortalTitle')}
            </h3>
            <p className="text-xs text-cyan-100/80 mt-1 max-w-xl leading-relaxed">
              {t('progress.futurePortalDesc')}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 text-xs text-cyan-300 font-bold">
              <span>Parent reports, school classes & assignments in roadmap</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
