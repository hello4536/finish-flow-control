
import React, { useMemo } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRange } from "@/hooks/useReportsData";

interface EfficiencyReportProps {
  dateRange: DateRange;
  detailed?: boolean;
  data: any[];
  kpiData: any[];
  isLoading: boolean;
}

export function EfficiencyReport({ dateRange, detailed = false, data, kpiData, isLoading }: EfficiencyReportProps) {
  // Format date labels based on date range
  const formattedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    return data.map(item => {
      let name = item.date;
      
      // Format the name based on date range
      if (dateRange === "week") {
        const date = new Date(item.date);
        name = date.toLocaleDateString('en-US', { weekday: 'short' });
      } else if (dateRange === "month") {
        const week = Math.ceil(parseInt(item.date.split('-')[2]) / 7);
        name = `W${week}`;
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
  }, [data, dateRange]);

  const chartConfig = {
    efficiency: { label: "Efficiency (%)", theme: { light: "#22c55e", dark: "#22c55e" } }, // Green
    downtime: { label: "Downtime (%)", theme: { light: "#ef4444", dark: "#ef4444" } }, // Red
    utilization: { label: "Utilization (%)", theme: { light: "#f59e0b", dark: "#f59e0b" } }, // Orange
    A: { label: "Performance", theme: { light: "#0b2065", dark: "#0b2065" } } // Navy
  };

  // Calculate averages
  const avgEfficiency = data.length > 0 ? Math.round(data.reduce((sum, item) => sum + item.efficiency, 0) / data.length) : 0;
  const avgDowntime = data.length > 0 ? +(data.reduce((sum, item) => sum + Number(item.downtime), 0) / data.length).toFixed(1) : 0;
  const avgUtilization = data.length > 0 ? Math.round(data.reduce((sum, item) => sum + item.utilization, 0) / data.length) : 0;

  if (isLoading) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] border rounded-lg">
        <p className="text-muted-foreground">No efficiency data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {detailed && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-green-600">{avgEfficiency}%</div>
              <div className="text-sm text-muted-foreground">Avg Efficiency</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-red-500">{avgDowntime}%</div>
              <div className="text-sm text-muted-foreground">Avg Downtime</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-amber-500">{avgUtilization}%</div>
              <div className="text-sm text-muted-foreground">Avg Utilization</div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className={detailed ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : ""}>
        <ChartContainer config={chartConfig} className="aspect-[4/3]">
          <BarChart
            data={formattedData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              scale="point"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar
              dataKey="efficiency"
              fill="var(--color-efficiency)"
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
            />
            <Bar
              dataKey="utilization"
              fill="var(--color-utilization)"
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
            />
            <Bar
              dataKey="downtime"
              fill="var(--color-downtime)"
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
            />
          </BarChart>
        </ChartContainer>
        
        {detailed && kpiData && kpiData.length > 0 && (
          <ChartContainer config={chartConfig} className="aspect-[4/3]">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={kpiData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Performance"
                dataKey="score"
                stroke="var(--color-A)"
                fill="var(--color-A)"
                fillOpacity={0.6}
              />
              <Tooltip content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <div className="font-medium">{payload[0].payload.subject}</div>
                      <div className="text-sm text-muted-foreground">
                        Score: {payload[0].value}%
                      </div>
                    </div>
                  );
                }
                return null;
              }} />
            </RadarChart>
          </ChartContainer>
        )}
      </div>
    </div>
  );
}
