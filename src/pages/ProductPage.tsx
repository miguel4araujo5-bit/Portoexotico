import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Heart, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { products } from '../data/products';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((item) => item.id === id);

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return products
      .filter((item) => item.id !== product.id && item.category === product.category)
      .slice(0, 3);
  }, [product]);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white">
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-white/60 transition hover:text-white"
          >
            Voltar à loja
          </Link>

          <div className="mt-12 max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">Produto</p>
            <h1 className="mt-4 text-3xl font-semibold md:text-4xl">Produto não encontrado</h1>
            <p className="mt-4 text-white/65">
              O produto que procuras não está disponível ou foi removido da loja.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
            >
              Explorar produtos
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const description =
    'description' in product && typeof product.description === 'string' && product.description.trim().length > 0
      ? product.description
      : product.shortDescription;

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 md:px-10">
          <nav className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/45">
            <Link to="/" className="transition hover:text-white">
              Início
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/shop" className="transition hover:text-white">
              Shop
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/75">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
              <img
                src={product.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80'}
                alt={product.name}
                className="h-[420px] w-full object-cover md:h-[560px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <ShieldCheck className="h-5 w-5 text-white/80" />
                <p className="mt-3 text-sm font-medium">Discrição garantida</p>
                <p className="mt-1 text-sm text-white/55">Embalagem e envio discretos.</p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <Truck className="h-5 w-5 text-white/80" />
                <p className="mt-3 text-sm font-medium">Entrega rápida</p>
                <p className="mt-1 text-sm text-white/55">Processamento simples e seguro.</p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 col-span-2 sm:col-span-1">
                <Heart className="h-5 w-5 text-white/80" />
                <p className="mt-3 text-sm font-medium">Seleção cuidada</p>
                <p className="mt-1 text-sm text-white/55">Produtos pensados para bem-estar e prazer.</p>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur md:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-white/45">{product.category}</p>

              <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
                {product.name}
              </h1>

              <p className="mt-5 text-base leading-7 text-white/68 md:text-lg">
                {description}
              </p>

              <div className="mt-8 flex items-end gap-3">
                <span className="text-3xl font-semibold md:text-4xl">{product.price}€</span>
                <span className="pb-1 text-sm text-white/45">IVA incluído</span>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                <p className="text-sm font-medium text-white/88">Porque vais gostar deste produto</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-white/60">
                  <li>Toque premium e apresentação elegante</li>
                  <li>Ideal para explorar novas sensações com discrição</li>
                  <li>Selecionado para uma experiência mais sofisticada</li>
                </ul>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <span className="text-sm text-white/60">Quantidade</span>

                <div className="ml-auto inline-flex items-center overflow-hidden rounded-full border border-white/10 bg-white/5">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="flex h-11 w-11 items-center justify-center text-lg text-white/80 transition hover:bg-white/10 hover:text-white"
                    aria-label="Diminuir quantidade"
                  >
                    −
                  </button>

                  <span className="flex h-11 min-w-[52px] items-center justify-center text-sm font-medium">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="flex h-11 w-11 items-center justify-center text-lg text-white/80 transition hover:bg-white/10 hover:text-white"
                    aria-label="Aumentar quantidade"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:scale-[1.02]"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Adicionar ao carrinho
                </button>

                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10"
                >
                  Comprar agora
                </button>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-white/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 space-y-3 rounded-[1.5rem] border border-white/10 bg-black/20 p-4 text-sm text-white/58">
                <p>Envio discreto e embalagem neutra.</p>
                <p>Pagamentos seguros disponíveis no checkout.</p>
                <p>Suporte pensado para uma compra cómoda e confidencial.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Sugestões</p>
                <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
                  Também te pode interessar
                </h2>
              </div>

              <Link
                to="/shop"
                className="hidden text-sm text-white/60 transition hover:text-white md:inline-flex"
              >
                Ver todos
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>

                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/40">{item.category}</p>
                    <h3 className="mt-3 text-lg font-medium">{item.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/58">
                      {item.shortDescription}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-lg font-semibold">{item.price}€</span>
                      <span className="text-sm text-white/60 transition group-hover:text-white">
                        Ver produto
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductPage;
