
import React from "react";
import Dashboard from "./Dashboard";
import MainLayout from "@/components/layout/MainLayout";

/**
 * This component is for preview/screenshot purposes only
 * It renders the Dashboard without requiring authentication
 */
const PreviewDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen w-full flex-col">
        <Dashboard />
      </div>
    </div>
  );
};

export default PreviewDashboard;
