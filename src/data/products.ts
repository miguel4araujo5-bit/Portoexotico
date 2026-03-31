import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '../data/products';
import { useCart } from '../context/CartContext';

const Product: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();

  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white md:px-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-semibold md:text-5xl">
            Produto não encontrado
          </h1>
          <p className="mt-4 text-white/70">
            Este produto não existe ou foi removido.
          </p>
          <Link
            to="/loja"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950"
          >
            Voltar à loja
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-neutral-950 text-white">
      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-[4/5] rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent" />

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Produto
            </p>

            <h1 className="mt-3 text-3xl font-semibold md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-2xl font-semibold">
                {product.price.toFixed(2).replace('.', ',')} €
              </span>
              {product.compareAtPrice && (
                <span className="text-white/40 line-through">
                  {product.compareAtPrice.toFixed(2).replace('.', ',')} €
                </span>
              )}
            </div>

            <p className="mt-6 text-sm leading-7 text-white/70 md:text-base">
              {product.description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => addToCart(product)}
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:scale-[1.02]"
              >
                Adicionar ao carrinho
              </button>

              <Link
                to="/loja"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Continuar a explorar
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 text-sm text-white/70 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Envio discreto
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Compra segura
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Privacidade garantida
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Product;;
