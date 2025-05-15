
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Calendar,
  CheckSquare, 
  ClipboardList, 
  Clock,
  PackageOpen,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="mt-2 flex items-center space-x-2 sm:mt-0">
          <Button variant="outline" size="sm">
            Last 7 days
          </Button>
          <Button size="sm">View All</Button>
        </div>
      </div>

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Job Completion Rate</CardTitle>
            <CardDescription>
              Last 7 days vs. previous period
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full rounded-md border border-dashed flex justify-center items-center">
              <BarChart className="h-16 w-16 text-muted-foreground/50" />
              <span className="ml-2 text-muted-foreground">Chart will render here</span>
            </div>
          </CardContent>
        </Card>

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
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

        <Card>
          <CardHeader>
            <CardTitle>Material Usage</CardTitle>
            <CardDescription>Top materials used this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Satin Polyurethane</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Dark Walnut Stain</span>
                  <span>62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">120 Grit Sandpaper</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Mahogany Stain</span>
                  <span>38%</span>
                </div>
                <Progress value={38} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Wood Filler</span>
                  <span>25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
