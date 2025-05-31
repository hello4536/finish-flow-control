
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
        return <CheckCircle className="h-4 w-4" />;
      case "delivery":
        return <Truck className="h-4 w-4" />;
      case "procurement":
        return <AlertTriangle className="h-4 w-4" />;
      case "training":
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
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
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-purple-700">Due Today</CardTitle>
        <CardDescription>Items requiring attention today</CardDescription>
      </CardHeader>
      <CardContent>
        {showMockData ? (
          <div className="space-y-3">
            {mockData.dueToday.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1 text-blue-600">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      Assigned to: <span className="font-medium">{item.assignee}</span>
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-8">
            <p className="text-muted-foreground">No items due today</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DueToday;
