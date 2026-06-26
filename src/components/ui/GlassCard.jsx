"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

// Reusable glassmorphism card with a red hover glow.
export default function GlassCard({
  children,
  className = "",
  hover = true,
  animate = true,
  as = "div",
  ...rest
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      variants={animate ? fadeUp : undefined}
      initial={animate ? "hidden" : undefined}
      whileInView={animate ? "show" : undefined}
      viewport={animate ? viewportOnce : undefined}
      whileHover={
        hover ? { y: -6, boxShadow: "var(--shadow-glow)" } : undefined
      }
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className={`relative rounded-3xl border border-white/10 bg-card/70 backdrop-blur-xl ${
        hover ? "hover:border-red/50" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  );
}
