"use client";

import { useState } from "react";
import { ConsentGate } from "@/components/consent/ConsentGate";
import { FadeIn } from "@/components/ui/FadeIn";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/studiolumen";

export function Booking() {
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <section id="reserver" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
            Réservez votre appel découverte
          </h2>
          <p className="text-white/60 text-center mb-8">
            30 minutes pour discuter de votre projet, sans engagement.
          </p>
        </FadeIn>

        <ConsentGate
          fallback={
            <FadeIn>
              <div className="text-center">
                <p className="text-sm text-white/50 mb-4">
                  Le widget de réservation nécessite votre consentement pour
                  charger.
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-8 py-3.5 rounded-full bg-accent text-background font-semibold hover:bg-accent-hover transition-colors"
                >
                  Réserver sur Calendly
                </a>
              </div>
            </FadeIn>
          }
        >
          {showEmbed ? (
            <div
              className="bg-white rounded-xl overflow-hidden"
              style={{ minHeight: 630 }}
            >
              <iframe
                src={`${CALENDLY_URL}?hide_gdpr_banner=1`}
                width="100%"
                height="630"
                frameBorder="0"
                title="Calendrier de réservation"
              />
            </div>
          ) : (
            <FadeIn>
              <div className="text-center">
                <button
                  onClick={() => setShowEmbed(true)}
                  className="inline-flex px-8 py-3.5 rounded-full bg-accent text-background font-semibold text-lg hover:bg-accent-hover transition-colors"
                >
                  Choisir un créneau
                </button>
                <p className="text-xs text-white/40 mt-3">
                  Propulsé par Calendly
                </p>
              </div>
            </FadeIn>
          )}
        </ConsentGate>
      </div>
    </section>
  );
}
