const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "") ?? "https://oryvnai.com";

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
