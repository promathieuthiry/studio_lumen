import { CinematicBrand } from "./CinematicBrand";
import { FooterNavGrid } from "./FooterNavGrid";

export function Footer({
  contactEmail,
  socialLinks,
  logoUrl,
}: {
  contactEmail?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
  logoUrl?: string;
}) {
  return (
    <footer className="relative z-10 bg-background overflow-hidden border-t border-border-warm">
      {/* ─── Upper Section: Navigation Grid ─── */}
      <FooterNavGrid
        contactEmail={contactEmail}
        socialLinks={socialLinks}
        logoUrl={logoUrl}
      />

      {/* ─── Divider ─── */}
      <div className="container-site">
        <div className="border-t border-border-warm" />
      </div>

      {/* ─── Cinematic Section ─── */}
      <CinematicBrand />

      {/* ─── Copyright ─── */}
      <div className="relative z-10 mt-8 pb-10 text-center">
        <p className="text-[13px] text-text-body">
          &copy; {new Date().getFullYear()} Studio Lumen. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
