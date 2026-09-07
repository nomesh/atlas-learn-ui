import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  Info,
  BookOpen,
  Filter
} from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import { TutorAvatar } from '../avatar/TutorAvatar';
import { MOCK_PRACTICE_QUESTIONS } from '../../mocks/curriculumData';
import type { QuizQuestion } from '../../types';

export const PracticePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language, setTutorState } = useStudent();

  const [activeCategory, setActiveCategory] = useState<'all' | 'ol' | 'general'>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const filteredQuestions = MOCK_PRACTICE_QUESTIONS.filter((q) => {
    if (activeCategory === 'all') return true;
    return q.examCategory === activeCategory;
  });

  const question = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];
  const isCorrect = selectedOptionId === question?.correctOptionId;

  const handleSelectOption = (id: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(id);
  };

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      setTutorState('celebrating');
    } else {
      setTutorState('encouraging');
    }
  };

  const handleNext = () => {
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setTutorState('idle');
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
  };

  const handleAskTutor = () => {
    if (!question) return;
    const prompt = `I am practicing this question: "${question.questionText.en}". Can you explain why the correct answer is option "${question.options.find(o => o.id === question.correctOptionId)?.text.en}"?`;
    navigate(`/tutor?q=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          {t('practice.title')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t('practice.subtitle')}
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Practice Questions' },
          { id: 'ol', label: 'G.C.E. O/L Sample Questions' },
          { id: 'general', label: 'Concept Quizzes' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveCategory(tab.id as any);
              setCurrentQuestionIndex(0);
              setSelectedOptionId(null);
              setIsAnswerSubmitted(false);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === tab.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Explicit Prototype Non-Official Disclaimer */}
      <div className="flex items-start gap-2 p-3 bg-amber-50/80 rounded-2xl text-[11px] text-amber-900 border border-amber-200/80">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <span>{t('practice.disclaimer')}</span>
      </div>

      {/* Question Card */}
      {question && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-6">
          {/* Question Metadata & Syllabus Reference */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t('practice.questionNumber', { current: currentQuestionIndex + 1, total: filteredQuestions.length })}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full truncate max-w-sm">
              📚 {question.syllabusReference}
            </span>
          </div>

          {/* Question Body */}
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {question.questionText[language]}
          </h2>

          {/* Multiple Choice Options */}
          <div className="space-y-2.5">
            {question.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isOptionCorrect = opt.id === question.correctOptionId;

              let style = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';
              if (isSelected && !isAnswerSubmitted) {
                style = 'border-atlas-cyan bg-cyan-50/60 ring-2 ring-atlas-cyan/30 text-atlas-navy font-bold';
              } else if (isAnswerSubmitted) {
                if (isOptionCorrect) {
                  style = 'border-emerald-400 bg-emerald-50 text-emerald-950 font-bold';
                } else if (isSelected && !isOptionCorrect) {
                  style = 'border-amber-400 bg-amber-50 text-amber-950 font-medium';
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm flex items-center justify-between transition-all ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-slate-300 bg-slate-50 text-xs font-bold text-slate-600 flex items-center justify-center uppercase">
                      {opt.id}
                    </span>
                    <span>{opt.text[language]}</span>
                  </div>
                  {isAnswerSubmitted && isOptionCorrect && (
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback (Encouraging, Never "WRONG") */}
          {isAnswerSubmitted && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2 animate-in fade-in">
              <div className="font-bold flex items-center gap-2">
                {isCorrect ? (
                  <span className="text-emerald-700">🌟 {t('practice.correctTitle')}</span>
                ) : (
                  <span className="text-amber-700">🌱 {t('practice.encouragingTitle')}</span>
                )}
              </div>
              <p className="text-slate-700 leading-relaxed">
                {question.educationalFeedback[language]}
              </p>

              {/* Direct Path back into Tutor Conversation */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleAskTutor}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-atlas-cyan hover:text-atlas-blue transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('practice.askTutorToExplain')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {!isAnswerSubmitted ? (
              <button
                type="button"
                disabled={!selectedOptionId}
                onClick={handleSubmit}
                className={`px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-all ${
                  selectedOptionId
                    ? 'bg-gradient-to-r from-atlas-deep to-atlas-blue text-white hover:from-slate-900 hover:to-atlas-deep'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {t('practice.checkAnswer')}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-atlas-blue text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>{t('practice.nextQuestion')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
