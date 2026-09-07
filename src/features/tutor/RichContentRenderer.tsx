import React from 'react';

interface RichContentRendererProps {
  content: string;
}

export const RichContentRenderer: React.FC<RichContentRendererProps> = ({ content }) => {
  // Parse paragraphs, headings, bullet lists, block quotes, and math blocks
  const lines = content.split('\n');

  return (
    <div className="space-y-2.5 text-sm text-slate-800 leading-relaxed break-words">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Heading 3
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="text-sm font-bold text-slate-900 mt-2 mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-atlas-cyan" />
              <span>{formatInline(trimmed.substring(4))}</span>
            </h4>
          );
        }

        // Heading 2
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="text-base font-extrabold text-slate-900 mt-3 mb-1">
              {formatInline(trimmed.substring(3))}
            </h3>
          );
        }

        // Blockquote
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={idx} className="pl-3 py-1 my-1.5 border-l-2 border-atlas-cyan bg-cyan-50/50 rounded-r-lg text-slate-700 italic text-xs">
              {formatInline(trimmed.substring(2))}
            </blockquote>
          );
        }

        // Formula Block: $$...$$
        if (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length > 4) {
          const formula = trimmed.slice(2, -2);
          return (
            <div key={idx} className="my-2 p-2.5 bg-slate-900 text-cyan-200 rounded-xl font-mono text-xs sm:text-sm text-center shadow-inner overflow-x-auto">
              <code>{formula}</code>
            </div>
          );
        }

        // Bullet list
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-atlas-blue mt-2 flex-shrink-0" />
              <div className="flex-1">{formatInline(trimmed.substring(2))}</div>
            </div>
          );
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="font-bold text-xs text-atlas-cyan flex-shrink-0 mt-0.5">
                {numMatch[1]}.
              </span>
              <div className="flex-1">{formatInline(numMatch[2])}</div>
            </div>
          );
        }

        // Normal paragraph
        return (
          <p key={idx}>
            {formatInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

// Helper for bold and inline math formatting
function formatInline(text: string): React.ReactNode {
  // Match inline math $...$ or bold **...**
  const parts = text.split(/(\*\*.*?\*\*|\$.*?\$)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('$') && part.endsWith('$')) {
      return (
        <code key={index} className="px-1.5 py-0.5 bg-slate-100 text-atlas-deep rounded font-mono text-xs font-semibold">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
