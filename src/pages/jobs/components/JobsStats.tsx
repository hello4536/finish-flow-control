import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
const JobsStats: React.FC = () => {
  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
    onHold: 0,
    upcoming: 0,
    loading: true
  });
  useEffect(() => {
    async function fetchJobStats() {
      try {
        // Get active jobs (in_progress)
        const {
          data: activeJobs,
          error: activeError
        } = await supabase.from('jobs').select('id').eq('status', 'in_progress');

        // Get completed jobs this month
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const {
          data: completedJobs,
          error: completedError
        } = await supabase.from('jobs').select('id').eq('status', 'complete').gte('updated_at', firstDayOfMonth.toISOString());

        // Get on-hold jobs
        const {
          data: onHoldJobs,
          error: onHoldError
        } = await supabase.from('jobs').select('id').eq('status', 'on_hold');

        // Get upcoming jobs
        const {
          data: upcomingJobs,
          error: upcomingError
        } = await supabase.from('jobs').select('id').eq('status', 'upcoming');
        if (activeError || completedError || onHoldError || upcomingError) {
          throw new Error('Error fetching job statistics');
        }
        setStats({
          active: activeJobs?.length || 0,
          completed: completedJobs?.length || 0,
          onHold: onHoldJobs?.length || 0,
          upcoming: upcomingJobs?.length || 0,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching job statistics:', error);
        setStats(prev => ({
          ...prev,
          loading: false
        }));
      }
    }
    fetchJobStats();
  }, []);
  const renderStatValue = (value: number, isLoading: boolean) => {
    if (isLoading) {
      return <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>;
    }
    return <div className="text-3xl font-bold">{value}</div>;
  };
  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-blue-500 to-blue-600">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-white/10">
          <CardTitle className="text-lg text-white font-bold">Active Jobs</CardTitle>
          <Clock className="h-5 w-5 text-white" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-white">
            {renderStatValue(stats.active, stats.loading)}
            <p className="text-white/80 mt-1 text-base font-semibold">Currently in progress</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-green-500 to-green-600">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-white/10">
          <CardTitle className="text-lg text-white font-bold">Completed</CardTitle>
          <CheckCircle className="h-5 w-5 text-white" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-white">
            {renderStatValue(stats.completed, stats.loading)}
            <p className="text-white/80 mt-1 text-base">This month</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-amber-500 to-amber-600">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-white/10">
          <CardTitle className="text-white text-lg font-bold">On Hold</CardTitle>
          <AlertCircle className="h-5 w-5 text-white" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-white">
            {renderStatValue(stats.onHold, stats.loading)}
            <p className="text-white/80 mt-1 text-base">Awaiting action</p>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-purple-500 to-purple-600">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-white/10">
          <CardTitle className="text-white text-lg font-bold">Upcoming</CardTitle>
          <Calendar className="h-5 w-5 text-white" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-white">
            {renderStatValue(stats.upcoming, stats.loading)}
            <p className="text-white/80 mt-1 text-base">Scheduled jobs</p>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default JobsStats;