"use client";

import { ConsentGate } from "@/components/consent/ConsentGate";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FeaturedCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { Clock, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/studiolumen";

const CALENDLY_PARAMS =
  "hide_gdpr_banner=1&hide_event_type_details=1&background_color=0a0a0a&text_color=ffffff&primary_color=61CE70";
const CALENDLY_THEMED = `${CALENDLY_URL}${CALENDLY_URL.includes("?") ? "&" : "?"}${CALENDLY_PARAMS}`;

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

type TrustPoint = { icon: LucideIcon; text: string };

const trustPoints: TrustPoint[] = [
  { icon: Clock, text: "30 min, sans engagement" },
  { icon: ShieldCheck, text: "100 % gratuit" },
  { icon: Sparkles, text: "Réponse sous 24 h" },
];

function initWidget(container: HTMLElement) {
  window.Calendly?.initInlineWidget({
    url: CALENDLY_THEMED,
    parentElement: container,
  });
}

function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = WIDGET_CSS;
      document.head.appendChild(link);
    }

    if (window.Calendly) {
      if (containerRef.current) initWidget(containerRef.current);
      return;
    }

    let cancelled = false;
    const existing = document.querySelector(`script[src="${WIDGET_JS}"]`);

    if (existing) {
      existing.addEventListener("load", () => {
        if (!cancelled && containerRef.current) initWidget(containerRef.current);
      }, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = WIDGET_JS;
      script.async = true;
      script.onload = () => {
        if (!cancelled && containerRef.current) initWidget(containerRef.current);
      };
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[580px] lg:h-[740px] overflow-hidden lg:rounded-r-[25px]"
    />
  );
}

export function Booking() {
  return (
    <section
      id="reserver"
      className="relative py-[5vw] sm:py-[4vw] border-y border-border-lighter"
      style={{ backgroundColor: "#111111" }}
    >
      {/* Full-bleed ambient glow to distinguish from #030303 sections */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="container-site">
        <FadeIn>
          <FeaturedCard className="relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/6 blur-[140px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent/4 blur-[120px] pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-stretch">
              <div className="relative z-10 flex flex-col justify-center p-8 sm:p-12 lg:p-16 lg:w-[38%] shrink-0">
                <SectionLabel className="mb-4">Réservation</SectionLabel>

                <h2 className="font-sans text-[28px] sm:text-[32px] lg:text-[35px] font-semibold text-white leading-[1.18] mb-4">
                  Discutons de votre projet
                </h2>
                <p className="text-text-body text-[16px] leading-[26px] mb-8 max-w-md">
                  Choisissez un créneau qui vous convient. Un appel découverte
                  pour comprendre vos besoins et vous proposer la meilleure
                  approche.
                </p>

                <div className="flex flex-col gap-3 mb-8 lg:mb-0">
                  {trustPoints.map((point, i) => (
                    <motion.div
                      key={point.text}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + i * 0.1,
                        ease: "easeOut",
                      }}
                      className="flex items-center gap-3"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10">
                        <point.icon className="w-4 h-4 text-accent" />
                      </span>
                      <span className="text-[14px] text-text-muted">
                        {point.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <p className="hidden lg:block font-serif italic text-text-body/60 text-[15px] leading-[24px] mt-auto pt-8 border-t border-border-lighter">
                  &ldquo;Chaque projet commence par une conversation.&rdquo;
                </p>
              </div>

              <div className="relative flex-1 min-w-0">
                <div className="hidden lg:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

                <ConsentGate
                  fallback={
                    <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center">
                      <p className="text-[14px] text-text-muted mb-6 max-w-sm">
                        Le calendrier de réservation nécessite votre
                        consentement pour charger du contenu externe.
                      </p>
                      <Button href={CALENDLY_URL} variant="primary">
                        Réserver sur Calendly
                      </Button>
                    </div>
                  }
                >
                  <CalendlyEmbed />
                </ConsentGate>
              </div>
            </div>
          </FeaturedCard>
        </FadeIn>
      </div>
    </section>
  );
}
