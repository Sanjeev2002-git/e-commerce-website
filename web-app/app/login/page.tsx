"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      setSession(data.user, data.accessToken);

      const destinationByRole: Record<string, string> = {
        admin: "/admin",
        seller: "/seller",
        delivery: "/delivery",
        customer: "/",
      };
      router.push(destinationByRole[data.user.role] ?? "/");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <p className="auth-subtitle">Welcome back to the marketplace.</p>
        <p className="auth-subtitle auth-subtitle--muted">
          One login for everyone — customers, admin, sellers, and delivery partners are all routed
          to the right dashboard automatically after signing in.
        </p>
        {error && <p className="auth-error">{error}</p>}
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
        <p className="auth-footer">No account? <a href="/signup">Create one</a></p>
      </form>
    </main>
  );
}
