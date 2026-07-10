"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchJson } from "../../lib/api";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    const run = async () => {
      const data = await fetchJson("/addresses");
      setAddresses(data.data || []);
    };
    run();
  }, []);

  return (
    <main className="page-shell">
      <h1>Saved addresses</h1>
      <div className="card-list">
        {addresses.length === 0 ? <p>No addresses saved yet.</p> : addresses.map((address) => (
          <div key={address.id} className="card-list">
            <h2>{address.fullName}</h2>
            <p>{address.line1}, {address.city}</p>
            <p>{address.state} – {address.postalCode}</p>
            <p>{address.phone}</p>
          </div>
        ))}
      </div>
      <div className="card-actions">
        <Link href="/checkout" className="primary-btn">Continue to checkout</Link>
      </div>
    </main>
  );
}
