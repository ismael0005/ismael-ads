"use client";

import { motion } from "framer-motion";

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const PARTICLES = Array.from({ length: 18 }, (_, i) => {
  const seed = i * 137.508;
  return {
    left: (seed * 1.9) % 100,
    top: (seed * 3.1) % 100,
    size: 1 + (i % 3),
    duration: 10 + (i % 6),
    delay: (i % 8) * 0.7,
    opacity: 0.12 + (i % 4) * 0.06,
  };
});

const GLASS_SHAPES = [
  { top: "12%", left: "8%", size: "9rem", rotate: -8, duration: 24 },
  { top: "62%", left: "4%", size: "7rem", rotate: 10, duration: 28 },
  { top: "20%", left: "88%", size: "8rem", rotate: 12, duration: 26 },
  { top: "72%", left: "90%", size: "6rem", rotate: -14, duration: 22 },
  { top: "44%", left: "48%", size: "5rem", rotate: 6, duration: 30 },
];

/**
 * The Ad Formats page's own fixed backdrop — a calm "studio lighting" scene
 * (two large soft glows + drifting glass shapes) rather than Home's aurora
 * blobs, App's network mesh, or CTV's sonar rings. Same brand tokens, same
 * fixed "one continuous scene" mounting technique.
 */
export function AdFormatsBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(109,40,217,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(109,40,217,0.22),transparent_60%)]" />

      <motion.div
        animate={{ opacity: [0.45, 0.8, 0.45], scale: [1, 1.08, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-8%] size-[38rem] rounded-full bg-primary/20 opacity-60 blur-[150px] mix-blend-multiply dark:opacity-100 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-[-12%] left-[-10%] size-[34rem] rounded-full bg-accent/15 opacity-55 blur-[150px] mix-blend-multiply dark:opacity-90 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.1, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        className="absolute top-1/2 left-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/15 opacity-45 blur-[140px] mix-blend-multiply dark:opacity-80 dark:mix-blend-screen"
      />

      {/* Drifting translucent glass shapes — the page's signature "floating hardware" material, used decoratively here too. */}
      {GLASS_SHAPES.map((shape, index) => (
        <motion.div
          key={index}
          animate={{ y: [0, -26, 0], rotate: [shape.rotate, shape.rotate + 4, shape.rotate] }}
          transition={{ duration: shape.duration, repeat: Infinity, ease: "easeInOut", delay: index * 1.3 }}
          style={{ top: shape.top, left: shape.left, width: shape.size, height: shape.size }}
          className="absolute rounded-[2rem] border border-foreground/[0.05] bg-foreground/[0.02] backdrop-blur-2xl"
        />
      ))}

      {PARTICLES.map((particle, index) => (
        <motion.span
          key={index}
          animate={{
            y: [0, -14, 0],
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
