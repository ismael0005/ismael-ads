"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { motionVariants } from "@/styles/animations";
import { ctvGrowthIntro, ctvGrowthStats, ctvGrowthTrend } from "@/data/ctv-monetization";

function GrowthGraph() {
  const width = 100;
  const height = 46;
  const max = Math.max(...ctvGrowthTrend);
  const min = Math.min(...ctvGrowthTrend);
  const points = ctvGrowthTrend.map((value, index) => {
    const x = (index / (ctvGrowthTrend.length - 1)) * width;
    const y = height - ((value - min) / (max - min || 1)) * height;
    return `${x},${y}`;
  });
  const linePath = `M ${points.join(" L ")}`;
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-56 w-full overflow-visible sm:h-72" aria-hidden="true">
        <defs>
          <linearGradient id="ctv-growth-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="ctv-growth-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>
        </defs>
        <motion.path
          d={areaPath}
          fill="url(#ctv-growth-fill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#ctv-growth-stroke)"
          strokeWidth={1}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.3 }}
        className="absolute -top-3 right-0 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-glow-primary"
      >
        +285% since 2019
      </motion.div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>2019</span>
        <span>2026</span>
      </div>
    </div>
  );
}

export function CtvGrowthSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...ctvGrowthIntro} className="mx-auto mb-16 max-w-2xl" />

      <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <GrowthGraph />
        </motion.div>

        <motion.div
          variants={motionVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-10"
        >
          {ctvGrowthStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={motionVariants.fadeInUp}
                className="border-l-2 border-border pl-5"
              >
                <p className={cn("font-heading text-4xl font-bold sm:text-5xl", accentTextClasses[stat.accent])}>
                  <AnimatedCounter value={stat.numericValue} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Icon className="size-3.5" aria-hidden="true" />
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}
