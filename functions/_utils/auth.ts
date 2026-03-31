export interface Env {
  DB: D1Database;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
  ADMIN_SESSION_SECRET: string;
}

type SessionPayload = {
  u: string;
  exp: number;
};

const encoder = new TextEncoder();
const SESSION_COOKIE = 'pe_admin_session';

function toBase64Url(input: ArrayBuffer | Uint8Array | string) {
  let bytes: Uint8Array;

  if (typeof input === 'string') {
    bytes = encoder.encode(input);
  } else if (input instanceof Uint8Array) {
    bytes = input;
  } else {
    bytes = new Uint8Array(input);
  }

  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(input: string) {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

async function importHmacKey(secret: string) {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

async function signValue(value: string, secret: string) {
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return toBase64Url(signature);
}

export async function createSessionToken(username: string, secret: string, maxAgeSeconds = 60 * 60 * 24 * 7) {
  const payload: SessionPayload = {
    u: username,
    exp: Math.floor(Date.now() / 1000) + maxAgeSeconds
  };

  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = await signValue(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export async function verifySessionToken(token: string, secret: string) {
  const [encodedPayload, signature] = token.split('.');

  if (!encodedPayload || !signature) {
    return null;
  }

  const expected = await signValue(encodedPayload, secret);
  if (expected !== signature) {
    return null;
  }

  try {
    const payloadJson = new TextDecoder().decode(fromBase64Url(encodedPayload));
    const payload = JSON.parse(payloadJson) as SessionPayload;

    if (!payload.u || !payload.exp) {
      return null;
    }

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function parseCookies(request: Request) {
  const header = request.headers.get('Cookie') || '';
  const pairs = header.split(';').map((part) => part.trim()).filter(Boolean);
  const cookies: Record<string, string> = {};

  for (const pair of pairs) {
    const index = pair.indexOf('=');
    if (index === -1) continue;
    const key = pair.slice(0, index).trim();
    const value = pair.slice(index + 1).trim();
    cookies[key] = value;
  }

  return cookies;
}

export async function requireAdmin(request: Request, env: Env) {
  const cookies = parseCookies(request);
  const token = cookies[SESSION_COOKIE];

  if (!token) {
    return null;
  }

  return verifySessionToken(token, env.ADMIN_SESSION_SECRET);
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export function buildSessionCookie(token: string, maxAgeSeconds = 60 * 60 * 24 * 7) {
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAgeSeconds}`;
}

export function buildExpiredSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(data), {
    ...init,
    headers
  });
}

export function unauthorized() {
  return json({ ok: false, error: 'Unauthorized' }, { status: 401 });
}

export function badRequest(message: string) {
  return json({ ok: false, error: message }, { status: 400 });
}

export function methodNotAllowed() {
  return json({ ok: false, error: 'Method not allowed' }, { status: 405 });
}
