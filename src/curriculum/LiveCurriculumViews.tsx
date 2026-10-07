import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle2, GraduationCap, MessageCircleQuestion } from 'lucide-react';
import { useStudent } from '../state/studentContext';
import type { Language } from '../types';
import { CurriculumUnavailable, CURRICULUM_UNAVAILABLE_TEXT } from './CurriculumUnavailable';
import {
  findSubjectAvailability,
  useCurriculumAvailability,
  useLiveTopics,
  type SubjectAvailability,
} from './liveCurriculum';

const TEXT: Record<string, Record<Language, string>> = {
  subjectsTitle: { en: 'Subjects', si: 'විෂයයන්', ta: 'பாடங்கள்' },
  indexed: { en: 'Textbook indexed', si: 'පෙළපොත සූචිගත කර ඇත', ta: 'பாடநூல் அட்டவணைப்படுத்தப்பட்டது' },
  askTutor: { en: 'Ask the Tutor', si: 'ගුරුවරයාගෙන් අසන්න', ta: 'ஆசிரியரிடம் கேளுங்கள்' },
  textbookQuestions: {
    en: 'Ask textbook questions',
    si: 'පෙළපොත් ප්‍රශ්න අසන්න',
    ta: 'பாடநூல் கேள்விகள் கேளுங்கள்',
  },
  textbookQuestionsNote: {
    en: 'Answers come only from the indexed textbook and cite their pages; the Tutor refuses when it finds no evidence. Lessons and topics are not available yet.',
    si: 'පිළිතුරු ලැබෙන්නේ සූචිගත පෙළපොතෙන් පමණි; සාක්ෂි නොමැති විට ගුරුවරයා පිළිතුරු නොදේ. පාඩම් සහ මාතෘකා තවම ලබා ගත නොහැක.',
    ta: 'பதில்கள் அட்டவணைப்படுத்தப்பட்ட பாடநூலிலிருந்து மட்டுமே; ஆதாரம் இல்லையெனில் ஆசிரியர் பதிலளிக்காது. பாடங்களும் தலைப்புகளும் இன்னும் கிடைக்கவில்லை.',
  },
  loading: { en: 'Loading curriculum…', si: 'විෂය නිර්දේශය පූරණය වෙමින්…', ta: 'பாடத்திட்டம் ஏற்றப்படுகிறது…' },
  loadError: {
    en: 'The curriculum could not be loaded. Please try again.',
    si: 'විෂය නිර්දේශය පූරණය කළ නොහැකි විය. නැවත උත්සාහ කරන්න.',
    ta: 'பாடத்திட்டத்தை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
  },
  noTopics: {
    en: 'The chapter and topic list for this textbook is not yet available, so structured lessons (Teach Me) are not offered. You can still ask the Tutor questions; answers show their textbook sources when the indexed textbook supports them.',
    si: 'මෙම පෙළපොතේ පරිච්ඡේද සහ මාතෘකා ලැයිස්තුව තවමත් ලබා ගත නොහැක. ඔබට තවමත් ගුරුවරයාගෙන් ප්‍රශ්න ඇසිය හැක; සූචිගත පෙළපොත සහාය දක්වන විට පිළිතුරු මූලාශ්‍ර පෙන්වයි.',
    ta: 'இந்த பாடநூலின் அத்தியாய மற்றும் தலைப்பு பட்டியல் இன்னும் கிடைக்கவில்லை. நீங்கள் ஆசிரியரிடம் கேள்விகள் கேட்கலாம்; அட்டவணைப்படுத்தப்பட்ட பாடநூல் ஆதரிக்கும்போது பதில்கள் மூலங்களைக் காட்டும்.',
  },
  notIndexed: {
    en: 'No approved textbook has been indexed for this subject and grade yet, so the Tutor cannot give textbook-grounded answers here.',
    si: 'මෙම විෂය සහ ශ්‍රේණිය සඳහා අනුමත පෙළපොතක් තවමත් සූචිගත කර නැත.',
    ta: 'இந்த பாடம் மற்றும் தரத்திற்கு அங்கீகரிக்கப்பட்ட பாடநூல் இன்னும் அட்டவணைப்படுத்தப்படவில்லை.',
  },
  topics: { en: 'Topics', si: 'මාතෘකා', ta: 'தலைப்புகள்' },
  allSubjects: { en: 'All Subjects', si: 'සියලු විෂයයන්', ta: 'அனைத்து பாடங்கள்' },
};

const gradeLabel = (grade: string) => grade.replace('-', ' ').toUpperCase();

/** LIVE subjects list: only what the API reports, with honest availability per subject. */
export const LiveSubjectsView: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const navigate = useNavigate();
  const { grade, language, setCurriculumSubject } = useStudent();
  const availability = useCurriculumAvailability(grade);

  if (availability.isLoading) {
    return <p className="text-sm text-slate-500" role="status">{TEXT.loading[language]}</p>;
  }
  if (availability.isError) {
    return <CurriculumUnavailable language={language} detail={TEXT.loadError[language]} />;
  }
  const subjects = availability.data?.subjects ?? [];
  if (subjects.length === 0) {
    return <CurriculumUnavailable language={language} />;
  }
  const rank = (s: SubjectAvailability) => (s.topicsAvailable ? 2 : s.tutorAvailable ? 1 : 0);
  const ordered = [...subjects].sort((a, b) => rank(b) - rank(a));

  return (
    <div className="space-y-4" data-testid="live-subjects">
      {!compact && (
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{TEXT.subjectsTitle[language]}</h1>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
            <GraduationCap className="w-4 h-4" />
            {gradeLabel(grade)}
          </span>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ordered.map((s) => (
          <LiveSubjectCard
            key={s.subjectCode}
            subject={s}
            language={language}
            onOpen={() => {
              setCurriculumSubject(s.subjectCode.toLowerCase());
              navigate(`/subjects/${s.subjectCode.toLowerCase()}`);
            }}
            onAsk={() => navigate(`/tutor?subject=${encodeURIComponent(s.subjectCode.toLowerCase())}`)}
          />
        ))}
      </div>
    </div>
  );
};

const LiveSubjectCard: React.FC<{
  subject: SubjectAvailability;
  language: Language;
  onOpen: () => void;
  onAsk: () => void;
}> = ({ subject, language, onOpen, onAsk }) => {
  // Curriculum (lessons, topics, practice, progress) is available only with approved persisted topic records.
  if (!subject.topicsAvailable) {
    return (
      <div
        data-testid={`subject-unavailable-${subject.subjectCode}`}
        aria-disabled={subject.tutorAvailable ? undefined : 'true'}
        className="p-5 rounded-3xl bg-slate-50 border border-slate-200 text-slate-500 space-y-2"
      >
        <div>
          <h3 className="font-bold text-slate-700">{subject.subjectName}</h3>
          <p className="text-xs mt-1">{CURRICULUM_UNAVAILABLE_TEXT[language]}</p>
        </div>
        {subject.tutorAvailable && <TextbookQuestionsAction subject={subject} language={language} onAsk={onAsk} />}
      </div>
    );
  }
  return (
    <div
      data-testid={`subject-available-${subject.subjectCode}`}
      className="p-5 rounded-3xl bg-white border border-slate-200 hover:shadow-lg transition-all space-y-3"
    >
      <button type="button" onClick={onOpen} className="text-left w-full">
        <h3 className="font-extrabold text-slate-900">{subject.subjectName}</h3>
        <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-bold text-emerald-700">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {TEXT.indexed[language]} ({subject.languages.map((l) => l.toUpperCase()).join(', ')})
        </span>
      </button>
      <button
        type="button"
        onClick={onAsk}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-atlas-blue"
      >
        <MessageCircleQuestion className="w-4 h-4" />
        {TEXT.askTutor[language]}
      </button>
    </div>
  );
};

/** Free textbook questions, explicitly distinct from curriculum (lesson/topic) tutoring. */
const TextbookQuestionsAction: React.FC<{ subject: SubjectAvailability; language: Language; onAsk: () => void }> = ({
  subject,
  language,
  onAsk,
}) => (
  <div data-testid={`subject-textbook-questions-${subject.subjectCode}`} className="pt-2 border-t border-slate-200 space-y-1">
    <button type="button" onClick={onAsk} className="inline-flex items-center gap-1.5 text-xs font-bold text-atlas-blue">
      <MessageCircleQuestion className="w-4 h-4" />
      {TEXT.textbookQuestions[language]} ({subject.languages.map((l) => l.toUpperCase()).join(', ')})
    </button>
    <p className="text-[11px] leading-relaxed text-slate-500">{TEXT.textbookQuestionsNote[language]}</p>
  </div>
);

/** LIVE subject page: textbook availability and verified topics only; never sample chapters or page ranges. */
export const LiveSubjectDetailView: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { grade, language } = useStudent();
  const availability = useCurriculumAvailability(grade);
  const subject = findSubjectAvailability(availability.data, subjectId);
  const topics = useLiveTopics(subject?.topicsAvailable ? subjectId : undefined, grade);

  const back = (
    <button
      type="button"
      onClick={() => navigate('/subjects')}
      className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      <span>{TEXT.allSubjects[language]}</span>
    </button>
  );

  if (availability.isLoading) {
    return <div className="max-w-4xl mx-auto space-y-4">{back}<p className="text-sm text-slate-500">{TEXT.loading[language]}</p></div>;
  }
  if (availability.isError) {
    return <div className="max-w-4xl mx-auto space-y-4">{back}<CurriculumUnavailable language={language} detail={TEXT.loadError[language]} /></div>;
  }
  if (!subject || !subject.topicsAvailable) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        {back}
        <CurriculumUnavailable language={language} detail={subject?.tutorAvailable ? undefined : TEXT.notIndexed[language]} />
        {subject?.tutorAvailable && (
          <TextbookQuestionsAction
            subject={subject}
            language={language}
            onAsk={() => navigate(`/tutor?subject=${encodeURIComponent(subject.subjectCode.toLowerCase())}`)}
          />
        )}
      </div>
    );
  }

  const verifiedTopics = topics.data ?? [];
  return (
    <div className="max-w-4xl mx-auto space-y-6" data-testid="live-subject-detail">
      {back}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-atlas-blue">
          {subject.subjectCode} • {gradeLabel(grade)}
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900">{subject.subjectName}</h1>
        <p className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
          <BookOpen className="w-4 h-4" />
          {TEXT.indexed[language]} ({subject.languages.map((l) => l.toUpperCase()).join(', ')})
        </p>
        <div>
          <button
            type="button"
            onClick={() => navigate(`/tutor?subject=${encodeURIComponent(subject.subjectCode.toLowerCase())}`)}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-atlas-blue text-white text-sm font-bold"
          >
            <MessageCircleQuestion className="w-4 h-4" />
            {TEXT.askTutor[language]}
          </button>
        </div>
      </div>

      {verifiedTopics.length > 0 ? (
        <div className="space-y-2" data-testid="live-topics">
          <h2 className="text-sm font-extrabold text-slate-700">{TEXT.topics[language]}</h2>
          {verifiedTopics.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() =>
                navigate(`/tutor?subject=${encodeURIComponent(subject.subjectCode.toLowerCase())}&topic=${encodeURIComponent(t.id)}`)
              }
              className="w-full text-left p-4 rounded-2xl bg-white border border-slate-200"
            >
              <span className="text-xs font-bold text-slate-500">{t.chapterNumber}</span>{' '}
              <span className="font-bold text-slate-900">{t.title[language] || t.title.en}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-600 leading-relaxed" data-testid="live-no-topics">{TEXT.noTopics[language]}</p>
      )}
    </div>
  );
};

/** LIVE companion beside the Tutor: availability facts only (no static badges, lessons, page ranges or simulations). */
export const LiveCompanionPane: React.FC<{ subjectId?: string; language: Language }> = ({ subjectId, language }) => {
  const { grade } = useStudent();
  const availability = useCurriculumAvailability(grade);
  const subject = findSubjectAvailability(availability.data, subjectId);
  return (
    <div className="h-full p-5 space-y-3 bg-white border-l border-slate-200" data-testid="live-companion">
      <h3 className="text-sm font-extrabold text-slate-900">{subject?.subjectName ?? (subjectId || '').toUpperCase()}</h3>
      {availability.isLoading ? (
        <p className="text-xs text-slate-500">{TEXT.loading[language]}</p>
      ) : subject?.topicsAvailable ? (
        <p className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
          <BookOpen className="w-4 h-4" />
          {TEXT.indexed[language]} ({subject.languages.map((l) => l.toUpperCase()).join(', ')})
        </p>
      ) : subject?.tutorAvailable ? (
        <div data-testid="live-companion-textbook-questions" className="space-y-1">
          <p className="text-xs font-bold text-slate-700">{CURRICULUM_UNAVAILABLE_TEXT[language]}</p>
          <p className="text-xs text-slate-600 leading-relaxed">{TEXT.textbookQuestionsNote[language]}</p>
        </div>
      ) : (
        <p className="text-xs text-slate-600 leading-relaxed" data-testid="live-companion-unavailable">
          {CURRICULUM_UNAVAILABLE_TEXT[language]}. {TEXT.notIndexed[language]}
        </p>
      )}
    </div>
  );
};
