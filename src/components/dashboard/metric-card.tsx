"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";

const accentClasses = {
  primary: "bg-primary/10 text-primary-text ring-primary/20",
  secondary: "bg-secondary/10 text-secondary-text ring-secondary/20",
  accent: "bg-accent/10 text-accent-text ring-accent/20",
} as const;

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  accent?: keyof typeof accentClasses;
  delay?: number;
  className?: string;
}

export function MetricCard({
  icon: Icon,
  label,
  value,
  accent = "primary",
  delay = 0,
  className,
}: MetricCardProps) {
  return (
    <motion.div
      data-slot="metric-card"
      className={cn(
        glass.base,
        glass.light,
        "flex items-center gap-3 rounded-2xl p-3.5",
        className
      )}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl ring-1",
          accentClasses[accent]
        )}
      >
        <Icon className="size-4.5" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs text-muted-foreground">{label}</p>
        <p className="font-heading text-lg leading-tight font-bold text-foreground">
          {value}
        </p>
      </div>
    </motion.div>
  );
}
