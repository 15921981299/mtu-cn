import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { classifyEntry, trackPageAttribution, trackAcceptedInquiry } from '../src/scripts/attribution.ts';

const landing = 'https://dieselpartsource.com/part-products/0031845201-oil-filter-spin-on/';

test('distinguishes search, paid, campaign, and unavailable entry sources', () => {
  for (const [referrer, expected] of [['https://www.bing.com/search?q=0031845201', 'bing'], ['https://www.google.co.uk/search?q=0031845201', 'google']]) {
    assert.equal(classifyEntry(landing, referrer).entrySource, expected);
    assert.equal(classifyEntry(landing, referrer).entryMedium, 'organic');
  }
  assert.equal(classifyEntry(`${landing}?msclkid=example`, 'https://bing.com/').entryMedium, 'paid');
  assert.equal(classifyEntry(`${landing}?utm_source=newsletter&utm_medium=email`, '').entryMedium, 'email');
  assert.equal(classifyEntry(landing, '').entrySource, 'direct-or-unknown');
  assert.equal(classifyEntry(landing, 'https://bing.com.example.org/').entryMedium, 'referral');
});

test('keeps Bing and the original part landing page through the contact page', () => {
  const values = new Map();
  globalThis.sessionStorage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  globalThis.window = { location: new URL(landing) };
  globalThis.document = { referrer: 'https://www.bing.com/search?q=0031845201' };
  const first = trackPageAttribution();
  window.location = new URL('https://dieselpartsource.com/contact/?source=part-0031845201');
  document.referrer = landing;
  const second = trackPageAttribution();
  assert.equal(second.firstTouchPage, first.firstTouchPage);
  assert.equal(second.entrySource, 'bing');
  assert.equal(second.entryMedium, 'organic');
  assert.equal(second.touches.at(-1).page, '/contact/');
  delete globalThis.window;
  delete globalThis.document;
  delete globalThis.sessionStorage;
});

test('the public thank-you page is not another successful lead event', () => {
  const page = readFileSync(new URL('../src/pages/thank-you.astro', import.meta.url), 'utf8');
  assert.doesNotMatch(page, /gtag\('event',\s*'generate_lead'/);
  assert.match(page, /rfq_thank_you_view/);
});

test('successful inquiries are counted once by server-issued ID, not by clicks', () => {
  const events = [];
  const values = new Map();
  globalThis.sessionStorage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  globalThis.window = { location: new URL(landing), gtag: (...args) => events.push(args) };
  const id = 'ea05c554-d431-4d86-a949-7d8182c91381';
  assert.equal(trackAcceptedInquiry(undefined), false);
  assert.equal(trackAcceptedInquiry('click-quote-button'), false);
  assert.equal(trackAcceptedInquiry(id, { part_number: '0031845201' }), true);
  assert.equal(trackAcceptedInquiry(id, { part_number: '0031845201' }), false);
  assert.equal(events.filter((event) => event[1] === 'generate_lead').length, 1);
  assert.equal(events[0][2].part_number, '0031845201');
  delete globalThis.window;
  delete globalThis.sessionStorage;
});
