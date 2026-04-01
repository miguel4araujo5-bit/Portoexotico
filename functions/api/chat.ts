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

function buildSystemPrompt(env: ChatEnv) {
  const storeName = sanitizeText(env.CHATBOT_STORE_NAME, 120) || 'Porto Exótico';
  const supportEmail = sanitizeText(env.CHATBOT_SUPPORT_EMAIL, 200);
  const supportWhatsApp = sanitizeText(env.CHATBOT_SUPPORT_WHATSAPP, 80);
  const shippingSummary =
    sanitizeText(env.CHATBOT_SHIPPING_SUMMARY, 1000) ||
    'Os envios são feitos após confirmação do pagamento. Os prazos e custos podem variar consoante a transportadora, destino e disponibilidade do produto.';
  const paymentSummary =
    sanitizeText(env.CHATBOT_PAYMENT_SUMMARY, 1000) ||
    'Os métodos de pagamento disponíveis dependem do checkout ativo na loja. Nunca peças nem aceites dados completos de cartão no chat.';
  const returnsSummary =
    sanitizeText(env.CHATBOT_RETURNS_SUMMARY, 1000) ||
    'Trocas, devoluções e exceções devem respeitar a política da loja e a legislação aplicável aos artigos vendidos.';
  const packagingSummary =
    sanitizeText(env.CHATBOT_PACKAGING_SUMMARY, 1000) ||
    'A comunicação deve ser discreta, profissional e respeitosa. Quando existir embalagem discreta, explica isso de forma objetiva.';
  const extraContext = sanitizeText(env.CHATBOT_EXTRA_CONTEXT, 2000);

  return [
    `És o assistente virtual da loja ${storeName}.`,
    'Responde sempre em português de Portugal.',
    'O teu tom deve ser discreto, elegante, prestável e comercial sem ser agressivo.',
    'Ajuda os clientes com produtos, categorias, envios, pagamentos, embalagem discreta, disponibilidade, encomendas e dúvidas gerais da loja.',
    'Nunca inventes preços, stock, promoções, prazos exatos, métodos de pagamento, ingredientes, materiais ou características técnicas que não tenham sido confirmados.',
    'Quando não souberes uma resposta específica, diz claramente que precisas de confirmação humana e orienta para contacto direto.',
    'Nunca peças dados completos de cartão, IBAN, passwords, códigos de autenticação ou documentos pessoais no chat.',
    'Quando o cliente pedir aconselhamento de produto, dá sugestões gerais e seguras com base no contexto dado, sem linguagem explícita desnecessária.',
    `Envios: ${shippingSummary}`,
    `Pagamentos: ${paymentSummary}`,
    `Trocas e devoluções: ${returnsSummary}`,
    `Discrição e embalagem: ${packagingSummary}`,
    supportEmail ? `Email de apoio: ${supportEmail}` : '',
    supportWhatsApp ? `WhatsApp de apoio: ${supportWhatsApp}` : '',
    extraContext ? `Contexto adicional da loja: ${extraContext}` : '',
    'Mantém as respostas curtas a médias, claras e úteis.',
    'Sempre que fizer sentido, termina com um próximo passo simples.'
  ]
    .filter(Boolean)
    .join('\n');
}

function extractReply(result: unknown) {
  if (typeof result === 'string') {
    return result.trim();
  }

  if (result && typeof result === 'object') {
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
      max_tokens: 500,
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
