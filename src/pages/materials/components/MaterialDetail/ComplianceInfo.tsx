
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, AlertTriangle, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Material } from "@/types/materials";
import { MaterialCompliance } from "@/types/materials";
import { HazardousWaste } from "@/types/quality";

interface ComplianceInfoProps {
  material: Material;
  complianceRecords: MaterialCompliance[];
  wasteRecords: HazardousWaste[];
}

const ComplianceInfo: React.FC<ComplianceInfoProps> = ({ 
  material, 
  complianceRecords, 
  wasteRecords 
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <ShieldAlert className="mr-2 h-5 w-5" />
            Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Hazardous Material</h4>
                <div className="flex items-center mt-1">
                  {material.is_hazardous ? (
                    <Badge variant="destructive" className="flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Yes
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      No
                    </Badge>
                  )}
                </div>
              </div>
              
              {material.is_hazardous && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Hazard Class</h4>
                  <p className="text-base">{material.hazard_class || 'Not specified'}</p>
                </div>
              )}
            </div>

            {material.is_hazardous && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Disposal Method</h4>
                <p className="text-base">{material.disposal_method || 'Not specified'}</p>
              </div>
            )}
          </div>

          {complianceRecords.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">PPE Requirements</h4>
              <ul className="space-y-1">
                {complianceRecords.map((record) => (
                  <li key={record.id} className="text-sm">
                    • {record.ppe_requirement_id ? 
                        `Required PPE: ${(record as any).ppe_requirements?.equipment}` : 
                        'No specific PPE requirements'
                      }
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {material.is_hazardous && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Trash className="mr-2 h-5 w-5" />
              Waste Disposal Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            {wasteRecords.length > 0 ? (
              <div className="space-y-2">
                {wasteRecords.map((waste) => (
                  <div key={waste.id} className="border p-3 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">Waste ID: {waste.waste_id}</span>
                      <Badge className={getStatusBadgeColor(waste.status)}>
                        {waste.status}
                      </Badge>
                    </div>
                    <div className="text-sm mt-1">
                      <p>Quantity: {waste.quantity} {waste.unit}</p>
                      <p>Disposal Date: {new Date(waste.disposal_date).toLocaleDateString()}</p>
                      <p>Method: {waste.disposal_method}</p>
                      <p>Handler: {waste.handler}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No waste disposal records found.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Helper function to get status badge color
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'Disposed':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'Pending':
      return 'bg-amber-100 text-amber-800 border-amber-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export default ComplianceInfo;
