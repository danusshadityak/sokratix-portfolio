"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();
  const configured = Boolean(supabase);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!supabase) {
      setError("Supabase is not configured. Add your keys to .env.local first.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-red/20 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-glow"
      >
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <Logo className="text-2xl" />
          <h1 className="font-display text-xl font-semibold">Admin Login</h1>
          <p className="text-sm text-muted">Sign in to manage your portfolio content.</p>
        </div>

        {!configured && (
          <p className="mb-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-xs text-yellow-200">
            Supabase keys are not set. See <code>README.md</code> to configure
            <code> .env.local</code>.
          </p>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-muted">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-white/10 bg-soft px-4 py-3 text-white outline-none focus:border-red"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-muted">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-white/10 bg-soft px-4 py-3 text-white outline-none focus:border-red"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          {error && <p className="text-sm text-red">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-red px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-red-deep disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <a href="/" className="mt-5 block text-center text-xs text-muted hover:text-white">
          ← Back to site
        </a>
      </motion.div>
    </main>
  );
}
