import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Send, 
  Camera, 
  Paperclip, 
  RotateCcw, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  Info,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  PanelRightClose,
  PanelRightOpen,
  MessageSquare,
  Globe,
  X,
  User,
} from 'lucide-react';
import { CurriculumCompanionPane } from './CurriculumCompanionPane';
import { learnerInitial } from '../../state/learnerDisplay';
import { TutorTeachingHighlighter } from './TutorTeachingHighlighter';
import { MemoryTrickCard } from './MemoryTrickCard';
import { TutorMessageVisuals } from './SourceVisualCard';
import { useStudent } from '../../state/studentContext';
import { TutorAvatar } from '../avatar/TutorAvatar';
import { AtlasTutorTalkingStage } from '../avatar/AtlasTutorTalkingStage';
import { useTutorVoice } from '../../hooks/useTutorVoice';
import { CitationDrawer } from './CitationDrawer';
import { RichContentRenderer } from './RichContentRenderer';
import { tutorService } from '../../api/tutorApi';
import { MOCK_TOPICS, findTopicResilient } from '../../mocks/curriculumData';
import { fetchCurriculumTopics } from '../../api/curriculumApi';
import {
  findSubjectAvailability,
  findVerifiedTopic,
  isMockCurriculum,
  isSubjectMediumAvailable,
  isSubjectOtherMediumOnly,
  MEDIUM_UNAVAILABLE_TEXT,
  useCurriculumAvailability,
  useLiveTopics,
} from '../../curriculum/liveCurriculum';
import { CURRICULUM_UNAVAILABLE_TEXT } from '../../curriculum/CurriculumUnavailable';
import {
  buildInitialGreeting as buildMockGreeting,
  detectCurriculumContextFromMessage,
  getCurriculumStarterPills as getMockStarterPills,
  isMockNoticeMessage,
  MOCK_SIMULATED_VOICE_PROMPT,
  mockDefaultTopicForSubject,
} from './mockTutorContent';
import { buildLiveGreeting, buildRestartMessage, getLiveStarterPills } from './liveTutorContent';
import { VoiceInputButton } from './VoiceInputButton';
import { setTutorLeaseToken } from '../../api/client';
import { AuthGate, GuestBanner } from '../../components/auth/AuthGate';
import {
  acquireTutorLease,
  ensureTutorLease,
  sendTutorHeartbeat,
  releaseTutorLease,
  getOrCreateDeviceId,
  getDeviceFriendlyName,
  type TutorLeaseResponse,
  type EnsureTutorLeaseResult,
} from '../../api/authApi';
import { DeviceManagementModal } from '../account/DeviceManagementModal';
import type { ChatMessage, SourceCitation, TutorAction, Language, Topic } from '../../types';

// Prototype (MOCK-only) helpers live in ./mockTutorContent; re-exported for existing callers and tests.
export { detectCurriculumContextFromMessage };

/** Starter pills: MOCK demo pills, or (LIVE) generic prompts that claim no topic or chapter. */
export function getCurriculumStarterPills(subjectId?: string, topicId?: string, language: Language = 'en'): TutorAction[] {
  return isMockCurriculum() ? getMockStarterPills(subjectId, topicId, language) : getLiveStarterPills(language);
}

/** Opening message: MOCK demo greeting, or (LIVE) a greeting that lists no prototype chapters or topics. */
export function buildInitialGreeting(
  subjectId: string,
  topicId: string,
  language: Language,
  studentName: string,
  grade: string
): ChatMessage {
  return isMockCurriculum()
    ? buildMockGreeting(subjectId, topicId, language, studentName, grade)
    : buildLiveGreeting(subjectId, topicId, language, studentName, grade);
}

/**
 * Tab-local cache key for tutor messages scoped strictly by:
 * user + grade + subject + topic
 */
export const getTutorSessionStorageKey = (
  userId: string,
  grade: string,
  subjectId: string,
  topicId: string
): string => {
  return `atlas_messages_${userId || 'guest'}_${grade || 'grade-10'}_${subjectId || 'default'}_${topicId || 'default'}`;
};

export const loadTutorSessionMessages = (key: string): ChatMessage[] | null => {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? (parsed as ChatMessage[]) : null;
  } catch {
    return null;
  }
};

export const saveTutorSessionMessages = (key: string, msgs: ChatMessage[]): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(msgs));
  } catch {
    // quota exceeded — gracefully continue in-memory
  }
};

export const clearTutorSessionMessages = (key: string): void => {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // ignore
  }
};


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
    setCurriculumSubject,
    isAuthenticated,
    isGuestPreview,
    login,
    currentUser,
  } = useStudent();

  // LIVE: only API-verified topics (never the bundled prototype catalogue); MOCK: demo catalogue.
  const liveCurriculum = !isMockCurriculum();
  const liveSubjectHint = searchParams.get('subject') || learningContext.subjectId || undefined;
  const liveTopicsQuery = useLiveTopics(liveCurriculum ? liveSubjectHint : undefined, grade);
  const liveAvailability = useCurriculumAvailability(grade);
  const [curriculumTopics, setCurriculumTopics] = useState<Topic[]>(() => (liveCurriculum ? [] : MOCK_TOPICS));

  useEffect(() => {
    if (liveCurriculum) return;
    let isMounted = true;
    fetchCurriculumTopics(undefined, grade).then((remote) => {
      if (isMounted && remote && remote.length > 0) {
        const remoteIds = new Set(remote.map((r) => r.id.toLowerCase()));
        const combined = [...remote, ...MOCK_TOPICS.filter((m) => !remoteIds.has(m.id.toLowerCase()))];
        setCurriculumTopics(combined);
      }
    }).catch((err) => console.warn('[TutorPage] Curriculum fetch failed, using local fixtures:', err));
    return () => { isMounted = false; };
  }, [grade]);

  const paramSubject = searchParams.get('subject');
  const paramTopic = searchParams.get('topic');

  const topicsForResolution = liveCurriculum ? (liveTopicsQuery.data ?? []) : curriculumTopics;
  // Scoped topic resolution honoring URL subject first. LIVE accepts only an exact, API-verified topic id, so a
  // crafted ?topic= (or a stale stored topic) can never select prototype content or invented page ranges.
  const foundTopic = liveCurriculum
    ? findVerifiedTopic(topicsForResolution, paramTopic)
    : findTopicResilient(curriculumTopics, paramTopic, paramSubject || undefined, grade);
  // Authoritative subject resolution: URL query param is primary, then topic subject, then student context
  const activeSubjectId = paramSubject || (foundTopic?.subjectId) || learningContext.subjectId || 'science';
  const defaultTopicForSubject = (sub?: string) => {
    if (liveCurriculum) return undefined; // LIVE never invents a topic context
    return mockDefaultTopicForSubject(sub);
  };
  const activeTopicId = liveCurriculum
    ? (foundTopic?.id ?? findVerifiedTopic(topicsForResolution, learningContext.topicId)?.id)
    : (foundTopic && (!paramSubject || foundTopic.subjectId.toLowerCase() === paramSubject.toLowerCase()))
      ? foundTopic.id
      : (paramTopic || learningContext.topicId);
  const liveSubjectAvailability = findSubjectAvailability(liveAvailability.data, activeSubjectId);
  const isMediumAvail = isSubjectMediumAvailable(liveSubjectAvailability, language);
  const otherMediumOnly = isSubjectOtherMediumOnly(liveSubjectAvailability, language);
  const liveSubjectUnsupported = liveCurriculum && liveAvailability.isSuccess && !isMediumAvail;
  const companionTopicId = activeTopicId || defaultTopicForSubject(activeSubjectId);
  const effectiveTopicId = activeTopicId || companionTopicId || 'default';
  const userScope = currentUser?.id || 'guest';
  const activeSessionKey = getTutorSessionStorageKey(
    userScope,
    grade,
    activeSubjectId,
    effectiveTopicId
  );

  const [isCompanionOpen, setIsCompanionOpen] = useState(true);
  const [mobileView, setMobileView] = useState<'chat' | 'companion'>('chat');

  // Centralized Tutor Voice & Talking Character Stage
  const tutorVoice = useTutorVoice((st) => setTutorState(st));

  useEffect(() => {
    if (paramSubject || paramTopic) {
      setCurriculumSubject(activeSubjectId, activeTopicId);
    }
  }, [paramSubject, paramTopic, activeSubjectId, activeTopicId]);

  const [inputMessage, setInputMessage] = useState('');
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [isMockMode, setIsMockMode] = useState(() => tutorService.isMockMode());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedImage, setAttachedImage] = useState<{ file?: File; previewUrl: string; name: string } | null>(null);

  // File picker handler for textbook screenshots and homework photos
  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (PNG, JPG, JPEG, WebP).');
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setAttachedImage({ file, previewUrl, name: file.name });
    }
    if (e.target) e.target.value = '';
  };

  // Clipboard paste listener: Allows student to paste screenshots directly via Ctrl+V
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            const previewUrl = URL.createObjectURL(file);
            setAttachedImage({
              file,
              previewUrl,
              name: `Screenshot_${new Date().toLocaleTimeString().replace(/:/g, '-')}.png`,
            });
            e.preventDefault();
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Lease concurrency state
  const [leaseToken, setLeaseToken] = useState<string | null>(null);
  const [conflictData, setConflictData] = useState<TutorLeaseResponse | null>(null);
  const [isSuperseded, setIsSuperseded] = useState(false);
  const [deviceLimitNotice, setDeviceLimitNotice] = useState<{ message: string; maxDevices: number } | null>(null);
  const [deviceRevokedNotice, setDeviceRevokedNotice] = useState<string | null>(null);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const leaseTokenRef = useRef<string | null>(null);
  leaseTokenRef.current = leaseToken;

  // Guards against React StrictMode double-invocation and in-flight race conditions
  const handleToggleMsgLang = (msgId: string, targetLang: Language) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId) {
          return {
            ...msg,
            activeLang: targetLang,
          };
        }
        return msg;
      })
    );
  };

  const processedQueryRef = useRef<string | null>(null);
  const isSendingRef = useRef<boolean>(false);
  const messageCounterRef = useRef<number>(0);

  const generateMsgId = (role: string) => {
    messageCounterRef.current += 1;
    return `msg-${Date.now()}-${messageCounterRef.current}-${Math.random().toString(36).substring(2, 7)}-${role}`;
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const cached = loadTutorSessionMessages(activeSessionKey);
    if (cached && cached.length > 0) {
      return cached;
    }
    return [
      buildInitialGreeting(
        activeSubjectId,
        effectiveTopicId,
        language,
        studentName,
        grade
      ),
    ];
  });

  const currentSessionKeyRef = useRef<string>(activeSessionKey);
  const messagesRef = useRef<ChatMessage[]>(messages);
  messagesRef.current = messages;

  // R4: Scope tutor session state strictly to curriculum context (user + grade + subject + topic)
  useEffect(() => {
    const prevKey = currentSessionKeyRef.current;
    if (prevKey === activeSessionKey) {
      return;
    }

    // Persist outgoing messages into tab-local cache
    if (prevKey && messagesRef.current.length > 0) {
      saveTutorSessionMessages(prevKey, messagesRef.current);
    }

    currentSessionKeyRef.current = activeSessionKey;

    // Load incoming messages or initialize fresh greeting
    const cached = loadTutorSessionMessages(activeSessionKey);
    if (cached && cached.length > 0) {
      setMessages(cached);
    } else {
      const freshGreeting = buildInitialGreeting(
        activeSubjectId,
        effectiveTopicId,
        language,
        studentName,
        grade
      );
      setMessages([freshGreeting]);
      saveTutorSessionMessages(activeSessionKey, [freshGreeting]);
    }
    setTutorState('idle');
  }, [activeSessionKey, activeSubjectId, effectiveTopicId, language, studentName, grade, setTutorState]);

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
    if (chatContainerRef.current && typeof chatContainerRef.current.scrollTo === 'function') {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, tutorState]);

  // Derive visualizer hint from the most recent student message or question
  const activeModeHint = useMemo(() => {
    const lastStudentMsg = [...messages].reverse().find((m) => m.role === 'student');
    if (!lastStudentMsg) return undefined;
    return lastStudentMsg.content;
  }, [messages]);

  const syncLeaseState = useCallback(async (forceTakeover: boolean = false) => {
    if (!isAuthenticated) return null;
    const res = await ensureTutorLease(forceTakeover);
    if (res.status === 'GRANTED') {
      setLeaseToken(res.leaseToken);
      setConflictData(null);
      setIsSuperseded(false);
      setDeviceLimitNotice(null);
      setDeviceRevokedNotice(null);
      return res.leaseToken;
    } else if (res.status === 'CONFLICT') {
      setConflictData(res.conflictData);
      setLeaseToken(null);
      setIsSuperseded(true);
      return null;
    } else if (res.status === 'DEVICE_LIMIT_EXCEEDED') {
      // Invariant: MUST NOT set isSuperseded(true) and MUST NOT show false device takeover dialog
      setConflictData(null);
      setLeaseToken(null);
      setIsSuperseded(false);
      setDeviceLimitNotice({ message: res.message, maxDevices: res.maxDevices });
      return null;
    } else if (res.status === 'DEVICE_REVOKED') {
      // Invariant: MUST NOT set isSuperseded(true)
      setConflictData(null);
      setLeaseToken(null);
      setIsSuperseded(false);
      setDeviceRevokedNotice(res.message);
      return null;
    } else if (res.status === 'UNAUTHENTICATED') {
      setLeaseToken(null);
      return null;
    }
    return null;
  }, [isAuthenticated]);

  const tryAcquireLease = syncLeaseState;

  const handleSwitchToLive = useCallback(async () => {
    tutorService.setMockMode(false);
    setIsMockMode(false);
    // Clear any previous mock notices or error banners from chat
    setMessages((prev) => prev.filter((m) => !isMockNoticeMessage(m.content) && !m.id.includes('-err')));
    if (isAuthenticated) {
      await syncLeaseState(false);
    } else {
      login();
    }
  }, [isAuthenticated, login, syncLeaseState]);

  // Lease acquisition and periodic heartbeat
  useEffect(() => {
    if (!isMockMode && isAuthenticated) {
      syncLeaseState(false);
    }

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
  }, [isAuthenticated, isMockMode, syncLeaseState]);


  const handleSendMessage = async (textToSend?: string, isRetry: boolean = false) => {
    // Intercept sign-in action
    if (textToSend === '__SIGN_IN__') {
      login();
      return;
    }

    // Intercept manage devices action
    if (textToSend === '__MANAGE_DEVICES__') {
      setIsDeviceModalOpen(true);
      return;
    }

    // Intercept switch-to-mock action (forbidden in production)
    if (textToSend === '__SWITCH_TO_MOCK__') {
      if (import.meta.env.PROD) {
        console.warn('[TutorPage] Mock mode is strictly forbidden in production builds.');
        return;
      }
      tutorService.setMockMode(true);
      setIsMockMode(true);
      const studentMsgs = messages.filter((m) => m.role === 'student');
      const questionToRetry = studentMsgs.length > 0 ? studentMsgs[studentMsgs.length - 1].content : 'Can you explain the main ideas of Pythagoras Theorem?';
      // Remove previous error message if present to give a clean retry experience
      setMessages((prev) => prev.filter((m) => !m.id.includes('-err')));
      handleSendMessage(questionToRetry);
      return;
    }

    if (isSuperseded || liveSubjectUnsupported) {
      return;
    }

    const currentImg = attachedImage;
    if (currentImg) {
      setAttachedImage(null);
    }

    const text = (textToSend !== undefined ? textToSend : inputMessage).trim();
    if ((!text && !currentImg) || isSendingRef.current) return;

    // Defensive Lease Gate: Before dispatching live Tutor inference, ensure an active lease exists
    if (!tutorService.isMockMode()) {
      if (!isAuthenticated) {
        login();
        return;
      }
      let token = await syncLeaseState(false);
      if (!token) {
        // If conflict occurs when learner sends a message, attempt an immediate session takeover
        token = await syncLeaseState(true);
      }
      if (!token) {
        console.warn('[TutorPage] Aborting live message send: No active lease token.');
        if (deviceLimitNotice) {
          const limitMsg: ChatMessage = {
            id: `msg-limit-${Date.now()}`,
            role: 'tutor',
            content: language === 'si'
              ? `උපාංග සීමාව ඉක්මවා ඇත (උපරිම උපාංග ${deviceLimitNotice.maxDevices}). කරුණාකර උපාංග කළමනාකරණයෙන් පැරණි උපාංගයක් ඉවත් කරන්න.`
              : language === 'ta'
              ? `சாதன வரம்பு மீறப்பட்டது (அதிகபட்சம் ${deviceLimitNotice.maxDevices} சாதனங்கள்). தயவுசெய்து சாதனங்களை நிர்வகிக்கவும்.`
              : `Device limit exceeded (maximum ${deviceLimitNotice.maxDevices} active devices). Please manage your devices to remove an unused device.`,
            timestamp: new Date().toISOString(),
            suggestedActions: [
              {
                id: `manage-devices-${Date.now()}`,
                label: '📱 Manage Devices',
                prompt: '__MANAGE_DEVICES__',
              },
            ],
            tutorState: 'encouraging',
            activeLang: language,
          };
          setMessages((prev) => [...prev, limitMsg]);
        }
        return;
      }
    }

    isSendingRef.current = true;

    const studentMessageText = text || (language === 'si' ? 'කරුණාකර මෙම පෙළපොත් ප්‍රශ්නය හෝ රූප සටහන පියවරෙන් පියවර විසඳා පෙන්වන්න' : language === 'ta' ? 'தயவுசெய்து இந்த பாடநூல் வினா அல்லது வரைபடத்தை படிப்படியாக விளக்குக' : 'Please analyze and solve this textbook question/diagram step by step');

    // Context Authority & Session Immutability:
    // When the learner arrived from a known curriculum location (URL query params, learningContext,
    // or established active session), that curriculum context is authoritative and IMMUTABLE.
    // Keyword detection is strictly a fallback for context-free entry points (e.g. global search bar).
    const hasAuthoritativeContext = Boolean(
      paramSubject ||
      (paramTopic && foundTopic) ||
      (activeSubjectId && activeTopicId && activeTopicId !== 'default')
    );

    let targetSubjectId = activeSubjectId;
    let targetTopicId = activeTopicId || defaultTopicForSubject(targetSubjectId);

    // Keyword detection maps to prototype topic ids, so it is MOCK-only.
    if (!liveCurriculum && !hasAuthoritativeContext && (!activeTopicId || activeTopicId === 'default')) {
      const detected = detectCurriculumContextFromMessage(studentMessageText);
      if (detected) {
        targetSubjectId = detected.subjectId;
        targetTopicId = detected.topicId;
        setCurriculumSubject(detected.subjectId, detected.topicId);
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set('subject', detected.subjectId);
        nextParams.set('topic', detected.topicId);
        setSearchParams(nextParams, { replace: true });
      }
    }

    const studentMsg: ChatMessage = {
      id: generateMsgId('student'),
      role: 'student',
      content: studentMessageText,
      timestamp: new Date().toISOString(),
      imageUrl: currentImg?.previewUrl,
    };

    setMessages((prev) => {
      const next = [...prev, studentMsg];
      saveTutorSessionMessages(activeSessionKey, next);
      return next;
    });
    setInputMessage('');
    setTutorState('thinking');

    try {
      const response = await tutorService.askTutor(studentMessageText, {
        ...learningContext,
        productType: 'LEARN_CURRICULUM',
        grade: grade || learningContext.grade || 'grade-10',
        subjectId: targetSubjectId,
        topicId: targetTopicId,
        imageUrl: currentImg?.previewUrl,
      });

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
      let actionPills: TutorAction[] = getCurriculumStarterPills(targetSubjectId, targetTopicId, language);
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
        noTextbookEvidence: liveCurriculum && (response.grounding?.safeFailure === true || (response.sources?.length ?? 0) === 0),
        suggestedActions: actionPills,
        tutorState: nextState,
        languageVersions: response.languageVersions,
        activeLang: language,
        memoryTrick: response.memoryTrick,
        keyPoints: response.keyPoints,
        visuals: response.visuals,
      };

      setMessages((prev) => {
        const next = [...prev, tutorMsg];
        saveTutorSessionMessages(activeSessionKey, next);
        return next;
      });

      // Return to idle after speech finishes
      setTimeout(() => {
        setTutorState('idle');
      }, 4000);
    } catch (err: unknown) {
      console.error('[Tutor Error]:', err);
      setTutorState('encouraging');

      const isTimeout =
        (err as Error)?.message?.toLowerCase().includes('timeout') ||
        (err as { code?: string })?.code === 'ECONNABORTED';

      let errorText = language === 'si'
        ? (isTimeout
            ? 'AI ගුරුතුමා ගැඹුරු පාඩම් සටහන පිළියෙල කරමින් සිටියදී කාල සීමාව ඉක්මවා ගියේය. කරුණාකර නැවත උත්සාහ කරන්න.'
            : 'සමාවන්න, සන්නිවේදන දෝෂයක් සිදුවිය. කරුණාකර නැවත උත්සාහ කරන්න.')
        : language === 'ta'
        ? (isTimeout
            ? 'AI ஆசிரியர் விரிவான பாடக் குறிப்பைத் தயாரிக்கும் போது நேரம் முடிந்தது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.'
            : 'மன்னிக்கவும், இணைப்புப் பிழை ஏற்பட்டது. சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.')
        : (isTimeout
            ? 'The AI Tutor took a bit longer than expected to prepare detailed lesson notes. Please try asking again.'
            : 'I encountered a brief connection issue. Let us try that again in a moment.');

      const axiosErr = err as {
        response?: {
          status?: number;
          data?: {
            error?: string;
            message?: string;
            status?: string;
            activeDeviceName?: string;
          };
        };
      };
      const status = axiosErr?.response?.status;
      const errorCode = axiosErr?.response?.data?.error || axiosErr?.response?.data?.status;
      let errorActions: TutorAction[] | undefined = isTimeout
        ? [
            {
              id: `retry-${Date.now()}`,
              label: language === 'si' ? '🔄 නැවත උත්සාහ කරන්න' : language === 'ta' ? '🔄 மீண்டும் முயற்சிக்க' : '🔄 Try Again',
              prompt: studentMessageText,
            },
          ]
        : undefined;

      if (status === 428 || errorCode === 'LEASE_REQUIRED') {
        // HTTP 428 Precondition Required: Tutor lease required
        // Invariant: MUST NOT set isSuperseded(true) and MUST NOT show false device takeover dialog/toast
        if (!isRetry) {
          console.info('[TutorPage] Lease required (428). Attempting automatic lease acquisition and retry...');
          const reacquiredToken = await syncLeaseState(false);
          if (reacquiredToken) {
            isSendingRef.current = false;
            return handleSendMessage(studentMessageText, true);
          }
        }
        errorText = language === 'si'
          ? 'සැසිය සක්‍රිය කිරීම අවශ්‍යයි (428 Precondition Required). කරුණාකර නැවත උත්සාහ කරන්න.'
          : language === 'ta'
          ? 'அமர்வைச் செயல்படுத்த வேண்டும் (428 Precondition Required). மீண்டும் முயற்சிக்கவும்.'
          : 'A tutor session lease is required. Please reconnect or try again.';
        errorActions = [
          {
            id: `retry-lease-${Date.now()}`,
            label: language === 'si' ? 'නැවත උත්සාහ කරන්න' : language === 'ta' ? 'மீண்டும் முயற்சிக்கவும்' : 'Retry Question',
            prompt: studentMessageText,
          },
        ];
      } else if (
        status === 409 &&
        (errorCode === 'CONFLICT' ||
         errorCode === 'DEVICE_CONFLICT' ||
         errorCode === 'LEASE_SUPERSEDED' ||
         errorCode === 'LEASE_EXPIRED' ||
         !errorCode)
      ) {
        const errorData = axiosErr?.response?.data;
        setIsSuperseded(true);
        setLeaseToken(null);
        setTutorLeaseToken(null);
        if (errorData) {
          setConflictData({
            status: 'CONFLICT',
            leaseToken: null,
            expiresAt: null,
            activeDeviceName: errorData.activeDeviceName || null,
            message: errorData.message || 'Another device is currently using this tutor session.',
          });
        }
        tryAcquireLease(false);

        errorText = language === 'si'
          ? 'තවත් උපකරණයක මෙම ඉගෙනුම් සැසිය ක්‍රියාත්මකයි (409 Conflict). මෙම උපකරණයට සැසිය මාරු කිරීමට කරුණාකර තහවුරු කරන්න.'
          : language === 'ta'
          ? 'வேறொரு சாதனத்தில் இந்த அமர்வு செயலில் உள்ளது (409 Conflict). இந்த சாதனத்திற்கு மாற்ற உறுதிப்படுத்தவும்.'
          : (errorData?.message || 'Another device is currently using this tutor session (409 Conflict). Please take over the session to continue.');
      } else if (status === 403 && (errorCode === 'DEVICE_LIMIT_EXCEEDED' || errorCode === 'DEVICE_LIMIT')) {
        setIsSuperseded(false);
        const maxDev = (axiosErr?.response?.data as { maxDevices?: number })?.maxDevices || 2;
        setDeviceLimitNotice({
          message: axiosErr?.response?.data?.message || 'Maximum registered devices limit reached.',
          maxDevices: maxDev,
        });
        errorText = language === 'si'
          ? `උපාංග සීමාව ඉක්මවා ඇත (උපරිම උපාංග ${maxDev}). කරුණාකර උපාංග කළමනාකරණයෙන් පැරණි උපාංගයක් ඉවත් කරන්න.`
          : language === 'ta'
          ? `சாதன வரம்பு மீறப்பட்டது (அதிகபட்சம் ${maxDev} சாதனங்கள்). சாதனங்களை நிர்வகித்து பழைய சாதனத்தை நீக்கவும்.`
          : `Device limit exceeded (maximum ${maxDev} active devices). Please manage your devices to remove an unused device.`;
        errorActions = [
          {
            id: `manage-devices-${Date.now()}`,
            label: '📱 Manage Devices',
            prompt: '__MANAGE_DEVICES__',
          },
        ];
      } else if (status === 403 && (errorCode === 'REVOKED' || errorCode === 'DEVICE_REVOKED')) {
        setIsSuperseded(false);
        setDeviceRevokedNotice(axiosErr?.response?.data?.message || 'This device has been revoked.');
        errorText = language === 'si'
          ? 'මෙම උපකරණය ඉවත් කර ඇත. කරුණාකර නැවත පිවිසෙන්න.'
          : language === 'ta'
          ? 'இந்த சாதனம் நீக்கப்பட்டுள்ளது. தயவுசெய்து மீண்டும் உள்நுழையவும்.'
          : 'This device registration has been revoked. Please sign in again or manage devices.';
        errorActions = [
          {
            id: `manage-devices-${Date.now()}`,
            label: '📱 Manage Devices',
            prompt: '__MANAGE_DEVICES__',
          },
        ];
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
      setMessages((prev) => {
        const next = [...prev, errorMsg];
        saveTutorSessionMessages(activeSessionKey, next);
        return next;
      });

      setTimeout(() => setTutorState('idle'), 3000);
    } finally {
      isSendingRef.current = false;
    }
  };

  const handleClearConversation = async () => {
    const resetMsg: ChatMessage = {
      id: generateMsgId('reset'),
      role: 'tutor',
      content: buildRestartMessage(language, studentName),
      timestamp: new Date().toISOString(),
      suggestedActions: getCurriculumStarterPills(activeSubjectId, effectiveTopicId, language),
    };
    clearTutorSessionMessages(activeSessionKey);
    saveTutorSessionMessages(activeSessionKey, [resetMsg]);
    setMessages([resetMsg]);
    setTutorState('idle');
    try {
      await tutorService.clearConversation(learningContext.conversationId, {
        grade,
        subject: activeSubjectId,
        topicId: effectiveTopicId,
      });
    } catch (err) {
      console.warn('[TutorPage] Error clearing remote conversation:', err);
    }
  };

  // Speech recognition is not implemented: the Pages demo simulates a capture with a scripted prompt; LIVE
  // never inserts text the learner did not type (the microphone is disabled there, see below).
  const handleSimulatedMic = () => {
    if (liveCurriculum) return;
    setIsListeningMic(!isListeningMic);
    if (!isListeningMic) {
      setTutorState('listening');
      // Prototype demonstration of speech capture
      setTimeout(() => {
        setInputMessage(MOCK_SIMULATED_VOICE_PROMPT);
        setIsListeningMic(false);
        setTutorState('idle');
      }, 2200);
    } else {
      setTutorState('idle');
    }
  };

  if (!isAuthenticated) {
    return <AuthGate featureName="ATLAS AI Tutor & Curriculum Companion" />;
  }

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 w-full max-w-none 2xl:max-w-[2400px] mx-auto space-y-3">
      {/* Guest Evaluation Banner */}
      <GuestBanner />

      {/* Mobile / Tablet Tab Switcher */}
      <div className="flex lg:hidden items-center justify-center p-1 bg-slate-200/80 rounded-2xl w-full max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setMobileView('chat')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            mobileView === 'chat'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>AI Tutor Chat</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileView('companion')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            mobileView === 'companion'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
          <span>Lesson Notes & Visualizer</span>
        </button>
      </div>

      {/* Main Dual-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0 items-stretch">
        {/* Left / Center: Main Chat Conversation Card */}
        <div
          className={`flex flex-col h-full min-h-0 bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden transition-all duration-300 ${
            mobileView === 'companion' ? 'hidden lg:flex' : 'flex'
          } ${isCompanionOpen ? 'lg:col-span-7 xl:col-span-7' : 'lg:col-span-12'}`}
        >
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
          {/* Mode Switcher Badge (Demo vs Live) - Hidden in Production (Finding 6) */}
          {!import.meta.env.PROD && (
            <button
              type="button"
              onClick={async () => {
                const next = !isMockMode;
                if (!next) {
                  await handleSwitchToLive();
                } else {
                  tutorService.setMockMode(true);
                  setIsMockMode(true);
                }
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
          )}

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

          {/* Desktop Companion Pane Toggle */}
          <button
            type="button"
            onClick={() => setIsCompanionOpen(!isCompanionOpen)}
            className={`hidden lg:flex p-2 rounded-xl text-xs transition-all ${
              isCompanionOpen
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
            title={isCompanionOpen ? 'Collapse Lesson Notes Pane' : 'Expand Lesson Notes Pane'}
          >
            {isCompanionOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Prominent Mock Mode Warning Banner - Only outside production (Finding 6) */}
      {!import.meta.env.PROD && isMockMode && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between gap-3 text-amber-800 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping flex-shrink-0" />
            <span>⚠️ MOCK TUTOR MODE — BACKEND BYPASSED (Responses generated from local offline fixtures)</span>
          </div>
          <button
            type="button"
            onClick={handleSwitchToLive}
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white text-[11px] rounded-lg transition-colors flex-shrink-0 font-bold"
          >
            Switch to Live Backend
          </button>
        </div>
      )}

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
                  {learnerInitial(studentName) ?? <User className="w-4 h-4" aria-hidden="true" />}
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
                  <div>
                    {msg.imageUrl && (
                      <div className="rounded-2xl overflow-hidden border border-white/20 max-w-xs shadow-md bg-slate-800/80 mb-2.5 p-1">
                        <img
                          src={msg.imageUrl}
                          alt="Textbook question"
                          className="w-full h-auto max-h-56 object-contain rounded-xl"
                        />
                      </div>
                    )}
                    <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* Trilingual Answer Switcher & Voice Audio Action */}
                    {(() => {
                      const currentMsgLang = msg.activeLang || language;
                      const activeContent = (msg.languageVersions && msg.languageVersions[currentMsgLang])
                        || (currentMsgLang === 'si' && msg.languageVersions?.si)
                        || (currentMsgLang === 'ta' && msg.languageVersions?.ta)
                        || msg.content;

                      return (
                        <>
                          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100 flex-wrap gap-2">
                            {msg.languageVersions && (msg.languageVersions.si || msg.languageVersions.ta) ? (
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                                <Globe className="w-3.5 h-3.5 text-cyan-600" />
                                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                                  <button
                                    type="button"
                                    onClick={() => handleToggleMsgLang(msg.id, 'en')}
                                    className={`px-2 py-0.5 rounded-lg text-xs font-semibold transition-all ${
                                      currentMsgLang === 'en'
                                        ? 'bg-white text-slate-900 shadow-sm font-bold'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                  >
                                    English
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleMsgLang(msg.id, 'si')}
                                    className={`px-2 py-0.5 rounded-lg text-xs font-semibold transition-all ${
                                      currentMsgLang === 'si'
                                        ? 'bg-white text-slate-900 shadow-sm font-bold'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                  >
                                    සිංහල
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleMsgLang(msg.id, 'ta')}
                                    className={`px-2 py-0.5 rounded-lg text-xs font-semibold transition-all ${
                                      currentMsgLang === 'ta'
                                        ? 'bg-white text-slate-900 shadow-sm font-bold'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                  >
                                    தமிழ்
                                  </button>
                                </div>
                              </div>
                            ) : <div />}

                            {/* Listen with Voice Button */}
                            <button
                              type="button"
                              onClick={() => {
                                const memoryTrickAudio = msg.memoryTrick ? (
                                  (currentMsgLang === 'si' && msg.memoryTrick.languageVersions?.si?.audioText) ||
                                  (currentMsgLang === 'ta' && msg.memoryTrick.languageVersions?.ta?.audioText) ||
                                  (currentMsgLang === 'en' && msg.memoryTrick.languageVersions?.en?.audioText) ||
                                  msg.memoryTrick.audioText
                                ) : null;

                                const conceptTitle = msg.memoryTrick ? (
                                  (currentMsgLang === 'si' && msg.memoryTrick.languageVersions?.si?.concept) ||
                                  (currentMsgLang === 'ta' && msg.memoryTrick.languageVersions?.ta?.concept) ||
                                  msg.memoryTrick.concept
                                ) : (
                                  currentMsgLang === 'si' ? 'ඇට්ලස් ටියුටර් පාඩම' : currentMsgLang === 'ta' ? 'அட்லஸ் ஆசிரியர் பாடம்' : 'Atlas Tutor Lesson Explanation'
                                );

                                const textToSpeak = memoryTrickAudio || activeContent
                                  .replace(/[#*_>]/g, '')
                                  .replace(/\n+/g, '. ')
                                  .substring(0, 480);

                                tutorVoice.speak({
                                  text: textToSpeak,
                                  title: currentMsgLang === 'si' ? 'ඇට්ලස් ටියුටර් පාඩම' : currentMsgLang === 'ta' ? 'அட்லஸ் ஆசிரியர் பாடம்' : 'Atlas Tutor Lesson Explanation',
                                  concept: conceptTitle,
                                  language: currentMsgLang,
                                });
                              }}
                              className="px-2.5 py-1 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                              title="Listen to this lesson with Atlas Tutor Voice"
                            >
                              <Volume2 className="w-3.5 h-3.5 text-cyan-600" />
                              <span>{currentMsgLang === 'si' ? 'හඬින් සවන් දෙන්න' : currentMsgLang === 'ta' ? 'குரலில் கேட்கவும்' : 'Listen with Voice'}</span>
                            </button>
                          </div>

                          {/* Interactive Teaching Highlighter & Content */}
                          <TutorTeachingHighlighter
                            content={activeContent}
                            keyPoints={msg.keyPoints}
                            onTutorStateChange={(state) => setTutorState(state)}
                          />

                          {/* Interactive Memory Trick Card with Voice Audio */}
                          {msg.memoryTrick && (
                            <MemoryTrickCard
                              memoryTrick={msg.memoryTrick}
                              language={currentMsgLang}
                              onTriggerVoice={(opts) => tutorVoice.speak(opts)}
                              isExternalPlaying={tutorVoice.isSpeaking && (tutorVoice.concept === msg.memoryTrick.concept || tutorVoice.concept === msg.memoryTrick.languageVersions?.[currentMsgLang]?.concept)}
                              onPlayStateChange={(isPlaying) => setTutorState(isPlaying ? 'speaking' : 'idle')}
                            />
                          )}
                        </>
                      );
                    })()}

                    {/* LIVE: an answer without retrieved textbook evidence is labelled as such, never as grounded */}
                    {msg.noTextbookEvidence && (
                      <div data-testid="no-textbook-evidence" className="mt-2 text-[11px] font-bold text-amber-700">
                        {language === 'si'
                          ? 'අනුමත පෙළපොත් සාක්ෂි නොමැති බැවින් ගුරුවරයා පිළිතුරක් ලබා දුන්නේ නැත.'
                          : language === 'ta'
                            ? 'அங்கீகரிக்கப்பட்ட பாடநூல் ஆதாரம் இல்லாததால் ஆசிரியர் பதிலளிக்கவில்லை.'
                            : 'The Tutor did not answer: no approved textbook evidence was found.'}
                      </div>
                    )}

                    {/* Child-Friendly Citation Drawer */}
                    {msg.citations && msg.citations.length > 0 && (
                      <CitationDrawer citations={msg.citations} />
                    )}

                    {/* Verified textbook page previews (only when the student asked for a visual) */}
                    <TutorMessageVisuals visuals={msg.visuals} language={msg.activeLang || language} />

                    {/* Immediate Quick Actions Bar (Clarify, Simpler, Sri Lankan Example) */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Follow-up & Clarifications:
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleSendMessage('Can you clarify this step-by-step with more details?')}
                          className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                        >
                          <span>🔍 Clarify more</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSendMessage('Can you explain this in simpler terms for a beginner?')}
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                        >
                          <span>🐣 Explain simpler</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSendMessage('Can you give a real-world Sri Lankan everyday example of this?')}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                        >
                          <span>🇱🇰 Sri Lankan Example</span>
                        </button>
                      </div>

                      {/* Topic-specific suggested questions */}
                      {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
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
                      )}
                    </div>
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
        {/* Hidden file input for textbook screenshots / exercise photos */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageFileSelect}
        />

        {/* Attached image preview pill */}
        {attachedImage && (
          <div className="mb-2.5 flex items-center gap-2.5 p-1.5 px-3 bg-slate-100/90 border border-slate-200 rounded-2xl w-fit shadow-xs animate-in fade-in">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-300 bg-white flex-shrink-0 shadow-xs">
              <img
                src={attachedImage.previewUrl}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0 pr-1">
              <span className="text-xs font-semibold text-slate-800 max-w-[200px] truncate">
                {attachedImage.name}
              </span>
              <span className="text-[10px] text-emerald-600 font-medium">
                {language === 'si' ? 'පින්තූරය සූදානම් (Ctrl+V හෝ Upload)' : language === 'ta' ? 'படம் இணைக்கப்பட்டது' : 'Screenshot ready to solve'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setAttachedImage(null)}
              className="p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-xl transition-colors"
              title="Remove attachment"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-atlas-cyan/40 focus-within:border-atlas-cyan focus-within:bg-white transition-all">
          {/* Action Tools: Mic, Camera Scanner, Attachment */}
          <div className="flex items-center gap-1 pb-1 pl-1 text-slate-400">
            {/* Mic / Voice Input: demo simulation only; LIVE has no verified speech recognition, so it is disabled */}
            <VoiceInputButton
              live={liveCurriculum || liveSubjectUnsupported}
              listening={isListeningMic}
              language={language}
              demoTitle={t('tutor.voiceInput')}
              onDemoCapture={handleSimulatedMic}
            />

            {/* Homework Photo Upload / Camera */}
            <button
              type="button"
              disabled={isSuperseded || liveSubjectUnsupported}
              onClick={() => fileInputRef.current?.click()}
              className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                isSuperseded || liveSubjectUnsupported
                  ? 'cursor-not-allowed text-slate-300'
                  : 'hover:text-cyan-600 hover:bg-cyan-50 text-slate-400'
              }`}
              title={language === 'si' ? 'පෙළපොත් ඡායාරූපයක් / Screenshot එකක් එක් කරන්න' : language === 'ta' ? 'பாடநூல் படம் / ஸ்கிரீன்ஷாட் சேர்க்க' : 'Upload textbook screenshot / photo'}
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Document Note Attachment / File Picker */}
            <button
              type="button"
              disabled={isSuperseded || liveSubjectUnsupported}
              onClick={() => fileInputRef.current?.click()}
              className={`p-2 rounded-xl transition-all hidden sm:flex items-center justify-center ${
                isSuperseded || liveSubjectUnsupported
                  ? 'cursor-not-allowed text-slate-300'
                  : 'hover:text-cyan-600 hover:bg-cyan-50 text-slate-400'
              }`}
              title={language === 'si' ? 'ගොනුවක් හෝ රූපයක් අමුණන්න' : language === 'ta' ? 'கோப்பு அல்லது படம் இணைக்கவும்' : 'Attach problem image'}
            >
              <Paperclip className="w-4 h-4" />
            </button>
          </div>

          {/* Multiline Message Textarea */}
          <textarea
            ref={inputRef}
            rows={1}
            value={inputMessage}
            disabled={isSuperseded || liveSubjectUnsupported}
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
                : liveSubjectUnsupported
                ? (otherMediumOnly ? MEDIUM_UNAVAILABLE_TEXT[language] : CURRICULUM_UNAVAILABLE_TEXT[language])
                : t('tutor.inputPlaceholder')
            }
            className={`flex-1 bg-transparent py-2.5 px-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none max-h-32 ${
              isSuperseded || liveSubjectUnsupported ? 'cursor-not-allowed opacity-60' : ''
            }`}
          />

          {/* Submit Button */}
          <button
            type="button"
            disabled={isSuperseded || liveSubjectUnsupported || !inputMessage.trim()}
            onClick={() => handleSendMessage()}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
              !isSuperseded && !liveSubjectUnsupported && inputMessage.trim()
                ? 'bg-gradient-to-r from-atlas-deep to-atlas-blue text-white shadow-md hover:from-slate-900 hover:to-atlas-deep'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            title={
              isSuperseded
                ? 'Session transferred to another device'
                : liveSubjectUnsupported
                ? (otherMediumOnly ? MEDIUM_UNAVAILABLE_TEXT[language] : CURRICULUM_UNAVAILABLE_TEXT[language])
                : t('tutor.send')
            }
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {liveSubjectUnsupported && (
          <div data-testid="tutor-subject-unavailable" className="mt-2 text-center text-[11px] font-bold text-amber-700">
            {otherMediumOnly ? MEDIUM_UNAVAILABLE_TEXT[language] : CURRICULUM_UNAVAILABLE_TEXT[language]} — {liveSubjectAvailability?.subjectName ?? activeSubjectId.toUpperCase()}
          </div>
        )}
        <div className="mt-2 text-center">
          <span className="text-[10px] text-slate-400">
            {t('tutor.disclaimer')}
          </span>
        </div>
      </div>
      </div>

      {/* Right: Curriculum Companion Pane */}
      <div
        className={`h-full min-h-0 overflow-hidden ${
          mobileView === 'chat' ? 'hidden lg:block' : 'block'
        } ${isCompanionOpen ? 'lg:col-span-5 xl:col-span-5' : 'hidden'}`}
      >
        <CurriculumCompanionPane
          subjectId={activeSubjectId}
          topicId={companionTopicId}
          topics={topicsForResolution}
          language={language}
          activeModeHint={activeModeHint}
          onAskQuestion={(query) => handleSendMessage(query)}
          onSelectTopic={(newTopicId) => {
            setCurriculumSubject(activeSubjectId, newTopicId);
            const nextParams = new URLSearchParams(searchParams);
            nextParams.set('subject', activeSubjectId);
            nextParams.set('topic', newTopicId);
            setSearchParams(nextParams, { replace: true });
          }}
        />
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

      {/* Device Quota Exceeded Banner */}
      {deviceLimitNotice && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full px-4">
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-100">
                  Device Limit Reached (Max {deviceLimitNotice.maxDevices})
                </p>
                <p className="text-[11px] text-slate-300 truncate">
                  {deviceLimitNotice.message || 'Maximum 2 active devices allowed. Please revoke an unused device.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsDeviceModalOpen(true)}
              className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 text-xs font-bold rounded-xl transition-colors flex-shrink-0"
            >
              Manage Devices
            </button>
          </div>
        </div>
      )}

      {/* Device Revoked Banner */}
      {deviceRevokedNotice && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full px-4">
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-rose-500/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-100">Device Access Revoked</p>
                <p className="text-[11px] text-slate-300 truncate">
                  {deviceRevokedNotice}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsDeviceModalOpen(true)}
              className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition-colors flex-shrink-0"
            >
              Manage Devices
            </button>
          </div>
        </div>
      )}

      {/* Device Management Modal */}
      <DeviceManagementModal
        isOpen={isDeviceModalOpen}
        onClose={() => {
          setIsDeviceModalOpen(false);
          syncLeaseState(false);
        }}
      />

      {/* Reasonably Large Atlas Tutor Character Talking Stage */}
      <AtlasTutorTalkingStage
        isOpen={tutorVoice.isSpeaking || tutorVoice.isPaused || tutorVoice.isCompleted}
        isSpeaking={tutorVoice.isSpeaking}
        isPaused={tutorVoice.isPaused}
        isCompleted={tutorVoice.isCompleted}
        title={tutorVoice.title}
        concept={tutorVoice.concept}
        spokenText={tutorVoice.spokenText}
        currentWord={tutorVoice.currentWord}
        language={tutorVoice.language}
        onPause={tutorVoice.pause}
        onResume={tutorVoice.resume}
        onReplay={tutorVoice.replay}
        onClose={tutorVoice.stop}
        tutorState={tutorState}
      />
    </div>
  );
};
