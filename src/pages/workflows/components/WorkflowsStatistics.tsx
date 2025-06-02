
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Workflow, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { Workflow as WorkflowType } from '../utils/types';

interface WorkflowsStatisticsProps {
  workflows: WorkflowType[];
  isLoading?: boolean;
}

const WorkflowsStatistics: React.FC<WorkflowsStatisticsProps> = ({ 
  workflows, 
  isLoading = false 
}) => {
  // Calculate metrics
  const totalWorkflows = workflows.length;
  const activeWorkflows = workflows.filter(w => w.status === 'active').length;
  const archivedWorkflows = workflows.filter(w => w.status === 'archived').length;
  const totalActiveJobs = workflows.reduce((sum, w) => sum + (w.active_jobs || 0), 0);

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="relative overflow-hidden border-0 bg-gradient-to-br from-gray-50 to-slate-100 shadow-lg">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {/* Total Workflows Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Total Workflows</div>
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg">
              <Workflow className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-blue-800 mb-1">{totalWorkflows}</div>
            <div className="text-sm text-blue-600 font-medium">Configured workflows</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Active Workflows Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-green-700 uppercase tracking-wide">Active Workflows</div>
            <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-3 shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-green-800 mb-1">{activeWorkflows}</div>
            <div className="text-sm text-green-600 font-medium">Currently running</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Archived Workflows Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-violet-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Archived</div>
            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 p-3 shadow-lg">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-purple-800 mb-1">{archivedWorkflows}</div>
            <div className="text-sm text-purple-600 font-medium">Completed workflows</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Active Jobs Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-50 to-amber-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Active Jobs</div>
            <div className="rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 p-3 shadow-lg">
              <Clock className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <div className="text-4xl font-bold text-orange-800 mb-1">{totalActiveJobs}</div>
            <div className="text-sm text-orange-600 font-medium">Jobs in progress</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowsStatistics;
