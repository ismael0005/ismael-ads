"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { PhoneFrame } from "@/components/sections/app-monetization/phone-frame";
import { TvFrame } from "@/components/sections/ctv-monetization/tv-frame";
import { MonitorFrame } from "@/components/sections/ad-formats/monitor-frame";
import { LaptopFrame } from "@/components/sections/ad-formats/laptop-frame";
import { TabletFrame } from "@/components/sections/ad-formats/tablet-frame";
import { AdCreative } from "@/components/sections/ad-formats/ad-creative";
import { HeroWidgetChip } from "@/components/ui/hero-widget-chip";
import { useAutoCycle } from "@/hooks/use-auto-cycle";
import { adFormatCatalog, adFormatsHeroWidgets } from "@/data/ad-formats";

const ACCENT_VAR: Record<string, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
};

const DESKTOP_FORMATS = adFormatCatalog.filter((f) => f.devices.includes("desktop"));
const MOBILE_FORMATS = adFormatCatalog.filter((f) => f.devices.includes("mobile"));
const CTV_FORMATS = adFormatCatalog.filter((f) => f.devices.includes("ctv"));

function useCycledFormat(pool: typeof adFormatCatalog, intervalMs: number, startIndex: number) {
  const [index] = useAutoCycle(pool.length, intervalMs, startIndex);
  return pool[index];
}

export function AdFormatsHeroStage() {
  const monitorFormat = useCycledFormat(DESKTOP_FORMATS, 2600, 0);
  const laptopFormat = useCycledFormat(DESKTOP_FORMATS, 3100, 3);
  const tabletFormat = useCycledFormat(DESKTOP_FORMATS, 2900, 5);
  const phoneFormat = useCycledFormat(MOBILE_FORMATS, 2300, 0);
  const tvFormat = useCycledFormat(CTV_FORMATS, 3400, 1);

  return (
    <div className="relative w-full">
      {/*
        Desktop: full layered device ecosystem. The hero grid gives this column
        roughly 650-700px in practice (lg:grid-cols-[1fr_1.4fr], not the full
        viewport) — device widths below are fixed rem sizes hand-verified
        against THAT real width, not against max-w-6xl, so all five bounding
        boxes stay provably non-overlapping with 28px+ margins. Devices are
        confined to the vertical middle (~30%-72%) so the hero widgets can
        occupy the clear top/bottom bands — see adFormatsHeroWidgets in the data file.
      */}
      <div className="relative mx-auto hidden h-[20rem] w-full max-w-2xl lg:block">
        <motion.div
          animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[140px] mix-blend-multiply dark:mix-blend-screen"
        />

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="af-hero-link" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.45} />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          {adFormatsHeroWidgets.map((widget) => {
            const path = `M 50 48 Q ${(50 + widget.x) / 2} ${(48 + widget.y) / 2} ${widget.x} ${widget.y}`;
            return (
              <g key={widget.id}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="url(#af-hero-link)"
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

        {/* TV — furthest back, far left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.55, x: 0, y: [0, -8, 0] }}
          transition={{ opacity: { duration: 0.8, delay: 0.1 }, x: { duration: 0.8, delay: 0.1 }, y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute top-[38%] left-0 z-[1] w-20"
        >
          <TvFrame showStand={false} className="shadow-xl">
            <AdCreative format={tvFormat} showChrome={false} compact />
          </TvFrame>
        </motion.div>

        {/* Laptop — front-left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.9, y: [0, -8, 0] }}
          transition={{ opacity: { duration: 0.8, delay: 0.25 }, y: { duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 } }}
          className="absolute top-[36%] left-[18%] z-[6] w-28"
        >
          <LaptopFrame className="shadow-2xl">
            <AdCreative format={laptopFormat} showChrome={false} compact />
          </LaptopFrame>
        </motion.div>

        {/* Monitor — the hero device, center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute top-[28%] left-[42%] z-[5] w-44"
        >
          <MonitorFrame className="shadow-2xl ring-1 ring-white/10">
            <AdCreative format={monitorFormat} />
          </MonitorFrame>
        </motion.div>

        {/* Tablet — front-right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.85, x: 0, y: [0, 10, 0] }}
          transition={{ opacity: { duration: 0.8, delay: 0.4 }, x: { duration: 0.8, delay: 0.4 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 } }}
          className="absolute top-[38%] left-[74%] z-[7] w-14"
        >
          <TabletFrame className="shadow-xl">
            <AdCreative format={tabletFormat} showChrome={false} compact />
          </TabletFrame>
        </motion.div>

        {/* Phone — frontmost, far right */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: [0, -12, 0] }}
          transition={{ opacity: { duration: 0.8, delay: 0.55 }, y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute top-[32%] left-[87%] z-[8] w-10"
        >
          <PhoneFrame className="shadow-2xl ring-1 ring-white/10">
            <AdCreative format={phoneFormat} showChrome={false} compact />
          </PhoneFrame>
        </motion.div>

        {adFormatsHeroWidgets.map((widget) => (
          <HeroWidgetChip key={widget.id} widget={widget} />
        ))}
      </div>

      {/* Tablet / mobile: monitor only, no absolute-positioned ecosystem */}
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
          <MonitorFrame className="shadow-2xl">
            <AdCreative format={monitorFormat} />
          </MonitorFrame>
        </motion.div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:hidden">
        {adFormatsHeroWidgets
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
