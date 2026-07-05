"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PhoneFrame } from "@/components/sections/app-monetization/phone-frame";
import { AdScreen } from "@/components/sections/app-monetization/ad-screen";
import { motionVariants } from "@/styles/animations";
import { characterAssets } from "@/data/assets";
import { appAdFormats, appFinalCta } from "@/data/app-monetization";

/** Radial fade on every edge — unlike the site's usual bottom-only fade, this founder sits fully inside the scene as a background element, so top/left/right need to dissolve too. */
const FOUNDER_MASK = "radial-gradient(ellipse 62% 78% at 50% 42%, black 40%, transparent 88%)";

const FOUNDER_COLOR_WASH =
  "linear-gradient(200deg, rgba(109,40,217,0.35), transparent 45%, rgba(34,211,238,0.2) 80%)";

export function AppFinalCtaSection() {
  const character = characterAssets[appFinalCta.characterPose];
  const TrustIcon = appFinalCta.trustIcon;
  const [headlineLead, headlineTail] = appFinalCta.headline.split(appFinalCta.headlineEmphasis);

  return (
    <Section spacing="xl" className="relative isolate overflow-hidden">
      <div className="relative mx-auto flex max-w-2xl flex-col items-center pb-[20rem] text-center sm:pb-[24rem]">
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
              <GradientText>{appFinalCta.headlineEmphasis}</GradientText>
              {headlineTail}
            </Heading>
          </motion.div>

          <motion.p variants={motionVariants.fadeInUp} className="mt-5 max-w-lg text-lg text-muted-foreground">
            {appFinalCta.subheadline}
          </motion.p>

          <motion.div
            variants={motionVariants.fadeInUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton>
              <Button
                variant="gradient"
                size="lg"
                className="h-12 gap-2 px-8 text-base"
                nativeButton={false}
                render={
                  <Link href={appFinalCta.primaryCta.href}>
                    {appFinalCta.primaryCta.label}
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
                className="h-12 gap-2 px-8 text-base"
                nativeButton={false}
                render={
                  <Link href={appFinalCta.secondaryCta.href}>
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {appFinalCta.secondaryCta.label}
                  </Link>
                }
              />
            </MagneticButton>
          </motion.div>

          <motion.p
            variants={motionVariants.fadeInUp}
            className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <TrustIcon className="size-4 text-accent-text" aria-hidden="true" />
            {appFinalCta.trustLabel}
          </motion.p>
        </motion.div>
      </div>

      {/* Founder + floating phone, blended into the background beneath the CTA — not a cutout pasted on top. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden"
      >
        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[130px] mix-blend-multiply dark:mix-blend-screen"
        />

        <motion.div
          animate={{ y: [0, -14, 0], rotate: [-8, -4, -8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 w-40 opacity-40 blur-[2px] sm:w-48"
          style={{ left: "calc(50% + 8rem)" }}
        >
          <PhoneFrame className="shadow-2xl">
            <AdScreen format={appAdFormats[5]} showChrome={false} compact />
          </PhoneFrame>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square w-[22rem] sm:w-[28rem]"
        >
          <div
            className="absolute inset-0"
            style={{ maskImage: FOUNDER_MASK, WebkitMaskImage: FOUNDER_MASK }}
          >
            <Image
              src={character.src}
              alt={character.alt}
              fill
              sizes="28rem"
              className="object-contain"
            />
            <div
              className="absolute inset-0 mix-blend-soft-light"
              style={{ background: FOUNDER_COLOR_WASH }}
            />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
