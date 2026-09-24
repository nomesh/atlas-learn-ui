import React, { useState } from 'react';
import { X, ExternalLink, BookOpen, AlertCircle, Loader2 } from 'lucide-react';

interface SourcePagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
  documentName: string;
  pageNumber: number;
}

export const SourcePagePreviewModal: React.FC<SourcePagePreviewModalProps> = ({
  isOpen,
  onClose,
  documentId,
  documentName,
  pageNumber,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const previewUrl = `/api/learn/resources/${encodeURIComponent(documentId)}/pages/${pageNumber}/preview?dpi=150`;
  const fullDocumentUrl = `/api/learn/resources/${encodeURIComponent(documentId)}/content`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center text-atlas-blue">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{documentName}</h3>
              <p className="text-xs text-slate-500 font-medium">
                Verified Curriculum Source &bull; Page {pageNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={fullDocumentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Open full document PDF in new tab"
            >
              <span>Full PDF</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content / Preview Image */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-100/70 min-h-[350px]">
          {loading && (
            <div className="flex flex-col items-center gap-2 text-slate-400 py-12">
              <Loader2 className="w-8 h-8 animate-spin text-atlas-blue" />
              <p className="text-xs font-medium">Rendering textbook page preview...</p>
            </div>
          )}

          {error ? (
            <div className="flex flex-col items-center gap-3 text-center p-8 bg-white rounded-xl border border-slate-200/80 max-w-md shadow-sm">
              <AlertCircle className="w-8 h-8 text-amber-500" />
              <div>
                <p className="text-xs font-bold text-slate-800">Preview currently unavailable</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  The page preview could not be rendered from the dedicated curriculum storage. You can view the original PDF document directly.
                </p>
              </div>
              <a
                href={fullDocumentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-2 bg-atlas-navy hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Open Full PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <img
              src={previewUrl}
              alt={`${documentName} - Page ${pageNumber}`}
              className={`max-w-full max-h-[75vh] object-contain rounded-lg shadow-md border border-slate-200 bg-white transition-opacity duration-300 ${
                loading ? 'opacity-0 h-0' : 'opacity-100'
              }`}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-white flex items-center justify-between text-[11px] text-slate-400">
          <span>Official National Educational Publications Department &bull; Sri Lanka</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
