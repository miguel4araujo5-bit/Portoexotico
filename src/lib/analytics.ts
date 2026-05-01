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

const ensureGtag = () => {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
};

export const updateGoogleConsent = (accepted: boolean) => {
  if (typeof window === 'undefined') {
    return;
  }

  ensureGtag();

  window.gtag?.('consent', 'update', {
    analytics_storage: accepted ? 'granted' : 'denied',
    ad_storage: accepted ? 'granted' : 'denied',
    ad_user_data: accepted ? 'granted' : 'denied',
    ad_personalization: accepted ? 'granted' : 'denied',
  });
};

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
  const paths = Array.from(new Set(['/', window.location.pathname || '/']));

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

  ensureGtag();

  if (!gaInitialized) {
    window.gtag?.('js', new Date());
    window.gtag?.('config', measurementId, {
      send_page_view: false,
    });
    gaInitialized = true;
  }
};

export const enableGA = async (measurementId: string = GA_MEASUREMENT_ID) => {
  if (typeof window === 'undefined') {
    return;
  }

  window[`ga-disable-${measurementId}`] = false;
  updateGoogleConsent(true);
  await initGA(measurementId);
};

export const disableGA = (measurementId: string = GA_MEASUREMENT_ID) => {
  if (typeof window === 'undefined') {
    return;
  }

  window[`ga-disable-${measurementId}`] = true;
  updateGoogleConsent(false);
  clearGACookies();
};

const canTrack = (measurementId: string = GA_MEASUREMENT_ID) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  if (typeof window.gtag !== 'function') {
    return false;
  }

  if (window[`ga-disable-${measurementId}`]) {
    return false;
  }

  return true;
};

export const trackPageView = (
  pagePath?: string,
  pageTitle?: string,
  measurementId: string = GA_MEASUREMENT_ID
) => {
  if (!canTrack(measurementId)) {
    return;
  }

  const resolvedPagePath =
    pagePath || `${window.location.pathname}${window.location.search}${window.location.hash}`;

  const resolvedPageTitle = pageTitle || document.title;

  window.gtag?.('event', 'page_view', {
    page_path: resolvedPagePath,
    page_location: window.location.href,
    page_title: resolvedPageTitle,
  });
};

export type AnalyticsItem = {
  item_id?: string;
  item_name: string;
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_brand?: string;
  item_variant?: string;
  price?: number;
  quantity?: number;
};

export type TrackCartItem = AnalyticsItem;

const normalizeItems = (items: AnalyticsItem[]) => {
  return items.map((item) => ({
    item_id: item.item_id,
    item_name: item.item_name,
    item_category: item.item_category,
    item_category2: item.item_category2,
    item_category3: item.item_category3,
    item_category4: item.item_category4,
    item_category5: item.item_category5,
    item_brand: item.item_brand,
    item_variant: item.item_variant,
    price: item.price,
    quantity: item.quantity ?? 1,
  }));
};

export const trackViewItem = (
  item: AnalyticsItem,
  measurementId: string = GA_MEASUREMENT_ID
) => {
  if (!canTrack(measurementId)) {
    return;
  }

  window.gtag?.('event', 'view_item', {
    currency: 'EUR',
    value: typeof item.price === 'number' ? item.price : undefined,
    items: normalizeItems([{ ...item, quantity: item.quantity ?? 1 }]),
  });
};

export const trackAddToCart = (
  item: AnalyticsItem,
  measurementId: string = GA_MEASUREMENT_ID
) => {
  if (!canTrack(measurementId)) {
    return;
  }

  window.gtag?.('event', 'add_to_cart', {
    currency: 'EUR',
    value: typeof item.price === 'number' ? item.price * (item.quantity ?? 1) : undefined,
    items: normalizeItems([{ ...item, quantity: item.quantity ?? 1 }]),
  });
};

export const trackViewCart = (
  items: AnalyticsItem[],
  value: number,
  measurementId: string = GA_MEASUREMENT_ID
) => {
  if (!canTrack(measurementId)) {
    return;
  }

  window.gtag?.('event', 'view_cart', {
    currency: 'EUR',
    value,
    items: normalizeItems(items),
  });
};

export const trackBeginCheckout = (
  items: AnalyticsItem[],
  value: number,
  measurementId: string = GA_MEASUREMENT_ID
) => {
  if (!canTrack(measurementId)) {
    return;
  }

  window.gtag?.('event', 'begin_checkout', {
    currency: 'EUR',
    value,
    items: normalizeItems(items),
  });
};

export const trackAddPaymentInfo = (
  items: AnalyticsItem[],
  value: number,
  paymentType: string,
  measurementId: string = GA_MEASUREMENT_ID
) => {
  if (!canTrack(measurementId)) {
    return;
  }

  window.gtag?.('event', 'add_payment_info', {
    currency: 'EUR',
    value,
    payment_type: paymentType,
    items: normalizeItems(items),
  });
};

export const trackPurchase = (
  transactionId: string,
  items: AnalyticsItem[],
  value: number,
  paymentType?: string,
  measurementId: string = GA_MEASUREMENT_ID
) => {
  if (!canTrack(measurementId)) {
    return;
  }

  window.gtag?.('event', 'purchase', {
    transaction_id: transactionId,
    currency: 'EUR',
    value,
    payment_type: paymentType,
    items: normalizeItems(items),
  });
};

export const trackContact = (
  contactType: string,
  measurementId: string = GA_MEASUREMENT_ID
) => {
  if (!canTrack(measurementId)) {
    return;
  }

  window.gtag?.('event', 'generate_lead', {
    method: contactType,
  });
};
