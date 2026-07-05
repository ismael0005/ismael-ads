"use client";

import { ArrowRight, Eye, Users } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Sparkline } from "@/components/dashboard/sparkline";
import { TvFrame } from "@/components/sections/ctv-monetization/tv-frame";
import { useAutoCycle } from "@/hooks/use-auto-cycle";
import { ctvCaseStudies, ctvCaseStudiesIntro, type CtvCaseStudy } from "@/data/ctv-monetization";

function CaseStudyScreen({ study }: { study: CtvCaseStudy }) {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-1.5 bg-background p-2.5 sm:p-3.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-lg font-heading text-[10px] font-bold ring-1 sm:size-8",
              accentChipClasses[study.accent]
            )}
          >
            {study.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-bold text-foreground sm:text-xs">{study.appName}</p>
            <p className="truncate text-[8px] text-muted-foreground sm:text-[9px]">{study.category}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-[8px] font-medium whitespace-nowrap text-muted-foreground sm:text-[9px]">
          <Users className="size-2.5 sm:size-3" aria-hidden="true" />
          {study.monthlyViewers}
        </div>
      </div>

      <p className="line-clamp-2 text-[9px] leading-snug text-foreground/85 sm:text-[10px]">&ldquo;{study.quote}&rdquo;</p>

      <Sparkline trend={study.trend} accent={study.accent} className="h-6 sm:h-7" />

      <div className="flex items-center gap-1.5 rounded-lg bg-foreground/[0.04] p-1.5 sm:gap-2 sm:p-2">
        <div>
          <p className="text-[7px] text-muted-foreground sm:text-[8px]">Before</p>
          <p className="text-[9px] font-semibold text-muted-foreground line-through decoration-muted-foreground/40 sm:text-[10px]">
            {study.revenueBefore}
          </p>
        </div>
        <ArrowRight className="size-2.5 shrink-0 text-muted-foreground sm:size-3" aria-hidden="true" />
        <div>
          <p className="text-[7px] text-muted-foreground sm:text-[8px]">After</p>
          <p className={cn("text-[10px] font-bold sm:text-xs", accentTextClasses[study.accent])}>{study.revenueAfter}</p>
        </div>
        <span className={cn("ml-auto flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-bold ring-1 sm:text-[9px]", accentChipClasses[study.accent])}>
          <Eye className="size-2.5" aria-hidden="true" />
          {study.completionRate}%
        </span>
        <span className={cn("rounded-full px-1.5 py-0.5 text-[8px] font-bold ring-1 sm:text-[9px]", accentChipClasses[study.accent])}>
          +{study.growthPercent}%
        </span>
      </div>
    </div>
  );
}

export function CtvTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useAutoCycle(ctvCaseStudies.length, 5000);
  const total = ctvCaseStudies.length;

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...ctvCaseStudiesIntro} className="mx-auto mb-16 max-w-2xl" />

      <div className="relative mx-auto h-[22rem] max-w-4xl sm:h-[24rem]">
        {ctvCaseStudies.map((study, index) => {
          const offset = (index - activeIndex + total) % total;
          const isCenter = offset === 0;
          const isRight = offset === 1;
          const x = isCenter ? "0%" : isRight ? "52%" : "-52%";
          const scale = isCenter ? 1 : 0.76;
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
              className="absolute top-1/2 left-1/2 w-64 -translate-x-1/2 -translate-y-1/2 cursor-pointer sm:w-[26rem]"
            >
              <TvFrame className="shadow-2xl">
                <CaseStudyScreen study={study} />
              </TvFrame>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-1.5">
        {ctvCaseStudies.map((study, index) => (
          <button
            key={study.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to ${study.appName}`}
            className="flex size-6 shrink-0 items-center justify-center"
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
