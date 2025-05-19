
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Calendar, CheckSquare, PackageOpen } from "lucide-react";

const StatCards: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">
            +4 from yesterday
          </p>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-4/5 rounded-full bg-primary"></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Jobs Due Today</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <p className="text-xs text-muted-foreground">
            3 at risk
          </p>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-3/4 rounded-full bg-finish-amber-500"></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">QC Pending</CardTitle>
          <CheckSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5</div>
          <p className="text-xs text-muted-foreground">
            -2 from yesterday
          </p>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-2/5 rounded-full bg-finish-green-500"></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
          <PackageOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">
            +1 from yesterday
          </p>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-1/5 rounded-full bg-finish-red-500"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
