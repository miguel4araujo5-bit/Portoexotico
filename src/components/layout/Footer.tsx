import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:px-10 lg:flex-row lg:items-end lg:justify-between">
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

        <div className="grid gap-8 sm:grid-cols-2 lg:min-w-[420px]">
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

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-14 items-center justify-center">
                    <img
                      src="/paypal.svg"
                      alt="PayPal"
                      className="max-h-7 w-auto object-contain opacity-95"
                    />
                  </div>
                  <span className="text-sm text-white">PayPal</span>
                </div>

                <span className="w-[120px] rounded-full border border-white/10 bg-white/5 py-1 text-center text-[10px] uppercase tracking-[0.22em] text-emerald-200/80">
                  Disponível
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-14 items-center justify-center">
                    <img
                      src="/stripe.svg"
                      alt="Stripe"
                      className="max-h-7 w-auto object-contain opacity-95"
                    />
                  </div>
                  <span className="text-sm text-white">Stripe</span>
                </div>

                <span className="w-[120px] rounded-full border border-white/10 bg-white/5 py-1 text-center text-[10px] uppercase tracking-[0.22em] text-amber-200/80">
                  Brevemente
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-14 items-center justify-center rounded-md bg-white p-1 shadow-sm">
                    <img
                      src="/mbway.svg"
                      alt="MB WAY"
                      className="max-h-6 w-auto object-contain opacity-100"
                    />
                  </div>
                  <span className="text-sm text-white">MB WAY</span>
                </div>

                <span className="w-[120px] rounded-full border border-white/10 bg-white/5 py-1 text-center text-[10px] uppercase tracking-[0.22em] text-amber-200/80">
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
