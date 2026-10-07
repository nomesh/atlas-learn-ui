// Production replacement for MockCurriculumCompanionPane.tsx (aliased in vite.config.ts for real production
// builds). LIVE renders LiveCompanionPane instead, so the prototype companion is never emitted into production.
import type React from 'react';
import type { CurriculumCompanionPaneProps } from './CurriculumCompanionPane';

export const MockCurriculumCompanionPane: React.FC<CurriculumCompanionPaneProps> = () => null;
