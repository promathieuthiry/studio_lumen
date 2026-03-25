"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  motion,
} from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
  duration?: number;
};

export function AnimatedCounter({
  value,
  suffix,
  className,
  suffixClassName,
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 50,
    damping: 30,
    duration,
  });

  // Determine decimal places from the target value
  const decimalPlaces = value % 1 === 0 ? 0 : String(value).split(".")[1]?.length ?? 0;

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimalPlaces);
      }
    });
    return unsubscribe;
  }, [spring, decimalPlaces]);

  return (
    <span className="inline-flex items-baseline">
      <span ref={ref} className={className}>
        0
      </span>
      {suffix && (
        <motion.span
          className={suffixClassName}
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: duration * 0.6, duration: 0.4, ease: "easeOut" }}
        >
          {suffix}
        </motion.span>
      )}
    </span>
  );
}
