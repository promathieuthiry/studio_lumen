import { GlassCard } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/ui/FadeIn";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] || LucideIcons.Briefcase;
}

type ServicesProps = {
  services: Array<{
    _id: string;
    title: string;
    description: string;
    icon: string;
    deliverables?: string[];
    turnaround?: string;
  }>;
};

export function Services({ services }: ServicesProps) {
  if (!services?.length) return null;

  return (
    <section id="expertise" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
            Notre expertise
          </h2>
          <p className="text-white/60 text-center max-w-2xl mx-auto mb-12">
            Des prestations sur mesure pour tous vos besoins en production vidéo
            mobile.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <FadeIn key={service._id} delay={i * 0.1}>
                <GlassCard className="p-6 sm:p-8 h-full flex flex-col">
                  <Icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-4 flex-1">
                    {service.description}
                  </p>
                  {service.deliverables && service.deliverables.length > 0 && (
                    <ul className="space-y-1.5 mb-4">
                      {service.deliverables.map((d) => (
                        <li
                          key={d}
                          className="text-xs text-white/50 flex items-start gap-2"
                        >
                          <span className="text-accent mt-0.5">•</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-accent font-medium">
                      Sur devis
                    </span>
                    {service.turnaround && (
                      <span className="text-xs text-white/40">
                        {service.turnaround}
                      </span>
                    )}
                  </div>
                </GlassCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
