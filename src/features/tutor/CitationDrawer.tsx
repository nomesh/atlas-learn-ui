import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, ChevronDown, ChevronUp, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import type { SourceCitation } from '../../types';

interface CitationDrawerProps {
  citations: SourceCitation[];
}

export const CitationDrawer: React.FC<CitationDrawerProps> = ({ citations }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  if (!citations || citations.length === 0) return null;

  return (
    <div className="mt-3 border-t border-slate-100 pt-2.5">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-atlas-blue transition-colors group"
      >
        <div className="w-5 h-5 rounded-md bg-sky-50 flex items-center justify-center text-atlas-cyan group-hover:bg-sky-100">
          <BookOpen className="w-3.5 h-3.5" />
        </div>
        <span>{t('tutor.citationsTitle')}</span>
        <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded-full font-semibold">
          {citations.length}
        </span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2.5 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-1 text-[11px] text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('tutor.citationsNote')}</span>
          </div>

          <div className="grid gap-2">
            {citations.map((cite, index) => (
              <div
                key={cite.documentId || index}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs flex flex-col gap-1"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <FileText className="w-3.5 h-3.5 text-atlas-blue flex-shrink-0" />
                    <span>{cite.source}</span>
                  </div>
                  {cite.fileType && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-500">
                      {cite.fileType}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1">
                  {cite.pageNumber != null && (
                    <span>
                      {t('tutor.page')}: <strong className="text-slate-700">{cite.pageNumber}</strong>
                    </span>
                  )}
                  {cite.chunkNumber != null && (
                    <span>
                      {t('tutor.chunk')}: <strong className="text-slate-700">{cite.chunkNumber}</strong>
                    </span>
                  )}
                  {cite.distance != null && (
                    <span>
                      {t('tutor.relevance')}: <strong className="text-slate-700">{Math.round((1 - cite.distance) * 100)}%</strong>
                    </span>
                  )}
                </div>

                {/* Excerpt ONLY shown if genuinely supplied by backend API! Never fabricated */}
                {cite.excerpt && (
                  <p className="mt-1 text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-100 italic">
                    "{cite.excerpt}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
