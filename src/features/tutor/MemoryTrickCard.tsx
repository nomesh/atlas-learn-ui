import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RotateCcw,
  CheckCircle2,
  Zap
} from 'lucide-react';
import type { MemoryTrick, Language } from '../../types';

interface MemoryTrickCardProps {
  memoryTrick: MemoryTrick;
  language?: Language;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onTriggerVoice?: (options: { text: string; title: string; concept: string; language: Language }) => void;
  isExternalPlaying?: boolean;
}

export const MemoryTrickCard: React.FC<MemoryTrickCardProps> = ({
  memoryTrick,
  language = 'en',
  onPlayStateChange,
  onTriggerVoice,
  isExternalPlaying = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  // Sync external playing state
  const currentlyPlaying = isPlaying || isExternalPlaying;

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const localizedConcept = (language === 'si' && memoryTrick.languageVersions?.si?.concept)
    || (language === 'ta' && memoryTrick.languageVersions?.ta?.concept)
    || memoryTrick.concept;

  const localizedTrick = (language === 'si' && memoryTrick.languageVersions?.si?.trick)
    || (language === 'ta' && memoryTrick.languageVersions?.ta?.trick)
    || memoryTrick.trick;

  const localizedRhyme = (language === 'si' && memoryTrick.languageVersions?.si?.rhyme)
    || (language === 'ta' && memoryTrick.languageVersions?.ta?.rhyme)
    || memoryTrick.rhyme;

  const handleToggleAudio = () => {
    if (!isSupported) return;

    const textToSpeak = (language === 'si' && memoryTrick.languageVersions?.si?.audioText)
      || (language === 'ta' && memoryTrick.languageVersions?.ta?.audioText)
      || (language === 'en' && memoryTrick.languageVersions?.en?.audioText)
      || memoryTrick.audioText || memoryTrick.rhyme || memoryTrick.trick;

    const titleToSpeak = language === 'si' ? 'ටියුටර් මතක කෙටි ක්‍රමය' : language === 'ta' ? 'ஆசிரியர் நினைவுக் குறிப்பு' : 'Tutor Memory Trick';

    // If external trigger is provided (e.g. from TutorPage to launch large talking stage)
    if (onTriggerVoice) {
      setHasPlayed(true);
      onTriggerVoice({
        text: textToSpeak,
        title: titleToSpeak,
        concept: localizedConcept,
        language: language,
      });
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      onPlayStateChange?.(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Pick best matching voice
    const voices = window.speechSynthesis.getVoices();
    if (language === 'si') {
      const siVoice = voices.find((v) => v.lang.includes('si') || v.lang.includes('LK'));
      if (siVoice) utterance.voice = siVoice;
      utterance.lang = 'si-LK';
    } else if (language === 'ta') {
      const taVoice = voices.find((v) => v.lang.includes('ta') || v.lang.includes('IN') || v.lang.includes('LK'));
      if (taVoice) utterance.voice = taVoice;
      utterance.lang = 'ta-LK';
    } else {
      const enVoice = voices.find(
        (v) => (v.name.includes('Google') || v.name.includes('Natural')) && v.lang.startsWith('en')
      ) || voices.find((v) => v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
      utterance.lang = 'en-US';
    }

    utterance.pitch = 1.18; // Friendly lady tutor pitch
    utterance.rate = 0.94;  // Clear, encouraging pacing for learners

    utterance.onstart = () => {
      setIsPlaying(true);
      onPlayStateChange?.(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setHasPlayed(true);
      onPlayStateChange?.(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="mt-4 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/40 p-4 sm:p-5 text-white shadow-xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      {/* Background ambient lighting */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between gap-3 mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
            <Lightbulb className="w-4 h-4 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-amber-300 font-mono">
                {language === 'si' ? 'ටියුටර් මතක කෙටි ක්‍රමය' : language === 'ta' ? 'ஆசிரியர் நினைவுக் குறிப்பு' : 'Tutor Memory Trick'}
              </span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white">
              {localizedConcept}
            </h4>
          </div>
        </div>

        {/* Audio narration button */}
        {isSupported && (
          <button
            type="button"
            onClick={handleToggleAudio}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
              currentlyPlaying
                ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300/50 scale-105'
                : 'bg-indigo-600/80 hover:bg-indigo-600 text-white border border-indigo-400/30'
            }`}
            title={currentlyPlaying ? 'Pause narration' : 'Listen to Atlas Tutor voice trick'}
          >
            {currentlyPlaying ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>{language === 'si' ? 'හඬ නවත්වන්න' : language === 'ta' ? 'குரலை நிறுத்தவும்' : 'Pause Voice'}</span>
                {/* Audio wave animation */}
                <span className="flex items-center gap-0.5 ml-1">
                  <span className="w-1 h-3 bg-slate-950 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1 h-4 bg-slate-950 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1 h-2.5 bg-slate-950 rounded-full animate-bounce [animation-delay:300ms]" />
                </span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-200" />
                <span>
                  {hasPlayed
                    ? (language === 'si' ? 'නැවත සවන් දෙන්න' : language === 'ta' ? 'மீண்டும் கேட்கவும்' : 'Listen Again')
                    : (language === 'si' ? 'හඬින් සවන් දෙන්න' : language === 'ta' ? 'குரலில் கேட்கவும்' : 'Listen with Voice')}
                </span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Main Trick / Rhyme Display */}
      <div className="relative z-10 bg-slate-950/70 rounded-xl p-3 sm:p-4 border border-indigo-400/20 my-2 space-y-2">
        <p className="text-xs sm:text-sm text-indigo-100 font-medium leading-relaxed">
          {localizedTrick}
        </p>

        {localizedRhyme && (
          <div className="pt-2 border-t border-indigo-500/20">
            <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>{language === 'si' ? 'මතක තබා ගැනීමේ කෙටි කවිය:' : language === 'ta' ? 'நினைவில் நிறுத்த உதவும் பாடல்:' : 'Catchy Mnemonic Rhyme:'}</span>
            </div>
            <pre className="font-serif italic text-xs sm:text-sm text-amber-200/90 whitespace-pre-line leading-relaxed bg-black/30 p-2.5 rounded-lg border border-amber-500/20">
              "{localizedRhyme}"
            </pre>
          </div>
        )}
      </div>

      {/* Bottom celebratory hint */}
      <div className="flex items-center justify-between text-[11px] text-indigo-200/80 pt-1">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{language === 'si' ? 'විභාග ප්‍රශ්න සඳහා මෙම කවිය මතක තබාගන්න!' : language === 'ta' ? 'தேர்வு வினாக்களுக்கு இந்தப் பாடலை நினைவில் வையுங்கள்!' : 'Remember this rhyme for the next exam question!'}</span>
        </span>
        <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
          Sri Lankan Syllabus Tip
        </span>
      </div>
    </div>
  );
};
