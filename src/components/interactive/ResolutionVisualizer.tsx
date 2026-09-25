import React, { useState } from 'react';
import { Monitor, Globe, HardDrive, AlertTriangle } from 'lucide-react';

interface ResolutionVisualizerProps {
  language?: 'en' | 'si' | 'ta';
}

export const ResolutionVisualizer: React.FC<ResolutionVisualizerProps> = ({
  language = 'en',
}) => {
  const [selectedRes, setSelectedRes] = useState<'1080p' | '768p' | '600p'>('1080p');
  const [activeTab, setActiveTab] = useState<'display' | 'keyboard' | 'formatting'>('display');
  const [selectedFileSystem, setSelectedFileSystem] = useState<'ntfs' | 'fat32' | 'exfat'>('ntfs');

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 text-white p-5 sm:p-6 shadow-xl space-y-5">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('display')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'display'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Screen Resolution</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('keyboard')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'keyboard'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Sinhala & Tamil Unicode</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('formatting')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'formatting'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <HardDrive className="w-3.5 h-3.5" />
          <span>Drive Formatting</span>
        </button>
      </div>

      {/* Tab 1: Screen Resolution */}
      {activeTab === 'display' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Select resolution to observe pixel density and workspace area:
            </span>
            <div className="flex items-center gap-1.5">
              {(['1080p', '768p', '600p'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSelectedRes(mode)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    selectedRes === mode
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {mode === '1080p' ? '1920×1080 (FHD)' : mode === '768p' ? '1366×768 (HD)' : '800×600 (SVGA)'}
                </button>
              ))}
            </div>
          </div>

          {/* Virtual Desktop Monitor Preview */}
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 relative overflow-hidden h-48 flex flex-col justify-between">
            {/* Monitor Bezel Header */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-mono">
                Active Pixels:{' '}
                <strong className="text-cyan-400">
                  {selectedRes === '1080p'
                    ? '2,073,600 Pixels (Ultra Sharp)'
                    : selectedRes === '768p'
                    ? '1,049,088 Pixels (Standard)'
                    : '480,000 Pixels (Pixelated / Low Detail)'}
                </strong>
              </span>
              <span className="text-[10px] text-slate-400">Scale: 100%</span>
            </div>

            {/* Simulated Desktop Icons & Windows */}
            <div className="grid grid-cols-6 gap-2 my-auto">
              {['My Computer', 'Curriculum PDF', 'Scratch 3', 'LibreOffice', 'Google Chrome', 'Recycle Bin'].map(
                (icon, i) => (
                  <div
                    key={icon}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                      selectedRes === '1080p'
                        ? 'text-xs scale-100'
                        : selectedRes === '768p'
                        ? 'text-[11px] scale-90'
                        : 'text-[9px] scale-75 blur-[0.6px]'
                    } bg-slate-900/60 border border-slate-800/80 text-center`}
                  >
                    <div className="w-5 h-5 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs mb-1">
                      {i + 1}
                    </div>
                    <span className="truncate w-full text-slate-300">{icon}</span>
                  </div>
                )
              )}
            </div>

            {/* Taskbar */}
            <div className="bg-slate-900 border-t border-slate-800 px-3 py-1.5 -mx-4 -mb-4 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-bold text-cyan-400">❖ Start</span>
                <span className="text-[10px] text-slate-400">Grade 8 ICT Lab</span>
              </div>
              <span className="font-mono text-[11px]">10:45 AM • UTC+05:30 (Sri Lanka)</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Keyboard Setup */}
      {activeTab === 'keyboard' && (
        <div className="space-y-3 animate-in fade-in text-xs">
          <p className="text-slate-400">
            Pressing <strong>Windows Key + Spacebar</strong> cycles through installed input layouts. Unicode allows Sinhala and Tamil to be searched on Google and shared across any modern operating system:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-400">සිංහල (Sinhala)</span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">Wijesekara Layout</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Standard typewriter layout standardized by SLS 1134. Uses Unicode characters (U+0D80 to U+0DFF).
              </p>
              <div className="p-2 rounded-xl bg-slate-900 font-mono text-cyan-200 text-sm">
                ශ්‍රී ලංකා ජාතික විෂය නිර්දේශය
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-400">தமிழ் (Tamil)</span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">Tamil 99 / Anjal</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Phonetic & Tamil 99 layout using standard Unicode block (U+0B80 to U+0BFF).
              </p>
              <div className="p-2 rounded-xl bg-slate-900 font-mono text-cyan-200 text-sm">
                இலங்கை தேசிய பாடத்திட்டம்
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Drive Formatting & File Systems */}
      {activeTab === 'formatting' && (
        <div className="space-y-3.5 animate-in fade-in text-xs">
          <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-800/60 flex items-start gap-2.5 text-rose-200">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Important Ministry Curriculum Rule:</strong>
              Formatting completely destroys all file directory allocation tables and content. Always make a copy (Backup) before formatting!
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'ntfs', title: 'NTFS', desc: 'Windows Internal Hard Drives & SSDs (Files > 4GB, security permissions)' },
              { id: 'fat32', title: 'FAT32', desc: 'USB Flash Drives & School Lab compatibility (Max single file 4GB)' },
              { id: 'exfat', title: 'exFAT', desc: 'Modern high-capacity SD cards & USB drives across Mac & Windows' }
            ].map((fs) => (
              <button
                key={fs.id}
                type="button"
                onClick={() => setSelectedFileSystem(fs.id as any)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedFileSystem === fs.id
                    ? 'bg-cyan-950/70 border-cyan-400/80 text-white shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold font-mono text-cyan-300 mb-1">{fs.title}</div>
                <div className="text-[11px] leading-relaxed text-slate-300">{fs.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
