"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "#expertise", label: "Expertise" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#technologie", label: "Technologie" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border-lighter"
          : "bg-transparent"
      }`}
    >
      <div className="container-site">
        <div className="flex items-center justify-between" style={{ lineHeight: "70px" }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-display text-xl font-semibold text-white"
          >
            Studio Lumen
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-5 py-2 text-[15px] text-white hover:text-text-muted transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#reserver"
              className="hidden md:inline-flex items-center px-[calc(1.333em+2px)] py-[calc(.667em+2px)] rounded-pill bg-white text-text-dark text-[15px] font-medium hover:bg-background hover:text-white transition-colors duration-300"
            >
              Réserver
              <ArrowRight className="ml-[17px] w-4 h-4" />
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border-lighter bg-background/95 backdrop-blur-lg">
          <div className="container-site py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-white/70 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reserver"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 mt-2 rounded-pill bg-white text-text-dark font-medium text-center"
            >
              Réserver
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
