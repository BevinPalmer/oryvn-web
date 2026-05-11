import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-nav-border bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 sm:flex-row sm:items-center md:px-8">
        <span className="text-nav font-normal uppercase tracking-[0.18em] text-text-dim">
          ORYVN
        </span>
        <div className="flex flex-wrap gap-8">
          <Link
            href="#"
            className="label-caps text-text-muted transition hover:text-text-secondary"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="label-caps text-text-muted transition hover:text-text-secondary"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="label-caps text-text-muted transition hover:text-text-secondary"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
