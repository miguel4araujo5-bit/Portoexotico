import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Cookie, Lock } from 'lucide-react';

type ConsentRecord = {
  ageVerified: boolean;
  cookiesAccepted: boolean;
  acceptedAt: string;
};

const STORAGE_KEY = 'portoexotico-consent-v1';

const AgeGate: React.FC = () => {
  const location = useLocation();
  const [status, setStatus] = useState<'loading' | 'open' | 'accepted'>('loading');
  const [isAdult, setIsAdult] = useState(false);
  const [acceptsCookies, setAcceptsCookies] = useState(false);
  const [error, setError] = useState('');

  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) {
      setStatus('accepted');
      return;
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        setStatus('open');
        return;
      }

      const parsed = JSON.parse(raw) as Partial<ConsentRecord>;

      if (parsed.ageVerified && parsed.cookiesAccepted) {
        setStatus('accepted');
        return;
      }

      setStatus('open');
    } catch {
      setStatus('open');
    }
  }, [isAdminRoute]);

  useEffect(() => {
    if (status !== 'open') {
      return;
    }

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [status]);

  const handleAccept = () => {
    if (!isAdult || !acceptsCookies) {
      setError('Para continuar, confirme que tem mais de 18 anos e aceite os cookies.');
      return;
    }

    const payload: ConsentRecord = {
      ageVerified: true,
      cookiesAccepted: true,
      acceptedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setError('');
    setStatus('accepted');
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  if (status !== 'open') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex min-h-screen items-center justify-center bg-[#1a0d14]/80 px-4 py-6 backdrop-blur-md">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
        aria-describedby="age-gate-description"
        className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-[#8f355d]/15 bg-[linear-gradient(180deg,#fffafb_0%,#fcf3f7_100%)] shadow-[0_30px_120px_rgba(31,10,20,0.38)]"
      >
        <div className="absolute inset-0">
          <div className="absolute left-[-12%] top-[-10%] h-52 w-52 rounded-full bg-[#b24d79]/10 blur-3xl" />
          <div className="absolute bottom-[-12%] right-[-8%] h-52 w-52 rounded-full bg-[#e7c9a5]/20 blur-3xl" />
        </div>

        <div className="relative p-6 md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-white/90 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[#9b5a79]">
            <ShieldCheck className="h-4 w-4" />
            Acesso reservado
          </div>

          <h1
            id="age-gate-title"
            className="mt-6 font-serif text-3xl font-semibold leading-tight text-[#6f2947] md:text-5xl"
          >
            Confirmação de idade e cookies
          </h1>

          <p
            id="age-gate-description"
            className="mt-5 max-w-2xl text-sm leading-7 text-neutral-700 md:text-base"
          >
            Este website destina-se exclusivamente a maiores de 18 anos. Para continuar, confirme
            a sua maioridade e aceite a utilização de cookies necessários para funcionamento,
            segurança e melhoria da experiência.
          </p>

          <div className="mt-8 grid gap-4">
            <label className="flex items-start gap-4 rounded-[1.4rem] border border-[#8f355d]/10 bg-white/90 p-4">
              <input
                type="checkbox"
                checked={isAdult}
                onChange={(event) => setIsAdult(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[#8f355d]/30 text-[#8f355d] focus:ring-[#8f355d]"
              />
              <span className="block">
                <span className="block text-sm font-semibold text-[#6f2947]">
                  Confirmo que tenho 18 anos ou mais
                </span>
                <span className="mt-1 block text-sm leading-6 text-neutral-600">
                  O acesso à loja e aos seus conteúdos é reservado a utilizadores maiores de idade.
                </span>
              </span>
            </label>

            <label className="flex items-start gap-4 rounded-[1.4rem] border border-[#8f355d]/10 bg-white/90 p-4">
              <input
                type="checkbox"
                checked={acceptsCookies}
                onChange={(event) => setAcceptsCookies(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[#8f355d]/30 text-[#8f355d] focus:ring-[#8f355d]"
              />
              <span className="block">
                <span className="flex items-center gap-2 text-sm font-semibold text-[#6f2947]">
                  <Cookie className="h-4 w-4" />
                  Aceito a utilização de cookies
                </span>
                <span className="mt-1 block text-sm leading-6 text-neutral-600">
                  Utilizamos cookies para navegação, segurança, desempenho e funcionamento da
                  experiência de compra.
                </span>
              </span>
            </label>
          </div>

          <div className="mt-6 rounded-[1.4rem] border border-[#8f355d]/10 bg-white/80 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[#6f2947]">
              <Lock className="h-4 w-4" />
              Discrição e privacidade
            </div>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              A Porto Exótico privilegia uma experiência reservada, segura e orientada para a
              confiança do utilizador.
            </p>
          </div>

          {error ? <p className="mt-5 text-sm font-medium text-[#8f355d]">{error}</p> : null}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={handleAccept}
              className="inline-flex items-center justify-center rounded-full bg-[#8f355d] px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-[0_14px_34px_rgba(143,53,93,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7d2f52]"
            >
              Entrar no site
            </button>

            <button
              type="button"
              onClick={handleExit}
              className="inline-flex items-center justify-center rounded-full border border-[#8f355d]/15 bg-white px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-[#7a2f4f] transition duration-300 hover:border-[#8f355d]/30 hover:bg-[#fffafb]"
            >
              Sair
            </button>
          </div>

          <div className="mt-5 text-xs leading-6 text-neutral-500">
            Ao continuar, confirma a sua maioridade e a aceitação dos cookies aplicáveis.
          </div>

          <div className="mt-2 text-xs leading-6 text-neutral-500">
            <Link to="/contactos" className="text-[#8f355d] transition hover:text-[#6f2947]">
              Contactos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeGate;
