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
import { requirementNodes, requirementsIntro } from "@/data/eligibility-checker";

/**
 * A single ring, every node at the same radius/duration/direction — relative
 * angular spacing (45° apart) never changes, so nodes can never drift into
 * each other over time (a two-ring layout with different per-node speeds
 * looks richer but periodically overlaps once a wide pill badge's tangential
 * extent crosses a ~50px radius gap).
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
      <span className="flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent text-white shadow-glow-primary sm:size-24">
        <BrainCircuit className="size-9 sm:size-10" aria-hidden="true" />
      </span>
      <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-bold whitespace-nowrap text-foreground shadow-md ring-1 ring-border">
        AI Core
      </span>
    </div>
  );
}

export function EligibilityRequirementsSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = requirementNodes.find((node) => node.id === activeId) ?? null;

  return (
    <Section id="requirements" spacing="lg" className="relative scroll-mt-24 overflow-hidden">
      <SectionHeading {...requirementsIntro} className="mx-auto mb-16 max-w-2xl" />

      {/* Desktop: true orbit around the AI core */}
      <div className="relative mx-auto hidden h-[36rem] max-w-2xl lg:block">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[110px] mix-blend-multiply dark:mix-blend-screen"
        />

        {requirementNodes.map((node, index) => (
          <OrbitBadge
            key={node.id}
            radius={ORBIT_RADIUS}
            duration={30}
            startAngle={ORBIT_ANGLES[index]}
            className={cn(
              glass.base,
              glass.light,
              "cursor-pointer text-foreground transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20",
              activeId === node.id && "border-primary/50 shadow-lg shadow-primary/20"
            )}
          >
            <button type="button" onClick={() => setActiveId(node.id)} className="flex cursor-pointer items-center gap-1.5">
              <node.icon className={cn("size-3", accentTextClasses[node.accent])} aria-hidden="true" />
              {node.label}
            </button>
          </OrbitBadge>
        ))}

        <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <EngineNode />
        </div>
      </div>

      {/* Tablet / mobile: static grid, no orbit */}
      <div className="flex flex-col items-center gap-8 lg:hidden">
        <EngineNode />
        <div className="flex flex-wrap items-center justify-center gap-3">
          {requirementNodes.map((node, index) => (
            <motion.button
              key={node.id}
              type="button"
              onClick={() => setActiveId(node.id)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={cn(
                glass.base,
                glass.light,
                "flex items-center gap-2 rounded-full px-3.5 py-2 transition-colors duration-300",
                activeId === node.id && "border-primary/50"
              )}
            >
              <span className={cn("flex size-6 items-center justify-center rounded-md ring-1", accentChipClasses[node.accent])}>
                <node.icon className="size-3.5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold whitespace-nowrap text-foreground">{node.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-xl">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={cn(glass.base, glass.light, "flex items-start gap-4 rounded-2xl p-5")}
            >
              <GlassIcon3D icon={active.icon} accent={active.accent} size="md" />
              <div>
                <p className="font-heading text-sm font-bold text-foreground">{active.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{active.detail}</p>
              </div>
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-muted-foreground"
            >
              Click any requirement above to see the full detail.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
