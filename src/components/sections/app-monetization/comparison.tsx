"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/section-heading";
import { motionVariants } from "@/styles/animations";
import {
  appComparisonBroken,
  appComparisonIntro,
  appComparisonOptimized,
} from "@/data/app-monetization";

const CROSSING_PACKETS = [0, 1, 2, 3];

export function AppComparisonSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...appComparisonIntro} className="mx-auto mb-14 max-w-2xl" />

      <div
        className={cn(
          glass.base,
          glass.light,
          "relative mx-auto grid max-w-5xl overflow-hidden rounded-3xl lg:grid-cols-2"
        )}
      >
        {/* Center divider + transformation packets, lg only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-8 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent lg:block"
        />
        {CROSSING_PACKETS.map((i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ x: [-28, 28], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 1.2,
              delay: i * 1.1,
              ease: "easeInOut",
            }}
            style={{ top: `${18 + i * 20}%` }}
            className="pointer-events-none absolute left-1/2 z-10 hidden -translate-x-1/2 lg:block"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow-primary">
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
          </motion.div>
        ))}

        <motion.div
          variants={motionVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="p-8 lg:pr-14 lg:pb-8"
        >
          <Badge variant="outline" className="border-destructive/30 text-destructive">
            Without Ismael Ads
          </Badge>
          <div className="mt-6 space-y-3">
            {appComparisonBroken.map((point) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.label}
                  variants={motionVariants.fadeInUp}
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 rounded-2xl bg-destructive/5 px-4 py-3 ring-1 ring-destructive/15"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive ring-1 ring-destructive/20">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-foreground/80">{point.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          variants={motionVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="border-t border-border/60 p-8 lg:border-t-0 lg:border-l lg:border-border/60 lg:pt-8 lg:pl-14"
        >
          <Badge variant="outline" className="border-primary/30 text-primary-text">
            With Ismael Ads
          </Badge>
          <div className="mt-6 space-y-3">
            {appComparisonOptimized.map((point) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.label}
                  variants={motionVariants.fadeInUp}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 rounded-2xl bg-primary/5 px-4 py-3 ring-1 ring-primary/15"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-text ring-1 ring-primary/20">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-foreground">{point.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
