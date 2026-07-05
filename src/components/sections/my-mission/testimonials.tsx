"use client";

import { useState } from "react";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentBorderClasses, accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { missionTestimonials, missionTestimonialsIntro, type MissionTestimonial } from "@/data/my-mission";

const WIDTHS = ["w-72", "w-80", "w-64", "w-[22rem]"];
const ROTATIONS = [-1.5, 1, -1, 1.5, 0];

function chunk<T>(items: T[], parts: number): T[][] {
  const rows: T[][] = Array.from({ length: parts }, () => []);
  items.forEach((item, index) => rows[index % parts].push(item));
  return rows;
}

const ROWS = chunk(missionTestimonials, 2);
const ROW_CONFIG = [
  { direction: "left" as const, duration: 72 },
  { direction: "right" as const, duration: 84 },
];

function TestimonialCard({ testimonial, index }: { testimonial: MissionTestimonial; index: number }) {
  return (
    <motion.div
      style={{ rotate: ROTATIONS[index % ROTATIONS.length] }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        glass.base,
        glass.light,
        "flex shrink-0 flex-col gap-4 rounded-3xl border-t-4 p-5",
        accentBorderClasses[testimonial.accent],
        WIDTHS[index % WIDTHS.length]
      )}
    >
      <span className={cn("flex size-9 items-center justify-center rounded-full ring-1", accentChipClasses[testimonial.accent])}>
        <Quote className="size-4" aria-hidden="true" />
      </span>
      <p className="text-sm leading-snug text-foreground/90">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-auto border-t border-border pt-3">
        <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
        <p className={cn("text-xs", accentTextClasses[testimonial.accent])}>{testimonial.role}</p>
      </div>
    </motion.div>
  );
}

function MarqueeRow({ testimonials, direction, duration }: { testimonials: MissionTestimonial[]; direction: "left" | "right"; duration: number }) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div
        style={{
          animationName: direction === "left" ? "marquee-left" : "marquee-right",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: isPaused ? "paused" : "running",
        }}
        className="flex w-max gap-5"
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} index={index} />
        ))}
      </div>
    </div>
  );
}

export function MissionTestimonialsSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...missionTestimonialsIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className="flex flex-col gap-5">
        {ROWS.map((row, index) => (
          <MarqueeRow key={index} testimonials={row} direction={ROW_CONFIG[index].direction} duration={ROW_CONFIG[index].duration} />
        ))}
      </div>
    </Section>
  );
}
