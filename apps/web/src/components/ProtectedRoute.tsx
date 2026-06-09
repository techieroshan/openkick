/**
 * @trace US-066
 * Protected route component for role-based access control
 */
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "./AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole | UserRole[];
  fallbackRoute?: string;
}

export function ProtectedRoute({
  children,
  requiredRole,
  fallbackRoute = "/login",
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Show loading state if still initializing auth
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 animate-pulse">
        <div className="h-64 rounded-3xl bg-muted" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={fallbackRoute} replace />;
  }

  // Check role if specified
  if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!user || !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on user's role
      const dashboardMap: Record<string, string> = {
        consumer: "/dashboard/consumer",
        investor: "/dashboard/investor",
        attorney: "/dashboard/attorney",
        admin: "/dashboard/admin",
      };

      const userDashboard = user ? dashboardMap[user.role] : "/";
      return <Navigate to={userDashboard || "/"} replace />;
    }
  }

  return <>{children}</>;
}

export default ProtectedRoute;
