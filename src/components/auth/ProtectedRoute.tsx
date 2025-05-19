
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useDevMode } from "@/context/DevModeContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requireAuth = true,
  requireAdmin = false,
}) => {
  const { user, userRole, isLoading } = useAuth();
  const { isDevMode } = useDevMode();
  const location = useLocation();

  // Show loading indicator while checking auth
  if (isLoading && !isDevMode) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-xl">Loading...</span>
      </div>
    );
  }

  // If dev mode is active, bypass all authentication checks
  if (isDevMode) {
    return <Outlet />;
  }

  // If auth is required and user is not logged in, redirect to login
  if (requireAuth && !user) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // If admin role is required and user is not an admin, redirect to home
  if (requireAdmin && userRole?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // If the route should not be accessed when logged in (like login page), redirect to dashboard
  if (!requireAuth && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
