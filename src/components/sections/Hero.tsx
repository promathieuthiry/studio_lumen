import { HeroBackground } from "@/components/ui/HeroBackground";
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
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl">
          {headline}
        </h1>
        <p className="text-lg sm:text-xl text-white/60 mb-8 max-w-2xl">
          {subtitle}
        </p>
        <a
          href={ctaUrl}
          className="inline-flex px-8 py-3.5 rounded-full bg-accent text-background font-semibold text-lg hover:bg-accent-hover transition-colors"
        >
          {ctaText}
        </a>
        {founderPhoto ? (
          <Link href="/a-propos" className="mt-12 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(founderPhoto).width(160).height(160).url()}
              alt="Fondateur de Studio Lumen"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white/20 group-hover:border-accent transition-colors"
            />
          </Link>
        ) : null}
      </div>
    </HeroBackground>
  );
}
