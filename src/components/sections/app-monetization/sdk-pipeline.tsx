"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentGlowClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { motionVariants } from "@/styles/animations";
import { appSdkIntro, appSdkPipeline } from "@/data/app-monetization";

export function AppSdkPipelineSection() {
  return (
    <Section id="sdk-integration" spacing="lg" className="relative scroll-mt-24 overflow-hidden">
      <SectionHeading {...appSdkIntro} className="mx-auto mb-16 max-w-2xl" />

      <div className="relative mx-auto max-w-xl">
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-7 w-px bg-gradient-to-b from-transparent via-border to-transparent"
        />
        <motion.div
          aria-hidden="true"
          className="absolute left-7 h-24 w-px bg-gradient-to-b from-transparent via-primary to-transparent"
          animate={{ top: ["0%", "92%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          variants={motionVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-10"
        >
          {appSdkPipeline.map((node) => {
            const Icon = node.icon;
            return (
              <motion.div key={node.id} variants={motionVariants.fadeInUp} className="relative flex items-start gap-5">
                <span className="relative z-10 flex size-14 shrink-0 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className={cn("absolute inset-0 rounded-2xl opacity-40 blur-lg", accentGlowClasses[node.accent])}
                  />
                  <span
                    className={cn(
                      glass.base,
                      glass.light,
                      "relative flex size-14 items-center justify-center rounded-2xl ring-1",
                      accentChipClasses[node.accent]
                    )}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                </span>

                <div className={cn(glass.base, glass.light, "flex-1 rounded-2xl px-5 py-4")}>
                  <p className="font-heading text-base font-bold text-foreground">{node.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{node.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}
