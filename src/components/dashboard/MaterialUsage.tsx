
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";
import { mockData, useMockData } from "@/utils/mockData";

const MaterialUsage: React.FC = () => {
  const showMockData = useMockData();

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-violet-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white">
        <CardTitle className="text-lg font-semibold">Material Usage</CardTitle>
        <CardDescription className="text-xs text-purple-100">Top materials this week</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-6">
        {showMockData ? (
          <>
            {mockData.materialUsage.map((material, index) => (
              <div key={index} className="space-y-1 p-2 rounded-lg hover:bg-purple-50/50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium truncate text-purple-900">{material.material}</span>
                  <div className="flex items-center space-x-1 ml-2">
                    <span className="text-xs text-purple-700 font-medium">{material.usage}%</span>
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
                  className="h-1.5 bg-purple-200"
                />
              </div>
            ))}
            <div className="pt-1 border-t border-purple-200">
              <p className="text-xs text-purple-600">
                vs. last week's consumption
              </p>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-32">
            <p className="text-xs text-purple-600">No usage data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialUsage;
