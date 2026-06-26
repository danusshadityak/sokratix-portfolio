import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client (uses the public anon key).
// Returns null if env vars are not configured yet, so the app
// can still render fallback content before Supabase is wired up.
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createBrowserClient(url, key);
}
