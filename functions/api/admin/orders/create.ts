import type { PagesFunction } from '@cloudflare/workers-types';
import {
  badRequest,
  json,
  methodNotAllowed,
  type Env
} from '../../_utils/auth';

type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  image?: string;
};

type OrderBody = {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  notes?: string;
  items?: OrderItem[];
  currency?: string;
};

function createOrderId() {
  const value = crypto.randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase();
  return `PE-${value}`;
}

function normalizeText(value: string | undefined) {
  return (value || '').trim();
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: OrderBody;

  try {
    body = await request.json<OrderBody>();
  } catch {
    return badRequest('JSON inválido');
  }

  const customerName = normalizeText(body.customerName);
  const customerEmail = normalizeText(body.customerEmail);
  const customerPhone = normalizeText(body.customerPhone);
  const addressLine1 = normalizeText(body.addressLine1);
  const addressLine2 = normalizeText(body.addressLine2);
  const postalCode = normalizeText(body.postalCode);
  const city = normalizeText(body.city);
  const country = normalizeText(body.country || 'Portugal');
  const notes = normalizeText(body.notes);
  const currency = normalizeText(body.currency || 'EUR');
  const items = Array.isArray(body.items) ? body.items : [];

  if (!customerName || !customerEmail || !addressLine1 || !postalCode || !city || !country) {
    return badRequest('Faltam dados obrigatórios');
  }

  if (items.length === 0) {
    return badRequest('Carrinho vazio');
  }

  const sanitizedItems = items
    .filter((item) => item && item.productId && item.name && item.quantity > 0 && item.unitPrice >= 0)
    .map((item) => ({
      productId: String(item.productId),
      name: String(item.name),
      quantity: Number(item.quantity),
      unitPrice: Number(item.unitPrice),
      image: item.image ? String(item.image) : undefined
    }));

  if (sanitizedItems.length === 0) {
    return badRequest('Itens inválidos');
  }

  const totalAmount = sanitizedItems.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice;
  }, 0);

  const now = new Date().toISOString();
  const id = createOrderId();

  await env.DB.prepare(
    `
      INSERT INTO orders (
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
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
  )
    .bind(
      id,
      now,
      now,
      'pending',
      'pending',
      null,
      null,
      customerName,
      customerEmail,
      customerPhone || null,
      addressLine1,
      addressLine2 || null,
      postalCode,
      city,
      country,
      notes || null,
      JSON.stringify(sanitizedItems),
      totalAmount,
      currency
    )
    .run();

  return json({
    ok: true,
    order: {
      id,
      status: 'pending',
      paymentStatus: 'pending',
      totalAmount,
      currency
    }
  });
};

export const onRequest: PagesFunction = async () => {
  return methodNotAllowed();
};
