
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { useMaterialUsage } from '@/hooks/useMaterialUsage';

interface JobMaterialsTabProps {
  jobNumber: string;
}

const JobMaterialsTab: React.FC<JobMaterialsTabProps> = ({ jobNumber }) => {
  const { usageLogs, isLogsLoading } = useMaterialUsage();

  const jobMaterials = usageLogs.filter(log => log.job_reference === jobNumber);
  const totalMaterialCost = jobMaterials.reduce((sum, log) => sum + (log.total_cost || 0), 0);

  if (isLogsLoading) {
    return <div className="flex items-center justify-center h-64">Loading materials...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Material Usage Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{jobMaterials.length}</div>
              <div className="text-sm text-gray-500">Materials Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${totalMaterialCost.toFixed(2)}</div>
              <div className="text-sm text-gray-500">Total Cost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {jobMaterials.reduce((sum, log) => sum + log.quantity, 0).toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">Total Quantity</div>
            </div>
          </div>

          {jobMaterials.length > 0 ? (
            <div className="space-y-3">
              <h4 className="font-semibold">Material Usage Details</h4>
              <div className="space-y-2">
                {jobMaterials.map((log) => (
                  <div key={log.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{log.materials?.name || 'Unknown Material'}</div>
                      <div className="text-sm text-gray-500">
                        Used: {log.quantity} {log.unit} on {new Date(log.used_at).toLocaleDateString()}
                      </div>
                      {log.used_by && (
                        <div className="text-sm text-gray-500">By: {log.used_by}</div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${(log.total_cost || 0).toFixed(2)}</div>
                      {log.unit_cost && (
                        <div className="text-sm text-gray-500">${log.unit_cost.toFixed(2)}/{log.unit}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No materials have been allocated to this job yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobMaterialsTab;
