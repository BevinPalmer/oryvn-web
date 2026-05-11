import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-nav-border bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 md:flex-row md:items-start md:justify-between md:gap-8 md:px-8">
        <div className="max-w-xs">
          <span className="text-nav font-normal uppercase tracking-[0.18em] text-text-dim">ORYVN</span>
          <p className="mt-3 text-[14px] leading-relaxed text-text-muted">AI retouching for Photoshop.</p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-12 md:flex-col md:items-end">
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="label-caps text-text-muted transition hover:text-text-secondary"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="label-caps text-text-muted transition hover:text-text-secondary"
            >
              X (Twitter)
            </a>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
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
      </div>
    </footer>
  );
}
