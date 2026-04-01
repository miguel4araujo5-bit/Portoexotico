export type ChatFaqItem = {
  question: string;
  answer: string;
};

export type ChatContext = {
  storeName: string;
  supportEmail: string;
  supportWhatsApp: string;
  tone: string;
  audience: string;
  shippingSummary: string;
  paymentSummary: string;
  returnsSummary: string;
  packagingSummary: string;
  orderingSummary: string;
  productSummary: string;
  extraContext: string;
  faq: ChatFaqItem[];
};

export const chatContext: ChatContext = {
  storeName: 'Porto Exótico',
  supportEmail: 'portoexotico@gmail.com',
  supportWhatsApp: '',
  tone: 'discreto, elegante, seguro, acolhedor e comercial sem ser agressivo',
  audience:
    'clientes que valorizam discrição, confiança, explicações claras e uma experiência de compra simples',
  shippingSummary:
    'As encomendas são processadas após confirmação do pagamento. Os prazos e custos de envio podem variar consoante o destino, a transportadora e a disponibilidade dos artigos.',
  paymentSummary:
    'Os métodos de pagamento válidos devem ser os apresentados no checkout. O assistente pode explicar o processo de compra, mas nunca deve pedir dados completos de cartão, códigos de autenticação, IBAN ou credenciais pessoais.',
  returnsSummary:
    'As trocas, devoluções e exceções devem respeitar a política da loja e a legislação aplicável aos artigos vendidos. Quando a resposta depender do tipo de produto ou do estado da embalagem, o assistente deve indicar que a situação será confirmada pela equipa.',
  packagingSummary:
    'A comunicação com o cliente deve reforçar discrição, privacidade e profissionalismo. Quando perguntarem pela embalagem, o assistente deve explicar de forma objetiva e tranquila que a loja privilegia uma experiência reservada.',
  orderingSummary:
    'O assistente deve ajudar o cliente a perceber como encontrar produtos, adicioná-los ao carrinho, avançar para checkout e concluir a encomenda de forma simples.',
  productSummary:
    'O assistente pode orientar o cliente por categorias, explicar diferenças gerais entre tipos de produtos e sugerir opções com base na necessidade descrita, sem inventar características técnicas não confirmadas.',
  extraContext:
    'A marca deve transmitir confiança, sensualidade com elegância, discrição e atendimento humano quando a dúvida exigir confirmação.',
  faq: [
    {
      question: 'Como funciona a encomenda?',
      answer:
        'O cliente escolhe os artigos, adiciona ao carrinho, segue para o checkout, preenche os dados necessários e finaliza o pagamento pelos métodos que estiverem disponíveis nesse momento.'
    },
    {
      question: 'Os envios são discretos?',
      answer:
        'A comunicação da loja deve ser discreta e profissional. Quando o cliente perguntar pelos detalhes de embalagem ou expedição, o assistente deve reforçar a preocupação com privacidade.'
    },
    {
      question: 'Que métodos de pagamento aceitam?',
      answer:
        'Os métodos de pagamento válidos devem ser os que aparecem no checkout no momento da compra. O assistente não deve prometer métodos que não estejam confirmados.'
    },
    {
      question: 'Posso pedir ajuda para escolher um produto?',
      answer:
        'Sim. O assistente pode fazer perguntas simples sobre preferências, intensidade, materiais ou tipo de utilização e depois sugerir categorias ou opções adequadas sem linguagem excessivamente explícita.'
    },
    {
      question: 'Quanto tempo demora a chegar?',
      answer:
        'O prazo depende do destino, do stock e da transportadora. Quando não houver prazo confirmado, o assistente deve explicar isso com clareza e sugerir contacto humano para validação.'
    },
    {
      question: 'Posso trocar ou devolver?',
      answer:
        'As trocas e devoluções dependem da política da loja, do tipo de artigo e do estado em que se encontra. Quando necessário, o assistente deve encaminhar para confirmação pela equipa.'
    },
    {
      question: 'O assistente sabe dizer se um produto está em stock?',
      answer:
        'Só deve indicar disponibilidade quando essa informação estiver realmente confirmada. Caso contrário, deve dizer que a equipa pode validar.'
    }
  ]
};

export function buildChatKnowledge(context: ChatContext) {
  const faqBlock = context.faq
    .map((item) => `Pergunta: ${item.question}\nResposta: ${item.answer}`)
    .join('\n\n');

  return [
    `Loja: ${context.storeName}`,
    `Tom da marca: ${context.tone}`,
    `Público: ${context.audience}`,
    `Resumo de produtos: ${context.productSummary}`,
    `Resumo de encomendas: ${context.orderingSummary}`,
    `Envios: ${context.shippingSummary}`,
    `Pagamentos: ${context.paymentSummary}`,
    `Trocas e devoluções: ${context.returnsSummary}`,
    `Discrição e embalagem: ${context.packagingSummary}`,
    `Contexto adicional: ${context.extraContext}`,
    context.supportEmail ? `Email de apoio: ${context.supportEmail}` : '',
    context.supportWhatsApp ? `WhatsApp de apoio: ${context.supportWhatsApp}` : '',
    faqBlock ? `FAQ interna:\n${faqBlock}` : ''
  ]
    .filter(Boolean)
    .join('\n\n');
}
