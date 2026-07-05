"use client";

import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { EligibilityHeroStage } from "@/components/sections/eligibility/hero-stage";
import { motionVariants } from "@/styles/animations";
import { eligibilityHero, eligibilityTrustBadges } from "@/data/eligibility-checker";

export function EligibilityHero() {
  const KickerIcon = eligibilityHero.kickerIcon;
  const [headlineLead, headlineTail] = eligibilityHero.headline.split(eligibilityHero.headlineEmphasis);

  return (
    <div className="relative isolate overflow-hidden text-foreground">
      <Container size="xl" className="relative z-10 w-full">
        <div className="grid items-center gap-12 pt-10 pb-16 lg:grid-cols-2 lg:gap-16 lg:pt-16 lg:pb-24">
          <motion.div
            variants={motionVariants.staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <Badge
              variant="outline"
              className="animate-fade-up-0 gap-1.5 border-black/10 bg-black/[0.03] tracking-[0.14em] uppercase backdrop-blur dark:border-white/15 dark:bg-white/5"
            >
              <KickerIcon className="size-3" aria-hidden="true" />
              {eligibilityHero.kicker}
            </Badge>

            <div className="animate-fade-up-1">
              <Heading as="h1" size="3xl" className="mt-6 text-balance">
                {headlineLead}
                <GradientText>{eligibilityHero.headlineEmphasis}</GradientText>
                {headlineTail}
              </Heading>
            </div>

            <p className="animate-fade-up-2 mt-6 max-w-xl text-lg text-muted-foreground">{eligibilityHero.description}</p>

            <div className="animate-fade-up-3 mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <MagneticButton>
                <Button
                  variant="gradient"
                  size="lg"
                  className="h-12 gap-2 px-8 text-base"
                  nativeButton={false}
                  render={
                    <Link href={eligibilityHero.primaryCta.href}>
                      {eligibilityHero.primaryCta.label}
                      <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  }
                />
              </MagneticButton>
              <MagneticButton strength={0.3}>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 gap-2 border-black/10 bg-black/[0.03] px-8 text-base backdrop-blur dark:border-white/15 dark:bg-white/5"
                  nativeButton={false}
                  render={
                    <Link href={eligibilityHero.secondaryCta.href}>
                      <ClipboardList className="size-4" aria-hidden="true" />
                      {eligibilityHero.secondaryCta.label}
                    </Link>
                  }
                />
              </MagneticButton>
            </div>

            <div className="animate-fade-up-4 mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start">
              {eligibilityTrustBadges.map((badge, index) => (
                <Fragment key={badge}>
                  {index > 0 && <span aria-hidden="true" className="hidden size-1 rounded-full bg-border sm:block" />}
                  <span className="text-xs font-medium tracking-wide text-muted-foreground/80">{badge}</span>
                </Fragment>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <EligibilityHeroStage />
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
