import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  Lightbulb, 
  Zap, 
  Cpu, 
  CheckCircle2, 
  HelpCircle,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { MOCK_SUBJECTS, MOCK_TOPICS, getLessonStepsForTopic } from '../../mocks/curriculumData';
import { ElectricSwitchVisualizer } from '../../components/interactive/ElectricSwitchVisualizer';
import { ResolutionVisualizer } from '../../components/interactive/ResolutionVisualizer';
import { ScratchBlockVisualizer } from '../../components/interactive/ScratchBlockVisualizer';
import { MicrocontrollerVisualizer } from '../../components/interactive/MicrocontrollerVisualizer';
import { UrlAnatomyVisualizer } from '../../components/interactive/UrlAnatomyVisualizer';

interface CurriculumCompanionPaneProps {
  subjectId: string;
  topicId?: string;
  language: 'en' | 'si' | 'ta';
  onAskQuestion: (query: string) => void;
  onSelectTopic: (newTopicId: string) => void;
}

export const CurriculumCompanionPane: React.FC<CurriculumCompanionPaneProps> = ({
  subjectId,
  topicId,
  language,
  onAskQuestion,
  onSelectTopic,
}) => {
  const currentSubject = MOCK_SUBJECTS.find((s) => s.id === subjectId) || MOCK_SUBJECTS[0];
  const subjectTopics = MOCK_TOPICS.filter((t) => t.subjectId === currentSubject.id);

  // Active topic or first topic of subject
  const activeTopic = 
    (topicId ? subjectTopics.find((t) => t.id === topicId) : null) || 
    subjectTopics[0] || 
    MOCK_TOPICS[0];

  const steps = getLessonStepsForTopic(activeTopic.id);
  const [activeStepTab, setActiveStepTab] = useState(0);

  const currentStep = steps[activeStepTab] || steps[0];

  return (
    <aside className="h-full flex flex-col bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden text-white">
      {/* 1. Header: Curriculum Breadcrumbs & Subject Context */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border-b border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-bold border border-cyan-500/30 uppercase tracking-wide">
              {currentSubject.name[language]} • Grade 8
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Syllabus Grounded
            </span>
          </div>

          <span className="text-[10px] text-slate-400 font-mono">
            Ministry Textbook Active
          </span>
        </div>

        {/* Chapter Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {subjectTopics.map((topic) => {
            const isSelected = topic.id === activeTopic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => {
                  setActiveStepTab(0);
                  onSelectTopic(topic.id);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>Ch. {topic.chapterNumber}</span>
                <span className="max-w-[120px] truncate">{topic.title[language]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Scrollable Body: Visualizer & Detailed Notes */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-slate-700">
        {/* Active Chapter Overview Banner */}
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Chapter {activeTopic.chapterNumber} • National Curriculum
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Textbook Grounded
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-extrabold text-white">
            {activeTopic.title[language]}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {activeTopic.description[language]}
          </p>
        </div>

        {/* 3. Interactive Data Representation / Visualizer Widget */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Concept Explorer</span>
            </span>
            <span className="text-[10px] text-cyan-300 font-mono">Real-time Simulation</span>
          </div>

          {activeTopic.id === 'number-systems' && (
            <ElectricSwitchVisualizer language={language} showByteBuilder={true} />
          )}

          {activeTopic.id === 'configuring-formatting-computer' && (
            <ResolutionVisualizer language={language} />
          )}

          {activeTopic.id === 'programming' && (
            <ScratchBlockVisualizer language={language} />
          )}

          {activeTopic.id === 'physical-computing' && (
            <MicrocontrollerVisualizer language={language} />
          )}

          {activeTopic.id === 'internet' && (
            <UrlAnatomyVisualizer language={language} />
          )}

          {activeTopic.id === 'word-processing' && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="font-bold text-cyan-300">Word Processing Layout & Justify Guide</div>
              <p className="text-slate-400">
                Official publications use <strong>Justify (Ctrl+J)</strong> to align words smoothly with both left and right margins by balancing micro-spacing between letters.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-justify text-slate-200 leading-relaxed font-serif">
                "Sri Lankan educational publications require clean margins, standardized typography, and structured data tables to communicate technical knowledge clearly to all students across the island."
              </div>
            </div>
          )}
        </div>

        {/* 4. Multi-Step Detailed Lesson Walkthrough */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Lesson Steps & Key Explanations</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">
              Step {activeStepTab + 1} of {steps.length}
            </span>
          </div>

          {/* Step Pill Buttons */}
          <div className="flex items-center gap-1.5">
            {steps.map((st, idx) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setActiveStepTab(idx)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all text-center border ${
                  activeStepTab === idx
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                Part {idx + 1}
              </button>
            ))}
          </div>

          {/* Current Step Detailed Content Card */}
          {currentStep && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                    Part {currentStep.stepNumber}: Key Concept
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                    {currentStep.title[language]}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => onAskQuestion(`Can you explain more about ${currentStep.title.en} in Chapter ${activeTopic.chapterNumber}?`)}
                  className="px-2.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1 transition-all flex-shrink-0"
                  title="Ask Tutor about this specific concept"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask Tutor</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {currentStep.concept[language]}
              </p>

              {/* Real World Example Callout */}
              {currentStep.realWorldExample && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Sri Lankan Practical Application:</span>
                  </div>
                  <p className="text-amber-100/90 leading-relaxed text-[11px]">
                    {currentStep.realWorldExample[language]}
                  </p>
                </div>
              )}

              {/* Quick Prompt Generator */}
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400 block mb-1.5">
                  Frequently Asked Questions on This Concept:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    `Give me a simple example of ${currentStep.title.en}`,
                    `Why is this important for G.C.E. O/L exams?`,
                    `Quiz me with an exam question on this step`
                  ].map((promptText) => (
                    <button
                      key={promptText}
                      type="button"
                      onClick={() => onAskQuestion(promptText)}
                      className="text-[11px] text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700/80 transition-colors flex items-center gap-1"
                    >
                      <ChevronRight className="w-3 h-3 text-cyan-400" />
                      <span>{promptText}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. Next Chapters Recommendations */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Other Chapters in {currentSubject.name.en}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {subjectTopics
              .filter((t) => t.id !== activeTopic.id)
              .slice(0, 4)
              .map((rec) => (
                <button
                  key={rec.id}
                  type="button"
                  onClick={() => {
                    setActiveStepTab(0);
                    onSelectTopic(rec.id);
                  }}
                  className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition-all flex items-center justify-between text-xs group"
                >
                  <div className="truncate pr-2">
                    <span className="text-[10px] text-cyan-400 font-bold block">
                      Chapter {rec.chapterNumber}
                    </span>
                    <span className="font-semibold text-slate-200 group-hover:text-white truncate block">
                      {rec.title[language]}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
