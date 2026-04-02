"use client";

import { useRef, useEffect, useLayoutEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { HotspotOverlay } from "@/components/ui/HotspotOverlay";
import type { SanityImageSource } from "@/sanity/image";

const TOTAL_FRAMES = 169;
const PHASE_1_COUNT = 15;
const SCROLL_PER_FRAME = 10;
const BATCH_SIZE = 5;

const TITLE_IN_START = 0.45;
const TITLE_IN_END = 0.65;
const TITLE_Y_START = 30; // px — slides up into position
const TITLE_VIGNETTE =
  "linear-gradient(to bottom, hsl(0 0% 1% / 0.85) 0%, hsl(0 0% 1% / 0.5) 50%, transparent 100%)";

// Interior image matches the last visible video frame (1920x1080)
const INTERIOR_W = 1920;
const INTERIOR_H = 1080;
function coverRect(cw: number, ch: number, iw: number, ih: number) {
  const scale = Math.max(cw / iw, ch / ih);
  const w = iw * scale;
  const h = ih * scale;
  return { x: (cw - w) / 2, y: (ch - h) / 2, w, h };
}

type Equipment = {
  _id: string;
  name: string;
  description: string;
  image?: SanityImageSource | null;
  specs?: string;
  hotspotX: number;
  hotspotY: number;
};

type VideoScrubberProps = {
  equipment: Equipment[];
};

function frameSrc(index: number): string {
  return `/canvas_video_scrubbing/frame_${String(index + 1).padStart(4, "0")}.jpg`;
}

/** Remap t from [inStart, inEnd] to [0, 1], clamped */
function remap(t: number, inStart: number, inEnd: number): number {
  return Math.max(0, Math.min(1, (t - inStart) / (inEnd - inStart)));
}

// Reusable object to avoid per-frame GC pressure
const _title = { opacity: 0, y: TITLE_Y_START };

function getTitleStyle(t: number): typeof _title {
  if (t < TITLE_IN_START) {
    _title.opacity = 0;
    _title.y = TITLE_Y_START;
  } else if (t < TITLE_IN_END) {
    const p = remap(t, TITLE_IN_START, TITLE_IN_END);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
    _title.opacity = eased;
    _title.y = TITLE_Y_START * (1 - eased);
  } else {
    _title.opacity = 1;
    _title.y = 0;
  }
  return _title;
}

export function VideoScrubber({ equipment }: VideoScrubberProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const interiorRef = useRef<HTMLDivElement>(null);
  const interiorImgRef = useRef<HTMLDivElement>(null);
  const frames = useRef<(HTMLImageElement | null)[]>(
    Array(TOTAL_FRAMES).fill(null),
  );
  const currentFrame = useRef(0);
  const raf = useRef(0);
  const scrollRaf = useRef(0);
  const hintDismissed = useRef(false);
  const hotspotsEnabled = useRef(false);

  const [phase1Ready, setPhase1Ready] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);
  const [showInterior, setShowInterior] = useState(false);
  const videoDistance = TOTAL_FRAMES * SCROLL_PER_FRAME;

  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    // Fallback to nearest loaded frame when target is still loading (Phase 2)
    let img = frames.current[index];
    if (!img) {
      for (let d = 1; d < TOTAL_FRAMES; d++) {
        if (index - d >= 0 && frames.current[index - d]) {
          img = frames.current[index - d];
          break;
        }
        if (index + d < TOTAL_FRAMES && frames.current[index + d]) {
          img = frames.current[index + d];
          break;
        }
      }
    }
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const { x, y, w, h } = coverRect(cw, ch, img.naturalWidth, img.naturalHeight);

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, w, h);
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    if (!ctxRef.current) ctxRef.current = canvas.getContext("2d");
    draw(currentFrame.current);

    const el = interiorImgRef.current;
    if (el) {
      const r = coverRect(window.innerWidth, window.innerHeight, INTERIOR_W, INTERIOR_H);
      el.style.left = `${r.x}px`;
      el.style.top = `${r.y}px`;
      el.style.width = `${r.w}px`;
      el.style.height = `${r.h}px`;
    }
  }, [draw]);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      if (!hintDismissed.current) {
        hintDismissed.current = true;
        setHintVisible(false);
      }

      const rect = wrapper.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);

      // ── Phase 1: Video frame scrubbing ──
      const videoT = Math.min(1, scrolled / videoDistance);
      const idx = Math.round(videoT * (TOTAL_FRAMES - 1));

      if (titleRef.current) {
        const { opacity, y } = getTitleStyle(videoT);
        titleRef.current.style.opacity = String(opacity);
        titleRef.current.style.transform = `translateY(${y}px)`;
      }

      // ── Interior reveal: snap overlay when scrub reaches end ──
      const shouldShow = videoT >= 0.95;
      if (shouldShow !== hotspotsEnabled.current) {
        hotspotsEnabled.current = shouldShow;
        if (!showInterior && shouldShow) setShowInterior(true);
        if (interiorRef.current) {
          interiorRef.current.style.opacity = shouldShow ? "1" : "0";
          interiorRef.current.style.pointerEvents = shouldShow
            ? "auto"
            : "none";
        }
      }

      if (idx !== currentFrame.current) {
        currentFrame.current = idx;
        cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(() => draw(idx));
      }
    });
  }, [draw, showInterior, videoDistance]);

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;

    const load = (i: number): Promise<boolean> =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          img.decode().then(
            () => {
              if (!cancelled) frames.current[i] = img;
              resolve(true);
            },
            () => {
              if (!cancelled) frames.current[i] = img;
              resolve(true);
            },
          );
        };
        img.onerror = () => resolve(false);
        img.src = frameSrc(i);
      });

    const phase1 = Array.from({ length: PHASE_1_COUNT }, (_, i) =>
      load(i).then((ok) => {
        if (ok) loaded++;
        if (!cancelled) setProgress(loaded / PHASE_1_COUNT);
      }),
    );

    Promise.all(phase1).then(() => {
      if (cancelled) return;
      setPhase1Ready(true);
      draw(0);

      const remaining = Array.from(
        { length: TOTAL_FRAMES - PHASE_1_COUNT },
        (_, i) => i + PHASE_1_COUNT,
      );
      let b = 0;
      (function nextBatch() {
        if (cancelled || b >= remaining.length) return;
        const batch = remaining.slice(b, b + BATCH_SIZE);
        b += BATCH_SIZE;
        Promise.all(batch.map(load)).then(nextBatch);
      })();
    });

    return () => {
      cancelled = true;
      frames.current.fill(null);
    };
  }, [draw]);

  // Size the interior wrapper and apply visibility when it mounts
  useLayoutEffect(() => {
    const el = interiorImgRef.current;
    if (el) {
      const r = coverRect(window.innerWidth, window.innerHeight, INTERIOR_W, INTERIOR_H);
      el.style.left = `${r.x}px`;
      el.style.top = `${r.y}px`;
      el.style.width = `${r.w}px`;
      el.style.height = `${r.h}px`;
    }
    // The scroll handler may have set opacity before the DOM existed —
    // re-apply visibility now that the interior has mounted
    if (showInterior && interiorRef.current && hotspotsEnabled.current) {
      interiorRef.current.style.opacity = "1";
      interiorRef.current.style.pointerEvents = "auto";
    }
  }, [showInterior]);

  useEffect(() => {
    if (!phase1Ready) return;
    resize();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf.current);
      cancelAnimationFrame(scrollRaf.current);
    };
  }, [phase1Ready, onScroll, resize]);

  return (
    <section id="technologie">
      <div
        ref={wrapperRef}
        className="relative bg-background"
        style={{ height: `calc(${videoDistance}px + 100vh)` }}
      >
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          {!phase1Ready && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background">
              <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/60 rounded-full transition-[width] duration-200 ease-out"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          )}

          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Studio Lumen mobile production truck showcase"
            className="block w-full h-full"
          />

          {/* Gradient vignette ensures title readability on bright video frames */}
          <div
            ref={titleRef}
            className="absolute inset-x-0 top-0 z-30 flex flex-col items-center pt-[10vh] sm:pt-[12vh] pb-[14vh] pointer-events-none will-change-transform"
            style={{
              opacity: 0,
              transform: `translateY(${TITLE_Y_START}px)`,
              background: TITLE_VIGNETTE,
            }}
          >
            <span className="label-caps text-text-muted block mb-3">
              Technologie
            </span>
            <h2
              className="font-sans text-[28px] sm:text-[35px] font-semibold text-white leading-[1.18] text-center"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
            >
              Notre studio mobile
            </h2>
          </div>

          {showInterior && (
            <div
              ref={interiorRef}
              className="absolute inset-0 z-20 overflow-hidden"
              style={{ opacity: 0, pointerEvents: "none" }}
            >
              <div
                ref={interiorImgRef}
                className="absolute"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/canvas_video_scrubbing/frame_0160.jpg"
                  alt="Arrière du studio mobile Studio Lumen"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-overlay" />
                <HotspotOverlay equipment={equipment} />
              </div>
            </div>
          )}

          <div
            className={cn(
              "absolute bottom-8 left-1/2 -translate-x-1/2 z-30",
              "text-white/40 text-sm font-sans tracking-[0.1em] uppercase",
              "transition-opacity duration-700",
              hintVisible && phase1Ready
                ? "opacity-100"
                : "opacity-0 pointer-events-none",
            )}
          >
            Scroll to explore ↓
          </div>
        </div>
      </div>
    </section>
  );
}
