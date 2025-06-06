
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { DevModeProvider } from "@/context/DevModeContext";
import { QueryProvider } from "@/components/providers/QueryClient";
import Index from "@/pages/Index";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import ResourcesLanding from "@/pages/ResourcesLanding";
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import VerifyPage from "@/pages/auth/VerifyPage";
import Dashboard from "@/pages/Dashboard";
import Jobs from "@/pages/Jobs";
import DailyTasks from "@/pages/DailyTasks";
import Schedule from "@/pages/Schedule";
import WoodworkingFinishing from "@/pages/WoodworkingFinishing";
import AutoBodyFinishing from "@/pages/AutoBodyFinishing";
import CustomCreations from "@/pages/CustomCreations";
import Materials from "@/pages/Materials";
import InventoryPage from "@/pages/inventory";
import EquipmentPage from "@/pages/equipment";
import QualityPage from "@/pages/quality";
import CompliancePage from "@/pages/compliance";
import Reports from "@/pages/Reports";
import Resources from "@/pages/Resources";
import WorkflowsPage from "@/pages/workflows";
import SprayBoothSchedulerPage from "@/pages/spray-booth/SprayBoothSchedulerPage";
import Settings from "@/pages/Settings";
import Users from "@/pages/Users";
import SubscriptionPage from "@/pages/SubscriptionPage";
import TestingPlan from "@/pages/TestingPlan";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import UnsubscribePage from "@/pages/UnsubscribePage";
import NewsletterAdmin from "@/pages/admin/NewsletterAdmin";

function App() {
  return (
    <Router>
      <DevModeProvider>
        <AuthProvider>
          <QueryProvider>
            <div className="flex h-screen bg-gray-100">
              <Toaster />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/resources" element={<ResourcesLanding />} />
                <Route path="/unsubscribe" element={<UnsubscribePage />} />
                
                {/* Auth routes */}
                <Route path="/auth/signin" element={<SignInPage />} />
                <Route path="/auth/signup" element={<SignUpPage />} />
                <Route path="/auth/verify" element={<VerifyPage />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/daily-tasks" element={<DailyTasks />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/woodworking-finishing" element={<WoodworkingFinishing />} />
                  <Route path="/autobody-finishing" element={<AutoBodyFinishing />} />
                  <Route path="/custom-creations" element={<CustomCreations />} />
                  <Route path="/materials" element={<Materials />} />
                  <Route path="/inventory" element={<InventoryPage />} />
                  <Route path="/equipment" element={<EquipmentPage />} />
                  <Route path="/quality" element={<QualityPage />} />
                  <Route path="/compliance" element={<CompliancePage />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/resources-app" element={<Resources />} />
                  <Route path="/workflows" element={<WorkflowsPage />} />
                  <Route path="/spray-booth-scheduler" element={<SprayBoothSchedulerPage />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/subscription" element={<SubscriptionPage />} />
                  <Route path="/testing-plan" element={<TestingPlan />} />

                  {/* Admin routes */}
                  <Route path="/admin/newsletter" element={<NewsletterAdmin />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </QueryProvider>
        </AuthProvider>
      </DevModeProvider>
    </Router>
  );
}

export default App;
