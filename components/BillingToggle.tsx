"use client";

export type BillingPeriod = "monthly" | "yearly";

export default function BillingToggle({
  value,
  onChange,
}: {
  value: BillingPeriod;
  onChange: (b: BillingPeriod) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
      <div
        className="relative inline-flex h-11 shrink-0 rounded-full border border-border bg-surface2 p-1"
        role="group"
        aria-label="Billing period"
      >
        <div
          className="pointer-events-none absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-full bg-accent shadow-[0_0_0_1px_rgba(0,0,0,0.45),0_10px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] will-change-transform"
          style={{
            transform:
              value === "yearly" ? "translateX(calc(100% + 0.25rem))" : "translateX(0)",
          }}
        />
        <button
          type="button"
          onClick={() => onChange("monthly")}
          className={`relative z-10 min-w-[6.5rem] rounded-full px-4 py-2 text-label font-medium uppercase tracking-label transition-colors ${
            value === "monthly"
              ? "text-black"
              : "text-text-muted hover:text-text-secondary"
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => onChange("yearly")}
          className={`relative z-10 min-w-[6.5rem] rounded-full px-4 py-2 text-label font-medium uppercase tracking-label transition-colors ${
            value === "yearly"
              ? "text-black"
              : "text-text-muted hover:text-text-secondary"
          }`}
        >
          Yearly
        </button>
      </div>
      <div
        className={`min-h-[1.5rem] transition-opacity duration-300 ${
          value === "yearly" ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={value !== "yearly" ? true : undefined}
      >
        <span className="inline-block rounded-sm border border-accent/50 bg-accent-dim px-2.5 py-1 text-label font-medium uppercase tracking-label text-accent">
          Save 20%
        </span>
      </div>
    </div>
  );
}
