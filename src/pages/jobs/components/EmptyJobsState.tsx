
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";

const EmptyJobsState: React.FC = () => {
  return (
    <TableRow>
      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
        No jobs found. Create your first job by clicking the "Add New Job" button above.
      </TableCell>
    </TableRow>
  );
};

export default EmptyJobsState;
