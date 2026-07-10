import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="page-shell">
      <h1>Privacy policy</h1>
      <p>We use your information to process orders, improve account security, and personalize your shopping experience.</p>
      <div className="card-actions">
        <Link href="/terms" className="secondary-btn">Read terms</Link>
      </div>
    </main>
  );
}
