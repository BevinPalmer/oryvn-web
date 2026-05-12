"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { resetPassword } from "@/lib/api";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email")?.trim() ?? "";

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await resetPassword(email.trim(), code.trim(), newPassword);
      if (!data?.ok) {
        const msg =
          typeof data?.error === "string" ? data.error : "Reset failed. Check your code and try again.";
        setError(msg);
        return;
      }
      router.push("/login?reset=1");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[400px] rounded-lg border border-border bg-surface p-8 shadow-xl">
      <p className="text-center text-nav font-normal uppercase tracking-[0.18em] text-logo">ORYVN</p>
      <h1 className="mt-8 text-center font-headline text-2xl text-text-primary">Set new password</h1>
      <p className="mt-4 text-center text-[14px] leading-relaxed text-text-muted">
        Enter the code from your email and choose a new password (8+ characters).
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
          <label htmlFor="code" className="label-caps">
            Reset code
          </label>
          <input
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            autoComplete="one-time-code"
            required
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="mt-2 w-full rounded-md border border-border2 bg-surface2 px-3 py-2.5 text-[14px] text-text-primary outline-none transition placeholder:text-text-dim focus:border-accent focus:ring-1 focus:ring-accent"
            placeholder="6-digit code"
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="label-caps">
            New password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
          {loading ? "Updating…" : "Update password"}
        </button>
      </form>
      <p className="mt-8 text-center text-[14px] text-text-muted">
        <Link href="/login" className="text-accent underline-offset-4 hover:text-accent-hover hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-52px)] items-center justify-center bg-bg px-5 py-16">
      <Suspense
        fallback={
          <div className="w-full max-w-[400px] rounded-lg border border-border bg-surface p-8 text-center text-text-muted shadow-xl">
            Loading…
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
