/**
 * Keywords Everywhere API helper.
 * Docs: https://keywordseverywhere.com/ (API key from account settings)
 *
 * Env:
 *   KEYWORDS_EVERYWHERE_API_KEY — required
 *   KEYWORDS_EVERYWHERE_COUNTRY — default "us"
 *   KEYWORDS_EVERYWHERE_CURRENCY — default "USD"
 */

const KE_API = 'https://api.keywordseverywhere.com/v1/get_keyword_data';
const KE_RELATED_API = 'https://api.keywordseverywhere.com/v1/get_related_keywords';
const DEFAULT_BATCH = 100;
const BATCH_DELAY_MS = 350;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeKeyword(keyword) {
  return keyword.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Drop noise from Related Keywords (single digits, file types, etc.) */
export function isUsefulKeyword(keyword) {
  const k = String(keyword ?? '').trim();
  if (k.length < 4) return false;
  if (!/[a-z]/i.test(k)) return false;
  if (/^\d+$/.test(k)) return false;
  return true;
}

/**
 * @param {string[]} keywords
 * @param {{ apiKey: string, country?: string, currency?: string, batchSize?: number, onProgress?: (done: number, total: number) => void }} options
 * @returns {Promise<Map<string, { vol: number|null, cpc: string|null, competition: number|null, raw: object }>>}
 */
export async function fetchKeywordVolumes(keywords, options) {
  const {
    apiKey,
    country = 'us',
    currency = 'USD',
    batchSize = DEFAULT_BATCH,
    onProgress,
  } = options;

  const unique = [];
  const seen = new Set();
  for (const kw of keywords) {
    const trimmed = kw?.trim();
    if (!trimmed) continue;
    const key = normalizeKeyword(trimmed);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(trimmed);
  }

  /** @type {Map<string, { vol: number|null, cpc: string|null, competition: number|null, raw: object }>} */
  const results = new Map();

  for (let i = 0; i < unique.length; i += batchSize) {
    const batch = unique.slice(i, i + batchSize);
    const body = {
      kw: batch,
      country,
      currency,
      dataSource: 'gkp',
    };

    let response;
    let attempts = 0;
    while (attempts < 3) {
      attempts += 1;
      response = await fetch(KE_API, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.status === 429) {
        await sleep(2000 * attempts);
        continue;
      }
      break;
    }

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Keywords Everywhere API ${response.status}: ${text}`);
    }

    const json = await response.json();
    for (const item of json.data ?? []) {
      const key = normalizeKeyword(item.keyword ?? '');
      const cpcValue = item.cpc?.value;
      results.set(key, {
        vol: item.vol ?? null,
        cpc: cpcValue != null ? `${item.cpc?.currency ?? '$'}${cpcValue}` : null,
        competition: item.competition ?? null,
        raw: item,
      });
    }

    onProgress?.(Math.min(i + batch.length, unique.length), unique.length);

    if (i + batchSize < unique.length) {
      await sleep(BATCH_DELAY_MS);
    }
  }

  return results;
}

export function lookupVolume(volumeMap, keyword) {
  if (!keyword?.trim()) return null;
  return volumeMap.get(normalizeKeyword(keyword)) ?? null;
}

/**
 * Related keywords for one seed (2 credits per returned keyword).
 * @param {string} seedKeyword
 * @param {{ apiKey: string, num?: number, country?: string, currency?: string }} options
 * @returns {Promise<{ seed: string, keywords: string[], creditsConsumed: number }>}
 */
export async function fetchRelatedKeywords(seedKeyword, options) {
  const { apiKey, num = 100, country = 'us', currency = 'USD' } = options;
  const response = await fetch(KE_RELATED_API, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      keyword: seedKeyword.trim(),
      num,
      country,
      currency,
      dataSource: 'gkp',
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Keywords Everywhere related API ${response.status}: ${text}`);
  }

  const json = await response.json();
  const raw = json.data ?? [];
  const keywords = (Array.isArray(raw) ? raw : Object.values(raw))
    .filter((k) => typeof k === 'string' && k.trim())
    .map((k) => k.trim())
    .filter(isUsefulKeyword);
  return {
    seed: seedKeyword.trim(),
    keywords,
    creditsConsumed: json.credits_consumed ?? 0,
  };
}
