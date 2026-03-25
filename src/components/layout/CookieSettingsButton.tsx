"use client";

import { useConsent } from "@/components/consent/ConsentProvider";

export function CookieSettingsButton() {
  const { setShowBanner } = useConsent();

  return (
    <button
      onClick={() => setShowBanner(true)}
      className="text-[15px] text-text-muted hover:text-white transition-colors duration-300"
    >
      Gérer les cookies
    </button>
  );
}
