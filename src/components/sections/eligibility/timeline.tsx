"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { timelineIntro, timelineSteps } from "@/data/eligibility-checker";

gsap.registerPlugin(ScrollTrigger);

export function EligibilityTimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

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

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-4">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial="dim"
                  whileInView="lit"
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex flex-1 flex-col items-center gap-4 text-center"
                >
                  <span className="absolute -top-9 hidden rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-bold text-muted-foreground sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <motion.span
                    variants={{
                      dim: { scale: 0.85, opacity: 0.5 },
                      lit: { scale: 1, opacity: 1 },
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      glass.base,
                      glass.light,
                      "relative z-10 flex size-16 items-center justify-center rounded-2xl ring-1",
                      accentChipClasses[step.accent]
                    )}
                  >
                    <motion.span
                      aria-hidden="true"
                      variants={{
                        dim: { opacity: 0, scale: 1 },
                        lit: { opacity: 0.5, scale: [1, 1.25, 1] },
                      }}
                      transition={{
                        opacity: { duration: 0.5 },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      }}
                      className="absolute inset-0 -z-10 rounded-2xl bg-current blur-xl"
                    />
                    <Icon className="size-6" aria-hidden="true" />
                  </motion.span>
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground">{step.title}</p>
                    <p className="mx-auto mt-1.5 max-w-[11rem] text-xs leading-snug text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}
