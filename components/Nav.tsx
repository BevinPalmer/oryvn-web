"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname === "/dashboard";

  function signOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("oryvn_token");
    }
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-nav-border bg-bg/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-[52px] max-w-6xl items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="text-nav font-normal uppercase tracking-[0.18em] text-logo"
        >
          ORYVN
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          {!isDashboard && (
            <>
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
            </>
          )}
          {isDashboard && (
            <>
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
