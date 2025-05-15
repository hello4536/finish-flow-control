
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

type DateRange = "week" | "month" | "quarter" | "year";

interface ProductionChartProps {
  dateRange: DateRange;
  detailed?: boolean;
}

export function ProductionChart({ dateRange, detailed = false }: ProductionChartProps) {
  // Generate mock data based on date range
  const generateData = () => {
    let data = [];
    
    switch(dateRange) {
      case "week":
        data = [
          { name: "Mon", completed: 65, planned: 70, inProgress: 15 },
          { name: "Tue", completed: 72, planned: 70, inProgress: 18 },
          { name: "Wed", completed: 68, planned: 70, inProgress: 16 },
          { name: "Thu", completed: 71, planned: 70, inProgress: 17 },
          { name: "Fri", completed: 75, planned: 70, inProgress: 14 },
          { name: "Sat", completed: 60, planned: 60, inProgress: 10 },
          { name: "Sun", completed: 55, planned: 50, inProgress: 8 },
        ];
        break;
      case "month":
        data = Array.from({ length: detailed ? 30 : 10 }, (_, i) => ({
          name: `${i + 1}${detailed ? "" : "th"}`,
          completed: Math.floor(Math.random() * 30) + 60,
          planned: 70,
          inProgress: Math.floor(Math.random() * 20) + 10
        }));
        break;
      case "quarter":
        data = [
          { name: "Jan", completed: 210, planned: 200, inProgress: 40 },
          { name: "Feb", completed: 190, planned: 200, inProgress: 35 },
          { name: "Mar", completed: 215, planned: 200, inProgress: 45 },
        ];
        break;
      case "year":
        data = [
          { name: "Q1", completed: 615, planned: 600, inProgress: 120 },
          { name: "Q2", completed: 650, planned: 600, inProgress: 130 },
          { name: "Q3", completed: 630, planned: 600, inProgress: 125 },
          { name: "Q4", completed: 670, planned: 600, inProgress: 135 },
        ];
        break;
    }
    
    return data;
  };

  const data = generateData();
  const chartConfig = {
    completed: { label: "Completed", theme: { light: "#0b2065", dark: "#2563eb" } }, // Navy blue
    planned: { label: "Planned", theme: { light: "#f59e0b", dark: "#f59e0b" } }, // Orange
    inProgress: { label: "In Progress", theme: { light: "#93c5fd", dark: "#60a5fa" } } // Light blue
  };

  return (
    <ChartContainer config={chartConfig} className="aspect-[4/3]">
      <ResponsiveContainer width="100%" height={detailed ? 400 : 300}>
        <BarChart
          data={data}
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
              dataKey="inProgress"
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
