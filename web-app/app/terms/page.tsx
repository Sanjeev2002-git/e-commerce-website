import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="page-shell">
      <h1>Terms and conditions</h1>
      <p>By using Northstar, you agree to our platform rules, order policies, and privacy guidance.</p>
      <div className="card-actions">
        <Link href="/shipping" className="primary-btn">Shipping policy</Link>
      </div>
    </main>
  );
}
