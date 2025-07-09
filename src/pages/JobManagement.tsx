import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Jobs from "./Jobs";
import DailyTasks from "./DailyTasks";
import { Briefcase, CheckSquare, GitBranch, Calendar } from "lucide-react";

const JobManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Briefcase className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Management</h1>
          <p className="text-muted-foreground">Manage jobs, tasks, workflows, and scheduling in one place</p>
        </div>
      </div>

      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Active Jobs
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Daily Tasks
          </TabsTrigger>
          <TabsTrigger value="workflows" className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Job Calendar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-6">
          <Jobs />
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <DailyTasks />
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Management</CardTitle>
              <CardDescription>Define and manage workflow templates for different job types</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Workflow management system coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Calendar</CardTitle>
              <CardDescription>View and manage job schedules and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Job calendar view coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobManagement;