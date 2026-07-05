"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { ResultCard } from "@/components/sections/success-stories/result-card";
import { resultsWallCards } from "@/data/home";

const ROW_CONFIG = [
  { row: 1 as const, direction: "left" as const, duration: 48 },
  { row: 2 as const, direction: "right" as const, duration: 55 },
  { row: 3 as const, direction: "left" as const, duration: 64 },
];

function MarqueeRow({
  row,
  direction,
  duration,
}: {
  row: 1 | 2 | 3;
  direction: "left" | "right";
  duration: number;
}) {
  const [isPaused, setIsPaused] = useState(false);
  const cards = resultsWallCards.filter((card) => card.row === row);

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
          // Controlled by the same inline style object as the animation itself, so
          // there's no cascade fight between an inline `animation` shorthand and a
          // stylesheet class trying to override just animation-play-state.
          animationPlayState: isPaused ? "paused" : "running",
        }}
        className="flex w-max gap-5"
      >
        {[...cards, ...cards].map((card, index) => (
          <ResultCard key={`${card.id}-${index}`} card={card} />
        ))}
      </div>
    </div>
  );
}

export function ResultsWall() {
  return (
    <div className="relative">
      {/* Desktop: three independently-moving marquee rows */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="hidden flex-col gap-4 lg:flex"
      >
        {ROW_CONFIG.map((config) => (
          <MarqueeRow key={config.row} {...config} />
        ))}
      </motion.div>

      {/* Tablet / mobile: swipeable horizontal scroll, no auto-animation to fight touch input */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-4 lg:hidden"
      >
        {[1, 2, 3].map((row) => (
          <div
            key={row}
            role="region"
            aria-label={`Publisher results, row ${row}, scroll horizontally to see all`}
            tabIndex={0}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-scrollbar]:hidden"
          >
            {resultsWallCards
              .filter((card) => card.row === row)
              .map((card) => (
                <div key={card.id} className="snap-start">
                  <ResultCard card={card} />
                </div>
              ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
