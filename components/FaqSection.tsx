"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Does Oryvn work with all versions of Photoshop?",
    a: "Oryvn ships as a UXP plugin for modern Photoshop on desktop. Use the latest Photoshop release your studio standardizes on; very old versions may not support UXP or required APIs.",
  },
  {
    q: "Do my photos leave Photoshop?",
    a: "Your pixels stay in your document. The plugin sends prompts and metadata needed for retouching guidance — not a wholesale upload of your catalog — over an encrypted connection to our service.",
  },
  {
    q: "What happens when I run out of credits?",
    a: "Retouch actions count against your plan limits. When you hit the cap for the month, you can upgrade or wait for your usage window to reset, depending on your plan.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Subscriptions bill monthly or yearly; cancel from your account before renewal and you will not be charged for the next cycle.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — start with a free trial window with full access so you can judge quality on your own files before you subscribe.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="border-b border-nav-border bg-bg py-20 md:py-24">
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        <p className="text-center label-caps text-text-dim">FAQ</p>
        <h2 className="mt-3 text-center font-headline text-[clamp(1.5rem,3.5vw,2.25rem)] text-text-primary">
          Common questions
        </h2>
        <div className="mt-12 flex flex-col gap-2">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="rounded-lg border border-border bg-surface px-4 transition-colors hover:border-border2 md:px-5"
              >
                <button
                  type="button"
                  id={`faq-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left md:py-5"
                >
                  <span className="text-[15px] font-medium leading-snug text-text-primary">{item.q}</span>
                  <span
                    className={`shrink-0 text-accent transition-transform duration-300 ease-out ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="inline-block">
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-${i}`}
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="border-t border-border pb-4 pr-2 text-[14px] leading-[1.75] text-text-muted md:pb-5">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
