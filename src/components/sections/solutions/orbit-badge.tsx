"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface OrbitBadgeProps {
  children: ReactNode;
  radius: number;
  duration: number;
  /** Starting angle in degrees, so multiple badges on one orbit don't stack. */
  startAngle?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * A badge that travels in a perfect circle around its parent's center while
 * staying upright (counter-rotated). Each rotation/offset lives on its own
 * element — combining Tailwind's translate utilities with Framer's own
 * transform on the same node causes Framer to silently clobber the CSS
 * class, so every level here carries exactly one transform source.
 */
export function OrbitBadge({
  children,
  radius,
  duration,
  startAngle = 0,
  reverse = false,
  className,
}: OrbitBadgeProps) {
  return (
    <motion.div
      animate={{ rotate: reverse ? startAngle - 360 : startAngle + 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      initial={{ rotate: startAngle }}
      className="absolute top-1/2 left-1/2 size-0"
    >
      <motion.div style={{ x: radius }} className="absolute top-0 left-0">
        <motion.div
          animate={{ rotate: reverse ? 360 - startAngle : -360 - startAngle }}
          initial={{ rotate: -startAngle }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div
            className={cn(
              "-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium shadow-lg",
              className
            )}
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
