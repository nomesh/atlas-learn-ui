import type { Language } from '../types';

/** Non-personal label for a signed-in learner whose name is not known (yet). */
export const STUDENT_FALLBACK: Record<Language, string> = { en: 'Student', si: 'ශිෂ්‍යයා', ta: 'மாணவர்' };

/** The learner's name, or the localized generic label when there is none. */
export function learnerDisplayName(name: string | null | undefined, language: Language): string {
  const n = (name || '').trim();
  return n || STUDENT_FALLBACK[language] || STUDENT_FALLBACK.en;
}

/** First letter of the learner's name, or null (callers then show a generic person icon). */
export function learnerInitial(name: string | null | undefined): string | null {
  const n = (name || '').trim();
  return n ? n.charAt(0).toUpperCase() : null;
}
