"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/GlassCard";
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeItem = hoveredId ? equipment.find((e) => e._id === hoveredId) ?? null : null;

  return (
    <>
      {equipment.map((item, index) => {
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
            {/* Sonar ping — staggered per dot */}
            <motion.span
              animate={{
                scale: isActive ? [1, 2.5] : [1, 2.2],
                opacity: isActive ? [0.7, 0] : [0.35, 0],
              }}
              transition={{
                duration: isActive ? 1.2 : 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: isActive ? 0 : index * 0.4,
              }}
              className={cn(
                "absolute w-3.5 h-3.5 rounded-full",
                isActive ? "bg-accent" : "bg-white"
              )}
            />
            {/* Core dot */}
            <span
              className={cn(
                "absolute w-2.5 h-2.5 rounded-full transition-all duration-300",
                isActive
                  ? "bg-accent shadow-[0_0_10px_rgba(97,206,112,0.6)]"
                  : "bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              )}
            />
          </button>

          {/* Desktop: card next to hotspot */}
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
        );
      })}

      {/* Mobile: fixed bottom card */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            key={activeItem._id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", damping: 22, stiffness: 220, mass: 0.8 }}
            className="sm:hidden fixed bottom-6 left-4 right-4 z-40"
          >
            <EquipmentCard item={activeItem} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function EquipmentCard({ item }: { item: Equipment }) {
  return (
    <Card className="overflow-hidden">
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
