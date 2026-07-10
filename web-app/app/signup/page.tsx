"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";

export default function SignupPage() {
  const [name, setName] = useState("");
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
      const data = await signup(name, email, password);
      setSession(data.user, data.accessToken);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Create an account</h1>
        <p className="auth-subtitle">Join the marketplace.</p>
        {error && <p className="auth-error">{error}</p>}
        <label>
          Name
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password (min 8 characters)
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Creating account..." : "Sign up"}</button>
        <p className="auth-footer">Already have an account? <a href="/login">Sign in</a></p>
      </form>
    </main>
  );
}
