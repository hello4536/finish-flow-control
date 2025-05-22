import React, { useMemo } from "react";
import { RegulatoryCompliance, Region } from "@/types/quality";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, Circle, HelpCircle, XCircle } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
interface RegulatoryComplianceTabProps {
  regulatoryCompliance: RegulatoryCompliance[];
  isLoading: boolean;
  selectedRegion: Region;
  onRegionChange: (region: Region) => void;
}
const RegulatoryComplianceTab: React.FC<RegulatoryComplianceTabProps> = ({
  regulatoryCompliance,
  isLoading,
  selectedRegion,
  onRegionChange
}) => {
  // Group requirements and jurisdictions for the matrix
  const {
    requirements,
    jurisdictions,
    complianceMatrix
  } = useMemo(() => {
    // Extract unique requirements
    const reqSet = new Set<string>();
    const jurisdictionSet = new Set<string>();
    regulatoryCompliance.forEach(rule => {
      reqSet.add(rule.requirement);
      jurisdictionSet.add(rule.jurisdiction);
    });
    const requirements = Array.from(reqSet);
    const jurisdictions = Array.from(jurisdictionSet);

    // Create matrix mapping of requirement -> jurisdiction -> compliance rule
    const matrix: Record<string, Record<string, RegulatoryCompliance | null>> = {};
    requirements.forEach(req => {
      matrix[req] = {};
      jurisdictions.forEach(jur => {
        matrix[req][jur] = null;
      });
    });

    // Fill matrix with compliance rules
    regulatoryCompliance.forEach(rule => {
      if (matrix[rule.requirement]) {
        matrix[rule.requirement][rule.jurisdiction] = rule;
      }
    });
    return {
      requirements,
      jurisdictions,
      complianceMatrix: matrix
    };
  }, [regulatoryCompliance]);

  // Render compliance icon based on rule
  const renderComplianceIcon = (rule: RegulatoryCompliance | null) => {
    if (!rule) {
      return <Tooltip>
          <TooltipTrigger>
            <Circle className="text-gray-300 h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Not applicable</p>
          </TooltipContent>
        </Tooltip>;
    }
    if (rule.applies) {
      return <Tooltip>
          <TooltipTrigger>
            <CheckCircle2 className="text-green-500 h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent>
            <div className="max-w-xs">
              <p className="font-medium">Covered by feature: {rule.feature_key}</p>
              {rule.notes && <p className="text-xs mt-1">{rule.notes}</p>}
            </div>
          </TooltipContent>
        </Tooltip>;
    }
    return <Tooltip>
        <TooltipTrigger>
          <XCircle className="text-red-500 h-5 w-5" />
        </TooltipTrigger>
        <TooltipContent>
          <div className="max-w-xs">
            <p className="font-medium">Not covered</p>
            {rule.notes && <p className="text-xs mt-1">{rule.notes}</p>}
          </div>
        </TooltipContent>
      </Tooltip>;
  };
  return <TooltipProvider>
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <h3 className="text-lg font-medium text-blue-600">Regulatory Compliance Checklist</h3>
            <p className="text-sm text-muted-foreground">
              Jurisdictional requirements mapped to application features
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Region:</span>
            <ToggleGroup type="single" value={selectedRegion} onValueChange={value => value && onRegionChange(value as Region)}>
              <ToggleGroupItem value="US" className="text-white bg-blue-600 hover:bg-blue-500">US</ToggleGroupItem>
              <ToggleGroupItem value="Canada" className="text-white bg-blue-600 hover:bg-blue-500">Canada</ToggleGroupItem>
              <ToggleGroupItem value="All" className="text-white bg-blue-600 hover:bg-blue-500">All</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {isLoading ? <div className="flex justify-center p-8">
            <p>Loading compliance data...</p>
          </div> : requirements.length === 0 ? <div className="text-center py-8">
            <p className="text-muted-foreground">No compliance data available for the selected region.</p>
          </div> : <div className="border rounded-md">
            <ScrollArea className="w-full overflow-auto">
              <div className="min-w-[800px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px] min-w-[250px]">Requirement</TableHead>
                      {jurisdictions.map(jurisdiction => <TableHead key={jurisdiction} className="min-w-[150px] text-center">
                          {jurisdiction}
                        </TableHead>)}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requirements.map(requirement => <TableRow key={requirement}>
                        <TableCell className="font-medium">{requirement}</TableCell>
                        {jurisdictions.map(jurisdiction => <TableCell key={`${requirement}-${jurisdiction}`} className="text-center">
                            {renderComplianceIcon(complianceMatrix[requirement][jurisdiction])}
                          </TableCell>)}
                      </TableRow>)}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </div>}
        
        <div className="flex items-center gap-6 mt-4 justify-center text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="text-green-500 h-4 w-4" />
            <span>Covered</span>
          </div>
          <div className="flex items-center gap-1">
            <XCircle className="text-red-500 h-4 w-4" />
            <span>Not Covered</span>
          </div>
          <div className="flex items-center gap-1">
            <Circle className="text-gray-300 h-4 w-4" />
            <span>Not Applicable</span>
          </div>
          <div className="flex items-center gap-1">
            <HelpCircle className="text-blue-500 h-4 w-4" />
            <span>Hover for details</span>
          </div>
        </div>
      </div>
    </TooltipProvider>;
};
export default RegulatoryComplianceTab;