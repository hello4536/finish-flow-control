
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

type DateRange = "week" | "month" | "quarter" | "year";

interface EfficiencyReportProps {
  dateRange: DateRange;
  detailed?: boolean;
}

export function EfficiencyReport({ dateRange, detailed = false }: EfficiencyReportProps) {
  // Generate mock data based on date range
  const generateEfficiencyData = () => {
    let data = [];
    
    switch(dateRange) {
      case "week":
        data = [
          { name: "Mon", efficiency: 82, downtime: 8, utilization: 78 },
          { name: "Tue", efficiency: 85, downtime: 6, utilization: 80 },
          { name: "Wed", efficiency: 88, downtime: 5, utilization: 83 },
          { name: "Thu", efficiency: 86, downtime: 7, utilization: 81 },
          { name: "Fri", efficiency: 84, downtime: 6.5, utilization: 79 },
          { name: "Sat", efficiency: 80, downtime: 9, utilization: 75 },
          { name: "Sun", efficiency: 78, downtime: 10, utilization: 73 },
        ];
        break;
      case "month":
        data = Array.from({ length: detailed ? 12 : 5 }, (_, i) => ({
          name: detailed ? `Week ${i+1}` : `W${i+1}`,
          efficiency: Math.floor(Math.random() * 15) + 75,
          downtime: Math.floor(Math.random() * 10) + 3,
          utilization: Math.floor(Math.random() * 12) + 75
        }));
        break;
      case "quarter":
        data = [
          { name: "Jan", efficiency: 83, downtime: 7, utilization: 79 },
          { name: "Feb", efficiency: 85, downtime: 6.5, utilization: 80 },
          { name: "Mar", efficiency: 87, downtime: 5.5, utilization: 82 },
        ];
        break;
      case "year":
        data = [
          { name: "Q1", efficiency: 85, downtime: 6.5, utilization: 80 },
          { name: "Q2", efficiency: 86, downtime: 6, utilization: 82 },
          { name: "Q3", efficiency: 87, downtime: 5.5, utilization: 83 },
          { name: "Q4", efficiency: 88, downtime: 5, utilization: 84 },
        ];
        break;
    }
    
    return data;
  };
  
  // For radar chart (only when detailed is true)
  const generateKpiData = () => {
    return [
      { subject: 'OEE', A: 85, fullMark: 100 },
      { subject: 'Throughput', A: 78, fullMark: 100 },
      { subject: 'Quality', A: 92, fullMark: 100 },
      { subject: 'Delivery', A: 88, fullMark: 100 },
      { subject: 'Safety', A: 95, fullMark: 100 },
      { subject: 'Cost', A: 82, fullMark: 100 },
    ];
  };

  const efficiencyData = generateEfficiencyData();
  const kpiData = generateKpiData();

  const chartConfig = {
    efficiency: { label: "Efficiency (%)", theme: { light: "#22c55e", dark: "#22c55e" } }, // Green
    downtime: { label: "Downtime (%)", theme: { light: "#ef4444", dark: "#ef4444" } }, // Red
    utilization: { label: "Utilization (%)", theme: { light: "#f59e0b", dark: "#f59e0b" } }, // Orange
    A: { label: "Performance", theme: { light: "#0b2065", dark: "#0b2065" } } // Navy
  };

  // Calculate averages
  const avgEfficiency = Math.round(efficiencyData.reduce((sum, item) => sum + item.efficiency, 0) / efficiencyData.length);
  const avgDowntime = +(efficiencyData.reduce((sum, item) => sum + item.downtime, 0) / efficiencyData.length).toFixed(1);
  const avgUtilization = Math.round(efficiencyData.reduce((sum, item) => sum + item.utilization, 0) / efficiencyData.length);

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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={efficiencyData}
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
          </ResponsiveContainer>
        </ChartContainer>
        
        {detailed && (
          <ChartContainer config={chartConfig} className="aspect-[4/3]">
            <div className="text-center mb-2 font-medium">KPI Performance</div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={kpiData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Performance"
                  dataKey="A"
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
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </div>
    </div>
  );
}
