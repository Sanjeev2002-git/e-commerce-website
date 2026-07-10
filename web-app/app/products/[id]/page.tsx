"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../../lib/cart-context";
import { fetchJson } from "../../../lib/api";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const run = async () => {
      const data = await fetchJson(`/products/${params.id}`);
      setProduct(data.data);
      setLoading(false);
    };
    run();
  }, [params.id]);

  if (loading) return <main className="page-shell"><p>Loading product…</p></main>;
  if (!product) return <main className="page-shell"><p>Product not found.</p></main>;

  return (
    <main className="page-shell">
      <nav className="breadcrumbs"><Link href="/">Home</Link> / <span>{product.title}</span></nav>
      <section className="detail-card">
        <div className="detail-hero" style={{ background: "linear-gradient(135deg, #fff7e6, #f3f0e8)" }}>
          <div className="detail-copy">
            <p className="eyebrow">{product.brand}</p>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <div className="detail-price">₹{product.price}</div>
            <p className="detail-stock">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>
            <div className="card-actions">
              <button className="primary-btn" onClick={() => addToCart({ id: product.id, name: product.title, seller: product.brand, price: product.price, color: "#d8c6ac", emoji: "🛍️" } as any)}>Add to cart</button>
              <Link href="/checkout" className="secondary-btn">Buy now</Link>
            </div>
          </div>
        </div>
        <div className="detail-grid">
          <div>
            <h2>Highlights</h2>
            <ul>
              {Object.entries(product.specs || {}).map(([key, value]) => (
                <li key={key}>{key}: {String(value)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Delivery info</h2>
            <p>Free delivery on orders above ₹999.</p>
            <p>30-day easy returns.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
