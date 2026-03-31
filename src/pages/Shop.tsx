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
    <main className="bg-neutral-950 text-white min-h-screen">
      
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight max-w-3xl">
            Descobre o prazer com elegância e discrição.
          </h1>

          <p className="mt-6 text-white/60 max-w-2xl">
            Produtos selecionados para elevar a tua experiência íntima — com qualidade, design e total confidencialidade.
          </p>

          <div className="mt-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  selectedCategory === 'all'
                    ? 'bg-white text-black border-white'
                    : 'border-white/10 text-white/70 hover:text-white hover:border-white/30'
                }`}
              >
                Todos
              </button>

              {productCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm border transition ${
                    selectedCategory === cat
                      ? 'bg-white text-black border-white'
                      : 'border-white/10 text-white/70 hover:text-white hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-white/30"
              />
            </div>

          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-neutral-900 border border-white/5">
                
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />

                {product.isNew && (
                  <span className="absolute top-4 left-4 text-xs bg-white text-black px-3 py-1 rounded-full">
                    Novo
                  </span>
                )}

                {product.isBestSeller && (
                  <span className="absolute top-4 right-4 text-xs bg-amber-400 text-black px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}

                <div className="absolute bottom-0 p-6">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-white/60 text-sm mt-1">
                    {product.shortDescription}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      {product.price}€
                    </span>

                    <span className="flex items-center gap-1 text-sm text-white/70 group-hover:text-white transition">
                      Ver
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-white/50">
            Nenhum produto encontrado.
          </div>
        )}

      </section>

    </main>
  );
};

export default Shop;
