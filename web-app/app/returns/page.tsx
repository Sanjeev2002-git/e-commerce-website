import Link from "next/link";

export default function ReturnsPage() {
  return (
    <main className="page-shell">
      <h1>Returns policy</h1>
      <p>Returns are accepted for unused products within 7 days of delivery when the original packaging is intact.</p>
      <div className="card-actions">
        <Link href="/refunds" className="primary-btn">Refund policy</Link>
      </div>
    </main>
  );
}
