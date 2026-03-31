"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";

type HeroProps = {
  headline: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
};

function AnimatedNumber({ value, delay }: { value: number; delay: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const duration = 1200;
    const steps = 30;
    const stepTime = duration / steps;
    let current = 0;
    const interval = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (current >= steps) clearInterval(interval);
    }, stepTime);
    return () => clearInterval(interval);
  }, [started, value]);

  return <span className="font-sans not-italic font-semibold">{count}</span>;
}

function renderSubtitleWithAnimatedNumbers(subtitle: string, delay: number) {
  const parts = subtitle.split(/(\d+)/);
  return parts.map((part, i) => {
    const num = parseInt(part, 10);
    if (!isNaN(num)) {
      return <AnimatedNumber key={i} value={num} delay={delay} />;
    }
    return <span key={i}>{part}</span>;
  });
}

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
            className="flex items-center gap-4"
          >
            <Button href={ctaUrl} variant="accent">
              {ctaText}
            </Button>
            <Button href="/a-propos" variant="outline" showArrow={false}>
              En savoir plus
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            className="lg:text-right max-w-md lg:ml-auto"
          >
            <div className="hidden lg:block w-12 h-px bg-white/30 mb-4 ml-auto" />
            <span className="font-serif italic text-white/75 text-xl sm:text-[22px] leading-[33px]">
              {renderSubtitleWithAnimatedNumbers(subtitle, 1.2)}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
