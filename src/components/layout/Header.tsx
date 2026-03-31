import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const navigation = [
  { label: 'Início', to: '/' },
  { label: 'Loja', to: '/loja' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contactos', to: '/contactos' },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = '';
  }, [isMobileMenuOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'transition-colors duration-200',
      isActive ? 'text-white' : 'text-white/70 hover:text-white',
    ].join(' ');

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 pt-4 md:px-10">
          <div className="flex items-center justify-between rounded-full border border-white/10 bg-neutral-950/75 px-4 py-3 backdrop-blur-xl md:px-6">
            <Link
              to="/"
              className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-90"
              aria-label="Porto Exótico - Ir para a página inicial"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
                PE
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold tracking-[0.2em] text-white uppercase">
                  Porto Exótico
                </p>
                <p className="text-[11px] text-white/50">
                  Discrição, prazer e elegância
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
              {navigation.map((item) => (
                <NavLink key={item.to} to={item.to} className={navLinkClass}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/carrinho"
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/10"
                aria-label={`Abrir carrinho${itemCount > 0 ? ` com ${itemCount} item${itemCount > 1 ? 's' : ''}` : ''}`}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 ? (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-neutral-950">
                    {itemCount}
                  </span>
                ) : null}
              </Link>

              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/10 md:hidden"
                aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="h-24 md:h-28" />

      {isMobileMenuOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-neutral-950/96 px-6 pt-28 backdrop-blur-xl md:hidden"
        >
          <nav className="mx-auto flex max-w-md flex-col gap-3" aria-label="Menu mobile">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'rounded-2xl border px-5 py-4 text-base transition-all duration-200',
                    isActive
                      ? 'border-white/20 bg-white/10 text-white'
                      : 'border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/checkout"
              className="mt-3 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-transform duration-200 hover:scale-[1.01]"
            >
              Finalizar compra
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
};

export default Header;
