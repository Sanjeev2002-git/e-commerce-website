"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchJson } from "../../lib/api";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadCart() {
    try {
      const data = await fetchJson("/cart");
      setItems(data.items || []);
    } catch (error: any) {
      setMessage(error.message || "Unable to load cart");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function updateQty(productId: string, qty: number) {
    await fetchJson(`/cart/items/${productId}`, { method: "PUT", body: JSON.stringify({ qty }) });
    await loadCart();
  }

  async function removeItem(productId: string) {
    await fetchJson(`/cart/items/${productId}`, { method: "DELETE" });
    await loadCart();
  }

  async function applyCoupon() {
    const data = await fetchJson("/cart/coupon/apply", { method: "POST", body: JSON.stringify({ code: coupon }) });
    setMessage(data.message || "Coupon applied");
  }

  if (loading) {
    return <main className="cart-page"><h1>Your cart</h1><p>Loading your cart…</p></main>;
  }

  return (
    <main className="cart-page">
      <h1>Your cart</h1>
      {message ? <p className="auth-error">{message}</p> : null}
      {items.length === 0 ? (
        <p>Nothing here yet. Add something from the marketplace.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.productId} className="cart-item">
                <div className="cart-item-info">
                  <p className="product-seller">{item.title}</p>
                  <h3>{item.title}</h3>
                  <p>Qty: {item.qty}</p>
                </div>
                <div className="cart-item-price">₹{item.price * item.qty}</div>
                <button className="remove-btn" onClick={() => updateQty(item.productId, Math.max(1, item.qty - 1))}>−</button>
                <button className="remove-btn" onClick={() => updateQty(item.productId, item.qty + 1)}>+</button>
                <button className="remove-btn" onClick={() => removeItem(item.productId)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="card-list">
            <label className="auth-form-label">
              Coupon code
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)} />
            </label>
            <button className="secondary-btn" onClick={applyCoupon}>Apply coupon</button>
          </div>
          <div className="card-actions">
            <Link href="/checkout">Proceed to checkout</Link>
          </div>
        </>
      )}
    </main>
  );
}
