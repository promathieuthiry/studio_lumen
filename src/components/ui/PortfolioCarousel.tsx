"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { urlFor, type SanityImageSource } from "@/sanity/image";

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  cloudflareVideoId: string;
  thumbnail: SanityImageSource;
};

type PortfolioCarouselProps = {
  projects: Project[];
  onSelect: (project: Project) => void;
};

const categories = [
  { value: "all", label: "Tous" },
  { value: "social-media", label: "Réseaux sociaux" },
  { value: "testimonial", label: "Témoignages" },
  { value: "interview", label: "Interviews" },
  { value: "corporate", label: "Corporate" },
  { value: "podcast", label: "Podcasts" },
  { value: "photo", label: "Photos" },
];

export function PortfolioCarousel({
  projects,
  onSelect,
}: PortfolioCarouselProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
  }, [activeCategory, x]);

  const dragConstraints = {
    left: -(Math.max(0, filtered.length - 1) * 320),
    right: 0,
  };

  return (
    <div>
      <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide px-4 sm:px-0 sm:justify-center">
        {categories.map((cat) => {
          const count =
            cat.value === "all"
              ? projects.length
              : projects.filter((p) => p.category === cat.value).length;
          if (count === 0 && cat.value !== "all") return null;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-colors ${
                activeCategory === cat.value
                  ? "bg-accent text-background font-semibold"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={dragConstraints}
          style={{ x }}
          className="flex gap-6 cursor-grab active:cursor-grabbing"
        >
          {filtered.map((project, i) => {
            const itemX = useTransform(x, (latest) => {
              const offset = latest + i * 320;
              return offset;
            });
            const rotateY = useTransform(itemX, [-600, 0, 600], [-15, 0, 15]);
            const scale = useTransform(
              itemX,
              [-600, 0, 600],
              [0.9, 1, 0.9]
            );

            return (
              <motion.button
                key={project._id}
                style={{ rotateY, scale }}
                onClick={() => onSelect(project)}
                className="flex-shrink-0 w-72 sm:w-80 group"
                aria-label={`Voir le projet : ${project.title}`}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={urlFor(project.thumbnail).width(640).height(360).url()}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <p className="text-sm text-white/80 text-left group-hover:text-white transition-colors">
                  {project.title}
                </p>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
