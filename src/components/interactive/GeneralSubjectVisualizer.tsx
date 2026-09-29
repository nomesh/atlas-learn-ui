import React, { useState } from 'react';
import {
  BookOpen,
  Globe,
  Award,
  Layers,
  Sparkles,
  CheckCircle2,
  Compass,
  MapPin,
  Mountain,
  Droplets,
  CloudRain
} from 'lucide-react';
import { MOCK_TOPICS } from '../../mocks/curriculumData';

interface GeneralSubjectProps {
  topicId: string;
  subjectId?: string;
  language?: 'en' | 'si' | 'ta';
  activeModeHint?: string;
}

export const GeneralSubjectVisualizer: React.FC<GeneralSubjectProps> = ({
  topicId,
  subjectId = 'general',
  language = 'en',
  activeModeHint,
}) => {
  const currentTopic = MOCK_TOPICS.find((t) => t.id === topicId);
  const title = currentTopic?.title[language] || currentTopic?.title.en || topicId.replace(/-/g, ' ');

  // English Grammar State
  const [tense, setTense] = useState<'present' | 'past' | 'future' | 'perfect'>('present');
  const [voice, setVoice] = useState<'active' | 'passive'>('active');

  // Geography State
  const [geoTab, setGeoTab] = useState<'peneplains' | 'monsoon'>('peneplains');
  const [activePeneplain, setActivePeneplain] = useState<1 | 2 | 3>(1);

  // Universal Workbench Slider
  const [conceptMastery, setConceptMastery] = useState<number>(75);

  if (subjectId === 'english') {
    return (
      <div className="space-y-4 text-slate-100">
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-violet-400" />
              <span>Interactive English Grammar & Tenses Lab</span>
            </h4>
            <div className="flex gap-1.5">
              {(['active', 'passive'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVoice(v)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold capitalize ${
                    voice === v ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {v} Voice
                </button>
              ))}
            </div>
          </div>

          {/* Tense selector */}
          <div className="flex flex-wrap gap-2">
            {(['present', 'past', 'future', 'perfect'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTense(t)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${
                  tense === t ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {t === 'present' ? 'Simple Present' : t === 'past' ? 'Simple Past' : t === 'future' ? 'Simple Future' : 'Present Perfect'}
              </button>
            ))}
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400">Example Sentence Structure:</div>
            {voice === 'active' ? (
              <div className="text-base font-bold text-violet-300 font-mono">
                {tense === 'present' && 'The student writes an essay on Sri Lankan biodiversity.'}
                {tense === 'past' && 'The student wrote an essay on Sri Lankan biodiversity.'}
                {tense === 'future' && 'The student will write an essay on Sri Lankan biodiversity.'}
                {tense === 'perfect' && 'The student has written an essay on Sri Lankan biodiversity.'}
              </div>
            ) : (
              <div className="text-base font-bold text-emerald-300 font-mono">
                {tense === 'present' && 'An essay on Sri Lankan biodiversity is written by the student.'}
                {tense === 'past' && 'An essay on Sri Lankan biodiversity was written by the student.'}
                {tense === 'future' && 'An essay on Sri Lankan biodiversity will be written by the student.'}
                {tense === 'perfect' && 'An essay on Sri Lankan biodiversity has been written by the student.'}
              </div>
            )}
            <div className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800/80">
              G.C.E. O/L Examination Focus: Verb form agreement, auxiliary verbs (is, was, has, been), and passive transformation.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (subjectId === 'geography') {
    return (
      <div className="space-y-4 text-slate-100">
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="flex gap-2 border-b border-slate-800 pb-2">
            <button
              type="button"
              onClick={() => setGeoTab('peneplains')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                geoTab === 'peneplains' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Three Peneplains (තලා භූමි 3)
            </button>
            <button
              type="button"
              onClick={() => setGeoTab('monsoon')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                geoTab === 'monsoon' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Monsoons & Climate Zones (මෝසම් සුළං)
            </button>
          </div>

          {geoTab === 'peneplains' && (
            <div className="space-y-3">
              <div className="flex gap-2">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setActivePeneplain(p as 1 | 2 | 3)}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      activePeneplain === p ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {p === 1 ? '1st: Coastal Lowlands' : p === 2 ? '2nd: Uplands' : '3rd: Central Highlands'}
                  </button>
                ))}
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-200">
                {activePeneplain === 1 && 'First Peneplain: Elevation 0 to 30 m above sea level. Covers flat coastal plains, lagoons, river deltas, and dry zone flats.'}
                {activePeneplain === 2 && 'Second Peneplain: Elevation 30 to 300 m above sea level. Undulating landscape, rolling hills, and rubber/coconut agro-zones.'}
                {activePeneplain === 3 && 'Third Peneplain: Elevation 300 to 2524 m (Pidurutalagala). Central highlands, tea estates, waterfalls, escarpments, and high mountain peaks.'}
              </div>
            </div>
          )}

          {geoTab === 'monsoon' && (
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-200 space-y-2">
              <div className="font-bold text-cyan-400">South-West Monsoon (May – September):</div>
              <p>Moisture-laden winds blow from the Indian Ocean, bringing heavy relief rainfall to the South-Western Wet Zone and central mountain windward slopes.</p>
              <div className="font-bold text-amber-400 pt-1 border-t border-slate-800">North-East Monsoon (December – February):</div>
              <p>Brings rainfall to the Northern, Eastern, and North-Central Dry Zones of Sri Lanka, replenishing the ancient agricultural irrigation reservoirs (Wewa).</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Universal Dynamic Topic Concept Workbench (for unlisted/custom topics)
  return (
    <div className="space-y-4 text-slate-100">
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-white capitalize">{title}</h4>
              <p className="text-[10px] text-slate-400">Interactive Syllabus Workbench</p>
            </div>
          </div>
          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-semibold px-2 py-0.5 rounded-full border border-indigo-500/30">
            Syllabus Aligned
          </span>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
          <p className="text-slate-300 leading-relaxed">
            {currentTopic?.description[language] || currentTopic?.description.en || 'Key curriculum study unit grounded in the Sri Lankan National Curriculum standards.'}
          </p>

          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Core Principle Exploration Level:</span>
              <span className="font-mono font-bold text-cyan-400">{conceptMastery}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={conceptMastery}
              onChange={(e) => setConceptMastery(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="text-[11px] text-slate-400">
              Observe how adjusting learning parameters correlates with examination question patterns and practical examples.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
