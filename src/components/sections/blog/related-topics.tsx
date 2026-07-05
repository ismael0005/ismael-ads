"use client";

import { motion } from "framer-motion";
import { Hash } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { motionVariants } from "@/styles/animations";
import { relatedTopics, relatedTopicsIntro } from "@/data/blog";

export function BlogRelatedTopicsSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...relatedTopicsIntro} className="mx-auto mb-10 max-w-2xl" />

      <motion.div
        variants={motionVariants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2.5"
      >
        {relatedTopics.map((topic) => (
          <motion.span
            key={topic}
            variants={motionVariants.fadeInUp}
            whileHover={{ scale: 1.05 }}
            className={cn(
              glass.base,
              glass.light,
              "flex cursor-default items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors duration-300 hover:text-foreground"
            )}
          >
            <Hash className="size-3.5 text-primary-text" aria-hidden="true" />
            {topic}
          </motion.span>
        ))}
      </motion.div>
    </Section>
  );
}
