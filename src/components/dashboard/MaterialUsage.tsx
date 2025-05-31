
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";
import { mockData, useMockData } from "@/utils/mockData";

const MaterialUsage: React.FC = () => {
  const showMockData = useMockData();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-purple-700">Material Usage</CardTitle>
        <CardDescription>Top materials used this week</CardDescription>
      </CardHeader>
      <CardContent>
        {showMockData ? (
          <div className="space-y-4">
            {mockData.materialUsage.map((material, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{material.material}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{material.usage}%</span>
                    <div className={`flex items-center text-xs ${
                      material.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {material.trend.startsWith('+') ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {material.trend}
                    </div>
                  </div>
                </div>
                <Progress 
                  value={material.usage} 
                  className="h-2"
                />
              </div>
            ))}
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-500">
                Usage compared to last week's consumption
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center py-8">
            <p className="text-muted-foreground">No usage data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialUsage;
