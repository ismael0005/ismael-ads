"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentTextClasses } from "@/lib/accent";
import { PhoneFrame } from "@/components/sections/app-monetization/phone-frame";
import { WhatsappScreen } from "@/components/sections/contact/whatsapp-screen";
import { contactHeroWidgets, type ContactHeroWidget } from "@/data/contact";

const ACCENT_VAR: Record<ContactHeroWidget["accent"], string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
};

function Widget({ widget }: { widget: ContactHeroWidget }) {
  const Icon = widget.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.6, delay: widget.delay },
        scale: { duration: 0.6, delay: widget.delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: widget.delay },
      }}
      style={{ left: `${widget.x}%`, top: `${widget.y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <div className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-2xl px-3 py-2 shadow-xl")}>
        <Icon className={cn("size-4 shrink-0", accentTextClasses[widget.accent])} aria-hidden="true" />
        <span className="text-[0.65rem] font-semibold whitespace-nowrap text-foreground">{widget.label}</span>
      </div>
    </motion.div>
  );
}

export function ContactHeroStage() {
  return (
    <div className="relative w-full">
      {/* Desktop: phone + connected widget ecosystem */}
      <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-md lg:block lg:max-w-lg">
        <motion.div
          animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[110px] mix-blend-multiply dark:mix-blend-screen"
        />

        {/* Glass rings — a halo unique to this hero's "signal" motif */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 size-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 size-[27rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/15"
        />

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="contact-hero-link" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.06} />
            </linearGradient>
          </defs>
          {contactHeroWidgets.map((widget) => {
            const path = `M 50 54 Q ${(50 + widget.x) / 2} ${(54 + widget.y) / 2 + (widget.y > 54 ? 10 : -10)} ${widget.x} ${widget.y}`;
            return (
              <g key={widget.id}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="url(#contact-hero-link)"
                  strokeWidth={0.18}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.4, delay: widget.delay + 0.2, ease: "easeOut" }}
                />
                <motion.path
                  d={path}
                  fill="none"
                  stroke={ACCENT_VAR[widget.accent]}
                  strokeWidth={0.5}
                  strokeLinecap="round"
                  strokeDasharray="1.5 20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85, strokeDashoffset: [0, -220] }}
                  transition={{
                    opacity: { duration: 0.4, delay: widget.delay + 1.2 },
                    strokeDashoffset: { duration: 4.5, repeat: Infinity, ease: "linear", delay: widget.delay + 1.3 },
                  }}
                />
              </g>
            );
          })}
        </svg>

        <div className="absolute top-[54%] left-1/2 z-[5] w-[46%] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
            transition={{
              opacity: { duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.15 },
            }}
          >
            <PhoneFrame className="shadow-2xl ring-1 ring-white/10">
              <WhatsappScreen />
            </PhoneFrame>
          </motion.div>
        </div>

        {contactHeroWidgets.map((widget) => (
          <Widget key={widget.id} widget={widget} />
        ))}
      </div>

      {/* Tablet / mobile: phone only, no absolute ecosystem */}
      <div className="relative mx-auto w-56 sm:w-64 lg:hidden">
        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[90px] mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ opacity: { duration: 0.8 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <PhoneFrame className="shadow-2xl">
            <WhatsappScreen />
          </PhoneFrame>
        </motion.div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:hidden">
        {contactHeroWidgets.map((widget) => {
          const Icon = widget.icon;
          return (
            <div key={widget.id} className={cn(glass.base, glass.light, "flex items-center gap-2 rounded-full px-3 py-1.5")}>
              <Icon className={cn("size-3.5", accentTextClasses[widget.accent])} aria-hidden="true" />
              <span className="text-xs font-medium text-muted-foreground">{widget.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
