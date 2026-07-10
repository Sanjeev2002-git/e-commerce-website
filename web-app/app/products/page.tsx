"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fetchJson } from "../../lib/api";
import { useCart } from "../../lib/cart-context";

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const run = async () => {
      const data = await fetchJson(`/products?category=${category}`);
      setProducts(data.data || []);
    };
    run();
  }, [category]);

  return (
    <main className="page-shell">
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-image" style={{ background: "#f4efe4" }}>
              <span aria-hidden="true">🛍️</span>
            </div>
            <div className="product-body">
              <p className="product-seller">{product.brand}</p>
              <h3 className="product-name">{product.title}</h3>
              <p className="product-price">₹{product.price}</p>
              <div className="card-actions">
                <Link href={`/products/${product.id}`}>View</Link>
                <button className="secondary-btn" onClick={() => addToCart({ id: product.id, name: product.title, seller: product.brand, price: product.price, color: "#d8c6ac", emoji: "🛍️" } as any)}>Add</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<main className="page-shell"><h1>Products</h1><p>Loading products…</p></main>}>
      <ProductsContent />
    </Suspense>
  );
}
