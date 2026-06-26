"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, viewportOnce } from "@/lib/motion";

export default function Projects({ projects }) {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading
        eyebrow="Current Work"
        title="Current Professional Projects"
        subtitle="Real-world products I'm currently designing across healthcare and recruitment technology."
      />

      <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.id || p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const accent = project.accent || "#ff1a1a";
  const open = () =>
    window.open(project.behance_url || "https://www.behance.net/danusshadityak", "_blank", "noopener");

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-card/70 p-6 backdrop-blur-xl transition-colors hover:border-red/50 hover:shadow-glow sm:p-8"
    >
      {/* animated abstract shape */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-50"
        style={{ background: accent }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: accent }}
            />
            <h3 className="font-display text-2xl font-bold">{project.name}</h3>
          </div>
          <p className="mt-1 text-sm text-muted">
            {project.category} · {project.platform}
          </p>
        </div>
        <span className="rounded-full border border-white/15 bg-soft px-3 py-1 text-xs font-medium text-white/80">
          {project.role}
        </span>
      </div>

      {/* faux UI mockup */}
      {project.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image_url}
          alt={`${project.name} preview`}
          className="relative mt-6 h-44 w-full rounded-2xl border border-white/10 object-cover"
        />
      ) : (
        <Mockup accent={accent} />
      )}

      <p className="relative mt-6 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="relative mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
          UX Focus
        </p>
        <div className="flex flex-wrap gap-2">
          {(project.ux_focus || []).map((f) => (
            <span
              key={f}
              className="rounded-full border border-white/10 bg-soft/80 px-3 py-1 text-xs text-white/80"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={open}
        className="relative mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-red px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-red-deep"
      >
        View Work
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </motion.article>
  );
}

// Lightweight dashboard-style preview built from divs (no external images).
function Mockup({ accent }) {
  return (
    <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-soft/80 p-4 transition-transform duration-500 group-hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 rounded-full bg-white/15" />
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((k) => (
          <div key={k} className="rounded-lg bg-card/80 p-2">
            <div className="h-1.5 w-8 rounded-full bg-white/20" />
            <div className="mt-2 h-3 w-10 rounded-full" style={{ background: accent, opacity: 0.8 }} />
          </div>
        ))}
      </div>
      {/* metrics graph */}
      <div className="mt-2 flex h-16 items-end gap-1 rounded-lg bg-card/80 p-2">
        {[40, 65, 50, 80, 60, 90, 72].map((h, k) => (
          <div
            key={k}
            className="flex-1 rounded-t"
            style={{ height: `${h}%`, background: accent, opacity: 0.55 + k * 0.05 }}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-lg bg-card/80 p-2">
        <div className="h-6 w-6 rounded-full" style={{ background: accent, opacity: 0.7 }} />
        <div className="flex-1">
          <div className="h-1.5 w-20 rounded-full bg-white/20" />
          <div className="mt-1.5 h-1.5 w-12 rounded-full bg-white/10" />
        </div>
        <div className="h-5 w-12 rounded-full" style={{ background: accent, opacity: 0.3 }} />
      </div>
    </div>
  );
}
