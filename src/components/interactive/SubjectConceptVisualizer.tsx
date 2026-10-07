import React, { useMemo } from 'react';
import { 
  Activity, 
  Compass, 
  Calculator, 
  BookOpen, 
  Globe, 
  Sparkles,
  Flame,
  Layers,
  Atom,
  Cpu
} from 'lucide-react';
import { MathsConceptVisualizer, getMathsVisualizerKey } from './MathsConceptVisualizer';
import { ScienceConceptVisualizer, getScienceVisualizerKey } from './ScienceConceptVisualizer';
import { HistoryConceptVisualizer, getHistoryVisualizerKey } from './HistoryConceptVisualizer';
import { GeneralSubjectVisualizer } from './GeneralSubjectVisualizer';
import { MOCK_TOPICS, MOCK_SUBJECTS, findTopicResilient } from '../../mocks/curriculumData';
import { isMockCurriculum } from '../../curriculum/liveCurriculum';

interface SubjectConceptVisualizerProps {
  topicId?: string;
  subjectId?: string;
  grade?: string;
  topicTitle?: {
    en: string;
    si?: string;
    ta?: string;
  };
  language?: 'en' | 'si' | 'ta';
  activeModeHint?: string;
}

export function hasSimulation(topicId?: string, subjectId?: string, activeModeHint?: string, grade?: string): boolean {
  // Simulations are prototype content tied to the MOCK catalogue; LIVE never offers them.
  if (!isMockCurriculum()) return false;
  if (!topicId) return false;

  const currentTopic = findTopicResilient(MOCK_TOPICS, topicId, subjectId, grade);
  const effectiveSubjectId = subjectId || currentTopic?.subjectId || (
    topicId.startsWith('math') ? 'maths' :
    topicId.startsWith('sci') ? 'science' :
    topicId.startsWith('hist') ? 'history' :
    topicId.includes('english') ? 'english' :
    topicId.includes('geography') ? 'geography' :
    topicId.includes('ict') ? 'ict' :
    ''
  );

  if (effectiveSubjectId === 'science') {
    return getScienceVisualizerKey(topicId, activeModeHint) !== null;
  }
  if (effectiveSubjectId === 'maths') {
    return getMathsVisualizerKey(topicId, activeModeHint) !== null;
  }
  if (effectiveSubjectId === 'history') {
    return getHistoryVisualizerKey(topicId, activeModeHint) !== null;
  }
  if (effectiveSubjectId === 'ict') {
    return ['number-systems', 'configuring-formatting-computer', 'programming', 'physical-computing', 'internet', 'word-processing'].includes(topicId);
  }
  if (effectiveSubjectId === 'english') {
    const raw = `${topicId} ${activeModeHint || ''}`.toLowerCase();
    return raw.includes('english') || raw.includes('grammar') || raw.includes('tense');
  }
  if (effectiveSubjectId === 'geography') {
    const raw = `${topicId} ${activeModeHint || ''}`.toLowerCase();
    return raw.includes('geography') || raw.includes('peneplain') || raw.includes('monsoon');
  }

  // Cross-domain fallback check:
  if (getScienceVisualizerKey(topicId, activeModeHint) !== null) return true;
  if (getMathsVisualizerKey(topicId, activeModeHint) !== null) return true;
  if (getHistoryVisualizerKey(topicId, activeModeHint) !== null) return true;

  return false;
}

export const SubjectConceptVisualizer: React.FC<SubjectConceptVisualizerProps> = ({
  topicId = '',
  subjectId = '',
  grade,
  topicTitle,
  language = 'en',
  activeModeHint,
}) => {
  // 1. Resolve Curriculum Topic and Subject metadata
  const currentTopic = useMemo(() => {
    return findTopicResilient(MOCK_TOPICS, topicId, subjectId, grade);
  }, [topicId, subjectId, grade]);

  const effectiveSubjectId = useMemo(() => {
    if (subjectId) return subjectId;
    if (currentTopic?.subjectId) return currentTopic.subjectId;
    if (topicId.startsWith('math')) return 'maths';
    if (topicId.startsWith('sci')) return 'science';
    if (topicId.startsWith('hist')) return 'history';
    if (topicId.includes('english')) return 'english';
    if (topicId.includes('geography')) return 'geography';
    return '';
  }, [subjectId, currentTopic, topicId]);

  const canSimulate = useMemo(() => {
    return hasSimulation(topicId, effectiveSubjectId, activeModeHint, grade);
  }, [topicId, effectiveSubjectId, activeModeHint, grade]);

  // 2. Resolve Domain for interactive workbench rendering
  const domain = useMemo(() => {
    // Direct subject match
    if (effectiveSubjectId === 'maths') return 'maths';
    if (effectiveSubjectId === 'science') return 'science';
    if (effectiveSubjectId === 'history') return 'history';
    if (effectiveSubjectId === 'english') return 'english';
    if (effectiveSubjectId === 'geography') return 'geography';
    if (effectiveSubjectId === 'ict') return 'ict';

    // Topic string heuristics
    const idLower = topicId.toLowerCase();
    if (idLower.startsWith('math') || idLower.includes('algebra') || idLower.includes('perimeter') || idLower.includes('pythagor') || idLower.includes('fraction') || idLower.includes('quadratic') || idLower.includes('congruence') || idLower.includes('bearing')) {
      return 'maths';
    }
    if (idLower.startsWith('sci') || idLower.includes('reaction') || idLower.includes('cell') || idLower.includes('motion') || idLower.includes('force') || idLower.includes('friction') || idLower.includes('pressure') || idLower.includes('electricity')) {
      return 'science';
    }
    if (idLower.startsWith('hist') || idLower.includes('settlement') || idLower.includes('sluice') || idLower.includes('brahmi') || idLower.includes('kandy')) {
      return 'history';
    }
    if (idLower.includes('english') || idLower.includes('grammar') || idLower.includes('tense')) {
      return 'english';
    }
    if (idLower.includes('geography') || idLower.includes('peneplain') || idLower.includes('monsoon')) {
      return 'geography';
    }

    return 'general';
  }, [effectiveSubjectId, topicId]);

  // 3. Dynamic Header Display Title
  const displayTitle = useMemo(() => {
    if (topicTitle) {
      return topicTitle[language] || topicTitle.en;
    }
    if (currentTopic) {
      return currentTopic.title[language] || currentTopic.title.en;
    }
    if (domain === 'maths') {
      return language === 'si' ? 'අන්තර්ක්‍රියාකාරී ගණිත විද්‍යාගාරය' : language === 'ta' ? 'ஊடாடும் கணித ஆய்வுகூடம்' : 'Interactive Mathematics Laboratory';
    }
    if (domain === 'science') {
      return language === 'si' ? 'අන්තර්ක්‍රියාකාරී විද්‍යාගාරය' : language === 'ta' ? 'ஊடாடும் அறிவியல் ஆய்வுகூடம்' : 'Interactive Science Laboratory';
    }
    if (domain === 'history') {
      return language === 'si' ? 'ශ්‍රී ලංකා ඉතිහාස ගවේෂකය' : language === 'ta' ? 'இலங்கை வரலாற்று ஆய்வி' : 'Sri Lankan History Explorer';
    }
    if (domain === 'english') {
      return language === 'si' ? 'ඉංග්‍රීසි භාෂා හා ව්‍යාකරණ විද්‍යාගාරය' : language === 'ta' ? 'ஆங்கில இலக்கண ஆய்வுகூடம்' : 'English Grammar & Language Lab';
    }
    if (domain === 'geography') {
      return language === 'si' ? 'භූගෝල විද්‍යා හා තලා භූමි ආදර්ශකය' : language === 'ta' ? 'புவியியல் மாதிரி' : 'Geography & Topography Lab';
    }
    return topicId ? topicId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Curriculum Concept Visualizer';
  }, [currentTopic, domain, language, topicId]);

  // All hooks above run on every render. Only now is it safe to bail out (Rules of Hooks).
  if (!canSimulate) {
    return null;
  }

  return (
    <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-5">
      {/* Dynamic Header Bar: Accurately reflects the selected lesson */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            {domain === 'science' && <Activity className="w-4 h-4" />}
            {domain === 'history' && <Compass className="w-4 h-4" />}
            {domain === 'maths' && <Calculator className="w-4 h-4" />}
            {domain === 'english' && <BookOpen className="w-4 h-4" />}
            {domain === 'geography' && <Globe className="w-4 h-4" />}
            {domain === 'general' && <Sparkles className="w-4 h-4" />}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{displayTitle}</span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-semibold px-2 py-0.5 rounded-full border border-cyan-500/30">
                Live Simulation
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              {language === 'si'
                ? 'පරාමිතීන් වෙනස් කර තත්‍ය කාලීනව විෂය කරුණු සහ ගණනය කිරීම් නිරීක්ෂණය කරන්න'
                : language === 'ta'
                ? 'அளவீடுகளை மாற்றி நிகழ்நேர பாடக் கணிப்பீடுகளைக் கவனியுங்கள்'
                : 'Adjust variables to observe real-time syllabus principles and calculations'}
            </p>
          </div>
        </div>
      </div>

      {/* 1. MATHEMATICS CURRICULUM VISUALIZER */}
      {domain === 'maths' && (
        <MathsConceptVisualizer
          topicId={topicId}
          language={language}
          activeModeHint={activeModeHint}
        />
      )}

      {/* 2. SCIENCE CURRICULUM VISUALIZER */}
      {domain === 'science' && (
        <ScienceConceptVisualizer
          topicId={topicId}
          language={language}
          activeModeHint={activeModeHint}
        />
      )}

      {/* 3. HISTORY CURRICULUM VISUALIZER */}
      {domain === 'history' && (
        <HistoryConceptVisualizer
          topicId={topicId}
          language={language}
          activeModeHint={activeModeHint}
        />
      )}

      {/* 4. ENGLISH, GEOGRAPHY & UNIVERSAL SYLLABUS WORKBENCH */}
      {(['english', 'geography', 'general', 'ict'].includes(domain)) && (
        <GeneralSubjectVisualizer
          topicId={topicId}
          subjectId={domain}
          grade={grade}
          language={language}
          activeModeHint={activeModeHint}
        />
      )}
    </div>
  );
};
