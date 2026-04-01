import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, CreditCard, Lock, Package, Wallet } from 'lucide-react';
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
    description: 'Disponível para ser integrado como primeiro método de pagamento.',
  },
  {
    id: 'stripe',
    label: 'Stripe',
    status: 'soon',
    description: 'Brevemente disponível após validação da conta.',
  },
  {
    id: 'mbway',
    label: 'MB WAY',
    status: 'soon',
    description: 'Brevemente disponível após ativação e validação.',
  },
];

const Checkout: React.FC = () => {
  const { items, subtotal } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('paypal');

  const selectedOption = useMemo(
    () => paymentOptions.find((option) => option.id === selectedPayment),
    [selectedPayment]
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white md:px-10">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
            Checkout
          </span>

          <h1 className="mt-6 text-3xl font-semibold md:text-5xl">
            O teu carrinho está vazio
          </h1>

          <p className="mt-4 max-w-2xl text-white/70">
            Antes de avançares para pagamento, adiciona pelo menos um produto ao carrinho.
          </p>

          <Link
            to="/loja"
            className="mt-8 inline-flex rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
          >
            Ir para a loja
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
            Checkout
          </span>

          <h1 className="mt-6 text-3xl font-semibold md:text-5xl">
            Finaliza a tua encomenda com discrição
          </h1>

          <p className="mt-4 max-w-2xl text-white/70">
            Confirma os teus dados, escolhe o método de pagamento e prepara-te para uma
            experiência simples, segura e confidencial.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-white/80" />
                <h2 className="text-xl font-semibold">Dados de entrega</h2>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <input type="text" placeholder="Nome completo" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-white/30" />
                <input type="email" placeholder="Email" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-white/30" />
                <input type="tel" placeholder="Telefone" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-white/30" />
                <input type="text" placeholder="NIF" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-white/30" />
                <input type="text" placeholder="Morada" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-white/30 md:col-span-2" />
                <input type="text" placeholder="Código-postal" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-white/30" />
                <input type="text" placeholder="Localidade" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-white/30" />
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-white/80" />
                <h2 className="text-xl font-semibold">Método de pagamento</h2>
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
                        if (!isSoon) setSelectedPayment(option.id);
                      }}
                      className={[
                        'w-full rounded-[1.5rem] border p-5 text-left transition',
                        isSelected
                          ? 'border-white/30 bg-white/10'
                          : 'border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/5',
                        isSoon ? 'opacity-70' : '',
                      ].join(' ')}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            {option.id === 'mbway' ? (
                              <div className="flex h-8 items-center justify-center rounded-md bg-white px-2">
                                <img src={logoSrc} alt={option.label} className="h-5 w-auto object-contain" />
                              </div>
                            ) : (
                              <img src={logoSrc} alt={option.label} className="h-6 w-auto shrink-0 opacity-90" />
                            )}

                            <span className="text-base font-medium text-white">{option.label}</span>

                            <span
                              className={[
                                'rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.25em]',
                                isSoon
                                  ? 'border-amber-400/20 bg-amber-400/10 text-amber-200'
                                  : 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
                              ].join(' ')}
                            >
                              {isSoon ? 'Brevemente' : 'Disponível'}
                            </span>
                          </div>

                          <p className="mt-3 text-sm leading-6 text-white/65">
                            {option.description}
                          </p>
                        </div>

                        {!isSoon ? (
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-white" />
                        ) : null}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-white/80" />
                  <h3 className="text-base font-medium">Estado atual</h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-white/70">
                  {selectedOption?.id === 'paypal'
                    ? 'O PayPal é o método prioritário para a próxima integração funcional do checkout.'
                    : 'Este método ficará visível no checkout, mas será ativado quando a validação da conta estiver concluída.'}
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-white/80" />
                <h2 className="text-xl font-semibold">Privacidade e discrição</h2>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-medium text-white">Embalagem neutra</p>
                  <p className="mt-2 text-sm leading-6 text-white/60">Sem referências visíveis ao conteúdo exterior.</p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-medium text-white">Processo seguro</p>
                  <p className="mt-2 text-sm leading-6 text-white/60">Estrutura preparada para checkout protegido e estável.</p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-medium text-white">Confidencialidade</p>
                  <p className="mt-2 text-sm leading-6 text-white/60">Experiência pensada para ser elegante, simples e reservada.</p>
                </div>
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold">Resumo da encomenda</h2>

            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm font-medium text-white">{item.product.name}</p>
                    <p className="mt-1 text-sm text-white/55">
                      {item.quantity} × {item.product.price.toFixed(2).replace('.', ',')} €
                    </p>
                  </div>

                  <p className="text-sm font-medium text-white">
                    {(item.product.price * item.quantity).toFixed(2).replace('.', ',')} €
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between text-white/70">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2).replace('.', ',')} €</span>
              </div>

              <div className="flex items-center justify-between text-white/70">
                <span>Envio</span>
                <span>A calcular</span>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 text-base font-semibold text-white">
                <span>Total estimado</span>
                <span>{subtotal.toFixed(2).replace('.', ',')} €</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.01]"
            >
              Continuar com {selectedPayment === 'paypal' ? 'PayPal' : 'método indisponível'}
            </button>

            <p className="mt-4 text-xs leading-6 text-white/50">
              O fluxo visual do checkout está preparado. A ligação final ao gateway será ativada por método.
            </p>

            <Link to="/carrinho" className="mt-4 inline-flex text-sm text-white/70 transition hover:text-white">
              Voltar ao carrinho
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
