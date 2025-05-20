
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const ActivityFeed: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest actions from your team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center h-[300px]">
          <p className="text-muted-foreground">No recent activity to display</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
