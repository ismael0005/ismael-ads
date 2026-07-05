"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { GrowthConnector } from "@/components/sections/growth-journey/growth-connector";
import { motionVariants } from "@/styles/animations";
import { missionProblemsIntro, problemSolutionPairs } from "@/data/my-mission";

export function MissionProblemsSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...missionProblemsIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className="mx-auto max-w-4xl">
        <div className="mb-4 hidden grid-cols-[1fr_3rem_1fr] gap-4 sm:grid">
          <p className="text-center text-xs font-bold tracking-wide text-muted-foreground uppercase">The Problem</p>
          <span aria-hidden="true" />
          <p className="text-center text-xs font-bold tracking-wide text-muted-foreground uppercase">The Solution</p>
        </div>

        <motion.div
          variants={motionVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-4"
        >
          {problemSolutionPairs.map((pair) => {
            const ProblemIcon = pair.problemIcon;
            const SolutionIcon = pair.solutionIcon;
            return (
              <motion.div
                key={pair.id}
                variants={motionVariants.fadeInUp}
                className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_3rem_1fr] sm:gap-4"
              >
                <div className={cn(glass.base, "flex items-center gap-3 rounded-2xl p-4 grayscale sm:p-5")}>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-foreground/[0.06] text-muted-foreground">
                    <ProblemIcon className="size-4" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-semibold text-muted-foreground">{pair.problemLabel}</p>
                </div>

                <div className="mx-auto hidden rotate-0 sm:block">
                  <GrowthConnector accent={pair.accent} />
                </div>

                <div className={cn(glass.base, glass.light, "flex items-center justify-between gap-3 rounded-2xl p-4 sm:p-5")}>
                  <div className="flex items-center gap-3">
                    <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl ring-1", accentChipClasses[pair.accent])}>
                      <SolutionIcon className="size-4" aria-hidden="true" />
                    </span>
                    <p className="text-sm font-semibold text-foreground">{pair.solutionLabel}</p>
                  </div>
                  <span className={cn("shrink-0 text-xs font-bold whitespace-nowrap", accentTextClasses[pair.accent])}>
                    {pair.metric}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}
