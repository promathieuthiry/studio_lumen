"use client";

import { useConsent } from "./ConsentProvider";
import type { ReactNode } from "react";

export function ConsentGate({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const { consent } = useConsent();

  if (consent !== "granted") return fallback ?? null;
  return <>{children}</>;
}
