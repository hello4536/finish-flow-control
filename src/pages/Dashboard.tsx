
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
      
      <div className="grid gap-4 lg:grid-cols-4">
        <ActivityFeed />
        <EmployeeTasks />
        <DueToday />
        <MaterialUsage />
      </div>
    </div>
  );
};

export default Dashboard;
