"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { GrowthConnector } from "@/components/sections/growth-journey/growth-connector";
import { processIntro, processSteps } from "@/data/who-i-am";

export function WhoIAmProcessSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...processIntro} className="mx-auto mb-16 max-w-2xl" />

      <div
        role="region"
        aria-label="Working process steps, scroll horizontally to see all"
        tabIndex={0}
        className="-mx-4 flex snap-x snap-mandatory items-start justify-center gap-1 overflow-x-auto px-4 pb-4 sm:gap-2 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-scrollbar]:hidden"
      >
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="flex items-start gap-1 sm:gap-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex w-32 shrink-0 snap-center flex-col items-center gap-3 text-center sm:w-40"
              >
                <span
                  className={cn(
                    glass.base,
                    glass.light,
                    "flex size-14 items-center justify-center rounded-2xl ring-1",
                    accentChipClasses[step.accent]
                  )}
                >
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <p className="font-heading text-sm font-bold text-foreground">{step.label}</p>
                <p className="text-xs leading-snug text-muted-foreground">{step.description}</p>
              </motion.div>
              {index < processSteps.length - 1 && (
                <div className="pt-6">
                  <GrowthConnector accent={step.accent} delay={index * 0.15} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
