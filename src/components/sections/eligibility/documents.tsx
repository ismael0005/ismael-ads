"use client";

import { Folder } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { GlassIcon3D } from "@/components/ui/glass-icon";
import { documentItems, documentsIntro } from "@/data/eligibility-checker";

export function EligibilityDocumentsSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...documentsIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className="mx-auto mb-10 flex justify-center">
        <GlassIcon3D icon={Folder} accent="primary" size="xl" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {documentItems.map((doc) => {
          const Icon = doc.icon;
          return (
            <motion.div
              key={doc.id}
              variants={{
                hidden: { opacity: 0, y: -40, scale: 0.8 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -4 }}
              className={cn(
                glass.base,
                glass.light,
                "group relative flex h-32 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl p-3 text-center transition-shadow duration-300 hover:shadow-lg"
              )}
            >
              <span className={cn("flex size-10 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-90", accentChipClasses[doc.accent])}>
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <p className="text-xs font-semibold text-foreground transition-opacity duration-300 group-hover:opacity-0">{doc.label}</p>

              <div
                className={cn(
                  glass.base,
                  glass.light,
                  "absolute inset-0 flex translate-y-full items-center justify-center p-3 text-center transition-transform duration-300 group-hover:translate-y-0"
                )}
              >
                <p className="text-[11px] leading-snug text-foreground">{doc.detail}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
