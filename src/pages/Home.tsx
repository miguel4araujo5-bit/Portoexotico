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

const logoSrc = '/apple-touch-icon.png';

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
                <img src={logoSrc} alt="Porto Exótico" className="h-8 w-8 object-contain" />

                <div className="min-w-0">
                  <span className="block font-serif text-lg font-semibold leading-none tracking-[0.01em] text-[#7a2f4f]">
                    Porto Exótico
                  </span>
                  <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.32em] text-[#a55b7d]">
                    Compra discreta e segura
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('portoexotico:open-chat'))}
                className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-white/80 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-[#9b5a79] shadow-[0_10px_30px_rgba(143,53,93,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-[#8f355d]/20 hover:bg-white hover:shadow-[0_14px_36px_rgba(143,53,93,0.1)]"
                aria-label="Converse com a nossa assistente virtual"
              >
                <Sparkles className="h-4 w-4" />
                Converse com a nossa assistente virtual
              </button>
            </div>

            <h1 className="mt-6 max-w-5xl font-serif text-5xl font-semibold leading-[0.96] text-[#6f2947] md:text-7xl">
              Sensualidade, discrição e uma experiência de compra pensada para converter.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-700 md:text-lg md:leading-8">
              Descubra produtos de prazer, acessórios, lubrificantes, preservativos e artigos de
              excitação selecionados para quem valoriza privacidade, elegância e confiança em cada
              detalhe da compra.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-emerald-700">
                Checkout protegido
              </span>
              <span className="rounded-full border border-[#8f355d]/10 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#7a2f4f]">
                Embalagem discreta
              </span>
              <span className="rounded-full border border-[#8f355d]/10 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#7a2f4f]">
                Seleção premium
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/loja"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#8f355d_0%,#a84f78_100%)] px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-[0_16px_38px_rgba(143,53,93,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(143,53,93,0.3)]"
              >
                Descobrir a loja
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/loja"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8f355d]/15 bg-white px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-[#7a2f4f] shadow-[0_10px_28px_rgba(143,53,93,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[#8f355d]/30 hover:bg-[#fff7fb]"
              >
                Ver destaques
              </Link>
            </div>

            <div className="mt-8 rounded-[1.8rem] border border-[#8f355d]/10 bg-white/85 p-5 shadow-[0_16px_40px_rgba(143,53,93,0.06)] backdrop-blur-md">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[#a55b7d]">
                    Pagamentos em destaque
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-700">
                    Uma jornada de compra criada para transmitir confiança, discrição e simplicidade
                    do primeiro clique até ao checkout.
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

            <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/85 px-4 py-4 shadow-[0_12px_28px_rgba(143,53,93,0.06)] backdrop-blur-md">
                <p className="text-sm font-medium text-[#6f2947]">Discrição total</p>
                <p className="mt-1 text-sm text-neutral-600">
                  Embalagem neutra, privacidade protegida e experiência reservada.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/85 px-4 py-4 shadow-[0_12px_28px_rgba(143,53,93,0.06)] backdrop-blur-md">
                <p className="text-sm font-medium text-[#6f2947]">Escolha confiante</p>
                <p className="mt-1 text-sm text-neutral-600">
                  Produtos selecionados para conforto, prazer e compra sem ruído.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-[#8f355d]/10 bg-white/85 px-4 py-4 shadow-[0_12px_28px_rgba(143,53,93,0.06)] backdrop-blur-md">
                <p className="text-sm font-medium text-[#6f2947]">Checkout elegante</p>
                <p className="mt-1 text-sm text-neutral-600">
                  Um percurso simples, seguro e visualmente mais premium.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-8 hidden h-44 w-44 rounded-full bg-[#b24d79]/12 blur-3xl md:block" />
            <div className="absolute -bottom-10 right-0 hidden h-44 w-44 rounded-full bg-[#e7c9a5]/18 blur-3xl md:block" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#8f355d]/10 bg-white/72 p-3 shadow-[0_28px_90px_rgba(100,33,62,0.14)] backdrop-blur-xl">
              <div className="grid gap-3 lg:grid-cols-[0.96fr_1.04fr]">
                <div className="relative min-h-[460px] overflow-hidden rounded-[1.7rem] border border-[#8f355d]/10">
                  <img
                    src={heroProduct?.image}
                    alt={heroProduct?.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,10,16,0.08),rgba(48,13,30,0.78))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70">
                      Destaque premium
                    </span>
                    <p className="mt-4 max-w-xs font-serif text-3xl font-semibold leading-tight text-white">
                      {heroProduct?.name}
                    </p>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
                      {heroProduct?.shortDescription}
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <span className="text-lg font-semibold text-white">
                        {heroProduct?.price.toFixed(2).replace('.', ',')} €
                      </span>
                      {heroProduct?.compareAtPrice ? (
                        <span className="text-sm text-white/40 line-through">
                          {heroProduct.compareAtPrice.toFixed(2).replace('.', ',')} €
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-[1.7rem] border border-[#8f355d]/10 bg-[#fffafb] p-6 shadow-[0_12px_34px_rgba(143,53,93,0.06)]">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#a55b7d]">
                        Porto Exótico
                      </span>

                      <div className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-white px-3 py-2 shadow-[0_8px_20px_rgba(143,53,93,0.06)]">
                        <Star className="h-4 w-4 text-[#8f355d]" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#7a2f4f]">
                          Curadoria premium
                        </span>
                      </div>
                    </div>

                    <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#6f2947]">
                      Uma apresentação mais sedutora, discreta e orientada para venda.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-neutral-700">
                      Um visual premium para reforçar confiança, melhorar intenção de compra e dar
                      à marca uma presença mais elegante, segura e memorável.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.6rem] border border-[#8f355d]/10 bg-white p-5 shadow-[0_12px_34px_rgba(143,53,93,0.06)]">
                      <Lock className="h-5 w-5 text-[#8f355d]" />
                      <p className="mt-4 text-sm font-medium text-[#6f2947]">
                        Privacidade garantida
                      </p>
                      <p className="mt-2 text-sm leading-6 text-neutral-600">
                        Uma compra reservada, confidencial e pensada para o seu conforto.
                      </p>
                    </div>

                    <div className="rounded-[1.6rem] border border-[#8f355d]/10 bg-white p-5 shadow-[0_12px_34px_rgba(143,53,93,0.06)]">
                      <HeartHandshake className="h-5 w-5 text-[#8f355d]" />
                      <p className="mt-4 text-sm font-medium text-[#6f2947]">Escolha intuitiva</p>
                      <p className="mt-2 text-sm leading-6 text-neutral-600">
                        Produtos apresentados com clareza para converter com mais confiança.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {secondaryProducts.map((product) => (
                      <Link
                        key={product.id}
                        to={`/produto/${product.slug}`}
                        className="group overflow-hidden rounded-[1.5rem] border border-[#8f355d]/10 bg-white shadow-[0_12px_30px_rgba(143,53,93,0.06)] transition duration-300 hover:-translate-y-1"
                      >
                        <div className="aspect-[4/4.2] overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <p className="line-clamp-2 font-serif text-xl font-semibold leading-tight text-[#6f2947]">
                            {product.name}
                          </p>
                          <p className="mt-3 text-sm font-medium text-[#8f355d]">
                            {product.price.toFixed(2).replace('.', ',')} €
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="rounded-[1.6rem] border border-[#8f355d]/10 bg-white p-5 shadow-[0_12px_34px_rgba(143,53,93,0.06)]">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="flex items-start gap-3">
                        <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#8f355d]" />
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.24em] text-[#a55b7d]">
                            Envio
                          </p>
                          <p className="mt-2 text-sm leading-6 text-neutral-700">
                            Discreto e neutro
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-[#8f355d]" />
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.24em] text-[#a55b7d]">
                            Pagamento
                          </p>
                          <p className="mt-2 text-sm leading-6 text-neutral-700">
                            Seguro e simples
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#8f355d]" />
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.24em] text-[#a55b7d]">
                            Experiência
                          </p>
                          <p className="mt-2 text-sm leading-6 text-neutral-700">
                            Premium e confidencial
                          </p>
                        </div>
                      </div>
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
              Mais vendidos
            </span>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-6xl">
              Os produtos que mais despertam atenção na coleção.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
              Uma seleção pensada para destacar os produtos com maior apelo visual, melhor intenção
              de compra e potencial de conversão.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/produto/${product.slug}`}
                className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,10,16,0.02),rgba(20,10,16,0.42))]" />

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

                <div className="p-6">
                  <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/60">
                    {productCategories.find((category) => category.value === product.category)?.label ??
                      product.category}
                  </span>

                  <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-white">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/68">{product.shortDescription}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

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
                      Ver produto
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
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-white/10"
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
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#6f2947] md:text-6xl">
                Explore a coleção com mais clareza, ritmo e intenção.
              </h2>
            </div>

            <Link
              to="/loja"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-[#7a2f4f] transition hover:text-[#8f355d]"
            >
              Ver tudo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {featuredCategories.map((category, index) => (
              <Link
                key={category.value}
                to="/loja"
                className="group relative overflow-hidden rounded-[1.8rem] border border-[#8f355d]/10 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(143,53,93,0.08)]"
              >
                <div
                  className={`absolute inset-0 ${
                    index % 5 === 0
                      ? 'bg-gradient-to-br from-[#f7e8ef] via-white to-[#fdf8fb]'
                      : index % 5 === 1
                        ? 'bg-gradient-to-br from-[#f7efe6] via-white to-[#fdfaf6]'
                        : index % 5 === 2
                          ? 'bg-gradient-to-br from-[#f3e7f0] via-white to-[#fcf8fb]'
                          : index % 5 === 3
                            ? 'bg-gradient-to-br from-[#f8e9ef] via-white to-[#fdf8fa]'
                            : 'bg-gradient-to-br from-[#f4e9f6] via-white to-[#fcf7fb]'
                  }`}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,53,93,0.06),transparent_30%)] opacity-90" />

                <div className="relative flex min-h-[250px] flex-col justify-between">
                  <span className="w-fit rounded-full border border-[#8f355d]/10 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#a55b7d]">
                    Categoria
                  </span>

                  <div>
                    <h3 className="font-serif text-3xl font-semibold text-[#6f2947]">
                      {category.label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-neutral-700">
                      {categoryDescriptions[category.value] ??
                        'Descubra produtos pensados para diferentes preferências, momentos e estilos.'}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-[#7a2f4f]">
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
          <div className="relative overflow-hidden rounded-[2.1rem] border border-[#8f355d]/10 bg-[#fffafb] px-6 py-10 shadow-[0_22px_70px_rgba(143,53,93,0.08)] md:px-10 md:py-14">
            <div className="absolute inset-0">
              <div className="absolute left-[-10%] top-0 h-52 w-52 rounded-full bg-[#b24d79]/10 blur-3xl" />
              <div className="absolute bottom-[-10%] right-0 h-44 w-44 rounded-full bg-[#e7c9a5]/16 blur-3xl" />
            </div>

            <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-3 rounded-full border border-[#8f355d]/10 bg-white px-4 py-3 shadow-[0_10px_28px_rgba(143,53,93,0.08)]"
                  >
                    <img src={logoSrc} alt="Porto Exótico" className="h-8 w-8 object-contain" />

                    <div className="min-w-0">
                      <span className="block font-serif text-lg font-semibold leading-none tracking-[0.01em] text-[#7a2f4f]">
                        Porto Exótico
                      </span>
                      <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.32em] text-[#a55b7d]">
                        Compra discreta e segura
                      </span>
                    </div>
                  </Link>

                  <span className="inline-block rounded-full border border-[#8f355d]/10 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
                    Experiência premium
                  </span>
                </div>

                <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#6f2947] md:text-6xl">
                  Privacidade, confiança e um ambiente visual à altura da marca.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700">
                  Uma loja criada para ser discreta na forma, segura no processo e premium na
                  perceção, ajudando cada utilizador a comprar com mais conforto e confiança.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
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

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/loja"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#8f355d_0%,#a84f78_100%)] px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-[0_16px_38px_rgba(143,53,93,0.24)] transition duration-300 hover:-translate-y-0.5"
                >
                  Descobrir a loja
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/checkout"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8f355d]/15 bg-white px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-[#7a2f4f] transition duration-300 hover:border-[#8f355d]/30 hover:bg-[#fff7fb]"
                >
                  Finalizar compra
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
