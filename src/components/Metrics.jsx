"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import CountUp from "@/components/ui/CountUp";
import { METRICS } from "@/lib/data";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/motion";

export default function Metrics() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 md:py-28">
      <SectionHeading eyebrow="Impact" title="Design impact at a glance" />

      <motion.div
        variants={staggerFast}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3"
      >
        {METRICS.map((m, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-6 text-center backdrop-blur-md transition-colors hover:border-red/50 hover:shadow-glow"
          >
            <div className="font-display text-3xl font-bold text-gradient-red sm:text-4xl">
              {m.value !== null ? (
                <CountUp value={m.value} suffix={m.suffix} />
              ) : (
                <span>{m.text}</span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted">{m.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
