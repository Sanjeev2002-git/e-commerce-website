"use client";

import { RoleGuard } from "../../components/role-guard";
import { useAuth } from "../../lib/auth-context";

function SellerDashboard() {
  const { user, logout } = useAuth();

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Seller Dashboard</h1>
          <p>Signed in as {user?.name} ({user?.email})</p>
        </div>
        <button onClick={logout}>Sign out</button>
      </header>

      <section style={{ marginTop: 24, display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
          <h3>My Listings</h3>
          <p>Product catalog management connects to the same /catalog endpoints as the storefront.</p>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
          <h3>Orders for my products</h3>
          <p>Wire this to a seller-scoped orders endpoint once seller-product ownership is modeled in the backend.</p>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
          <h3>Payouts</h3>
          <p>The `sellers` table already tracks commission_rate and bank details for this.</p>
        </div>
      </section>
    </main>
  );
}

export default function SellerPage() {
  return (
    <RoleGuard allow={["seller"]}>
      <SellerDashboard />
    </RoleGuard>
  );
}
