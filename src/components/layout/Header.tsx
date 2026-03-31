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
      'transition-colors duration-200',
      isActive ? 'text-white' : 'text-white/65 hover:text-white',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold tracking-[0.22em] text-white">
              PE
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-[0.26em] text-white">
                Porto Exótico
              </span>
              <span className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                Boutique íntima online
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClassName}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/carrinho"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <span className="inline-flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Carrinho
              </span>
            </Link>

            <Link
              to="/loja"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-neutral-950 transition hover:bg-white/90"
            >
              Explorar
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/carrinho"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isOpen ? (
          <div className="border-t border-white/10 py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    [
                      'rounded-2xl px-4 py-3 text-sm font-medium transition',
                      isActive
                        ? 'bg-white text-neutral-950'
                        : 'bg-white/5 text-white/75 hover:bg-white/10 hover:text-white',
                    ].join(' ')
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <Link
                to="/loja"
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-medium text-neutral-950 transition hover:bg-white/90"
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
