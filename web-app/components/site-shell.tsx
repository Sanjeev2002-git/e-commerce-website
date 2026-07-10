"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../lib/auth-context";
import { useCart } from "../lib/cart-context";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { totalCount } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(searchParams.get("search") || "");
  }, [searchParams]);

  function onSearchSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      router.push("/products");
      return;
    }
    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div>
      <header className="site-header">
        <div className="site-branding">
          <Link href="/" className="wordmark">Northstar</Link>
          <span className="site-tag">Modern marketplace</span>
        </div>
        <form className="site-search" onSubmit={onSearchSubmit}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, brands, deals"
          />
          <button type="submit">Search</button>
        </form>
        <nav className="top-nav">
          <Link href="/categories">Categories</Link>
          <Link href="/products">Products</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/addresses">Addresses</Link>
          {user ? (
            <>
              <span className="greeting">Hi, {user.name}</span>
              <button className="text-button" onClick={logout} type="button">Sign out</button>
            </>
          ) : (
            <Link href="/login">Sign in</Link>
          )}
          <Link href="/cart">Cart<span className="cart-badge">{totalCount}</span></Link>
        </nav>
      </header>

      <nav className="sub-nav" aria-label="Category shortcuts">
        <Link href="/products?category=fashion">Fashion</Link>
        <Link href="/products?category=electronics">Electronics</Link>
        <Link href="/products?category=home">Home</Link>
        <Link href="/products?category=kitchen">Kitchen</Link>
        <Link href="/products?search=deals">Deals</Link>
        <Link href="/offers">Offers</Link>
      </nav>

      <div>{children}</div>

      <footer className="site-footer">
        <div>
          <h3>Northstar</h3>
          <p>Premium shopping, fast delivery, and curated essentials for modern life.</p>
        </div>
        <div>
          <h4>Help</h4>
          <Link href="/help">Help center</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h4>Policies</h4>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/shipping">Shipping</Link>
        </div>
        <div>
          <h4>Company</h4>
          <Link href="/about">About</Link>
          <Link href="/returns">Returns</Link>
          <Link href="/refunds">Refunds</Link>
        </div>
      </footer>
    </div>
  );
}
