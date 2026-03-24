import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { SanityLive } from "@/sanity/live";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <html lang="fr" className={inter.variable}>
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
