import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, ShieldCheck, Truck, Lock } from 'lucide-react';
import { productCategories, products, type ProductCategory } from '../data/products';

const fallbackImage =
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80';

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

  return (
    <main className="bg-[#fcf8fa] text-neutral-900">
      <section className="relative overflow-hidden border-b border-[#8f355d]/10">
        <div className="absolute inset-0">
          <div className="absolute left-[-8%] top-[-8%] h-[28rem] w-[28rem] rounded-full bg-[#b24d79]/10 blur-3xl" />
          <div className="absolute right-[-6%] top-[10%] h-[24rem] w-[24rem] rounded-full bg-[#e7c9a5]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,53,93,0.06),transparent_42%),linear-gradient(180deg,rgba(252,248,250,0.94),rgba(252,248,250,0.98))]" />
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 md:px-10 md:py-20">
          <div className="relative max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-white/80 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-[#9b5a79] shadow-[0_10px_30px_rgba(143,53,93,0.06)]">
              Loja Porto Exótico
            </div>

            <h1 className="text-4xl font-semibold leading-tight text-[#6f2947] md:text-6xl">
              Descubra uma coleção pensada para comprar com discrição, conforto e confiança.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-700 md:text-lg">
              Explore lingerie, acessórios, cosmética, artigos de prazer e kits selecionados para
              quem valoriza privacidade, elegância e uma experiência de compra mais simples e
              cuidada.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-[2rem] border border-[#8f355d]/10 bg-white/80 p-4 shadow-[0_18px_50px_rgba(143,53,93,0.08)] backdrop-blur md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a55b7d]" />
              <input
                type="text"
                placeholder="Pesquisar por produto, categoria ou característica"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-2xl border border-[#8f355d]/10 bg-[#fffafb] py-3 pl-11 pr-4 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-[#8f355d]/30 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
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

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/80 p-4 shadow-[0_12px_28px_rgba(143,53,93,0.05)]">
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

            <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/80 p-4 shadow-[0_12px_28px_rgba(143,53,93,0.05)]">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#8f355d]" />
                <div>
                  <p className="text-sm font-medium text-[#6f2947]">Compra segura</p>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    Um processo de compra simples, claro e pensado para gerar confiança.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/80 p-4 shadow-[0_12px_28px_rgba(143,53,93,0.05)]">
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
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#a55b7d]">{selectedCategoryLabel}</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#6f2947] md:text-3xl">
              {filteredProducts.length} produto{filteredProducts.length === 1 ? '' : 's'} encontrado
              {filteredProducts.length === 1 ? '' : 's'}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600">
              Descubra uma seleção cuidada para diferentes preferências, momentos e estilos.
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[#8f355d]/15 bg-white px-6 py-14 text-center shadow-[0_18px_50px_rgba(143,53,93,0.05)]">
            <h3 className="text-xl font-medium text-[#6f2947]">Nenhum produto encontrado</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-neutral-600">
              Ajuste a pesquisa ou selecione outra categoria para descobrir opções mais adequadas.
            </p>
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
                  className="group overflow-hidden rounded-[28px] border border-[#8f355d]/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#8f355d]/25 hover:shadow-[0_18px_44px_rgba(143,53,93,0.12)]"
                >
                  <Link to={`/produto/${product.slug}`} className="block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#f7eef2]">
                      <img
                        src={product.image || fallbackImage}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,10,16,0.02),rgba(20,10,16,0.18))]" />

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
                    </div>

                    <div className="space-y-4 p-5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-[#a55b7d]">
                          {categoryLabel}
                        </p>
                        <h3 className="mt-2 text-xl font-medium text-[#6f2947]">{product.name}</h3>
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
