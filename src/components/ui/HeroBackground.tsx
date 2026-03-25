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
        <div className="fixed inset-0 z-0">
          {/* Dark (lights off) — always visible base */}
          <img
            src={backgroundDarkUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Lit (lights on) — fades in on scroll */}
          <motion.div style={{ opacity: litOpacity }} className="absolute inset-0">
            <img
              src={backgroundLitUrl}
              alt=""
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
