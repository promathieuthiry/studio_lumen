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
      <div className="mx-auto max-w-2xl bg-background-light/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
        <p className="text-sm text-white/80 mb-4">
          Nous utilisons des cookies pour mesurer l&apos;audience de notre site
          (Google Analytics). Vous pouvez accepter ou refuser ces cookies.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => updateConsent("denied")}
            className="flex-1 px-4 py-2.5 rounded-lg border border-white/20 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
          >
            Tout refuser
          </button>
          <button
            onClick={() => updateConsent("granted")}
            className="flex-1 px-4 py-2.5 rounded-lg bg-accent text-background text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
