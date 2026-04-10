import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const logoSvgSrc = '/logo.png';
const logoFallbackSrc = '/favicon.ico';

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
        await response.text();

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
            <div className="flex flex-wrap items-center gap-3">
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

              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
                Admin
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
              Painel privado de gestão
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/60 md:text-lg">
              Acesso reservado para gestão de encomendas, clientes e operação da loja.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                <p className="text-sm font-medium text-white">Encomendas</p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Consulta, detalhe e atualização de estados.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                <p className="text-sm font-medium text-white">Pagamentos</p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Controlo do estado e referência de pagamento.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                <p className="text-sm font-medium text-white">Privacidade</p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Acesso restrito para gestão interna da loja.
                </p>
              </div>
            </div>
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

              {error ? (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'A entrar...' : 'Entrar'}
              </button>

              <p className="text-center text-xs leading-6 text-white/45">
                Acesso restrito à administração da loja.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminLogin;
