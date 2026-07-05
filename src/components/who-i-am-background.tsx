"use client";

import { motion } from "framer-motion";

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Sparser and warmer than the product pages — this backdrop should feel like studio portrait lighting, not a data product. */
const PARTICLES = Array.from({ length: 16 }, (_, i) => {
  const seed = i * 137.508;
  return {
    left: (seed * 2.4) % 100,
    top: (seed * 3.6) % 100,
    size: 1 + (i % 3),
    duration: 11 + (i % 7),
    delay: (i % 8) * 0.7,
    opacity: 0.12 + (i % 4) * 0.05,
  };
});

/**
 * The Who I Am page's own fixed backdrop — a single soft off-center "key
 * light" glow (like studio portrait lighting) instead of any of the other
 * pages' tech-flavored motifs (mesh, rings, radar, glass shapes). This page
 * is a personal story, not a product, so the background stays quiet.
 */
export function WhoIAmBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_10%,rgba(109,40,217,0.09),transparent_60%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_75%_10%,rgba(109,40,217,0.24),transparent_60%)]" />

      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] right-[-10%] size-[42rem] rounded-full bg-primary/22 opacity-60 blur-[160px] mix-blend-multiply dark:opacity-95 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-[-15%] left-[-12%] size-[34rem] rounded-full bg-secondary/16 opacity-50 blur-[150px] mix-blend-multiply dark:opacity-80 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 9 }}
        className="absolute top-1/2 left-1/3 size-[26rem] -translate-y-1/2 rounded-full bg-accent/12 opacity-40 blur-[140px] mix-blend-multiply dark:opacity-70 dark:mix-blend-screen"
      />

      {/* A soft vignette, subtle enough to just settle the eye toward the center content. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,transparent_55%,rgba(0,0,0,0.06))] dark:bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,transparent_55%,rgba(0,0,0,0.28))]" />

      {PARTICLES.map((particle, index) => (
        <motion.span
          key={index}
          animate={{
            y: [0, -16, 0],
            opacity: [particle.opacity * 0.4, particle.opacity, particle.opacity * 0.4],
          }}
          transition={{ duration: particle.duration, repeat: Infinity, ease: "easeInOut", delay: particle.delay }}
          style={{ left: `${particle.left}%`, top: `${particle.top}%`, width: particle.size, height: particle.size }}
          className="absolute rounded-full bg-foreground blur-[0.5px] dark:bg-white"
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: NOISE_TEXTURE }}
      />
    </div>
  );
}
