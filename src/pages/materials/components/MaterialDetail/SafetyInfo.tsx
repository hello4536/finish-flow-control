
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileWarning, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Material, SafetyDataSheet } from "@/types/materials";

interface SafetyInfoProps {
  material: Material;
  safetyDataSheets: SafetyDataSheet[];
}

const SafetyInfo: React.FC<SafetyInfoProps> = ({ material, safetyDataSheets }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Safety Data Sheets
          </CardTitle>
        </CardHeader>
        <CardContent>
          {safetyDataSheets.length > 0 ? (
            <div className="space-y-3">
              {safetyDataSheets.map((sds) => (
                <div key={sds.id} className="border p-3 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{sds.file_name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Version: {sds.version || 'N/A'}
                      </p>
                    </div>
                    <a 
                      href={sds.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      View <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    {sds.issue_date && (
                      <span className="mr-4">Issued: {new Date(sds.issue_date).toLocaleDateString()}</span>
                    )}
                    {sds.expiry_date && (
                      <span>Expires: {new Date(sds.expiry_date).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              {material.safety_data_sheet_url ? (
                <div>
                  <p className="mb-2">Direct link to Safety Data Sheet available:</p>
                  <Button variant="outline" asChild>
                    <a 
                      href={material.safety_data_sheet_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Open SDS <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="text-amber-600 flex flex-col items-center">
                  <FileWarning className="h-8 w-8 mb-2" />
                  <p>No Safety Data Sheets have been uploaded for this material.</p>
                  {material.is_hazardous && (
                    <Badge variant="destructive" className="mt-2">
                      Required for Hazardous Materials
                    </Badge>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyInfo;
