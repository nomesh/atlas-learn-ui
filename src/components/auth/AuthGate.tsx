import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock, LogIn, BookOpen, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Eye } from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import { ATLAS_MARK, NEURAL_WORKS_LOGO } from '../../brand/assets';

interface AuthGateProps {
  featureName?: string;
  description?: string;
}

export const AuthGate: React.FC<AuthGateProps> = ({
  featureName = 'ATLAS AI Tutor & Interactive Learning',
  description,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login, enableGuestPreview } = useStudent();
  const lang = i18n.language || 'en';

  const defaultDescription = {
    en: 'Sign in with your Student Account to access your personal AI Tutor, curriculum-grounded lessons, and national examination practice.',
    si: 'ඔබගේ පුද්ගලික AI ගුරුතුමා, විෂය නිර්දේශානුකූල පාඩම් සහ ජාතික විභාග පෙරහුරු ප්‍රශ්නාවලි සඳහා ඔබගේ ශිෂ්‍ය ගිණුමෙන් ප්‍රවේශ වන්න.',
    ta: 'உங்கள் பிரத்தியேக AI ஆசிரியர், பாடத்திட்டப் பாடங்கள் மற்றும் தேசிய பரீட்சைப் பயிற்சிகளைப் பெற உங்கள் மாணவர் கணக்கின் மூலம் உள்நுழையவும்.'
  };

  const featurePillars = [
    {
      icon: Sparkles,
      title: lang === 'si' ? 'පුද්ගලික AI ගුරුතුමා' : lang === 'ta' ? 'பிரத்தியேக AI ஆசிரியர்' : 'Personalized AI Tutor',
      desc: lang === 'si' ? 'ශ්‍රී ලංකා විෂය නිර්දේශයට අනුකූලව 6-13 ශ්‍රේණි සඳහා ඕනෑම වේලාවක මඟපෙන්වීම' : lang === 'ta' ? 'இலங்கை பாடத்திட்டத்திற்கு அமைய தரம் 6-13 வரையான சந்தேகங்களுக்கான தீர்வு' : '24/7 syllabus-grounded step-by-step guidance across all core subjects.'
    },
    {
      icon: BookOpen,
      title: lang === 'si' ? 'නිල පෙළපොත් පදනම' : lang === 'ta' ? 'உத்தியோகபூர்வ பாடநூல்கள்' : 'Official Curriculum Grounding',
      desc: lang === 'si' ? 'අධ්‍යාපන ප්‍රකාශන දෙපාර්තමේන්තුවේ නිල පෙළපොත් ඇසුරින් සකසන ලද කරුණු' : lang === 'ta' ? 'கல்வி வெளியீட்டுத் திணைக்களத்தின் அதிகாரப்பூர்வ பாடநூல் விளக்கங்கள்' : 'Every answer verified against Ministry of Education textbook chapters.'
    },
    {
      icon: CheckCircle2,
      title: lang === 'si' ? 'විභාග පෙරහුරුව සහ ලකුණු' : lang === 'ta' ? 'பரீட்சை வெற்றி & புள்ளிகள்' : 'G.C.E. O/L & A/L Exam Mastery',
      desc: lang === 'si' ? 'විභාග ලකුණු ලබාදීමේ පටිපාටියට අනුකූල නිවැරදි තාක්ෂණික පද සහ පිළිතුරු රටා' : lang === 'ta' ? 'தேசிய பரீட்சை மதிப்பீட்டுத் திட்டத்திற்கு ஏற்ப துல்லியமான விடைக் குறிப்புகள்' : 'Authentic past-paper marking schemes and high-yield scoring secrets.'
    },
    {
      icon: ShieldCheck,
      title: lang === 'si' ? 'වලාකුළු ප්‍රගති වාර්තාව' : lang === 'ta' ? 'கிளவுட் முன்னேற்ற பதிவு' : 'Persistent Cloud Progress',
      desc: lang === 'si' ? 'ඔබගේ පාඩම් ඉලක්ක, මතක තබාගැනීම් සහ ප්‍රගතිය සුරක්ෂිතව තබාගැනීම' : lang === 'ta' ? 'உங்கள் கற்றல் முன்னேற்றம் மற்றும் தொடர் நாட்களை பாதுகாப்பாக சேமித்தல்' : 'Sync your learning streak, topic mastery, and notes across all your devices.'
    }
  ];

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0ea5e9] p-6 sm:p-8 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={ATLAS_MARK}
                  alt="ATLAS"
                  className="w-10 h-10 object-contain rounded-xl bg-white/10 p-1 backdrop-blur-sm"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-400 rounded-full flex items-center justify-center border-2 border-[#0B192C]">
                  <Lock className="w-2.5 h-2.5 text-slate-900" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  <span>ATLAS Learn</span>
                  <span className="text-[10px] font-mono bg-cyan-400/20 text-cyan-200 border border-cyan-400/30 px-2 py-0.5 rounded-full">
                    Student Portal
                  </span>
                </h3>
                <p className="text-xs text-slate-300">Sri Lanka National EdTech Platform</p>
              </div>
            </div>

            <div className="hidden sm:block flex-shrink-0">
              <img
                src={NEURAL_WORKS_LOGO}
                alt="Neural Works"
                className="h-9 w-auto object-contain brightness-110"
              />
            </div>
          </div>

          <div className="mt-6 space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Student Authentication Required</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {featureName}
            </h2>
            <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed max-w-xl">
              {description || defaultDescription[lang as 'si' | 'ta' | 'en'] || defaultDescription.en}
            </p>
          </div>
        </div>

        {/* Value Proposition Highlights */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {featurePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center flex-shrink-0 text-cyan-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{pillar.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={login}
                className="w-full sm:flex-1 px-6 py-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 hover:from-slate-900 hover:to-slate-800 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <LogIn className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                <span>Sign In with Student Account</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/subjects')}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>Browse Subjects</span>
              </button>
            </div>

            {/* Guest Preview Option (for Evaluators / Testing) */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={enableGuestPreview}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium underline underline-offset-4 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Continue with Limited Guest Preview (Evaluation Mode)</span>
              </button>
              <p className="text-[10px] text-slate-400 mt-1">
                Note: In guest preview, chat history and topic mastery are temporary and not saved to cloud PostgreSQL.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GuestBanner: React.FC = () => {
  const { isAuthenticated, isGuestPreview, login } = useStudent();
  if (isAuthenticated || !isGuestPreview) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 border-b border-amber-300/40 px-3 py-1.5 flex items-center justify-between text-xs text-amber-900 animate-in fade-in">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping flex-shrink-0" />
        <span className="font-bold">Guest Preview Mode:</span>
        <span className="hidden sm:inline text-amber-800">
          Your learning progress and chat history are temporary and not saved to your student account.
        </span>
      </div>
      <button
        type="button"
        onClick={login}
        className="px-2.5 py-0.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs transition-colors flex-shrink-0"
      >
        <LogIn className="w-3 h-3 text-cyan-400" />
        <span>Sign In</span>
      </button>
    </div>
  );
};
