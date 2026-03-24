import { GlassCard } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { urlFor, type SanityImageSource } from "@/sanity/image";
import { Quote } from "lucide-react";

type TestimonialsProps = {
  testimonials: Array<{
    _id: string;
    clientName: string;
    company: string;
    role?: string;
    quote: string;
    avatar?: SanityImageSource | null;
  }>;
};

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials?.length) return null;

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
            Ce que disent nos clients
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t._id} delay={i * 0.1}>
              <GlassCard className="p-6 sm:p-8 h-full flex flex-col">
                <Quote className="w-6 h-6 text-accent/40 mb-4" />
                <p className="text-sm text-white/70 italic flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  {t.avatar ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={urlFor(t.avatar).width(80).height(80).url()}
                      alt={t.clientName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : null}
                  <div>
                    <p className="text-sm font-medium text-white">
                      {t.clientName}
                    </p>
                    <p className="text-xs text-white/50">
                      {t.role ? `${t.role}, ` : ""}
                      {t.company}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
