"use client";

import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { appPartners, appPartnersIntro, type AppPartner } from "@/data/app-monetization";

const CLOUD_POSITIONS = [
  { x: 15, y: 14 }, { x: 38, y: 7 }, { x: 63, y: 9 }, { x: 86, y: 17 },
  { x: 7, y: 42 }, { x: 93, y: 40 }, { x: 18, y: 68 }, { x: 45, y: 89 },
  { x: 68, y: 86 }, { x: 88, y: 66 }, { x: 50, y: 24 },
];

function CloudNode({ partner, x, y, delay }: { partner: AppPartner; x: number; y: number; delay: number }) {
  const Icon = partner.icon;
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
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 5 + (delay % 3), repeat: Infinity, ease: "easeInOut", delay }}
        whileHover={{ scale: 1.08 }}
        className={cn(
          glass.base,
          glass.light,
          "group flex cursor-default items-center gap-2 rounded-full px-3.5 py-2 shadow-lg transition-[box-shadow,border-color] duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20"
        )}
      >
        <Icon className="size-3.5 text-muted-foreground transition-colors duration-300 group-hover:text-primary-text" aria-hidden="true" />
        <span className="text-xs font-semibold whitespace-nowrap text-foreground">{partner.name}</span>
      </motion.div>
    </motion.div>
  );
}

export function AppPartnerCloudSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...appPartnersIntro} className="mx-auto mb-16 max-w-2xl" />

      {/* Desktop: floating cloud converging into the AI engine node */}
      <div className="relative mx-auto hidden h-[30rem] w-full max-w-4xl lg:block">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="partner-link" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          {CLOUD_POSITIONS.map((pos, index) => (
            <motion.line
              key={index}
              x1={pos.x}
              y1={pos.y}
              x2={50}
              y2={50}
              stroke="url(#partner-link)"
              strokeWidth={0.15}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
            />
          ))}
        </svg>

        {appPartners.map((partner, index) => {
          const pos = CLOUD_POSITIONS[index % CLOUD_POSITIONS.length];
          return <CloudNode key={partner.name} partner={partner} x={pos.x} y={pos.y} delay={index * 0.12} />;
        })}

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative flex flex-col items-center gap-2">
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-2xl"
            />
            <span className="flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent text-white shadow-glow-primary">
              <BrainCircuit className="size-9" aria-hidden="true" />
            </span>
            <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-bold whitespace-nowrap text-foreground shadow-md ring-1 ring-border">
              Ismael AI Engine
            </span>
          </div>
        </motion.div>
      </div>

      {/* Tablet / mobile: simple floating grid, no absolute positioning */}
      <div className="flex flex-wrap items-center justify-center gap-3 lg:hidden">
        {appPartners.map((partner, index) => {
          const Icon = partner.icon;
          return (
            <motion.div
              key={partner.name}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
              className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-full px-3.5 py-2")}
            >
              <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
              <span className="text-xs font-semibold whitespace-nowrap text-foreground">{partner.name}</span>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
