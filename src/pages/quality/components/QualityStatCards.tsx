
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QualityInspection } from "@/types/quality";
import { CheckCircle, Search, XCircle } from "lucide-react";

interface QualityStatCardsProps {
  inspections: QualityInspection[];
}

const QualityStatCards: React.FC<QualityStatCardsProps> = ({
  inspections
}) => {
  // Count statistics for inspections
  const passedInspections = inspections.filter(inspection => inspection.status === "Passed").length;
  const failedInspections = inspections.filter(inspection => inspection.status === "Failed").length;
  const pendingInspections = inspections.filter(inspection => inspection.status === "Pending").length;
  
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Passed Inspections card */}
      <Card>
        <CardContent className="flex flex-col pt-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-lg font-medium">Passed Inspections</span>
          </div>
          <div className="mt-4 flex justify-center">
            <span className="text-3xl font-bold text-green-600">{passedInspections}</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Failed Inspections card */}
      <Card>
        <CardContent className="flex flex-col pt-6">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <span className="text-lg font-medium">Failed Inspections</span>
          </div>
          <div className="mt-4 flex justify-center">
            <span className="text-3xl font-bold text-red-600">{failedInspections}</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Pending Inspections card */}
      <Card>
        <CardContent className="flex flex-col pt-6">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-amber-600" />
            <span className="text-lg font-medium">Pending Inspections</span>
          </div>
          <div className="mt-4 flex justify-center">
            <span className="text-3xl font-bold text-amber-500">{pendingInspections}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QualityStatCards;
