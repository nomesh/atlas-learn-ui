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

/**
 * Restart message for the Tutor conversation. Grammatical with or without a learner name (LIVE shows no name until a
 * confirmed session provides one).
 */
export function buildRestartMessage(language: Language, studentName: string): string {
  const name = (studentName || '').trim();
  if (language === 'si') {
    return name
      ? `සංවාදය නැවත ආරම්භ කරන ලදී. ${name}, ඔබට ඊළඟට ඉගෙන ගැනීමට අවශ්‍ය කුමක්ද?`
      : 'සංවාදය නැවත ආරම්භ කරන ලදී. ඔබට ඊළඟට ඉගෙන ගැනීමට අවශ්‍ය කුමක්ද?';
  }
  if (language === 'ta') {
    return name
      ? `உரையாடல் மீண்டும் தொடங்கப்பட்டது. ${name}, அடுத்து என்ன படிக்க விரும்புகிறீர்கள்?`
      : 'உரையாடல் மீண்டும் தொடங்கப்பட்டது. அடுத்து என்ன படிக்க விரும்புகிறீர்கள்?';
  }
  return name
    ? `Conversation restarted. What would you like to learn next, ${name}?`
    : 'Conversation restarted. What would you like to learn next?';
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
  // No name yet (LIVE before a confirmed session): greet without one rather than "Ayubowan !".
  const name = (studentName || '').trim();
  const withName = (word: string) => (name ? `${word} ${name}!` : `${word}!`);
  const en = `${withName('Ayubowan')} I am your **ATLAS Tutor for ${studentGradeLabel}**. What topic would you like to explore together today?`;
  const si = `${withName('ආයුබෝවන්')} මම ඔබගේ **${studentGradeLabel}** ගුරුතුමා. අද අපි කුමන පාඩමෙන් පටන් ගනිමුද?`;
  const ta = `${withName('வணக்கம்')} நான் உங்கள் **${studentGradeLabel}** ஆசிரியர். நாம் இன்று எந்த பாடத்திலிருந்து தொடங்கலாம்?`;
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
