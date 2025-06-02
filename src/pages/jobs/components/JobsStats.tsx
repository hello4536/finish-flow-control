
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, AlertTriangle, CheckCircle, CalendarClock } from "lucide-react";
import { useJobsStatsData } from "../hooks/useJobsStatsData";
import LoadingSpinner from "./LoadingSpinner";

const JobsStats: React.FC = () => {
  const { stats, isLoading } = useJobsStatsData();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* In Progress Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">In Progress</div>
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">{stats.inProgress}</div>
            <div className="text-sm text-slate-600 font-medium">Active jobs</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Overdue Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-red-50/30 to-rose-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-red-700 uppercase tracking-wide">Overdue</div>
            <div className="rounded-xl bg-gradient-to-br from-red-500 to-rose-600 p-3 shadow-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent mb-1">{stats.overdue}</div>
            <div className="text-sm text-slate-600 font-medium">Need attention</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Completed Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-green-50/30 to-emerald-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-green-700 uppercase tracking-wide">Completed</div>
            <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-3 shadow-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">{stats.completed}</div>
            <div className="text-sm text-slate-600 font-medium">Successfully finished</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Upcoming Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-amber-50/30 to-orange-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Upcoming</div>
            <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-3 shadow-lg">
              <CalendarClock className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1">{stats.upcoming}</div>
            <div className="text-sm text-slate-600 font-medium">Scheduled soon</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobsStats;
