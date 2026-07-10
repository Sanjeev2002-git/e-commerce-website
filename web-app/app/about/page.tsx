import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <h1>About Northstar</h1>
      <p>Northstar is a modern marketplace focused on speed, trust, and quality.</p>
      <div className="card-list">
        <h2>Why shoppers choose us</h2>
        <ul>
          <li>Curated product selection</li>
          <li>Fast checkout and transparent pricing</li>
          <li>Reliable returns and tracking</li>
        </ul>
      </div>
      <div className="card-actions">
        <Link href="/contact" className="primary-btn">Contact us</Link>
      </div>
    </main>
  );
}
