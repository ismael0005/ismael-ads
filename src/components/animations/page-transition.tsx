"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { ease } from "@/styles/animations";

/**
 * Sitewide route-change transition. Deliberately fast and a crossfade (not a
 * sequential exit-then-enter "wait") — every page here is statically
 * prerendered, so navigation itself is already instant; a lingering
 * transition would make the site feel slower, not more premium. This exists
 * purely to smooth over the otherwise-abrupt DOM swap between pages.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: ease.out }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
