"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { forgotPassword } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await forgotPassword(email.trim());
      if (!data?.ok) {
        setError(typeof data?.error === "string" ? data.error : "Request failed.");
        return;
      }
      setSent(true);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-52px)] items-center justify-center bg-bg px-5 py-16">
      <div className="w-full max-w-[400px] rounded-lg border border-border bg-surface p-8 shadow-xl">
        <p className="text-center text-nav font-normal uppercase tracking-[0.18em] text-logo">ORYVN</p>
        <h1 className="mt-8 text-center font-headline text-2xl text-text-primary">Reset password</h1>
        {sent ? (
          <>
            <p className="mt-6 text-center text-[15px] leading-relaxed text-text-muted">
              Check your email for a reset code.
            </p>
            <p className="mt-4 text-center text-[13px] leading-relaxed text-text-dim">
              Email delivery is not wired yet — your code is printed in the server logs (e.g. Railway) for testing.
            </p>
            <Link
              href={`/reset-password?email=${encodeURIComponent(email.trim())}`}
              className="mt-8 flex w-full items-center justify-center rounded-sm bg-accent py-3 text-[14px] font-medium text-black transition hover:bg-accent-hover"
            >
              Enter reset code
            </Link>
            <Link
              href="/login"
              className="mt-4 block text-center text-[14px] text-text-muted underline-offset-4 hover:text-accent hover:underline"
            >
              Back to sign in
            </Link>
          </>
        ) : (
          <>
            <p className="mt-4 text-center text-[14px] leading-relaxed text-text-muted">
              Enter your account email and we&apos;ll send a reset code.
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
                {loading ? "Sending…" : "Send reset code"}
              </button>
            </form>
            <p className="mt-8 text-center text-[14px] text-text-muted">
              <Link href="/login" className="text-accent underline-offset-4 hover:text-accent-hover hover:underline">
                Back to sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
