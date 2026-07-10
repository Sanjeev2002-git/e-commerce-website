const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function getAuthHeaders() {
  const raw = typeof window !== "undefined" ? window.localStorage.getItem("marketplace_auth") : null;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return { Authorization: `Bearer ${parsed.token}` };
  } catch {
    return {};
  }
}

export async function fetchJson(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers || {});
  headers.set("Content-Type", "application/json");
  const authHeaders = getAuthHeaders();
  Object.entries(authHeaders).forEach(([key, value]) => headers.set(key, value));

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}

export async function signup(name: string, email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Signup failed");
  return data;
}

/** Full login/session history for the current user. */
export async function getLoginHistory() {
  return fetchJson("/auth/sessions");
}

/** Admin: every order across all customers. */
export async function getAllOrdersAdmin(page = 1, limit = 20) {
  return fetchJson(`/orders/admin/all?page=${page}&limit=${limit}`);
}

/** Delivery: orders currently shipped / out for delivery. */
export async function getAssignedDeliveries(page = 1, limit = 20) {
  return fetchJson(`/orders/delivery/assigned?page=${page}&limit=${limit}`);
}
