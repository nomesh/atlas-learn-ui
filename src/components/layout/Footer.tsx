import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Sparkles, ShieldCheck, BookOpen, Layers } from 'lucide-react';
import { NEURAL_WORKS_LOGO, ATLAS_MARK } from '../../brand/assets';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-slate-950 text-slate-400 border-t border-slate-800/80 transition-colors">
      {/* 1. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand & Platform Lockup (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <a 
                href="https://neural-works-ai.nomeshd.chatgpt.site/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block transition-opacity hover:opacity-90"
                title="Neural Works — Innovate, Transform, Automate"
              >
                <img
                  src={NEURAL_WORKS_LOGO}
                  alt="Neural Works — Innovate, Transform, Automate"
                  className="w-[260px] sm:w-[280px] lg:w-[300px] h-auto object-contain object-left brightness-110"
                />
              </a>
            </div>

            {/* Powered by Neural Works Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Powered by Neural Works Platform</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Turning enterprise knowledge, school syllabi, and educational resources into intelligent, 
              curriculum-grounded learning assistants and workflow automation.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <img src={ATLAS_MARK} alt="ATLAS" className="w-4 h-4 object-contain rounded" />
                <span className="font-semibold text-white">ATLAS Learn</span>
                <span className="text-slate-500">•</span>
                <span className="text-cyan-400 font-medium">Sri Lankan Edition</span>
              </div>
            </div>
          </div>

          {/* Column 2: Platform Ecosystem (Cols 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ecosystem</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://neural-works-ai.nomeshd.chatgpt.site/products/atlas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1 group"
                >
                  <span>ATLAS - Enterprise Knowledge</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://neural-works-ai.nomeshd.chatgpt.site/products/pilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1 group"
                >
                  <span>PILOT - Intelligent Model Router</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://neural-works-ai.nomeshd.chatgpt.site/services/workflow-automation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1 group"
                >
                  <span>Intelligent Automation</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://neural-works-ai.nomeshd.chatgpt.site/solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1 group"
                >
                  <span>Solutions Overview</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Services (Cols 7-8) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Services</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://neural-works-ai.nomeshd.chatgpt.site/services/ai-transformation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1 group"
                >
                  <span>AI Transformation</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://neural-works-ai.nomeshd.chatgpt.site/security"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1 group"
                >
                  <span>Security & Privacy</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://neural-works-ai.nomeshd.chatgpt.site/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1 group"
                >
                  <span>About Us</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://neural-works-ai.nomeshd.chatgpt.site/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1 group"
                >
                  <span>Talk to Us</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Student App (Cols 9-10) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>ATLAS Learn</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Student Home
                </Link>
              </li>
              <li>
                <Link to="/tutor" className="hover:text-white transition-colors">
                  ATLAS AI Tutor
                </Link>
              </li>
              <li>
                <Link to="/subjects" className="hover:text-white transition-colors">
                  Curriculum Subjects
                </Link>
              </li>
              <li>
                <Link to="/practice" className="hover:text-white transition-colors">
                  Exam Practice & Quizzes
                </Link>
              </li>
              <li>
                <Link to="/progress" className="hover:text-white transition-colors">
                  Mastery & Progress
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Educational Safety & Grounding (Cols 11-12) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Integrity</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 text-sm leading-none">•</span>
                <span>NIE National Syllabus</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 text-sm leading-none">•</span>
                <span>Curriculum-Grounded AI</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 text-sm leading-none">•</span>
                <span>Tenant & Student Isolation</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 text-sm leading-none">•</span>
                <span>English • සිංහල • தமிழ்</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 2. Platform Architecture Callout Bar */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Architecture:</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
              Spring AI + PgVector
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
              Multi-Tenant OIDC
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 hidden md:inline-block">
              RAG Strict Grounding
            </span>
          </div>

          <div className="text-right text-[11px] text-slate-400">
            A product of <a href="https://neural-works-ai.nomeshd.chatgpt.site/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white underline font-semibold">Neural Works</a> AI Transformation Lab
          </div>
        </div>

        {/* 3. Sub-footer / Copyright Bar */}
        <div className="mt-6 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 pb-20 md:pb-0">
          <p>
            © 2026 Neural Works. <span className="text-slate-400 tracking-wider">INNOVATE • TRANSFORM • AUTOMATE</span>
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a
              href="https://neural-works-ai.nomeshd.chatgpt.site/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-slate-800">•</span>
            <a
              href="https://neural-works-ai.nomeshd.chatgpt.site/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Use
            </a>
            <span className="text-slate-800">•</span>
            <a
              href="https://neural-works-ai.nomeshd.chatgpt.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1 font-medium text-slate-400"
            >
              <span>neural-works.ai</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
