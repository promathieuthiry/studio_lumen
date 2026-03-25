"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor, type SanityImageSource } from "@/sanity/image";

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  youtubeVideoId: string;
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

const categoryLabels: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.value, c.label])
);

const springTransition = { type: "spring" as const, stiffness: 200, damping: 25 };

const navButtonClass =
  "w-11 h-11 rounded-full border border-border-lighter flex items-center justify-center text-text-muted hover:text-white hover:border-white/30 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer";

type CardConfig = {
  nearScale: number;
  nearRotateY: number;
  nearX: number;
  nearOpacity: number;
  farScale: number;
  farRotateY: number;
  farBaseX: number;
  farStepX: number;
  farOpacity: number;
};

const desktopConfig: CardConfig = {
  nearScale: 0.72,  nearRotateY: -40, nearX: 280, nearOpacity: 0.6,
  farScale: 0.55,   farRotateY: -50,  farBaseX: 380, farStepX: 80, farOpacity: 0.3,
};

const mobileConfig: CardConfig = {
  nearScale: 0.7,   nearRotateY: -35, nearX: 180, nearOpacity: 0.5,
  farScale: 0.5,    farRotateY: -45,  farBaseX: 260, farStepX: 60, farOpacity: 0.2,
};

function getCardStyle(offset: number, config: CardConfig) {
  const absOffset = Math.abs(offset);
  if (absOffset === 0) {
    return { scale: 1, rotateY: 0, x: 0, zIndex: 10, opacity: 1 };
  }
  const direction = offset > 0 ? 1 : -1;
  if (absOffset === 1) {
    return {
      scale: config.nearScale,
      rotateY: direction * config.nearRotateY,
      x: direction * config.nearX,
      zIndex: 5,
      opacity: config.nearOpacity,
    };
  }
  return {
    scale: config.farScale,
    rotateY: direction * config.farRotateY,
    x: direction * (config.farBaseX + (absOffset - 2) * config.farStepX),
    zIndex: Math.max(0, 4 - absOffset),
    opacity: config.farOpacity,
  };
}

function CoverflowCard({
  project,
  offset,
  isMobile,
  onSelect,
  onNavigate,
}: {
  project: Project;
  offset: number;
  isMobile: boolean;
  onSelect: (project: Project) => void;
  onNavigate: () => void;
}) {
  const isCenter = offset === 0;
  const style = getCardStyle(offset, isMobile ? mobileConfig : desktopConfig);

  return (
    <motion.div
      className="absolute left-1/2 top-0"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        scale: style.scale,
        rotateY: style.rotateY,
        x: `calc(-50% + ${style.x}px)`,
        opacity: style.opacity,
        zIndex: style.zIndex,
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={springTransition}
      style={{
        transformStyle: "preserve-3d",
        width: isMobile ? "85vw" : 560,
        maxWidth: 560,
      }}
    >
      <button
        onClick={isCenter ? () => onSelect(project) : onNavigate}
        className={`w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${isCenter ? "group" : ""}`}
        aria-label={
          isCenter
            ? `Voir le projet : ${project.title}`
            : `Naviguer vers : ${project.title}`
        }
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden">
          {project.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFor(project.thumbnail).width(1120).height(630).url()}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center">
              <Play className="w-8 h-8 text-text-muted" />
            </div>
          )}

          {/* Dim overlay for non-center cards */}
          <motion.div
            className="absolute inset-0 bg-background pointer-events-none"
            animate={{ opacity: isCenter ? 0 : 0.5 }}
            transition={{ duration: 0.3 }}
          />

          {/* Center card: play icon — pure CSS hover */}
          {isCenter && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </div>
          )}

          {/* Center card: info bar on hover — pure CSS, lighter blur */}
          {isCenter && (
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out">
              <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 sm:px-5 sm:py-4">
                <p className="text-[13px] font-medium uppercase tracking-[1.4px] text-text-muted mb-1">
                  {categoryLabels[project.category] || project.category}
                </p>
                <p className="text-[16px] sm:text-[18px] font-semibold text-white leading-tight">
                  {project.title}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Title below card — visible on center only, hides on hover */}
        {isCenter && (
          <p className="mt-4 text-[15px] text-text-muted text-center group-hover:opacity-0 transition-opacity duration-200">
            {project.title}
          </p>
        )}
      </button>
    </motion.div>
  );
}

export function PortfolioCarousel({
  projects,
  onSelect,
}: PortfolioCarouselProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const categoryCounts = new Map<string, number>();
  for (const p of projects) {
    categoryCounts.set(p.category, (categoryCounts.get(p.category) ?? 0) + 1);
  }

  // Clamp index to filtered length (handles category switches synchronously)
  const safeIndex = Math.min(activeIndex, Math.max(0, filtered.length - 1));

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = (index: number) => {
    if (index >= 0 && index < filtered.length) {
      setActiveIndex(index);
    }
  };

  const goPrev = () => goTo(safeIndex - 1);
  const goNext = () => goTo(safeIndex + 1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
  };

  const visibleItems = filtered
    .map((project, i) => ({ project, index: i, offset: i - safeIndex }))
    .filter((item) => Math.abs(item.offset) <= 3);

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Portfolio vidéo"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="outline-none"
    >
      {/* Category filters */}
      <div className="flex gap-3 mb-10 overflow-x-auto scrollbar-hide px-4 sm:px-0 sm:justify-center">
        {categories.map((cat) => {
          if (cat.value !== "all" && !categoryCounts.has(cat.value)) return null;
          return (
            <button
              key={cat.value}
              onClick={() => { setActiveCategory(cat.value); setActiveIndex(0); }}
              className={`flex-shrink-0 px-5 py-2.5 rounded-pill text-[14px] font-medium transition-colors duration-300 cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-white text-text-dark"
                  : "text-text-muted hover:text-white border border-border-lighter"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="flex items-center justify-center" style={{ height: isMobile ? "calc(50vw + 60px)" : 400 }}>
          <p className="text-text-muted text-[15px]">Aucun projet dans cette catégorie.</p>
        </div>
      ) : (
        <>
          {/* Coverflow container */}
          <div
            className="relative overflow-hidden"
            style={{ height: isMobile ? "calc(50vw + 60px)" : 400 }}
            onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStart === null || e.changedTouches.length === 0) return;
              const diff = touchStart - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) {
                diff > 0 ? goNext() : goPrev();
              }
              setTouchStart(null);
            }}
          >
            <div className="relative w-full h-full" style={{ perspective: 1200 }}>
              <AnimatePresence mode="popLayout">
                {visibleItems.map(({ project, index, offset }) => (
                  <CoverflowCard
                    key={project._id}
                    project={project}
                    offset={offset}
                    isMobile={isMobile}
                    onSelect={onSelect}
                    onNavigate={() => goTo(index)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation controls + counter */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={goPrev}
              disabled={safeIndex === 0}
              className={navButtonClass}
              aria-label="Vidéo précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span
              className="text-[14px] text-text-muted tabular-nums"
              aria-live="polite"
            >
              {safeIndex + 1} / {filtered.length} vidéo{filtered.length > 1 ? "s" : ""}
            </span>

            <button
              onClick={goNext}
              disabled={safeIndex === filtered.length - 1}
              className={navButtonClass}
              aria-label="Vidéo suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
