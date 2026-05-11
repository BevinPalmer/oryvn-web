"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { login, storePluginToken } from "@/lib/api";

function pickToken(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  const nested = o.data && typeof o.data === "object" ? (o.data as Record<string, unknown>) : null;
  const candidates = [o.token, o.access_token, o.accessToken, o.jwt, nested?.token];
  for (const c of candidates) {
    if (typeof c === "string" && c.length > 0) return c;
  }
  return null;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pluginHandoffOk, setPluginHandoffOk] = useState(false);

  const pluginSource = searchParams.get("source") === "plugin";
  const pluginSessionId = searchParams.get("session_id")?.trim() ?? "";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await login(email, password);
      const token = pickToken(data);
      if (!token) {
        setError("Email or password incorrect.");
        return;
      }
      localStorage.setItem("oryvn_token", token);

      if (pluginSource && pluginSessionId) {
        try {
          await storePluginToken(pluginSessionId, token);
          setPluginHandoffOk(true);
        } catch (handoffErr) {
          setError(
            handoffErr instanceof Error
              ? `${handoffErr.message} You can still open the dashboard below.`
              : "Could not notify the Photoshop plugin. You can still use the dashboard."
          );
        }
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Email or password incorrect.");
    } finally {
      setLoading(false);
    }
  }

  if (pluginHandoffOk) {
    return (
      <div className="w-full max-w-[400px] rounded-lg border border-border bg-surface p-8 shadow-xl">
        <p className="text-center text-nav font-normal uppercase tracking-[0.18em] text-logo">ORYVN</p>
        <h1 className="mt-8 text-center font-headline text-2xl text-text-primary">You&apos;re signed in</h1>
        <p className="mt-6 text-center text-[15px] leading-relaxed text-text-muted">
          Return to Photoshop — the ORYVN panel will finish connecting on its own.
        </p>
        <Link
          href="/dashboard"
          className="mt-10 flex w-full items-center justify-center rounded-sm bg-accent py-3 text-[14px] font-medium text-black transition hover:bg-accent-hover"
        >
          Open dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[400px] rounded-lg border border-border bg-surface p-8 shadow-xl">
      <p className="text-center text-nav font-normal uppercase tracking-[0.18em] text-logo">ORYVN</p>
      <h1 className="mt-8 text-center font-headline text-2xl text-text-primary">Welcome back</h1>
      {pluginSource && pluginSessionId ? (
        <p className="mt-4 text-center text-[13px] text-text-muted">
          After you sign in, we&apos;ll send your session back to the Photoshop plugin.
        </p>
      ) : null}
      <form className="mt-10 space-y-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email" className="label-caps">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-md border border-border2 bg-surface2 px-3 py-2.5 text-[14px] text-text-primary outline-none transition placeholder:text-text-dim focus:border-accent focus:ring-1 focus:ring-accent"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="label-caps">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-md border border-border2 bg-surface2 px-3 py-2.5 text-[14px] text-text-primary outline-none transition placeholder:text-text-dim focus:border-accent focus:ring-1 focus:ring-accent"
            placeholder="••••••••"
          />
        </div>
        {error ? (
          <p className="text-[13px] text-red-400/90" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-sm bg-accent py-3 text-[14px] font-medium text-black transition hover:bg-accent-hover disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="mt-8 text-center text-[14px] text-text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-accent underline-offset-4 hover:text-accent-hover hover:underline">
          Start free
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-52px)] items-center justify-center bg-bg px-5 py-16">
      <Suspense
        fallback={
          <div className="w-full max-w-[400px] rounded-lg border border-border bg-surface p-8 text-center text-text-muted shadow-xl">
            Loading…
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
