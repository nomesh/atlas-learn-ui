import React, { useState } from 'react';
import { BookOpen, ExternalLink, ImageOff } from 'lucide-react';
import type { Language, SourceVisual } from '../../types';

const LABELS: Record<Language, {
  fromTextbook: string;
  grade: (grade: number) => string;
  pdfPage: (page: number) => string;
  open: string;
  unavailable: string;
  altPrefix: string;
}> = {
  en: {
    fromTextbook: 'From your textbook',
    grade: (g) => `Grade ${g}`,
    pdfPage: (p) => `PDF page ${p}`,
    open: 'Open textbook page',
    unavailable: 'The textbook page preview could not be loaded.',
    altPrefix: 'Textbook page preview',
  },
  si: {
    fromTextbook: 'ඔබේ පෙළපොතෙන්',
    grade: (g) => `${g} ශ්‍රේණිය`,
    pdfPage: (p) => `PDF පිටුව ${p}`,
    open: 'පෙළපොතේ පිටුව විවෘත කරන්න',
    unavailable: 'පෙළපොතේ පිටුවේ පෙරදසුන පූරණය කළ නොහැකි විය.',
    altPrefix: 'පෙළපොතේ පිටුවේ පෙරදසුන',
  },
  ta: {
    fromTextbook: 'உங்கள் பாடநூலிலிருந்து',
    grade: (g) => `தரம் ${g}`,
    pdfPage: (p) => `PDF பக்கம் ${p}`,
    open: 'பாடநூல் பக்கத்தைத் திறக்கவும்',
    unavailable: 'பாடநூல் பக்க முன்னோட்டத்தை ஏற்ற முடியவில்லை.',
    altPrefix: 'பாடநூல் பக்க முன்னோட்டம்',
  },
};

function labelsFor(language: string | undefined) {
  return LABELS[(language as Language)] ?? LABELS.en;
}

/**
 * Attribution parts built only from verified backend metadata. Anything missing is omitted, never guessed.
 */
export function visualAttributionParts(visual: SourceVisual, language?: string): string[] {
  const labels = labelsFor(language);
  const parts: string[] = [];
  const curriculum = visual.curriculum;
  if (curriculum?.grade != null) parts.push(labels.grade(curriculum.grade));
  const subject = curriculum?.subjectName || curriculum?.subjectCode;
  if (subject) parts.push(subject);
  if (visual.pageNumber != null) parts.push(labels.pdfPage(visual.pageNumber));
  return parts;
}

/** Alt text from verified metadata only; it never describes what the page image contains. */
export function visualAltText(visual: SourceVisual, language?: string): string {
  const labels = labelsFor(language);
  return [labels.altPrefix, visual.documentName, ...visualAttributionParts(visual, language)]
    .filter((part): part is string => Boolean(part))
    .join(' · ');
}

/**
 * Renders one backend-resolved textbook page preview inside a Tutor answer.
 * The image and open link use the backend URLs unchanged.
 */
export const SourceVisualCard: React.FC<{ visual: SourceVisual; language?: string }> = ({ visual, language }) => {
  const [failed, setFailed] = useState(false);
  const labels = labelsFor(language);
  const attribution = visualAttributionParts(visual, language);

  return (
    <figure
      className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm"
      data-testid="source-visual-card"
      data-visual-id={visual.visualId}
    >
      {!failed ? (
        <img
          src={visual.previewUrl}
          alt={visualAltText(visual, language)}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full max-h-[28rem] object-contain bg-slate-50"
        />
      ) : (
        <div
          role="status"
          data-testid="source-visual-unavailable"
          className="flex items-center gap-2 px-4 py-6 text-xs text-slate-500 bg-slate-50"
        >
          <ImageOff className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span>{labels.unavailable}</span>
        </div>
      )}
      <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-t border-slate-100 text-xs">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <BookOpen className="w-3.5 h-3.5 text-atlas-cyan flex-shrink-0" aria-hidden="true" />
            <span>{labels.fromTextbook}</span>
          </div>
          {attribution.length > 0 && (
            <div className="text-slate-500 mt-0.5" data-testid="source-visual-attribution">
              {attribution.join(' • ')}
            </div>
          )}
        </div>
        {visual.openUrl && (
          <a
            href={visual.openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-atlas-blue hover:underline"
          >
            <span>{labels.open}</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        )}
      </figcaption>
    </figure>
  );
};

/** All visuals of one Tutor message; renders nothing when there are none. */
export const TutorMessageVisuals: React.FC<{ visuals?: SourceVisual[]; language?: string }> = ({ visuals, language }) => {
  if (!visuals || visuals.length === 0) return null;
  return (
    <div className="mt-3 pt-3 border-t border-slate-100 space-y-3" data-testid="tutor-message-visuals">
      {visuals.map((visual) => (
        <SourceVisualCard key={visual.visualId} visual={visual} language={language} />
      ))}
    </div>
  );
};
