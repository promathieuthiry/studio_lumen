"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#expertise", label: "Expertise" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#technologie", label: "Technologie" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xl font-bold text-white"
          >
            Studio Lumen
          </a>

          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#reserver"
              className="hidden sm:inline-flex px-5 py-2 rounded-full bg-accent text-background text-sm font-semibold hover:bg-accent-hover transition-colors"
            >
              Réserver
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="sm:hidden p-2 text-white/70 hover:text-white"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="sm:hidden border-t border-white/5 bg-background/95 backdrop-blur-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reserver"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-lg bg-accent text-background font-semibold text-center"
            >
              Réserver
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
