import type { PagesFunction } from '@cloudflare/workers-types';
import {
  json,
  requireAdmin,
  unauthorized,
  type Env
} from '../../_utils/auth';

type OrderRow = {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  payment_status: string;
  payment_provider: string | null;
  payment_reference: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  address_line1: string;
  address_line2: string | null;
  postal_code: string;
  city: string;
  country: string;
  notes: string | null;
  items_json: string;
  total_amount: number;
  currency: string;
};

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const session = await requireAdmin(request, env);

  if (!session) {
    return unauthorized();
  }

  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const paymentStatus = url.searchParams.get('paymentStatus');
  const limit = Math.min(Number(url.searchParams.get('limit') || '50'), 100);

  let query = `
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
  `;

  const conditions: string[] = [];
  const bindings: unknown[] = [];

  if (status) {
    conditions.push('status = ?');
    bindings.push(status);
  }

  if (paymentStatus) {
    conditions.push('payment_status = ?');
    bindings.push(paymentStatus);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  query += ` ORDER BY datetime(created_at) DESC LIMIT ?`;
  bindings.push(limit);

  const result = await env.DB.prepare(query).bind(...bindings).all<OrderRow>();

  const orders = (result.results || []).map((order) => ({
    ...order,
    items: JSON.parse(order.items_json)
  }));

  return json({
    ok: true,
    orders
  });
};
