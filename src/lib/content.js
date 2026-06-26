import { createClient } from "@/lib/supabase/server";
import { PROJECTS, CASE_STUDIES } from "@/lib/data";

// Fetches content from Supabase, falling back to the static defaults
// in data.js when Supabase isn't configured or a table is empty.
// This keeps the public site fully functional before any admin edits.
export async function getContent() {
  const supabase = await createClient();
  if (!supabase) {
    return {
      projects: PROJECTS,
      caseStudies: CASE_STUDIES,
      introVideo: "/intro-video.mp4",
      introPoster: null,
    };
  }

  const [projectsRes, caseRes, settingsRes] = await Promise.all([
    supabase.from("projects").select("*").order("sort_order", { ascending: true }),
    supabase.from("case_studies").select("*").order("sort_order", { ascending: true }),
    supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
  ]);

  const projects =
    !projectsRes.error && projectsRes.data?.length ? projectsRes.data : PROJECTS;
  const caseStudies =
    !caseRes.error && caseRes.data?.length ? caseRes.data : CASE_STUDIES;
  const settings = settingsRes.error ? null : settingsRes.data;

  return {
    projects,
    caseStudies,
    introVideo: settings?.intro_video_url || "/intro-video.mp4",
    introPoster: settings?.intro_poster_url || null,
  };
}
