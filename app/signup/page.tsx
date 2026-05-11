"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { register } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const data = await register(email, password);
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
      const msg =
        typeof data?.error === "string"
          ? data.error
          : typeof data?.message === "string"
            ? data.message
            : "Something went wrong. Please try again.";
      setError(msg);
    } catch {
      setError("Network error. Please try again.");
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
        <h1 className="mt-8 text-center font-headline text-2xl text-text-primary">
          Start your free trial
        </h1>
        <p className="mt-3 text-center text-[14px] leading-relaxed text-text-muted">
          7 days full access. No credit card required.
        </p>
        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
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
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-md border border-border2 bg-surface2 px-3 py-2.5 text-[14px] text-text-primary outline-none transition placeholder:text-text-dim focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="Min. 8 characters"
            />
          </div>
          <div>
            <label htmlFor="confirm" className="label-caps">
              Confirm password
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-2 w-full rounded-md border border-border2 bg-surface2 px-3 py-2.5 text-[14px] text-text-primary outline-none transition placeholder:text-text-dim focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="Repeat password"
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
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>
        <p className="mt-8 text-center text-[14px] text-text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-accent underline-offset-4 hover:text-accent-hover hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
