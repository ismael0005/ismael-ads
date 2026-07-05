"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentHoverClasses, type Accent } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { motionVariants } from "@/styles/animations";
import { webProblemIntro, webProblems } from "@/data/web-monetization";

const ACCENT_CYCLE: Accent[] = ["primary", "secondary", "accent", "primary"];

export function WebProblemSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...webProblemIntro} className="mx-auto mb-14 max-w-2xl" />

      <motion.div
        variants={motionVariants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-6 sm:grid-cols-2"
      >
        {webProblems.map((problem, index) => {
          const Icon = problem.icon;
          const accent = ACCENT_CYCLE[index % ACCENT_CYCLE.length];
          return (
            <motion.div
              key={problem.title}
              variants={motionVariants.fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                glass.base,
                glass.light,
                accentHoverClasses[accent],
                "flex items-start gap-4 rounded-2xl p-6 transition-all duration-300"
              )}
            >
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-2xl ring-1",
                  accentChipClasses[accent]
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-heading text-base font-bold text-foreground">{problem.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{problem.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
