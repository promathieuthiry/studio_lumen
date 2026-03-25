import { Card } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
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
    <section className="section-padding">
      <div className="container-site">
        <FadeIn>
          <SectionLabel className="block text-center mb-4">
            Témoignages
          </SectionLabel>
          <h2 className="font-sans text-[30px] sm:text-[35px] font-semibold text-white mb-14 text-center leading-[1.18]">
            Ce que disent nos clients
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t._id} delay={i * 0.1}>
              <Card className="p-8 sm:p-10 h-full flex flex-col">
                <Quote className="w-6 h-6 text-accent/30 mb-5" strokeWidth={1.5} />
                <p className="font-serif italic text-text-muted text-[18px] leading-[30px] flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-border-lighter">
                  {t.avatar ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={urlFor(t.avatar).width(80).height(80).url()}
                      alt={t.clientName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : null}
                  <div>
                    <p className="font-sans text-[15px] font-medium text-white">
                      {t.clientName}
                    </p>
                    <p className="text-[13px] text-text-body">
                      {t.role ? `${t.role}, ` : ""}
                      {t.company}
                    </p>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
