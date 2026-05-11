import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="border-b border-nav-border bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <h2 className="font-headline text-[clamp(1.75rem,3.5vw,2.25rem)] text-text-primary">
          Start working with Oryvn today.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.75] text-text-muted">
          7 days free. No card. No setup. Just open Photoshop and tell it what you need.
        </p>
        <Link
          href="/signup"
          className="mt-10 inline-flex min-w-[200px] items-center justify-center rounded-sm bg-accent px-8 py-3 text-[14px] font-medium text-black transition hover:bg-accent-hover"
        >
          Start free trial
        </Link>
      </div>
    </section>
  );
}
