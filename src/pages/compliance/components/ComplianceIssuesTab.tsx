import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ComplianceIssue } from "@/types/quality";
import { UseMutationResult } from "@tanstack/react-query";
import DeleteComplianceIssueDialog from "./DeleteComplianceIssueDialog";
import { Edit, Trash } from "lucide-react";
interface ComplianceIssuesTabProps {
  complianceIssues: ComplianceIssue[];
  isLoading: boolean;
  updateComplianceIssue: UseMutationResult<any, any, any, any>;
  deleteComplianceIssue: UseMutationResult<any, any, any, any>;
}
const ComplianceIssuesTab: React.FC<ComplianceIssuesTabProps> = ({
  complianceIssues,
  isLoading,
  updateComplianceIssue,
  deleteComplianceIssue
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [issueToDelete, setIssueToDelete] = useState<string | null>(null);
  const handleExport = () => {
    // In a real app, this would export data to CSV or PDF
    console.log("Exporting Compliance Issues data");
  };
  const handleEdit = (issue: ComplianceIssue) => {
    // For now, just adding placeholder for edit functionality
    // In a real implementation, you'd open an edit dialog
    console.log(`Editing compliance issue: ${issue.id}`);
  };
  const handleDeleteClick = (issue: ComplianceIssue) => {
    setIssueToDelete(issue.id);
    setDeleteDialogOpen(true);
  };
  const handleConfirmDelete = () => {
    if (issueToDelete) {
      deleteComplianceIssue.mutate(issueToDelete);
      setDeleteDialogOpen(false);
      setIssueToDelete(null);
    }
  };
  return <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-blue-600">Compliance Issues</h3>
        <Button onClick={handleExport} variant="outline" className="text-blue-600">Export Data</Button>
      </div>
      {isLoading ? <div className="flex justify-center p-8">
          <p>Loading compliance issue data...</p>
        </div> : <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-sky-100">ID</TableHead>
                <TableHead className="bg-sky-100">Date</TableHead>
                <TableHead className="bg-sky-100">Type</TableHead>
                <TableHead className="bg-sky-100">Description</TableHead>
                <TableHead className="bg-sky-100">Status</TableHead>
                <TableHead className="bg-sky-100">Assignee</TableHead>
                <TableHead className="bg-sky-100">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceIssues.length > 0 ? complianceIssues.map(issue => <TableRow key={issue.id}>
                    <TableCell className="font-medium">{issue.issue_id}</TableCell>
                    <TableCell>{issue.date}</TableCell>
                    <TableCell>{issue.type}</TableCell>
                    <TableCell className="max-w-xs truncate">{issue.description}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${issue.status === "Resolved" ? "bg-green-100 text-green-800" : issue.status === "In Progress" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                        {issue.status}
                      </div>
                    </TableCell>
                    <TableCell>{issue.assignee}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(issue)} className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(issue)} className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>) : <TableRow>
                  <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                    No compliance issues found.
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </div>}

      <DeleteComplianceIssueDialog issueId={issueToDelete || ''} open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirmDelete={handleConfirmDelete} />
    </>;
};
export default ComplianceIssuesTab;