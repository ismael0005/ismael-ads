"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, TrendingUp } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { motionVariants } from "@/styles/animations";
import { characterAssets } from "@/data/assets";
import { webFinalCta } from "@/data/web-monetization";

/** Same rim-light + ambient-glow technique used across the site's founder imagery, kept consistent here. */
const FOUNDER_FILTER = [
  "drop-shadow(0 0 36px rgba(109,40,217,0.35))",
  "drop-shadow(0 0 70px rgba(34,211,238,0.16))",
  "drop-shadow(-6px -8px 14px rgba(34,211,238,0.22))",
  "drop-shadow(8px 12px 20px rgba(0,0,0,0.3))",
].join(" ");

const FOUNDER_BOTTOM_FADE = "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)";

const FOUNDER_GLOW_TIGHT: CSSProperties = {
  background:
    "radial-gradient(circle, rgba(109,40,217,0.5) 0%, rgba(37,99,235,0.32) 32%, rgba(34,211,238,0.2) 55%, transparent 75%)",
};
const FOUNDER_GLOW_AMBIENT: CSSProperties = {
  background:
    "radial-gradient(circle, rgba(109,40,217,0.22) 0%, rgba(34,211,238,0.12) 45%, transparent 72%)",
};

export function WebFinalCtaSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const character = characterAssets[webFinalCta.characterPose];
  const TrustIcon = webFinalCta.trustIcon;
  const [headlineLead, headlineTail] = webFinalCta.headline.split(webFinalCta.headlineEmphasis);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const founderParallaxY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <Section spacing="xl" className="relative isolate overflow-hidden">
      <div
        ref={stageRef}
        className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 text-center lg:flex-row lg:gap-16 lg:text-left"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 aspect-square w-56 shrink-0 sm:w-64 lg:order-1"
        >
          <div
            aria-hidden="true"
            style={FOUNDER_GLOW_AMBIENT}
            className="absolute -inset-[90%] -z-20 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen"
          />
          <div
            aria-hidden="true"
            style={FOUNDER_GLOW_TIGHT}
            className="absolute -inset-[45%] -z-10 rounded-full blur-[55px] mix-blend-multiply dark:mix-blend-screen"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-[22%] bottom-0 h-[8%] rounded-full bg-black/20 blur-2xl dark:bg-black/35"
          />

          <motion.div style={{ y: founderParallaxY }} className="relative h-full w-full">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full"
            >
              <div
                className="absolute inset-0 bg-transparent"
                style={{ maskImage: FOUNDER_BOTTOM_FADE, WebkitMaskImage: FOUNDER_BOTTOM_FADE }}
              >
                <Image
                  src={character.src}
                  alt={character.alt}
                  fill
                  sizes="16rem"
                  className="object-contain"
                  style={{ filter: FOUNDER_FILTER }}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={cn(
              glass.base,
              glass.light,
              "absolute -left-6 top-4 flex items-center gap-2 rounded-2xl px-3 py-2 shadow-xl"
            )}
          >
            <TrendingUp className="size-4 text-primary-text" aria-hidden="true" />
            <span className="text-xs font-bold text-foreground">+285%</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={cn(
              glass.base,
              glass.light,
              "absolute -right-4 bottom-8 flex items-center gap-2 rounded-2xl px-3 py-2 shadow-xl"
            )}
          >
            <Globe className="size-4 text-accent-text" aria-hidden="true" />
            <span className="text-xs font-bold text-foreground">350+</span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={motionVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="order-1 flex flex-col items-center lg:order-2 lg:items-start"
        >
          <motion.div variants={motionVariants.fadeInUp}>
            <Heading as="h2" size="xl" className="text-balance">
              {headlineLead}
              <GradientText>{webFinalCta.headlineEmphasis}</GradientText>
              {headlineTail}
            </Heading>
          </motion.div>

          <motion.p
            variants={motionVariants.fadeInUp}
            className="mt-5 max-w-lg text-lg text-muted-foreground"
          >
            {webFinalCta.subheadline}
          </motion.p>

          <motion.div
            variants={motionVariants.fadeInUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <MagneticButton>
              <Button
                variant="gradient"
                size="lg"
                className="h-12 gap-2 px-8 text-base"
                nativeButton={false}
                render={
                  <Link href={webFinalCta.primaryCta.href}>
                    {webFinalCta.primaryCta.label}
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
                className="h-12 px-8 text-base"
                nativeButton={false}
                render={<Link href={webFinalCta.secondaryCta.href}>{webFinalCta.secondaryCta.label}</Link>}
              />
            </MagneticButton>
          </motion.div>

          <motion.p
            variants={motionVariants.fadeInUp}
            className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <TrustIcon className="size-4 text-accent-text" aria-hidden="true" />
            {webFinalCta.trustLabel}
          </motion.p>
        </motion.div>
      </div>
    </Section>
  );
}
