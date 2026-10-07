import React from 'react';
import { BookX } from 'lucide-react';
import type { Language } from '../types';

export const CURRICULUM_UNAVAILABLE_TEXT: Record<Language, string> = {
  en: 'Curriculum content is not yet available',
  si: 'විෂය නිර්දේශ අන්තර්ගතය තවමත් ලබා ගත නොහැක',
  ta: 'பாடத்திட்ட உள்ளடக்கம் இன்னும் கிடைக்கவில்லை',
};

interface CurriculumUnavailableProps {
  language: Language;
  /** Optional, more specific explanation (e.g. what is missing and what still works). */
  detail?: string;
  children?: React.ReactNode;
}

/**
 * Honest empty state for LIVE pages whose curriculum data does not exist in the ATLAS API yet.
 * Never substitutes sample chapters, topics, page ranges, lessons, simulations or mastery values.
 */
export const CurriculumUnavailable: React.FC<CurriculumUnavailableProps> = ({ language, detail, children }) => (
  <div
    role="status"
    data-testid="curriculum-unavailable"
    className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-3"
  >
    <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">
      <BookX className="w-6 h-6 text-slate-500" />
    </div>
    <h2 className="text-lg font-extrabold text-slate-900">{CURRICULUM_UNAVAILABLE_TEXT[language]}</h2>
    {detail && <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">{detail}</p>}
    {children}
  </div>
);
