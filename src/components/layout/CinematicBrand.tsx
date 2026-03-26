"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";

/* ─── Scroll-driven word reveal ────────────────────────────────────────── */

function useWordReveal(
  progress: MotionValue<number>,
  enterStart: number,
  enterEnd: number,
  reducedMotion?: boolean | null
) {
  const opacity = useTransform(
    progress,
    [enterStart, enterEnd],
    reducedMotion ? [1, 1] : [0, 1]
  );
  const y = useTransform(
    progress,
    [enterStart, enterEnd],
    reducedMotion ? [0, 0] : [30, 0]
  );
  const scale = useTransform(
    progress,
    [enterStart, enterEnd],
    reducedMotion ? [1, 1] : [0.92, 1]
  );
  return { opacity, y, scale };
}

/* ─── Component ────────────────────────────────────────────────────────── */

export function CinematicBrand() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  // Staggered word reveals
  const studio = useWordReveal(scrollYProgress, 0.15, 0.6, prefersReducedMotion);
  const lumen = useWordReveal(scrollYProgress, 0.3, 0.75, prefersReducedMotion);

  // Expanding center line (scaleX from 0 → 1)
  const lineScaleX = useTransform(scrollYProgress, [0.4, 0.85], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.85], [0, 1, 1]);

  // Ambient glow behind text
  const glowOpacity = useTransform(scrollYProgress, [0.5, 0.9], [0, 1]);


  return (
    <div ref={ref} className="relative pt-16 md:pt-24 pb-10 overflow-hidden">
      {/* ─── Ambient Glow ─── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ opacity: glowOpacity }}
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* ─── Typographic Reveal ─── */}
      <div
        className="relative z-10 container-site text-center select-none font-display font-semibold leading-[0.85] tracking-tight text-white"
        style={{ fontSize: "clamp(60px, 18vw, 320px)" }}
        role="img"
        aria-label="Studio Lumen"
      >
        <motion.div
          aria-hidden="true"
          style={{
            opacity: studio.opacity,
            y: studio.y,
            scale: studio.scale,
          }}
        >
          STUDIO
        </motion.div>
        <motion.div
          aria-hidden="true"
          style={{
            opacity: lumen.opacity,
            y: lumen.y,
            scale: lumen.scale,
          }}
        >
          LUMEN
        </motion.div>
      </div>

      {/* ─── Expanding Decorative Line ─── */}
      <motion.div
        className="relative z-10 mx-auto mt-10 md:mt-14 h-px w-full max-w-[480px]"
        style={{
          background: "var(--color-border-warm)",
          scaleX: lineScaleX,
          opacity: lineOpacity,
          transformOrigin: "center",
        }}
        aria-hidden="true"
      />

    </div>
  );
}
