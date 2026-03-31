import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { productCategories, products, type ProductCategory } from '../data/products';

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
      <section className="border-b border-white/10">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">
              Porto Exótico
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">
              Loja
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
              Explora uma seleção sensual e discreta, pensada para despertar desejo,
              curiosidade e confiança em cada escolha.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-12">
        <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                Procurar
              </p>
              <div className="relative mt-4">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Pesquisar produtos"
                  className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition-colors duration-200 focus:border-white/20 focus:bg-white/10"
                />
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                Categorias
              </p>

              <div className="mt-4 flex flex-wrap gap-3 lg:flex-col">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`rounded-full border px-4 py-2 text-sm transition-all duration-200 lg:text-left ${
                    selectedCategory === 'all'
                      ? 'border-white/20 bg-white text-neutral-950'
                      : 'border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Ver tudo
                </button>

                {productCategories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => setSelectedCategory(category.value)}
                    className={`rounded-full border px-4 py-2 text-sm transition-all duration-200 lg:text-left ${
                      selectedCategory === category.value
                        ? 'border-white/20 bg-white text-neutral-950'
                        : 'border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/60">
                {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </p>

              <Link
                to="/carrinho"
                className="inline-flex items-center gap-2 text-sm text-white/75 transition-colors duration-200 hover:text-white"
              >
                Ver carrinho
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-semibold">Sem resultados</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
                  Não encontrámos produtos com esses critérios. Experimenta outra
                  pesquisa ou escolhe uma categoria diferente.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <article
                    key={product.id}
                    className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition-all duration-200 hover:-translate-y-1 hover:bg-white/[0.07]"
                  >
                    <Link to={`/produto/${product.slug}`} className="block">
                      <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent" />
                    </Link>

                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                        {
                          productCategories.find(
                            (category) => category.value === product.category
                          )?.label
                        }
                      </p>

                      <Link to={`/produto/${product.slug}`} className="block">
                        <h2 className="mt-3 text-xl font-semibold transition-colors duration-200 group-hover:text-white/85">
                          {product.name}
                        </h2>
                      </Link>

                      <p className="mt-3 text-sm leading-6 text-white/65">
                        {product.shortDescription}
                      </p>

                      <div className="mt-5 flex items-center gap-3">
                        <span className="text-lg font-semibold text-white">
                          {product.price.toFixed(2).replace('.', ',')} €
                        </span>
                        {product.compareAtPrice ? (
                          <span className="text-sm text-white/35 line-through">
                            {product.compareAtPrice.toFixed(2).replace('.', ',')} €
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-6 flex flex-col gap-3">
                        <Link
                          to={`/produto/${product.slug}`}
                          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition-transform duration-200 hover:scale-[1.01]"
                        >
                          Ver produto
                        </Link>

                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
                        >
                          Adicionar ao carrinho
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shop;
