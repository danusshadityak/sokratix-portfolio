"use client";

import { motion } from "framer-motion";

// Small floating glass chip (used around the hero video and as tags).
export default function Chip({ children, className = "", float = false, delay = 0 }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`inline-flex select-none items-center gap-1.5 rounded-full border border-white/12 bg-card/80 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md ${
        float ? "shadow-lg shadow-black/40" : ""
      } ${className}`}
      style={float ? { animation: `float ${5 + (delay % 3)}s ease-in-out infinite` } : undefined}
    >
      {children}
    </motion.span>
  );
}
