"use client";

import { useConsent } from "./ConsentProvider";

export function ConsentBanner() {
  const { showBanner, updateConsent } = useConsent();

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
    >
      <div className="mx-auto max-w-2xl bg-background/95 backdrop-blur-xl border border-border-lighter rounded-lg p-6">
        <p className="text-[14px] text-text-muted mb-5 leading-[22px]">
          Nous utilisons des cookies pour mesurer l&apos;audience de notre site
          (Google Analytics). Vous pouvez accepter ou refuser ces cookies.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => updateConsent("denied")}
            className="flex-1 px-5 py-2.5 rounded-pill border border-white text-[14px] font-medium text-white hover:bg-white hover:text-text-dark transition-colors duration-300"
          >
            Tout refuser
          </button>
          <button
            onClick={() => updateConsent("granted")}
            className="flex-1 px-5 py-2.5 rounded-pill bg-white text-text-dark text-[14px] font-medium hover:bg-background hover:text-white transition-colors duration-300"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
