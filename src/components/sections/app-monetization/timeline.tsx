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
import { appTimelineIntro, appTimelineSteps } from "@/data/app-monetization";

gsap.registerPlugin(ScrollTrigger);

function TimelineNode({ step, index }: { step: (typeof appTimelineSteps)[number]; index: number }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial="dim"
      whileInView="lit"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay: index * 0.1 }}
      className="relative flex flex-1 flex-col items-center gap-4 text-center"
    >
      <motion.span
        variants={{
          dim: { scale: 0.85, opacity: 0.5, boxShadow: "0 0 0 rgba(0,0,0,0)" },
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
          variants={{ dim: { opacity: 0 }, lit: { opacity: 0.5 } }}
          transition={{ duration: 0.6 }}
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
}

export function AppTimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const progress = progressRef.current;
    if (!section || !progress) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
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
        <SectionHeading {...appTimelineIntro} className="mx-auto mb-16 max-w-2xl" />

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute top-8 right-8 left-8 hidden h-px bg-border sm:block" />
          <div
            ref={progressRef}
            style={{ transformOrigin: "left", transform: "scaleX(0)" }}
            className="absolute top-8 right-8 left-8 hidden h-px bg-gradient-to-r from-primary via-secondary to-accent sm:block"
          />

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-4">
            {appTimelineSteps.map((step, index) => (
              <TimelineNode key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
