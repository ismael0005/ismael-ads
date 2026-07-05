"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Gauge, LayoutDashboard, TrendingDown, TrendingUp, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Sparkline } from "@/components/dashboard/sparkline";
import { accentChipClasses, accentGlowClasses, accentTextClasses } from "@/lib/accent";
import { motionVariants } from "@/styles/animations";
import { missionChapters, whyWeExistIntro, type MissionChapter } from "@/data/my-mission";

const FAN_ICONS = [BrainCircuit, Zap, LayoutDashboard, Gauge];
const FAN_ROTATIONS = [-18, -6, 6, 18];

function ChapterHeader({ chapter }: { chapter: MissionChapter }) {
  const Icon = chapter.icon;
  return (
    <div className="flex items-center gap-3">
      <span className={cn("flex size-10 items-center justify-center rounded-2xl ring-1", accentChipClasses[chapter.accent])}>
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <p className={cn("font-heading text-sm font-bold tracking-wide uppercase", accentTextClasses[chapter.accent])}>
        Chapter {chapter.index}
      </p>
    </div>
  );
}

function OrbChapter({ chapter }: { chapter: MissionChapter }) {
  const Icon = chapter.icon;
  return (
    <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-4 font-heading text-[10rem] leading-none font-black text-foreground/[0.04] select-none sm:text-[13rem]"
      >
        {chapter.index}
      </span>
      <div className="relative">
        <ChapterHeader chapter={chapter} />
        <h3 className="mt-5 font-heading text-2xl font-bold text-balance text-foreground sm:text-3xl">{chapter.title}</h3>
        <p className="mt-4 max-w-md text-base text-muted-foreground">{chapter.description}</p>
      </div>
      <div className="relative mx-auto flex size-56 items-center justify-center sm:size-64">
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.12, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className={cn("absolute inset-0 rounded-full blur-3xl", accentGlowClasses[chapter.accent])}
        />
        <div className={cn(glass.base, glass.light, "relative flex size-40 items-center justify-center rounded-full sm:size-48")}>
          <Icon className={cn("size-16 sm:size-20", accentTextClasses[chapter.accent])} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function FanChapter({ chapter }: { chapter: MissionChapter }) {
  return (
    <div className="flex flex-col items-center text-center">
      <ChapterHeader chapter={chapter} />
      <h3 className="mt-5 max-w-2xl font-heading text-2xl font-bold text-balance text-foreground sm:text-3xl">{chapter.title}</h3>
      <p className="mt-4 max-w-xl text-base text-muted-foreground">{chapter.description}</p>

      <div className="mt-12 flex items-end justify-center" style={{ perspective: "800px" }}>
        {FAN_ICONS.map((FanIcon, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: FAN_ROTATIONS[index] }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              glass.base,
              glass.light,
              "-mx-3 flex size-20 items-center justify-center rounded-2xl sm:size-24"
            )}
          >
            <FanIcon className="size-8 text-muted-foreground sm:size-9" aria-hidden="true" />
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          whileInView={{ opacity: 1, y: -14, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            glass.base,
            glass.light,
            "-mx-3 z-10 flex size-24 items-center justify-center rounded-2xl shadow-xl sm:size-28"
          )}
        >
          <chapter.icon className={cn("size-9 sm:size-10", accentTextClasses[chapter.accent])} aria-hidden="true" />
        </motion.div>
      </div>
    </div>
  );
}

function ChartChapter({ chapter }: { chapter: MissionChapter }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={cn(glass.base, glass.light, "order-2 rounded-3xl p-6 sm:p-8 lg:order-1")}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Reported vs. Actual Revenue</p>
          <span className={cn("text-xs font-bold", accentTextClasses[chapter.accent])}>100% Match</span>
        </div>
        <Sparkline trend={[20, 34, 30, 48, 44, 60, 58, 76, 74, 92]} accent={chapter.accent} className="mt-6" />
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Publisher View</span>
          <span>Our View</span>
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <ChapterHeader chapter={chapter} />
        <h3 className="mt-5 font-heading text-2xl font-bold text-balance text-foreground sm:text-3xl">{chapter.title}</h3>
        <p className="mt-4 max-w-md text-base text-muted-foreground">{chapter.description}</p>
      </div>
    </div>
  );
}

function CompareChapter({ chapter }: { chapter: MissionChapter }) {
  return (
    <div className="flex flex-col items-center text-center">
      <ChapterHeader chapter={chapter} />
      <h3 className="mt-5 max-w-2xl font-heading text-2xl font-bold text-balance text-foreground sm:text-3xl">{chapter.title}</h3>
      <p className="mt-4 max-w-xl text-base text-muted-foreground">{chapter.description}</p>

      <div className="mt-10 grid w-full max-w-2xl gap-5 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className={cn(glass.base, "rounded-2xl p-6 text-left opacity-70 grayscale")}
        >
          <div className="flex items-center gap-2">
            <TrendingDown className="size-4 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm font-bold text-muted-foreground">Quick Profit</p>
          </div>
          <Sparkline trend={[80, 90, 70, 50, 40, 25]} accent="secondary" className="mt-4 h-14" />
          <p className="mt-3 text-xs text-muted-foreground">Fast spike, then steady decline as trust erodes.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={cn(glass.base, glass.light, "rounded-2xl p-6 text-left")}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className={cn("size-4", accentTextClasses[chapter.accent])} aria-hidden="true" />
            <p className={cn("text-sm font-bold", accentTextClasses[chapter.accent])}>Long-Term Partnership</p>
          </div>
          <Sparkline trend={[20, 30, 38, 52, 68, 90]} accent={chapter.accent} className="mt-4 h-14" />
          <p className="mt-3 text-xs text-muted-foreground">Steady, compounding growth that never plateaus.</p>
        </motion.div>
      </div>
    </div>
  );
}

const LAYOUTS: Record<MissionChapter["layout"], typeof OrbChapter> = {
  orb: OrbChapter,
  fan: FanChapter,
  chart: ChartChapter,
  compare: CompareChapter,
};

export function MissionWhyWeExistSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...whyWeExistIntro} className="mx-auto mb-20 max-w-2xl" />

      <div className="flex flex-col gap-24 sm:gap-28">
        {missionChapters.map((chapter) => {
          const Layout = LAYOUTS[chapter.layout];
          return (
            <motion.div
              key={chapter.id}
              variants={motionVariants.fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Layout chapter={chapter} />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
