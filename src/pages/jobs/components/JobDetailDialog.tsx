
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, Package, Activity } from 'lucide-react';
import JobCostingTab from './JobCostingTab';
import JobMaterialsTab from './JobMaterialsTab';

interface Job {
  id: string;
  job_number: string;
  name: string;
  status: string;
  trade: string;
  assigned_to?: string;
  due_date?: string;
  current_step?: string;
  material_cost?: number;
  labor_cost?: number;
  overhead_cost?: number;
  estimated_total?: number;
  actual_total?: number;
  profit_margin?: number;
}

interface JobDetailDialogProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JobDetailDialog: React.FC<JobDetailDialogProps> = ({ job, open, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!job) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'on hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProfitMarginColor = (margin: number) => {
    if (margin >= 20) return 'text-green-600';
    if (margin >= 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">{job.name}</span>
              <span className="text-lg text-gray-500 ml-3">#{job.job_number}</span>
            </div>
            <Badge className={getStatusColor(job.status)}>
              {job.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-2xl p-2">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="costing" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Costing</span>
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Materials</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Job Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Trade:</span>
                    <p className="font-medium">{job.trade}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Assigned To:</span>
                    <p className="font-medium">{job.assigned_to || 'Unassigned'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Due Date:</span>
                    <p className="font-medium">{job.due_date ? new Date(job.due_date).toLocaleDateString() : 'Not set'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Current Step:</span>
                    <p className="font-medium">{job.current_step || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Estimated Total:</span>
                    <span className="font-medium">${(job.estimated_total || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Actual Total:</span>
                    <span className="font-medium">${(job.actual_total || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Profit Margin:</span>
                    <span className={`font-medium ${getProfitMarginColor(job.profit_margin || 0)}`}>
                      {(job.profit_margin || 0).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="costing">
            <JobCostingTab jobId={job.id} />
          </TabsContent>

          <TabsContent value="materials">
            <JobMaterialsTab jobNumber={job.job_number} />
          </TabsContent>

          <TabsContent value="timeline">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Timeline & Milestones</h3>
              <p className="text-gray-500">Timeline functionality coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailDialog;
