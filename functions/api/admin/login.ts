import type { PagesFunction } from '@cloudflare/workers-types';
import {
  badRequest,
  buildSessionCookie,
  createSessionToken,
  getClientIp,
  json,
  verifyAdminPassword,
  type Env
} from '../../_utils/auth';

type LoginBody = {
  username?: string;
  password?: string;
};

const MAX_ATTEMPTS = 7;
const WINDOW_SECONDS = 15 * 60;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
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
      {
        ok: false,
        error: 'Configuração de autenticação incompleta no servidor'
      },
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
        {
          ok: false,
          error: 'Demasiadas tentativas. Tenta novamente mais tarde.'
        },
        { status: 429 }
      );
    }
  }

  const usernameMatches = username === env.ADMIN_USERNAME;
  const passwordMatches = await verifyAdminPassword(password, env);

  if (!usernameMatches || !passwordMatches) {
    if (env.ADMIN_RATE_LIMIT_KV) {
      const rateKey = `admin-login:${ip}`;
      const current = await env.ADMIN_RATE_LIMIT_KV.get(rateKey);
      const attempts = current ? Number(current) : 0;

      await env.ADMIN_RATE_LIMIT_KV.put(rateKey, String(attempts + 1), {
        expirationTtl: WINDOW_SECONDS
      });
    }

    return json(
      {
        ok: false,
        error: 'Credenciais inválidas',
        debug: {
          usernameMatches,
          passwordMatches,
          hasAdminUsername: Boolean(env.ADMIN_USERNAME),
          hasAdminPassword: Boolean(env.ADMIN_PASSWORD),
          hasAdminPasswordHash: Boolean(env.ADMIN_PASSWORD_HASH),
          hasAdminPasswordSalt: Boolean(env.ADMIN_PASSWORD_SALT)
        }
      },
      { status: 401 }
    );
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
};
