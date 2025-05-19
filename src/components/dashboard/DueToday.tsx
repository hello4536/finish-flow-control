
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const DueToday: React.FC = () => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Due Today</CardTitle>
          <CardDescription>Jobs requiring immediate attention</CardDescription>
        </div>
        <Button variant="ghost" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Conference Table - Final Coat</p>
              <p className="text-xs text-muted-foreground">Wood Finishing / Maria</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">2h left</span>
              </div>
              <span className="flex h-2 w-2 rounded-full bg-finish-red-500"></span>
            </div>
          </div>

          <div className="flex items-center justify-between border-b pb-4">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Kitchen Cabinet Doors - QC Check</p>
              <p className="text-xs text-muted-foreground">Wood Finishing / Alex</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">4h left</span>
              </div>
              <span className="flex h-2 w-2 rounded-full bg-finish-amber-500"></span>
            </div>
          </div>

          <div className="flex items-center justify-between border-b pb-4">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Bookshelf - Sanding</p>
              <p className="text-xs text-muted-foreground">Wood Finishing / John</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">5h left</span>
              </div>
              <span className="flex h-2 w-2 rounded-full bg-finish-green-500"></span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DueToday;
