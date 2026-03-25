"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import * as LucideIcons from "lucide-react";
import { ChevronDown, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, unknown>;
  const candidate = icons[name];
  if (typeof candidate !== "function") {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[Services] Icon "${name}" not found — falling back to Briefcase. Check Sanity icon name (PascalCase).`
      );
    }
    return LucideIcons.Briefcase;
  }
  return candidate as LucideIcon;
}

type Service = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  deliverables?: string[];
  turnaround?: string;
};

type ServicesProps = {
  services: Array<Service>;
};

const expandTransition = {
  height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  opacity: { duration: 0.2, delay: 0.1 },
};

const collapseTransition = {
  height: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  opacity: { duration: 0.15 },
};

type ServiceItemProps = {
  service: Service;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

function ServiceItem({ service, index, isOpen, onToggle }: ServiceItemProps) {
  const Icon = getIcon(service.icon);
  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      className={
        "border-b border-border-lighter transition-colors duration-300" +
        (isOpen ? " bg-white/[0.02]" : "")
      }
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`panel-${service._id}`}
        className="group flex w-full items-center gap-4 sm:gap-6 py-6 sm:py-8 px-2 sm:px-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
      >
        <span className="hidden sm:block label-caps text-text-muted text-[14px] w-8 shrink-0">
          {number}
        </span>

        <Icon className="w-6 h-6 text-accent shrink-0" strokeWidth={1.5} />

        <h3
          id={`heading-${service._id}`}
          className="font-sans text-[20px] sm:text-[24px] md:text-[28px] font-medium text-white leading-tight flex-1 transition-colors duration-300 group-hover:text-accent"
        >
          {service.title}
        </h3>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown
            className="w-5 h-5 text-text-muted transition-colors duration-300 group-hover:text-white"
            strokeWidth={1.5}
          />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`panel-${service._id}`}
            role="region"
            aria-labelledby={`heading-${service._id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: expandTransition,
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: collapseTransition,
            }}
            className="overflow-hidden"
          >
            <div className="pb-8 sm:pb-10 pl-12 sm:pl-[4.5rem] md:pl-[5rem] pr-4 sm:pr-12">
              <p className="text-text-body text-[16px] leading-[26px] max-w-2xl mb-6">
                {service.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12">
                {service.deliverables && service.deliverables.length > 0 && (
                  <ul className="space-y-2.5">
                    {service.deliverables.map((d, idx) => (
                      <li
                        key={`${d}-${idx}`}
                        className="text-[14px] text-text-muted flex items-start gap-2.5"
                      >
                        <span className="text-accent mt-0.5 text-[10px]">
                          ●
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                )}

                {service.turnaround && (
                  <div className="flex items-center gap-2">
                    <Clock
                      className="w-4 h-4 text-accent"
                      strokeWidth={1.5}
                    />
                    <span className="text-[13px] text-text-body">
                      {service.turnaround}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Services({ services }: ServicesProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (services.length === 0) return null;

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

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

        <div className="border-t border-border-lighter">
          {services.map((service, i) => (
            <FadeIn key={service._id} delay={i * 0.08}>
              <ServiceItem
                service={service}
                index={i}
                isOpen={openId === service._id}
                onToggle={() => toggle(service._id)}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
