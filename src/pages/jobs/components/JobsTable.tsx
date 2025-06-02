
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, DollarSign } from 'lucide-react';
import JobDetailDialog from './JobDetailDialog';

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

interface JobsTableProps {
  jobs: Job[];
  isLoading: boolean;
}

const JobsTable: React.FC<JobsTableProps> = ({ jobs, isLoading }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Job #</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Trade</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Estimated</TableHead>
              <TableHead>Actual</TableHead>
              <TableHead>Profit %</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{job.job_number}</TableCell>
                <TableCell>{job.name}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(job.status)}>
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>{job.trade}</TableCell>
                <TableCell>{job.assigned_to || 'Unassigned'}</TableCell>
                <TableCell>
                  {job.due_date ? new Date(job.due_date).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-gray-400" />
                    {(job.estimated_total || 0).toFixed(0)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-gray-400" />
                    {(job.actual_total || 0).toFixed(0)}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`font-medium ${getProfitMarginColor(job.profit_margin || 0)}`}>
                    {(job.profit_margin || 0).toFixed(1)}%
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewJob(job)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {jobs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No jobs found
          </div>
        )}
      </div>

      <JobDetailDialog
        job={selectedJob}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};

export default JobsTable;
