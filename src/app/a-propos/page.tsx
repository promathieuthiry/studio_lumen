import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/live";
import { FOUNDER_PROFILE_QUERY } from "@/sanity/queries";
import { urlFor, type SanityImageSource } from "@/sanity/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";
import { FadeIn } from "@/components/ui/FadeIn";
import { Card } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { PortableTextBlock } from "@portabletext/types";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez le parcours de Cyril Ben Said, fondateur de Studio Lumen, premier studio de production vidéo mobile en France.",
};

type FounderData = {
  fullName: string;
  title: string;
  bio: PortableTextBlock[];
  photo: SanityImageSource;
  journey?: Array<{ year: string; title: string; description?: string }>;
  vision?: string;
  skills?: string[];
  socialLinks?: Array<{ platform: string; url: string }>;
} | null;

async function fetchFounderData(): Promise<FounderData> {
  try {
    const { data } = await sanityFetch({ query: FOUNDER_PROFILE_QUERY });
    return data as FounderData;
  } catch {
    return null;
  }
}

function getPersonJsonLd(founder: NonNullable<FounderData>) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.fullName,
    jobTitle: founder.title,
    url: "https://studiolumen.fr/a-propos",
    worksFor: {
      "@type": "Organization",
      name: "Studio Lumen",
      url: "https://studiolumen.fr",
    },
    knowsAbout: founder.skills || [],
    sameAs:
      founder.socialLinks?.map((link) => link.url).filter(Boolean) || [],
  };
}

export default async function AboutPage() {
  const founder = await fetchFounderData();

  if (!founder) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container-site text-center">
            <h1 className="font-display text-[35px] font-semibold text-white mb-4">
              À propos
            </h1>
            <p className="text-text-muted">Contenu bientôt disponible.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const jsonLd = getPersonJsonLd(founder);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-28 section-padding">
        <div className="container-site max-w-4xl">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-14">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(founder.photo).width(320).height(320).url()}
                alt={founder.fullName}
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-lg object-cover flex-shrink-0"
              />
              <div>
                <h1 className="font-display text-[35px] sm:text-[48px] font-semibold text-white mb-2 leading-[1]">
                  {founder.fullName}
                </h1>
                <p className="text-accent text-[18px] mb-4">{founder.title}</p>
                {founder.socialLinks?.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex mr-4 text-[14px] text-text-muted hover:text-white transition-colors duration-300"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="prose-invert mb-16">
              <PortableTextRenderer value={founder.bio} />
            </div>
          </FadeIn>

          {founder.vision && (
            <FadeIn delay={0.15}>
              <Card className="p-8 sm:p-10 mb-16">
                <SectionLabel className="block mb-3">Vision</SectionLabel>
                <h2 className="font-sans text-[24px] font-medium text-white mb-4 leading-[1.18]">
                  Ma vision
                </h2>
                <p className="font-serif italic text-text-muted text-[18px] leading-[30px]">
                  {founder.vision}
                </p>
              </Card>
            </FadeIn>
          )}

          {founder.journey && founder.journey.length > 0 && (
            <div className="mb-16">
              <FadeIn>
                <SectionLabel className="block mb-3">Parcours</SectionLabel>
                <h2 className="font-sans text-[24px] font-medium text-white mb-10 leading-[1.18]">
                  Mon parcours
                </h2>
              </FadeIn>
              <div className="space-y-8 border-l-2 border-border-lighter pl-8">
                {founder.journey.map((step, i) => (
                  <FadeIn key={step.year} delay={i * 0.1}>
                    <div>
                      <span className="label-caps text-accent">
                        {step.year}
                      </span>
                      <h3 className="font-sans text-[18px] font-medium text-white mt-2">
                        {step.title}
                      </h3>
                      {step.description && (
                        <p className="text-text-body text-[15px] leading-[24px] mt-1">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}

          {founder.skills && founder.skills.length > 0 && (
            <FadeIn>
              <div className="mb-16">
                <SectionLabel className="block mb-3">Compétences</SectionLabel>
                <h2 className="font-sans text-[24px] font-medium text-white mb-6 leading-[1.18]">
                  Compétences
                </h2>
                <div className="flex flex-wrap gap-3">
                  {founder.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-pill border border-border-lighter text-[14px] text-text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          <FadeIn>
            <div className="text-center py-14">
              <h2 className="font-sans text-[30px] font-semibold text-white mb-5 leading-[1.18]">
                Envie de collaborer ?
              </h2>
              <Button href="/#reserver" variant="primary">
                Réserver un appel découverte
              </Button>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer socialLinks={founder.socialLinks} />
    </>
  );
}
