/**
 * Browser API base resolution: the single source of truth for where axios sends `/api/...` requests.
 *
 *  - Unset / empty (the default everywhere)  -> '' : same-origin relative requests.
 *      development: Vite's dev proxy forwards /api to the local backend (vite.config.ts).
 *      production : learn.neuralworks.lk nginx forwards /api/ to the backend on the server.
 *  - An explicit VITE_API_BASE_URL is honoured (e.g. a remote dev backend), EXCEPT that a production
 *    build never targets a loopback address: on a student's machine localhost / 127.0.0.1 is their
 *    own computer, never the ATLAS backend. Such a value falls back to same-origin.
 *
 * The backend's internal host/port belongs to nginx / the dev proxy, never to the browser.
 */
export type ApiBaseSource = 'same-origin' | 'configured' | 'rejected-loopback-in-production';

export interface ApiBaseResolution {
  baseURL: string;
  source: ApiBaseSource;
}

const LOOPBACK_URL = /^(?:[a-z][a-z0-9+.-]*:)?\/\/(?:localhost|127(?:\.\d{1,3}){3}|0\.0\.0\.0|\[::1?\])(?::\d+)?(?:[/?#]|$)/i;

/** True for absolute (or protocol-relative) URLs that point at the local machine. */
export function isLoopbackUrl(value: string | undefined | null): boolean {
  return !!value && LOOPBACK_URL.test(value.trim());
}

export function resolveApiBaseUrl(input: { isProd: boolean; configured: string | undefined | null }): ApiBaseResolution {
  const configured = input.configured?.trim() ?? '';
  if (!configured) return { baseURL: '', source: 'same-origin' };
  if (input.isProd && isLoopbackUrl(configured)) return { baseURL: '', source: 'rejected-loopback-in-production' };
  return { baseURL: configured.replace(/\/+$/, ''), source: 'configured' };
}
