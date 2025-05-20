
import React from "react";
import { Button } from "@/components/ui/button";
import { useDevMode } from "@/context/DevModeContext";
import { Link } from "react-router-dom";
import { FileCheck } from "lucide-react";

const DashboardHeader: React.FC = () => {
  const { isDevMode } = useDevMode();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back to your refinishing management platform
        </p>
      </div>
      <div className="mt-4 sm:mt-0 flex items-center gap-2">
        {isDevMode && (
          <Button asChild variant="outline" size="sm" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
            <Link to="/testing-plan">
              <FileCheck className="mr-2 h-4 w-4" />
              Testing Plan
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
