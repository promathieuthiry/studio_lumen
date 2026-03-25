"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type HeroBackgroundProps = {
  children: React.ReactNode;
  backgroundUrl?: string | null;
};

export function HeroBackground({ children, backgroundUrl }: HeroBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden bg-background">
      {/* Background image with parallax */}
      {backgroundUrl && (
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <img
            src={backgroundUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-background/60" />
        </motion.div>
      )}

      {/* Decorative blur blobs */}
      <div
        className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-accent/10"
        style={{ filter: "blur(100px)" }}
      />
      <div
        className="absolute bottom-[10%] right-[15%] w-[300px] h-[300px] rounded-full bg-white/5"
        style={{ filter: "blur(100px)" }}
      />

      {!backgroundUrl && (
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0"
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
