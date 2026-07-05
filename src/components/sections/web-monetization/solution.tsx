"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ArrowDown, BadgeCheck, Hourglass, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentTextClasses, type Accent } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { motionVariants } from "@/styles/animations";
import { webSolutionIntro, webSolutionPoints } from "@/data/web-monetization";

const DEMAND_PARTNERS = ["AdX", "PubMatic", "OpenX", "Rubicon"];

interface ComparisonPanelProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  simultaneous?: boolean;
  resultLabel: string;
  resultValue: string;
  resultAccent: Accent;
}

function ComparisonPanel({
  icon: Icon,
  title,
  subtitle,
  simultaneous = false,
  resultLabel,
  resultValue,
  resultAccent,
}: ComparisonPanelProps) {
  return (
    <div className={cn(glass.base, glass.light, "rounded-2xl p-5")}>
      <div className="flex items-center gap-2">
        <Icon className={cn("size-4", accentTextClasses[resultAccent])} aria-hidden="true" />
        <p className="text-sm font-bold text-foreground">{title}</p>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {DEMAND_PARTNERS.map((partner, index) => (
          <motion.span
            key={partner}
            initial={{ opacity: 0.8 }}
            whileInView={{ opacity: [0.8, 1, 0.8] }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: simultaneous ? 1.8 : 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: simultaneous ? 0 : index * 0.45,
            }}
            className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground"
          >
            {partner}
          </motion.span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-foreground/[0.03] px-3 py-2">
        <span className="text-[11px] text-muted-foreground">{resultLabel}</span>
        <span className={cn("text-sm font-bold", accentTextClasses[resultAccent])}>{resultValue}</span>
      </div>
    </div>
  );
}

export function WebSolutionSection() {
  const KickerIcon = webSolutionIntro.kickerIcon;
  const [headlineLead, headlineTail] = webSolutionIntro.headline.split(webSolutionIntro.headlineEmphasis);

  return (
    <Section spacing="lg" tone="muted" className="relative overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={motionVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div variants={motionVariants.fadeInUp}>
            <Badge
              variant="outline"
              className="gap-1.5 border-black/10 bg-black/[0.03] backdrop-blur dark:border-white/15 dark:bg-white/5"
            >
              <KickerIcon className="size-3" aria-hidden="true" />
              {webSolutionIntro.kicker}
            </Badge>
          </motion.div>

          <motion.div variants={motionVariants.fadeInUp}>
            <Heading as="h2" size="xl" className="mt-5 text-balance">
              {headlineLead}
              <GradientText>{webSolutionIntro.headlineEmphasis}</GradientText>
              {headlineTail}
            </Heading>
          </motion.div>

          <motion.p variants={motionVariants.fadeInUp} className="mt-4 max-w-lg text-lg text-muted-foreground">
            {webSolutionIntro.subheadline}
          </motion.p>

          <motion.ul variants={motionVariants.staggerContainer} className="mt-8 space-y-4">
            {webSolutionPoints.map((point) => (
              <motion.li key={point.title} variants={motionVariants.fadeInUp} className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-primary-text" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{point.title}</p>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-md space-y-3"
        >
          <ComparisonPanel
            icon={Hourglass}
            title="Waterfall"
            subtitle="Sequential calls, one network at a time"
            resultLabel="Winning bid after timeout"
            resultValue="$1.20"
            resultAccent="secondary"
          />

          <div className="flex justify-center">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground"
            >
              <ArrowDown className="size-3.5" aria-hidden="true" />
            </motion.div>
          </div>

          <ComparisonPanel
            icon={Zap}
            title="Header Bidding — Ismael Ads"
            subtitle="Every partner bids at once, instantly"
            simultaneous
            resultLabel="Winning bid, real time"
            resultValue="$1.80"
            resultAccent="primary"
          />
        </motion.div>
      </div>
    </Section>
  );
}
