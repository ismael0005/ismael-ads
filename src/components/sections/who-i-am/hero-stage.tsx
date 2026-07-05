"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { HeroWidgetChip } from "@/components/ui/hero-widget-chip";
import { characterAssets } from "@/data/assets";
import { founderHero, founderHeroWidgets } from "@/data/who-i-am";

const ACCENT_VAR: Record<string, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
};

/** Rim light, tuned brighter than the smaller founder accents elsewhere since this portrait IS the hero. */
const FOUNDER_FILTER = [
  "drop-shadow(0 0 46px rgba(109,40,217,0.4))",
  "drop-shadow(0 0 100px rgba(34,211,238,0.2))",
  "drop-shadow(-10px -12px 22px rgba(34,211,238,0.3))",
  "drop-shadow(12px 16px 26px rgba(0,0,0,0.35))",
].join(" ");

/** A full radial fade on every edge — this portrait needs to dissolve into the page on all sides, not just ground at the bottom, since it IS the hero visual rather than a background accent. */
const FOUNDER_MASK = "radial-gradient(ellipse 68% 82% at 50% 42%, black 45%, transparent 92%)";

const FOUNDER_GLOW_TIGHT: CSSProperties = {
  background: "radial-gradient(circle, rgba(109,40,217,0.5) 0%, rgba(37,99,235,0.32) 32%, rgba(34,211,238,0.2) 55%, transparent 75%)",
};
const FOUNDER_GLOW_AMBIENT: CSSProperties = {
  background: "radial-gradient(circle, rgba(109,40,217,0.24) 0%, rgba(34,211,238,0.13) 45%, transparent 72%)",
};

export function FounderHeroStage() {
  const character = characterAssets[founderHero.characterPose];

  return (
    <div className="relative w-full">
      {/* Desktop: large blended portrait + scattered dashboard widgets */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-lg lg:block">
        <motion.div
          animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[140px] mix-blend-multiply dark:mix-blend-screen"
        />

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="founder-hero-link" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.45} />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          {founderHeroWidgets.map((widget) => {
            const path = `M 50 50 Q ${(50 + widget.x) / 2} ${(50 + widget.y) / 2} ${widget.x} ${widget.y}`;
            return (
              <g key={widget.id}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="url(#founder-hero-link)"
                  strokeWidth={0.18}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: widget.delay, ease: "easeOut" }}
                />
                <motion.path
                  d={path}
                  fill="none"
                  stroke={ACCENT_VAR[widget.accent]}
                  strokeWidth={0.4}
                  strokeLinecap="round"
                  strokeDasharray="1.4 18"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.75, strokeDashoffset: [0, -200] }}
                  transition={{
                    opacity: { duration: 0.4, delay: widget.delay + 0.8 },
                    strokeDashoffset: { duration: 4 + widget.depth * 2, repeat: Infinity, ease: "linear", delay: widget.delay + 0.9 },
                  }}
                />
              </g>
            );
          })}
        </svg>

        <div
          aria-hidden="true"
          style={FOUNDER_GLOW_AMBIENT}
          className="absolute top-1/2 left-1/2 -z-10 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
        />
        <div
          aria-hidden="true"
          style={FOUNDER_GLOW_TIGHT}
          className="absolute top-1/2 left-1/2 -z-10 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px] mix-blend-multiply dark:mix-blend-screen"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
          transition={{
            opacity: { duration: 1, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 1, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute top-1/2 left-1/2 z-[5] size-[86%] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute inset-0" style={{ maskImage: FOUNDER_MASK, WebkitMaskImage: FOUNDER_MASK }}>
            <Image
              src={character.src}
              alt={character.alt}
              fill
              preload
              sizes="32rem"
              className="object-contain"
              style={{ filter: FOUNDER_FILTER }}
            />
          </div>
        </motion.div>

        {founderHeroWidgets.map((widget) => (
          <HeroWidgetChip key={widget.id} widget={widget} />
        ))}
      </div>

      {/* Tablet / mobile: portrait only */}
      <div className="relative mx-auto aspect-square w-64 sm:w-80 lg:hidden">
        <div
          aria-hidden="true"
          style={FOUNDER_GLOW_AMBIENT}
          className="absolute -inset-[80%] -z-20 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen"
        />
        <div
          aria-hidden="true"
          style={FOUNDER_GLOW_TIGHT}
          className="absolute -inset-[40%] -z-10 rounded-full blur-[55px] mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.9 },
            scale: { duration: 0.9 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative h-full w-full"
        >
          <div className="absolute inset-0" style={{ maskImage: FOUNDER_MASK, WebkitMaskImage: FOUNDER_MASK }}>
            <Image
              src={character.src}
              alt={character.alt}
              fill
              sizes="20rem"
              className="object-contain"
              style={{ filter: FOUNDER_FILTER }}
            />
          </div>
        </motion.div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:hidden">
        {founderHeroWidgets
          .filter((widget) => widget.compact)
          .map((widget) => {
            const Icon = widget.icon;
            return (
              <div key={widget.id} className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-full px-3 py-1.5")}>
                <Icon className="size-3.5 text-accent-text" aria-hidden="true" />
                <span className="text-xs font-medium text-muted-foreground">{widget.label}</span>
                <span className="font-heading text-xs font-bold whitespace-nowrap text-foreground">
                  {widget.kind === "metric" ? (
                    <AnimatedCounter value={widget.numericValue} prefix={widget.prefix} suffix={widget.suffix} decimals={widget.decimals} />
                  ) : (
                    widget.status
                  )}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
