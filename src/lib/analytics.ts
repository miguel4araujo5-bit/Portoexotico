declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const GA_MEASUREMENT_ID = 'G-6QB707Y0JZ';

let gaInitialized = false;
let scriptLoadingPromise: Promise<void> | null = null;

const clearGACookies = () => {
  const hostnameParts = window.location.hostname.split('.').filter(Boolean);
  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));

  const domainCandidates = hostnameParts
    .map((_, index) => {
      const domain = hostnameParts.slice(index).join('.');
      return [domain, `.${domain}`];
    })
    .flat();

  const uniqueDomains = Array.from(new Set(['', ...domainCandidates]));
  const paths = ['/', window.location.pathname || '/'];

  for (const name of cookieNames) {
    for (const domain of uniqueDomains) {
      for (const path of paths) {
        const domainPart = domain ? ` domain=${domain};` : '';
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path};${domainPart}`;
      }
    }
  }
};

const loadGAScript = (measurementId: string) => {
  if (scriptLoadingPromise) {
    return scriptLoadingPromise;
  }

  scriptLoadingPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector(
      `script[src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"]`
    ) as HTMLScriptElement | null;

    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Falha ao carregar Google Analytics.'));
    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
};

export const initGA = async (measurementId: string = GA_MEASUREMENT_ID) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  if (window[`ga-disable-${measurementId}`]) {
    return;
  }

  await loadGAScript(measurementId);

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer.push(args);
    };

  if (!gaInitialized) {
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_path: window.location.pathname + window.location.search + window.location.hash,
    });
    gaInitialized = true;
    return;
  }

  window.gtag('config', measurementId, {
    page_path: window.location.pathname + window.location.search + window.location.hash,
  });
};

export const enableGA = async (measurementId: string = GA_MEASUREMENT_ID) => {
  if (typeof window === 'undefined') {
    return;
  }

  window[`ga-disable-${measurementId}`] = false;
  await initGA(measurementId);
};

export const disableGA = (measurementId: string = GA_MEASUREMENT_ID) => {
  if (typeof window === 'undefined') {
    return;
  }

  window[`ga-disable-${measurementId}`] = true;
  clearGACookies();
};

export const trackPageView = (measurementId: string = GA_MEASUREMENT_ID) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  if (window[`ga-disable-${measurementId}`]) {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: window.location.pathname + window.location.search + window.location.hash,
    page_location: window.location.href,
    page_title: document.title,
  });
};
