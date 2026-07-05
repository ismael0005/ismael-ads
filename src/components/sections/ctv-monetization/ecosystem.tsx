"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { OrbitBadge } from "@/components/sections/solutions/orbit-badge";
import { ctvEcosystemIntro, ctvEcosystemNodes } from "@/data/ctv-monetization";

/**
 * A single ring, every badge at the same radius/duration/direction — relative
 * angular spacing (60° apart) never changes, so badges can never drift into
 * each other over time. A two-ring layout with different per-badge speeds
 * looks richer at a glance but two badges on different rings running at
 * different speeds will periodically overlap in absolute position, since a
 * wide pill badge's tangential extent reaches well past a ~50px radius gap.
 */
const ORBIT_RADIUS = 200;
const ORBIT_ANGLES = [0, 60, 120, 180, 240, 300];

function EngineNode() {
  return (
    <div className="relative flex flex-col items-center gap-2">
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-2xl"
      />
      <span className="flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent text-white shadow-glow-primary sm:size-24">
        <Sparkles className="size-9 sm:size-10" aria-hidden="true" />
      </span>
      <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-bold whitespace-nowrap text-foreground shadow-md ring-1 ring-border">
        Ismael AI Engine
      </span>
    </div>
  );
}

export function CtvEcosystemSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...ctvEcosystemIntro} className="mx-auto mb-16 max-w-2xl" />

      {/* Desktop: true orbit, radii tuned to clear the engine node's glow footprint. */}
      <div className="relative mx-auto hidden h-[36rem] max-w-2xl lg:block">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[110px] mix-blend-multiply dark:mix-blend-screen"
        />

        {ctvEcosystemNodes.map((node, index) => (
          <OrbitBadge
            key={node.id}
            radius={ORBIT_RADIUS}
            duration={28}
            startAngle={ORBIT_ANGLES[index]}
            className={cn(glass.base, glass.light, "text-foreground")}
          >
            <span className="flex items-center gap-1.5">
              <node.icon className={cn("size-3", accentTextClasses[node.accent])} aria-hidden="true" />
              {node.label}
            </span>
          </OrbitBadge>
        ))}

        <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <EngineNode />
        </div>
      </div>

      {/* Tablet / mobile: static grid around a centered engine node, no orbit. */}
      <div className="flex flex-col items-center gap-8 lg:hidden">
        <EngineNode />
        <div className="flex flex-wrap items-center justify-center gap-3">
          {ctvEcosystemNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-full px-3.5 py-2")}
            >
              <span className={cn("flex size-6 items-center justify-center rounded-md ring-1", accentChipClasses[node.accent])}>
                <node.icon className="size-3.5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold whitespace-nowrap text-foreground">{node.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
