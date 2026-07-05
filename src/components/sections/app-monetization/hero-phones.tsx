"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { PhoneFrame } from "@/components/sections/app-monetization/phone-frame";
import { AdScreen } from "@/components/sections/app-monetization/ad-screen";
import { HeroWidgetChip } from "@/components/ui/hero-widget-chip";
import { useAutoCycle } from "@/hooks/use-auto-cycle";
import { appAdFormats, appHeroWidgets } from "@/data/app-monetization";

const ACCENT_VAR: Record<string, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
};

function CyclingPhone({
  intervalMs,
  startIndex,
  className,
}: {
  intervalMs: number;
  startIndex: number;
  className?: string;
}) {
  const [index] = useAutoCycle(appAdFormats.length, intervalMs, startIndex);
  return (
    <PhoneFrame className={className}>
      <AdScreen format={appAdFormats[index]} />
    </PhoneFrame>
  );
}

export function AppHeroPhones() {
  return (
    <div className="relative w-full">
      {/* Desktop: full layered 3D phone stack + scattered widgets */}
      <div
        className="relative mx-auto hidden aspect-[4/5] w-full max-w-md lg:block lg:max-w-lg"
        style={{ perspective: "1400px" }}
      >
        <motion.div
          animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[110px] mix-blend-multiply dark:mix-blend-screen"
        />

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="app-hero-link" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.45} />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          {appHeroWidgets.map((widget) => {
            const path = `M 50 52 Q ${(50 + widget.x) / 2} ${(52 + widget.y) / 2} ${widget.x} ${widget.y}`;
            return (
              <g key={widget.id}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="url(#app-hero-link)"
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

        {/* Back-left phone — decorative depth cue, permanently dimmed, never the primary reading content */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, rotateY: -16, x: -20 }}
          animate={{ opacity: 0.85, rotateY: -16, x: 0, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.15 },
            x: { duration: 0.8, delay: 0.15 },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute top-[10%] left-[14%] z-[1] w-[34%]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <CyclingPhone intervalMs={3200} startIndex={3} className="shadow-xl" />
        </motion.div>

        {/* Back-right phone — decorative depth cue, permanently dimmed, never the primary reading content */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, rotateY: 16, x: 20 }}
          animate={{ opacity: 0.85, rotateY: 16, x: 0, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.3 },
            x: { duration: 0.8, delay: 0.3 },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          }}
          className="absolute top-[16%] right-[12%] z-[1] w-[34%]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <CyclingPhone intervalMs={2800} startIndex={6} className="shadow-xl" />
        </motion.div>

        {/* Front-center phone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: [0, -12, 0], rotateY: [-5, 5, -5] }}
          transition={{
            opacity: { duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute top-1/2 left-1/2 z-[5] w-[46%] -translate-x-1/2 -translate-y-1/2"
          style={{ transformStyle: "preserve-3d" }}
        >
          <CyclingPhone intervalMs={2200} startIndex={0} className="shadow-2xl ring-1 ring-white/10" />
        </motion.div>

        {appHeroWidgets.map((widget) => (
          <HeroWidgetChip key={widget.id} widget={widget} />
        ))}
      </div>

      {/* Tablet / mobile: single phone, no absolute-positioned ecosystem */}
      <div className="relative mx-auto w-56 sm:w-64 lg:hidden">
        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[90px] mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.8 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <CyclingPhone intervalMs={2200} startIndex={0} className="shadow-2xl" />
        </motion.div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:hidden">
        {appHeroWidgets
          .filter((widget) => widget.compact)
          .map((widget) => {
            const Icon = widget.icon;
            return (
              <div
                key={widget.id}
                className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-full px-3 py-1.5")}
              >
                <Icon className="size-3.5 text-accent-text" aria-hidden="true" />
                <span className="text-xs font-medium text-muted-foreground">{widget.label}</span>
                <span className="font-heading text-xs font-bold whitespace-nowrap text-foreground">
                  {widget.kind === "metric" ? (
                    <AnimatedCounter
                      value={widget.numericValue}
                      prefix={widget.prefix}
                      suffix={widget.suffix}
                      decimals={widget.decimals}
                    />
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
