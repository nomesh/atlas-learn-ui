// Start the Vite dev server in an explicit Tutor mode, independent of what .env / .env.local contain.
// Real process environment variables take precedence over every .env file in Vite.
//   npm run dev:live   -> VITE_USE_MOCK_API=false (real backend, real model)
//   npm run dev:mock   -> VITE_USE_MOCK_API=true  (offline fixtures, deterministic tests/E2E)
// A previously stored browser override (localStorage atlas_force_mock) still wins; the dev badge shows it.
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const mode = process.argv[2];
if (mode !== 'live' && mode !== 'mock') {
  console.error("Usage: node scripts/dev.mjs <live|mock>");
  process.exit(2);
}
const require = createRequire(import.meta.url);
const viteBin = join(dirname(require.resolve('vite/package.json')), 'bin', 'vite.js');
console.log(`[dev] Starting Vite in Tutor ${mode.toUpperCase()} mode (VITE_USE_MOCK_API=${mode === 'mock'})`);
const child = spawn(process.execPath, [viteBin, ...process.argv.slice(3)], {
  stdio: 'inherit',
  env: { ...process.env, VITE_USE_MOCK_API: mode === 'mock' ? 'true' : 'false' },
});
child.on('exit', (code) => process.exit(code ?? 0));
