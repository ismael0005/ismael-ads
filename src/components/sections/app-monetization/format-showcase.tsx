"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { PhoneFrame } from "@/components/sections/app-monetization/phone-frame";
import { AdScreen } from "@/components/sections/app-monetization/ad-screen";
import { useAutoCycle } from "@/hooks/use-auto-cycle";
import { appAdFormats, appFormatShowcaseIntro, type AdFormatContent } from "@/data/app-monetization";

const SATELLITES: { format: AdFormatContent; top: string; left: string; duration: number; delay: number }[] = [
  { format: appAdFormats[0], top: "10%", left: "13%", duration: 6.5, delay: 0 },
  { format: appAdFormats[1], top: "50%", left: "8%", duration: 7.2, delay: 0.6 },
  { format: appAdFormats[2], top: "90%", left: "13%", duration: 6.8, delay: 1.1 },
  { format: appAdFormats[3], top: "10%", left: "87%", duration: 7, delay: 0.3 },
  { format: appAdFormats[4], top: "50%", left: "92%", duration: 6.4, delay: 0.9 },
  { format: appAdFormats[5], top: "90%", left: "87%", duration: 7.4, delay: 1.4 },
];

function Satellite({ item }: { item: (typeof SATELLITES)[number] }) {
  const Icon = item.format.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: item.delay }}
      style={{ top: item.top, left: item.left }}
      className="absolute w-20 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: item.duration, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
      >
        <PhoneFrame className="shadow-xl">
          <AdScreen format={item.format} showChrome={false} compact />
        </PhoneFrame>
        <div className="mt-2 flex items-center justify-center gap-1">
          <span className={cn("flex size-4 items-center justify-center rounded-full ring-1", accentChipClasses[item.format.accent])}>
            <Icon className="size-2.5" aria-hidden="true" />
          </span>
          <span className="text-[9px] font-semibold whitespace-nowrap text-muted-foreground">{item.format.label}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AppFormatShowcaseSection() {
  const [centerIndex] = useAutoCycle(appAdFormats.length, 2400);
  const centerFormat = appAdFormats[centerIndex];

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...appFormatShowcaseIntro} className="mx-auto mb-16 max-w-2xl" />

      {/* Desktop: floating constellation of phones */}
      <div className="relative mx-auto hidden h-[34rem] w-full max-w-4xl lg:block">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[110px] mix-blend-multiply dark:mix-blend-screen"
        />

        {SATELLITES.map((item) => (
          <Satellite key={item.format.id} item={item} />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 left-1/2 z-10 w-44 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <PhoneFrame className="shadow-2xl ring-1 ring-white/10">
              <AdScreen format={centerFormat} />
            </PhoneFrame>
          </motion.div>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <span className={cn("flex size-5 items-center justify-center rounded-full ring-1", accentChipClasses[centerFormat.accent])}>
              <centerFormat.icon className="size-3" aria-hidden="true" />
            </span>
            <span className="text-xs font-bold whitespace-nowrap text-foreground">{centerFormat.label}</span>
          </div>
        </motion.div>
      </div>

      {/* Tablet / mobile: horizontal swipeable strip */}
      <div
        role="region"
        aria-label="App ad format previews, scroll horizontally to see all"
        tabIndex={0}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-scrollbar]:hidden"
      >
        {appAdFormats.map((format) => {
          const Icon = format.icon;
          return (
            <div key={format.id} className="w-32 shrink-0 snap-center">
              <PhoneFrame className="shadow-xl">
                <AdScreen format={format} showChrome={false} compact />
              </PhoneFrame>
              <div className="mt-2 flex items-center justify-center gap-1.5">
                <span className={cn("flex size-4 items-center justify-center rounded-full ring-1", accentChipClasses[format.accent])}>
                  <Icon className="size-2.5" aria-hidden="true" />
                </span>
                <span className="text-[10px] font-semibold whitespace-nowrap text-muted-foreground">{format.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
