"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AlertTriangle, ArrowRight, BrainCircuit, CheckCircle2, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  checkerIntro,
  contentTypeOptions,
  countryTierOptions,
  gamStatusOptions,
  getScoreStatus,
  payoutOptions,
  scoreMax,
  trafficQualityOptions,
  type ScoreOption,
  type ScoreStatus,
} from "@/data/eligibility-checker";

const STATUS_STYLES: Record<ScoreStatus, string> = {
  pass: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400",
  warn: "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-400",
  fail: "bg-destructive/10 text-destructive ring-destructive/20",
};

const STATUS_ICON: Record<ScoreStatus, typeof CheckCircle2> = {
  pass: CheckCircle2,
  warn: AlertTriangle,
  fail: XCircle,
};

const RING_COLOR: Record<ScoreStatus, string> = {
  pass: "stroke-emerald-500",
  warn: "stroke-amber-500",
  fail: "stroke-destructive",
};

function OptionPicker({
  options,
  activeId,
  onSelect,
}: {
  options: ScoreOption[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option.id === activeId;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            aria-pressed={isActive}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200",
              isActive
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                : "bg-foreground/[0.04] text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function RequirementRow({ label, status }: { label: string; status: ScoreStatus }) {
  const Icon = STATUS_ICON[status];
  return (
    <div className="flex items-center justify-between rounded-xl bg-foreground/[0.03] px-3.5 py-2.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className={cn("flex size-6 items-center justify-center rounded-full ring-1", STATUS_STYLES[status])}>
        <Icon className="size-3.5" aria-hidden="true" />
      </span>
    </div>
  );
}

function LiveScoreNumber({ value }: { value: number }) {
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, { stiffness: 90, damping: 22, mass: 0.6 });
  const display = useTransform(spring, (latest) => `${Math.round(latest)}%`);

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return <motion.span>{display}</motion.span>;
}

const ASSISTANT_MESSAGE: Record<ScoreStatus, string> = {
  pass: "Looking strong — you're in great shape to apply.",
  warn: "You're close. A few gaps are holding your score back.",
  fail: "Let's shore up a few basics before you apply.",
};

const STATUS_CTA: Record<ScoreStatus, { message: string; label: string }> = {
  pass: { message: "You're ready. I'll help you apply with confidence.", label: "Book A Consultation" },
  warn: { message: "A short conversation can close these gaps before you apply.", label: "Talk To Ismael About These Gaps" },
  fail: { message: "I'll walk you through exactly what needs to change first.", label: "Talk To Ismael" },
};

export function EligibilityInteractiveChecker() {
  const [url, setUrl] = useState("");
  const [payoutId, setPayoutId] = useState(payoutOptions[1].id);
  const [gamId, setGamId] = useState(gamStatusOptions[1].id);
  const [trafficId, setTrafficId] = useState(trafficQualityOptions[1].id);
  const [contentId, setContentId] = useState(contentTypeOptions[0].id);
  const [countryId, setCountryId] = useState(countryTierOptions[0].id);

  const payout = payoutOptions.find((o) => o.id === payoutId) ?? payoutOptions[0];
  const gam = gamStatusOptions.find((o) => o.id === gamId) ?? gamStatusOptions[0];
  const traffic = trafficQualityOptions.find((o) => o.id === trafficId) ?? trafficQualityOptions[0];
  const content = contentTypeOptions.find((o) => o.id === contentId) ?? contentTypeOptions[0];
  const country = countryTierOptions.find((o) => o.id === countryId) ?? countryTierOptions[0];

  const score = useMemo(
    () => Math.round(((payout.points + gam.points + traffic.points + content.points + country.points) / scoreMax) * 100),
    [payout, gam, traffic, content, country]
  );

  const recommendation = getScoreStatus(score);

  const httpsStatus: ScoreStatus = url.trim() === "" ? "warn" : url.trim().toLowerCase().startsWith("https://") ? "pass" : "fail";
  const gamStatus: ScoreStatus = gamId === "approved" ? "pass" : gamId === "pending" ? "warn" : "fail";
  const payoutStatus: ScoreStatus = payoutId === "1000-plus" || payoutId === "250-999" ? "pass" : payoutId === "100-249" ? "warn" : "fail";
  const trafficStatus: ScoreStatus = trafficId === "organic" ? "pass" : trafficId === "bot-heavy" ? "fail" : "warn";
  const contentStatus: ScoreStatus = contentId === "original" ? "pass" : contentId === "ai-thin" ? "fail" : "warn";
  const policyStatus: ScoreStatus =
    trafficId === "bot-heavy" || contentId === "ai-thin" ? "fail" : trafficId === "paid" || contentId === "curated" ? "warn" : "pass";

  const radius = 66;
  const circumference = 2 * Math.PI * radius;

  return (
    <Section id="eligibility-checker" spacing="lg" className="relative scroll-mt-24 overflow-hidden">
      <SectionHeading {...checkerIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className={cn(glass.base, glass.light, "mx-auto grid max-w-5xl gap-10 rounded-3xl p-6 sm:p-8 lg:grid-cols-2")}>
        <div className="space-y-6">
          <div>
            <label htmlFor="site-url" className="mb-2 block text-sm font-semibold text-foreground">
              Website URL
            </label>
            <input
              id="site-url"
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>

          <fieldset className="border-0 p-0">
            <legend className="mb-2 text-sm font-semibold text-foreground">Monthly Google Payout</legend>
            <OptionPicker options={payoutOptions} activeId={payoutId} onSelect={setPayoutId} />
          </fieldset>

          <fieldset className="border-0 p-0">
            <legend className="mb-2 text-sm font-semibold text-foreground">Google Ad Manager</legend>
            <OptionPicker options={gamStatusOptions} activeId={gamId} onSelect={setGamId} />
          </fieldset>

          <fieldset className="border-0 p-0">
            <legend className="mb-2 text-sm font-semibold text-foreground">Traffic Quality</legend>
            <OptionPicker options={trafficQualityOptions} activeId={trafficId} onSelect={setTrafficId} />
          </fieldset>

          <fieldset className="border-0 p-0">
            <legend className="mb-2 text-sm font-semibold text-foreground">Content Type</legend>
            <OptionPicker options={contentTypeOptions} activeId={contentId} onSelect={setContentId} />
          </fieldset>

          <fieldset className="border-0 p-0">
            <legend className="mb-2 text-sm font-semibold text-foreground">Country</legend>
            <OptionPicker options={countryTierOptions} activeId={countryId} onSelect={setCountryId} />
          </fieldset>
        </div>

        <div className="flex flex-col gap-5">
          <p role="status" aria-live="polite" className="sr-only">
            Eligibility score: {score}%, {recommendation.label}
          </p>
          <div className={cn(glass.base, glass.light, "flex items-center gap-5 rounded-2xl p-5")}>
            <div className="relative flex size-32 shrink-0 items-center justify-center">
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
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-foreground">
                  <LiveScoreNumber value={score} />
                </p>
              </div>
            </div>
            <div>
              <p className={cn("text-sm font-bold", recommendation.status === "pass" ? "text-emerald-600 dark:text-emerald-400" : recommendation.status === "warn" ? "text-amber-700 dark:text-amber-400" : "text-destructive")}>
                {recommendation.label}
              </p>
              <div className="mt-2 flex items-start gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-text ring-1 ring-primary/20">
                  <BrainCircuit className="size-3.5" aria-hidden="true" />
                </span>
                <p className="text-xs text-muted-foreground">{ASSISTANT_MESSAGE[recommendation.status]}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <RequirementRow label="Google Ad Manager" status={gamStatus} />
            <RequirementRow label="Payment History" status={payoutStatus} />
            <RequirementRow label="Traffic Quality" status={trafficStatus} />
            <RequirementRow label="Content Quality" status={contentStatus} />
            <RequirementRow label="HTTPS" status={httpsStatus} />
            <RequirementRow label="Policy Safe" status={policyStatus} />
          </div>

          <div className={cn(glass.base, glass.light, "mt-auto flex flex-col items-start gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between")}>
            <p className="text-sm font-medium text-foreground">{STATUS_CTA[recommendation.status].message}</p>
            <MagneticButton strength={0.3} className="w-full shrink-0 sm:w-auto">
              <Button
                variant="gradient"
                size="sm"
                className="w-full gap-1.5 sm:w-auto"
                nativeButton={false}
                render={
                  <Link href="/about/contact">
                    {STATUS_CTA[recommendation.status].label}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                }
              />
            </MagneticButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
