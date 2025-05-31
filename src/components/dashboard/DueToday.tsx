
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle, CheckCircle, Truck, GraduationCap } from "lucide-react";
import { mockData, useMockData } from "@/utils/mockData";

const DueToday: React.FC = () => {
  const showMockData = useMockData();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "inspection":
        return <CheckCircle className="h-3 w-3" />;
      case "delivery":
        return <Truck className="h-3 w-3" />;
      case "procurement":
        return <AlertTriangle className="h-3 w-3" />;
      case "training":
        return <GraduationCap className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-purple-700">Due Today</CardTitle>
        <CardDescription className="text-xs">Items requiring attention</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {showMockData ? (
          <>
            {mockData.dueToday.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 border rounded-lg">
                <div className="flex items-start space-x-2 flex-1 min-w-0">
                  <div className="flex-shrink-0 mt-0.5 text-blue-600">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium text-gray-900 mb-1 truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 truncate">
                      <span className="font-medium">{item.assignee}</span>
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-2 w-2 mr-1" />
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-6 ml-2">
                  View
                </Button>
              </div>
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center h-32">
            <p className="text-xs text-muted-foreground">No items due today</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DueToday;
