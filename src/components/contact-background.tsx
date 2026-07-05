"use client";

import { motion } from "framer-motion";

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const seed = i * 137.508;
  return {
    left: (seed * 2.4) % 100,
    top: (seed * 3.6) % 100,
    size: 1 + (i % 3),
    duration: 10 + (i % 8),
    delay: (i % 9) * 0.6,
    opacity: 0.14 + (i % 4) * 0.05,
  };
});

/** Concentric signal rings pulsing outward from the top center — a quiet "connection beacon" motif unique to this page. */
const SIGNAL_RINGS = [0, 1, 2];

/**
 * The Contact page's own fixed backdrop — a single top-center "signal beacon"
 * with pulsing outward rings, instead of Who I Am's portrait key light or My
 * Mission's twin cinematic lights. Meant to read as "a channel is open."
 */
export function ContactBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(109,40,217,0.1),transparent_60%)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(109,40,217,0.26),transparent_60%)]" />

      {SIGNAL_RINGS.map((ring) => (
        <motion.span
          key={ring}
          aria-hidden="true"
          animate={{ scale: [1, 2.4], opacity: [0.35, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeOut", delay: ring * 2 }}
          className="absolute top-[-4rem] left-1/2 size-[26rem] -translate-x-1/2 rounded-full border border-primary/30"
        />
      ))}

      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.07, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-primary/20 opacity-60 blur-[170px] mix-blend-multiply dark:opacity-90 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute right-[-15%] bottom-[-15%] size-[36rem] rounded-full bg-accent/16 opacity-50 blur-[160px] mix-blend-multiply dark:opacity-80 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.22, 0.4, 0.22], scale: [1, 1.08, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        className="absolute bottom-[10%] left-[-12%] size-[30rem] rounded-full bg-secondary/14 opacity-45 blur-[150px] mix-blend-multiply dark:opacity-70 dark:mix-blend-screen"
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_45%,transparent_55%,rgba(0,0,0,0.07))] dark:bg-[radial-gradient(ellipse_85%_75%_at_50%_45%,transparent_55%,rgba(0,0,0,0.3))]" />

      {PARTICLES.map((particle, index) => (
        <motion.span
          key={index}
          animate={{
            y: [0, -18, 0],
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
