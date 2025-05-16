
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Certification } from "@/types/quality";

interface CertificationsTabProps {
  certifications: Certification[];
  isLoading: boolean;
}

const CertificationsTab: React.FC<CertificationsTabProps> = ({ certifications, isLoading }) => {
  const handleExport = () => {
    // In a real app, this would export data to CSV or PDF
    console.log("Exporting Certification data");
  };
  
  const handleView = (id: string) => {
    // In a real app, this would open a detailed view
    console.log(`Viewing Certification with ID ${id}`);
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Active Certifications</h3>
        <Button onClick={handleExport} variant="outline">Export Data</Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center p-8">
          <p>Loading certification data...</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Certification</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Issuing Authority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certifications.length > 0 ? (
                certifications.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">{cert.certification_id}</TableCell>
                    <TableCell>{cert.name}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${cert.status === "Active" ? "bg-green-100 text-green-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                        {cert.status}
                      </div>
                    </TableCell>
                    <TableCell>{cert.expiry}</TableCell>
                    <TableCell>{cert.authority}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleView(cert.id)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                    No certification records found.
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

export default CertificationsTab;
