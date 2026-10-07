// LIVE Tutor opening content. It names no chapters, topics or page ranges: in LIVE the only curriculum facts the
// learner sees are the ones the ATLAS API returns, and every answer's grounding comes from retrieved evidence.
import type { ChatMessage, Language, TutorAction } from '../../types';

export function getLiveStarterPills(language: Language = 'en'): TutorAction[] {
  if (language === 'si') {
    return [
      { id: 'live-explain', label: 'පෙළපොතේ සංකල්පයක් පැහැදිලි කරන්න', prompt: 'මගේ පෙළපොතේ ඇති සංකල්පයක් සරලව පැහැදිලි කරන්න.' },
      { id: 'live-revise', label: 'පුනරීක්ෂණයට උදව් කරන්න', prompt: 'මගේ පාඩම පුනරීක්ෂණය කිරීමට උදව් කරන්න.' },
    ];
  }
  if (language === 'ta') {
    return [
      { id: 'live-explain', label: 'பாடநூல் கருத்தை விளக்கவும்', prompt: 'என் பாடநூலில் உள்ள ஒரு கருத்தை எளிமையாக விளக்கவும்.' },
      { id: 'live-revise', label: 'மீட்டலுக்கு உதவவும்', prompt: 'என் பாடத்தை மீட்டல் செய்ய உதவவும்.' },
    ];
  }
  return [
    { id: 'live-explain', label: 'Explain a textbook concept', prompt: 'Can you explain a concept from my textbook simply?' },
    { id: 'live-revise', label: 'Help me revise', prompt: 'Can you help me revise my lesson?' },
  ];
}

export function buildLiveGreeting(
  subjectId: string,
  topicId: string,
  language: Language,
  studentName: string,
  grade: string
): ChatMessage {
  const sub = (subjectId || '').toLowerCase();
  const top = (topicId || '').toLowerCase();
  const studentGradeLabel = grade ? grade.replace('grade-', 'Grade ') : 'Grade 10';
  const en = `Ayubowan ${studentName}! I am your **ATLAS Tutor for ${studentGradeLabel}**. What topic would you like to explore together today?`;
  const si = `ආයුබෝවන් ${studentName}! මම ඔබගේ **${studentGradeLabel}** ගුරුතුමා. අද අපි කුමන පාඩමෙන් පටන් ගනිමුද?`;
  const ta = `வணக்கம் ${studentName}! நான் உங்கள் **${studentGradeLabel}** ஆசிரியர். நாம் இன்று எந்த பாடத்திலிருந்து தொடங்கலாம்?`;
  return {
    id: `msg-init-${sub}-${top}`,
    role: 'tutor',
    content: language === 'si' ? si : language === 'ta' ? ta : en,
    timestamp: new Date().toISOString(),
    suggestedActions: getLiveStarterPills(language),
    languageVersions: { en, si, ta },
    activeLang: language,
  };
}
