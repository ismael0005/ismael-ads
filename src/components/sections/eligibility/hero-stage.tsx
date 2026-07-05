"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { HeroWidgetChip } from "@/components/ui/hero-widget-chip";
import { motionVariants } from "@/styles/animations";
import { eligibilityHeroWidgets, heroChecklist, heroScore } from "@/data/eligibility-checker";

const ACCENT_VAR: Record<string, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
};

function ScoreRing({ score }: { score: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative flex size-24 shrink-0 items-center justify-center sm:size-28">
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="7" className="stroke-muted" />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          className="stroke-primary"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference * (1 - score / 100) }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <p className="font-heading text-xl font-bold text-foreground sm:text-2xl">
        <AnimatedCounter value={score} suffix="%" />
      </p>
    </div>
  );
}

function HoloBrowser() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/25 via-transparent to-accent/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-background/90 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/30 px-4 py-2.5">
          <span className="size-2 rounded-full bg-red-400/70" />
          <span className="size-2 rounded-full bg-amber-400/70" />
          <span className="size-2 rounded-full bg-green-400/70" />
          <div className="ml-2 flex-1 truncate rounded-full bg-background px-3 py-1 text-[9px] text-muted-foreground">
            ismaelads.com/eligibility
          </div>
        </div>

        {/* Scan line sweep */}
        <motion.div
          aria-hidden="true"
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute inset-x-0 top-11 h-16 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
        />

        <div className="relative p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <ScoreRing score={heroScore} />
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Eligibility Score</p>
              <p className="mt-0.5 font-heading text-sm font-bold text-primary-text">Ready for review</p>
            </div>
          </div>

          <motion.div
            variants={motionVariants.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-5 grid grid-cols-2 gap-2"
          >
            {heroChecklist.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={motionVariants.fadeInUp}
                  className="flex items-center gap-1.5 rounded-lg bg-foreground/[0.03] px-2.5 py-1.5"
                >
                  <Icon className="size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate text-[10px] font-medium text-foreground">{item.label}</span>
                  <CheckCircle2 className="size-3.5 shrink-0 text-primary-text" aria-hidden="true" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function EligibilityHeroStage() {
  return (
    <div className="relative w-full">
      {/* Desktop: browser + scattered widgets connected by glowing lines */}
      <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-lg lg:block lg:max-w-xl">
        <motion.div
          animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[130px] mix-blend-multiply dark:mix-blend-screen"
        />

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="elig-hero-link" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.45} />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          {eligibilityHeroWidgets.map((widget) => {
            const path = `M 50 48 Q ${(50 + widget.x) / 2} ${(48 + widget.y) / 2} ${widget.x} ${widget.y}`;
            return (
              <g key={widget.id}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="url(#elig-hero-link)"
                  strokeWidth={0.18}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: widget.delay, ease: "easeOut" }}
                />
                <motion.path
                  d={path}
                  fill="none"
                  stroke={ACCENT_VAR[widget.accent]}
                  strokeWidth={0.4}
                  strokeLinecap="round"
                  strokeDasharray="1.4 18"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.75, strokeDashoffset: [0, -200] }}
                  transition={{
                    opacity: { duration: 0.4, delay: widget.delay + 0.8 },
                    strokeDashoffset: { duration: 4 + widget.depth * 2, repeat: Infinity, ease: "linear", delay: widget.delay + 0.9 },
                  }}
                />
              </g>
            );
          })}
        </svg>

        <div className="absolute top-[48%] left-1/2 w-[72%] -translate-x-1/2 -translate-y-1/2">
          <HoloBrowser />
        </div>

        {eligibilityHeroWidgets.map((widget) => (
          <HeroWidgetChip key={widget.id} widget={widget} />
        ))}
      </div>

      {/* Tablet / mobile: browser only */}
      <div className="relative mx-auto w-full max-w-sm lg:hidden">
        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[90px] mix-blend-multiply dark:mix-blend-screen"
        />
        <HoloBrowser />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:hidden">
        {eligibilityHeroWidgets
          .filter((widget) => widget.compact)
          .map((widget) => {
            const Icon = widget.icon;
            return (
              <div key={widget.id} className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-full px-3 py-1.5")}>
                <Icon className="size-3.5 text-accent-text" aria-hidden="true" />
                <span className="text-xs font-medium text-muted-foreground">{widget.label}</span>
                <span className="font-heading text-xs font-bold whitespace-nowrap text-foreground">
                  {widget.kind === "metric" ? (
                    <AnimatedCounter value={widget.numericValue} prefix={widget.prefix} suffix={widget.suffix} decimals={widget.decimals} />
                  ) : (
                    widget.status
                  )}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
