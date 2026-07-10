import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="page-shell">
      <h1>Contact us</h1>
      <p>Reach our support team for anything from order questions to product help.</p>
      <div className="card-list">
        <p>Email: support@northstar.example</p>
        <p>Phone: +91 99999 00000</p>
      </div>
      <div className="card-actions">
        <Link href="/help" className="secondary-btn">Help center</Link>
      </div>
    </main>
  );
}
