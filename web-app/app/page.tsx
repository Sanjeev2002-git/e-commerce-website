"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../lib/cart-context";
import { useAuth } from "../lib/auth-context";
import { fetchJson } from "../lib/api";

export default function Home() {
  const { totalCount } = useCart();
  const { user, logout } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const run = async () => {
      const catalogs = await fetchJson("/products");
      const categoryData = await fetchJson("/categories");
      setProducts((catalogs.data || []).slice(0, 8));
      setCategories(categoryData.data || []);
    };
    run();
  }, []);

  return (
    <main className="page-shell">
      <header className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow">Fresh arrivals • Fast delivery • Trusted quality</p>
          <h1>Shop premium essentials for everyday life.</h1>
          <p>Modern products, easy checkout, and real-time order tracking from one beautifully designed storefront.</p>
          <div className="card-actions">
            <Link href="/products" className="primary-btn">Explore products</Link>
            <Link href="/orders" className="secondary-btn">View orders</Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-stat-card">
            <strong>24/7</strong>
            <span>support</span>
          </div>
          <div className="hero-stat-card">
            <strong>Free</strong>
            <span>returns</span>
          </div>
          <div className="hero-stat-card">
            <strong>₹0</strong>
            <span>delivery on first order</span>
          </div>
        </div>
      </header>

      <section className="chip-row">
        {categories.map((category) => (
          <Link key={category.slug} href={`/products?category=${category.slug}`} className="chip-link">
            {category.name}
          </Link>
        ))}
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>Featured picks</h2>
          <Link href="/products">See all</Link>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <span className="price-tag">₹{product.price}</span>
              <div className="product-image" style={{ background: "#f4efe4" }}>
                <span aria-hidden="true">🛍️</span>
              </div>
              <div className="product-body">
                <p className="product-seller">{product.brand}</p>
                <h3 className="product-name">{product.title}</h3>
                <p className="product-price">₹{product.price}</p>
                <div className="card-actions">
                  <Link href={`/products/${product.id}`}>Details</Link>
                  <Link href="/cart">Add</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
