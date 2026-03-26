"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type AboutHeroProps = {
  fullName: string;
  title: string;
  photoUrl: string;
};

export function AboutHero({ fullName, title, photoUrl }: AboutHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0.4, 0.75], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const words = fullName.split(" ");

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: photoScale, y: photoY }}
      >
        {/* Native <img> required — next/image doesn't support Framer Motion scale/y transforms on its container */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoUrl}
          alt={`Portrait de ${fullName}`}
          fetchPriority="high"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col justify-end min-h-screen px-[4vw] lg:px-[3.906vw] pb-[5vw]"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="label-caps text-accent mb-6"
        >
          Fondateur
        </motion.span>

        <h1 className="font-display font-bold text-white leading-[0.95] mb-6">
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="font-serif italic text-text-muted text-lg sm:text-[20px] leading-[30px] max-w-xl"
        >
          {title}
        </motion.p>
      </motion.div>
    </section>
  );
}
