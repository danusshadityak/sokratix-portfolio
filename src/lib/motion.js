// Shared Framer Motion variants used across sections.

export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const staggerFast = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

// Per-line hero title reveal
export const lineReveal = {
  hidden: { opacity: 0, y: "100%" },
  show: (i = 0) => ({
    opacity: 1,
    y: "0%",
    transition: { duration: 0.8, ease: EASE, delay: 0.15 * i },
  }),
};

// Reusable viewport config for whileInView
export const viewportOnce = { once: true, margin: "-80px" };
