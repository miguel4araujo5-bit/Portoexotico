import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

type AdminRouteProps = {
  children: React.ReactNode;
};

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
          <div className="text-white/55">A verificar sessão...</div>
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
