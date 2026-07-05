"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { OrbitBadge } from "@/components/sections/solutions/orbit-badge";
import { GlassIcon3D } from "@/components/ui/glass-icon";
import { advantagesIntro, ecosystemAdvantages } from "@/data/ad-formats";

/**
 * A single ring, every badge at the same radius, same duration, same
 * direction — their relative angular spacing (45° apart) never changes, so
 * badges can never drift into each other over time. A two-ring layout with
 * different speeds looks richer at a glance but two badges on different
 * rings running at different speeds will periodically overlap in absolute
 * position (a wide pill badge's tangential extent reaches well past a 50px
 * radius gap) — confirmed by screenshot, not just a theoretical risk.
 */
const ORBIT_RADIUS = 210;
const ORBIT_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

function EngineNode() {
  return (
    <div className="relative flex flex-col items-center gap-2">
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-2xl"
      />
      <GlassIcon3D icon={Sparkles} accent="primary" size="xl" />
      <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-bold whitespace-nowrap text-foreground shadow-md ring-1 ring-border">
        AI Engine
      </span>
    </div>
  );
}

export function AdFormatsAdvantagesSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...advantagesIntro} className="mx-auto mb-16 max-w-2xl" />

      {/* Desktop: true orbit, radii tuned to clear the engine node's glow footprint. */}
      <div className="relative mx-auto hidden h-[36rem] max-w-2xl lg:block">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[110px] mix-blend-multiply dark:mix-blend-screen"
        />

        {ecosystemAdvantages.map((advantage, index) => (
          <OrbitBadge
            key={advantage.id}
            radius={ORBIT_RADIUS}
            duration={30}
            startAngle={ORBIT_ANGLES[index]}
            className={cn(glass.base, glass.light, "text-foreground")}
          >
            <span className="flex items-center gap-1.5">
              <advantage.icon className={cn("size-3", accentTextClasses[advantage.accent])} aria-hidden="true" />
              {advantage.label}
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
          {ecosystemAdvantages.map((advantage, index) => (
            <motion.div
              key={advantage.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-full px-3.5 py-2")}
            >
              <span className={cn("flex size-6 items-center justify-center rounded-md ring-1", accentChipClasses[advantage.accent])}>
                <advantage.icon className="size-3.5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold whitespace-nowrap text-foreground">{advantage.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
