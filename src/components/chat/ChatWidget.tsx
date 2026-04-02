import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type ChatResponse = {
  ok?: boolean;
  reply?: string;
  error?: string;
  model?: string;
  stack?: string;
};

const assistantAvatar = '/diana-avatar.png';

const initialMessages: ChatMessage[] = [
  {
    role: 'assistant',
    content:
      'Olá. Sou a Diana, a assistente da Porto Exótico. Posso ajudar com produtos, envios, pagamentos, embalagem discreta e outras dúvidas.'
  }
];

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const openChat = () => setIsOpen(true);

    window.addEventListener('portoexotico:open-chat', openChat);

    return () => {
      window.removeEventListener('portoexotico:open-chat', openChat);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  }, [isOpen, messages, isSending]);

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  const sendMessage = async () => {
    const content = input.trim();

    if (!content || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput('');
    setIsSending(true);

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: content,
          history: nextMessages.slice(-8, -1)
        }),
        signal: abortRef.current.signal
      });

      const raw = await response.text();

      let data: ChatResponse = {};

      try {
        data = raw ? (JSON.parse(raw) as ChatResponse) : {};
      } catch {
        data = {};
      }

      if (!response.ok) {
        const combinedError = [data.error || raw || `Erro HTTP ${response.status}`, data.stack]
          .filter(Boolean)
          .join('\n\n');

        throw new Error(combinedError);
      }

      if (!data.ok) {
        const combinedError = [data.error || 'Pedido sem sucesso', data.stack]
          .filter(Boolean)
          .join('\n\n');

        throw new Error(combinedError);
      }

      if (typeof data.reply !== 'string' || !data.reply.trim()) {
        const combinedError = [data.error || 'Resposta vazia do assistente', data.stack]
          .filter(Boolean)
          .join('\n\n');

        throw new Error(combinedError);
      }

      const reply = data.reply.trim();

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: reply
        }
      ]);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      const errorMessage =
        error instanceof Error && error.message
          ? error.message
          : 'Não foi possível responder neste momento.';

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: `Erro do assistente: ${errorMessage}`
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendMessage();
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      await sendMessage();
    }
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-4 right-4 z-50 flex h-[36rem] w-[calc(100vw-2rem)] max-w-[24rem] flex-col overflow-hidden rounded-[2rem] border border-[#8f355d]/15 bg-white shadow-[0_20px_80px_rgba(32,12,22,0.18)]">
          <div className="flex items-center justify-between border-b border-[#8f355d]/10 bg-[#fcf8fa] px-5 py-4">
            <div className="flex items-center gap-3">
              <img
                src={assistantAvatar}
                alt="Diana"
                className="h-11 w-11 shrink-0 object-contain"
              />
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#8f355d]/70">
                  Assistente
                </p>
                <h3 className="mt-1 text-base font-semibold text-neutral-900">Porto Exótico</h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#8f355d]/10 bg-white text-neutral-700 transition hover:border-[#8f355d]/20 hover:text-neutral-950"
              aria-label="Fechar chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex-1 space-y-4 overflow-y-auto bg-white px-4 py-4"
          >
            {messages.map((message, index) => {
              const isUser = message.role === 'user';

              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-3xl px-4 py-3 text-sm leading-6 ${
                      isUser
                        ? 'rounded-br-md bg-[#8f355d] text-white'
                        : 'rounded-bl-md border border-[#8f355d]/10 bg-[#fcf8fa] text-neutral-900'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              );
            })}

            {isSending ? (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-3xl rounded-bl-md border border-[#8f355d]/10 bg-[#fcf8fa] px-4 py-3 text-sm text-neutral-500">
                  A responder...
                </div>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-[#8f355d]/10 bg-white p-4">
            <label htmlFor="porto-exotico-chat-input" className="sr-only">
              Escreve a tua mensagem
            </label>

            <div className="rounded-[1.5rem] border border-[#8f355d]/15 bg-[#fcf8fa] p-2">
              <textarea
                id="porto-exotico-chat-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                rows={3}
                maxLength={700}
                placeholder="Escreve aqui a tua dúvida..."
                className="min-h-[88px] w-full resize-none bg-transparent px-3 py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
              />

              <div className="flex items-center justify-between px-2 pb-1 pt-2">
                <p className="text-xs text-neutral-500">
                  Produtos, envios, pagamentos e dúvidas gerais
                </p>

                <button
                  type="submit"
                  disabled={!canSend}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#8f355d] text-white transition hover:bg-[#7c2f52] disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Enviar mensagem"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#8f355d] text-white shadow-[0_18px_40px_rgba(143,53,93,0.35)] transition hover:scale-[1.02] hover:bg-[#7c2f52]"
        aria-label="Abrir chat"
      >
        <MessageCircle className="h-7 w-7" />
      </button>
    </>
  );
};

export default ChatWidget;
