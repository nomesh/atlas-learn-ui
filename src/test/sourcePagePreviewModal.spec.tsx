import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { SourcePagePreviewModal } from '../features/tutor/SourcePagePreviewModal';

const REVISION = 'dff3c0c6-1d24-4873-9208-3e86dd15b4ba';

// Content the modal used to manufacture (hard-coded passages and provenance claims). None may ever be shown.
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
});

describe('SourcePagePreviewModal', () => {
  it('shows no excerpt and no fabricated textbook content when the backend supplied none', () => {
    // Before remediation this exact input produced a hard-coded Bisokotuwa passage labelled "NIE Approved".
    render(
      <SourcePagePreviewModal
        isOpen
        onClose={() => {}}
        documentId={REVISION}
        documentName="histoy G 10 E"
        pageNumber={65}
        excerpt={null}
        relevance={12}
        chunkNumber={3}
      />
    );
    for (const text of FABRICATED) {
      expect(document.body.textContent).not.toContain(text);
    }
    expect(screen.queryByTestId('retrieved-excerpt')).toBeNull();
    expect(screen.getByRole('img').getAttribute('src')).toBe(`/api/learn/resources/${REVISION}/pages/65/preview?dpi=150`);
  });

  it('shows the genuine backend excerpt verbatim', () => {
    render(
      <SourcePagePreviewModal
        isOpen
        onClose={() => {}}
        documentId={REVISION}
        documentName="science P I G8 S"
        pageNumber={12}
        excerpt="1.2 රූපය උපයෝගී කරගන්න"
      />
    );
    expect(screen.getByTestId('retrieved-excerpt').textContent).toContain('1.2 රූපය උපයෝගී කරගන්න');
  });

  it('keeps the Tutor usable when the page image fails', () => {
    render(
      <SourcePagePreviewModal isOpen onClose={() => {}} documentId={REVISION} documentName="Book" pageNumber={3} />
    );
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByTestId('page-preview-unavailable')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Close Viewer' })).toBeTruthy();
    for (const text of FABRICATED) {
      expect(document.body.textContent).not.toContain(text);
    }
  });
});
