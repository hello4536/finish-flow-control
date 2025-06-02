
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
        return "bg-green-100 text-green-800 border-green-200";
      case "inventory":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "quality":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "maintenance":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "assignment":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-violet-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        <CardDescription className="text-xs text-purple-100">
          Latest team actions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-6">
        {showMockData ? (
          <>
            {mockData.activityFeed.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-2 pb-2 last:pb-0 border-b last:border-b-0 border-purple-100 hover:bg-purple-50/50 rounded-lg p-2 transition-colors duration-200">
                <div className="flex-shrink-0 mt-0.5 p-1 rounded-full bg-white shadow-sm">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-purple-900 truncate">
                      {activity.action}
                    </p>
                    <Badge variant="outline" className={`text-xs ${getActivityColor(activity.type)}`}>
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-purple-700 truncate">
                    <span className="font-medium">{activity.user}</span> - {activity.details}
                  </p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <Clock className="h-2 w-2 mr-1" />
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center h-32">
            <p className="text-xs text-purple-600">No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
