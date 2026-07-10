"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "../lib/auth-context";

/**
 * Gates a route to one or more roles. Used by /admin, /seller, /delivery
 * so the merged web-app can serve all four roles from a single login
 * instead of separate admin/seller/delivery apps on separate ports.
 */
export function RoleGuard({ allow, children }: { allow: UserRole[]; children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace("/login");
      return;
    }
    if (!allow.includes(user.role)) {
      router.replace("/");
    }
  }, [user, allow, router]);

  if (!user || !allow.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
