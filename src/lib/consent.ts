const COOKIE_NAME = "cookie_consent";
const EXPIRY_DAYS = 180; // 6 months per CNIL best practice

export type ConsentState = "granted" | "denied" | null;

export function getConsent(): ConsentState {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!cookie) return null;
  const value = cookie.split("=")[1];
  if (value === "granted" || value === "denied") return value;
  return null;
}

export function setConsent(state: "granted" | "denied") {
  const expires = new Date();
  expires.setDate(expires.getDate() + EXPIRY_DAYS);
  document.cookie = `${COOKIE_NAME}=${state}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}
