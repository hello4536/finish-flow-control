
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Calendar, CheckSquare, PackageOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useDevMode } from "@/context/DevModeContext";

const StatCards: React.FC = () => {
  const { isDevMode } = useDevMode();
  const [stats, setStats] = useState({
    activeJobs: 0,
    jobsDueToday: 0,
    qcPending: 0,
    lowStockItems: 0,
    loading: true
  });

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        if (isDevMode) {
          // Use mock data when in dev mode
          setStats({
            activeJobs: 12,
            jobsDueToday: 4,
            qcPending: 7,
            lowStockItems: 3,
            loading: false
          });
          return;
        }
        
        // Fetch active jobs count
        const { data: activeJobs, error: activeJobsError } = await supabase
          .from('jobs')
          .select('id')
          .eq('status', 'in_progress');
          
        // Fetch jobs due today
        const today = new Date().toISOString().split('T')[0];
        const { data: dueJobs, error: dueJobsError } = await supabase
          .from('jobs')
          .select('id')
          .eq('due_date', today);
          
        // Fetch QC pending inspections
        const { data: qcPending, error: qcError } = await supabase
          .from('quality_inspections')
          .select('id')
          .eq('status', 'Pending');
          
        // Fetch low stock inventory items
        const { data: lowStock, error: lowStockError } = await supabase
          .from('inventory_items')
          .select('id')
          .eq('status', 'Low Stock');
        
        if (activeJobsError || dueJobsError || qcError || lowStockError) {
          console.error("Error fetching dashboard statistics");
        }
        
        setStats({
          activeJobs: activeJobs?.length || 0,
          jobsDueToday: dueJobs?.length || 0,
          qcPending: qcPending?.length || 0,
          lowStockItems: lowStock?.length || 0,
          loading: false
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setStats(prev => ({...prev, loading: false}));
      }
    }
    
    fetchDashboardStats();
  }, [isDevMode]);

  // Show loading skeletons if data is still being fetched
  const renderStats = (value: number, loading: boolean) => {
    if (loading) {
      return <div className="h-8 w-16 animate-pulse bg-muted rounded"></div>;
    }
    return <div className="text-2xl font-bold">{value}</div>;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {renderStats(stats.activeJobs, stats.loading)}
          <p className="text-xs text-muted-foreground mt-1">
            Ongoing projects
          </p>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-4/5 rounded-full bg-primary"></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Jobs Due Today</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {renderStats(stats.jobsDueToday, stats.loading)}
          <p className="text-xs text-muted-foreground mt-1">
            Require immediate attention
          </p>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-3/4 rounded-full bg-finish-amber-500"></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">QC Pending</CardTitle>
          <CheckSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {renderStats(stats.qcPending, stats.loading)}
          <p className="text-xs text-muted-foreground mt-1">
            Awaiting inspection
          </p>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-2/5 rounded-full bg-finish-green-500"></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
          <PackageOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {renderStats(stats.lowStockItems, stats.loading)}
          <p className="text-xs text-muted-foreground mt-1">
            Items need reordering
          </p>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-1/5 rounded-full bg-finish-red-500"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
