import {
  badRequest,
  buildSessionCookie,
  createSessionToken,
  getClientIp,
  json,
  verifyPassword,
  type Env as AuthEnv
} from '../functions/_utils/auth';

type WorkerEnv = AuthEnv & {
  ASSETS: Fetcher;
  ADMIN_PASSWORD?: string;
};

type LoginBody = {
  username?: string;
  password?: string;
};

const MAX_ATTEMPTS = 7;
const WINDOW_SECONDS = 15 * 60;

async function handleAdminLogin(request: Request, env: WorkerEnv) {
  let body: LoginBody;

  try {
    body = await request.json<LoginBody>();
  } catch {
    return badRequest('JSON inválido');
  }

  const username = body.username?.trim() || '';
  const password = body.password || '';

  if (!username || !password) {
    return badRequest('Credenciais inválidas');
  }

  if (!env.ADMIN_USERNAME || !env.ADMIN_SESSION_SECRET) {
    return json(
      { ok: false, error: 'Configuração de autenticação incompleta no servidor' },
      { status: 500 }
    );
  }

  const ip = getClientIp(request);

  if (env.ADMIN_RATE_LIMIT_KV) {
    const rateKey = `admin-login:${ip}`;
    const current = await env.ADMIN_RATE_LIMIT_KV.get(rateKey);
    const attempts = current ? Number(current) : 0;

    if (attempts >= MAX_ATTEMPTS) {
      return json(
        { ok: false, error: 'Demasiadas tentativas. Tenta novamente mais tarde.' },
        { status: 429 }
      );
    }
  }

  const usernameMatches = username === env.ADMIN_USERNAME;

  let passwordMatches = false;

  if (env.ADMIN_PASSWORD) {
    passwordMatches = password === env.ADMIN_PASSWORD;
  } else if (env.ADMIN_PASSWORD_SALT && env.ADMIN_PASSWORD_HASH) {
    passwordMatches = await verifyPassword(
      password,
      env.ADMIN_PASSWORD_SALT,
      env.ADMIN_PASSWORD_HASH
    );
  } else {
    return json(
      { ok: false, error: 'Password do admin não configurada no servidor' },
      { status: 500 }
    );
  }

  if (!usernameMatches || !passwordMatches) {
    if (env.ADMIN_RATE_LIMIT_KV) {
      const rateKey = `admin-login:${ip}`;
      const current = await env.ADMIN_RATE_LIMIT_KV.get(rateKey);
      const attempts = current ? Number(current) : 0;

      await env.ADMIN_RATE_LIMIT_KV.put(rateKey, String(attempts + 1), {
        expirationTtl: WINDOW_SECONDS
      });
    }

    return json({ ok: false, error: 'Credenciais inválidas' }, { status: 401 });
  }

  if (env.ADMIN_RATE_LIMIT_KV) {
    const rateKey = `admin-login:${ip}`;
    await env.ADMIN_RATE_LIMIT_KV.delete(rateKey);
  }

  const token = await createSessionToken(username, env.ADMIN_SESSION_SECRET);

  return json(
    {
      ok: true,
      user: {
        username
      }
    },
    {
      headers: {
        'Set-Cookie': buildSessionCookie(token)
      }
    }
  );
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/admin/login') {
      return json({
        ok: true,
        test: 'worker is working',
        method: request.method
      });
    }

    return env.ASSETS.fetch(request);
  }
};
