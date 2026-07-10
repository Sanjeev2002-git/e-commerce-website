"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

type SessionUser = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: SessionUser | null;
  token: string | null;
  setSession: (user: SessionUser, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "marketplace_auth";

type StoredAuth = {
  user: SessionUser;
  token: string;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setHydrated(true);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as StoredAuth;
      if (parsed?.user?.id && parsed?.token) {
        setUser(parsed.user);
        setToken(parsed.token);
      }
    } catch {
      // ignore
    } finally {
      setHydrated(true);
    }
  }, []);

  const value = useMemo<AuthContextType>(() => {
    return {
      user,
      token,
      setSession: (nextUser, nextToken) => {
        setUser(nextUser);
        setToken(nextToken);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser, token: nextToken } satisfies StoredAuth));
      },
      logout: () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem(STORAGE_KEY);
      },
    };
  }, [user, token]);

  // If you want a strict "loading until hydrated" UX, uncomment:
  // if (!hydrated) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

