import React, { useState } from 'react';
import { Globe, Mail, ShieldCheck, Lock } from 'lucide-react';

interface UrlAnatomyVisualizerProps {
  language?: 'en' | 'si' | 'ta';
}

export const UrlAnatomyVisualizer: React.FC<UrlAnatomyVisualizerProps> = ({
  language = 'en',
}) => {
  const [activeTab, setActiveTab] = useState<'url' | 'email'>('url');
  const [showBccExplanation, setShowBccExplanation] = useState<boolean>(true);

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 text-white p-5 sm:p-6 shadow-xl space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'url'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Anatomy of a URL</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('email')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'email'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Email To vs CC vs BCC</span>
        </button>
      </div>

      {activeTab === 'url' ? (
        <div className="space-y-4 animate-in fade-in text-xs">
          <p className="text-slate-400">
            A Uniform Resource Locator (URL) directs web browsers to resources across the global World Wide Web:
          </p>

          {/* Interactive URL bar breakdown */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-700 flex flex-wrap items-center gap-1 font-mono text-sm">
            <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              https://
            </span>
            <span className="px-2 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30">
              www.
            </span>
            <span className="px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
              moe.gov
            </span>
            <span className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
              .lk
            </span>
            <span className="px-2 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
              /curriculum/grade8/ict.pdf
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-400">1. Protocol</div>
              <p className="text-slate-400">HTTPS encrypts traffic so passwords cannot be intercepted.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-cyan-400">2. Domain Name</div>
              <p className="text-slate-400">Identifies the web server organization (e.g. Ministry of Education).</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400">3. .lk Country Code</div>
              <p className="text-slate-400">Official ISO country-code top-level domain for Sri Lanka.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-purple-400">4. File Path</div>
              <p className="text-slate-400">Exact folder and document location on the web server.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 font-mono text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold w-12">To:</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">principal@school.sch.lk</span>
              <span className="text-slate-500">(Primary recipient taking action)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold w-12">Cc:</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">vice_principal@school.sch.lk</span>
              <span className="text-slate-500">(Carbon Copy: visible to all)</span>
            </div>
            <div className="flex items-center gap-2 border-t border-slate-800/80 pt-2">
              <span className="text-amber-400 font-bold w-12">Bcc:</span>
              <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800">
                250_parents_group@school.sch.lk
              </span>
              <span className="text-emerald-400 font-bold">(Blind Carbon Copy: completely hidden!)</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 flex items-start gap-2.5 text-emerald-200 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Privacy Best Practice:</strong>
              When broadcasting emails to students or parents, always use <strong>Bcc</strong> to prevent recipient addresses from being leaked or harvested by spammers!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
