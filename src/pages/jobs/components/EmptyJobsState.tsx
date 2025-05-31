
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Briefcase } from "lucide-react";

const EmptyJobsState: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <Briefcase className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          Get started by creating your first job or check if there are any filters applied.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-500">
          <Plus className="h-4 w-4 mr-2" />
          Create New Job
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyJobsState;
