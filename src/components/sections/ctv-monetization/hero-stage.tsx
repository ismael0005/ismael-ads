"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { TvFrame } from "@/components/sections/ctv-monetization/tv-frame";
import { StreamingScreen } from "@/components/sections/ctv-monetization/streaming-screen";
import { HeroWidgetChip } from "@/components/ui/hero-widget-chip";
import { ctvDevices, ctvHeroWidgets } from "@/data/ctv-monetization";

const ACCENT_VAR: Record<string, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
};

export function CtvHeroStage() {
  const heroDevices = ctvDevices.slice(0, 6);

  return (
    <div className="relative w-full">
      {/* Desktop: TV + scattered widgets */}
      <div className="relative mx-auto hidden aspect-[4/3] w-full max-w-xl lg:block">
        <motion.div
          animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[42%] left-1/2 -z-10 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[130px] mix-blend-multiply dark:mix-blend-screen"
        />

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="ctv-hero-link" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.45} />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          {ctvHeroWidgets.map((widget) => {
            const path = `M 50 42 Q ${(50 + widget.x) / 2} ${(42 + widget.y) / 2} ${widget.x} ${widget.y}`;
            return (
              <g key={widget.id}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="url(#ctv-hero-link)"
                  strokeWidth={0.18}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: widget.delay, ease: "easeOut" }}
                />
                <motion.path
                  d={path}
                  fill="none"
                  stroke={ACCENT_VAR[widget.accent]}
                  strokeWidth={0.45}
                  strokeLinecap="round"
                  strokeDasharray="1.4 18"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8, strokeDashoffset: [0, -200] }}
                  transition={{
                    opacity: { duration: 0.4, delay: widget.delay + 0.8 },
                    strokeDashoffset: { duration: 4 + widget.depth * 2, repeat: Infinity, ease: "linear", delay: widget.delay + 0.9 },
                  }}
                />
              </g>
            );
          })}
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
          transition={{
            opacity: { duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute top-[42%] left-1/2 z-[5] w-[68%] -translate-x-1/2 -translate-y-1/2"
        >
          <TvFrame className="shadow-2xl ring-1 ring-white/10">
            <StreamingScreen />
          </TvFrame>
        </motion.div>

        {ctvHeroWidgets.map((widget) => (
          <HeroWidgetChip key={widget.id} widget={widget} />
        ))}
      </div>

      {/* Tablet / mobile: TV only */}
      <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:hidden">
        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[90px] mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{ opacity: { duration: 0.8 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <TvFrame className="shadow-2xl">
            <StreamingScreen />
          </TvFrame>
        </motion.div>
      </div>

      {/* Device row — every breakpoint */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
        {heroDevices.map((device, index) => {
          const Icon = device.icon;
          return (
            <motion.div
              key={device.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={cn(glass.base, glass.light, "flex items-center gap-1.5 rounded-full px-3 py-1.5")}
            >
              <Icon className="size-3.5 text-accent-text" aria-hidden="true" />
              <span className="text-xs font-medium whitespace-nowrap text-muted-foreground">{device.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
