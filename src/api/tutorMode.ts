/**
 * Tutor mode resolution: the single, pure source of truth for "does this build talk to the
 * real backend (LIVE) or to offline fixtures (MOCK)?".
 *
 * Three distinct situations, deliberately hard to confuse:
 *  1. production build      -> always LIVE. Mock can never be enabled (not by env, not by localStorage).
 *  2. development, LIVE     -> real backend and real model. `npm run dev:live`.
 *  3. development, MOCK     -> offline fixtures only, for deterministic tests/E2E. `npm run dev:mock`.
 *
 * Precedence in development (highest first):
 *  a. localStorage `atlas_force_mock` (set by the in-app toggle; persists across reloads, so it is
 *     always reported as an "override" and can be cleared from the dev badge)
 *  b. VITE_USE_MOCK_API = 'true' | 'false'
 *  c. anything else inside a Vite browser build (unset, empty, typo) -> LIVE, reported as invalid/unset.
 *     A typo must never silently put a developer on fixtures.
 *  d. no Vite env at all (plain Node, e.g. node:test suites) -> MOCK, because there is no backend.
 */
export type TutorMode = 'live' | 'mock';

export type TutorModeSource =
  | 'production-build'
  | 'localStorage-override'
  | 'env:VITE_USE_MOCK_API=true'
  | 'env:VITE_USE_MOCK_API=false'
  | 'env:unset-defaults-to-live'
  | 'env:invalid-defaults-to-live'
  | 'node-test-default';

export interface TutorModeResolution {
  mode: TutorMode;
  source: TutorModeSource;
}

export interface TutorModeInputs {
  /** import.meta.env.PROD */
  isProd: boolean;
  /** true when running under Vite (import.meta.env exists); false in plain Node test runs */
  hasViteEnv: boolean;
  /** localStorage 'atlas_force_mock' (null when absent or unavailable) */
  storedOverride: string | null;
  /** import.meta.env.VITE_USE_MOCK_API (undefined when unset) */
  envFlag: string | undefined;
}

export function resolveTutorMode(input: TutorModeInputs): TutorModeResolution {
  if (input.isProd) return { mode: 'live', source: 'production-build' };

  if (input.storedOverride === 'true' || input.storedOverride === 'false') {
    return { mode: input.storedOverride === 'true' ? 'mock' : 'live', source: 'localStorage-override' };
  }

  if (!input.hasViteEnv) return { mode: 'mock', source: 'node-test-default' };

  const flag = input.envFlag?.trim().toLowerCase();
  if (flag === 'true') return { mode: 'mock', source: 'env:VITE_USE_MOCK_API=true' };
  if (flag === 'false') return { mode: 'live', source: 'env:VITE_USE_MOCK_API=false' };
  if (flag === undefined || flag === '') return { mode: 'live', source: 'env:unset-defaults-to-live' };
  return { mode: 'live', source: 'env:invalid-defaults-to-live' };
}

/** Runtime facts reported by the backend about the model that produced the last answer. */
export interface TutorRuntimeInfo {
  provider?: string;
  model?: string;
}

export interface TutorModeInfo extends TutorModeResolution {
  /** Last model reported by the backend (LIVE only; undefined until an answer arrives or if not reported). */
  runtime?: TutorRuntimeInfo;
  /** Override currently stored in localStorage, if any. */
  hasStoredOverride: boolean;
}

/** One-line label used by the dev badge and console. */
export function formatTutorLabel(info: TutorModeInfo): string {
  if (info.mode === 'mock') return 'Tutor: MOCK';
  const provider = info.runtime?.provider;
  const model = info.runtime?.model;
  if (provider && model) return `Tutor: LIVE · ${provider} · ${model}`;
  return 'Tutor: LIVE · model not reported yet';
}
