"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Eye, Gauge, Layers, MousePointerClick, Sparkles, Target, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { FormatTabs } from "@/components/sections/ad-formats/format-tabs";
import { LaptopMockup } from "@/components/sections/ad-formats/laptop-mockup";
import { PhoneMockup } from "@/components/sections/ad-formats/phone-mockup";
import { FloatingWidget } from "@/components/sections/ad-formats/floating-widget";
import { FormatCarousel } from "@/components/sections/ad-formats/format-carousel";
import { adFormatDemos, adFormatsIntro } from "@/data/home";

function PulseBadge({
  icon: Icon,
  label,
  className,
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        glass.base,
        glass.light,
        "absolute z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-xl",
        className
      )}
    >
      <Icon className="size-3.5 text-accent-text" aria-hidden="true" />
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
      </span>
      {label}
    </div>
  );
}

export function AdFormatsPreview() {
  const [activeId, setActiveId] = useState("all");

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...adFormatsIntro} className="mx-auto mb-8 max-w-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-10 max-w-xl"
      >
        <FormatTabs formats={adFormatDemos} activeId={activeId} onSelect={setActiveId} />
      </motion.div>

      <div className="relative mx-auto max-w-5xl">
        <div className="hidden lg:block">
          <FloatingWidget
            icon={Target}
            accent="secondary"
            label="Fill Rate"
            numericValue={98}
            suffix="%"
            className="top-6 left-0"
            floatDelay={0.2}
            floatDuration={5}
          />
          <FloatingWidget
            icon={Gauge}
            accent="primary"
            label="Avg. RPM"
            numericValue={24.8}
            prefix="$"
            decimals={2}
            className="top-32 -left-8"
            floatDelay={0.5}
            floatDuration={5.6}
          />
          <FloatingWidget
            icon={MousePointerClick}
            accent="accent"
            label="CTR"
            numericValue={2.4}
            decimals={1}
            suffix="%"
            className="bottom-10 left-4"
            floatDelay={0.8}
            floatDuration={4.8}
          />
          <FloatingWidget
            icon={Eye}
            accent="primary"
            label="Viewability"
            numericValue={87}
            suffix="%"
            className="top-10 right-0"
            floatDelay={0.35}
            floatDuration={5.2}
          />
          <FloatingWidget
            icon={TrendingUp}
            accent="secondary"
            label="Revenue"
            numericValue={285}
            prefix="+"
            suffix="%"
            className="bottom-16 -right-8"
            floatDelay={0.65}
            floatDuration={5.4}
          />

          <PulseBadge icon={Sparkles} label="AI Optimization" className="-top-4 left-1/2 -translate-x-1/2" />
          <PulseBadge icon={Layers} label="Header Bidding" className="-bottom-4 left-1/2 -translate-x-1/2" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16"
        >
          <LaptopMockup formatId={activeId} formats={adFormatDemos} />
          <PhoneMockup formatId={activeId} formats={adFormatDemos} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16"
      >
        <FormatCarousel formats={adFormatDemos} activeId={activeId} onSelect={setActiveId} />
      </motion.div>
    </Section>
  );
}
