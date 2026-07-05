"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { dayInLifeIntro, dayMoments } from "@/data/who-i-am";

export function WhoIAmDayInLifeSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...dayInLifeIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className="relative">
        <div className="absolute top-[4.5rem] right-4 left-4 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent sm:block" />

        <div
          role="region"
          aria-label="A day in Ismael's life, scroll horizontally to see all moments"
          tabIndex={0}
          className="-mx-4 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-scrollbar]:hidden"
        >
          {dayMoments.map((moment, index) => {
            const Icon = moment.icon;
            return (
              <motion.div
                key={moment.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className={cn(
                  glass.base,
                  glass.light,
                  "relative flex w-56 shrink-0 snap-center flex-col items-center gap-3 rounded-2xl px-5 pt-6 pb-5 text-center"
                )}
              >
                <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                  {moment.time}
                </span>
                <span className={cn("relative z-10 flex size-12 items-center justify-center rounded-2xl ring-1", accentChipClasses[moment.accent])}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="font-heading text-sm font-bold text-foreground">{moment.title}</p>
                <p className="text-xs leading-snug text-muted-foreground">{moment.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
