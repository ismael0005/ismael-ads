export const duration = {
  fast: 0.2,
  base: 0.4,
  slow: 0.8,
} as const;

export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const gsapEase = {
  out: "power3.out",
  inOut: "power2.inOut",
} as const;

export const motionVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.base, ease: ease.out },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.base } },
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  },
} as const;
