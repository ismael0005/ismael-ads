"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { GlassIcon3D } from "@/components/ui/glass-icon";
import { missionPrinciples, missionPrinciplesIntro, type MissionPrinciple } from "@/data/my-mission";

const POSITIONS: Record<MissionPrinciple["direction"], { x: number; y: number }> = {
  N: { x: 50, y: 6 },
  NE: { x: 84, y: 20 },
  E: { x: 94, y: 50 },
  SE: { x: 84, y: 80 },
  S: { x: 50, y: 94 },
  W: { x: 6, y: 50 },
};

function PrincipleNode({
  principle,
  isActive,
  onToggle,
}: {
  principle: MissionPrinciple;
  isActive: boolean;
  onToggle: () => void;
}) {
  const pos = POSITIONS[principle.direction];
  const Icon = principle.icon;
  return (
    <div style={{ left: `${pos.x}%`, top: `${pos.y}%` }} className="absolute -translate-x-1/2 -translate-y-1/2">
      <motion.button
        type="button"
        onClick={onToggle}
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          glass.base,
          glass.light,
          "flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl px-4 py-3 text-center shadow-lg transition-transform duration-300",
          isActive && "scale-105 border-primary/50 shadow-xl"
        )}
      >
        <span className={cn("flex size-9 items-center justify-center rounded-xl ring-1", accentChipClasses[principle.accent])}>
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <span className="text-xs font-bold whitespace-nowrap text-foreground">{principle.label}</span>
      </motion.button>
    </div>
  );
}

export function MissionPrinciplesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = missionPrinciples.find((principle) => principle.id === activeId) ?? null;

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...missionPrinciplesIntro} className="mx-auto mb-16 max-w-2xl" />

      {/* Desktop: compass with principles at fixed radial points */}
      <div className="relative mx-auto hidden aspect-square max-w-xl lg:block">
        <motion.div
          animate={{ opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/15 blur-[100px]"
        />

        {missionPrinciples.map((principle) => (
          <PrincipleNode
            key={principle.id}
            principle={principle}
            isActive={activeId === principle.id}
            onToggle={() => setActiveId((current) => (current === principle.id ? null : principle.id))}
          />
        ))}

        <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 -m-4 rounded-full border border-dashed border-border"
          />
          <div className={cn(glass.base, glass.light, "relative flex size-32 items-center justify-center rounded-full shadow-xl")}>
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center gap-1 px-4 text-center"
                >
                  <active.icon className={cn("size-6", accentTextClasses[active.accent])} aria-hidden="true" />
                  <p className="text-[10px] font-bold text-foreground">{active.label}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="compass"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25 }}
                >
                  <Compass className="size-10 text-primary-text" aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 hidden max-w-lg lg:block">
        <AnimatePresence mode="wait">
          {active && (
            <motion.p
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-center text-sm text-muted-foreground"
            >
              {active.detail}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Tablet / mobile: static list, no radial positioning */}
      <div className="flex flex-col items-center gap-8 lg:hidden">
        <GlassIcon3D icon={Compass} accent="primary" size="xl" />
        <div className="flex flex-wrap items-center justify-center gap-3">
          {missionPrinciples.map((principle, index) => (
            <motion.button
              key={principle.id}
              type="button"
              onClick={() => setActiveId((current) => (current === principle.id ? null : principle.id))}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={cn(
                glass.base,
                glass.light,
                "flex items-center gap-2 rounded-full px-3.5 py-2 transition-colors duration-300",
                activeId === principle.id && "border-primary/50"
              )}
            >
              <span className={cn("flex size-6 items-center justify-center rounded-md ring-1", accentChipClasses[principle.accent])}>
                <principle.icon className="size-3.5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold whitespace-nowrap text-foreground">{principle.label}</span>
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {active && (
            <motion.p
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="max-w-sm text-center text-sm text-muted-foreground"
            >
              {active.detail}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
