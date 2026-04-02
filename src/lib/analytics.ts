declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

export const GA_STORAGE_KEY = 'portoexotico-cookie-consent-v1';

type AddToCartPayload = {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_category2?: string;
  price: number;
  quantity: number;
};

export const getCookieConsent = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const raw = window.localStorage.getItem(GA_STORAGE_KEY);

    if (!raw) {
      return false;
    }

    const parsed = JSON.parse(raw) as { cookiesAccepted?: boolean };
    return parsed.cookiesAccepted === true;
  } catch {
    return false;
  }
};

export const initGA = (measurementId: string) => {
  if (initialized || typeof window === 'undefined' || !measurementId) {
    return;
  }

  initialized = true;

  const existingScript = document.querySelector(
    `script[src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"]`
  );

  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];

  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }

  window.gtag = gtag;
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    anonymize_ip: true,
  });
};

export const trackPageView = (path: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag || !getCookieConsent()) {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
  });
};

export const trackAddToCart = ({
  item_id,
  item_name,
  item_category,
  item_category2,
  price,
  quantity,
}: AddToCartPayload) => {
  if (typeof window === 'undefined' || !window.gtag || !getCookieConsent()) {
    return;
  }

  window.gtag('event', 'add_to_cart', {
    currency: 'EUR',
    value: price * quantity,
    items: [
      {
        item_id,
        item_name,
        item_category,
        item_category2,
        price,
        quantity,
      },
    ],
  });
};
