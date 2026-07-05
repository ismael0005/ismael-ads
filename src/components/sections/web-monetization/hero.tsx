"use client";

import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { WebHeroStage } from "@/components/sections/web-monetization/hero-stage";
import { motionVariants } from "@/styles/animations";
import { webHero, webHeroMetrics } from "@/data/web-monetization";

export function WebHero() {
  const KickerIcon = webHero.kickerIcon;
  const [headlineLead, headlineTail] = webHero.headline.split(webHero.headlineEmphasis);

  return (
    <div className="relative isolate overflow-hidden text-foreground">
      <Container size="xl" className="relative z-10 w-full">
        <div className="grid items-center gap-12 pt-10 pb-16 lg:grid-cols-2 lg:gap-16 lg:pt-14 lg:pb-20">
          {/* Left: copy */}
          <motion.div
            variants={motionVariants.staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <Badge
              variant="outline"
              className="animate-fade-up-0 gap-1.5 border-black/10 bg-black/[0.03] backdrop-blur dark:border-white/15 dark:bg-white/5"
            >
              <KickerIcon className="size-3" aria-hidden="true" />
              {webHero.kicker}
            </Badge>

            <div className="animate-fade-up-1">
              <Heading as="h1" size="3xl" className="mt-6 text-balance">
                {headlineLead}
                <GradientText>{webHero.headlineEmphasis}</GradientText>
                {headlineTail}
              </Heading>
            </div>

            <p className="animate-fade-up-2 mt-6 max-w-xl text-lg text-muted-foreground">{webHero.subheadline}</p>

            <div className="animate-fade-up-3 mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <MagneticButton>
                <Button
                  variant="gradient"
                  size="lg"
                  className="h-12 gap-2 px-8 text-base"
                  nativeButton={false}
                  render={
                    <Link href={webHero.primaryCta.href}>
                      {webHero.primaryCta.label}
                      <ArrowRight
                        className="size-4 transition-transform group-hover/button:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  }
                />
              </MagneticButton>
              <MagneticButton strength={0.3}>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 border-black/10 bg-black/[0.03] px-8 text-base backdrop-blur dark:border-white/15 dark:bg-white/5"
                  nativeButton={false}
                  render={<Link href={webHero.secondaryCta.href}>{webHero.secondaryCta.label}</Link>}
                />
              </MagneticButton>
            </div>

            <div className="animate-fade-up-4 mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8 lg:justify-start">
              {webHeroMetrics.map((metric, index) => (
                <Fragment key={metric.label}>
                  {index > 0 && (
                    <span aria-hidden="true" className="hidden h-8 w-px bg-border sm:block" />
                  )}
                  <div>
                    <p className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                      <AnimatedCounter
                        value={metric.numericValue}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                        decimals={metric.decimals}
                      />
                    </p>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                  </div>
                </Fragment>
              ))}
            </div>
          </motion.div>

          {/* Right: founder + dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <WebHeroStage characterPose={webHero.characterPose} />
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
