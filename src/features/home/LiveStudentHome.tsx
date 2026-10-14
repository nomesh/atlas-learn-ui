import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, BookOpen, Compass, GraduationCap, LibraryBig, MessageCircleQuestion, Sparkles } from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import { TutorAvatar } from '../avatar/TutorAvatar';
import {
  isSubjectMediumAvailable,
  useCurriculumAvailability,
  type SubjectAvailability,
} from '../../curriculum/liveCurriculum';
import type { Language } from '../../types';

/**
 * LIVE learner dashboard. Everything shown is either the signed-in learner's own server data (name, grade) or what
 * the ATLAS API reports for the grade (/api/learn/curriculum/availability). It has no sample topics, mastery,
 * progress, topic counts or "continue learning" card: the API has no server-saved learning position yet, so that card
 * is not shown. The full subject catalogue stays on /subjects.
 */

const TEXT: Record<string, Record<Language, string>> = {
  welcome: { en: 'Welcome back! 👋', si: 'නැවතත් සාදරයෙන් පිළිගනිමු! 👋', ta: 'மீண்டும் வருக! 👋' },
  syllabus: { en: 'Sri Lanka National Curriculum', si: 'ශ්‍රී ලංකා ජාතික විෂය නිර්දේශය', ta: 'இலங்கை தேசிய பாடத்திட்டம்' },
  tutorCard: {
    en: 'Ask the ATLAS Tutor about your textbook. Answers cite the textbook pages they come from.',
    si: 'ඔබේ පෙළපොත ගැන ATLAS ගුරුතුමාගෙන් අසන්න. පිළිතුරු ඒවා ලැබුණු පෙළපොත් පිටු සඳහන් කරයි.',
    ta: 'உங்கள் பாடநூல் பற்றி ATLAS ஆசிரியரிடம் கேளுங்கள். பதில்கள் அவை எடுக்கப்பட்ட பாடநூல் பக்கங்களைக் குறிப்பிடும்.',
  },
  talkWithTutor: { en: 'Talk with Tutor', si: 'ගුරුතුමා සමඟ කතා කරන්න', ta: 'ஆசிரியருடன் பேசுங்கள்' },
  ask: { en: 'Ask', si: 'අසන්න', ta: 'கேள்' },
  actionsTitle: { en: 'Learning actions', si: 'ඉගෙනුම් ක්‍රියාකාරකම්', ta: 'கற்றல் செயல்கள்' },
  browseSubjects: { en: 'Browse subjects', si: 'විෂයයන් බලන්න', ta: 'பாடங்களைப் பார்க்கவும்' },
  browseSubjectsDesc: {
    en: 'See what is available for your grade',
    si: 'ඔබේ ශ්‍රේණියට ලබා ගත හැකි දේ බලන්න',
    ta: 'உங்கள் தரத்திற்கு கிடைப்பதைப் பார்க்கவும்',
  },
  studyTopic: { en: 'Study a topic', si: 'මාතෘකාවක් අධ්‍යයනය කරන්න', ta: 'ஒரு தலைப்பைப் படிக்கவும்' },
  studyTopicDesc: { en: 'Approved topics are available', si: 'අනුමත මාතෘකා ලබා ගත හැක', ta: 'அங்கீகரிக்கப்பட்ட தலைப்புகள் கிடைக்கின்றன' },
  summaryTitle: { en: 'Your subjects', si: 'ඔබේ විෂයයන්', ta: 'உங்கள் பாடங்கள்' },
  withTopics: { en: 'With approved topics', si: 'අනුමත මාතෘකා සහිත', ta: 'அங்கீகரிக்கப்பட்ட தலைப்புகளுடன்' },
  textbookOnly: { en: 'Textbook questions only', si: 'පෙළපොත් ප්‍රශ්න පමණි', ta: 'பாடநூல் கேள்விகள் மட்டும்' },
  notYet: { en: 'Not yet available', si: 'තවමත් ලබා ගත නොහැක', ta: 'இன்னும் கிடைக்கவில்லை' },
  viewAll: { en: 'View all subjects', si: 'සියලු විෂයයන් බලන්න', ta: 'அனைத்து பாடங்களையும் பார்க்கவும்' },
  loading: { en: 'Loading your subjects…', si: 'ඔබේ විෂයයන් පූරණය වෙමින්…', ta: 'உங்கள் பாடங்கள் ஏற்றப்படுகின்றன…' },
  loadError: {
    en: 'Your subjects could not be loaded. The Tutor is still available; please try again later.',
    si: 'ඔබේ විෂයයන් පූරණය කළ නොහැකි විය. ගුරුතුමා තවමත් ලබා ගත හැක; පසුව නැවත උත්සාහ කරන්න.',
    ta: 'உங்கள் பாடங்களை ஏற்ற முடியவில்லை. ஆசிரியர் இன்னும் கிடைக்கிறார்; பின்னர் மீண்டும் முயற்சிக்கவும்.',
  },
  noneReported: {
    en: 'No subjects are available for your grade yet.',
    si: 'ඔබේ ශ්‍රේණියට තවමත් විෂයයන් ලබා ගත නොහැක.',
    ta: 'உங்கள் தரத்திற்கு இன்னும் பாடங்கள் கிடைக்கவில்லை.',
  },
};

const gradeLabel = (grade: string) => grade.replace('-', ' ').toUpperCase();

export const LiveStudentHome: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { studentName, grade, language, tutorState, setCurriculumSubject } = useStudent();
  const availability = useCurriculumAvailability(grade);
  const [question, setQuestion] = useState('');

  const subjects = availability.data?.subjects ?? [];
  const withTopics = subjects.filter((s) => s.topicsAvailable && isSubjectMediumAvailable(s, language));
  const textbookOnly = subjects.filter((s) => !s.topicsAvailable && isSubjectMediumAvailable(s, language));
  const notYet = subjects.filter((s) => !withTopics.includes(s) && !textbookOnly.includes(s));
  const firstTopicSubject = withTopics[0];

  const askTutor = () => {
    const q = question.trim();
    navigate(q ? `/tutor?${new URLSearchParams({ q }).toString()}` : '/tutor');
  };

  const openSubject = (s: SubjectAvailability) => {
    if (!isSubjectMediumAvailable(s, language)) return;
    const code = s.subjectCode.toLowerCase();
    if (s.topicsAvailable) {
      setCurriculumSubject(code);
      navigate(`/subjects/${code}`);
    } else {
      navigate(`/tutor?subject=${encodeURIComponent(code)}`);
    }
  };

  const actions: { id: string; title: string; desc: string; icon: React.ElementType; onClick: () => void }[] = [
    {
      id: 'ask-question',
      title: t('home.actions.question'),
      desc: t('home.actions.questionDesc'),
      icon: Sparkles,
      onClick: () => navigate('/tutor'),
    },
    {
      id: 'browse-subjects',
      title: TEXT.browseSubjects[language],
      desc: TEXT.browseSubjectsDesc[language],
      icon: LibraryBig,
      onClick: () => navigate('/subjects'),
    },
    // Offered only when the API reports approved topics; it opens that subject's verified topic list.
    ...(firstTopicSubject
      ? [
          {
            id: 'study-topic',
            title: TEXT.studyTopic[language],
            desc: `${TEXT.studyTopicDesc[language]}: ${firstTopicSubject.subjectName}`,
            icon: Compass,
            onClick: () => openSubject(firstTopicSubject),
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-6 sm:space-y-8" data-testid="live-home">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B192C] via-[#1E3E62] to-[#0ea5e9] text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-cyan-200 mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span data-testid="live-home-grade">{gradeLabel(grade)}</span>
              <span aria-hidden="true">•</span>
              <span>{TEXT.syllabus[language]}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" data-testid="live-home-greeting">
              {studentName ? t('home.greetingTitle', { name: studentName }) : TEXT.welcome[language]}
            </h1>
            <p className="text-sm sm:text-base text-cyan-100/90 mt-2 max-w-xl">{t('home.greetingSubtitle')}</p>

            <form
              className="mt-5 flex items-center gap-2 max-w-md bg-white/10 p-1.5 rounded-2xl border border-white/20"
              onSubmit={(e) => {
                e.preventDefault();
                askTutor();
              }}
            >
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                aria-label={t('home.askTutorPrompt')}
                placeholder={t('home.askTutorPrompt')}
                className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder:text-cyan-200/60 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-atlas-navy hover:bg-cyan-50 rounded-xl font-bold text-xs flex items-center gap-1.5"
              >
                <span>{TEXT.ask[language]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-3xl p-5 sm:p-6 w-full md:w-72">
            <TutorAvatar state={tutorState} size="lg" />
            <p className="text-xs text-cyan-100/90 mt-4 text-center leading-relaxed">{TEXT.tutorCard[language]}</p>
            <button
              type="button"
              onClick={() => navigate('/tutor')}
              className="mt-4 w-full py-2.5 px-4 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-900 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
            >
              <span>{TEXT.talkWithTutor[language]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Compass className="w-5 h-5 text-atlas-cyan" />
          <span>{TEXT.actionsTitle[language]}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.id}
                type="button"
                data-testid={`live-home-action-${a.id}`}
                onClick={a.onClick}
                className="group flex flex-col items-start p-4 rounded-2xl bg-white border border-slate-200 hover:shadow-lg hover:border-sky-300 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-atlas-navy text-cyan-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">{a.title}</h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">{a.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200" data-testid="live-home-subject-summary">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-atlas-cyan" />
            {TEXT.summaryTitle[language]}
          </h2>
          <button
            type="button"
            onClick={() => navigate('/subjects')}
            className="text-xs font-bold text-atlas-blue hover:text-atlas-deep flex items-center gap-1"
          >
            {TEXT.viewAll[language]}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {availability.isLoading ? (
          <p role="status" className="text-sm text-slate-500">{TEXT.loading[language]}</p>
        ) : availability.isError ? (
          <p role="status" className="text-sm text-slate-600">{TEXT.loadError[language]}</p>
        ) : subjects.length === 0 ? (
          <p role="status" className="text-sm text-slate-600">{TEXT.noneReported[language]}</p>
        ) : (
          <div className="space-y-4">
            <dl className="grid grid-cols-3 gap-3 text-center">
              <SummaryCount testId="summary-with-topics" label={TEXT.withTopics[language]} value={withTopics.length} />
              <SummaryCount testId="summary-textbook-only" label={TEXT.textbookOnly[language]} value={textbookOnly.length} />
              <SummaryCount testId="summary-not-yet" label={TEXT.notYet[language]} value={notYet.length} />
            </dl>
            {withTopics.length + textbookOnly.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {[...withTopics, ...textbookOnly].map((s) => (
                  <li key={s.subjectCode}>
                    <button
                      type="button"
                      data-testid={`live-home-subject-${s.subjectCode}`}
                      onClick={() => openSubject(s)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-sky-300 text-xs font-bold text-slate-700"
                    >
                      {s.topicsAvailable ? <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> : <MessageCircleQuestion className="w-3.5 h-3.5 text-sky-600" />}
                      {s.subjectName}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

const SummaryCount: React.FC<{ testId: string; label: string; value: number }> = ({ testId, label, value }) => (
  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
    <dt className="text-[11px] font-semibold text-slate-500">{label}</dt>
    <dd className="text-xl font-extrabold text-slate-900" data-testid={testId}>{value}</dd>
  </div>
);
