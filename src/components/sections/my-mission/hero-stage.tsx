"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentTextClasses } from "@/lib/accent";
import { missionHeroOrbit, type MissionOrbitNode } from "@/data/my-mission";

const ORBIT_RADIUS = 190;
const ORBIT_DURATION = 40;
const ANGLE_STEP = 360 / missionHeroOrbit.length;

const ACCENT_LINE: Record<MissionOrbitNode["accent"], string> = {
  primary: "linear-gradient(to right, var(--color-primary), transparent)",
  secondary: "linear-gradient(to right, var(--color-secondary), transparent)",
  accent: "linear-gradient(to right, var(--color-accent), transparent)",
};

function OrbitNode({ node, angle }: { node: MissionOrbitNode; angle: number }) {
  const Icon = node.icon;
  return (
    <motion.div
      initial={{ rotate: angle }}
      animate={{ rotate: angle + 360 }}
      transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 left-1/2 size-0"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 h-px origin-left -translate-y-1/2 opacity-70"
        style={{ width: ORBIT_RADIUS, background: ACCENT_LINE[node.accent] }}
      />
      <motion.div style={{ x: ORBIT_RADIUS }} className="absolute top-1/2 left-1/2 -translate-y-1/2">
        <motion.div
          initial={{ rotate: -angle }}
          animate={{ rotate: -(angle + 360) }}
          transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
        >
          <div
            title={node.label}
            className={cn(
              glass.base,
              glass.light,
              "flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg sm:size-14"
            )}
          >
            <Icon className={cn("size-5 sm:size-6", accentTextClasses[node.accent])} aria-hidden="true" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function AiCore() {
  return (
    <div className="relative flex items-center justify-center">
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.25, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute size-32 rounded-full bg-primary/40 blur-3xl sm:size-40"
      />
      {[0, 1].map((ring) => (
        <motion.span
          key={ring}
          aria-hidden="true"
          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeOut", delay: ring * 2.5 }}
          className="absolute size-24 rounded-full ring-1 ring-primary/40 sm:size-28"
        />
      ))}
      <span className="relative flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-primary via-secondary to-accent text-white shadow-glow-primary sm:size-28">
        <Sparkles className="size-10 sm:size-12" aria-hidden="true" />
      </span>
    </div>
  );
}

export function MissionHeroStage() {
  return (
    <div className="relative w-full">
      {/* Desktop: true orbit around the AI core */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-lg lg:block">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 -z-10 rounded-full bg-secondary/10 blur-[110px] mix-blend-multiply dark:mix-blend-screen"
        />

        <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <AiCore />
        </div>

        {missionHeroOrbit.map((node, index) => (
          <OrbitNode key={node.id} node={node} angle={ANGLE_STEP * index} />
        ))}
      </div>

      {/* Tablet / mobile: static core with a compact icon grid, no orbit */}
      <div className="flex flex-col items-center gap-8 lg:hidden">
        <AiCore />
        <div className="flex flex-wrap items-center justify-center gap-3">
          {missionHeroOrbit.map((node, index) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-full px-3.5 py-2")}
              >
                <Icon className={cn("size-4", accentTextClasses[node.accent])} aria-hidden="true" />
                <span className="text-xs font-semibold whitespace-nowrap text-foreground">{node.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
