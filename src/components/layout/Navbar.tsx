"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#expertise", id: "expertise", label: "Expertise" },
  { href: "#portfolio", id: "portfolio", label: "Portfolio" },
  { href: "#technologie", id: "technologie", label: "Technologie" },
];

const GLASS_ACTIVE =
  "bg-white/[0.07] backdrop-blur-xl border border-white/[0.08]";
const GLASS_IDLE = "bg-white/[0.04] backdrop-blur-sm border border-transparent";

interface NavbarProps {
  logoUrl?: string;
}

export function Navbar({ logoUrl }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    for (const { id } of navLinks) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      // Hide on scroll down, show on scroll up (only after 200px)
      if (y > 200) {
        setHidden(y > lastScrollY.current && y - lastScrollY.current > 10);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const glassClasses = scrolled ? GLASS_ACTIVE : GLASS_IDLE;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-[70px] lg:h-[80px]">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`relative z-50 rounded-pill px-5 pt-2 pb-3  transition-all duration-500 ${glassClasses}`}
            >
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="Studio Lumen"
                  width={70}
                  height={31}
                  className="h-[20px] lg:h-[24px] w-auto brightness-0 invert"
                  priority
                />
              ) : (
                <span className="font-display text-[18px] lg:text-xl font-semibold text-white tracking-tight">
                  Studio Lumen
                </span>
              )}
            </Link>

            <div
              className={`hidden lg:flex items-center gap-1 rounded-pill px-2 py-1.5 transition-all duration-500 ${glassClasses}`}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-5 py-2 text-[13px] uppercase tracking-[1.4px] font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    {isActive && (
                      <span className="text-white/40 mr-1.5">//</span>
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="#reserver"
                className="hidden lg:inline-flex items-center gap-3 px-6 py-2.5 text-[13px] uppercase tracking-[1.4px] font-medium text-white border border-white/20 rounded-pill hover:bg-white hover:text-background transition-all duration-300"
              >
                Réserver
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative z-50 lg:hidden p-2 text-white/70 hover:text-white transition-colors"
                aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[45] bg-[#030303]/[0.98] backdrop-blur-xl"
          >
            <div className="container-site flex flex-col justify-center h-full">
              <nav className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 font-display text-[32px] font-semibold text-white/80 hover:text-white transition-colors duration-300"
                    >
                      <span className="text-white/30 mr-3 text-[20px]">//</span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-12"
              >
                <Link
                  href="#reserver"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-3 px-8 py-4 text-[15px] uppercase tracking-[1.4px] font-medium text-white border border-white/20 rounded-pill hover:bg-white hover:text-background transition-all duration-300"
                >
                  Réserver
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
