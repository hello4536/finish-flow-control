
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { DevModeProvider } from "./context/DevModeContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import Dashboard from "./pages/Dashboard";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import VerifyPage from "./pages/auth/VerifyPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import Jobs from "./pages/jobs";
import Workflows from "./pages/workflows";
import Materials from "./pages/materials";
import Inventory from "./pages/inventory";
import Quality from "./pages/quality";
import Compliance from "./pages/compliance";
import Schedule from "./pages/Schedule";
import Resources from "./pages/Resources";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import CustomCreations from "./pages/CustomCreations";
import NotFound from "./pages/NotFound";
import DailyTasks from "./pages/DailyTasks";
import { initializeApp } from "./utils/initializeApp";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  // Initialize app data on first load
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <DevModeProvider>
              <Routes>
                {/* Public landing page route */}
                <Route path="/" element={<Index />} />

                {/* Auth routes - unprotected */}
                <Route element={<ProtectedRoute requireAuth={false} />}>
                  <Route path="/auth" element={<AuthLayout />}>
                    <Route path="signin" element={<SignInPage />} />
                    <Route path="signup" element={<SignUpPage />} />
                    <Route path="verify" element={<VerifyPage />} />
                  </Route>
                </Route>

                {/* Protected routes - require authentication */}
                <Route element={<ProtectedRoute requireAuth={true} />}>
                  <Route element={<MainLayout />}>
                    {/* Redirect /dashboard to / for authenticated users */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="subscription" element={<SubscriptionPage />} />
                    <Route path="jobs" element={<Jobs />} />
                    <Route path="workflows" element={<Workflows />} />
                    <Route path="materials" element={<Materials />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route path="quality" element={<Quality />} />
                    <Route path="compliance" element={<Compliance />} />
                    <Route path="schedule" element={<Schedule />} />
                    <Route path="resources" element={<Resources />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="users" element={<Users />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="custom-creations" element={<CustomCreations />} />
                    <Route path="/daily-tasks" element={<DailyTasks />} />
                  </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </DevModeProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
