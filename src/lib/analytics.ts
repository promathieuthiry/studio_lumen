declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const HUBSPOT_PORTAL_ID = "146959797";

export function loadGA4() {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  if (document.querySelector(`script[src*="googletagmanager.com"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
}

export function loadHubSpot() {
  if (typeof window === "undefined") return;
  if (document.querySelector(`script[src*="js.hs-scripts.com"]`)) return;

  const script = document.createElement("script");
  script.src = `https://js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`;
  script.async = true;
  script.defer = true;
  script.id = "hs-script-loader";
  document.head.appendChild(script);
}
