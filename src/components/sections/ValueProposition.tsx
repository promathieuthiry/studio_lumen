import { Card } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/ui/FadeIn";
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
          <SectionLabel className="block text-center mb-6">
            Pourquoi nous choisir
          </SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {valuePropositions?.map((vp, i) => {
            const Icon = getIcon(vp.icon);
            return (
              <FadeIn key={vp.title} delay={i * 0.1}>
                <Card className="p-8 sm:p-10 h-full">
                  <Icon className="w-7 h-7 text-accent mb-5" strokeWidth={1.5} />
                  <h3 className="font-sans text-[20px] font-medium text-white mb-3 leading-[28px]">
                    {vp.title}
                  </h3>
                  <p className="text-text-body text-[16px] leading-[26px]">
                    {vp.description}
                  </p>
                </Card>
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
