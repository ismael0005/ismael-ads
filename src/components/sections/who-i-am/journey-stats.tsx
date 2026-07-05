"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { motionVariants } from "@/styles/animations";
import { journeyStats, journeyStatsIntro } from "@/data/who-i-am";

export function WhoIAmJourneyStatsSection() {
  return (
    <Section spacing="md" className="relative overflow-hidden">
      <SectionHeading {...journeyStatsIntro} className="mx-auto mb-12 max-w-2xl" />

      <motion.div
        variants={motionVariants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className={cn(
          glass.base,
          glass.light,
          "mx-auto flex max-w-5xl flex-col items-center gap-8 rounded-3xl px-6 py-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 sm:px-10"
        )}
      >
        {journeyStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Fragment key={stat.label}>
              {index > 0 && (
                <span aria-hidden="true" className="hidden h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent sm:block" />
              )}
              <motion.div
                variants={motionVariants.fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex cursor-default items-center gap-3 rounded-xl px-2 py-1 transition-colors duration-200 hover:bg-foreground/[0.03]"
              >
                <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl ring-1", accentChipClasses[stat.accent])}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                    {stat.staticValue ?? (
                      <AnimatedCounter value={stat.numericValue ?? 0} prefix={stat.prefix} suffix={stat.suffix} />
                    )}
                  </p>
                  <p className="text-sm whitespace-nowrap text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            </Fragment>
          );
        })}
      </motion.div>
    </Section>
  );
}
