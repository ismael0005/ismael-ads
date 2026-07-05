"use client";

import { Quote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { philosophyQuote } from "@/data/who-i-am";

export function WhoIAmPhilosophySection() {
  return (
    <Section spacing="xl" className="relative overflow-hidden">
      <motion.div
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -z-10 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[150px] mix-blend-multiply dark:mix-blend-screen"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <Badge variant="outline" className="gap-1.5 border-black/10 bg-black/[0.03] backdrop-blur dark:border-white/15 dark:bg-white/5">
          <Sparkles className="size-3" aria-hidden="true" />
          My Philosophy
        </Badge>

        <Quote className="mt-8 size-12 text-primary/25" aria-hidden="true" />

        <p className="mt-4 font-heading text-2xl leading-snug font-bold text-balance text-foreground sm:text-4xl">
          {philosophyQuote.text}
        </p>

        <p className="mt-8 text-sm font-medium text-muted-foreground">{philosophyQuote.attribution}</p>
      </motion.div>
    </Section>
  );
}
