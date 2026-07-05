"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { MonitorFrame } from "@/components/sections/ad-formats/monitor-frame";
import { AdCreative } from "@/components/sections/ad-formats/ad-creative";
import { useAutoCycle } from "@/hooks/use-auto-cycle";
import { motionVariants } from "@/styles/animations";
import { characterAssets } from "@/data/assets";
import { adFormatCatalog, adFormatsFinalCta } from "@/data/ad-formats";

/** Same rim-light + bottom-fade technique used for every founder image across the site — keeps the lighting language consistent. */
const FOUNDER_FILTER = [
  "drop-shadow(0 0 30px rgba(109,40,217,0.35))",
  "drop-shadow(0 0 60px rgba(34,211,238,0.16))",
  "drop-shadow(-5px -6px 12px rgba(34,211,238,0.2))",
  "drop-shadow(6px 10px 18px rgba(0,0,0,0.3))",
].join(" ");

const FOUNDER_BOTTOM_FADE = "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)";

const FOUNDER_GLOW_TIGHT: CSSProperties = {
  background: "radial-gradient(circle, rgba(109,40,217,0.5) 0%, rgba(37,99,235,0.32) 32%, rgba(34,211,238,0.2) 55%, transparent 75%)",
};
const FOUNDER_GLOW_AMBIENT: CSSProperties = {
  background: "radial-gradient(circle, rgba(109,40,217,0.22) 0%, rgba(34,211,238,0.12) 45%, transparent 72%)",
};

export function AdFormatsFinalCtaSection() {
  const character = characterAssets[adFormatsFinalCta.characterPose];
  const TrustIcon = adFormatsFinalCta.trustIcon;
  const [headlineLead, headlineTail] = adFormatsFinalCta.headline.split(adFormatsFinalCta.headlineEmphasis);
  const [formatIndex] = useAutoCycle(adFormatCatalog.length, 2400);

  return (
    <Section spacing="xl" className="relative isolate overflow-hidden">
      <div className="relative mx-auto flex max-w-2xl flex-col items-center pb-[19rem] text-center sm:pb-[23rem]">
        <motion.div
          variants={motionVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.div variants={motionVariants.fadeInUp}>
            <Heading as="h2" size="2xl" className="text-balance">
              {headlineLead}
              <GradientText>{adFormatsFinalCta.headlineEmphasis}</GradientText>
              {headlineTail}
            </Heading>
          </motion.div>

          <motion.p variants={motionVariants.fadeInUp} className="mt-5 max-w-lg text-lg text-muted-foreground">
            {adFormatsFinalCta.subheadline}
          </motion.p>

          <motion.div variants={motionVariants.fadeInUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <Button
                variant="gradient"
                size="lg"
                className="h-12 gap-2 px-8 text-base"
                nativeButton={false}
                render={
                  <Link href={adFormatsFinalCta.primaryCta.href}>
                    {adFormatsFinalCta.primaryCta.label}
                    <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden="true" />
                  </Link>
                }
              />
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <Button
                variant="outline"
                size="lg"
                className="h-12 gap-2 px-8 text-base"
                nativeButton={false}
                render={
                  <Link href={adFormatsFinalCta.secondaryCta.href}>
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {adFormatsFinalCta.secondaryCta.label}
                  </Link>
                }
              />
            </MagneticButton>
          </motion.div>

          <motion.p variants={motionVariants.fadeInUp} className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <TrustIcon className="size-4 text-accent-text" aria-hidden="true" />
            {adFormatsFinalCta.trustLabel}
          </motion.p>
        </motion.div>
      </div>

      {/* Founder standing beside a floating monitor, blended into the background beneath the CTA. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px] mix-blend-multiply dark:mix-blend-screen"
        />

        <div className="relative flex items-end gap-3 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 w-40 sm:mb-10 sm:w-60"
          >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
              <MonitorFrame className="shadow-2xl ring-1 ring-white/10">
                <AdCreative format={adFormatCatalog[formatIndex]} compact />
              </MonitorFrame>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square w-40 shrink-0 sm:w-64"
          >
            <div aria-hidden="true" style={FOUNDER_GLOW_AMBIENT} className="absolute -inset-[90%] -z-20 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen" />
            <div aria-hidden="true" style={FOUNDER_GLOW_TIGHT} className="absolute -inset-[45%] -z-10 rounded-full blur-[55px] mix-blend-multiply dark:mix-blend-screen" />
            <div aria-hidden="true" className="absolute inset-x-[22%] bottom-0 h-[8%] rounded-full bg-black/20 blur-2xl dark:bg-black/35" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full"
            >
              <div className="absolute inset-0 bg-transparent" style={{ maskImage: FOUNDER_BOTTOM_FADE, WebkitMaskImage: FOUNDER_BOTTOM_FADE }}>
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

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={cn(glass.base, glass.light, "absolute -right-4 top-6 flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 shadow-xl sm:top-10")}
            >
              <TrendingUp className="size-3.5 text-primary-text" aria-hidden="true" />
              <span className="text-xs font-bold whitespace-nowrap text-foreground">+238% Revenue</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
