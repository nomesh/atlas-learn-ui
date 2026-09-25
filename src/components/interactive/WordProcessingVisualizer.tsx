import React, { useState } from 'react';
import { 
  FileText, 
  FolderOpen, 
  Save, 
  Printer, 
  Search, 
  Undo, 
  Redo, 
  Copy, 
  Scissors, 
  Clipboard, 
  CheckCheck, 
  Bold, 
  Italic, 
  Underline, 
  Highlighter, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  List, 
  ListOrdered, 
  PaintBucket, 
  Image, 
  Smile, 
  Shapes, 
  Type, 
  Square, 
  Table, 
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';

interface WordProcessingVisualizerProps {
  language?: 'en' | 'si' | 'ta';
}

type DocumentPreset = 'invitation' | 'souvenir' | 'sciencePaper' | 'magazine';

export const WordProcessingVisualizer: React.FC<WordProcessingVisualizerProps> = ({
  language = 'en',
}) => {
  // Document state
  const [activePreset, setActivePreset] = useState<DocumentPreset>('invitation');
  const [fontFamily, setFontFamily] = useState<'Times New Roman' | 'Cambria' | 'Nirmala UI' | 'FMAbhaya'>('Times New Roman');
  const [fontSize, setFontSize] = useState<12 | 14 | 18>(14);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);
  const [textColor, setTextColor] = useState<'default' | 'blue' | 'red' | 'purple'>('default');
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right' | 'justify'>('center');
  const [subscriptMode, setSubscriptMode] = useState(false);
  const [superscriptMode, setSuperscriptMode] = useState(false);
  const [hasShading, setHasShading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Load presets
  const handleSelectPreset = (preset: DocumentPreset) => {
    setActivePreset(preset);
    if (preset === 'invitation') {
      setFontFamily('Cambria');
      setFontSize(14);
      setIsBold(true);
      setIsItalic(false);
      setIsUnderline(false);
      setIsHighlight(false);
      setTextColor('blue');
      setAlignment('center');
      setSubscriptMode(false);
      setSuperscriptMode(false);
      setHasShading(true);
      setShowTable(false);
    } else if (preset === 'souvenir') {
      setFontFamily('Times New Roman');
      setFontSize(18);
      setIsBold(true);
      setIsItalic(true);
      setIsUnderline(true);
      setIsHighlight(false);
      setTextColor('purple');
      setAlignment('center');
      setSubscriptMode(false);
      setSuperscriptMode(false);
      setHasShading(false);
      setShowTable(false);
    } else if (preset === 'sciencePaper') {
      setFontFamily('Times New Roman');
      setFontSize(12);
      setIsBold(false);
      setIsItalic(false);
      setIsUnderline(false);
      setIsHighlight(false);
      setTextColor('default');
      setAlignment('left');
      setSubscriptMode(true);
      setSuperscriptMode(true);
      setHasShading(false);
      setShowTable(true);
    } else if (preset === 'magazine') {
      setFontFamily('Nirmala UI');
      setFontSize(12);
      setIsBold(false);
      setIsItalic(false);
      setIsUnderline(false);
      setIsHighlight(false);
      setTextColor('default');
      setAlignment('justify');
      setSubscriptMode(false);
      setSuperscriptMode(false);
      setHasShading(false);
      setShowTable(false);
    }
  };

  const getFontFamilyClass = () => {
    if (fontFamily === 'Cambria') return 'font-serif';
    if (fontFamily === 'Nirmala UI') return 'font-sans';
    if (fontFamily === 'FMAbhaya') return 'font-serif tracking-wide';
    return 'font-serif';
  };

  const getFontSizeClass = () => {
    if (fontSize === 18) return 'text-lg sm:text-xl';
    if (fontSize === 14) return 'text-sm sm:text-base';
    return 'text-xs sm:text-sm';
  };

  const getAlignmentClass = () => {
    if (alignment === 'center') return 'text-center';
    if (alignment === 'right') return 'text-right';
    if (alignment === 'justify') return 'text-justify';
    return 'text-left';
  };

  const getTextColorClass = () => {
    if (textColor === 'blue') return 'text-sky-900';
    if (textColor === 'red') return 'text-rose-800';
    if (textColor === 'purple') return 'text-purple-900';
    return 'text-slate-900';
  };

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 sm:p-5 shadow-2xl text-white space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 font-mono">
                Textbook Chapter 3 Simulator
              </span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              Word Processing Software Ribbon & Document Studio
            </h3>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => handleSelectPreset('invitation')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
              activePreset === 'invitation'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            💌 Invitation Card
          </button>
          <button
            type="button"
            onClick={() => handleSelectPreset('souvenir')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
              activePreset === 'souvenir'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📖 Souvenir
          </button>
          <button
            type="button"
            onClick={() => handleSelectPreset('sciencePaper')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
              activePreset === 'sciencePaper'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🧪 Question Paper ($CO_2$)
          </button>
          <button
            type="button"
            onClick={() => handleSelectPreset('magazine')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
              activePreset === 'magazine'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📰 Magazine (Justify)
          </button>
        </div>
      </div>

      {/* TOOLBAR RIBBON: Replicating Textbook Pages 35, 36, and 37 */}
      <div className="bg-slate-950 rounded-2xl p-2.5 sm:p-3 border border-slate-800 space-y-2">
        {/* Section 1: Common Tools (Page 35) & Clipboard (Page 36) */}
        <div className="flex items-center gap-1 flex-wrap pb-2 border-b border-slate-800/80 text-slate-300">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mr-1 hidden sm:inline">
            Common:
          </span>

          <button
            type="button"
            onClick={() => setActiveTooltip('New: To open a blank new document (Page 35)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="New (Ctrl+N)"
          >
            <FileText className="w-4 h-4 text-sky-400" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTooltip('Open: To open an existing saved document from computer (Page 35)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Open (Ctrl+O)"
          >
            <FolderOpen className="w-4 h-4 text-amber-400" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTooltip('Save: To save the current document to storage (Page 35)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Save (Ctrl+S)"
          >
            <Save className="w-4 h-4 text-emerald-400" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTooltip('Print Preview: To preview document formatting before printing (Page 35)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Print Preview"
          >
            <Search className="w-4 h-4 text-cyan-400" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTooltip('Print: To print the document on physical paper (Page 35)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Print (Ctrl+P)"
          >
            <Printer className="w-4 h-4 text-slate-300" />
          </button>

          <span className="w-px h-4 bg-slate-800 mx-1" />

          {/* Edit & Clipboard (Page 36) */}
          <button
            type="button"
            onClick={() => setActiveTooltip('Undo: To cancel the last action (Ctrl+Z) (Page 36)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTooltip('Redo: To redo the cancelled action (Ctrl+Y) (Page 36)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTooltip('Cut: To cut text or images (Ctrl+X) (Page 36)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Cut (Ctrl+X)"
          >
            <Scissors className="w-4 h-4 text-rose-400" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTooltip('Copy: To copy text or images (Ctrl+C) (Page 36)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Copy (Ctrl+C)"
          >
            <Copy className="w-4 h-4 text-sky-400" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTooltip('Paste: To paste copied or cut text and images (Ctrl+V) (Page 36)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Paste (Ctrl+V)"
          >
            <Clipboard className="w-4 h-4 text-amber-300" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTooltip('Spell check: To check spellings and grammar in words or sentences (Page 36)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            title="Spelling & Grammar Check"
          >
            <CheckCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold font-mono text-emerald-400">ABC✓</span>
          </button>
        </div>

        {/* Section 2: Text Formatting Tools (Page 36) */}
        <div className="flex items-center gap-1.5 flex-wrap pb-2 border-b border-slate-800/80">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mr-1 hidden sm:inline">
            Format:
          </span>

          {/* Font Family selector (Page 36: Times New Roman, Cambria, Nirmala UI, FMAbhaya) */}
          <select
            value={fontFamily}
            onChange={(e) => {
              setFontFamily(e.target.value as any);
              setActiveTooltip(`Font set to ${e.target.value} (letter type: Page 36)`);
            }}
            className="bg-slate-900 border border-slate-700 text-white rounded-lg text-xs px-2 py-1 focus:ring-1 focus:ring-sky-500"
          >
            <option value="Times New Roman">Times New Roman</option>
            <option value="Cambria">Cambria</option>
            <option value="Nirmala UI">Nirmala UI (Sinhala/Tamil)</option>
            <option value="FMAbhaya">FMAbhaya (කෆ්ර්සාබොෆ්ල්ෆ්යස)</option>
          </select>

          {/* Font Size selector (Page 36: 12 General, 14 Sub-topic, 18 Topic) */}
          <select
            value={fontSize}
            onChange={(e) => {
              setFontSize(Number(e.target.value) as any);
              setActiveTooltip(`Font size set to ${e.target.value}pt (Page 36)`);
            }}
            className="bg-slate-900 border border-slate-700 text-white rounded-lg text-xs px-2 py-1 focus:ring-1 focus:ring-sky-500"
          >
            <option value={12}>12 pt (General text)</option>
            <option value={14}>14 pt (Sub-topics)</option>
            <option value={18}>18 pt (Topics)</option>
          </select>

          <span className="w-px h-4 bg-slate-800 mx-0.5" />

          {/* Bold, Italic, Underline */}
          <button
            type="button"
            onClick={() => {
              setIsBold(!isBold);
              setActiveTooltip(`Bold: To darken the text (Page 36)`);
            }}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              isBold ? 'bg-sky-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setIsItalic(!isItalic);
              setActiveTooltip(`Italic: To slant text for emphasis (Page 36)`);
            }}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              isItalic ? 'bg-sky-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setIsUnderline(!isUnderline);
              setActiveTooltip(`Underline: To underline important text (Page 36)`);
            }}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              isUnderline ? 'bg-sky-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
            title="Underline (Ctrl+U)"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>

          {/* Highlight Pen */}
          <button
            type="button"
            onClick={() => {
              setIsHighlight(!isHighlight);
              setActiveTooltip(`Highlight: To draw visual attention to text with yellow marker (Page 36)`);
            }}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              isHighlight ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
            title="Highlight Text"
          >
            <Highlighter className="w-3.5 h-3.5" />
          </button>

          {/* Font Color */}
          <div className="flex items-center gap-1 bg-slate-900 px-1 py-0.5 rounded-lg border border-slate-700">
            <span className="text-[10px] text-slate-400 font-bold px-1">Color:</span>
            <button
              type="button"
              onClick={() => { setTextColor('default'); setActiveTooltip('Font Color: Black'); }}
              className={`w-3.5 h-3.5 rounded-full bg-slate-200 border ${textColor === 'default' ? 'ring-2 ring-sky-400' : ''}`}
              title="Black/Default"
            />
            <button
              type="button"
              onClick={() => { setTextColor('blue'); setActiveTooltip('Font Color: Deep Blue'); }}
              className={`w-3.5 h-3.5 rounded-full bg-blue-600 border ${textColor === 'blue' ? 'ring-2 ring-sky-400' : ''}`}
              title="Blue"
            />
            <button
              type="button"
              onClick={() => { setTextColor('red'); setActiveTooltip('Font Color: Red'); }}
              className={`w-3.5 h-3.5 rounded-full bg-rose-600 border ${textColor === 'red' ? 'ring-2 ring-sky-400' : ''}`}
              title="Red"
            />
            <button
              type="button"
              onClick={() => { setTextColor('purple'); setActiveTooltip('Font Color: Purple'); }}
              className={`w-3.5 h-3.5 rounded-full bg-purple-600 border ${textColor === 'purple' ? 'ring-2 ring-sky-400' : ''}`}
              title="Purple"
            />
          </div>

          <span className="w-px h-4 bg-slate-800 mx-0.5" />

          {/* Subscript & Superscript (Page 36) */}
          <button
            type="button"
            onClick={() => {
              setSubscriptMode(!subscriptMode);
              setActiveTooltip(`Subscript (x₂): To bring down from text line, e.g. CO₂ (Page 36)`);
            }}
            className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              subscriptMode ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
            title="Subscript (CO₂)"
          >
            x₂ (CO₂)
          </button>
          <button
            type="button"
            onClick={() => {
              setSuperscriptMode(!superscriptMode);
              setActiveTooltip(`Superscript (x²): To bring above text line, e.g. 2², 2³ (Page 36)`);
            }}
            className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              superscriptMode ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
            title="Superscript (2³, 2⁸)"
          >
            x² (2³)
          </button>
        </div>

        {/* Section 3: Alignment, Spacing, Lists & Objects (Page 37) */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mr-1 hidden sm:inline">
            Layout:
          </span>

          {/* Align Left, Center, Right, Justify (Page 37) */}
          <button
            type="button"
            onClick={() => { setAlignment('left'); setActiveTooltip('Align Left: To align the text to the left side (Page 37)'); }}
            className={`p-1.5 rounded-lg text-xs transition-all ${alignment === 'left' ? 'bg-sky-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
            title="Align Left (Ctrl+L)"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => { setAlignment('center'); setActiveTooltip('Center: To align the text to the middle (Page 37)'); }}
            className={`p-1.5 rounded-lg text-xs transition-all ${alignment === 'center' ? 'bg-sky-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
            title="Center (Ctrl+E)"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => { setAlignment('right'); setActiveTooltip('Align Right: To align the text to the right side (Page 37)'); }}
            className={`p-1.5 rounded-lg text-xs transition-all ${alignment === 'right' ? 'bg-sky-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
            title="Align Right (Ctrl+R)"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => { setAlignment('justify'); setActiveTooltip('Justify: Align the text evenly on BOTH sides (standard in textbooks!) (Page 37)'); }}
            className={`p-1.5 rounded-lg text-xs transition-all ${alignment === 'justify' ? 'bg-sky-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
            title="Justify (Ctrl+J)"
          >
            <AlignJustify className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-slate-800 mx-0.5" />

          {/* Bullets & Numbering (Page 37) */}
          <button
            type="button"
            onClick={() => setActiveTooltip('Bullets: To prepare unordered bullet lists (Page 37)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5 text-cyan-400" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTooltip('Numbering: To prepare numbered 1, 2, 3 lists (Page 37)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
            title="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5 text-amber-400" />
          </button>

          {/* Shading (Page 37) */}
          <button
            type="button"
            onClick={() => {
              setHasShading(!hasShading);
              setActiveTooltip('Shading: To colour the background of paragraphs or callouts (Page 37)');
            }}
            className={`p-1.5 rounded-lg transition-all ${hasShading ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
            title="Paragraph Shading"
          >
            <PaintBucket className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-slate-800 mx-0.5" />

          {/* Insert Objects (Page 37) */}
          <button
            type="button"
            onClick={() => setActiveTooltip('Pictures: To insert photos from computer (Page 37)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
            title="Insert Picture"
          >
            <Image className="w-3.5 h-3.5 text-emerald-400" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTooltip('Clip Art: To insert built-in illustrations and stickers (Page 37)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
            title="Insert Clip Art"
          >
            <Smile className="w-3.5 h-3.5 text-amber-300" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTooltip('Word Art: To insert artistic decorative letters (Page 37)')}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
            title="Insert Word Art"
          >
            <Type className="w-3.5 h-3.5 text-purple-400 font-extrabold" />
          </button>
          <button
            type="button"
            onClick={() => {
              setShowTable(!showTable);
              setActiveTooltip('Tables: To insert structured grids with rows and columns (Page 37)');
            }}
            className={`p-1.5 rounded-lg transition-all ${showTable ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
            title="Insert Table Grid"
          >
            <Table className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tooltip feedback bar */}
      {activeTooltip && (
        <div className="flex items-center gap-2 p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs text-cyan-200 animate-in fade-in">
          <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span className="truncate">{activeTooltip}</span>
        </div>
      )}

      {/* LIVE INTERACTIVE DOCUMENT CANVAS */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-inner border border-slate-300 text-slate-900 min-h-[340px] flex flex-col justify-between transition-all">
        {/* Preset 1: English Day Invitation (From Page 34 Dialogue) */}
        {activePreset === 'invitation' && (
          <div className={`space-y-4 ${getFontFamilyClass()} ${getAlignmentClass()}`}>
            <div className={`p-4 rounded-xl border border-sky-300 ${hasShading ? 'bg-sky-50' : 'bg-transparent'} transition-colors`}>
              <div className="text-[11px] font-bold text-sky-700 uppercase tracking-widest mb-1">
                ★ Ananda / Dharmaraja / Mahinda / Royal College ★
              </div>
              <h2 className={`${getFontSizeClass()} ${isBold ? 'font-extrabold' : 'font-normal'} ${isItalic ? 'italic' : ''} ${isUnderline ? 'underline' : ''} ${getTextColorClass()}`}>
                INVITATION: ANNUAL ENGLISH DAY COMPETITIONS 2026
              </h2>
              <p className={`text-xs text-slate-600 mt-2 ${isHighlight ? 'bg-yellow-200 px-1 py-0.5 rounded inline-block' : ''}`}>
                The English Literary Association cordially invites all teachers, parents, and students of Grade 8.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs space-y-1.5">
              <div><strong>📅 Date:</strong> 15th October 2026</div>
              <div><strong>⏰ Time:</strong> 9:00 AM – 1:00 PM</div>
              <div><strong>📍 Venue:</strong> Main School Auditorium</div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 italic">
              "Created with Word Processing Software for attractive invitation cards and clear typography!" (Textbook Page 34)
            </div>
          </div>
        )}

        {/* Preset 2: Event Souvenir Cover (From Page 34 Dialogue) */}
        {activePreset === 'souvenir' && (
          <div className={`space-y-5 text-center ${getFontFamilyClass()}`}>
            <div className="border-4 border-double border-purple-800 p-6 rounded-2xl bg-purple-50/40">
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-200 text-purple-900 flex items-center justify-center font-extrabold text-xl shadow-inner mb-3">
                🏆
              </div>
              <h1 className={`${getFontSizeClass()} ${isBold ? 'font-extrabold' : 'font-normal'} ${isItalic ? 'italic' : ''} ${isUnderline ? 'underline' : ''} ${getTextColorClass()}`}>
                ENGLISH DAY SOUVENIR 2026
              </h1>
              <p className="text-xs text-purple-800 mt-2 font-medium">
                A Collection of Essays, Poems, and Winning Artwork
              </p>
              <div className="mt-4 pt-4 border-t border-purple-200 text-[11px] text-slate-600">
                Ministry of Education • Sri Lankan School Curriculum
              </div>
            </div>
          </div>
        )}

        {/* Preset 3: Science Exam Paper with Subscript & Superscript (From Page 36) */}
        {activePreset === 'sciencePaper' && (
          <div className={`space-y-4 ${getFontFamilyClass()} ${getAlignmentClass()}`}>
            <div className="pb-3 border-b-2 border-slate-900 text-center">
              <h3 className="font-bold text-sm">GRADE 8 TERM TEST — SCIENCE & ICT</h3>
              <p className="text-[11px] text-slate-600">Time: 1 Hour • Answer all questions</p>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div>
                <strong>Question 1:</strong> Balance the chemical formula for carbon dioxide and water:
                <div className="p-2 bg-slate-100 rounded-lg font-mono text-slate-900 mt-1">
                  6C{subscriptMode ? <sub>O₂</sub> : 'O2'} + 6H{subscriptMode ? <sub>2</sub> : '2'}O → C{subscriptMode ? <sub>6</sub> : '6'}H{subscriptMode ? <sub>12</sub> : '12'}O{subscriptMode ? <sub>6</sub> : '6'} + 6O{subscriptMode ? <sub>2</sub> : '2'}
                  <span className="text-[10px] text-emerald-700 font-sans ml-2">(Notice Subscript <sub>2</sub> for CO₂)</span>
                </div>
              </div>

              <div>
                <strong>Question 2:</strong> In the binary number system, what is the positional value of:
                <div className="p-2 bg-slate-100 rounded-lg font-mono text-slate-900 mt-1">
                  2{superscriptMode ? <sup>0</sup> : '0'} = 1, &nbsp; 2{superscriptMode ? <sup>1</sup> : '1'} = 2, &nbsp; 2{superscriptMode ? <sup>2</sup> : '2'} = 4, &nbsp; 2{superscriptMode ? <sup>3</sup> : '3'} = 8, &nbsp; 2{superscriptMode ? <sup>7</sup> : '7'} = 128
                  <span className="text-[10px] text-sky-700 font-sans ml-2">(Notice Superscript <sup>3</sup> for 2³)</span>
                </div>
              </div>

              {showTable && (
                <div className="mt-2">
                  <div className="font-bold text-[11px] mb-1">Table 3.1: Marks Distribution (Inserted Table Object)</div>
                  <table className="w-full border-collapse border border-slate-300 text-center text-[11px]">
                    <thead>
                      <tr className="bg-slate-100 font-bold">
                        <th className="border border-slate-300 p-1">Section</th>
                        <th className="border border-slate-300 p-1">Topic</th>
                        <th className="border border-slate-300 p-1">Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-300 p-1">Part A</td>
                        <td className="border border-slate-300 p-1">Number Systems & Binary</td>
                        <td className="border border-slate-300 p-1">50</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-1">Part B</td>
                        <td className="border border-slate-300 p-1">Word Processing Formatting</td>
                        <td className="border border-slate-300 p-1">50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Preset 4: School Magazine Article (From Page 37 Justify demonstration) */}
        {activePreset === 'magazine' && (
          <div className={`space-y-3 ${getFontFamilyClass()} ${getAlignmentClass()}`}>
            <h2 className="text-base font-extrabold text-slate-900 border-b pb-1">
              THE IMPORTANCE OF DIGITAL LITERACY IN SRI LANKAN SCHOOLS
            </h2>
            <div className={`text-xs text-slate-700 leading-relaxed space-y-2 ${hasShading ? 'bg-amber-50/70 p-3 rounded-xl' : ''}`}>
              <p>
                Word processing software has fundamentally transformed how students produce examination papers, school magazines, and application forms. In traditional manual handwriting, mistakes required erasing or rewriting the whole page, and margins were often uneven and untidy.
              </p>
              <p>
                By using <strong>Justify (Ctrl+J)</strong> alignment, the computer adjusts the micro-spaces between words so that text lines align straight on both the left and right margins, exactly like official newspapers and Ministry of Education textbooks.
              </p>
              <p>
                Adding pictures, clip art, and tables enhances visual clarity, ensuring that every school publication looks polished, readable, and professional.
              </p>
            </div>
          </div>
        )}

        {/* Live Status Bar at bottom of document */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div>Page 1 of 1 • 142 Words</div>
          <div>Font: {fontFamily} ({fontSize}pt) • Align: {alignment.toUpperCase()}</div>
          <div className="text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Spelling: 100% OK</span>
          </div>
        </div>
      </div>

      {/* Textbook Figure 3.1 Callout: 7 Documents Produced */}
      <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
        <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Textbook Figure 3.1: Documents Produced using Word Processing</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-0.5">
          {[
            '✉️ Letters',
            '📝 Question Papers',
            '📰 Newspapers',
            '📋 Application Forms',
            '💌 Invitations',
            '🎉 Greeting Cards',
            '📖 Magazines'
          ].map((docType) => (
            <span
              key={docType}
              className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              {docType}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
