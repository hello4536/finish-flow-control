
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Workflows from "./pages/Workflows";
import Materials from "./pages/Materials";
import Inventory from "./pages/inventory";
import Quality from "./pages/Quality";
import Schedule from "./pages/Schedule";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
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
            <Route path="schedule" element={<Schedule />} />
            <Route path="resources" element={<Resources />} />
            <Route path="reports" element={<NotFound />} />
            <Route path="users" element={<NotFound />} />
            <Route path="settings" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
