
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import VerifyPage from "./pages/auth/VerifyPage";
import WoodworkingFinishing from "./pages/WoodworkingFinishing";
import AutoBodyFinishing from "./pages/AutoBodyFinishing";
import CustomCreations from "./pages/CustomCreations";
import DailyTasks from "./pages/DailyTasks";
import Inventory from "./pages/inventory";
import Materials from "./pages/Materials";
import Jobs from "./pages/Jobs";
import Schedule from "./pages/Schedule";
import Reports from "./pages/Reports";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import SubscriptionPage from "./pages/SubscriptionPage";
import EquipmentPage from "./pages/equipment/EquipmentPage";
import CompliancePage from "./pages/compliance/CompliancePage";
import QualityPage from "./pages/quality/QualityPage";
import WorkflowsPage from "./pages/workflows";
import SprayBoothSchedulerPage from "./pages/spray-booth/SprayBoothSchedulerPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import { DevModeProvider } from "./context/DevModeContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DevModeProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/woodworking-finishing" element={<WoodworkingFinishing />} />
                <Route path="/auto-body-finishing" element={<AutoBodyFinishing />} />
                
                {/* Auth routes */}
                <Route element={<AuthLayout />}>
                  <Route path="/auth/signin" element={<SignInPage />} />
                  <Route path="/auth/signup" element={<SignUpPage />} />
                  <Route path="/auth/verify" element={<VerifyPage />} />
                </Route>

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/custom-creations" element={<CustomCreations />} />
                    <Route path="/daily-tasks" element={<DailyTasks />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/materials" element={<Materials />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/spray-booth-scheduler" element={<SprayBoothSchedulerPage />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/subscription" element={<SubscriptionPage />} />
                    <Route path="/equipment" element={<EquipmentPage />} />
                    <Route path="/compliance" element={<CompliancePage />} />
                    <Route path="/quality" element={<QualityPage />} />
                    <Route path="/workflows" element={<WorkflowsPage />} />
                  </Route>
                </Route>

                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </DevModeProvider>
    </QueryClientProvider>
  );
}

export default App;
