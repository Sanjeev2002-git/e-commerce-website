import Link from "next/link";

export default function RefundsPage() {
  return (
    <main className="page-shell">
      <h1>Refund policy</h1>
      <p>Refunds are processed after the return is inspected and approved. The amount is refunded to the original payment method.</p>
      <div className="card-actions">
        <Link href="/offers" className="secondary-btn">View offers</Link>
      </div>
    </main>
  );
}
