"use client";

import type { LucideIcon } from "lucide-react";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentHoverClasses, type Accent } from "@/lib/accent";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";

const ACCENT_CHIP: Record<Accent, string> = {
  primary: "bg-primary/15 text-primary-text ring-primary/25",
  secondary: "bg-secondary/15 text-secondary-text ring-secondary/25",
  accent: "bg-accent/15 text-accent-text ring-accent/25",
};

const ACCENT_TEXT: Record<Accent, string> = {
  primary: "text-primary-text",
  secondary: "text-secondary-text",
  accent: "text-accent-text",
};

function Sparkline({ trend, accent }: { trend: number[]; accent: Accent }) {
  const width = 64;
  const height = 22;
  const max = Math.max(...trend);
  const min = Math.min(...trend);
  const points = trend
    .map((point, index) => {
      const x = (index / (trend.length - 1)) * width;
      const y = height - ((point - min) / (max - min || 1)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn("mt-1 h-5 w-16 overflow-visible", ACCENT_TEXT[accent])} aria-hidden="true">
      <motion.polyline
        points={points}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-current"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay: 1, ease: "easeOut" }}
      />
    </svg>
  );
}

interface HeroWidgetChipBase {
  id: string;
  label: string;
  icon: LucideIcon;
  accent: Accent;
  /** Position of the widget's center, as a percentage of the stage box. */
  x: number;
  y: number;
  /** 0 (background, subtle) to 1 (foreground, prominent) — drives parallax strength, shadow, and z-index. */
  depth: number;
  /** Entrance stagger delay in seconds. */
  delay: number;
  compact?: boolean;
}

type HeroWidgetChipData =
  | (HeroWidgetChipBase & { kind: "metric"; numericValue: number; decimals?: number; prefix?: string; suffix?: string })
  | (HeroWidgetChipBase & { kind: "chart"; value: string; trend: number[] })
  | (HeroWidgetChipBase & { kind: "badge"; status: string });

interface HeroWidgetChipProps {
  widget: HeroWidgetChipData;
  /** Pointer-parallax motion values — omit on pages whose hero stage doesn't track the pointer. */
  mx?: MotionValue<number>;
  my?: MotionValue<number>;
}

/**
 * The site's shared "floating hero stat chip" — used across every hero stage
 * (Home, Who I Am, CTV/App Monetization, Ad Formats, Eligibility). Previously
 * each hero-stage file hand-duplicated this markup with no hover state; this
 * is the single source of truth now, so every hero gets the same depth-aware
 * shadow, glass treatment, and hover lift for free.
 */
export function HeroWidgetChip({ widget, mx, my }: HeroWidgetChipProps) {
  const fallbackMx = useMotionValue(0);
  const fallbackMy = useMotionValue(0);
  const activeMx = mx ?? fallbackMx;
  const activeMy = my ?? fallbackMy;
  const parallaxX = useTransform(activeMx, [-1, 1], [-16 * widget.depth, 16 * widget.depth]);
  const parallaxY = useTransform(activeMy, [-1, 1], [-16 * widget.depth, 16 * widget.depth]);
  const Icon = widget.icon;

  // Depth reads as scale + presence, not blur — blur would hurt the card's own legibility.
  const targetScale = 0.86 + widget.depth * 0.28;
  const targetOpacity = 0.78 + widget.depth * 0.22;

  return (
    <div
      style={{ left: `${widget.x}%`, top: `${widget.y}%`, zIndex: Math.round(widget.depth * 10) }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div style={{ x: parallaxX, y: parallaxY }}>
        <motion.div
          initial={{ opacity: 0, scale: targetScale * 0.85, y: 24 }}
          animate={{ opacity: targetOpacity, scale: targetScale, y: [0, -10, 0] }}
          whileHover={{ scale: targetScale * 1.06, opacity: 1, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
          transition={{
            opacity: { duration: 0.7, delay: widget.delay, ease: "easeOut" },
            scale: { duration: 0.7, delay: widget.delay, ease: "easeOut" },
            y: { duration: 4 + widget.depth * 2, repeat: Infinity, ease: "easeInOut", delay: widget.delay },
          }}
          className={cn(
            glass.base,
            glass.light,
            accentHoverClasses[widget.accent],
            "flex cursor-default items-center gap-2.5 rounded-2xl px-3.5 py-2.5 shadow-xl transition-[border-color,box-shadow] duration-300",
            widget.depth > 0.65 ? "shadow-primary/25" : "shadow-black/20"
          )}
        >
          <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-xl ring-1", ACCENT_CHIP[widget.accent])}>
            <Icon className="size-4" aria-hidden="true" />
          </span>

          <div className="min-w-0">
            <p className="whitespace-nowrap text-[0.65rem] font-medium text-muted-foreground">{widget.label}</p>

            {widget.kind === "metric" && (
              <p className="font-heading text-sm font-bold whitespace-nowrap text-foreground">
                <AnimatedCounter value={widget.numericValue} prefix={widget.prefix} suffix={widget.suffix} decimals={widget.decimals} delay={widget.delay + 0.3} />
              </p>
            )}

            {widget.kind === "chart" && (
              <>
                <p className="font-heading text-sm font-bold whitespace-nowrap text-foreground">{widget.value}</p>
                <Sparkline trend={widget.trend} accent={widget.accent} />
              </>
            )}

            {widget.kind === "badge" && (
              <p className="flex items-center gap-1.5 text-[0.7rem] font-semibold whitespace-nowrap text-foreground">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                {widget.status}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
