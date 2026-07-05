"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { GrowthConnector } from "@/components/sections/growth-journey/growth-connector";
import { webHowItWorksIntro, webProcessSteps } from "@/data/web-monetization";

export function WebHowItWorksSection() {
  return (
    <Section id="how-it-works" spacing="lg" className="relative scroll-mt-24 overflow-hidden">
      <SectionHeading {...webHowItWorksIntro} className="mx-auto mb-14 max-w-2xl" />

      <div
        role="region"
        aria-label="How it works steps, scroll horizontally to see all"
        tabIndex={0}
        className="-mx-4 flex snap-x snap-mandatory items-stretch justify-center gap-3 overflow-x-auto px-4 pb-4 sm:gap-4 [-ms-overflow-style:none] [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-scrollbar]:hidden"
      >
        {webProcessSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.step} className="flex items-stretch gap-3 sm:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className={cn(
                  glass.base,
                  glass.light,
                  "relative flex w-60 shrink-0 snap-center flex-col items-start gap-3 rounded-2xl px-5 pt-7 pb-5"
                )}
              >
                <span className="absolute -top-3 left-5 rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                  {String(step.step).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl ring-1",
                    accentChipClasses[step.accent]
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="font-heading text-sm font-bold text-foreground">{step.title}</p>
                <p className="text-xs leading-snug text-muted-foreground">{step.description}</p>
              </motion.div>
              {index < webProcessSteps.length - 1 && (
                <GrowthConnector accent={step.accent} delay={index * 0.15} />
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
