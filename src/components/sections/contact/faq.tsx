"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { motionVariants } from "@/styles/animations";
import { contactFaqIntro, contactFaqs } from "@/data/contact";

export function ContactFaqSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...contactFaqIntro} className="mx-auto mb-14 max-w-2xl" />

      <motion.div
        variants={motionVariants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-2xl"
      >
        <Accordion.Root className="space-y-3">
          {contactFaqs.map((faq) => (
            <motion.div key={faq.question} variants={motionVariants.fadeInUp}>
              <Accordion.Item
                value={faq.question}
                className={cn(glass.base, glass.light, "group overflow-hidden rounded-2xl")}
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left">
                    <span className="text-sm font-semibold text-foreground">{faq.question}</span>
                    <ChevronDown
                      className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[open]:rotate-180 group-data-[open]:text-primary-text"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden px-5 text-sm text-muted-foreground transition-[height] duration-300 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
                  <p className="pb-4">{faq.answer}</p>
                </Accordion.Panel>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>
      </motion.div>
    </Section>
  );
}
