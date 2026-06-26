import { createClient } from "@supabase/supabase-js";

// Service-role Supabase client for privileged admin writes.
// SERVER-ONLY — never import this into a client component.
// Uses the service-role key which bypasses Row Level Security.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
