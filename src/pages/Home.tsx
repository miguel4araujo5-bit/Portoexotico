import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Lock,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  PackageCheck,
  CreditCard,
  Star,
} from 'lucide-react';
import { productCategories, products } from '../data/products';

const logoSrc = '/logo.png';

const categoryDescriptions: Record<string, string> = {
  prazer: 'Seleção pensada para prazer, intensidade e discrição com um visual mais premium.',
  acessorios: 'Complementos íntimos para explorar novas dinâmicas com confiança e sofisticação.',
  lubrificantes: 'Texturas e sensações que elevam conforto, fluidez e experiência sensorial.',
  preservativos: 'Proteção com foco em conforto, segurança e uma experiência mais envolvente.',
  excitacao: 'Soluções para intensificar, prolongar e tornar cada momento mais memorável.',
};

const Home: React.FC = () => {
  const highlightedProducts = products.filter((product) => product.isBestSeller || product.isNew);
  const featuredProducts =
    highlightedProducts.length >= 4 ? highlightedProducts.slice(0, 4) : products.slice(0, 4);

  const heroProduct = featuredProducts[0] ?? products[0];
  const secondaryProducts = featuredProducts.slice(1, 4);
  const featuredCategories = productCategories.slice(0, 5);

  return (
    <main className="bg-[#fcf8fa] text-neutral-900">
      <section className="relative overflow-hidden border-b border-[#8f355d]/10">
        <div className="absolute inset-0">
          <div className="absolute left-[-10%] top-[-8%] h-[30rem] w-[30rem] rounded-full bg-[#b24d79]/10 blur-3xl" />
          <div className="absolute bottom-[-16%] right-[-8%] h-[24rem] w-[24rem] rounded-full bg-[#e7c9a5]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,53,93,0.07),transparent_34%),linear-gradient(180deg,rgba(252,248,250,0.9),rgba(252,248,250,0.98))]" />
        </div>

        <div className="container-custom relative grid min-h-[88vh] items-center gap-12 py-16 lg:min-h-screen lg:grid-cols-[1fr_0.98fr] lg:py-24">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-3 rounded-full border border-[#8f355d]/10 bg-white/95 px-4 py-3 shadow-[0_14px_38px_rgba(143,53,93,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_46px_rgba(143,53,93,0.14)]"
              >
                <img src={logoSrc} alt="Porto Exótico" className="h-9 w-9 object-contain" />
                <div className="min-w-0">
                  <span className="block font-serif text-lg font-semibold leading-none text-[#7a2f4f]">
                    Porto Exótico
                  </span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.32em] text-[#a55b7d]">
                    Compra discreta e segura
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('portoexotico:open-chat'))}
                className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-white/80 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-[#9b5a79]"
              >
                <Sparkles className="h-4 w-4" />
                Converse com a nossa assistente virtual
              </button>
            </div>

            <h1 className="mt-6 font-serif text-5xl font-semibold text-[#6f2947] md:text-7xl">
              Sensualidade, discrição e uma experiência de compra pensada para converter.
            </h1>

            <p className="mt-6 text-neutral-700 md:text-lg">
              Descubra produtos selecionados para quem valoriza privacidade, elegância e confiança.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/loja"
                className="rounded-full bg-[#8f355d] px-6 py-3 text-white"
              >
                Descobrir a loja
              </Link>

              <Link
                to="/loja"
                className="rounded-full border px-6 py-3 text-[#7a2f4f]"
              >
                Ver destaques
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border bg-white p-3">
              <div className="grid gap-3 lg:grid-cols-[0.96fr_1.04fr]">

                {/* HERO IMAGE FIXED */}
                <div className="relative min-h-[460px] overflow-hidden rounded-[1.7rem]">
                  <img
                    src={heroProduct?.image}
                    alt={heroProduct?.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="grid gap-3">
                  <div className="p-6">
                    <h2 className="font-serif text-3xl text-[#6f2947]">
                      Uma apresentação mais sedutora, discreta e orientada para venda.
                    </h2>
                  </div>

                  {/* SMALL CARDS FIXED */}
                  <div className="grid gap-3 sm:grid-cols-3">
                    {secondaryProducts.map((product) => (
                      <Link
                        key={product.id}
                        to={`/produto/${product.slug}`}
                        className="group overflow-hidden rounded-[1.5rem] border"
                      >
                        <div className="aspect-[4/4.2] overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <p className="font-serif text-lg text-[#6f2947]">
                            {product.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIS VENDIDOS FIXED */}
      <section className="bg-[#2a0f1d] text-white py-16">
        <div className="container-custom">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/produto/${product.slug}`}
                className="group overflow-hidden rounded-[1.8rem] border"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl">{product.name}</h3>
                  <p>{product.price.toFixed(2)} €</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
