"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { motionVariants } from "@/styles/animations";
import { eligibleItems, notEligibleItems, whoCanJoinIntro } from "@/data/eligibility-checker";

export function EligibilityWhoCanJoinSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...whoCanJoinIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
        <div className={cn(glass.base, glass.light, "relative overflow-hidden rounded-3xl p-6 sm:p-8")}>
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-16 -z-10 size-64 rounded-full bg-emerald-500/20 opacity-60 blur-3xl"
          />
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
              <CheckCircle2 className="size-4.5" aria-hidden="true" />
            </span>
            <p className="font-heading text-lg font-bold text-foreground">Eligible</p>
          </div>

          <motion.div
            variants={motionVariants.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-6 space-y-2.5"
          >
            {eligibleItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={motionVariants.fadeInUp}
                  className="flex items-center gap-3 rounded-xl bg-emerald-500/5 px-4 py-3 ring-1 ring-emerald-500/15"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className={cn(glass.base, glass.light, "relative overflow-hidden rounded-3xl p-6 sm:p-8")}>
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-16 -z-10 size-64 rounded-full bg-destructive/20 opacity-60 blur-3xl"
          />
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive ring-1 ring-destructive/20">
              <XCircle className="size-4.5" aria-hidden="true" />
            </span>
            <p className="font-heading text-lg font-bold text-foreground">Not Eligible (Yet)</p>
          </div>

          <motion.div
            variants={motionVariants.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-6 space-y-2.5"
          >
            {notEligibleItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={motionVariants.fadeInUp}
                  className="flex items-center gap-3 rounded-xl bg-destructive/5 px-4 py-3 ring-1 ring-destructive/15"
                >
                  <XCircle className="size-4 shrink-0 text-destructive" aria-hidden="true" />
                  <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
