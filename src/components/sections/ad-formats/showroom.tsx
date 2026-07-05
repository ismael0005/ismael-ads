"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Laptop, Smartphone, Tv } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { MonitorFrame } from "@/components/sections/ad-formats/monitor-frame";
import { PhoneFrame } from "@/components/sections/app-monetization/phone-frame";
import { TvFrame } from "@/components/sections/ctv-monetization/tv-frame";
import { AdCreative } from "@/components/sections/ad-formats/ad-creative";
import { adFormatCatalog, showroomIntro, type DeviceType } from "@/data/ad-formats";

const DEVICE_ICONS: Record<DeviceType, typeof Laptop> = {
  desktop: Laptop,
  mobile: Smartphone,
  ctv: Tv,
};

const DEVICE_LABELS: Record<DeviceType, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  ctv: "CTV",
};

function PreviewFrame({ deviceType, children }: { deviceType: DeviceType; children: ReactNode }) {
  if (deviceType === "mobile") {
    return (
      <div className="mx-auto w-48 sm:w-56">
        <PhoneFrame className="shadow-2xl">{children}</PhoneFrame>
      </div>
    );
  }
  if (deviceType === "ctv") {
    return (
      <div className="mx-auto w-full max-w-sm">
        <TvFrame className="shadow-2xl">{children}</TvFrame>
      </div>
    );
  }
  return (
    <div className="mx-auto w-full max-w-sm">
      <MonitorFrame className="shadow-2xl">{children}</MonitorFrame>
    </div>
  );
}

function RevenueTrend({ trend, accent }: { trend: number[]; accent: (typeof adFormatCatalog)[number]["accent"] }) {
  const width = 100;
  const height = 32;
  const max = Math.max(...trend);
  const min = Math.min(...trend);
  const points = trend.map((value, index) => {
    const x = (index / (trend.length - 1)) * width;
    const y = height - ((value - min) / (max - min || 1)) * height;
    return `${x},${y}`;
  });
  const linePath = `M ${points.join(" L ")}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className={cn("h-12 w-full overflow-visible", accentTextClasses[accent])} aria-hidden="true">
      <motion.path
        key={linePath}
        d={linePath}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-current"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </svg>
  );
}

export function AdFormatsShowroomSection() {
  const [activeId, setActiveId] = useState(adFormatCatalog[0].id);
  const active = adFormatCatalog.find((format) => format.id === activeId) ?? adFormatCatalog[0];
  const previewDevice: DeviceType = active.devices[0];

  return (
    <Section id="showroom" spacing="lg" className="relative scroll-mt-24 overflow-hidden">
      <SectionHeading {...showroomIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[240px_1fr]">
        <nav
          aria-label="Ad format categories"
          className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {adFormatCatalog.map((format) => {
            const Icon = format.icon;
            const isActive = format.id === activeId;
            return (
              <button
                key={format.id}
                type="button"
                onClick={() => setActiveId(format.id)}
                aria-pressed={isActive}
                className={cn(
                  "relative flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-left text-sm font-semibold whitespace-nowrap transition-colors duration-200 lg:w-full",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="showroom-active"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className={cn(glass.base, glass.light, "absolute inset-0 rounded-xl")}
                  />
                )}
                <span className={cn("relative z-10 flex size-8 shrink-0 items-center justify-center rounded-lg ring-1", accentChipClasses[format.accent])}>
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="relative z-10">{format.label}</span>
              </button>
            );
          })}
        </nav>

        <div className={cn(glass.base, glass.light, "grid gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-2")}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center"
            >
              <PreviewFrame deviceType={previewDevice}>
                <AdCreative format={active} />
              </PreviewFrame>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center"
            >
              <span className={cn("flex size-11 items-center justify-center rounded-2xl ring-1", accentChipClasses[active.accent])}>
                <active.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-heading text-xl font-bold text-foreground">{active.label}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{active.description}</p>

              <ul className="mt-5 space-y-2">
                {active.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-foreground/85">
                    <BadgeCheck className={cn("size-4 shrink-0", accentTextClasses[active.accent])} aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <p className="text-xs font-semibold text-muted-foreground">Revenue trend</p>
                <RevenueTrend trend={active.trend} accent={active.accent} />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground">Works on:</span>
                {active.devices.map((device) => {
                  const DeviceIcon = DEVICE_ICONS[device];
                  return (
                    <span key={device} className="flex items-center gap-1 rounded-full bg-foreground/[0.04] px-2 py-1 text-[10px] font-semibold text-foreground">
                      <DeviceIcon className="size-3" aria-hidden="true" />
                      {DEVICE_LABELS[device]}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
