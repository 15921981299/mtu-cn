import assert from 'node:assert/strict';
import test from 'node:test';
import worker from '../dist/_worker.js/index.js';

test('unsigned download requests are rejected', async () => {
  const response = await worker.fetch(
    new Request('https://dieselpartsource.com/api/rfq/download?key=rfq/example.pdf'),
    { RFQ_DOWNLOAD_SECRET: 'test-secret', R2_BUCKET: {} },
  );
  assert.equal(response.status, 403);
  assert.match(response.headers.get('X-Robots-Tag'), /noindex/);
});

test('uploaded drawing receives a working seven-day private link', async () => {
  const objects = new Map();
  const bucket = {
    async put(key, body, options) {
      const bytes = new Uint8Array(await new Response(body).arrayBuffer());
      objects.set(key, { bytes, options });
    },
    async get(key) {
      const item = objects.get(key);
      if (!item) return null;
      return {
        body: item.bytes,
        size: item.bytes.byteLength,
        httpMetadata: item.options.httpMetadata,
        customMetadata: item.options.customMetadata,
      };
    },
  };
  const form = new FormData();
  form.set('name', 'Test Buyer');
  form.set('email', 'buyer@example.com');
  form.set('message', '0031845201, 2 pieces. Please confirm availability.');
  form.set('first_touch_page', '/part-products/0031845201-oil-filter-spin-on/');
  form.set('page_url', 'https://dieselpartsource.com/contact/');
  form.set('entry_source', 'bing');
  form.set('entry_medium', 'organic');
  form.set('referrer_host', 'www.bing.com');
  form.set('touch_path', '/part-products/0031845201-oil-filter-spin-on/ -> /contact/');
  form.append('drawing', new Blob(['drawing'], { type: 'application/pdf' }), 'engine drawing.pdf');
  const emails = [];
  const __sendEmail = async (_env, message) => {
    emails.push(message);
  };
  const response = await worker.fetch(
    new Request('https://dieselpartsource.com/api/rfq', { method: 'POST', body: form }),
    { __sendEmail, RFQ_DOWNLOAD_SECRET: 'download-test', R2_BUCKET: bucket },
  );
  assert.equal(response.status, 200);
  const accepted = await response.json();
  assert.equal(accepted.ok, true);
  assert.match(accepted.inquiryId, /^[0-9a-f-]{36}$/);
  assert.ok(emails[0].text.includes(`Inquiry ID: ${accepted.inquiryId}`));
  assert.match(emails[0].text, /First landing page: \/part-products\/0031845201-oil-filter-spin-on\//);
  assert.match(emails[0].text, /Entry source \(browser-reported\): bing/);
  assert.match(emails[0].text, /Entry medium: organic/);
  assert.match(emails[0].text, /Inquiry page: https:\/\/dieselpartsource.com\/contact\//);
  const match = emails[0].text.match(/https:\/\/dieselpartsource\.com\/api\/rfq\/download\?[^\s]+/);
  assert.ok(match, 'sales email should contain a private download URL');
  const download = await worker.fetch(new Request(match[0]), {
    RFQ_DOWNLOAD_SECRET: 'download-test',
    R2_BUCKET: bucket,
  });
  assert.equal(download.status, 200);
  assert.match(download.headers.get('Content-Disposition'), /engine%20drawing\.pdf/);
  assert.equal(await download.text(), 'drawing');
});

test('failed sales delivery does not acknowledge a lead', async () => {
  const form = new FormData();
  form.set('name', 'Test Buyer');
  form.set('email', 'buyer@example.com');
  form.set('message', '0031845201, 2 pieces. Please confirm availability.');
  const response = await worker.fetch(new Request('https://dieselpartsource.com/api/rfq', { method: 'POST', body: form }), {
    __sendEmail: async () => { throw new Error('Simulated SMTP failure'); },
  });
  assert.equal(response.status, 500);
  const body = await response.json();
  assert.equal(body.ok, false);
  assert.equal(body.inquiryId, undefined);
});

test('only email and part details are required, and the notification recipient is configurable', async () => {
  const form = new FormData();
  form.set('email', 'buyer@example.com');
  form.set('message', '5840780024, 4 pieces');
  form.set('part_number', '5840780024');
  form.set('rfq_context', 'MTU thrust member inquiry');
  const emails = [];
  const response = await worker.fetch(new Request('https://dieselpartsource.com/api/rfq/', { method: 'POST', body: form }), {
    RFQ_NOTIFICATION_EMAIL: 'sales@example.com',
    __sendEmail: async (_env, email) => emails.push(email),
  });
  assert.equal(response.status, 200);
  assert.equal(emails[0].to, 'sales@example.com');
  assert.match(emails[0].text, /Part number: 5840780024/);
  assert.match(emails[0].text, /Inquiry context: MTU thrust member inquiry/);
  assert.match(emails[1].text, /^Hello,/);
});

test('empty inquiries and invalid emails cannot become accepted lead events', async () => {
  for (const [email, message, website] of [['invalid', 'Parts request', ''], ['buyer@example.com', ' ', ''], ['buyer@example.com', 'Parts request', 'spam']]) {
    const form = new FormData();
    form.set('email', email);
    form.set('message', message);
    form.set('website', website);
    const response = await worker.fetch(new Request('https://dieselpartsource.com/api/rfq/', { method: 'POST', body: form }), {
      __sendEmail: async () => assert.fail('Invalid inquiry must not be delivered'),
    });
    assert.equal(response.status, 400);
    const payload = await response.json();
    assert.equal(payload.ok, false);
    assert.equal(payload.inquiryId, undefined);
  }
});
