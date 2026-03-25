import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { urlFor, type SanityImageSource } from "@/sanity/image";

type ClientLogosProps = {
  clientLogos: Array<{
    _id: string;
    name: string;
    logo: SanityImageSource;
    url?: string;
  }>;
};

export function ClientLogos({ clientLogos }: ClientLogosProps) {
  if (!clientLogos?.length) return null;

  // Double the logos so one "half" fills the viewport, then render
  // that half twice — translateX(-50%) loops seamlessly because
  // both halves are identical (gaps included).
  const half = [...clientLogos, ...clientLogos];

  return (
    <section className="section-padding-top">
      <div className="container-site mb-12">
        <FadeIn>
          <SectionLabel className="block text-center mb-4">
            Collaborations
          </SectionLabel>
          <h2 className="font-sans text-[30px] sm:text-[35px] font-semibold text-white text-center leading-[1.18]">
            Ils nous font confiance
          </h2>
        </FadeIn>
      </div>

      {/* Marquee — constrained width, pauses on hover */}
      <div className="group/marquee relative max-w-7xl mx-auto border-b border-border-lighter pb-12 overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 sm:w-48 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 sm:w-48 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee-fast group-hover/marquee:[animation-play-state:paused]">
          {/* Two identical halves — seamless loop at translateX(-50%) */}
          {[0, 1].map((half_idx) => (
            <div
              key={half_idx}
              className="flex items-center gap-20 shrink-0 pr-20"
            >
              {half.map((logo, idx) => {
                const image = (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={urlFor(logo.logo).height(100).url()}
                      alt={logo.name}
                      className="h-[40px] sm:h-[50px] w-auto brightness-0 invert opacity-40 transition-all duration-300 group-hover/logo:brightness-100 group-hover/logo:invert-0 group-hover/logo:opacity-100 group-hover/logo:scale-105"
                    />
                  </>
                );

                return (
                  <div
                    key={`${logo._id}-${half_idx}-${idx}`}
                    className="flex-shrink-0 group/logo"
                  >
                    {logo.url ? (
                      <a
                        href={logo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {image}
                      </a>
                    ) : (
                      image
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
