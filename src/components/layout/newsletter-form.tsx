"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.p
          key="success"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-5 flex items-center gap-2 text-sm font-medium text-accent-text"
        >
          <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
          Thanks — you&apos;re on the list.
        </motion.p>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onSubmit={handleSubmit}
          className={cn(
            "group/field mt-5 rounded-full bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50 p-[1.5px] opacity-80 transition-opacity duration-300 focus-within:opacity-100 hover:opacity-100"
          )}
        >
          <div className="flex items-center gap-1.5 rounded-full bg-white/95 p-1.5 backdrop-blur-xl dark:bg-[#0c0f20]/95">
            <Input
              type="email"
              required
              placeholder="you@company.com"
              aria-label="Email address"
              className="h-10 flex-1 rounded-full border-none bg-transparent px-4 text-sm shadow-none focus-visible:ring-0"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="group/send flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-[0_0_16px_2px_rgba(109,40,217,0.45)] transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/send:translate-x-0.5" aria-hidden="true" />
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
