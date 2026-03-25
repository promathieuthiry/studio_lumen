import { sanityFetch } from "@/sanity/live";
import {
  SITE_SETTINGS_QUERY,
  SERVICES_QUERY,
  PROJECTS_QUERY,
  TESTIMONIALS_QUERY,
  EQUIPMENT_QUERY,
  CLIENT_LOGOS_QUERY,
} from "@/sanity/queries";
import type { SanityImageSource } from "@/sanity/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Booking } from "@/components/sections/Booking";
import { Portfolio } from "@/components/sections/Portfolio";
import { Technology } from "@/components/sections/Technology";

type SiteSettingsData = {
  heroHeadline: string;
  heroSubtitle: string;
  heroBackground?: SanityImageSource | null;
  ctaText: string;
  ctaUrl: string;
  founderPhoto?: SanityImageSource | null;
  valuePropositions: Array<{ title: string; description: string; icon: string }>;
  socialLinks?: Array<{ platform: string; url: string }>;
  contactEmail?: string;
} | null;

type ServiceData = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  deliverables?: string[];
  turnaround?: string;
};

type TestimonialData = {
  _id: string;
  clientName: string;
  company: string;
  role?: string;
  quote: string;
  avatar?: SanityImageSource | null;
};

type ProjectData = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  cloudflareVideoId: string;
  thumbnail: SanityImageSource;
};

type EquipmentData = {
  _id: string;
  name: string;
  description: string;
  specs?: string;
  hotspotX: number;
  hotspotY: number;
};

type ClientLogoData = {
  _id: string;
  name: string;
  logo: SanityImageSource;
  url?: string;
};

async function fetchHomepageData() {
  try {
    const [settingsRes, servicesRes, projectsRes, testimonialsRes, equipmentRes, clientLogosRes] =
      await Promise.all([
        sanityFetch({ query: SITE_SETTINGS_QUERY }),
        sanityFetch({ query: SERVICES_QUERY }),
        sanityFetch({ query: PROJECTS_QUERY }),
        sanityFetch({ query: TESTIMONIALS_QUERY }),
        sanityFetch({ query: EQUIPMENT_QUERY }),
        sanityFetch({ query: CLIENT_LOGOS_QUERY }),
      ]);
    return {
      settings: settingsRes.data as SiteSettingsData,
      services: (servicesRes.data || []) as ServiceData[],
      projects: (projectsRes.data || []) as ProjectData[],
      testimonials: (testimonialsRes.data || []) as TestimonialData[],
      equipment: (equipmentRes.data || []) as EquipmentData[],
      clientLogos: (clientLogosRes.data || []) as ClientLogoData[],
    };
  } catch {
    return {
      settings: null as SiteSettingsData,
      services: [] as ServiceData[],
      projects: [] as ProjectData[],
      testimonials: [] as TestimonialData[],
      equipment: [] as EquipmentData[],
      clientLogos: [] as ClientLogoData[],
    };
  }
}

function getLocalBusinessJsonLd(settings: SiteSettingsData) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Studio Lumen",
    description:
      "Premier studio de production vidéo mobile en France. Contenu livré en 48h.",
    url: "https://studiolumen.fr",
    email: settings?.contactEmail || "cyril@studiolumen.fr",
    founder: {
      "@type": "Person",
      name: "Cyril Ben Said",
    },
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    serviceType: [
      "Production vidéo mobile",
      "Vidéo corporate",
      "Captation podcast",
      "Social media content",
    ],
    sameAs: settings?.socialLinks?.map((link) => link.url).filter(Boolean) || [],
  };
}

export default async function HomePage() {
  const { settings, services, projects, testimonials, equipment, clientLogos } =
    await fetchHomepageData();

  const jsonLd = getLocalBusinessJsonLd(settings);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero
          headline={settings?.heroHeadline || "Studio Lumen"}
          subtitle={settings?.heroSubtitle || ""}
          ctaText={settings?.ctaText || "Réserver"}
          ctaUrl={settings?.ctaUrl || "#reserver"}
          founderPhoto={settings?.founderPhoto}
          backgroundImage={settings?.heroBackground}
        />
        <ValueProposition
          valuePropositions={settings?.valuePropositions || []}
          clientLogos={clientLogos}
        />
        <Services services={services} />
        <Portfolio projects={projects} />
        <CtaBanner
          ctaText={settings?.ctaText || "Réserver"}
          ctaUrl={settings?.ctaUrl || "#reserver"}
        />
        <Technology equipment={equipment} />
        <Testimonials testimonials={testimonials} />
        <Booking />
      </main>
      <Footer
        contactEmail={settings?.contactEmail}
        socialLinks={settings?.socialLinks}
      />
    </>
  );
}
