"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();
  const onClick = async () => {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-white/15 bg-card px-4 py-2 text-sm font-medium text-white transition hover:border-red/60"
    >
      Sign out
    </button>
  );
}
