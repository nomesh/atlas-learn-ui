import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Send, 
  Mic, 
  Camera, 
  Paperclip, 
  RotateCcw, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  Info,
  CheckCircle,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { useStudent } from '../../state/studentContext';
import { TutorAvatar } from '../avatar/TutorAvatar';
import { CitationDrawer } from './CitationDrawer';
import { RichContentRenderer } from './RichContentRenderer';
import { tutorService } from '../../api/tutorApi';
import { setTutorLeaseToken } from '../../api/client';
import {
  acquireTutorLease,
  sendTutorHeartbeat,
  releaseTutorLease,
  getOrCreateDeviceId,
  getDeviceFriendlyName,
  type TutorLeaseResponse,
} from '../../api/authApi';
import type { ChatMessage, SourceCitation, TutorAction } from '../../types';

export const TutorPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { 
    studentName, 
    grade, 
    language, 
    learningContext, 
    tutorState, 
    setTutorState,
    isAuthenticated,
    login,
  } = useStudent();

  const [inputMessage, setInputMessage] = useState('');
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [isMockMode, setIsMockMode] = useState(() => tutorService.isMockMode());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Lease concurrency state
  const [leaseToken, setLeaseToken] = useState<string | null>(null);
  const [conflictData, setConflictData] = useState<TutorLeaseResponse | null>(null);
  const [isSuperseded, setIsSuperseded] = useState(false);
  const leaseTokenRef = useRef<string | null>(null);
  leaseTokenRef.current = leaseToken;

  // Guards against React StrictMode double-invocation and in-flight race conditions
  const processedQueryRef = useRef<string | null>(null);
  const isSendingRef = useRef<boolean>(false);
  const messageCounterRef = useRef<number>(0);

  const generateMsgId = (role: string) => {
    messageCounterRef.current += 1;
    return `msg-${Date.now()}-${messageCounterRef.current}-${Math.random().toString(36).substring(2, 7)}-${role}`;
  };

  const starterTopicPills: TutorAction[] = language === 'si' ? [
    { id: 'start-pythagoras', label: 'ගණිතය: පයිතගරස් ප්‍රමේයය', prompt: 'පයිතගරස් ප්‍රමේයයේ මූලික අදහස් පැහැදිලි කරන්න' },
    { id: 'start-photo', label: 'විද්‍යාව: ප්‍රභාසංස්ලේෂණය', prompt: 'ප්‍රභාසංස්ලේෂණය ක්‍රියාවලිය පැහැදිලි කරන්න' },
    { id: 'start-hydraulics', label: 'ඉතිහාසය: පුරාණ වාරි ශිෂ්ටාචාරය', prompt: 'ශ්‍රී ලංකාවේ පුරාණ වාරි ශිෂ්ටාචාරය ගැන කියාදෙන්න' },
    { id: 'start-networks', label: 'තොරතුරු තාක්ෂණය: පරිගණක ජාල', prompt: 'පරිගණක ජාල පිළිබඳ මූලික සංකල්ප පහදන්න' },
  ] : language === 'ta' ? [
    { id: 'start-pythagoras', label: 'கணிதம்: பைதகரசு தேற்றம்', prompt: 'பைதகரசு தேற்றத்தின் முக்கிய கருத்துக்களை விளக்குங்கள்' },
    { id: 'start-photo', label: 'அறிவியல்: ஒளித்தொகுப்பு', prompt: 'ஒளித்தொகுப்பு செயல்முறையை விளக்குங்கள்' },
    { id: 'start-hydraulics', label: 'வரலாறு: பண்டைய நீரியல் நாகரிகம்', prompt: 'இலங்கையின் பண்டைய நீரியல் நாகரிகம் பற்றி கற்பியுங்கள்' },
    { id: 'start-networks', label: 'தகவல் தொழில்நுட்பம்: கணினி வலையமைப்புகள்', prompt: 'கணினி வலையமைப்பின் அடிப்படைகளை விளக்குங்கள்' },
  ] : [
    { id: 'start-pythagoras', label: 'Maths: Pythagoras Theorem', prompt: 'Can you explain the main ideas of Pythagoras Theorem?' },
    { id: 'start-photo', label: 'Science: Photosynthesis', prompt: 'Explain the process of photosynthesis in plants' },
    { id: 'start-hydraulics', label: 'History: Hydraulic Civilization', prompt: 'Teach me about the ancient hydraulic civilization of Sri Lanka' },
    { id: 'start-networks', label: 'ICT: Computer Networks', prompt: 'Explain the fundamentals of computer networks' },
  ];


  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Initial friendly greeting message from Tutor
    return [
      {
        id: 'msg-init-1',
        role: 'tutor',
        content: language === 'si'
          ? `ආයුබෝවන් ${studentName}! මම ඔබගේ **ATLAS ගුරුතුමා**. 
ඔබගේ ${grade.replace('-', ' ')} විෂය නිර්දේශයේ පාඩම්, ගෙදර වැඩ හෝ විභාග ගැටළු ඕනෑම දෙයක් මා සමඟ සාකච්ඡා කළ හැක.

අද අපි කුමන පාඩමෙන් පටන් ගනිමුද?`
          : language === 'ta'
          ? `வணக்கம் ${studentName}! நான் உங்கள் **ATLAS ஆசிரியர்**. 
உங்கள் ${grade.replace('-', ' ')} பாடங்கள், வீட்டுப்பாடங்கள் அல்லது பரீட்சை சந்தேகங்கள் எதுவாக இருந்தாலும் என்னிடம் கேளுங்கள்.

நாம் இன்று எதிலிருந்து தொடங்கலாம்?`
          : `Ayubowan ${studentName}! I am your **ATLAS Tutor**. 
I'm here to help you learn and master your **${grade.replace('-', ' ').toUpperCase()}** subjects, solve homework questions, or prepare for exams.

What topic would you like to explore together today?`,
        timestamp: new Date().toISOString(),
        suggestedActions: starterTopicPills,
      },
    ];
  });

  // Handle URL query parameter prefill (e.g. from Home search or Practice redirect)
  useEffect(() => {
    const q = searchParams.get('q');
    if (q && q.trim() && processedQueryRef.current !== q.trim()) {
      const trimmedQ = q.trim();
      processedQueryRef.current = trimmedQ;

      // Clean 'q' from searchParams so re-renders or mounts do not re-trigger
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('q');
      setSearchParams(nextParams, { replace: true });

      handleSendMessage(trimmedQ);
    }
  }, [searchParams, setSearchParams]);

  // Ensure window stays at top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-scroll strictly inside conversation thread container (prevents window jumping)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, tutorState]);

  const tryAcquireLease = async (forceTakeover: boolean = false) => {
    if (!isAuthenticated) return;
    try {
      const devId = getOrCreateDeviceId();
      const devName = getDeviceFriendlyName();
      const res = await acquireTutorLease({
        deviceId: devId,
        deviceName: devName,
        forceTakeover,
      });

      if (res.status === 'GRANTED' && res.leaseToken) {
        setLeaseToken(res.leaseToken);
        setTutorLeaseToken(res.leaseToken);
        setConflictData(null);
        setIsSuperseded(false);
      } else if (res.status === 'CONFLICT') {
        setConflictData(res);
        setTutorLeaseToken(null);
      }
    } catch (err: unknown) {
      const axErr = err as { response?: { data?: TutorLeaseResponse; status?: number } };
      if (axErr.response?.data?.status === 'CONFLICT') {
        setConflictData(axErr.response.data);
        setTutorLeaseToken(null);
      }
    }
  };

  // Lease acquisition and periodic heartbeat
  useEffect(() => {
    tryAcquireLease(false);

    const interval = setInterval(async () => {
      const currentToken = leaseTokenRef.current;
      if (currentToken) {
        const ok = await sendTutorHeartbeat(currentToken);
        if (!ok) {
          setIsSuperseded(true);
          setLeaseToken(null);
          setTutorLeaseToken(null);
        }
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      const currentToken = leaseTokenRef.current;
      if (currentToken) {
        releaseTutorLease(currentToken);
        setTutorLeaseToken(null);
      }
    };
  }, [isAuthenticated]);


  const handleSendMessage = async (textToSend?: string) => {
    // Intercept sign-in action
    if (textToSend === '__SIGN_IN__') {
      login();
      return;
    }

    // Intercept switch-to-mock action
    if (textToSend === '__SWITCH_TO_MOCK__') {
      tutorService.setMockMode(true);
      setIsMockMode(true);
      const studentMsgs = messages.filter((m) => m.role === 'student');
      const questionToRetry = studentMsgs.length > 0 ? studentMsgs[studentMsgs.length - 1].content : 'Can you explain the main ideas of Pythagoras Theorem?';
      // Remove previous error message if present to give a clean retry experience
      setMessages((prev) => prev.filter((m) => !m.id.includes('-err')));
      handleSendMessage(questionToRetry);
      return;
    }

    if (isSuperseded) {
      return;
    }

    const text = (textToSend || inputMessage).trim();
    if (!text || isSendingRef.current) return;

    isSendingRef.current = true;

    const studentMsg: ChatMessage = {
      id: generateMsgId('student'),
      role: 'student',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, studentMsg]);
    setInputMessage('');
    setTutorState('thinking');

    try {
      const response = await tutorService.askTutor(text, learningContext);

      // Determine emotional reaction based on student question
      let nextState: 'speaking' | 'celebrating' | 'encouraging' = 'speaking';
      const lower = text.toLowerCase();
      if (lower.includes('correct') || lower.includes('thank') || lower.includes('understood') || lower.includes('got it')) {
        nextState = 'celebrating';
      } else if (lower.includes('easier') || lower.includes('hard') || lower.includes('confused') || lower.includes('again')) {
        nextState = 'encouraging';
      }

      setTutorState(nextState);

      // Resolve topic-sensitive suggested action pills
      let actionPills: TutorAction[] = starterTopicPills;
      if (response.suggestedFollowUps && response.suggestedFollowUps.length > 0) {
        actionPills = response.suggestedFollowUps.map((item, idx) => {
          if (typeof item === 'string') {
            return {
              id: `followup-${idx}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              label: item,
              prompt: item,
            };
          }
          return item;
        });
      }

      const tutorMsg: ChatMessage = {
        id: generateMsgId('tutor'),
        role: 'tutor',
        content: response.answer,
        timestamp: new Date().toISOString(),
        citations: response.sources,
        suggestedActions: actionPills,
        tutorState: nextState,
      };

      setMessages((prev) => [...prev, tutorMsg]);

      // Return to idle after speech finishes
      setTimeout(() => {
        setTutorState('idle');
      }, 4000);
    } catch (err: unknown) {
      console.error('[Tutor Error]:', err);
      setTutorState('encouraging');

      let errorText = language === 'si'
        ? 'සමාවන්න, සන්නිවේදන දෝෂයක් සිදුවිය. කරුණාකර නැවත උත්සාහ කරන්න.'
        : language === 'ta'
        ? 'மன்னிக்கவும், இணைப்புப் பிழை ஏற்பட்டது. சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.'
        : 'I encountered a brief connection issue. Let us try that again in a moment.';

      const axiosErr = err as { response?: { status?: number; data?: { error?: string; message?: string } } };
      const status = axiosErr?.response?.status;
      let errorActions: TutorAction[] | undefined = undefined;

      if (status === 409) {
        const errorData = axiosErr?.response?.data;
        setIsSuperseded(true);
        setLeaseToken(null);
        setTutorLeaseToken(null);
        tryAcquireLease(false);

        errorText = language === 'si'
          ? 'තවත් උපකරණයක මෙම ඉගෙනුම් සැසිය ක්‍රියාත්මකයි (409 Conflict). මෙම උපකරණයට සැසිය මාරු කිරීමට කරුණාකර තහවුරු කරන්න.'
          : language === 'ta'
          ? 'வேறொரு சாதனத்தில் இந்த அமர்வு செயலில் உள்ளது (409 Conflict). இந்த சாதனத்திற்கு மாற்ற உறுதிப்படுத்தவும்.'
          : (errorData?.message || 'Another device is currently using this tutor session (409 Conflict). Please take over the session to continue.');
      } else if (status === 401) {
        errorText = language === 'si'
          ? 'සත්‍යාපනය අවශ්‍යයි (401 Unauthorized). සේවාදායකයට වලංගු Bearer Token එකක් හෝ සක්‍රිය Session එකක් අවශ්‍යයි.'
          : language === 'ta'
          ? 'அங்கீகாரம் தேவைப்படுகிறது (401 Unauthorized). தயவுசெய்து சரியான Session அல்லது Bearer Token உள்ளிடவும்.'
          : 'Authentication required (401 Unauthorized). The ATLAS backend requires an active authenticated session or Bearer token. Please sign in or configure your authentication token.';

        errorActions = [
          {
            id: `sign-in-${Date.now()}`,
            label: '🔑 Sign In with Student Account',
            prompt: '__SIGN_IN__',
          },
          {
            id: `switch-to-mock-${Date.now()}`,
            label: language === 'si'
              ? '⚡ නිරූපණ මාදිලියට මාරුවන්න (Demo Mode)'
              : language === 'ta'
              ? '⚡ மாதிரி முறைக்கு மாறவும் (Demo Mode)'
              : '⚡ Switch to Demo / Offline Mode',
            prompt: '__SWITCH_TO_MOCK__',
          },
          {
            id: `retry-401-${Date.now()}`,
            label: language === 'si'
              ? 'නැවත උත්සාහ කරන්න'
              : language === 'ta'
              ? 'மீண்டும் முயற்சிக்கவும்'
              : 'Retry Question',
            prompt: text,
          },
        ];
      } else if (status === 403) {
        errorText = language === 'si'
          ? 'ප්‍රවේශය ප්‍රතික්ෂේප විය (403 Forbidden). ඔබට මෙම ආයතනයට හෝ විෂය කරුණුවලට ප්‍රවේශ වීමට අවසර නැත.'
          : language === 'ta'
          ? 'அனுமதி மறுக்கப்பட்டது (403 Forbidden). இந்த உள்ளடக்கத்தை அணுக உங்களுக்கு அனுமதி இல்லை.'
          : 'Access denied (403 Forbidden). You do not have permission to access this learning tenant or resource.';
      } else {
        errorActions = [
          {
            id: 'retry-gen',
            label: language === 'si' ? 'නැවත උත්සාහ කරන්න' : language === 'ta' ? 'மீண்டும் முயற்சிக்கவும்' : 'Retry Question',
            prompt: text,
          },
        ];
      }

      const errorMsg: ChatMessage = {
        id: generateMsgId('err'),
        role: 'tutor',
        content: errorText,
        timestamp: new Date().toISOString(),
        suggestedActions: errorActions,
      };
      setMessages((prev) => [...prev, errorMsg]);

      setTimeout(() => setTutorState('idle'), 3000);
    } finally {
      isSendingRef.current = false;
    }
  };

  const handleClearConversation = async () => {
    setMessages([
      {
        id: generateMsgId('reset'),
        role: 'tutor',
        content: language === 'si'
          ? `සංවාදය නැවත ආරම්භ කරන ලදී. ${studentName}, ඔබට ඊළඟට ඉගෙන ගැනීමට අවශ්‍ය කුමක්ද?`
          : language === 'ta'
          ? `உரையாடல் மீண்டும் தொடங்கப்பட்டது. ${studentName}, அடுத்து என்ன படிக்க விரும்புகிறீர்கள்?`
          : `Conversation restarted. What would you like to learn next, ${studentName}?`,
        timestamp: new Date().toISOString(),
        suggestedActions: starterTopicPills,
      },
    ]);
    setTutorState('idle');
    try {
      await tutorService.clearConversation(learningContext.conversationId);
    } catch (err) {
      console.warn('[TutorPage] Error clearing remote conversation:', err);
    }
  };

  const handleSimulatedMic = () => {
    setIsListeningMic(!isListeningMic);
    if (!isListeningMic) {
      setTutorState('listening');
      // Prototype demonstration of speech capture
      setTimeout(() => {
        setInputMessage('Explain photosynthesis in simple terms');
        setIsListeningMic(false);
        setTutorState('idle');
      }, 2200);
    } else {
      setTutorState('idle');
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 max-w-4xl w-full mx-auto bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
      {/* 1. Tutor Header Bar */}
      <div className="px-3.5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-slate-900 via-atlas-navy to-atlas-deep text-white flex items-center justify-between flex-shrink-0 gap-2 min-h-[58px]">
        <div className="flex items-center gap-2.5 min-w-0">
          <TutorAvatar state={tutorState} size="sm" className="pt-0.5" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-1">
                <span>ATLAS Tutor</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 flex-shrink-0" />
              </h2>
              <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 uppercase tracking-tight truncate">
                {t(`tutor.status.${tutorState}`)}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-cyan-100/80 truncate">
              {grade.replace('-', ' ').toUpperCase()} • Sri Lankan Syllabus
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Mode Switcher Badge (Demo vs Live) */}
          <button
            type="button"
            onClick={() => {
              const next = !isMockMode;
              tutorService.setMockMode(next);
              setIsMockMode(next);
            }}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1.5 ${
              isMockMode
                ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 hover:bg-amber-400/30'
                : 'bg-emerald-400/20 text-emerald-200 border border-emerald-400/40 hover:bg-emerald-400/30'
            }`}
            title={
              isMockMode
                ? 'Running in Offline Demo Mode. Click to switch to Live Backend.'
                : 'Connected to Live Backend API. Click to switch to Offline Demo Mode.'
            }
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isMockMode ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
              }`}
            />
            <span>{isMockMode ? 'Demo Mode' : 'Live API'}</span>
          </button>

          {/* Audio TTS toggle placeholder */}
          <button
            type="button"
            onClick={() => setIsAudioActive(!isAudioActive)}
            className={`p-2 rounded-xl text-xs transition-all ${
              isAudioActive
                ? 'bg-teal-500 text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
            title="Toggle Voice Explanations (Prototype Speech-to-Text)"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Clear chat */}
          <button
            type="button"
            onClick={handleClearConversation}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-all text-xs"
            title="Start New Topic / Clear History"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Multi-Turn Conversation Thread */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 bg-[#F8FAFC]"
      >
        {messages.map((msg) => {
          const isStudent = msg.role === 'student';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                isStudent ? 'flex-row-reverse' : 'flex-row'
              } animate-in fade-in duration-200`}
            >
              {/* Avatar indicator */}
              {!isStudent ? (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-cyan-400/50 shadow-sm flex-shrink-0 mt-1 bg-slate-900 ring-2 ring-cyan-500/20">
                  <img
                    src="/assets/tutor-avatar-icon.jpg"
                    alt="ATLAS Tutor"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-atlas-blue flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm mt-1 ring-2 ring-blue-500/20">
                  {studentName.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Message Box */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-3xl p-4 sm:p-5 shadow-sm transition-all ${
                  isStudent
                    ? 'bg-slate-900 text-white rounded-tr-sm'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-sm shadow-soft'
                }`}
              >
                {/* Message Content */}
                {isStudent ? (
                  <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                ) : (
                  <div>
                    <RichContentRenderer content={msg.content} />

                    {/* Child-Friendly Citation Drawer */}
                    {msg.citations && msg.citations.length > 0 && (
                      <CitationDrawer citations={msg.citations} />
                    )}

                    {/* Suggested Follow-Up Actions */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <div className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                          Suggested Questions:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.suggestedActions.map((action) => (
                            <button
                              key={action.id}
                              type="button"
                              onClick={() => handleSendMessage(action.prompt)}
                              className="px-3 py-1.5 bg-slate-50 hover:bg-cyan-50 hover:text-atlas-navy hover:border-cyan-300 border border-slate-200 rounded-full text-xs font-semibold text-slate-700 transition-all text-left"
                            >
                              {typeof action.label === 'string'
                                ? action.label
                                : action.label[language]}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Thinking / Streaming Indicator */}
        {tutorState === 'thinking' && (
          <div className="flex items-start gap-3 animate-in fade-in">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-cyan-400/50 shadow-sm flex-shrink-0 mt-1 bg-slate-900 relative ring-2 ring-cyan-500/20">
              <img
                src="/assets/tutor-avatar-icon.jpg"
                alt="ATLAS Tutor"
                className="w-full h-full object-cover"
              />
              <span className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-75 pointer-events-none" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-atlas-cyan animate-ping" />
                <span>{t('tutor.typingIndicator')}</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Input & Attachment Tool Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex-shrink-0">
        <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-atlas-cyan/40 focus-within:border-atlas-cyan focus-within:bg-white transition-all">
          {/* Action Placeholders: Mic, Camera, Attachment */}
          <div className="flex items-center gap-1 pb-1 pl-1 text-slate-400">
            {/* Mic / Voice Input Placeholder */}
            <button
              type="button"
              onClick={handleSimulatedMic}
              className={`p-2 rounded-xl transition-all ${
                isListeningMic
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'hover:text-slate-600 hover:bg-slate-200/60'
              }`}
              title={t('tutor.voiceInput')}
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Homework Photo Upload Placeholder */}
            <button
              type="button"
              onClick={() => {
                alert('Camera Homework Scanner (Prototype feature placeholder: will support uploading textbook exercises and diagram questions).');
              }}
              className="p-2 rounded-xl hover:text-slate-600 hover:bg-slate-200/60 transition-all hidden sm:flex"
              title={t('tutor.cameraInput')}
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Document Note Attachment Placeholder */}
            <button
              type="button"
              onClick={() => {
                alert('Curriculum Note Attachment (Prototype feature placeholder).');
              }}
              className="p-2 rounded-xl hover:text-slate-600 hover:bg-slate-200/60 transition-all hidden sm:flex"
              title={t('tutor.attachFile')}
            >
              <Paperclip className="w-4 h-4" />
            </button>
          </div>

          {/* Multiline Message Textarea */}
          <textarea
            ref={inputRef}
            rows={1}
            value={inputMessage}
            disabled={isSuperseded}
            onChange={(e) => {
              setInputMessage(e.target.value);
              if (e.target.value.trim() && tutorState === 'idle') {
                setTutorState('listening');
              } else if (!e.target.value.trim() && tutorState === 'listening') {
                setTutorState('idle');
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={
              isSuperseded
                ? (language === 'si'
                    ? 'මෙම සැසිය වෙනත් උපකරණයකට මාරු කර ඇත. නැවත සම්බන්ධ වීමට Reconnect ක්ලික් කරන්න.'
                    : language === 'ta'
                    ? 'அமர்வு வேறொரு சாதனத்திற்கு மாற்றப்பட்டுள்ளது. மீண்டும் இணைய Reconnect என்பதை கிளிக் செய்யவும்.'
                    : 'Session active on another device. Click Reconnect to resume.')
                : t('tutor.inputPlaceholder')
            }
            className={`flex-1 bg-transparent py-2.5 px-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none max-h-32 ${
              isSuperseded ? 'cursor-not-allowed opacity-60' : ''
            }`}
          />

          {/* Submit Button */}
          <button
            type="button"
            disabled={isSuperseded || !inputMessage.trim()}
            onClick={() => handleSendMessage()}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
              !isSuperseded && inputMessage.trim()
                ? 'bg-gradient-to-r from-atlas-deep to-atlas-blue text-white shadow-md hover:from-slate-900 hover:to-atlas-deep'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            title={isSuperseded ? 'Session transferred to another device' : t('tutor.send')}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-2 text-center">
          <span className="text-[10px] text-slate-400">
            {t('tutor.disclaimer')}
          </span>
        </div>
      </div>

      {/* Concurrency Takeover Modal */}
      {conflictData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Active Tutor Session</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Another device (<strong>{conflictData.activeDeviceName || 'Registered Device'}</strong>) is currently running an active tutoring session.
                ATLAS Learn allows 1 active tutor session per learner.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => { window.location.href = '/'; }}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Return Home
              </button>
              <button
                type="button"
                onClick={() => tryAcquireLease(true)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all"
              >
                Take Over Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Transferred / Superseded Toast */}
      {isSuperseded && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4">
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <p className="text-xs text-slate-200 truncate">
                Tutor session transferred to another device or expired.
              </p>
            </div>
            <button
              type="button"
              onClick={() => tryAcquireLease(true)}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-colors flex-shrink-0"
            >
              Reconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
