
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

const JobsStats: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-primary text-primary-foreground">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Active Jobs</CardTitle>
          <ClipboardList className="h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">24</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Completed This Month</CardTitle>
          <ClipboardList className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">48</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">On Hold</CardTitle>
          <ClipboardList className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">5</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobsStats;
