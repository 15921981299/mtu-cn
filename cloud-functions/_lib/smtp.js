/**
 * Minimal SMTP client for EdgeOne Makers Cloud Functions.
 *
 * Why hand-rolled instead of nodemailer: adding a dependency means the EdgeOne
 * build has to reconcile package-lock.json AND pnpm-lock.yaml (both exist in
 * this repo, so the platform may pick either manager). A lockfile mismatch is a
 * build failure that has nothing to do with the code. This file uses only
 * `node:tls`, which ships with the Node 20 runtime Makers provides.
 *
 * Ported from zoho-smtp.js, which used `cloudflare:sockets`. The SMTP dialogue
 * is identical: implicit TLS on 465, AUTH LOGIN, single message per connection.
 */

import tls from 'node:tls';

export const DEFAULT_SALES_EMAIL = 'sales@dieselpartsource.com';
const FROM_NAME = '国晁动力';
/** Makers caps the request body at 6 MB; keep our own ceiling just below it. */
export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

const SMTP_TIMEOUT_MS = 25_000;

export function getSmtpConfig(env) {
  return {
    user: env.ZOHO_SMTP_USER || DEFAULT_SALES_EMAIL,
    pass: env.ZOHO_SMTP_PASS || '',
    host: env.ZOHO_SMTP_HOST || 'smtppro.zoho.com',
    port: Number(env.ZOHO_SMTP_PORT || 465),
  };
}

export function isSmtpConfigured(env) {
  return Boolean(env.ZOHO_SMTP_PASS);
}

/**
 * @param {{to: string, subject: string, text: string, replyTo?: string, attachment?: {filename: string, contentType: string, content: Buffer}}} message
 */
export async function sendMail(env, { to, subject, text, replyTo, attachment }) {
  const { user, pass, host, port } = getSmtpConfig(env);
  if (!pass) throw new Error('ZOHO_SMTP_PASS 未配置');
  if (port !== 465) throw new Error('Zoho SMTP 要求 465 端口（隐式 TLS）');
  for (const value of [user, to, replyTo, subject]) {
    if (value && /[\r\n]/.test(value)) throw new Error('邮件头包含非法换行');
  }

  const socket = await connectTls(host, port);
  const session = new SmtpSession(socket);

  try {
    await session.expect(220);
    await session.command(`EHLO ${user.split('@')[1] || 'mtupeijian.com'}`, 250);
    await session.command('AUTH LOGIN', 334);
    await session.command(toBase64(user), 334, 'AUTH USER');
    await session.command(toBase64(pass), 235, 'AUTH PASS');
    await session.command(`MAIL FROM:<${user}>`, 250);
    await session.command(`RCPT TO:<${to}>`, 250);
    await session.command('DATA', 354);
    await session.command(
      buildMessage({ from: user, to, replyTo, subject, text, attachment }),
      250,
      'DATA BODY',
    );
    await session.command('QUIT', 221);
  } finally {
    session.close();
  }
}

function connectTls(host, port) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({ host, port, servername: host });
    const timer = setTimeout(() => {
      socket.destroy(new Error(`SMTP 连接超时（${SMTP_TIMEOUT_MS} ms）`));
    }, SMTP_TIMEOUT_MS);

    socket.once('secureConnect', () => {
      clearTimeout(timer);
      socket.setTimeout(0);
      resolve(socket);
    });
    socket.once('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

class SmtpSession {
  constructor(socket) {
    this.socket = socket;
    this.buffer = '';
    this.pending = null;
    this.failure = null;
    this.closed = false;

    socket.setEncoding('utf8');
    socket.on('data', (chunk) => {
      this.buffer += chunk;
      this._wake();
    });
    socket.on('error', (err) => {
      this.failure = err;
      this._wake();
    });
    socket.on('close', () => {
      this.closed = true;
      this._wake();
    });
  }

  _wake() {
    const resolve = this.pending;
    if (resolve) {
      this.pending = null;
      resolve();
    }
  }

  /** Resolves on the next incoming chunk / error / close. */
  _wait() {
    return new Promise((resolve) => {
      this.pending = resolve;
    });
  }

  _takeResponse() {
    let offset = 0;
    let code = 0;
    let complete = false;

    while (true) {
      const newline = this.buffer.indexOf('\n', offset);
      if (newline === -1) break;

      const line = this.buffer.slice(offset, newline).replace(/\r$/, '');
      offset = newline + 1;

      if (/^\d{3}[ -]/.test(line)) {
        code = Number(line.slice(0, 3));
        complete = line[3] === ' ';
      }

      if (complete) {
        const text = this.buffer.slice(0, offset);
        this.buffer = this.buffer.slice(offset);
        return { code, text };
      }
    }
    return null;
  }

  async readResponse() {
    while (true) {
      const response = this._takeResponse();
      if (response) return response;
      if (this.failure) throw this.failure;
      if (this.closed) throw new Error('SMTP 连接已关闭');
      await this._wait();
    }
  }

  async expect(code) {
    const response = await this.readResponse();
    this._assert(response, code, 'connect');
    return response;
  }

  async command(line, code, label = line.split(' ')[0]) {
    if (this.socket.destroyed) throw new Error('SMTP 连接已关闭');
    this.socket.write(`${line}\r\n`);
    const response = await this.readResponse();
    this._assert(response, code, label);
    return response;
  }

  _assert(response, expected, label) {
    if (response.code !== expected) {
      throw new Error(`SMTP ${label} 失败（${response.code}）：${response.text.trim()}`);
    }
  }

  close() {
    if (!this.socket.destroyed) this.socket.destroy();
  }
}

function toBase64(value) {
  return Buffer.from(String(value), 'utf8').toString('base64');
}

function encodeHeader(value) {
  if (/^[\x20-\x7E]*$/.test(value)) return value;
  return `=?UTF-8?B?${toBase64(value)}?=`;
}

/** CRLF normalisation + dot-stuffing, as required at the DATA stage. */
function escapeData(body) {
  return String(body)
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => (line.startsWith('.') ? `.${line}` : line))
    .join('\r\n');
}

function asciiFilename(filename) {
  const cleaned = String(filename).replace(/[\r\n"\\]/g, '_');
  const ascii = cleaned.replace(/[^\x20-\x7E]/g, '_');
  return ascii || 'attachment';
}

function encodeRFC2231(filename) {
  return encodeURIComponent(String(filename).replace(/[\r\n]/g, '_')).replace(
    /[!'()*]/g,
    (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function wrapBase64(buffer) {
  return buffer.toString('base64').replace(/.{1,76}/g, '$&\r\n').trimEnd();
}

function buildMessage({ from, to, replyTo, subject, text, attachment }) {
  const headers = [
    `From: ${encodeHeader(FROM_NAME)} <${from}>`,
    `To: ${to}`,
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Subject: ${encodeHeader(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
  ].filter(Boolean);

  if (!attachment) {
    headers.push('Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: 8bit');
    return `${headers.join('\r\n')}\r\n\r\n${escapeData(text)}\r\n.`;
  }

  const boundary = `----rfq_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  const ascii = asciiFilename(attachment.filename);
  headers.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);

  const parts = [
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    escapeData(text),
    `--${boundary}`,
    `Content-Type: ${attachment.contentType || 'application/octet-stream'}; name="${ascii}"`,
    'Content-Transfer-Encoding: base64',
    `Content-Disposition: attachment; filename="${ascii}"; filename*=UTF-8''${encodeRFC2231(attachment.filename)}`,
    '',
    wrapBase64(attachment.content),
    `--${boundary}--`,
    '',
  ];

  return `${headers.join('\r\n')}\r\n\r\n${parts.join('\r\n')}\r\n.`;
}
