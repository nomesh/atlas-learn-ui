import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// A signed-in learner whose context reports backend progress figures (what the profile API returns today).
const studentState: Record<string, unknown> = {
  studentName: 'Kasun Perera', grade: 'grade-10', setGrade: vi.fn(), language: 'en', setLanguage: vi.fn(),
  streakDays: 5, topicsMastered: 14, questionsAnswered: 52, accuracyPercent: 94,
  openProfileEditor: vi.fn(), isAuthenticated: true, studentId: 'ATL-26-009999', accountStatus: 'ACTIVE',
  registeredGrade: 'grade-10', login: vi.fn(), logout: vi.fn(), setIsDeviceModalOpen: vi.fn(), isDeviceModalOpen: false,
  currentUser: { id: 'u-1', email: '', displayName: 'Kasun Perera' }, isGuestPreview: false,
};
vi.mock('../state/studentContext', () => ({ useStudent: () => studentState }));
vi.mock('../api/client', () => ({ apiClient: { get: vi.fn(() => Promise.resolve({ data: [] })), post: vi.fn(), delete: vi.fn() } }));

import '../i18n';
import { tutorService } from '../api/tutorApi';
import { Header } from '../components/layout/Header';

const renderHeader = () =>
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );

describe('LIVE header shows no fabricated streak or progress', () => {
  afterEach(cleanup);

  it('LIVE: no streak even when the context reports one', () => {
    tutorService.setMockMode(false);
    const { container } = renderHeader();
    expect(container.querySelector('[title="Consecutive Learning Days"]')).toBeNull();
    expect(container.textContent).not.toMatch(/\b5d\b|\b14\b|\b52\b|94\s?%/);
  });

  it('Pages demo (MOCK) keeps its streak presentation', () => {
    tutorService.setMockMode(true);
    try {
      const { container } = renderHeader();
      expect(container.querySelector('[title="Consecutive Learning Days"]')?.textContent).toContain('5d');
    } finally {
      tutorService.setMockMode(false);
    }
  });
});
