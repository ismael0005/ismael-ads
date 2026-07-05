"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { globalCounters, globalIntro, globalNodes, type GlobalNode } from "@/data/contact";

const ACCENT_STROKE: Record<GlobalNode["accent"], string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
};

const DOT_GRID =
  "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)";

function MapPin({ node }: { node: GlobalNode }) {
  const Icon = node.icon;
  return (
    <div style={{ left: `${node.x}%`, top: `${node.y}%` }} className="absolute -translate-x-1/2 -translate-y-1/2">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-1.5"
      >
        <span className={cn("relative flex items-center justify-center rounded-full ring-1", node.isHome ? "size-11" : "size-8", accentChipClasses[node.accent])}>
          <motion.span
            aria-hidden="true"
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            className={cn("absolute inset-0 rounded-full", accentChipClasses[node.accent])}
          />
          <Icon className={cn("relative", node.isHome ? "size-5" : "size-3.5")} aria-hidden="true" />
        </span>
        <span className="rounded-full bg-background/85 px-2 py-0.5 text-[9px] font-bold whitespace-nowrap text-foreground shadow-sm ring-1 ring-border">
          {node.label}
        </span>
        <span className="text-[8px] whitespace-nowrap text-muted-foreground">{node.stat}</span>
      </motion.div>
    </div>
  );
}

export function ContactGlobalAvailabilitySection() {
  const home = globalNodes.find((node) => node.isHome) ?? globalNodes[0];
  const others = globalNodes.filter((node) => !node.isHome);

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...globalIntro} className="mx-auto mb-14 max-w-3xl" />

      <div
        className={cn(glass.base, glass.light, "relative mx-auto h-[24rem] max-w-5xl overflow-hidden rounded-[2rem] sm:h-[28rem]")}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.14]"
          style={{ backgroundImage: DOT_GRID, backgroundSize: "16px 16px" }}
        />

        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]"
        />

        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
          {others.map((node) => {
            const path = `M ${home.x} ${home.y} Q ${(home.x + node.x) / 2} ${(home.y + node.y) / 2 - 12} ${node.x} ${node.y}`;
            return (
              <motion.path
                key={node.id}
                d={path}
                fill="none"
                stroke={ACCENT_STROKE[node.accent]}
                strokeWidth={0.3}
                strokeLinecap="round"
                strokeDasharray="1.2 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ opacity: 0.7, pathLength: 1, strokeDashoffset: [0, -60] }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  pathLength: { duration: 1.2, ease: "easeOut" },
                  opacity: { duration: 0.6 },
                  strokeDashoffset: { duration: 4, repeat: Infinity, ease: "linear" },
                }}
              />
            );
          })}
        </svg>

        {globalNodes.map((node) => (
          <MapPin key={node.id} node={node} />
        ))}

        <div className="absolute top-4 right-4 flex flex-col gap-2 sm:top-6 sm:right-6">
          {globalCounters.map((counter, index) => {
            const Icon = counter.icon;
            return (
              <motion.div
                key={counter.id}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-full px-3 py-1.5")}
              >
                <Icon className="size-3.5 text-primary-text" aria-hidden="true" />
                <span className="text-[10px] font-bold whitespace-nowrap text-foreground">{counter.value}</span>
                <span className="text-[9px] whitespace-nowrap text-muted-foreground">{counter.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
