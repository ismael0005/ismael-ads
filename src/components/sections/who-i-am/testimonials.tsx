"use client";

import { useState } from "react";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { personalTestimonials, testimonialsIntro, type PersonalTestimonial } from "@/data/who-i-am";

const WIDTHS = ["w-64", "w-72", "w-60", "w-80"];
const ROTATIONS = [-2, 1, -1, 2, 0];

function chunk<T>(items: T[], parts: number): T[][] {
  const rows: T[][] = Array.from({ length: parts }, () => []);
  items.forEach((item, index) => rows[index % parts].push(item));
  return rows;
}

const ROWS = chunk(personalTestimonials, 3);
const ROW_CONFIG = [
  { direction: "left" as const, duration: 52 },
  { direction: "right" as const, duration: 60 },
  { direction: "left" as const, duration: 68 },
];

function TestimonialCard({ testimonial, index }: { testimonial: PersonalTestimonial; index: number }) {
  const initials = testimonial.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <motion.div
      style={{ rotate: ROTATIONS[index % ROTATIONS.length] }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        glass.base,
        glass.light,
        "flex shrink-0 flex-col gap-3 rounded-2xl p-4",
        WIDTHS[index % WIDTHS.length]
      )}
    >
      <Quote className={cn("size-4", accentTextClasses[testimonial.accent])} aria-hidden="true" />
      <p className="text-xs leading-snug text-foreground/90">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-auto flex items-center gap-2 border-t border-border pt-3">
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ring-1",
            accentChipClasses[testimonial.accent]
          )}
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-foreground">{testimonial.name}</p>
          <p className="truncate text-[10px] text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

function MarqueeRow({ testimonials, direction, duration }: { testimonials: PersonalTestimonial[]; direction: "left" | "right"; duration: number }) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div
        style={{
          animationName: direction === "left" ? "marquee-left" : "marquee-right",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: isPaused ? "paused" : "running",
        }}
        className="flex w-max gap-4"
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} index={index} />
        ))}
      </div>
    </div>
  );
}

export function WhoIAmTestimonialsSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...testimonialsIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className="flex flex-col gap-4">
        {ROWS.map((row, index) => (
          <MarqueeRow key={index} testimonials={row} direction={ROW_CONFIG[index].direction} duration={ROW_CONFIG[index].duration} />
        ))}
      </div>
    </Section>
  );
}
