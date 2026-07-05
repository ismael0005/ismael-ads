"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, LineChart, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { motionVariants } from "@/styles/animations";
import { characterAssets } from "@/data/assets";
import { missionFinalCta } from "@/data/my-mission";

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

const ECOSYSTEM_ICONS = [Globe, LineChart, ShieldCheck];
const ECOSYSTEM_RADIUS = 46;

function AiEcosystem() {
  return (
    <div className="relative flex size-32 items-center justify-center sm:size-40">
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute size-20 rounded-full bg-primary/40 blur-2xl sm:size-24"
      />
      <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-primary via-secondary to-accent text-white shadow-glow-primary sm:size-14">
        <Sparkles className="size-5 sm:size-6" aria-hidden="true" />
      </span>

      {ECOSYSTEM_ICONS.map((Icon, index) => {
        const angle = index * (360 / ECOSYSTEM_ICONS.length);
        return (
          <motion.div
            key={index}
            initial={{ rotate: angle }}
            animate={{ rotate: angle + 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 size-0"
          >
            <motion.div style={{ x: ECOSYSTEM_RADIUS }} className="absolute top-1/2 left-1/2 -translate-y-1/2">
              <motion.div
                initial={{ rotate: -angle }}
                animate={{ rotate: -(angle + 360) }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              >
                <span className={cn(glass.base, glass.light, "flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-md")}>
                  <Icon className="size-3.5 text-foreground" aria-hidden="true" />
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function MissionFinalCtaSection() {
  const character = characterAssets[missionFinalCta.characterPose];
  const TrustIcon = missionFinalCta.trustIcon;
  const [headlineLead, headlineTail] = missionFinalCta.headline.split(missionFinalCta.headlineEmphasis);

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
              <GradientText>{missionFinalCta.headlineEmphasis}</GradientText>
              {headlineTail}
            </Heading>
          </motion.div>

          <motion.p variants={motionVariants.fadeInUp} className="mt-5 max-w-lg text-lg text-muted-foreground">
            {missionFinalCta.description}
          </motion.p>

          <motion.div variants={motionVariants.fadeInUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <Button
                variant="gradient"
                size="lg"
                className="h-12 gap-2 px-8 text-base"
                nativeButton={false}
                render={
                  <Link href={missionFinalCta.primaryCta.href}>
                    {missionFinalCta.primaryCta.label}
                    <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden="true" />
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
                render={<Link href={missionFinalCta.secondaryCta.href}>{missionFinalCta.secondaryCta.label}</Link>}
              />
            </MagneticButton>
          </motion.div>

          <motion.p variants={motionVariants.fadeInUp} className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <TrustIcon className="size-4 text-accent-text" aria-hidden="true" />
            {missionFinalCta.trustLabel}
          </motion.p>
        </motion.div>
      </div>

      {/* Founder blended into the background beside a glowing AI ecosystem — continuous background, no divider from the previous section. */}
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
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square w-40 shrink-0 sm:w-64"
          >
            <div aria-hidden="true" style={FOUNDER_GLOW_AMBIENT} className="absolute -inset-[90%] -z-20 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen" />
            <div aria-hidden="true" style={FOUNDER_GLOW_TIGHT} className="absolute -inset-[45%] -z-10 rounded-full blur-[55px] mix-blend-multiply dark:mix-blend-screen" />
            <div aria-hidden="true" className="absolute inset-x-[22%] bottom-0 h-[8%] rounded-full bg-black/20 blur-2xl dark:bg-black/35" />

            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="relative h-full w-full">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14 sm:mb-24"
          >
            <AiEcosystem />
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
