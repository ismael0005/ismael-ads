"use client";

import { useEffect, useState } from "react";

/**
 * Cycles an index through [0, length) on a fixed interval — shared by every
 * auto-rotating showcase on the App Monetization page (hero phones, format
 * showcase, testimonial stack). Freezes at the starting index when the user
 * prefers reduced motion, instead of silently ignoring the preference.
 */
export function useAutoCycle(length: number, intervalMs: number, startIndex = 0) {
  const [index, setIndex] = useState(startIndex % length);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % length);
    }, intervalMs);

    return () => clearInterval(id);
  }, [length, intervalMs]);

  return [index, setIndex] as const;
}
