"use client";

import { useEffect, useState } from "react";
import { RoleGuard } from "../../components/role-guard";
import { getAssignedDeliveries } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";

type Order = {
  id: string;
  status: string;
  createdAt: string;
};

function DeliveryDashboard() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAssignedDeliveries(1, 20)
      .then((res) => setOrders(res.data ?? []))
      .catch((err) => setError(err.message || "Failed to load deliveries"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Delivery Dashboard</h1>
          <p>Signed in as {user?.name} ({user?.email})</p>
        </div>
        <button onClick={logout}>Sign out</button>
      </header>

      <section style={{ marginTop: 24 }}>
        <h2>Orders to deliver</h2>
        {loading && <p>Loading…</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        {!loading && !error && orders.length === 0 && <p>Nothing shipped or out for delivery right now.</p>}
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
          {orders.map((order) => (
            <li key={order.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
              <strong>{order.id}</strong> — {order.status.replace(/_/g, " ")}
              <br />
              <span style={{ color: "#666", fontSize: 13 }}>{new Date(order.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default function DeliveryPage() {
  return (
    <RoleGuard allow={["delivery"]}>
      <DeliveryDashboard />
    </RoleGuard>
  );
}
