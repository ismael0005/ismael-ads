"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeading } from "@/components/sections/section-heading";
import { calculatorFactors, calculatorIntro, getScoreStatus, type ScoreStatus } from "@/data/eligibility-checker";

const STATUS_CTA: Record<ScoreStatus, string> = {
  pass: "Book A Consultation",
  warn: "Talk To Ismael About This",
  fail: "Talk To Ismael",
};

const RING_COLOR: Record<ScoreStatus, string> = {
  pass: "stroke-emerald-500",
  warn: "stroke-amber-500",
  fail: "stroke-destructive",
};

const LABEL_COLOR: Record<ScoreStatus, string> = {
  pass: "text-emerald-600 dark:text-emerald-400",
  warn: "text-amber-700 dark:text-amber-400",
  fail: "text-destructive",
};

function LiveNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, { stiffness: 90, damping: 22, mass: 0.6 });
  const display = useTransform(spring, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return <motion.span>{display}</motion.span>;
}

export function EligibilityCalculatorSection() {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(calculatorFactors.map((factor) => [factor.id, factor.defaultValue]))
  );

  const score = useMemo(() => {
    const total = calculatorFactors.reduce((sum, factor) => sum + (values[factor.id] ?? 0), 0);
    return Math.round(total / calculatorFactors.length);
  }, [values]);

  const recommendation = getScoreStatus(score);
  const radius = 66;
  const circumference = 2 * Math.PI * radius;

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...calculatorIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className={cn(glass.base, glass.light, "mx-auto grid max-w-4xl gap-10 rounded-3xl p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr]")}>
        <div className="space-y-6">
          {calculatorFactors.map((factor) => {
            const Icon = factor.icon;
            return (
              <div key={factor.id}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-semibold text-foreground">
                    <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                    {factor.label}
                  </span>
                  <span className="text-muted-foreground">
                    <LiveNumber value={values[factor.id]} suffix="%" />
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={values[factor.id]}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, [factor.id]: Number(event.target.value) }))
                  }
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
                  aria-label={factor.label}
                />
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-foreground/[0.03] p-6 text-center">
          <p role="status" aria-live="polite" className="sr-only">
            Qualification score: {score}%, {recommendation.label}
          </p>
          <div className="relative flex size-40 items-center justify-center">
            <svg viewBox="0 0 160 160" className="absolute inset-0 -rotate-90">
              <circle cx="80" cy="80" r={radius} fill="none" strokeWidth="10" className="stroke-muted" />
              <motion.circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                className={RING_COLOR[recommendation.status]}
                strokeDasharray={circumference}
                animate={{ strokeDashoffset: circumference * (1 - score / 100) }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </svg>
            <p className="font-heading text-3xl font-bold text-foreground">
              <LiveNumber value={score} suffix="%" />
            </p>
          </div>
          <div>
            <p className={cn("text-base font-bold", LABEL_COLOR[recommendation.status])}>{recommendation.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">Qualification Score</p>
          </div>

          <MagneticButton strength={0.3}>
            <Button
              variant="gradient"
              size="sm"
              className="gap-1.5"
              nativeButton={false}
              render={
                <Link href="/about/contact">
                  {STATUS_CTA[recommendation.status]}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              }
            />
          </MagneticButton>
        </div>
      </div>
    </Section>
  );
}
