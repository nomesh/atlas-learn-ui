import React, { useMemo } from 'react';
import katex from 'katex';

interface RichContentRendererProps {
  content: string;
  className?: string;
  darkTheme?: boolean;
}

/**
 * Converts raw LaTeX tokens into human-readable Unicode mathematical typography
 * as a graceful fallback or pre-cleaner.
 */
export function formatMathToReadableUnicode(tex: string): string {
  return tex
    .replace(/\\times/g, '×')
    .replace(/\\pm/g, '±')
    .replace(/\\mp/g, '∓')
    .replace(/\\div/g, '÷')
    .replace(/\\implies/g, ' ➔ ')
    .replace(/\\iff/g, ' ⟺ ')
    .replace(/\\rightarrow/g, ' → ')
    .replace(/\\leftarrow/g, ' ← ')
    .replace(/\\neq/g, ' ≠ ')
    .replace(/\\ne/g, ' ≠ ')
    .replace(/\\leq/g, ' ≤ ')
    .replace(/\\le/g, ' ≤ ')
    .replace(/\\geq/g, ' ≥ ')
    .replace(/\\ge/g, ' ≥ ')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\delta/g, 'δ')
    .replace(/\\theta/g, 'θ')
    .replace(/\\pi/g, 'π')
    .replace(/\\rho/g, 'ρ')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\omega/g, 'ω')
    .replace(/\\approx/g, ' ≈ ')
    .replace(/\\cdot/g, ' · ')
    .replace(/\\degree/g, '°')
    .replace(/\\infty/g, '∞')
    .replace(/\\in/g, ' ∈ ')
    .replace(/\\notin/g, ' ∉ ')
    .replace(/\\subset/g, ' ⊂ ')
    .replace(/\\cup/g, ' ∪ ')
    .replace(/\\cap/g, ' ∩ ')
    .replace(/\\quad/g, '  ')
    .replace(/\\qquad/g, '    ')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1) / ($2)')
    .replace(/\^2/g, '²')
    .replace(/\^3/g, '³')
    .replace(/\^0/g, '⁰')
    .replace(/\^1/g, '¹')
    .replace(/\^4/g, '⁴')
    .replace(/\^5/g, '⁵')
    .replace(/_1/g, '₁')
    .replace(/_2/g, '₂')
    .replace(/_p/g, 'ₚ')
    .trim();
}

/**
 * Renders mathematical expressions using KaTeX with automatic fallback to clean Unicode.
 */
export const MathView: React.FC<{
  formula: string;
  displayMode?: boolean;
  darkTheme?: boolean;
}> = ({ formula, displayMode = false, darkTheme = false }) => {
  const rendered = useMemo(() => {
    // Strip external delimiters if present ($$, $, \[, \], \(, \))
    let clean = formula
      .replace(/^(\$\$|\$|\\\[|\\\()/, '')
      .replace(/(\$\$|\$|\\\]|\\\))$/, '')
      .trim();

    // Defensively restore any unintended JS escape sequences (e.g. \f -> formfeed, \t -> tab)
    clean = clean
      .replace(/\x0crac/g, '\\frac')
      .replace(/\x09imes/g, '\\times')
      .replace(/\\\\([a-zA-Z]+)/g, (_, cmd) => '\\' + cmd);

    try {
      const html = katex.renderToString(clean, {
        displayMode,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
      // If KaTeX fell back to error coloring (#cc0000), consider it invalid
      if (html && !html.includes('#cc0000')) {
        return html;
      }
      return null;
    } catch (e) {
      console.warn('[KaTeX Render Warning]', e);
      return null;
    }
  }, [formula, displayMode]);

  if (rendered) {
    if (displayMode) {
      const containerClass = darkTheme
        ? 'my-3 py-3 px-4 bg-slate-950/80 border border-cyan-500/30 rounded-2xl shadow-xs text-cyan-100 text-center overflow-x-auto flex items-center justify-center transition-all hover:border-cyan-400/50'
        : 'my-3 py-3.5 px-4 bg-gradient-to-r from-sky-50/90 via-indigo-50/50 to-slate-50 border border-sky-200/80 rounded-2xl shadow-xs text-slate-900 text-center overflow-x-auto flex items-center justify-center transition-all hover:border-sky-300';

      return (
        <div className={containerClass}>
          <span dangerouslySetInnerHTML={{ __html: rendered }} />
        </div>
      );
    }

    const inlineClass = darkTheme
      ? 'inline-block px-1 align-baseline text-cyan-200 font-medium'
      : 'inline-block px-1 align-baseline text-slate-900 font-medium';

    return (
      <span 
        className={inlineClass}
        dangerouslySetInnerHTML={{ __html: rendered }} 
      />
    );
  }

  // Graceful fallback to readable unicode math
  const unicodeMath = formatMathToReadableUnicode(formula);
  if (displayMode) {
    const fallbackBoxClass = darkTheme
      ? 'my-3 py-2.5 px-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-center text-cyan-200 font-serif text-base font-semibold shadow-xs'
      : 'my-3 py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-center text-slate-900 font-serif text-base font-semibold shadow-xs';

    return (
      <div className={fallbackBoxClass}>
        {unicodeMath}
      </div>
    );
  }

  const fallbackInlineClass = darkTheme
    ? 'font-serif font-semibold px-0.5 text-cyan-200'
    : 'font-serif font-semibold px-0.5 text-slate-900';

  return <span className={fallbackInlineClass}>{unicodeMath}</span>;
};

export const RichContentRenderer: React.FC<RichContentRendererProps> = ({ 
  content, 
  className = '', 
  darkTheme = false 
}) => {
  const lines = content.split('\n');

  const baseTextClass = darkTheme 
    ? 'text-slate-200' 
    : 'text-slate-800';

  return (
    <div className={`space-y-2.5 text-sm leading-relaxed break-words ${baseTextClass} ${className}`}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Heading 4
        if (trimmed.startsWith('#### ')) {
          return (
            <h5 key={idx} className={`text-xs font-bold uppercase tracking-wider mt-2.5 mb-1 flex items-center gap-1.5 ${darkTheme ? 'text-cyan-400' : 'text-atlas-blue'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${darkTheme ? 'bg-cyan-400' : 'bg-atlas-cyan'}`} />
              <span>{formatInline(trimmed.substring(5), darkTheme)}</span>
            </h5>
          );
        }

        // Heading 3
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className={`text-sm sm:text-base font-bold mt-2.5 mb-1 flex items-center gap-2 ${darkTheme ? 'text-white' : 'text-slate-900'}`}>
              <span className={`w-2 h-2 rounded-full ${darkTheme ? 'bg-cyan-400' : 'bg-atlas-blue'}`} />
              <span>{formatInline(trimmed.substring(4), darkTheme)}</span>
            </h4>
          );
        }

        // Heading 2
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className={`text-base sm:text-lg font-extrabold mt-3 mb-1 ${darkTheme ? 'text-white' : 'text-slate-900'}`}>
              {formatInline(trimmed.substring(3), darkTheme)}
            </h3>
          );
        }

        // Blockquote
        if (trimmed.startsWith('> ')) {
          const bqClass = darkTheme
            ? 'pl-3 py-1.5 my-2 border-l-3 border-cyan-400 bg-cyan-950/40 rounded-r-xl text-cyan-200 italic text-xs leading-relaxed'
            : 'pl-3 py-1.5 my-2 border-l-3 border-atlas-cyan bg-cyan-50/60 rounded-r-xl text-slate-700 italic text-xs leading-relaxed';

          return (
            <blockquote key={idx} className={bqClass}>
              {formatInline(trimmed.substring(2), darkTheme)}
            </blockquote>
          );
        }

        // Formula Block: $$...$$ or \[...\]
        if (
          (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length > 4) ||
          (trimmed.startsWith('\\[') && trimmed.endsWith('\\]') && trimmed.length > 4)
        ) {
          return <MathView key={idx} formula={trimmed} displayMode={true} darkTheme={darkTheme} />;
        }

        // Numbered item with formula: e.g. "1. $$v = u + at$$"
        const numberedFormulaMatch = trimmed.match(/^(\d+)\.\s+(\$\$.*\$\$|\\\[.*\\\])$/);
        if (numberedFormulaMatch) {
          return (
            <div key={idx} className="flex items-center gap-2.5 pl-2">
              <span className={`font-bold text-xs flex-shrink-0 ${darkTheme ? 'text-cyan-400' : 'text-atlas-cyan'}`}>
                {numberedFormulaMatch[1]}.
              </span>
              <div className="flex-1">
                <MathView formula={numberedFormulaMatch[2]} displayMode={true} darkTheme={darkTheme} />
              </div>
            </div>
          );
        }

        // Bullet item with formula: e.g. "- $$ax^2 + bx + c = 0$$"
        const bulletFormulaMatch = trimmed.match(/^[-*]\s+(\$\$.*\$\$|\\\[.*\\\])$/);
        if (bulletFormulaMatch) {
          return (
            <div key={idx} className="flex items-center gap-2.5 pl-2">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${darkTheme ? 'bg-cyan-400' : 'bg-atlas-blue'}`} />
              <div className="flex-1">
                <MathView formula={bulletFormulaMatch[1]} displayMode={true} darkTheme={darkTheme} />
              </div>
            </div>
          );
        }

        // Bullet list
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${darkTheme ? 'bg-cyan-400' : 'bg-atlas-blue'}`} />
              <div className="flex-1">{formatInline(trimmed.substring(2), darkTheme)}</div>
            </div>
          );
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className={`font-bold text-xs flex-shrink-0 mt-0.5 ${darkTheme ? 'text-cyan-400' : 'text-atlas-cyan'}`}>
                {numMatch[1]}.
              </span>
              <div className="flex-1">{formatInline(numMatch[2], darkTheme)}</div>
            </div>
          );
        }

        // Normal paragraph
        return (
          <p key={idx}>
            {formatInline(trimmed, darkTheme)}
          </p>
        );
      })}
    </div>
  );
};

/**
 * Helper for bold, inline math, and raw LaTeX formatting.
 */
function formatInline(text: string, darkTheme = false): React.ReactNode {
  // Pre-clean raw \quad / \qquad spacing tokens
  const preCleaned = text
    .replace(/\\qquad\b/g, '   ')
    .replace(/\\quad\b/g, ' ');

  // Split on block math ($$...$$), inline math ($...$), LaTeX delimiters (\(...\), \[...\]), or bold (**...**)
  const parts = preCleaned.split(/(\$\$.*?\$\$|\$.*?\$|\\\[.*?\\\]|\\\(.*?\\\)|\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (!part) return null;

    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className={`font-bold ${darkTheme ? 'text-white' : 'text-slate-900'}`}>
          {formatInline(part.slice(2, -2), darkTheme)}
        </strong>
      );
    }

    if (
      (part.startsWith('$$') && part.endsWith('$$')) ||
      (part.startsWith('$') && part.endsWith('$')) ||
      (part.startsWith('\\[') && part.endsWith('\\]')) ||
      (part.startsWith('\\(') && part.endsWith('\\)'))
    ) {
      return <MathView key={index} formula={part} displayMode={false} darkTheme={darkTheme} />;
    }

    // Check if unescaped text contains raw LaTeX math tokens (like \Delta, \implies, \times, \pm, \neq, \sqrt, \frac)
    if (/\\(Delta|delta|implies|iff|times|pm|mp|div|neq|ne|leq|le|geq|ge|alpha|beta|gamma|theta|pi|rho|sqrt|frac)\b/.test(part)) {
      // Split into math-bearing tokens and plain text
      const subParts = part.split(/(\\[a-zA-Z]+(?:\{[^}]*\}|\^\{?[0-9a-zA-Z]+\}?|_\{?[0-9a-zA-Z]+\}?|\s*[<>=+\-×÷≠≤≥]\s*[^,\s.]+)?)/g);
      return (
        <span key={index}>
          {subParts.map((sub, sIdx) => {
            if (/^\\[a-zA-Z]+/.test(sub)) {
              return <MathView key={sIdx} formula={sub} displayMode={false} darkTheme={darkTheme} />;
            }
            return cleanPlainTextMath(sub);
          })}
        </span>
      );
    }

    return cleanPlainTextMath(part);
  });
}

function cleanPlainTextMath(text: string): string {
  return text
    .replace(/\\times/g, '×')
    .replace(/\\pm/g, '±')
    .replace(/\\quad/g, ' ')
    .replace(/\\qquad/g, '  ')
    .replace(/\^2\b/g, '²')
    .replace(/\^3\b/g, '³')
    .replace(/\^0\b/g, '⁰')
    .replace(/\^1\b/g, '¹');
}
