"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Hero content fades out as user scrolls past
  const opacity = useTransform(scrollYProgress, [0.2, 0.7], [1, 0]);

  return (
    <div ref={ref} className="min-h-screen">
      <motion.div
        style={{ opacity }}
        className="flex flex-col items-center justify-center min-h-screen px-4 text-center pt-16"
      >
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
      </motion.div>
    </div>
  );
}
