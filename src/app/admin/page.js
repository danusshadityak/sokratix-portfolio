import { createClient } from "@/lib/supabase/server";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();

  // The layout already shows a setup notice when Supabase is unconfigured,
  // but the page still executes — guard against a null client.
  if (!supabase) return null;

  const [projects, caseStudies, gallery, settings] = await Promise.all([
    supabase.from("projects").select("*").order("sort_order", { ascending: true }),
    supabase.from("case_studies").select("*").order("sort_order", { ascending: true }),
    supabase.from("gallery").select("*").order("created_at", { ascending: false }),
    supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
  ]);

  return (
    <AdminDashboard
      initialProjects={projects.data || []}
      initialCaseStudies={caseStudies.data || []}
      initialGallery={gallery.data || []}
      settings={settings.data || null}
      errors={{
        projects: projects.error?.message || null,
        caseStudies: caseStudies.error?.message || null,
        gallery: gallery.error?.message || null,
      }}
    />
  );
}
