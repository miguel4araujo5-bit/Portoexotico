import type { PagesFunction } from '@cloudflare/workers-types';
import {
  json,
  requireAdmin,
  type Env
} from '../../_utils/auth';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const session = await requireAdmin(request, env);

  if (!session) {
    return json({ ok: false, authenticated: false }, { status: 401 });
  }

  return json({
    ok: true,
    authenticated: true,
    user: {
      username: session.u
    }
  });
};
