
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
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
import { initializeApp } from "./utils/initializeApp";

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
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
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
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
