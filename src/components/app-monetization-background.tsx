"use client";

import { motion } from "framer-motion";

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** A sparse "signal network" of nodes + connecting lines — the AI/mediation motif for this page, deliberately not the homepage's uniform grid. */
const NODES = [
  { x: 12, y: 18 }, { x: 28, y: 10 }, { x: 45, y: 22 }, { x: 8, y: 48 },
  { x: 33, y: 52 }, { x: 58, y: 40 }, { x: 74, y: 16 }, { x: 90, y: 30 },
  { x: 82, y: 58 }, { x: 62, y: 70 }, { x: 40, y: 82 }, { x: 18, y: 78 },
  { x: 95, y: 78 }, { x: 70, y: 92 },
];

const LINKS: [number, number][] = [
  [0, 1], [1, 2], [2, 5], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
  [8, 9], [9, 10], [10, 11], [3, 11], [9, 13], [7, 12], [12, 13],
];

const PULSE_LINKS = [1, 4, 8, 11];

/**
 * The App Monetization page's own fixed atmospheric backdrop — deliberately not
 * HomeBackground. Same brand color tokens and "one continuous scene" mounting
 * technique (position: fixed, mounted once in page.tsx), but a different visual
 * language: a network/signal mesh instead of aurora blobs, since this page's
 * story is AI-routed mediation rather than a single dashboard.
 */
export function AppMonetizationBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-[linear-gradient(200deg,rgba(109,40,217,0.07),transparent_40%,rgba(34,211,238,0.05)_78%,transparent)] dark:bg-[linear-gradient(200deg,rgba(109,40,217,0.2),transparent_40%,rgba(34,211,238,0.1)_78%,transparent)]" />

      {/* Soft moving purple glow beams — elongated, rotating slowly, not the homepage's round blobs. */}
      <motion.div
        animate={{ rotate: [0, 8, 0], scale: [1, 1.06, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-1/2 h-[60rem] w-[26rem] -translate-x-1/2 rounded-[50%] bg-primary/25 opacity-60 blur-[150px] mix-blend-multiply dark:opacity-90 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ rotate: [0, -10, 0], scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[-15%] left-[-10%] h-[34rem] w-[34rem] rounded-full bg-secondary/20 opacity-50 blur-[140px] mix-blend-multiply dark:opacity-90 dark:mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.12, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute top-1/3 right-[-12%] size-[30rem] rounded-full bg-accent/15 opacity-50 blur-[130px] mix-blend-multiply dark:opacity-80 dark:mix-blend-screen"
      />

      {/* Signal network — nodes + connecting lines with a couple of traveling pulses. */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-[0.16] dark:opacity-[0.3]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="app-bg-link" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.15} />
          </linearGradient>
        </defs>
        {LINKS.map(([a, b], index) => (
          <line
            key={index}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="url(#app-bg-link)"
            strokeWidth={0.15}
          />
        ))}
        {PULSE_LINKS.map((linkIndex, i) => {
          const [a, b] = LINKS[linkIndex];
          return (
            <motion.circle
              key={linkIndex}
              r={0.5}
              cx={NODES[a].x}
              cy={NODES[a].y}
              fill="var(--color-accent)"
              initial={{ opacity: 0, cx: NODES[a].x, cy: NODES[a].y }}
              animate={{
                cx: [NODES[a].x, NODES[b].x],
                cy: [NODES[a].y, NODES[b].y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.4,
                repeatDelay: 2,
              }}
            />
          );
        })}
        {NODES.map((node, index) => (
          <circle key={index} cx={node.x} cy={node.y} r={0.35} fill="var(--color-foreground)" />
        ))}
      </svg>

      {/* A single slow vertical scan beam — the "AI is watching" signature for this page. */}
      <motion.div
        animate={{ y: ["-20%", "120%"], opacity: [0, 0.5, 0] }}
        transition={{ duration: 13, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-primary/10 to-transparent mix-blend-multiply dark:via-accent/10 dark:mix-blend-screen"
      />

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: NOISE_TEXTURE }}
      />
    </div>
  );
}
