
import React from "react";
import { Card } from "@/components/ui/card";
import { Clock, AlertTriangle, CheckCircle, CalendarClock } from "lucide-react";
import { useJobsStatsData } from "../hooks/useJobsStatsData";
import LoadingSpinner from "./LoadingSpinner";

const JobsStats: React.FC = () => {
  const { stats, isLoading } = useJobsStatsData();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* In Progress Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">In Progress</div>
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg">
              <Clock className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-blue-800 mb-1">{stats.inProgress}</div>
            <div className="text-sm text-blue-600 font-medium">Active jobs</div>
          </div>
        </div>
      </Card>
      
      {/* Overdue Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-red-50 to-rose-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-red-700 uppercase tracking-wide">Overdue</div>
            <div className="rounded-xl bg-gradient-to-br from-red-500 to-rose-600 p-3 shadow-lg">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-red-800 mb-1">{stats.overdue}</div>
            <div className="text-sm text-red-600 font-medium">Need attention</div>
          </div>
        </div>
      </Card>
      
      {/* Completed Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-green-700 uppercase tracking-wide">Completed</div>
            <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-3 shadow-lg">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-green-800 mb-1">{stats.completed}</div>
            <div className="text-sm text-green-600 font-medium">Successfully finished</div>
          </div>
        </div>
      </Card>
      
      {/* Upcoming Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-50 to-orange-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Upcoming</div>
            <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-3 shadow-lg">
              <CalendarClock className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-amber-800 mb-1">{stats.upcoming}</div>
            <div className="text-sm text-amber-600 font-medium">Scheduled soon</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobsStats;
