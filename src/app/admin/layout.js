import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Logo from "@/components/ui/Logo";
import SignOutButton from "@/components/admin/SignOutButton";

export const metadata = {
  title: "Sokratix — Admin",
};

export default async function AdminLayout({ children }) {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <div className="max-w-lg rounded-3xl border border-yellow-500/30 bg-yellow-500/10 p-8 text-center">
          <h1 className="font-display text-xl font-semibold text-white">
            Supabase not configured
          </h1>
          <p className="mt-3 text-sm text-muted">
            Add <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, and{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code>, then
            restart the dev server. See <code>README.md</code> for the full setup.
          </p>
          <a href="/" className="mt-5 inline-block text-sm text-red hover:underline">
            ← Back to site
          </a>
        </div>
      </main>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-ink/80 px-5 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="rounded-full border border-red/30 bg-red/10 px-2.5 py-0.5 text-xs font-semibold text-red">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-sm text-muted hover:text-white">
            View site ↗
          </a>
          <span className="hidden text-sm text-muted sm:inline">{user.email}</span>
          <SignOutButton />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
