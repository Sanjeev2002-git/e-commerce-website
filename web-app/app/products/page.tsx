"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fetchJson } from "../../lib/api";
import { useCart } from "../../lib/cart-context";

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 24;
  const { addToCart } = useCart();

  useEffect(() => {
    setPage(1);
  }, [category, search]);

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (search) params.set("search", search);
      params.set("page", String(page));
      params.set("limit", String(pageSize));
      const data = await fetchJson(`/products?${params.toString()}`);
      setProducts(data.data || []);
      setTotal(data.total ?? (data.data || []).length);
    };
    run();
  }, [category, search, page]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <main className="page-shell">
      <h1>{category ? category[0].toUpperCase() + category.slice(1) : search ? `Results for "${search}"` : "All Items"}</h1>
      <p style={{ color: "var(--muted)", marginTop: -8, marginBottom: 16 }}>{total.toLocaleString()} products</p>
      <div className="product-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-image" style={{ background: "#f9f9f9" }}>
              <span aria-hidden="true">🛍️</span>
            </div>
            <div className="product-body">
              <p className="product-seller">{product.brand}</p>
              <h3 className="product-name">{product.title}</h3>
              {product.ratings != null && (
                <span className="rating-badge">{Number(product.ratings).toFixed(1)} ★</span>
              )}
              <div className="price-row">
                <span className="price-tag">₹{product.price}</span>
              </div>
              <div className="card-actions">
                <Link href={`/products/${product.id}`}>View</Link>
                <button className="secondary-btn" onClick={() => addToCart({ id: product.id, name: product.title, seller: product.brand, price: product.price, color: "#d8c6ac", emoji: "🛍️" } as any)}>Add</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {totalPages > 1 && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", padding: "16px 0 48px", alignItems: "center" }}>
          <button className="secondary-btn" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
          <span>Page {page} of {totalPages.toLocaleString()}</span>
          <button className="secondary-btn" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}
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
