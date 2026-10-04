import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
  AlertTriangle,
  PanelRightClose,
  PanelRightOpen,
  MessageSquare,
  Globe,
  X
} from 'lucide-react';
import { CurriculumCompanionPane } from './CurriculumCompanionPane';
import { TutorTeachingHighlighter } from './TutorTeachingHighlighter';
import { MemoryTrickCard } from './MemoryTrickCard';
import { useStudent } from '../../state/studentContext';
import { TutorAvatar } from '../avatar/TutorAvatar';
import { AtlasTutorTalkingStage } from '../avatar/AtlasTutorTalkingStage';
import { useTutorVoice } from '../../hooks/useTutorVoice';
import { CitationDrawer } from './CitationDrawer';
import { RichContentRenderer } from './RichContentRenderer';
import { tutorService } from '../../api/tutorApi';
import { MOCK_TOPICS, findTopicResilient } from '../../mocks/curriculumData';
import { fetchCurriculumTopics } from '../../api/curriculumApi';
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

export const detectCurriculumContextFromMessage = (
  message: string,
  currentSubject?: string
): { subjectId: string; topicId: string } | null => {
  const lower = message.toLowerCase();

  // 1. ICT Chapter 4: Programming / Scratch
  if (
    lower.includes('scratch') ||
    lower.includes('programming') ||
    lower.includes('ක්‍රමලේඛන') ||
    lower.includes('නිරலாக்கம்') ||
    lower.includes('variable') ||
    lower.includes('විචල්‍ය') ||
    lower.includes('sprite') ||
    lower.includes('ස්ප්‍රයිට්') ||
    lower.includes('repeat loop') ||
    lower.includes('if-then') ||
    ((lower.includes('chapter 4') || lower.includes('4 වන පාඩම') || lower.includes('பாடம் 4') || lower.includes('ch 4')) &&
      (currentSubject === 'ict' || lower.includes('ict') || lower.includes('computer') || lower.includes('code') || lower.includes('loops') || lower.includes('arithmetic')))
  ) {
    return { subjectId: 'ict', topicId: 'programming' };
  }

  // 2. ICT Chapter 1: Number Systems
  if (
    lower.includes('binary') ||
    lower.includes('number system') ||
    lower.includes('decimal and binary') ||
    lower.includes('place value') ||
    lower.includes('powers of 2') ||
    lower.includes('සංඛ්‍යා පද්ධති') ||
    lower.includes('ද්විමය') ||
    lower.includes('දශමය') ||
    lower.includes('எண் முறை') ||
    lower.includes('இருமம்') ||
    ((lower.includes('chapter 1') || lower.includes('1 වන පාඩම') || lower.includes('பாடம் 1') || lower.includes('ch 1')) &&
      (currentSubject === 'ict' || lower.includes('ict')))
  ) {
    return { subjectId: 'ict', topicId: 'number-systems' };
  }

  // 3. ICT Chapter 2: Configuring & Formatting Computer
  if (
    lower.includes('desktop customization') ||
    lower.includes('screen resolution') ||
    lower.includes('formatting storage') ||
    lower.includes('formatting a computer') ||
    lower.includes('වින්‍යාසගත') ||
    lower.includes('පරිගණක වින්‍යාසය') ||
    lower.includes('விசைப்பலகை') ||
    ((lower.includes('chapter 2') || lower.includes('2 වන පාඩම') || lower.includes('பாடம் 2') || lower.includes('ch 2')) &&
      (currentSubject === 'ict' || lower.includes('ict')))
  ) {
    return { subjectId: 'ict', topicId: 'configuring-formatting-computer' };
  }

  // 4. ICT Chapter 3: Word Processing
  if (
    lower.includes('word processing') ||
    lower.includes('justify margins') ||
    lower.includes('paragraph alignment') ||
    lower.includes('document creation') ||
    lower.includes('වදන් සැකසුම') ||
    lower.includes('சொல் செயலாக்கம்') ||
    ((lower.includes('chapter 3') || lower.includes('3 වන පාඩම') || lower.includes('பாடம் 3') || lower.includes('ch 3')) &&
      (currentSubject === 'ict' || lower.includes('ict')))
  ) {
    return { subjectId: 'ict', topicId: 'word-processing' };
  }

  // 5. ICT Chapter 5: Physical Computing
  if (
    lower.includes('physical computing') ||
    lower.includes('microbit') ||
    lower.includes('micro:bit') ||
    lower.includes('arduino') ||
    lower.includes('sensor') ||
    lower.includes('actuator') ||
    lower.includes('භෞතික පරිගණන') ||
    lower.includes('සංවේදක') ||
    lower.includes('பௌதீகக் கணினியியல்') ||
    ((lower.includes('chapter 5') || lower.includes('5 වන පාඩම') || lower.includes('பாடம் 5') || lower.includes('ch 5')) &&
      (currentSubject === 'ict' || lower.includes('ict')))
  ) {
    return { subjectId: 'ict', topicId: 'physical-computing' };
  }

  // 6. ICT Chapter 6: Internet
  if (
    lower.includes('world wide web') ||
    lower.includes('web browser') ||
    lower.includes('url anatomy') ||
    lower.includes('cyber safety') ||
    lower.includes('අන්තර්ජාලය') ||
    lower.includes('இணையம்') ||
    ((lower.includes('chapter 6') || lower.includes('6 වන පාඩම') || lower.includes('பாடம் 6') || lower.includes('ch 6')) &&
      (currentSubject === 'ict' || lower.includes('ict')))
  ) {
    return { subjectId: 'ict', topicId: 'internet' };
  }

  // General ICT
  if (
    lower.includes('ict') ||
    lower.includes('information technology') ||
    lower.includes('තොරතුරු තාක්ෂණය') ||
    lower.includes('தகவல் தொழில்நுட்பம்')
  ) {
    return { subjectId: 'ict', topicId: 'number-systems' };
  }

  // History Chapter 1: Inscriptions & Sources
  if (
    lower.includes('sellipi') ||
    lower.includes('inscription') ||
    lower.includes('සෙල්ලිපි') ||
    lower.includes('கல்வெட்டு') ||
    lower.includes('brahmi') ||
    lower.includes('panakaduwa') ||
    lower.includes('galpotha') ||
    ((lower.includes('chapter 1') || lower.includes('1 වන පාඩම') || lower.includes('பாடம் 1')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය') || lower.includes('வரலாறு')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-sources' };
  }

  // History Chapter 2: Settlements
  if (
    lower.includes('settlement') ||
    lower.includes('ජනාවාස') ||
    lower.includes('ibbankatuwa') ||
    lower.includes('ඉබ්බන්කටුව') ||
    lower.includes('fa-hien') ||
    lower.includes('පාහියන්ගල') ||
    lower.includes('batadombalena') ||
    lower.includes('බටදොඹලෙන') ||
    ((lower.includes('chapter 2') || lower.includes('2 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-settlements' };
  }

  // History Chapter 3: Political Power
  if (
    lower.includes('parumaka') ||
    lower.includes('පරුමක') ||
    lower.includes('gamika') ||
    lower.includes('ගාමික') ||
    lower.includes('political power') ||
    lower.includes('දේශපාලන බලය') ||
    ((lower.includes('chapter 3') || lower.includes('3 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-political-power' };
  }

  // History Chapter 4: Ancient Society
  if (
    lower.includes('ancient society') ||
    lower.includes('පුරාණ සමාජය') ||
    lower.includes('කුල ක්‍රමය') ||
    lower.includes('gam sabha') ||
    lower.includes('ගම් සභා') ||
    ((lower.includes('chapter 4') || lower.includes('4 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-ancient-society' };
  }

  // History Chapter 5: Hydraulic / Science & Tech (Ancient Sri Lankan irrigation)
  if (
    lower.includes('bisokotuwa') ||
    lower.includes('බිසෝකොටුව') ||
    lower.includes('yoda ela') ||
    lower.includes('යෝධ ඇළ') ||
    lower.includes('ralapanawa') ||
    lower.includes('රළපනාව') ||
    lower.includes('sorabora') ||
    lower.includes('සොරබොර') ||
    lower.includes('cascade system') ||
    lower.includes('ellangawa') ||
    lower.includes('ඇල්ලංගාව') ||
    lower.includes('වාරි ශිෂ්ටාචාරය') ||
    lower.includes('ancient hydraulic') ||
    lower.includes('ancient irrigation') ||
    ((lower.includes('chapter 5') || lower.includes('5 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-science-tech' };
  }

  // History Chapter 6: Historical Knowledge
  if (
    lower.includes('historical knowledge') ||
    lower.includes('ඓතිහාසික දැනුම') ||
    lower.includes('ප්‍රායෝගික භාවිතය') ||
    ((lower.includes('chapter 6') || lower.includes('6 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-historical-knowledge' };
  }

  // History Chapter 7: Decline & SW Kingdoms
  if (
    lower.includes('dambadeniya') ||
    lower.includes('දඹදෙණිය') ||
    lower.includes('yapahuwa') ||
    lower.includes('යාපහුව') ||
    lower.includes('kurunegala') ||
    lower.includes('gampola') ||
    lower.includes('kotte') ||
    lower.includes('කෝට්ටේ') ||
    ((lower.includes('chapter 7') || lower.includes('7 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-decline-new-kingdoms' };
  }

  // History Chapter 8: Kandyan Kingdom
  if (
    lower.includes('kandyan') ||
    lower.includes('උඩරට') ||
    lower.includes('vimaladharmasuriya') ||
    lower.includes('විමලධර්මසූරිය') ||
    lower.includes('danture') ||
    lower.includes('දන්තුරේ') ||
    lower.includes('gannoruwa') ||
    lower.includes('ගන්නෝරුව') ||
    ((lower.includes('chapter 8') || lower.includes('8 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-kandyan-kingdom' };
  }

  // History Chapter 9: Renaissance
  if (
    lower.includes('renaissance') ||
    lower.includes('පුනරුදය') ||
    lower.includes('da vinci') ||
    lower.includes('gutenberg') ||
    ((lower.includes('chapter 9') || lower.includes('9 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-renaissance' };
  }

  // History Chapter 10: Western World
  if (
    lower.includes('western world') ||
    lower.includes('බටහිර ලෝකය') ||
    lower.includes('portuguese') ||
    lower.includes('පෘතුගීසි') ||
    lower.includes('dutch') ||
    lower.includes('ලන්දේසි') ||
    ((lower.includes('chapter 10') || lower.includes('10 වන පාඩම')) &&
      (currentSubject === 'history' || lower.includes('history') || lower.includes('ඉතිහාසය')))
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-western-world' };
  }

  // History general fallback
  if (
    lower.includes('history') ||
    lower.includes('ඉතිහාසය') ||
    lower.includes('வரலாறு') ||
    lower.includes('anuradhapura') ||
    lower.includes('polonnaruwa') ||
    lower.includes('king') ||
    lower.includes('kingdom')
  ) {
    return { subjectId: 'history', topicId: 'history-gr10-sources' };
  }

  // Maths Chapter 10: Pythagoras
  if (
    lower.includes('pythagor') ||
    lower.includes('hypotenuse') ||
    lower.includes('a² + b²') ||
    lower.includes('right-angled triangle') ||
    lower.includes('පයිතගරස්') ||
    lower.includes('සෘජුකෝණී ත්‍රිකෝණ') ||
    lower.includes('பைதகரசு') ||
    ((lower.includes('chapter 10') || lower.includes('10 වන පාඩම') || lower.includes('ch 10') || lower.includes('ch-10')) &&
      (currentSubject === 'maths' || lower.includes('maths') || lower.includes('ගණිතය') || lower.includes('கணிதம்')))
  ) {
    return { subjectId: 'maths', topicId: 'maths-gr10-ch10-pythagoras' };
  }

  // Maths Chapter 1: Perimeter
  if (
    lower.includes('perimeter') ||
    lower.includes('පරිමිතිය') ||
    lower.includes('சுற்றளவு') ||
    lower.includes('sector of a circle') ||
    lower.includes('arc length') ||
    ((lower.includes('chapter 1') || lower.includes('1 වන පාඩම') || lower.includes('ch 1') || lower.includes('ch-1')) &&
      (currentSubject === 'maths' || lower.includes('maths') || lower.includes('ගණිතය')))
  ) {
    return { subjectId: 'maths', topicId: 'maths-gr10-ch1-perimeter' };
  }

  // Science Chapter 10: Chemical Bonds
  if (
    lower.includes('chemical bond') ||
    lower.includes('රසායනික බන්ධන') ||
    lower.includes('இரசாயனப் பிணைப்புகள்') ||
    lower.includes('ionic bond') ||
    lower.includes('covalent bond') ||
    lower.includes('metallic bond') ||
    lower.includes('අයනික බන්ධන') ||
    lower.includes('සහසංයුජ බන්ධන') ||
    lower.includes('ලෝහක බන්ධන') ||
    lower.includes('octet rule') ||
    lower.includes('අෂ්ටක නියමය') ||
    lower.includes('electronegativity') ||
    lower.includes('විද්‍යුත් සෘණතාව') ||
    ((lower.includes('chapter 10') || lower.includes('10 වන පාඩම') || lower.includes('පාඩම 10') || lower.includes('ch 10') || lower.includes('ch-10')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව') || lower.includes('bond') || lower.includes('බන්ධන') || lower.includes('பிணைப்பு')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch10-chemical-bonds' };
  }

  // Science Chapter 14: Continuity of Life
  if (
    lower.includes('continuity') ||
    lower.includes('mitosis') ||
    lower.includes('meiosis') ||
    lower.includes('cell division') ||
    lower.includes('අඛණ්ඩතාව') ||
    lower.includes('සෛල බෙදීම') ||
    lower.includes('අනුනන') ||
    lower.includes('ඌනන') ||
    lower.includes('கலப்பிரிவு') ||
    lower.includes('இழையுருப்பிரிவு') ||
    lower.includes('ஒடுக்கற்பிரிவு') ||
    ((lower.includes('chapter 14') || lower.includes('14 වන පාඩම') || lower.includes('පාඩම 14') || lower.includes('ch 14')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව') || lower.includes('life')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch14-continuity-of-life' };
  }

  // Science Chapter 13: Classification of Organisms
  if (
    lower.includes('classification') ||
    lower.includes('වර්ගීකරණය') ||
    lower.includes('வகைப்பாடு') ||
    lower.includes('five kingdom') ||
    lower.includes('පංච රාජධානි') ||
    lower.includes('monera') ||
    lower.includes('protista') ||
    lower.includes('dichotomous') ||
    lower.includes('ද්විපද යතුරු') ||
    ((lower.includes('chapter 13') || lower.includes('13 වන පාඩම') || lower.includes('පාඩම 13') || lower.includes('ch 13')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව') || lower.includes('organism')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch13-classification-of-organisms' };
  }

  // Science Chapter 15: Hydrostatic Pressure & Hydraulic Machines
  if (
    lower.includes('hydrostatic') ||
    lower.includes('fluid pressure') ||
    lower.includes('liquid pressure') ||
    lower.includes('පීඩනය') ||
    lower.includes('ද්‍රවස්ථිතික') ||
    lower.includes('ද්‍රව පීඩනය') ||
    lower.includes('அமுக்கம்') ||
    lower.includes('pascal') ||
    lower.includes('පැස්කල්') ||
    lower.includes('archimedes') ||
    lower.includes('hρg') ||
    lower.includes('h*rho*g') ||
    lower.includes('hpg') ||
    lower.includes('u-tube') ||
    lower.includes('manometer') ||
    lower.includes('hydraulic machine') ||
    lower.includes('hydraulic press') ||
    lower.includes('hydraulic jack') ||
    lower.includes('hydraulic brake') ||
    lower.includes('hydraulic lift') ||
    lower.includes('හයිඩ්‍රොලික්') ||
    ((lower.includes('chapter 15') || lower.includes('15 වන පාඩම') || lower.includes('පාඩම 15') || lower.includes('ch 15') || lower.includes('ch-15')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව') || !currentSubject))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch15-hydrostatic-pressure' };
  }

  // Science Chapter 1: Chemical Basis of Life
  if (
    lower.includes('chemical basis') ||
    lower.includes('රසායනික පදනම') ||
    lower.includes('biomolecules') ||
    lower.includes('carbohydrate') ||
    lower.includes('protein') ||
    lower.includes('ජෛව අණු') ||
    ((lower.includes('chapter 1') || lower.includes('1 වන පාඩම') || lower.includes('ch 1')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch1-chemical-basis' };
  }

  // Science Chapter 2: Linear Motion
  if (
    lower.includes('linear motion') ||
    lower.includes('චලිතය') ||
    lower.includes('සරල රේඛීය') ||
    lower.includes('v = u + at') ||
    lower.includes('velocity-time') ||
    ((lower.includes('chapter 2') || lower.includes('2 වන පාඩම') || lower.includes('ch 2')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch2-linear-motion' };
  }

  // Science Chapter 3: Structure of Matter
  if (
    lower.includes('structure of matter') ||
    lower.includes('පදාර්ථයේ ව්‍යුහය') ||
    lower.includes('bohr') ||
    lower.includes('electron configuration') ||
    lower.includes('isotope') ||
    lower.includes('සමස්ථානික') ||
    ((lower.includes('chapter 3') || lower.includes('3 වන පාඩම') || lower.includes('ch 3')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch3-structure-of-matter' };
  }

  // Science Chapter 4: Newton's Laws
  if (
    lower.includes('newton') ||
    lower.includes('නිව්ටන්') ||
    lower.includes('f = ma') ||
    lower.includes('momentum') ||
    ((lower.includes('chapter 4') || lower.includes('4 වන පාඩම') || lower.includes('ch 4')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch4-newton-laws' };
  }

  // Science Chapter 17: Rate of Reactions
  if (
    lower.includes('rate of reaction') ||
    lower.includes('ප්‍රතික්‍රියා සීඝ්‍රතාව') ||
    lower.includes('collision theory') ||
    lower.includes('catalyst') ||
    lower.includes('ගැටුම් වාදය') ||
    ((lower.includes('chapter 17') || lower.includes('17 වන පාඩම') || lower.includes('ch 17')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch17-rate-of-reactions' };
  }

  // Science Chapter 20: Inheritance
  if (
    lower.includes('inheritance') ||
    lower.includes('mendel') ||
    lower.includes('පාරම්පරිකතාව') ||
    lower.includes('monohybrid') ||
    ((lower.includes('chapter 20') || lower.includes('20 වන පාඩම') || lower.includes('ch 20')) &&
      (currentSubject === 'science' || lower.includes('science') || lower.includes('විද්‍යාව')))
  ) {
    return { subjectId: 'science', topicId: 'science-gr10-ch20-inheritance' };
  }

  // Science: Photosynthesis
  if (
    lower.includes('photosynthesis') ||
    lower.includes('stomata') ||
    lower.includes('chlorophyll') ||
    lower.includes('ප්‍රභාසංස්ලේෂණය') ||
    lower.includes('ஒளித்தொகுப்பு')
  ) {
    return { subjectId: 'science', topicId: 'photosynthesis' };
  }

  return null;
};

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

export function getCurriculumStarterPills(
  subjectId?: string,
  topicId?: string,
  language: Language = 'en'
): TutorAction[] {
  const sub = (subjectId || '').toLowerCase();
  const top = (topicId || '').toLowerCase();

  if (sub === 'science') {
    if (top.includes('matter') || top.includes('bohr') || top.includes('atom') || top.includes('sci-10-matter') || top === 'structure-of-matter') {
      if (language === 'si') {
        return [
          { id: 'sci-bohr', label: 'බෝර් පරමාණුක ආකෘතිය', prompt: 'බෝර් පරමාණුක ආකෘතිය සහ ඉලෙක්ට්‍රෝන වින්‍යාසය (2, 8, 8) පැහැදිලි කරන්න' },
          { id: 'sci-isotopes', label: 'සමස්ථානික සහ පරමාණුක ක්‍රමාංකය', prompt: 'සමස්ථානික යනු මොනවාද? පරමාණුක ක්‍රමාංකය සහ ස්කන්ධ ක්‍රමාංකය අතර වෙනස කුමක්ද?' },
          { id: 'sci-matter', label: 'පදාර්ථයේ ව්‍යුහය', prompt: 'පදාර්ථයේ ව්‍යුහය සහ උපපරමාණුක අංශු (ප්‍රෝටෝන, නියුට්‍රෝන, ඉලෙක්ට්‍රෝන) ගැන පහදා දෙන්න' },
        ];
      }
      if (language === 'ta') {
        return [
          { id: 'sci-bohr', label: 'போர் அணு மாதிரி', prompt: 'போர் அணு மாதிரி மற்றும் இலத்திரன் கட்டமைப்பு (2, 8, 8) பற்றி விளக்குக' },
          { id: 'sci-isotopes', label: 'சமதானிகள் & அணு எண்', prompt: 'சமதானிகள் என்றால் என்ன? அணு எண் மற்றும் திணிவு எண் தொடர்பு என்ன?' },
          { id: 'sci-matter', label: 'சடப்பொருளின் கட்டமைப்பு', prompt: 'சடப்பொருளின் அடிப்படை கட்டமைப்பு மற்றும் உப-அணு துணிக்கைகள் பற்றி விளக்குக' },
        ];
      }
      return [
        { id: 'sci-bohr', label: 'Bohr Atomic Model', prompt: 'Explain the Bohr atomic model and electron configuration (2, 8, 8)' },
        { id: 'sci-isotopes', label: 'Isotopes & Atomic Number', prompt: 'What are isotopes and how do atomic and mass numbers relate?' },
        { id: 'sci-matter', label: 'Structure of Matter', prompt: 'Explain the structure of matter and subatomic particles (protons, neutrons, electrons)' },
      ];
    }

    if (top.includes('reaction') || top.includes('rate') || top.includes('sci-10-reactions') || top === 'rate-of-reactions') {
      if (language === 'si') {
        return [
          { id: 'sci-rate-factors', label: 'ප්‍රතික්‍රියා සීඝ්‍රතාව කෙරෙහි බලපාන සාධක', prompt: 'රසායනික ප්‍රතික්‍රියාවක සීඝ්‍රතාව කෙරෙහි බලපාන සාධක මොනවාද?' },
          { id: 'sci-collision', label: 'ගැටුම් වාදය සහ උත්ප්‍රේරක', prompt: 'ගැටුම් වාදය සහ උත්ප්‍රේරක මගින් ප්‍රතික්‍රියා සීඝ්‍රතාව වැඩි කරන්නේ කෙසේදැයි පැහැදිලි කරන්න' },
        ];
      }
      if (language === 'ta') {
        return [
          { id: 'sci-rate-factors', label: 'தாக்க வீதத்தை பாதிக்கும் காரணிகள்', prompt: 'இரசாயனத் தாக்க வீதத்தை பாதிக்கும் முக்கிய காரணிகள் எவை?' },
          { id: 'sci-collision', label: 'மோதுகைக் கோட்பாடு & ஊக்கிகள்', prompt: 'மோதுகைக் கோட்பாடு மற்றும் ஊக்கிகள் தாக்க வீதத்தை எவ்வாறு அதிகரிக்கின்றன?' },
        ];
      }
      return [
        { id: 'sci-rate-factors', label: 'Factors Affecting Reaction Rate', prompt: 'What factors affect the rate of a chemical reaction?' },
        { id: 'sci-collision', label: 'Collision Theory & Catalysts', prompt: 'Explain collision theory and how catalysts speed up reaction rates' },
      ];
    }

    if (top.includes('motion') || top.includes('linear') || top.includes('sci-10-motion') || top === 'motion-in-a-straight-line') {
      if (language === 'si') {
        return [
          { id: 'sci-motion-eq', label: 'චලිත සමීකරණ (v = u + at)', prompt: 'සරල රේඛීය චලිත සමීකරණ (v = u + at, s = ut + 1/2at²) පැහැදිලි කරන්න' },
          { id: 'sci-vel-time', label: 'ප්‍රවේග-කාල ප්‍රස්තාර', prompt: 'ප්‍රවේග-කාල ප්‍රස්තාරයකින් ත්වරණය සහ විස්ථාපනය සොයන්නේ කෙසේද?' },
        ];
      }
      if (language === 'ta') {
        return [
          { id: 'sci-motion-eq', label: 'இயக்கச் சமன்பாடுகள் (v = u + at)', prompt: 'நேர்கோட்டு இயக்க சமன்பாடுகளை (v = u + at, s = ut + 1/2at²) விளக்குக' },
          { id: 'sci-vel-time', label: 'வேக-நேர வரைபடங்கள்', prompt: 'வேக-நேர வரைபடத்திலிருந்து ஆர்முடுகல் மற்றும் இடப்பெயர்ச்சியை எவ்வாறு கணிப்பது?' },
        ];
      }
      return [
        { id: 'sci-motion-eq', label: 'Equations of Motion', prompt: 'Can you explain the equations of linear motion (v = u + at, s = ut + 1/2at²)?' },
        { id: 'sci-vel-time', label: 'Velocity-Time Graphs', prompt: 'How do you determine acceleration and displacement from a velocity-time graph?' },
      ];
    }

    // Default science / Grade 8 Photosynthesis
    if (language === 'si') {
      return [
        { id: 'sci-photo', label: 'ප්‍රභාසංශ්ලේෂණය', prompt: 'ශාකවල ප්‍රභාසංශ්ලේෂණ ක්‍රියාවලිය පැහැදිලි කරන්න' },
        { id: 'sci-stomata', label: 'පත්‍ර රන්ද්‍ර සහ වායු හුවමාරුව', prompt: 'පත්‍ර රන්ද්‍ර මගින් වායු හුවමාරුව සිදුවන ආකාරය පැහැදිලි කරන්න' },
        { id: 'sci-starch', label: 'පිෂ්ටය හඳුනාගැනීමේ පරීක්ෂාව', prompt: 'පත්‍ර වල පිෂ්ටය හඳුනාගැනීම සඳහා අයඩින් පරීක්ෂාව පැහැදිලි කරන්න' },
      ];
    }
    if (language === 'ta') {
      return [
        { id: 'sci-photo', label: 'ஒளித்தொகுப்பு செயல்முறை', prompt: 'தாவரங்களில் ஒளித்தொகுப்பு நடைபெறும் செயல்முறையை விளக்குக' },
        { id: 'sci-stomata', label: 'இலைவாய்களும் வாயுப் பரிமாற்றமும்', prompt: 'இலைவாய்கள் வாயுப் பரிமாற்றத்தை எவ்வாறு கட்டுப்படுத்துகின்றன?' },
        { id: 'sci-starch', label: 'மாப்பொருள் பரிசோதனை', prompt: 'இலைகளில் மாப்பொருளை கண்டறியும் அயடீன் பரிசோதனையை விளக்குக' },
      ];
    }
    return [
      { id: 'sci-photo', label: 'Science: Photosynthesis', prompt: 'Explain the process of photosynthesis in plants' },
      { id: 'sci-stomata', label: 'Science: Stomata & Gas Exchange', prompt: 'How do leaf stomata regulate gas exchange?' },
      { id: 'sci-starch', label: 'Science: Plant Starch Testing', prompt: 'Explain the iodine test experiment for starch in leaves' },
    ];
  }

  if (sub === 'ict') {
    if (language === 'si') {
      return [
        { id: 'ict-num', label: '1 වන පාඩම: සංඛ්‍යා පද්ධති (ද්විමය)', prompt: 'සංඛ්‍යා පද්ධති සහ ද්විමය පරිවර්තනය පැහැදිලි කරන්න' },
        { id: 'ict-cfg', label: '2 වන පාඩම: පරිගණක වින්‍යාසය සහ යතුරුපුවරු', prompt: 'Can you explain more about Desktop Customization & Display Settings?' },
        { id: 'ict-wp', label: '3 වන පාඩම: වදන් සැකසුම (Word Processing)', prompt: '3 වන පරිච්ඡේදය: වදන් සැකසුම සහ ලේඛන හැඩසවි ගැන්වීම පැහැදිලි කරන්න' },
        { id: 'ict-prg', label: '4 වන පාඩම: Scratch ක්‍රමලේඛනය (Loops)', prompt: 'Scratch හි විචල්‍යයන් සහ පුනරාවර්තන loops ක්‍රියාකරන්නේ කෙසේද?' },
        { id: 'ict-phy', label: '5 වන පාඩම: භෞතික පරිගණනය (micro:bit)', prompt: 'භෞතික පරිගණනයේ සංවේදක සහ ක්‍රියාකරවන අතර වෙනස කුමක්ද?' },
      ];
    }
    if (language === 'ta') {
      return [
        { id: 'ict-num', label: 'பாடம் 1: எண் முறைகள் (இருமம்/தசமம்)', prompt: 'எண் முறைகள் மற்றும் இரும மாற்றங்களை விளக்குங்கள்' },
        { id: 'ict-cfg', label: 'பாடம் 2: கணினி உள்ளமைவு & விசைப்பலகை', prompt: 'Can you explain more about Desktop Customization & Display Settings?' },
        { id: 'ict-wp', label: 'பாடம் 3: சொல் செயலாக்கம் (Word Processing)', prompt: 'பாடம் 3: சொல் செயலாக்கம் மற்றும் ஆவண வடிவமைப்பு பற்றி விளக்குங்கள்' },
        { id: 'ict-prg', label: 'பாடம் 4: Scratch நிரலாக்கம் (Loops)', prompt: 'Scratch இல் மாறிகள் மற்றும் சுழற்சிகள் எவ்வாறு செயல்படுகின்றன?' },
        { id: 'ict-phy', label: 'பாடம் 5: பௌதீகக் கணினியியல் (micro:bit)', prompt: 'உணரிகள் மற்றும் இயங்கிகள் இடையிலான வேறுபாடு என்ன?' },
      ];
    }
    return [
      { id: 'ict-num', label: 'Ch 1: Number Systems (Binary & Decimal)', prompt: 'Can you explain the main concepts of Number Systems and binary conversions?' },
      { id: 'ict-cfg', label: 'Ch 2: Desktop Configuration & Keyboards', prompt: 'Can you explain more about Desktop Customization & Display Settings?' },
      { id: 'ict-wp', label: 'Ch 3: Word Processing & Formatting', prompt: 'Can you teach me Chapter 3: Word Processing and document formatting?' },
      { id: 'ict-prg', label: 'Ch 4: Scratch Programming & Loops', prompt: 'How do variables and repeat loops work in Scratch programming?' },
      { id: 'ict-phy', label: 'Ch 5: Physical Computing & Sensors', prompt: 'What is the difference between sensors and actuators on a micro:bit?' },
    ];
  }

  if (sub === 'history') {
    if (language === 'si') {
      return [
        { id: 'hist-sellipi', label: '1 වන පාඩම: සෙල්ලිපි වර්ග 5 (Sellipi)', prompt: 'ඉතිහාසය හැදෑරීමේ මූලාශ්‍ර වල සෙල්ලිපි (Sellipi) වර්ග සහ බ්‍රාහ්මී ලේඛන ගැන විස්තර කරන්න' },
        { id: 'hist-media', label: 'ශිලා ලේඛන මාධ්‍ය (ගල්පොත, පනාකඩුව)', prompt: 'ලංකාවේ ශිලා ලේඛන සහ වෙනත් ලේඛන මාධ්‍ය (ගල්පොත, සීගිරි කුරුටු ගී, පනාකඩුව තඹ සන්නස) මොනවාද?' },
        { id: 'hist-curriculum', label: '10 ශ්‍රේණිය ඉතිහාසය පරිච්ඡේද 10', prompt: '10 ශ්‍රේණිය ඉතිහාසය විෂය නිර්දේශයේ පරිච්ඡේද 10 මොනවාද?' },
      ];
    }
    if (language === 'ta') {
      return [
        { id: 'hist-sellipi', label: 'பாடம் 1: கல்வெட்டுகள் (Sellipi) & பிராமி', prompt: 'இலங்கையின் வரலாற்று ஆதாரங்களான கல்வெட்டுகள் மற்றும் பிராமி எழுத்துக்கள் பற்றி விளக்குக' },
        { id: 'hist-media', label: 'சாசன ஊடகங்கள் (கற்பொத்த, பனாகடுவ)', prompt: 'இலங்கையின் சாசன ஊடகங்கள் (கற்பொத்த, பனாகடுவ செப்புப்பட்டயம்) எவை?' },
        { id: 'hist-curriculum', label: 'தரம் 10 வரலாறு 10 அத்தியாயங்கள்', prompt: 'தரம் 10 வரலாற்றுப் பாடநூலின் 10 அத்தியாயங்கள் எவை?' },
      ];
    }
    return [
      { id: 'hist-sellipi', label: 'Ch 1: 5 Types of Inscriptions (Sellipi)', prompt: 'Explain the 5 types of Inscriptions (Sellipi) and Brahmi cave records from Chapter 1' },
      { id: 'hist-media', label: 'Epigraphical Media (Panakaduwa, Galpotha)', prompt: 'What are the key epigraphical media like Galpotha, Sigiriya Kurutu Gee, and Panakaduwa copper plate?' },
      { id: 'hist-curriculum', label: 'Grade 10 History: All 10 Chapters', prompt: 'What are the 10 chapters in the Grade 10 History curriculum?' },
    ];
  }

  // Maths or other
  if (language === 'si') {
    return [
      { id: 'math-pyth', label: 'පයිතගරස් ප්‍රමේයය', prompt: 'පයිතගරස් ප්‍රමේයයේ ප්‍රධාන කරුණු පැහැදිලි කරන්න' },
      { id: 'math-triangles', label: 'ඍජුකෝණී ත්‍රිකෝණ', prompt: 'a² + b² = c² භාවිතයෙන් කර්ණය ගණනය කරන්නේ කෙසේද?' },
    ];
  }
  if (language === 'ta') {
    return [
      { id: 'math-pyth', label: 'பைத்தகரசின் தேற்றம்', prompt: 'பைத்தகரசின் தேற்றத்தின் முக்கிய கருத்துக்களை விளக்குக' },
      { id: 'math-triangles', label: 'செங்கோண முக்கோணங்கள்', prompt: 'a² + b² = c² ஐப் பயன்படுத்தி செம்பக்கத்தை எவ்வாறு கணிப்பது?' },
    ];
  }
  return [
    { id: 'math-pyth', label: 'Maths: Pythagoras Theorem', prompt: 'Can you explain the main ideas of Pythagoras Theorem?' },
    { id: 'math-triangles', label: 'Maths: Right-Angled Triangles', prompt: 'How to calculate the hypotenuse using a² + b² = c²?' },
  ];
}

export function buildInitialGreeting(
  subjectId: string,
  topicId: string,
  language: Language,
  studentName: string,
  grade: string
): ChatMessage {
  const sub = (subjectId || '').toLowerCase();
  const top = (topicId || '').toLowerCase();
  const studentGradeLabel = grade ? grade.replace('grade-', 'Grade ') : 'Grade 10';

  let enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for ${studentGradeLabel}**. What topic would you like to explore together today?`;
  let siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **${studentGradeLabel}** ගුරුතුමා. අද අපි කුමන පාඩමෙන් පටන් ගනිමුද?`;
  let taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **${studentGradeLabel}** ஆசிரியர். நாம் இன்று எந்த பாடத்திலிருந்து தொடங்கலாம்?`;

  let keyPoints: string[] | undefined = undefined;

  if (sub === 'science') {
    if (top.includes('matter') || top.includes('bohr') || top.includes('atom') || top.includes('sci-10-matter') || top === 'structure-of-matter') {
      enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for Grade 10 Science — Structure of Matter**.\n\nI can help you explore atomic structure, electron configurations (2, 8, 8), Bohr atomic models, isotopes, and the periodic table.\n\nWhat would you like to explore first?`;
      siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **10 ශ්‍රේණිය විද්‍යාව — පදාර්ථයේ ව්‍යුහය** ගුරුතුමා.\n\nපරමාණුක ව්‍යුහය, ඉලෙක්ට්‍රෝන වින්‍යාසය (2, 8, 8), බෝර් පරමාණු ආකෘති, සමස්ථානික සහ ආවර්තිතා වගුව පිළිබඳ ඕනෑම කරුණක් මා සමඟ සාකච්ඡා කළ හැක.\n\nඅපි කුමන කරුණෙන් පටන් ගනිමුද?`;
      taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **தரம் 10 விஞ்ஞானம் — சடப்பொருளின் கட்டமைப்பு** ஆசிரியர்.\n\nஅணு கட்டமைப்பு, இலத்திரன் கட்டமைப்பு (2, 8, 8), போர் அணு மாதிரிகள், மற்றும் சமதானிகள் பற்றி நாம் கற்கலாம்.\n\nநாம் எதிலிருந்து தொடங்கலாம்?`;
      keyPoints = [
        'Atomic Structure (Protons, Neutrons, Electrons)',
        'Bohr Electron Configuration (2, 8, 8)',
        'Atomic Number (Z) & Mass Number (A)',
        'Isotopes & Chemical Properties'
      ];
    } else if (top.includes('reaction') || top.includes('rate') || top.includes('sci-10-reactions') || top === 'rate-of-reactions') {
      enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for Grade 10 Science — Rate of Reactions**.\n\nI can help you understand how concentration, temperature, surface area, and catalysts affect the speed of chemical reactions using collision theory.\n\nWhat would you like to explore?`;
      siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **10 ශ්‍රේණිය විද්‍යාව — රසායනික ප්‍රතික්‍රියා සීඝ්‍රතාව** ගුරුතුමා.\n\nසාන්ද්‍රණය, උෂ්ණත්වය, පෘෂ්ඨික වර්ගඵලය සහ උත්ප්‍රේරක මගින් ප්‍රතික්‍රියා සීඝ්‍රතාව වෙනස් වන ආකාරය ගැටුම් වාදය ඇසුරින් ඉගෙන ගනිමු.\n\nඅපි ආරම්භ කරමුද?`;
      taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **தரம் 10 விஞ்ஞானம் — இரசாயனத் தாக்க வீதம்** ஆசிரியர்.\n\nசெறிவு, வெப்பநிலை, மேற்பரப்பளவு மற்றும் ஊக்கிகள் தாக்க வீதத்தை எவ்வாறு பாதிக்கின்றன என்பதை நாம் கற்கலாம்.\n\nநாம் தொடங்கலாமா?`;
      keyPoints = [
        'Collision Theory',
        'Effect of Temperature & Concentration',
        'Surface Area & Catalysts',
        'Measuring Reaction Rates'
      ];
    } else if (top.includes('motion') || top.includes('linear') || top.includes('sci-10-motion') || top === 'motion-in-a-straight-line') {
      enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for Grade 10 Science — Linear Motion**.\n\nI can guide you through displacement, velocity, acceleration, the equations of motion, and velocity-time graphs.\n\nWhat would you like to practice?`;
      siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **10 ශ්‍රේණිය විද්‍යාව — සරල රේඛීය චලිතය** ගුරුතුමා.\n\nවිස්ථාපනය, ප්‍රවේගය, ත්වරණය, චලිත සමීකරණ සහ ප්‍රවේග-කාල ප්‍රස්තාර පිළිබඳ ගැටළු විසඳීමට මම ඔබට උදව් කරන්නෙමි.\n\nඅපි කුමන කොටසින් පටන් ගනිමුද?`;
      taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **தரம் 10 விஞ்ஞானம் — நேர்கோட்டு இயக்கம்** ஆசிரியர்.\n\nஇடப்பெயர்ச்சி, வேகம், ஆர்முடுகல், இயக்கச் சமன்பாடுகள் மற்றும் வரைபடங்கள் பற்றி நாம் கற்கலாம்.\n\nநாம் எதிலிருந்து தொடங்கலாம்?`;
      keyPoints = [
        'Displacement & Velocity',
        'Acceleration & Deceleration',
        'Equations of Motion (v=u+at, s=ut+1/2at²)',
        'Velocity-Time Graph Interpretation'
      ];
    } else if (top.includes('chemical-bond') || top.includes('bond') || top.includes('ch10') || top.includes('ch-10')) {
      enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for Grade 10 Science — Chemical Bonds**.\n\nI can help you explore the Octet Rule, Ionic bonds (electron transfer), Covalent bonds (electron sharing), polar molecules, electronegativity, and Metallic bonding.\n\nWhat would you like to explore first?`;
      siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **10 ශ්‍රේණිය විද්‍යාව — රසායනික බන්ධන** ගුරුතුමා.\n\nඅෂ්ටක නියමය, අයනික බන්ධන (ඉලෙක්ට්‍රෝන හුවමාරුව), සහසංයුජ බන්ධන (ඉලෙක්ට්‍රෝන හවුලේ තබා ගැනීම), ධ්‍රැවීය අණු, විද්‍යුත් සෘණතාව සහ ලෝහක බන්ධන පිළිබඳ ඕනෑම කරුණක් මා සමඟ සාකච්ඡා කළ හැක.\n\nඅපි කුමන කරුණෙන් පටන් ගනිමුද?`;
      taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **தரம் 10 விஞ்ஞானம் — இரசாயனப் பிணைப்புகள்** ஆசிரியர்.\n\nஎண்ம விதி, அயன் பிணைப்புகள், பங்கீட்டுப் பிணைப்புகள் மற்றும் உலோகப் பிணைப்புகள் பற்றி நாம் கற்கலாம்.\n\nநாம் எதிலிருந்து தொடங்கலாம்?`;
      keyPoints = [
        'Octet Rule & Stability',
        'Ionic Bonding & Electron Transfer',
        'Covalent Bonding & Electron Sharing',
        'Electronegativity & Polar Molecules',
        'Metallic Bonding'
      ];
    } else if (top.includes('continuity') || top.includes('mitosis') || top.includes('ch14') || top.includes('ch-14')) {
      enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for Grade 10 Science — Continuity of Life**.\n\nI can help you explore Cell Division, Mitosis vs Meiosis, chromosome behaviors, diploid vs haploid daughter cells, and genetic variation.\n\nWhat would you like to explore first?`;
      siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **10 ශ්‍රේණිය විද්‍යාව — ජීවයේ අඛණ්ඩතාව** ගුරුතුමා.\n\nසෛල බෙදීම, අනුනනය (Mitosis) සහ ඌනනය (Meiosis), වර්ණදේහ චලනය, ද්විගුණ සහ ඒකගුණ සෛල මෙන්ම ප්‍රවේණික ප්‍රභේදනය පිළිබඳ කරුණු සාකච්ඡා කරමු.\n\nඅපි කුමන කොටසින් පටන් ගනිමුද?`;
      taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **தரம் 10 விஞ்ஞானம் — வாழ்க்கையின் தொடர்ச்சி** ஆசிரியர்.\n\nகலப்பிரிவு, இழையுருப்பிரிவு மற்றும் ஒடுக்கற்பிரிவு படிநிலைகள் பற்றி நாம் கற்கலாம்.\n\nநாம் எதிலிருந்து தொடங்கலாம்?`;
      keyPoints = [
        'Importance of Cell Division',
        'Mitosis (Stages & Daughter Cells)',
        'Meiosis (Stages & Genetic Variation)',
        'Diploid (2n) vs Haploid (n) Cells'
      ];
    } else {
      enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for Science**.\n\nWhat science topic would you like to explore together today?`;
      siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **විද්‍යාව** ගුරුතුමා.\n\nඅද අපි කුමන විද්‍යා පාඩමෙන් පටන් ගනිමුද?`;
      taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **விஞ்ஞானம்** ஆசிரியர்.\n\nநாம் இன்று எந்த விஞ்ஞானப் பாடத்திலிருந்து தொடங்கலாம்?`;
    }
  } else if (sub === 'history') {
    enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for Grade 10 History**.\n\nI'm here to guide you through your official 10 chapters: Sources of Studying History (Inscriptions & Epigraphy), Ancient Settlements, Political Power, Ancient Society, Science & Technology, Historical Knowledge, Decline of Dry Zone & South-West Kingdoms, Kandyan Kingdom, Renaissance, and Sri Lanka & the Western World.\n\nWould you like to start with Chapter 1: **Inscriptions (Sellipi)** or explore another topic?`;
    siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **10 ශ්‍රේණිය ඉතිහාසය** ගුරුතුමා. ඔබගේ 10 ශ්‍රේණියේ නිල ඉතිහාසය පෙළපොතෙහි පරිච්ඡේද 10 පිළිබඳ ඕනෑම කරුණක් මා සමඟ සාකච්ඡා කළ හැක.\n\nඅද අපි 1 වන පරිච්ඡේදයේ **සෙල්ලිපි (Inscriptions)** හෝ වෙනත් පාඩමකින් පටන් ගනිමුද?`;
    taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **தரம் 10 வரலாறு** ஆசிரியர். உங்கள் தரம் 10 வரலாற்றுப் பாடநூலின் 10 அத்தியாயங்கள் தொடர்பான எந்தவொரு கேள்வியையும் கேட்கலாம்.\n\nநாம் இன்று அத்தியாயம் 1 இன் **கல்வெட்டுகள் (Sellipi)** பற்றித் தொடங்கலாமா?`;
    keyPoints = [
      'Ch 1: Sources of Studying History (Inscriptions & Epigraphy)',
      'Ch 2: Early Settlements (Mesolithic to Proto-historic)',
      'Ch 3: Evolution of Political Power (Monarchy & Anuradhapura)',
      'Ch 4: Ancient Sri Lankan Society & Culture',
      'Ch 5: Science & Technology (Irrigation & Architecture)'
    ];
  } else if (sub === 'ict') {
    enGreeting = `Ayubowan ${studentName}! I am your **ATLAS Tutor for ${studentGradeLabel} ICT**.\n\nI'm here to help you learn and master your official Information & Communication Technology curriculum: Number Systems, Configuring Computers, Word Processing, Scratch Programming, Physical Computing, and the Internet.\n\nWhat ICT topic would you like to explore together today?`;
    siGreeting = `ආයුබෝවන් ${studentName}! මම ඔබගේ **තොරතුරු හා සන්නිවේදන තාක්ෂණය (ICT)** ගුරුතුමා. ඔබගේ නිල පෙළපොතෙහි පරිච්ඡේද 6 පිළිබඳ ඕනෑම කරුණක් මා සමඟ සාකච්ඡා කළ හැක.\n\nඅද අපි කුමන ICT පාඩමෙන් පටන් ගනිමුද?`;
    taGreeting = `வணக்கம் ${studentName}! நான் உங்கள் **தகவல் தொழில்நுட்ப (ICT)** ஆசிரியர். உங்கள் பாடநூலின் அத்தியாயங்கள் தொடர்பான உங்கள் சந்தேகங்களைக் கேளுங்கள்.\n\nநாம் இன்று எந்த ICT பாடத்திலிருந்து தொடங்கலாம்?`;
    keyPoints = [
      'Ch 1: Number Systems (Binary & Switches)',
      'Ch 2: Configuring Computers (Resolution)',
      'Ch 3: Word Processing (Justify Margins)',
      'Ch 4: Programming (Scratch Loops)',
      'Ch 5: Physical Computing (micro:bit)',
      'Ch 6: Internet (URL & Email Privacy)'
    ];
  }

  const primaryContent = language === 'si' ? siGreeting : language === 'ta' ? taGreeting : enGreeting;

  return {
    id: `msg-init-${sub}-${top}`,
    role: 'tutor',
    content: primaryContent,
    timestamp: new Date().toISOString(),
    suggestedActions: getCurriculumStarterPills(subjectId, topicId, language),
    languageVersions: {
      en: enGreeting,
      si: siGreeting,
      ta: taGreeting,
    },
    activeLang: language,
    keyPoints,
  };
}

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

  const [curriculumTopics, setCurriculumTopics] = useState<Topic[]>(() => MOCK_TOPICS);

  useEffect(() => {
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

  // Scoped topic resolution honoring URL subject first
  const foundTopic = findTopicResilient(curriculumTopics, paramTopic, paramSubject || undefined, grade);
  // Authoritative subject resolution: URL query param is primary, then topic subject, then student context
  const activeSubjectId = paramSubject || (foundTopic?.subjectId) || learningContext.subjectId || 'science';
  const defaultTopicForSubject = (sub?: string) => {
    if (sub === 'ict') return 'number-systems';
    if (sub === 'history') return 'history-gr10-sources';
    if (sub === 'maths') return 'maths-gr10-ch10-pythagoras';
    if (sub === 'science') return 'science-gr10-ch1-chemical-basis';
    return undefined;
  };
  const activeTopicId = (foundTopic && (!paramSubject || foundTopic.subjectId.toLowerCase() === paramSubject.toLowerCase())) 
    ? foundTopic.id 
    : (paramTopic || learningContext.topicId);
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
    if (chatContainerRef.current) {
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
    setMessages((prev) => prev.filter((m) => !m.content.includes('Offline Mock Mode Notice') && !m.id.includes('-err')));
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

    if (isSuperseded) {
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

    if (!hasAuthoritativeContext && (!activeTopicId || activeTopicId === 'default')) {
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
        suggestedActions: actionPills,
        tutorState: nextState,
        languageVersions: response.languageVersions,
        activeLang: language,
        memoryTrick: response.memoryTrick,
        keyPoints: response.keyPoints,
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
      content: language === 'si'
        ? `සංවාදය නැවත ආරම්භ කරන ලදී. ${studentName}, ඔබට ඊළඟට ඉගෙන ගැනීමට අවශ්‍ය කුමක්ද?`
        : language === 'ta'
        ? `உரையாடல் மீண்டும் தொடங்கப்பட்டது. ${studentName}, அடுத்து என்ன படிக்க விரும்புகிறீர்கள்?`
        : `Conversation restarted. What would you like to learn next, ${studentName}?`,
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

                    {/* Child-Friendly Citation Drawer */}
                    {msg.citations && msg.citations.length > 0 && (
                      <CitationDrawer citations={msg.citations} />
                    )}

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
            {/* Mic / Voice Input */}
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

            {/* Homework Photo Upload / Camera */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl hover:text-cyan-600 hover:bg-cyan-50 text-slate-400 transition-all flex items-center justify-center"
              title={language === 'si' ? 'පෙළපොත් ඡායාරූපයක් / Screenshot එකක් එක් කරන්න' : language === 'ta' ? 'பாடநூல் படம் / ஸ்கிரீன்ஷாட் சேர்க்க' : 'Upload textbook screenshot / photo'}
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Document Note Attachment / File Picker */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl hover:text-cyan-600 hover:bg-cyan-50 text-slate-400 transition-all hidden sm:flex items-center justify-center"
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
          topics={curriculumTopics}
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
