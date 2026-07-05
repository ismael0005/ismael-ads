"use client";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { useAutoCycle } from "@/hooks/use-auto-cycle";
import { desktopExperienceIntro, desktopSteps } from "@/data/ad-formats";

function Note({ children, className, visible }: { children: string; className?: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.4 }}
          className={cn(
            glass.base,
            glass.light,
            "absolute z-20 hidden rounded-lg px-2.5 py-1.5 text-[10px] font-semibold whitespace-nowrap text-foreground shadow-lg lg:block",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AdFormatsDesktopSection() {
  const [step] = useAutoCycle(desktopSteps.length, 2600);

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...desktopExperienceIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className="relative mx-auto max-w-3xl">
        <div className="rounded-t-xl border border-b-0 border-border/60 bg-muted/30 p-2">
          <div className="flex items-center gap-1.5 rounded-lg bg-background/80 px-3 py-2">
            <span className="size-2 rounded-full bg-red-400/70" />
            <span className="size-2 rounded-full bg-amber-400/70" />
            <span className="size-2 rounded-full bg-green-400/70" />
            <div className="ml-2 flex-1 truncate rounded-full bg-muted px-3 py-1 text-[10px] text-muted-foreground">
              www.example-publisher.com
            </div>
          </div>
        </div>

        <div className="relative h-80 overflow-hidden border border-border/60 bg-background sm:h-96">
          {/* Leaderboard */}
          <AnimatePresence>
            {step >= 0 && (
              <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(glass.base, glass.light, "absolute inset-x-4 top-4 flex h-10 items-center justify-center rounded-lg text-[10px] font-bold text-foreground sm:h-12")}
              >
                Leaderboard · 728×90
              </motion.div>
            )}
          </AnimatePresence>
          <Note visible={step === 0} className="top-16 left-4">
            {desktopSteps[0].description}
          </Note>

          {/* Page skeleton content */}
          <div className="absolute inset-x-4 top-20 space-y-2.5 pr-32 opacity-25 sm:top-24 sm:pr-40">
            <div className="h-2 w-1/3 rounded-full bg-foreground" />
            <div className="h-2 w-2/3 rounded-full bg-foreground" />
            <div className="h-2 w-1/2 rounded-full bg-foreground" />
            <div className="h-24 w-full rounded-lg bg-foreground/10" />
            <div className="h-2 w-2/3 rounded-full bg-foreground" />
          </div>

          {/* Sidebar */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(glass.base, glass.light, "absolute top-20 right-4 bottom-16 flex w-24 items-center justify-center rounded-lg text-center text-[9px] font-bold text-foreground sm:top-24 sm:w-32")}
              >
                Sidebar · 300×600
              </motion.div>
            )}
          </AnimatePresence>
          <Note visible={step === 1} className="top-32 left-4">
            {desktopSteps[1].description}
          </Note>

          {/* In-content */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(glass.base, glass.light, "absolute inset-x-4 top-44 flex h-14 items-center justify-center rounded-lg text-[10px] font-bold text-foreground sm:top-52 sm:mr-32")}
              >
                In-Content Native Ad
              </motion.div>
            )}
          </AnimatePresence>
          <Note visible={step === 2} className="top-16 left-4">
            {desktopSteps[2].description}
          </Note>

          {/* Sticky footer */}
          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(glass.base, glass.light, "absolute inset-x-4 bottom-4 flex h-9 items-center justify-center rounded-lg text-[10px] font-bold text-foreground")}
              >
                Sticky Footer · Always in view
              </motion.div>
            )}
          </AnimatePresence>
          <Note visible={step === 3} className="top-16 left-4">
            {desktopSteps[3].description}
          </Note>
        </div>

        <div className="mx-auto h-3 w-full rounded-b-xl bg-gradient-to-b from-muted/60 to-muted/20" />
        <div className="mx-auto h-1.5 w-1/3 rounded-b-lg bg-muted/40" />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {desktopSteps.map((desktopStep, index) => (
            <span
              key={desktopStep.id}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300",
                step >= index ? "bg-primary/15 text-primary-text ring-1 ring-primary/25" : "bg-muted text-muted-foreground"
              )}
            >
              {desktopStep.label}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
