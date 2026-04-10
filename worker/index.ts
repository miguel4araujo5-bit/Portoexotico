import {
  badRequest,
  buildSessionCookie,
  createSessionToken,
  getClientIp,
  json,
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

const MAX_ATTEMPTS = 7;
const WINDOW_SECONDS = 15 * 60;

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
    return json({ ok: false, error: 'Método não permitido' }, { status: 405 });
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
    return json({ ok: false, error: 'Método não permitido' }, { status: 405 });
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
    return json({ ok: false, error: 'Método não permitido' }, { status: 405 });
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

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);

    try {
      if (url.pathname === '/api/admin/login') {
        return await handleAdminLogin(request, env);
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
