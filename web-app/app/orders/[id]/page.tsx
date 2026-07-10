"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchJson } from "../../../lib/api";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const data = await fetchJson(`/orders/${params.id}`);
      setOrder(data);
      setLoading(false);
    };
    run();
  }, [params.id]);

  if (loading) return <main className="page-shell"><p>Loading order…</p></main>;
  if (!order) return <main className="page-shell"><p>Order not found.</p></main>;

  return (
    <main className="page-shell">
      <nav className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/orders">Orders</Link> / <span>{order.id}</span></nav>
      <section className="card-list">
        <h1>Order details</h1>
        <p>Status: {order.status}</p>
        <p>Subtotal: ₹{order.subtotalAmount}</p>
        <p>Total: ₹{order.totalAmount}</p>
      </section>
    </main>
  );
}
