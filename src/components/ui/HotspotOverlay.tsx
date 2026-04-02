"use client";

import { useState } from "react";
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
};

export function HotspotOverlay({ equipment }: HotspotOverlayProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <>
      {equipment.map((item) => {
        const isActive = hoveredId === item._id;
        return (
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
              setHoveredId(isActive ? null : item._id)
            }
            className="relative w-11 h-11 flex items-center justify-center"
            aria-label={`Voir : ${item.name}`}
          >
            <span
              className={cn(
                "absolute w-3 h-3 rounded-full transition-colors duration-300",
                isActive ? "bg-accent" : "bg-white/40"
              )}
            />
            {isActive && (
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

          <AnimatePresence mode="wait">
            {isActive && (
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
                className="absolute z-20 w-48 sm:w-64"
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
        );
      })}
    </>
  );
}

function EquipmentCard({ item }: { item: Equipment }) {
  return (
    <Card className="overflow-hidden">
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
      <div className="p-4">
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
