"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { Section } from "@/components/ui/section";
import { GradientText } from "@/components/ui/gradient-text";
import { missionPromise } from "@/data/my-mission";

export function MissionPromiseSection() {
  return (
    <Section spacing="xl" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 h-[36rem] w-40 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_100%_at_50%_50%,rgba(109,40,217,0.16),transparent_70%)] dark:bg-[radial-gradient(ellipse_50%_100%_at_50%_50%,rgba(109,40,217,0.32),transparent_70%)]"
      />

      <Quote
        aria-hidden="true"
        className="pointer-events-none absolute top-8 left-1/2 size-40 -translate-x-1/2 text-foreground/[0.04] sm:size-56"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg text-muted-foreground sm:text-xl"
        >
          {missionPromise.lineOne}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-heading text-3xl leading-tight font-black text-balance sm:text-5xl"
        >
          <GradientText>{missionPromise.lineTwo}</GradientText>
        </motion.p>
      </div>
    </Section>
  );
}
