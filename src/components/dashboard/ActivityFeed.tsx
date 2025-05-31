
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
        return <CheckCircle className="h-3 w-3 text-green-600" />;
      case "inventory":
        return <Package className="h-3 w-3 text-blue-600" />;
      case "quality":
        return <CheckCircle className="h-3 w-3 text-purple-600" />;
      case "maintenance":
        return <Wrench className="h-3 w-3 text-orange-600" />;
      case "assignment":
        return <UserPlus className="h-3 w-3 text-indigo-600" />;
      default:
        return <Clock className="h-3 w-3 text-gray-600" />;
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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-purple-700">Recent Activity</CardTitle>
        <CardDescription className="text-xs">
          Latest team actions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {showMockData ? (
          <>
            {mockData.activityFeed.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-2 pb-2 last:pb-0 border-b last:border-b-0">
                <div className="flex-shrink-0 mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      {activity.action}
                    </p>
                    <Badge variant="outline" className={`text-xs ${getActivityColor(activity.type)}`}>
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 truncate">
                    <span className="font-medium">{activity.user}</span> - {activity.details}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Clock className="h-2 w-2 mr-1" />
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center h-32">
            <p className="text-xs text-muted-foreground">No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
