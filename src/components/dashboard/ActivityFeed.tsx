
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDevMode } from "@/context/DevModeContext";

const ActivityFeed: React.FC = () => {
  const { isDevMode } = useDevMode();
  
  // Mock activity data for dev mode
  const mockActivities = [
    {
      id: "1",
      user: "Sarah Miller",
      action: "completed",
      item: "Kitchen Cabinet Finishing",
      time: "15 minutes ago"
    },
    {
      id: "2",
      user: "David Chen",
      action: "started",
      item: "Dining Table Staining",
      time: "35 minutes ago"
    },
    {
      id: "3",
      user: "Michael Brown",
      action: "updated",
      item: "Quality Inspection #QI-456",
      time: "1 hour ago"
    },
    {
      id: "4",
      user: "Alex Johnson",
      action: "approved",
      item: "Material Order #MO-789",
      time: "2 hours ago"
    },
    {
      id: "5",
      user: "Emma Wilson",
      action: "commented on",
      item: "Quality Control Report",
      time: "3 hours ago"
    }
  ];
  
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest actions from your team
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isDevMode ? (
          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <div key={activity.id} className="flex items-start pb-4 last:pb-0 border-b last:border-0">
                <div className="flex flex-col flex-1">
                  <div className="text-sm">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                    <span className="font-medium">{activity.item}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[300px]">
            <p className="text-muted-foreground">No recent activity to display</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
