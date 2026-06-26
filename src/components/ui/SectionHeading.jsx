"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/motion";

// Eyebrow + title + optional subtitle, with reveal animation.
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <motion.div
      variants={staggerFast}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`flex max-w-3xl flex-col gap-4 ${alignment} ${className}`}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-red/30 bg-red/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-red"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-red" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUp} className="text-base text-muted sm:text-lg">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
