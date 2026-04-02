import { buildChatKnowledge, chatContext, type ChatContext } from '../../src/data/chatContext';
import { productCategories, products, type Product } from '../../src/data/products';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  role?: ChatRole;
  content?: string;
};

type ChatRequestBody = {
  message?: string;
  history?: ChatMessage[];
};

type AiBinding = {
  run: (model: string, input: unknown) => Promise<unknown>;
};

export type ChatEnv = {
  AI: AiBinding;
  CHATBOT_MODEL?: string;
  CHATBOT_STORE_NAME?: string;
  CHATBOT_SUPPORT_EMAIL?: string;
  CHATBOT_SUPPORT_WHATSAPP?: string;
  CHATBOT_SHIPPING_SUMMARY?: string;
  CHATBOT_PAYMENT_SUMMARY?: string;
  CHATBOT_RETURNS_SUMMARY?: string;
  CHATBOT_PACKAGING_SUMMARY?: string;
  CHATBOT_EXTRA_CONTEXT?: string;
};

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const DEFAULT_MODEL = '@cf/moonshotai/kimi-k2.5';

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders
    }
  });
}

function sanitizeText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function sanitizeHistory(history: unknown): Array<{ role: ChatRole; content: string }> {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .map((entry) => {
      const role = entry?.role === 'assistant' ? 'assistant' : entry?.role === 'user' ? 'user' : null;
      const content = sanitizeText(entry?.content, 1200);

      if (!role || !content) {
        return null;
      }

      return { role, content };
    })
    .filter((entry): entry is { role: ChatRole; content: string } => Boolean(entry))
    .slice(-8);
}

function formatPrice(value: number) {
  return `${value.toFixed(2).replace('.', ',')} €`;
}

function buildResolvedContext(env: ChatEnv): ChatContext {
  const storeName = sanitizeText(env.CHATBOT_STORE_NAME, 120);
  const supportEmail = sanitizeText(env.CHATBOT_SUPPORT_EMAIL, 200);
  const supportWhatsApp = sanitizeText(env.CHATBOT_SUPPORT_WHATSAPP, 80);
  const shippingSummary = sanitizeText(env.CHATBOT_SHIPPING_SUMMARY, 1000);
  const paymentSummary = sanitizeText(env.CHATBOT_PAYMENT_SUMMARY, 1000);
  const returnsSummary = sanitizeText(env.CHATBOT_RETURNS_SUMMARY, 1000);
  const packagingSummary = sanitizeText(env.CHATBOT_PACKAGING_SUMMARY, 1000);
  const extraContext = sanitizeText(env.CHATBOT_EXTRA_CONTEXT, 2000);

  return {
    ...chatContext,
    storeName: storeName || chatContext.storeName,
    supportEmail: supportEmail || chatContext.supportEmail,
    supportWhatsApp: supportWhatsApp || chatContext.supportWhatsApp,
    shippingSummary: shippingSummary || chatContext.shippingSummary,
    paymentSummary: paymentSummary || chatContext.paymentSummary,
    returnsSummary: returnsSummary || chatContext.returnsSummary,
    packagingSummary: packagingSummary || chatContext.packagingSummary,
    extraContext: extraContext || chatContext.extraContext,
    faq: chatContext.faq
  };
}

function buildCategoryKnowledge() {
  return productCategories
    .map((category) => `${category.label} (${category.value})`)
    .join('\n');
}

function buildProductLine(product: Product) {
  const categoryLabel =
    productCategories.find((category) => category.value === product.category)?.label || product.category;

  const flags = [
    product.isBestSeller ? 'best seller' : '',
    product.isNew ? 'novo' : ''
  ]
    .filter(Boolean)
    .join(', ');

  return [
    `Nome: ${product.name}`,
    `Slug: ${product.slug}`,
    `Categoria: ${categoryLabel}`,
    `Preço: ${formatPrice(product.price)}`,
    product.compareAtPrice ? `Preço anterior: ${formatPrice(product.compareAtPrice)}` : '',
    `Resumo: ${product.shortDescription}`,
    `Descrição: ${product.description}`,
    product.tags.length ? `Tags: ${product.tags.join(', ')}` : '',
    flags ? `Destaques: ${flags}` : ''
  ]
    .filter(Boolean)
    .join('\n');
}

function buildProductKnowledge() {
  return products.map((product) => buildProductLine(product)).join('\n\n');
}

function buildSystemPrompt(env: ChatEnv) {
  const context = buildResolvedContext(env);
  const knowledge = buildChatKnowledge(context);
  const categoryKnowledge = buildCategoryKnowledge();
  const productKnowledge = buildProductKnowledge();

  return [
    `És a assistente virtual da loja ${context.storeName}.`,
    'Responde sempre em português de Portugal.',
    `O teu tom deve ser ${context.tone}.`,
    `O teu público principal é: ${context.audience}.`,
    'Ajuda os clientes com produtos, categorias, envios, pagamentos, embalagem discreta, disponibilidade no catálogo, encomendas e dúvidas gerais da loja.',
    'Nunca inventes preços, stock, promoções, prazos exatos, métodos de pagamento, ingredientes, materiais ou características técnicas que não tenham sido confirmados.',
    'Só podes usar preços que estejam presentes no catálogo abaixo.',
    'Não confirmes stock real. Podes dizer que um produto existe no catálogo atual, mas que a disponibilidade final deve ser validada pela loja se necessário.',
    'Quando o cliente pedir ajuda a escolher, sugere produtos ou categorias do catálogo real abaixo de forma clara, discreta e útil.',
    'Quando o cliente mencionar um produto específico, responde com base no nome, categoria, resumo, descrição e preço desse produto se ele existir no catálogo.',
    'Quando não souberes uma resposta específica, diz claramente que precisas de confirmação humana e orienta para contacto direto.',
    'Nunca peças dados completos de cartão, IBAN, passwords, códigos de autenticação ou documentos pessoais no chat.',
    'Mantém as respostas curtas a médias, claras e úteis.',
    'Sempre que fizer sentido, termina com um próximo passo simples.',
    `Base de conhecimento da loja:\n\n${knowledge}`,
    `Categorias reais da loja:\n\n${categoryKnowledge}`,
    `Catálogo real atual:\n\n${productKnowledge}`
  ].join('\n\n');
}

function extractReply(result: unknown) {
  if (typeof result === 'string') {
    return result.trim();
  }

  if (!result || typeof result !== 'object') {
    return '';
  }

  const value = result as Record<string, unknown>;

  if (typeof value.response === 'string') {
    return value.response.trim();
  }

  if (typeof value.output_text === 'string') {
    return value.output_text.trim();
  }

  if (Array.isArray(value.result)) {
    const text = value.result
      .map((item) => {
        if (typeof item === 'string') {
          return item;
        }

        if (item && typeof item === 'object' && typeof (item as Record<string, unknown>).text === 'string') {
          return (item as Record<string, unknown>).text as string;
        }

        return '';
      })
      .join(' ')
      .trim();

    if (text) {
      return text;
    }
  }

  if (value.result && typeof value.result === 'object') {
    const nested = value.result as Record<string, unknown>;

    if (typeof nested.response === 'string') {
      return nested.response.trim();
    }

    if (typeof nested.output_text === 'string') {
      return nested.output_text.trim();
    }
  }

  return '';
}

export async function handleChatRequest(request: Request, env: ChatEnv) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  if (request.method !== 'POST') {
    return json(
      {
        ok: false,
        error: 'Método não permitido'
      },
      405
    );
  }

  if (!env.AI || typeof env.AI.run !== 'function') {
    return json(
      {
        ok: false,
        error: 'Binding AI não configurada'
      },
      500
    );
  }

  let body: ChatRequestBody;

  try {
    body = await request.json<ChatRequestBody>();
  } catch {
    return json(
      {
        ok: false,
        error: 'JSON inválido'
      },
      400
    );
  }

  const message = sanitizeText(body.message, 2000);
  const history = sanitizeHistory(body.history);

  if (!message) {
    return json(
      {
        ok: false,
        error: 'Mensagem vazia'
      },
      400
    );
  }

  const model = sanitizeText(env.CHATBOT_MODEL, 120) || DEFAULT_MODEL;
  const systemPrompt = buildSystemPrompt(env);

  try {
    const result = await env.AI.run(model, {
      messages: [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: message }
      ],
      max_tokens: 700,
      temperature: 0.4
    });

    const reply = extractReply(result);

    if (!reply) {
      return json(
        {
          ok: false,
          error: 'Sem resposta do modelo'
        },
        502
      );
    }

    return json({
      ok: true,
      reply,
      model
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : 'Erro ao gerar resposta';

    return json(
      {
        ok: false,
        error: message
      },
      500
    );
  }
}
