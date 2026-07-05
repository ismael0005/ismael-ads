"use client";

import { motion } from "framer-motion";

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const seed = i * 137.508;
  return {
    left: (seed * 2.2) % 100,
    top: (seed * 3.4) % 100,
    size: 1 + (i % 3),
    duration: 9 + (i % 7),
    delay: (i % 8) * 0.6,
    opacity: 0.14 + (i % 4) * 0.06,
  };
});

const GLASS_PANELS = [
  { top: "16%", left: "6%", size: "8rem", rotate: -6 },
  { top: "66%", left: "90%", size: "9rem", rotate: 10 },
  { top: "38%", left: "94%", size: "6rem", rotate: 6 },
];

/**
 * The Eligibility Checker page's own fixed backdrop — a slow radar sweep
 * (conic-gradient wedge rotating a full 360°) behind the usual grid/particles/
 * glass panels, giving this page its "AI is scanning you" signature distinct
 * from every other page's background motif.
 */
export function EligibilityCheckerBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(109,40,217,0.08),transparent_45%,rgba(34,211,238,0.05)_78%,transparent)] dark:bg-[linear-gradient(165deg,rgba(109,40,217,0.22),transparent_45%,rgba(34,211,238,0.12)_78%,transparent)]" />

      {/* Slow radar sweep — the page's signature "AI scanning" motif. */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 size-[70rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.05] dark:opacity-[0.12]"
        style={{
          backgroundImage: "conic-gradient(from 0deg, var(--color-primary) 0deg, transparent 40deg, transparent 360deg)",
          borderRadius: "9999px",
        }}
      />

      <motion.div
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/25 opacity-65 blur-[150px] mix-blend-multiply dark:opacity-100 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.1, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-[-15%] right-[-10%] size-[36rem] rounded-full bg-accent/18 opacity-55 blur-[150px] mix-blend-multiply dark:opacity-90 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        className="absolute bottom-1/4 left-[-12%] size-[30rem] rounded-full bg-secondary/18 opacity-50 blur-[140px] mix-blend-multiply dark:opacity-85 dark:mix-blend-screen"
      />

      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-1/4 text-foreground opacity-[0.035] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_25%,black,transparent)] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:66px_66px] dark:opacity-[0.07]"
      />

      {GLASS_PANELS.map((panel, index) => (
        <motion.div
          key={index}
          animate={{ y: [0, -24, 0], rotate: [panel.rotate, panel.rotate + 4, panel.rotate] }}
          transition={{ duration: 20 + index * 3, repeat: Infinity, ease: "easeInOut", delay: index * 1.2 }}
          style={{ top: panel.top, left: panel.left, width: panel.size, height: panel.size }}
          className="absolute rounded-[2rem] border border-foreground/[0.05] bg-foreground/[0.02] backdrop-blur-2xl"
        />
      ))}

      {PARTICLES.map((particle, index) => (
        <motion.span
          key={index}
          animate={{
            y: [0, -15, 0],
            opacity: [particle.opacity * 0.4, particle.opacity, particle.opacity * 0.4],
          }}
          transition={{ duration: particle.duration, repeat: Infinity, ease: "easeInOut", delay: particle.delay }}
          style={{ left: `${particle.left}%`, top: `${particle.top}%`, width: particle.size, height: particle.size }}
          className="absolute rounded-full bg-primary blur-[0.5px] dark:bg-white"
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: NOISE_TEXTURE }}
      />
    </div>
  );
}
