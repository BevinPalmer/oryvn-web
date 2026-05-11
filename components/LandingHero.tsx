import Link from "next/link";

export default function LandingHero() {
  return (
    <section className="mx-auto max-w-4xl px-5 pb-20 pt-20 text-center md:px-8 md:pt-28">
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-pill-border bg-surface px-4 py-2 text-label uppercase tracking-[0.12em] text-text-muted">
        <span className="text-accent" aria-hidden>
          ·
        </span>
        AI retouching
        <span className="text-accent" aria-hidden>
          ·
        </span>
        Built for Photoshop
        <span className="text-accent" aria-hidden>
          ·
        </span>
      </div>

      <h1 className="mt-10 font-headline text-[clamp(2rem,6vw,3.5rem)] leading-[1.08] text-text-primary md:text-[56px]">
        The last retouching tool
        <br />
        you&apos;ll ever need.
      </h1>

      <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.75] text-[#666666]">
        Oryvn is a senior retoucher living inside Photoshop. Tell it what you need — it knows
        frequency separation, Camera Raw, smart objects, color grading, and file organization at
        the highest level.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <Link
          href="/signup"
          className="inline-flex min-w-[200px] items-center justify-center rounded-sm bg-accent px-8 py-3 text-[14px] font-medium text-black transition hover:bg-accent-hover"
        >
          Start free — no card required
        </Link>
        <Link
          href="#plugin-preview"
          className="inline-flex min-w-[200px] items-center justify-center rounded-sm border border-border2 bg-transparent px-8 py-3 text-[14px] font-medium text-text-secondary transition hover:border-accent hover:text-text-primary"
        >
          See it in action
        </Link>
      </div>

      <p className="mt-10 text-[13px] leading-relaxed text-text-muted">
        7-day free trial · Your photos never leave Photoshop · No learning curve
      </p>
    </section>
  );
}
