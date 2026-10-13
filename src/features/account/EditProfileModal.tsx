import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { AlertTriangle, GraduationCap, Globe, Loader2, User, X } from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import type { StudentProfileUpdateRequest } from '../../api/authApi';
import type { Grade, Language } from '../../types';

/**
 * Profile editor for a signed-in learner (distinct from first-run onboarding).
 *
 * - Opening or cancelling makes no API call and changes no learner state; the form edits a local draft only.
 * - Close, Cancel, Escape, a backdrop click and any route change (including browser Back) close it.
 * - While open: Escape and Tab are handled at the document level (so clicking non-focusable dialog content cannot
 *   break them), focus cannot reach the background (it is inert and aria-hidden), and the page does not scroll.
 *   Everything is restored on every close path, and focus returns to the opener or, when the opener no longer
 *   exists (the account menu closed), to the persistent fallback target supplied by the opener.
 * - Save sends only the changed fields, server first; state changes only after the server accepted them. A failed
 *   save keeps the draft and explains what to do. A save that completes after its editor was closed or reopened never
 *   touches the newer editor; if it failed, a notice outside the editor says so.
 * - The grade can only be changed among the learner's entitled grades; an unchanged grade is never re-sent.
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

const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

export const SAVE_FAILED_TEXT =
  'Your profile could not be saved, so nothing was changed. Check your internet connection and try again. If it keeps failing, sign out and sign in again, or contact Neural Works support.';
export const LATE_SAVE_FAILED_TEXT =
  'Your last profile change could not be saved, so your profile was not changed. Open Edit Profile to try again.';

const usable = (el: HTMLElement | null | undefined): el is HTMLElement =>
  !!el && el.isConnected && el !== document.body && !el.closest('[inert]');

export const EditProfileModal: React.FC = () => {
  const {
    isProfileEditorOpen,
    setIsProfileEditorOpen,
    profileEditorReturnFocusRef,
    setProfileSaveNotice,
    studentName,
    grade,
    language,
    allowedGrades,
    saveProfileChanges,
  } = useStudent();

  const [draftName, setDraftName] = useState('');
  const [draftLanguage, setDraftLanguage] = useState<Language>(language);
  const [draftGrade, setDraftGrade] = useState<Grade>(grade);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const savingRef = useRef(false);
  /** Identifies one opening of the editor; a save only touches the editor session that started it. */
  const editorSessionRef = useRef(0);
  const openedAtPath = useRef<string | null>(null);
  const titleId = useId();
  const location = useLocation();

  const close = useCallback(() => {
    editorSessionRef.current += 1;
    savingRef.current = false;
    setSaving(false);
    setIsProfileEditorOpen(false);
    const candidates = [openerRef.current, profileEditorReturnFocusRef.current];
    openerRef.current = null;
    // After the background is restored (effect cleanup), focus the first target that still exists.
    window.setTimeout(() => {
      const target = candidates.find(usable);
      target?.focus();
    }, 0);
  }, [setIsProfileEditorOpen, profileEditorReturnFocusRef]);

  // Each opening: a fresh draft from the current profile (no API call) and a new editor session.
  useEffect(() => {
    if (!isProfileEditorOpen) return;
    editorSessionRef.current += 1;
    const active = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    openerRef.current = usable(active) ? active : null;
    openedAtPath.current = location.pathname + location.search;
    setDraftName(studentName);
    setDraftLanguage(language);
    setDraftGrade(grade);
    setError(null);
    setSaving(false);
    savingRef.current = false;
    // Only on open: the draft must not be overwritten while the learner edits it.
  }, [isProfileEditorOpen]);

  // While open: document-level keyboard handling, background inert, scroll lock. Cleaned up on every close path.
  useEffect(() => {
    if (!isProfileEditorOpen) return;
    const dialog = () => dialogRef.current;
    const focusables = () =>
      Array.from(dialog()?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter((el) => !el.hasAttribute('disabled'));

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        if (!savingRef.current) close();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) {
        e.preventDefault();
        dialog()?.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = !!active && !!dialog()?.contains(active) && active !== dialog();
      if (e.shiftKey && (!inside || active === first)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (!inside || active === last)) {
        e.preventDefault();
        first.focus();
      }
    };
    // Focus can never rest outside the dialog while it is open.
    const onFocusIn = (e: FocusEvent) => {
      const d = dialog();
      if (d && e.target instanceof Node && !d.contains(e.target)) {
        (focusables()[0] ?? d).focus();
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('focusin', onFocusIn, true);

    // Background: inert + aria-hidden for every top-level element except this dialog's portal.
    const portal = dialog()?.closest('[data-profile-editor-portal]');
    const changed: { el: Element; inert: string | null; hidden: string | null }[] = [];
    Array.from(document.body.children).forEach((el) => {
      if (el === portal) return;
      changed.push({ el, inert: el.getAttribute('inert'), hidden: el.getAttribute('aria-hidden') });
      el.setAttribute('inert', '');
      el.setAttribute('aria-hidden', 'true');
    });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => nameInputRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('focusin', onFocusIn, true);
      changed.forEach(({ el, inert, hidden }) => {
        if (inert === null) el.removeAttribute('inert');
        else el.setAttribute('inert', inert);
        if (hidden === null) el.removeAttribute('aria-hidden');
        else el.setAttribute('aria-hidden', hidden);
      });
      document.body.style.overflow = previousOverflow;
    };
  }, [isProfileEditorOpen, close]);

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

  // Only what the learner actually changed; a grade only when it is one of their entitled grades.
  const changes: StudentProfileUpdateRequest = {};
  if (trimmedName !== studentName) changes.name = trimmedName;
  if (draftLanguage !== language) changes.language = draftLanguage;
  if (draftGrade !== grade && selectableGrades?.includes(draftGrade)) changes.grade = draftGrade;
  const canSave = !saving && nameValid && Object.keys(changes).length > 0;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    const session = editorSessionRef.current;
    savingRef.current = true;
    setSaving(true);
    setError(null);
    try {
      await saveProfileChanges(changes);
      if (session !== editorSessionRef.current) return; // closed or reopened meanwhile: leave the newer editor alone
      close();
    } catch {
      if (session !== editorSessionRef.current) {
        setProfileSaveNotice(LATE_SAVE_FAILED_TEXT);
        return;
      }
      savingRef.current = false;
      setSaving(false);
      setError(SAVE_FAILED_TEXT);
    }
  };

  return createPortal(
    <div data-profile-editor-portal="">
      <div
        data-testid="profile-editor-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
        onMouseDown={(e) => {
          // Only a press that starts on the backdrop itself closes; presses inside the dialog never do.
          if (e.target === e.currentTarget && !savingRef.current) close();
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          data-testid="profile-editor"
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 focus:outline-none"
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
              <label
                htmlFor={`${titleId}-name`}
                className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
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
    </div>,
    document.body,
  );
};

/** Notice for a profile save that failed after its editor had been closed (nothing was changed). */
export const ProfileSaveNotice: React.FC = () => {
  const { profileSaveNotice, setProfileSaveNotice } = useStudent();
  if (!profileSaveNotice) return null;
  return (
    <div
      role="alert"
      data-testid="profile-save-notice"
      className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-md w-[calc(100%-2rem)] flex items-start gap-2 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 shadow-lg"
    >
      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <span className="flex-1">{profileSaveNotice}</span>
      <button
        type="button"
        onClick={() => setProfileSaveNotice(null)}
        aria-label="Dismiss"
        className="p-1 rounded-lg hover:bg-rose-100"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
