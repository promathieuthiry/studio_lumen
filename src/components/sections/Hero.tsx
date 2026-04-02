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

  // Force "Studio Lumen" onto its own second line on all devices
  const studioLumenIndex = headline.toLowerCase().indexOf("studio lumen");
  const firstLine =
    studioLumenIndex > 0
      ? headline.slice(0, studioLumenIndex).trim().split(" ")
      : [];
  const secondLine =
    studioLumenIndex >= 0
      ? headline.slice(studioLumenIndex).trim().split(" ")
      : headline.split(" ");

  return (
    <div ref={ref} className="min-h-dvh">
      <motion.div
        style={{ opacity }}
        className="flex flex-col justify-end min-h-dvh px-[4vw] lg:px-[3.906vw] pb-[5vw]"
      >
        {/* Headline — "Studio Lumen" always on line 2 */}
        <h1 className="font-poppins font-bold text-white leading-[0.95]">
          {firstLine.length > 0 && (
            <span className="block">
              {firstLine.map((word, i) => (
                <motion.span
                  key={`l1-${i}`}
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
            </span>
          )}
          <span className="block">
            {secondLine.map((word, i) => (
              <motion.span
                key={`l2-${i}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + (firstLine.length + i) * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block mr-[0.25em] text-[clamp(36px,7vw,120px)]"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtitle — between headline and CTA */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="font-poppins max-w-lg mt-5 lg:mt-6 mb-8 lg:mb-10 font-normal text-[#C2C2C2] text-lg lg:text-xl leading-[1.6] tracking-wide"
        >
          {renderSubtitleWithAnimatedNumbers(subtitle, 1.0)}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          <Button href={ctaUrl} variant="accent">
            {ctaText}
          </Button>
          <Button href="/a-propos" variant="outline" showArrow={false}>
            En savoir plus
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
