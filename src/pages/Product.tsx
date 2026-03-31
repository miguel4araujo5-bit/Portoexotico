import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductBySlug } from '../data/products';

const Product: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white md:px-10">
        <div className="mx-auto max-w-5xl">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
            Produto
          </span>

          <h1 className="mt-6 text-3xl font-semibold md:text-5xl">
            Produto não encontrado
          </h1>

          <p className="mt-4 max-w-2xl text-white/70">
            Este produto não existe ou foi removido.
          </p>

          <Link
            to="/loja"
            className="mt-8 inline-flex items-center rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:bg-white/90"
          >
            Voltar à loja
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white md:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
          <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-fuchsia-500/10 via-transparent to-amber-400/10 p-8">
            <div className="text-center">
              <span className="inline-block rounded-full border border-white/10 bg-black/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
                Porto Exótico
              </span>

              <h2 className="mt-6 text-2xl font-semibold md:text-4xl">
                {product.name}
              </h2>

              <p className="mt-4 text-sm uppercase tracking-[0.25em] text-white/45">
                {product.category}
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
            Produto
          </span>

          <h1 className="mt-6 text-3xl font-semibold md:text-5xl">
            {product.name}
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-2xl font-semibold md:text-3xl">
              {product.price.toFixed(2).replace('.', ',')} €
            </span>

            {product.compareAtPrice ? (
              <span className="text-base text-white/35 line-through">
                {product.compareAtPrice.toFixed(2).replace('.', ',')} €
              </span>
            ) : null}
          </div>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70">
            {product.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:bg-white/90"
            >
              Adicionar ao carrinho
            </button>

            <Link
              to="/loja"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"
            >
              Continuar a explorar
            </Link>
          </div>

          <div className="mt-10 grid gap-3 text-sm text-white/55 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              Envio discreto
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              Compra segura
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              Privacidade garantida
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Product; 
