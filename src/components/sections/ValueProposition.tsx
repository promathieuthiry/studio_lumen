import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { urlFor, type SanityImageSource } from "@/sanity/image";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] || LucideIcons.Sparkles;
}

type ValuePropositionProps = {
  valuePropositions: Array<{
    title: string;
    description: string;
    icon: string;
    statValue?: number | null;
    statSuffix?: string | null;
  }>;
  clientLogos: Array<{
    _id: string;
    name: string;
    logo: SanityImageSource;
    url?: string;
  }>;
};

export function ValueProposition({
  valuePropositions,
  clientLogos,
}: ValuePropositionProps) {
  return (
    <section className="section-padding">
      <div className="container-site">
        <FadeIn>
          <div className="text-center mb-12">
            <SectionLabel className="block mb-4">
              Pourquoi nous choisir
            </SectionLabel>
            <h2 className="font-display text-[32px] sm:text-[42px] font-semibold text-white leading-[1.1]">
              Ce qui nous distingue
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {valuePropositions?.map((vp, i) => {
            const Icon = getIcon(vp.icon);
            const hasStat = vp.statValue != null;

            return (
              <FadeIn key={vp.title} delay={i * 0.1}>
                <div className="relative grid grid-rows-[1fr_auto_auto] p-8 sm:p-10 h-full min-h-[320px] sm:min-h-[380px] overflow-hidden rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
                  {/* Stat number — top right, oversized */}
                  <div className="flex justify-end items-start">
                    {hasStat ? (
                      <AnimatedCounter
                        value={vp.statValue!}
                        suffix={vp.statSuffix ?? undefined}
                        className="font-display text-[72px] sm:text-[96px] font-semibold leading-none text-accent tabular-nums"
                        suffixClassName="font-display text-[24px] sm:text-[32px] font-medium text-white/50 ml-1 self-start mt-3 sm:mt-4"
                      />
                    ) : (
                      <Icon
                        className="w-12 h-12 text-white/20"
                        strokeWidth={1}
                      />
                    )}
                  </div>

                  {/* Title — aligned across cards */}
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      className="w-5 h-5 text-accent flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <h3 className="font-sans text-[18px] sm:text-[20px] font-medium text-white leading-[28px]">
                      {vp.title}
                    </h3>
                  </div>

                  {/* Description — fixed min-h keeps titles aligned across cards */}
                  <p className="text-white/70 text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] sm:min-h-[104px]">
                    {vp.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Client logo marquee */}
        {clientLogos?.length > 0 && (
          <div className="mt-20 overflow-hidden">
            <div className="flex items-center gap-16 animate-marquee">
              {[...clientLogos, ...clientLogos].map((logo, idx) => (
                <div
                  key={`${logo._id}-${idx}`}
                  className="flex-shrink-0 opacity-40 hover:opacity-70 transition-opacity duration-300"
                  style={{ width: "auto" }}
                >
                  {logo.url ? (
                    <a
                      href={logo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={urlFor(logo.logo).height(50).url()}
                        alt={logo.name}
                        className="h-[50px] w-auto"
                      />
                    </a>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={urlFor(logo.logo).height(50).url()}
                      alt={logo.name}
                      className="h-[50px] w-auto"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
