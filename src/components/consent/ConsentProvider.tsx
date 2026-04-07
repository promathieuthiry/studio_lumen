"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { getConsent, setConsent, type ConsentState } from "@/lib/consent";
import { loadGA4, loadHubSpot } from "@/lib/analytics";

type ConsentContextType = {
  consent: ConsentState;
  updateConsent: (state: "granted" | "denied") => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
};

const ConsentContext = createContext<ConsentContextType | null>(null);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentState>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const current = getConsent();
    setConsentState(current);
    if (current === null) {
      setShowBanner(true);
    } else if (current === "granted") {
      loadGA4();
      loadHubSpot();
    }
  }, []);

  const updateConsent = useCallback((state: "granted" | "denied") => {
    setConsent(state);
    setConsentState(state);
    setShowBanner(false);
    if (state === "granted") {
      loadGA4();
      loadHubSpot();
    }
  }, []);

  return (
    <ConsentContext.Provider
      value={{ consent, updateConsent, showBanner, setShowBanner }}
    >
      {children}
    </ConsentContext.Provider>
  );
}
