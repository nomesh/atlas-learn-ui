import React, { useSyncExternalStore } from 'react';
import { tutorService } from '../../api/tutorApi';
import { formatTutorLabel } from '../../api/tutorMode';
import type { TutorModeSource } from '../../api/tutorMode';

const SOURCE_TEXT: Record<TutorModeSource, string> = {
  'production-build': 'production build',
  'pages-demo-build': 'GitHub Pages demo build',
  'localStorage-override': 'localStorage override (atlas_force_mock)',
  'env:VITE_USE_MOCK_API=true': 'VITE_USE_MOCK_API=true',
  'env:VITE_USE_MOCK_API=false': 'VITE_USE_MOCK_API=false',
  'env:unset-defaults-to-live': 'VITE_USE_MOCK_API unset, defaults to live',
  'env:invalid-defaults-to-live': 'VITE_USE_MOCK_API invalid, defaulting to live',
  'node-test-default': 'test default',
};

/**
 * Development-only indicator. Rendered by AppShell behind `!import.meta.env.PROD`, and also
 * self-guards, so it can never appear in a production build.
 */
export const TutorRuntimeBadge: React.FC = () => {
  const info = useSyncExternalStore(tutorService.subscribe, tutorService.getModeInfo, tutorService.getModeInfo);

  if (import.meta.env.PROD) return null;

  const isMock = info.mode === 'mock';
  const label = formatTutorLabel(info);

  return (
    <div
      data-testid="tutor-runtime-badge"
      data-mode={info.mode}
      className={`fixed bottom-3 left-3 z-[100] max-w-[92vw] rounded-lg border px-3 py-1.5 text-[11px] font-bold shadow-lg ${
        isMock
          ? 'bg-amber-100 text-amber-900 border-amber-400'
          : 'bg-emerald-100 text-emerald-900 border-emerald-500'
      }`}
      title={`DEV ONLY. Mode source: ${SOURCE_TEXT[info.source]}.${
        isMock ? ' Tutor chat answers come from offline fixtures; the backend is bypassed.' : ''
      } Note: Teach Me lesson steps and simulations are static frontend content in every mode; only Tutor chat answers use the backend.`}
    >
      <div className="flex items-center gap-2">
        <span className={`inline-block h-2 w-2 rounded-full ${isMock ? 'bg-amber-500' : 'bg-emerald-500'}`} />
        <span data-testid="tutor-runtime-label">{label}</span>
        {info.hasStoredOverride && (
          <button
            type="button"
            data-testid="tutor-runtime-clear-override"
            onClick={() => {
              tutorService.clearModeOverride();
              window.location.reload();
            }}
            className="rounded border border-current px-1.5 py-0.5 text-[10px] font-semibold hover:bg-white/50"
            title="Remove the persisted toggle override and use .env settings (reloads the page)"
          >
            clear override
          </button>
        )}
      </div>
      <div className="mt-0.5 font-normal opacity-80" data-testid="tutor-runtime-source">
        {isMock ? 'fixtures only, backend bypassed · ' : ''}
        source: {SOURCE_TEXT[info.source]}
        {isMock ? '' : ' · DEV'}
      </div>
    </div>
  );
};

export default TutorRuntimeBadge;
