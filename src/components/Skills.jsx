"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { SKILL_GROUPS } from "@/lib/data";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/motion";

export default function Skills() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading
        eyebrow="Skills"
        title="Skills built for thoughtful product design."
      />

      <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-3">
        {SKILL_GROUPS.map((group, gi) => (
          <motion.div
            key={group.title}
            variants={staggerFast}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="rounded-3xl border border-white/10 bg-card/50 p-6 backdrop-blur-md"
          >
            <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red/15 text-xs font-bold text-red">
                {gi + 1}
              </span>
              {group.title}
            </h3>
            <div className="flex flex-col gap-2.5">
              {group.items.map(([name, desc]) => (
                <SkillCard key={name} name={name} desc={desc} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SkillCard({ name, desc }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
      style={{ transformPerspective: 600 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative cursor-default overflow-hidden rounded-xl border border-white/10 bg-soft/70 px-4 py-3 transition-colors hover:border-red/50 hover:shadow-glow"
    >
      <div className="flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red transition-transform group-hover:scale-150" />
        <span className="text-sm font-medium text-white/90">{name}</span>
      </div>
      <p className="mt-0 max-h-0 overflow-hidden pl-4 text-xs leading-relaxed text-muted opacity-0 transition-all duration-300 group-hover:mt-1.5 group-hover:max-h-16 group-hover:opacity-100">
        {desc}
      </p>
    </motion.div>
  );
}
