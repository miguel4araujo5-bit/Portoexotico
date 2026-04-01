import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:px-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/35">Porto Exótico</p>
          <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
            Discrição, elegância e uma experiência pensada ao detalhe.
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Boutique íntima online com navegação simples, checkout protegido e uma experiência
            premium do início ao fim.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:min-w-[460px]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">Navegação</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/65">
              <Link to="/" className="transition hover:text-white">
                Início
              </Link>
              <Link to="/loja" className="transition hover:text-white">
                Loja
              </Link>
              <Link to="/carrinho" className="transition hover:text-white">
                Carrinho
              </Link>
              <Link to="/checkout" className="transition hover:text-white">
                Checkout
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              Pagamentos disponíveis
            </p>

            <div className="mt-4 space-y-2.5">
              <div className="grid grid-cols-[60px_minmax(0,1fr)_118px] items-center gap-3 rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-3 py-2.5 transition hover:border-white/15 hover:bg-white/[0.05]">
                <div className="flex h-9 w-[60px] items-center justify-center rounded-[0.85rem] bg-[#f4f1eb] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-black/5">
                  <img
                    src="/paypal.svg"
                    alt="PayPal"
                    className="h-[31px] w-auto object-contain opacity-100"
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
                    className="h-[31px] w-auto object-contain opacity-100"
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
                    className="h-[28px] w-auto object-contain opacity-100"
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

            <p className="mt-4 text-sm leading-7 text-white/55">
              Pagamentos práticos, seguros e discretos para uma compra sem fricção.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs text-white/40 md:flex-row md:items-center md:justify-between md:px-10">
          <p>© 2026 Porto Exótico. Todos os direitos reservados.</p>
          <p>Envio discreto. Checkout protegido. Privacidade em primeiro lugar.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
