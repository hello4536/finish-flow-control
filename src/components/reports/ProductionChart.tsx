
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRange } from "@/hooks/useReportsData";

interface ProductionChartProps {
  dateRange: DateRange;
  detailed?: boolean;
  data: any[];
  isLoading: boolean;
}

export function ProductionChart({ dateRange, detailed = false, data, isLoading }: ProductionChartProps) {
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
    completed: { label: "Completed", theme: { light: "#0b2065", dark: "#2563eb" } }, // Navy blue
    planned: { label: "Planned", theme: { light: "#f59e0b", dark: "#f59e0b" } }, // Orange
    inProgress: { label: "In Progress", theme: { light: "#93c5fd", dark: "#60a5fa" } } // Light blue
  };

  if (isLoading) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] border rounded-lg">
        <p className="text-muted-foreground">No production data available</p>
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="aspect-[4/3]">
      <ResponsiveContainer width="100%" height={detailed ? 400 : 300}>
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
            tickFormatter={(value) => `${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="completed"
            fill="var(--color-completed)"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="planned"
            fill="var(--color-planned)"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
            strokeDasharray="3 3"
            stroke="#333"
            fillOpacity={0.2}
          />
          {detailed && (
            <Bar
              dataKey="in_progress"
              name="inProgress"
              fill="var(--color-inProgress)"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
