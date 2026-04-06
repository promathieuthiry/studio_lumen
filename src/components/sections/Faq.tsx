"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  _id: string;
  question: string;
  answer: string;
};

type FaqProps = {
  faqs: Array<FaqItem>;
};

const expandTransition = {
  height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  opacity: { duration: 0.2, delay: 0.1 },
};

const collapseTransition = {
  height: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  opacity: { duration: 0.15 },
};

type FaqItemProps = {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqAccordionItem({ item, index, isOpen, onToggle }: FaqItemProps) {
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
        aria-controls={`faq-panel-${item._id}`}
        className="group flex w-full items-center gap-4 sm:gap-6 py-6 sm:py-8 px-2 sm:px-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
      >
        <span className="hidden sm:block label-caps text-text-muted text-[14px] w-8 shrink-0">
          {number}
        </span>

        <h3
          id={`faq-heading-${item._id}`}
          className="font-sans text-[18px] sm:text-[22px] md:text-[26px] font-medium text-white leading-tight flex-1 transition-colors duration-300 group-hover:text-accent"
        >
          {item.question}
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
            id={`faq-panel-${item._id}`}
            role="region"
            aria-labelledby={`faq-heading-${item._id}`}
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
            <div className="pb-8 sm:pb-10 pl-8 sm:pl-[4.5rem] md:pl-[5rem] pr-4 sm:pr-12">
              <p className="text-text-body text-[16px] leading-[26px] max-w-2xl">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq({ faqs }: FaqProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (faqs.length === 0) return null;

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section id="faq" className="section-padding border-t border-border-lighter bg-background-elevated">
      <div className="container-site">
        <FadeIn>
          <SectionLabel className="block text-center mb-4">
            FAQ
          </SectionLabel>
          <h2 className="font-sans text-[30px] sm:text-[35px] font-semibold text-white mb-4 text-center leading-[1.18]">
            Questions fréquentes
          </h2>
          <p className="text-text-body text-[16px] leading-[26px] text-center max-w-2xl mx-auto mb-14">
            Tout ce que vous devez savoir avant de travailler avec nous.
          </p>
        </FadeIn>

        <div className="border-t border-border-lighter">
          {faqs.map((item, i) => (
            <FadeIn key={item._id} delay={Math.min(i * 0.08, 0.4)}>
              <FaqAccordionItem
                item={item}
                index={i}
                isOpen={openId === item._id}
                onToggle={() => toggle(item._id)}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
