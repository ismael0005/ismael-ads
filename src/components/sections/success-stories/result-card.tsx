"use client";

import { ArrowRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentGlowClasses, accentHoverClasses, accentTextClasses } from "@/lib/accent";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { Sparkline } from "@/components/dashboard/sparkline";
import type { ResultsWallCard } from "@/data/home";

const CARD_WIDTH: Record<ResultsWallCard["kind"], string> = {
  quote: "w-56",
  metric: "w-44",
  result: "w-72",
  growth: "w-52",
  location: "w-48",
};

interface ResultCardProps {
  card: ResultsWallCard;
}

export function ResultCard({ card }: ResultCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        glass.base,
        glass.light,
        accentHoverClasses[card.accent],
        "group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl p-4 transition-colors duration-300",
        CARD_WIDTH[card.kind]
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute -top-8 -right-8 size-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100",
          accentGlowClasses[card.accent]
        )}
      />

      {card.kind === "quote" && (
        <div className="relative flex h-full flex-col gap-2.5">
          <Quote className="size-4 text-muted-foreground/50" aria-hidden="true" />
          <p className="flex-1 text-xs text-foreground/90">&ldquo;{card.quote}&rdquo;</p>
          <div className="border-t border-border pt-2.5">
            <p className="text-xs font-semibold text-foreground">{card.publisher}</p>
            <p className="text-[10px] text-muted-foreground">{card.role}</p>
          </div>
        </div>
      )}

      {card.kind === "metric" && (
        <div className="relative flex h-full flex-col items-center justify-center gap-2 py-2 text-center">
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-xl ring-1",
              accentChipClasses[card.accent]
            )}
          >
            <card.icon className="size-4" aria-hidden="true" />
          </span>
          <p className={cn("font-heading text-lg font-bold", accentTextClasses[card.accent])}>
            <AnimatedCounter
              value={card.numericValue}
              prefix={card.prefix}
              suffix={card.suffix}
              decimals={card.decimals}
            />
          </p>
          <p className="text-[10px] text-muted-foreground">{card.label}</p>
        </div>
      )}

      {card.kind === "result" && (
        <div className="relative flex h-full flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-xl font-heading text-xs font-bold ring-1",
                accentChipClasses[card.accent]
              )}
            >
              {card.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-foreground">{card.publisher}</p>
              <p className="truncate text-[10px] text-muted-foreground">
                {card.country} · {card.niche}
              </p>
            </div>
          </div>

          <p className="text-xs text-foreground/85">&ldquo;{card.quote}&rdquo;</p>

          <div className="mt-auto flex items-center gap-2 rounded-xl bg-foreground/[0.03] p-2.5">
            <div>
              <p className="text-[9px] text-muted-foreground">Before</p>
              <p className="text-[11px] font-semibold text-muted-foreground line-through decoration-muted-foreground/40">
                {card.beforeRevenue}
              </p>
            </div>
            <ArrowRight className="size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="text-[9px] text-muted-foreground">After</p>
              <p className={cn("text-xs font-bold", accentTextClasses[card.accent])}>{card.afterRevenue}</p>
            </div>
            <span
              className={cn(
                "ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ring-1",
                accentChipClasses[card.accent]
              )}
            >
              +{card.growthPercent}%
            </span>
          </div>

          <p className="text-[10px] text-muted-foreground">Fill Rate {card.fillRate}%</p>
        </div>
      )}

      {card.kind === "growth" && (
        <div className="relative flex h-full flex-col gap-2">
          <p className="truncate text-xs font-bold text-foreground">{card.publisher}</p>
          <p className={cn("font-heading text-2xl font-bold", accentTextClasses[card.accent])}>
            +<AnimatedCounter value={card.growthPercent} suffix="%" />
          </p>
          <Sparkline trend={card.trend} accent={card.accent} className="h-10" />
          <p className="text-[10px] text-muted-foreground">Revenue growth</p>
        </div>
      )}

      {card.kind === "location" && (
        <div className="relative flex h-full flex-col items-center justify-center gap-2 py-2 text-center">
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-xl ring-1",
              accentChipClasses[card.accent]
            )}
          >
            <card.icon className="size-4" aria-hidden="true" />
          </span>
          <p className="truncate text-xs font-bold text-foreground">{card.publisher}</p>
          <p className="text-[10px] text-muted-foreground">
            {card.country} · {card.niche}
          </p>
        </div>
      )}
    </motion.div>
  );
}
