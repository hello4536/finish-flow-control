
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, Shield, FileCheck } from "lucide-react";
import { QualityInspection, Certification, ComplianceIssue } from "@/types/quality";

interface QualityStatCardsProps {
  inspections: QualityInspection[];
  certifications: Certification[];
  complianceIssues: ComplianceIssue[];
}

const QualityStatCards: React.FC<QualityStatCardsProps> = ({ 
  inspections, 
  certifications, 
  complianceIssues 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-6 w-6" />
            <CardTitle>Quality Inspections</CardTitle>
          </div>
          <CardDescription className="text-blue-100">
            Recent product quality checks
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{inspections.length}</div>
          <p className="text-muted-foreground">Total inspections this month</p>
          <div className="mt-2 flex gap-2">
            <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              {inspections.filter(i => i.status === "Passed").length} Passed
            </div>
            <div className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
              {inspections.filter(i => i.status === "Failed").length} Failed
            </div>
            <div className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
              {inspections.filter(i => i.status === "Pending").length} Pending
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <CardTitle>Certifications</CardTitle>
          </div>
          <CardDescription className="text-indigo-100">
            Active compliance certifications
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{certifications.length}</div>
          <p className="text-muted-foreground">Active certifications</p>
          <div className="mt-2">
            <div className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 inline-block">
              {certifications.filter(c => c.status === "Expiring Soon").length} Expiring soon
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <FileCheck className="h-6 w-6" />
            <CardTitle>Compliance Issues</CardTitle>
          </div>
          <CardDescription className="text-red-100">
            Regulatory violations and fixes
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{complianceIssues.length}</div>
          <p className="text-muted-foreground">Total violations reported</p>
          <div className="mt-2 flex gap-2">
            <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              {complianceIssues.filter(v => v.status === "Resolved").length} Resolved
            </div>
            <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
              {complianceIssues.filter(v => v.status === "In Progress").length} In progress
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QualityStatCards;
