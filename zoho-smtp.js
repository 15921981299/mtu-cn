export const SALES_EMAIL = 'sales@dieselpartsource.com';
const FROM_NAME = 'Diesel Part Source';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function isZohoSmtpConfigured(env) {
  return Boolean(env.ZOHO_SMTP_PASS);
}

export function getZohoSmtpConfig(env) {
  return {
    user: env.ZOHO_SMTP_USER || SALES_EMAIL,
    pass: env.ZOHO_SMTP_PASS || '',
    host: env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
    port: Number(env.ZOHO_SMTP_PORT || 465),
  };
}

export async function sendZohoEmail(env, { to, subject, text, replyTo }) {
  const { user, pass, host, port } = getZohoSmtpConfig(env);
  if (!pass) {
    throw new Error('ZOHO_SMTP_PASS is not configured');
  }

  if (port !== 465) throw new Error('Zoho SMTP requires port 465 with implicit TLS');
  for (const value of [user, to, replyTo, subject]) {
    if (value && /[\r\n]/.test(value)) throw new Error('Invalid email header');
  }

  const { connect } = await import('cloudflare:sockets');
  const socket = connect({ hostname: host, port }, { secureTransport: 'on' });
  socket.closed.catch(() => {});
  const timeout = setTimeout(() => { socket.close().catch(() => {}); }, 20000);

  const session = new SmtpSession(socket);
  try {
    await session.expect(220);
    const ehloDomain = user.split('@')[1] || 'dieselpartsource.com';
    await session.command(`EHLO ${ehloDomain}`, 250);
    await session.command('AUTH LOGIN', 334);
    await session.command(toBase64(user), 334, 'AUTH USER');
    await session.command(toBase64(pass), 235, 'AUTH PASS');
    await session.command(`MAIL FROM:<${user}>`, 250);
    await session.command(`RCPT TO:<${to}>`, 250);
    await session.command('DATA', 354);
    await session.command(buildMessage({ from: user, to, replyTo, subject, text }), 250);
    await session.command('QUIT', 221);
  } finally {
    clearTimeout(timeout);
    session.close();
    await socket.close().catch(() => {});
  }
}

function toBase64(value) {
  const bytes = encoder.encode(value);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function encodeHeader(value) {
  if (/^[\x20-\x7E]*$/.test(value)) return value;
  return `=?UTF-8?B?${toBase64(value)}?=`;
}

function escapeData(body) {
  return String(body)
    .replace(/\r\n/g, '\n')
    .replace(/\n/g, '\r\n')
    .split('\r\n')
    .map((line) => (line.startsWith('.') ? `.${line}` : line))
    .join('\r\n');
}

function buildMessage({ from, to, replyTo, subject, text }) {
  const headers = [
    `From: ${FROM_NAME} <${from}>`,
    `To: ${to}`,
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Subject: ${encodeHeader(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
  ].filter(Boolean);

  return `${headers.join('\r\n')}\r\n\r\n${escapeData(text)}\r\n.`;
}

class SmtpSession {
  constructor(socket) {
    this.reader = socket.readable.getReader();
    this.writer = socket.writable.getWriter();
    this.buffer = '';
  }

  async expect(code) {
    const response = await this.readResponse();
    this.assertCode(response, code, 'connect');
    return response;
  }

  async command(line, code, label = line.split(' ')[0]) {
    await this.writer.write(encoder.encode(`${line}\r\n`));
    const response = await this.readResponse();
    this.assertCode(response, code, label);
    return response;
  }

  assertCode(response, expected, label) {
    if (response.code !== expected) {
      throw new Error(`SMTP ${label} failed (${response.code}): ${response.text.trim()}`);
    }
  }

  async readResponse() {
    while (true) {
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

      const { value, done } = await this.reader.read();
      if (done) throw new Error('SMTP connection closed');
      this.buffer += decoder.decode(value, { stream: true });
    }
  }

  close() {
    this.reader.releaseLock();
    this.writer.releaseLock();
  }
}
