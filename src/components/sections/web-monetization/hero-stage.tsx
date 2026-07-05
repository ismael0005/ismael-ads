"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Eye, MousePointerClick, Sparkles, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { TiltCard } from "@/components/ui/tilt-card";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { Sparkline } from "@/components/dashboard/sparkline";
import { FloatingWidget } from "@/components/sections/ad-formats/floating-widget";
import { characterAssets, type CharacterPoseId } from "@/data/assets";
import { webDemandPartners, webHeroMetrics } from "@/data/web-monetization";

const REVENUE_TREND = [20, 34, 28, 46, 40, 58, 72, 66, 88, 100];

/** Same rim-light + ambient-shadow technique as the homepage founder — keeps the brand's lighting language consistent across pages. */
const FOUNDER_FILTER = [
  "drop-shadow(0 0 32px rgba(109,40,217,0.35))",
  "drop-shadow(0 0 70px rgba(34,211,238,0.16))",
  "drop-shadow(-6px -8px 14px rgba(34,211,238,0.22))",
  "drop-shadow(8px 12px 18px rgba(0,0,0,0.3))",
].join(" ");

/** Applied to a plain wrapper only, never combined with FOUNDER_FILTER on the same element (masking would hard-clip the filter's soft bleed). */
const FOUNDER_BOTTOM_FADE = "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)";

const FOUNDER_GLOW_TIGHT: CSSProperties = {
  background:
    "radial-gradient(circle, rgba(109,40,217,0.5) 0%, rgba(37,99,235,0.32) 32%, rgba(34,211,238,0.2) 55%, transparent 75%)",
};
const FOUNDER_GLOW_AMBIENT: CSSProperties = {
  background:
    "radial-gradient(circle, rgba(109,40,217,0.22) 0%, rgba(34,211,238,0.12) 45%, transparent 72%)",
};

function PartnerRow() {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <span className="text-[11px] text-muted-foreground">Certified access:</span>
      {webDemandPartners.map((partner) => (
        <span
          key={partner}
          className={cn(
            glass.base,
            glass.light,
            "rounded-full px-2.5 py-1 text-[10px] font-medium text-foreground"
          )}
        >
          {partner}
        </span>
      ))}
    </div>
  );
}

function BrowserMockup() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <TiltCard maxTilt={4} className="mx-auto w-full max-w-sm">
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/40 px-3 py-2">
            <span className="size-2 rounded-full bg-red-400/70" />
            <span className="size-2 rounded-full bg-amber-400/70" />
            <span className="size-2 rounded-full bg-green-400/70" />
            <div className="ml-2 flex-1 truncate rounded-full bg-background px-3 py-1 text-[9px] text-muted-foreground">
              ismaelads.com/publisher
            </div>
          </div>

          <div className="relative h-48 overflow-hidden p-4 sm:h-56">
            <div className="space-y-2 opacity-30">
              <div className="h-2 w-1/2 rounded-full bg-foreground" />
              <div className="h-14 w-full rounded-lg bg-foreground/10" />
              <div className="h-2 w-2/3 rounded-full bg-foreground" />
              <div className="h-2 w-1/3 rounded-full bg-foreground" />
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-[9px] font-medium text-muted-foreground">
              <span className="rounded-full bg-muted px-2 py-0.5">SSP</span>
              <ArrowRight className="size-3" aria-hidden="true" />
              <span className="rounded-full bg-muted px-2 py-0.5">Auction</span>
              <ArrowRight className="size-3" aria-hidden="true" />
              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary-text">Winner</span>
            </div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={cn(
                glass.base,
                glass.light,
                "absolute top-4 right-4 flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[9px] font-semibold text-foreground shadow-lg"
              )}
            >
              <Sparkles className="size-3 text-accent-text" aria-hidden="true" />
              AI Optimizing
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className={cn(glass.base, glass.light, "absolute bottom-4 left-4 w-28 rounded-xl p-2 shadow-lg")}
            >
              <p className="text-[8px] text-muted-foreground">Revenue</p>
              <Sparkline trend={REVENUE_TREND} accent="primary" className="h-8" />
            </motion.div>
          </div>

          <div className="grid grid-cols-3 divide-x divide-border/60 border-t border-border/60 text-center">
            {webHeroMetrics.map((metric) => (
              <div key={metric.label} className="p-3">
                <p className="font-heading text-sm font-bold text-foreground">
                  <AnimatedCounter
                    value={metric.numericValue}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                  />
                </p>
                <p className="text-[9px] text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

interface WebHeroStageProps {
  characterPose: CharacterPoseId;
}

export function WebHeroStage({ characterPose }: WebHeroStageProps) {
  const character = characterAssets[characterPose];

  return (
    <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-6">
      {/* Founder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative order-2 aspect-square w-40 shrink-0 sm:w-48 lg:order-1 lg:w-56"
      >
        <div
          aria-hidden="true"
          style={FOUNDER_GLOW_AMBIENT}
          className="absolute -inset-[90%] -z-20 rounded-full blur-[70px] mix-blend-multiply dark:mix-blend-screen"
        />
        <div
          aria-hidden="true"
          style={FOUNDER_GLOW_TIGHT}
          className="absolute -inset-[45%] -z-10 rounded-full blur-[48px] mix-blend-multiply dark:mix-blend-screen"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-[26%] bottom-0 h-[8%] rounded-full bg-black/20 blur-2xl dark:bg-black/35"
        />

        <div
          className="absolute inset-0 bg-transparent"
          style={{ maskImage: FOUNDER_BOTTOM_FADE, WebkitMaskImage: FOUNDER_BOTTOM_FADE }}
        >
          <Image
            src={character.src}
            alt={character.alt}
            fill
            preload
            sizes="14rem"
            className="object-contain"
            style={{ filter: FOUNDER_FILTER }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={cn(
            glass.base,
            glass.light,
            "absolute -right-2 top-2 flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 shadow-xl sm:-right-4"
          )}
        >
          <TrendingUp className="size-3.5 text-primary-text" aria-hidden="true" />
          <span className="text-xs font-bold whitespace-nowrap text-foreground">+285% Revenue</span>
        </motion.div>
      </motion.div>

      {/* Dashboard mockup */}
      <div className="relative order-1 w-full lg:order-2 lg:flex-1">
        <div className="relative mx-auto hidden w-full max-w-sm lg:block">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]"
          />

          <BrowserMockup />

          {/* Positioned above/below the card entirely so they never cross the card's own internal top-right / bottom-left badges. */}
          <FloatingWidget
            icon={MousePointerClick}
            accent="secondary"
            label="CTR"
            numericValue={2.4}
            decimals={1}
            suffix="%"
            className="-top-8 right-6"
            floatDelay={0.3}
            floatDuration={5}
          />
          <FloatingWidget
            icon={Eye}
            accent="accent"
            label="Viewability"
            numericValue={87}
            suffix="%"
            className="-bottom-8 left-6"
            floatDelay={0.6}
            floatDuration={5.4}
          />

          <PartnerRow />
        </div>

        <div className="lg:hidden">
          <BrowserMockup />
          <PartnerRow />
        </div>
      </div>
    </div>
  );
}
