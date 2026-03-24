import { GlassCard } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/ui/FadeIn";
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
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {valuePropositions?.map((vp, i) => {
            const Icon = getIcon(vp.icon);
            return (
              <FadeIn key={vp.title} delay={i * 0.1}>
                <GlassCard className="p-6 sm:p-8 h-full">
                  <Icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {vp.title}
                  </h3>
                  <p className="text-sm text-white/60">{vp.description}</p>
                </GlassCard>
              </FadeIn>
            );
          })}
        </div>

        {clientLogos?.length > 0 && (
          <div className="mt-16 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-12 min-w-max px-4">
              {clientLogos.map((logo) => (
                <div
                  key={logo._id}
                  className="flex-shrink-0 opacity-40 hover:opacity-70 transition-opacity"
                >
                  {logo.url ? (
                    <a
                      href={logo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={urlFor(logo.logo).height(40).url()}
                        alt={logo.name}
                        className="h-8 sm:h-10 w-auto"
                      />
                    </a>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={urlFor(logo.logo).height(40).url()}
                      alt={logo.name}
                      className="h-8 sm:h-10 w-auto"
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
