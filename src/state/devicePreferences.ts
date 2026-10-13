/**
 * Browser-storage model for ATLAS Learn: device (guest) preferences kept apart from authenticated learner data.
 *
 *   Learner identity  atlas_student_session, atlas_student_name   evidence that a learner was cached on this device
 *   Learner data      identity + atlas_student_grade, atlas_learn_lang
 *                     written only for a confirmed learner; cleared on logout, expiry, reset or failed authentication
 *   Guest preferences atlas_guest_lang, atlas_guest_grade
 *                     written only by a guest's own choices; never cleared with a learner, never written from one
 *
 * The Pages demo (MOCK) keeps its original keys and behaviour; only LIVE uses the guest keys and the migration.
 * Dependency-free so that i18n can read the initial language before the application modules load.
 */
import type { Grade, Language } from '../types';

export const LEARNER_IDENTITY_KEYS = ['atlas_student_session', 'atlas_student_name'] as const;
export const LEARNER_GRADE_KEY = 'atlas_student_grade';
export const LEARNER_LANGUAGE_KEY = 'atlas_learn_lang';
export const LEARNER_DATA_KEYS = [...LEARNER_IDENTITY_KEYS, LEARNER_GRADE_KEY, LEARNER_LANGUAGE_KEY] as const;
export const GUEST_LANGUAGE_KEY = 'atlas_guest_lang';
export const GUEST_GRADE_KEY = 'atlas_guest_grade';

const LANGUAGES: readonly Language[] = ['en', 'si', 'ta'];
const GRADE = /^grade-(?:[6-9]|1[0-3])$/;

export const isLanguage = (v: unknown): v is Language => typeof v === 'string' && (LANGUAGES as readonly string[]).includes(v);
export const isGrade = (v: unknown): v is Grade => typeof v === 'string' && GRADE.test(v);

function get(key: string): string | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage.getItem(key);
  } catch {
    return null;
  }
}
function set(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // storage unavailable: the preference simply is not remembered
  }
}
function remove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

/** True when this device holds a cached learner identity (not proof of a session). */
export function hasCachedLearner(): boolean {
  return LEARNER_IDENTITY_KEYS.some((k) => get(k) !== null);
}

export function readGuestLanguage(): Language | null {
  const v = get(GUEST_LANGUAGE_KEY);
  return isLanguage(v) ? v : null;
}
export function readGuestGrade(): Grade | null {
  const v = get(GUEST_GRADE_KEY);
  return isGrade(v) ? v : null;
}
export function writeGuestLanguage(language: Language): void {
  if (isLanguage(language)) set(GUEST_LANGUAGE_KEY, language);
}
export function writeGuestGrade(grade: Grade): void {
  if (isGrade(grade)) set(GUEST_GRADE_KEY, grade);
}

/**
 * Language for the first paint. With a cached learner, that learner's cached language (re-checked against the server
 * at once); otherwise the guest preference. The MOCK demo never writes guest keys, so it keeps using atlas_learn_lang.
 */
export function initialLanguage(): Language {
  const learner = get(LEARNER_LANGUAGE_KEY);
  const guest = get(GUEST_LANGUAGE_KEY);
  const ordered = hasCachedLearner() ? [learner, guest] : [guest, learner];
  return ordered.find(isLanguage) ?? 'en';
}

/** Removes every learner-specific value (LIVE). Guest preferences are untouched. */
export function clearLearnerData(): void {
  LEARNER_DATA_KEYS.forEach(remove);
}

/**
 * One-time-safe migration of the pre-split keys (LIVE only). Values found on a device without any cached learner
 * identity were a guest's own choices: they become guest preferences. With a cached learner they may belong to that
 * learner, so they stay learner data (cleared unless the server confirms the session) and never become guest
 * preferences. Never restores identity.
 */
export function migrateLegacyPreferences(): void {
  if (hasCachedLearner()) return;
  const legacyLanguage = get(LEARNER_LANGUAGE_KEY);
  const legacyGrade = get(LEARNER_GRADE_KEY);
  if (isLanguage(legacyLanguage) && readGuestLanguage() === null) set(GUEST_LANGUAGE_KEY, legacyLanguage);
  if (isGrade(legacyGrade) && readGuestGrade() === null) set(GUEST_GRADE_KEY, legacyGrade);
  remove(LEARNER_LANGUAGE_KEY);
  remove(LEARNER_GRADE_KEY);
}
