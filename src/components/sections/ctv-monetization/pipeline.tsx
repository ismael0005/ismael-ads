"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { GlassIcon3D } from "@/components/ui/glass-icon";
import { ctvPipelineIntro, ctvPipelineNodes } from "@/data/ctv-monetization";

export function CtvPipelineSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...ctvPipelineIntro} className="mx-auto mb-16 max-w-2xl" />

      <div className="relative mx-auto max-w-2xl">
        <div className="absolute top-2 bottom-2 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent" />
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 h-28 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary to-transparent"
          animate={{ top: ["0%", "90%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        <div className="space-y-6">
          {ctvPipelineNodes.map((node, index) => {
            const Icon = node.icon;
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={cn("flex items-center gap-4", isEven ? "flex-row" : "flex-row-reverse")}
              >
                <div className={cn("flex-1", isEven ? "text-right" : "text-left")}>
                  <div
                    className={cn(
                      glass.base,
                      glass.light,
                      "inline-block rounded-2xl px-4 py-3 text-left sm:px-5 sm:py-3.5"
                    )}
                  >
                    <p className="font-heading text-sm font-bold text-foreground sm:text-base">{node.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{node.description}</p>
                  </div>
                </div>

                <GlassIcon3D icon={Icon} accent={node.accent} size="lg" className="shrink-0" />

                <div className="flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
