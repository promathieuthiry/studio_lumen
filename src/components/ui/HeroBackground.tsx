"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type HeroBackgroundProps = {
  children: React.ReactNode;
  backgroundDarkUrl?: string | null;
  backgroundLitUrl?: string | null;
};

export function HeroBackground({
  children,
  backgroundDarkUrl,
  backgroundLitUrl,
}: HeroBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Lights turn on as user scrolls through hero into value proposition
  const litOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const hasLightingEffect = backgroundDarkUrl && backgroundLitUrl;

  return (
    <div ref={ref} className="relative">
      {hasLightingEffect && (
        <div className="fixed inset-x-0 top-0 z-0 h-[100lvh]">
          {/* Dark (lights off) — always visible base */}
          <img
            src={backgroundDarkUrl}
            alt=""
            width={1920}
            height={1080}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Lit (lights on) — fades in on scroll */}
          <motion.div style={{ opacity: litOpacity }} className="absolute inset-0">
            <img
              src={backgroundLitUrl}
              alt=""
              width={1920}
              height={1080}
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </div>
      )}

      {/* Content scrolls over the fixed background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
