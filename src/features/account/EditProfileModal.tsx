import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AlertTriangle, GraduationCap, Globe, Loader2, User, X } from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import type { Grade, Language } from '../../types';

/**
 * Profile editor for a signed-in learner (distinct from first-run onboarding).
 *
 * - Opening or cancelling makes no API call and changes no learner state; the form edits a local draft only.
 * - Close, Cancel, Escape, a backdrop click and any route change (including browser Back) close it.
 * - Focus moves into the dialog, Tab/Shift+Tab stay inside it, and focus returns to the opener on close.
 * - Save goes to the server first; React state and local storage change only after the server accepted it. A failed
 *   save keeps the dialog open with the draft and shows what to do; nothing was changed.
 * - The grade can only be chosen among the learner's entitled grades (loaded with the session). A learner with a
 *   single entitled grade, or whose entitlements are unknown, sees it read-only.
 */

const LANGUAGES: { id: Language; label: string; nativeName: string }[] = [
  { id: 'en', label: 'English', nativeName: 'English' },
  { id: 'si', label: 'Sinhala', nativeName: 'සිංහල' },
  { id: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
];

export const gradeLabel = (grade: string) => {
  const n = grade.replace(/^grade-/, '');
  return /^\d+$/.test(n) ? `Grade ${n}` : grade;
};

const NAME_MAX = 100;

const FOCUSABLE = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

export const EditProfileModal: React.FC = () => {
  const {
    isProfileEditorOpen,
    setIsProfileEditorOpen,
    studentName,
    grade,
    language,
    allowedGrades,
    saveProfileToServer,
  } = useStudent();

  const [draftName, setDraftName] = useState('');
  const [draftLanguage, setDraftLanguage] = useState<Language>(language);
  const [draftGrade, setDraftGrade] = useState<Grade>(grade);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const location = useLocation();
  const openedAtPath = useRef<string | null>(null);

  // A fresh draft from the current profile each time the editor opens (no API call).
  useEffect(() => {
    if (!isProfileEditorOpen) return;
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    openedAtPath.current = location.pathname + location.search;
    setDraftName(studentName);
    setDraftLanguage(language);
    setDraftGrade(grade);
    setError(null);
    setSaving(false);
    // Focus the first field once the dialog is in the document.
    const t = window.setTimeout(() => nameInputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
    // Only on open: the draft must not be overwritten while the learner edits it.
  }, [isProfileEditorOpen]);

  const close = useCallback(() => {
    setIsProfileEditorOpen(false);
    const opener = openerRef.current;
    openerRef.current = null;
    if (opener && document.contains(opener)) {
      window.setTimeout(() => opener.focus(), 0);
    }
  }, [setIsProfileEditorOpen]);

  // Any navigation (link, programmatic, browser Back/Forward) closes the editor without saving.
  useEffect(() => {
    if (!isProfileEditorOpen || openedAtPath.current === null) return;
    if (location.pathname + location.search !== openedAtPath.current) {
      close();
    }
  }, [location.pathname, location.search, isProfileEditorOpen, close]);

  if (!isProfileEditorOpen) return null;

  const selectableGrades = allowedGrades && allowedGrades.length > 1 ? allowedGrades : null;
  const trimmedName = draftName.trim();
  const nameValid = trimmedName.length > 0 && trimmedName.length <= NAME_MAX;
  const gradeAllowed = draftGrade === grade || (selectableGrades?.includes(draftGrade) ?? false);
  const changed = trimmedName !== studentName || draftLanguage !== language || draftGrade !== grade;
  const canSave = !saving && nameValid && gradeAllowed && changed;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      if (!saving) close();
      return;
    }
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
      e.preventDefault();
      first.focus();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    setSaving(true);
    setError(null);
    try {
      await saveProfileToServer(trimmedName, gradeAllowed ? draftGrade : grade, draftLanguage);
      setSaving(false);
      close();
    } catch {
      setSaving(false);
      setError(
        'Your profile could not be saved, so nothing was changed. Check your internet connection and try again. If it keeps failing, sign out and sign in again, or contact Neural Works support.',
      );
    }
  };

  return (
    <div
      data-testid="profile-editor-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !saving) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-testid="profile-editor"
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 id={titleId} className="text-lg font-extrabold text-slate-900">Edit profile</h2>
          <button
            type="button"
            onClick={close}
            disabled={saving}
            aria-label="Close"
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5" noValidate>
          <div>
            <label htmlFor={`${titleId}-name`} className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <User className="w-4 h-4 text-atlas-cyan" />
              Display name
            </label>
            <input
              id={`${titleId}-name`}
              ref={nameInputRef}
              type="text"
              value={draftName}
              maxLength={NAME_MAX}
              onChange={(e) => setDraftName(e.target.value)}
              aria-invalid={!nameValid}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-atlas-cyan/50 focus:border-atlas-cyan"
            />
            {!nameValid && <p className="mt-1 text-xs text-rose-600">Enter the name the Tutor should use.</p>}
          </div>

          <fieldset>
            <legend className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Globe className="w-4 h-4 text-atlas-cyan" />
              Language
            </legend>
            <div className="grid grid-cols-3 gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  aria-pressed={draftLanguage === l.id}
                  onClick={() => setDraftLanguage(l.id)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    draftLanguage === l.id
                      ? 'border-atlas-cyan bg-cyan-50/50 ring-2 ring-atlas-cyan/30 text-atlas-navy'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="block text-sm font-bold">{l.nativeName}</span>
                  <span className="block text-[11px] text-slate-500">{l.label}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-atlas-cyan" />
              Grade
            </div>
            {selectableGrades ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label="Entitled grades">
                {selectableGrades.map((g) => (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={draftGrade === g}
                    onClick={() => setDraftGrade(g)}
                    className={`p-2.5 rounded-xl border text-sm font-bold transition-all ${
                      draftGrade === g
                        ? 'border-atlas-cyan bg-cyan-50/50 ring-2 ring-atlas-cyan/30 text-atlas-navy'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {gradeLabel(g)}
                  </button>
                ))}
              </div>
            ) : (
              <div data-testid="profile-grade-readonly" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-sm font-bold text-slate-800">{gradeLabel(grade)}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Your grade comes from your enrolment. To change it, contact Neural Works support.
                </p>
              </div>
            )}
          </div>

          {error && (
            <div role="alert" className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={close}
              disabled={saving}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSave}
              className="px-5 py-2.5 rounded-xl bg-atlas-deep text-white text-sm font-bold hover:bg-slate-900 disabled:opacity-50 inline-flex items-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
