"use client";
import { Product } from "../lib/products";
import { useCart } from "../lib/cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <span className="price-tag">${product.price}</span>
      <div className="product-image" style={{ background: product.color }}>
        <span aria-hidden="true">{product.emoji}</span>
      </div>
      <div className="product-body">
        <p className="product-seller">{product.seller}</p>
        <h3 className="product-name">{product.name}</h3>
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
