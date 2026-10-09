import React from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import i18n from '../i18n';
import { CitationDrawer } from '../features/tutor/CitationDrawer';
import { SourcePagePreviewModal } from '../features/tutor/SourcePagePreviewModal';
import { citationPageLabel, validPrintedPage } from '../features/tutor/citationPages';
import type { SourceCitation } from '../types';

const SCIENCE = '402cb3b7-f26e-4419-8e7d-7df4fa0fc5f3';
const GEOGRAPHY = '3ea3d8e7-3fe1-4b55-bea2-6585b52511ef';

const science = (pageNumber: number, printedPageNumber?: number | null): SourceCitation => ({
  documentId: SCIENCE,
  source: 'Grade 10 Science Part 1',
  fileType: 'PDF',
  pageNumber,
  printedPageNumber,
});

function openDrawer(citations: SourceCitation[]) {
  render(<CitationDrawer citations={citations} />);
  fireEvent.click(screen.getByRole('button'));
}

beforeEach(async () => {
  await i18n.changeLanguage('en');
});

afterEach(() => {
  cleanup();
});

describe('printed textbook pages vs physical PDF pages', () => {
  it('shows "Textbook page 184 · PDF page 198" for calibrated Science and previews physical page 198', () => {
    openDrawer([science(198, 184)]);
    expect(screen.getByTestId('citation-pages').textContent).toBe('Textbook page 184 · PDF page 198');

    fireEvent.click(screen.getByText('View page preview (Textbook page 184 · PDF page 198)'));
    const image = screen.getByRole('img');
    expect(image.getAttribute('src')).toBe(`/api/learn/resources/${SCIENCE}/pages/198/preview?dpi=150`);
    expect(screen.getByRole('dialog').getAttribute('aria-label')).toBe('Grade 10 Science Part 1 - Textbook page 184 · PDF page 198');
  });

  it('maps calibrated Geography physical page 20 to textbook page 10', () => {
    render(
      <SourcePagePreviewModal isOpen onClose={() => {}} documentId={GEOGRAPHY} documentName="භූගෝල විද්‍යාව - 10 ශ්‍රේණිය"
        pageNumber={20} printedPageNumber={10} />
    );
    expect(document.body.textContent).toContain('Textbook page 10 · PDF page 20');
    expect(screen.getByRole('img').getAttribute('src')).toBe(`/api/learn/resources/${GEOGRAPHY}/pages/20/preview?dpi=150`);
  });

  it('shows only the PDF page when the source is not calibrated', () => {
    openDrawer([science(198, null), science(199)]);
    const labels = screen.getAllByTestId('citation-pages').map(e => e.textContent);
    expect(labels).toEqual(['PDF page 198', 'PDF page 199']);
    expect(document.body.textContent).not.toContain('Textbook page');
  });

  it('never shows an invalid printed page number', () => {
    for (const bad of [0, -14, 1.5, Number.NaN, null, undefined]) {
      expect(validPrintedPage(bad as number | null | undefined)).toBeNull();
      expect(citationPageLabel(i18n.t, 198, bad as number | null | undefined)).toBe('PDF page 198');
    }
  });

  it('keeps one-based physical pages unchanged for previews', () => {
    render(<SourcePagePreviewModal isOpen onClose={() => {}} documentId={SCIENCE} documentName="Science" pageNumber={1} />);
    expect(screen.getByRole('img').getAttribute('src')).toBe(`/api/learn/resources/${SCIENCE}/pages/1/preview?dpi=150`);
    expect(document.body.textContent).toContain('PDF page 1');
  });

  it('has no Tamil page labels in this release (Tamil stays disabled; English labels apply)', async () => {
    await i18n.changeLanguage('ta');
    expect(citationPageLabel(i18n.t, 198, 184)).toBe('Textbook page 184 · PDF page 198');
    expect(i18n.getResource('ta', 'translation', 'tutor.textbookPage')).toBeUndefined();
    expect(i18n.getResource('ta', 'translation', 'tutor.pdfPage')).toBeUndefined();
  });

  it('applies the same distinction in Sinhala', async () => {
    await i18n.changeLanguage('si');
    openDrawer([science(198, 184), science(199, null)]);
    const labels = screen.getAllByTestId('citation-pages').map(e => e.textContent);
    expect(labels).toEqual(['පෙළපොතේ පිටුව 184 · PDF පිටුව 198', 'PDF පිටුව 199']);
    fireEvent.click(screen.getAllByText(/පිටුව බලන්න/)[0]);
    expect(screen.getByRole('img').getAttribute('src')).toBe(`/api/learn/resources/${SCIENCE}/pages/198/preview?dpi=150`);
  });
});
