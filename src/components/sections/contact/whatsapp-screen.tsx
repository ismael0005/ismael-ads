"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCheck, Mic, Paperclip, Phone, Video } from "lucide-react";

import { cn } from "@/lib/utils";
import { heroChatMessages } from "@/data/contact";

type Step = "incoming" | "typing" | "replied";

const STEP_DURATIONS: Record<Step, number> = {
  incoming: 1800,
  typing: 1600,
  replied: 4200,
};

const STEP_ORDER: Step[] = ["incoming", "typing", "replied"];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-foreground/10 px-3.5 py-3">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: dot * 0.15 }}
          className="size-1.5 rounded-full bg-foreground/50"
        />
      ))}
    </div>
  );
}

export function WhatsappScreen() {
  const [step, setStep] = useState<Step>("incoming");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setTimeout>;

    if (prefersReducedMotion) {
      timer = setTimeout(() => setStep("replied"), 0);
      return () => clearTimeout(timer);
    }

    let index = 0;

    const advance = () => {
      const current = STEP_ORDER[index];
      setStep(current);
      timer = setTimeout(() => {
        index = (index + 1) % STEP_ORDER.length;
        advance();
      }, STEP_DURATIONS[current]);
    };

    advance();
    return () => clearTimeout(timer);
  }, []);

  const [themMessage, meMessage] = heroChatMessages;

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-[#0b1210] to-[#070a09]">
      <div className="flex items-center gap-2.5 border-b border-white/5 px-4 pt-8 pb-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-bold text-white">
          II
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-white">Ismael Inacio</p>
          <p className="flex items-center gap-1 text-[9px] text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            online
          </p>
        </div>
        <Phone className="size-3.5 text-white/50" aria-hidden="true" />
        <Video className="size-4 text-white/50" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2 text-[10px] leading-snug text-white/90"
        >
          {themMessage.text}
        </motion.div>

        <AnimatePresence mode="wait">
          {step === "typing" && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="max-w-[85%] self-start"
            >
              <TypingDots />
            </motion.div>
          )}

          {step === "replied" && (
            <motion.div
              key="replied"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex max-w-[85%] flex-col items-end gap-1 self-end"
            >
              <div className="rounded-2xl rounded-br-sm bg-gradient-to-br from-primary to-secondary px-3 py-2 text-[10px] leading-snug text-white">
                {meMessage.text}
              </div>
              <span className="flex items-center gap-1 pr-1 text-[8px] text-white/40">
                <CheckCheck className="size-2.5 text-sky-400" aria-hidden="true" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 border-t border-white/5 px-3 py-2.5">
        <div className={cn("flex flex-1 items-center gap-2 rounded-full bg-white/10 px-3 py-1.5")}>
          <Paperclip className="size-3 shrink-0 text-white/40" aria-hidden="true" />
          <span className="flex-1 truncate text-[9px] text-white/30">Message</span>
          <Mic className="size-3 shrink-0 text-white/40" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
