
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
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-violet-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white">
        <CardTitle className="text-lg font-semibold">Due Today</CardTitle>
        <CardDescription className="text-xs text-purple-100">Items requiring attention</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-6">
        {showMockData ? (
          <>
            {mockData.dueToday.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 border border-purple-200 rounded-lg hover:bg-purple-50/50 transition-colors duration-200 hover:border-purple-300">
                <div className="flex items-start space-x-2 flex-1 min-w-0">
                  <div className="flex-shrink-0 mt-0.5 text-purple-600 p-1 rounded-full bg-white shadow-sm">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium text-purple-900 mb-1 truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-purple-700 truncate">
                      <span className="font-medium">{item.assignee}</span>
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </Badge>
                      <span className="text-xs text-purple-600 flex items-center">
                        <Clock className="h-2 w-2 mr-1" />
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-6 ml-2 border-purple-200 text-purple-700 hover:bg-purple-100 hover:text-purple-800">
                  View
                </Button>
              </div>
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center h-32">
            <p className="text-xs text-purple-600">No items due today</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DueToday;
