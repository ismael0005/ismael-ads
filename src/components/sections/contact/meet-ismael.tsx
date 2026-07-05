"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Gauge, LayoutDashboard, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { motionVariants } from "@/styles/animations";
import { characterAssets } from "@/data/assets";
import { meetIsmael } from "@/data/contact";

const FOUNDER_FILTER = [
  "drop-shadow(0 0 35px rgba(109,40,217,0.32))",
  "drop-shadow(0 0 70px rgba(34,211,238,0.16))",
  "drop-shadow(-6px -8px 16px rgba(34,211,238,0.22))",
  "drop-shadow(8px 12px 20px rgba(0,0,0,0.3))",
].join(" ");

const FOUNDER_BOTTOM_FADE = "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)";

const FOUNDER_GLOW_AMBIENT: CSSProperties = {
  background: "radial-gradient(circle, rgba(109,40,217,0.24) 0%, rgba(34,211,238,0.12) 45%, transparent 72%)",
};

const FLOATING_BADGES = [
  { id: "dashboard", label: "Publisher Dashboard", icon: LayoutDashboard, x: 6, y: 18, delay: 0.2 },
  { id: "revenue", label: "Revenue +42%", icon: TrendingUp, x: 88, y: 30, delay: 0.4 },
  { id: "fill-rate", label: "98% Fill Rate", icon: Gauge, x: 10, y: 78, delay: 0.6 },
];

export function ContactMeetIsmaelSection() {
  const character = characterAssets[meetIsmael.characterPose];
  const KickerIcon = meetIsmael.kickerIcon;
  const [headlineLead, headlineTail] = meetIsmael.headline.split(meetIsmael.headlineEmphasis);

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm"
        >
          <div aria-hidden="true" style={FOUNDER_GLOW_AMBIENT} className="absolute -inset-[30%] -z-10 rounded-full blur-[90px] mix-blend-multiply dark:mix-blend-screen" />

          {FLOATING_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  opacity: { duration: 0.6, delay: badge.delay },
                  scale: { duration: 0.6, delay: badge.delay },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: badge.delay },
                }}
                style={{ left: `${badge.x}%`, top: `${badge.y}%` }}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              >
                <div className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-2xl px-3 py-2 shadow-xl")}>
                  <Icon className="size-4 text-primary-text" aria-hidden="true" />
                  <span className="text-[0.65rem] font-semibold whitespace-nowrap text-foreground">{badge.label}</span>
                </div>
              </motion.div>
            );
          })}

          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative h-full w-full">
            <div className="absolute inset-0 bg-transparent" style={{ maskImage: FOUNDER_BOTTOM_FADE, WebkitMaskImage: FOUNDER_BOTTOM_FADE }}>
              <Image
                src={character.src}
                alt={character.alt}
                fill
                sizes="(min-width: 1024px) 24rem, 20rem"
                className="object-contain"
                style={{ filter: FOUNDER_FILTER }}
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={motionVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={motionVariants.fadeInUp}>
            <Badge variant="outline" className="gap-1.5">
              <KickerIcon className="size-3" aria-hidden="true" />
              {meetIsmael.kicker}
            </Badge>
          </motion.div>

          <motion.div variants={motionVariants.fadeInUp}>
            <Heading as="h2" size="xl" className="mt-5 text-balance">
              {headlineLead}
              <GradientText>{meetIsmael.headlineEmphasis}</GradientText>
              {headlineTail}
            </Heading>
          </motion.div>

          <motion.div variants={motionVariants.fadeInUp} className="mt-5 space-y-4">
            {meetIsmael.bio.map((paragraph) => (
              <p key={paragraph} className="text-base text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div variants={motionVariants.fadeInUp} className="mt-6 flex flex-wrap gap-2">
            {meetIsmael.chips.map((chip) => (
              <span
                key={chip}
                className={cn(glass.base, glass.light, "rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground")}
              >
                {chip}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
