import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans, Cardo } from "next/font/google";
import "@/styles/globals.css";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { SanityLive } from "@/sanity/live";

const clashDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const cardo = Cardo({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Studio Lumen — Studio vidéo mobile",
    template: "%s | Studio Lumen",
  },
  description:
    "Premier studio de production vidéo mobile en France. Contenu livré en 48h.",
  metadataBase: new URL("https://studiolumen.fr"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${clashDisplay.variable} ${dmSans.variable} ${cardo.variable}`}
    >
      <body>
        <ConsentProvider>
          {children}
          <ConsentBanner />
          <SanityLive />
        </ConsentProvider>
      </body>
    </html>
  );
}
