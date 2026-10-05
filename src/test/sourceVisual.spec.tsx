import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { SourceVisualCard, TutorMessageVisuals, visualAltText } from '../features/tutor/SourceVisualCard';
import { tutorService } from '../api/tutorApi';
import { apiClient } from '../api/client';
import type { SourceVisual } from '../types';

const REVISION = 'dff3c0c6-1d24-4873-9208-3e86dd15b4ba';

// Exactly the shape the backend returns for a Learn curriculum visual.
const visual: SourceVisual = {
  visualId: `${REVISION}:p42:preview`,
  documentName: 'science P I G8 S',
  fileType: 'PDF',
  pageNumber: 42,
  pageLabel: 'PDF page 42',
  kind: 'PAGE_PREVIEW',
  previewUrl: `/api/learn/resources/${REVISION}/pages/42/preview`,
  openUrl: `/api/learn/resources/${REVISION}/content#page=42`,
  label: 'Textbook page preview',
  curriculum: { resourceRevisionId: REVISION, grade: 8, subjectCode: 'SCIENCE', subjectName: 'Science', language: 'SI' },
};

const FABRICATED = [
  'Verbatim Grounded Passage',
  'Official Textbook Excerpt',
  'NIE Approved',
  'Bisokotuwa',
  'Department of Educational Publications',
  'Verified Sri Lankan National Curriculum',
  'National Exam Alignment',
  'Curriculum Competency',
];

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('TutorMessageVisuals', () => {
  it('renders nothing for a normal Tutor answer without visuals', () => {
    const { container: none } = render(<TutorMessageVisuals visuals={undefined} />);
    expect(none.innerHTML).toBe('');
    cleanup();
    const { container: empty } = render(<TutorMessageVisuals visuals={[]} />);
    expect(empty.innerHTML).toBe('');
    expect(screen.queryByTestId('source-visual-card')).toBeNull();
  });

  it('renders one card per backend visual', () => {
    render(<TutorMessageVisuals visuals={[visual]} language="en" />);
    expect(screen.getAllByTestId('source-visual-card')).toHaveLength(1);
  });
});

describe('SourceVisualCard', () => {
  it('renders the actual textbook page image from the backend previewUrl, unchanged', () => {
    render(<SourceVisualCard visual={visual} language="en" />);
    const img = screen.getByRole('img');
    expect(img.getAttribute('src')).toBe(visual.previewUrl);
  });

  it('renders verified attribution only', () => {
    render(<SourceVisualCard visual={visual} language="en" />);
    expect(screen.getByText('From your textbook')).toBeTruthy();
    expect(screen.getByTestId('source-visual-attribution').textContent).toBe('Grade 8 • Science • PDF page 42');
  });

  it('uses the backend openUrl unchanged', () => {
    render(<SourceVisualCard visual={visual} language="en" />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe(visual.openUrl);
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
  });

  it('omits attribution parts the backend did not verify instead of guessing them', () => {
    const minimal: SourceVisual = { ...visual, curriculum: null, documentName: null };
    render(<SourceVisualCard visual={minimal} language="en" />);
    expect(screen.getByTestId('source-visual-attribution').textContent).toBe('PDF page 42');
    expect(screen.queryByText(/Grade/)).toBeNull();
    expect(screen.queryByText(/Science/)).toBeNull();
  });

  it('builds alt text from verified metadata without describing the image contents', () => {
    expect(visualAltText(visual, 'en')).toBe('Textbook page preview · science P I G8 S · Grade 8 · Science · PDF page 42');
  });

  it('localises the labels for Sinhala and Tamil', () => {
    render(<SourceVisualCard visual={visual} language="si" />);
    expect(screen.getByText('ඔබේ පෙළපොතෙන්')).toBeTruthy();
    expect(screen.getByTestId('source-visual-attribution').textContent).toBe('8 ශ්‍රේණිය • Science • PDF පිටුව 42');
    cleanup();
    render(<SourceVisualCard visual={visual} language="ta" />);
    expect(screen.getByText('உங்கள் பாடநூலிலிருந்து')).toBeTruthy();
  });

  it('handles a broken image gracefully: the answer stays, no fabricated content appears', () => {
    render(
      <div>
        <p>Tutor answer text</p>
        <TutorMessageVisuals visuals={[visual]} language="en" />
      </div>
    );
    fireEvent.error(screen.getByRole('img'));

    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.getByTestId('source-visual-unavailable').textContent).toContain('could not be loaded');
    expect(screen.getByText('Tutor answer text')).toBeTruthy();
    expect(screen.getByRole('link').getAttribute('href')).toBe(visual.openUrl);
    for (const text of FABRICATED) {
      expect(document.body.textContent).not.toContain(text);
    }
  });
});

describe('Live Tutor adapter visuals mapping', () => {
  it('passes backend visuals through unchanged', async () => {
    act(() => tutorService.setMockMode(false));
    vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: { answer: 'ok', sources: [], visuals: [visual] },
    } as never);

    const response = await tutorService.askTutor('රූපය පෙන්වන්න', { subjectId: 'science', grade: 'grade-8', language: 'si', conversationId: 'c1' } as never);

    expect(response.visuals).toEqual([visual]);
    expect(response.visuals?.[0].previewUrl).toBe(visual.previewUrl);
    expect(response.visuals?.[0].openUrl).toBe(visual.openUrl);
  });

  it('defaults to no visuals and drops malformed entries', async () => {
    act(() => tutorService.setMockMode(false));
    const post = vi.spyOn(apiClient, 'post');
    post.mockResolvedValueOnce({ data: { answer: 'ok', sources: [] } } as never);
    const none = await tutorService.askTutor('q', { subjectId: 'science', grade: 'grade-8', language: 'en', conversationId: 'c1' } as never);
    expect(none.visuals).toEqual([]);

    post.mockResolvedValueOnce({ data: { answer: 'ok', sources: [], visuals: [null, { visualId: 'x' }, visual] } } as never);
    const filtered = await tutorService.askTutor('q', { subjectId: 'science', grade: 'grade-8', language: 'en', conversationId: 'c1' } as never);
    expect(filtered.visuals).toEqual([visual]);
  });
});
