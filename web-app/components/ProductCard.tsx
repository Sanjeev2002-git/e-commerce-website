"use client";
import { useState } from "react";
import { Product } from "../lib/products";
import { useCart } from "../lib/cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);

  const discountPct =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  return (
    <div className="product-card">
      <button
        type="button"
        className="wishlist-btn"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wishlisted}
        onClick={() => setWishlisted((v) => !v)}
      >
        {wishlisted ? "♥" : "♡"}
      </button>
      <div className="product-image" style={{ background: product.color }}>
        <span aria-hidden="true">{product.emoji}</span>
      </div>
      <div className="product-body">
        <p className="product-seller">{product.seller}</p>
        <h3 className="product-name">{product.name}</h3>

        {product.rating != null && (
          <span className="rating-badge">
            {product.rating.toFixed(1)} ★
            {product.reviewCount != null && (
              <span style={{ opacity: 0.85, fontWeight: 400 }}>
                &nbsp;({product.reviewCount.toLocaleString()})
              </span>
            )}
          </span>
        )}

        <div className="price-row">
          <span className="price-tag">₹{product.price}</span>
          {product.mrp && product.mrp > product.price && (
            <span className="price-mrp">₹{product.mrp}</span>
          )}
          {discountPct != null && (
            <span className="price-discount">{discountPct}% off</span>
          )}
        </div>

        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
