"use client";

import type { ReactElement } from "react";
import { Globe, Smartphone, Tv } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { MiniBarChart } from "@/components/dashboard/mini-bar-chart";
import type { GrowthStep } from "@/data/home";

const BIDS = [
  { value: "$1.20", win: false },
  { value: "$1.45", win: false },
  { value: "$1.80", win: true },
];

function InventoryVisual() {
  return (
    <div className="flex items-center gap-1.5">
      {[Globe, Smartphone, Tv].map((Icon, index) => (
        <motion.span
          key={index}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
          className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary-text ring-1 ring-primary/20"
        >
          <Icon className="size-3.5" aria-hidden="true" />
        </motion.span>
      ))}
    </div>
  );
}

function AdRequestVisual() {
  return (
    <div className="relative h-6 w-20">
      <div className="absolute inset-y-1/2 left-0 h-px w-full -translate-y-1/2 bg-border" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2">
        <motion.span
          animate={{ x: [0, 72, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="block size-2 rounded-full bg-secondary shadow-[0_0_8px_var(--color-secondary)]"
        />
      </div>
    </div>
  );
}

function HeaderBiddingVisual() {
  return (
    <div className="flex h-8 items-end justify-center gap-1.5">
      {[0.5, 0.8, 0.65, 0.9].map((scale, index) => (
        <motion.span
          key={index}
          animate={{ scaleY: [scale * 0.5, scale, scale * 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
          style={{ transformOrigin: "bottom" }}
          className="block h-8 w-1.5 rounded-full bg-gradient-to-t from-accent/30 to-accent"
        />
      ))}
    </div>
  );
}

function DemandVisual() {
  return (
    <div className="flex flex-col items-center gap-1">
      {BIDS.map((bid) => (
        <motion.span
          key={bid.value}
          animate={bid.win ? { scale: [1, 1.12, 1] } : { opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className={cn(
            "rounded-full px-2 py-0.5 text-[9px] font-bold",
            bid.win ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          )}
        >
          {bid.value}
        </motion.span>
      ))}
    </div>
  );
}

function AiVisual() {
  return (
    <div className="relative flex size-10 items-center justify-center">
      <motion.span
        animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-accent/40 blur-md"
      />
      <span className="relative flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_14px_var(--color-accent)]" />
    </div>
  );
}

function WinnerVisual() {
  return (
    <div className="relative flex items-center justify-center">
      <motion.span
        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 m-auto size-9 rounded-full bg-secondary/40"
      />
      <span className="relative rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold text-secondary-foreground shadow-lg">
        $1.80
      </span>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="w-20">
      <MiniBarChart className="h-8 gap-1" />
    </div>
  );
}

const VISUALS: Record<string, () => ReactElement> = {
  inventory: InventoryVisual,
  "ad-request": AdRequestVisual,
  "header-bidding": HeaderBiddingVisual,
  demand: DemandVisual,
  ai: AiVisual,
  winner: WinnerVisual,
  dashboard: DashboardVisual,
};

interface GrowthStepNodeProps {
  step: GrowthStep;
  index: number;
}

export function GrowthStepNode({ step, index }: GrowthStepNodeProps) {
  const Icon = step.icon;
  const Visual = VISUALS[step.id] ?? InventoryVisual;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        glass.base,
        glass.light,
        "relative flex w-[9.5rem] shrink-0 snap-center flex-col items-center gap-3 rounded-2xl px-4 pt-6 pb-4 text-center"
      )}
    >
      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex h-10 w-full items-center justify-center">
        <Visual />
      </div>

      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-xl ring-1",
          accentChipClasses[step.accent]
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>

      <p className={cn("text-xs font-bold", accentTextClasses[step.accent])}>{step.label}</p>
      <p className="text-[11px] leading-snug text-muted-foreground">{step.description}</p>
    </motion.div>
  );
}
