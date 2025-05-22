import React from "react";
import { Card } from "@/components/ui/card";
import { Clock, AlertTriangle, CheckCircle, CalendarClock } from "lucide-react";
import { useJobsStatsData } from "../hooks/useJobsStatsData";
import LoadingSpinner from "./LoadingSpinner";
const JobsStats: React.FC = () => {
  const {
    stats,
    isLoading
  } = useJobsStatsData();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">In Progress</p>
            <p className="text-2xl font-bold">{stats.inProgress}</p>
          </div>
          <div className="rounded-full p-2 bg-sky-100">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-500">Overdue</p>
            <p className="text-2xl font-bold">{stats.overdue}</p>
          </div>
          <div className="rounded-full bg-red-100 p-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-500">Completed</p>
            <p className="text-2xl font-bold">{stats.completed}</p>
          </div>
          <div className="rounded-full bg-green-100 p-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-orange-500">Upcoming</p>
            <p className="text-2xl font-bold">{stats.upcoming}</p>
          </div>
          <div className="rounded-full bg-amber-100 p-2">
            <CalendarClock className="h-5 w-5 text-orange-500" />
          </div>
        </div>
      </Card>
    </div>;
};
export default JobsStats;