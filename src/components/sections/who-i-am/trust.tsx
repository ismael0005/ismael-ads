"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentHoverClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { motionVariants } from "@/styles/animations";
import { trustCards, trustIntro } from "@/data/who-i-am";

export function WhoIAmTrustSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...trustIntro} className="mx-auto mb-14 max-w-2xl" />

      <motion.div
        variants={motionVariants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {trustCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.id} variants={motionVariants.fadeInUp}>
              <TiltCard maxTilt={6}>
                <div
                  className={cn(
                    glass.base,
                    glass.light,
                    accentHoverClasses[card.accent],
                    "flex h-full flex-col rounded-2xl p-6 transition-all duration-300"
                  )}
                >
                  <span className={cn("flex size-11 items-center justify-center rounded-2xl ring-1", accentChipClasses[card.accent])}>
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-heading text-base font-bold text-foreground">{card.label}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{card.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
