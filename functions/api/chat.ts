import { products, type Product } from '../../src/data/products';
import { buildChatKnowledge, chatContext } from '../../src/data/chatContext';

export type ChatEnv = {
  AI: {
    run: (model: string, input: unknown) => Promise<unknown>;
  };
  PORTOEXOTICO_CHAT_MODEL?: string;
};

type ChatRole = 'user' | 'assistant' | 'system';

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type ChatRequestBody = {
  message?: string;
  history?: Array<{
    role?: string;
    content?: string;
  }>;
};

const DEFAULT_MODEL = '@cf/ibm-granite/granite-4.0-h-micro';

const SYSTEM_PROMPT = `És a Diana, assistente virtual da Porto Exótico.
Responde sempre em português de Portugal.
Usa sempre tratamento formal e respeitoso.
Nunca trates a cliente por tu.
Nunca uses português do Brasil.

Tom:
- discreto
- elegante
- acolhedor
- sensual de forma subtil
- profissional

Estilo obrigatório:
- respostas curtas, claras, naturais e confiantes
- linguagem premium, cuidada e discreta
- usa vocabulário de português de Portugal
- prefere "stock" e nunca "estoque" ou "estocagem"
- prefere construções formais como "posso ajudar", "posso sugerir", "não consigo confirmar"
- evita "para ti", "contigo", "o teu", "a tua", "você", "vocês", "pra", "estoque", "estocagem"

Regras obrigatórias:
- Nunca inventes produtos, marcas, preços, promoções, stock, prazos, pagamentos ou políticas.
- Só podes mencionar ou sugerir produtos presentes no catálogo fornecido no contexto.
- Se a cliente mencionar um artigo específico que não corresponda claramente ao catálogo, não o confirmes.
- Nesses casos, diz com elegância que não consegues confirmar esse artigo específico e sugere até 3 alternativas reais do catálogo.
- Nunca assumas detalhes operacionais como certos.
- Não dês aconselhamento médico nem faças promessas sobre resultados.

Estilo comercial:
- Podes ser envolvente, sofisticada e sugestiva, mas nunca vulgar, explícita ou demasiado informal.
- Mantém sempre um registo premium e discreto.`;

function buildCatalogContext() {
  if (!products.length) {
    return 'Catálogo disponível: nenhum produto carregado. Não podes sugerir artigos específicos.';
  }

  return [
    'Catálogo disponível da loja:',
    ...products.map(
      (product) =>
        `- ${product.name} | categoria: ${product.category} | preço: ${product.price.toFixed(2).replace('.', ',')}€ | tags: ${product.tags.join(', ')}`
    ),
  ].join('\n');
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreProductMatch(message: string, product: Product) {
  const normalizedMessage = normalizeText(message);
  const normalizedName = normalizeText(product.name);
  const normalizedSlug = normalizeText(product.slug);
  const messageTokens = new Set(
    normalizedMessage.split(' ').filter((token) => token.length >= 4)
  );

  let score = 0;

  if (normalizedMessage.includes(normalizedName)) {
    score += 8;
  }

  if (normalizedMessage.includes(normalizedSlug)) {
    score += 7;
  }

  for (const word of normalizedName.split(' ').filter((token) => token.length >= 4)) {
    if (messageTokens.has(word)) {
      score += 2;
    }
  }

  for (const tag of product.tags) {
    const normalizedTag = normalizeText(tag);

    if (normalizedTag.length >= 4 && messageTokens.has(normalizedTag)) {
      score += 2;
    }
  }

  if (messageTokens.has(normalizeText(product.category))) {
    score += 1;
  }

  return score;
}

function findMatchedProducts(message: string) {
  return products
    .map((product) => ({
      product,
      score: scoreProductMatch(message, product),
    }))
    .filter((item) => item.score >= 6)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.product);
}

function buildRequestGuardContext(message: string) {
  const matches = findMatchedProducts(message);

  if (matches.length > 0) {
    return [
      'Correspondência encontrada entre a mensagem da cliente e o catálogo.',
      'Se mencionares produtos nesta resposta, dá prioridade apenas a estes:',
      ...matches.map(
        (product) =>
          `- ${product.name} | categoria: ${product.category} | preço: ${product.price.toFixed(2).replace('.', ',')}€`
      ),
    ].join('\n');
  }

  return [
    'Não foi encontrada correspondência clara entre a mensagem da cliente e o nome de um produto do catálogo.',
    'Se a cliente estiver a pedir ou a confirmar um artigo específico pelo nome, não o confirmes.',
    'Diz com elegância que não consegues confirmar esse artigo específico no catálogo atual.',
    'Depois sugere até 3 alternativas reais do catálogo, mantendo um tom sofisticado, discreto e sugestivo.',
    'Se a pergunta for geral e não sobre um artigo específico, responde normalmente com base no catálogo e no contexto da loja.',
  ].join('\n');
}

function sanitizeReply(reply: string) {
  return reply
    .replace(/\bestocagem\b/gi, 'stock')
    .replace(/\bestoque\b/gi, 'stock')
    .replace(/\bpra\b/gi, 'para')
    .replace(/\bpara ti\b/gi, 'para si')
    .replace(/\bcontigo\b/gi, 'consigo')
    .replace(/\bo teu\b/gi, 'o seu')
    .replace(/\ba tua\b/gi, 'a sua')
    .replace(/\bos teus\b/gi, 'os seus')
    .replace(/\bas tuas\b/gi, 'as suas')
    .replace(/\binteressante para ti\b/gi, 'interessante para si')
    .replace(/\bvocês\b/gi, 'as clientes')
    .replace(/\bvocê\b/gi, 'si')
    .trim();
}

function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...(init?.headers || {}),
    },
  });
}

function normalizeHistory(history: ChatRequestBody['history']): ChatMessage[] {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter(
      (item): item is { role?: string; content?: string } =>
        !!item && typeof item === 'object'
    )
    .map((item) => {
      const role: ChatRole =
        item.role === 'assistant' || item.role === 'system' ? item.role : 'user';

      return {
        role,
        content: typeof item.content === 'string' ? item.content.trim() : '',
      };
    })
    .filter((item) => item.content.length > 0)
    .slice(-8);
}

function extractReply(result: unknown) {
  const extractContent = (value: unknown): string => {
    if (typeof value === 'string') {
      return value.trim();
    }

    if (Array.isArray(value)) {
      const text = value
        .map((item) => {
          if (typeof item === 'string') {
            return item;
          }

          if (
            item &&
            typeof item === 'object' &&
            typeof (item as Record<string, unknown>).text === 'string'
          ) {
            return ((item as Record<string, unknown>).text as string).trim();
          }

          return '';
        })
        .filter(Boolean)
        .join(' ')
        .trim();

      return text;
    }

    return '';
  };

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
    const text = extractContent(value.result);

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

    if (Array.isArray(nested.choices) && nested.choices.length > 0) {
      const firstChoice = nested.choices[0] as Record<string, unknown>;

      if (firstChoice.message && typeof firstChoice.message === 'object') {
        const message = firstChoice.message as Record<string, unknown>;
        const text = extractContent(message.content);

        if (text) {
          return text;
        }
      }

      if (firstChoice.delta && typeof firstChoice.delta === 'object') {
        const delta = firstChoice.delta as Record<string, unknown>;
        const text = extractContent(delta.content);

        if (text) {
          return text;
        }
      }

      const directText = extractContent(firstChoice.text);

      if (directText) {
        return directText;
      }
    }
  }

  if (Array.isArray(value.choices) && value.choices.length > 0) {
    const firstChoice = value.choices[0] as Record<string, unknown>;

    if (firstChoice.message && typeof firstChoice.message === 'object') {
      const message = firstChoice.message as Record<string, unknown>;
      const text = extractContent(message.content);

      if (text) {
        return text;
      }
    }

    if (firstChoice.delta && typeof firstChoice.delta === 'object') {
      const delta = firstChoice.delta as Record<string, unknown>;
      const text = extractContent(delta.content);

      if (text) {
        return text;
      }
    }

    const directText = extractContent(firstChoice.text);

    if (directText) {
      return directText;
    }
  }

  return '';
}

export async function handleChatRequest(request: Request, env: ChatEnv) {
  if (request.method !== 'POST') {
    return json(
      { ok: false, error: 'Método não permitido' },
      { status: 405 }
    );
  }

  if (!env.AI || typeof env.AI.run !== 'function') {
    return json(
      { ok: false, error: 'Binding AI não configurado no Worker' },
      { status: 500 }
    );
  }

  let body: ChatRequestBody;

  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return json(
      { ok: false, error: 'JSON inválido' },
      { status: 400 }
    );
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const history = normalizeHistory(body.history);

  if (!message) {
    return json(
      { ok: false, error: 'Mensagem vazia' },
      { status: 400 }
    );
  }

  const model = env.PORTOEXOTICO_CHAT_MODEL?.trim() || DEFAULT_MODEL;
  const knowledge = buildChatKnowledge(chatContext);
  const catalog = buildCatalogContext();
  const requestGuard = buildRequestGuardContext(message);

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: SYSTEM_PROMPT,
    },
    {
      role: 'system',
      content: knowledge,
    },
    {
      role: 'system',
      content: catalog,
    },
    {
      role: 'system',
      content: requestGuard,
    },
    ...history,
    {
      role: 'user',
      content: message,
    },
  ];

  try {
    const result = await env.AI.run(model, { messages });
    const rawReply = extractReply(result);
    const reply = sanitizeReply(rawReply);

    if (!reply) {
      return json(
        {
          ok: false,
          error: 'Resposta vazia do assistente',
          debug: typeof result === 'object' && result ? result : String(result),
        },
        { status: 502 }
      );
    }

    return json({
      ok: true,
      reply,
      model,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Erro inesperado no assistente';

    const normalized = message.toLowerCase();

    if (
      normalized.includes('3036') ||
      normalized.includes('429') ||
      normalized.includes('daily free allocation') ||
      normalized.includes('10,000 neurons') ||
      normalized.includes('account limited')
    ) {
      return json(
        {
          ok: false,
          error:
            'A nossa assistente encontra-se indisponível até amanhã. Queira contactar-nos pelo email portoexotico@gmail.com para qualquer esclarecimento. Obrigado e pedimos desculpa por qualquer inconveniente.',
        },
        { status: 429 }
      );
    }

    return json(
      {
        ok: false,
        error:
          'A nossa assistente encontra-se temporariamente indisponível. Queira contactar-nos pelo email portoexotico@gmail.com para qualquer esclarecimento. Obrigado e pedimos desculpa por qualquer inconveniente.',
      },
      { status: 500 }
    );
  }
}
