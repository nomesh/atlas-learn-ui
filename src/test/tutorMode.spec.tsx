import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { formatTutorLabel, resolveTutorMode } from '../api/tutorMode';
import type { TutorModeInputs } from '../api/tutorMode';
import { tutorService } from '../api/tutorApi';
import { apiClient } from '../api/client';
import { TutorRuntimeBadge } from '../components/dev/TutorRuntimeBadge';

const base: TutorModeInputs = { isProd: false, hasViteEnv: true, storedOverride: null, envFlag: undefined };

describe('resolveTutorMode', () => {
  it('production is always LIVE, even if env or localStorage ask for mock', () => {
    for (const storedOverride of [null, 'true', 'false']) {
      for (const envFlag of [undefined, 'true', 'false', 'garbage']) {
        const r = resolveTutorMode({ ...base, isProd: true, storedOverride, envFlag });
        expect(r).toEqual({ mode: 'live', source: 'production-build' });
      }
    }
  });

  it('env true -> MOCK, env false -> LIVE (case/whitespace tolerant)', () => {
    expect(resolveTutorMode({ ...base, envFlag: 'true' })).toEqual({ mode: 'mock', source: 'env:VITE_USE_MOCK_API=true' });
    expect(resolveTutorMode({ ...base, envFlag: ' TRUE ' }).mode).toBe('mock');
    expect(resolveTutorMode({ ...base, envFlag: 'false' })).toEqual({ mode: 'live', source: 'env:VITE_USE_MOCK_API=false' });
  });

  it('unset, empty or invalid env in a Vite build is LIVE, never silently MOCK', () => {
    expect(resolveTutorMode({ ...base, envFlag: undefined })).toEqual({ mode: 'live', source: 'env:unset-defaults-to-live' });
    expect(resolveTutorMode({ ...base, envFlag: '' }).mode).toBe('live');
    expect(resolveTutorMode({ ...base, envFlag: 'ture' })).toEqual({ mode: 'live', source: 'env:invalid-defaults-to-live' });
    expect(resolveTutorMode({ ...base, envFlag: '1' }).mode).toBe('live');
  });

  it('a stored browser override beats env in development and is reported as an override', () => {
    expect(resolveTutorMode({ ...base, envFlag: 'false', storedOverride: 'true' })).toEqual({ mode: 'mock', source: 'localStorage-override' });
    expect(resolveTutorMode({ ...base, envFlag: 'true', storedOverride: 'false' })).toEqual({ mode: 'live', source: 'localStorage-override' });
    expect(resolveTutorMode({ ...base, envFlag: 'true', storedOverride: 'junk' }).source).toBe('env:VITE_USE_MOCK_API=true');
  });

  it('plain Node test runs (no Vite env) default to MOCK, as the node:test suites expect', () => {
    expect(resolveTutorMode({ ...base, hasViteEnv: false })).toEqual({ mode: 'mock', source: 'node-test-default' });
  });
});

describe('formatTutorLabel', () => {
  it('labels MOCK, LIVE with runtime, and LIVE without runtime', () => {
    expect(formatTutorLabel({ mode: 'mock', source: 'env:VITE_USE_MOCK_API=true', hasStoredOverride: false })).toBe('Tutor: MOCK');
    expect(
      formatTutorLabel({ mode: 'live', source: 'env:VITE_USE_MOCK_API=false', hasStoredOverride: false, runtime: { provider: 'OLLAMA_CLOUD', model: 'nemotron-3-super:cloud' } })
    ).toBe('Tutor: LIVE · OLLAMA_CLOUD · nemotron-3-super:cloud');
    expect(formatTutorLabel({ mode: 'live', source: 'env:VITE_USE_MOCK_API=false', hasStoredOverride: false })).toBe('Tutor: LIVE · model not reported yet');
  });
});

describe('TutorRuntimeBadge (development only)', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    localStorage.clear();
  });

  it('shows "Tutor: MOCK" in mock mode and "Tutor: LIVE" in live mode', () => {
    act(() => tutorService.setMockMode(true));
    render(<TutorRuntimeBadge />);
    expect(screen.getByTestId('tutor-runtime-label').textContent).toBe('Tutor: MOCK');
    expect(screen.getByTestId('tutor-runtime-badge').getAttribute('data-mode')).toBe('mock');
    expect(screen.getByTestId('tutor-runtime-source').textContent).toContain('backend bypassed');

    act(() => tutorService.setMockMode(false));
    expect(screen.getByTestId('tutor-runtime-label').textContent).toBe('Tutor: LIVE · model not reported yet');
    expect(screen.getByTestId('tutor-runtime-badge').getAttribute('data-mode')).toBe('live');
  });

  it('shows provider and model once the live backend reports them', async () => {
    act(() => tutorService.setMockMode(false));
    vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: { answer: 'ok', sources: [], metadata: { llmProvider: 'OLLAMA_CLOUD', llmModel: 'nemotron-3-super:cloud' } },
    } as never);
    render(<TutorRuntimeBadge />);
    await act(async () => {
      await tutorService.askTutor('q', { subjectId: 'science', grade: 'grade-10', language: 'en', conversationId: 'c1' } as never);
    });
    expect(screen.getByTestId('tutor-runtime-label').textContent).toBe('Tutor: LIVE · OLLAMA_CLOUD · nemotron-3-super:cloud');
  });

  it('forgets the reported model when switching to mock (fixtures are never labelled as a model)', async () => {
    act(() => tutorService.setMockMode(false));
    vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: { answer: 'ok', sources: [], metadata: { llmProvider: 'OLLAMA_CLOUD', llmModel: 'm' } },
    } as never);
    await act(async () => {
      await tutorService.askTutor('q', { subjectId: 'science', grade: 'grade-10', language: 'en', conversationId: 'c1' } as never);
    });
    act(() => tutorService.setMockMode(true));
    render(<TutorRuntimeBadge />);
    expect(screen.getByTestId('tutor-runtime-label').textContent).toBe('Tutor: MOCK');
    act(() => tutorService.setMockMode(false));
    expect(screen.getByTestId('tutor-runtime-label').textContent).toBe('Tutor: LIVE · model not reported yet');
  });

  it('offers to clear a persisted override', () => {
    act(() => tutorService.setMockMode(true));
    const reload = vi.fn();
    Object.defineProperty(window, 'location', { value: { ...window.location, reload }, writable: true });
    render(<TutorRuntimeBadge />);
    fireEvent.click(screen.getByTestId('tutor-runtime-clear-override'));
    expect(localStorage.getItem('atlas_force_mock')).toBeNull();
    expect(reload).toHaveBeenCalled();
  });

  it('renders nothing in a production build', () => {
    vi.stubEnv('PROD', true);
    const { container } = render(<TutorRuntimeBadge />);
    expect(container.innerHTML).toBe('');
  });
});
