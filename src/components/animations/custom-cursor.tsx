"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Elements that should expand the cursor ring to signal "interactive". */
const HOVER_TARGET_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

/**
 * A subtle trailing ring that follows the pointer, layered on top of (not
 * replacing) the native cursor — expands over interactive elements. Desktop
 * mouse only: bails out entirely on touch/coarse-pointer devices and when the
 * OS reduced-motion preference is set, so it never renders a stray fixed
 * element where it wouldn't make sense.
 */
export function CustomCursor() {
  // Starts false to match the server-rendered (window-less) output — flips
  // to true post-hydration if the device actually qualifies. Any other
  // approach (e.g. computing this in a useState lazy initializer) renders
  // differently on the server vs. the client's first paint and triggers a
  // hydration mismatch, since `window` only exists client-side.
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDown, setIsDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- capability check requires window, unavailable during SSR; this is the standard post-hydration client-detection pattern
    setEnabled(true);

    function handleMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as Element | null;
      setIsHovering(!!target?.closest(HOVER_TARGET_SELECTOR));
    }
    function handleDown() {
      setIsDown(true);
    }
    function handleUp() {
      setIsDown(false);
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed top-0 left-0 z-[200] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <motion.div
        animate={{
          width: isHovering ? 44 : 20,
          height: isHovering ? 44 : 20,
          opacity: isHovering ? 1 : 0.7,
          scale: isDown ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.4 }}
        className="rounded-full border border-white"
      />
    </motion.div>
  );
}
