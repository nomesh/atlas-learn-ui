import assert from 'node:assert';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

// Release-safety gate for the immutable production artifact of learn.neuralworks.lk.
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const workflow = readFileSync(join(root, '.github/workflows/build-learn-ui-artifact.yml'), 'utf8').replace(/\r\n/g, '\n');
const lines = workflow.split('\n');
const code = lines.filter((line) => !line.trim().startsWith('#')).join('\n');

/** Text of the step whose `- name:` equals `name`, up to the next step. */
function step(name) {
  const start = lines.findIndex((line) => line.trim() === `- name: ${name}`);
  assert.ok(start >= 0, `workflow step "${name}" exists`);
  const end = lines.findIndex((line, i) => i > start && /^\s*-\s*name:/.test(line));
  return lines.slice(start, end < 0 ? lines.length : end).join('\n');
}

const stepIndex = (name) => lines.findIndex((line) => line.trim() === `- name: ${name}`);

test('ART-01: publishes only from main, on push or explicit dispatch', () => {
  assert.match(code, /on:\n {2}push:\n {4}branches:\n {6}- main\n {2}workflow_dispatch:/);
  assert.match(code, /if: github\.ref == 'refs\/heads\/main'/);
});

test('ART-02: uses only repository-scoped contents permission', () => {
  const block = code.match(/\npermissions:\n((?: {2}.*\n)+)/);
  assert.ok(block, 'top-level permissions block');
  const entries = block[1].trim().split('\n').map((line) => line.replace(/#.*/, '').trim());
  assert.deepStrictEqual(entries, ['contents: write']);
  assert.doesNotMatch(code, /id-token|pages:|packages:|actions: write|secrets\./);
  assert.match(step('Checkout exact source commit'), /persist-credentials: false/);
});

test('ART-03: builds the exact pushed commit and names the release after its full SHA', () => {
  assert.match(code, /SOURCE_SHA: \$\{\{ github\.sha \}\}/);
  assert.match(code, /RELEASE_TAG: learn-ui-build-\$\{\{ github\.sha \}\}/);
  assert.match(step('Checkout exact source commit'), /ref: \$\{\{ github\.sha \}\}/);
  assert.match(step('Refuse to overwrite an existing artifact'), /\^\[0-9a-f\]\{40\}\$/);
});

test('ART-04: the full npm test gate runs before the build and before publishing', () => {
  assert.match(step('Test'), /run: npm test\b/);
  assert.ok(stepIndex('Install dependencies') < stepIndex('Test'));
  assert.ok(stepIndex('Test') < stepIndex('Build'));
  assert.ok(stepIndex('Build') < stepIndex('Package artifact'));
  assert.ok(stepIndex('Package artifact') < stepIndex('Publish immutable release'));
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  for (const gate of ['lint', 'test:node', 'test:ui', 'verify:production', 'verify:pages-demo']) {
    assert.ok(pkg.scripts.test.includes(`npm run ${gate}`), `npm test runs ${gate}`);
  }
});

test('ART-05: the production build injects no VITE_* variables (LIVE, same-origin /api)', () => {
  const build = step('Build');
  assert.doesNotMatch(build, /VITE_|ATLAS_|env:/);
  assert.match(build, /npm run build/);
  assert.match(build, /test -s dist\/index\.html/);
  const verifier = readFileSync(join(root, 'scripts/verify-production-build.mjs'), 'utf8');
  assert.match(verifier, /'build-learn-ui-artifact\.yml'/, 'verify:production reproduces this workflow build');
});

test('ART-06: never overwrites, replaces or deletes a published artifact', () => {
  assert.match(step('Refuse to overwrite an existing artifact'), /git\/ref\/tags\/\$\{RELEASE_TAG\}/);
  assert.ok(stepIndex('Refuse to overwrite an existing artifact') < stepIndex('Publish immutable release'));
  assert.doesNotMatch(code, /--clobber|release delete|release edit|release upload|git push|git tag|production-learn-ui/);
  const publish = step('Publish immutable release');
  assert.match(publish, /gh release create "\$\{RELEASE_TAG\}" dist\.tar\.gz dist\.tar\.gz\.sha256 build-info\.json/);
  assert.match(publish, /--target "\$\{SOURCE_SHA\}"/);
});

test('ART-07: packages a checksum file and build-info.json recording the source SHA', () => {
  const pack = step('Package artifact');
  assert.match(pack, /sha256sum dist\.tar\.gz > dist\.tar\.gz\.sha256/);
  assert.match(pack, /scripts\/write-build-info\.mjs/);
  assert.match(pack, /--source-sha="\$\{SOURCE_SHA\}"/);
});

test('ART-08: Pages demo stays MOCK and is the only pages-demo build', () => {
  const pages = readFileSync(join(root, '.github/workflows/deploy-pages.yml'), 'utf8');
  assert.match(pages, /VITE_DEPLOYMENT_TARGET: pages-demo/);
  assert.doesNotMatch(code, /VITE_DEPLOYMENT_TARGET|pages-demo/);
});

test('ART-09: write-build-info records source SHA, archive checksum and entry-asset checksums', () => {
  const dir = mkdtempSync(join(tmpdir(), 'learn-ui-build-info-'));
  try {
    mkdirSync(join(dir, 'dist/assets'), { recursive: true });
    writeFileSync(join(dir, 'dist/index.html'),
      '<script type="module" src="/assets/index-abc.js"></script><link rel="stylesheet" href="/assets/index-def.css">');
    writeFileSync(join(dir, 'dist/assets/index-abc.js'), 'console.log(1)');
    writeFileSync(join(dir, 'dist/assets/index-def.css'), 'body{}');
    writeFileSync(join(dir, 'dist.tar.gz'), 'archive-bytes');
    const sha = 'a'.repeat(40);
    const run = (extra) => execFileSync(process.execPath, [join(root, 'scripts/write-build-info.mjs'),
      `--dist=${join(dir, 'dist')}`, `--archive=${join(dir, 'dist.tar.gz')}`, ...extra], { encoding: 'utf8' });
    const info = JSON.parse(run([`--source-sha=${sha}`, '--repository=nomesh/atlas-learn-ui']));
    const hash = (text) => createHash('sha256').update(text).digest('hex');

    assert.strictEqual(info.sourceSha, sha);
    assert.strictEqual(info.deploymentTarget, 'production');
    assert.strictEqual(info.archive.sha256, hash('archive-bytes'));
    assert.deepStrictEqual(info.entryAssets, [
      { path: '/assets/index-abc.js', sha256: hash('console.log(1)') },
      { path: '/assets/index-def.css', sha256: hash('body{}') },
    ]);
    assert.throws(() => run(['--source-sha=abc123']), /full 40-character/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
