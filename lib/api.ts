/** Express API host (apex is the marketing site on Vercel). */
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "") ??
  "https://api.oryvnai.com";

export async function register(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function forgotPassword(email: string) {
  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, ...data };
}

export async function resetPassword(email: string, code: string, newPassword: string) {
  const res = await fetch(`${API_BASE}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code, newPassword }),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, ...data };
}

/** Called from the web app after plugin OAuth-style login so the UXP panel can pick up the JWT. */
export async function storePluginToken(sessionId: string, jwt: string) {
  const res = await fetch(`${API_BASE}/auth/store-plugin-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, jwt }),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: string };
  if (!res.ok) {
    throw new Error(data.error || "Plugin handoff failed");
  }
  return data;
}

export async function getCredits(token: string) {
  const res = await fetch(`${API_BASE}/user/credits`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export type CheckoutPlan = "starter" | "pro" | "studio";
export type CheckoutBilling = "monthly" | "yearly";

export async function startCheckout(
  token: string,
  plan: CheckoutPlan,
  billing: CheckoutBilling = "monthly"
) {
  const res = await fetch(`${API_BASE}/stripe/create-checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ plan, billing }),
  });
  return res.json();
}
