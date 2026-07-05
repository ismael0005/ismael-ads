"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { GlassIcon3D } from "@/components/ui/glass-icon";
import { learningPathIntro, learningPathSteps } from "@/data/blog";

gsap.registerPlugin(ScrollTrigger);

export function BlogLearningPathSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const progress = progressRef.current;
    if (!section || !progress) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      end: "bottom 70%",
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.set(progress, { scaleY: self.progress });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div ref={sectionRef}>
      <Section spacing="lg" className="relative overflow-hidden">
        <SectionHeading {...learningPathIntro} className="mx-auto mb-16 max-w-2xl" />

        <div className="relative mx-auto flex max-w-xl flex-col items-center">
          <div className="absolute top-6 bottom-6 left-[2.375rem] w-px bg-border" />
          <div
            ref={progressRef}
            style={{ transformOrigin: "top", transform: "scaleY(0)" }}
            className="absolute top-6 bottom-6 left-[2.375rem] w-px bg-gradient-to-b from-primary via-secondary to-accent"
          />

          {learningPathSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="relative w-full"
              >
                <Link
                  href={step.href}
                  className={cn(
                    glass.base,
                    glass.light,
                    "group flex w-full items-center gap-4 rounded-2xl p-4 transition-shadow duration-300 hover:shadow-lg"
                  )}
                >
                  <GlassIcon3D icon={Icon} accent={step.accent} size="md" className="relative z-10" static />
                  <div className="min-w-0">
                    <p className={cn("text-sm font-bold", accentTextClasses[step.accent])}>{step.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </Link>

                {index < learningPathSteps.length - 1 && (
                  <div className="flex justify-start py-2 pl-[1.875rem]">
                    <motion.div
                      animate={{ y: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.1 }}
                    >
                      <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
