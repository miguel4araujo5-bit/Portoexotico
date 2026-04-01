import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Minus,
  Plus,
  Trash2,
  ShieldCheck,
  Lock,
  CreditCard,
  PackageCheck,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productCategories } from '../data/products';

const fallbackImage = '/produtos/Satisfyer.webp';
const logoSvgSrc = '/favicon.svg';
const logoFallbackSrc = '/favicon-96x96.png';

const Cart: React.FC = () => {
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  const totalQuantity = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const compareSubtotal = useMemo(
    () =>
      items.reduce((total, item) => {
        const referencePrice = item.product.compareAtPrice ?? item.product.price;
        return total + referencePrice * item.quantity;
      }, 0),
    [items]
  );

  const savings = Math.max(compareSubtotal - subtotal, 0);

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#fcf8fa] px-6 py-16 text-neutral-900 md:px-10">
        <div className="mx-auto max-w-5xl">
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

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full border border-[#8f355d]/10 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
              Carrinho
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
              <Sparkles className="h-4 w-4" />
              Compra premium
            </span>
          </div>

          <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-[#6f2947] md:text-5xl">
            O seu carrinho está vazio
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-700">
            Explore a nossa seleção e adicione os artigos que pretende comprar com discrição,
            conforto e confiança.
          </p>

          <div className="mt-8">
            <Link
              to="/loja"
              className="inline-flex rounded-full bg-[linear-gradient(135deg,#8f355d_0%,#a84f78_100%)] px-6 py-3 text-sm font-medium text-white shadow-[0_16px_38px_rgba(143,53,93,0.24)] transition duration-300 hover:-translate-y-0.5"
            >
              Ir para a loja
            </Link>
          </div>
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
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded-full border border-[#8f355d]/10 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
                  Carrinho
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
                  <Sparkles className="h-4 w-4" />
                  Seleção premium
                </span>
              </div>

              <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-[#6f2947] md:text-6xl">
                Reveja a sua seleção antes de finalizar a compra.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700 md:text-lg">
                Ajuste quantidades, confirme os artigos e avance para checkout com total discrição,
                conforto e confiança.
              </p>
            </div>

            <button
              type="button"
              onClick={clearCart}
              className="inline-flex w-fit rounded-full border border-[#8f355d]/15 bg-white px-5 py-3 text-sm font-medium text-[#7a2f4f] transition duration-300 hover:border-[#8f355d]/28 hover:bg-[#fff7fb]"
            >
              Limpar carrinho
            </button>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/80 p-4 shadow-[0_12px_28px_rgba(143,53,93,0.05)] backdrop-blur-md">
              <p className="text-sm font-medium text-[#6f2947]">Envio discreto</p>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Embalagem neutra e maior privacidade em cada encomenda.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/80 p-4 shadow-[0_12px_28px_rgba(143,53,93,0.05)] backdrop-blur-md">
              <p className="text-sm font-medium text-[#6f2947]">Compra segura</p>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Um processo simples, claro e pensado para gerar confiança.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/80 p-4 shadow-[0_12px_28px_rgba(143,53,93,0.05)] backdrop-blur-md">
              <p className="text-sm font-medium text-[#6f2947]">Experiência premium</p>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Uma apresentação elegante e mais confortável para decidir comprar.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
            <section className="space-y-4">
              {items.map((item) => {
                const lineTotal = item.product.price * item.quantity;
                const categoryLabel =
                  productCategories.find((category) => category.value === item.product.category)
                    ?.label ?? item.product.category;

                return (
                  <article
                    key={item.product.id}
                    className="group rounded-[2rem] border border-[#8f355d]/10 bg-white/82 p-4 shadow-[0_18px_50px_rgba(143,53,93,0.08)] transition duration-300 hover:border-[#8f355d]/22 hover:shadow-[0_22px_56px_rgba(143,53,93,0.12)] md:p-6"
                  >
                    <div className="flex flex-col gap-5 md:flex-row">
                      <Link
                        to={`/produto/${item.product.slug}`}
                        className="block shrink-0 overflow-hidden rounded-[1.5rem] border border-[#8f355d]/10 bg-[#f7eef2] md:w-44"
                      >
                        <img
                          src={item.product.image || fallbackImage}
                          alt={item.product.name}
                          className="aspect-[4/5] h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col justify-between gap-5">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="min-w-0">
                            <p className="text-xs uppercase tracking-[0.3em] text-[#a55b7d]">
                              {categoryLabel}
                            </p>

                            <Link
                              to={`/produto/${item.product.slug}`}
                              className="mt-2 block font-serif text-2xl font-semibold leading-tight text-[#6f2947] transition hover:text-[#8f355d]"
                            >
                              {item.product.name}
                            </Link>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600">
                              {item.product.shortDescription}
                            </p>
                          </div>

                          <div className="shrink-0 text-left md:text-right">
                            <p className="text-xl font-semibold text-[#6f2947]">
                              {lineTotal.toFixed(2).replace('.', ',')} €
                            </p>
                            <p className="mt-1 text-sm text-neutral-400">
                              {item.product.price.toFixed(2).replace('.', ',')} € / unidade
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="inline-flex w-fit items-center rounded-full border border-[#8f355d]/10 bg-[#fffafb] p-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#7a2f4f] transition hover:bg-white hover:text-[#8f355d]"
                              aria-label={`Diminuir quantidade de ${item.product.name}`}
                            >
                              <Minus className="h-4 w-4" />
                            </button>

                            <span className="min-w-12 text-center text-sm font-medium text-[#6f2947]">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#7a2f4f] transition hover:bg-white hover:text-[#8f355d]"
                              aria-label={`Aumentar quantidade de ${item.product.name}`}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/12 bg-white px-4 py-2.5 text-sm font-medium text-[#7a2f4f] transition duration-300 hover:border-[#8f355d]/28 hover:bg-[#fff7fb]"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            <aside className="h-fit rounded-[2rem] border border-[#8f355d]/10 bg-white/82 p-6 shadow-[0_18px_50px_rgba(143,53,93,0.08)] backdrop-blur-md md:p-7">
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

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-[#fffafb] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
                <ShieldCheck className="h-4 w-4" />
                Resumo seguro
              </div>

              <h2 className="mt-4 font-serif text-2xl font-semibold text-[#6f2947]">
                Detalhes da encomenda
              </h2>

              <p className="mt-3 text-sm text-neutral-500">
                {totalQuantity} artigo{totalQuantity === 1 ? '' : 's'} selecionado
                {totalQuantity === 1 ? '' : 's'}
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between gap-4 text-sm text-neutral-600">
                  <span>Subtotal</span>
                  <span className="text-[#6f2947]">{subtotal.toFixed(2).replace('.', ',')} €</span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm text-neutral-600">
                  <span>Envio</span>
                  <span className="text-[#6f2947]">Calculado no checkout</span>
                </div>

                {savings > 0 ? (
                  <div className="flex items-center justify-between gap-4 text-sm text-emerald-700">
                    <span>Poupança atual</span>
                    <span>{savings.toFixed(2).replace('.', ',')} €</span>
                  </div>
                ) : null}

                <div className="h-px bg-[#8f355d]/10" />

                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-medium text-[#6f2947]">Total estimado</span>
                  <span className="text-2xl font-semibold text-[#6f2947]">
                    {subtotal.toFixed(2).replace('.', ',')} €
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-[#8f355d]/10 bg-[#fffafb] p-4">
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#a55b7d]">Envio</p>
                    <p className="mt-2 text-sm text-neutral-700">Discreto e neutro</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#a55b7d]">
                      Pagamento
                    </p>
                    <p className="mt-2 text-sm text-neutral-700">Seguro no checkout</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#a55b7d]">
                      Privacidade
                    </p>
                    <p className="mt-2 text-sm text-neutral-700">Compra confidencial</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Link
                  to="/checkout"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#8f355d_0%,#a84f78_100%)] px-6 py-3.5 text-sm font-medium text-white shadow-[0_16px_38px_rgba(143,53,93,0.24)] transition duration-300 hover:-translate-y-0.5"
                >
                  Finalizar compra com discrição
                </Link>

                <p className="text-center text-xs leading-6 text-neutral-500">
                  Embalagem discreta, checkout protegido e uma experiência reservada do início ao fim.
                </p>

                <Link
                  to="/loja"
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#8f355d]/15 bg-white px-6 py-3.5 text-sm font-medium text-[#7a2f4f] transition duration-300 hover:border-[#8f355d]/28 hover:bg-[#fff7fb]"
                >
                  Continuar a comprar
                </Link>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-[#8f355d]/10 bg-[#fffafb] p-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#a55b7d]">
                  Pagamentos disponíveis
                </p>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#8f355d]/10 bg-white px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-[60px] items-center justify-center rounded-[0.85rem] bg-[#f4f1eb] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-black/5">
                        <img
                          src="/paypal.svg"
                          alt="PayPal"
                          className="h-[33px] w-auto object-contain"
                        />
                      </div>
                      <span className="text-sm text-[#6f2947]">PayPal</span>
                    </div>

                    <span className="w-[120px] rounded-full border border-[#8f355d]/10 bg-[#fffafb] py-1 text-center text-[10px] uppercase tracking-[0.22em] text-emerald-700">
                      Disponível
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#8f355d]/10 bg-white px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-[60px] items-center justify-center rounded-[0.85rem] bg-[#f4f1eb] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-black/5">
                        <img
                          src="/stripe.svg"
                          alt="Stripe"
                          className="h-[33px] w-auto object-contain"
                        />
                      </div>
                      <span className="text-sm text-[#6f2947]">Stripe</span>
                    </div>

                    <span className="w-[120px] rounded-full border border-[#8f355d]/10 bg-[#fffafb] py-1 text-center text-[10px] uppercase tracking-[0.22em] text-amber-700">
                      Brevemente
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#8f355d]/10 bg-white px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-[60px] items-center justify-center rounded-[0.85rem] bg-[#f4f1eb] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-black/5">
                        <img
                          src="/mbway.svg"
                          alt="MB WAY"
                          className="h-[30px] w-auto object-contain"
                        />
                      </div>
                      <span className="text-sm text-[#6f2947]">MB WAY</span>
                    </div>

                    <span className="w-[120px] rounded-full border border-[#8f355d]/10 bg-[#fffafb] py-1 text-center text-[10px] uppercase tracking-[0.22em] text-amber-700">
                      Brevemente
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  Checkout protegido com opções de pagamento práticas, seguras e adequadas a uma
                  compra discreta.
                </p>
              </div>

              <div className="mt-8 grid gap-3 text-sm">
                <div className="rounded-2xl border border-[#8f355d]/10 bg-[#fffafb] p-4 text-neutral-700">
                  <div className="flex items-start gap-3">
                    <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#8f355d]" />
                    <div>
                      <p className="font-medium text-[#6f2947]">Envio discreto</p>
                      <p className="mt-1 leading-6">
                        Embalagem neutra e maior privacidade em cada encomenda.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#8f355d]/10 bg-[#fffafb] p-4 text-neutral-700">
                  <div className="flex items-start gap-3">
                    <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-[#8f355d]" />
                    <div>
                      <p className="font-medium text-[#6f2947]">Compra segura</p>
                      <p className="mt-1 leading-6">
                        Um processo de checkout simples, claro e pensado para gerar confiança.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#8f355d]/10 bg-[#fffafb] p-4 text-neutral-700">
                  <div className="flex items-start gap-3">
                    <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#8f355d]" />
                    <div>
                      <p className="font-medium text-[#6f2947]">Privacidade garantida</p>
                      <p className="mt-1 leading-6">
                        Discrição, conforto e confidencialidade em toda a experiência.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
