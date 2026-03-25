import { Card } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
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
    <section id="expertise" className="section-padding">
      <div className="container-site">
        <FadeIn>
          <SectionLabel className="block text-center mb-4">
            Services
          </SectionLabel>
          <h2 className="font-sans text-[30px] sm:text-[35px] font-semibold text-white mb-4 text-center leading-[1.18]">
            Notre expertise
          </h2>
          <p className="text-text-body text-[16px] leading-[26px] text-center max-w-2xl mx-auto mb-14">
            Des prestations sur mesure pour tous vos besoins en production vidéo
            mobile.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <FadeIn key={service._id} delay={i * 0.1}>
                <Card className="p-8 sm:p-10 h-full flex flex-col">
                  <Icon className="w-7 h-7 text-accent mb-5" strokeWidth={1.5} />
                  <h3 className="font-sans text-[20px] font-medium text-white mb-3 leading-[28px]">
                    {service.title}
                  </h3>
                  <p className="text-text-body text-[16px] leading-[26px] mb-5 flex-1">
                    {service.description}
                  </p>
                  {service.deliverables && service.deliverables.length > 0 && (
                    <ul className="space-y-2 mb-5">
                      {service.deliverables.map((d) => (
                        <li
                          key={d}
                          className="text-[14px] text-text-muted flex items-start gap-2"
                        >
                          <span className="text-accent mt-0.5">•</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center justify-between pt-5 border-t border-border-lighter">
                    <span className="label-caps text-accent">
                      Sur devis
                    </span>
                    {service.turnaround && (
                      <span className="text-[13px] text-text-body">
                        {service.turnaround}
                      </span>
                    )}
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
