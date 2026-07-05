"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { TvFrame } from "@/components/sections/ctv-monetization/tv-frame";
import { CtvAdScreen } from "@/components/sections/ctv-monetization/ctv-ad-screen";
import { useAutoCycle } from "@/hooks/use-auto-cycle";
import { ctvAdFormats, ctvAdFormatsIntro } from "@/data/ctv-monetization";

export function CtvFormatShowcaseSection() {
  const [activeIndex, setActiveIndex] = useAutoCycle(ctvAdFormats.length, 3200);
  const active = ctvAdFormats[activeIndex];

  return (
    <Section id="ad-formats" spacing="lg" className="relative scroll-mt-24 overflow-hidden">
      <SectionHeading {...ctvAdFormatsIntro} className="mx-auto mb-14 max-w-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-2xl"
      >
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[110px] mix-blend-multiply dark:mix-blend-screen"
        />

        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <TvFrame className="shadow-2xl ring-1 ring-white/10">
            <CtvAdScreen format={active} />
          </TvFrame>
        </motion.div>
      </motion.div>

      <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2">
        {ctvAdFormats.map((format, index) => {
          const Icon = format.icon;
          const isActive = index === activeIndex;
          return (
            <button
              key={format.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-pressed={isActive}
              aria-label={`Show ${format.label} format`}
              className={cn(
                glass.base,
                glass.light,
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300",
                isActive ? cn(accentChipClasses[format.accent], "shadow-md") : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-3.5" aria-hidden="true" />
              {format.label}
            </button>
          );
        })}
      </div>
    </Section>
  );
}
