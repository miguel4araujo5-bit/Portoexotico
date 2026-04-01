import React from 'react';
import { Link } from 'react-router-dom';

const logoSvgSrc = '/favicon.svg';
const logoFallbackSrc = '/favicon-96x96.png';
const supportEmail = 'portoexotico@gmail.com';

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[#8f355d]/10 bg-[#1f0c16] text-white">
      <div className="absolute inset-0">
        <div className="absolute left-[-10%] top-[-12%] h-64 w-64 rounded-full bg-[#b24d79]/12 blur-3xl" />
        <div className="absolute bottom-[-18%] right-[-8%] h-56 w-56 rounded-full bg-[#e7c9a5]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_28%),linear-gradient(180deg,rgba(31,12,22,0.94),rgba(23,8,16,0.98))]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 md:px-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="max-w-2xl">
          <Link
            to="/"
            className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/95 px-4 py-3 shadow-[0_16px_40px_rgba(143,53,93,0.14)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_46px_rgba(143,53,93,0.2)]"
          >
            <picture>
              <source srcSet={logoSvgSrc} type="image/svg+xml" />
              <img
                src={logoFallbackSrc}
                alt="Porto Exótico"
                className="h-9 w-9 object-contain"
              />
            </picture>

            <div className="min-w-0">
              <span className="block font-serif text-[1.15rem] font-semibold leading-none tracking-[0.01em] text-[#7a2f4f] sm:text-[1.35rem]">
                Porto Exótico
              </span>
              <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.32em] text-[#a55b7d]">
                Compra discreta e segura
              </span>
            </div>
          </Link>

          <p className="mt-7 text-[11px] uppercase tracking-[0.32em] text-white/35">Porto Exótico</p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl font-semibold leading-tight text-white md:text-4xl">
            Uma experiência mais premium, reservada e criada para comprar com confiança.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/62 md:text-[15px]">
            Boutique íntima online com uma seleção cuidada, apresentação elegante e uma navegação
            pensada para privacidade, conforto e discrição do primeiro clique ao checkout.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/65">
              Envio discreto
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/65">
              Compra segura
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/65">
              Curadoria premium
            </span>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:min-w-[560px] lg:gap-10">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-md">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/35">Navegação</p>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/68">
              <Link to="/" className="transition hover:text-white">
                Início
              </Link>
              <Link to="/loja" className="transition hover:text-white">
                Loja
              </Link>
              <Link to="/sobre" className="transition hover:text-white">
                Sobre
              </Link>
              <Link to="/contactos" className="transition hover:text-white">
                Contactos
              </Link>
              <Link to="/carrinho" className="transition hover:text-white">
                Carrinho
              </Link>
              <Link to="/checkout" className="transition hover:text-white">
                Checkout
              </Link>
            </div>

            <div className="mt-6 rounded-[1.3rem] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">Email</p>
              <a
                href={`mailto:${supportEmail}`}
                className="mt-2 block text-sm text-white/72 transition hover:text-white"
              >
                {supportEmail}
              </a>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-md">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/35">
              Pagamentos disponíveis
            </p>

            <div className="mt-5 space-y-3">
              <div className="grid grid-cols-[60px_minmax(0,1fr)_118px] items-center gap-3 rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-3 py-2.5 transition hover:border-white/15 hover:bg-white/[0.05]">
                <div className="flex h-9 w-[60px] items-center justify-center rounded-[0.85rem] bg-[#f4f1eb] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-black/5">
                  <img
                    src="/paypal.svg"
                    alt="PayPal"
                    className="h-[33px] w-auto object-contain"
                  />
                </div>

                <span className="whitespace-nowrap text-[15px] font-medium tracking-[0.01em] text-white">
                  PayPal
                </span>

                <span className="inline-flex w-[118px] items-center justify-center rounded-full border border-white/10 bg-white/[0.04] py-1 text-center text-[10px] uppercase tracking-[0.28em] text-emerald-200/80">
                  Disponível
                </span>
              </div>

              <div className="grid grid-cols-[60px_minmax(0,1fr)_118px] items-center gap-3 rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-3 py-2.5 transition hover:border-white/15 hover:bg-white/[0.05]">
                <div className="flex h-9 w-[60px] items-center justify-center rounded-[0.85rem] bg-[#f4f1eb] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-black/5">
                  <img
                    src="/stripe.svg"
                    alt="Stripe"
                    className="h-[33px] w-auto object-contain"
                  />
                </div>

                <span className="whitespace-nowrap text-[15px] font-medium tracking-[0.01em] text-white">
                  Stripe
                </span>

                <span className="inline-flex w-[118px] items-center justify-center rounded-full border border-white/10 bg-white/[0.04] py-1 text-center text-[10px] uppercase tracking-[0.28em] text-amber-200/80">
                  Brevemente
                </span>
              </div>

              <div className="grid grid-cols-[60px_minmax(0,1fr)_118px] items-center gap-3 rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-3 py-2.5 transition hover:border-white/15 hover:bg-white/[0.05]">
                <div className="flex h-9 w-[60px] items-center justify-center rounded-[0.85rem] bg-[#f4f1eb] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-black/5">
                  <img
                    src="/mbway.svg"
                    alt="MB WAY"
                    className="h-[30px] w-auto object-contain"
                  />
                </div>

                <span className="whitespace-nowrap text-[15px] font-medium tracking-[0.01em] text-white">
                  MB WAY
                </span>

                <span className="inline-flex w-[118px] items-center justify-center rounded-full border border-white/10 bg-white/[0.04] py-1 text-center text-[10px] uppercase tracking-[0.28em] text-amber-200/80">
                  Brevemente
                </span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-white/55">
              Opções de pagamento pensadas para uma experiência mais simples, elegante e discreta.
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs text-white/40 md:flex-row md:items-center md:justify-between md:px-10">
          <p>© 2026 Porto Exótico. Todos os direitos reservados.</p>
          <p>Privacidade em primeiro lugar. Envio discreto. Checkout protegido.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
