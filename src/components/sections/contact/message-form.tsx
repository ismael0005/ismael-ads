"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, Send, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motionVariants } from "@/styles/animations";
import { formIntro, gamOptions, monthlyRevenueOptions } from "@/data/contact";

function FloatingField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <label
        htmlFor={htmlFor}
        className="pointer-events-none absolute top-2 left-4 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase"
      >
        {label}
      </label>
    </div>
  );
}

const fieldClassName =
  "h-[3.75rem] w-full rounded-2xl border border-border bg-foreground/[0.02] px-4 pt-6 pb-2 text-sm text-foreground outline-none transition-colors placeholder:text-transparent focus-visible:border-primary/50 focus-visible:ring-3 focus-visible:ring-primary/15";

function PillGroup({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={cn(
            "rounded-full px-3.5 py-2 text-xs font-semibold transition-colors duration-200",
            selected === option
              ? "bg-gradient-to-r from-primary to-accent text-white shadow-md"
              : "border border-border bg-foreground/[0.02] text-muted-foreground hover:border-primary/30 hover:text-foreground"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

type Status = "idle" | "submitting" | "success";

export function ContactMessageFormSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [revenue, setRevenue] = useState<string | null>(null);
  const [gam, setGam] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "idle") return;
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1400);
  }

  return (
    <Section id="send-a-message" spacing="lg" className="relative scroll-mt-24 overflow-hidden">
      <SectionHeading {...formIntro} className="mx-auto mb-14 max-w-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(glass.base, glass.light, "relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] p-6 sm:p-10")}
      >
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -right-24 -z-10 size-64 rounded-full bg-primary/25 blur-[100px]"
        />

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-4 py-10 text-center"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-glow-primary">
                <Bot className="size-6" aria-hidden="true" />
              </span>
              <div className={cn(glass.base, "max-w-sm rounded-2xl rounded-tl-sm p-4 text-left")}>
                <p className="flex items-center gap-1.5 text-xs font-bold text-primary-text">
                  <Sparkles className="size-3" aria-hidden="true" />
                  Ismael Ads Assistant
                </p>
                <p className="mt-1.5 text-sm text-foreground">
                  Message received — thank you! Ismael personally reviews every submission and will reply directly, usually within a few hours.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              variants={motionVariants.staggerContainer}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <motion.div variants={motionVariants.fadeInUp} className="grid gap-5 sm:grid-cols-2">
                <FloatingField label="Name" htmlFor="contact-name">
                  <Input id="contact-name" required placeholder="Name" className={fieldClassName} />
                </FloatingField>
                <FloatingField label="Company" htmlFor="contact-company">
                  <Input id="contact-company" placeholder="Company" className={fieldClassName} />
                </FloatingField>
              </motion.div>

              <motion.div variants={motionVariants.fadeInUp} className="grid gap-5 sm:grid-cols-2">
                <FloatingField label="Website (Optional)" htmlFor="contact-website">
                  <Input id="contact-website" type="url" placeholder="Website" className={fieldClassName} />
                </FloatingField>
                <FloatingField label="Email" htmlFor="contact-email">
                  <Input id="contact-email" type="email" required placeholder="Email" className={fieldClassName} />
                </FloatingField>
              </motion.div>

              <motion.fieldset variants={motionVariants.fadeInUp} className="border-0 p-0">
                <legend className="mb-2 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">Monthly Revenue</legend>
                <PillGroup options={monthlyRevenueOptions} selected={revenue} onSelect={setRevenue} />
              </motion.fieldset>

              <motion.fieldset variants={motionVariants.fadeInUp} className="border-0 p-0">
                <legend className="mb-2 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">Google Ad Manager</legend>
                <PillGroup options={gamOptions} selected={gam} onSelect={setGam} />
              </motion.fieldset>

              <motion.div variants={motionVariants.fadeInUp}>
                <FloatingField label="Message" htmlFor="contact-message">
                  <textarea
                    id="contact-message"
                    required
                    placeholder="Message"
                    rows={4}
                    className={cn(fieldClassName, "h-auto resize-none pt-6 pb-3")}
                  />
                </FloatingField>
              </motion.div>

              <motion.div variants={motionVariants.fadeInUp}>
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  disabled={status === "submitting"}
                  className="h-12 w-full gap-2 text-base sm:w-auto sm:px-10"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="size-4" aria-hidden="true" />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
