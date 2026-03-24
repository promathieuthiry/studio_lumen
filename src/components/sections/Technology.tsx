"use client";

import { useState } from "react";
import { HotspotOverlay } from "@/components/ui/HotspotOverlay";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassCard } from "@/components/ui/GlassCard";

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
    <section id="technologie" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
            Notre studio mobile
          </h2>
          <p className="text-white/60 text-center max-w-2xl mx-auto mb-12">
            Explorez l&apos;équipement professionnel embarqué dans notre
            véhicule.
          </p>
        </FadeIn>

        {/* Desktop: interactive hotspot overlay */}
        <FadeIn>
          <div className="hidden sm:block relative aspect-[16/9] rounded-2xl overflow-hidden bg-background-light">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/truck-interior.jpg"
              alt="Intérieur du studio mobile Studio Lumen"
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
            {imageLoaded && <HotspotOverlay equipment={equipment} />}
          </div>
        </FadeIn>

        {/* Mobile: scrollable list */}
        <div className="sm:hidden space-y-4">
          {equipment.map((item, i) => (
            <FadeIn key={item._id} delay={i * 0.05}>
              <GlassCard className="p-5">
                <h4 className="text-sm font-semibold text-white mb-1">
                  {item.name}
                </h4>
                <p className="text-xs text-white/60">{item.description}</p>
                {item.specs && (
                  <p className="text-xs text-accent/70 mt-2">{item.specs}</p>
                )}
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
