
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QualityInspection } from "@/types/quality";
import { CheckCircle, Search, XCircle } from "lucide-react";

interface QualityStatCardsProps {
  inspections: QualityInspection[];
}

const QualityStatCards: React.FC<QualityStatCardsProps> = ({ inspections }) => {
  // Count statistics for inspections
  const passedInspections = inspections.filter(inspection => inspection.status === "Passed").length;
  const failedInspections = inspections.filter(inspection => inspection.status === "Failed").length;
  const pendingInspections = inspections.filter(inspection => inspection.status === "Pending").length;
  const totalInspections = inspections.length;
  
  // Calculate pass rate
  const passRate = totalInspections > 0 ? Math.round((passedInspections / totalInspections) * 100) : 0;
  
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Passed Inspections Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-green-700 uppercase tracking-wide">Passed Inspections</div>
            <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-3 shadow-lg">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-4">
            <div className="text-4xl font-bold text-green-800 mb-1">{passedInspections}</div>
            <div className="text-sm text-green-600 font-medium">Quality approved</div>
          </div>
          <div className="rounded-lg bg-green-100/80 border border-green-200 p-3 text-center hover:bg-green-200/80 transition-colors">
            <div className="font-bold text-green-800">{passRate}%</div>
            <div className="text-xs text-green-600 font-medium">Pass Rate</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Failed Inspections Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-red-50 to-rose-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-red-700 uppercase tracking-wide">Failed Inspections</div>
            <div className="rounded-xl bg-gradient-to-br from-red-500 to-rose-600 p-3 shadow-lg">
              <XCircle className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-4">
            <div className="text-4xl font-bold text-red-800 mb-1">{failedInspections}</div>
            <div className="text-sm text-red-600 font-medium">Require attention</div>
          </div>
          <div className="rounded-lg bg-red-100/80 border border-red-200 p-3 text-center hover:bg-red-200/80 transition-colors">
            <div className="font-bold text-red-800">{totalInspections > 0 ? Math.round((failedInspections / totalInspections) * 100) : 0}%</div>
            <div className="text-xs text-red-600 font-medium">Failure Rate</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Pending Inspections Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-50 to-orange-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Pending Inspections</div>
            <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-3 shadow-lg">
              <Search className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-4">
            <div className="text-4xl font-bold text-amber-800 mb-1">{pendingInspections}</div>
            <div className="text-sm text-amber-600 font-medium">Awaiting review</div>
          </div>
          <div className="rounded-lg bg-amber-100/80 border border-amber-200 p-3 text-center hover:bg-amber-200/80 transition-colors">
            <div className="font-bold text-amber-800">{totalInspections > 0 ? Math.round((pendingInspections / totalInspections) * 100) : 0}%</div>
            <div className="text-xs text-amber-600 font-medium">Pending Rate</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QualityStatCards;
