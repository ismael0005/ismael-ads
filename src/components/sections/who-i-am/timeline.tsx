"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { timelineIntro, timelineMilestones } from "@/data/who-i-am";

gsap.registerPlugin(ScrollTrigger);

export function WhoIAmTimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(timelineMilestones[0].id);
  const active = timelineMilestones.find((m) => m.id === activeId) ?? timelineMilestones[0];

  useEffect(() => {
    const section = sectionRef.current;
    const progress = progressRef.current;
    if (!section || !progress) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      end: "bottom 55%",
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.set(progress, { scaleX: self.progress });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div ref={sectionRef}>
      <Section spacing="lg" className="relative overflow-hidden">
        <SectionHeading {...timelineIntro} className="mx-auto mb-14 max-w-2xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute top-8 right-8 left-8 hidden h-px bg-border sm:block" />
          <div
            ref={progressRef}
            style={{ transformOrigin: "left", transform: "scaleX(0)" }}
            className="absolute top-8 right-8 left-8 hidden h-px bg-gradient-to-r from-primary via-secondary to-accent sm:block"
          />

          <div
            role="region"
            aria-label="Career timeline milestones, scroll horizontally to see all"
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:justify-between sm:gap-2 sm:overflow-visible sm:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {timelineMilestones.map((milestone) => {
              const Icon = milestone.icon;
              const isActive = milestone.id === activeId;
              return (
                <button
                  key={milestone.id}
                  type="button"
                  onClick={() => setActiveId(milestone.id)}
                  className="relative flex w-28 shrink-0 snap-center flex-col items-center gap-3 text-center sm:w-auto sm:flex-1"
                >
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                    {milestone.year}
                  </span>
                  <motion.span
                    whileHover={{ scale: 1.08 }}
                    className={cn(
                      glass.base,
                      glass.light,
                      "relative z-10 flex size-14 items-center justify-center rounded-2xl ring-1 transition-[box-shadow,border-color] duration-300",
                      accentChipClasses[milestone.accent],
                      isActive && "shadow-lg shadow-primary/25 ring-2 ring-primary/40"
                    )}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </motion.span>
                  <p className={cn("text-xs font-semibold", isActive ? "text-foreground" : "text-muted-foreground")}>
                    {milestone.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={cn(glass.base, glass.light, "flex items-start gap-4 rounded-2xl p-5")}
            >
              <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl ring-1", accentChipClasses[active.accent])}>
                <active.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-foreground">
                  {active.year} · {active.label}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{active.description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>
    </div>
  );
}
