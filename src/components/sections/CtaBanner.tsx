import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";

type CtaBannerProps = {
  ctaText: string;
  ctaUrl: string;
};

export function CtaBanner({ ctaText, ctaUrl }: CtaBannerProps) {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background-light to-background border border-white/10 p-8 sm:p-12 lg:p-16 text-center">
            <div className="absolute inset-0 bg-accent/5" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Prêt à créer du contenu qui marque ?
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-8">
                Réservez un appel découverte gratuit et discutons de votre
                projet.
              </p>
              <a
                href={ctaUrl}
                className="inline-flex px-8 py-3.5 rounded-full bg-accent text-background font-semibold text-lg hover:bg-accent-hover transition-colors"
              >
                {ctaText}
              </a>
              <div className="mt-6">
                <Link
                  href="/a-propos"
                  className="text-sm text-white/50 hover:text-accent transition-colors"
                >
                  Qui est derrière Studio Lumen ?
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
