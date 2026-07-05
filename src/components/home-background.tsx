"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from "framer-motion";

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Deterministic pseudo-random spread (golden-angle based) — stable across server/client renders. */
const PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const seed = i * 137.508;
  return {
    left: (seed * 2.3) % 100,
    top: (seed * 3.7) % 100,
    size: 1 + (i % 3),
    duration: 8 + (i % 7),
    delay: (i % 9) * 0.5,
    opacity: 0.18 + (i % 4) * 0.08,
  };
});

/**
 * The homepage's single, continuous, fixed atmospheric backdrop — mounted once
 * in page.tsx, behind every section. Sections must stay `bg-transparent` for
 * this to read as "one experience" rather than stacked blocks; see the
 * `Section` component's default tone and each section's own wrapper.
 *
 * `position: fixed` is deliberate: the aurora/particles/grid stay put as the
 * page scrolls past them (the Stripe/Linear "one continuous scene" effect)
 * rather than scrolling away with content.
 */
export function HomeBackground() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springMx = useSpring(mx, { stiffness: 40, damping: 20, mass: 0.6 });
  const springMy = useSpring(my, { stiffness: 40, damping: 20, mass: 0.6 });

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      mx.set((event.clientX / window.innerWidth) * 2 - 1);
      my.set((event.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mx, my]);

  const auroraX = useTransform(springMx, [-1, 1], [-24, 24]);
  const auroraY = useTransform(springMy, [-1, 1], [-24, 24]);
  const auroraXInverse = useTransform(auroraX, (v) => -v);
  const gridX = useTransform(springMx, [-1, 1], [-10, 10]);
  const gridY = useTransform(springMy, [-1, 1], [-10, 10]);

  const spotlightX = useTransform(springMx, [-1, 1], [35, 65]);
  const spotlightY = useTransform(springMy, [-1, 1], [25, 55]);
  const spotlightDark = useMotionTemplate`radial-gradient(700px circle at ${spotlightX}% ${spotlightY}%, rgba(255,255,255,0.05), transparent 70%)`;
  const spotlightLight = useMotionTemplate`radial-gradient(700px circle at ${spotlightX}% ${spotlightY}%, rgba(109,40,217,0.06), transparent 70%)`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/*
        Baseline tonal wash — always present regardless of blob position or
        scroll, so there's never a moment of "flat, undecorated" background.
        This is what actually guarantees continuity; the blobs on top of it
        are texture, not the mechanism.
      */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(109,40,217,0.05),transparent_45%,rgba(34,211,238,0.05)_75%,transparent)] dark:bg-[linear-gradient(160deg,rgba(109,40,217,0.16),transparent_45%,rgba(34,211,238,0.12)_75%,transparent)]" />

      {/* Large radial purple + cyan glows */}
      <motion.div
        style={{ x: auroraX, y: auroraY }}
        animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 left-[-15%] size-[42rem] rounded-full bg-primary/25 opacity-70 blur-[140px] mix-blend-multiply dark:opacity-100 dark:mix-blend-screen"
      />
      <motion.div
        style={{ x: auroraXInverse, y: auroraY }}
        animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 right-[-16%] size-[38rem] rounded-full bg-accent/20 opacity-60 blur-[140px] mix-blend-multiply dark:opacity-100 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.12, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-[-20%] left-1/3 size-[36rem] rounded-full bg-secondary/20 opacity-60 blur-[140px] mix-blend-multiply dark:opacity-100 dark:mix-blend-screen"
      />
      <div className="absolute top-1/2 left-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 7 }}
          className="size-full rounded-full bg-primary/15 opacity-50 blur-[150px] mix-blend-multiply dark:opacity-90 dark:mix-blend-screen"
        />
      </div>

      {/* Very subtle animated grid — transform-driven drift, not backgroundPosition, to stay GPU-cheap */}
      <motion.div
        style={{ x: gridX, y: gridY }}
        animate={{ x: [0, 40, 0], y: [0, 40, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-1/4 text-foreground opacity-[0.035] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:64px_64px] dark:opacity-[0.08]"
      />

      {/* Glass reflection / neon sweep */}
      <motion.div
        animate={{ x: ["-30%", "130%"], opacity: [0, 0.35, 0] }}
        transition={{ duration: 11, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
        className="absolute top-0 h-full w-32 rotate-[14deg] bg-gradient-to-b from-transparent via-foreground/8 to-transparent blur-2xl mix-blend-multiply dark:via-white/10 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ x: ["130%", "-30%"], opacity: [0, 0.3, 0] }}
        transition={{ duration: 14, repeat: Infinity, repeatDelay: 8, ease: "easeInOut", delay: 3 }}
        className="absolute top-0 h-full w-24 rotate-[-12deg] bg-gradient-to-b from-transparent via-accent/20 to-transparent blur-2xl mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Floating translucent glass panels — barely-there depth, not literal cards */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[18%] right-[8%] size-72 rounded-[2rem] border border-foreground/[0.04] bg-foreground/[0.015] backdrop-blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 26, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-[15%] left-[6%] size-64 rounded-[2rem] border border-foreground/[0.04] bg-foreground/[0.015] backdrop-blur-3xl"
      />

      {PARTICLES.map((particle, index) => (
        <motion.span
          key={index}
          animate={{
            y: [0, -18, 0],
            opacity: [particle.opacity * 0.4, particle.opacity, particle.opacity * 0.4],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
          style={{ left: `${particle.left}%`, top: `${particle.top}%`, width: particle.size, height: particle.size }}
          className="absolute rounded-full bg-foreground blur-[0.5px] dark:bg-white"
        />
      ))}

      <motion.div
        style={{ background: spotlightDark }}
        className="absolute inset-0 hidden mix-blend-screen dark:block"
      />
      <motion.div style={{ background: spotlightLight }} className="absolute inset-0 block dark:hidden" />

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: NOISE_TEXTURE }}
      />
    </div>
  );
}
