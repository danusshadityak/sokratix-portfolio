"use client";

import { motion } from "framer-motion";
import VideoCard from "@/components/VideoCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { HERO_CHIPS, PROFILE } from "@/lib/data";
import { EASE, lineReveal } from "@/lib/motion";

const TITLE_LINES = [
  "Hi, I'm Danussh Aditya —",
  "I turn questions into",
  "meaningful digital experiences.",
];

// Positions for floating chips around the video (edges only, never over the face).
const CHIP_POS = [
  "top-2 -left-3 sm:-left-6",
  "top-1/4 -right-4 sm:-right-8",
  "bottom-6 -left-4 sm:-left-10",
  "-bottom-3 left-1/3",
  "top-1/2 -left-5 sm:-left-12",
  "bottom-1/3 -right-3 sm:-right-9",
  "-top-3 right-1/4",
  "-bottom-4 -right-3 sm:-right-6",
];

export default function Hero({ videoSrc, videoPoster }) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04] mix-blend-soft-light" />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-40 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-red/25 blur-[140px]"
      />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-red-deep/20 blur-[120px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 md:grid-cols-2 md:gap-10">
        {/* Left — text */}
        <div className="order-1 flex flex-col gap-7">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-red/30 bg-red/10 px-4 py-2 text-xs font-semibold tracking-wide text-red"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red" />
            Question-led UI/UX Designer
          </motion.span>

          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {TITLE_LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  custom={i}
                  variants={lineReveal}
                  initial="hidden"
                  animate="show"
                  className={`block ${i === 2 ? "text-gradient-red" : ""}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
            className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            I&apos;m a UI/UX Designer crafting clean, user-friendly web and mobile
            products through research, wireframing, prototyping, visual design, and
            interaction design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95, ease: EASE }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton
              href="#case-studies"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#case-studies")?.scrollIntoView({ behavior: "smooth" });
              }}
              variant="primary"
            >
              View Case Studies
              <Arrow />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              variant="secondary"
            >
              Let&apos;s Talk
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right — video with floating chips */}
        <div className="relative order-2 px-2 sm:px-6 md:px-2">
          <div className="relative">
            <VideoCard src={videoSrc} poster={videoPoster} />
            {HERO_CHIPS.map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.08 }}
                className={`absolute ${CHIP_POS[i]} z-20 hidden rounded-full border border-white/12 bg-card/85 px-3 py-1.5 text-[11px] font-medium text-white/90 shadow-lg shadow-black/40 backdrop-blur-md sm:inline-flex`}
                style={{ animation: `float ${5 + (i % 4)}s ease-in-out infinite` }}
              >
                {chip === "Why?" || chip === "Better Questions" ? (
                  <span className="text-red">{chip}</span>
                ) : (
                  chip
                )}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
