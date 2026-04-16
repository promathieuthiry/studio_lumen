"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";

type CtaBannerProps = {
  ctaText: string;
  ctaUrl: string;
  founderPhotoUrl?: string | null;
};

const trustMetrics = [
  { value: "20+", label: "projets livrés" },
  { value: "100%", label: "satisfaction" },
];

export function CtaBanner({ ctaText, ctaUrl, founderPhotoUrl }: CtaBannerProps) {
  return (
    <section className="section-padding border-t border-border-lighter">
      <div className="container-site">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[25px] border border-border-lighter">
            {/* Decorative blur blob behind photo */}
            <div
              className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/8 pointer-events-none"
              style={{ filter: "blur(120px)" }}
            />

            <div className="flex flex-col lg:flex-row items-stretch">
              {/* Left — Founder photo */}
              <FadeIn
                direction="left"
                delay={0.1}
                className="relative w-full lg:w-[40%] min-h-[300px] lg:min-h-[420px]"
              >
                <Image
                  src={founderPhotoUrl || "/photo_cyril_1.webp"}
                  alt="Cyril, fondateur de Studio Lumen"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top lg:rounded-l-[25px]"
                  priority={false}
                />
                {/* Gradient fade on right edge (desktop) */}
                <div className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
                {/* Gradient fade on bottom edge (mobile) */}
                <div className="lg:hidden absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />
              </FadeIn>

              {/* Right — Content */}
              <div className="relative z-10 flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-16 lg:pl-8">
                <FadeIn direction="up" delay={0.2}>
                  {/* Editorial tagline */}
                  <p className="font-serif italic text-text-muted text-[18px] leading-[30px] mb-4">
                    &ldquo;Chaque projet est une histoire unique à
                    raconter.&rdquo;
                  </p>

                  {/* Founder label + ghost link */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-8">
                    <p className="text-[13px] font-medium uppercase tracking-[1.4px] text-text-body">
                      Cyril &mdash; Fondateur de Studio Lumen
                    </p>
                    <Button
                      href="/a-propos"
                      variant="outline"
                      size="sm"
                      showArrow={false}
                    >
                      En savoir plus
                    </Button>
                  </div>
                </FadeIn>

                <FadeIn direction="up" delay={0.3}>
                  <h2 className="font-sans text-[28px] sm:text-[32px] lg:text-[35px] font-semibold text-white leading-[1.18] mb-4">
                    Prêt à créer du contenu qui marque ?
                  </h2>

                  <p className="text-text-body text-[16px] leading-[26px] max-w-lg mb-8">
                    Réservez un appel découverte gratuit et discutons de votre
                    projet ensemble.
                  </p>
                </FadeIn>

                <FadeIn direction="up" delay={0.4}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <Button href={ctaUrl} variant="primary">
                      {ctaText}
                    </Button>

                    {/* Trust metrics */}
                    <div className="flex items-center gap-4">
                      {trustMetrics.map((metric, i) => (
                        <motion.div
                          key={metric.label}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: 0.5 + i * 0.1,
                            ease: "easeOut",
                          }}
                          className="flex items-center gap-2 text-[13px] text-text-muted"
                        >
                          <span className="font-semibold text-white text-[15px]">
                            {metric.value}
                          </span>
                          <span className="uppercase tracking-[1px]">
                            {metric.label}
                          </span>
                          {i < trustMetrics.length - 1 && (
                            <span className="ml-2 w-px h-3 bg-border-light" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
