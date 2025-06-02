
import React from "react";
import { Button } from "@/components/ui/button";
import { useDevMode } from "@/context/DevModeContext";
import { Link } from "react-router-dom";
import { FileCheck } from "lucide-react";

const DashboardHeader: React.FC = () => {
  const { isDevMode } = useDevMode();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-slate-600 mt-2 font-medium">
          Welcome back to your refinishing management platform
        </p>
      </div>
      <div className="flex items-center gap-2">
        {isDevMode && (
          <Button 
            asChild 
            variant="outline" 
            size="sm" 
            className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white transition-all duration-300"
          >
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
