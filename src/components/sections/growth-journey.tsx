"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { GrowthStepNode } from "@/components/sections/growth-journey/growth-step-node";
import { GrowthConnector } from "@/components/sections/growth-journey/growth-connector";
import { characterAssets } from "@/data/assets";
import { growthJourneyIntro, growthSteps } from "@/data/home";

gsap.registerPlugin(ScrollTrigger);

/** Rim light + ambient shadow, CSS only — same lighting language as the founder in Hero/Final CTA. */
const GUIDE_FILTER = [
  "drop-shadow(0 0 24px rgba(109,40,217,0.3))",
  "drop-shadow(0 0 42px rgba(34,211,238,0.14))",
  "drop-shadow(-4px -5px 10px rgba(34,211,238,0.2))",
  "drop-shadow(4px 6px 12px rgba(0,0,0,0.25))",
].join(" ");

/** Same dual-layer, blend-mode-aware glow as the Hero/Final CTA founder, scaled down for this smaller guide. */
const GUIDE_GLOW_TIGHT: CSSProperties = {
  background:
    "radial-gradient(circle, rgba(109,40,217,0.5) 0%, rgba(37,99,235,0.32) 32%, rgba(34,211,238,0.2) 55%, transparent 75%)",
};
const GUIDE_GLOW_AMBIENT: CSSProperties = {
  background:
    "radial-gradient(circle, rgba(109,40,217,0.22) 0%, rgba(34,211,238,0.12) 45%, transparent 72%)",
};

export function GrowthJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const guide = characterAssets.pointingRight;

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
      <SectionHeading {...growthJourneyIntro} className="mx-auto mb-6 max-w-2xl" />

      <div className="relative mx-auto mb-10 h-px w-full max-w-xs overflow-hidden rounded-full bg-border">
        <div
          ref={progressRef}
          style={{ transformOrigin: "left", transform: "scaleX(0)" }}
          className="h-full w-full bg-gradient-to-r from-primary via-secondary to-accent"
        />
      </div>

      <div className="relative flex items-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden w-20 shrink-0 self-end pb-6 sm:block md:w-24"
        >
          <div
            aria-hidden="true"
            style={GUIDE_GLOW_AMBIENT}
            className="absolute -inset-[90%] -z-20 rounded-full blur-[45px] mix-blend-multiply dark:mix-blend-screen"
          />
          <div
            aria-hidden="true"
            style={GUIDE_GLOW_TIGHT}
            className="absolute -inset-[45%] -z-10 rounded-full blur-[30px] mix-blend-multiply dark:mix-blend-screen"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-square w-full"
          >
            <Image
              src={guide.src}
              alt={guide.alt}
              fill
              sizes="6rem"
              className="object-contain"
              style={{ filter: GUIDE_FILTER }}
            />
          </motion.div>
        </motion.div>

        <div
          role="region"
          aria-label="Growth journey steps, scroll horizontally to see all"
          tabIndex={0}
          className="-mx-4 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-4 pb-4 sm:gap-4 [-ms-overflow-style:none] [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-scrollbar]:hidden"
        >
          {growthSteps.map((step, index) => (
            <div key={step.id} className="flex items-stretch gap-3 sm:gap-4">
              <GrowthStepNode step={step} index={index} />
              {index < growthSteps.length - 1 && (
                <GrowthConnector accent={step.accent} delay={index * 0.15} />
              )}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={cn(
          glass.base,
          glass.light,
          "mx-auto mt-10 flex w-fit items-center gap-6 rounded-full px-6 py-3"
        )}
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="size-4 text-primary-text" aria-hidden="true" />
          <span className="text-sm font-bold text-foreground">+285%</span>
          <span className="text-xs text-muted-foreground">avg. revenue lift</span>
        </div>
        <span className="hidden h-6 w-px bg-border sm:block" aria-hidden="true" />
        <div className="hidden items-center gap-2 sm:flex">
          <Users className="size-4 text-accent-text" aria-hidden="true" />
          <span className="text-sm font-bold text-foreground">500+</span>
          <span className="text-xs text-muted-foreground">publishers already growing</span>
        </div>
      </motion.div>
    </Section>
    </div>
  );
}
