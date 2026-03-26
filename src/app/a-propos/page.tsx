import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/live";
import { FOUNDER_PROFILE_QUERY } from "@/sanity/queries";
import { urlFor, type SanityImageSource } from "@/sanity/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AboutHero } from "@/components/sections/AboutHero";
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
  motivations?: string;
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
  const photoUrl = urlFor(founder.photo).width(1920).quality(80).auto("format").url();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <AboutHero
          fullName={founder.fullName}
          title={founder.title}
          photoUrl={photoUrl}
        />

        <div className="relative z-10 bg-background">
          {/* Bio — two-column: vision + biography */}
          <section className="section-padding">
            <div className="container-site">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <div>
                  <FadeIn>
                    <SectionLabel className="block mb-6">
                      À propos
                    </SectionLabel>
                  </FadeIn>

                  {founder.vision && (
                    <FadeIn delay={0.1}>
                      <div className="mb-10">
                        <div className="w-12 h-px bg-accent mb-8" />
                        <blockquote className="font-serif italic text-white/80 text-[20px] sm:text-[24px] leading-[34px] sm:leading-[38px]">
                          &ldquo;{founder.vision}&rdquo;
                        </blockquote>
                      </div>
                    </FadeIn>
                  )}

                  {founder.socialLinks && founder.socialLinks.length > 0 && (
                    <FadeIn delay={0.2}>
                      <div className="flex flex-wrap gap-3">
                        {founder.socialLinks.map((link) => (
                          <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${link.platform} (nouvelle fenêtre)`}
                            className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[1px] text-text-muted/70 hover:text-white border border-border-lighter hover:border-white/40 rounded-pill px-4 py-2 transition-all duration-300"
                          >
                            {link.platform}
                          </a>
                        ))}
                      </div>
                    </FadeIn>
                  )}
                </div>

                <FadeIn delay={0.15}>
                  <div className="prose-invert">
                    <PortableTextRenderer value={founder.bio} />
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Motivations — elevated bg */}
          {founder.motivations && (
            <div className="bg-background-elevated">
              <section className="section-padding border-t border-border-lighter">
                <div className="container-site max-w-4xl mx-auto">
                  <FadeIn>
                    <div className="relative p-10 sm:p-14 lg:p-16 rounded-[25px] bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden">
                      <div
                        className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-accent/5 pointer-events-none"
                        style={{ filter: "blur(100px)" }}
                      />

                      <div className="relative z-10">
                        <SectionLabel className="block mb-4">
                          Ce qui me drive
                        </SectionLabel>
                        <h2 className="font-sans text-[28px] sm:text-[35px] font-semibold text-white leading-[1.18] mb-6">
                          Mes motivations
                        </h2>
                        <p className="text-white/70 text-[16px] sm:text-[17px] leading-[28px] sm:leading-[30px] whitespace-pre-line">
                          {founder.motivations}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </section>
            </div>
          )}

          {/* Journey timeline */}
          {founder.journey && founder.journey.length > 0 && (
            <section className="section-padding border-t border-border-lighter">
              <div className="container-site">
                <FadeIn>
                  <SectionLabel className="block mb-4">
                    Parcours
                  </SectionLabel>
                  <h2 className="font-sans text-[28px] sm:text-[35px] font-semibold text-white leading-[1.18] mb-14">
                    Mon parcours
                  </h2>
                </FadeIn>

                <div className="relative">
                  <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-border-lighter" />

                  <ol className="space-y-12 sm:space-y-16 list-none">
                    {founder.journey.map((step, i) => (
                      <FadeIn key={step.year} delay={i * 0.1}>
                        <li className="relative pl-12 sm:pl-16">
                          <div className="absolute left-[13px] sm:left-[21px] top-1 w-[7px] h-[7px] rounded-full bg-accent ring-4 ring-background" />

                          <span className="label-caps text-accent">
                            {step.year}
                          </span>
                          <h3 className="font-sans text-[18px] sm:text-[20px] font-medium text-white mt-2 leading-[1.3]">
                            {step.title}
                          </h3>
                          {step.description && (
                            <p className="text-text-body text-[15px] sm:text-[16px] leading-[26px] mt-2 max-w-xl">
                              {step.description}
                            </p>
                          )}
                        </li>
                      </FadeIn>
                    ))}
                  </ol>
                </div>
              </div>
            </section>
          )}

          {/* Skills — elevated bg */}
          {founder.skills && founder.skills.length > 0 && (
            <div className="bg-background-elevated">
              <section className="section-padding border-t border-border-lighter">
                <div className="container-site">
                  <FadeIn>
                    <SectionLabel className="block mb-4">
                      Expertise
                    </SectionLabel>
                    <h2 className="font-sans text-[28px] sm:text-[35px] font-semibold text-white leading-[1.18] mb-10">
                      Compétences
                    </h2>
                  </FadeIn>

                  <FadeIn delay={0.1}>
                    <div className="flex flex-wrap gap-3">
                      {founder.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-5 py-2.5 rounded-pill border border-border-lighter text-[14px] text-text-muted hover:text-white hover:border-white/30 transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </FadeIn>
                </div>
              </section>
            </div>
          )}

          {/* CTA */}
          <section className="section-padding border-t border-border-lighter">
            <div className="container-site">
              <FadeIn>
                <div className="relative overflow-hidden rounded-[25px] border border-border-lighter p-10 sm:p-16 lg:p-20 text-center">
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/6 pointer-events-none"
                    style={{ filter: "blur(140px)" }}
                  />

                  <div className="relative z-10">
                    <SectionLabel className="block mb-4">
                      Collaborer
                    </SectionLabel>
                    <h2 className="font-display text-[30px] sm:text-[40px] lg:text-[48px] font-semibold text-white leading-[1.05] mb-4">
                      Envie de collaborer ?
                    </h2>
                    <p className="font-serif italic text-text-muted text-[17px] sm:text-[19px] leading-[30px] max-w-md mx-auto mb-8">
                      Discutons de votre projet et créons ensemble du contenu
                      qui marque les esprits.
                    </p>
                    <Button href="/#reserver" variant="primary">
                      Réserver un appel découverte
                    </Button>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        </div>
      </main>
      <Footer socialLinks={founder.socialLinks} />
    </>
  );
}
