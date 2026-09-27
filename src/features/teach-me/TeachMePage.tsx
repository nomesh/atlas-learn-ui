import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Compass,
  Award
} from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import { TutorAvatar } from '../avatar/TutorAvatar';
import { getLessonStepsForTopic, MOCK_TOPICS } from '../../mocks/curriculumData';
import { ElectricSwitchVisualizer } from '../../components/interactive/ElectricSwitchVisualizer';
import { ResolutionVisualizer } from '../../components/interactive/ResolutionVisualizer';
import { ScratchBlockVisualizer } from '../../components/interactive/ScratchBlockVisualizer';
import { MicrocontrollerVisualizer } from '../../components/interactive/MicrocontrollerVisualizer';
import { UrlAnatomyVisualizer } from '../../components/interactive/UrlAnatomyVisualizer';
import { WordProcessingVisualizer } from '../../components/interactive/WordProcessingVisualizer';
import { ReactionRateVisualizer } from '../../components/interactive/ReactionRateVisualizer';
import { SubjectConceptVisualizer } from '../../components/interactive/SubjectConceptVisualizer';
import { RichContentRenderer, MathView } from '../tutor/RichContentRenderer';
import { AuthGate, GuestBanner } from '../../components/auth/AuthGate';

export const TeachMePage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language, setTutorState, tutorState, setCurriculumSubject, isAuthenticated, isGuestPreview } = useStudent();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isLessonFinished, setIsLessonFinished] = useState(false);

  const steps = getLessonStepsForTopic(topicId);
  const currentStep = steps[currentStepIndex] || steps[0];
  const question = currentStep?.checkQuestion;
  const currentTopic = MOCK_TOPICS.find((t) => t.id === topicId);

  useEffect(() => {
    if (currentTopic) {
      setCurriculumSubject(currentTopic.subjectId, currentTopic.id);
    }
    setCurrentStepIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setIsLessonFinished(false);
  }, [topicId]);

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

  if (!isAuthenticated) {
    return <AuthGate featureName="Interactive Guided Curriculum Lessons" />;
  }

  return (
    <div className="max-w-4xl lg:max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      <GuestBanner />

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
          <div className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            <RichContentRenderer content={currentStep.concept[language]} />
          </div>

          {/* 2. Visual / Formula Card */}
          {currentStep.visualCard && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50/90 via-indigo-50/50 to-slate-50 border border-sky-200/90 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-atlas-blue uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-atlas-cyan" />
                  <span>{currentStep.visualCard.title}</span>
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200/60">
                  {currentStep.visualCard.diagramType === 'formula' ? 'Key Formula' : 'Key Concept'}
                </span>
              </div>

              {currentStep.visualCard.diagramType === 'formula' || /[\^=+\-\\×÷√]/.test(currentStep.visualCard.content) ? (
                <MathView formula={currentStep.visualCard.content} displayMode={true} />
              ) : (
                <div className="py-2.5 px-4 bg-white/80 rounded-xl border border-sky-100 text-slate-800 text-center font-medium text-xs sm:text-sm shadow-2xs">
                  {currentStep.visualCard.content}
                </div>
              )}

              {currentStep.visualCard.caption && (
                <p className="text-[11px] text-slate-500 mt-2 text-center font-medium">
                  {currentStep.visualCard.caption}
                </p>
              )}
            </div>
          )}

          {/* Interactive Simulation & Visualizer */}
          {topicId === 'number-systems' ? (
            <div className="rounded-2xl overflow-hidden border border-slate-200">
              <ElectricSwitchVisualizer language={language} showByteBuilder={true} />
            </div>
          ) : topicId === 'configuring-formatting-computer' ? (
            <div className="rounded-2xl overflow-hidden border border-slate-200">
              <ResolutionVisualizer language={language} />
            </div>
          ) : topicId === 'programming' ? (
            <div className="rounded-2xl overflow-hidden border border-slate-200">
              <ScratchBlockVisualizer language={language} />
            </div>
          ) : topicId === 'physical-computing' ? (
            <div className="rounded-2xl overflow-hidden border border-slate-200">
              <MicrocontrollerVisualizer language={language} />
            </div>
          ) : topicId === 'internet' ? (
            <div className="rounded-2xl overflow-hidden border border-slate-200">
              <UrlAnatomyVisualizer language={language} />
            </div>
          ) : topicId === 'word-processing' ? (
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <WordProcessingVisualizer language={language} />
            </div>
          ) : topicId === 'science-gr10-ch17-rate-of-reactions' ? (
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <ReactionRateVisualizer language={language} />
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <SubjectConceptVisualizer topicId={topicId} subjectId={currentTopic?.subjectId} language={language} />
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

          {/* 4. G.C.E. O/L Competency Check / Exam Mastery */}
          {question && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600">
                    <Award className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {language === 'si'
                      ? 'අ.පො.ස. සා/පෙළ මට්ටමේ ඇගයීම'
                      : language === 'ta'
                      ? 'க.பொ.த சா/தர பரீட்சை மதிப்பீடு'
                      : 'G.C.E. O/L Competency Check'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] bg-indigo-50 border border-indigo-200/80 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
                    {question.grade === 'grade-10'
                      ? (language === 'si' ? '10 ශ්‍රේණිය' : language === 'ta' ? 'தரம் 10' : 'Grade 10')
                      : 'National Syllabus'}
                  </span>
                  <span className="text-[10px] bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
                    {language === 'si' ? 'විභාග ප්‍රමිතිය' : language === 'ta' ? 'பரீட்சை மாதிரி' : 'Exam Standard'}
                  </span>
                </div>
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {question.questionText[language]}
              </h4>

              <div className="space-y-2">
                {question.options.map((opt, idx) => {
                  const isSelected = selectedOptionId === opt.id;
                  const isCorrect = opt.id === question.correctOptionId;
                  const optionLabel = String.fromCharCode(65 + idx); // A, B, C, D

                  let optStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';
                  let labelStyle = 'bg-slate-100 text-slate-600 border border-slate-200';
                  if (isSelected && !isAnswerSubmitted) {
                    optStyle = 'border-indigo-500 bg-indigo-50/60 ring-2 ring-indigo-500/20 text-slate-900 font-medium';
                    labelStyle = 'bg-indigo-600 text-white border-transparent';
                  } else if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optStyle = 'border-emerald-400 bg-emerald-50 text-emerald-950 font-medium';
                      labelStyle = 'bg-emerald-600 text-white border-transparent';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'border-rose-300 bg-rose-50 text-rose-950';
                      labelStyle = 'bg-rose-500 text-white border-transparent';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-2.5 transition-all ${optStyle}`}
                    >
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 transition-colors ${labelStyle}`}>
                        {optionLabel}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt.text[language]}</span>
                      {isAnswerSubmitted && isCorrect && (
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-1 mt-0.5" />
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
                      ? 'bg-slate-900 hover:bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {t('practice.checkAnswer')}
                </button>
              ) : (
                <div className="mt-3 p-3.5 rounded-xl bg-white border border-slate-200/90 text-xs space-y-2.5 animate-in fade-in shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="font-bold">
                      {selectedOptionId === question.correctOptionId ? (
                        <span className="text-emerald-700 flex items-center gap-1.5">
                          <span>🌟</span>
                          <span>
                            {language === 'si' ? 'විශිෂ්ටයි! නිවැරදි විභාග පිළිතුරකි.' : language === 'ta' ? 'அருமை! சரியான பரீட்சை விடை.' : 'Outstanding! Correct Exam Answer.'}
                          </span>
                        </span>
                      ) : (
                        <span className="text-amber-700 flex items-center gap-1.5">
                          <span>🌱</span>
                          <span>
                            {language === 'si' ? 'විභාග විශ්ලේෂණය සහ නිවැරදි කරුණ' : language === 'ta' ? 'பரீட்சை மாதிரி பகுப்பாய்வு' : "Examiner's Guidance & Key Principle"}
                          </span>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {language === 'si' ? 'ලකුණු දීමේ පටිපාටිය' : language === 'ta' ? 'மதிப்பீட்டுத் திட்டம்' : 'Marking Scheme Insight'}
                    </span>
                  </div>

                  <p className="text-slate-700 leading-relaxed bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
                    {question.educationalFeedback[language]}
                  </p>

                  {question.syllabusReference && (
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 pt-1 border-t border-slate-100">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                      <span>{question.syllabusReference}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const subId = currentTopic?.subjectId || 'history';
                      const topId = currentTopic?.id || topicId || '';
                      const qText = question.questionText[language];
                      const prompt = language === 'si'
                        ? `මෙම විභාග ප්‍රශ්නය සහ එහි මූලධර්මය මට තවදුරටත් විස්තර කරන්න: "${qText}"`
                        : language === 'ta'
                        ? `இந்த பரீட்சை வினாவின் கோட்பாட்டை எனக்கு மேலும் விளக்க முடியுமா: "${qText}"`
                        : `Can you explain the syllabus concept behind this exam question in detail: "${qText}"?`;
                      navigate(`/tutor?subject=${encodeURIComponent(subId)}&topic=${encodeURIComponent(topId)}&q=${encodeURIComponent(prompt)}`);
                    }}
                    className="w-full py-1.5 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 text-indigo-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>
                      {language === 'si'
                        ? 'මෙම ප්‍රශ්නය ගැන AI ගුරුතුමාගෙන් අසන්න'
                        : language === 'ta'
                        ? 'இந்த வினா பற்றி AI ஆசிரியரிடம் கேட்க'
                        : 'Ask AI Tutor about this Exam Question'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                const subId = currentTopic?.subjectId || 'ict';
                const topId = currentTopic?.id || topicId || '';
                const topicTitle = currentTopic?.title?.[language] || currentTopic?.title?.en || '';
                const stepTitle = currentStep?.title?.[language] || currentStep?.title?.en || '';
                const chapterPrefix = currentTopic?.chapterNumber ? `Chapter ${currentTopic.chapterNumber}` : '';
                const queryText = language === 'si'
                  ? `${topicTitle} (${stepTitle}) ${chapterPrefix ? `${chapterPrefix} ගැන විස්තර කරන්න` : 'ගැන විස්තර කරන්න'}`
                  : language === 'ta'
                  ? `${topicTitle} (${stepTitle}) ${chapterPrefix ? `${chapterPrefix} பற்றி விளக்குக` : 'பற்றி விளக்குக'}`
                  : `Can you explain ${topicTitle} (${stepTitle}) ${chapterPrefix ? `in ${chapterPrefix}` : ''}?`;
                navigate(`/tutor?subject=${encodeURIComponent(subId)}&topic=${encodeURIComponent(topId)}&q=${encodeURIComponent(queryText)}`);
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
