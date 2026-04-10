import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Search,
  ShieldCheck,
  Truck,
  Lock,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { productCategories, products, type ProductCategory } from '../data/products';

const fallbackImage = '/produtos/Satisfyer.webp';
const logoSrc = '/logo.png';
const canonicalUrl = 'https://www.portoexotico.pt/loja';

const categoryDescriptions: Record<ProductCategory, string> = {
  prazer: 'Seleção pensada para prazer, intensidade e uma experiência mais premium.',
  acessorios: 'Complementos íntimos para explorar novas dinâmicas com confiança e discrição.',
  lubrificantes: 'Texturas e sensações que elevam conforto, fluidez e experiência sensorial.',
  preservativos: 'Proteção com foco em conforto, segurança e uma experiência mais envolvente.',
  excitacao: 'Soluções para intensificar, prolongar e tornar cada momento mais memorável.',
};

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.shortDescription.toLowerCase().includes(normalizedSearch) ||
        product.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const selectedCategoryLabel =
    selectedCategory === 'all'
      ? 'Toda a coleção'
      : productCategories.find((category) => category.value === selectedCategory)?.label ??
        'Coleção';

  const selectedCategoryDescription =
    selectedCategory === 'all'
      ? 'Descubra uma seleção premium pensada para diferentes preferências, ritmos e intenções de compra.'
      : categoryDescriptions[selectedCategory];

  return (
    <main className="bg-[#fcf8fa] text-neutral-900">
      <Helmet>
        <title>Loja | Porto Exótico</title>
        <meta
          name="description"
          content="Explore a coleção Porto Exótico com produtos de prazer, acessórios, lubrificantes, preservativos e artigos de excitação. Compra discreta, elegante e segura."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="keywords"
          content="loja íntima online, sex shop portugal, produtos de prazer, acessórios íntimos, lubrificantes, preservativos, excitação, compra discreta"
        />
        <meta property="og:title" content="Loja | Porto Exótico" />
        <meta
          property="og:description"
          content="Descubra a coleção Porto Exótico com mais clareza, discrição e confiança na compra."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.portoexotico.pt/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Loja | Porto Exótico" />
        <meta
          name="twitter:description"
          content="Explore produtos íntimos selecionados para uma experiência premium e discreta."
        />
        <meta name="twitter:image" content="https://www.portoexotico.pt/logo.png" />
      </Helmet>

      <section className="relative overflow-hidden border-b border-[#8f355d]/10">
        <div className="absolute inset-0">
          <div className="absolute left-[-8%] top-[-8%] h-[28rem] w-[28rem] rounded-full bg-[#b24d79]/10 blur-3xl" />
          <div className="absolute right-[-6%] top-[10%] h-[24rem] w-[24rem] rounded-full bg-[#e7c9a5]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,53,93,0.06),transparent_42%),linear-gradient(180deg,rgba(252,248,250,0.94),rgba(252,248,250,0.98))]" />
        </div>

        <div className="container-custom relative grid gap-10 py-16 md:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-3 rounded-full border border-[#8f355d]/10 bg-white/95 px-4 py-3 shadow-[0_14px_38px_rgba(143,53,93,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_46px_rgba(143,53,93,0.14)]"
              >
                <img
                  src={logoSrc}
                  alt="Porto Exótico"
                  className="h-8 w-8 object-contain"
                />

                <div className="min-w-0">
                  <span className="block font-serif text-lg font-semibold leading-none tracking-[0.01em] text-[#7a2f4f]">
                    Porto Exótico
                  </span>
                  <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.32em] text-[#a55b7d]">
                    Compra discreta e segura
                  </span>
                </div>
              </Link>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-white/80 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-[#9b5a79] shadow-[0_10px_30px_rgba(143,53,93,0.06)]">
                <Sparkles className="h-4 w-4" />
                Loja premium
              </div>
            </div>

            <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-[#6f2947] md:text-6xl">
              Descubra a coleção com mais clareza, desejo e confiança na compra.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-700 md:text-lg">
              Explore produtos de prazer, acessórios, lubrificantes, preservativos e artigos de
              excitação selecionados para quem valoriza discrição, elegância e uma experiência de
              compra mais cuidada.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-emerald-700">
                Checkout protegido
              </span>
              <span className="rounded-full border border-[#8f355d]/10 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#7a2f4f]">
                Embalagem discreta
              </span>
              <span className="rounded-full border border-[#8f355d]/10 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#7a2f4f]">
                Curadoria premium
              </span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#8f355d]/10 bg-white/80 p-5 shadow-[0_18px_50px_rgba(143,53,93,0.08)] backdrop-blur-md">
            <div className="flex items-start gap-3">
              <div className="rounded-full border border-[#8f355d]/10 bg-[#fff7fb] p-3 text-[#8f355d]">
                <SlidersHorizontal className="h-5 w-5" />
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#a55b7d]">
                  Compra orientada
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[#6f2947]">
                  Filtre, compare e encontre mais depressa o produto certo.
                </h2>
                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  A loja está organizada para facilitar descoberta, intenção e decisão de compra
                  com mais discrição e menos ruído.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.35rem] border border-[#8f355d]/10 bg-[#fffafb] p-4">
                <p className="text-sm font-medium text-[#6f2947]">Discrição total</p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Processo cuidado e comunicação reservada.
                </p>
              </div>

              <div className="rounded-[1.35rem] border border-[#8f355d]/10 bg-[#fffafb] p-4">
                <p className="text-sm font-medium text-[#6f2947]">Visual premium</p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Produtos apresentados com mais desejo e clareza.
                </p>
              </div>

              <div className="rounded-[1.35rem] border border-[#8f355d]/10 bg-[#fffafb] p-4">
                <p className="text-sm font-medium text-[#6f2947]">Escolha segura</p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Navegação simples para comprar com confiança.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4 rounded-[2rem] border border-[#8f355d]/10 bg-white/82 p-4 shadow-[0_18px_50px_rgba(143,53,93,0.08)] backdrop-blur md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a55b7d]" />
                <input
                  type="text"
                  placeholder="Pesquisar por produto, característica ou categoria"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  aria-label="Pesquisar produtos da loja"
                  className="w-full rounded-2xl border border-[#8f355d]/10 bg-[#fffafb] py-3 pl-11 pr-4 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-[#8f355d]/30 focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  aria-label="Filtrar por todos os produtos"
                  aria-pressed={selectedCategory === 'all'}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    selectedCategory === 'all'
                      ? 'bg-[#8f355d] text-white shadow-[0_12px_26px_rgba(143,53,93,0.22)]'
                      : 'border border-[#8f355d]/10 bg-white text-[#7a2f4f] hover:bg-[#fff7fb]'
                  }`}
                >
                  Todos
                </button>

                {productCategories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => setSelectedCategory(category.value)}
                    aria-label={`Filtrar por ${category.label}`}
                    aria-pressed={selectedCategory === category.value}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      selectedCategory === category.value
                        ? 'bg-[#8f355d] text-white shadow-[0_12px_26px_rgba(143,53,93,0.22)]'
                        : 'border border-[#8f355d]/10 bg-white text-[#7a2f4f] hover:bg-[#fff7fb]'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-[1.7rem] border border-[#8f355d]/10 bg-white/82 p-4 shadow-[0_14px_34px_rgba(143,53,93,0.06)] backdrop-blur-md">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#a55b7d]">
                    Pagamentos disponíveis
                  </p>
                  <p className="mt-2 text-sm leading-6 text-neutral-700">
                    Soluções práticas, seguras e discretas para concluir a compra com mais
                    conforto.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex h-11 w-[72px] items-center justify-center rounded-[0.95rem] border border-[#8f355d]/10 bg-[#f4f1eb] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-black/5">
                    <img
                      src="/paypal.svg"
                      alt="PayPal"
                      className="h-[34px] w-auto object-contain"
                    />
                  </div>

                  <div className="flex h-11 w-[72px] items-center justify-center rounded-[0.95rem] border border-[#8f355d]/10 bg-[#f4f1eb] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-black/5">
                    <img
                      src="/stripe.svg"
                      alt="Stripe"
                      className="h-[34px] w-auto object-contain"
                    />
                  </div>

                  <div className="flex h-11 w-[72px] items-center justify-center rounded-[0.95rem] border border-[#8f355d]/10 bg-[#f4f1eb] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-black/5">
                    <img
                      src="/mbway.svg"
                      alt="MB WAY"
                      className="h-[30px] w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/82 p-4 shadow-[0_12px_28px_rgba(143,53,93,0.05)]">
                <div className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[#8f355d]" />
                  <div>
                    <p className="text-sm font-medium text-[#6f2947]">Envio discreto</p>
                    <p className="mt-1 text-sm leading-6 text-neutral-600">
                      Embalagem neutra e maior reserva em cada encomenda.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/82 p-4 shadow-[0_12px_28px_rgba(143,53,93,0.05)]">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#8f355d]" />
                  <div>
                    <p className="text-sm font-medium text-[#6f2947]">Compra segura</p>
                    <p className="mt-1 text-sm leading-6 text-neutral-600">
                      Um processo simples, claro e pensado para gerar confiança.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/82 p-4 shadow-[0_12px_28px_rgba(143,53,93,0.05)]">
                <div className="flex items-start gap-3">
                  <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#8f355d]" />
                  <div>
                    <p className="text-sm font-medium text-[#6f2947]">Privacidade garantida</p>
                    <p className="mt-1 text-sm leading-6 text-neutral-600">
                      Uma experiência reservada, confortável e cuidada do início ao fim.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom py-12 md:py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.25em] text-[#a55b7d]">
              {selectedCategoryLabel}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight text-[#6f2947] md:text-4xl">
              {filteredProducts.length} produto{filteredProducts.length === 1 ? '' : 's'} encontrado
              {filteredProducts.length === 1 ? '' : 's'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              {selectedCategoryDescription}
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[#8f355d]/15 bg-white px-6 py-14 text-center shadow-[0_18px_50px_rgba(143,53,93,0.05)]">
            <div className="mx-auto flex max-w-xl flex-col items-center">
              <Link
                to="/"
                className="inline-flex items-center gap-3 rounded-full border border-[#8f355d]/10 bg-white px-4 py-3 shadow-[0_10px_30px_rgba(143,53,93,0.08)]"
              >
                <img
                  src={logoSrc}
                  alt="Porto Exótico"
                  className="h-8 w-8 object-contain"
                />

                <div className="min-w-0 text-left">
                  <span className="block font-serif text-lg font-semibold leading-none tracking-[0.01em] text-[#7a2f4f]">
                    Porto Exótico
                  </span>
                  <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.32em] text-[#a55b7d]">
                    Compra discreta e segura
                  </span>
                </div>
              </Link>

              <h3 className="mt-8 font-serif text-2xl font-semibold text-[#6f2947]">
                Nenhum produto encontrado
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-neutral-600">
                Ajuste a pesquisa ou selecione outra categoria para descobrir opções mais adequadas.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setSelectedCategory('all');
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#8f355d_0%,#a84f78_100%)] px-6 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5"
                >
                  Limpar filtros
                </button>

                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-full border border-[#8f355d]/15 bg-white px-6 py-3 text-sm font-medium text-[#7a2f4f] transition duration-300 hover:bg-[#fff7fb]"
                >
                  Voltar ao início
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => {
              const categoryLabel =
                productCategories.find((category) => category.value === product.category)?.label ??
                product.category;

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-[30px] border border-[#8f355d]/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#8f355d]/25 hover:shadow-[0_20px_50px_rgba(143,53,93,0.12)]"
                >
                  <Link to={`/produto/${product.slug}`} className="block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#f7eef2]">
                      <img
                        src={product.image || fallbackImage}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,10,16,0.03),rgba(20,10,16,0.22))]" />

                      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        {product.isNew ? (
                          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6f2947] shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
                            Novo
                          </span>
                        ) : null}

                        {product.isBestSeller ? (
                          <span className="rounded-full bg-[#8f355d] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-[0_10px_24px_rgba(143,53,93,0.24)]">
                            Best Seller
                          </span>
                        ) : null}
                      </div>

                      <div className="absolute bottom-4 left-4">
                        <span className="rounded-full border border-white/15 bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white backdrop-blur">
                          Compra discreta
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 p-6">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-[#a55b7d]">
                          {categoryLabel}
                        </p>
                        <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[#6f2947]">
                          {product.name}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-neutral-600">
                          {product.shortDescription}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {product.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[#8f355d]/10 bg-[#fff7fb] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#8f355d]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-semibold text-[#6f2947]">
                            {product.price.toFixed(2).replace('.', ',')} €
                          </span>

                          {product.compareAtPrice ? (
                            <span className="text-sm text-neutral-400 line-through">
                              {product.compareAtPrice.toFixed(2).replace('.', ',')} €
                            </span>
                          ) : null}
                        </div>

                        <span className="inline-flex items-center gap-2 text-sm font-medium text-[#7a2f4f] transition group-hover:text-[#8f355d]">
                          Ver produto
                          <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Shop;
