"use client";

import { Radio } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { motionVariants } from "@/styles/animations";
import {
  ctvCountryDistribution,
  ctvDashboardIntro,
  ctvDashboardMetrics,
  ctvDeviceDistribution,
  ctvRevenueTrend,
  type CtvRankedRow,
} from "@/data/ctv-monetization";

const COMPLETION_RATE = ctvDashboardMetrics.find((metric) => metric.label === "Completion Rate")?.numericValue ?? 92;

function RevenueAreaChart() {
  const width = 100;
  const height = 40;
  const max = Math.max(...ctvRevenueTrend);
  const min = Math.min(...ctvRevenueTrend);
  const points = ctvRevenueTrend.map((value, index) => {
    const x = (index / (ctvRevenueTrend.length - 1)) * width;
    const y = height - ((value - min) / (max - min || 1)) * height;
    return `${x},${y}`;
  });
  const linePath = `M ${points.join(" L ")}`;
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-40 w-full overflow-visible sm:h-48" aria-hidden="true">
      <defs>
        <linearGradient id="ctv-revenue-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.35} />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((fraction) => (
        <line key={fraction} x1={0} x2={width} y1={height * fraction} y2={height * fraction} className="stroke-border" strokeWidth={0.15} />
      ))}
      <motion.path
        d={areaPath}
        fill="url(#ctv-revenue-fill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.4 }}
      />
      <motion.path
        d={linePath}
        fill="none"
        strokeWidth={1.2}
        className="stroke-accent"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
    </svg>
  );
}

function CompletionGauge() {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={cn(glass.base, glass.light, "flex h-full flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center")}>
      <div className="relative flex size-32 items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="8" className="stroke-muted" />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className="stroke-primary"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference * (1 - COMPLETION_RATE / 100) }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        </svg>
        <p className="font-heading text-2xl font-bold text-foreground">
          <AnimatedCounter value={COMPLETION_RATE} suffix="%" />
        </p>
      </div>
      <div>
        <p className="text-sm font-bold text-foreground">Completion Rate</p>
        <p className="mt-1 text-xs text-muted-foreground">Viewers who watch the full break</p>
      </div>
    </div>
  );
}

function DistributionList({ title, rows, accentClassName }: { title: string; rows: CtvRankedRow[]; accentClassName: string }) {
  return (
    <div className={cn(glass.base, glass.light, "rounded-2xl p-5")}>
      <p className="font-heading text-sm font-bold text-foreground">{title}</p>
      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{row.label}</span>
              <span className="font-semibold text-foreground">{row.value}</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className={cn("h-full rounded-full", accentClassName)}
                initial={{ width: 0 }}
                whileInView={{ width: `${row.share}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CtvDashboardSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...ctvDashboardIntro} className="mx-auto mb-14 max-w-2xl" />

      <motion.div
        variants={motionVariants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3"
      >
        {ctvDashboardMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              variants={motionVariants.fadeInUp}
              className={cn(glass.base, glass.light, "flex items-center gap-3 rounded-2xl p-4")}
            >
              <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl ring-1", accentChipClasses[metric.accent])}>
                <Icon className="size-4.5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs text-muted-foreground">{metric.label}</p>
                <p className="font-heading text-lg leading-tight font-bold text-foreground">
                  <AnimatedCounter value={metric.numericValue} prefix={metric.prefix} suffix={metric.suffix} decimals={metric.decimals} />
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mx-auto mt-4 grid max-w-5xl gap-4 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={cn(glass.base, glass.light, "rounded-2xl p-6 lg:col-span-2")}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-heading text-sm font-bold text-foreground">Revenue — last 12 months</p>
              <p className="mt-1 text-xs text-muted-foreground">
                <AnimatedCounter value={9.6} decimals={1} suffix="M" /> ad requests today
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold text-accent-text ring-1 ring-accent/20">
              <Radio className="size-3" aria-hidden="true" />
              Live
            </span>
          </div>
          <div className="mt-4">
            <RevenueAreaChart />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <CompletionGauge />
        </motion.div>
      </div>

      <div className="mx-auto mt-4 grid max-w-5xl gap-4 sm:grid-cols-2">
        <DistributionList title="Country Distribution" rows={ctvCountryDistribution} accentClassName="bg-gradient-to-r from-primary to-secondary" />
        <DistributionList title="Device Distribution" rows={ctvDeviceDistribution} accentClassName="bg-gradient-to-r from-accent to-primary" />
      </div>
    </Section>
  );
}
