"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { PhoneFrame } from "@/components/sections/app-monetization/phone-frame";
import { AdCreative } from "@/components/sections/ad-formats/ad-creative";
import { useAutoCycle } from "@/hooks/use-auto-cycle";
import { adFormatCatalog, mobileExperienceIntro, mobileSdks, mobileSteps } from "@/data/ad-formats";

const STEP_FORMAT_ID: Record<string, string> = {
  banner: "display",
  native: "native",
  interstitial: "interstitial",
  rewarded: "rewarded",
  anchor: "anchor",
};

const SEQUENCE = mobileSteps.map((step) => adFormatCatalog.find((format) => format.id === STEP_FORMAT_ID[step.id])!);

const SDK_POSITIONS = [
  { top: "8%", left: "4%" },
  { top: "28%", left: "88%" },
  { top: "58%", left: "2%" },
  { top: "76%", left: "86%" },
  { top: "94%", left: "14%" },
];

export function AdFormatsMobileSection() {
  const [index] = useAutoCycle(SEQUENCE.length, 2400);
  const active = SEQUENCE[index];

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...mobileExperienceIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className="relative mx-auto h-[30rem] max-w-md sm:h-[34rem]">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[110px] mix-blend-multiply dark:mix-blend-screen"
        />

        {mobileSdks.map((sdk, sdkIndex) => {
          const Icon = sdk.icon;
          const pos = SDK_POSITIONS[sdkIndex];
          return (
            <motion.div
              key={sdk.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: sdkIndex * 0.1 }}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5 + (sdkIndex % 3), repeat: Infinity, ease: "easeInOut", delay: sdkIndex * 0.2 }}
                className={cn(glass.base, glass.light, "flex items-center gap-1.5 rounded-full px-3 py-1.5")}
              >
                <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
                <span className="text-xs font-semibold whitespace-nowrap text-foreground">{sdk.name}</span>
              </motion.div>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 left-1/2 z-10 w-56 -translate-x-1/2 -translate-y-1/2 sm:w-64"
        >
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <PhoneFrame className="shadow-2xl ring-1 ring-white/10">
              <AdCreative format={active} />
            </PhoneFrame>
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {mobileSteps.map((step, stepIndex) => (
          <span
            key={step.id}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300",
              stepIndex === index ? "bg-primary/15 text-primary-text ring-1 ring-primary/25" : "bg-muted text-muted-foreground"
            )}
          >
            {step.label}
          </span>
        ))}
      </div>
    </Section>
  );
}
