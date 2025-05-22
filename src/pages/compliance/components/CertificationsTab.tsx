import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Certification } from "@/types/quality";
import { UseMutationResult } from "@tanstack/react-query";
import DeleteCertificationDialog from "./DeleteCertificationDialog";
import { Edit, Trash } from "lucide-react";
interface CertificationsTabProps {
  certifications: Certification[];
  isLoading: boolean;
  updateCertification: UseMutationResult<any, any, any, any>;
  deleteCertification: UseMutationResult<any, any, any, any>;
}
const CertificationsTab: React.FC<CertificationsTabProps> = ({
  certifications,
  isLoading,
  updateCertification,
  deleteCertification
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [certificationToDelete, setCertificationToDelete] = useState<string | null>(null);
  const handleExport = () => {
    // In a real app, this would export data to CSV or PDF
    console.log("Exporting Certification data");
  };
  const handleEdit = (cert: Certification) => {
    // For now, just adding placeholder for edit functionality
    // In a real implementation, you'd open an edit dialog
    console.log(`Editing certification: ${cert.id}`);
  };
  const handleDeleteClick = (cert: Certification) => {
    setCertificationToDelete(cert.id);
    setDeleteDialogOpen(true);
  };
  const handleConfirmDelete = () => {
    if (certificationToDelete) {
      deleteCertification.mutate(certificationToDelete);
      setDeleteDialogOpen(false);
      setCertificationToDelete(null);
    }
  };
  return <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Active Certifications</h3>
        <Button onClick={handleExport} variant="outline">Export Data</Button>
      </div>
      {isLoading ? <div className="flex justify-center p-8">
          <p>Loading certification data...</p>
        </div> : <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-sky-100">ID</TableHead>
                <TableHead className="bg-sky-100">Certification</TableHead>
                <TableHead className="bg-sky-100">Status</TableHead>
                <TableHead className="bg-sky-100">Expiry Date</TableHead>
                <TableHead className="bg-sky-100">Issuing Authority</TableHead>
                <TableHead className="bg-sky-100">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certifications.length > 0 ? certifications.map(cert => <TableRow key={cert.id}>
                    <TableCell className="font-medium">{cert.certification_id}</TableCell>
                    <TableCell>{cert.name}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${cert.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {cert.status}
                      </div>
                    </TableCell>
                    <TableCell>{cert.expiry}</TableCell>
                    <TableCell>{cert.authority}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(cert)} className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(cert)} className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>) : <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                    No certification records found.
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </div>}

      <DeleteCertificationDialog certificationId={certificationToDelete || ''} open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirmDelete={handleConfirmDelete} />
    </>;
};
export default CertificationsTab;