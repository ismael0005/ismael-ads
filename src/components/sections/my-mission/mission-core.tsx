"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Target } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { missionCoreIntro, missionValues, type MissionValue } from "@/data/my-mission";

const ORBIT_RADIUS = 250;
const ORBIT_DURATION = 46;
const ANGLE_STEP = 360 / missionValues.length;

function OrbitValue({
  value,
  angle,
  isActive,
  onActivate,
}: {
  value: MissionValue;
  angle: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const Icon = value.icon;
  return (
    <motion.div
      initial={{ rotate: angle }}
      animate={{ rotate: angle + 360 }}
      transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 left-1/2 size-0"
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute top-1/2 left-1/2 h-px origin-left -translate-y-1/2 transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-40"
        )}
        style={{
          width: ORBIT_RADIUS,
          background: isActive
            ? `linear-gradient(to right, var(--color-${value.accent}), transparent)`
            : "linear-gradient(to right, var(--color-border), transparent)",
        }}
      />
      <motion.div style={{ x: ORBIT_RADIUS }} className="absolute top-1/2 left-1/2 -translate-y-1/2">
        <motion.div
          initial={{ rotate: -angle }}
          animate={{ rotate: -(angle + 360) }}
          transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
        >
          <button
            type="button"
            onMouseEnter={onActivate}
            onFocus={onActivate}
            onClick={onActivate}
            title={value.label}
            className={cn(
              glass.base,
              glass.light,
              "flex size-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full shadow-lg transition-transform duration-300 sm:size-16",
              isActive && "scale-[1.15] border-primary/50 shadow-xl"
            )}
          >
            <Icon className={cn("size-6 sm:size-7", accentTextClasses[value.accent])} aria-hidden="true" />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function CoreSphere() {
  return (
    <div className="relative flex items-center justify-center">
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.2, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute size-36 rounded-full bg-primary/40 blur-3xl sm:size-44"
      />
      <span className="relative flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-primary via-secondary to-accent text-white shadow-glow-primary sm:size-32">
        <Target className="size-11 sm:size-12" aria-hidden="true" />
      </span>
    </div>
  );
}

export function MissionCoreSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = missionValues.find((value) => value.id === activeId) ?? null;

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...missionCoreIntro} className="mx-auto mb-16 max-w-2xl" />

      {/* Desktop: sphere with a dashed guide ring and orbiting principles */}
      <div className="relative mx-auto hidden h-[42rem] max-w-2xl lg:block">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />

        <svg
          aria-hidden="true"
          viewBox="-260 -260 520 520"
          className="absolute top-1/2 left-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-30"
        >
          <circle cx="0" cy="0" r={ORBIT_RADIUS} fill="none" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 8" />
        </svg>

        {missionValues.map((value, index) => (
          <OrbitValue
            key={value.id}
            value={value}
            angle={ANGLE_STEP * index}
            isActive={activeId === value.id}
            onActivate={() => setActiveId(value.id)}
          />
        ))}

        <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <CoreSphere />
        </div>
      </div>

      {/* Tablet / mobile: static core with a tappable grid, no orbit */}
      <div className="flex flex-col items-center gap-8 lg:hidden">
        <CoreSphere />
        <div className="flex flex-wrap items-center justify-center gap-3">
          {missionValues.map((value, index) => (
            <motion.button
              key={value.id}
              type="button"
              onClick={() => setActiveId(value.id)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={cn(
                glass.base,
                glass.light,
                "flex items-center gap-2 rounded-full px-3.5 py-2 transition-colors duration-300",
                activeId === value.id && "border-primary/50"
              )}
            >
              <span className={cn("flex size-6 items-center justify-center rounded-md ring-1", accentChipClasses[value.accent])}>
                <value.icon className="size-3.5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold whitespace-nowrap text-foreground">{value.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-lg">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={cn(glass.base, glass.light, "flex flex-col items-center rounded-3xl p-8 text-center")}
            >
              <span className={cn("flex size-14 items-center justify-center rounded-2xl ring-1", accentChipClasses[active.accent])}>
                <active.icon className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-4 font-heading text-lg font-bold text-foreground">{active.label}</p>
              <p className="mt-2 text-sm text-muted-foreground">{active.detail}</p>
            </motion.div>
          ) : (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm text-muted-foreground">
              Hover or tap any principle to see how it shapes the way we work.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
