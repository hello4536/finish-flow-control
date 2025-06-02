
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { DevModeProvider } from './context/DevModeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthLayout from './components/layout/AuthLayout';
import MainLayout from './components/layout/MainLayout';

// Page imports
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Materials from './pages/Materials';
import Reports from './pages/Reports';
import DailyTasks from './pages/DailyTasks';
import Schedule from './pages/Schedule';
import Resources from './pages/Resources';
import CustomCreations from './pages/CustomCreations';
import AutoBodyFinishing from './pages/AutoBodyFinishing';
import WoodworkingFinishing from './pages/WoodworkingFinishing';
import TestingPlan from './pages/TestingPlan';
import NotFound from './pages/NotFound';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import VerifyPage from './pages/auth/VerifyPage';
import Users from './pages/Users';
import SubscriptionPage from './pages/SubscriptionPage';
import Settings from './pages/Settings';
import InventoryPage from './pages/inventory';
import EquipmentPage from './pages/equipment';
import CompliancePage from './pages/compliance';
import QualityPage from './pages/quality/QualityPage';
import WorkflowsPage from './pages/workflows';
import SprayBoothSchedulerPage from './pages/spray-booth/SprayBoothSchedulerPage';
import AutomationPage from './pages/automation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DevModeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/auth/*" element={<AuthLayout />}>
                  <Route path="signin" element={<SignInPage />} />
                  <Route path="signup" element={<SignUpPage />} />
                  <Route path="verify" element={<VerifyPage />} />
                </Route>

                {/* Protected routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Dashboard />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Jobs />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/materials"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Materials />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/inventory"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <InventoryPage />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/equipment"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <EquipmentPage />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/compliance"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <CompliancePage />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/quality"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <QualityPage />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/automation"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <AutomationPage />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/workflows"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <WorkflowsPage />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/spray-booth"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <SprayBoothSchedulerPage />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Reports />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tasks"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <DailyTasks />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/schedule"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Schedule />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/resources"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Resources />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/custom-creations"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <CustomCreations />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/autobody-finishing"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <AutoBodyFinishing />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/woodworking-finishing"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <WoodworkingFinishing />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/testing-plan"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <TestingPlan />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Users />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subscription"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <SubscriptionPage />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Settings />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                
                {/* Redirect old routes */}
                <Route path="/admin/*" element={<Navigate to="/dashboard" replace />} />
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
          <Toaster position="top-right" />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </DevModeProvider>
    </QueryClientProvider>
  );
}

export default App;
