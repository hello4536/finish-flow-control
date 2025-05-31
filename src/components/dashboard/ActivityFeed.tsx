
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Package, Wrench, UserPlus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { mockData, useMockData } from "@/utils/mockData";

const ActivityFeed: React.FC = () => {
  const { user } = useAuth();
  const showMockData = useMockData();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "completion":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "inventory":
        return <Package className="h-4 w-4 text-blue-600" />;
      case "quality":
        return <CheckCircle className="h-4 w-4 text-purple-600" />;
      case "maintenance":
        return <Wrench className="h-4 w-4 text-orange-600" />;
      case "assignment":
        return <UserPlus className="h-4 w-4 text-indigo-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "completion":
        return "bg-green-100 text-green-800";
      case "inventory":
        return "bg-blue-100 text-blue-800";
      case "quality":
        return "bg-purple-100 text-purple-800";
      case "maintenance":
        return "bg-orange-100 text-orange-800";
      case "assignment":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-purple-700">Recent Activity</CardTitle>
        <CardDescription>
          Latest actions from your team
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showMockData ? (
          <div className="space-y-4">
            {mockData.activityFeed.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 border-b pb-3 last:border-b-0">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <Badge variant="outline" className={getActivityColor(activity.type)}>
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">{activity.user}</span> - {activity.details}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.timestamp}
                  </p>
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
