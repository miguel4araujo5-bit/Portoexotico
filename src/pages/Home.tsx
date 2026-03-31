import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Lock, Package, ShieldCheck, Sparkles } from 'lucide-react';

const featuredCategories = [
  {
    title: 'Lingerie Sensual',
    description: 'Peças envolventes para despertar confiança, desejo e elegância.',
    href: '/loja',
  },
  {
    title: 'Prazer & Intimidade',
    description: 'Uma seleção discreta para momentos mais intensos, a sós ou a dois.',
    href: '/loja',
  },
  {
    title: 'Sugestões Irresistíveis',
    description: 'Escolhas especiais para oferecer, surpreender e explorar sem pressa.',
    href: '/loja',
  },
];

const featuredProducts = [
  {
    name: 'Body Rendado Sedução',
    price: '29,90 €',
    description: 'Uma peça marcante, elegante e provocadora, pensada para valorizar cada curva.',
  },
  {
    name: 'Kit Noite Privada',
    price: '44,90 €',
    description: 'Uma combinação envolvente para tornar qualquer momento mais íntimo e memorável.',
  },
  {
    name: 'Essenciais do Desejo',
    price: '19,90 €',
    description: 'Pequenos detalhes que elevam a experiência com conforto, confiança e prazer.',
  },
];

const trustPoints = [
  {
    icon: Package,
    title: 'Envio discreto',
    description: 'Recebe a tua encomenda em embalagem neutra, sem detalhes visíveis no exterior.',
  },
  {
    icon: Lock,
    title: 'Compra segura',
    description: 'Um processo de compra simples, protegido e pensado para máxima privacidade.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacidade total',
    description: 'Cada detalhe foi pensado para que possas comprar com confiança e tranquilidade.',
  },
];

const Home: React.FC = () => {
  return (
    <main className="bg-neutral-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_30%)]" />
        <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-7xl items-center px-6 py-20 md:px-10">
          <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-3xl">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/70">
                <Sparkles className="h-3.5 w-3.5" />
                Porto Exótico
              </span>

              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
                Desejo, discrição e elegância num só lugar.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
                Descobre uma seleção erótica pensada para quem procura prazer,
                sofisticação e privacidade, com uma experiência de compra simples,
                segura e envolvente.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/loja"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-all duration-200 hover:scale-[1.02]"
                >
                  Explorar produtos
                </Link>

                <Link
                  to="/sobre"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10"
                >
                  Descobrir a marca
                </Link>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 text-sm text-white/75 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Compra discreta
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Seleção sensual
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Privacidade garantida
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                  Destaque
                </p>
                <h2 className="mt-3 text-2xl font-semibold">
                  Uma experiência sensual com sofisticação e discrição.
                </h2>
                <p className="mt-4 text-sm leading-6 text-white/65">
                  Produtos escolhidos para despertar desejo sem perder elegância,
                  num ambiente visual cuidado, íntimo e confiante.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                  Favoritos
                </p>
                <h2 className="mt-3 text-2xl font-semibold">
                  Lingerie, acessórios e sugestões para momentos inesquecíveis.
                </h2>
                <p className="mt-4 text-sm leading-6 text-white/65">
                  Explora peças e artigos pensados para oferecer, provocar e tornar
                  cada momento mais intenso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">
              Categorias em destaque
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Escolhe o ambiente, a intenção e o nível de ousadia.
            </h2>
          </div>

          <Link
            to="/loja"
            className="hidden items-center gap-2 text-sm text-white/70 transition-colors duration-200 hover:text-white md:inline-flex"
          >
            Ver tudo
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredCategories.map((category) => (
            <Link
              key={category.title}
              to={category.href}
              className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:-translate-y-1 hover:bg-white/10"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Categoria
              </p>
              <h3 className="mt-4 text-2xl font-semibold">{category.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/65">
                {category.description}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/75 transition-colors duration-200 group-hover:text-white">
                Explorar
                <ChevronRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/45">
            Mais desejados
          </p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Peças e artigos pensados para despertar curiosidade e prazer.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <article
              key={product.name}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition-all duration-200 hover:bg-white/[0.07]"
            >
              <div className="mb-6 aspect-[4/5] rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent" />
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Em destaque
              </p>
              <h3 className="mt-3 text-xl font-semibold">{product.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">
                {product.description}
              </p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="text-base font-medium text-white">{product.price}</span>
                <Link
                  to="/loja"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-white/10"
                >
                  Ver produto
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">
              Comprar com confiança
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Privacidade, segurança e uma experiência envolvente.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">
              Aqui, cada detalhe foi pensado para que possas explorar, escolher e
              comprar com total descrição, num ambiente elegante e sem constrangimentos.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {trustPoints.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-24 pt-8 md:px-10">
        <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-8 md:p-12">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">
              Porto Exótico
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              Descobre o lado mais ousado do teu desejo.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
              Uma seleção criada para quem valoriza prazer, discrição e um toque de
              sofisticação em cada escolha.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/loja"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-all duration-200 hover:scale-[1.02]"
              >
                Entrar na loja
              </Link>
              <Link
                to="/contactos"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10"
              >
                Falar connosco
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
