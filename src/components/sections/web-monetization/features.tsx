"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentHoverClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { GlassIcon3D } from "@/components/ui/glass-icon";
import { motionVariants } from "@/styles/animations";
import { webFeatures, webFeaturesIntro } from "@/data/web-monetization";

export function WebFeaturesSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...webFeaturesIntro} className="mx-auto mb-14 max-w-2xl" />

      <motion.div
        variants={motionVariants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {webFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={motionVariants.fadeInUp}
              className={cn(
                glass.base,
                glass.light,
                accentHoverClasses[feature.accent],
                "group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              )}
            >
              <GlassIcon3D icon={Icon} accent={feature.accent} size="md" />
              <h3 className="mt-5 font-heading text-base font-bold text-foreground">{feature.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
