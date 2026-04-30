declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const HUBSPOT_PORTAL_ID = "146959797";

export function loadGA4(consent: "granted" | "denied" = "denied") {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    // gtag.js detects the `arguments` object specifically — using rest params
    // pushes a plain Array instead, which gtag.js silently drops.
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  if (document.querySelector(`script[src*="googletagmanager.com"]`)) {
    window.gtag("consent", "update", {
      analytics_storage: consent,
    });
    if (consent === "granted") {
      window.gtag("event", "page_view", {
        page_title: document.title,
        page_location: location.href,
      });
    }
    return;
  }

  window.gtag("consent", "default", {
    analytics_storage: consent,
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
