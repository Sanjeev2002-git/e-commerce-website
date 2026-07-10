import Link from "next/link";

export default function FAQPage() {
  return (
    <main className="page-shell">
      <h1>Frequently asked questions</h1>
      <div className="card-list">
        <h2>How do I place an order?</h2>
        <p>Add products to your cart and complete checkout with your preferred address and payment option.</p>
      </div>
      <div className="card-actions">
        <Link href="/help" className="primary-btn">Visit help center</Link>
      </div>
    </main>
  );
}
