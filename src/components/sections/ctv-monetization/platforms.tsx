"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { TvFrame } from "@/components/sections/ctv-monetization/tv-frame";
import { StreamingScreen } from "@/components/sections/ctv-monetization/streaming-screen";
import { ctvDevices, ctvPlatformsIntro, type CtvDevice } from "@/data/ctv-monetization";

const PLATFORM_POSITIONS = [
  { x: 12, y: 10 }, { x: 50, y: 4 }, { x: 88, y: 10 }, { x: 95, y: 50 },
  { x: 88, y: 90 }, { x: 50, y: 96 }, { x: 12, y: 90 }, { x: 5, y: 50 },
];

function PlatformBadge({ device, x, y, delay }: { device: CtvDevice; x: number; y: number; delay: number }) {
  const Icon = device.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay }}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5 + (delay % 3), repeat: Infinity, ease: "easeInOut", delay }}
        whileHover={{ scale: 1.12, y: -4 }}
        className={cn(
          glass.base,
          glass.light,
          "flex cursor-default items-center gap-2 rounded-full px-3.5 py-2 shadow-lg transition-[box-shadow,border-color] duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/20"
        )}
      >
        <Icon className="size-3.5 text-muted-foreground transition-colors duration-300 group-hover:text-accent-text" aria-hidden="true" />
        <span className="text-xs font-semibold whitespace-nowrap text-foreground">{device.name}</span>
      </motion.div>
    </motion.div>
  );
}

export function CtvPlatformsSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...ctvPlatformsIntro} className="mx-auto mb-16 max-w-2xl" />

      {/* Desktop: platform badges floating around a large center TV */}
      <div className="relative mx-auto hidden h-[30rem] w-full max-w-4xl lg:block">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="ctv-platform-link" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          {PLATFORM_POSITIONS.map((pos, index) => (
            <motion.line
              key={index}
              x1={pos.x}
              y1={pos.y}
              x2={50}
              y2={50}
              stroke="url(#ctv-platform-link)"
              strokeWidth={0.18}
              strokeDasharray="1.2 2.4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
            />
          ))}
        </svg>

        {ctvDevices.map((device, index) => {
          const pos = PLATFORM_POSITIONS[index % PLATFORM_POSITIONS.length];
          return <PlatformBadge key={device.name} device={device} x={pos.x} y={pos.y} delay={index * 0.1} />;
        })}

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 left-1/2 z-10 w-80 -translate-x-1/2 -translate-y-1/2 sm:w-96"
        >
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <TvFrame className="shadow-2xl ring-1 ring-white/10">
              <StreamingScreen />
            </TvFrame>
          </motion.div>
        </motion.div>
      </div>

      {/* Tablet / mobile: TV + simple floating grid, no absolute positioning */}
      <div className="mx-auto max-w-xs sm:max-w-sm lg:hidden">
        <TvFrame className="shadow-2xl">
          <StreamingScreen />
        </TvFrame>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:hidden">
        {ctvDevices.map((device, index) => {
          const Icon = device.icon;
          return (
            <motion.div
              key={device.name}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
              className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-full px-3.5 py-2")}
            >
              <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
              <span className="text-xs font-semibold whitespace-nowrap text-foreground">{device.name}</span>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
