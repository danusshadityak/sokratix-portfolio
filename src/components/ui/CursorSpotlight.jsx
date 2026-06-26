"use client";

import { useEffect, useState } from "react";

// Fixed, full-page red radial glow that follows the mouse.
// Disabled on touch devices and when reduced motion is preferred.
export default function CursorSpotlight() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(255,26,26,0.10), transparent 70%)`,
      }}
    />
  );
}
