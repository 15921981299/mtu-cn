/**
 * Local smoke test for the EdgeOne Cloud Function port.
 *
 * Runs without network and without the EdgeOne runtime: it feeds plain Web
 * Request objects into the handlers exactly as Makers does, and asserts the
 * branches that must not depend on SMTP being reachable.
 */
import assert from 'node:assert/strict';
import test from 'node:test';

import { onRequestGet, onRequestOptions, onRequestPost } from '../cloud-functions/api/rfq/index.js';

const makeRequest = (form) =>
  new Request('https://mtupeijian.com/api/rfq', { method: 'POST', body: form });

const context = (form, env = {}) => ({ request: makeRequest(form), env });

test('GET reports readiness without side effects', async () => {
  const res = onRequestGet({ env: {} });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.ok, true);
  assert.equal(body.ready, false, 'no ZOHO_SMTP_PASS in env → not ready');
});

test('OPTIONS answers 204 and advertises the allowed methods', () => {
  const res = onRequestOptions();
  assert.equal(res.status, 204);
  assert.equal(res.headers.get('Allow'), 'GET, POST, OPTIONS');
});

test('rejects a missing or malformed email', async () => {
  const form = new FormData();
  form.set('email', 'not-an-email');
  form.set('message', '需要 12V4000 缸盖');
  const res = await onRequestPost(context(form));
  assert.equal(res.status, 400);
  assert.equal((await res.json()).ok, false);
});

test('rejects an empty message', async () => {
  const form = new FormData();
  form.set('email', 'buyer@example.com');
  const res = await onRequestPost(context(form));
  assert.equal(res.status, 400);
});

test('honeypot submissions get a 200 and are dropped', async () => {
  const form = new FormData();
  form.set('email', 'bot@example.com');
  form.set('message', 'spam');
  form.set('website', 'http://spam.example');
  const res = await onRequestPost(context(form));
  assert.equal(res.status, 200);
  assert.equal((await res.json()).inquiryId, 'ignored');
});

test('returns 503 when SMTP is not configured', async () => {
  const form = new FormData();
  form.set('email', 'buyer@example.com');
  form.set('message', '需要报价');
  const res = await onRequestPost(context(form, {}));
  assert.equal(res.status, 503);
  assert.equal((await res.json()).ok, false);
});

test('rejects an oversized attachment before touching SMTP', async () => {
  const form = new FormData();
  form.set('email', 'buyer@example.com');
  form.set('message', '需要报价');
  form.set('drawing', new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'big.pdf', { type: 'application/pdf' }));
  const res = await onRequestPost(context(form, { ZOHO_SMTP_PASS: 'x' }));
  assert.equal(res.status, 413);
});

test('reports 502 (not a crash) when the SMTP host is unreachable', async () => {
  const form = new FormData();
  form.set('email', 'buyer@example.com');
  form.set('message', '需要报价');
  const res = await onRequestPost(
    context(form, {
      ZOHO_SMTP_PASS: 'x',
      ZOHO_SMTP_USER: 'sales@example.com',
      ZOHO_SMTP_HOST: '127.0.0.1',
      ZOHO_SMTP_PORT: '465',
    }),
  );
  assert.equal(res.status, 502);
  assert.match((await res.json()).message, /致电 15921981299/);
});

// 国内买家只留手机/微信：无邮箱也应被接受（2026-10-18 起）
test('accepts a phone-only inquiry (no email)', async () => {
  const form = new FormData();
  form.set('name', '王工');
  form.set('phone', '13800138000');
  form.set('message', 'MTU 12V4000 机油冷却器');
  const res = await onRequestPost(context(form, {}));
  assert.equal(res.status, 503); // SMTP 未配置 → 走到 503，说明通过了联系校验
});

test('rejects an inquiry with neither email nor phone', async () => {
  const form = new FormData();
  form.set('name', '王工');
  form.set('message', 'MTU 12V4000 机油冷却器');
  const res = await onRequestPost(context(form, { ZOHO_SMTP_PASS: 'x' }));
  assert.equal(res.status, 400);
  assert.match((await res.json()).message, /手机号 \/ 微信号/);
});
