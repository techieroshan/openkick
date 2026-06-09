/**
 * @trace US-004, US-066
 * Auth context for managing authentication and role-based access
 */
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type UserRole = "consumer" | "investor" | "attorney" | "admin" | "editor" | "compliance" | "support" | "analyst" | "website_admin" | "website_owner";

export interface AuthUser {
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  signup: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
        setIsLoading(false);
        return;
      }
      const storedAuth = window.localStorage.getItem("ok_auth");
      if (storedAuth) {
        try {
          const parsedAuth = JSON.parse(storedAuth);
          setUser(parsedAuth);
        } catch (err) {
          console.error("Failed to parse auth from localStorage", err);
          window.localStorage.removeItem("ok_auth");
        }
      }
    } catch (_err) {
      // localStorage access might fail in test environments
    }
    setIsLoading(false);
  }, []);

  const login = (_email: string, _password: string, role: UserRole) => {
    const authData: AuthUser = { email: _email, role };
    try {
      if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
        window.localStorage.setItem("ok_auth", JSON.stringify(authData));
      }
    } catch (_err) {
      // localStorage access might fail in test environments
    }
    setUser(authData);
  };

  const signup = (_email: string, _password: string, role: UserRole) => {
    const authData: AuthUser = { email: _email, role };
    try {
      if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
        window.localStorage.setItem("ok_auth", JSON.stringify(authData));
      }
    } catch (_err) {
      // localStorage access might fail in test environments
    }
    setUser(authData);
  };

  const logout = () => {
    try {
      if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
        window.localStorage.removeItem("ok_auth");
      }
    } catch (_err) {
      // localStorage access might fail in test environments
    }
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
