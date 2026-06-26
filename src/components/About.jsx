"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/lib/data";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — text + quote */}
        <div className="flex flex-col gap-7">
          <SectionHeading
            align="left"
            eyebrow="About"
            title="Designing with empathy, clarity, and better questions."
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-base leading-relaxed text-muted sm:text-lg"
          >
            I&apos;m a UI/UX Designer passionate about creating clean, modern, and
            user-friendly digital products. My design approach starts with asking the
            right questions, understanding users deeply, and turning complex problems
            into simple digital experiences.
          </motion.p>

          <motion.figure
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative overflow-hidden rounded-3xl border border-red/25 bg-gradient-to-br from-red/10 to-transparent p-6 sm:p-8"
          >
            <span className="absolute -right-4 -top-8 font-display text-[120px] leading-none text-red/15">
              &ldquo;
            </span>
            <blockquote className="relative font-display text-lg font-medium leading-relaxed text-white sm:text-xl">
              Before I design a screen, I ask: <span className="text-red">Who is this for?</span>{" "}
              <span className="text-red">What problem are we solving?</span>{" "}
              <span className="text-red">Why does it matter?</span>
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted">
              — The Sokratix way
            </figcaption>
          </motion.figure>
        </div>

        {/* Right — experience timeline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative pl-8"
        >
          {/* vertical line */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-red via-red/40 to-transparent" />
          <h3 className="mb-6 font-display text-lg font-semibold text-white/90">
            Experience highlights
          </h3>
          <ul className="flex flex-col gap-5">
            {EXPERIENCE.map((item, i) => (
              <motion.li key={i} variants={fadeUp} className="relative">
                <span className="absolute -left-[31px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-red bg-ink">
                  <span className="h-1 w-1 rounded-full bg-red" />
                </span>
                <div className="rounded-2xl border border-white/10 bg-card/60 px-5 py-4 backdrop-blur-md transition hover:border-red/40">
                  <p className="text-sm leading-relaxed text-white/90">{item}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
