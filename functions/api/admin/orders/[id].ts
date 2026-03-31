import type { PagesFunction } from '@cloudflare/workers-types';
import {
  badRequest,
  json,
  requireAdmin,
  unauthorized,
  type Env
} from '../../../_utils/auth';

type UpdateBody = {
  status?: string;
  payment_status?: string;
  payment_provider?: string | null;
  payment_reference?: string | null;
};

const allowedStatuses = ['pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'];
const allowedPaymentStatuses = ['pending', 'paid', 'failed', 'refunded'];

export const onRequestGet: PagesFunction<Env> = async ({ request, env, params }) => {
  const session = await requireAdmin(request, env);

  if (!session) {
    return unauthorized();
  }

  const id = String(params.id || '').trim();

  if (!id) {
    return badRequest('ID inválido');
  }

  const row = await env.DB.prepare(
    `
      SELECT
        id,
        created_at,
        updated_at,
        status,
        payment_status,
        payment_provider,
        payment_reference,
        customer_name,
        customer_email,
        customer_phone,
        address_line1,
        address_line2,
        postal_code,
        city,
        country,
        notes,
        items_json,
        total_amount,
        currency
      FROM orders
      WHERE id = ?
      LIMIT 1
    `
  )
    .bind(id)
    .first<Record<string, unknown>>();

  if (!row) {
    return json({ ok: false, error: 'Encomenda não encontrada' }, { status: 404 });
  }

  return json({
    ok: true,
    order: {
      ...row,
      items: JSON.parse(String(row.items_json || '[]'))
    }
  });
};

export const onRequestPatch: PagesFunction<Env> = async ({ request, env, params }) => {
  const session = await requireAdmin(request, env);

  if (!session) {
    return unauthorized();
  }

  const id = String(params.id || '').trim();

  if (!id) {
    return badRequest('ID inválido');
  }

  let body: UpdateBody;

  try {
    body = await request.json<UpdateBody>();
  } catch {
    return badRequest('JSON inválido');
  }

  const nextStatus = body.status?.trim();
  const nextPaymentStatus = body.payment_status?.trim();
  const nextPaymentProvider = body.payment_provider ?? null;
  const nextPaymentReference = body.payment_reference ?? null;

  if (nextStatus && !allowedStatuses.includes(nextStatus)) {
    return badRequest('Estado inválido');
  }

  if (nextPaymentStatus && !allowedPaymentStatuses.includes(nextPaymentStatus)) {
    return badRequest('Estado de pagamento inválido');
  }

  const current = await env.DB.prepare(
    `
      SELECT id
      FROM orders
      WHERE id = ?
      LIMIT 1
    `
  )
    .bind(id)
    .first();

  if (!current) {
    return json({ ok: false, error: 'Encomenda não encontrada' }, { status: 404 });
  }

  await env.DB.prepare(
    `
      UPDATE orders
      SET
        status = COALESCE(?, status),
        payment_status = COALESCE(?, payment_status),
        payment_provider = COALESCE(?, payment_provider),
        payment_reference = COALESCE(?, payment_reference),
        updated_at = ?
      WHERE id = ?
    `
  )
    .bind(
      nextStatus ?? null,
      nextPaymentStatus ?? null,
      nextPaymentProvider,
      nextPaymentReference,
      new Date().toISOString(),
      id
    )
    .run();

  const updated = await env.DB.prepare(
    `
      SELECT
        id,
        created_at,
        updated_at,
        status,
        payment_status,
        payment_provider,
        payment_reference,
        customer_name,
        customer_email,
        customer_phone,
        address_line1,
        address_line2,
        postal_code,
        city,
        country,
        notes,
        items_json,
        total_amount,
        currency
      FROM orders
      WHERE id = ?
      LIMIT 1
    `
  )
    .bind(id)
    .first<Record<string, unknown>>();

  return json({
    ok: true,
    order: {
      ...updated,
      items: JSON.parse(String(updated?.items_json || '[]'))
    }
  });
};
