import React, { useState } from 'react';
import { X, ExternalLink, BookOpen, ImageOff } from 'lucide-react';

interface SourcePagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
  documentName: string;
  pageNumber: number;
  /** Genuine retrieved text from the backend. When absent, no excerpt is shown: nothing is ever substituted. */
  excerpt?: string | null;
  chunkNumber?: number | null;
  relevance?: number | null;
  fileType?: string | null;
}

/**
 * Shows the cited curriculum page exactly as the backend renders it, plus the genuine retrieved excerpt when the
 * backend supplied one. It never manufactures textbook text, approvals or provenance claims.
 */
export const SourcePagePreviewModal: React.FC<SourcePagePreviewModalProps> = ({
  isOpen,
  onClose,
  documentId,
  documentName,
  pageNumber,
  excerpt,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!isOpen) return null;

  // Learn citations identify the curriculum resource revision; anything else has no Learn preview.
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(documentId);
  const previewUrl = isUuid
    ? `/api/learn/resources/${encodeURIComponent(documentId)}/pages/${pageNumber}/preview?dpi=150`
    : null;
  const fullDocumentUrl = isUuid
    ? `/api/learn/resources/${encodeURIComponent(documentId)}/content`
    : null;
  const genuineExcerpt = excerpt && excerpt.trim().length > 0 ? excerpt.trim() : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`${documentName} - PDF page ${pageNumber}`}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200/80 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-slate-800 to-[#1E3E62] text-white">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white/10 p-1 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <BookOpen className="w-5 h-5 text-cyan-300" />
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <h3 className="text-sm font-bold text-white line-clamp-1">{documentName}</h3>
              <span className="text-[10px] font-mono bg-cyan-400/20 text-cyan-200 border border-cyan-400/30 px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                PDF page {pageNumber}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {fullDocumentUrl && (
              <a
                href={fullDocumentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                title="Open full document PDF in new tab"
              >
                <span>Full PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 bg-slate-50/70 space-y-5">
          {previewUrl && !imgError && (
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
              <img
                src={previewUrl}
                alt={`${documentName} - PDF page ${pageNumber}`}
                className={`max-w-full max-h-[50vh] object-contain rounded-lg shadow-xs transition-opacity duration-300 ${
                  imgLoaded ? 'opacity-100' : 'opacity-0 h-0'
                }`}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />
            </div>
          )}

          {(!previewUrl || imgError) && (
            <div
              role="status"
              data-testid="page-preview-unavailable"
              className="flex items-center gap-2 p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500"
            >
              <ImageOff className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>A preview of this page is not available.</span>
            </div>
          )}

          {genuineExcerpt && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200" data-testid="retrieved-excerpt">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Retrieved text from this page
              </div>
              <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-line select-text">{genuineExcerpt}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-white flex items-center justify-end text-xs text-slate-500">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-xs"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
