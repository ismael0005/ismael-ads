"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MousePointerClick } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Sparkline } from "@/components/dashboard/sparkline";
import { GlassIcon3D } from "@/components/ui/glass-icon";
import { caseStudies, caseStudiesIntro } from "@/data/ad-formats";

export function AdFormatsCaseStudiesSection() {
  const [activeId, setActiveId] = useState(caseStudies[0].id);
  const active = caseStudies.find((study) => study.id === activeId) ?? caseStudies[0];

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...caseStudiesIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className="mx-auto flex max-w-4xl flex-wrap items-start justify-center gap-4">
        {caseStudies.map((study, index) => {
          const Icon = study.icon;
          const isActive = study.id === activeId;
          return (
            <motion.button
              key={study.id}
              type="button"
              onClick={() => setActiveId(study.id)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: index % 2 === 0 ? 0 : 14 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="w-36"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                className={cn(
                  glass.base,
                  glass.light,
                  "flex cursor-pointer flex-col items-center gap-2 rounded-2xl p-4 text-center transition-all duration-300",
                  isActive ? "ring-2 ring-primary/50 shadow-xl shadow-primary/15" : "hover:-translate-y-1"
                )}
              >
                <span className={cn("flex size-10 items-center justify-center rounded-xl ring-1", accentChipClasses[study.accent])}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="truncate text-xs font-bold text-foreground">{study.name}</p>
                <p className="truncate text-[10px] text-muted-foreground">{study.category}</p>
                <span className={cn("text-xs font-bold", accentTextClasses[study.accent])}>+{study.growthPercent}%</span>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={cn(glass.base, glass.light, "grid gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr]")}
          >
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <GlassIcon3D icon={active.icon} accent={active.accent} size="md" />
                <div>
                  <p className="font-heading text-lg font-bold text-foreground">{active.name}</p>
                  <p className="text-xs text-muted-foreground">{active.category}</p>
                </div>
              </div>

              <Sparkline trend={active.trend} accent={active.accent} className="mt-5 h-16" />

              {active.ctr > 0 && (
                <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MousePointerClick className="size-3.5" aria-hidden="true" />
                  CTR {active.ctr}%
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-foreground/[0.03] p-3">
                <p className="text-[10px] text-muted-foreground">Revenue Before</p>
                <p className="mt-1 text-sm font-bold text-muted-foreground line-through decoration-muted-foreground/40">
                  {active.revenueBefore}
                </p>
              </div>
              <div className="rounded-xl bg-foreground/[0.03] p-3">
                <p className="text-[10px] text-muted-foreground">Revenue After</p>
                <p className={cn("mt-1 text-sm font-bold", accentTextClasses[active.accent])}>{active.revenueAfter}</p>
              </div>
              <div className="rounded-xl bg-foreground/[0.03] p-3">
                <p className="text-[10px] text-muted-foreground">RPM Before</p>
                <p className="mt-1 text-sm font-bold text-muted-foreground line-through decoration-muted-foreground/40">
                  {active.rpmBefore}
                </p>
              </div>
              <div className="rounded-xl bg-foreground/[0.03] p-3">
                <p className="text-[10px] text-muted-foreground">RPM After</p>
                <p className={cn("mt-1 text-sm font-bold", accentTextClasses[active.accent])}>{active.rpmAfter}</p>
              </div>
              <div className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-primary/10 p-3 ring-1 ring-primary/20 sm:col-span-4">
                <ArrowRight className="size-3.5 text-primary-text" aria-hidden="true" />
                <span className="text-sm font-bold text-primary-text">+{active.growthPercent}% total revenue growth</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
