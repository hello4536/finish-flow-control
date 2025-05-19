
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        const { data: activeJobs, error: activeError } = await supabase
          .from('jobs')
          .select('id')
          .eq('status', 'in_progress');
          
        // Get completed jobs this month
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const { data: completedJobs, error: completedError } = await supabase
          .from('jobs')
          .select('id')
          .eq('status', 'complete')
          .gte('updated_at', firstDayOfMonth.toISOString());
          
        // Get on-hold jobs
        const { data: onHoldJobs, error: onHoldError } = await supabase
          .from('jobs')
          .select('id')
          .eq('status', 'on_hold');
          
        // Get upcoming jobs
        const { data: upcomingJobs, error: upcomingError } = await supabase
          .from('jobs')
          .select('id')
          .eq('status', 'upcoming');
          
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
        setStats(prev => ({ ...prev, loading: false }));
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

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="bg-primary text-primary-foreground">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Active Jobs</CardTitle>
          <Clock className="h-5 w-5" />
        </CardHeader>
        <CardContent>
          {renderStatValue(stats.active, stats.loading)}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Completed This Month</CardTitle>
          <CheckCircle className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {renderStatValue(stats.completed, stats.loading)}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">On Hold</CardTitle>
          <AlertCircle className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {renderStatValue(stats.onHold, stats.loading)}
        </CardContent>
      </Card>

      <Card className="bg-blue-50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Upcoming Jobs</CardTitle>
          <Calendar className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {renderStatValue(stats.upcoming, stats.loading)}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobsStats;
