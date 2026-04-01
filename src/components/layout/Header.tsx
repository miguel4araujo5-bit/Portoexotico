import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
      'relative text-[13px] font-medium uppercase tracking-[0.22em] transition-all duration-300',
      isActive ? 'text-[#8f355d]' : 'text-neutral-800 hover:text-[#8f355d]',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-[#8f355d]/10 bg-[#fcf8fa]/90 backdrop-blur-xl">
      <div className="container-custom">
        <div className="flex h-24 items-center justify-between gap-4">
          <Link to="/" className="group flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#8f355d]/15 bg-white shadow-[0_10px_30px_rgba(143,53,93,0.08)] transition duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_14px_40px_rgba(143,53,93,0.14)]">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-[#9b3565]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 20.5s-7.5-5.03-9.25-9.2C1.42 8.14 3.2 4.5 7.2 4.5c2.03 0 3.69 1.02 4.8 2.74 1.11-1.72 2.77-2.74 4.8-2.74 4 0 5.78 3.64 4.45 6.8C19.5 15.47 12 20.5 12 20.5Z" />
              </svg>
            </div>

            <div className="min-w-0">
              <span className="block truncate font-serif text-[1.7rem] font-semibold leading-none tracking-[0.02em] text-[#7a2f4f] sm:text-[2rem]">
                Porto Exótico
              </span>
              <span className="mt-1.5 block truncate text-[10px] font-medium uppercase tracking-[0.34em] text-[#a55b7d] sm:text-[11px]">
                Discrição, desejo e elegância
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
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#8f355d]/15 bg-white px-5 text-[13px] font-medium uppercase tracking-[0.16em] text-[#7a2f4f] shadow-[0_8px_24px_rgba(143,53,93,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[#8f355d]/30 hover:bg-[#fff7fb] hover:shadow-[0_14px_30px_rgba(143,53,93,0.12)]"
            >
              <span className="inline-flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Carrinho
              </span>
            </Link>

            <Link
              to="/loja"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#8f355d] px-5 text-[13px] font-medium uppercase tracking-[0.16em] text-white shadow-[0_12px_28px_rgba(143,53,93,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7d2f52] hover:shadow-[0_16px_34px_rgba(143,53,93,0.3)]"
            >
              Explorar
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/carrinho"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#8f355d]/15 bg-white text-[#7a2f4f] shadow-[0_8px_24px_rgba(143,53,93,0.08)] transition duration-300 hover:bg-[#fff7fb]"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#8f355d]/15 bg-white text-[#7a2f4f] shadow-[0_8px_24px_rgba(143,53,93,0.08)] transition duration-300 hover:bg-[#fff7fb]"
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
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-[#8f355d] px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white shadow-[0_12px_26px_rgba(143,53,93,0.22)] transition duration-300 hover:bg-[#7d2f52]"
              >
                Explorar coleção
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
