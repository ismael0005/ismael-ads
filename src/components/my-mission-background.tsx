"use client";

import { motion } from "framer-motion";

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Slow-drifting particles, denser than Who I Am since this page leans more cinematic/network than portrait-quiet. */
const PARTICLES = Array.from({ length: 22 }, (_, i) => {
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

/** Faint concentric orbit rings, centered in the upper field — a quiet nod to the page's recurring core/orbit motif without being a literal grid. */
const ORBIT_RINGS = [14, 24, 34];

/**
 * The My Mission page's own fixed backdrop — twin cinematic key lights
 * (top-left primary, bottom-right accent) instead of Who I Am's single
 * off-center portrait light or the product pages' grid-mesh motifs. Meant to
 * feel like a manifesto film's title card: dark, spacious, quietly alive.
 */
export function MyMissionBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_15%_8%,rgba(109,40,217,0.1),transparent_60%)] dark:bg-[radial-gradient(ellipse_65%_55%_at_15%_8%,rgba(109,40,217,0.26),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_88%_92%,rgba(34,211,238,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_60%_55%_at_88%_92%,rgba(34,211,238,0.2),transparent_60%)]" />

      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.07, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-18%] left-[-12%] size-[44rem] rounded-full bg-primary/22 opacity-60 blur-[170px] mix-blend-multiply dark:opacity-95 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 23, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute right-[-15%] bottom-[-18%] size-[38rem] rounded-full bg-accent/16 opacity-55 blur-[160px] mix-blend-multiply dark:opacity-85 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.22, 0.4, 0.22], scale: [1, 1.08, 1] }}
        transition={{ duration: 27, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        className="absolute top-1/2 left-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/12 opacity-40 blur-[150px] mix-blend-multiply dark:opacity-65 dark:mix-blend-screen"
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute top-[-6%] left-[-6%] size-[46%] opacity-[0.05] dark:opacity-[0.08]"
      >
        {ORBIT_RINGS.map((r) => (
          <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="var(--color-primary)" strokeWidth="0.2" />
        ))}
      </svg>

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
