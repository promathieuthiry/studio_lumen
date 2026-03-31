"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          onMouseEnter={() => setActiveId(item._id)}
          onMouseLeave={() => setActiveId(null)}
        >
          <button
            onClick={() => setActiveId(activeId === item._id ? null : item._id)}
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
}
