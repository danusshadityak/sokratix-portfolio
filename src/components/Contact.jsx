"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import Logo from "@/components/ui/Logo";
import { PROFILE } from "@/lib/data";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/motion";

export default function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-red/20 blur-[130px]"
      />

      <div className="relative mx-auto max-w-4xl px-5 py-28 text-center">
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col items-center gap-6"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-red/30 bg-red/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-red"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red" /> Contact
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl"
          >
            Have a product idea? Let&apos;s ask better questions and{" "}
            <span className="text-gradient-red">design something meaningful.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="max-w-xl text-base text-muted sm:text-lg">
            I&apos;m open to UI/UX design roles, freelance projects, collaborations, and
            product design opportunities.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-2 flex flex-wrap justify-center gap-4">
            <MagneticButton href={`mailto:${PROFILE.email}`} variant="primary" ariaLabel="Email Danussh">
              Email Me
            </MagneticButton>
            <MagneticButton href={PROFILE.behance} target="_blank" variant="secondary" ariaLabel="View Behance portfolio">
              View Behance
            </MagneticButton>
            <MagneticButton href={PROFILE.linkedin} target="_blank" variant="secondary" ariaLabel="Visit LinkedIn profile">
              LinkedIn
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-7 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <Logo className="text-base" />
            <span className="text-sm text-muted">— {PROFILE.tagline}</span>
          </div>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {PROFILE.name}. Salem, India.
          </p>
        </div>
      </div>
    </footer>
  );
}
