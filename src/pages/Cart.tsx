import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Carrinho</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-5xl">
            O teu carrinho está vazio
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Explora a nossa seleção e adiciona os produtos que mais combinam contigo.
          </p>

          <div className="mt-8">
            <Link
              to="/loja"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:scale-[1.02]"
            >
              Ir para a loja
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Carrinho</p>
            <h1 className="mt-3 text-3xl font-semibold md:text-5xl">A tua seleção</h1>
            <p className="mt-4 max-w-2xl text-white/70">
              Revê os produtos, ajusta as quantidades e segue para checkout com total discrição.
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="inline-flex w-fit rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Limpar carrinho
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
          <section className="space-y-4">
            {items.map((item) => {
              const lineTotal = item.product.price * item.quantity;

              return (
                <article
                  key={item.product.id}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-4 md:p-6"
                >
                  <div className="flex flex-col gap-5 md:flex-row">
                    <Link
                      to={`/produto/${item.product.slug}`}
                      className="block shrink-0 overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent md:w-44"
                    >
                      <div className="aspect-[4/5] w-full" />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0">
                          <p className="text-xs uppercase tracking-[0.3em] text-white/35">
                            {item.product.category}
                          </p>

                          <Link
                            to={`/produto/${item.product.slug}`}
                            className="mt-2 block text-xl font-semibold text-white transition hover:text-white/80"
                          >
                            {item.product.name}
                          </Link>

                          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
                            {item.product.shortDescription}
                          </p>
                        </div>

                        <div className="shrink-0 text-left md:text-right">
                          <p className="text-lg font-semibold text-white">
                            {lineTotal.toFixed(2).replace('.', ',')} €
                          </p>
                          <p className="mt-1 text-sm text-white/45">
                            {item.product.price.toFixed(2).replace('.', ',')} € / unidade
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-neutral-950/70 p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
                            aria-label={`Diminuir quantidade de ${item.product.name}`}
                          >
                            <Minus className="h-4 w-4" />
                          </button>

                          <span className="min-w-12 text-center text-sm font-medium text-white">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
                            aria-label={`Aumentar quantidade de ${item.product.name}`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
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

          <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Resumo</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Detalhes da encomenda</h2>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between gap-4 text-sm text-white/70">
                <span>Subtotal</span>
                <span className="text-white">{subtotal.toFixed(2).replace('.', ',')} €</span>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm text-white/70">
                <span>Envio</span>
                <span className="text-white">Calculado no checkout</span>
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-base font-medium text-white">Total estimado</span>
                <span className="text-2xl font-semibold text-white">
                  {subtotal.toFixed(2).replace('.', ',')} €
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                to="/checkout"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-neutral-950 transition hover:scale-[1.01]"
              >
                Avançar para checkout
              </Link>

              <Link
                to="/loja"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Continuar a comprar
              </Link>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-white/65">
              <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
                Envio discreto e embalagem neutra.
              </div>
              <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
                Compra segura com checkout protegido.
              </div>
              <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
                Privacidade e descrição cuidadosa em toda a experiência.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Cart;
