"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

// Button / link wrapper with a magnetic hover effect.
// Renders an <a> when `href` is provided, otherwise a <button>.
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  strength = 0.35,
  target,
  rel,
  ariaLabel,
  type = "button",
}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setOffset({ x, y });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-2";
  const variants = {
    primary:
      "bg-red text-white shadow-glow hover:bg-red-deep",
    secondary:
      "glass border border-white/15 text-white hover:border-red/60 hover:text-white",
    ghost: "text-muted hover:text-white",
  };

  const Comp = href ? motion.a : motion.button;
  const extra = href
    ? { href, target, rel: rel ?? (target === "_blank" ? "noopener noreferrer" : undefined) }
    : { type, onClick };

  return (
    <Comp
      ref={ref}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 220, damping: 16, mass: 0.4 }}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...extra}
    >
      {children}
    </Comp>
  );
}
