"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentHoverClasses } from "@/lib/accent";
import { TiltCard } from "@/components/ui/tilt-card";
import { GlassIcon3D } from "@/components/ui/glass-icon";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { Sparkline } from "@/components/dashboard/sparkline";
import { OrbitBadge } from "@/components/sections/solutions/orbit-badge";
import { SimpleSolutionCard } from "@/components/sections/solutions/simple-solution-card";

const REVENUE_TREND = [20, 34, 28, 46, 40, 58, 72, 66, 88, 100];

export function WebMonetizationCard() {
  return (
    <>
      {/* Desktop: full premium mockup */}
      <div
        className={cn(
          glass.base,
          glass.light,
          accentHoverClasses.primary,
          "group relative hidden h-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 lg:flex lg:p-8"
        )}
      >
        <div
          aria-hidden="true"
          className="absolute -top-16 -left-16 -z-10 size-64 rounded-full bg-primary/20 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <GlassIcon3D icon={Globe} accent="primary" size="md" />
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">Web Monetization</h3>
              <p className="text-xs text-muted-foreground">Maximize every page view</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold text-accent-text ring-1 ring-accent/20">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            AI Optimizing
          </span>
        </div>

        <div className="relative mx-auto mt-10 w-full max-w-sm flex-1">
          <OrbitBadge
            radius={200}
            duration={28}
            startAngle={15}
            className={cn(glass.base, glass.light, "text-foreground")}
          >
            Google AdX
          </OrbitBadge>
          <OrbitBadge
            radius={200}
            duration={28}
            startAngle={150}
            className={cn(glass.base, glass.light, "text-foreground")}
          >
            PubMatic
          </OrbitBadge>
          <OrbitBadge
            radius={200}
            duration={28}
            startAngle={270}
            reverse
            className={cn(glass.base, glass.light, "text-foreground")}
          >
            OpenX
          </OrbitBadge>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
          <TiltCard>
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl">
              <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/40 px-3 py-2">
                <span className="size-2 rounded-full bg-red-400/70" />
                <span className="size-2 rounded-full bg-amber-400/70" />
                <span className="size-2 rounded-full bg-green-400/70" />
                <div className="ml-2 flex-1 truncate rounded-full bg-background px-3 py-1 text-[9px] text-muted-foreground">
                  ismaelads.com/publisher
                </div>
              </div>

              <div className="relative h-48 overflow-hidden p-4">
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
                  Native Ad
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
                <div className="p-3">
                  <p className="font-heading text-sm font-bold text-foreground">
                    <AnimatedCounter value={24.8} decimals={2} prefix="$" />
                  </p>
                  <p className="text-[9px] text-muted-foreground">Avg. RPM</p>
                </div>
                <div className="p-3">
                  <p className="font-heading text-sm font-bold text-foreground">
                    <AnimatedCounter value={98} suffix="%" />
                  </p>
                  <p className="text-[9px] text-muted-foreground">Fill Rate</p>
                </div>
                <div className="p-3">
                  <p className="font-heading text-sm font-bold text-primary-text">
                    <AnimatedCounter value={285} prefix="+" suffix="%" />
                  </p>
                  <p className="text-[9px] text-muted-foreground">Growth</p>
                </div>
              </div>
            </div>
          </TiltCard>
          </motion.div>
        </div>

        <p className="relative z-10 mt-8 text-sm text-muted-foreground">
          Adaptive layouts, certified AdX access, and real-time header bidding — tuned for every page on your site.
        </p>

        <Link
          href="/solutions/web-monetization"
          className="relative z-10 mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-primary-text"
        >
          Explore Web Monetization
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Tablet / mobile fallback */}
      <div className="lg:hidden">
        <SimpleSolutionCard
          icon={Globe}
          accent="primary"
          title="Web Monetization"
          description="Adaptive layouts, certified AdX access, and real-time header bidding — tuned for every page on your site."
          stat={{ value: "+180%", label: "Avg. RPM Lift" }}
          href="/solutions/web-monetization"
        />
      </div>
    </>
  );
}
