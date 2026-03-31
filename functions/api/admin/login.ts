import type { PagesFunction } from '@cloudflare/workers-types';
import {
  badRequest,
  buildSessionCookie,
  createSessionToken,
  json,
  methodNotAllowed,
  type Env
} from '../../_utils/auth';

type LoginBody = {
  username?: string;
  password?: string;
};

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

  if (username !== env.ADMIN_USERNAME || password !== env.ADMIN_PASSWORD) {
    return json({ ok: false, error: 'Credenciais inválidas' }, { status: 401 });
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

export const onRequest: PagesFunction<Env> = async ({ request }) => {
  if (request.method === 'POST') {
    return methodNotAllowed();
  }

  return methodNotAllowed();
};
