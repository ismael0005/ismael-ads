"use client";

import { motion } from "framer-motion";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { ResultCard } from "@/components/sections/success-stories/result-card";
import { resultsWallCards } from "@/data/home";
import { webResultCardIds, webResultsIntro } from "@/data/web-monetization";

export function WebResultsSection() {
  const cards = webResultCardIds
    .map((id) => resultsWallCards.find((card) => card.id === id))
    .filter((card) => card !== undefined);

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...webResultsIntro} className="mx-auto mb-14 max-w-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-stretch justify-center gap-5"
      >
        {cards.map((card) => (
          <ResultCard key={card.id} card={card} />
        ))}
      </motion.div>
    </Section>
  );
}
