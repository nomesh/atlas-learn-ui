import type { TFunction } from 'i18next';

/**
 * Page labels for curriculum citations.
 *
 * `pageNumber` from the backend is always the physical 1-based PDF page: it is what page previews open.
 * `printedPageNumber` is the number printed in the textbook, present only when the backend has a verified calibration
 * for that book. The UI never derives one from the other.
 */
export function validPrintedPage(printedPageNumber: number | null | undefined): number | null {
  return typeof printedPageNumber === 'number' && Number.isInteger(printedPageNumber) && printedPageNumber > 0
    ? printedPageNumber
    : null;
}

/** "Textbook page 184 · PDF page 198" for calibrated sources, otherwise only "PDF page 198". */
export function citationPageLabel(
  t: TFunction,
  pageNumber: number,
  printedPageNumber?: number | null,
): string {
  const pdf = t('tutor.pdfPage', { pdf: pageNumber });
  const printed = validPrintedPage(printedPageNumber);
  return printed == null ? pdf : `${t('tutor.textbookPage', { printed })} · ${pdf}`;
}
