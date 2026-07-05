"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { accentGlowClasses, type Accent } from "@/lib/accent";

const CONNECTOR_WIDTH = 48;

interface GrowthConnectorProps {
  accent: Accent;
  delay?: number;
}

/** A pulsing gradient line between two journey steps, with a small data packet travelling along it on loop. */
export function GrowthConnector({ accent, delay = 0 }: GrowthConnectorProps) {
  return (
    <div className="relative h-px w-12 shrink-0 self-center overflow-visible">
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay }}
        className="absolute inset-0 bg-gradient-to-r from-border via-primary/50 to-border"
      />
      <div className="absolute top-1/2 left-0 -translate-y-1/2">
        <motion.span
          animate={{ x: [0, CONNECTOR_WIDTH], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay }}
          className={cn(
            "block size-1.5 rounded-full shadow-[0_0_6px_currentColor]",
            accentGlowClasses[accent]
          )}
        />
      </div>
    </div>
  );
}
