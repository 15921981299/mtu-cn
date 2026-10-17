#!/usr/bin/env node
/**
 * Build entry point.
 *
 * Three steps, in order, all of which must run:
 *
 *   1. `node scripts/build-catalogs.mjs` — regenerates the downloadable catalog
 *      PDFs in public/downloads/ and the manifest src/data/download-catalogs.json.
 *      /catalog/ hard-fails the build if a PDF in that manifest is missing, so
 *      this step has to come first.
 *   2. `astro build` — the pages.
 *   3. `node scripts/create-worker-entry.mjs` — the Worker/redirects hand-off.
 *      dist/_redirects is what retires 442 old URLs, so a build that generates
 *      pages but skips the merge ships a site whose old paths all answer 404 —
 *      the exact accident that took eagle-engine.com to zero.
 *
 * Chaining them with `&&` made that failure silent: any non-zero exit from step 2
 * skipped step 3, and the deployment looked fine. So run all of them, always,
 * and exit with the first non-zero status so a real failure still fails loudly.
 *
 * BUILD_STARTED_AT_MS is handed to the hand-off step so it can prove the
 * sitemap it sees was written by THIS build rather than left over from an
 * earlier one (see the freshness assertion in scripts/create-worker-entry.mjs).
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const BUILD_STARTED_AT_MS = Date.now();

/**
 * Async spawn, deliberately — do not "simplify" this back to spawnSync.
 *
 * `spawnSync` returns `{ status: null, error: EBUSY }` for every target in the
 * WorkBuddy sandbox: bare name or absolute path, `shell: true` or `false`, node
 * or astro. The old code read `pages.status || handoff.status || 0`, so under
 * that failure it exited 0 having built nothing — a silent no-op, which is
 * exactly the class of accident the note above exists to prevent. The async API
 * is unaffected, so the steps are awaited in sequence instead. Same ordering,
 * same inherited stdio, and a child that cannot be started is now a hard error.
 */
function run(command, env) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, { stdio: 'inherit', shell: true, env });
    child.on('error', rejectRun);
    child.on('close', (code, signal) => resolveRun({ command, status: code, signal }));
  });
}

/**
 * Sandbox accommodation (local dev only).
 *
 * Astro's `cleanServerOutput()` deletes its own SSR chunks with an unguarded
 * `fs.promises.rm`; if that rejects, `astro:build:done` never runs and the
 * sitemap is silently left stale. WorkBuddy's sandbox can make those deletes
 * reject, so when its shim is present we append a second `--require` that
 * tolerates only that one refusal. On a normal machine NODE_OPTIONS is passed
 * through untouched.
 */
const existingNodeOptions = process.env.NODE_OPTIONS || '';
const SANDBOX_SHIM = 'node-language-shim.cjs';
const toleranceShim = resolve('scripts/astro-clean-tolerance.cjs');
let nodeOptions = existingNodeOptions;
if (existingNodeOptions.includes(SANDBOX_SHIM) && existsSync(toleranceShim)) {
  const shimPath = toleranceShim.replace(/\\/g, '/');
  nodeOptions = `${existingNodeOptions} --require="${shimPath}"`;
}

const env = {
  ...process.env,
  NODE_OPTIONS: nodeOptions,
  BUILD_STARTED_AT_MS: String(BUILD_STARTED_AT_MS),
};

const STEPS = [
  ['node scripts/build-catalogs.mjs', 'catalog PDFs + manifest'],
  ['astro build', 'pages'],
  ['node scripts/create-worker-entry.mjs', 'Worker/redirects hand-off'],
];

const results = [];
for (const [command, label] of STEPS) {
  try {
    results.push({ ...(await run(command, env)), label });
  } catch (error) {
    console.error(
      `\n! could not start the ${label} step (\`${command}\`): ${error.code || error.message}.\n` +
        '  Nothing after this point ran, so dist/ is NOT a complete build.'
    );
    process.exit(1);
  }
}

const describe = (result) => (result.signal ? `killed by ${result.signal}` : `exit ${result.status}`);

for (const result of results.filter((r) => r.signal || r.status !== 0)) {
  console.error(`\n! the ${result.label} step did not succeed (${describe(result)}).`);
}

const firstFailure = results.find((r) => r.signal || r.status !== 0);
process.exit(firstFailure ? firstFailure.status || 1 : 0);
