
import React from "react";
import Dashboard from "./Dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

/**
 * This component is for preview/screenshot purposes only
 * It renders the Dashboard without requiring authentication
 */
const PreviewDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-1">
            <AppSidebar />
            <main className="flex-1 overflow-auto p-4 md:p-6 bg-sky-50">
              <Dashboard />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default PreviewDashboard;
