"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { OrbitBadge } from "@/components/sections/solutions/orbit-badge";
import { GlassIcon3D } from "@/components/ui/glass-icon";
import { expertiseAreas, expertiseIntro } from "@/data/who-i-am";

/**
 * A single ring, every node at the same radius/duration/direction — relative
 * angular spacing (36° apart) never changes, so nodes can never drift into
 * each other over time (a two-ring layout with different per-node speeds
 * periodically overlaps once a wide pill badge's tangential extent crosses
 * the gap between rings).
 */
const ORBIT_RADIUS = 240;
const ORBIT_ANGLES = Array.from({ length: 10 }, (_, i) => i * 36);

function CoreNode() {
  return (
    <div className="relative flex flex-col items-center gap-2">
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-2xl"
      />
      <GlassIcon3D icon={BrainCircuit} accent="primary" size="xl" />
      <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-bold whitespace-nowrap text-foreground shadow-md ring-1 ring-border">
        15 Years, One Core
      </span>
    </div>
  );
}

export function WhoIAmExpertiseSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = expertiseAreas.find((area) => area.id === activeId) ?? null;

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...expertiseIntro} className="mx-auto mb-16 max-w-2xl" />

      {/* Desktop: true orbit around the core */}
      <div className="relative mx-auto hidden h-[40rem] max-w-2xl lg:block">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[110px] mix-blend-multiply dark:mix-blend-screen"
        />

        {expertiseAreas.map((area, index) => (
          <OrbitBadge
            key={area.id}
            radius={ORBIT_RADIUS}
            duration={34}
            startAngle={ORBIT_ANGLES[index]}
            className={cn(
              glass.base,
              glass.light,
              "cursor-pointer text-foreground transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20",
              activeId === area.id && "border-primary/50 shadow-lg shadow-primary/20"
            )}
          >
            <button
              type="button"
              onMouseEnter={() => setActiveId(area.id)}
              onFocus={() => setActiveId(area.id)}
              onClick={() => setActiveId(area.id)}
              className="flex cursor-pointer items-center gap-1.5"
            >
              <area.icon className={cn("size-3", accentTextClasses[area.accent])} aria-hidden="true" />
              {area.label}
            </button>
          </OrbitBadge>
        ))}

        <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <CoreNode />
        </div>
      </div>

      {/* Tablet / mobile: static grid, no orbit */}
      <div className="flex flex-col items-center gap-8 lg:hidden">
        <CoreNode />
        <div className="flex flex-wrap items-center justify-center gap-3">
          {expertiseAreas.map((area, index) => (
            <motion.button
              key={area.id}
              type="button"
              onClick={() => setActiveId(area.id)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={cn(
                glass.base,
                glass.light,
                "flex items-center gap-2 rounded-full px-3.5 py-2 transition-colors duration-300",
                activeId === area.id && "border-primary/50"
              )}
            >
              <span className={cn("flex size-6 items-center justify-center rounded-md ring-1", accentChipClasses[area.accent])}>
                <area.icon className="size-3.5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold whitespace-nowrap text-foreground">{area.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-xl">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={cn(glass.base, glass.light, "flex items-start gap-4 rounded-2xl p-5")}
            >
              <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl ring-1", accentChipClasses[active.accent])}>
                <active.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-foreground">{active.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{active.detail}</p>
              </div>
            </motion.div>
          ) : (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm text-muted-foreground">
              Hover or tap any area to see how it fits into the core.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
