import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Atom, 
  Calculator, 
  Landmark, 
  Cpu, 
  Globe, 
  BookOpen, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import { MOCK_SUBJECTS } from '../../mocks/curriculumData';

export const SubjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { grade, language, setCurriculumSubject } = useStudent();

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom': return <Atom className="w-6 h-6 text-sky-500" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-indigo-500" />;
      case 'Landmark': return <Landmark className="w-6 h-6 text-amber-500" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-emerald-500" />;
      case 'Globe': return <Globe className="w-6 h-6 text-teal-500" />;
      default: return <BookOpen className="w-6 h-6 text-violet-500" />;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {t('home.subjects.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sri Lankan National Curriculum subjects for {grade.replace('-', ' ').toUpperCase()}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
          <GraduationCap className="w-4 h-4 text-atlas-cyan" />
          <span>{grade.replace('-', ' ').toUpperCase()}</span>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {MOCK_SUBJECTS.map((sub) => (
          <div
            key={sub.id}
            onClick={() => {
              setCurriculumSubject(sub.id);
              navigate(`/subjects/${sub.id}`);
            }}
            className="group p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getSubjectIcon(sub.iconName)}
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 rounded-full text-slate-600">
                  {sub.topicsCount} Topics
                </span>
              </div>

              <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-atlas-blue transition-colors">
                {sub.name[language]}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                {sub.description[language]}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Mastery Progress
                </div>
                <div className="text-xs font-bold text-slate-700 mt-0.5">
                  {sub.masteryPercentage}% Complete
                </div>
              </div>

              <span className="text-xs font-bold text-atlas-cyan group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>View Topics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
