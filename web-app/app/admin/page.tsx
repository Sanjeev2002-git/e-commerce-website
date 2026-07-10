"use client";

import { useEffect, useState } from "react";
import { RoleGuard } from "../../components/role-guard";
import { getAllOrdersAdmin } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";

type Order = {
  id: string;
  status: string;
  totalAmount?: number;
  createdAt: string;
};

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllOrdersAdmin(1, 20)
      .then((res) => {
        setOrders(res.data ?? []);
        setTotal(res.total ?? 0);
      })
      .catch((err) => setError(err.message || "Failed to load orders"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Admin Dashboard</h1>
          <p>Signed in as {user?.name} ({user?.email})</p>
        </div>
        <button onClick={logout}>Sign out</button>
      </header>

      <section style={{ marginTop: 24 }}>
        <h2>All Orders ({total})</h2>
        {loading && <p>Loading orders…</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        {!loading && !error && orders.length === 0 && <p>No orders yet.</p>}
        {orders.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Order ID</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Status</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Total</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Placed</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{order.id}</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{order.status}</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{order.totalAmount ?? "—"}</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

export default function AdminPage() {
  return (
    <RoleGuard allow={["admin"]}>
      <AdminDashboard />
    </RoleGuard>
  );
}
