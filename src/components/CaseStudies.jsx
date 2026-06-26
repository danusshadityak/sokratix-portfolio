"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, viewportOnce } from "@/lib/motion";

export default function CaseStudies({ caseStudies }) {
  return (
    <section id="case-studies" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading
        eyebrow="Case Studies"
        title="Selected Case Studies"
        subtitle="Personal projects exploring UI, UX, product thinking, and problem-solving."
      />

      <div className="mt-16 flex flex-col gap-10">
        {caseStudies.map((cs, i) => (
          <CaseStudyCard key={cs.id || cs.title} cs={cs} reversed={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function CaseStudyCard({ cs, reversed }) {
  const accent = cs.accent || "#ff1a1a";
  const open = () =>
    window.open(cs.behance_url || "https://www.behance.net/danusshadityak", "_blank", "noopener");

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      whileHover={{ y: -6 }}
      onClick={open}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" ? open() : null)}
      aria-label={`${cs.title} — view on Behance`}
      className="group relative cursor-pointer overflow-hidden rounded-[28px] border border-white/10 bg-card/60 p-7 backdrop-blur-xl transition-colors hover:border-red/55 hover:shadow-glow-lg sm:p-10"
    >
      {/* abstract background shape */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-0 h-72 w-72 rounded-full opacity-25 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-40"
        style={{ background: accent, top: reversed ? "auto" : "-4rem", bottom: reversed ? "-4rem" : "auto", right: reversed ? "auto" : "-4rem", left: reversed ? "-4rem" : "auto" }}
      />

      <div
        className={`relative grid grid-cols-1 items-center gap-8 md:grid-cols-2 ${
          reversed ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Content */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}
            >
              {cs.type}
            </span>
          </div>
          <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {cs.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted sm:text-base">{cs.description}</p>

          <div className="rounded-2xl border border-white/10 bg-soft/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>
              UX Focus
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white/85">{cs.ux_focus}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(cs.tags || []).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-card/80 px-3 py-1 text-xs text-white/75"
              >
                {t}
              </span>
            ))}
          </div>

          <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-red">
            View on Behance
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Phone mockup */}
        <div className="flex justify-center">
          <PhoneMockup accent={accent} image={cs.image_url} title={cs.title} />
        </div>
      </div>
    </motion.article>
  );
}

function PhoneMockup({ accent, image, title }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="relative h-[360px] w-[180px] rounded-[34px] border-[6px] border-[#1c1c1c] bg-black shadow-2xl shadow-black/60"
      style={{ boxShadow: `0 30px 60px -20px ${accent}55` }}
    >
      {/* notch */}
      <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-[#1c1c1c]" />
      <div className="h-full w-full overflow-hidden rounded-[28px]">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={`${title} screen`} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col" style={{ background: `linear-gradient(180deg, ${accent}26, #0c0c0c 60%)` }}>
            <div className="px-4 pt-8">
              <div className="h-3 w-20 rounded-full bg-white/30" />
              <div className="mt-2 h-2 w-28 rounded-full bg-white/15" />
            </div>
            <div className="mx-4 mt-4 rounded-2xl p-3" style={{ background: accent }}>
              <div className="h-2 w-16 rounded-full bg-white/70" />
              <div className="mt-2 h-2 w-24 rounded-full bg-white/40" />
              <div className="mt-3 h-6 w-20 rounded-full bg-white/80" />
            </div>
            <div className="mx-4 mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2, 3, 4, 5].map((k) => (
                <div key={k} className="aspect-square rounded-xl bg-white/10" />
              ))}
            </div>
            <div className="mx-4 mt-auto mb-4 flex items-center justify-between rounded-2xl bg-black/40 px-4 py-3">
              {[0, 1, 2, 3].map((k) => (
                <div key={k} className="h-3 w-3 rounded-full" style={{ background: k === 0 ? accent : "rgba(255,255,255,0.25)" }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
