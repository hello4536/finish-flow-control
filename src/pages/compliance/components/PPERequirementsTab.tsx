import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PPERequirement } from "@/types/quality";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Download, Edit, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface PPERequirementsTabProps {
  ppeRequirements: PPERequirement[];
  isLoading: boolean;
  updatePPERequirement?: any;
  deletePPERequirement?: any;
}
const PPERequirementsTab: React.FC<PPERequirementsTabProps> = ({
  ppeRequirements,
  isLoading,
  updatePPERequirement,
  deletePPERequirement
}) => {
  const [filterDepartment, setFilterDepartment] = useState<string | null>(null);
  const handleExport = () => {
    // In a real app, this would export data to CSV or PDF
    console.log("Exporting PPE requirements data");
  };
  const handleMarkCompliant = (id: string) => {
    updatePPERequirement && updatePPERequirement({
      id,
      status: 'Compliant',
      updated_at: new Date().toISOString()
    });
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Compliant':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case 'Non-Compliant':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>;
      case 'Pending Review':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  const getDistinctDepartments = () => {
    const departments = new Set<string>();
    ppeRequirements.forEach(item => departments.add(item.department));
    return Array.from(departments);
  };
  const handleFilterChange = (value: string) => {
    if (value === "all") {
      setFilterDepartment(null);
    } else {
      setFilterDepartment(value);
    }
  };
  const filteredRequirements = filterDepartment ? ppeRequirements.filter(item => item.department === filterDepartment) : ppeRequirements;

  // Calculate compliance metrics
  const totalItems = ppeRequirements.length;
  const compliantItems = ppeRequirements.filter(item => item.status === 'Compliant').length;
  const complianceRate = totalItems > 0 ? Math.round(compliantItems / totalItems * 100) : 0;
  return <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-blue-600">PPE Requirements</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Select value={filterDepartment || 'all'} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by department" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {getDistinctDepartments().map(dept => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleExport} variant="outline" size="sm" className="flex gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="border rounded-lg p-4 bg-white">
          <h4 className="text-sm font-medium text-gray-500">Overall Compliance</h4>
          <div className="mt-2 flex items-end">
            <span className="text-3xl font-bold">{complianceRate}%</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div className={`h-2 rounded-full ${complianceRate > 80 ? "bg-green-500" : complianceRate > 50 ? "bg-yellow-500" : "bg-red-500"}`} style={{
            width: `${complianceRate}%`
          }}></div>
          </div>
        </div>
        <div className="border rounded-lg p-4 bg-white">
          <h4 className="text-sm font-medium text-gray-500">Upcoming Inspections</h4>
          <div className="mt-2">
            <span className="text-3xl font-bold">
              {ppeRequirements.filter(item => new Date(item.next_inspection) < new Date(new Date().setDate(new Date().getDate() + 30))).length}
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-2">Due in next 30 days</div>
        </div>
        <div className="border rounded-lg p-4 bg-white">
          <h4 className="text-sm font-medium text-gray-500">Non-Compliant Items</h4>
          <div className="mt-2">
            <span className="text-3xl font-bold">
              {ppeRequirements.filter(item => item.status === 'Non-Compliant').length}
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-2">Require immediate attention</div>
        </div>
      </div>
      
      {isLoading ? <div className="flex justify-center p-8">
          <p>Loading PPE requirements data...</p>
        </div> : <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-sky-100">ID</TableHead>
                <TableHead className="bg-sky-100">Department</TableHead>
                <TableHead className="bg-sky-100">Equipment</TableHead>
                <TableHead className="bg-sky-100">Standard</TableHead>
                <TableHead className="bg-sky-100">Required By</TableHead>
                <TableHead className="bg-sky-100">Last Inspection</TableHead>
                <TableHead className="bg-sky-100">Next Inspection</TableHead>
                <TableHead className="bg-sky-100">Status</TableHead>
                <TableHead className="bg-sky-100">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequirements.length > 0 ? filteredRequirements.map(requirement => <TableRow key={requirement.id}>
                    <TableCell className="font-medium">{requirement.requirement_id}</TableCell>
                    <TableCell>{requirement.department}</TableCell>
                    <TableCell>{requirement.equipment}</TableCell>
                    <TableCell>{requirement.standard}</TableCell>
                    <TableCell>{requirement.required_by}</TableCell>
                    <TableCell>{requirement.last_inspection}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {requirement.next_inspection}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(requirement.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {requirement.status !== 'Compliant' && <Button variant="ghost" size="icon" onClick={() => handleMarkCompliant(requirement.id)} title="Mark as Compliant" className="text-green-500 hover:text-green-700">
                            <CheckCircle className="h-4 w-4" />
                          </Button>}
                        <Button variant="ghost" size="icon" title="Edit Requirement">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>) : <TableRow>
                  <TableCell colSpan={9} className="text-center h-24 text-muted-foreground">
                    No PPE requirements found.
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </div>}
    </>;
};
export default PPERequirementsTab;