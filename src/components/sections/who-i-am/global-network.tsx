"use client";

import { Globe2 } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses, type Accent } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { regions, regionsIntro } from "@/data/who-i-am";

const REGION_X = [16.5, 50, 83.5];

const ACCENT_BAR_FILL: Record<Accent, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
};

export function WhoIAmGlobalNetworkSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...regionsIntro} className="mx-auto mb-16 max-w-2xl" />

      <div className="relative mx-auto max-w-4xl">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:32px_32px] dark:opacity-[0.08]"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto mb-4 flex w-fit flex-col items-center gap-2"
        >
          <motion.span
            aria-hidden="true"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-xl"
          />
          <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow-primary">
            <Globe2 className="size-6" aria-hidden="true" />
          </span>
          <span className="text-xs font-bold whitespace-nowrap text-foreground">Ismael Ads Network</span>
        </motion.div>

        <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-4 h-24 w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="region-link" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          {REGION_X.map((x, index) => (
            <motion.line
              key={index}
              x1={50}
              y1={2}
              x2={x}
              y2={50}
              stroke="url(#region-link)"
              strokeWidth={0.3}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, delay: index * 0.15, ease: "easeOut" }}
            />
          ))}
        </svg>

        <div className="relative z-10 mt-16 grid gap-6 sm:grid-cols-3">
          {regions.map((region, index) => {
            const Icon = region.icon;
            return (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className={cn(glass.base, glass.light, "flex flex-col items-center gap-3 rounded-2xl p-6 text-center")}
              >
                <span className={cn("flex size-11 items-center justify-center rounded-2xl ring-1", accentChipClasses[region.accent])}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="font-heading text-lg font-bold text-foreground">{region.label}</p>
                <p className="text-sm text-muted-foreground">{region.description}</p>
                <div className="mt-1 flex w-full items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className={cn("h-full rounded-full", ACCENT_BAR_FILL[region.accent])}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${region.publisherShare}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <span className={cn("text-xs font-bold", accentTextClasses[region.accent])}>{region.publisherShare}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
