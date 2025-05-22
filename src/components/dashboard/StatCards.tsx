import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Calendar, CheckSquare, PackageOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
const StatCards: React.FC = () => {
  const {
    user
  } = useAuth();
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
        // Fetch active jobs count
        const {
          data: activeJobs,
          error: activeJobsError
        } = await supabase.from('jobs').select('id').eq('status', 'in_progress');

        // Fetch jobs due today
        const today = new Date().toISOString().split('T')[0];
        const {
          data: dueJobs,
          error: dueJobsError
        } = await supabase.from('jobs').select('id').eq('due_date', today);

        // Fetch QC pending inspections
        const {
          data: qcPending,
          error: qcError
        } = await supabase.from('quality_inspections').select('id').eq('status', 'Pending');

        // Fetch low stock inventory items
        const {
          data: lowStock,
          error: lowStockError
        } = await supabase.from('inventory_items').select('id').eq('status', 'Low Stock');
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
        setStats(prev => ({
          ...prev,
          loading: false
        }));
      }
    }
    if (user) {
      fetchDashboardStats();
    } else {
      setStats({
        activeJobs: 0,
        jobsDueToday: 0,
        qcPending: 0,
        lowStockItems: 0,
        loading: false
      });
    }
  }, [user]);

  // Show loading skeletons if data is still being fetched
  const renderStats = (value: number, loading: boolean) => {
    if (loading) {
      return <div className="h-8 w-16 animate-pulse bg-muted rounded"></div>;
    }
    return <div className="text-2xl font-bold">{value}</div>;
  };
  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="font-medium text-sky-500 text-base">Active Jobs</CardTitle>
          <ClipboardList className="h-4 w-4 text-sky-500" />
        </CardHeader>
        <CardContent>
          {renderStats(stats.activeJobs, stats.loading)}
          <p className="text-xs text-muted-foreground mt-1">
            Ongoing projects
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="font-medium text-sky-500 text-base">Due Today</CardTitle>
          <Calendar className="h-4 w-4 text-sky-500" />
        </CardHeader>
        <CardContent>
          {renderStats(stats.jobsDueToday, stats.loading)}
          <p className="text-xs text-muted-foreground mt-1">
            Deadlines today
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="font-medium text-sky-500 text-base">QC Pending</CardTitle>
          <CheckSquare className="h-4 w-4 text-sky-500" />
        </CardHeader>
        <CardContent>
          {renderStats(stats.qcPending, stats.loading)}
          <p className="text-xs text-muted-foreground mt-1">
            Awaiting inspection
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="font-medium text-red-500 text-base">Low Stock</CardTitle>
          <PackageOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {renderStats(stats.lowStockItems, stats.loading)}
          <p className="text-xs text-muted-foreground mt-1">
            Items to reorder
          </p>
        </CardContent>
      </Card>
    </div>;
};
export default StatCards;