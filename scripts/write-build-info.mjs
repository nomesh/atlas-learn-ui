// Writes build-info.json for an immutable Learn UI artifact (see .github/workflows/build-learn-ui-artifact.yml).
// Records the exact source commit, the archive checksum and the checksum of every file the entry page
// references, so the deployment can verify what it activates and what learn.neuralworks.lk then serves.
//
//   node scripts/write-build-info.mjs --dist=dist --archive=dist.tar.gz --source-sha=<40 hex> \
//        --repository=owner/name --run-id=<id> --run-attempt=<n>
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, '').split('=');
    return [key, rest.join('=')];
  }),
);

const fail = (message) => {
  console.error(`write-build-info: ${message}`);
  process.exit(1);
};
const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');

if (!/^[0-9a-f]{40}$/.test(args['source-sha'] ?? '')) fail('--source-sha must be a full 40-character commit SHA');
const dist = args.dist || 'dist';
const indexPath = join(dist, 'index.html');
if (!existsSync(indexPath)) fail(`${indexPath} not found`);
if (!args.archive || !existsSync(args.archive)) fail('--archive must name the packaged dist archive');

const indexHtml = readFileSync(indexPath, 'utf8');
const entryAssets = [...indexHtml.matchAll(/(?:src|href)="(\/assets\/[^"]+\.(?:js|css))"/g)].map((m) => m[1]);
if (!entryAssets.some((asset) => asset.endsWith('.js'))) fail('index.html references no /assets/*.js entry bundle');

const info = {
  schema: 1,
  product: 'atlas-learn-ui',
  deploymentTarget: 'production',
  sourceSha: args['source-sha'],
  repository: args.repository || null,
  workflowRunId: args['run-id'] || null,
  workflowRunAttempt: args['run-attempt'] || null,
  builtAt: new Date().toISOString(),
  archive: { file: 'dist.tar.gz', sha256: sha256(args.archive) },
  indexHtmlSha256: sha256(indexPath),
  entryAssets: entryAssets.map((path) => ({ path, sha256: sha256(join(dist, path)) })),
};
process.stdout.write(`${JSON.stringify(info, null, 2)}\n`);
