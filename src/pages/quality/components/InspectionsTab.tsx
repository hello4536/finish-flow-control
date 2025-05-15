
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QualityInspection } from "@/types/quality";

interface InspectionsTabProps {
  inspections: QualityInspection[];
  isLoading: boolean;
}

const InspectionsTab: React.FC<InspectionsTabProps> = ({ inspections, isLoading }) => {
  const handleExport = () => {
    // In a real app, this would export data to CSV or PDF
    console.log("Exporting Inspection data");
  };
  
  const handleView = (id: string) => {
    // In a real app, this would open a detailed view
    console.log(`Viewing Inspection with ID ${id}`);
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Recent Quality Inspections</h3>
        <Button onClick={handleExport} variant="outline">Export Data</Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center p-8">
          <p>Loading inspection data...</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Inspector</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspections.length > 0 ? (
                inspections.map((inspection) => (
                  <TableRow key={inspection.id}>
                    <TableCell className="font-medium">{inspection.inspection_id}</TableCell>
                    <TableCell>{inspection.date}</TableCell>
                    <TableCell>{inspection.product}</TableCell>
                    <TableCell>{inspection.inspector}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${inspection.status === "Passed" ? "bg-green-100 text-green-800" : 
                          inspection.status === "Failed" ? "bg-red-100 text-red-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                        {inspection.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleView(inspection.id)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                    No inspection records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default InspectionsTab;
