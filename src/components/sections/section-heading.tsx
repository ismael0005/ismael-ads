"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { motionVariants } from "@/styles/animations";

interface SectionHeadingProps {
  kicker: string;
  kickerIcon: LucideIcon;
  headline: string;
  headlineEmphasis: string;
  subheadline?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  kicker,
  kickerIcon: KickerIcon,
  headline,
  headlineEmphasis,
  subheadline,
  align = "center",
  className,
}: SectionHeadingProps) {
  const [headlineLead, headlineTail] = headline.split(headlineEmphasis);

  return (
    <motion.div
      variants={motionVariants.staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <motion.div variants={motionVariants.fadeInUp}>
        <Badge
          variant="outline"
          className="gap-1.5 border-black/10 bg-black/[0.03] backdrop-blur dark:border-white/15 dark:bg-white/5"
        >
          <KickerIcon className="size-3" aria-hidden="true" />
          {kicker}
        </Badge>
      </motion.div>

      <motion.div variants={motionVariants.fadeInUp}>
        <Heading as="h2" size="xl" className="mt-5 text-balance">
          {headlineLead}
          <GradientText>{headlineEmphasis}</GradientText>
          {headlineTail}
        </Heading>
      </motion.div>

      {subheadline && (
        <motion.p
          variants={motionVariants.fadeInUp}
          className={cn(
            "mt-4 max-w-2xl text-lg text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {subheadline}
        </motion.p>
      )}
    </motion.div>
  );
}
