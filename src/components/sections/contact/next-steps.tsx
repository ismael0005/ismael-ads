"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { nextSteps, nextStepsIntro } from "@/data/contact";

gsap.registerPlugin(ScrollTrigger);

export function ContactNextStepsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const progress = progressRef.current;
    if (!section || !progress) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      end: "bottom 60%",
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
        <SectionHeading {...nextStepsIntro} className="mx-auto mb-16 max-w-2xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute top-6 right-6 left-6 hidden h-px bg-border sm:block" />
          <div
            ref={progressRef}
            style={{ transformOrigin: "left", transform: "scaleX(0)" }}
            className="absolute top-6 right-6 left-6 hidden h-px bg-gradient-to-r from-primary via-secondary to-accent sm:block"
          />

          <div className="grid gap-8 sm:grid-cols-5 sm:gap-4">
            {nextSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative flex size-12 items-center justify-center">
                    <span
                      aria-hidden="true"
                      className="absolute font-heading text-4xl font-black text-foreground/[0.06] select-none"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={cn(glass.base, glass.light, "relative z-10 flex size-11 items-center justify-center rounded-2xl ring-1", accentChipClasses[step.accent])}>
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                  <p className={cn("mt-3 text-sm font-bold", accentTextClasses[step.accent])}>{step.label}</p>
                  <p className="mt-1.5 max-w-[11rem] text-xs text-muted-foreground">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}
