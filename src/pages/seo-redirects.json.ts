import { mtuPartSlugRedirects } from '../data/mtu-parts';

/**
 * Build-time hand-off for redirect generation.
 *
 * Part pages that lost a duplicate-name race still exist in Google's index and
 * may hold inbound links, so their slugs must 301 to the surviving page rather
 * than disappear. Astro cannot emit redirect rules on its own, so the map is
 * written here as JSON, picked up by scripts/create-worker-entry.mjs, folded
 * into dist/_redirects, and then deleted from dist/ — it must never be
 * reachable in production.
 *
 * Note: the Worker does NOT consume this map. All redirects are handled by
 * Cloudflare's asset layer via dist/_redirects.
 */
export function GET() {
  return new Response(JSON.stringify(mtuPartSlugRedirects, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
