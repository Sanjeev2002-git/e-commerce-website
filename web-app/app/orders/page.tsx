"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchJson } from "../../lib/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const data = await fetchJson("/orders");
      setOrders(data.data || []);
      setLoading(false);
    };
    run();
  }, []);

  return (
    <main className="page-shell">
      <h1>Your Orders</h1>
      {loading ? <p>Loading your orders…</p> : orders.length === 0 ? <p>No orders yet.</p> : orders.map((order) => (
        <section key={order.id} className="card-list">
          <div className="card-row">
            <div>
              <p className="eyebrow">Order #{order.id.slice(0, 8)}</p>
              <h3>{order.status}</h3>
            </div>
            <div>₹{order.totalAmount}</div>
          </div>
          <div className="card-actions">
            <Link href={`/orders/${order.id}`}>View details</Link>
            <Link href={`/orders/${order.id}/track`}>Track order</Link>
          </div>
        </section>
      ))}
    </main>
  );
}
