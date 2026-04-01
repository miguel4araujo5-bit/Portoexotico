import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

type AdminRouteProps = {
  children: React.ReactNode;
};

const logoSvgSrc = '/favicon.svg';
const logoFallbackSrc = '/favicon-96x96.png';

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const response = await fetch('/api/admin/session', {
          credentials: 'include'
        });

        if (!isMounted) return;

        setIsAuthenticated(response.ok);
      } catch {
        if (!isMounted) return;
        setIsAuthenticated(false);
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    void checkSession();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white">
        <section className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-16 md:px-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#8f355d]/15 bg-white px-4 py-3 shadow-[0_10px_30px_rgba(143,53,93,0.08)]">
              <picture>
                <source srcSet={logoSvgSrc} type="image/svg+xml" />
                <img
                  src={logoFallbackSrc}
                  alt="Porto Exótico"
                  className="h-8 w-8 object-contain"
                />
              </picture>

              <div className="min-w-0">
                <span className="block font-serif text-lg font-semibold leading-none tracking-[0.02em] text-[#7a2f4f]">
                  Porto Exótico
                </span>
                <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.28em] text-[#a55b7d]">
                  Área reservada
                </span>
              </div>
            </div>

            <div className="mt-8 h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-white" />

            <p className="mt-5 text-sm uppercase tracking-[0.24em] text-white/45">
              A verificar sessão
            </p>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">
              A validar o acesso à área privada de administração.
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
