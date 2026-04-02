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
            className="group flex min-w-0 items-center gap-4 rounded-full border border-[#8f355d]/10 bg-white/95 px-4 py-3 shadow-[0_16px_40px_rgba(143,53,93,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[#8f355d]/20 hover:shadow-[0_22px_52px_rgba(143,53,93,0.14)] sm:px-5"
          >
            <img
              src={logoSrc}
              alt="Porto Exótico"
              className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
            />

            <div className="min-w-0">
              <span className="block truncate font-serif text-[1.6rem] font-semibold leading-none tracking-[0.01em] text-[#7a2f4f] sm:text-[2.1rem]">
                Porto Exótico
              </span>
              <span className="mt-1.5 block truncate text-[9px] font-medium uppercase tracking-[0.38em] text-[#a55b7d] sm:text-[11px]">
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
