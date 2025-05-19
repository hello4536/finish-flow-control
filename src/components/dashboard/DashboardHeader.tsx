
import React from "react";
import { Button } from "@/components/ui/button";

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-3xl font-bold tracking-tight text-[#0b2065]">Dashboard</h2>
      <div className="mt-2 flex items-center space-x-2 sm:mt-0">
        <Button variant="outline" size="sm">
          Last 7 days
        </Button>
        <Button size="sm" className="rounded-sm bg-orange-500 hover:bg-orange-400 text-slate-50">View All</Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
