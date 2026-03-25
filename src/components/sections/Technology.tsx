"use client";

import { useState } from "react";
import { HotspotOverlay } from "@/components/ui/HotspotOverlay";
import { FadeIn } from "@/components/ui/FadeIn";
import { Card } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Equipment = {
  _id: string;
  name: string;
  description: string;
  specs?: string;
  hotspotX: number;
  hotspotY: number;
};

type TechnologyProps = {
  equipment: Equipment[];
};

export function Technology({ equipment }: TechnologyProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!equipment?.length) return null;

  return (
    <section id="technologie" className="section-padding">
      <div className="container-site">
        <FadeIn>
          <SectionLabel className="block text-center mb-4">
            Équipement
          </SectionLabel>
          <h2 className="font-sans text-[30px] sm:text-[35px] font-semibold text-white mb-4 text-center leading-[1.18]">
            Notre studio mobile
          </h2>
          <p className="text-text-body text-[16px] leading-[26px] text-center max-w-2xl mx-auto mb-14">
            Explorez l&apos;équipement professionnel embarqué dans notre
            véhicule.
          </p>
        </FadeIn>

        {/* Desktop: interactive hotspot overlay */}
        <FadeIn>
          <div className="hidden sm:grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Arri%C3%A8re%20Camion.webp"
                alt="Vue arrière du studio mobile Studio Lumen"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-overlay" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Int%C3%A9rieur%20camion.webp"
                alt="Intérieur du studio mobile Studio Lumen"
                className="w-full h-full object-cover"
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-overlay" />
              {imageLoaded && <HotspotOverlay equipment={equipment} />}
            </div>
          </div>
        </FadeIn>

        {/* Mobile: scrollable list */}
        <div className="sm:hidden space-y-4">
          {equipment.map((item, i) => (
            <FadeIn key={item._id} delay={i * 0.05}>
              <Card className="p-6">
                <h4 className="font-sans text-[16px] font-medium text-white mb-2">
                  {item.name}
                </h4>
                <p className="text-text-body text-[14px] leading-[22px]">
                  {item.description}
                </p>
                {item.specs && (
                  <p className="text-accent text-[13px] mt-2 opacity-70">
                    {item.specs}
                  </p>
                )}
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
