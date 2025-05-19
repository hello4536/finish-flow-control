
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QualityInspection } from "@/types/quality";
import { Edit, Trash2 } from "lucide-react";
import { useQualityData } from "@/hooks/useQualityData";
import EditInspectionDialog from "./EditInspectionDialog";
import DeleteInspectionDialog from "./DeleteInspectionDialog";

interface InspectionsTabProps {
  inspections: QualityInspection[];
  isLoading: boolean;
}

const InspectionsTab: React.FC<InspectionsTabProps> = ({ inspections, isLoading }) => {
  const { updateInspection, deleteInspection } = useQualityData();
  const [selectedInspection, setSelectedInspection] = useState<QualityInspection | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [inspectionToDelete, setInspectionToDelete] = useState<string>("");
  
  const handleExport = () => {
    // In a real app, this would export data to CSV or PDF
    console.log("Exporting Inspection data");
  };
  
  const handleEdit = (inspection: QualityInspection) => {
    setSelectedInspection(inspection);
    setEditDialogOpen(true);
  };
  
  const handleDelete = (inspection: QualityInspection) => {
    setInspectionToDelete(inspection.id);
    setDeleteDialogOpen(true);
  };
  
  const handleConfirmDelete = () => {
    if (inspectionToDelete) {
      deleteInspection.mutate(inspectionToDelete);
      setDeleteDialogOpen(false);
    }
  };
  
  const handleSaveInspection = (id: string, data: any) => {
    updateInspection.mutate({ id, ...data });
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
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(inspection)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(inspection)} 
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
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
      
      <EditInspectionDialog
        inspection={selectedInspection}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSaveInspection={handleSaveInspection}
      />
      
      <DeleteInspectionDialog
        inspectionId={inspectionToDelete}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};

export default InspectionsTab;
