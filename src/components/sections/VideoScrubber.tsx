"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const TOTAL_FRAMES = 169;
const PHASE_1_COUNT = 15;
const SCROLL_PER_FRAME = 10;
const BATCH_SIZE = 5;

function frameSrc(index: number): string {
  return `/canvas_video_scrubbing/frame_${String(index + 1).padStart(4, "0")}.jpg`;
}

export function VideoScrubber() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const frames = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const currentFrame = useRef(0);
  const raf = useRef(0);
  const scrollRaf = useRef(0);

  const [phase1Ready, setPhase1Ready] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);

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
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    if (!ctxRef.current) ctxRef.current = canvas.getContext("2d");
    draw(currentFrame.current);
  }, [draw]);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      if (hintVisible) setHintVisible(false);

      const rect = wrapper.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      const scrolled = Math.max(0, -rect.top);
      const t = Math.min(1, scrolled / scrollable);
      const idx = Math.round(t * (TOTAL_FRAMES - 1));

      if (idx !== currentFrame.current) {
        currentFrame.current = idx;
        cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(() => draw(idx));
      }
    });
  }, [draw, hintVisible]);

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;

    const load = (i: number): Promise<boolean> =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          img.decode().then(
            () => { if (!cancelled) frames.current[i] = img; resolve(true); },
            () => { if (!cancelled) frames.current[i] = img; resolve(true); }
          );
        };
        img.onerror = () => resolve(false);
        img.src = frameSrc(i);
      });

    const phase1 = Array.from({ length: PHASE_1_COUNT }, (_, i) =>
      load(i).then((ok) => {
        if (ok) loaded++;
        if (!cancelled) setProgress(loaded / PHASE_1_COUNT);
      })
    );

    Promise.all(phase1).then(() => {
      if (cancelled) return;
      setPhase1Ready(true);
      draw(0);

      const remaining = Array.from(
        { length: TOTAL_FRAMES - PHASE_1_COUNT },
        (_, i) => i + PHASE_1_COUNT
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

  const scrollDistance = TOTAL_FRAMES * SCROLL_PER_FRAME;

  return (
    <div
      ref={wrapperRef}
      className="relative bg-background"
      style={{ height: `calc(${scrollDistance}px + 100vh)` }}
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

        <div
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 z-10",
            "text-white/40 text-sm font-sans tracking-[0.1em] uppercase",
            "transition-opacity duration-700",
            hintVisible && phase1Ready ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          Scroll to explore ↓
        </div>
      </div>
    </div>
  );
}
