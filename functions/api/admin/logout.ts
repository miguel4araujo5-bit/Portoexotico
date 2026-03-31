import type { PagesFunction } from '@cloudflare/workers-types';
import {
  buildExpiredSessionCookie,
  json,
  methodNotAllowed
} from '../../_utils/auth';

export const onRequestPost: PagesFunction = async () => {
  return json(
    { ok: true },
    {
      headers: {
        'Set-Cookie': buildExpiredSessionCookie()
      }
    }
  );
};

export const onRequest: PagesFunction = async () => {
  return methodNotAllowed();
};
