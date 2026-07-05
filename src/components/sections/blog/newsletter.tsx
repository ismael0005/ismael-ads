"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motionVariants } from "@/styles/animations";
import { newsletterContent } from "@/data/blog";

export function BlogNewsletterSection() {
  const [subscribed, setSubscribed] = useState(false);
  const KickerIcon = newsletterContent.kickerIcon;
  const [headlineLead, headlineTail] = newsletterContent.headline.split(newsletterContent.headlineEmphasis);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <Section id="newsletter" spacing="lg" className="relative scroll-mt-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(glass.base, glass.light, "relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] p-8 text-center sm:p-14")}
      >
        <motion.div
          animate={{ opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 left-1/2 -z-10 size-72 -translate-x-1/2 rounded-full bg-primary/25 blur-[110px]"
        />

        <motion.div variants={motionVariants.staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
          <motion.div variants={motionVariants.fadeInUp} className="flex justify-center">
            <span className="flex items-center gap-1.5 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs font-semibold backdrop-blur dark:border-white/15 dark:bg-white/5">
              <KickerIcon className="size-3.5 text-primary-text" aria-hidden="true" />
              {newsletterContent.kicker}
            </span>
          </motion.div>

          <motion.div variants={motionVariants.fadeInUp}>
            <Heading as="h2" size="xl" className="mt-5 text-balance">
              {headlineLead}
              <GradientText>{newsletterContent.headlineEmphasis}</GradientText>
              {headlineTail}
            </Heading>
          </motion.div>

          <motion.p variants={motionVariants.fadeInUp} className="mx-auto mt-4 max-w-md text-muted-foreground">
            {newsletterContent.description}
          </motion.p>

          <motion.div variants={motionVariants.fadeInUp} className="mt-8">
            {subscribed ? (
              <p className="flex items-center justify-center gap-2 text-sm font-semibold text-accent-text">
                <CheckCircle2 className="size-5" aria-hidden="true" />
                You&apos;re subscribed — welcome aboard.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  required
                  placeholder="you@company.com"
                  aria-label="Email address"
                  className="h-12 flex-1 rounded-full px-5 text-sm"
                />
                <Button type="submit" variant="gradient" size="lg" className="h-12 gap-2 rounded-full px-6">
                  Subscribe
                  <Send className="size-4" aria-hidden="true" />
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
