"use client";

import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { motionVariants } from "@/styles/animations";
import { blogHero } from "@/data/blog";
import { BlogHeroStage } from "@/components/sections/blog/hero-stage";

export function BlogHero() {
  const KickerIcon = blogHero.kickerIcon;
  const [headlineLead, headlineTail] = blogHero.headline.split(blogHero.headlineEmphasis);

  return (
    <div className="relative isolate overflow-hidden text-foreground">
      <Container size="xl">
        {/* Stage-first on desktop — an editorial page reads best leading with the content preview, and it varies the hero rhythm from the text-first pattern used on the product pages. */}
        <div className="grid items-center gap-12 pt-10 pb-16 lg:grid-cols-2 lg:gap-16 lg:pt-16 lg:pb-24">
          <motion.div
            variants={motionVariants.staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center lg:order-2 lg:items-start lg:text-left"
          >
            <Badge
              variant="outline"
              className="animate-fade-up-0 gap-1.5 border-black/10 bg-black/[0.03] backdrop-blur dark:border-white/15 dark:bg-white/5"
            >
              <KickerIcon className="size-3" aria-hidden="true" />
              {blogHero.kicker}
            </Badge>

            <div className="animate-fade-up-1">
              <Heading as="h1" size="3xl" className="mt-6 text-balance">
                {headlineLead}
                <GradientText>{blogHero.headlineEmphasis}</GradientText>
                {headlineTail}
              </Heading>
            </div>

            <p className="animate-fade-up-2 mt-6 max-w-lg text-lg text-muted-foreground">{blogHero.description}</p>

            <div className="animate-fade-up-3 mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <MagneticButton>
                <Button
                  variant="gradient"
                  size="lg"
                  className="h-12 gap-2 px-8 text-base"
                  nativeButton={false}
                  render={
                    <Link href={blogHero.primaryCta.href}>
                      {blogHero.primaryCta.label}
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
                    <Link href={blogHero.secondaryCta.href}>
                      <Mail className="size-4" aria-hidden="true" />
                      {blogHero.secondaryCta.label}
                    </Link>
                  }
                />
              </MagneticButton>
            </div>

            <div className="animate-fade-up-4 mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground lg:justify-start">
              {blogHero.trustBadges.map((badge, index) => (
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
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:order-1"
          >
            <BlogHeroStage />
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
