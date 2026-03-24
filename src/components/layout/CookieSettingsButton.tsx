"use client";

import { useConsent } from "@/components/consent/ConsentProvider";

export function CookieSettingsButton() {
  const { setShowBanner } = useConsent();

  return (
    <button
      onClick={() => setShowBanner(true)}
      className="text-sm text-white/60 hover:text-accent transition-colors"
    >
      Gérer les cookies
    </button>
  );
}
