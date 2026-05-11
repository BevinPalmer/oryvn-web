"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await login(email, password);
      const token =
        data?.token ??
        data?.access_token ??
        data?.accessToken ??
        data?.jwt ??
        data?.data?.token;
      if (token && typeof token === "string") {
        localStorage.setItem("oryvn_token", token);
        router.push("/dashboard");
        return;
      }
      setError("Email or password incorrect.");
    } catch {
      setError("Email or password incorrect.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-52px)] items-center justify-center bg-bg px-5 py-16">
      <div className="w-full max-w-[400px] rounded-lg border border-border bg-surface p-8 shadow-xl">
        <p className="text-center text-nav font-normal uppercase tracking-[0.18em] text-logo">
          ORYVN
        </p>
        <h1 className="mt-8 text-center font-headline text-2xl text-text-primary">Welcome back</h1>
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
    </div>
  );
}
