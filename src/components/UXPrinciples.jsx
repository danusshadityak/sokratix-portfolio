"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { UX_PRINCIPLES } from "@/lib/data";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/motion";

export default function UXPrinciples() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading eyebrow="Principles" title="UX principles I design with" />

      <motion.div
        variants={staggerFast}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {UX_PRINCIPLES.map(([title, desc], i) => (
          <motion.div
            key={title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur-md transition-colors hover:border-red/50 hover:shadow-glow"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-red/30 bg-red/10 text-red transition-transform group-hover:scale-110">
              <span className="font-display text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="font-display text-base font-semibold leading-snug text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
