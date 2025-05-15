
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRange } from "@/hooks/useReportsData";

interface QualityMetricsProps {
  dateRange: DateRange;
  detailed?: boolean;
  data: any[];
  isLoading: boolean;
}

export function QualityMetrics({ dateRange, detailed = false, data, isLoading }: QualityMetricsProps) {
  // Format date labels based on date range
  const formatData = () => {
    if (!data || data.length === 0) return [];
    
    return data.map(item => {
      let name = item.date;
      
      // Format the name based on date range
      if (dateRange === "week") {
        const date = new Date(item.date);
        name = date.toLocaleDateString('en-US', { weekday: 'short' });
      } else if (dateRange === "month") {
        name = item.date.split('-')[2]; // Get day number
      } else if (dateRange === "quarter") {
        const date = new Date(item.date);
        name = date.toLocaleDateString('en-US', { month: 'short' });
      } else if (dateRange === "year") {
        const date = new Date(item.date);
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        name = `Q${quarter}`;
      }
      
      return {
        ...item,
        name
      };
    });
  };

  const formattedData = formatData();
  const chartConfig = {
    defect_rate: { label: "Defect Rate (%)", theme: { light: "#ef4444", dark: "#ef4444" } }, // Red
    first_pass_yield: { label: "First Pass Yield (%)", theme: { light: "#22c55e", dark: "#22c55e" } }, // Green
    rework: { label: "Rework Rate (%)", theme: { light: "#f59e0b", dark: "#f59e0b" } } // Orange
  };

  // Calculate metrics
  const avgDefectRate = data.length > 0 ? +(data.reduce((sum, item) => sum + Number(item.defect_rate), 0) / data.length).toFixed(2) : 0;
  const avgYield = data.length > 0 ? +(data.reduce((sum, item) => sum + Number(item.first_pass_yield), 0) / data.length).toFixed(2) : 0;
  const avgRework = data.length > 0 ? +(data.reduce((sum, item) => sum + Number(item.rework), 0) / data.length).toFixed(2) : 0;

  if (isLoading) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] border rounded-lg">
        <p className="text-muted-foreground">No quality metrics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {detailed && (
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-red-500">{avgDefectRate}%</div>
              <div className="text-sm text-muted-foreground">Avg Defect Rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-green-500">{avgYield}%</div>
              <div className="text-sm text-muted-foreground">Avg First Pass Yield</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-amber-500">{avgRework}%</div>
              <div className="text-sm text-muted-foreground">Avg Rework Rate</div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <ChartContainer config={chartConfig} className="aspect-[4/3]">
        <ResponsiveContainer width="100%" height={detailed ? 400 : 300}>
          <LineChart
            data={formattedData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              yAxisId="left"
              orientation="left"
              domain={[0, 2]} 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Defect & Rework %', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={[95, 100]} 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              label={{ value: 'First Pass Yield %', angle: -90, position: 'insideRight' }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="defect_rate" 
              stroke="var(--color-defect_rate)" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="first_pass_yield" 
              stroke="var(--color-first_pass_yield)" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="rework" 
              stroke="var(--color-rework)" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
