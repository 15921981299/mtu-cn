const STORAGE_KEY = 'ms_attribution_v1';

export type AttributionTouch = {
  page: string;
  stage: string;
  time: string;
};

export type AttributionData = {
  firstTouchPage: string;
  firstTouchStage: string;
  firstTouchTime: string;
  touches: AttributionTouch[];
  entrySource?: string;
  entryMedium?: string;
  referrerHost?: string;
  campaign?: string;
};

export function classifyEntry(pageUrl: string, referrer: string) {
  const url = new URL(pageUrl);
  let referrerHost = '';
  try { referrerHost = new URL(referrer).hostname.toLowerCase(); } catch { /* direct or unavailable */ }
  const campaignSource = url.searchParams.get('utm_source')?.trim().slice(0, 100);
  if (campaignSource) {
    return { entrySource: campaignSource, entryMedium: url.searchParams.get('utm_medium')?.slice(0, 100) || 'campaign', referrerHost, campaign: url.searchParams.get('utm_campaign')?.slice(0, 100) || '' };
  }
  if (url.searchParams.has('gclid') || url.searchParams.has('msclkid')) {
    return { entrySource: url.searchParams.has('gclid') ? 'google' : 'bing', entryMedium: 'paid', referrerHost };
  }
  const google = /(^|\.)google\.(com|[a-z]{2,3}|co\.[a-z]{2}|com\.[a-z]{2})$/i.test(referrerHost);
  const bing = /(^|\.)bing\.com$/i.test(referrerHost);
  if (google || bing) return { entrySource: google ? 'google' : 'bing', entryMedium: 'organic', referrerHost };
  if (referrerHost && referrerHost !== url.hostname.toLowerCase()) {
    return { entrySource: referrerHost, entryMedium: 'referral', referrerHost };
  }
  return { entrySource: 'direct-or-unknown', entryMedium: 'none', referrerHost };
}

function inferFunnelStage(path: string): string {
  if (path.startsWith('/contact')) return 'quote';
  if (path.startsWith('/certifications')) return 'signing';
  if (path.startsWith('/terms')) return 'signing';
  if (
    path.startsWith('/products') ||
    path.startsWith('/capabilities') ||
    path.startsWith('/industries') ||
    path.startsWith('/applications') ||
    path.startsWith('/part-products')
  ) {
    return 'selection';
  }
  return 'awareness';
}

function readAttribution(): AttributionData | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AttributionData) : null;
  } catch {
    return null;
  }
}

function writeAttribution(data: AttributionData): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* quota / private mode */
  }
}

export function trackPageAttribution(): AttributionData {
  const path = window.location.pathname;
  const stage = inferFunnelStage(path);
  const now = new Date().toISOString();
  let data = readAttribution();

  if (!data) {
    data = {
      firstTouchPage: path,
      firstTouchStage: stage,
      firstTouchTime: now,
      touches: [{ page: path, stage, time: now }],
      ...classifyEntry(window.location.href, document.referrer),
    };
    writeAttribution(data);
    return data;
  }

  const last = data.touches[data.touches.length - 1];
  if (!last || last.page !== path) {
    data.touches.push({ page: path, stage, time: now });
    if (data.touches.length > 15) {
      data.touches = data.touches.slice(-15);
    }
    writeAttribution(data);
  }

  return data;
}

export function getAttributionSnapshot(): AttributionData | null {
  return readAttribution();
}

export function getTouchSummary(data: AttributionData): string {
  return data.touches.map((t) => t.page).join(' -> ');
}

export function populateRfqAttributionFields(form: HTMLFormElement): void {
  const data = trackPageAttribution();
  const setHidden = (name: string, value: string) => {
    let input = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
  };

  setHidden('first_touch_page', data.firstTouchPage);
  setHidden('first_touch_stage', data.firstTouchStage);
  setHidden('touch_count', String(data.touches.length));
  setHidden('touch_path', getTouchSummary(data));
  setHidden('entry_source', data.entrySource ?? 'unknown');
  setHidden('entry_medium', data.entryMedium ?? 'unknown');
  setHidden('referrer_host', data.referrerHost ?? '');
  setHidden('entry_campaign', data.campaign ?? '');
  setHidden('page_url', `${window.location.origin}${window.location.pathname}`);

  const params = new URLSearchParams(window.location.search);
  const urlSource = params.get('source');
  if (urlSource) {
    setHidden('url_source', urlSource);
    const sourceSelect = form.querySelector<HTMLSelectElement>('select[name="source"]');
    if (sourceSelect && !sourceSelect.value) {
      const match = Array.from(sourceSelect.options).find(
        (opt) => opt.value.toLowerCase() === urlSource.toLowerCase()
      );
      if (match) sourceSelect.value = match.value;
    }
  }
}

export function getLeadAttributionParams(): Record<string, string> {
  const data = getAttributionSnapshot();
  return {
    first_touch_page: data?.firstTouchPage ?? window.location.pathname,
    entry_source: data?.entrySource ?? 'unknown',
    entry_medium: data?.entryMedium ?? 'unknown',
  };
}

const recordedInquiries = new Set<string>();

export function trackAcceptedInquiry(inquiryId: unknown, extra: Record<string, string | number> = {}): boolean {
  if (typeof inquiryId !== 'string' || !/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(inquiryId)
    || typeof window.gtag !== 'function' || recordedInquiries.has(inquiryId)) return false;
  const key = `rfq_accepted_${inquiryId}`;
  try {
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, '1');
  } catch { /* Deduplicate in memory when storage is unavailable. */ }
  recordedInquiries.add(inquiryId);
  window.gtag('event', 'generate_lead', {
    ...getLeadAttributionParams(),
    ...extra,
    inquiry_id: inquiryId,
    event_category: 'RFQ',
  });
  fireAttributionLeadEvent({ ...extra, inquiry_id: inquiryId });
  return true;
}

export function fireAttributionLeadEvent(extra: Record<string, string | number> = {}): void {
  const data = getAttributionSnapshot();
  if (!data || typeof window.gtag !== 'function') return;

  window.gtag('event', 'rfq_attribution', {
    event_category: 'Attribution',
    ...getLeadAttributionParams(),
    first_touch_page: data.firstTouchPage,
    first_touch_stage: data.firstTouchStage,
    touch_count: data.touches.length,
    touch_path: getTouchSummary(data).slice(0, 100),
    ...extra,
  });
}
