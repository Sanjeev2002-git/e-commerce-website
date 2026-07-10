import Link from "next/link";

export default function WishlistPage() {
  return (
    <main className="page-shell">
      <h1>Your wishlist</h1>
      <div className="card-list">
        <p>Your saved products will appear here.</p>
      </div>
      <div className="card-actions">
        <Link href="/products" className="primary-btn">Continue shopping</Link>
      </div>
    </main>
  );
}
