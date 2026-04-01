import { sanityFetch } from "@/sanity/live";
import {
  SITE_SETTINGS_QUERY,
  SERVICES_QUERY,
  PROJECTS_QUERY,
  TESTIMONIALS_QUERY,
  EQUIPMENT_QUERY,
  CLIENT_LOGOS_QUERY,
} from "@/sanity/queries";
import { urlFor, type SanityImageSource } from "@/sanity/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { Hero } from "@/components/sections/Hero";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Booking } from "@/components/sections/Booking";
import { Portfolio } from "@/components/sections/Portfolio";
import { VideoScrubber } from "@/components/sections/VideoScrubber";
import { ClientLogos } from "@/components/sections/ClientLogos";

type SiteSettingsData = {
  logo?: SanityImageSource | null;
  heroHeadline: string;
  heroSubtitle: string;
  heroBackgroundDark?: SanityImageSource | null;
  heroBackgroundLit?: SanityImageSource | null;
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
  description?: string;
  youtubeVideoId: string;
  thumbnail: SanityImageSource;
};

type EquipmentData = {
  _id: string;
  name: string;
  description: string;
  image?: SanityImageSource | null;
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
    "@type": "ProfessionalService",
    name: "Studio Lumen",
    description:
      "Studio Lumen, premier studio de production vidéo mobile en France. Vidéo corporate, captation podcast, contenu social media. Contenu livré en 48h.",
    url: "https://studiolumen.fr",
    email: settings?.contactEmail || "cyril@studiolumen.fr",
    image: "https://studiolumen.fr/og-image.jpg",
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

function getVideoObjectsJsonLd(projects: ProjectData[]) {
  return projects.map((project) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: project.title,
    description: project.description || project.title,
    thumbnailUrl: `https://img.youtube.com/vi/${project.youtubeVideoId}/maxresdefault.jpg`,
    contentUrl: `https://www.youtube.com/watch?v=${project.youtubeVideoId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${project.youtubeVideoId}`,
  }));
}

export default async function HomePage() {
  const { settings, services, projects, testimonials, equipment, clientLogos } =
    await fetchHomepageData();

  const jsonLd = getLocalBusinessJsonLd(settings);
  const videoJsonLd = getVideoObjectsJsonLd(projects);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {videoJsonLd.map((video, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(video) }}
        />
      ))}
      <Navbar
        logoUrl={
          settings?.logo
            ? urlFor(settings.logo).height(400).quality(100).auto("format").url()
            : undefined
        }
      />
      <main>
        {/* Hero + ValueProposition share a fixed background with scroll-driven lighting */}
        <HeroBackground
          backgroundDarkUrl={
            settings?.heroBackgroundDark
              ? urlFor(settings.heroBackgroundDark).width(1920).quality(80).auto("format").url()
              : null
          }
          backgroundLitUrl={
            settings?.heroBackgroundLit
              ? urlFor(settings.heroBackgroundLit).width(1920).quality(80).auto("format").url()
              : null
          }
        >
          <Hero
            headline={settings?.heroHeadline || "Studio Lumen"}
            subtitle={settings?.heroSubtitle || ""}
            ctaText={settings?.ctaText || "Réserver"}
            ctaUrl={settings?.ctaUrl || "#reserver"}
          />
          <ValueProposition
            valuePropositions={settings?.valuePropositions || []}
          />
        </HeroBackground>

        {/* Remaining sections with opaque background to cover fixed images */}
        <div className="relative z-10 bg-background">
          <ClientLogos clientLogos={clientLogos} />

          <div className="bg-background-elevated">
            <Services services={services} />
          </div>

          <Portfolio projects={projects} />

          <div className="bg-background-elevated">
            <CtaBanner
              ctaText={settings?.ctaText || "Réserver"}
              ctaUrl={settings?.ctaUrl || "#reserver"}
            />
          </div>

          <VideoScrubber equipment={equipment} />

          <div className="bg-background-elevated">
            <Testimonials testimonials={testimonials} />
          </div>

          <Booking />
        </div>
      </main>
      <Footer
        contactEmail={settings?.contactEmail}
        socialLinks={settings?.socialLinks}
        logoUrl={
          settings?.logo
            ? urlFor(settings.logo).height(400).quality(100).auto("format").url()
            : undefined
        }
      />
    </>
  );
}
