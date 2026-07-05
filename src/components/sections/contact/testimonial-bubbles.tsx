"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentBorderClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { bubbleTestimonials, bubbleTestimonialsIntro, type BubbleTestimonial } from "@/data/contact";

const SIZE_CLASSES: Record<BubbleTestimonial["size"], string> = {
  sm: "max-w-[9rem] px-3.5 py-2.5 text-xs",
  md: "max-w-[12rem] px-4 py-3 text-sm",
  lg: "max-w-[15rem] px-5 py-4 text-base",
};

function Bubble({ testimonial }: { testimonial: BubbleTestimonial }) {
  return (
    <motion.div
      style={{ left: `${testimonial.x}%`, top: `${testimonial.y}%` }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: testimonial.duration, repeat: Infinity, ease: "easeInOut", delay: testimonial.delay }}
        className={cn(
          glass.base,
          glass.light,
          "rounded-3xl rounded-bl-md border-l-2 font-medium text-foreground/90 shadow-lg",
          accentBorderClasses[testimonial.accent],
          SIZE_CLASSES[testimonial.size]
        )}
      >
        &ldquo;{testimonial.text}&rdquo;
      </motion.div>
    </motion.div>
  );
}

export function ContactTestimonialBubblesSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...bubbleTestimonialsIntro} className="mx-auto mb-14 max-w-2xl" />

      {/* Desktop / tablet: fixed-position floating scatter */}
      <div className="relative mx-auto hidden h-[30rem] max-w-4xl lg:block lg:h-[36rem]">
        {bubbleTestimonials.map((testimonial) => (
          <Bubble key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {/* Mobile: safe static wrap, no absolute positioning */}
      <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-3 lg:hidden">
        {bubbleTestimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={cn(
              glass.base,
              glass.light,
              "max-w-[14rem] rounded-3xl rounded-bl-md border-l-2 px-4 py-2.5 text-xs font-medium text-foreground/90 shadow-md",
              accentBorderClasses[testimonial.accent]
            )}
          >
            &ldquo;{testimonial.text}&rdquo;
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
