"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { CheckoutBilling, CheckoutPlan } from "@/lib/api";
import { getCredits, startCheckout } from "@/lib/api";
import BillingToggle from "@/components/BillingToggle";

function pickNumber(obj: Record<string, unknown>, keys: string[]): number | null {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "number" && !Number.isNaN(v)) return v;
    if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) {
      return Number(v);
    }
  }
  return null;
}

function pickString(obj: Record<string, unknown>, keys: string[]): string | null {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v;
  }
  return null;
}

function normalizeHistory(raw: unknown): { title: string; meta?: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item, i) => {
    if (typeof item === "string") return { title: item };
    if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      const title =
        pickString(o, ["prompt", "message", "description", "label", "title", "summary"]) ??
        `Retouch ${i + 1}`;
      const meta =
        pickString(o, ["created_at", "createdAt", "date", "time", "timestamp"]) ?? undefined;
      return { title, meta };
    }
    return { title: `Retouch ${i + 1}` };
  });
}

type CreditsPayload = {
  plan?: string;
  retouchesUsed?: number;
  retouchesLimit?: number;
  percentUsed?: number;
  daysUntilReset?: number;
  email?: string;
  credits?: number;
  history?: unknown;
};

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [usage, setUsage] = useState<CreditsPayload | null>(null);
  const [history, setHistory] = useState<{ title: string; meta?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<CheckoutPlan | null>(null);
  const [billing, setBilling] = useState<CheckoutBilling>("monthly");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t =
      typeof window !== "undefined" ? localStorage.getItem("oryvn_token") : null;
    if (!t) {
      router.replace("/login");
      return;
    }
    setToken(t);
  }, [router]);

  const loadCredits = useCallback(async (t: string) => {
    setLoading(true);
    try {
      const data = (await getCredits(t)) as CreditsPayload & Record<string, unknown>;
      if (data && typeof data === "object") {
        setUsage({
          plan: pickString(data as Record<string, unknown>, ["plan"]) ?? "trial",
          retouchesUsed: pickNumber(data as Record<string, unknown>, ["retouchesUsed"]) ?? 0,
          retouchesLimit: pickNumber(data as Record<string, unknown>, ["retouchesLimit"]) ?? 0,
          percentUsed: pickNumber(data as Record<string, unknown>, ["percentUsed"]) ?? 0,
          daysUntilReset: pickNumber(data as Record<string, unknown>, ["daysUntilReset"]) ?? 0,
          email: pickString(data as Record<string, unknown>, ["email"]) ?? undefined,
        });
        const hist =
          (data as Record<string, unknown>).history ??
          (data as Record<string, unknown>).retouches ??
          (data as Record<string, unknown>).activity;
        setHistory(normalizeHistory(hist));
      } else {
        setUsage(null);
        setHistory([]);
      }
    } catch {
      setUsage(null);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    loadCredits(token);
  }, [token, loadCredits]);

  async function handleCheckout(plan: CheckoutPlan) {
    if (!token) return;
    setCheckoutLoading(plan);
    try {
      const data = await startCheckout(token, plan, billing);
      const url =
        typeof data?.url === "string"
          ? data.url
          : typeof data?.checkoutUrl === "string"
            ? data.checkoutUrl
            : typeof data?.sessionUrl === "string"
              ? data.sessionUrl
              : null;
      if (url) {
        window.location.href = url;
        return;
      }
    } finally {
      setCheckoutLoading(null);
    }
  }

  function truncateJwt(t: string) {
    if (t.length <= 32) return t;
    return `${t.slice(0, 32)}…`;
  }

  async function copyToken() {
    if (!token) return;
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const placeholderRows = [
    "Warm grade on portrait_12.psd",
    "Heal + frequency on product_flat.tif",
    "Background cleanup — studio set",
    "Color match to reference swatch",
  ];

  if (!token) {
    return <div className="min-h-[calc(100vh-52px)] bg-bg" aria-hidden />;
  }

  const activityRows: { title: string; meta?: string }[] = history.length
    ? history
    : placeholderRows.map((t) => ({ title: t }));

  const planLabel = (usage?.plan || "trial").toUpperCase();
  const pct = Math.min(100, Math.max(0, usage?.percentUsed ?? 0));
  const used = usage?.retouchesUsed ?? 0;
  const limit = usage?.retouchesLimit ?? 0;
  const daysLeft = usage?.daysUntilReset ?? 0;
  const barColor =
    pct > 95 ? "bg-red-500" : pct > 80 ? "bg-amber-500" : "bg-accent";

  return (
    <div className="min-h-[calc(100vh-52px)] bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[800px] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-10">
            <div>
              <p className="label-caps">{planLabel}</p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border2">
                <div
                  className={`h-full rounded-full transition-all ${barColor}`}
                  style={{ width: loading ? "0%" : `${pct}%` }}
                />
              </div>
              <p className="mt-2 text-[13px] text-text-muted">
                {loading
                  ? "—"
                  : limit > 0
                    ? `${used} of ${limit} this month`
                    : `${used} used · trial window ended`}
              </p>
              {pct > 95 ? (
                <p className="mt-2 text-[13px] text-red-400/90">
                  Running low — upgrade your plan
                </p>
              ) : null}
              <p className="mt-1 text-[13px] text-text-secondary">
                {loading ? "—" : `Resets in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`}
              </p>

              <div className="mt-6 max-w-xs">
                <p className="label-caps">Billing</p>
                <div className="mt-2">
                  <BillingToggle value={billing} onChange={setBilling} />
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCheckout("pro")}
                disabled={checkoutLoading !== null}
                className="mt-6 rounded-sm bg-accent px-6 py-2.5 text-[13px] font-medium text-black transition hover:bg-accent-hover disabled:opacity-50"
              >
                {checkoutLoading === "pro" ? "Opening…" : "Buy more"}
              </button>
              <div className="mt-4 flex flex-wrap gap-2">
                {(
                  [
                    { id: "starter" as const, label: "Starter" },
                    { id: "pro" as const, label: "Pro" },
                    { id: "studio" as const, label: "Studio" },
                  ] as const
                ).map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleCheckout(id)}
                    disabled={checkoutLoading !== null}
                    className="rounded border border-border2 px-3 py-1.5 text-label uppercase tracking-label text-text-muted transition hover:border-accent hover:text-accent disabled:opacity-50"
                  >
                    {checkoutLoading === id ? "…" : label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="label-caps">Plugin token</p>
              <div className="mt-3 rounded-md border border-border bg-surface2 px-3 py-3 font-mono text-xs leading-relaxed text-text-secondary break-all">
                {truncateJwt(token)}
              </div>
              <button
                type="button"
                onClick={copyToken}
                className="mt-3 text-label uppercase tracking-label text-accent underline-offset-4 hover:text-accent-hover hover:underline"
              >
                {copied ? "Copied!" : "Copy token"}
              </button>
            </div>
          </div>

          <div>
            <p className="label-caps">Recent activity</p>
            <ul className="mt-4 divide-y divide-border overflow-hidden rounded-md border border-border bg-surface2">
              {activityRows.map((row, i) => (
                <li
                  key={`${row.title}-${i}`}
                  className="flex flex-col gap-1 px-4 py-3.5 text-[13px] text-text-muted"
                >
                  <span className={history.length ? "text-text-primary" : "text-text-muted"}>
                    {row.title}
                  </span>
                  {row.meta ? (
                    <span className="text-[11px] text-text-dim">{row.meta}</span>
                  ) : null}
                  {!history.length && !row.meta ? (
                    <span className="text-[11px] text-text-dim">Placeholder</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
