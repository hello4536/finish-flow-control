
import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCards from "@/components/dashboard/StatCards";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import EmployeeTasks from "@/components/dashboard/EmployeeTasks";
import DueToday from "@/components/dashboard/DueToday";
import MaterialUsage from "@/components/dashboard/MaterialUsage";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      <StatCards />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ActivityFeed />
        <EmployeeTasks />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DueToday />
        <MaterialUsage />
      </div>
    </div>
  );
};

export default Dashboard;
