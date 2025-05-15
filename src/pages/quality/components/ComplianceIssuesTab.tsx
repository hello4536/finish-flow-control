
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ComplianceIssue } from "@/types/quality";

interface ComplianceIssuesTabProps {
  complianceIssues: ComplianceIssue[];
  isLoading: boolean;
}

const ComplianceIssuesTab: React.FC<ComplianceIssuesTabProps> = ({ complianceIssues, isLoading }) => {
  const handleExport = () => {
    // In a real app, this would export data to CSV or PDF
    console.log("Exporting Violation data");
  };
  
  const handleView = (id: string) => {
    // In a real app, this would open a detailed view
    console.log(`Viewing Violation with ID ${id}`);
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Compliance Issues</h3>
        <Button onClick={handleExport} variant="outline">Export Data</Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center p-8">
          <p>Loading compliance data...</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceIssues.length > 0 ? (
                complianceIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="font-medium">{issue.issue_id}</TableCell>
                    <TableCell>{issue.date}</TableCell>
                    <TableCell>{issue.type}</TableCell>
                    <TableCell>{issue.description}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${issue.status === "Resolved" ? "bg-green-100 text-green-800" : 
                          issue.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                        {issue.status}
                      </div>
                    </TableCell>
                    <TableCell>{issue.assignee}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleView(issue.id)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                    No compliance issues found.
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

export default ComplianceIssuesTab;
