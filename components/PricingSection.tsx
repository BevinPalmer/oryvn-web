"use client";

import Link from "next/link";
import { useState } from "react";
import BillingToggle, { type BillingPeriod } from "./BillingToggle";

function signupHref(plan: "trial" | "starter" | "pro" | "studio", billing: BillingPeriod) {
  if (plan === "trial") return "/signup";
  const b = billing === "yearly" ? "yearly" : "monthly";
  return `/signup?plan=${plan}&billing=${b}`;
}

export default function PricingSection() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const isYearly = billing === "yearly";

  const tiers = [
    {
      id: "trial" as const,
      name: "Free trial",
      price: "$0",
      sub: "7 days, no card",
      desc: "",
      features: ["Full access 7 days", "No credit card"],
      cta: "Start free",
      highlight: false,
      popular: false,
    },
    {
      id: "starter" as const,
      name: "Artist",
      price: isYearly ? "$23/mo" : "$29/mo",
      sub: isYearly ? "billed annually" : "billed monthly",
      desc: "For solo photographers and retouchers.",
      features: ["All retouching tools", "Layer organization", "Session history"],
      cta: "Get Artist",
      highlight: false,
      popular: false,
    },
    {
      id: "pro" as const,
      name: "Professional",
      price: isYearly ? "$63/mo" : "$79/mo",
      sub: isYearly ? "billed annually" : "billed monthly",
      desc: "For working retouchers with active client work.",
      features: [
        "Everything in Artist",
        "Batch retouching",
        "Priority support",
        "Custom presets",
      ],
      cta: "Get Professional",
      highlight: true,
      popular: true,
    },
    {
      id: "studio" as const,
      name: "Studio",
      price: isYearly ? "$159/mo" : "$199/mo",
      sub: isYearly ? "billed annually" : "billed monthly",
      desc: "For production studios.",
      features: [
        "Everything in Pro",
        "Multiple seats",
        "Dedicated support",
        "Early access features",
      ],
      cta: "Get Studio",
      highlight: false,
      popular: false,
    },
  ];

  return (
    <section className="border-b border-nav-border bg-bg py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
        <h2 className="font-headline text-[clamp(1.75rem,4vw,2.75rem)] text-text-primary">
          One tool. One price. Cancel anytime.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.75] text-text-muted">
          Less than one hour of a freelance retoucher&apos;s time.
        </p>

        <div className="mt-10 flex justify-center">
          <BillingToggle value={billing} onChange={setBilling} />
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-lg border bg-surface p-6 text-left ${
                tier.highlight
                  ? "border-accent shadow-[0_0_0_1px_rgba(196,116,138,0.45)]"
                  : "border-border"
              }`}
            >
              {tier.popular ? (
                <span className="absolute -top-2.5 right-4 rounded-sm bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-black">
                  Most popular
                </span>
              ) : null}
              <p className="label-caps text-text-dim">{tier.name}</p>
              <p className="mt-4 font-headline text-3xl text-text-primary">{tier.price}</p>
              <p className="mt-1 text-[13px] text-text-muted">{tier.sub}</p>
              {tier.desc ? (
                <p className="mt-4 text-[14px] leading-[1.75] text-text-muted">{tier.desc}</p>
              ) : null}
              <ul className="mt-6 flex flex-col gap-2 text-[13px] leading-relaxed text-text-muted">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-accent" aria-hidden>
                      ·
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={signupHref(tier.id, billing)}
                className={`mt-8 inline-block w-full rounded-sm py-2.5 text-center text-[13px] font-medium transition ${
                  tier.highlight
                    ? "bg-accent text-black hover:bg-accent-hover"
                    : "border border-border2 text-text-secondary hover:border-accent hover:text-text-primary"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
