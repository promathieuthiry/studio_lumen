"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/GlassCard";
import { urlFor, type SanityImageSource } from "@/sanity/image";

type Equipment = {
  _id: string;
  name: string;
  description: string;
  image?: SanityImageSource | null;
  specs?: string;
  hotspotX: number;
  hotspotY: number;
};

type HotspotOverlayProps = {
  equipment: Equipment[];
  /** When defined, overrides hover/click — used for scroll-driven card tour */
  forcedActiveId?: string | null;
  /** Notifies parent of the resolved active ID (for mobile bottom card) */
  onActiveChange?: (id: string | null) => void;
};

export function HotspotOverlay({
  equipment,
  forcedActiveId,
  onActiveChange,
}: HotspotOverlayProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Clear stale hover when scroll tour advances to the next card
  useEffect(() => {
    if (forcedActiveId !== undefined) setHoveredId(null);
  }, [forcedActiveId]);

  // Hover/click takes priority over scroll-driven forcedActiveId
  const activeId = hoveredId ?? forcedActiveId ?? null;

  // Only notify parent of hover/tap changes (not during scroll-driven tour)
  useEffect(() => {
    if (forcedActiveId === undefined) {
      onActiveChange?.(activeId ?? null);
    }
  }, [activeId, forcedActiveId, onActiveChange]);

  return (
    <>
      {equipment.map((item) => (
        <div
          key={item._id}
          className="absolute"
          style={{
            left: `${item.hotspotX}%`,
            top: `${item.hotspotY}%`,
            transform: "translate(-50%, -50%)",
          }}
          onMouseEnter={() => setHoveredId(item._id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <button
            onClick={() =>
              setHoveredId(hoveredId === item._id ? null : item._id)
            }
            className="relative w-11 h-11 flex items-center justify-center"
            aria-label={`Voir : ${item.name}`}
          >
            <span
              className={cn(
                "absolute w-3 h-3 rounded-full transition-colors duration-300",
                activeId === item._id ? "bg-accent" : "bg-white/40"
              )}
            />
            {activeId === item._id && (
              <motion.span
                animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute w-3 h-3 rounded-full bg-accent"
              />
            )}
          </button>

          {/* Desktop: card positioned next to hotspot */}
          <AnimatePresence mode="wait">
            {activeId === item._id && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.92 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 200,
                  mass: 0.8,
                }}
                className="hidden sm:block absolute z-20 w-64"
                style={{
                  left: item.hotspotX > 60 ? "auto" : "100%",
                  right: item.hotspotX > 60 ? "100%" : "auto",
                  top: "-0.5rem",
                  marginLeft: item.hotspotX > 60 ? 0 : "0.75rem",
                  marginRight: item.hotspotX > 60 ? "0.75rem" : 0,
                }}
              >
                <EquipmentCard item={item} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
}

/** Shared card content used by both desktop hotspot and mobile bottom sheet */
export function EquipmentCard({ item }: { item: Equipment }) {
  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        {item.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(item.image)
              .width(320)
              .quality(80)
              .auto("format")
              .url()}
            alt={item.name}
            className="w-full h-28 object-cover"
          />
        )}
        <h4 className="font-sans text-[14px] font-medium text-white mb-1">
          {item.name}
        </h4>
        <p className="text-text-body text-[13px] leading-[20px]">
          {item.description}
        </p>
        {item.specs && (
          <p className="text-accent text-[12px] mt-2 opacity-70">
            {item.specs}
          </p>
        )}
      </div>
    </Card>
  );
}
