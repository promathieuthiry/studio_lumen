"use client";

import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { urlFor, type SanityImageSource } from "@/sanity/image";
import { Quote, X } from "lucide-react";

type Testimonial = {
  _id: string;
  clientName: string;
  company: string;
  role?: string;
  quote: string;
  avatar?: SanityImageSource | null;
};

type TestimonialsProps = {
  testimonials: Array<Testimonial>;
};

const CARD_W = 340;
const GAP = 16;
const CARD_STEP = CARD_W + GAP;
const SPEED = 0.4;
const TRACK_H = 280;
// Click vs drag: pointer movements below this threshold are treated as clicks
const DRAG_THRESHOLD = 5;

function safeAvatarUrl(avatar: SanityImageSource | null | undefined): string | null {
  if (!avatar) return null;
  try {
    return urlFor(avatar).width(80).height(80).url();
  } catch {
    return null;
  }
}

function AuthorBlock({
  t,
  size = "sm",
}: {
  t: Testimonial;
  size?: "sm" | "md";
}) {
  const avatarCls = size === "md" ? "w-10 h-10" : "w-8 h-8";
  const initialCls = size === "md" ? "text-[14px]" : "text-[12px]";
  const nameCls = size === "md" ? "text-[15px]" : "text-[13px] leading-tight";
  const roleCls =
    size === "md" ? "text-[13px] mt-0.5" : "text-[11px] leading-tight mt-0.5";
  const pt = size === "md" ? "pt-5" : "pt-3";
  const avatarUrl = safeAvatarUrl(t.avatar);

  return (
    <div className={`flex items-center gap-3 ${pt} border-t border-white/10 shrink-0`}>
      {avatarUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={avatarUrl}
          alt={t.clientName}
          className={`${avatarCls} rounded-full object-cover ring-1 ring-white/10`}
        />
      ) : (
        <div
          className={`${avatarCls} rounded-full bg-white/10 flex items-center justify-center`}
        >
          <span className={`${initialCls} font-medium text-white/60`}>
            {t.clientName.charAt(0)}
          </span>
        </div>
      )}
      <div>
        <p className={`font-sans ${nameCls} font-medium text-white`}>
          {t.clientName}
        </p>
        <p className={`${roleCls} text-text-body`}>
          {t.role ? `${t.role}, ` : ""}
          {t.company}
        </p>
      </div>
    </div>
  );
}

function TestimonialModal({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!testimonial) return;
    // Compensate for scrollbar disappearance to prevent layout shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCloseRef.current();
    }
    document.addEventListener("keydown", handleKeyDown);

    // Focus the close button for keyboard access
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [testimonial]);

  return (
    <AnimatePresence>
      {testimonial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-8 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-white/40 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X size={18} />
            </button>

            <Quote
              className="w-6 h-6 text-accent/40 mb-4"
              strokeWidth={1.5}
            />

            <p className="font-serif italic text-text-muted text-[17px] sm:text-[18px] leading-[28px] sm:leading-[30px] mb-6">
              &ldquo;{testimonial.quote}&rdquo;
            </p>

            <AuthorBlock t={testimonial} size="md" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WrappedCard({
  t,
  baseOffset,
  scrollX,
  trackWidth,
  itemIndex,
}: {
  t: Testimonial;
  baseOffset: number;
  scrollX: MotionValue<number>;
  trackWidth: number;
  itemIndex: number;
}) {
  // Wrap position into [0, trackWidth) via double-modulo, then shift the
  // rightmost card to a negative position so the loop appears seamless
  const x = useTransform(scrollX, (val) => {
    let pos = ((baseOffset + val) % trackWidth + trackWidth) % trackWidth;
    if (pos > trackWidth - CARD_STEP) pos -= trackWidth;
    return pos;
  });

  return (
    <motion.div
      className="absolute top-0 bottom-0"
      style={{ x, width: CARD_W }}
      data-testimonial-index={itemIndex}
    >
      <div className="group relative isolate bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 flex flex-col h-full select-none cursor-pointer">
        <div className="absolute inset-0 rounded-lg bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

        <Quote
          className="w-5 h-5 text-accent/40 mb-3 shrink-0"
          strokeWidth={1.5}
        />

        <p className="font-serif italic text-text-muted text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] flex-1 mb-4 line-clamp-5">
          &ldquo;{t.quote}&rdquo;
        </p>

        <AuthorBlock t={t} />
      </div>
    </motion.div>
  );
}

function ScrollTrack({
  items,
  onSelect,
}: {
  items: Testimonial[];
  onSelect: (t: Testimonial) => void;
}) {
  const scrollX = useMotionValue(0);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const dragOrigin = useRef({ px: 0, val: 0 });
  const hasDragged = useRef(false);
  const pointerTarget = useRef<EventTarget | null>(null);

  // Ensure enough clones to fill wide viewports without visible gaps
  const { repeated, trackWidth } = useMemo(() => {
    if (!items.length) return { repeated: [] as Testimonial[], trackWidth: 0 };
    const repeats = Math.max(3, Math.ceil(10 / items.length));
    const r = Array.from({ length: repeats }, () => items).flat();
    return { repeated: r, trackWidth: r.length * CARD_STEP };
  }, [items]);

  useAnimationFrame(() => {
    if (isDragging.current || isHovered.current) return;
    scrollX.set(scrollX.get() - SPEED);
  });

  function onPointerDown(e: React.PointerEvent) {
    isDragging.current = true;
    hasDragged.current = false;
    pointerTarget.current = e.target;
    dragOrigin.current = { px: e.clientX, val: scrollX.get() };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Pointer already released or element detached — abort drag to avoid stuck state
      isDragging.current = false;
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging.current) return;
    const delta = e.clientX - dragOrigin.current.px;
    if (Math.abs(delta) > DRAG_THRESHOLD) hasDragged.current = true;
    scrollX.set(dragOrigin.current.val + delta);
  }

  function onPointerUp() {
    isDragging.current = false;
    if (!hasDragged.current && pointerTarget.current) {
      const el =
        pointerTarget.current instanceof Element
          ? pointerTarget.current.closest("[data-testimonial-index]")
          : null;
      if (el) {
        const idx = Number(el.getAttribute("data-testimonial-index"));
        if (Number.isInteger(idx) && idx >= 0 && idx < items.length) {
          onSelect(items[idx]);
        }
      }
    }
    pointerTarget.current = null;
  }

  function onPointerCancel() {
    isDragging.current = false;
    hasDragged.current = false;
    pointerTarget.current = null;
  }

  if (!repeated.length) return null;

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: TRACK_H }}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent" />

      <div
        className="relative h-full cursor-grab active:cursor-grabbing select-none touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {repeated.map((t, i) => (
          <WrappedCard
            key={`${t._id}-${i}`}
            t={t}
            baseOffset={i * CARD_STEP}
            scrollX={scrollX}
            trackWidth={trackWidth}
            itemIndex={i % items.length}
          />
        ))}
      </div>
    </div>
  );
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const handleClose = useCallback(() => setSelected(null), []);

  if (!testimonials?.length) return null;

  return (
    <section className="section-padding overflow-hidden border-t border-border-lighter">
      <div className="container-site mb-8 sm:mb-10">
        <FadeIn>
          <SectionLabel className="block text-center mb-3">
            Témoignages
          </SectionLabel>
          <h2 className="font-sans text-[24px] sm:text-[30px] font-semibold text-white text-center leading-[1.18]">
            Ce que disent nos clients
          </h2>
        </FadeIn>
      </div>

      <FadeIn>
        <ScrollTrack items={testimonials} onSelect={setSelected} />
      </FadeIn>

      <TestimonialModal testimonial={selected} onClose={handleClose} />
    </section>
  );
}
