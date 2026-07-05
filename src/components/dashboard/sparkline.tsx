"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { accentTextClasses, type Accent } from "@/lib/accent";

interface SparklineProps {
  trend: number[];
  accent: Accent;
  className?: string;
}

export function Sparkline({ trend, accent, className }: SparklineProps) {
  const width = 100;
  const height = 40;
  const max = Math.max(...trend);
  const min = Math.min(...trend);
  const points = trend
    .map((point, index) => {
      const x = (index / (trend.length - 1)) * width;
      const y = height - ((point - min) / (max - min || 1)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn("h-20 w-full overflow-visible", accentTextClasses[accent], className)}
      aria-hidden="true"
    >
      <motion.polyline
        points={points}
        fill="none"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-current"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}
