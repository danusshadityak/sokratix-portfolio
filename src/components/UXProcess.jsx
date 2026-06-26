"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { UX_PROCESS } from "@/lib/data";
import { fadeUp, viewportOnce } from "@/lib/motion";

export default function UXProcess() {
  return (
    <section id="process" className="relative overflow-hidden py-24 md:py-32">
      {/* faint question marks in background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        <span className="absolute left-[6%] top-24 font-display text-[180px] text-white/[0.02]">?</span>
        <span className="absolute right-[8%] top-1/3 font-display text-[140px] text-red/[0.04]">?</span>
        <span className="absolute bottom-10 left-1/3 font-display text-[160px] text-white/[0.02]">?</span>
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Process"
          title="My UX Process"
          subtitle="Every product starts with better questions."
        />

        <div className="relative mt-16">
          {/* animated connecting line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute left-[27px] top-0 h-full w-[2px] origin-top bg-gradient-to-b from-red via-red/60 to-red/10 md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="flex flex-col gap-8">
            {UX_PROCESS.map((item, i) => {
              const right = i % 2 === 1;
              return (
                <motion.li
                  key={item.step}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  className={`relative flex items-start gap-6 pl-16 md:w-1/2 md:pl-0 ${
                    right ? "md:ml-auto md:flex-row md:pl-12" : "md:flex-row-reverse md:pr-12 md:text-right"
                  }`}
                >
                  {/* node */}
                  <span
                    className={`absolute left-[14px] top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-red bg-ink text-xs font-bold text-red md:left-auto ${
                      right ? "md:-left-[26px]" : "md:-right-[26px]"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur-md transition hover:border-red/40 hover:shadow-glow">
                    <h3 className="font-display text-xl font-semibold text-white">{item.step}</h3>
                    {item.question && (
                      <p className="mt-1 font-display text-sm italic text-red">
                        “{item.question}”
                      </p>
                    )}
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
