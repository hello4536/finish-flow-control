
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { DevModeProvider } from "@/context/DevModeContext";
import { QueryProvider } from "@/components/providers/QueryClient";
import { MainLayout } from "@/components/layout/MainLayout";
import Index from "@/pages/Index";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import ResourcesLanding from "@/pages/ResourcesLanding";
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import VerifyPage from "@/pages/auth/VerifyPage";
import Dashboard from "@/pages/Dashboard";
import JobManagement from "@/pages/JobManagement";
import AssetManagement from "@/pages/AssetManagement";
import Operations from "@/pages/Operations";
import CreativeHub from "@/pages/CreativeHub";
import CompliancePage from "@/pages/compliance";
import Analytics from "@/pages/Analytics";
import Administration from "@/pages/Administration";
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

              {/* Protected routes with MainLayout */}
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/job-management" element={<JobManagement />} />
                  <Route path="/asset-management" element={<AssetManagement />} />
                  <Route path="/operations" element={<Operations />} />
                  <Route path="/creative-hub" element={<CreativeHub />} />
                  <Route path="/compliance" element={<CompliancePage />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/administration" element={<Administration />} />
                  <Route path="/subscription" element={<SubscriptionPage />} />
                  <Route path="/testing-plan" element={<TestingPlan />} />

                  {/* Legacy routes for backward compatibility */}
                  <Route path="/jobs" element={<JobManagement />} />
                  <Route path="/daily-tasks" element={<JobManagement />} />
                  <Route path="/workflows" element={<JobManagement />} />
                  <Route path="/materials" element={<AssetManagement />} />
                  <Route path="/inventory" element={<AssetManagement />} />
                  <Route path="/equipment" element={<AssetManagement />} />
                  <Route path="/spray-booth-scheduler" element={<AssetManagement />} />
                  <Route path="/schedule" element={<Operations />} />
                  <Route path="/quality" element={<Operations />} />
                  <Route path="/custom-creations" element={<CreativeHub />} />
                  <Route path="/woodworking-finishing" element={<CreativeHub />} />
                  <Route path="/autobody-finishing" element={<CreativeHub />} />
                  <Route path="/reports" element={<Analytics />} />
                  <Route path="/users" element={<Administration />} />
                  <Route path="/settings" element={<Administration />} />
                  <Route path="/resources-app" element={<Administration />} />
                </Route>
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </QueryProvider>
        </AuthProvider>
      </DevModeProvider>
    </Router>
  );
}

export default App;
