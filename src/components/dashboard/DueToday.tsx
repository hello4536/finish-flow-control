
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DueToday: React.FC = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Due Today</CardTitle>
        <CardDescription>Items requiring attention today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center py-8">
          <p className="text-muted-foreground">No items due today</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DueToday;
