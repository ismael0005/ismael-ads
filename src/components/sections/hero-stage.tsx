"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { characterAssets, type CharacterPoseId } from "@/data/assets";
import { heroWidgets, type HeroWidgetAccent } from "@/data/home";
import { HeroWidgetChip } from "@/components/ui/hero-widget-chip";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";

interface HeroStageProps {
  characterPose: CharacterPoseId;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}

const ACCENT_VAR: Record<HeroWidgetAccent, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
};

/**
 * Rim light + ambient glow that hugs the founder's exact silhouette (alpha edge),
 * CSS only — never touches the source PNG. Lives ONLY on the <Image> itself, never
 * combined with mask-image on the same element — masking clips to the element's
 * own box, which would hard-cut this filter's soft bleed into a visible rectangle
 * right around the hands/shoulders.
 */
const FOUNDER_FILTER = [
  "drop-shadow(0 0 40px rgba(109,40,217,0.35))",
  "drop-shadow(0 0 90px rgba(34,211,238,0.18))",
  "drop-shadow(-8px -10px 18px rgba(34,211,238,0.28))",
  "drop-shadow(10px 14px 22px rgba(0,0,0,0.32))",
].join(" ");

/**
 * Fades only the founder's bottom edge into the scene — applied to a plain
 * wrapper div around the image (never the same element as FOUNDER_FILTER).
 * Top/left/right are untouched: welcome-pose's arms spread almost to the frame
 * edges, so fading those would visibly clip his hands. Mask only, PNG untouched.
 */
const FOUNDER_BOTTOM_FADE = "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)";

/**
 * Large, soft, blend-mode-aware radial glow behind the founder — same technique
 * (mix-blend-multiply in light mode, mix-blend-screen in dark mode) as the page's
 * own aurora in hero-background.tsx, so his lighting reads as part of the scene's
 * ambient light rather than a separate spotlight disc pasted behind him. Always a
 * separate absolute div, always rounded-full, always behind the PNG (negative z).
 */
const FOUNDER_GLOW_TIGHT: CSSProperties = {
  background:
    "radial-gradient(circle, rgba(109,40,217,0.5) 0%, rgba(37,99,235,0.32) 32%, rgba(34,211,238,0.2) 55%, transparent 75%)",
};
const FOUNDER_GLOW_AMBIENT: CSSProperties = {
  background:
    "radial-gradient(circle, rgba(109,40,217,0.22) 0%, rgba(34,211,238,0.12) 45%, transparent 72%)",
};

/** Deterministic pseudo-random spread local to the stage — denser atmosphere immediately around the founder. */
const STAGE_PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const seed = i * 91.3;
  return {
    left: 14 + ((seed * 2.3) % 72),
    top: 6 + ((seed * 3.7) % 88),
    size: 1.5 + (i % 3) * 0.6,
    duration: 5 + (i % 5),
    delay: (i % 6) * 0.35,
    opacity: 0.3 + (i % 3) * 0.15,
  };
});

export function HeroStage({ characterPose, mx, my }: HeroStageProps) {
  const character = characterAssets[characterPose];
  const founderX = useTransform(mx, [-1, 1], [-10, 10]);
  const founderY = useTransform(my, [-1, 1], [-10, 10]);
  const compactWidgets = heroWidgets.filter((widget) => widget.compact);

  return (
    <div className="relative w-full">
      {/* Desktop: full layered widget ecosystem around the founder */}
      <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-md lg:block lg:max-w-lg">
        {/* Atmospheric lens glow + local particles, behind everything */}
        <div
          aria-hidden="true"
          className="absolute top-[10%] right-[14%] -z-10 size-32 rounded-full bg-white/40 opacity-30 blur-3xl mix-blend-screen dark:opacity-60"
        />
        {STAGE_PARTICLES.map((particle, index) => (
          <motion.span
            key={index}
            animate={{
              y: [0, -14, 0],
              opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
            style={{ left: `${particle.left}%`, top: `${particle.top}%`, width: particle.size, height: particle.size }}
            className="absolute rounded-full bg-foreground blur-[0.5px] dark:bg-white"
          />
        ))}

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="hero-connector" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--color-primary)", stopOpacity: 0.4 }} />
              <stop offset="100%" style={{ stopColor: "var(--color-accent)", stopOpacity: 0.06 }} />
            </linearGradient>
          </defs>
          {heroWidgets.map((widget) => {
            const path = `M 50 54 Q ${(50 + widget.x) / 2} ${(54 + widget.y) / 2 + (widget.y > 54 ? 12 : -12)} ${widget.x} ${widget.y}`;
            return (
              <g key={widget.id}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="url(#hero-connector)"
                  strokeWidth={0.18}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.4, delay: widget.delay + 0.2, ease: "easeOut" }}
                />
                <motion.path
                  d={path}
                  fill="none"
                  stroke={ACCENT_VAR[widget.accent]}
                  strokeWidth={0.5}
                  strokeLinecap="round"
                  strokeDasharray="1.5 20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85, strokeDashoffset: [0, -220] }}
                  transition={{
                    opacity: { duration: 0.4, delay: widget.delay + 1.2 },
                    strokeDashoffset: {
                      duration: 3.5 + widget.depth * 2.5,
                      repeat: Infinity,
                      ease: "linear",
                      delay: widget.delay + 1.3,
                    },
                  }}
                />
              </g>
            );
          })}
        </svg>

        <div className="absolute top-[54%] left-1/2 z-[5] aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2">
          <motion.div style={{ x: founderX, y: founderY }} className="h-full w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
              transition={{
                opacity: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
              }}
              className="relative h-full w-full"
            >
              <div
                aria-hidden="true"
                style={FOUNDER_GLOW_AMBIENT}
                className="absolute -inset-[110%] -z-20 rounded-full blur-[90px] mix-blend-multiply dark:mix-blend-screen"
              />
              <div
                aria-hidden="true"
                style={FOUNDER_GLOW_TIGHT}
                className="absolute -inset-[55%] -z-10 rounded-full blur-[60px] mix-blend-multiply dark:mix-blend-screen"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-[28%] bottom-[3%] h-[7%] rounded-full bg-black/20 blur-[45px] dark:bg-black/35"
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
                  sizes="(min-width: 1024px) 28rem, 22rem"
                  className="object-contain"
                  style={{ filter: FOUNDER_FILTER }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {heroWidgets.map((widget) => (
          <HeroWidgetChip key={widget.id} widget={widget} mx={mx} my={my} />
        ))}
      </div>

      {/* Tablet / mobile: founder only, no absolute-positioned ecosystem */}
      <div className="relative mx-auto aspect-square w-64 sm:w-80 lg:hidden">
        <div
          aria-hidden="true"
          style={FOUNDER_GLOW_AMBIENT}
          className="absolute -inset-[100%] -z-20 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen"
        />
        <div
          aria-hidden="true"
          style={FOUNDER_GLOW_TIGHT}
          className="absolute -inset-[50%] -z-10 rounded-full blur-[55px] mix-blend-multiply dark:mix-blend-screen"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-[30%] bottom-[3%] h-[8%] rounded-full bg-black/20 blur-[40px] dark:bg-black/35"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
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
              preload
              sizes="18rem"
              className="object-contain"
              style={{ filter: FOUNDER_FILTER }}
            />
          </div>
        </motion.div>
      </div>

      {/* Tablet / mobile: compact stat row in normal flow instead of absolute widgets */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:hidden">
        {compactWidgets.map((widget) => {
          const Icon = widget.icon;
          return (
            <div
              key={widget.id}
              className={cn(
                glass.base,
                glass.light,
                "flex items-center gap-2 rounded-full px-3 py-1.5"
              )}
            >
              <Icon className="size-3.5 text-accent-text" aria-hidden="true" />
              <span className="text-xs font-medium text-muted-foreground">{widget.label}</span>
              <span className="font-heading text-xs font-bold whitespace-nowrap text-foreground">
                {widget.kind === "metric" ? (
                  <AnimatedCounter
                    value={widget.numericValue}
                    prefix={widget.prefix}
                    suffix={widget.suffix}
                    decimals={widget.decimals}
                  />
                ) : widget.kind === "chart" ? (
                  widget.value
                ) : (
                  widget.status
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
