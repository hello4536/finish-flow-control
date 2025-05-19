
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckSquare, PackageOpen, Users } from "lucide-react";

const ActivityFeed: React.FC = () => {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest updates across all departments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="flex items-center">
            <div className="mr-2 rounded-full bg-primary/20 p-1">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="ml-2 space-y-1">
              <p className="text-sm font-medium leading-none">
                Wood finishing job started
              </p>
              <p className="text-xs text-muted-foreground">
                Custom Dining Table - Alex started sanding step
              </p>
              <p className="text-xs text-muted-foreground">
                10 minutes ago
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-2 rounded-full bg-primary/20 p-1">
              <CheckSquare className="h-4 w-4 text-primary" />
            </div>
            <div className="ml-2 space-y-1">
              <p className="text-sm font-medium leading-none">
                QC check completed
              </p>
              <p className="text-xs text-muted-foreground">
                Kitchen Cabinet Doors - Maria approved final coat
              </p>
              <p className="text-xs text-muted-foreground">
                45 minutes ago
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-2 rounded-full bg-primary/20 p-1">
              <PackageOpen className="h-4 w-4 text-primary" />
            </div>
            <div className="ml-2 space-y-1">
              <p className="text-sm font-medium leading-none">
                Material received
              </p>
              <p className="text-xs text-muted-foreground">
                New inventory: 20 gallons of satin polyurethane
              </p>
              <p className="text-xs text-muted-foreground">
                2 hours ago
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-2 rounded-full bg-primary/20 p-1">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div className="ml-2 space-y-1">
              <p className="text-sm font-medium leading-none">
                New job assigned
              </p>
              <p className="text-xs text-muted-foreground">
                Conference Table - John assigned to staining
              </p>
              <p className="text-xs text-muted-foreground">
                3 hours ago
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
