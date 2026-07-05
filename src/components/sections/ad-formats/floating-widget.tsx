"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentHoverClasses, type Accent } from "@/lib/accent";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";

interface FloatingWidgetProps {
  icon: LucideIcon;
  accent: Accent;
  label: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  floatDelay?: number;
  floatDuration?: number;
}

/** A small glass stat chip that floats gently — used around the device showcase, never inside it. */
export function FloatingWidget({
  icon: Icon,
  accent,
  label,
  numericValue,
  prefix,
  suffix,
  decimals,
  className,
  floatDelay = 0,
  floatDuration = 5,
}: FloatingWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      whileHover={{ scale: 1.08, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        opacity: { duration: 0.6, delay: floatDelay },
        scale: { duration: 0.6, delay: floatDelay },
        y: { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
      }}
      className={cn(
        glass.base,
        glass.light,
        accentHoverClasses[accent],
        "absolute z-10 flex cursor-default items-center gap-2 rounded-2xl px-3 py-2 shadow-xl transition-[border-color,box-shadow] duration-300",
        className
      )}
    >
      <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-lg ring-1", accentChipClasses[accent])}>
        <Icon className="size-3.5" aria-hidden="true" />
      </span>
      <div className="leading-tight">
        <p className="font-heading text-sm font-bold whitespace-nowrap text-foreground">
          <AnimatedCounter value={numericValue} prefix={prefix} suffix={suffix} decimals={decimals} />
        </p>
        <p className="text-[9px] whitespace-nowrap text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}
