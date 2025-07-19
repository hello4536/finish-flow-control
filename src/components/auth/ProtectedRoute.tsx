
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProtectedRouteProps {
  requireAuth?: boolean;
  requireAdmin?: boolean;
  requireSubscription?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requireAuth = true,
  requireAdmin = false,
  requireSubscription = false,
}) => {
  const { user, userRole, isLoading, organization } = useAuth();
  const location = useLocation();

  // Show loading indicator while checking auth
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-xl">Loading...</span>
      </div>
    );
  }

  // If auth is required and user is not logged in, redirect to login
  if (requireAuth && !user) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // If admin role is required and user is not an admin, redirect to home
  if (requireAdmin && userRole?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // If subscription is required and user doesn't have active subscription, show payment gate
  if (requireSubscription && organization?.subscription_status !== "active") {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md p-8 bg-white rounded-2xl shadow-lg text-center">
          <CreditCard className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscription Required</h2>
          <p className="text-gray-600 mb-6">
            You need an active subscription to access the dashboard. Choose a plan to get started.
          </p>
          <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Link to="/subscription">View Plans</Link>
          </Button>
        </div>
      </div>
    );
  }

  // If the route should not be accessed when logged in (like login page), redirect to dashboard
  if (!requireAuth && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
