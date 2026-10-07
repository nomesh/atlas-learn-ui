import React from 'react';
import type { Topic } from '../../types';
import { isMockCurriculum } from '../../curriculum/liveCurriculum';
import { LiveCompanionPane } from '../../curriculum/LiveCurriculumViews';
import { MockCurriculumCompanionPane } from './MockCurriculumCompanionPane';

export interface CurriculumCompanionPaneProps {
  subjectId: string;
  topicId?: string;
  topics?: Topic[];
  language: 'en' | 'si' | 'ta';
  activeModeHint?: string;
  onAskQuestion: (query: string) => void;
  onSelectTopic: (newTopicId: string) => void;
}

/** LIVE: availability facts only; no static "Textbook Grounded" badges, lesson steps, page ranges or simulations. */
export const CurriculumCompanionPane: React.FC<CurriculumCompanionPaneProps> = (props) =>
  isMockCurriculum() ? <MockCurriculumCompanionPane {...props} /> : <LiveCompanionPane subjectId={props.subjectId} language={props.language} />;
