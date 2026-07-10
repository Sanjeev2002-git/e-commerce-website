"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchJson } from "../../lib/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const run = async () => {
      const data = await fetchJson("/categories");
      setCategories(data.data || []);
    };
    run();
  }, []);

  return (
    <main className="page-shell">
      <h1>Shop by category</h1>
      <div className="product-grid">
        {categories.map((category) => (
          <Link key={category.slug} href={`/products?category=${category.slug}`} className="category-card">
            <h3>{category.name}</h3>
            <p>Browse curated picks</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
