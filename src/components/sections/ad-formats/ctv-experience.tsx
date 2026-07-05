"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { TvFrame } from "@/components/sections/ctv-monetization/tv-frame";
import { CtvAdScreen } from "@/components/sections/ctv-monetization/ctv-ad-screen";
import { useAutoCycle } from "@/hooks/use-auto-cycle";
import { ctvAdFormats } from "@/data/ctv-monetization";
import { ctvAnalyticsWidgets, ctvExperienceIntro } from "@/data/ad-formats";

const SEQUENCE_IDS = ["pre-roll", "pause-ads", "mid-roll", "home-screen", "overlay"] as const;
const SEQUENCE = SEQUENCE_IDS.map((id) => ctvAdFormats.find((format) => format.id === id)!);

const WIDGET_POSITIONS = [
  { top: "10%", left: "6%" },
  { top: "50%", left: "92%" },
  { top: "88%", left: "10%" },
];

export function AdFormatsCtvSection() {
  const [index] = useAutoCycle(SEQUENCE.length, 2800);
  const active = SEQUENCE[index];

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...ctvExperienceIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className="relative mx-auto h-[24rem] max-w-2xl sm:h-[28rem]">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />

        {ctvAnalyticsWidgets.map((widget, widgetIndex) => {
          const Icon = widget.icon;
          const pos = WIDGET_POSITIONS[widgetIndex];
          return (
            <motion.div
              key={widget.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: widgetIndex * 0.12 }}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5 + widgetIndex, repeat: Infinity, ease: "easeInOut", delay: widgetIndex * 0.2 }}
                className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-2xl px-3 py-2 shadow-lg")}
              >
                <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-lg ring-1", accentChipClasses[widget.accent])}>
                  <Icon className="size-3.5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.6rem] whitespace-nowrap text-muted-foreground">{widget.label}</p>
                  <p className="font-heading text-xs font-bold whitespace-nowrap text-foreground">
                    <AnimatedCounter value={widget.numericValue} prefix={widget.prefix} suffix={widget.suffix} decimals={widget.decimals} />
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 left-1/2 z-10 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-16 sm:px-20"
        >
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}>
            <TvFrame className="shadow-2xl ring-1 ring-white/10">
              <CtvAdScreen format={active} />
            </TvFrame>
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {SEQUENCE.map((format, formatIndex) => (
          <span
            key={format.id}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300",
              formatIndex === index ? "bg-primary/15 text-primary-text ring-1 ring-primary/25" : "bg-muted text-muted-foreground"
            )}
          >
            {format.label}
          </span>
        ))}
      </div>
    </Section>
  );
}
