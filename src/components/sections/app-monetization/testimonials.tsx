"use client";

import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Sparkline } from "@/components/dashboard/sparkline";
import { PhoneFrame } from "@/components/sections/app-monetization/phone-frame";
import { useAutoCycle } from "@/hooks/use-auto-cycle";
import { appCaseStudies, appTestimonialsIntro, type AppCaseStudy } from "@/data/app-monetization";

function CaseStudyScreen({ study }: { study: AppCaseStudy }) {
  return (
    <div className="flex h-full w-full flex-col gap-3 bg-background p-4 pt-8">
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-xl font-heading text-xs font-bold ring-1",
            accentChipClasses[study.accent]
          )}
        >
          {study.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[11px] font-bold text-foreground">{study.appName}</p>
          <p className="truncate text-[9px] text-muted-foreground">{study.category}</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[9px] font-medium text-muted-foreground">
        <Download className="size-3" aria-hidden="true" />
        {study.downloads} downloads
      </div>

      <p className="text-[10px] leading-snug text-foreground/85">&ldquo;{study.quote}&rdquo;</p>

      <Sparkline trend={study.trend} accent={study.accent} className="h-10" />

      <div className="mt-auto flex items-center gap-2 rounded-xl bg-foreground/[0.04] p-2.5">
        <div>
          <p className="text-[8px] text-muted-foreground">Before</p>
          <p className="text-[10px] font-semibold text-muted-foreground line-through decoration-muted-foreground/40">
            {study.revenueBefore}
          </p>
        </div>
        <ArrowRight className="size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
        <div>
          <p className="text-[8px] text-muted-foreground">After</p>
          <p className={cn("text-xs font-bold", accentTextClasses[study.accent])}>{study.revenueAfter}</p>
        </div>
        <span
          className={cn(
            "ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold ring-1",
            accentChipClasses[study.accent]
          )}
        >
          +{study.growthPercent}%
        </span>
      </div>
    </div>
  );
}

export function AppTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useAutoCycle(appCaseStudies.length, 5000);
  const total = appCaseStudies.length;

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...appTestimonialsIntro} className="mx-auto mb-16 max-w-2xl" />

      <div className="relative mx-auto h-[26rem] max-w-3xl sm:h-[30rem]">
        {appCaseStudies.map((study, index) => {
          const offset = (index - activeIndex + total) % total;
          const isCenter = offset === 0;
          const isRight = offset === 1;
          const x = isCenter ? "0%" : isRight ? "48%" : "-48%";
          const scale = isCenter ? 1 : 0.78;
          const opacity = isCenter ? 1 : 0.85;
          const blur = isCenter ? "blur(0px)" : "blur(3px)";
          const zIndex = isCenter ? 10 : 5;

          return (
            <motion.button
              key={study.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${study.appName} case study`}
              aria-hidden={!isCenter}
              tabIndex={isCenter ? 0 : -1}
              animate={{ x, scale, opacity, filter: blur }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ zIndex }}
              className="absolute top-1/2 left-1/2 w-56 -translate-x-1/2 -translate-y-1/2 cursor-pointer sm:w-64"
            >
              <PhoneFrame className="shadow-2xl">
                <CaseStudyScreen study={study} />
              </PhoneFrame>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        {appCaseStudies.map((study, index) => (
          <button
            key={study.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to ${study.appName}`}
            className="flex size-8 shrink-0 items-center justify-center"
          >
            <span
              aria-hidden="true"
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-border"
              )}
            />
          </button>
        ))}
      </div>
    </Section>
  );
}
