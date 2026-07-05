"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Info, PlayCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAutoCycle } from "@/hooks/use-auto-cycle";

const FEATURED = [
  { title: "Northern Lights", genre: "Original Series", from: "from-primary/40", to: "to-secondary/30" },
  { title: "Coastal Drift", genre: "Documentary", from: "from-accent/35", to: "to-primary/25" },
  { title: "Midnight Signal", genre: "Thriller", from: "from-secondary/40", to: "to-accent/25" },
];

const THUMB_COUNT = 8;

/** The hero TV's screen — a generic streaming home UI with a crossfading featured title and a continuously sliding thumbnail row (reuses the site's existing marquee keyframe from globals.css). */
export function StreamingScreen() {
  const [index] = useAutoCycle(FEATURED.length, 3400);
  const featured = FEATURED[index];

  return (
    <div className="relative flex h-full w-full flex-col bg-background">
      <div className={cn("relative flex-1 overflow-hidden bg-gradient-to-br", featured.from, featured.to)}>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
        <AnimatePresence mode="wait">
          <motion.div
            key={featured.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-3 left-3 sm:bottom-4 sm:left-5"
          >
            <p className="text-[8px] font-semibold tracking-wide text-white/70 uppercase sm:text-[10px]">
              {featured.genre}
            </p>
            <p className="mt-0.5 font-heading text-sm font-bold text-white sm:text-lg">{featured.title}</p>
            <div className="mt-1.5 flex items-center gap-1.5 sm:mt-2 sm:gap-2">
              <span className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[8px] font-bold text-black sm:text-[10px]">
                <PlayCircle className="size-2.5 sm:size-3" aria-hidden="true" />
                Play
              </span>
              <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-[8px] font-semibold text-white backdrop-blur sm:text-[10px]">
                <Info className="size-2.5 sm:size-3" aria-hidden="true" />
                Info
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="overflow-hidden bg-background py-2">
        <div className="flex w-max animate-[marquee-left_18s_linear_infinite] gap-2 px-2">
          {Array.from({ length: THUMB_COUNT * 2 }, (_, i) => i).map((i) => (
            <div
              key={i}
              className="h-8 w-14 shrink-0 rounded-md bg-gradient-to-br from-foreground/10 to-foreground/[0.03] sm:h-10 sm:w-16"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
