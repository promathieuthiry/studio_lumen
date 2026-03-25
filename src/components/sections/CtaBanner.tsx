import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

type CtaBannerProps = {
  ctaText: string;
  ctaUrl: string;
};

export function CtaBanner({ ctaText, ctaUrl }: CtaBannerProps) {
  return (
    <section className="section-padding">
      <div className="container-site">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[25px] border border-border-lighter p-10 sm:p-16 lg:p-20 text-center">
            {/* Decorative blur blob */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5"
              style={{ filter: "blur(100px)" }}
            />
            <div className="relative z-10">
              <h2 className="font-sans text-[30px] sm:text-[35px] font-semibold text-white mb-5 leading-[1.18]">
                Prêt à créer du contenu qui marque ?
              </h2>
              <p className="text-text-body text-[16px] leading-[26px] max-w-xl mx-auto mb-10">
                Réservez un appel découverte gratuit et discutons de votre
                projet.
              </p>
              <Button href={ctaUrl} variant="primary">
                {ctaText}
              </Button>
              <div className="mt-8">
                <Link
                  href="/a-propos"
                  className="text-[14px] text-text-muted hover:text-white transition-colors duration-300"
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
