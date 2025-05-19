
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingDown } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Material, MaterialUsageLog } from "@/types/materials";

interface UsageHistoryProps {
  material: Material;
  usageLogs: MaterialUsageLog[];
  totalUsage: number;
}

const UsageHistory: React.FC<UsageHistoryProps> = ({ 
  material, 
  usageLogs, 
  totalUsage 
}) => {
  // Group logs by month for the chart
  const usageByMonth = React.useMemo(() => {
    const last6Months = getLastSixMonths();
    const monthlyData: Record<string, number> = {};
    
    // Initialize all months with 0
    last6Months.forEach(month => {
      monthlyData[month.label] = 0;
    });
    
    // Sum up usage by month
    usageLogs.forEach(log => {
      const date = new Date(log.used_at);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      if (monthlyData[monthYear] !== undefined) {
        monthlyData[monthYear] += Number(log.quantity);
      }
    });
    
    // Convert to array for chart
    return Object.keys(monthlyData).map(month => ({
      month,
      usage: monthlyData[month]
    }));
  }, [usageLogs]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Usage Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Total Usage</h4>
              <p className="text-2xl font-bold">{totalUsage} {material.unit}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Current Stock</h4>
              <p className="text-2xl font-bold">{material.quantity} {material.unit}</p>
            </div>
          </div>
          
          <div className="h-60 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} ${material.unit}`, 'Usage']}
                />
                <Bar dataKey="usage" name="Usage">
                  {usageByMonth.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#3b82f6" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingDown className="mr-2 h-5 w-5" />
            Recent Usage Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          {usageLogs.length > 0 ? (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {usageLogs.slice(0, 10).map((log) => (
                <div key={log.id} className="border p-3 rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium">Quantity: {log.quantity} {log.unit}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(log.used_at).toLocaleDateString()}
                    </span>
                  </div>
                  {log.job_reference && (
                    <p className="text-sm">Job: {log.job_reference}</p>
                  )}
                  {log.used_by && (
                    <p className="text-sm">Used by: {log.used_by}</p>
                  )}
                  {log.notes && (
                    <p className="text-sm mt-1 text-muted-foreground">{log.notes}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No usage history recorded.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to get labels for the last 6 months
function getLastSixMonths() {
  const months = [];
  const today = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(today.getMonth() - i);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    months.push({
      date,
      label: monthYear
    });
  }
  
  return months;
}

export default UsageHistory;
