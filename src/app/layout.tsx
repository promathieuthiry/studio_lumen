import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans, Cardo, Poppins } from "next/font/google";
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

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["600", "700"],
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
    "Studio Lumen, premier studio de production vidéo mobile en France. Vidéo corporate, captation podcast, contenu social media. Contenu livré en 48h.",
  metadataBase: new URL("https://studiolumen.fr"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://studiolumen.fr",
    siteName: "Studio Lumen",
    title: "Studio Lumen — Studio vidéo mobile",
    description:
      "Studio Lumen, premier studio de production vidéo mobile en France. Vidéo corporate, captation podcast, contenu social media. Contenu livré en 48h.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Studio Lumen — Studio de production vidéo mobile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${clashDisplay.variable} ${dmSans.variable} ${poppins.variable} ${cardo.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
      </head>
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
