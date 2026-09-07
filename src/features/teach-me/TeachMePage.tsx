import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  Lightbulb, 
  Check, 
  RotateCcw,
  Compass
} from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import { TutorAvatar } from '../avatar/TutorAvatar';
import { TEACH_ME_PHOTOSYNTHESIS_STEPS } from '../../mocks/curriculumData';

export const TeachMePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language, setTutorState, tutorState } = useStudent();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isLessonFinished, setIsLessonFinished] = useState(false);

  const steps = TEACH_ME_PHOTOSYNTHESIS_STEPS;
  const currentStep = steps[currentStepIndex];
  const question = currentStep.checkQuestion;

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || !question) return;
    setIsAnswerSubmitted(true);

    if (selectedOptionId === question.correctOptionId) {
      setTutorState('celebrating');
    } else {
      setTutorState('encouraging');
    }
  };

  const handleNextStep = () => {
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setTutorState('idle');

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsLessonFinished(true);
      setTutorState('celebrating');
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
      setTutorState('idle');
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header bar with Back button and Progress indicator */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 transition-all shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">
            {t('teachMe.step', { current: currentStepIndex + 1, total: steps.length })}
          </span>
          <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-teal-400 rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {!isLessonFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-6">
          {/* Top Step Banner with Mini Tutor companion */}
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-atlas-blue text-xs font-bold border border-sky-100 mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>{t('teachMe.badge')}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {currentStep.title[language]}
              </h1>
            </div>

            <TutorAvatar state={tutorState} size="md" />
          </div>

          {/* 1. Core Concept Explanation */}
          <div className="text-sm sm:text-base text-slate-800 leading-relaxed space-y-3 font-medium">
            <p className="whitespace-pre-line">{currentStep.concept[language]}</p>
          </div>

          {/* 2. Visual / Formula Card */}
          {currentStep.visualCard && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-cyan-200 border border-slate-800 shadow-inner">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentStep.visualCard.title}</span>
              </div>
              <div className="font-mono text-xs sm:text-sm text-center py-2 px-3 bg-slate-950/60 rounded-xl text-white overflow-x-auto">
                {currentStep.visualCard.content}
              </div>
              <p className="text-[11px] text-cyan-100/70 mt-2 text-center">
                {currentStep.visualCard.caption}
              </p>
            </div>
          )}

          {/* 3. Real-World Sri Lankan Context */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>{t('teachMe.realWorldTitle')}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentStep.realWorldExample[language]}
            </p>
          </div>

          {/* 4. Check Understanding Mini-Quiz */}
          {question && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-atlas-cyan" />
                  {t('teachMe.checkTitle')}
                </span>
                <span className="text-[10px] bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                  Check Understanding
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900">
                {question.questionText[language]}
              </h4>

              <div className="space-y-2">
                {question.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  const isCorrect = opt.id === question.correctOptionId;

                  let optStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';
                  if (isSelected && !isAnswerSubmitted) {
                    optStyle = 'border-atlas-cyan bg-cyan-50/60 ring-2 ring-atlas-cyan/30 text-atlas-navy font-bold';
                  } else if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optStyle = 'border-emerald-400 bg-emerald-50 text-emerald-950 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'border-amber-400 bg-amber-50 text-amber-950';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between transition-all ${optStyle}`}
                    >
                      <span>{opt.text[language]}</span>
                      {isAnswerSubmitted && isCorrect && (
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit / Feedback */}
              {!isAnswerSubmitted ? (
                <button
                  type="button"
                  disabled={!selectedOptionId}
                  onClick={handleSubmitAnswer}
                  className={`mt-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedOptionId
                      ? 'bg-slate-900 hover:bg-atlas-blue text-white shadow-sm'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {t('practice.checkAnswer')}
                </button>
              ) : (
                <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1 animate-in fade-in">
                  <div className="font-bold text-slate-800">
                    {selectedOptionId === question.correctOptionId ? (
                      <span className="text-emerald-700">🌟 {t('practice.correctTitle')}</span>
                    ) : (
                      <span className="text-amber-700">🌱 {t('practice.encouragingTitle')}</span>
                    )}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {question.educationalFeedback[language]}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                navigate(`/tutor?q=${encodeURIComponent(`Can you explain more about ${currentStep.title.en}?`)}`);
              }}
              className="text-xs font-bold text-atlas-cyan hover:text-atlas-blue flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{t('teachMe.askTutorAboutStep')}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {currentStepIndex > 0 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs"
                >
                  {t('teachMe.previous')}
                </button>
              )}

              <button
                type="button"
                onClick={handleNextStep}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-atlas-deep to-atlas-blue hover:from-slate-900 hover:to-atlas-deep text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all"
              >
                <span>
                  {currentStepIndex === steps.length - 1
                    ? t('teachMe.finishLesson')
                    : t('teachMe.next')}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Lesson Completion Card */
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-soft text-center space-y-5">
          <TutorAvatar state="celebrating" size="lg" className="mx-auto" />

          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {t('teachMe.congratsTitle')}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
              {t('teachMe.congratsSubtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={() => navigate('/practice')}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-atlas-deep to-atlas-blue text-white rounded-2xl font-bold text-xs shadow-md hover:scale-[1.02] transition-transform"
            >
              {t('teachMe.practiceNow')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-bold text-xs"
            >
              {t('teachMe.backToHome')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
