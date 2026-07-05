"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { duration, ease } from "@/styles/animations";

interface AnimatedDividerProps {
  className?: string;
}

export function AnimatedDivider({ className }: AnimatedDividerProps) {
  return (
    <motion.div
      data-slot="animated-divider"
      className={cn(
        "h-px w-full origin-left bg-gradient-to-r from-primary via-secondary to-accent",
        className
      )}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: duration.slow, ease: ease.out }}
    />
  );
}
