import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock3,
  Instagram,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

const supportEmail = 'portoexotico@gmail.com';
const supportWhatsApp = '';
const instagramUrl = '';
const instagramHandle = '';
const locationLabel = 'São Mamede de Infesta';
const mapEmbedSrc =
  'https://www.google.com/maps?q=S%C3%A3o%20Mamede%20de%20Infesta&z=13&output=embed';
const mapExternalUrl =
  'https://www.google.com/maps/search/?api=1&query=S%C3%A3o%20Mamede%20de%20Infesta';
const supportWhatsAppDigits = supportWhatsApp.replace(/\D/g, '');
const logoSrc = '/logo.png';
const siteUrl = 'https://www.portoexotico.pt';
const canonicalUrl = `${siteUrl}/contactos`;

const channels = [
  supportEmail
    ? {
        label: 'Email',
        value: supportEmail,
        href: `mailto:${supportEmail}`,
        icon: Mail,
      }
    : null,
  supportWhatsApp
    ? {
        label: 'WhatsApp',
        value: supportWhatsApp,
        href: `https://wa.me/${supportWhatsAppDigits}`,
        icon: MessageCircle,
      }
    : null,
  instagramUrl && instagramHandle
    ? {
        label: 'Instagram',
        value: instagramHandle,
        href: instagramUrl,
        icon: Instagram,
      }
    : null,
].filter(Boolean) as Array<{
  label: string;
  value: string;
  href: string;
  icon: typeof Mail;
}>;

const Contactos: React.FC = () => {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contactos Porto Exótico',
    url: canonicalUrl,
    inLanguage: 'pt-PT',
    about: {
      '@type': 'Organization',
      name: 'Porto Exótico',
      url: siteUrl,
      email: supportEmail,
      areaServed: 'Portugal',
    },
  };

  return (
    <main className="bg-[#fcf8fa] text-neutral-900">
      <Helmet>
        <title>Contactos | Porto Exótico</title>
        <meta
          name="description"
          content="Contacte a Porto Exótico para apoio sobre artigos, encomendas, pagamentos, privacidade e experiência de compra. Atendimento com discrição, clareza e atenção."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Contactos | Porto Exótico" />
        <meta
          property="og:description"
          content="Apoio ao cliente com discrição, clareza e atenção para encomendas, pagamentos e privacidade."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl}/logo.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contactos | Porto Exótico" />
        <meta
          name="twitter:description"
          content="Apoio ao cliente com discrição, clareza e atenção para encomendas, pagamentos e privacidade."
        />
        <meta name="twitter:image" content={`${siteUrl}/logo.png`} />
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
      </Helmet>

      <section className="relative overflow-hidden border-b border-[#8f355d]/10">
        <div className="absolute inset-0">
          <div className="absolute left-[-8%] top-[-8%] h-[28rem] w-[28rem] rounded-full bg-[#b24d79]/10 blur-3xl" />
          <div className="absolute right-[-8%] top-[12%] h-[24rem] w-[24rem] rounded-full bg-[#e7c9a5]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,53,93,0.06),transparent_42%),linear-gradient(180deg,rgba(252,248,250,0.94),rgba(252,248,250,0.98))]" />
        </div>

        <div className="container-custom relative py-16 md:py-20">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-3 rounded-full border border-[#8f355d]/10 bg-white/90 px-4 py-3 shadow-[0_10px_30px_rgba(143,53,93,0.08)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_14px_40px_rgba(143,53,93,0.14)]"
              >
                <img src={logoSrc} alt="Porto Exótico" className="h-8 w-8 object-contain" />

                <div className="min-w-0">
                  <span className="block font-serif text-lg font-semibold leading-none tracking-[0.02em] text-[#7a2f4f]">
                    Porto Exótico
                  </span>
                  <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.28em] text-[#a55b7d]">
                    Compra discreta e segura
                  </span>
                </div>
              </Link>

              <span className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-white/80 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[#9b5a79] shadow-[0_10px_30px_rgba(143,53,93,0.06)]">
                <MessageCircle className="h-4 w-4" />
                Contactos
              </span>
            </div>

            <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-[#6f2947] md:text-6xl">
              Apoio ao cliente com discrição, clareza e atenção.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700 md:text-lg">
              Se pretender esclarecimentos sobre artigos, encomendas, pagamentos ou apoio pós-venda,
              a Porto Exótico procura responder com atenção, reserva e uma experiência de contacto
              mais cuidada. A marca está baseada em São Mamede de Infesta, na zona do Porto, com
              contacto disponível por email e com contacto telefónico disponível em breve.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-[#8f355d]/10 bg-[#fcf8fa]">
        <div className="container-custom">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-[1.8rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_18px_44px_rgba(143,53,93,0.06)]">
              <ShoppingBag className="h-5 w-5 text-[#8f355d]" />
              <h2 className="mt-5 text-xl font-semibold text-[#6f2947]">Encomendas e compras</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                Esclarecimentos sobre artigos, disponibilidade, carrinho e processo de compra.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_18px_44px_rgba(143,53,93,0.06)]">
              <ShieldCheck className="h-5 w-5 text-[#8f355d]" />
              <h2 className="mt-5 text-xl font-semibold text-[#6f2947]">Pagamentos e segurança</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                Informação sobre checkout, métodos de pagamento e uma experiência de compra segura.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_18px_44px_rgba(143,53,93,0.06)]">
              <Lock className="h-5 w-5 text-[#8f355d]" />
              <h2 className="mt-5 text-xl font-semibold text-[#6f2947]">Privacidade e discrição</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                Questões relacionadas com embalagem, envio discreto e confidencialidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-[#8f355d]/10 bg-[#fffafb]">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-5">
              <div className="rounded-[2rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_20px_60px_rgba(143,53,93,0.06)] md:p-8">
                <span className="inline-block rounded-full border border-[#8f355d]/10 bg-[#fffafb] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
                  Canais oficiais
                </span>

                {channels.length > 0 ? (
                  <div className="mt-6 space-y-4">
                    {channels.map((channel) => {
                      const Icon = channel.icon;

                      return (
                        <a
                          key={channel.label}
                          href={channel.href}
                          target={channel.label === 'Instagram' ? '_blank' : undefined}
                          rel={channel.label === 'Instagram' ? 'noreferrer' : undefined}
                          className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-[#8f355d]/10 bg-[#fffafb] px-5 py-4 transition duration-300 hover:border-[#8f355d]/25 hover:bg-white"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#8f355d]/10 bg-white text-[#8f355d]">
                              <Icon className="h-5 w-5" />
                            </div>

                            <div>
                              <p className="text-sm font-medium text-[#6f2947]">{channel.label}</p>
                              <p className="mt-1 text-sm text-neutral-600">{channel.value}</p>
                            </div>
                          </div>

                          <ArrowRight className="h-4 w-4 text-[#8f355d]" />
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-6 rounded-[1.5rem] border border-dashed border-[#8f355d]/15 bg-[#fffafb] p-6">
                    <p className="text-sm font-medium text-[#6f2947]">Canais de contacto a configurar</p>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600">
                      Esta página já está preparada. O email oficial já pode ser disponibilizado e o
                      contacto telefónico será adicionado em breve, juntamente com outros canais
                      oficiais da marca.
                    </p>
                  </div>
                )}
              </div>

              <div className="rounded-[2rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_20px_60px_rgba(143,53,93,0.06)] md:p-8">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#8f355d]" />
                  <h2 className="text-xl font-semibold text-[#6f2947]">Localização</h2>
                </div>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  A Porto Exótico está baseada em {locationLabel}, na zona do Porto, apresentando,
                  para já, apenas uma referência geográfica geral, sem divulgação de morada exata ou
                  ponto físico de atendimento.
                </p>

                <div className="mt-6 overflow-hidden rounded-[1.6rem] border border-[#8f355d]/10 bg-[#fffafb]">
                  <iframe
                    src={mapEmbedSrc}
                    title={`Mapa de ${locationLabel}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[320px] w-full border-0"
                  />
                </div>

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-7 text-neutral-600">
                    Mapa meramente indicativo da zona de São Mamede de Infesta.
                  </p>

                  <a
                    href={mapExternalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8f355d]/15 bg-[#fffafb] px-5 py-3 text-sm font-medium uppercase tracking-[0.14em] text-[#7a2f4f] transition duration-300 hover:border-[#8f355d]/30 hover:bg-white"
                  >
                    Abrir mapa
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[2rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_20px_60px_rgba(143,53,93,0.06)] md:p-8">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-[#8f355d]" />
                  <h2 className="text-xl font-semibold text-[#6f2947]">Atendimento</h2>
                </div>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  A comunicação da marca procura ser clara, cuidada e discreta, com atenção tanto ao
                  apoio pré-compra como ao acompanhamento pós-venda. O email está disponível como
                  canal de contacto e o número de telemóvel será disponibilizado em breve.
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-[1.4rem] border border-[#8f355d]/10 bg-[#fffafb] p-4">
                    <p className="text-sm font-medium text-[#6f2947]">Apoio à compra</p>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      Esclarecimentos sobre artigos, categorias, escolha e processo de encomenda.
                    </p>
                  </div>

                  <div className="rounded-[1.4rem] border border-[#8f355d]/10 bg-[#fffafb] p-4">
                    <p className="text-sm font-medium text-[#6f2947]">Apoio pós-venda</p>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      Informação relacionada com acompanhamento, confiança e experiência de compra.
                    </p>
                  </div>

                  <div className="rounded-[1.4rem] border border-[#8f355d]/10 bg-[#fffafb] p-4">
                    <p className="text-sm font-medium text-[#6f2947]">Privacidade</p>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      Uma abordagem reservada e orientada para discrição em toda a comunicação.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#8f355d]/10 bg-white p-6 shadow-[0_20px_60px_rgba(143,53,93,0.06)] md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-3 rounded-full border border-[#8f355d]/10 bg-white px-4 py-3 shadow-[0_10px_28px_rgba(143,53,93,0.08)]"
                  >
                    <img src={logoSrc} alt="Porto Exótico" className="h-8 w-8 object-contain" />

                    <div className="min-w-0">
                      <span className="block font-serif text-lg font-semibold leading-none tracking-[0.02em] text-[#7a2f4f]">
                        Porto Exótico
                      </span>
                      <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.28em] text-[#a55b7d]">
                        Compra discreta e segura
                      </span>
                    </div>
                  </Link>

                  <span className="inline-block rounded-full border border-[#8f355d]/10 bg-[#fffafb] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#9b5a79]">
                    Continue a explorar
                  </span>
                </div>

                <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-[#6f2947]">
                  Descubra a coleção com total discrição e confiança.
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  Enquanto o contacto telefónico não fica disponível, a loja continua aberta para
                  explorar categorias, produtos e uma experiência de compra mais cuidada, com apoio
                  por email já ativo.
                </p>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/loja"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8f355d] px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-[0_14px_34px_rgba(143,53,93,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7d2f52]"
                  >
                    Descobrir a loja
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    to="/sobre"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8f355d]/15 bg-[#fffafb] px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-[#7a2f4f] transition duration-300 hover:border-[#8f355d]/30 hover:bg-white"
                  >
                    Saber mais
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contactos;

2
import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const logoSrc = '/logo.png';

const Header: React.FC = () => {
  const location = useLocation();
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const links = useMemo(
    () => [
      { to: '/', label: 'Início' },
      { to: '/loja', label: 'Loja' },
      { to: '/sobre', label: 'Sobre' },
      { to: '/contactos', label: 'Contactos' },
    ],
    []
  );

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    [
      'group relative text-[13px] font-medium uppercase tracking-[0.22em] transition-all duration-300',
      isActive ? 'text-[#8f355d]' : 'text-neutral-800 hover:text-[#8f355d]',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-[#8f355d]/10 bg-[#fcf8fa]/88 backdrop-blur-2xl">
      <div className="container-custom">
        <div className="flex min-h-24 items-center justify-between gap-4 py-4">
          <Link
            to="/"
            className="group flex min-w-0 items-center gap-3 rounded-full border border-[#8f355d]/10 bg-white/95 px-5 py-4 shadow-[0_16px_40px_rgba(143,53,93,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[#8f355d]/20 hover:shadow-[0_22px_52px_rgba(143,53,93,0.14)] sm:px-6"
          >
            <img
              src={logoSrc}
              alt="Porto Exótico"
              className="h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
            />

            <div className="min-w-0">
              <span className="block truncate font-serif text-[1.45rem] font-semibold leading-none tracking-[0.01em] text-[#7a2f4f] sm:text-[2rem]">
                Porto Exótico
              </span>
              <span className="mt-1.5 block truncate text-[8px] font-medium uppercase tracking-[0.34em] text-[#a55b7d] sm:text-[10px]">
                Compra discreta e segura
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClassName}>
                {({ isActive }) => (
                  <span className="relative inline-flex flex-col items-center">
                    {link.label}
                    <span
                      className={[
                        'mt-2 h-px w-0 bg-[#8f355d] transition-all duration-300',
                        isActive ? 'w-full' : 'group-hover:w-full',
                      ].join(' ')}
                    />
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/carrinho"
              className="relative inline-flex h-11 items-center justify-center rounded-full border border-[#8f355d]/12 bg-white px-5 text-[13px] font-medium uppercase tracking-[0.16em] text-[#7a2f4f] shadow-[0_10px_24px_rgba(143,53,93,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[#8f355d]/28 hover:bg-[#fff8fb] hover:shadow-[0_16px_34px_rgba(143,53,93,0.14)]"
            >
              <span className="inline-flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Carrinho
              </span>

              {cartCount > 0 ? (
                <span className="ml-3 inline-flex min-w-[1.6rem] items-center justify-center rounded-full bg-[#8f355d] px-2 py-1 text-[10px] font-semibold tracking-normal text-white">
                  {cartCount}
                </span>
              ) : null}
            </Link>

            <Link
              to="/loja"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#8f355d_0%,#a84f78_100%)] px-5 text-[13px] font-medium uppercase tracking-[0.16em] text-white shadow-[0_14px_30px_rgba(143,53,93,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(143,53,93,0.32)]"
            >
              Comprar agora
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/carrinho"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#8f355d]/12 bg-white text-[#7a2f4f] shadow-[0_10px_24px_rgba(143,53,93,0.08)] transition duration-300 hover:bg-[#fff8fb]"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag className="h-5 w-5" />

              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-[#8f355d] px-1.5 py-1 text-[10px] font-semibold leading-none text-white">
                  {cartCount}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#8f355d]/12 bg-white text-[#7a2f4f] shadow-[0_10px_24px_rgba(143,53,93,0.08)] transition duration-300 hover:bg-[#fff8fb]"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isOpen ? (
          <div className="border-t border-[#8f355d]/10 py-4 lg:hidden">
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    [
                      'rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] transition duration-300',
                      isActive
                        ? 'bg-[#8f355d] text-white shadow-[0_12px_26px_rgba(143,53,93,0.22)]'
                        : 'bg-white text-neutral-800 hover:bg-[#fff7fb] hover:text-[#8f355d]',
                    ].join(' ')
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <Link
                to="/loja"
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#8f355d_0%,#a84f78_100%)] px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white shadow-[0_12px_26px_rgba(143,53,93,0.22)] transition duration-300"
              >
                Comprar agora
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;

3

export type ProductCategory =
  | 'acessorios'
  | 'lubrificantes'
  | 'preservativos'
  | 'prazer'
  | 'excitacao';

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  tags: string[];
  image?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
};

export const productCategories: Array<{
  value: ProductCategory;
  label: string;
}> = [
  { value: 'prazer', label: 'Prazer' },
  { value: 'acessorios', label: 'Acessórios' },
  { value: 'lubrificantes', label: 'Lubrificantes' },
  { value: 'preservativos', label: 'Preservativos' },
  { value: 'excitacao', label: 'Excitação' },
];

export const products: Product[] = [
  {
    id: 'satisfyer',
    slug: 'satisfyer',
    name: 'Satisfyer',
    category: 'prazer',
    shortDescription: 'Estimulação intensa, elegante e discreta para uma experiência premium.',
    description:
      'Um dos modelos mais procurados para prazer feminino, pensado para proporcionar uma experiência sofisticada, confortável e envolvente. Combina um design moderno com uma utilização intuitiva, ideal para quem valoriza discrição, eficácia e uma apresentação cuidada.',
    price: 49.9,
    compareAtPrice: 59.9,
    tags: ['satisfyer', 'prazer feminino', 'premium', 'mais vendido'],
    image: '/produtos/Satisfyer.webp',
    isBestSeller: true,
  },
  {
    id: 'varinha-magica',
    slug: 'varinha-magica',
    name: 'Varinha Mágica',
    category: 'prazer',
    shortDescription: 'Um clássico poderoso para momentos mais intensos e envolventes.',
    description:
      'Uma escolha muito procurada por quem prefere intensidade e presença numa só peça. Foi pensada para proporcionar uma experiência marcante, confortável e simples de integrar na rotina íntima, com um perfil visual apelativo e fácil utilização.',
    price: 39.9,
    compareAtPrice: 49.9,
    tags: ['varinha', 'vibrador', 'intenso', 'clássico'],
    image: '/produtos/VarinhaMagica.webp',
  },
  {
    id: 'varinha-magica-pro',
    slug: 'varinha-magica-pro',
    name: 'Varinha Mágica Pro',
    category: 'prazer',
    shortDescription: 'Versão mais intensa e premium para uma experiência superior.',
    description:
      'Uma evolução da versão clássica para quem procura mais potência, maior presença e uma sensação ainda mais envolvente. Mantém uma proposta premium, confortável e eficaz, orientada para quem não quer comprometer intensidade nem qualidade.',
    price: 59.9,
    compareAtPrice: 69.9,
    tags: ['varinha', 'pro', 'premium', 'prazer feminino'],
    image: '/produtos/VarinhaMagicaPro.webp',
    isBestSeller: true,
  },
  {
    id: 'vibrador-feminino',
    slug: 'vibrador-feminino',
    name: 'Vibrador Feminino',
    category: 'prazer',
    shortDescription: 'Design elegante e estimulação confortável para uso íntimo discreto.',
    description:
      'Um vibrador pensado para unir conforto, discrição e prazer numa proposta versátil. Ideal para quem procura uma peça prática, com uma apresentação cuidada e uma utilização simples, tanto para descoberta como para uso regular.',
    price: 27.9,
    compareAtPrice: 34.9,
    tags: ['vibrador', 'feminino', 'discreto', 'elegante'],
    image: '/produtos/VibradorFeminino.webp',
    isNew: true,
  },
  {
    id: 'vibrador-ohmama',
    slug: 'vibrador-ohmama',
    name: 'Vibrador Ohmama',
    category: 'prazer',
    shortDescription: 'Estimulação ousada com um visual moderno e provocador.',
    description:
      'Uma proposta pensada para quem procura uma experiência mais intensa e irreverente, com um perfil visual forte e uma utilização envolvente. Destaca-se pelo caráter moderno e pela forma como combina estética com prazer.',
    price: 34.9,
    compareAtPrice: 42.9,
    tags: ['ohmama', 'vibrador', 'intenso', 'moderno'],
    image: '/produtos/VibradorOhmama.webp',
  },
  {
    id: 'pocket-pussy',
    slug: 'pocket-pussy',
    name: 'Pocket Pussy',
    category: 'prazer',
    shortDescription: 'Textura envolvente para uma experiência masculina mais intensa.',
    description:
      'Uma peça íntima pensada para proporcionar uma experiência envolvente, prática e discreta, com foco em conforto e estimulação. A proposta é simples: oferecer uma sensação mais intensa com um formato compacto e uma utilização reservada.',
    price: 29.9,
    compareAtPrice: 36.9,
    tags: ['masculino', 'estimulação', 'prazer', 'discreto'],
    image: '/produtos/PocketPussy.webp',
  },
  {
    id: 'peineili',
    slug: 'peineili',
    name: 'Peineili',
    category: 'prazer',
    shortDescription: 'Peça íntima orientada para prazer direto, simples e confortável.',
    description:
      'Um produto pensado para utilização íntima com foco em conforto, simplicidade e prazer. Adequado para quem valoriza discrição, funcionalidade e uma abordagem mais prática, sem abdicar de uma experiência envolvente.',
    price: 24.9,
    compareAtPrice: 31.9,
    tags: ['prazer', 'íntimo', 'discreto', 'estimulação'],
    image: '/produtos/Peineili.webp',
    isNew: true,
  },
  {
    id: 'anel-peniano',
    slug: 'anel-peniano',
    name: 'Anel Peniano',
    category: 'excitacao',
    shortDescription: 'Mais intensidade, controlo e estimulação em momentos a dois.',
    description:
      'Um acessório pensado para reforçar a experiência íntima, promovendo maior intensidade e uma sensação mais envolvente de forma simples e discreta. Uma boa escolha para quem pretende explorar novas dinâmicas com confiança.',
    price: 14.9,
    compareAtPrice: 18.9,
    tags: ['anel', 'peniano', 'estimulação', 'casal'],
    image: '/produtos/AnelPeniano.webp',
  },
  {
    id: 'spray-retardante',
    slug: 'spray-retardante',
    name: 'Spray Retardante',
    category: 'excitacao',
    shortDescription: 'Ajuda a prolongar o momento com maior controlo e confiança.',
    description:
      'Uma solução prática para quem procura gerir melhor o ritmo da experiência íntima, reforçando a confiança e a duração do momento. Fácil de integrar e pensada para um uso mais simples, reservado e confortável.',
    price: 13.9,
    compareAtPrice: 17.9,
    tags: ['retardante', 'controlo', 'masculino', 'prazer'],
    image: '/produtos/SprayRetardante.webp',
  },
  {
    id: 'algemas-bondage',
    slug: 'algemas-bondage',
    name: 'Algemas Bondage',
    category: 'acessorios',
    shortDescription: 'Exploração ousada com conforto, estética e discrição.',
    description:
      'Um acessório pensado para introduzir novas dinâmicas de forma cuidada, elegante e envolvente. Ideal para quem procura variedade, fantasia e exploração com uma apresentação apelativa e maior sensação de confiança.',
    price: 19.9,
    compareAtPrice: 24.9,
    tags: ['bondage', 'algemas', 'fantasia', 'casal'],
    image: '/produtos/AlgemasBondage.webp',
  },
  {
    id: 'petazetas',
    slug: 'petazetas',
    name: 'Petazetas',
    category: 'acessorios',
    shortDescription: 'Um toque divertido e inesperado para apimentar o ambiente.',
    description:
      'Um complemento irreverente para criar momentos mais leves, descontraídos e sensoriais. Ideal para acrescentar surpresa, humor e provocação à experiência, seja a solo ou em casal.',
    price: 4.9,
    compareAtPrice: 6.9,
    tags: ['diversão', 'casal', 'acessório', 'surpresa'],
    image: '/produtos/Petazetas.webp',
    isNew: true,
  },
  {
    id: 'lubrificantes-sabores',
    slug: 'lubrificantes-sabores',
    name: 'Lubrificantes Sabores',
    category: 'lubrificantes',
    shortDescription: 'Mais fluidez, conforto e um lado sensorial mais provocador.',
    description:
      'Uma opção pensada para elevar a experiência íntima com maior conforto, melhor deslizamento e um toque divertido e sedutor. Muito procurado por quem quer juntar praticidade, sensação e um perfil mais sensorial.',
    price: 12.9,
    compareAtPrice: 15.9,
    tags: ['lubrificante', 'sabores', 'sensorial', 'casal'],
    image: '/produtos/LubrificantesSabores.webp',
    isBestSeller: true,
  },
  {
    id: 'preservativos-sensoriais',
    slug: 'preservativos-sensoriais',
    name: 'Preservativos Sensoriais',
    category: 'preservativos',
    shortDescription: 'Proteção com conforto e uma experiência mais estimulante.',
    description:
      'Pensados para unir segurança, conforto e sensorialidade, tornando a experiência mais protegida sem abdicar do prazer. Uma escolha equilibrada para quem procura confiança, conforto e uma utilização mais agradável.',
    price: 8.9,
    compareAtPrice: 11.9,
    tags: ['preservativos', 'proteção', 'sensorial', 'casal'],
    image: '/produtos/PreservativosSensoriais.webp',
  },
];

export const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};

export const getProductsByCategory = (category: ProductCategory) => {
  return products.filter((product) => product.category === category);
};
