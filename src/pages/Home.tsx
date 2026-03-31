import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import { productCategories, products } from '../data/products';

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 4);
  const featuredCategories = productCategories.slice(0, 4);

  return (
    <main className="bg-neutral-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <div className="absolute left-[-8%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-700/20 blur-3xl" />
          <div className="absolute bottom-[-15%] right-[-6%] h-[24rem] w-[24rem] rounded-full bg-amber-300/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%),linear-gradient(180deg,rgba(10,10,10,0.2),rgba(10,10,10,0.92))]" />
        </div>

        <div className="container-custom relative grid min-h-[88vh] items-center gap-12 py-16 md:min-h-screen md:grid-cols-[1.05fr_0.95fr] md:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-white/65">
              <Sparkles className="h-4 w-4" />
              Porto Exótico
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl md:leading-[1.05]">
              Desejo, discrição e elegância num só lugar.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 md:text-lg md:leading-8">
              Descobre uma boutique íntima pensada para quem procura prazer, sofisticação e
              privacidade, com uma experiência visual envolvente, seleção cuidada e compra segura.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/loja" className="button-primary inline-flex items-center justify-center gap-2">
                Explorar produtos
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/sobre"
                className="button-secondary inline-flex items-center justify-center gap-2"
              >
                Descobrir a marca
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="glass rounded-2xl px-4 py-4">
                <p className="text-sm font-medium text-white">Compra discreta</p>
                <p className="mt-1 text-sm text-white/55">Privacidade em cada detalhe.</p>
              </div>

              <div className="glass rounded-2xl px-4 py-4">
                <p className="text-sm font-medium text-white">Seleção sensual</p>
                <p className="mt-1 text-sm text-white/55">Curadoria com intenção e estilo.</p>
              </div>

              <div className="glass rounded-2xl px-4 py-4">
                <p className="text-sm font-medium text-white">Pagamentos seguros</p>
                <p className="mt-1 text-sm text-white/55">Experiência premium e protegida.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 hidden h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl md:block" />
            <div className="absolute -bottom-10 right-0 hidden h-40 w-40 rounded-full bg-amber-300/10 blur-3xl md:block" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
              <div className="grid gap-3 md:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[420px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-fuchsia-800/20 via-black to-neutral-900">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_22%),linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.75))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/55">
                      Atmosfera
                    </span>
                    <p className="mt-4 max-w-xs text-2xl font-semibold leading-tight">
                      Sensualidade sugerida, nunca excessiva.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="glass rounded-[1.6rem] p-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/45">
                      Curadoria
                    </span>
                    <h2 className="mt-3 text-2xl font-semibold leading-tight">
                      Uma experiência íntima com sofisticação e discrição.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-white/65">
                      Produtos escolhidos para despertar desejo sem perder elegância, num ambiente
                      visual cuidado, íntimo e confiante.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="glass rounded-[1.6rem] p-5">
                      <Lock className="h-5 w-5 text-white/70" />
                      <p className="mt-4 text-sm font-medium text-white">Privacidade garantida</p>
                      <p className="mt-2 text-sm leading-6 text-white/55">
                        Navegação e compra com foco absoluto na discrição.
                      </p>
                    </div>

                    <div className="glass rounded-[1.6rem] p-5">
                      <HeartHandshake className="h-5 w-5 text-white/70" />
                      <p className="mt-4 text-sm font-medium text-white">Escolha confiante</p>
                      <p className="mt-2 text-sm leading-6 text-white/55">
                        Uma seleção pensada para diferentes ritmos, estilos e intenções.
                      </p>
                    </div>
                  </div>

                  <div className="glass rounded-[1.6rem] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/45">
                          Experiência
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/65">
                          Um espaço online sedutor, elegante e feito para despertar curiosidade.
                        </p>
                      </div>

                      <ShieldCheck className="h-9 w-9 shrink-0 text-white/70" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-white/10">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/55">
              Favoritos
            </span>
            <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
              Lingerie, acessórios e sugestões para momentos inesquecíveis.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">
              Explora peças e artigos pensados para oferecer, provocar e tornar cada momento mais
              intenso.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/produto/${product.slug}`}
                className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
              >
                <div
                  className={`relative flex aspect-[4/5] items-end overflow-hidden p-6 ${
                    index % 4 === 0
                      ? 'bg-gradient-to-br from-fuchsia-700/20 via-neutral-950 to-black'
                      : index % 4 === 1
                        ? 'bg-gradient-to-br from-amber-200/10 via-neutral-950 to-black'
                        : index % 4 === 2
                          ? 'bg-gradient-to-br from-violet-500/15 via-neutral-950 to-black'
                          : 'bg-gradient-to-br from-rose-400/10 via-neutral-950 to-black'
                  }`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%)]" />
                  <div className="relative">
                    <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/50">
                      {product.category}
                    </span>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">
                      {product.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-6 text-white/62">{product.shortDescription}</p>

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

                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white/80">
                      Ver
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link to="/loja" className="button-secondary inline-flex items-center gap-2">
              Ver coleção completa
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-white/10">
        <div className="container-custom">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/55">
                Categorias em destaque
              </span>
              <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
                Escolhe o ambiente, a intenção e o nível de ousadia.
              </h2>
            </div>

            <Link to="/loja" className="inline-flex items-center gap-2 text-sm font-medium text-white/75">
              Ver tudo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredCategories.map((category, index) => (
              <Link
                key={category.value}
                to={`/loja`}
                className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 p-6 transition duration-300 hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-0 ${
                    index % 4 === 0
                      ? 'bg-gradient-to-br from-fuchsia-700/20 via-black to-neutral-950'
                      : index % 4 === 1
                        ? 'bg-gradient-to-br from-amber-200/10 via-black to-neutral-950'
                        : index % 4 === 2
                          ? 'bg-gradient-to-br from-violet-500/15 via-black to-neutral-950'
                          : 'bg-gradient-to-br from-rose-400/10 via-black to-neutral-950'
                  }`}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%)] opacity-80" />

                <div className="relative flex min-h-[240px] flex-col justify-between">
                  <span className="w-fit rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/50">
                    Categoria
                  </span>

                  <div>
                    <h3 className="text-2xl font-semibold text-white">{category.label}</h3>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">
                      Uma seleção criada para combinar sensualidade, estética e discrição.
                    </p>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/78">
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

      <section className="section-padding">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-6 py-10 md:px-10 md:py-14">
            <div className="absolute inset-0">
              <div className="absolute left-[-10%] top-0 h-52 w-52 rounded-full bg-fuchsia-600/15 blur-3xl" />
              <div className="absolute bottom-[-10%] right-0 h-44 w-44 rounded-full bg-amber-300/10 blur-3xl" />
            </div>

            <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <span className="inline-block rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/55">
                  Compra segura
                </span>
                <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
                  Privacidade, confiança e uma experiência de compra sem ruído.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">
                  Uma loja pensada para quem quer explorar com conforto, descrição e uma linguagem
                  visual mais elegante do que explícita.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/loja" className="button-primary inline-flex items-center justify-center gap-2">
                  Entrar na loja
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/contactos"
                  className="button-secondary inline-flex items-center justify-center gap-2"
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
