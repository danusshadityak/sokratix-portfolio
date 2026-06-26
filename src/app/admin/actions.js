"use server";

import { revalidatePath } from "next/cache";
import { createClient as createServerSupabase } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "media";

// Ensure the caller is an authenticated admin before any write.
async function requireUser() {
  const supabase = await createServerSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");
  return user;
}

// Upload a File to the media bucket and return its public URL + path.
async function uploadFile(admin, file, folder) {
  if (!file || typeof file === "string" || file.size === 0) return null;
  const ext = (file.name?.split(".").pop() || "bin").toLowerCase();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await admin.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType: file.type, upsert: false });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  const { data } = admin.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path };
}

function parseJSON(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    // Allow comma-separated entry as a convenience.
    return String(value)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
}

// ---------------- Projects ----------------
export async function saveProject(formData) {
  await requireUser();
  const admin = createAdminClient();
  if (!admin) throw new Error("Service role key not configured.");

  const id = formData.get("id") || undefined;
  const file = formData.get("imageFile");
  const uploaded = await uploadFile(admin, file, "projects");

  const row = {
    name: formData.get("name"),
    category: formData.get("category"),
    platform: formData.get("platform"),
    role: formData.get("role"),
    description: formData.get("description"),
    accent: formData.get("accent") || "#ff1a1a",
    behance_url: formData.get("behance_url") || "https://www.behance.net/danusshadityak",
    ux_focus: parseJSON(formData.get("ux_focus"), []),
    sort_order: Number(formData.get("sort_order") || 0),
    image_url: uploaded?.url || formData.get("image_url") || null,
  };

  const query = id
    ? admin.from("projects").update(row).eq("id", id)
    : admin.from("projects").insert(row);
  const { error } = await query;
  if (error) throw new Error(error.message);
  revalidatePath("/");
  return { ok: true };
}

export async function deleteProject(id) {
  await requireUser();
  const admin = createAdminClient();
  if (!admin) throw new Error("Service role key not configured.");
  const { error } = await admin.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  return { ok: true };
}

// ---------------- Case Studies ----------------
export async function saveCaseStudy(formData) {
  await requireUser();
  const admin = createAdminClient();
  if (!admin) throw new Error("Service role key not configured.");

  const id = formData.get("id") || undefined;
  const file = formData.get("imageFile");
  const uploaded = await uploadFile(admin, file, "case-studies");

  const row = {
    title: formData.get("title"),
    type: formData.get("type"),
    description: formData.get("description"),
    ux_focus: formData.get("ux_focus"),
    accent: formData.get("accent") || "#ff1a1a",
    behance_url: formData.get("behance_url") || "https://www.behance.net/danusshadityak",
    tags: parseJSON(formData.get("tags"), []),
    sort_order: Number(formData.get("sort_order") || 0),
    image_url: uploaded?.url || formData.get("image_url") || null,
  };

  const query = id
    ? admin.from("case_studies").update(row).eq("id", id)
    : admin.from("case_studies").insert(row);
  const { error } = await query;
  if (error) throw new Error(error.message);
  revalidatePath("/");
  return { ok: true };
}

export async function deleteCaseStudy(id) {
  await requireUser();
  const admin = createAdminClient();
  if (!admin) throw new Error("Service role key not configured.");
  const { error } = await admin.from("case_studies").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  return { ok: true };
}

// ---------------- Intro Video / Settings ----------------
export async function saveSettings(formData) {
  await requireUser();
  const admin = createAdminClient();
  if (!admin) throw new Error("Service role key not configured.");

  const videoFile = formData.get("videoFile");
  const posterFile = formData.get("posterFile");
  const video = await uploadFile(admin, videoFile, "intro");
  const poster = await uploadFile(admin, posterFile, "intro");

  const row = { id: 1 };
  if (video?.url) row.intro_video_url = video.url;
  if (poster?.url) row.intro_poster_url = poster.url;

  const { error } = await admin.from("site_settings").upsert(row, { onConflict: "id" });
  if (error) throw new Error(error.message);
  revalidatePath("/");
  return { ok: true };
}

// ---------------- Gallery ----------------
export async function uploadGalleryImage(formData) {
  await requireUser();
  const admin = createAdminClient();
  if (!admin) throw new Error("Service role key not configured.");

  const file = formData.get("imageFile");
  const uploaded = await uploadFile(admin, file, "gallery");
  if (!uploaded) throw new Error("No file provided.");

  const { error } = await admin
    .from("gallery")
    .insert({ title: formData.get("title") || "Untitled", image_url: uploaded.url, path: uploaded.path });
  if (error) throw new Error(error.message);
  return { ok: true, url: uploaded.url };
}

export async function deleteGalleryImage(id) {
  await requireUser();
  const admin = createAdminClient();
  if (!admin) throw new Error("Service role key not configured.");
  const { error } = await admin.from("gallery").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { ok: true };
}
