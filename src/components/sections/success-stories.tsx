"use client";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { ResultsWall } from "@/components/sections/success-stories/results-wall";
import { SuccessStatsStrip } from "@/components/sections/success-stories/success-stats-strip";
import { successStoriesIntro } from "@/data/home";

export function SuccessStories() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...successStoriesIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className="mb-16">
        <ResultsWall />
      </div>

      <SuccessStatsStrip />
    </Section>
  );
}
