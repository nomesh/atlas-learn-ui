// Production configuration guard. Reproduces a real deployment build and fails if it would ship a
// browser that talks to the wrong place or runs the wrong Tutor mode.
//
//   npm run verify:production  -> the real application (learn.neuralworks.lk):
//        built with the env block of the "Build" step of .github/workflows/build-learn-ui-artifact.yml
//        (read from the workflow; it injects no VITE_* variables), so only committed .env files apply.
//        That workflow publishes the immutable artifact that production deploys.
//        Must be: same-origin API base, Tutor LIVE (also with the browser mock override set),
//        no loopback API target anywhere in the emitted JavaScript.
//   npm run verify:pages-demo  -> the GitHub Pages demo:
//        built with the env block of .github/workflows/deploy-pages.yml (read from the workflow).
//        Must be: Tutor MOCK (intentional standalone demo), no loopback API target.
//
// The mode/API checks evaluate the effective inlined configuration through the very resolvers the
// browser bundle executes (src/api/tutorMode.ts, src/api/apiBase.ts); the bundle scan inspects the
// built artifacts. Run with: node --import tsx scripts/verify-production-build.mjs --target=<target>
import { readFileSync, readdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, loadEnv } from 'vite';
import { isLoopbackUrl, resolveApiBaseUrl } from '../src/api/apiBase.ts';
import { resolveTutorMode } from '../src/api/tutorMode.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const target = (process.argv.find((a) => a.startsWith('--target=')) || '--target=production').split('=')[1];
if (target !== 'production' && target !== 'pages-demo') {
  console.error('Usage: verify-production-build.mjs --target=<production|pages-demo>');
  process.exit(2);
}

/** Env vars a GitHub Actions step sets for `npm run build`, read from the workflow file itself. */
function workflowBuildEnv(workflowPath) {
  const lines = readFileSync(workflowPath, 'utf8').split(/\r?\n/);
  const start = lines.findIndex((l) => /^\s*-\s*name:\s*Build\s*$/.test(l));
  if (start < 0) throw new Error(`No "Build" step in ${workflowPath}`);
  const vars = {};
  for (let i = start + 1; i < lines.length && !/^\s*-\s*name:/.test(lines[i]); i++) {
    const m = lines[i].match(/^\s+((?:VITE|ATLAS)_[A-Z0-9_]+):\s*"?([^"#]*?)"?\s*$/);
    if (m) vars[m[1]] = m[2];
  }
  return vars;
}

// 1. Reproduce the deployment's build environment: nothing from this machine leaks in.
for (const key of Object.keys(process.env)) {
  if (key.startsWith('VITE_') || key.startsWith('ATLAS_')) delete process.env[key];
}
const workflowFile = target === 'pages-demo' ? 'deploy-pages.yml' : 'build-learn-ui-artifact.yml';
const injected = workflowBuildEnv(join(root, '.github/workflows', workflowFile));
Object.assign(process.env, injected);
process.chdir(root);

// 2. Effective VITE_* values exactly as `vite build` inlines them (committed .env files + injected env).
const env = loadEnv('production', root);

// 3. Real production build (vite.config.ts's own loopback guard runs here too).
const outDir = mkdtempSync(join(tmpdir(), `atlas-learn-${target}-`));
const failures = [];
try {
  await build({ root, mode: 'production', logLevel: 'error', build: { outDir, emptyOutDir: true } });
} catch (error) {
  failures.push(`vite build failed: ${error.message}`);
}

// 4a. Browser API base.
const api = resolveApiBaseUrl({ isProd: true, configured: env.VITE_API_BASE_URL });
if (isLoopbackUrl(env.VITE_API_BASE_URL)) failures.push(`VITE_API_BASE_URL is a loopback address: ${env.VITE_API_BASE_URL}`);
if (api.baseURL !== '') failures.push(`browser API base is "${api.baseURL}", expected same-origin ""`);

// 4b. Tutor mode, with and without the browser override (localStorage atlas_force_mock).
const expectedMode = target === 'production' ? 'live' : 'mock';
const modes = [null, 'true', 'false'].map((storedOverride) => ({
  storedOverride,
  ...resolveTutorMode({
    isProd: true,
    hasViteEnv: true,
    storedOverride,
    envFlag: env.VITE_USE_MOCK_API,
    deploymentTarget: env.VITE_DEPLOYMENT_TARGET,
  }),
}));
for (const m of modes) {
  if (m.mode !== expectedMode) {
    failures.push(`Tutor mode ${m.mode.toUpperCase()} (source ${m.source}) with override=${m.storedOverride}; expected ${expectedMode.toUpperCase()}`);
  }
}

// 4c. Emitted JavaScript/HTML: no loopback host with a port or 127.x / 0.0.0.0 address. (A bare
// "http://localhost" with no port is a URL-parsing default inside react-router/axios, not an API target.)
const LOOPBACK_TARGET = /(?:https?:)?\/\/(?:localhost:\d+|127(?:\.\d{1,3}){3}(?::\d+)?|0\.0\.0\.0(?::\d+)?|\[::1\](?::\d+)?)/g;
const bundleHits = [];
let scanned = 0;
let bundleText = '';
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (/\.(m?js|html)$/.test(entry.name)) {
      scanned++;
      const text = readFileSync(path, 'utf8');
      bundleText += text;
      for (const m of text.matchAll(LOOPBACK_TARGET)) {
        bundleHits.push(`${entry.name}: …${text.slice(Math.max(0, m.index - 60), m.index + m[0].length + 20)}…`);
      }
    }
  }
};

// 4d. Prototype curriculum (MOCK catalogue, fallback textbook list, lesson steps, scripted offline Tutor) must not be
// emitted into the real application bundle; the Pages demo must keep it. Markers are taken from the mock modules
// themselves: every learner-visible prototype text plus every catalogue-qualified topic id (grade/chapter in the id).
// Generic slugs (e.g. "photosynthesis") also key dead-in-LIVE widget switches, so they are reported, not failed on.
const { MOCK_TOPICS, MOCK_SUBJECTS, FALLBACK_CURRICULUM_RESOURCES, LESSON_STEPS_BY_TOPIC } = await import('../src/mocks/curriculumData.ts');
const { MOCK_SIMULATED_VOICE_PROMPT } = await import('../src/features/tutor/mockTutorContent.ts');
const topicIds = MOCK_TOPICS.map((t) => t.id).filter((id) => id.length > 12);
const isCatalogueId = (id) => /(?:gr|grade-?)\d|ch\d|sci-\d|-\d+-/.test(id);
const genericSlugs = topicIds.filter((id) => !isCatalogueId(id));
const prototypeMarkers = [
  ...new Set([
    ...topicIds.filter(isCatalogueId),
    ...MOCK_TOPICS.flatMap((t) => [t.title?.en, t.description?.en]).filter((x) => x && x.length > 18),
    ...MOCK_SUBJECTS.map((s) => s.description.en).filter((d) => d && d.length > 20),
    ...Object.values(LESSON_STEPS_BY_TOPIC).flat().flatMap((st) => [st.title?.en, st.concept?.en?.slice(0, 60)]).filter((x) => x && x.length > 18),
    ...FALLBACK_CURRICULUM_RESOURCES.map((r) => r.checksumSha256),
    'Offline Mock Mode Notice',
    // Scripted microphone "capture" of the demo: LIVE has no speech recognition and must never insert it.
    MOCK_SIMULATED_VOICE_PROMPT,
    'voice-input-demo',
  ]),
];
let markersFound = [];
let slugsFound = [];
if (!failures.some((f) => f.startsWith('vite build failed'))) {
  walk(outDir);
  if (scanned === 0) failures.push('no built JavaScript/HTML found to inspect');
  for (const hit of bundleHits) failures.push(`loopback target in built bundle: ${hit}`);
  markersFound = prototypeMarkers.filter((m) => bundleText.includes(m));
  slugsFound = genericSlugs.filter((m) => bundleText.includes(m));
  if (target === 'production' && markersFound.length > 0) {
    failures.push(`prototype curriculum leaked into the production bundle (${markersFound.length} markers, e.g. ${markersFound.slice(0, 3).join(', ')})`);
  }
  if (target === 'pages-demo' && markersFound.length === 0) {
    failures.push('Pages demo bundle lost its MOCK catalogue');
  }
}
rmSync(outDir, { recursive: true, force: true });

console.log(`[verify:${target}] injected build env: ${JSON.stringify(injected)}`);
console.log(`[verify:${target}] effective VITE_API_BASE_URL=${JSON.stringify(env.VITE_API_BASE_URL)} -> browser API base ${JSON.stringify(api.baseURL)} (${api.source})`);
console.log(`[verify:${target}] effective VITE_DEPLOYMENT_TARGET=${JSON.stringify(env.VITE_DEPLOYMENT_TARGET)} VITE_USE_MOCK_API=${JSON.stringify(env.VITE_USE_MOCK_API)}`);
console.log(`[verify:${target}] Tutor mode: ${modes.map((m) => `override=${m.storedOverride} -> ${m.mode.toUpperCase()} (${m.source})`).join('; ')}`);
console.log(`[verify:${target}] scanned ${scanned} built files, loopback API targets found: ${bundleHits.length}`);
console.log(`[verify:${target}] prototype curriculum markers in bundle: ${markersFound.length} of ${prototypeMarkers.length} (${target === 'production' ? 'expected 0' : 'expected > 0'})`);
console.log(`[verify:${target}] generic topic slugs present (informational): ${slugsFound.length} of ${genericSlugs.length}${slugsFound.length ? ` (${slugsFound.join(', ')})` : ''}`);
if (failures.length) {
  console.error(`[verify:${target}] FAILED:\n  - ${failures.join('\n  - ')}`);
  process.exit(1);
}
console.log(`[verify:${target}] PASSED`);
