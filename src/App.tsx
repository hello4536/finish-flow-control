import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { DevModeProvider } from "@/context/DevModeContext";
import { QueryClient } from "@/components/providers/QueryClient";
import Index from "@/pages/Index";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import ResourcesLanding from "@/pages/ResourcesLanding";
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import VerifyPage from "@/pages/auth/VerifyPage";
import Dashboard from "@/pages/app/Dashboard";
import Jobs from "@/pages/app/Jobs";
import DailyTasks from "@/pages/app/DailyTasks";
import Schedule from "@/pages/app/Schedule";
import WoodworkingFinishing from "@/pages/app/WoodworkingFinishing";
import AutoBodyFinishing from "@/pages/app/AutoBodyFinishing";
import CustomCreations from "@/pages/app/CustomCreations";
import Materials from "@/pages/app/Materials";
import InventoryPage from "@/pages/app/InventoryPage";
import EquipmentPage from "@/pages/app/EquipmentPage";
import QualityPage from "@/pages/app/QualityPage";
import CompliancePage from "@/pages/app/CompliancePage";
import Reports from "@/pages/app/Reports";
import Resources from "@/pages/app/Resources";
import WorkflowsPage from "@/pages/app/WorkflowsPage";
import SprayBoothSchedulerPage from "@/pages/app/SprayBoothSchedulerPage";
import Settings from "@/pages/app/Settings";
import Users from "@/pages/app/Users";
import SubscriptionPage from "@/pages/app/SubscriptionPage";
import TestingPlan from "@/pages/app/TestingPlan";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import UnsubscribePage from "@/pages/UnsubscribePage";
import NewsletterAdmin from "@/pages/admin/NewsletterAdmin";

function App() {
  return (
    <Router>
      <DevModeProvider>
        <AuthProvider>
          <QueryClient>
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
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
                <Route path="/daily-tasks" element={<ProtectedRoute><DailyTasks /></ProtectedRoute>} />
                <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
                <Route path="/woodworking-finishing" element={<ProtectedRoute><WoodworkingFinishing /></ProtectedRoute>} />
                <Route path="/autobody-finishing" element={<ProtectedRoute><AutoBodyFinishing /></ProtectedRoute>} />
                <Route path="/custom-creations" element={<ProtectedRoute><CustomCreations /></ProtectedRoute>} />
                <Route path="/materials" element={<ProtectedRoute><Materials /></ProtectedRoute>} />
                <Route path="/inventory" element={<ProtectedRoute><InventoryPage /></ProtectedRoute>} />
                <Route path="/equipment" element={<ProtectedRoute><EquipmentPage /></ProtectedRoute>} />
                <Route path="/quality" element={<ProtectedRoute><QualityPage /></ProtectedRoute>} />
                <Route path="/compliance" element={<ProtectedRoute><CompliancePage /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                <Route path="/resources-app" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
                <Route path="/workflows" element={<ProtectedRoute><WorkflowsPage /></ProtectedRoute>} />
                <Route path="/spray-booth-scheduler" element={<ProtectedRoute><SprayBoothSchedulerPage /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                <Route path="/subscription" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />
                <Route path="/testing-plan" element={<ProtectedRoute><TestingPlan /></ProtectedRoute>} />

                {/* Admin routes */}
                <Route path="/admin/newsletter" element={<ProtectedRoute><NewsletterAdmin /></ProtectedRoute>} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </QueryClient>
        </AuthProvider>
      </DevModeProvider>
    </Router>
  );
}

export default App;
