"use client";

import { motion } from "framer-motion";

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Deterministic pseudo-random spread (golden-angle based) — stable across server/client renders, tuned sparser than the other pages for a calmer "cinema dust" feel. */
const PARTICLES = Array.from({ length: 22 }, (_, i) => {
  const seed = i * 137.508;
  return {
    left: (seed * 2.1) % 100,
    top: (seed * 3.3) % 100,
    size: 1 + (i % 3),
    duration: 9 + (i % 7),
    delay: (i % 9) * 0.6,
    opacity: 0.15 + (i % 4) * 0.07,
  };
});

const RINGS = [0, 1, 2, 3];

/**
 * The CTV page's own fixed atmospheric backdrop — a cinema-screen glow with
 * expanding sonar-style light rings, distinct from HomeBackground's aurora
 * blobs and the App page's network mesh. Same brand tokens, same "one
 * continuous scene" mounting technique (fixed, mounted once in page.tsx).
 */
export function CtvMonetizationBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(109,40,217,0.1),transparent_60%),linear-gradient(200deg,rgba(34,211,238,0.05),transparent_50%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(109,40,217,0.28),transparent_60%),linear-gradient(200deg,rgba(34,211,238,0.12),transparent_50%)]" />

      {/* Expanding sonar-style light rings, centered where the hero TV sits. */}
      <div className="absolute top-[18%] left-1/2 size-px -translate-x-1/2">
        {RINGS.map((ring) => (
          <motion.span
            key={ring}
            initial={{ scale: 0.6, opacity: 0.5 }}
            animate={{ scale: [0.6, 2.6], opacity: [0.45, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeOut", delay: ring * 2 }}
            className="absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 dark:border-accent/25"
          />
        ))}
      </div>

      {/* Soft moving purple + cyan glow blobs. */}
      <motion.div
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-primary/25 opacity-70 blur-[150px] mix-blend-multiply dark:opacity-100 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.12, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[-15%] right-[-10%] size-[36rem] rounded-full bg-accent/20 opacity-60 blur-[150px] mix-blend-multiply dark:opacity-100 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute bottom-1/4 left-[-12%] size-[32rem] rounded-full bg-secondary/20 opacity-55 blur-[140px] mix-blend-multiply dark:opacity-90 dark:mix-blend-screen"
      />

      {/* Very subtle animated grid, drifting slowly. */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-1/4 text-foreground opacity-[0.03] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_20%,black,transparent)] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:70px_70px] dark:opacity-[0.06]"
      />

      {PARTICLES.map((particle, index) => (
        <motion.span
          key={index}
          animate={{
            y: [0, -16, 0],
            opacity: [particle.opacity * 0.4, particle.opacity, particle.opacity * 0.4],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
          style={{ left: `${particle.left}%`, top: `${particle.top}%`, width: particle.size, height: particle.size }}
          className="absolute rounded-full bg-accent blur-[0.5px] dark:bg-white"
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: NOISE_TEXTURE }}
      />
    </div>
  );
}
