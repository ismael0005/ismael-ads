"use client";

import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  missionVisionIntro,
  visionDashboardNodes,
  visionRegionNodes,
  type VisionDashboardNode,
  type VisionRegionNode,
} from "@/data/my-mission";

const ACCENT_STROKE: Record<VisionRegionNode["accent"], string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
};

function RegionBadge({ node }: { node: VisionRegionNode }) {
  const Icon = node.icon;
  return (
    <div
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(glass.base, glass.light, "flex items-center gap-2.5 rounded-full py-2 pr-4 pl-2.5 shadow-lg")}
      >
        <span className={cn("relative flex size-8 shrink-0 items-center justify-center rounded-full ring-1", accentChipClasses[node.accent])}>
          <motion.span
            aria-hidden="true"
            animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            className={cn("absolute inset-0 rounded-full", accentChipClasses[node.accent])}
          />
          <Icon className="relative size-4" aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <p className="text-xs font-bold whitespace-nowrap text-foreground">{node.label}</p>
          <p className="text-[10px] whitespace-nowrap text-muted-foreground">{node.stat}</p>
        </div>
      </motion.div>
    </div>
  );
}

function DashboardBlip({ node }: { node: VisionDashboardNode }) {
  const Icon = node.icon;
  return (
    <div style={{ left: `${node.x}%`, top: `${node.y}%` }} className="absolute -translate-x-1/2 -translate-y-1/2">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-1.5"
      >
        <span className={cn(glass.base, glass.light, "flex size-9 items-center justify-center rounded-full")}>
          <Icon className={cn("size-4", accentTextClasses[node.accent])} aria-hidden="true" />
        </span>
        <span className="rounded-full bg-background/80 px-2 py-0.5 text-[9px] font-semibold whitespace-nowrap text-muted-foreground shadow-sm ring-1 ring-border">
          {node.label} · {node.value}
        </span>
      </motion.div>
    </div>
  );
}

export function MissionVisionSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...missionVisionIntro} className="mx-auto mb-14 max-w-3xl" />

      <div className={cn(glass.base, glass.light, "relative mx-auto h-[26rem] max-w-5xl overflow-hidden rounded-[2rem] sm:h-[30rem]")}>
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[100px]"
        />

        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full overflow-visible"
        >
          {[...visionRegionNodes, ...visionDashboardNodes].map((node) => {
            const path = `M 50 50 Q ${(50 + node.x) / 2} ${(50 + node.y) / 2 + (node.y > 50 ? 8 : -8)} ${node.x} ${node.y}`;
            return (
              <motion.path
                key={node.id}
                d={path}
                fill="none"
                stroke={ACCENT_STROKE[node.accent]}
                strokeWidth={0.3}
                strokeLinecap="round"
                strokeDasharray="1.2 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ opacity: 0.7, pathLength: 1, strokeDashoffset: [0, -60] }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  pathLength: { duration: 1.2, ease: "easeOut" },
                  opacity: { duration: 0.6 },
                  strokeDashoffset: { duration: 4, repeat: Infinity, ease: "linear" },
                }}
              />
            );
          })}
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-primary via-secondary to-accent text-white shadow-glow-primary sm:size-20"
          >
            <Globe2 className="size-7 sm:size-8" aria-hidden="true" />
          </motion.div>
        </div>

        {visionDashboardNodes.map((node) => (
          <DashboardBlip key={node.id} node={node} />
        ))}
        {visionRegionNodes.map((node) => (
          <RegionBadge key={node.id} node={node} />
        ))}
      </div>
    </Section>
  );
}
