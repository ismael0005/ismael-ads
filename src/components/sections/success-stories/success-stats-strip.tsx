"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { motionVariants } from "@/styles/animations";
import { successStats } from "@/data/home";

export function SuccessStatsStrip() {
  return (
    <motion.div
      variants={motionVariants.staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className={cn(
        glass.base,
        glass.light,
        "mx-auto flex max-w-4xl flex-col items-center gap-8 rounded-3xl px-6 py-8 sm:flex-row sm:justify-between sm:gap-4 sm:px-10"
      )}
    >
      {successStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Fragment key={stat.label}>
            {index > 0 && (
              <span
                aria-hidden="true"
                className="hidden h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent sm:block"
              />
            )}
            <motion.div
              variants={motionVariants.fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex cursor-default items-center gap-3 rounded-xl px-2 py-1 transition-colors duration-200 hover:bg-foreground/[0.03]"
            >
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl ring-1",
                  accentChipClasses[stat.accent]
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                  {stat.staticValue ?? (
                    <AnimatedCounter
                      value={stat.numericValue ?? 0}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  )}
                </p>
                <p className="text-xs whitespace-nowrap text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          </Fragment>
        );
      })}
    </motion.div>
  );
}
