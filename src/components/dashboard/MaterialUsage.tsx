
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";
import { mockData, useMockData } from "@/utils/mockData";

const MaterialUsage: React.FC = () => {
  const showMockData = useMockData();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-purple-700">Material Usage</CardTitle>
        <CardDescription className="text-xs">Top materials this week</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {showMockData ? (
          <>
            {mockData.materialUsage.map((material, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium truncate">{material.material}</span>
                  <div className="flex items-center space-x-1 ml-2">
                    <span className="text-xs text-gray-600">{material.usage}%</span>
                    <div className={`flex items-center text-xs ${
                      material.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {material.trend.startsWith('+') ? (
                        <TrendingUp className="h-2 w-2 mr-0.5" />
                      ) : (
                        <TrendingDown className="h-2 w-2 mr-0.5" />
                      )}
                      {material.trend}
                    </div>
                  </div>
                </div>
                <Progress 
                  value={material.usage} 
                  className="h-1.5"
                />
              </div>
            ))}
            <div className="pt-1 border-t">
              <p className="text-xs text-gray-500">
                vs. last week's consumption
              </p>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-32">
            <p className="text-xs text-muted-foreground">No usage data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialUsage;
