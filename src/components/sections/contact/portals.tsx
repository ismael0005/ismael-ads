"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Circle, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { GlassIcon3D } from "@/components/ui/glass-icon";
import { motionVariants } from "@/styles/animations";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { communicationPortals, contactInfo, portalsIntro, type CommunicationPortal, type PortalType } from "@/data/contact";

function WhatsappPreview() {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="flex h-40 flex-col justify-end gap-2 rounded-2xl bg-gradient-to-b from-[#0b1210] to-[#070a09] p-3"
    >
      <div className="max-w-[80%] self-start rounded-2xl rounded-bl-sm bg-white/10 px-3 py-1.5 text-[10px] text-white/85">
        Hi, do you have availability this week?
      </div>
      <div className="max-w-[80%] self-end rounded-2xl rounded-br-sm bg-gradient-to-br from-primary to-secondary px-3 py-1.5 text-[10px] text-white">
        Yes — happy to jump on a call.
      </div>
      <div className="flex items-center gap-1 self-start rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            animate={isPaused ? {} : { y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: dot * 0.15 }}
            className="size-1 rounded-full bg-white/60"
          />
        ))}
      </div>
    </div>
  );
}

const INBOX_ROWS = [
  { name: "Marta Nowak", subject: "AdX approval question", unread: true },
  { name: "David Cole", subject: "Header bidding setup", unread: false },
  { name: "Sofia Castillo", subject: "Monthly revenue report", unread: false },
];

function EmailPreview() {
  return (
    <div className={cn(glass.base, "flex h-40 flex-col overflow-hidden rounded-2xl")}>
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <Mail className="size-3.5 text-secondary-text" aria-hidden="true" />
        <span className="text-[10px] font-semibold text-foreground">Inbox</span>
        <span className="ml-auto rounded-full bg-secondary/15 px-1.5 py-0.5 text-[9px] font-bold text-secondary-text">1 new</span>
      </div>
      <div className="flex flex-1 flex-col divide-y divide-border overflow-hidden">
        {INBOX_ROWS.map((row, index) => (
          <motion.div
            key={row.name}
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.12 }}
            className="flex items-center gap-2 px-3 py-1.5"
          >
            {row.unread ? (
              <Circle className="size-1.5 shrink-0 fill-secondary text-secondary" aria-hidden="true" />
            ) : (
              <span className="size-1.5 shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <p className={cn("truncate text-[9.5px]", row.unread ? "font-bold text-foreground" : "font-medium text-muted-foreground")}>
                {row.name}
              </p>
              <p className="truncate text-[9px] text-muted-foreground">{row.subject}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LinkedinPreview() {
  return (
    <div className={cn(glass.base, "flex h-40 flex-col items-center justify-center gap-2 rounded-2xl p-4 text-center")}>
      <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
        II
      </span>
      <p className="text-xs font-bold text-foreground">Ismael Inacio</p>
      <p className="text-[10px] text-muted-foreground">Founder, Ismael Ads · Publisher Monetization</p>
      <span className="mt-1 flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-[9px] font-bold text-accent-text">
        <Check className="size-2.5" aria-hidden="true" />
        Connect
      </span>
    </div>
  );
}

const CALENDAR_DAYS = Array.from({ length: 28 }, (_, i) => i + 1);
const AVAILABLE_DAY = 18;

function CalendarPreview() {
  return (
    <div aria-hidden="true" className={cn(glass.base, "flex h-40 flex-col gap-2 rounded-2xl p-3")}>
      <div className="grid grid-cols-7 gap-1">
        {CALENDAR_DAYS.map((day) => (
          <span
            key={day}
            className={cn(
              "flex size-4 items-center justify-center rounded-full text-[7px] font-medium",
              day === AVAILABLE_DAY
                ? "bg-gradient-to-br from-primary to-accent text-white"
                : "text-slate-700 dark:text-slate-300"
            )}
          >
            {day}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {["10:00 AM", "2:00 PM"].map((slot) => (
          <span key={slot} className="rounded-full bg-primary/10 px-2 py-1 text-[9px] font-semibold text-primary-text ring-1 ring-primary/20">
            {slot}
          </span>
        ))}
      </div>
    </div>
  );
}

const PREVIEWS: Record<PortalType, () => React.JSX.Element> = {
  whatsapp: WhatsappPreview,
  email: EmailPreview,
  linkedin: LinkedinPreview,
  calendar: CalendarPreview,
};

function getPortalIcon(portal: CommunicationPortal) {
  return portal.type === "linkedin" ? LinkedinIcon : portal.icon;
}

export function ContactPortalsSection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...portalsIntro} className="mx-auto mb-14 max-w-2xl" />

      <motion.div
        variants={motionVariants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2"
      >
        {communicationPortals.map((portal) => {
          const Preview = PREVIEWS[portal.type];
          const isExternalLink = portal.href.startsWith("http");
          return (
            <motion.div key={portal.id} variants={motionVariants.fadeInUp}>
              <TiltCard maxTilt={4}>
                <Link
                  href={portal.href}
                  target={isExternalLink ? "_blank" : undefined}
                  rel={isExternalLink ? "noopener noreferrer" : undefined}
                  className={cn(glass.base, glass.light, "group flex h-full flex-col gap-4 rounded-3xl p-6 transition-all duration-300 hover:border-primary/30")}
                >
                  <div className="flex items-center gap-3">
                    <GlassIcon3D icon={getPortalIcon(portal)} accent={portal.accent} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="font-heading text-base font-bold text-foreground">{portal.label}</p>
                      <p className="text-xs text-muted-foreground">{portal.description}</p>
                    </div>
                  </div>

                  <Preview />

                  <span className={cn("mt-auto flex items-center gap-1.5 text-xs font-bold", accentTextClasses[portal.accent])}>
                    {portal.ctaLabel}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>

      <p className="mx-auto mt-8 max-w-md text-center text-xs text-muted-foreground">
        Prefer something simple? Reach me directly at{" "}
        <a href={`mailto:${contactInfo.email}`} className="font-semibold text-primary-text underline underline-offset-2">
          {contactInfo.email}
        </a>
      </p>
    </Section>
  );
}
