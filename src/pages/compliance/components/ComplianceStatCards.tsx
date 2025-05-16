
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Certification, ComplianceIssue } from "@/types/quality";
import { AlertCircle, Award, CheckCircle } from "lucide-react";

interface ComplianceStatCardsProps {
  certifications: Certification[];
  complianceIssues: ComplianceIssue[];
}

const ComplianceStatCards: React.FC<ComplianceStatCardsProps> = ({
  certifications,
  complianceIssues
}) => {
  // Count statistics for certifications
  const activeCerts = certifications.filter(cert => cert.status === "Active").length;
  const expiringSoon = certifications.filter(cert => cert.status === "Expiring Soon").length;
  const expired = certifications.filter(cert => cert.status === "Expired").length;

  // Count statistics for compliance issues
  const resolvedIssues = complianceIssues.filter(issue => issue.status === "Resolved").length;
  const pendingIssues = complianceIssues.filter(issue => issue.status === "Pending Review").length;
  const inProgressIssues = complianceIssues.filter(issue => issue.status === "In Progress").length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Certifications card */}
      <Card>
        <CardContent className="flex flex-col pt-6">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            <span className="text-lg font-medium">Certifications</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-green-600">{activeCerts}</span>
              <span className="text-xs text-muted-foreground">Active</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-yellow-500">{expiringSoon}</span>
              <span className="text-xs text-muted-foreground">Expiring Soon</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-red-500">{expired}</span>
              <span className="text-xs text-muted-foreground">Expired</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Compliance Issues card */}
      <Card>
        <CardContent className="flex flex-col pt-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-lg font-medium">Compliance Issues</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-green-600">{resolvedIssues}</span>
              <span className="text-xs text-muted-foreground">Resolved</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-yellow-500">{inProgressIssues}</span>
              <span className="text-xs text-muted-foreground">In Progress</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-red-500">{pendingIssues}</span>
              <span className="text-xs text-muted-foreground">Pending</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Regulatory Compliance card */}
      <Card>
        <CardContent className="flex flex-col pt-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-lg font-medium">Regulatory Matrix</span>
          </div>
          <div className="mt-4 text-center">
            <div className="flex flex-col items-center">
              <span className="text-sm text-muted-foreground">
                Compliance requirements based on jurisdiction
              </span>
              <span className="mt-2 text-xs text-muted-foreground">
                Toggle between US and Canada regulations
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceStatCards;
