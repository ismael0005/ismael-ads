"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AdFormatDemo } from "@/data/home";

interface FormatTabsProps {
  formats: AdFormatDemo[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function FormatTabs({ formats, activeId, onSelect }: FormatTabsProps) {
  const tabs = [{ id: "all", label: "All Formats" }, ...formats.map((format) => ({ id: format.id, label: format.label }))];

  return (
    <div
      role="region"
      aria-label="Ad format filters, scroll horizontally to see all"
      className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            aria-pressed={isActive}
            className={cn(
              "relative shrink-0 snap-start rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="format-tab-active"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary shadow-glow-primary"
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {tab.id === "all" && <Sparkles className="size-3.5" aria-hidden="true" />}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
