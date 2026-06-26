"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  saveProject,
  deleteProject,
  saveCaseStudy,
  deleteCaseStudy,
  saveSettings,
  uploadGalleryImage,
  deleteGalleryImage,
} from "@/app/admin/actions";

const TABS = [
  { key: "projects", label: "Projects" },
  { key: "case-studies", label: "Case Studies" },
  { key: "video", label: "Intro Video" },
  { key: "gallery", label: "Gallery" },
];

export default function AdminDashboard({
  initialProjects,
  initialCaseStudies,
  initialGallery,
  settings,
  errors,
}) {
  const [tab, setTab] = useState("projects");

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Content Manager</h1>
      <p className="mt-1 text-sm text-muted">
        Add, edit, and remove the content shown on your portfolio.
      </p>

      {(errors?.projects || errors?.caseStudies || errors?.gallery) && (
        <div className="mt-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-xs text-yellow-200">
          Some tables could not be read. Make sure you ran the SQL schema from{" "}
          <code>README.md</code> in your Supabase project.
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === t.key
                ? "bg-red text-white shadow-glow"
                : "border border-white/10 bg-card text-muted hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "projects" && <ProjectsTab items={initialProjects} />}
        {tab === "case-studies" && <CaseStudiesTab items={initialCaseStudies} />}
        {tab === "video" && <VideoTab settings={settings} />}
        {tab === "gallery" && <GalleryTab items={initialGallery} />}
      </div>
    </div>
  );
}

/* ---------------- shared bits ---------------- */
function Field({ label, name, defaultValue = "", type = "text", required, placeholder }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-muted">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-white/10 bg-soft px-3.5 py-2.5 text-white outline-none focus:border-red"
      />
    </label>
  );
}

function TextArea({ label, name, defaultValue = "", rows = 3, required }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-muted">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        required={required}
        className="rounded-xl border border-white/10 bg-soft px-3.5 py-2.5 text-white outline-none focus:border-red"
      />
    </label>
  );
}

function useFormSubmit(action, onDone) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const fd = new FormData(e.currentTarget);
      await action(fd);
      router.refresh();
      onDone?.();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return { submit, loading, error };
}

function SaveBar({ loading, error, onCancel }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-red px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-red-deep disabled:opacity-60"
      >
        {loading ? "Saving…" : "Save"}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-muted hover:text-white"
        >
          Cancel
        </button>
      )}
      {error && <span className="text-sm text-red">{error}</span>}
    </div>
  );
}

function ImageField({ label = "Image", existing }) {
  const [preview, setPreview] = useState(existing || "");
  return (
    <div className="flex flex-col gap-2 text-sm">
      <span className="text-muted">{label}</span>
      {existing && <input type="hidden" name="image_url" defaultValue={existing} />}
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="preview" className="h-28 w-full rounded-xl border border-white/10 object-cover" />
      )}
      <input
        type="file"
        name="imageFile"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) setPreview(URL.createObjectURL(f));
        }}
        className="text-xs text-muted file:mr-3 file:rounded-full file:border-0 file:bg-red file:px-4 file:py-2 file:text-white"
      />
    </div>
  );
}

function ListCard({ children, onEdit, onDelete, accent }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-card/60 p-4">
      <div className="flex min-w-0 items-start gap-3">
        {accent && <span className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ background: accent }} />}
        <div className="min-w-0">{children}</div>
      </div>
      <div className="flex shrink-0 gap-2">
        <button onClick={onEdit} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:border-red/60">
          Edit
        </button>
        <button onClick={onDelete} className="rounded-lg border border-red/30 px-3 py-1.5 text-xs text-red hover:bg-red/10">
          Delete
        </button>
      </div>
    </div>
  );
}

/* ---------------- Projects ---------------- */
function ProjectsTab({ items }) {
  const [editing, setEditing] = useState(null); // object or "new" or null
  const router = useRouter();

  const onDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    router.refresh();
  };

  if (editing) {
    return <ProjectForm item={editing === "new" ? null : editing} onDone={() => setEditing(null)} />;
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setEditing("new")}
        className="self-start rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:bg-red-deep"
      >
        + Add Project
      </button>
      {items.length === 0 && <Empty>No projects yet. The site shows the built-in defaults until you add some.</Empty>}
      {items.map((p) => (
        <ListCard key={p.id} accent={p.accent} onEdit={() => setEditing(p)} onDelete={() => onDelete(p.id)}>
          <p className="font-semibold">{p.name}</p>
          <p className="truncate text-xs text-muted">{p.category} · {p.platform}</p>
        </ListCard>
      ))}
    </div>
  );
}

function ProjectForm({ item, onDone }) {
  const { submit, loading, error } = useFormSubmit(saveProject, onDone);
  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-card/60 p-6 sm:grid-cols-2">
      {item?.id && <input type="hidden" name="id" defaultValue={item.id} />}
      <Field label="Name" name="name" defaultValue={item?.name} required />
      <Field label="Category" name="category" defaultValue={item?.category} />
      <Field label="Platform" name="platform" defaultValue={item?.platform} placeholder="Web + Mobile" />
      <Field label="Role" name="role" defaultValue={item?.role} placeholder="UI/UX Designer" />
      <Field label="Accent color (hex)" name="accent" type="text" defaultValue={item?.accent || "#ff1a1a"} />
      <Field label="Sort order" name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} />
      <div className="sm:col-span-2">
        <TextArea label="Description" name="description" defaultValue={item?.description} rows={3} />
      </div>
      <div className="sm:col-span-2">
        <TextArea
          label="UX Focus (one per line, or comma-separated)"
          name="ux_focus"
          defaultValue={Array.isArray(item?.ux_focus) ? item.ux_focus.join("\n") : ""}
          rows={4}
        />
      </div>
      <Field label="Behance URL" name="behance_url" defaultValue={item?.behance_url} placeholder="https://www.behance.net/danusshadityak" />
      <div className="sm:col-span-2">
        <ImageField label="Preview image (optional)" existing={item?.image_url} />
      </div>
      <div className="sm:col-span-2">
        <SaveBar loading={loading} error={error} onCancel={onDone} />
      </div>
    </form>
  );
}

/* ---------------- Case Studies ---------------- */
function CaseStudiesTab({ items }) {
  const [editing, setEditing] = useState(null);
  const router = useRouter();
  const onDelete = async (id) => {
    if (!confirm("Delete this case study?")) return;
    await deleteCaseStudy(id);
    router.refresh();
  };
  if (editing) {
    return <CaseStudyForm item={editing === "new" ? null : editing} onDone={() => setEditing(null)} />;
  }
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setEditing("new")}
        className="self-start rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:bg-red-deep"
      >
        + Add Case Study
      </button>
      {items.length === 0 && <Empty>No case studies yet. The site shows the built-in defaults until you add some.</Empty>}
      {items.map((c) => (
        <ListCard key={c.id} accent={c.accent} onEdit={() => setEditing(c)} onDelete={() => onDelete(c.id)}>
          <p className="font-semibold">{c.title}</p>
          <p className="truncate text-xs text-muted">{c.type}</p>
        </ListCard>
      ))}
    </div>
  );
}

function CaseStudyForm({ item, onDone }) {
  const { submit, loading, error } = useFormSubmit(saveCaseStudy, onDone);
  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-card/60 p-6 sm:grid-cols-2">
      {item?.id && <input type="hidden" name="id" defaultValue={item.id} />}
      <Field label="Title" name="title" defaultValue={item?.title} required />
      <Field label="Type" name="type" defaultValue={item?.type} placeholder="UX Case Study" />
      <Field label="Accent color (hex)" name="accent" defaultValue={item?.accent || "#ff1a1a"} />
      <Field label="Sort order" name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} />
      <div className="sm:col-span-2">
        <TextArea label="Description" name="description" defaultValue={item?.description} rows={3} />
      </div>
      <div className="sm:col-span-2">
        <TextArea label="UX Focus" name="ux_focus" defaultValue={item?.ux_focus} rows={2} />
      </div>
      <div className="sm:col-span-2">
        <TextArea
          label="Tags (comma-separated)"
          name="tags"
          defaultValue={Array.isArray(item?.tags) ? item.tags.join(", ") : ""}
          rows={2}
        />
      </div>
      <Field label="Behance URL" name="behance_url" defaultValue={item?.behance_url} placeholder="https://www.behance.net/danusshadityak" />
      <div className="sm:col-span-2">
        <ImageField label="Phone screen image (optional)" existing={item?.image_url} />
      </div>
      <div className="sm:col-span-2">
        <SaveBar loading={loading} error={error} onCancel={onDone} />
      </div>
    </form>
  );
}

/* ---------------- Intro Video ---------------- */
function VideoTab({ settings }) {
  const { submit, loading, error } = useFormSubmit(saveSettings);
  return (
    <form onSubmit={submit} className="flex max-w-lg flex-col gap-5 rounded-2xl border border-white/10 bg-card/60 p-6">
      <div>
        <p className="text-sm text-muted">Current intro video</p>
        {settings?.intro_video_url ? (
          <video src={settings.intro_video_url} controls className="mt-2 w-full rounded-xl border border-white/10" />
        ) : (
          <p className="mt-1 text-xs text-muted">Using default <code>/intro-video.mp4</code></p>
        )}
      </div>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted">Replace video (mp4)</span>
        <input type="file" name="videoFile" accept="video/*" className="text-xs text-muted file:mr-3 file:rounded-full file:border-0 file:bg-red file:px-4 file:py-2 file:text-white" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted">Poster image (optional)</span>
        <input type="file" name="posterFile" accept="image/*" className="text-xs text-muted file:mr-3 file:rounded-full file:border-0 file:bg-red file:px-4 file:py-2 file:text-white" />
      </label>
      <SaveBar loading={loading} error={error} />
    </form>
  );
}

/* ---------------- Gallery ---------------- */
function GalleryTab({ items }) {
  const formRef = useRef(null);
  const { submit, loading, error } = useFormSubmit(uploadGalleryImage, () => formRef.current?.reset());
  const router = useRouter();
  const onDelete = async (id) => {
    if (!confirm("Delete this image?")) return;
    await deleteGalleryImage(id);
    router.refresh();
  };
  const copy = (url) => navigator.clipboard?.writeText(url);

  return (
    <div className="flex flex-col gap-6">
      <form ref={formRef} onSubmit={submit} className="flex flex-wrap items-end gap-4 rounded-2xl border border-white/10 bg-card/60 p-5">
        <Field label="Title" name="title" placeholder="Image title" />
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted">Image</span>
          <input type="file" name="imageFile" accept="image/*" required className="text-xs text-muted file:mr-3 file:rounded-full file:border-0 file:bg-red file:px-4 file:py-2 file:text-white" />
        </label>
        <SaveBar loading={loading} error={error} />
      </form>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.length === 0 && <Empty>No images uploaded yet.</Empty>}
        {items.map((g) => (
          <div key={g.id} className="group relative overflow-hidden rounded-xl border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g.image_url} alt={g.title} className="aspect-square w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-black/70 px-2 py-1.5 opacity-0 transition group-hover:opacity-100">
              <button onClick={() => copy(g.image_url)} className="text-[11px] text-white hover:text-red">Copy URL</button>
              <button onClick={() => onDelete(g.id)} className="text-[11px] text-red">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Empty({ children }) {
  return (
    <p className="col-span-full rounded-2xl border border-dashed border-white/10 bg-card/40 px-5 py-8 text-center text-sm text-muted">
      {children}
    </p>
  );
}
