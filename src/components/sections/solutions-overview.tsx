"use client";

import { motion } from "framer-motion";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { WebMonetizationCard } from "@/components/sections/solutions/web-monetization-card";
import { AppMonetizationCard } from "@/components/sections/solutions/app-monetization-card";
import { CtvMonetizationCard } from "@/components/sections/solutions/ctv-monetization-card";
import { motionVariants } from "@/styles/animations";
import { solutionsIntro } from "@/data/home";

export function SolutionsOverview() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...solutionsIntro} className="mx-auto mb-14 max-w-2xl" />

      <motion.div
        variants={motionVariants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-6 lg:grid-cols-3 lg:grid-rows-[minmax(420px,auto)_minmax(420px,auto)]"
      >
        <motion.div
          variants={motionVariants.fadeInUp}
          className="lg:col-start-1 lg:col-span-2 lg:row-start-1"
        >
          <WebMonetizationCard />
        </motion.div>
        <motion.div
          variants={motionVariants.fadeInUp}
          className="lg:col-start-3 lg:col-span-1 lg:row-start-1 lg:row-span-2"
        >
          <AppMonetizationCard />
        </motion.div>
        <motion.div
          variants={motionVariants.fadeInUp}
          className="lg:col-start-1 lg:col-span-2 lg:row-start-2"
        >
          <CtvMonetizationCard />
        </motion.div>
      </motion.div>
    </Section>
  );
}
