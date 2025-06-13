
import React from "react";
import { Button } from "@/components/ui/button";
import { useDevMode } from "@/context/DevModeContext";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { FileCheck } from "lucide-react";

const DashboardHeader: React.FC = () => {
  const { isDevMode } = useDevMode();
  const { user, profile, isLoading } = useAuth();

  // Get the user's name from profile or fallback to email
  const getUserName = () => {
    if (isLoading) return "...";
    if (profile?.full_name) return profile.full_name.split(' ')[0];
    if (user?.email) return user.email.split('@')[0];
    return "there";
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-slate-600 mt-2 font-medium">
          Welcome, {getUserName()}.
        </p>
      </div>
      <div className="flex items-center gap-2">
        {isDevMode && (
          <Button asChild variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white transition-all duration-300">
            <Link to="/testing-plan">
              Testing Plan
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
