"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { missionRoadmapIntro, roadmapStages } from "@/data/my-mission";

const PATH = roadmapStages.map((stage, index) => `${index === 0 ? "M" : "L"} ${stage.x} ${stage.y}`).join(" ");

export function MissionRoadmapSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...missionRoadmapIntro} className="mx-auto mb-16 max-w-2xl" />

      {/* Desktop: diagonal ascending path with stages at fixed points */}
      <div className="relative mx-auto hidden h-[28rem] max-w-6xl lg:block">
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
          <motion.path
            d={PATH}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={0.25}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
          <motion.path
            d={PATH}
            fill="none"
            stroke="url(#roadmap-flow)"
            strokeWidth={0.4}
            strokeLinecap="round"
            strokeDasharray="2 6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.9, strokeDashoffset: [0, -80] }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              pathLength: { duration: 1.8, ease: "easeOut" },
              opacity: { duration: 0.6 },
              strokeDashoffset: { duration: 5, repeat: Infinity, ease: "linear", delay: 1.8 },
            }}
          />
          <defs>
            <linearGradient id="roadmap-flow" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="50%" stopColor="var(--color-secondary)" />
              <stop offset="100%" stopColor="var(--color-accent)" />
            </linearGradient>
          </defs>
        </svg>

        {roadmapStages.map((stage, index) => {
          const Icon = stage.icon;
          const labelAbove = index % 2 === 0;
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ left: `${stage.x}%`, top: `${stage.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <div className={cn("flex flex-col items-center gap-2", labelAbove ? "flex-col-reverse" : "flex-col")}>
                <span className={cn(glass.base, glass.light, "flex size-11 items-center justify-center rounded-full shadow-lg ring-1", accentChipClasses[stage.accent])}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span
                  className={cn(
                    glass.base,
                    glass.light,
                    "rounded-full px-3 py-1 text-[11px] font-bold whitespace-nowrap shadow-sm",
                    accentTextClasses[stage.accent]
                  )}
                >
                  {stage.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tablet / mobile: simple vertical list, no diagonal positioning */}
      <div className="mx-auto flex max-w-md flex-col gap-4 lg:hidden">
        {roadmapStages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={cn(glass.base, glass.light, "flex items-start gap-4 rounded-2xl p-4")}
            >
              <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl ring-1", accentChipClasses[stage.accent])}>
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className={cn("text-sm font-bold", accentTextClasses[stage.accent])}>{stage.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stage.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
