export interface Env {
  DB: D1Database;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD?: string;
  ADMIN_PASSWORD_HASH: string;
  ADMIN_PASSWORD_SALT: string;
  ADMIN_SESSION_SECRET: string;
  ADMIN_RATE_LIMIT_KV?: KVNamespace;
}

type SessionPayload = {
  u: string;
  exp: number;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();
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

function timingSafeEqual(a: string, b: string) {
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);

  if (aBytes.length !== bBytes.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < aBytes.length; i += 1) {
    result |= aBytes[i] ^ bBytes[i];
  }

  return result === 0;
}

export async function hashPassword(password: string, salt: string) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: 210000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  );

  return toBase64Url(derivedBits);
}

export async function verifyPassword(password: string, salt: string, expectedHash: string) {
  const computedHash = await hashPassword(password, salt);
  return timingSafeEqual(computedHash, expectedHash);
}

export async function verifyAdminPassword(password: string, env: Env) {
  if (env.ADMIN_PASSWORD) {
    return timingSafeEqual(password, env.ADMIN_PASSWORD);
  }

  if (!env.ADMIN_PASSWORD_SALT || !env.ADMIN_PASSWORD_HASH) {
    return false;
  }

  return verifyPassword(password, env.ADMIN_PASSWORD_SALT, env.ADMIN_PASSWORD_HASH);
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

  if (!timingSafeEqual(expected, signature)) {
    return null;
  }

  try {
    const payloadJson = decoder.decode(fromBase64Url(encodedPayload));
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
  const parts = header.split(';').map((value) => value.trim()).filter(Boolean);
  const cookies: Record<string, string> = {};

  for (const part of parts) {
    const index = part.indexOf('=');
    if (index === -1) continue;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
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

export function getClientIp(request: Request) {
  return (
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('x-forwarded-for') ||
    'unknown'
  );
}
