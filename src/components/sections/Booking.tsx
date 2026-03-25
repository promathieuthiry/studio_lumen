"use client";

import { useState } from "react";
import { ConsentGate } from "@/components/consent/ConsentGate";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/studiolumen";

export function Booking() {
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <section id="reserver" className="section-padding">
      <div className="container-site max-w-3xl">
        <FadeIn>
          <SectionLabel className="block text-center mb-4">
            Réservation
          </SectionLabel>
          <h2 className="font-sans text-[30px] sm:text-[35px] font-semibold text-white mb-4 text-center leading-[1.18]">
            Réservez votre appel découverte
          </h2>
          <p className="text-text-body text-[16px] leading-[26px] text-center mb-10">
            30 minutes pour discuter de votre projet, sans engagement.
          </p>
        </FadeIn>

        <ConsentGate
          fallback={
            <FadeIn>
              <div className="text-center">
                <p className="text-[14px] text-text-muted mb-6">
                  Le widget de réservation nécessite votre consentement pour
                  charger.
                </p>
                <Button href={CALENDLY_URL} variant="primary">
                  Réserver sur Calendly
                </Button>
              </div>
            </FadeIn>
          }
        >
          {showEmbed ? (
            <div
              className="bg-white rounded-lg overflow-hidden"
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
                <Button
                  onClick={() => setShowEmbed(true)}
                  variant="primary"
                >
                  Choisir un créneau
                </Button>
                <p className="text-[13px] text-text-body mt-4">
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
