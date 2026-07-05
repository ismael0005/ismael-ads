"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bell, Gift, ImageIcon, Smartphone } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentHoverClasses } from "@/lib/accent";
import { TiltCard } from "@/components/ui/tilt-card";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { OrbitBadge } from "@/components/sections/solutions/orbit-badge";
import { SimpleSolutionCard } from "@/components/sections/solutions/simple-solution-card";
import { GlassIcon3D } from "@/components/ui/glass-icon";

export function AppMonetizationCard() {
  return (
    <>
      {/* Desktop: full premium mockup */}
      <div
        className={cn(
          glass.base,
          glass.light,
          accentHoverClasses.secondary,
          "group relative hidden h-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 lg:flex"
        )}
      >
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 -z-10 size-64 rounded-full bg-secondary/20 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative z-10 flex items-center gap-3">
          <GlassIcon3D icon={Smartphone} accent="secondary" size="md" />
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">App Monetization</h3>
            <p className="text-xs text-muted-foreground">Revenue without the friction</p>
          </div>
        </div>

        <div className="relative mx-auto mt-10 flex w-full flex-1 items-center justify-center">
          <OrbitBadge
            radius={95}
            duration={24}
            startAngle={30}
            className={cn(glass.base, glass.light, "text-foreground")}
          >
            AppLovin
          </OrbitBadge>
          <OrbitBadge
            radius={95}
            duration={24}
            startAngle={120}
            reverse
            className={cn(glass.base, glass.light, "text-foreground")}
          >
            AdMob
          </OrbitBadge>
          <OrbitBadge
            radius={95}
            duration={24}
            startAngle={210}
            className={cn(glass.base, glass.light, "text-foreground")}
          >
            Unity
          </OrbitBadge>
          <OrbitBadge
            radius={95}
            duration={24}
            startAngle={300}
            reverse
            className={cn(glass.base, glass.light, "text-foreground")}
          >
            IronSource
          </OrbitBadge>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
          <TiltCard className="w-36">
            <div className="relative aspect-[9/19] overflow-hidden rounded-[1.75rem] border-4 border-foreground/10 bg-background shadow-2xl">
              <div className="flex items-center justify-between px-4 pt-3 text-[8px] font-medium text-muted-foreground">
                <span>9:41</span>
                <span>●●●</span>
              </div>

              <div className="space-y-2 px-3 pt-3">
                <div className="h-16 rounded-xl bg-foreground/10" />
                <div className="h-1.5 w-3/4 rounded-full bg-foreground/15" />
                <div className="h-1.5 w-1/2 rounded-full bg-foreground/15" />

                <div className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-2 py-2 text-[7px] font-semibold text-primary-text ring-1 ring-primary/20">
                  <ImageIcon className="size-2.5" aria-hidden="true" />
                  Banner Ad
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-foreground/[0.04] p-2">
                  <span className="size-6 shrink-0 rounded-md bg-foreground/10" />
                  <div className="flex-1 space-y-1">
                    <div className="h-1 w-full rounded-full bg-foreground/15" />
                    <div className="h-1 w-2/3 rounded-full bg-foreground/15" />
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: [0, 1, 1, 0], y: [-8, 0, 0, -8] }}
                transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.15, 0.8, 1], ease: "easeInOut" }}
                className={cn(
                  glass.base,
                  glass.light,
                  "absolute inset-x-2 top-9 flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[7px] font-semibold text-foreground shadow-lg"
                )}
              >
                <Bell className="size-2.5 text-accent-text" aria-hidden="true" />
                New fill: AdMob +$0.04
              </motion.div>

              <div
                className={cn(
                  glass.base,
                  glass.light,
                  "absolute inset-x-2 bottom-12 flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[7px] font-semibold text-foreground shadow-lg"
                )}
              >
                <Gift className="size-2.5 text-secondary-text" aria-hidden="true" />
                Rewarded: +$0.02
              </div>

              <div className="absolute inset-x-2 bottom-2 rounded-lg bg-foreground/[0.04] px-2 py-1.5 text-center">
                <p className="font-heading text-[10px] font-bold text-foreground">
                  <AnimatedCounter value={1284} prefix="$" decimals={0} />
                </p>
                <p className="text-[6px] text-muted-foreground">Today&apos;s Revenue</p>
              </div>
            </div>
          </TiltCard>
          </motion.div>
        </div>

        <p className="relative z-10 mt-6 text-sm text-muted-foreground">
          Banner, native, interstitial, and rewarded units — mediated across every top SDK automatically.
        </p>

        <Link
          href="/solutions/app-monetization"
          className="relative z-10 mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-primary-text"
        >
          Explore App Monetization
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Tablet / mobile fallback */}
      <div className="lg:hidden">
        <SimpleSolutionCard
          icon={Smartphone}
          accent="secondary"
          title="App Monetization"
          description="Banner, native, interstitial, and rewarded units — mediated across every top SDK automatically."
          stat={{ value: "92%", label: "Fill Rate" }}
          href="/solutions/app-monetization"
        />
      </div>
    </>
  );
}
