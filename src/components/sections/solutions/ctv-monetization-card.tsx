"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Tv } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentHoverClasses } from "@/lib/accent";
import { TiltCard } from "@/components/ui/tilt-card";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { OrbitBadge } from "@/components/sections/solutions/orbit-badge";
import { SimpleSolutionCard } from "@/components/sections/solutions/simple-solution-card";
import { GlassIcon3D } from "@/components/ui/glass-icon";

export function CtvMonetizationCard() {
  return (
    <>
      {/* Desktop: full premium mockup */}
      <div
        className={cn(
          glass.base,
          glass.light,
          accentHoverClasses.accent,
          "group relative hidden h-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 lg:flex lg:flex-row lg:items-center lg:gap-8 lg:p-8"
        )}
      >
        <div
          aria-hidden="true"
          className="absolute -bottom-16 left-1/3 -z-10 size-64 rounded-full bg-accent/20 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-3">
            <GlassIcon3D icon={Tv} accent="accent" size="md" />
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">CTV Monetization</h3>
              <p className="text-xs text-muted-foreground">Premium video, premium demand</p>
            </div>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Connect Roku, Fire TV, and Samsung TV+ audiences to premium video demand — with live completion
            analytics.
          </p>

          <Link
            href="/solutions/ctv-monetization"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-primary-text"
          >
            Explore CTV Monetization
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative w-full max-w-xs shrink-0">
          <OrbitBadge
            radius={130}
            duration={26}
            startAngle={40}
            className={cn(glass.base, glass.light, "text-foreground")}
          >
            Roku
          </OrbitBadge>
          <OrbitBadge
            radius={130}
            duration={26}
            startAngle={180}
            reverse
            className={cn(glass.base, glass.light, "text-foreground")}
          >
            Fire TV
          </OrbitBadge>
          <OrbitBadge
            radius={130}
            duration={26}
            startAngle={300}
            className={cn(glass.base, glass.light, "text-foreground")}
          >
            Samsung TV+
          </OrbitBadge>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
          <TiltCard>
            <div className="overflow-hidden rounded-xl border-[6px] border-foreground/10 bg-background shadow-2xl">
              <div className="relative aspect-video bg-gradient-to-br from-muted/60 to-background">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="size-9 text-foreground/25" aria-hidden="true" />
                </div>

                <span
                  className={cn(
                    glass.base,
                    glass.light,
                    "absolute top-2 left-2 rounded-md px-2 py-1 text-[8px] font-semibold text-foreground"
                  )}
                >
                  Video Ad · 0:15
                </span>

                <div
                  className={cn(
                    glass.base,
                    glass.light,
                    "absolute top-2 right-2 flex flex-col items-center rounded-md px-2 py-1"
                  )}
                >
                  <span className="font-heading text-[10px] font-bold text-accent-text">
                    <AnimatedCounter value={94} suffix="%" />
                  </span>
                  <span className="text-[6px] text-muted-foreground">Completion</span>
                </div>

                <div className="absolute inset-x-2 bottom-2 h-1 overflow-hidden rounded-full bg-foreground/10">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="h-full origin-left rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                  />
                </div>
              </div>
            </div>
            <div className="mx-auto h-2.5 w-16 rounded-b-lg bg-foreground/10" />
            <div className="mx-auto h-1 w-28 rounded-full bg-foreground/5" />
          </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Tablet / mobile fallback */}
      <div className="lg:hidden">
        <SimpleSolutionCard
          icon={Tv}
          accent="accent"
          title="CTV Monetization"
          description="Connect Roku, Fire TV, and Samsung TV+ audiences to premium video demand — with live completion analytics."
          stat={{ value: "94%", label: "Completion Rate" }}
          href="/solutions/ctv-monetization"
        />
      </div>
    </>
  );
}
