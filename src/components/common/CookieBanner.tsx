import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cookie, ShieldCheck } from 'lucide-react';
import { initGA } from '../../lib/analytics';

type CookieConsentRecord = {
  cookiesAccepted: boolean;
  acceptedAt: string;
};

const STORAGE_KEY = 'portoexotico-cookie-consent-v1';
const GA_MEASUREMENT_ID = 'G-6QB707Y0JZ';

const CookieBanner: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) {
      setIsVisible(false);
      return;
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        setIsVisible(true);
        return;
      }

      const parsed = JSON.parse(raw) as Partial<CookieConsentRecord>;

      if (typeof parsed.cookiesAccepted === 'boolean') {
        if (parsed.cookiesAccepted === true) {
          initGA(GA_MEASUREMENT_ID);
        }

        setIsVisible(false);
        return;
      }

      setIsVisible(true);
    } catch {
      setIsVisible(true);
    }
  }, [isAdminRoute]);

  const handleAccept = () => {
    const payload: CookieConsentRecord = {
      cookiesAccepted: true,
      acceptedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    initGA(GA_MEASUREMENT_ID);
    setIsVisible(false);
  };

  const handleReject = () => {
    const payload: CookieConsentRecord = {
      cookiesAccepted: false,
      acceptedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-[110] px-4">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[1.8rem] border border-[#8f355d]/15 bg-[linear-gradient(180deg,rgba(255,250,251,0.98)_0%,rgba(252,243,247,0.98)_100%)] shadow-[0_24px_80px_rgba(31,10,20,0.22)] backdrop-blur-md">
        <div className="p-5 md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8f355d]/10 bg-white/90 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[#9b5a79]">
                <Cookie className="h-4 w-4" />
                Cookies
              </div>

              <h2 className="mt-4 text-lg font-semibold text-[#6f2947] md:text-xl">
                Privacidade e experiência de navegação
              </h2>

              <p className="mt-3 text-sm leading-7 text-neutral-700">
                Utilizamos cookies estritamente necessários para o funcionamento do website. Com o
                seu consentimento, poderemos também utilizar cookies para medição de desempenho e
                melhoria da experiência. Pode consultar mais detalhes na nossa{' '}
                <Link
                  to="/politica-cookies"
                  className="font-medium text-[#7a2f4f] transition hover:text-[#8f355d]"
                >
                  Política de Cookies
                </Link>
                .
              </p>

              <div className="mt-4 inline-flex items-center gap-2 text-xs text-neutral-500">
                <ShieldCheck className="h-4 w-4 text-[#8f355d]" />
                Pode atualizar a sua escolha a qualquer momento nas definições futuras do website.
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
              <button
                type="button"
                onClick={handleAccept}
                className="inline-flex items-center justify-center rounded-full bg-[#8f355d] px-5 py-3 text-sm font-medium uppercase tracking-[0.14em] text-white shadow-[0_14px_34px_rgba(143,53,93,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7d2f52]"
              >
                Aceitar
              </button>

              <button
                type="button"
                onClick={handleReject}
                className="inline-flex items-center justify-center rounded-full border border-[#8f355d]/15 bg-white px-5 py-3 text-sm font-medium uppercase tracking-[0.14em] text-[#7a2f4f] transition duration-300 hover:border-[#8f355d]/30 hover:bg-[#fffafb]"
              >
                Recusar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
