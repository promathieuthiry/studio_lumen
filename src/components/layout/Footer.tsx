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
    <footer className="border-t border-white/5 bg-background-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Studio Lumen</h3>
            <p className="text-white/60 text-sm">
              Merci de votre visite. Prêt à donner vie à vos idées ?
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/a-propos"
              className="block text-sm text-white/60 hover:text-accent transition-colors"
            >
              Découvrir mon parcours
            </Link>
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="block text-sm text-white/60 hover:text-accent transition-colors"
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
                className="block text-sm text-white/60 hover:text-accent transition-colors"
              >
                {link.platform}
              </a>
            ))}
          </div>

          <div className="space-y-3">
            <Link
              href="/mentions-legales"
              className="block text-sm text-white/60 hover:text-accent transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="block text-sm text-white/60 hover:text-accent transition-colors"
            >
              Politique de confidentialité
            </Link>
            <CookieSettingsButton />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Studio Lumen. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
