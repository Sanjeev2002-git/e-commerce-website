import Link from "next/link";

export default function HelpPage() {
  return (
    <main className="page-shell">
      <h1>Help center</h1>
      <div className="card-list">
        <h2>Popular topics</h2>
        <ul>
          <li>Tracking my order</li>
          <li>Changing my delivery address</li>
          <li>Starting a return</li>
        </ul>
      </div>
      <div className="card-actions">
        <Link href="/contact" className="primary-btn">Contact support</Link>
      </div>
    </main>
  );
}
