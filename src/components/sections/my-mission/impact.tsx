"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Sparkline } from "@/components/dashboard/sparkline";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { motionVariants } from "@/styles/animations";
import { missionImpactIntro, missionImpactStats } from "@/data/my-mission";

export function MissionImpactSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.88, 1, 0.88] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className={cn(glass.base, glass.light, "absolute top-6 right-4 hidden items-center gap-2 rounded-full px-3 py-1.5 sm:flex")}
      >
        <Zap className="size-3.5 text-accent-text" aria-hidden="true" />
        <span className="text-xs font-semibold text-muted-foreground">Live Optimization</span>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.88, 1, 0.88] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className={cn(glass.base, glass.light, "absolute bottom-6 left-4 hidden items-center gap-2 rounded-full px-3 py-1.5 sm:flex")}
      >
        <Sparkles className="size-3.5 text-primary-text" aria-hidden="true" />
        <span className="text-xs font-semibold text-muted-foreground">Publisher-First, Always</span>
      </motion.div>

      <SectionHeading {...missionImpactIntro} className="mx-auto mb-14 max-w-2xl" />

      <motion.div
        variants={motionVariants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-5"
      >
        {missionImpactStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              variants={motionVariants.fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={cn(glass.base, glass.light, "flex flex-col rounded-2xl p-5")}
            >
              <span className={cn("flex size-10 items-center justify-center rounded-xl ring-1", accentChipClasses[stat.accent])}>
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-4 font-heading text-3xl font-black text-foreground">
                {stat.staticValue ?? (
                  <AnimatedCounter value={stat.numericValue ?? 0} prefix={stat.prefix} suffix={stat.suffix} />
                )}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              <Sparkline trend={stat.trend} accent={stat.accent} className="mt-4 h-10" />
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
