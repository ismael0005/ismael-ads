"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { motionVariants } from "@/styles/animations";
import { comparisonIntro, comparisonMetrics } from "@/data/ad-formats";

function ComparisonBar({
  value,
  max,
  label,
  variant,
}: {
  value: number;
  max: number;
  label: string;
  variant: "traditional" | "optimized";
}) {
  const percent = Math.max(6, (value / max) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className={variant === "traditional" ? "text-muted-foreground" : "font-semibold text-foreground"}>
          {label}
        </span>
      </div>
      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className={cn(
            "h-full rounded-full",
            variant === "traditional" ? "bg-muted-foreground/40" : "bg-gradient-to-r from-primary to-accent"
          )}
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export function AdFormatsComparisonSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...comparisonIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className={cn(glass.base, glass.light, "mx-auto max-w-4xl rounded-3xl p-6 sm:p-8")}>
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive ring-1 ring-destructive/20">
              <TrendingDown className="size-4" aria-hidden="true" />
            </span>
            <p className="text-sm font-bold text-foreground">Traditional Ads</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary-text ring-1 ring-primary/20">
              <TrendingUp className="size-4" aria-hidden="true" />
            </span>
            <p className="text-sm font-bold text-foreground">Optimized Formats</p>
          </div>
        </div>

        <motion.div
          variants={motionVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 space-y-7"
        >
          {comparisonMetrics.map((metric) => {
            const max = Math.max(metric.traditional, metric.optimized);
            return (
              <motion.div key={metric.label} variants={motionVariants.fadeInUp}>
                <p className="text-sm font-semibold text-foreground">{metric.label}</p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <ComparisonBar
                    value={metric.traditional}
                    max={max}
                    variant="traditional"
                    label={`${metric.prefix ?? ""}${metric.traditional}${metric.suffix ?? ""}`}
                  />
                  <ComparisonBar
                    value={metric.optimized}
                    max={max}
                    variant="optimized"
                    label={`${metric.prefix ?? ""}${metric.optimized}${metric.suffix ?? ""}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 border-t border-border pt-6">
          {comparisonMetrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <p className="font-heading text-2xl font-bold text-primary-text">
                +
                <AnimatedCounter
                  value={Math.round(((metric.optimized - metric.traditional) / metric.traditional) * 100)}
                  suffix="%"
                />
              </p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
