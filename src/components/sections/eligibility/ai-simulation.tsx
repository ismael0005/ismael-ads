"use client";

import { CheckCircle2, Radio } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { useAutoCycle } from "@/hooks/use-auto-cycle";
import { scanSteps, simulationIntro } from "@/data/eligibility-checker";

const BARS = [30, 55, 42, 68, 60, 82, 74, 96];

export function EligibilityAiSimulationSection() {
  const [index] = useAutoCycle(scanSteps.length + 2, 1600);
  const completedCount = Math.min(index, scanSteps.length);
  const isComplete = index >= scanSteps.length;
  const progress = Math.round((completedCount / scanSteps.length) * 100);

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...simulationIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className={cn(glass.base, glass.light, "mx-auto grid max-w-4xl gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr]")}>
        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Live scan</p>
            <span
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1",
                isComplete
                  ? "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400"
                  : "bg-accent/10 text-accent-text ring-accent/20"
              )}
            >
              <Radio className="size-3" aria-hidden="true" />
              {isComplete ? "Scan complete" : "Scanning"}
            </span>
          </div>

          <div className="space-y-2.5">
            {scanSteps.map((step, stepIndex) => {
              const Icon = step.icon;
              const isDone = stepIndex < completedCount;
              const isActive = stepIndex === completedCount && !isComplete;
              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors duration-300",
                    (isDone || isActive) && "bg-foreground/[0.03]"
                  )}
                >
                  <motion.span
                    animate={isActive ? { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] } : {}}
                    transition={{ duration: 1, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg ring-1 transition-opacity duration-300",
                      !isDone && !isActive && "opacity-40",
                      isDone
                        ? "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400"
                        : "bg-primary/10 text-primary-text ring-primary/20"
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </motion.span>
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-sm font-semibold transition-colors duration-300", isDone || isActive ? "text-foreground" : "text-muted-foreground")}>
                      {step.label}
                    </p>
                    {isDone && <p className="truncate text-xs text-muted-foreground">{step.result}</p>}
                  </div>
                  {isDone && <CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Overall progress</span>
              <span className="font-semibold text-foreground">{progress}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full origin-left rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="flex h-28 items-end gap-1.5">
            {BARS.map((height, barIndex) => (
              <motion.div
                key={barIndex}
                className="flex-1 rounded-t bg-gradient-to-t from-primary/30 to-accent"
                initial={{ height: "6%" }}
                animate={{ height: `${Math.min(100, height * (0.3 + progress / 100))}%` }}
                transition={{ duration: 0.6, delay: barIndex * 0.03, ease: "easeOut" }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-foreground/[0.03] p-3">
            <span className="relative flex size-2.5">
              <span
                className={cn(
                  "absolute inline-flex size-full animate-ping rounded-full opacity-75",
                  isComplete ? "bg-emerald-500" : "bg-accent"
                )}
              />
              <span className={cn("relative inline-flex size-2.5 rounded-full", isComplete ? "bg-emerald-500" : "bg-accent")} />
            </span>
            <p className="text-xs font-medium text-muted-foreground">
              {isComplete ? "All systems verified — ready for manual review." : "AI engine is analyzing your signals in real time."}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
