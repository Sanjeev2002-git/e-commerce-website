"use client";

import { useState } from "react";
import Link from "next/link";
import { fetchJson } from "../../lib/api";

export default function CheckoutPage() {
  const [addressId, setAddressId] = useState("11111111-1111-1111-1111-111111111111");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [couponCode, setCouponCode] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await fetchJson("/checkout/place-order", {
        method: "POST",
        body: JSON.stringify({ addressId, paymentMethod, couponCode }),
      });
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <h1>Checkout</h1>
      <form className="card-list" onSubmit={submit}>
        <label className="auth-form-label">
          Address ID
          <input value={addressId} onChange={(e) => setAddressId(e.target.value)} />
        </label>
        <label className="auth-form-label">
          Payment method
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="cod">COD</option>
            <option value="card">Card</option>
            <option value="upi">UPI</option>
          </select>
        </label>
        <label className="auth-form-label">
          Coupon code
          <input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
        </label>
        <button className="primary-btn" type="submit" disabled={loading}>{loading ? "Placing order..." : "Place order"}</button>
      </form>
      {error ? <p className="auth-error">{error}</p> : null}
      {result ? (
        <section className="card-list">
          <h2>Order placed</h2>
          <p>{result.order?.id ? `Order ID: ${result.order.id}` : "Order created"}</p>
          <p>Payment token: {result.paymentToken}</p>
          <div className="card-actions">
            <Link href="/orders">View orders</Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
