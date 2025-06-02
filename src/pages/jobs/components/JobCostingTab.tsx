
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, AlertTriangle, TrendingUp, Calculator } from 'lucide-react';
import { useJobCosting } from '../hooks/useJobCosting';

interface JobCostingTabProps {
  jobId: string;
}

const JobCostingTab: React.FC<JobCostingTabProps> = ({ jobId }) => {
  const { fetchJobCosting, updateJobCosting, recalculateJobCosts } = useJobCosting();
  const { data: job, isLoading } = fetchJobCosting(jobId);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    estimated_total: 0,
    hourly_rate: 50,
    estimated_hours: 0
  });

  React.useEffect(() => {
    if (job) {
      setFormData({
        estimated_total: job.estimated_total || 0,
        hourly_rate: job.hourly_rate || 50,
        estimated_hours: job.estimated_hours || 0
      });
    }
  }, [job]);

  const handleSave = async () => {
    await updateJobCosting.mutateAsync({
      jobId,
      updates: formData
    });
    setIsEditing(false);
  };

  const handleRecalculate = () => {
    recalculateJobCosts.mutate(jobId);
  };

  const getProfitMarginStatus = (margin: number) => {
    if (margin >= 20) return { color: 'bg-green-100 text-green-800', label: 'Excellent' };
    if (margin >= 15) return { color: 'bg-blue-100 text-blue-800', label: 'Good' };
    if (margin >= 10) return { color: 'bg-yellow-100 text-yellow-800', label: 'Fair' };
    return { color: 'bg-red-100 text-red-800', label: 'Low' };
  };

  const costVariance = job ? (job.actual_total - job.estimated_total) : 0;
  const marginStatus = getProfitMarginStatus(job?.profit_margin || 0);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (!job) {
    return <div className="text-center text-gray-500">Job not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Profit Margin Alert */}
      {job.profit_margin < 10 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            Profit margin is below 10%. Consider reviewing costs and pricing.
          </AlertDescription>
        </Alert>
      )}

      {/* Cost Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Material Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${job.material_cost.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Labor Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${job.labor_cost.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Overhead Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${job.overhead_cost.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{job.profit_margin.toFixed(1)}%</span>
              <Badge className={marginStatus.color}>
                {marginStatus.label}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Cost Estimation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="estimated_total">Estimated Total ($)</Label>
                  <Input
                    id="estimated_total"
                    type="number"
                    step="0.01"
                    value={formData.estimated_total}
                    onChange={(e) => setFormData({ ...formData, estimated_total: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
                  <Input
                    id="hourly_rate"
                    type="number"
                    step="0.01"
                    value={formData.hourly_rate}
                    onChange={(e) => setFormData({ ...formData, hourly_rate: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="estimated_hours">Estimated Hours</Label>
                  <Input
                    id="estimated_hours"
                    type="number"
                    step="0.25"
                    value={formData.estimated_hours}
                    onChange={(e) => setFormData({ ...formData, estimated_hours: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={updateJobCosting.isPending}>
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Total:</span>
                  <span className="font-medium">${job.estimated_total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hourly Rate:</span>
                  <span className="font-medium">${job.hourly_rate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Hours:</span>
                  <span className="font-medium">{job.estimated_hours.toFixed(2)}</span>
                </div>
                <Button onClick={() => setIsEditing(true)} className="w-full mt-4">
                  Edit Estimates
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Cost Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Total:</span>
                <span className="font-medium">${job.estimated_total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Actual Total:</span>
                <span className="font-medium">${job.actual_total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Cost Variance:</span>
                <span className={`font-medium ${costVariance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {costVariance > 0 ? '+' : ''}${costVariance.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Profit Margin:</span>
                <span className={`font-medium ${job.profit_margin >= 15 ? 'text-green-600' : job.profit_margin >= 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {job.profit_margin.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <Button 
              onClick={handleRecalculate} 
              disabled={recalculateJobCosts.isPending}
              className="w-full"
              variant="outline"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Recalculate Costs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobCostingTab;
