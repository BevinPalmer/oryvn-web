"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname === "/dashboard";
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  function signOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("oryvn_token");
    }
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-nav-border bg-bg/95 backdrop-blur-sm">
      {mobileOpen && !isDashboard ? (
        <button
          type="button"
          className="fixed inset-0 top-[52px] z-40 bg-black/50 backdrop-blur-[2px] md:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
      <nav className="relative z-50 mx-auto flex h-[52px] max-w-6xl items-center justify-between gap-3 px-5 md:px-8">
        <Link
          href="/"
          className="shrink-0 text-nav font-normal uppercase tracking-[0.18em] text-logo"
        >
          ORYVN
        </Link>

        {!isDashboard ? (
          <>
            <div className="hidden flex-1 items-center justify-end gap-8 md:flex">
              <Link
                href="/#how-it-works"
                className="label-caps text-text-muted transition hover:text-text-secondary"
              >
                How it works
              </Link>
              <Link
                href="/#pricing"
                className="label-caps text-text-muted transition hover:text-text-secondary"
              >
                Pricing
              </Link>
              <Link
                href="/login"
                className="label-caps text-text-muted transition hover:text-text-secondary"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-sm bg-accent px-4 py-2 text-label font-medium uppercase tracking-label text-black transition hover:bg-accent-hover"
              >
                Start free
              </Link>
            </div>

            <div className="flex flex-1 items-center justify-end gap-2.5 md:hidden">
              <Link
                href="/signup"
                className="rounded-sm bg-accent px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-black transition hover:bg-accent-hover sm:px-4 sm:text-label sm:tracking-label"
              >
                Start free
              </Link>
              <button
                type="button"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-menu"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((o) => !o)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border text-text-secondary transition hover:border-accent hover:text-text-primary"
              >
                {mobileOpen ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div
              id="mobile-nav-menu"
              aria-hidden={!mobileOpen}
              className={`absolute left-0 right-0 top-full z-50 border-b border-nav-border bg-bg shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out md:hidden ${
                mobileOpen
                  ? "pointer-events-auto max-h-[min(88vh,640px)] translate-y-0 opacity-100"
                  : "pointer-events-none max-h-0 -translate-y-1 overflow-hidden border-b-0 opacity-0"
              }`}
            >
              <div className="flex flex-col items-center px-6 py-10 sm:px-8 sm:py-12">
                <div className="flex w-full max-w-md flex-col items-center text-center">
                  <Link
                    href="/#how-it-works"
                    className="w-full rounded-md py-5 text-2xl font-medium uppercase tracking-[0.08em] text-text-secondary transition hover:bg-surface2 hover:text-text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    How it works
                  </Link>
                  <Link
                    href="/#pricing"
                    className="w-full rounded-md py-5 text-2xl font-medium uppercase tracking-[0.08em] text-text-secondary transition hover:bg-surface2 hover:text-text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/login"
                    className="w-full rounded-md py-5 text-2xl font-medium uppercase tracking-[0.08em] text-text-secondary transition hover:bg-surface2 hover:text-text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    Log in
                  </Link>
                </div>
                <Link
                  href="/signup"
                  className="mt-6 flex w-full max-w-md items-center justify-center rounded-sm bg-accent px-8 py-3 text-center text-[14px] font-medium leading-snug text-black transition hover:bg-accent-hover"
                  onClick={() => setMobileOpen(false)}
                >
                  Start free — no card required
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-end gap-6 md:gap-8">
            <Link
              href="/#pricing"
              className="label-caps text-text-muted transition hover:text-text-secondary"
            >
              Pricing
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="label-caps text-text-muted transition hover:text-text-secondary"
            >
              Sign out
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
