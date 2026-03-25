"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroBackground({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative blur blobs */}
      <div
        className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-accent/10"
        style={{ filter: "blur(100px)" }}
      />
      <div
        className="absolute bottom-[10%] right-[15%] w-[300px] h-[300px] rounded-full bg-white/5"
        style={{ filter: "blur(100px)" }}
      />

      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
