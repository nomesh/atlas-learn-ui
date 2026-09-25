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
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { MOCK_SUBJECTS, MOCK_TOPICS, getLessonStepsForTopic } from '../../mocks/curriculumData';
import { ElectricSwitchVisualizer } from '../../components/interactive/ElectricSwitchVisualizer';
import { ResolutionVisualizer } from '../../components/interactive/ResolutionVisualizer';
import { ScratchBlockVisualizer } from '../../components/interactive/ScratchBlockVisualizer';
import { MicrocontrollerVisualizer } from '../../components/interactive/MicrocontrollerVisualizer';
import { UrlAnatomyVisualizer } from '../../components/interactive/UrlAnatomyVisualizer';
import { WordProcessingVisualizer } from '../../components/interactive/WordProcessingVisualizer';

interface CurriculumCompanionPaneProps {
  subjectId: string;
  topicId?: string;
  language: 'en' | 'si' | 'ta';
  onAskQuestion: (query: string) => void;
  onSelectTopic: (newTopicId: string) => void;
}


const getTopicDeepDive = (topicId: string) => {
  switch (topicId) {
    case 'number-systems':
      return {
        examTrap: '⚠️ O/L Paper 1 Trap: Remember that 2⁰ = 1, NOT 0! Any positive number raised to power 0 equals 1. Many students mistakenly lose marks here!',
        challenge: '🎯 Interactive Challenge: Use the 8-bit switchboard above to toggle bits and build the decimal number 77 (64 + 8 + 4 + 1)!',
        clarifyPrompt: 'Can you clarify how decimal 77 is represented in 8-bit binary step-by-step?',
        verifyPrompt: 'I set binary bits for decimal 77 (01001101). Can you verify if my calculation is correct?'
      };
    case 'configuring-formatting-computer':
      return {
        examTrap: '⚠️ O/L Exam Trap: Formatting a USB storage drive removes the entire File Allocation Table. Backup your files before choosing NTFS or FAT32!',
        challenge: '🎯 Interactive Challenge: Compare 1920×1080 Full HD vs 800×600 SVGA in the visualizer above to see the pixel density difference!',
        clarifyPrompt: 'Can you clarify why Full HD has over 2 million pixels and how aspect ratio works?',
        verifyPrompt: 'Can you explain why FAT32 cannot store a single movie file larger than 4GB?'
      };
    case 'word-processing':
      return {
        examTrap: '⚠️ O/L & Term Exam Trap: Justify (Ctrl+J) aligns BOTH left and right margins, while Center (Ctrl+E) only balances text in the middle. Subscript (x₂) lowers text for formulas like CO₂, while Superscript (x²) raises text for powers like 2³!',
        challenge: '🎯 Interactive Studio Challenge: In the ribbon above, switch document presets between the English Day Invitation, Science Exam Paper (with CO₂ and 2³), and School Magazine!',
        clarifyPrompt: 'Can you clarify the difference between Justify (Ctrl+J) and Align Left (Ctrl+L) with textbook examples?',
        verifyPrompt: 'In a Science exam paper, should CO₂ use Subscript or Superscript, and how do I format 2³?'
      };
    case 'programming':
      return {
        examTrap: '⚠️ Scratch Trap: In a "repeat until" loop, if the condition variable does not change inside the loop, the program gets stuck in an infinite loop!',
        challenge: '🎯 Interactive Challenge: In the block visualizer above, set a repeat count of 4 and a turn of 90 degrees to draw a perfect square!',
        clarifyPrompt: 'Can you clarify how variables and repeat loops work together in Scratch?',
        verifyPrompt: 'Why does my Scratch sprite draw a square when turning 90 degrees 4 times?'
      };
    case 'physical-computing':
      return {
        examTrap: '⚠️ Sensor vs Actuator Trap: Sensors are INPUT devices (detecting light/heat); Actuators are OUTPUT devices (moving/lighting/beeping)!',
        challenge: '🎯 Interactive Challenge: Move the LDR light sensor slider below 30% to see if the night light activates on the micro:bit matrix!',
        clarifyPrompt: 'Can you clarify the difference between digital and analog sensor inputs on a micro:bit?',
        verifyPrompt: 'How can I program an automated street lamp using an LDR sensor and LED?'
      };
    case 'internet':
      return {
        examTrap: '⚠️ Cyber Privacy Trap: When emailing notices to a large group of parents or students, always put addresses in Bcc (Blind Carbon Copy) to prevent exposing private email addresses!',
        challenge: '🎯 Interactive Challenge: Click each part of the URL in the anatomy visualizer above to identify the protocol, domain, and file path!',
        clarifyPrompt: 'Can you clarify the difference between Cc and Bcc in email communication?',
        verifyPrompt: 'What should I do if I receive a suspicious email asking for my school account password?'
      };
    default:
      return {
        examTrap: '⚠️ National Syllabus Focus: Ensure you review past paper questions from the Educational Publications Department!',
        challenge: '🎯 Practice Challenge: Ask the Tutor to quiz you on key terms from this chapter!',
        clarifyPrompt: 'Can you clarify the core concepts of this lesson step-by-step?',
        verifyPrompt: 'Can you give me a past paper question on this chapter?'
      };
  }
};

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
            <WordProcessingVisualizer language={language} />
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

        
        {/* 4.5 Curriculum Deep Dive & Smart Recommendations */}
        {(() => {
          const deepDive = getTopicDeepDive(activeTopic.id);
          return (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Deep Dive & Smart Suggestions</span>
                </span>
                <span className="text-[10px] text-cyan-300 font-mono">Exam Master Tips</span>
              </div>

              {/* Exam Trap Alert */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed font-medium">
                {deepDive.examTrap}
              </div>

              {/* Interactive Challenge */}
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-100 leading-relaxed font-medium space-y-2">
                <p>{deepDive.challenge}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onAskQuestion(deepDive.verifyPrompt)}
                    className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Verify My Solution</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onAskQuestion(deepDive.clarifyPrompt)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1"
                  >
                    <span>Clarify This Concept</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

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
