"use client";

import { motion } from "framer-motion";

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const PARTICLES = Array.from({ length: 18 }, (_, i) => {
  const seed = i * 137.508;
  return {
    left: (seed * 2.4) % 100,
    top: (seed * 3.6) % 100,
    size: 1 + (i % 3),
    duration: 11 + (i % 7),
    delay: (i % 8) * 0.65,
    opacity: 0.12 + (i % 4) * 0.05,
  };
});

/** Faint ruled lines, like notebook/article paper — a quiet nod to "reading," never sharp enough to compete with text. */
const RULED_LINES =
  "repeating-linear-gradient(to bottom, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 42px)";

/**
 * The Blog page's own fixed backdrop — a single soft top-center "reading
 * light" plus faint ruled-paper lines, instead of the other pages' orbit,
 * signal-ring or portrait motifs. Meant to feel like an editorial desk lamp.
 */
export function BlogBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_50%_0%,rgba(109,40,217,0.09),transparent_60%)] dark:bg-[radial-gradient(ellipse_65%_45%_at_50%_0%,rgba(109,40,217,0.22),transparent_60%)]" />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{ backgroundImage: RULED_LINES }}
      />

      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-18%] right-[-8%] size-[42rem] rounded-full bg-primary/20 opacity-55 blur-[170px] mix-blend-multiply dark:opacity-85 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 23, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-[-15%] left-[-10%] size-[36rem] rounded-full bg-accent/14 opacity-50 blur-[160px] mix-blend-multiply dark:opacity-75 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.22, 0.4, 0.22], scale: [1, 1.08, 1] }}
        transition={{ duration: 27, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        className="absolute top-1/2 left-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/12 opacity-40 blur-[150px] mix-blend-multiply dark:opacity-65 dark:mix-blend-screen"
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_45%,transparent_55%,rgba(0,0,0,0.06))] dark:bg-[radial-gradient(ellipse_85%_75%_at_50%_45%,transparent_55%,rgba(0,0,0,0.28))]" />

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
