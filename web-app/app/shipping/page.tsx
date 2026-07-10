import Link from "next/link";

export default function ShippingPage() {
  return (
    <main className="page-shell">
      <h1>Shipping policy</h1>
      <p>Standard delivery is usually completed within 3–5 business days. Express delivery is available in selected pin codes.</p>
      <div className="card-actions">
        <Link href="/returns" className="secondary-btn">Return policy</Link>
      </div>
    </main>
  );
}
