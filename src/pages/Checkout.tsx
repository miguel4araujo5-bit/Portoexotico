import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, CreditCard, Lock, Package, Wallet, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

type PaymentMethod = 'paypal' | 'stripe' | 'mbway';

const paymentOptions: Array<{
  id: PaymentMethod;
  label: string;
  status: 'available' | 'soon';
  description: string;
}> = [
  {
    id: 'paypal',
    label: 'PayPal',
    status: 'available',
    description: 'Método prioritário para conclusão segura da encomenda.',
  },
  {
    id: 'stripe',
    label: 'Stripe',
    status: 'soon',
    description: 'Disponível brevemente após conclusão da configuração.',
  },
  {
    id: 'mbway',
    label: 'MB WAY',
    status: 'soon',
    description: 'Disponível brevemente após ativação e validação.',
  },
];

const logoSvgSrc = '/favicon.svg';
const logoFallbackSrc = '/favicon-96x96.png';

const Checkout: React.FC = () => {
  const { items, subtotal } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('paypal');

  const selectedOption = useMemo(
    () => paymentOptions.find((option) => option.id === selectedPayment),
    [selectedPayment]
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#fcf8fa] px-6 py-16 text-neutral-900 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-3 rounded-full border border-[#8f355d]/10 bg-white px-4 py-3 shadow-[0_14px_36px_rgba(143,53,93,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(143,53,93,0.14)]"
          >
            <picture>
              <source srcSet={logoSvgSrc} type="image/svg+xml" />
              <img
                src={logoFallbackSrc}
                alt="Porto Exótico"
                className="h-8 w-8 object-contain"
              />
            </picture>

            <div className="min-w-0">
              <span className="block font-serif text-lg font-semibold leading-none tracking-[0.01em] text-[#7a2f4f]">
                Porto Exótico
              </span>
              <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.32em] text-[#a55b7d]">
                Compra discreta e segura
              </span>
            </div>
          </Link>

          <span className="mt-8 inline-flex rounded-full border border-[#8f355d]/10 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
            Checkout
          </span>

          <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-[#6f2947] md:text-5xl">
            O seu carrinho está vazio
          </h1>

          <p className="mt-4 max-w-2xl text-neutral-700">
            Antes de avançar para o pagamento, adicione pelo menos um artigo ao carrinho.
          </p>

          <Link
            to="/loja"
            className="mt-8 inline-flex rounded-full bg-[linear-gradient(135deg,#8f355d_0%,#a84f78_100%)] px-6 py-3 text-sm font-medium text-white shadow-[0_16px_38px_rgba(143,53,93,0.24)] transition duration-300 hover:-translate-y-0.5"
          >
            Ir para a loja
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcf8fa] text-neutral-900">
      <section className="relative overflow-hidden border-b border-[#8f355d]/10 px-6 py-16 md:px-10">
        <div className="absolute inset-0">
          <div className="absolute left-[-8%] top-[-8%] h-[28rem] w-[28rem] rounded-full bg-[#b24d79]/10 blur-3xl" />
          <div className="absolute right-[-6%] top-[10%] h-[24rem] w-[24rem] rounded-full bg-[#e7c9a5]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,53,93,0.06),transparent_42%),linear-gradient(180deg,rgba(252,248,250,0.94),rgba(252,248,250,0.98))]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-3 rounded-full border border-[#8f355d]/10 bg-white/95 px-4 py-3 shadow-[0_14px_38px_rgba(143,53,93,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_46px_rgba(143,53,93,0.14)]"
              >
                <picture>
                  <source srcSet={logoSvgSrc} type="image/svg+xml" />
                  <img
                    src={logoFallbackSrc}
                    alt="Porto Exótico"
                    className="h-8 w-8 object-contain"
                  />
                </picture>

                <div className="min-w-0">
                  <span className="block font-serif text-lg font-semibold leading-none tracking-[0.01em] text-[#7a2f4f]">
                    Porto Exótico
                  </span>
                  <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.32em] text-[#a55b7d]">
                    Compra discreta e segura
                  </span>
                </div>
              </Link>

              <span className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-white/80 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[#9b5a79] shadow-[0_10px_30px_rgba(143,53,93,0.06)]">
                <Sparkles className="h-4 w-4" />
                Finalização premium
              </span>
            </div>

            <span className="mt-8 inline-flex rounded-full border border-[#8f355d]/10 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
              Checkout
            </span>

            <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-[#6f2947] md:text-6xl">
              Finalize a sua encomenda com discrição, elegância e confiança.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700 md:text-lg">
              Confirme os seus dados, escolha o método de pagamento disponível e conclua a sua compra
              de forma simples, reservada e segura.
            </p>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/80 p-4 shadow-[0_12px_28px_rgba(143,53,93,0.05)] backdrop-blur-md">
              <p className="text-sm font-medium text-[#6f2947]">Checkout protegido</p>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Processo pensado para gerar confiança do início ao fim.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/80 p-4 shadow-[0_12px_28px_rgba(143,53,93,0.05)] backdrop-blur-md">
              <p className="text-sm font-medium text-[#6f2947]">Discrição total</p>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Embalagem neutra e comunicação mais reservada.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/80 p-4 shadow-[0_12px_28px_rgba(143,53,93,0.05)] backdrop-blur-md">
              <p className="text-sm font-medium text-[#6f2947]">Compra elegante</p>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Uma experiência visual premium e orientada para conforto.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="space-y-8">
              <div className="rounded-[2rem] border border-[#8f355d]/10 bg-white/82 p-6 shadow-[0_18px_50px_rgba(143,53,93,0.08)] backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-[#8f355d]" />
                  <h2 className="text-xl font-semibold text-[#6f2947]">Dados de entrega</h2>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Nome completo"
                    className="rounded-2xl border border-[#8f355d]/10 bg-[#fffafb] px-4 py-3 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#8f355d]/30 focus:bg-white"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="rounded-2xl border border-[#8f355d]/10 bg-[#fffafb] px-4 py-3 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#8f355d]/30 focus:bg-white"
                  />
                  <input
                    type="tel"
                    placeholder="Telefone"
                    className="rounded-2xl border border-[#8f355d]/10 bg-[#fffafb] px-4 py-3 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#8f355d]/30 focus:bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Morada"
                    className="rounded-2xl border border-[#8f355d]/10 bg-[#fffafb] px-4 py-3 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#8f355d]/30 focus:bg-white md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Código-postal"
                    className="rounded-2xl border border-[#8f355d]/10 bg-[#fffafb] px-4 py-3 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#8f355d]/30 focus:bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Localidade"
                    className="rounded-2xl border border-[#8f355d]/10 bg-[#fffafb] px-4 py-3 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#8f355d]/30 focus:bg-white"
                  />
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#8f355d]/10 bg-white/82 p-6 shadow-[0_18px_50px_rgba(143,53,93,0.08)] backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-[#8f355d]" />
                  <h2 className="text-xl font-semibold text-[#6f2947]">Método de pagamento</h2>
                </div>

                <div className="mt-6 space-y-4">
                  {paymentOptions.map((option) => {
                    const isSoon = option.status === 'soon';
                    const isSelected = selectedPayment === option.id;
                    const logoSrc =
                      option.id === 'paypal'
                        ? '/paypal.svg'
                        : option.id === 'stripe'
                          ? '/stripe.svg'
                          : '/mbway.svg';

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          if (!isSoon) {
                            setSelectedPayment(option.id);
                          }
                        }}
                        className={[
                          'w-full rounded-[1.5rem] border p-5 text-left transition duration-300',
                          isSelected
                            ? 'border-[#8f355d]/25 bg-[#fff7fb] shadow-[0_12px_28px_rgba(143,53,93,0.08)]'
                            : 'border-[#8f355d]/10 bg-[#fffafb] hover:border-[#8f355d]/20 hover:bg-white',
                          isSoon ? 'cursor-not-allowed opacity-85' : '',
                        ].join(' ')}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                              <div className="flex h-9 w-[60px] items-center justify-center rounded-[0.85rem] bg-[#f4f1eb] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-black/5">
                                <img
                                  src={logoSrc}
                                  alt={option.label}
                                  className={
                                    option.id === 'mbway'
                                      ? 'h-[30px] w-auto object-contain'
                                      : 'h-[33px] w-auto object-contain'
                                  }
                                />
                              </div>

                              <span className="text-base font-medium text-[#6f2947]">
                                {option.label}
                              </span>

                              <span
                                className={[
                                  'w-[120px] rounded-full border py-1 text-center text-[10px] uppercase tracking-[0.25em]',
                                  isSoon
                                    ? 'border-[#8f355d]/10 bg-white text-amber-700'
                                    : 'border-[#8f355d]/10 bg-white text-emerald-700',
                                ].join(' ')}
                              >
                                {isSoon ? 'Brevemente' : 'Disponível'}
                              </span>
                            </div>

                            <p className="mt-3 text-sm leading-6 text-neutral-600">
                              {option.description}
                            </p>
                          </div>

                          {!isSoon ? (
                            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#8f355d]" />
                          ) : null}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-[#8f355d]/10 bg-[#fffafb] p-5">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-[#8f355d]" />
                    <h3 className="text-base font-medium text-[#6f2947]">Estado atual</h3>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-neutral-700">
                    {selectedOption?.id === 'paypal'
                      ? 'O PayPal é atualmente o método selecionado para a conclusão da encomenda.'
                      : 'Este método ficará disponível assim que a respetiva configuração estiver concluída.'}
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#8f355d]/10 bg-white/82 p-6 shadow-[0_18px_50px_rgba(143,53,93,0.08)] backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-[#8f355d]" />
                  <h2 className="text-xl font-semibold text-[#6f2947]">Privacidade e discrição</h2>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-[#fffafb] p-4">
                    <p className="text-sm font-medium text-[#6f2947]">Embalagem neutra</p>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      Sem referências visíveis ao conteúdo no exterior da encomenda.
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-[#fffafb] p-4">
                    <p className="text-sm font-medium text-[#6f2947]">Processo seguro</p>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      Estrutura pensada para uma compra simples, protegida e estável.
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-[#fffafb] p-4">
                    <p className="text-sm font-medium text-[#6f2947]">Confidencialidade</p>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      Uma experiência reservada, elegante e orientada para o seu conforto.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <aside className="h-fit rounded-[2rem] border border-[#8f355d]/10 bg-white/82 p-6 shadow-[0_18px_50px_rgba(143,53,93,0.08)] backdrop-blur-md">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-[#fffafb] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
                <ShieldCheck className="h-4 w-4" />
                Resumo seguro
              </div>

              <h2 className="mt-6 font-serif text-2xl font-semibold text-[#6f2947]">
                Resumo da encomenda
              </h2>

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-start justify-between gap-4 border-b border-[#8f355d]/10 pb-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#6f2947]">{item.product.name}</p>
                      <p className="mt-1 text-sm text-neutral-500">
                        {item.quantity} × {item.product.price.toFixed(2).replace('.', ',')} €
                      </p>
                    </div>

                    <p className="text-sm font-medium text-[#6f2947]">
                      {(item.product.price * item.quantity).toFixed(2).replace('.', ',')} €
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2).replace('.', ',')} €</span>
                </div>

                <div className="flex items-center justify-between text-neutral-600">
                  <span>Envio</span>
                  <span>A calcular</span>
                </div>

                <div className="flex items-center justify-between border-t border-[#8f355d]/10 pt-4 text-base font-semibold text-[#6f2947]">
                  <span>Total estimado</span>
                  <span>{subtotal.toFixed(2).replace('.', ',')} €</span>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#8f355d_0%,#a84f78_100%)] px-6 py-3 text-sm font-medium text-white shadow-[0_16px_38px_rgba(143,53,93,0.24)] transition duration-300 hover:-translate-y-0.5"
              >
                Continuar com {selectedPayment === 'paypal' ? 'PayPal' : 'método disponível brevemente'}
              </button>

              <p className="mt-4 text-xs leading-6 text-neutral-500">
                O resumo da encomenda está preparado para uma finalização simples, discreta e clara.
              </p>

              <Link
                to="/carrinho"
                className="mt-4 inline-flex text-sm text-[#7a2f4f] transition hover:text-[#8f355d]"
              >
                Voltar ao carrinho
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Checkout;
