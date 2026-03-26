"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";

type HeroProps = {
  headline: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
};

export function Hero({ headline, subtitle, ctaText, ctaUrl }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0.4, 0.75], [1, 0]);

  const words = headline.split(" ");

  return (
    <div ref={ref} className="min-h-screen">
      <motion.div
        style={{ opacity }}
        className="flex flex-col justify-end min-h-screen px-[4vw] lg:px-[3.906vw] pb-[5vw]"
      >
        {/* Headline — massive, left-aligned */}
        <h1 className="font-poppins font-bold text-white leading-[0.95] mb-6 lg:mb-8">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block mr-[0.25em] text-[clamp(36px,7vw,120px)]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Bottom row: CTA left, subtitle right */}
        <div className="flex flex-col-reverse lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <Button href={ctaUrl} variant="primary">
              {ctaText}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            className="lg:text-right"
          >
            <span className="font-serif italic text-text-muted text-lg sm:text-[20px] leading-[30px]">
              {subtitle}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
