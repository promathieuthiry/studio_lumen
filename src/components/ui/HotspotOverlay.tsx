"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

type Equipment = {
  _id: string;
  name: string;
  description: string;
  specs?: string;
  hotspotX: number;
  hotspotY: number;
};

type HotspotOverlayProps = {
  equipment: Equipment[];
};

export function HotspotOverlay({ equipment }: HotspotOverlayProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

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
        >
          <button
            onClick={() =>
              setActiveId(activeId === item._id ? null : item._id)
            }
            className="relative w-11 h-11 flex items-center justify-center"
            aria-label={`Voir : ${item.name}`}
          >
            <span className="absolute w-3 h-3 rounded-full bg-accent" />
            <motion.span
              animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute w-3 h-3 rounded-full bg-accent"
            />
          </button>

          <AnimatePresence mode="wait">
            {activeId === item._id && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                }}
                className="absolute z-20 w-56 sm:w-64"
                style={{
                  left: item.hotspotX > 60 ? "auto" : "100%",
                  right: item.hotspotX > 60 ? "100%" : "auto",
                  top: "-0.5rem",
                  marginLeft: item.hotspotX > 60 ? 0 : "0.75rem",
                  marginRight: item.hotspotX > 60 ? "0.75rem" : 0,
                }}
              >
                <GlassCard className="p-4">
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-white/60">{item.description}</p>
                  {item.specs && (
                    <p className="text-xs text-accent/70 mt-2">{item.specs}</p>
                  )}
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
}
