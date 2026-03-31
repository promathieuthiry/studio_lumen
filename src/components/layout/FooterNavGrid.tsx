"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CookieSettingsButton } from "./CookieSettingsButton";

const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: EASE_SMOOTH },
  }),
};

const lineReveal = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.2, ease: EASE_SMOOTH },
  },
};

const glowStyle = {
  background: "radial-gradient(circle, white 0%, transparent 70%)",
  filter: "blur(80px)",
} as const;

const headingStyle = {
  fontSize: "clamp(32px, 4vw, 55px)",
} as const;

const linkClass =
  "block label-caps text-text-muted hover:text-white transition-colors duration-300";

export function FooterNavGrid({
  contactEmail,
  socialLinks,
  logoUrl,
}: {
  contactEmail?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
  logoUrl?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative container-site py-20 md:py-28">
      {/* Ambient glow behind brand column */}
      <div
        className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full opacity-[0.06]"
        style={glowStyle}
      />

      <motion.div
        className="relative grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-12 lg:gap-0 items-start"
        initial={reducedMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* ─── Left: Brand ─── */}
        <motion.div custom={0} variants={fadeUp} className="lg:pr-16 xl:pr-24">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="Studio Lumen"
              width={400}
              height={400}
              className="w-[clamp(200px,30vw,340px)] h-auto brightness-0 invert mb-4 sm:-ml-3 -ml-2"
            />
          ) : (
            <h3
              className="font-display font-semibold text-white leading-[1.0] mb-4"
              style={headingStyle}
            >
              Studio Lumen
            </h3>
          )}
          <p className="font-serif italic text-text-muted text-[18px] leading-[30px] max-w-[400px]">
            Premier studio de production vidéo mobile en France. Contenu livré
            en&nbsp;48h.
          </p>

          {/* Contact + Social — inline row beneath tagline */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            {contactEmail && (
              <a href={`mailto:${contactEmail}`} className={linkClass}>
                {contactEmail}
              </a>
            )}
            {socialLinks?.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {link.platform}
              </a>
            ))}
          </div>
        </motion.div>

        {/* ─── Vertical Accent Line ─── */}
        <motion.div
          custom={1}
          variants={lineReveal}
          className="hidden lg:block w-px self-stretch origin-top bg-border-warm"
        />

        {/* ─── Right: Nav + Legal ─── */}
        <motion.div
          custom={2}
          variants={fadeUp}
          className="lg:pl-16 xl:pl-24 grid grid-cols-2 gap-10"
        >
          {/* Navigation */}
          <div>
            <span className="block text-[11px] font-medium uppercase tracking-[2px] text-text-body mb-5">
              Navigation
            </span>
            <div className="space-y-4">
              <Link href="/a-propos" className={linkClass}>
                À propos
              </Link>
              <Link href="/#services" className={linkClass}>
                Services
              </Link>
              <Link href="/#portfolio" className={linkClass}>
                Portfolio
              </Link>
              <Link href="/#booking" className={linkClass}>
                Contact
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <span className="block text-[11px] font-medium uppercase tracking-[2px] text-text-body mb-5">
              Légal
            </span>
            <div className="space-y-4">
              <Link href="/mentions-legales" className={linkClass}>
                Mentions légales
              </Link>
              <Link href="/politique-de-confidentialite" className={linkClass}>
                Confidentialité
              </Link>
              <CookieSettingsButton />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
