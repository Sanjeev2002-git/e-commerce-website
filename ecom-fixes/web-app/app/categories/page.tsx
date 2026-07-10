"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchJson } from "../../lib/api";

type Category = {
  slug: string;
  name: string;
  icon: string;
  image_url: string;
  featured?: boolean;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const data = await fetchJson("/categories");
        setCategories(data.data || []);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const featured = categories.filter((c) => c.featured);
  const rest = categories.filter((c) => !c.featured);

  return (
    <main className="page-shell">
      <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "2rem", marginBottom: 4 }}>
        Shop by Category
      </h1>
      <p style={{ color: "#666", marginBottom: 32 }}>
        {categories.length} categories · Find exactly what you need
      </p>

      {loading && (
        <p style={{ color: "#888", fontFamily: "IBM Plex Mono, monospace" }}>
          Loading categories…
        </p>
      )}

      {!loading && (
        <>
          {/* All Items card */}
          <div style={{ marginBottom: 40 }}>
            <Link
              href="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "var(--teal)",
                color: "white",
                padding: "12px 24px",
                borderRadius: 999,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              🛍️ Browse All Items
            </Link>
          </div>

          {/* Featured categories - large grid */}
          {featured.length > 0 && (
            <section style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--teal)",
                  marginBottom: 16,
                }}
              >
                Featured
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 20,
                }}
              >
                {featured.map((cat) => (
                  <CategoryCard key={cat.slug} category={cat} large />
                ))}
              </div>
            </section>
          )}

          {/* All other categories */}
          {rest.length > 0 && (
            <section>
              <h2
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--teal)",
                  marginBottom: 16,
                }}
              >
                All Categories
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: 16,
                }}
              >
                {rest.map((cat) => (
                  <CategoryCard key={cat.slug} category={cat} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}

function CategoryCard({
  category,
  large = false,
}: {
  category: Category;
  large?: boolean;
}) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--rule)",
          borderRadius: 12,
          overflow: "hidden",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 12px 28px rgba(33,38,43,0.10)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* Image */}
        <div
          style={{
            width: "100%",
            height: large ? 180 : 140,
            overflow: "hidden",
            position: "relative",
            background: "#f3efe8",
          }}
        >
          <img
            src={category.image_url}
            alt={category.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              // fallback to emoji on image load error
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Icon overlay */}
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 12,
              fontSize: large ? "1.6rem" : "1.3rem",
              background: "rgba(255,255,255,0.85)",
              borderRadius: 8,
              padding: "4px 8px",
              lineHeight: 1,
            }}
          >
            {category.icon}
          </span>
        </div>

        {/* Label */}
        <div style={{ padding: large ? "14px 16px 16px" : "10px 14px 12px" }}>
          <h3
            style={{
              margin: 0,
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: large ? "1rem" : "0.9rem",
              color: "var(--ink)",
            }}
          >
            {category.name}
          </h3>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "0.78rem",
              color: "#888",
              fontFamily: "IBM Plex Mono, monospace",
            }}
          >
            Browse picks →
          </p>
        </div>
      </div>
    </Link>
  );
}
