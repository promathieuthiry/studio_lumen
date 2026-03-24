import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/live";
import { FOUNDER_PROFILE_QUERY } from "@/sanity/queries";
import { urlFor, type SanityImageSource } from "@/sanity/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassCard } from "@/components/ui/GlassCard";
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
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">À propos</h1>
            <p className="text-white/60">Contenu bientôt disponible.</p>
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
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(founder.photo).width(320).height(320).url()}
                alt={founder.fullName}
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl object-cover flex-shrink-0"
              />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {founder.fullName}
                </h1>
                <p className="text-accent text-lg mb-4">{founder.title}</p>
                {founder.socialLinks?.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex mr-3 text-sm text-white/50 hover:text-accent transition-colors"
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
              <GlassCard className="p-8 mb-16">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Ma vision
                </h2>
                <p className="text-white/70 leading-relaxed">
                  {founder.vision}
                </p>
              </GlassCard>
            </FadeIn>
          )}

          {founder.journey && founder.journey.length > 0 && (
            <div className="mb-16">
              <FadeIn>
                <h2 className="text-2xl font-bold text-white mb-8">
                  Mon parcours
                </h2>
              </FadeIn>
              <div className="space-y-6 border-l-2 border-white/10 pl-6">
                {founder.journey.map((step, i) => (
                  <FadeIn key={step.year} delay={i * 0.1}>
                    <div>
                      <span className="text-accent text-sm font-semibold">
                        {step.year}
                      </span>
                      <h3 className="text-lg font-medium text-white mt-1">
                        {step.title}
                      </h3>
                      {step.description && (
                        <p className="text-sm text-white/50 mt-1">
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
                <h2 className="text-2xl font-bold text-white mb-6">
                  Compétences
                </h2>
                <div className="flex flex-wrap gap-2">
                  {founder.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          <FadeIn>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                Envie de collaborer ?
              </h2>
              <a
                href="/#reserver"
                className="inline-flex px-8 py-3.5 rounded-full bg-accent text-background font-semibold text-lg hover:bg-accent-hover transition-colors"
              >
                Réserver un appel découverte
              </a>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer
        socialLinks={founder.socialLinks}
      />
    </>
  );
}
