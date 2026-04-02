let initialized = false;

export function initGA(measurementId: string) {
  if (initialized || typeof window === 'undefined') return;

  initialized = true;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  // @ts-ignore
  window.gtag = gtag;

  // @ts-ignore
  window.gtag('js', new Date());
  // @ts-ignore
  window.gtag('config', measurementId, {
    anonymize_ip: true,
  });
}
