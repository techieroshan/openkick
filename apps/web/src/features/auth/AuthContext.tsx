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
    const storedAuth = localStorage.getItem("ok_auth");
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setUser(parsedAuth);
      } catch (err) {
        console.error("Failed to parse auth from localStorage", err);
        localStorage.removeItem("ok_auth");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string, role: UserRole) => {
    const authData: AuthUser = { email, role };
    localStorage.setItem("ok_auth", JSON.stringify(authData));
    setUser(authData);
  };

  const signup = (email: string, password: string, role: UserRole) => {
    const authData: AuthUser = { email, role };
    localStorage.setItem("ok_auth", JSON.stringify(authData));
    setUser(authData);
  };

  const logout = () => {
    localStorage.removeItem("ok_auth");
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
