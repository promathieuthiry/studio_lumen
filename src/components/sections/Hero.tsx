import { HeroBackground } from "@/components/ui/HeroBackground";
import { Button } from "@/components/ui/Button";
import { urlFor, type SanityImageSource } from "@/sanity/image";
import Link from "next/link";

type HeroProps = {
  headline: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  founderPhoto?: SanityImageSource | null;
};

export function Hero({
  headline,
  subtitle,
  ctaText,
  ctaUrl,
  founderPhoto,
}: HeroProps) {
  return (
    <HeroBackground>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center pt-16">
        {/* Display headline — fluid vw sizing per CLAUDE.md */}
        <h1 className="font-display font-semibold text-white leading-[1] mb-6 text-[30px] sm:text-[48px] lg:text-[clamp(55px,5vw,20vw)]">
          {headline}
        </h1>
        <p className="font-serif italic text-text-muted text-lg sm:text-[20px] leading-[30px] mb-10 max-w-2xl">
          {subtitle}
        </p>
        <Button href={ctaUrl} variant="primary">
          {ctaText}
        </Button>
        {founderPhoto ? (
          <Link href="/a-propos" className="mt-14 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(founderPhoto).width(160).height(160).url()}
              alt="Fondateur de Studio Lumen"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-border-light group-hover:border-accent transition-colors duration-300"
            />
          </Link>
        ) : null}
      </div>
    </HeroBackground>
  );
}
