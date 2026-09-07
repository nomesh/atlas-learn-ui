import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Compass 
} from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import { MOCK_SUBJECTS, MOCK_TOPICS } from '../../mocks/curriculumData';

export const SubjectDetailPage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { language, setCurriculumSubject } = useStudent();

  const subject = MOCK_SUBJECTS.find((s) => s.id === subjectId) || MOCK_SUBJECTS[0];
  const topics = MOCK_TOPICS.filter((t) => t.subjectId === subject.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('/subjects')}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 transition-all shadow-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>All Subjects</span>
      </button>

      {/* Subject Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-atlas-blue">
            {subject.code} • {subject.gradeLevel}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {subject.name[language]}
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
            {subject.description[language]}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurriculumSubject(subject.id);
            navigate(`/tutor?q=${encodeURIComponent(`I would like to ask questions about ${subject.name.en}`)}`);
          }}
          className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-atlas-blue text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all flex-shrink-0"
        >
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>Ask Tutor About {subject.name[language]}</span>
        </button>
      </div>

      {/* Topics List */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-atlas-cyan" />
          <span>Curriculum Topics & Lessons</span>
        </h2>

        {topics.length > 0 ? (
          <div className="space-y-3">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-1">
                    <span className="text-atlas-blue font-bold">Chapter {topic.chapterNumber}</span>
                    <span>•</span>
                    <span>{topic.lessonsCount} Structured Lessons</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {topic.title[language]}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-lg">
                    {topic.description[language]}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setCurriculumSubject(subject.id, topic.id);
                      navigate(`/learn/${topic.id}`);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-atlas-deep to-atlas-blue text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 hover:shadow-md transition-all"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Teach Me</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurriculumSubject(subject.id, topic.id);
                      navigate(`/tutor?q=${encodeURIComponent(`Can you explain the main ideas of ${topic.title.en}?`)}`);
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                    title="Ask Tutor about this topic"
                  >
                    <Sparkles className="w-4 h-4 text-atlas-cyan" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
            <p className="text-sm text-slate-500">
              Additional topics for this subject are currently being ingested into ATLAS Learn.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
