import Link from "next/link";
import { CookieSettingsButton } from "./CookieSettingsButton";

export function Footer({
  contactEmail,
  socialLinks,
}: {
  contactEmail?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
}) {
  return (
    <footer className="bg-background border-t border-border-warm">
      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-display text-xl font-semibold text-white mb-3">
              Studio Lumen
            </h3>
            <p className="text-text-body text-[16px] leading-[26px]">
              Premier studio de production vidéo mobile en France. Contenu livré
              en 48h.
            </p>
          </div>

          {/* Column 2: Navigation + contact */}
          <div className="space-y-3">
            <Link
              href="/a-propos"
              className="block text-[15px] text-text-muted hover:text-white transition-colors duration-300"
            >
              Découvrir mon parcours
            </Link>
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="block text-[15px] text-text-muted hover:text-white transition-colors duration-300"
              >
                {contactEmail}
              </a>
            )}
            {socialLinks?.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[15px] text-text-muted hover:text-white transition-colors duration-300"
              >
                {link.platform}
              </a>
            ))}
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-3">
            <Link
              href="/mentions-legales"
              className="block text-[15px] text-text-muted hover:text-white transition-colors duration-300"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="block text-[15px] text-text-muted hover:text-white transition-colors duration-300"
            >
              Politique de confidentialité
            </Link>
            <CookieSettingsButton />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border-warm text-center">
          <p className="text-[13px] text-text-body">
            &copy; {new Date().getFullYear()} Studio Lumen. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
