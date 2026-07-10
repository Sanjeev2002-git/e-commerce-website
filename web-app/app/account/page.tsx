"use client";

import { useEffect, useState } from "react";
import { RoleGuard } from "../../components/role-guard";
import { getLoginHistory } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";

type LoginSession = {
  id: string;
  role: string;
  ipAddress: string | null;
  userAgent: string | null;
  loginAt: string;
};

function AccountPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<LoginSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getLoginHistory()
      .then((data) => setSessions(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load login history"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>My Account</h1>
      <p>
        {user?.name} — {user?.email}
      </p>

      <h2 style={{ marginTop: 24 }}>Login history</h2>
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {!loading && !error && sessions.length === 0 && <p>No recorded logins yet.</p>}
      {sessions.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>When</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Role</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>IP address</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Device / browser</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr key={s.id}>
                <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{new Date(s.loginAt).toLocaleString()}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{s.role}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{s.ipAddress ?? "—"}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0", maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis" }}>
                  {s.userAgent ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default function Account() {
  return (
    <RoleGuard allow={["customer", "admin", "seller", "delivery"]}>
      <AccountPage />
    </RoleGuard>
  );
}
