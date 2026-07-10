import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "../lib/cart-context";
import { AuthProvider } from "../lib/auth-context";
import { SiteShell } from "../components/site-shell";

export const metadata: Metadata = {
  title: "Northstar Marketplace",
  description: "Modern e-commerce storefront with cart, checkout, and order tracking",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={<div />}> 
              <SiteShell>{children}</SiteShell>
            </Suspense>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
