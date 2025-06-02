
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Calendar, CheckSquare, PackageOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const StatCards: React.FC = () => {
  const { user } = useAuth();
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
        setStats(prev => ({ ...prev, loading: false }));
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

  const renderStats = (value: number, loading: boolean, isWarning: boolean = false) => {
    if (loading) {
      return <div className="h-10 w-16 animate-pulse bg-slate-200 rounded mx-auto"></div>;
    }
    const colorClass = isWarning ? 'text-red-800' : 'text-blue-800';
    return <div className={`text-4xl font-bold ${colorClass} mb-1`}>{value}</div>;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Active Jobs Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Active Jobs</div>
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg">
              <ClipboardList className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            {renderStats(stats.activeJobs, stats.loading)}
            <div className="text-sm text-blue-600 font-medium">Ongoing projects</div>
          </div>
        </CardContent>
      </Card>

      {/* Due Today Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-50 to-orange-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Due Today</div>
            <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-3 shadow-lg">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            {renderStats(stats.jobsDueToday, stats.loading)}
            <div className="text-sm text-amber-600 font-medium">Deadlines today</div>
          </div>
        </CardContent>
      </Card>

      {/* QC Pending Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-violet-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-purple-700 uppercase tracking-wide">QC Pending</div>
            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 p-3 shadow-lg">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            {renderStats(stats.qcPending, stats.loading)}
            <div className="text-sm text-purple-600 font-medium">Awaiting inspection</div>
          </div>
        </CardContent>
      </Card>

      {/* Low Stock Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-red-50 to-rose-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-red-700 uppercase tracking-wide">Low Stock</div>
            <div className="rounded-xl bg-gradient-to-br from-red-500 to-rose-600 p-3 shadow-lg">
              <PackageOpen className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            {renderStats(stats.lowStockItems, stats.loading, true)}
            <div className="text-sm text-red-600 font-medium">Items to reorder</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
