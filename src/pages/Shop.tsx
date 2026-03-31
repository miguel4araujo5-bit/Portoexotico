import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
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

  return (
    <main className="bg-neutral-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.14),transparent_45%),radial-gradient(circle_at_right,rgba(168,85,247,0.14),transparent_35%),#0a0a0a]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 md:px-10 md:py-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-white/60">
              Shop Porto Exótico
            </div>

            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Descobre peças e experiências pensadas para o prazer com elegância.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
              Uma seleção cuidada, discreta e sofisticada. Compra online com confiança,
              navegação simples e uma apresentação premium.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Pesquisar produtos, categorias ou sensações"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/30 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-fuchsia-400/50"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  selectedCategory === 'all'
                    ? 'bg-white text-black'
                    : 'border border-white/10 bg-white/5 text-white/75 hover:bg-white/10'
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
                      ? 'bg-white text-black'
                      : 'border border-white/10 bg-white/5 text-white/75 hover:bg-white/10'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/45">Coleção</p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
              {filteredProducts.length} produto{filteredProducts.length === 1 ? '' : 's'} encontrado
              {filteredProducts.length === 1 ? '' : 's'}
            </h2>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-14 text-center">
            <h3 className="text-xl font-medium">Nenhum produto encontrado</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/60">
              Ajusta a pesquisa ou escolhe outra categoria para encontrares sugestões mais adequadas.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/30 hover:bg-white/[0.06]"
              >
                <Link to={`/produto/${product.slug}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-black/30">
                    <img
                      src={product.image || fallbackImage}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      {product.isNew ? (
                        <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-black">
                          Novo
                        </span>
                      ) : null}

                      {product.isBestSeller ? (
                        <span className="rounded-full bg-fuchsia-500/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white">
                          Best Seller
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                        {product.category}
                      </p>
                      <h3 className="mt-2 text-xl font-medium text-white">{product.name}</h3>
                      <p className="mt-3 text-sm leading-6 text-white/65">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xl font-semibold">€{product.price.toFixed(2)}</span>

                      <span className="inline-flex items-center gap-2 text-sm text-white/80 transition group-hover:text-white">
                        Ver produto
                        <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Shop;
