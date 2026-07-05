"use client";

import { Radio } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { GlassIcon3D } from "@/components/ui/glass-icon";
import { motionVariants } from "@/styles/animations";
import {
  appDashboardIntro,
  appDashboardMetrics,
  appRevenueTrend,
  appTopApps,
  appTopCountries,
  type AppRankedRow,
} from "@/data/app-monetization";

function RevenueAreaChart() {
  const width = 100;
  const height = 40;
  const max = Math.max(...appRevenueTrend);
  const min = Math.min(...appRevenueTrend);
  const points = appRevenueTrend.map((value, index) => {
    const x = (index / (appRevenueTrend.length - 1)) * width;
    const y = height - ((value - min) / (max - min || 1)) * height;
    return `${x},${y}`;
  });
  const linePath = `M ${points.join(" L ")}`;
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-40 w-full overflow-visible sm:h-48" aria-hidden="true">
      <defs>
        <linearGradient id="revenue-area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((fraction) => (
        <line
          key={fraction}
          x1={0}
          x2={width}
          y1={height * fraction}
          y2={height * fraction}
          className="stroke-border"
          strokeWidth={0.15}
        />
      ))}
      <motion.path
        d={areaPath}
        fill="url(#revenue-area-fill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.4 }}
      />
      <motion.path
        d={linePath}
        fill="none"
        strokeWidth={1.2}
        className="stroke-primary"
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

function RankedList({ title, rows, accentClassName }: { title: string; rows: AppRankedRow[]; accentClassName: string }) {
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

export function AppDashboardSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...appDashboardIntro} className="mx-auto mb-14 max-w-2xl" />

      <motion.div
        variants={motionVariants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {appDashboardMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              variants={motionVariants.fadeInUp}
              className={cn(glass.base, glass.light, "flex items-center gap-3 rounded-2xl p-4")}
            >
              <GlassIcon3D icon={Icon} accent={metric.accent} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-xs text-muted-foreground">{metric.label}</p>
                <p className="font-heading text-lg leading-tight font-bold text-foreground">
                  <AnimatedCounter
                    value={metric.numericValue}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                  />
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
                <AnimatedCounter value={6.2} decimals={1} suffix="M" /> ad requests today
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

        <div className="flex flex-col gap-4">
          <RankedList title="Top Countries" rows={appTopCountries} accentClassName="bg-gradient-to-r from-primary to-secondary" />
          <RankedList title="Top Apps" rows={appTopApps} accentClassName="bg-gradient-to-r from-accent to-primary" />
        </div>
      </div>
    </Section>
  );
}
