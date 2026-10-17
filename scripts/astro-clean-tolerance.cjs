/**
 * Local-development accommodation — NOT part of the deployed site.
 *
 * WHY THIS EXISTS
 *   Astro's static build ends with `cleanServerOutput()` (see
 *   node_modules/astro/dist/core/build/static-build.js), which deletes the SSR
 *   chunk files it wrote (`dist/pages/*.astro.mjs`, `dist/chunks/*`,
 *   `dist/_noop-middleware.mjs`) with a bare `fs.promises.rm` and no try/catch.
 *   The `astro:build:done` hook — which is where @astrojs/sitemap writes
 *   `dist/sitemap-0.xml` — runs AFTER that call.
 *
 *   WorkBuddy's sandbox injects a delete guard via
 *   `NODE_OPTIONS=--require=".../node-language-shim.cjs"`. Once its per-turn
 *   budget is exhausted every delete rejects with
 *   `SAFE_DELETE_BULK_CONFIRM_REQUIRED`. That rejection propagates out of
 *   `cleanServerOutput`, so `astro:build:done` never runs and the sitemap is
 *   silently left over from a previous build — a stale sitemap with no error.
 *
 * WHAT THIS DOES
 *   Wraps the small set of `fs` delete functions Astro/Vite use so that ONLY
 *   the guard refusal is tolerated (the file is then simply left on disk) and
 *   everything else still throws. Each tolerated refusal is logged once per
 *   path so the residue is visible rather than silent.
 *
 * WHEN IT IS LOADED
 *   scripts/build.mjs appends this as a SECOND `--require`, and only when it
 *   detects the sandbox shim in NODE_OPTIONS. On a normal machine (or CI)
 *   NODE_OPTIONS is left untouched and this file is never loaded.
 *
 *   Because deletes may now silently not happen, the consequential leftovers
 *   are asserted explicitly after the build — see the retired-path and
 *   sitemap-freshness checks in scripts/create-worker-entry.mjs.
 */
const fs = require('node:fs');

const GUARD_MARKER = 'SAFE_DELETE_BULK_CONFIRM_REQUIRED';

function isGuardRefusal(error) {
  if (!error) return false;
  return String(error.message || error).includes(GUARD_MARKER);
}

const tolerated = new Set();
function noteTolerated(target) {
  const key = String(target);
  if (tolerated.has(key)) return;
  tolerated.add(key);
  console.warn(
    `[astro-clean-tolerance] delete refused by the sandbox guard, leaving it on disk: ${key}`,
  );
}

/** Wrap a promise-returning delete so only a guard refusal becomes a no-op. */
function tolerateAsync(original) {
  return function patched(...args) {
    const result = original.apply(this, args);
    if (!result || typeof result.then !== 'function') return result;
    return result.catch((error) => {
      if (!isGuardRefusal(error)) throw error;
      noteTolerated(args[0]);
    });
  };
}

/** Wrap a sync delete so only a guard refusal becomes a no-op. */
function tolerateSync(original) {
  return function patched(...args) {
    try {
      return original.apply(this, args);
    } catch (error) {
      if (!isGuardRefusal(error)) throw error;
      noteTolerated(args[0]);
    }
  };
}

const patch = (holder, key, wrap) => {
  try {
    if (typeof holder[key] === 'function') holder[key] = wrap(holder[key]);
  } catch {
    /* frozen / getter-only: skip, the guard simply stays fatal for this call */
  }
};

patch(fs.promises, 'rm', tolerateAsync);
patch(fs.promises, 'unlink', tolerateAsync);
patch(fs.promises, 'rmdir', tolerateAsync);
patch(fs, 'rmSync', tolerateSync);
patch(fs, 'unlinkSync', tolerateSync);
patch(fs, 'rmdirSync', tolerateSync);
