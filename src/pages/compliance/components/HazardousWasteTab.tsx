import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HazardousWaste } from "@/types/quality";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, FileText, Trash2, Upload } from "lucide-react";
interface HazardousWasteTabProps {
  hazardousWaste: HazardousWaste[];
  isLoading: boolean;
  updateHazardousWaste?: any;
  deleteHazardousWaste?: any;
}
const HazardousWasteTab: React.FC<HazardousWasteTabProps> = ({
  hazardousWaste,
  isLoading,
  updateHazardousWaste,
  deleteHazardousWaste
}) => {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const handleExport = () => {
    // In a real app, this would export data to CSV or PDF
    console.log("Exporting hazardous waste data");
  };
  const handleGenerateManifest = (id: string) => {
    // In a real app, this would generate a manifest document
    console.log(`Generating manifest for waste ID ${id}`);
  };
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      deleteHazardousWaste && deleteHazardousWaste(id);
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>;
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      case 'Disposed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  const filteredWaste = filterStatus ? hazardousWaste.filter(item => item.status === filterStatus) : hazardousWaste;
  return <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-blue-600">Hazardous Waste Management</h3>
        <div className="flex gap-2">
          <div className="flex gap-1">
            <Button onClick={() => setFilterStatus(null)} variant={filterStatus === null ? "default" : "outline"} size="sm" className="bg-blue-600 hover:bg-blue-500">
              All
            </Button>
            <Button onClick={() => setFilterStatus("Pending")} variant={filterStatus === "Pending" ? "default" : "outline"} size="sm" className="text-white bg-blue-600 hover:bg-blue-500">
              Pending
            </Button>
            <Button onClick={() => setFilterStatus("In Progress")} variant={filterStatus === "In Progress" ? "default" : "outline"} size="sm" className="text-white bg-blue-600 hover:bg-blue-500">
              In Progress
            </Button>
            <Button onClick={() => setFilterStatus("Disposed")} variant={filterStatus === "Disposed" ? "default" : "outline"} size="sm" className="text-white bg-blue-600 hover:bg-blue-500">
              Disposed
            </Button>
          </div>
          <Button onClick={handleExport} variant="outline" size="sm" className="flex gap-1 text-blue-600">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      {isLoading ? <div className="flex justify-center p-8">
          <p>Loading hazardous waste data...</p>
        </div> : <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-sky-100">Waste ID</TableHead>
                <TableHead className="bg-sky-100">Material</TableHead>
                <TableHead className="bg-sky-100">Quantity</TableHead>
                <TableHead className="bg-sky-100">Disposal Date</TableHead>
                <TableHead className="bg-sky-100">Method</TableHead>
                <TableHead className="bg-sky-100">Handler</TableHead>
                <TableHead className="bg-sky-100">Status</TableHead>
                <TableHead className="bg-sky-100">Manifest</TableHead>
                <TableHead className="bg-sky-100">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWaste.length > 0 ? filteredWaste.map(waste => <TableRow key={waste.id}>
                    <TableCell className="font-medium">{waste.waste_id}</TableCell>
                    <TableCell>{waste.material}</TableCell>
                    <TableCell>{waste.quantity} {waste.unit}</TableCell>
                    <TableCell>{waste.disposal_date}</TableCell>
                    <TableCell>{waste.disposal_method}</TableCell>
                    <TableCell>{waste.handler}</TableCell>
                    <TableCell>{getStatusBadge(waste.status)}</TableCell>
                    <TableCell>
                      {waste.manifest_number ? waste.manifest_number : 'Not Generated'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleGenerateManifest(waste.id)} title="Generate Manifest">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(waste.id)} title="Delete Record" className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>) : <TableRow>
                  <TableCell colSpan={9} className="text-center h-24 text-muted-foreground">
                    No hazardous waste records found.
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </div>}
      <div className="mt-4">
        <h4 className="font-medium mb-2 text-blue-600">Upcoming Disposals</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hazardousWaste.filter(w => w.status === 'Pending').slice(0, 3).map(waste => <div key={`upcoming-${waste.id}`} className="border rounded-md p-3 bg-yellow-50">
                <div className="flex items-center gap-2 font-medium text-sm">
                  <Calendar className="h-4 w-4" />
                  {waste.disposal_date}
                </div>
                <div className="mt-1 font-medium">{waste.material}</div>
                <div className="text-sm text-gray-600">{waste.quantity} {waste.unit} • {waste.handler}</div>
              </div>)}
        </div>
      </div>
    </>;
};
export default HazardousWasteTab;