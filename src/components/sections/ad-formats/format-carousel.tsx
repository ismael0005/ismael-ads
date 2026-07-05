"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentHoverClasses, accentTextClasses } from "@/lib/accent";
import type { AdFormatDemo } from "@/data/home";

interface FormatCarouselProps {
  formats: AdFormatDemo[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function FormatCarousel({ formats, activeId, onSelect }: FormatCarouselProps) {
  return (
    <div
      role="region"
      aria-label="Ad format carousel, scroll horizontally to see all"
      className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-2 pb-4 [-ms-overflow-style:none] [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {formats.map((format, index) => {
        const Icon = format.icon;
        const isActive = format.id === activeId;

        return (
          <motion.button
            key={format.id}
            type="button"
            onClick={() => onSelect(format.id)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
            className={cn(
              glass.base,
              glass.light,
              accentHoverClasses[format.accent],
              "flex w-56 shrink-0 cursor-pointer snap-start flex-col gap-3 rounded-2xl p-5 text-left transition-all duration-300",
              isActive && "ring-2 ring-primary/60"
            )}
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-xl ring-1",
                  accentChipClasses[format.accent]
                )}
              >
                <Icon className="size-4.5" aria-hidden="true" />
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {format.dimensions}
              </span>
            </div>

            <h3 className={cn("font-heading text-sm font-bold", accentTextClasses[format.accent])}>
              {format.label}
            </h3>
            <p className="text-xs text-muted-foreground">{format.description}</p>

            <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border pt-3">
              {format.examples.map((example) => (
                <span
                  key={example}
                  className="rounded-full bg-foreground/[0.04] px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  {example}
                </span>
              ))}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
