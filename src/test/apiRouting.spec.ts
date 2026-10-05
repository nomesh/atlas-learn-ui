import { describe, expect, it } from 'vitest';
import { isLoopbackUrl, resolveApiBaseUrl } from '../api/apiBase';
import { PAGES_DEMO_TARGET, resolveTutorMode } from '../api/tutorMode';
import { apiClient } from '../api/client';

describe('browser API base', () => {
  it('defaults to same-origin when unset or blank', () => {
    expect(resolveApiBaseUrl({ isProd: true, configured: undefined })).toEqual({ baseURL: '', source: 'same-origin' });
    expect(resolveApiBaseUrl({ isProd: true, configured: '  ' })).toEqual({ baseURL: '', source: 'same-origin' });
    expect(resolveApiBaseUrl({ isProd: false, configured: '' })).toEqual({ baseURL: '', source: 'same-origin' });
  });

  it('never lets a production build target a loopback address', () => {
    for (const loopback of ['http://localhost:8080', 'http://localhost', 'https://127.0.0.1:8443/', 'http://0.0.0.0:8080', '//localhost:8080', 'http://[::1]:8080']) {
      expect(resolveApiBaseUrl({ isProd: true, configured: loopback })).toEqual({ baseURL: '', source: 'rejected-loopback-in-production' });
    }
  });

  it('keeps an explicit non-loopback base and allows loopback only in development', () => {
    expect(resolveApiBaseUrl({ isProd: true, configured: 'https://api.example.test/' })).toEqual({ baseURL: 'https://api.example.test', source: 'configured' });
    expect(resolveApiBaseUrl({ isProd: false, configured: 'http://localhost:8080' })).toEqual({ baseURL: 'http://localhost:8080', source: 'configured' });
  });

  it('recognises loopback hosts precisely', () => {
    expect(isLoopbackUrl('http://localhost:8080/api')).toBe(true);
    expect(isLoopbackUrl('http://127.0.0.42')).toBe(true);
    expect(isLoopbackUrl('https://localhost.example.com')).toBe(false);
    expect(isLoopbackUrl('https://learn.neuralworks.lk')).toBe(false);
    expect(isLoopbackUrl('/api')).toBe(false);
    expect(isLoopbackUrl(undefined)).toBe(false);
  });

  it('the shared client issues same-origin relative requests with the committed configuration', () => {
    expect(apiClient.defaults.baseURL).toBe('');
    expect(apiClient.getUri({ url: '/api/learn/tutor' })).toBe('/api/learn/tutor');
  });
});

describe('Tutor mode per deployment target', () => {
  const prod = { isProd: true, hasViteEnv: true, envFlag: 'true' as string | undefined };

  it('real production application is LIVE whatever env or browser override say', () => {
    for (const storedOverride of [null, 'true', 'false']) {
      for (const deploymentTarget of [undefined, '', 'production', 'learn', 'garbage']) {
        expect(resolveTutorMode({ ...prod, storedOverride, deploymentTarget })).toEqual({ mode: 'live', source: 'production-build' });
      }
    }
  });

  it('GitHub Pages demo build is MOCK whatever env or browser override say', () => {
    for (const storedOverride of [null, 'true', 'false']) {
      for (const envFlag of [undefined, 'true', 'false']) {
        expect(resolveTutorMode({ ...prod, envFlag, storedOverride, deploymentTarget: PAGES_DEMO_TARGET }))
          .toEqual({ mode: 'mock', source: 'pages-demo-build' });
      }
    }
  });

  it('the deployment target has no effect in development', () => {
    expect(resolveTutorMode({ isProd: false, hasViteEnv: true, storedOverride: null, envFlag: 'false', deploymentTarget: PAGES_DEMO_TARGET }).mode).toBe('live');
  });
});

describe('Visual Learning compatibility', () => {
  it('backend-owned relative preview URLs resolve against the page origin (nginx /api/ proxy)', () => {
    const preview = '/api/learn/resources/39a15ef0-614f-4d19-9e3f-091bdfece28b/pages/157/preview';
    expect(new URL(preview, 'https://learn.neuralworks.lk/tutor').href)
      .toBe('https://learn.neuralworks.lk/api/learn/resources/39a15ef0-614f-4d19-9e3f-091bdfece28b/pages/157/preview');
  });
});
