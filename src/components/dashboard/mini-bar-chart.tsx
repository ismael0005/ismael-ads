"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { ease } from "@/styles/animations";

const bars = [38, 55, 48, 70, 62, 85, 74, 100];

interface MiniBarChartProps {
  className?: string;
}

export function MiniBarChart({ className }: MiniBarChartProps) {
  return (
    <div
      className={cn("flex h-24 items-end gap-1.5", className)}
      aria-hidden="true"
    >
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="flex-1 rounded-full bg-gradient-to-t from-primary via-secondary to-accent"
          initial={{ height: "0%", opacity: 0 }}
          whileInView={{ height: `${height}%`, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.8,
            delay: 0.5 + index * 0.08,
            ease: ease.out,
          }}
        />
      ))}
    </div>
  );
}
