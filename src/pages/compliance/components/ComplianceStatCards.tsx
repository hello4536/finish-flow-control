
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Certification, ComplianceIssue, HazardousWaste, PPERequirement } from "@/types/quality";
import { ShieldCheck, AlertCircle, CalendarClock, Recycle, HardHat, Plus } from "lucide-react";
import AddCertificationDialog from "./AddCertificationDialog";
import AddComplianceIssueDialog from "./AddComplianceIssueDialog";
import AddHazardousWasteDialog from "./AddHazardousWasteDialog";
import AddPPERequirementDialog from "./AddPPERequirementDialog";

interface ComplianceStatCardsProps {
  certifications: Certification[];
  complianceIssues: ComplianceIssue[];
  hazardousWaste: HazardousWaste[];
  ppeRequirements: PPERequirement[];
  onAddCertification: (data: any) => void;
  onAddComplianceIssue: (data: any) => void;
  onAddHazardousWaste: (data: any) => void;
  onAddPPERequirement: (data: any) => void;
}

const ComplianceStatCards: React.FC<ComplianceStatCardsProps> = ({ 
  certifications, 
  complianceIssues,
  hazardousWaste,
  ppeRequirements,
  onAddCertification,
  onAddComplianceIssue,
  onAddHazardousWaste,
  onAddPPERequirement
}) => {
  // Calculate stats for certifications
  const activeCertifications = certifications.filter(c => c.status === 'Active').length;
  const expiringCertifications = certifications.filter(c => c.status === 'Expiring Soon').length;
  const totalCertifications = certifications.length;
  const certificationRate = totalCertifications > 0 ? (activeCertifications / totalCertifications) * 100 : 0;

  const resolvedIssues = complianceIssues.filter(i => i.status === 'Resolved').length;
  const pendingIssues = complianceIssues.filter(i => i.status === 'Pending Review').length;
  const inProgressIssues = complianceIssues.filter(i => i.status === 'In Progress').length;
  const totalIssues = complianceIssues.length;
  const issueResolutionRate = totalIssues > 0 ? (resolvedIssues / totalIssues) * 100 : 0;

  const pendingDisposal = hazardousWaste.filter(w => w.status === 'Pending').length;
  const inProgressDisposal = hazardousWaste.filter(w => w.status === 'In Progress').length;
  const disposedWaste = hazardousWaste.filter(w => w.status === 'Disposed').length;
  const totalWaste = hazardousWaste.length;
  const wasteCompletionRate = totalWaste > 0 ? (disposedWaste / totalWaste) * 100 : 0;
  
  const compliantPPE = ppeRequirements.filter(p => p.status === 'Compliant').length;
  const nonCompliantPPE = ppeRequirements.filter(p => p.status === 'Non-Compliant').length;
  const pendingPPE = ppeRequirements.filter(p => p.status === 'Pending Review').length;
  const totalPPE = ppeRequirements.length;
  const ppeComplianceRate = totalPPE > 0 ? (compliantPPE / totalPPE) * 100 : 0;
  
  const overallComplianceRate = (certificationRate + issueResolutionRate + wasteCompletionRate + ppeComplianceRate) / 4;
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {/* Overall Status Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Overall Status</div>
            <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-3 shadow-lg">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-6">
            <div className="text-4xl font-bold text-slate-800 mb-1">{Math.round(overallComplianceRate)}%</div>
            <div className="text-sm text-slate-600 font-medium">Compliance Rate</div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Progress</span>
              <span>{Math.round(overallComplianceRate)}%</span>
            </div>
            <Progress 
              value={overallComplianceRate} 
              className="h-3 bg-slate-200"
            />
          </div>
        </CardContent>
      </Card>

      {/* Certifications Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Certifications</div>
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg">
              <CalendarClock className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-4">
            <div className="text-4xl font-bold text-blue-800 mb-1">{expiringCertifications}</div>
            <div className="text-sm text-blue-600 font-medium">Expiring Soon</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-blue-100/80 border border-blue-200 p-3 text-center hover:bg-blue-200/80 transition-colors">
              <div className="font-bold text-blue-800">{activeCertifications}</div>
              <div className="text-xs text-blue-600 font-medium">Active</div>
            </div>
            <div className="rounded-lg bg-red-100/80 border border-red-200 p-3 text-center hover:bg-red-200/80 transition-colors">
              <div className="font-bold text-red-800">{totalCertifications - activeCertifications - expiringCertifications}</div>
              <div className="text-xs text-red-600 font-medium">Expired</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 bg-blue-50/50">
          <AddCertificationDialog onAddCertification={onAddCertification}>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 font-medium transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </AddCertificationDialog>
        </CardFooter>
      </Card>

      {/* Issues Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-50 to-orange-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Issues</div>
            <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-3 shadow-lg">
              <AlertCircle className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-4">
            <div className="text-4xl font-bold text-amber-800 mb-1">{pendingIssues + inProgressIssues}</div>
            <div className="text-sm text-amber-600 font-medium">Open Issues</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-green-100/80 border border-green-200 p-2 text-center hover:bg-green-200/80 transition-colors">
              <div className="font-bold text-green-800 text-sm">{resolvedIssues}</div>
              <div className="text-xs text-green-600 font-medium">Resolved</div>
            </div>
            <div className="rounded-lg bg-blue-100/80 border border-blue-200 p-2 text-center hover:bg-blue-200/80 transition-colors">
              <div className="font-bold text-blue-800 text-sm">{inProgressIssues}</div>
              <div className="text-xs text-blue-600 font-medium">In Progress</div>
            </div>
            <div className="rounded-lg bg-amber-100/80 border border-amber-200 p-2 text-center hover:bg-amber-200/80 transition-colors">
              <div className="font-bold text-amber-800 text-sm">{pendingIssues}</div>
              <div className="text-xs text-amber-600 font-medium">Pending</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 bg-amber-50/50">
          <AddComplianceIssueDialog onAddComplianceIssue={onAddComplianceIssue}>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-amber-200 text-amber-700 hover:bg-amber-100 hover:border-amber-300 font-medium transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Issue
            </Button>
          </AddComplianceIssueDialog>
        </CardFooter>
      </Card>

      {/* Hazardous Waste Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-green-700 uppercase tracking-wide">Hazardous Waste</div>
            <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-3 shadow-lg">
              <Recycle className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-4">
            <div className="text-4xl font-bold text-green-800 mb-1">{pendingDisposal}</div>
            <div className="text-sm text-green-600 font-medium">Pending Disposal</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-green-100/80 border border-green-200 p-2 text-center hover:bg-green-200/80 transition-colors">
              <div className="font-bold text-green-800 text-sm">{disposedWaste}</div>
              <div className="text-xs text-green-600 font-medium">Disposed</div>
            </div>
            <div className="rounded-lg bg-blue-100/80 border border-blue-200 p-2 text-center hover:bg-blue-200/80 transition-colors">
              <div className="font-bold text-blue-800 text-sm">{inProgressDisposal}</div>
              <div className="text-xs text-blue-600 font-medium">In Progress</div>
            </div>
            <div className="rounded-lg bg-amber-100/80 border border-amber-200 p-2 text-center hover:bg-amber-200/80 transition-colors">
              <div className="font-bold text-amber-800 text-sm">{pendingDisposal}</div>
              <div className="text-xs text-amber-600 font-medium">Pending</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 bg-green-50/50">
          <AddHazardousWasteDialog onAddHazardousWaste={onAddHazardousWaste}>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 font-medium transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Waste Record
            </Button>
          </AddHazardousWasteDialog>
        </CardFooter>
      </Card>

      {/* PPE Requirements Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-violet-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-purple-700 uppercase tracking-wide">PPE Requirements</div>
            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 p-3 shadow-lg">
              <HardHat className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mb-4">
            <div className="text-4xl font-bold text-purple-800 mb-1">{nonCompliantPPE}</div>
            <div className="text-sm text-purple-600 font-medium">Non-Compliant</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-green-100/80 border border-green-200 p-2 text-center hover:bg-green-200/80 transition-colors">
              <div className="font-bold text-green-800 text-sm">{compliantPPE}</div>
              <div className="text-xs text-green-600 font-medium">Compliant</div>
            </div>
            <div className="rounded-lg bg-red-100/80 border border-red-200 p-2 text-center hover:bg-red-200/80 transition-colors">
              <div className="font-bold text-red-800 text-sm">{nonCompliantPPE}</div>
              <div className="text-xs text-red-600 font-medium">Non-Compliant</div>
            </div>
            <div className="rounded-lg bg-amber-100/80 border border-amber-200 p-2 text-center hover:bg-amber-200/80 transition-colors">
              <div className="font-bold text-amber-800 text-sm">{pendingPPE}</div>
              <div className="text-xs text-amber-600 font-medium">Pending</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 bg-purple-50/50">
          <AddPPERequirementDialog onAddPPERequirement={onAddPPERequirement}>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 font-medium transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add PPE Requirement
            </Button>
          </AddPPERequirementDialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ComplianceStatCards;
