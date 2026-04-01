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
              <div className="flex items-center gap-3">
                <img src="/paypal.svg" alt="PayPal" className="h-5 w-auto opacity-90" />
                <span className="text-sm text-white">PayPal</span>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-emerald-300">
                  Disponível
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img src="/stripe.svg" alt="Stripe" className="h-5 w-auto opacity-70" />
                <span className="text-sm text-white">Stripe</span>
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-amber-300">
                  Brevemente
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-flex rounded-md bg-white p-1 shadow-sm">
                  <img src="/mbway.svg" alt="MB WAY" className="block h-5 w-auto opacity-100" />
                </div>
                <span className="text-sm text-white">MB WAY</span>
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-amber-300">
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
