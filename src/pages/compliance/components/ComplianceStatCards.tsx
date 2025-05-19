
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Certification, ComplianceIssue, HazardousWaste, PPERequirement } from "@/types/quality";
import { ShieldCheck, AlertCircle, CalendarClock, Recycle, HardHat } from "lucide-react";

interface ComplianceStatCardsProps {
  certifications: Certification[];
  complianceIssues: ComplianceIssue[];
  hazardousWaste: HazardousWaste[];
  ppeRequirements: PPERequirement[];
}

const ComplianceStatCards: React.FC<ComplianceStatCardsProps> = ({ 
  certifications, 
  complianceIssues,
  hazardousWaste,
  ppeRequirements
}) => {
  // Calculate stats for certifications
  const activeCertifications = certifications.filter(c => c.status === 'Active').length;
  const expiringCertifications = certifications.filter(c => c.status === 'Expiring Soon').length;
  const totalCertifications = certifications.length;
  const certificationRate = totalCertifications > 0 ? (activeCertifications / totalCertifications) * 100 : 0;

  // Calculate stats for compliance issues
  const resolvedIssues = complianceIssues.filter(i => i.status === 'Resolved').length;
  const pendingIssues = complianceIssues.filter(i => i.status === 'Pending Review').length;
  const inProgressIssues = complianceIssues.filter(i => i.status === 'In Progress').length;
  const totalIssues = complianceIssues.length;
  const issueResolutionRate = totalIssues > 0 ? (resolvedIssues / totalIssues) * 100 : 0;

  // Calculate stats for hazardous waste
  const pendingDisposal = hazardousWaste.filter(w => w.status === 'Pending').length;
  const inProgressDisposal = hazardousWaste.filter(w => w.status === 'In Progress').length;
  const disposedWaste = hazardousWaste.filter(w => w.status === 'Disposed').length;
  const totalWaste = hazardousWaste.length;
  const wasteCompletionRate = totalWaste > 0 ? (disposedWaste / totalWaste) * 100 : 0;
  
  // Calculate stats for PPE requirements
  const compliantPPE = ppeRequirements.filter(p => p.status === 'Compliant').length;
  const nonCompliantPPE = ppeRequirements.filter(p => p.status === 'Non-Compliant').length;
  const pendingPPE = ppeRequirements.filter(p => p.status === 'Pending Review').length;
  const totalPPE = ppeRequirements.length;
  const ppeComplianceRate = totalPPE > 0 ? (compliantPPE / totalPPE) * 100 : 0;
  
  // Calculate overall compliance rate
  const overallComplianceRate = (certificationRate + issueResolutionRate + wasteCompletionRate + ppeComplianceRate) / 4;
  
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-600">Overall Status</div>
            <div className="rounded-full bg-cyan-100 p-2 text-cyan-600">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold">{Math.round(overallComplianceRate)}%</div>
            <div className="text-sm text-gray-600">Compliance Rate</div>
          </div>
          <div className="mt-4 h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-green-500"
              style={{ width: `${overallComplianceRate}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-600">Certifications</div>
            <div className="rounded-full bg-blue-100 p-2 text-blue-600">
              <CalendarClock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold">{expiringCertifications}</div>
            <div className="text-sm text-gray-600">Expiring Soon</div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-blue-50 p-2 text-center">
              <div className="font-medium">{activeCertifications}</div>
              <div className="text-xs text-gray-500">Active</div>
            </div>
            <div className="rounded-lg bg-red-50 p-2 text-center">
              <div className="font-medium">{totalCertifications - activeCertifications - expiringCertifications}</div>
              <div className="text-xs text-gray-500">Expired</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-600">Issues</div>
            <div className="rounded-full bg-amber-100 p-2 text-amber-600">
              <AlertCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold">{pendingIssues + inProgressIssues}</div>
            <div className="text-sm text-gray-600">Open Issues</div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1">
            <div className="rounded-lg bg-green-50 p-2 text-center">
              <div className="font-medium">{resolvedIssues}</div>
              <div className="text-xs text-gray-500">Resolved</div>
            </div>
            <div className="rounded-lg bg-blue-50 p-2 text-center">
              <div className="font-medium">{inProgressIssues}</div>
              <div className="text-xs text-gray-500">In Progress</div>
            </div>
            <div className="rounded-lg bg-amber-50 p-2 text-center">
              <div className="font-medium">{pendingIssues}</div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-600">Hazardous Waste</div>
            <div className="rounded-full bg-green-100 p-2 text-green-600">
              <Recycle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold">{pendingDisposal}</div>
            <div className="text-sm text-gray-600">Pending Disposal</div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1">
            <div className="rounded-lg bg-green-50 p-2 text-center">
              <div className="font-medium">{disposedWaste}</div>
              <div className="text-xs text-gray-500">Disposed</div>
            </div>
            <div className="rounded-lg bg-blue-50 p-2 text-center">
              <div className="font-medium">{inProgressDisposal}</div>
              <div className="text-xs text-gray-500">In Progress</div>
            </div>
            <div className="rounded-lg bg-amber-50 p-2 text-center">
              <div className="font-medium">{pendingDisposal}</div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-600">PPE Requirements</div>
            <div className="rounded-full bg-purple-100 p-2 text-purple-600">
              <HardHat className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold">{nonCompliantPPE}</div>
            <div className="text-sm text-gray-600">Non-Compliant</div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1">
            <div className="rounded-lg bg-green-50 p-2 text-center">
              <div className="font-medium">{compliantPPE}</div>
              <div className="text-xs text-gray-500">Compliant</div>
            </div>
            <div className="rounded-lg bg-red-50 p-2 text-center">
              <div className="font-medium">{nonCompliantPPE}</div>
              <div className="text-xs text-gray-500">Non-Compliant</div>
            </div>
            <div className="rounded-lg bg-amber-50 p-2 text-center">
              <div className="font-medium">{pendingPPE}</div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceStatCards;
