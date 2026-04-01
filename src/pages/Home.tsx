import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import { productCategories, products } from '../data/products';

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 4);
  const featuredCategories = productCategories.slice(0, 4);

  return (
    <main className="bg-[#fcf8fa] text-neutral-900">
      <section className="relative overflow-hidden border-b border-[#8f355d]/10">
        <div className="absolute inset-0">
          <div className="absolute left-[-10%] top-[-8%] h-[30rem] w-[30rem] rounded-full bg-[#b24d79]/10 blur-3xl" />
          <div className="absolute bottom-[-16%] right-[-8%] h-[24rem] w-[24rem] rounded-full bg-[#e7c9a5]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,53,93,0.06),transparent_36%),linear-gradient(180deg,rgba(252,248,250,0.88),rgba(252,248,250,0.98))]" />
        </div>

        <div className="container-custom relative grid min-h-[88vh] items-center gap-12 py-16 lg:min-h-screen lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-white/80 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[#9b5a79] shadow-[0_10px_30px_rgba(143,53,93,0.06)]">
              <Sparkles className="h-4 w-4" />
              Porto Exótico
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-[#6f2947] md:text-6xl md:leading-[1.03]">
              Sensualidade, discrição e elegância numa experiência mais íntima.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-700 md:text-lg md:leading-8">
              Descubra uma boutique íntima online pensada para quem procura conforto, confiança e
              sofisticação, com uma seleção cuidada, ambiente discreto e uma experiência de compra
              segura.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/loja"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8f355d] px-6 py-3.5 text-sm font-medium text-white shadow-[0_14px_34px_rgba(143,53,93,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7d2f52] hover:shadow-[0_18px_38px_rgba(143,53,93,0.28)]"
              >
                Explorar produtos
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/sobre"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8f355d]/15 bg-white px-6 py-3.5 text-sm font-medium text-[#7a2f4f] shadow-[0_10px_28px_rgba(143,53,93,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[#8f355d]/30 hover:bg-[#fff7fb]"
              >
                Descobrir a marca
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/85 px-4 py-4 shadow-[0_12px_28px_rgba(143,53,93,0.06)] backdrop-blur-md">
                <p className="text-sm font-medium text-[#6f2947]">Compra discreta</p>
                <p className="mt-1 text-sm text-neutral-600">Privacidade em cada detalhe.</p>
              </div>

              <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/85 px-4 py-4 shadow-[0_12px_28px_rgba(143,53,93,0.06)] backdrop-blur-md">
                <p className="text-sm font-medium text-[#6f2947]">Curadoria sensual</p>
                <p className="mt-1 text-sm text-neutral-600">Seleção pensada com intenção e estilo.</p>
              </div>

              <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/85 px-4 py-4 shadow-[0_12px_28px_rgba(143,53,93,0.06)] backdrop-blur-md">
                <p className="text-sm font-medium text-[#6f2947]">Pagamentos seguros</p>
                <p className="mt-1 text-sm text-neutral-600">Uma experiência premium e protegida.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-8 hidden h-44 w-44 rounded-full bg-[#b24d79]/12 blur-3xl md:block" />
            <div className="absolute -bottom-10 right-0 hidden h-44 w-44 rounded-full bg-[#e7c9a5]/18 blur-3xl md:block" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#8f355d]/10 bg-white/70 p-3 shadow-[0_24px_80px_rgba(100,33,62,0.14)] backdrop-blur-xl">
              <div className="grid gap-3 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[440px] overflow-hidden rounded-[1.6rem] border border-[#8f355d]/10 bg-[linear-gradient(180deg,rgba(143,53,93,0.10),rgba(54,16,34,0.82)),radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_30%)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.16),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(48,13,30,0.72))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70">
                      Atmosfera
                    </span>
                    <p className="mt-4 max-w-xs text-2xl font-semibold leading-tight text-white">
                      Sedução subtil, confiança e um ambiente feito para explorar sem pressa.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-[1.6rem] border border-[#8f355d]/10 bg-[#fffafb] p-6 shadow-[0_12px_34px_rgba(143,53,93,0.06)]">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#a55b7d]">
                      Curadoria
                    </span>
                    <h2 className="mt-3 text-2xl font-semibold leading-tight text-[#6f2947]">
                      Uma experiência íntima desenhada para ser elegante, segura e envolvente.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-neutral-700">
                      Produtos escolhidos para despertar desejo com naturalidade, num espaço visual
                      mais sofisticado do que explícito e pensado para transmitir conforto desde o
                      primeiro clique.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.6rem] border border-[#8f355d]/10 bg-white p-5 shadow-[0_12px_34px_rgba(143,53,93,0.06)]">
                      <Lock className="h-5 w-5 text-[#8f355d]" />
                      <p className="mt-4 text-sm font-medium text-[#6f2947]">Privacidade garantida</p>
                      <p className="mt-2 text-sm leading-6 text-neutral-600">
                        Navegação e compra com foco real na discrição e no conforto do cliente.
                      </p>
                    </div>

                    <div className="rounded-[1.6rem] border border-[#8f355d]/10 bg-white p-5 shadow-[0_12px_34px_rgba(143,53,93,0.06)]">
                      <HeartHandshake className="h-5 w-5 text-[#8f355d]" />
                      <p className="mt-4 text-sm font-medium text-[#6f2947]">Escolha confiante</p>
                      <p className="mt-2 text-sm leading-6 text-neutral-600">
                        Uma seleção pensada para diferentes estilos, ritmos e formas de explorar.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] border border-[#8f355d]/10 bg-white p-5 shadow-[0_12px_34px_rgba(143,53,93,0.06)]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#a55b7d]">
                          Experiência
                        </p>
                        <p className="mt-2 text-sm leading-6 text-neutral-700">
                          Uma loja online pensada para seduzir com discrição e vender com confiança.
                        </p>
                      </div>

                      <ShieldCheck className="h-9 w-9 shrink-0 text-[#8f355d]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-[#8f355d]/10 bg-[#2a0f1d] text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/60">
              Favoritos
            </span>
            <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
              Lingerie, acessórios e sugestões para momentos mais intensos.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
              Explora peças e artigos pensados para oferecer, provocar e transformar cada momento
              numa experiência mais envolvente.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/produto/${product.slug}`}
                className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
              >
                <div
                  className={`relative flex aspect-[4/5] items-end overflow-hidden p-6 ${
                    index % 4 === 0
                      ? 'bg-gradient-to-br from-[#a63f68]/30 via-[#1f0b16] to-[#12070d]'
                      : index % 4 === 1
                        ? 'bg-gradient-to-br from-[#d4b28a]/18 via-[#1f0b16] to-[#12070d]'
                        : index % 4 === 2
                          ? 'bg-gradient-to-br from-[#88456c]/22 via-[#1f0b16] to-[#12070d]'
                          : 'bg-gradient-to-br from-[#c26b8d]/18 via-[#1f0b16] to-[#12070d]'
                  }`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%)]" />
                  <div className="relative">
                    <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/60">
                      {product.category}
                    </span>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">
                      {product.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-6 text-white/68">{product.shortDescription}</p>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold text-white">
                        {product.price.toFixed(2).replace('.', ',')} €
                      </span>
                      {product.compareAtPrice ? (
                        <span className="text-sm text-white/35 line-through">
                          {product.compareAtPrice.toFixed(2).replace('.', ',')} €
                        </span>
                      ) : null}
                    </div>

                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white/85">
                      Ver
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/loja"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-white/10"
            >
              Ver coleção completa
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-[#8f355d]/10 bg-[#fcf8fa]">
        <div className="container-custom">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full border border-[#8f355d]/10 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
                Categorias em destaque
              </span>
              <h2 className="mt-5 text-3xl font-semibold leading-tight text-[#6f2947] md:text-5xl">
                Escolha o ambiente, a intenção e o nível de ousadia.
              </h2>
            </div>

            <Link
              to="/loja"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#7a2f4f] transition hover:text-[#8f355d]"
            >
              Ver tudo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredCategories.map((category, index) => (
              <Link
                key={category.value}
                to="/loja"
                className="group relative overflow-hidden rounded-[1.8rem] border border-[#8f355d]/10 p-6 transition duration-300 hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-0 ${
                    index % 4 === 0
                      ? 'bg-gradient-to-br from-[#f7e8ef] via-white to-[#fdf8fb]'
                      : index % 4 === 1
                        ? 'bg-gradient-to-br from-[#f7efe6] via-white to-[#fdfaf6]'
                        : index % 4 === 2
                          ? 'bg-gradient-to-br from-[#f3e7f0] via-white to-[#fcf8fb]'
                          : 'bg-gradient-to-br from-[#f8e9ef] via-white to-[#fdf8fa]'
                  }`}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,53,93,0.06),transparent_30%)] opacity-90" />

                <div className="relative flex min-h-[240px] flex-col justify-between">
                  <span className="w-fit rounded-full border border-[#8f355d]/10 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#a55b7d]">
                    Categoria
                  </span>

                  <div>
                    <h3 className="text-2xl font-semibold text-[#6f2947]">{category.label}</h3>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-neutral-700">
                      Uma seleção criada para combinar sensualidade, estética e discrição.
                    </p>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#7a2f4f]">
                      Explorar
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#fcf8fa]">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#8f355d]/10 bg-[#fffafb] px-6 py-10 shadow-[0_20px_60px_rgba(143,53,93,0.08)] md:px-10 md:py-14">
            <div className="absolute inset-0">
              <div className="absolute left-[-10%] top-0 h-52 w-52 rounded-full bg-[#b24d79]/10 blur-3xl" />
              <div className="absolute bottom-[-10%] right-0 h-44 w-44 rounded-full bg-[#e7c9a5]/16 blur-3xl" />
            </div>

            <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <span className="inline-block rounded-full border border-[#8f355d]/10 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
                  Compra segura
                </span>
                <h2 className="mt-5 text-3xl font-semibold leading-tight text-[#6f2947] md:text-5xl">
                  Privacidade, confiança e uma experiência de compra sem ruído.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700">
                  Uma loja pensada para quem quer explorar com conforto, descrição e uma linguagem
                  visual mais elegante do que explícita.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/loja"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8f355d] px-6 py-3.5 text-sm font-medium text-white shadow-[0_14px_34px_rgba(143,53,93,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7d2f52]"
                >
                  Entrar na loja
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/contactos"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8f355d]/15 bg-white px-6 py-3.5 text-sm font-medium text-[#7a2f4f] transition duration-300 hover:border-[#8f355d]/30 hover:bg-[#fff7fb]"
                >
                  Falar connosco
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
