import {
  badRequest,
  buildExpiredSessionCookie,
  buildSessionCookie,
  createSessionToken,
  getClientIp,
  json,
  methodNotAllowed,
  requireAdmin,
  unauthorized,
  verifyPassword,
  type Env as AuthEnv
} from '../functions/_utils/auth';
import { handleChatRequest, type ChatEnv } from '../functions/api/chat';

type WorkerEnv = AuthEnv &
  ChatEnv & {
    ASSETS: Fetcher;
    ADMIN_PASSWORD?: string;
    PAYPAL_CLIENT_ID?: string;
    PAYPAL_CLIENT_SECRET?: string;
    PAYPAL_ENVIRONMENT?: string;
    STORE_NAME?: string;
    STORE_EMAIL?: string;
    MBWAY_PHONE_NUMBER?: string;
  };

type LoginBody = {
  username?: string;
  password?: string;
};

type CheckoutCustomer = {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  postalCode?: string;
  locality?: string;
};

type CheckoutItem = {
  productId?: string | number;
  name?: string;
  quantity?: number;
  unitPrice?: number;
  lineTotal?: number;
  image?: string;
};

type CheckoutBody = {
  customer?: CheckoutCustomer;
  marketingConsent?: boolean;
  paymentMethod?: 'paypal' | 'stripe' | 'mbway';
  items?: CheckoutItem[];
  subtotal?: number;
  total?: number;
  currency?: string;
};

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

const MAX_ATTEMPTS = 7;
const WINDOW_SECONDS = 15 * 60;
const ORDER_STATUSES = new Set([
  'pending',
  'paid',
  'processing',
  'shipped',
  'completed',
  'cancelled'
]);
const PAYMENT_STATUSES = new Set(['pending', 'paid', 'failed', 'refunded']);

function isValidCheckoutBody(body: CheckoutBody) {
  if (!body || typeof body !== 'object') {
    return false;
  }

  if (!body.customer || typeof body.customer !== 'object') {
    return false;
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return false;
  }

  if (typeof body.total !== 'number' || Number.isNaN(body.total) || body.total <= 0) {
    return false;
  }

  return true;
}

function sanitizeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeCurrency(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim().toUpperCase() : 'EUR';
}

function formatAmount(value: number) {
  return value.toFixed(2);
}

function parseItemsJson(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapOrderRow(row: OrderRow) {
  return {
    id: row.id,
    created_at: row.created_at,
    updated_at: row.updated_at,
    status: row.status,
    payment_status: row.payment_status,
    payment_provider: row.payment_provider,
    payment_reference: row.payment_reference,
    customer_name: row.customer_name,
    customer_email: row.customer_email,
    customer_phone: row.customer_phone,
    address_line1: row.address_line1,
    address_line2: row.address_line2,
    postal_code: row.postal_code,
    city: row.city,
    country: row.country,
    notes: row.notes,
    items: parseItemsJson(row.items_json),
    total_amount: typeof row.total_amount === 'number' ? row.total_amount : Number(row.total_amount),
    currency: row.currency
  };
}

function getPaypalBaseUrl(env: WorkerEnv) {
  return env.PAYPAL_ENVIRONMENT === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
}

async function getPaypalAccessToken(env: WorkerEnv) {
  if (!env.PAYPAL_CLIENT_ID || !env.PAYPAL_CLIENT_SECRET) {
    throw new Error('Configuração PayPal incompleta no servidor.');
  }

  const auth = btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`);
  const response = await fetch(`${getPaypalBaseUrl(env)}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  const result = (await response.json().catch(() => null)) as
    | { access_token?: string; error_description?: string }
    | null;

  if (!response.ok || !result?.access_token) {
    throw new Error(result?.error_description || 'Não foi possível autenticar no PayPal.');
  }

  return result.access_token;
}

async function handlePaypalCreateOrder(request: Request, env: WorkerEnv) {
  if (request.method !== 'POST') {
    return methodNotAllowed();
  }

  let body: CheckoutBody;

  try {
    body = await request.json<CheckoutBody>();
  } catch {
    return badRequest('JSON inválido');
  }

  if (!isValidCheckoutBody(body)) {
    return badRequest('Dados de checkout inválidos');
  }

  if (body.paymentMethod !== 'paypal') {
    return badRequest('Método de pagamento inválido para esta rota');
  }

  const customer = body.customer || {};
  const total = typeof body.total === 'number' ? body.total : 0;
  const currency = normalizeCurrency(body.currency);

  const accessToken = await getPaypalAccessToken(env);
  const origin = new URL(request.url).origin;

  const storeName = sanitizeText(env.STORE_NAME) || 'Porto Exótico';
  const customerName = sanitizeText(customer.fullName);
  const customerEmail = sanitizeText(customer.email);
  const customerPhone = sanitizeText(customer.phone);
  const customerAddress = sanitizeText(customer.address);
  const customerPostalCode = sanitizeText(customer.postalCode);
  const customerLocality = sanitizeText(customer.locality);

  const itemTotal = body.items!.reduce((sum, item) => {
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
    const unitPrice = typeof item.unitPrice === 'number' ? item.unitPrice : 0;
    return sum + quantity * unitPrice;
  }, 0);

  const paypalOrderPayload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        description: `Encomenda ${storeName}`,
        amount: {
          currency_code: currency,
          value: formatAmount(total),
          breakdown: {
            item_total: {
              currency_code: currency,
              value: formatAmount(itemTotal)
            }
          }
        },
        items: body.items!.map((item) => ({
          name: sanitizeText(item.name) || 'Artigo',
          quantity: String(typeof item.quantity === 'number' ? item.quantity : 1),
          unit_amount: {
            currency_code: currency,
            value: formatAmount(typeof item.unitPrice === 'number' ? item.unitPrice : 0)
          }
        })),
        custom_id: crypto.randomUUID(),
        soft_descriptor: 'PORTOEXOTICO'
      }
    ],
    application_context: {
      brand_name: storeName,
      user_action: 'PAY_NOW',
      return_url: `${origin}/checkout?paypal=success`,
      cancel_url: `${origin}/checkout?paypal=cancel`
    },
    payer: {
      name: customerName
        ? {
            given_name: customerName
          }
        : undefined,
      email_address: customerEmail || undefined,
      phone: customerPhone
        ? {
            phone_type: 'MOBILE',
            phone_number: {
              national_number: customerPhone.replace(/\s+/g, '')
            }
          }
        : undefined,
      address:
        customerAddress || customerPostalCode || customerLocality
          ? {
              address_line_1: customerAddress || undefined,
              admin_area_2: customerLocality || undefined,
              postal_code: customerPostalCode || undefined,
              country_code: 'PT'
            }
          : undefined
    }
  };

  const response = await fetch(`${getPaypalBaseUrl(env)}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paypalOrderPayload)
  });

  const result = (await response.json().catch(() => null)) as
    | {
        id?: string;
        links?: Array<{ href?: string; rel?: string; method?: string }>;
        message?: string;
      }
    | null;

  if (!response.ok || !result?.id) {
    return json(
      {
        ok: false,
        error: result?.message || 'Não foi possível criar a order PayPal.'
      },
      { status: 500 }
    );
  }

  const approvalUrl = result.links?.find((link) => link.rel === 'approve')?.href;

  if (!approvalUrl) {
    return json(
      {
        ok: false,
        error: 'A ligação de aprovação do PayPal não foi devolvida.'
      },
      { status: 500 }
    );
  }

  return json({
    ok: true,
    orderId: result.id,
    approvalUrl
  });
}

async function handleMbwayCreate(request: Request, env: WorkerEnv) {
  if (request.method !== 'POST') {
    return methodNotAllowed();
  }

  let body: CheckoutBody;

  try {
    body = await request.json<CheckoutBody>();
  } catch {
    return badRequest('JSON inválido');
  }

  if (!isValidCheckoutBody(body)) {
    return badRequest('Dados de checkout inválidos');
  }

  if (body.paymentMethod !== 'mbway') {
    return badRequest('Método de pagamento inválido para esta rota');
  }

  const customer = body.customer || {};
  const total = typeof body.total === 'number' ? body.total : 0;
  const mbwayPhoneNumber = sanitizeText(env.MBWAY_PHONE_NUMBER) || '938777576';
  const orderReference = crypto.randomUUID().slice(0, 8).toUpperCase();

  const customerName = sanitizeText(customer.fullName);
  const customerEmail = sanitizeText(customer.email);

  if (!customerName || !customerEmail) {
    return badRequest('Dados do cliente incompletos');
  }

  return json({
    ok: true,
    orderReference,
    mbwayPhoneNumber,
    total: formatAmount(total),
    message: `Encomenda registada com sucesso. Efetue o pagamento de ${formatAmount(total)} € por MB WAY para o número ${mbwayPhoneNumber}. Referência interna: ${orderReference}. A encomenda ficará sujeita a validação manual.`
  });
}

async function handleAdminLogin(request: Request, env: WorkerEnv) {
  if (request.method !== 'POST') {
    return methodNotAllowed();
  }

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

async function handleAdminSession(request: Request, env: WorkerEnv) {
  if (request.method !== 'GET') {
    return methodNotAllowed();
  }

  const session = await requireAdmin(request, env);

  if (!session) {
    return unauthorized();
  }

  return json({
    ok: true,
    user: {
      username: session.u
    }
  });
}

async function handleAdminLogout(request: Request) {
  if (request.method !== 'POST') {
    return methodNotAllowed();
  }

  return json(
    { ok: true },
    {
      headers: {
        'Set-Cookie': buildExpiredSessionCookie()
      }
    }
  );
}

async function handleAdminOrders(request: Request, env: WorkerEnv, url: URL) {
  if (request.method !== 'GET') {
    return methodNotAllowed();
  }

  const session = await requireAdmin(request, env);

  if (!session) {
    return unauthorized();
  }

  const status = sanitizeText(url.searchParams.get('status'));
  const paymentStatus = sanitizeText(url.searchParams.get('paymentStatus'));

  const conditions: string[] = [];
  const bindings: Array<string> = [];

  if (status && status !== 'all') {
    conditions.push('status = ?');
    bindings.push(status);
  }

  if (paymentStatus && paymentStatus !== 'all') {
    conditions.push('payment_status = ?');
    bindings.push(paymentStatus);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const stmt = env.DB.prepare(`
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
    ${whereClause}
    ORDER BY datetime(created_at) DESC
  `).bind(...bindings);

  const result = await stmt.all<OrderRow>();
  const orders = (result.results || []).map(mapOrderRow);

  return json({
    ok: true,
    orders
  });
}

async function handleAdminOrderDetail(request: Request, env: WorkerEnv, orderId: string) {
  const session = await requireAdmin(request, env);

  if (!session) {
    return unauthorized();
  }

  if (request.method === 'GET') {
    const row = await env.DB.prepare(`
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
    `)
      .bind(orderId)
      .first<OrderRow>();

    if (!row) {
      return json({ ok: false, error: 'Encomenda não encontrada' }, { status: 404 });
    }

    return json({
      ok: true,
      order: mapOrderRow(row)
    });
  }

  if (request.method === 'PATCH') {
    let body: { status?: string; payment_status?: string };

    try {
      body = await request.json<{ status?: string; payment_status?: string }>();
    } catch {
      return badRequest('JSON inválido');
    }

    const nextStatus = sanitizeText(body.status);
    const nextPaymentStatus = sanitizeText(body.payment_status);

    if (!nextStatus && !nextPaymentStatus) {
      return badRequest('Sem alterações para aplicar');
    }

    if (nextStatus && !ORDER_STATUSES.has(nextStatus)) {
      return badRequest('Estado de encomenda inválido');
    }

    if (nextPaymentStatus && !PAYMENT_STATUSES.has(nextPaymentStatus)) {
      return badRequest('Estado de pagamento inválido');
    }

    const existing = await env.DB.prepare(`
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
    `)
      .bind(orderId)
      .first<OrderRow>();

    if (!existing) {
      return json({ ok: false, error: 'Encomenda não encontrada' }, { status: 404 });
    }

    const updatedAt = new Date().toISOString();
    const finalStatus = nextStatus || existing.status;
    const finalPaymentStatus = nextPaymentStatus || existing.payment_status;

    await env.DB.prepare(`
      UPDATE orders
      SET
        status = ?,
        payment_status = ?,
        updated_at = ?
      WHERE id = ?
    `)
      .bind(finalStatus, finalPaymentStatus, updatedAt, orderId)
      .run();

    const updated = await env.DB.prepare(`
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
    `)
      .bind(orderId)
      .first<OrderRow>();

    if (!updated) {
      return json({ ok: false, error: 'Encomenda não encontrada' }, { status: 404 });
    }

    return json({
      ok: true,
      order: mapOrderRow(updated)
    });
  }

  return methodNotAllowed();
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);

    try {
      if (url.pathname === '/api/admin/login') {
        return await handleAdminLogin(request, env);
      }

      if (url.pathname === '/api/admin/session') {
        return await handleAdminSession(request, env);
      }

      if (url.pathname === '/api/admin/logout') {
        return await handleAdminLogout(request);
      }

      if (url.pathname === '/api/admin/orders') {
        return await handleAdminOrders(request, env, url);
      }

      if (url.pathname.startsWith('/api/admin/orders/')) {
        const orderId = decodeURIComponent(url.pathname.replace('/api/admin/orders/', '').trim());

        if (!orderId || orderId.includes('/')) {
          return json({ ok: false, error: 'ID de encomenda inválido' }, { status: 400 });
        }

        return await handleAdminOrderDetail(request, env, orderId);
      }

      if (url.pathname === '/api/chat') {
        return await handleChatRequest(request, env);
      }

      if (url.pathname === '/api/payments/paypal/create-order') {
        return await handlePaypalCreateOrder(request, env);
      }

      if (url.pathname === '/api/payments/mbway/create') {
        return await handleMbwayCreate(request, env);
      }

      return env.ASSETS.fetch(request);
    } catch (error) {
      const message =
        error instanceof Error && error.message ? error.message : 'Erro interno do worker';

      const stack =
        error instanceof Error && error.stack ? error.stack : 'Sem stack disponível';

      if (url.pathname.startsWith('/api/')) {
        return json(
          {
            ok: false,
            error: message,
            stack
          },
          { status: 500 }
        );
      }

      return new Response('Erro interno do worker', { status: 500 });
    }
  }
};
