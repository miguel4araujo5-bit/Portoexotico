import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          password
        })
      });

      const contentType = response.headers.get('content-type') || '';
      let data: any = null;

      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();

        if (!response.ok) {
          setError(`Servidor respondeu com erro ${response.status}`);
          return;
        }

        setError('Resposta inválida do servidor');
        return;
      }

      if (!response.ok || !data?.ok) {
        setError(data?.error || `Falha no login (${response.status})`);
        return;
      }

      navigate('/admin/orders');
    } catch {
      setError('Não foi possível contactar a API de administração');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-16 md:px-10">
        <div className="grid w-full gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
              Porto Exótico Admin
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
              Painel privado de gestão
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/60 md:text-lg">
              Acesso reservado para gestão de encomendas, clientes e operação da loja.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur md:p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="mb-2 block text-sm text-white/70">
                  Utilizador
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-white/30"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm text-white/70">
                  Palavra-passe
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-white/30"
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'A entrar...' : 'Entrar'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminLogin;
