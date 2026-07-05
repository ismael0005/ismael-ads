"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { motionVariants } from "@/styles/animations";
import { metrics } from "@/data/home";

export function TrustBar() {
  return (
    <Section spacing="md" className="relative">
      <motion.div
        variants={motionVariants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className={cn(
          glass.base,
          glass.light,
          "flex flex-col items-center gap-8 rounded-3xl px-6 py-8 sm:flex-row sm:justify-between sm:gap-4 sm:px-10"
        )}
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Fragment key={metric.label}>
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
                    accentChipClasses[metric.accent]
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                    <AnimatedCounter
                      value={metric.numericValue}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      decimals={metric.decimals}
                    />
                  </p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              </motion.div>
            </Fragment>
          );
        })}
      </motion.div>
    </Section>
  );
}
