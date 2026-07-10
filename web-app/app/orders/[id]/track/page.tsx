"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchJson } from "../../../../lib/api";

export default function TrackOrderPage() {
  const params = useParams<{ id: string }>();
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const data = await fetchJson(`/orders/${params.id}/track`);
      setTimeline(data.timeline || []);
      setLoading(false);
    };
    run();
  }, [params.id]);

  return (
    <main className="page-shell">
      <nav className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/orders">Orders</Link> / <span>Track</span></nav>
      <h1>Tracking timeline</h1>
      {loading ? <p>Loading timeline…</p> : timeline.map((entry) => (
        <div key={entry.status} className="card-list">
          <strong>{entry.status}</strong>
          <p>{entry.at ? new Date(entry.at).toLocaleString() : "Pending"}</p>
        </div>
      ))}
    </main>
  );
}
