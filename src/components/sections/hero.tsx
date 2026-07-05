"use client";

import { Fragment, type PointerEvent, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { HeroStage } from "@/components/sections/hero-stage";
import { motionVariants } from "@/styles/animations";
import { hero, metrics } from "@/data/home";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const KickerIcon = hero.kickerIcon;
  const [headlineLead, headlineTail] = hero.headline.split(hero.headlineEmphasis);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springMx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.4 });
  const springMy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.4 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handlePointerLeave() {
    mx.set(0);
    my.set(0);
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <div
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate overflow-hidden text-foreground"
    >
      <Container size="xl" className="relative z-10 w-full">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="grid items-center gap-12 pt-10 pb-16 lg:grid-cols-2 lg:gap-16 lg:pt-14 lg:pb-20"
        >
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
              {hero.kicker}
            </Badge>

            <div className="animate-fade-up-1">
              <Heading as="h1" size="3xl" className="mt-6 text-balance">
                {headlineLead}
                <GradientText>{hero.headlineEmphasis}</GradientText>
                {headlineTail}
              </Heading>
            </div>

            <p className="animate-fade-up-2 mt-6 max-w-xl text-lg text-muted-foreground">{hero.subheadline}</p>

            <div className="animate-fade-up-3 mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <MagneticButton>
                <Button
                  variant="gradient"
                  size="lg"
                  className="h-12 gap-2 px-8 text-base"
                  nativeButton={false}
                  render={
                    <Link href={hero.primaryCta.href}>
                      {hero.primaryCta.label}
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
                  render={<Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>}
                />
              </MagneticButton>
            </div>

            <div className="animate-fade-up-4 mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8 lg:justify-start">
              {metrics.map((metric, index) => (
                <Fragment key={metric.label}>
                  {index > 0 && (
                    <span aria-hidden="true" className="hidden h-8 w-px bg-border sm:block" />
                  )}
                  <div>
                    <p className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                      {metric.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                  </div>
                </Fragment>
              ))}
            </div>
          </motion.div>

          {/* Right: founder + dashboard ecosystem */}
          <HeroStage characterPose={hero.characterPose} mx={springMx} my={springMy} />
        </motion.div>
      </Container>
    </div>
  );
}
